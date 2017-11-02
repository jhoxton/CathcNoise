function initUserPage() {
    console.log("Loading User Page");


    var deviceID = "V003" //THIS IS THE AWS COGNITO ID


    getEventsByDeviceID(deviceID, function(eventData) {

        extractEventsFromData(eventData);
    });
}

function extractEventsFromData(eventData) {
    console.log("Extracting Events...")
    var eventList = [];
    for (var i = 0; i < eventData.Items.length; i++) { //Loops over each event and prints the EventID

        var addEvent = {
            EventID: "",
            Timestamp: "",
            SourceType: "",
            dB_level: "",
            S3link: ""
        };


        addEvent.EventID = eventData.Items[i].EventID.S; //Adds the parameters to a the loopEvent
        addEvent.Timestamp = eventData.Items[i].Timestamp.S;
        addEvent.SourceType = eventData.Items[i].SourceType.S;
        addEvent.dB_level = eventData.Items[i].dB_level.N;
        addEvent.S3link = eventData.Items[i].S3link.S;

        eventList.push(addEvent); //Add to an array list of events


    }
    console.log(eventList);
    buildEventListItems(eventList)
}

function buildEventListItems(eventList) {
    for (var i = 0; i < eventList.length; i++) { //Loops eventList array and prints to table


        //     // MAKE SOMETHING THAT CREATES A NEW "TABLE SPACE/ROW" PER LOOP
        // console.log(eventList[i])
        var test = document.createElement("div");
        var idDiv = document.createElement("div");
        var timeDiv = document.createElement("div");
        var sourceDiv = document.createElement("div");
        var dbDiv = document.createElement("div");
        var audDiv = document.createElement("div");

        a = document.createElement('a'); // a.href =  'www.google.com';
        a.innerHTML = "Audio"
        audDiv.appendChild(a);

        idDiv.innerHTML = eventList[i].EventID; //THIS WORKS!
        timeDiv.innerHTML = eventList[i].Timestamp;
        sourceDiv.innerHTML = eventList[i].SourceType;
        dbDiv.innerHTML = eventList[i].dB_level;
        a.href = eventList[i].S3link;


        document.getElementById("idPrint").appendChild(idDiv);
        document.getElementById("timeStampPrint").appendChild(timeDiv);
        document.getElementById("typePrint").appendChild(sourceDiv);
        document.getElementById("dbPrint").appendChild(dbDiv);
        document.getElementById("audioPrint").appendChild(audDiv);

    };
}