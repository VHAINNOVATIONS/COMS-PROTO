Ext.define("COMS.model.OEMEditRecord", {
	extend:	"Ext.data.Model",
	fields : [
		"TemplateID",		// ID of the specific template this	record belongs to. This	ID should be for a template	specific to	this patient. There	might be multiple templates	with the same name but this	template should	be unique and only linked to this patient
		"OEMRecordID",		// ID of the specific OEM Record of	the	specified template
		"Order_ID",			// ID of the Order Record for this record

		"TherapyID",		// ID of the specific Therapy (Pre,	Post or	Therapy) record	of the specified OEM Record
		"TherapyType",		// Type	of Therapy (Pre, Post or Therapy)
		"Instructions",		// Instructions	for	this record
        "Status",            // Hold/Cancel State of this particular medication
		"AdminTime",		// Time	of day the med is supposed to be administered
		"MedID",			// ID of the med being administered
		"Med",				// Name	of the med being administered
        "Reason",

		"Dose",				// Base	Dose of	the	Med
		"BSA_Dose",			// BSA Dose	of the Med (blank unless Units is measured in surface area)
		"Units",			// Units
		"InfusionMethod",	// Infusion	Method
		"FluidType",		// Fluid Type (blank unless	the	infusion method	is an IV Type)
		"FluidVol",			// Fluid Volume	(blank unless the infusion method is an	IV Type)
		"FlowRate",			// FlowRate	(blank unless the infusion method is an	IV Type)
		"InfusionTime"		// Duration	of the infusion	 (can be left blank	as it's	computed locally, otherwise	blank unless the infusion method is	an IV Type)

/**
	// Optional	Dosing blank if	the	TherapyType	is "Therapy"
		, "Dose2",			// Base	Dose of	the	Med																											   
		"BSA_Dose2",		// BSA Dose	of the Med (blank unless Units is measured in surface area)															   
		"Units2",			// Units																														   
		"InfusionMethod2",	// Infusion	Method																												   
		"FluidType2",		// Fluid Type (blank unless	the	infusion method	is an IV Type)																	   
		"FluidVol2",		// Fluid Volume	(blank unless the infusion method is an	IV Type)																   
		"FlowRate2",		// FlowRate	(blank unless the infusion method is an	IV Type)																	   
		"InfusionTime2"		// Duration	of the infusion	 (can be left blank	as it's	computed locally, otherwise	blank unless the infusion method is	an IV Type)
**/
	],


	proxy: {
		type : "rest",
		api: {
			read : Ext.URLs.Edit_OEMRecord,
			update : Ext.URLs.Edit_OEMRecord,
			create : Ext.URLs.Edit_OEMRecord
		},
		reader:	{
			type: "json",
			root : "records",
			successProperty	: "success"
		}
	}
});
