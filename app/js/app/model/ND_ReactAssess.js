// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_ReactAssess", {
	extend: "Ext.data.Model",
	fields: [
		"patientId",	// GUID for the Patient
		"DateTaken",	// Date and Timestamp of when this record was saved

		// Chemotherapy Reaction
		"Adverse",		// true/false
		"Comments"
	],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_ReactionAssessment,
                create: Ext.URLs.AddND_ReactionAssessment
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});


Ext.define("COMS.model.ND_ReactAssessXtrav", {
	extend: "Ext.data.Model",
	fields: [
		"patientId",	// GUID for the Patient
		"DateTaken",	// Date and Timestamp of when this record was saved

		// Extravasation
		"ND_RA_Xtrav_Heating",			// true/false
		"ND_RA_Xtrav_HeatFreq",
		"ND_RA_Xtrav_Cooling",			// true/false
		"ND_RA_Xtrav_CoolFreq",
		"ND_RA_Xtrav_Interventions",	// true/false
		"ND_RA_Xtrav_Interventions",
		"ND_RA_Xtrav_Antidotes",		// true/false
		"ND_RA_Xtrav_AntidotesGiven",
		"ND_RA_Xtrav_Measurements",		// true/false
		"ND_RA_Xtrav_MeasurementsTaken",
		"ND_RA_Xtrav_Edema",			// true/false
		"ND_RA_Xtrav_Erythema",			// true/false
		"ND_RA_Xtrav_Discomfort",		// true/false
		"ND_RA_Xtrav_DiscomfortDesc"
	],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_ReactionAssessmentXtrav,
                create: Ext.URLs.AddND_ReactionAssessmentXtrav
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});









Ext.define("COMS.model.ND_ReactAssessCRSyndrome", {
	extend: "Ext.data.Model",
	fields: [
		"patientId",				// GUID for the Patient
		"DateTaken",	// Date and Timestamp of when this record was saved

		// Cytokine-Release Syndrome
		"ND_RA_CRS_Fever",			// true/false
		"ND_RA_CRS_Temperature",
		"ND_RA_CRS_Chills",			// true/false
		"ND_RA_CRS_Rigors",			// true/false
		"ND_RA_CRS_Nausea",			// true/false
		"ND_RA_CRS_Hypotension",	// true/false
		"ND_RA_CRS_BP",
		"ND_RA_CRS_Tachycardia",	// true/false
		"ND_RA_CRS_Pulse", 
		"ND_RA_CRS_Asthenia",		// true/false
		"ND_RA_CRS_Headache",		// true/false
		"ND_RA_CRS_Rash",			// true/false
		"ND_RA_CRS_RashDesc",
		"ND_RA_CRS_TongueEdema",	// true/false
		"ND_RA_CRS_Dyspnea"			// true/false
	],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_ReactionAssessmentCRS,
                create: Ext.URLs.AddND_ReactionAssessmentCRS
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});









Ext.define("COMS.model.ND_ReactAssessHorA", {
	extend: "Ext.data.Model",
	fields: [
		"patientId",					// GUID for the Patient
		"DateTaken",	// Date and Timestamp of when this record was saved

		// Hypersensitivity_Anaphylaxis
		"ND_RA_HorA_Agitation",			// true/false
		"ND_RA_HorA_ChestTight",		// true/false
		"ND_RA_HorA_Hypotension",		// true/false
		"ND_RA_HorA_BP",
		"ND_RA_HorA_Dyspnea",			// true/false
		"ND_RA_HorA_Wheezing",			// true/false
		"ND_RA_HorA_Urticaria",			// true/false
		"ND_RA_HorA_PeriorbitalEdema",	// true/false
		"ND_RA_HorA_AbdominalCramping",	// true/false
		"ND_RA_HorA_Diarrhea",			// true/false
		"ND_RA_HorA_Nausea"				// true/false
	],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_ReactionAssessmentHorA,
                create: Ext.URLs.AddND_ReactionAssessmentHorA
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
