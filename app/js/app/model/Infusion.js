Ext.define("COMS.model.Infusion", {
	"extend" : "Ext.data.Model",
	"fields" : [ "id", "name", "description" ],
	"proxy" : {
		"type" : "rest",
		"url " : Ext.URLs.Infusion,
		"reader" : {
			"type" : "json",
			"root" : "records"
		}
	}
});
