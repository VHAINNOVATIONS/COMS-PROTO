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
            },

			"NursingDocs_React_Assess" : {
				afterrender : this.TabRendered
			}
		});
	},

	PatientSelected : function() {
		// debugger;
	},


	ClickNoneCheckbox : function(btn, newValue, oldValue, eOpts) {
		var i, len, btn_i, AdverseReactionChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		if (newValue) {
			Ext.MessageBox.alert("Previous Adverse Reactions Alert", "Warning this patient has had previous adverse reactions, please check and confirm that you want to keep this checked." );
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
			else {
				txtField.hide();
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

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("React / Assess Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.React_AssessTab");
	},



/**
	SelectAdverseReactionAlerts : function ( records ) {
		{ 
			xtype: "CheckCombo", 
			name: "IV_FluidTypeMulti", 
			fieldLabel : "Select IV Fluid Type (one or more)", labelAlign: "right", labelWidth: 200,  width: 450, 
			displayField : "name", valueField : "id",
			store : Ext.create('Ext.data.Store', {
				model : 'COMS.model.GenericLookupModel',
				proxy: {
					type: 'rest',
					api: {
						read: Ext.URLs.FluidType
					},
					reader: {
						type: 'json',
						root : 'records',
						successProperty : 'success'
					}
				}
			})
		},
	},
**/















	SaveReact_Assess : function(btn) {
		var theForm = btn.up("form").getForm();
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

				if (ReactAssesFormOption && ReactAssesFormOption[0]) {
					ReactAssesFormValue = ReactAssesFormOption[0].getValue();
					if (null === ReactAssesFormValue) {
						ReactAssesFormValue = 0;
					}
				}
				if (ReactAssesFormComments && ReactAssesFormComments[0]) {
					ReactAssesFormCommentsValue = ReactAssesFormComments[0].getValue();
				}
				var sectionTitle = ReactAssesFormCheck.up("fieldset").title;

				records.Details[ReactAssesessmentsCount++] = { "sequence" : i, "fieldLabel" : ReactAssesFormCheck.boxLabel, "choice" : true, "comments" : ReactAssesFormCommentsValue, "levelChosen" : ReactAssesFormValue, "sectionTitle" : sectionTitle};
			}
		}
		if (haveChecks)	{
			var params = Ext.encode(records);
			console.log(params);
			var view = Ext.widget("SelectAdverseReactionAlerts", { "records" : records });

			var PAT_ID = this.application.Patient.PAT_ID;	/* PAT_ID is used rather than just the Patient ID, because it defines a patient/treatment Regimen */
			var CMD = "POST";
			var URL = Ext.URLs.AddND_React_Assess + "/" + PAT_ID;
			if (this.application.Patient.InfuseReactionRecordID) {
				CMD = "PUT";
				URL += "/" + this.application.Patient.InfuseReactionRecordID;
			}
			Ext.Ajax.request({
				url: URL,
				method : CMD,
				jsonData : params,
				scope: this,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "ND - Infusion Reactions Section, Save Error - " + resp.msg );
					}
					else {
						Ext.MessageBox.alert("Pretreatment Infusion Reactions", "Pretreatment Infusion Reactions Section, Save complete" );
						this.application.Patient.InfuseReactionRecordID = resp.InfuseReactionRecordID;
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "ND - Infusion Reactions Section, Save Error - <br />" + resp.msg );
				}
			});
		}
	}

});
