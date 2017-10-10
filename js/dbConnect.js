var dynamodb = new AWS.DynamoDB({
    region: "ap-southeast-2",
    accessKeyId: CONFIG.AWS_ACCESS_KEY,
    secretAccessKey: CONFIG.AWS_SECRET_KEY
});

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


dynamodb.scan(getAllEvents, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
    if (err) {
        console.log(err, err.stack);
    } else {
        // console.log("db input =", data.dB_level);
        for (var i = 0; i <data.Items.length; i ++) { //Loops over each event and prints the EventID
             // for (var i = data.Items.length - 1; i >= 0; i--) { //Loops over each event and prints the EventID OLD LOOP
            var addEvent = {
                EventID: "",
                Timestamp: "",
                SourceType: "",
                dB_level: ""
            };

            addEvent.EventID = data.Items[i].EventID.S; //Adds the parameters to a the loopEvent
            
            
              
                                //Test print to TimeStamp on home page (direct from Dynamo DB object)
                                 // document.getElementById("timeStampPrint").innerHTML = data.Items[i].Timestamp.S; //This works, the others (once its an array object, don't)
   
            addEvent.Timestamp = data.Items[i].Timestamp.S;

                              //Test print to ID div on home page (from addEvent)
                                // document.getElementById("idPrint").innerHTML = addEvent.Timestamp; //OK, now for some reason this does work

            addEvent.SourceType = data.Items[i].SourceType.S;
            addEvent.dB_level = data.Items[i].dB_level.N;

            
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


            // addEvent.EventID = loopEvent.EventID;
            // addEvent.Timestamp = loopEvent.Timestamp;
            // addEvent.SourceType = loopEvent.SourceType;
            // addEvent.dB_level = loopEvent.dB_level;


            // console.log("ADDEVENT Event = ", addEvent.EventID);
            // console.log("ADDEVENT Time = ", addEvent.Timestamp);
            // console.log("ADDEVENT Source = ", addEvent.SourceType);
            // console.log("ADDEVENT db = ", addEvent.dB_level);
            // console.log("=================================")

            eventList.push(addEvent);//Add to an array list of events

            
            // console.log("Array is ", eventList.length, "long"); //CHECK ARRAY LENGTH

            // for (var j = eventList.length - 1; j >= 0; j--) { //TESTING LOOP
                // TESTING
            //     console.log("=================================")
            //     console.log("Passed eventList Event = ", eventList[j].EventID);
            //     console.log("Passed eventList Time = ", eventList[j].Timestamp);
            //     console.log("Passed eventList Source = ", eventList[j].SourceType);
            //     console.log("Passed  eventList db = ", eventList[j].dB_level);

            //     // eventList.push(addEvent);
            //     console.log("Passed array is ", eventList.length, "long");

            // };

        }
        for (var i = 0; i < eventList.length; i++) { //Test

 

            // TESTING
            //console.log("=================================")
            // console.log("Passed eventList EventID in main JS page = ",  loopEvent.EventID);
            // console.log("Passed eventList Time in main JS page= ", loopEvent.Timestamp);
            // console.log("Passed eventList Source in main JS page= ", eventList.SourceType);
            // console.log("Passed  eventList db in main JS page= ", loopEvent.dB_level);

                                                    //Test print to DB Level on home page (from the eventList)
                                                    document.getElementById("typePrint").innerHTML = eventList[i].Timestamp; //Alright, it works, in the method

            var idDiv = document.createElement("div");
            // div.style.width = "100px";
            // div.style.height = "100px";
            // div.style.background = "red";
            // div.style.color = "white";

            // div.innerHTML = "Hello";
             idDiv.innerHTML =  eventList[i].EventID; //THIS WORKS!

            document.getElementById("import").appendChild(idDiv);

            //TESTING
            // console.log("=================================")
            // console.log("Passed eventList EventID in main JS page = ", eventList[i].EventID);
            // console.log("Passed eventList Time in main JS page= ", eventList[i].Timestamp);
            // console.log("Passed eventList Source in main JS page= ", eventList[i].SourceType);
            // console.log("Passed  eventList db in main JS page= ", eventList[i].dB_level);

            // document.getElementById("idPrint").innerHTML = loopEvent.EventID;
            // document.getElementById("timeStampPrint").innerHTML = loopEvent.TimeStamp;
            // document.getElementById("typePrint").innerHTML = loopEvent.SourceType;
            // document.getElementById("dbPrint").innerHTML = loopEvent.dB_level;

           

        };
    }
    printEvents(eventList);
    // checkArray(eventList);
});


