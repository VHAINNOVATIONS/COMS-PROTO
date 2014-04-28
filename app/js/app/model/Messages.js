Ext.define("COMS.model.Messages", {
	extend: "Ext.data.Model",
	fields: [ "mid", "MTo", "CC", "Subject", "Message", "Date", "MFrom", "rid", "wid", "dateSent", "OpenLink", "timeSent", "MStatus" ],
	proxy: {
		type: "rest",
		url : Ext.URLs.Messages,
		reader: {
			type: "json",
			root : "records"
		}
	}
});
