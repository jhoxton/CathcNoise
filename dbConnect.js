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
        'dB_level',
        'S3link'
    ]

};

var loopEvent = {
    EventID: "",
    Timestamp: "",
    SourceType: "",
    dB_level: "",
    S3link: ""
};

var eventList = [];
var audio = ("Audio");


dynamodb.scan(getAllEvents, function(err, data) { // SCAN FUNCTION GETS ALL ITEMS IN ENTIRE TABLE
    if (err) {
        console.log(err, err.stack);
    } else {
        // console.log("db input =", data.dB_level);
        for (var i = 0; i < data.Items.length; i++) { //Loops over each event and prints the EventID

            var addEvent = {
                EventID: "",
                Timestamp: "",
                SourceType: "",
                dB_level: "",
                S3link: ""
            };


            // // TESTING BLOCK FOR DIRECT DB ITEMS
            // console.log("ITEMS Event = ", data.Items[i].EventID.S);
            // console.log("ITEMS Time = ", data.Items[i].Timestamp.S);
            // console.log("ITEMS Source = ", data.Items[i].SourceType.S);
            // console.log("ITEMS db = ", data.Items[i].dB_level.N);
            // console.log("ITEM S3 =", data.Items[i].S3link.S);

            addEvent.EventID = data.Items[i].EventID.S; //Adds the parameters to a the loopEvent
            addEvent.Timestamp = data.Items[i].Timestamp.S;
            addEvent.SourceType = data.Items[i].SourceType.S;
            addEvent.dB_level = data.Items[i].dB_level.N;
            addEvent.S3link = data.Items[i].S3link.S;



            // console.log("=================================")
            // console.log("LOOPEVENT Event = ", loopEvent.EventID);
            // console.log("LOOPEVENT Time = ", loopEvent.Timestamp);
            // console.log("LOOPEVENT Source = ", loopEvent.SourceType);
            // console.log("LOOPEVENT db = ", loopEvent.dB_level);
            // console.log("LOOPEVENT S3 =", loopEvent.S3link);
            // console.log("=================================")


            //TESTING BLOCK FOR EVENT IN LOOP ITEMS
            // console.log("ADDEVENT Event = ", addEvent.EventID);
            // console.log("ADDEVENT Time = ", addEvent.Timestamp);
            // console.log("ADDEVENT Source = ", addEvent.SourceType);
            // console.log("ADDEVENT db = ", addEvent.dB_level);
            // console.log("=================================")

            eventList.push(addEvent); //Add to an array list of events


            // console.log("Array is ", eventList.length, "long"); //CHECK ARRAY LENGTH

            // TESTING BLOCK TO LOOP OVER THE ARRAY
            // for (var j = eventList.length - 1; j >= 0; j--) { //TESTING LOOP
            //     console.log("=================================")
            //     console.log("Passed eventList Event = ", eventList[j].EventID);
            //     console.log("Passed eventList Time = ", eventList[j].Timestamp);
            //     console.log("Passed eventList Source = ", eventList[j].SourceType);
            //     console.log("Passed  eventList db = ", eventList[j].dB_level);
            //     console.log("Passed array is ", eventList.length, "long"); };

        }

        

    }
   sortList(eventList);


});

function sortList(eventList) { //Orders list in eventId order MAKE ONE FOR TIMESTAMP SORTING

    eventList.sort(function(a,b){
        var idA = a.EventID.toLowerCase(), idB= b.EventID.toLowerCase()
        if (idA < idB)
            return -1
        if (idA > idB)
            return 1
        return 0
    })

     populateList(eventList);

}

function populateList(eventList) {
    for (var i = 0; i < eventList.length; i++) { //Loops eventList array and prints to table


        //     // MAKE SOMETHING THAT CREATES A NEW "TABLE SPACE/ROW" PER LOOP

            var idDiv = document.createElement("div");
            var timeDiv = document.createElement("div");
            var sourceDiv = document.createElement("div");
            var dbDiv = document.createElement("div");
            var audDiv = document.createElement("div");
            
            a = document.createElement('a');  // a.href =  'www.google.com';
            a.innerHTML = "Audio"
            audDiv.appendChild(a);

            idDiv.innerHTML = eventList[i].EventID; //THIS WORKS!
            timeDiv.innerHTML = eventList[i].Timestamp;
            sourceDiv.innerHTML = eventList[i].SourceType;
            dbDiv.innerHTML = eventList[i].dB_level;
            a.href =  eventList[i].S3link;

            document.getElementById("idPrint").appendChild(idDiv);
            document.getElementById("timeStampPrint").appendChild(timeDiv);
            document.getElementById("typePrint").appendChild(sourceDiv);
            document.getElementById("dbPrint").appendChild(dbDiv);
            document.getElementById("audioPrint").appendChild(audDiv);


            //TESTING LOOP
            // console.log("=================================")
            // console.log("Passed eventList EventID in main JS page = ", eventList[i].EventID);
            // console.log("Passed eventList Time in main JS page= ", eventList[i].Timestamp);
            // console.log("Passed eventList Source in main JS page= ", eventList[i].SourceType);
            // console.log("Passed  eventList db in main JS page= ", eventList[i].dB_level);
            // console.log("Passed  eventList db in main JS page= ", eventList[i].S3link);




        };
}
