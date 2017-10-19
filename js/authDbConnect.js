var dynamodb = new AWS.DynamoDB({
    region: "ap-southeast-2",
    accessKeyId: CONFIG.AWS_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_SECRET_KEY
});

var getAllEvents = {
    TableName: 'Device',
    Select: 'SPECIFIC_ATTRIBUTES',
    AttributesToGet: [
        'DeviceID',
        'Address',
        'ComplainantID',
        'DefendantID'
    ]

};
var deviceList = [];


dynamodb.scan(getAllEvents, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
    if (err) {
        console.log(err, err.stack);
    } else {

        for (var i = 0; i < data.Items.length; i++) { //Loops over each event and prints the EventID



            var addDevice = {
                DeviceID : "",
                Address: "",
                ComplainantID: "",
                DefendantID: ""
            };


            // TESTING BLOCK FOR DIRECT DB ITEMS
            // console.log("ITEMS ID = ", data.Items[i].DeviceID.S);
            // console.log("ITEMS COMP ID = ", data.Items[i].Address.S);
            // console.log("ITEM DEF ID =", data.Items[i].ComplainantID.S);
            // console.log("ITEM DEF ID =", data.Items[i].DefendantID.S);

            addDevice.DeviceID = data.Items[i].DeviceID.S; //Adds the parameters to a the loopEvent
            addDevice.Address = data.Items[i].Address.S;
            addDevice.ComplainantID = data.Items[i].ComplainantID.S;
            addDevice.DefendantID = data.Items[i].DefendantID.S;


            deviceList.push(addDevice); //Add to an array list of events

        }

        

    }

 sortDeviceList(deviceList);

});

function sortDeviceList(deviceList) { //Orders list in eventId order MAKE ONE FOR TIMESTAMP SORTING

    deviceList.sort(function(a,b){
        var idA = a.DeviceID.toLowerCase(), idB= b.DeviceID.toLowerCase()
        if (idA < idB)
            return -1
        if (idA > idB)
            return 1
        return 0
    })

     populateDeviceList(deviceList);

}
var linkID;
function populateDeviceList(deviceList) {

    for (var i = 0; i < deviceList.length; i++) { //Loops eventList array and prints to table

            // linkID = deviceList[i].DeviceID;
            // console.log(linkID);

            var idDiv = document.createElement("div");
            var defDiv = document.createElement("div");
            var compDiv = document.createElement("div");
            var addDiv = document.createElement("div");
          
            
            a = document.createElement('a'); 
            a.innerHTML = deviceList[i].DeviceID;
            idDiv.appendChild(a);


            defDiv.innerHTML = deviceList[i].DefendantID;
            compDiv.innerHTML = deviceList[i].ComplainantID;
            addDiv.innerHTML = deviceList[i].Address;
            // a.href =  "event.html+?";
            a.href =  `event.html?DeviceID=${deviceList[i].DeviceID}`;

            document.getElementById("devicePrint").appendChild(idDiv);
            document.getElementById("defendantPrint").appendChild(defDiv);
            document.getElementById("complainantPrint").appendChild(compDiv);
            document.getElementById("addressPrint").appendChild(addDiv);


        };
}

function tryLink() { //Transfer deviceID object over FIX WHAT EVER IS CASUING THAT ERROR FIRST
    console.log("Here is where I'd put my DeviceID. IF I HAD ONE!");
}

  