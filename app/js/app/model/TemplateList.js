/***/
Ext.define("COMS.model.TemplateListPatients", {
	"extend" : "Ext.data.Model",
	"fields" : [
		"Patient_ID",
		"Date_Started",
		"Est_End_Date",
		"First_Name",
		"Last_Name",
		"Name",
		"SSID"
	],
	"belongsTo" : ["COMS.model.TemplateList", "COMS.model.CTOS" ]
});
/***/
Ext.define("COMS.model.TemplateList", {
	"extend" : "Ext.data.Model",
	"fields" : [ "name", "id", "regimenId", "description", "DiseaseName", "DiseaseStageName", "Patients", "PatientCount", "Location" ],
	"hasMany" : { "model" : "COMS.model.TemplateListPatients", "name" : "Patients" }
});
