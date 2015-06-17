Ext.define("COMS.model.LookupTable", {
	"extend" : "Ext.data.Model",
	"fields" : [ "id", "value", "description", "lookupid" ],
	"proxy" : {
		"type" : "rest",
		"api" : {
			"read" : Ext.URLs.Lookups,
			"update" : Ext.URLs.AddLookup,
			"destroy" : Ext.URLs.DeleteLookup,
			"create" : Ext.URLs.AddLookup
		},
		"reader" : {
			"type" : "json",
			"root" : "records",
			"successProperty" : "success",
			"messageProperty" : "message"
		}
	}
});
