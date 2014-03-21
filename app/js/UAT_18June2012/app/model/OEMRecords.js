// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define("COMS.model.OEMRecordsTherapy", {
    extend: "Ext.data.Model",
    fields: [
		"id",
		"Instructions",
		"Med",
		"AdminTime",
        "Status",       // MWB - 3/20/2014 - Used for flagging a medication as cancelled or on hold

		"Order_ID",		// MWB - 7/2/2012 - New Data for Orders
		"Dose",
		"BSA_Dose",
		"DoseUnits",
		"AdminMethod",

		"FluidType",
		"FluidVol",
		"FlowRate",
		"InfusionTime"
	],
	belongsTo : "COMS.model.OEMRecord"
});


Ext.define("COMS.model.OEMRecordsPrePostTherapy", {
    extend: "Ext.data.Model",
    fields: [
			"id",
			"Instructions",
			"Med",
			"AdminTime",
            "Status",       // MWB - 3/20/2014 - Used for flagging a medication as cancelled or on hold

			"Order_ID",		// MWB - 7/2/2012 - New Data for Orders
			"Dose1",
			"BSA_Dose1",
			"DoseUnits1",
			"AdminMethod1",

			"FluidType1",
			"FluidVol1",
			"FlowRate1",
			"InfusionTime1",

			"Dose2",
			"BSA_Dose2",
			"DoseUnits2",
			"AdminMethod2",

			"FluidType2",
			"FluidVol2",
			"FlowRate2",
			"InfusionTime2"
	],
	belongsTo : "COMS.model.OEMRecord"
});
Ext.define("COMS.model.OEMRecord", {
    extend: "Ext.data.Model",
    fields: [
            "id",					// GUID for this record
			"Cycle",
			"Day",
			"AdminDate",
			"PreTherapyInstr",
			"TherapyInstr",
			"PostTherapyInstr",
			"PreTherapy",
			"Therapy",
			"PostTherapy"
    ],
    hasMany : [
            { model : "COMS.model.OEMRecordsPrePostTherapy", name : "PreTherapy" },
            { model : "COMS.model.OEMRecordsPrePostTherapy", name : "PostTherapy" },
            { model : "COMS.model.OEMRecordsTherapy", name : "Therapy" }
    ],
	belongsTo : "COMS.model.OEMRecords"
});



Ext.define("COMS.model.OEMRecords", {
    extend: "Ext.data.Model",
	fields : [
		"id",							// ID of this particular OEM Record

        "FNRisk",						// Febrile Neutropenia Risk (%)
        "NeutropeniaRecommendation",	// Recommendation for now can be blank

        "ELevelName",					// Emotegenic Level string (e.g. Low (10% - 30%)), taken from Lookup Table
        "ELevelID",						// ID of the ELevel string taken from Lookup Table
        "ELevelRecommendationASCO",		// ASCO Recommendation taken from new table (see "MWB 17 Feb 2012" comment in controller\OEM.js)
        "ELevelRecommendationNCCN",		// NCCN Recommendation taken from new table (see "MWB 17 Feb 2012" comment in controller\OEM.js)

		"Goal",							// Goal of this Treatment Regimen
		"ClinicalTrial",				// Is this a clinical trial (true/false)
		"TrialType",					// If this IS a clinical trial, then this is a string
		"PerformanceStatus",			// Performance Status


		"numCycles",					// Number of Cycles
		"AdminDaysPerCycle",			// # of Admin Days in any given cycle
		"OEMRecords"					// All the OEM Records.
	],
	hasMany : [ { model : "COMS.model.OEMRecord", name : "OEMRecords" } ],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.OEMRecords
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success",
			messageProperty : "msg"
        }
    }
});
