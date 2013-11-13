// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.Assessment", {
	extend: "Ext.data.Model",
	fields: [
		"sequence",			// The order that this record is to be displayed (fatigue = 1, anorexia = 2, nauesa = 3, vomiting = 4, diarrhea = 5 all others as neeeded
		"fieldLabel",		// The label for the assessment: "fatigue", "Anorexia", "Nausea", etc 
							// Note: the Label should be stored in the Lookup Table and a GUID to that label value stored in the SQL Record for the entries
							// We need the actual label string here so a lookup will need to be done on the SQL side before sending the data to this object
		"choice",			// The value chosen for this assessment: true, false, null 
		"comments",			// The user entered comments
		"levelChosen"		// The level of the Assessment: 1, 2, 3, 4 etc based on the type of assessment
	],
	belongsTo : "COMS.model.ND_Assessment"
});


Ext.define("COMS.model.ND_Assessment", {
	extend: "Ext.data.Model",
	fields: [
			"PatientID",			// GUID for the Patient
            "id",					// GUID for this record
			"date",					// Date assessment made
			"author",				// ID of person who entered this assessment record
            "assessmentDetails"		// Array of Assessment data, uses the "hasMany" object below;
    ],
    hasMany : [
            { model : "COMS.model.Assessment", name : "assessmentDetails" }
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_Assessment,
                create: Ext.URLs.AddND_Assessment
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
