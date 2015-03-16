/***
 *
 *	Console Logging Code
 *
 **/
function wccConsoleLog(msg) { 
	/**
	var LogTag = Ext.getDom("LogInfo");
	if (LogTag) {
		if ("" !== LogTag.innerHTML){
			LogTag.innerHTML += "<br>";
		}
		LogTag.innerHTML += msg;
	}
	**/
}



/***
 *
 *	Google Analytics Code
 *
 **/
 /**
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-30444542-1']);
  _gaq.push(['_setDomainName', 'dbitpro.com']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
**/

/***
 *
 *	YUI Boomerang Analytics Code
 *
 **/
 /**
function extract_boomerang_data(o) {
	var resultsID = document.getElementById('results');
	if (resultsID) {
		var html = "<div>";

		if(o.t_done) { 
			html += "This page took " + o.t_done + "ms to load<br>"; 
		}
		if(o.bw) { 
			html += "Your bandwidth to this server is " + parseInt(o.bw/1024) + "kbps (&#x00b1;" + parseInt(o.bw_err*100/o.bw) + "%)<br>"; 
		}
		if(o.lat) { 
			html += "Your latency to this server is " + parseInt(o.lat) + "&#x00b1;" + o.lat_err + "ms<br>"; 
		}
		if(o.r) {
			html += "You came to this page from " + o.r + "<br>"; 
		}
		if(o.u) {
			html += "The current URI = " + o.u + "<br>"; 
		}
		html += "</div>";

		resultsID.innerHTML = html;
	}
	return true;
}

BOOMR.addVar("page_id", "Home");
BOOMR.subscribe('before_beacon', extract_boomerang_data );
BOOMR.init({
	beacon_url: "/libs/images/beacon-test.gif",
	BW : {
		base_url: "/libs/images/"
	}

});
**/