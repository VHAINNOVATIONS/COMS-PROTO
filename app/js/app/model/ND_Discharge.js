Ext.define("COMS.model.ND_D_Instructions", {
	extend: "Ext.data.Model",
	fields: [
		"InstructionID",	// GUID - list of possible instructions stored in the Lookup Table
		"InstructionText"	// Text label for an instruction, to be displayed in a DropDown
	],
	belongsTo : "COMS.model.ND_Discharge"
});

Ext.define("COMS.model.ND_Discharge", {
	extend: "Ext.data.Model",
	fields: [
		"PatientID",			// GUID for the Patient
		"Education",			// Boolean - True/False
		"EducationComments",	// Text - Large
		"FollowUpInPatient",	// Boolean - True = Inpatient Followup; False = Outpatient Followup
		"NextChemoDate",		// Date
		"NextClinicDate",		// Date
		"LabTest1Date",			// Date
		"LabTest2Date",			// Date
		"PatientGivenDischarge",// Boolean - True/False
		"Instructions",			// Array of strings
		"Comments"				// Text - Large
	],
    hasMany : [
            { model : "COMS.model.ND_D_Instructions", name : "Instructions" }
    ],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_Discharge,
                create: Ext.URLs.AddND_Discharge
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
