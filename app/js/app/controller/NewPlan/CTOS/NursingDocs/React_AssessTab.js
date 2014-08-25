Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.React_AssessTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
		"Common.SelectAdverseReactionAlerts"
	],

	refs: [
		{ ref: "CTOS", selector: "NewPlanTab CTOS" },
		{ ref : "NursingDocsTabSet", selector : "NursingDocs" },
		{ ref : "ND_RA_Tab", selector : "NursingDocs_React_Assess" },
		{ ref: "NoAdverseReactions", selector: "NursingDocs_React_Assess [name=\"ND_InfusReact_None\"]" }
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs React / Assess Tab Controller!");

		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});
		
		this.control({
			"NursingDocs_React_Assess [name=\"ND_InfusReact_None\"]" : {
				change : this.ClickNoneCheckbox
			},

			"NursingDocs_React_Assess checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_React_Assess button[action=\"save\"]": {
                click: this.SaveReact_Assess
            }
/*				
				,

			"NursingDocs_React_Assess" : {
				afterrender : this.TabRendered
			}
*/
		});
	},

	PatientSelected : function() {
		// debugger;
	},


	ClickNoneCheckbox : function(btn, newValue, oldValue, eOpts) {
		var i, len, btn_i, AdverseReactionChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		var hasPrev = this.application.Patient.Reactions.length;
		if (newValue) {
			if (hasPrev > 0) {
				Ext.MessageBox.alert("Previous Adverse Reactions Alert", "This patient has had previous adverse reactions to this regimen. Please confirm your response of no adverse reactions for today." );
			}
			len = AdverseReactionChecks.length;
			for (i = 0; i < len; i++) {
				btn_i = AdverseReactionChecks[i];
				if ("ND_InfusReact_None" !== btn_i.name) {
					btn_i.setValue(false);
				}
			}
		}
	},

	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var fldName = "", commentName, txtField, comments;
		var NoneCkBox = this.getNoAdverseReactions();
		var NoAdverseState = NoneCkBox.getValue();

		switch (btn.name) {
			case "ND_InfusReact_None": 
				fldName = "";
			break;

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

		if (btn.value && "ND_InfusReact_None" !== btn.name) {
			NoneCkBox.setValue(false);
		}

		if ("" !== fldName ) {
			txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + fldName + "\"]")[0];
			if (btn.value) {
				if (txtField) {
					txtField.show();
				}
				if ("ND_RA_HorA_HypotensionBP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_HypotensionBP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_TachycardiaPulse" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Pulse\"]")[0];
				}
				if (txtField) {
					txtField.focus(true, true);
				}
			}
			else {
				if (txtField) {
					txtField.hide();
				}
				if ("ND_RA_HorA_HypotensionBP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Diastolic\"]")[0];
					txtField.setValue("");
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];

				}
				else if ("ND_RA_CRS_HypotensionBP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Diastolic\"]")[0];
					txtField.setValue("");
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_TachycardiaPulse" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Pulse\"]")[0];
				}
				txtField.setValue("");
			}
		}
	},

/*
	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("React / Assess Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.React_AssessTab");
	},
*/

	InfuseReactPost : function(records, Patient, theApp) {
		var params = Ext.encode(records);
		var CMD = "POST";
		var URL = Ext.URLs.AddND_React_Assess + "/" + Patient.PAT_ID;
		if (Patient.InfuseReactionRecordID) {
			CMD = "PUT";
			URL += "/" + Patient.InfuseReactionRecordID;
		}
		theApp.loadMask("Saving Infusion Reactions Information...");
		Ext.Ajax.request({
			url: URL,
			method : CMD,
			jsonData : params,
			scope: this,
			success: function( response, opts ){
				theApp.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - Infusion Reactions Section, Save Error - " + resp.msg );
				}
				else {
					theApp.fireEvent("loadAdverseEventsHistory");
					Ext.MessageBox.alert("Infusion Reactions", "Infusion Reactions Section, Save complete" );
					Patient.InfuseReactionRecordID = resp.InfuseReactionRecordID;
				}
			},
			failure : function( response, opts ) {
				theApp.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - Infusion Reactions Section, Save Error - <br />" + resp.msg );
			}
		});
	},



	SaveReact_Assess : function(btn) {
		// var theForm = btn.up("form").getForm();
		var Patient = this.application.Patient;

		var ReactAssesFormChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		var i, v, haveChecks = false, numChecks = ReactAssesFormChecks.length, ReactAssesFormCheck, ReactAssesFormValue, ReactAssesFormOption, ReactAssesFormComments, ReactAssesFormCommentsValue;
		var records = {}, ReactAssesessmentsCount = 0;
		records.patientId = Patient.id;
		records.Details = [];

		for (i = 0; i < numChecks; i++) {
			ReactAssesFormCheck = ReactAssesFormChecks[i];
			v = ReactAssesFormCheck.getValue();
			if (v) {
				haveChecks = true;
				ReactAssesFormOption = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Options\"]");
				ReactAssesFormComments = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Comments\"]");

				ReactAssesFormValue = 0;
				ReactAssesFormCommentsValue = "";

				if (ReactAssesFormOption && ReactAssesFormOption.length > 0) {		// ReactAssesFormOption[0]) {
					ReactAssesFormValue = ReactAssesFormOption[0].getValue();
					if (null === ReactAssesFormValue) {
						ReactAssesFormValue = "";		// 0;
					}
				}
				if (ReactAssesFormComments) {		//  && ReactAssesFormComments[0]) {
					ReactAssesFormCommentsValue = ReactAssesFormComments[0].getValue();
				}
				var sectionTitle = ReactAssesFormCheck.up("fieldset").title;

				records.Details[ReactAssesessmentsCount++] = { 
					"sequence" : i, 
					"fieldLabel" : ReactAssesFormCheck.boxLabel, 
					"choice" : true, 
					"comments" : ReactAssesFormCommentsValue, 
					"levelChosen" : ReactAssesFormValue, 
					"sectionTitle" : sectionTitle
				};
			}
		}
		if (haveChecks) {
			if (this.getNoAdverseReactions().getValue()) {
				this.InfuseReactPost(records, Patient, this.application);
			}
			else {
				var PAT_ID = this.application.Patient.PAT_ID;	/* PAT_ID is used rather than just the Patient ID, because it defines a patient/treatment Regimen */
				var view = Ext.widget("SelectAdverseReactionAlerts", { "PAT_ID" : PAT_ID, "type" : "Infusion Reactions", "records" : records, "scope" : this, "fnc" : this.InfuseReactPost });
			}
		}
		else {
				Ext.MessageBox.alert("Saving Error", "If there are no Adverse Events then you must check the \"No Adverse Reaction since Last Treatment\" checkbox" );
			}

	}

});
