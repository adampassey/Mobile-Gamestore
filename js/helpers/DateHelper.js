var DateHelper = {
	formatTime : function(unixTimestamp) {
	    var dt = new Date(unixTimestamp * 1000);
	
	    var hours = dt.getHours();
	    var minutes = dt.getMinutes();
	    var seconds = dt.getSeconds();

	    if (hours < 10) 
	     hours = '0' + hours;
	
	    if (minutes < 10) 
	     minutes = '0' + minutes;
	
	    if (seconds < 10) 
	     seconds = '0' + seconds;
	
	    return hours + ":" + minutes + ":" + seconds;
	}
};   