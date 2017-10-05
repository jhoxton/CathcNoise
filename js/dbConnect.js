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


console.log("GETTING SHIT FROM DATA");
	

var getAllEvents =  {
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


	var testEventID;
// SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
dynamodb.scan(getAllEvents, function(err, data) {
	if (err) { 	
		console.log(err, err.stack);
	} else {

		for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID
			
			// data.Items[i]
			// console.log(i);
			
			// var j = data.Items[i].EventID.S;
			// console.log(j);


			loopEvent.EventID = data.Items[i].EventID.S; //Adds the EventID to a the loopEvent
			loopEvent.Timestamp = data.Items[i].Timestamp.S;
			loopEvent.SourceType = data.Items[i].SourceType.S;
			loopEvent.dB_level = data.Items[i].dB_level.S;

			var addEvent = loopEvent;

			console.log("loopEvent's ID is ", loopEvent.EventID);//Test log
			console.log("addEvent's ID is ", addEvent.EventID);//Test log
		}

		// testEventID= data.Items[0].EventID.S;
		// console.log(testEventID); //Tests the EventID became a string

		
    	document.getElementById("TEST").innerHTML = testEventID;



		//MAKE SURE TYPE IS S OR N FOR STRING OR NUMBER
		//MAKE ARRAY OF GLOBAL OBJECTS TO PRINT TO EVENTS TABLE
	}
});

function createEvents() {

}