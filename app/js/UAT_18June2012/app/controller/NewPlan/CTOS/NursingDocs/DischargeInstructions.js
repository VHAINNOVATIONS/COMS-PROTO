Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.DischargeInstructions" ,{
	extend: "Ext.app.Controller",
	views: [
		"CkBoxTArea",
		"NewPlan.CTOS.NursingDocs.DischargeInstructions", 
		"NewPlan.CTOS.NursingDocs.PatientEducationDetails",
		"NewPlan.CTOS.NursingDocs.FollowupDetails"
	],
	refs: [
		{
			ref : "Barrier_Physical",
			selector : "CkBoxTArea[name=\"Barrier_Physical\"]"
		},
		{
			ref : "Barrier_Physical_ckbox",
			selector : "CkBoxTArea[name=\"Barrier_Physical\"] checkbox"
		},
		{
			ref : "PatientEduDetails",
			selector : "DischargeInstructions fieldset[name=\"PatientEducation\"] container[name=\"PatientEduDetails\"]"
		}
	],

	// Ext.ComponentQuery.query("DischargeInstructions [name=\"PatientEducation\"] [name=\"PatientEduDetails\"]")[0].getStore()
	init: function () {
		this.control({
			"[name=\"PatientEducation\"] [name=\"PE_Taught\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("PatientEducationDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			},

			"[name=\"Followup\"] [name=\"FollowupNeeded\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("FollowupDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			},

			"[name=\"DischargeInstructionsMaterials\"] [name=\"DischargeInstructions_Given\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("DischargeInstructionsDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			}
		});
	}
});