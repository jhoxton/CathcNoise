
function printEvents(eventList) //This will be the function that takes data from the Dynamo DB and writes it to the webpage
{
    //This just prints the current time and date
    // var date = new Date();
    // var n = date.toDateString();
    // var time = date.toLocaleTimeString();

    var id = document.getElementById('id').value; // This will be the device ID
    var db = document.getElementById('db').value; //This will be the recorded volume
    // var time =document.getElementById('time').value; //This is just a "print string" function for the date tab. Probably won't need it
    var time = date; //This just prints the current time and date
    var table = document.getElementsByTagName('table')[0];
    var newRow = table.insertRow(1);
    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    cel1.innerHTML = id;
    cel2.innerHTML = db;
    cel3.innerHTML = time;
}

function printEvents(eventList) {
	 // document.getElementById("TEST").innerHTML =eventList[0].EventID;//TEST ID PRINT
	 
    for (var i = eventList.length - 1; i >= 0; i--) {
        // console.log("JS, array's eventID is", eventList[i].EventID); //Prints eventID's in the arraylist
        //  console.log("JS, array's timeStamp is", eventList[i].TimeStamp);

        document.getElementById("id").innerHTML = eventList[i].EventID;
        document.getElementById("timeStamp").innerHTML = eventList[i].TimeStamp;
        document.getElementById("type").innerHTML = eventList[i].SourceType;
        document.getElementById("db").innerHTML = eventList[i].dB_level;

    };
}

window.onLoad = updateNotif(newEvent);
var newEvent = true; //When a new notification arrives, this will become true

function updateEvent() {
    //A function to check for a new notification
}

function updateNotif(newEvent) { //If true, display new notif
    // if (newEvent = true) {
    // 	document.getElementById("imgNotifId").src ="images/notifTest.png";
    // } else {
    // 	document.getElementById("imgNotifId").src ="images/notif.png";
    // }
}


// function openCity(evt, cityName) {
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }
//     document.getElementById(cityName).style.display = "block";
//     evt.currentTarget.className += " active";
// }

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();