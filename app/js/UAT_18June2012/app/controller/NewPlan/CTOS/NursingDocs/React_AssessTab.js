/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.React_AssessTab", {
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
			ref : "ND_RA_Tab",
			selector : "NursingDocs_React_Assess"
		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs React / Assess Tab Controller!");

//		this.application.on({
//			PatientSelected : this.PatientSelected,
//			scope : this
//		});
		
		this.control({
			"NursingDocs_React_Assess checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_React_Assess button[action=\"save\"]": {
                click: this.SaveReact_Assess
            },

			"NursingDocs_React_Assess" : {
				afterrender : this.TabRendered
			}
		});
	},

	SaveReact_Assess : function() {
		var Patient = this.application.Patient;

		var ReactAssesFormChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		var i, v, haveChecks = false, numChecks = ReactAssesFormChecks.length, ReactAssesFormCheck, ReactAssesFormValue, ReactAssesFormOption, ReactAssesFormComments, ReactAssesFormCommentsValue;
		var record = {}, ReactAssesessmentsCount = 0;
		record.patientId = Patient.id;
		record.Details = [];

		for (i = 0; i < numChecks; i++) {
			ReactAssesFormCheck = ReactAssesFormChecks[i];
			v = ReactAssesFormCheck.getValue();
			if (v) {
				haveChecks = true;
				ReactAssesFormOption = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Options\"]");
				ReactAssesFormComments = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Comments\"]");

				ReactAssesFormValue = 0;
				ReactAssesFormCommentsValue = "";

				if (ReactAssesFormOption && ReactAssesFormOption[0]) {
					ReactAssesFormValue = ReactAssesFormOption[0].getValue();
					if (null === ReactAssesFormValue) {
						ReactAssesFormValue = 0;
					}
				}
				if (ReactAssesFormComments && ReactAssesFormComments[0]) {
					ReactAssesFormCommentsValue = ReactAssesFormComments[0].getValue();
				}

				record.Details[ReactAssesessmentsCount++] = { "sequence" : i, "fieldLabel" : ReactAssesFormCheck.boxLabel, "choice" : true, "comments" : ReactAssesFormCommentsValue, "levelChosen" : ReactAssesFormValue};
			}
		}
		if (haveChecks)	{
			var params = Ext.encode(record);
			/***************
			Ext.Ajax.request({
				url: Ext.URLs.AddND_React_Assess,
				method : "POST",
				jsonData : params,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + resp.msg );
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + e.message + "<br />" + resp.msg );
				}
			});
			*****************/
			Ext.MessageBox.alert("Infusion Reactions", "Infusion Reactions Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
		}
	},


	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var fldName = "", commentName, txtField, comments;
		switch (btn.name) {
			case "ND_RA_Xtrav_Heat":
				fldName = "ND_RA_Xtrav_HeatFreq";
			break;
			
			case "ND_RA_Xtrav_Cool":
				fldName = "ND_RA_Xtrav_CoolFreq";
			break;
			
			case "ND_RA_Xtrav_Interventions":
				fldName = "ND_RA_Xtrav_InterventionsGiven";
			break;
			
			case "ND_RA_Xtrav_Antidotes":
				fldName = "ND_RA_Xtrav_AntidotesGiven";
			break;
			
			case "ND_RA_Xtrav_Measurements":
				fldName = "ND_RA_Xtrav_MeasurementsDetails";
			break;
			
			case "ND_RA_Xtrav_Discomfort":
				fldName = "ND_RA_Xtrav_DiscomfortDetails";
			break;

			case "ND_RA_Xtrav_Other":
				fldName = "ND_RA_Xtrav_OtherDetails";
			break;
			
			case "ND_RA_CRS_Fever":
				fldName = "ND_RA_CRS_Temperature";
			break;
			
			case "ND_RA_CRS_Hypotension":
				fldName = "ND_RA_CRS_HypotensionBP";
			break;
			
			case "ND_RA_CRS_Tachycardia":
				fldName = "ND_RA_CRS_TachycardiaPulse";
			break;
			
			case "ND_RA_CRS_Rash":
				fldName = "ND_RA_CRS_RashDesc";
			break;

			case "ND_RA_CRS_Other":
				fldName = "ND_RA_CRS_OtherDetails";
			break;
			
			case "ND_RA_HorA_Hypotension":
				fldName = "ND_RA_HorA_HypotensionBP";
			break;
			
			case "ND_RA_HorA_Other":
				fldName = "ND_RA_HorA_OtherDetails";
			break;
			

			case "ND_RA_CR_Reaction":
				fldName = "ND_RA_CR_Comments";
			break;
		}

		if ("" !== fldName ) {
			txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + fldName + "\"]")[0];
			if (btn.value) {
				if ("" !== fldName ) {
					txtField.show();
					if ("ND_RA_HorA_HypotensionBP" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];
					}
					else if ("ND_RA_CRS_HypotensionBP" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
					}
					else if ("ND_RA_CRS_TachycardiaPulse" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Pulse\"]")[0];
					}
					txtField.focus(true, true);
				}
			}
			else {
				if ("" !== fldName ) {
					txtField.hide();
				}
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("React / Assess Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.React_AssessTab");
	}
});
