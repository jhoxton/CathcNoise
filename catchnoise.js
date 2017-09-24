function addEvent() //This will be the function that takes data from the Dynamo DB and writes it to the webpage
	{
		//This just prints the current time and date
		var date = new Date();
		var n = date.toDateString();
		var time = date.toLocaleTimeString();
		var id =document.getElementById('id').value;// This will be the device ID
		var db =document.getElementById('db').value; //This will be the recorded volume
		// var time =document.getElementById('time').value; //This is just a "print string" function for the date tab. Probably won't need it
		var time =date; //This just prints the current time and date
		var table = document.getElementsByTagName('table') [0];
		var newRow = table.insertRow(1);
		var cel1 = newRow.insertCell(0);
		var cel2 = newRow.insertCell(1);
		var cel3 = newRow.insertCell(2);
		cel1.innerHTML = id;
		cel2.innerHTML = db;
		cel3.innerHTML = time;
	}
	
	
	
function openlink(evt, linkName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(linkName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
