Ext.define("COMS.model.Drugs", {
	"extend" : "Ext.data.Model",
	"fields" : [ "id", "name", "description", "IEN" ],
	"proxy" : {
		"type" : "rest",
		"url" : Ext.URLs.Drugs,
		"reader" : {
			"type" : "json",
			"root" : "records"
		}
	}
});
