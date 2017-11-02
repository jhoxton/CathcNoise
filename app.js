var express = require('express'); //express module must be installed using NPM
var app = express(); //create app
var path = require('path'); //built in path module, used to resolve paths of relative files
var bodyParser = require('body-parser');

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
var CognitoUser = AmazonCognitoIdentity.CognitoUser;
var cognitoUser = null;
//var popupS = require('popups');
var dialog = require('dialog');
    //user pool data
    var poolData = {
        // Your user pool id here
        UserPoolId : 'ap-southeast-2_VvUYI3VWo', 
        // Your client id here
        ClientId : '7si2ih6j701c244dn12imvnjs1' 
    };


    var userPool = new CognitoUserPool(poolData);




 


app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/images')));
app.use(express.static(path.join(__dirname + '/js')));
var port = 3700 //stores port number to listen on

app.use(express.static(path.join(__dirname + '/css'))); //allows html file to reference stylesheet "helloworld.css" that is stored in ./css directory

//to get login page
app.get('/', function(req, res) { //on html request of root directory, run callback function
    res.sendFile(path.join(__dirname, '/login.html')); //send html file named "helloworld.html"

});


//access welcome page after login
app.post('/login', function(req, res){


     var aUsername = req.body.username;
    var aPassword = req.body.password;

    console.log("User Name: " + aUsername + " Password: "+ aPassword);

    //login with username and password given
    Login(aUsername, aPassword, res);
	
	
});

//get register page
app.get('/register', function(req, res){
	res.sendFile(path.join(__dirname, 'register.html'));
    
});

//get confirm page
app.post('/signup', function(req, res){

    var aName = req.body.name;
    var aFamilyName = req.body.familyName
    var aEmail = req.body.email;
    var aAddress = req.body.Address1 + " " + req.body.Address2 + " " + req.body.city + " " + req.body.Postcode;
    var aPhone = req.body.phone;
    var aUserName = req.body.userName;
    var aPassword = req.body.password;

    //register function
    register(aName, aFamilyName, aEmail, aAddress, aPhone, aUserName, aPassword, res);
});

app.post('/confirm', function(req, res){


    var aVerify = req.body.verify;
    console.log("Verify code" + aVerify);
    ConfirmUser(aVerify, res);
	
});

app.get('/logout', function(req, res){
	cognitoUser.signOut();
	res.sendFile(path.join(__dirname, 'login.html'));
});

function register(name, familyName, email, address, phone, username, password, res)
{
   
    //used to store attributes for registered user
    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var dataPhoneNumber = {
        Name : 'phone_number',
        Value : phone
    };

    var dataFamilyName = {
        Name : 'family_name',
        Value : familyName
    };

    var dataName = {
        Name : 'name',
        Value : name
    };

    var dataAddress = {
        Name : 'address',
        Value : address
    };

    //attributes given in register form
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attribueFamilyName = new CognitoUserAttribute(dataFamilyName);
    var attributeName = new CognitoUserAttribute(dataName);
    var attributeAddress = new CognitoUserAttribute(dataAddress);

    //add attributes to attribute list
    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attribueFamilyName);
    attributeList.push(attributeName);
    attributeList.push(attributeAddress);

    //add username, password and attributes to user pool
    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
			dialog.info('Could not sign in.  Try Again', 'Sign In', res.sendFile(path.join(__dirname, 'register.html')));
           console.log(err);
           
        }
        else
        {
            //user added to user pool
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            dialog.info('User Registered', 'Sign In', res.sendFile(path.join(__dirname, 'confirm.html')));

       }
    });
}

function ConfirmUser(code, res){

    //give verify code to cognito user
     cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) 
    {
		dialog.info('Could not Verify User.  Try Again', 'Verify User', res.sendFile(path.join(__dirname, 'confirm.html')));
        console.log(err);

    }
    else{
        dialog.info('User Verified', 'Verify User', res.sendFile(path.join(__dirname, 'login.html')));
    }
});
}

function Login(userName, password, res){
        var authenticationData = {
        Username : userName, // your username here
        Password : password, // your password here
    };

    var userData = { 
        Username: userName,
        Pool: userPool
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
 
    cognitoUser = new CognitoUser(userData);

    //check user name and password match a user in userpool
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
dialog.info('Login Successful', 'User Login', res.sendFile(path.join(__dirname, 'home_user.html')));

        },
 
        onFailure: function(err) {
            console.log(err);

            //res.sendFile(path.join(__dirname, 'login.html'));
			
			dialog.info('Could not login In.  Try Again', 'User Login', res.sendFile(path.join(__dirname, 'login.html')));
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}
 

app.listen(port);//listen for network traffic on port specified by port variable

console.log("Now listening on port " + port); //write to the console which port is being used