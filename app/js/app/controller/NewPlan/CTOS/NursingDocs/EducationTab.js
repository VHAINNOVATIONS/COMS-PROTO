Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.EducationTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},
		{
			ref : "ND_E_Tab",
			selector : "NursingDocs_Education"
		},

		{
			ref : "ND_E_PE_Outpatient",
			selector : "NursingDocs_Education [name=\"ND_E_PE_Outpatient\"]"
		},
		{
			ref : "ND_E_DischargeInstrGiven",
			selector : "NursingDocs_Education [name=\"ND_E_DischargeInstrGiven\"]"
		},
		{
			ref : "ND_E_PE_Outpatient",
			selector : "NursingDocs_Education [name=\"\"]"
		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Education Tab Controller!");
		this.control({
            "NursingDocs_Education button[action=\"save\"]": {
                click: this.SaveEducation
            }
		});
	},

	SaveEducation : function(button) {
		Ext.MessageBox.alert("Discharge Instructions", "Discharge Instructions Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
	}

});
