// console.log("FUCKING WORKED CUNT");
// console.log(AWS);

// console.log(CONFIG);

var dynamodb = new AWS.DynamoDB({
    region: "ap-southeast-2",
    accessKeyId: CONFIG.AWS_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_SECRET_KEY
});


//FOR TESTING AWS CONNECT
// var getEventTableInfo = {
// 	TableName: "Events"
// };


// dynamodb.describeTable(getEventTableInfo, function(err, data) {
// 	if (err) { 	
// 		console.log(err, err.stack);
// 	} else {
// 		console.log(data);
// 	}
// });




var getAllEvents = {
    TableName: 'Events',
    Select: 'SPECIFIC_ATTRIBUTES',
    AttributesToGet: [
        'EventID',
        'Timestamp',
        'SourceType',
        'dB_level'
    ]

};

var loopEvent = {
    EventID: "",
    Timestamp: "",
    SourceType: "",
    dB_level: ""
};
var eventList = [];


var testEventID;

dynamodb.scan(getAllEvents, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
    if (err) {
        console.log(err, err.stack);
    } else {
        // console.log("db input =", data.dB_level);
        for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID
            // for (var i = 0; i < data.Items.length; i++) {
// console.log("Total events = ",data.Items.length);
            // console.log("Data in Scan",data.Items[i]);
            loopEvent.EventID = data.Items[i].EventID.S; //Adds the parameters to a the loopEvent


            loopEvent.Timestamp = data.Items[i].Timestamp.S;


            loopEvent.SourceType = data.Items[i].SourceType.S;


            loopEvent.dB_level = data.Items[i].dB_level.N;

            // TESTING BLOCK
            console.log("ITEMS db = ", data.Items[i].dB_level.S);
            console.log("ITEMS Event = ", data.Items[i].EventID.S);
            console.log("ITEMS Time = ", data.Items[i].Timestamp.S);
            console.log("ITEMS Source = ", data.Items[i].SourceType.S);

            console.log("LOOPEVENT Event = ", loopEvent.EventID);
            console.log("LOOPEVENT Time = ", loopEvent.Timestamp);
            console.log("LOOPEVENT Source = ", loopEvent.SourceType);
            console.log("LOOPEVENT db = ", loopEvent.dB_level);

            var addEvent = loopEvent;
      
            console.log("ADDEVENT Event = ", addEvent.EventID);
            console.log("ADDEVENT Time = ", addEvent.Timestamp);
            console.log("ADDEVENT Source = ", addEvent.SourceType);
            console.log("ADDEVENT db = ", addEvent.dB_level);
            eventList.push(addEvent, eventList.length);

         //    for (var i = eventList.length - 1; i >= 0; i--) {
         //    console.log("Time stamp in array =", eventList[i].Timestamp);
        	// }
        }
        // for (var i = eventList.length - 1; i >= 0; i--) {
        //     console.log("ID in array =", eventList[i].EventID);
        // 		}
        // for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID
        // 	// createEvents();
        // 	data.Items[i];
        // 	console.log(data.Items[i].dB_level);
        // }
        // 	// var j = data.Items[i].EventID.S;
        // 	// console.log(j);


        // 	loopEvent.EventID = data.Items[i].EventID.S; //Adds the EventID to a the loopEvent
        // 	loopEvent.Timestamp = data.Items[i].Timestamp.S;
        // 	loopEvent.SourceType = data.Items[i].SourceType.S;
        // 	loopEvent.dB_level = data.Items[i].dB_level.S;

        // 	var addEvent = loopEvent;

        // 	console.log("loopEvent's ID is ", loopEvent.EventID);//Test log
        // 	console.log("addEvent's ID is ", addEvent.EventID);//Test log


        // testEventID= data.Items[0].EventID.S;
        // console.log(testEventID); //Tests the EventID became a string

        // createEvents(getAllEvents, data); //Passes the data object to a new function to create JS events




        //MAKE SURE TYPE IS S OR N FOR STRING OR NUMBER
        //MAKE ARRAY OF GLOBAL OBJECTS TO PRINT TO EVENTS TABLE
    }
});

function createEvents(getAllEvents, data) {
    for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID
        // for (var i = 0; i < data.Items.length; i++) {
        console.log("Data in create items", data.Items[i]);

        // data.Items[i]
        // console.log(i);

        // var j = data.Items[i].EventID.S;
        // console.log(j);


        loopEvent.EventID = data.Items[i].EventID.S; //Adds the parameters to a the loopEvent
        // console.log("Event = ",data.Items[i].EventID.S);
        loopEvent.Timestamp = data.Items[i].Timestamp.S;
        // console.log("Time = ",data.Items[i].Timestamp.S);
        loopEvent.SourceType = data.Items[i].SourceType.S;
        // console.log("Source = ",data.Items[i].SourceType.S);

        loopEvent.dB_level = data.Items[i].dB_level.N;
        // console.log("db = ",data.Items[i].dB_level.S);
        var addEvent = loopEvent;
        console.log("Time input= ", addEvent.Timestamp);

        // document.getElementById("TEST").innerHTML = addEvent.EventID;//TEST ID PRINT
        eventList.push(addEvent);
        for (var i = eventList.length - 1; i >= 0; i--) {
            console.log("Time stamp in array =", eventList[i].Timestamp);
        }

        // console.log("loopEvent's ID is ", loopEvent.EventID);//Test loopEvent log
        // console.log("addEvent's ID is ", addEvent.EventID);//Test addEvent log

    }
    printEvents(eventList); //Passes on the array
}
// function printEvents(eventList) {
// 	for (var i = eventList.length - 1; i >= 0; i--) {
// 		console.log("Array's eventID is" , eventList[i].EventID);//Prints eventID's in the arraylist
// 	};
// }