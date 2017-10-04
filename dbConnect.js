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
	var test;
// SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
dynamodb.scan(getAllEvents, function(err, data) {
	if (err) { 	
		console.log(err, err.stack);
	} else {

		test = data.Items[0].EventID;
		console.log(data, data.Items); //Checking data came across
		console.log(data.Items[0]);
		console.log(test);


		//MAKE SURE TYPE IS S OR N FOR STRING OR NUMBER
		//MAKE ARRAY OF GLOBAL OBJECTS TO PRINT TO EVENTS TABLE
	}
});





