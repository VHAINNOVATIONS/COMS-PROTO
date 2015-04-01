/********************************
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
				"beforerender" : this.initForm1,
				"afterrender" : this.initForm2
			},
			"VitalSignsEntryForm [name=\"ndVitalsTempF\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsPulse\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsSystolic\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsDiastolic\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsHeightIN\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsResp\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsO2Level\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsWeightP\"]" : {
				"blur" : this.Validate
			},
			"VitalSignsEntryForm [name=\"ndVitalsPain\"]" : {
				"blur" : this.Validate
			}
/ **************
			"VitalSignsEntryForm" : {
				"beforerender" : this.initForm,
				"afterrender" : function() { console.log("Vitals Rendered"); }
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
************** /
		});
	},
	initForm1 : function(theForm) {
		debugger;
		if (this.application.Patient) {
			this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").initVitalSignsEntryForm(this.application.Patient);
		}
	},
	initForm2 : function(theForm) {
		debugger;
		if (this.application.Patient) {
			this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").initVitalSignsEntryForm(this.application.Patient);
		}
	},

	Validate : function(fld, evt, eOpts) {
		debugger;
		this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab").VitalsFieldValidation(fld, evt, eOpts);
	}

});
*************************/