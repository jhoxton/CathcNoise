
	
	window.onLoad = updateNotif(newEvent);
	var newEvent = true;//When a new notification arrives, this will become true
	
	function updateEvent() {
	//A function to check for a new notification
	}
	
	function updateNotif(newEvent) {//If true, display new notif
		if (newEvent = true) {
			document.getElementById("imgNotifId").src ="images/notif.png";
		} else {
			document.getElementById("imgNotifId").src ="images/notif1.png";
		}
	}
	

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
