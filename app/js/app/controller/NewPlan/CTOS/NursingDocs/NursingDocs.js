Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.NursingDocs", {
	extend: "Ext.app.Controller",

	stores: [
		"ND_CTCAE_SOC",
		"ND_CTCAE_Data"
	],


	views: [
		"NewPlan.CTOS.NursingDocs",
		"NewPlan.CTOS.NursingDocs.GenInfo",				/* New Name = "General Information" */
		"NewPlan.CTOS.NursingDocs.Assessment",			/* New Name = "Assessment" */
		"NewPlan.CTOS.NursingDocs.PreTreatment",		/* New Name = "IV Site" */
		"NewPlan.CTOS.NursingDocs.Treatment",			/* New Name = "Administration" */
		"NewPlan.CTOS.NursingDocs.React_Assess",		/* New Name = "Infusion Reactions" */
		"NewPlan.CTOS.NursingDocs.Education",			/* Now container for "Discharge Instructions" Tab */
		"NewPlan.CTOS.NursingDocs.DischargeInstructions"	/* Contained within Education Tab */
	],

	refs: [
	    {
		    ref: "GenInfoTab",
			selector: "NursingDocs_GenInfo"
	    },
		{
			ref: "CTOS_Tabs",
			selector: "NewPlanTab CTOS"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Tab Controller!");
		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});


		this.control({
			"NursingDocs" : {
				beforeactivate : this.BeforeTabActivated
			}
		});
	},


	BeforeTabActivated :  function( component, eOpts ) {
		var PatientInfo = this.application.Patient;
		if ("" === PatientInfo.TemplateID) {
			alert("No Template has been applied to this patient\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			return false;
		}
		this.application.fireEvent("PopulateNDTabs");
		return true;
	},

	PatientSelected : function(arg1, arg2, arg3) {
		// Fire an event that will force all the ND Tabs to clear out their data
		this.application.fireEvent("ClearNDTabs");
	}

});
