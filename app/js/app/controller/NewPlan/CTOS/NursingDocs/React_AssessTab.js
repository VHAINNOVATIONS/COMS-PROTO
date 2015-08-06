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

	PatientSelected : function(patientRecords, opts) {
		var theForm = this.getND_RA_Tab().getForm();

		if (this.application.Patient.PAT_ID == "") {
			// Reset form data
			theForm.reset();
		}
		else {
			Ext.Ajax.request({
				scope : this,
				url: Ext.URLs.AddND_React_Assess + "/" + this.application.Patient.PAT_ID,
				method : "GET",
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Data Retrieval Error", "ND - Reaction Assessment Section, Error - " + resp.msg );
					}
					else {
						if (resp.total > 0) {
						}
						else {
							theForm.reset();
						}
						/******************
						xtype : "NursingDocs_RATextarea",name : "ND_RA_CRS_OtherDetails",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_CRS_RashDesc", 
						xtype : "NursingDocs_RATextarea",name : "ND_RA_CR_Comments",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_HorA_OtherDetails",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_AntidotesGiven",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_CoolFreq",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_DiscomfortDetails",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_HeatFreq",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_InterventionsGiven",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_MeasurementsDetails",
						xtype : "NursingDocs_RATextarea",name : "ND_RA_Xtrav_OtherDetails",
						xtype : "textfield",name : "ND_RA_CRS_Temperature",

						xtype : "checkbox", name : "ND_RA_CRS_Asthenia", 
						xtype : "checkbox", name : "ND_RA_CRS_Chills", 
						xtype : "checkbox", name : "ND_RA_CRS_Dyspnea", 
						xtype : "checkbox", name : "ND_RA_CRS_Fever",
						xtype : "checkbox", name : "ND_RA_CRS_Headache", 
						xtype : "checkbox", name : "ND_RA_CRS_Hypotension", 
						xtype : "checkbox", name : "ND_RA_CRS_Nausea", 
						xtype : "checkbox", name : "ND_RA_CRS_Rash", 
						xtype : "checkbox", name : "ND_RA_CRS_Rigors", 
						xtype : "checkbox", name : "ND_RA_CRS_Tachycardia", 
						xtype : "checkbox", name : "ND_RA_CRS_TongueEdema", 
						xtype : "checkbox", name : "ND_RA_CR_Reaction", 
						xtype : "checkbox", name : "ND_RA_HorA_Abdominal", 
						xtype : "checkbox", name : "ND_RA_HorA_ChestTightness", 
						xtype : "checkbox", name : "ND_RA_HorA_Cramping", 
						xtype : "checkbox", name : "ND_RA_HorA_Diarrhea", 
						xtype : "checkbox", name : "ND_RA_HorA_Dyspnea", 
						xtype : "checkbox", name : "ND_RA_HorA_Hypotension", 
						xtype : "checkbox", name : "ND_RA_HorA_Nausea", 
						xtype : "checkbox", name : "ND_RA_HorA_PeriorbitalEdema", 
						xtype : "checkbox", name : "ND_RA_HorA_Uneasiness", 
						xtype : "checkbox", name : "ND_RA_HorA_Urticaria", 
						xtype : "checkbox", name : "ND_RA_HorA_Wheezing", 
						xtype : "checkbox", name: "ND_RA_CRS_Other",
						xtype : "checkbox", name: "ND_RA_HorA_Other",
						xtype : "checkbox", name: "ND_RA_Xtrav_Antidotes",
						xtype : "checkbox", name: "ND_RA_Xtrav_Cool",
						xtype : "checkbox", name: "ND_RA_Xtrav_Discomfort",
						xtype : "checkbox", name: "ND_RA_Xtrav_Edema",
						xtype : "checkbox", name: "ND_RA_Xtrav_Erythema",
						xtype : "checkbox", name: "ND_RA_Xtrav_Heat",
						xtype : "checkbox", name: "ND_RA_Xtrav_Interventions",
						xtype : "checkbox", name: "ND_RA_Xtrav_Measurements",
						xtype : "checkbox", name: "ND_RA_Xtrav_Other",
						xtype : "checkbox",name : "ND_InfusReact_None"

						 ******************/
						/*********
						var giTab = this.getNdct_GenInfoTab().getForm();
						var RgPatientID = this.getRgPatientID();
						var RgConsent = this.getRgConsent();
						var RgEduAssess = this.getRgEduAssess();
						var RgPlanReviewed = this.getRgPlanReviewed();

						var theData = resp.records[0];
						giTab.setValues({PatientIDComment:theData.comment});
						RgPatientID.setValue({patientIDGood : theData.patientIDGood == "true"});
						RgConsent.setValue({consentGood : theData.consentGood == "true"});
						RgEduAssess.setValue({educationGood : theData.educationGood == "true"});
						RgPlanReviewed.setValue({planReviewed : theData.planReviewed == "true"});
						**********/
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Data Retrieval Error", "ND - Reaction Assessment Section, Save Error - " + resp.msg );
				}
			});
		}
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

	getFldName4CkBox : function(ckBox) {
		var fldName = "";
		switch (ckBox.name) {
			case "ND_RA_Xtrav_Heating":
				fldName = "ND_RA_Xtrav_HeatFreq";
			break;
			
			case "ND_RA_Xtrav_Cooling":
				fldName = "ND_RA_Xtrav_CoolFreq";
			break;
			
			case "ND_RA_Xtrav_Interventions":
				fldName = "ND_RA_Xtrav_InterventionsGiven";
			break;
			
			case "ND_RA_Xtrav_Antidotes":
				fldName = "ND_RA_Xtrav_AntidotesGiven";
			break;
			
			case "ND_RA_Xtrav_Measurements":
				fldName = "ND_RA_Xtrav_MeasurementsTaken";
			break;
			
			case "ND_RA_Xtrav_Discomfort":
				fldName = "ND_RA_Xtrav_DiscomfortDesc";
			break;

			case "ND_RA_Xtrav_Other":
				fldName = "ND_RA_Xtrav_OtherDetails";
			break;
			
			case "ND_RA_CRS_Fever":
				fldName = "ND_RA_CRS_Temperature";
			break;
			
			case "ND_RA_CRS_Hypotension":
				fldName = "ND_RA_CRS_BP";
			break;
			
			case "ND_RA_CRS_Tachycardia":
				fldName = "ND_RA_CRS_Pulse";
			break;
			
			case "ND_RA_CRS_Rash":
				fldName = "ND_RA_CRS_RashDesc";
			break;

			case "ND_RA_CRS_Other":
				fldName = "ND_RA_CRS_OtherDetails";
			break;
			
			case "ND_RA_HorA_Hypotension":
				fldName = "ND_RA_HorA_BP";
			break;
			
			case "ND_RA_HorA_Other":
				fldName = "ND_RA_HorA_OtherDetails";
			break;
			
			case "ND_RA_CR_Reaction":
				fldName = "ND_RA_CR_Comments";
			break;
		}
		return fldName;
	},

	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var fldName = "", commentName, txtField, comments;
		var NoneCkBox = this.getNoAdverseReactions();
		var NoAdverseState = NoneCkBox.getValue();

		fldName = this.getFldName4CkBox(btn);
		if (btn.value && "ND_InfusReact_None" !== btn.name) {
			NoneCkBox.setValue(false);
		}

		if ("" !== fldName ) {
			txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + fldName + "\"]")[0];
			if (btn.value) {
				if (txtField) {
					txtField.show();
				}
				if ("ND_RA_HorA_BP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_BP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_Pulse" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_PulseFld\"]")[0];
				}
				if (txtField) {
					txtField.focus(true, true);
				}
			}
			else {
				if (txtField) {
					txtField.hide();
				}
				if ("ND_RA_HorA_BP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Diastolic\"]")[0];
					txtField.setValue("");
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];

				}
				else if ("ND_RA_CRS_BP" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Diastolic\"]")[0];
					txtField.setValue("");
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
				}
				else if ("ND_RA_CRS_Pulse" === fldName) {
					txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_PulseFld\"]")[0];
				}
				if (txtField) {
					txtField.setValue("");
					txtField.focus(true, true);
				}
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
		var URL = Ext.URLs.AddND_React_Assess + Patient.PAT_ID;
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
		var theForm = btn.up("form").getForm();
		var theFields = theForm.getFields();
		var theFieldValues = theForm.getValues();
		var Patient = this.application.Patient;
		var ReactAssesFormChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		var i, v, haveChecks = false, numChecks = ReactAssesFormChecks.length, ReactAssesFormCheck, ReactAssesFormValue, ReactAssesFormOption, ReactAssesFormComments, ReactAssesFormCommentsValue;
		var aField, subField, subField2, records = {}, ReactAssesessmentsCount = 0;
		records.patientId = Patient.id;
		records.Details = [];

		for (i = 0; i < theFields.items.length; i++) {
			aField = theFields.items[i];
			if (aField.section) {
				if (aField.getValue()) {
					haveChecks = true;
					subField = null;
					subField2 = null;
					v = "";
					if ("" !== aField.subField) {
						subField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + aField.subField + "\"]")[0];
						v = subField.getValue();
					}
					if (aField.subField2) {
						subField2 = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + aField.subField2 + "\"]")[0];
						v += " / " + subField2.getValue();
					}
					records.Details[ReactAssesessmentsCount++] = { 
						"sequence" : aField.sequence, 
						"fieldLabel" : aField.boxLabel, 
						"choice" : true, 
						"comments" : v, 
						"levelChosen" : 0, 
						"sectionTitle" : aField.section
					};
				}
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
			if (!this.getNoAdverseReactions().getValue()) {
				Ext.MessageBox.alert("Saving Error", "If there are no Adverse Events then you must check the \"No Adverse Reaction since Last Treatment\" checkbox" );
			}
		}
	}

});
