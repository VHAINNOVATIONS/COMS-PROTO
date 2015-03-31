Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.VitalSignsEntryForm", {
	extend: "Ext.app.Controller",
	views: [
		"NewPlan.CTOS.NursingDocs.VitalSignsEntryForm"
	],
	init: function () {

		this.application.on( 
			{ 
				// PopulateNDTabs : this.GenInfoRendered,	// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				// ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				scope : this 
			} 
		);

		this.control({
			"VitalSignsEntryForm" : {
				"beforerender" : this.initForm
			},
			"VitalSignsEntryForm [name=\"ndVitalsTempF\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsPulse\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsSystolic\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsDiastolic\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsHeightIN\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsResp\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsO2Level\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsWeightP\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsPain\"]" : {
				"blur" : this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation	// this.VitalsFieldValidation
			}
		});
	},
	initForm : function() {
		debugger;
		this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").initVitalSignsEntryForm(this.application.Patient);
	}
});