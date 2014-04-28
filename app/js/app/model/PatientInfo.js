/************* OLD MODEL ************************
Ext.define('COMS.model.PatientInfo', {
	extend: 'Ext.data.Model',
	idProperty : 'id',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
		{ name: 'Height', type: 'string'},
		{ name: 'Weight', type: 'string'},
		{ name: 'Age', type: 'string'},
		{ name: 'DOB', type: 'string'},
		{ name: 'Gender', type: 'string'},
		{ name: 'Date', type: 'string'},
		{ name: 'BP', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs.Patients,
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
*****************************************************/
//
// MWB - 01/27/2012
// Major rewrite of the model due to changing the data coming back from the Web Service
//
Ext.define("COMS.model.PatientInfoDiseases", {
	extend: "Ext.data.Model",
	fields: [
		"Type",
		"Stage"
	],
	belongsTo : "COMS.model.PatientInfo"
});



Ext.define("COMS.model.PatientInfoAmputee", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.PatientInfo"
});

/***********
Ext.define("COMS.model.PatientInfoMeasurements", {
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
	belongsTo : "COMS.model.PatientInfo"
});
***************/

Ext.define("COMS.model.PatientInfo", {
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
		"PAT_ID",				// This is really the "Treatemen ID" but for now just using the existing SQL Field name.
		// "TreatmentID",		// ID of the record containing this Treatment. This ID acts as a link for all records for this treatment process.
		"TreatmentStart",
        "TreatmentEnd",
		"TreatmentStatus",
		"ClinicalTrial",

		"WeightFormula",
		"BSA_Method",
		"BSA_Weight",
		"BSA",
		"BSAFormula",

		"Amputations",
		"message"			// Used in case an error message is returned from the framework
	],

	hasMany : [
		{ model : "COMS.model.PatientInfoDiseases", name : "Disease" },
		{ model : "COMS.model.PatientInfoAmputee", name : "Amputations" }

		// ,{ model : "COMS.model.PatientInfoMeasurements", name : "Measurements" }
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Patients,
			update: Ext.URLs.SavePatient,
			create: Ext.URLs.SavePatient
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty: 'message'
		}
	}        
});