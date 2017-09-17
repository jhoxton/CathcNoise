var express = require('express'); //express module must be installed using NPM
var app = express(); //create app
var path = require('path'); //built in path module, used to resolve paths of relative files
var bodyParser = require('body-parser');

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute;
//var Congnito =AWSCognito.CognitoIdentityServiceProvider;

var AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;


  var poolData = {
        UserPoolId : 'ap-southeast-2_XVdm31LEy', // Your user pool id here
        ClientId : '6kgij187eog3fob8rqjufgiock' // Your client id here
    };
    var userPool = new CognitoUserPool(poolData);




var CognitoUser = AmazonCognitoIdentity.CognitoUser; 
//var cognitoUser = AmazonCognitoIdentity.CognitoUser;

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/public')));
//AmazonCognitoIdentity.config.region = "ap-southeats-2";
var port = 3700 //stores port number to listen on

app.use(express.static(path.join(__dirname + '/css'))); //allows html file to reference stylesheet "helloworld.css" that is stored in ./css directory

app.get('/', function(req, res) { //on html request of root directory, run callback function
    res.sendFile(path.join(__dirname, '/login.html')); //send html file named "helloworld.html"
});

app.post('/login', function(req, res){
    res.sendFile(path.join(__dirname, 'welcome.html'));

     var aUsername = req.body.username;
    var aPassword = req.body.password;

    console.log("User Name: " + aUsername + " Password: "+ aPassword);

    Login(aUsername, aPassword);
});
app.get('/register', function(req, res){
	res.sendFile(path.join(__dirname, 'register.html'));
    
});

app.post('/signup', function(req, res){
    res.sendFile(path.join(__dirname, 'confirm.html'));
    var aName = req.body.name;
    var aFamilyName = req.body.familyName
    var aEmail = req.body.email;
    var aAddress = req.body.Address1 + " " + req.body.Address2 + " " + req.body.city + " " + req.body.Postcode;
    var aPhone = req.body.phone;
    var aUserName = req.body.userName;
    var aPassword = req.body.password;

    
    register(aName, aFamilyName, aEmail, aAddress, aPhone, aUserName, aPassword);
});

app.post('/confirm', function(req, res){
    res.sendFile(path.join(__dirname, 'login.html'));

    var aVerify = req.body.verify;
    console.log("Verify code" + aVerify);
    ConfirmUser(aVerify);
});


function register(name, familyName, email, address, phone, username, password)
{
   

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
    var attributeEmail = new CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
    var attribueFamilyName = new CognitoUserAttribute(dataFamilyName);
    var attributeName = new CognitoUserAttribute(dataName);
    var attributeAddress = new CognitoUserAttribute(dataAddress);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    attributeList.push(attribueFamilyName);
    attributeList.push(attributeName);
    attributeList.push(attributeAddress);

    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
           console.log(err);
        }
        else
        {
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
       }
    });
}

function ConfirmUser(code){
     cognitoUser.confirmRegistration(code, true, function(err, result) {
    if (err) 
    {
       console.log(err);
        return;
    }
    console.log('call result: ' + result);
});
}

function Login(userName, password){
    var authenticationData = {
        Username : userName, // your username here
        Password : password, // your password here
    };

    var userData = { 
        Username: userName,
        Pool: userPool
        };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
 
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
        },
 
        onFailure: function(err) {
            console.log(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}
app.listen(port);//listen for network traffic on port specified by port variable

console.log("Now listening on port " + port); //write to the console which port is being used