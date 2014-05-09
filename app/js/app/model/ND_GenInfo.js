// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_GenInfo", {
	extend: "Ext.data.Model",
	fields: [
			"patientId",			// GUID for the Patient
            "id",					// GUID for this record
			"date",					// Date assessment made
			"author",				// ID of person who entered this assessment record

			// Patient Identification section
			"patientIDGood",		// true/false/null - For the "Patient Identification verified..." field
			"consentGood",			// true/false/null - For the "Consent obtained" field
			"comment",				// String			- For the Comment Field in the Patient Identification section

			// Patient Teaching section
			"educationGood",		// true/false/null - "Education assessment complete" field
			"planReviewed"			// true/false/null - "Pre-Procedure plan reviewed..." field
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_GenInfo,
                create: Ext.URLs.AddND_GenInfo
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
