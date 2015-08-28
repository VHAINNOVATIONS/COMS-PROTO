Ext.define("COMS.model.DrugRoutes", {
	"extend" : "Ext.data.Model",
	"fields" : [ "ien", "name", "code" ],
	"proxy" : {
		"type" : "rest",
		"url" : Ext.URLs.DrugRoutes,
		"reader" : {
			"type" : "json",
			"root" : "records"
		}
	}
});