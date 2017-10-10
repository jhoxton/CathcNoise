
// function printEvents(eventList) //This will be the function that takes data from the Dynamo DB and writes it to the webpage
// {
//     //This just prints the current time and date
//     // var date = new Date();
//     // var n = date.toDateString();
//     // var time = date.toLocaleTimeString();

//     // var id = document.getElementById('id').value; // This will be the device ID
//     // var db = document.getElementById('db').value; //This will be the recorded volume
//     // var time =document.getElementById('time').value; //This is just a "print string" function for the date tab. Probably won't need it
//     // var time = date; //This just prints the current time and date
    
//     var table = document.getElementsByTagName('table')[0];
//     var newRow = table.insertRow(1);
//     var cel1 = newRow.insertCell(0);
//     var cel2 = newRow.insertCell(1);
//     var cel3 = newRow.insertCell(2);
//     cel1.innerHTML = id;
//     cel2.innerHTML = db;
//     cel3.innerHTML = time;
// }
var counter = 0;




function printEvents(eventList) { //This is a test function to check the data copied correctly 

	 
    // for (var i = 0; i < eventList.length; i++) {

    //                       console.log("=================================")
    //         console.log("Passed eventList EventID in main JS page = ",  loopEvent.EventID);
    //         console.log("Passed eventList Time in main JS page= ", loopEvent.Timestamp);
    //         // console.log("Passed eventList Source in main JS page= ", eventList.SourceType);
    //         // console.log("Passed  eventList db in main JS page= ", loopEvent.dB_level);


    //         //TESTING
    //         // console.log("=================================")
    //         // console.log("Passed eventList EventID in main JS page = ", eventList[i].EventID);
    //         // console.log("Passed eventList Time in main JS page= ", eventList[i].Timestamp);
    //         // console.log("Passed eventList Source in main JS page= ", eventList[i].SourceType);
    //         // console.log("Passed  eventList db in main JS page= ", eventList[i].dB_level);

    //         // document.getElementById("idPrint").innerHTML = loopEvent.EventID;
    //         // document.getElementById("timeStampPrint").innerHTML = loopEvent.TimeStamp;
    //         // document.getElementById("typePrint").innerHTML = loopEvent.SourceType;
    //         // document.getElementById("dbPrint").innerHTML = loopEvent.dB_level;

           

    // };
}

// window.onLoad = updateNotif(newEvent);
// var newEvent = true; //When a new notification arrives, this will become true



function updateNotif(newEvent) { //If true, display new notif
    // if (newEvent = true) {
    // 	document.getElementById("imgNotifId").src ="images/notifTest.png";
    // } else {
    // 	document.getElementById("imgNotifId").src ="images/notif.png";
    // }
}

 