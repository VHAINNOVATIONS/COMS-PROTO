Ext.define("COMS.model.PatientTemplates", {
	extend: "Ext.data.Model",
	queryMode: "local",
	fields: [
		"id",
		"PatientID",
		"TemplateID",
		"DateApplied",
		"DateStarted",
		"DateEnded",
		"DateEndedActual",
		"Goal",
		"ConcurRadTherapy",
		"ClinicalTrial",
		"PerformanceStatus",
		"WeightFormula",
		"BSAFormula",
		"Amputations",
		"msg",
		"EotsID"
	],
	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.PatientTemplate,
			create: Ext.URLs.AddPatientTemplate,
			update: Ext.URLs.AddPatientTemplate
		},

		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty: "msg"
		}
	}
});