
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


// function checkArray(eventList) { //This method doesn't get called until "dbConnect" has loaded
//     for (var i = 0; i < eventList.length; i++) {

//         counter++;
//         console.log("counter = ", counter);



//         document.getElementById("idPrint").innerHTML = eventList[i].EventID;
//         document.getElementById("timeStampPrint").innerHTML = eventList[i].Timestamp;
//         document.getElementById("typePrint").innerHTML = eventList[i].SourceType;
//         document.getElementById("dbPrint").innerHTML = eventList[i].dB_level;
//     }



//     // var table = document.createElement("table");


//     // for (var i = 0; i < eventList.length; i++) {

//     //     var table = document.createElement("table");


//     //     var row = table.insertRow(0);


//     //     var idCell = row.insertCell(0);
//     //     var timeCell = row.insertCell(1);
//     //     var sourceCell = row.insertCell(2);
//     //     var dbCell = row.insertCell(3);



//     //     idCell.appendChild(document.createTextNode(eventList[i].EventID));
//     //     dbCell.appendChild(document.createTextNode(eventList[i].dB_level));
//     //     sourceCell.appendChild(document.createTextNode(eventList[i].SourceType));
//     //     timeCell.appendChild(document.createTextNode(eventList[i].Timestamp));



//     //     document.getElementById("SHIT").appendChild(table);


//     // }



// }


function printEvents(eventList) {

  
	 
    // for (var i = 0; i < eventList.length; i++) {

    //           var loopEvent = {
    //               EventID: "",
    //               Timestamp: "",
    //               SourceType: "",
    //               dB_level: ""
    //           };

    //           loopEvent.EventID = eventList[i].EventID.toString();
    //           loopEvent.Timestamp = eventList[i].Timestamp.toString();
    //           loopEvent.SourceType = eventList[i].SourceType.toString();
    //           loopEvent.dB_level =eventList[i].dB_level.toString();

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

  function table3() {
     // for(j =0; j <eventList.length; j++) {  

        // document.getElementById("idPrint").innerHTML = eventList[i].EventID;
       var obj = [{   //Try object as an Event item
           "key": "Event ID",
           "value": eventList.EventID
       }, {
           "key": "Time Stamp",
           "value": eventList.TimeStamp
       }, {
           "key": "dB Level",
           "value": eventList.SourceType
       }, {
           "key": "Type",
           "value": 'TYPE'
       }];

       // var globalCounter = 0;
       
       // var tbody = document.getElementById('tbody');

       // for (var i = 0; i < Object.keys(obj).length; i++) {
       //     var tr = "<tr>";
       //     if (obj[i].value.toString().substring(obj[i].value.toString().indexOf('.'), obj[i].value.toString().length) < 2) obj[i].value += "0";

       //     tr += "<td>" + obj[i].key + "</td>" + "<td>" + obj[i].value.toString() + "</td></tr>";
       //     tbody.innerHTML += tr;
       // }
       // }
 };
