Ext.define("COMS.model.PatientInfoMDWSDiseases", {
	extend: "Ext.data.Model",
	fields: [
		"Type",
		"Stage"
	],
	belongsTo : "COMS.model.PatientInfoMDWS"
});

/**********
Ext.define("COMS.model.PatientInfoMDWSMeasurements", {
	extend: "Ext.data.Model",
	fields: [
		"Height",
		"Weight",
		"BP",
		"DateTaken",
		"WeightFormula",
		"BSA_Method",
		"BSA_Weight",
		"BSA"
	],
	belongsTo : "COMS.model.PatientInfoMDWS"
});
************/

Ext.define("COMS.model.PatientInfoAmputee", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.PatientInfo"
});

Ext.define("COMS.model.PatientInfoMDWS", {
	extend: "Ext.data.Model",
	idProperty : "id",
	fields: [
		"id",
		"name",
		"DOB",
		"Gender",
		"Age",
		// "Measurements",		// Array of measurements
		"DFN",				// Data File Name which links to MDWS
		"Disease",			// Array of diseases

		"TemplateName",		// Info on the currently active template
		"TemplateDescription",
		"TemplateID",
		"TreatmentStart",
        "TreatmentEnd",
		"TreatmentStatus",

		"Amputations",
		"message"			// Used in case an error message is returned from the framework
	],

	hasMany : [
		{ model : "COMS.model.PatientInfoMDWSDiseases", name : "Disease" },
		{ model : "COMS.model.PatientInfoAmputee", name : "Amputations" }

//		{ model : "COMS.model.PatientInfoMDWSMeasurements", name : "Measurements" }
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.MDWSMatch
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty: 'message'
		}
	}        
});