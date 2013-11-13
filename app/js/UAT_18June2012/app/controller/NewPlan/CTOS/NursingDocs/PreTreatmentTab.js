/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.PreTreatmentTab", {
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
			ref : "ND_PT_Tab",
			selector : "NursingDocs_PreTreatment"
		}
//		,
//
//		{
//			ref : "ND_PT_TabLabInfo",
//			selector : "NursingDocs_PreTreatment [name=\"ND_PT_LabInfo\"]"
//		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Pre Treatment Tab Controller!");

//		this.application.on({
//			PatientSelected : this.PatientSelected,
//			scope : this
//		});
		
		this.control({
			"NursingDocs_PreTreatment" : {
				afterrender : this.TabRendered
			},
            "NursingDocs_PreTreatment button[action=\"save\"]": {
                click: this.btnSaveIVSiteInfo
            }
		});
	},


	btnSaveIVSiteInfo : function (button) {
		Ext.MessageBox.alert("IV Site", "IV Site Information Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("PreTreatment Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.PreTreatmentTab");
//		var LaboratoryInfo = thisCtl.getND_PT_TabLabInfo();
//		LaboratoryInfo.update( Patient.History );
	}

});
