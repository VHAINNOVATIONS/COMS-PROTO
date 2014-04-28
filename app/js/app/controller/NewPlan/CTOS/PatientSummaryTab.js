Ext.define("COMS.controller.NewPlan.CTOS.PatientSummaryTab", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
	    "NewPlan.CTOS.PatientSummary"
	],

	refs: [
	    {
		    ref: "PatientSummary",
			selector: "PatientSummary"
	    },
//	    {
//		    ref: "PSummaryHeader",
//			selector: "PatientSummary [name=\"heading\"]"
//	    },

	    {
		    ref: "PSummaryOverview",
			selector: "PatientSummary PSummary_Overview"
	    },
	    {
		    ref: "PSummaryBody",
			selector: "PatientSummary [name=\"body\"]"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Patient Summary Tab Controller!");

		this.application.on( { PatientSelected : this.PatientSelected, scope : this } );

		this.control({
			"PatientSummary" : {
				beforeactivate : this.BeforeTabActivated,
				render : this.TabRendered
			}
		});
	},

		// Ensures 
	TabContentsCleared : true,



	createChildren : function( component, eOpts ) {
		var Patient = this.application.Patient;
		if ("" === Patient.TemplateID) {
			return;		// No Template assigned to this patient
		}
		try {

		}
		catch (err) {
			// debugger;
		}
	},

	/**********************
	 *
	 *	Called when the "PatientSelected" event is triggered from the top of the NewTab Panel Select Patient drop down
	 *	This adjusts the values in the "Select Applied Template" drop down based on the selected user
	 *
	 **********************/
	PatientSelected: function (combo, recs, eOpts) {
		var thisCtl = this.getController("NewPlan.CTOS.PatientSummaryTab");
		var PSummary = thisCtl.getPatientSummary();
		if (PSummary) {
			if (PSummary.rendered) {
				this.TabContentsCleared = true;
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Patient Summary Tab has been rendered");
	},

	BeforeTabActivated : function (component, eOpts ) {
		wccConsoleLog("Patient Summary Tab has been rendered");
		if ( this.TabContentsCleared ) {
			this.TabContentsCleared = false;
			var thisCtl = this.getController("NewPlan.CTOS.PatientSummaryTab");
			var Patient = this.application.Patient;
			var UpdateData = Patient.OEMRecords;

			UpdateData.TreatmentStart = UpdateData.OEMRecords[0].AdminDate;
			var i1 = UpdateData.OEMRecords.length - 1;
			UpdateData.TreatmentEnd = UpdateData.OEMRecords[i1].AdminDate;

//			var header = thisCtl.getPSummaryHeader();
//			header.update({PatientName : Patient.name});

			var Overview = thisCtl.getPSummaryOverview();
			Overview.update( UpdateData );

//			var Body = thisCtl.getPSummaryBody();
		}
		return true;
	}
});
