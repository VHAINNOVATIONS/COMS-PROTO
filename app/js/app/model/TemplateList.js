Ext.define("COMS.model.TemplateListPatients", {
	"extend" : "Ext.data.Model",
	"fields" : [
		"Patient_ID",
		"Date_Started",
		"First_Name",
		"Last_Name",
		"Name",
		"SSID"
	],
	"belongsTo" : "COMS.model.TemplateList"
});

Ext.define("COMS.model.TemplateList", {
	"extend" : "Ext.data.Model",
	"fields" : [
		{ "name" : "name", "type" : "string" },
		{ "name" : "id", "type" : "string" },
		{ "name" : "regimenId", "type" : "string" },
		{ "name" : "description", "type" : "string" },
		{ "name" : "DiseaseName", "type" : "string" },
		{ "name" : "DiseaseStageName", "type" : "string" },
		{ "name" : "Patients" },
		{ "name" : "PatientCount", "type" : "string" }
	],
	"hasMany" : { "model" : "COMS.model.TemplateListPatients", "name" : "Patients" }
});
