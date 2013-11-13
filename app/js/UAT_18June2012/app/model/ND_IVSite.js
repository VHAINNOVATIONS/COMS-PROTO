// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_IVSite", {
	extend: "Ext.data.Model",
	fields: [
		"PatientID",			// GUID for the Patient
		// IV Access Section
		"DateAccessed",
		"DeviceID",
		"DeviceName",
		"GaugeID",
		"GaugeName",
		"LocationID",
		"LocationName",
		"AccessComments",

		// Site Appearance Section
		"NoSymptoms",	// true/false
		"Pain",			// true/false
		"Swelling",		// true/false
		"Erythema",		// true/false
		"Disconnected",	// true/false
		"AppearanceComments",

		// Brisk blood return verified
		"PreTreatment",		// true/false/null
		"DuringTreatment",	// true/false/null
		"PostTreatment",	// true/false/null
		"BBRVComments"
	],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_IV_Site,
                create: Ext.URLs.AddND_IV_Site
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
