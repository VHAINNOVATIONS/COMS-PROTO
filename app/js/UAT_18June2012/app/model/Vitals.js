Ext.define("COMS.model.Vitals", {
	extend: "Ext.data.Model",
	fields: [
			"PatientID",			// GUID for the Patient
            "Height",
            "Weight",
            "BP",
			"Diastolic",
			"Systolic",
            "WeightFormula",
            "BSA_Method",
            "BSA",
            "BSA_Weight",
            "DateTaken",
            "Temperature",
            "TemperatureLocation",
            "Pulse",
            "Respiration",
            "Pain",
            "SPO2",
            "Cycle",
            "Day",
            "PS",
            "Age",
            "Gender",
			"PS_ID"				// MWB - 6/21/2012 - Added so we can save the PS if passed
	],
	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.Vitals,
			update: Ext.URLs.Vitals,
			create: Ext.URLs.Vitals
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty: "msg"
		}
	}
});
