Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.VitalSignsEntryForm", {
	extend: "Ext.app.Controller",
	views: [
		"NewPlan.CTOS.NursingDocs.VitalSignsEntryForm"
	],

	refs: [
		{
			ref: "ndVitalSignsForm",
			selector: "VitalSignsEntryForm"
		},

		{
			ref: "ndVitalsTempF",
			selector: "VitalSignsEntryForm [name=\"ndVitalsTempF\"]"
		},
		{
			ref: "ndVitalsTempLoc",
			selector: "VitalSignsEntryForm [name=\"ndVitalsTempLoc\"]"
		},
		{
			ref: "ndVitalsPulse",
			selector: "VitalSignsEntryForm [name=\"ndVitalsPulse\"]"
		},
		{
			ref: "ndVitalsSystolic",
			selector: "VitalSignsEntryForm [name=\"ndVitalsSystolic\"]"
		},
		{
			ref: "ndVitalsHeightIN",
			selector: "VitalSignsEntryForm [name=\"ndVitalsHeightIN\"]"
		},
		{
			ref: "ndVitalsResp",
			selector: "VitalSignsEntryForm [name=\"ndVitalsResp\"]"
		},
		{
			ref: "ndVitalsDiastolic",
			selector: "VitalSignsEntryForm [name=\"ndVitalsDiastolic\"]"
		},
		{
			ref: "ndVitalsWeightP",
			selector: "VitalSignsEntryForm [name=\"ndVitalsWeightP\"]"
		},
		{
			ref: "ndVitalsPain",
			selector: "VitalSignsEntryForm [name=\"ndVitalsPain\"]"
		},
		{
			ref: "ndVitalsO2Level",
			selector: "VitalSignsEntryForm [name=\"ndVitalsO2Level\"]"
		}
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
			"VitalSignsEntryForm [name=\"ndVitalsTempF\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsPulse\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsSystolic\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsDiastolic\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsHeightIN\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsResp\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsO2Level\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsWeightP\"]" : {
				"blur" : this.VitalsFieldValidation
			},
			"VitalSignsEntryForm [name=\"ndVitalsPain\"]" : {
				"blur" : this.VitalsFieldValidation
			}
		});
	},

	VitalsFieldValidation : function(fld, evt, eOpts) {
		var IDESpec = this.application.IntelligentDataElements,
			IDESpecLen = IDESpec.length, i,
			fldName = fld.name, fldNameMap = [],
			validity = true;

		fldNameMap = [];
		fldNameMap.ndVitalsTempF = "Temperature";
		fldNameMap.ndVitalsPulse = "Pulse";
		fldNameMap.ndVitalsSystolic = "BP_Systolic";
		fldNameMap.ndVitalsDiastolic = "BP_Diastolic";
		fldNameMap.ndVitalsHeightIN = "Height";
		fldNameMap.ndVitalsResp = "Respiration";
		fldNameMap.ndVitalsO2Level = "SP_O2";
		fldNameMap.ndVitalsWeightP = "Weight";
		fldNameMap.ndVitalsPain = "Pain";

		if (IDESpecLen > 0) {
			for (i = 0; i < IDESpecLen; i++) {
				if (IDESpec[i].Vital2Check === fldNameMap[fldName]) {
					validity = this.procIDE(fld, IDESpec[i]);
					if (validity) {
						if ("ndVitalsTempF" === fldName ) {
							this.ConvertTemp(fld, eOpts);
						}
						else if ("ndVitalsHeightIN" === fldName) {
							this.ConvertHeight(fld, eOpts);
						}
						else if ("ndVitalsWeightP" === fldName) {
							this.ConvertWeight(fld, eOpts);
						}
					}
				}
			}
		}
		else {
			if ("ndVitalsTempF" === fldName ) {
				this.ConvertTemp(fld, eOpts);
			}
			else if ("ndVitalsHeightIN" === fldName) {
				this.ConvertHeight(fld, eOpts);
			}
			else if ("ndVitalsWeightP" === fldName) {
				this.ConvertWeight(fld, eOpts);
			}
		}
		return validity;
	}

});