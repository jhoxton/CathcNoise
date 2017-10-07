var dynamodb = new AWS.DynamoDB({
    region: "ap-southeast-2",
    accessKeyId: CONFIG.AWS_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_SECRET_KEY
});


//FOR TESTING AWS CONNECT
// var getEventTableInfo = {
//  TableName: "Events"
// };


// dynamodb.describeTable(getEventTableInfo, function(err, data) {
//  if (err) {  
//      console.log(err, err.stack);
//  } else {
//      console.log(data);
//  }
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


// var testEventID;

dynamodb.scan(getAllEvents, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
    if (err) {
        console.log(err, err.stack);
    } else {
        // console.log("db input =", data.dB_level);
        for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID
            var addEvent = {
                EventID: "",
                Timestamp: "",
                SourceType: "",
                dB_level: ""
            };
            loopEvent.EventID = data.Items[i].EventID.S; //Adds the parameters to a the loopEvent
            loopEvent.Timestamp = data.Items[i].Timestamp.S;
            loopEvent.SourceType = data.Items[i].SourceType.S;
            loopEvent.dB_level = data.Items[i].dB_level.N;

            // TESTING BLOCK

            // console.log("ITEMS Event = ", data.Items[i].EventID.S);
            // console.log("ITEMS Time = ", data.Items[i].Timestamp.S);
            // console.log("ITEMS Source = ", data.Items[i].SourceType.S);
            //   console.log("ITEMS db = ", data.Items[i].dB_level.S);
            // console.log("=================================")
            // console.log("LOOPEVENT Event = ", loopEvent.EventID);
            // console.log("LOOPEVENT Time = ", loopEvent.Timestamp);
            // console.log("LOOPEVENT Source = ", loopEvent.SourceType);
            // console.log("LOOPEVENT db = ", loopEvent.dB_level);
            // console.log("=================================")

            // var addEvent = loopEvent; //Only one event is being added to the arraylist
            //MAYBE TRY WITH i IN THE ABOVE????
            addEvent.EventID = loopEvent.EventID;
            addEvent.Timestamp = loopEvent.Timestamp;
            addEvent.SourceType = loopEvent.SourceType;
            addEvent.dB_level = loopEvent.dB_level;


            console.log("ADDEVENT Event = ", addEvent.EventID);
            console.log("ADDEVENT Time = ", addEvent.Timestamp);
            console.log("ADDEVENT Source = ", addEvent.SourceType);
            console.log("ADDEVENT db = ", addEvent.dB_level);
            console.log("=================================")

            eventList.push(addEvent);
            console.log("Array is ", eventList.length, "long");
            for (var j = eventList.length - 1; j >= 0; j--) {

                console.log("=================================")
                console.log("Passed eventList Event = ", eventList[j].EventID);
                console.log("Passed eventList Time = ", eventList[j].Timestamp);
                console.log("Passed eventList Source = ", eventList[j].SourceType);
                console.log("Passed  eventList db = ", eventList[j].dB_level);


                // eventList.push(addEvent);
                console.log("Passed array is ", eventList.length, "long");

                // document.getElementById("id").innerHTML = eventList[i].EventID;
                // document.getElementById("timeStamp").innerHTML = eventList[i].TimeStamp;
                // document.getElementById("type").innerHTML = eventList[i].SourceType;
                // document.getElementById("db").innerHTML = eventList[i].dB_level;

            };

        }



        //MAKE SURE TYPE IS S OR N FOR STRING OR NUMBER
        //MAKE ARRAY OF GLOBAL OBJECTS TO PRINT TO EVENTS TABLE
    }
    checkArray(eventList);
});

