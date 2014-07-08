// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define("COMS.model.FlowSheetMed", {
    extend: "Ext.data.Model",
    fields: [
		"id",
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"Drug",
		"AdministeredDose"
	],
	belongsTo : "COMS.model.FlowsheetAdminDay"
});


Ext.define("COMS.model.FlowSheetLab", {
	extend: "Ext.data.Model",
	fields: [
		"id",
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"Name",
		"Data"
	],
	belongsTo : "COMS.model.FlowsheetAdminDay"
});



Ext.define("COMS.model.FlowsheetAdminDay", {
    extend: "Ext.data.Model",
	fields : [
		"id",							// ID of this particular Flowsheet Admin Day Record
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"PS",
		"PSID",
		"Weight",
		"DiseaseResponse",
		"Toxicity",
		"ToxicityLU_ID",
		"Other",
		"Labs",
		"PreTherapy",
		"Therapy",
		"PostTherapy"
	],
	hasMany : [ 
		{ model : "COMS.model.FlowSheetLab", name : "Labs" },
		{ model : "COMS.model.FlowSheetMed", name : "PreTherapy" },
		{ model : "COMS.model.FlowSheetMed", name : "Therapy" },
		{ model : "COMS.model.FlowSheetMed", name : "PostTherapy" }
	],
	belongsTo : "COMS.model.Flowsheet"
});


//
Ext.define("COMS.model.Flowsheet", {
    extend: "Ext.data.Model",
	fields : [
		"PAT_ID",				// GUID for the Treatment record
		"FlowsheetAdminDay"
	],
	hasMany : [ 
		{ model : "COMS.model.FlowsheetAdminDay", name : "FlowsheetAdminDay" }
	],

    proxy: {
        type: "rest",
        api: {
			read: Ext.URLs.FlowSheetRecords,
			create: Ext.URLs.AddFlowSheetRecords,
			update: Ext.URLs.AddFlowSheetRecords
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success",
			messageProperty : "msg"
        }
    }
});
