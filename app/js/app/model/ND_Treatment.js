Ext.define("COMS.model.ND_Treatment", {
	extend: "Ext.data.Model",
	fields : [
		"patientID",			// GUID for the Patient
		"templateID",			// GUID for the Template
		"PAT_ID",				// GUID for the Treatment record
		"Order_ID",
		"Cycle",
		"adminDay",
		"adminDate",
		"typeOrder",	// Used to display therapy type in grid in sorted order (Pre = 1, Therapy = 2, Post = 3)
		"type",			// Indicates type of Therapy this record is for e.g. PreTherapy, Therapy, PostTherapy
		"drug",		// Includes sequence in the treatment type (e.g. "1. Ibuprofin" in Pre Therapy, "3. Mylanta" in Post Therapy
		"MedID",
		"Drug_ID",
		"dose",
		"unit",
		"UnitID",
		"route",
		"StartTime",
		"EndTime",
		"Comments",
		"User",
		"Treatment_User",
		"Treatment_Date",		// Time/Date stamp of when the treatment was recorded
		"drug_originalValue",
		"dose_originalValue",
		"unit_originalValue",
		"route_originalValue",
		"orderstatus",
		"ActualOrderStatus"
	],

	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.ND_Treatment,	// this is really /Order/Orders <--- MWB - 6/29/2012 Removed for testing???
			// read: Ext.URLs.ND_TreatmentDispensed,
			// read: Ext.URLs.ReadND_Treatment,		// Parameter = PAT_ID -> "/NursingDoc/Treatment/<PAT_ID>",
			create: "/NursingDoc/Treatment",
			update: "/NursingDoc/Treatment"
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty : "msg"
		}
	}
});