Ext.define("COMS.model.ClinicInfo", {
	"extend" : "Ext.data.Model",
	"fields" : ["ID", "Label", "Details"],
	"proxy" : {
		"type" : "rest",
		"api" : {
			"read" : Ext.URLs.ClinicInfo,
			"update" : Ext.URLs.ClinicInfo,
			"destroy" : Ext.URLs.ClinicInfo,
			"create" : Ext.URLs.ClinicInfo
		},
		"reader" : {
			"type" : "json",
			"root" : "records",
			"successProperty" : "success",
			"messageProperty" : "message"
		}
	}
});