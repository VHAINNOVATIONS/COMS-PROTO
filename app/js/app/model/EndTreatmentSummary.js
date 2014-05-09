Ext.define("COMS.model.EoTSVitals", {
	extend: "Ext.data.Model",
	fields: [
		"DateTaken",
		"Height",
		"Weight",
		"BP",
		"Temperature",
		"Pain",
		"Pulse",
		"Respiration",
		"SPO2",
		"WeightFormula",
		"BSA_Weight",
		"BSA_Method",
		"BSA",
		"PSID",
		"PS"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSAllergies", {
	extend: "Ext.data.Model",
	fields: [
		"name",
		"type",
		"comment"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSAmputations", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSMedAdmin", {
	extend: "Ext.data.Model",
	fields: [
		"day", "date", "dosage"
	],
	belongsTo : "COMS.model.EoTSMeds"
});
Ext.define("COMS.model.EoTSMeds", {
	extend: "Ext.data.Model",
	fields: [
		"name", "administered"
	],
	hasMany : [
		{ model : "COMS.model.EoTSMeds", name : "administered" }
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSResponses", {
	extend: "Ext.data.Model",
	fields: [
		"day", "date", "desc"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EndTreatmentSummary", {
	extend: "Ext.data.Model",
	fields: [
		"Name",
		"PatientID",			// GUID for the Patient
		"PAT_ID",
		"Gender",
		"Age",
		"DOB",
		"Amputations",
		"ClinicalTrial",
		"Allergies",
		"TemplateName",
		"TemplateID",
		"TemplateDescription",
		"TreatmentStatus",
		"TreatmentStart",
		"TreatmentEnd",
		"Vitals",
		"EndReason",
		"ProviderReport",
		"FollowUpAppointments",

		"Meds",
		"DiseaseResponse",
		"Toxicity",
		"Other"
	],

	hasMany : [
		{ model : "COMS.model.EoTSVitals", name : "Vitals" },
		{ model : "COMS.model.EoTSAllergies", name : "Allergies" },
		{ model : "COMS.model.EoTSAmputations", name : "Amputations" },
		{ model : "COMS.model.EoTSMeds", name : "Meds" },
		{ model : "COMS.model.EoTSResponses", name : "DiseaseResponse" },
		{ model : "COMS.model.EoTSResponses", name : "Toxicity" },
		{ model : "COMS.model.EoTSResponses", name : "Other" }
	],
	
	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.EoTS,
			create: Ext.URLs.EoTS,
			update: Ext.URLs.EoTS
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty: "msg"
		}
	}
});
