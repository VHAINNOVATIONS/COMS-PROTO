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
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Pre Treatment Tab Controller!");
		this.control({
            "NursingDocs_PreTreatment checkbox" : {
				change : this.SiteAssessmentCheckBoxCheck
			},
            "NursingDocs_PreTreatment" : { afterrender : this.TabRendered },
            "NursingDocs_PreTreatment button[action=\"save\"]": { click: this.btnSaveIVSiteInfo }
		});
	},


    SiteAssessmentCheckBoxCheck : function(btn, newValue, oldValue, eOpts) {
        var label = btn.boxLabel;
        var PainBox = Ext.ComponentQuery.query("NursingDocs_PreTreatment checkbox[name=\"ND_PT_SA_Pain\"]")[0];
        var SwellingBox = Ext.ComponentQuery.query("NursingDocs_PreTreatment checkbox[name=\"ND_PT_SA_Swelling\"]")[0];
        var ErythemaBox = Ext.ComponentQuery.query("NursingDocs_PreTreatment checkbox[name=\"ND_PT_SA_Redness\"]")[0];
        var AbsenceBox = Ext.ComponentQuery.query("NursingDocs_PreTreatment checkbox[name=\"ND_PT_SA_Absence\"]")[0];
        if ("Absence of symptoms" === label && newValue === true) {
            PainBox.setValue(false);
            SwellingBox.setValue(false);
            ErythemaBox.setValue(false);
        }
        else if (("Pain" === label || "Swelling" === label || "Erythema" === label) && true === newValue) {
            AbsenceBox.setValue(false);
        }
    },

	btnSaveIVSiteInfo : function (button) {
		Ext.MessageBox.alert("IV Site", "IV Site Information Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("PreTreatment Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.PreTreatmentTab");
	}

});
