Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.AssessmentTab", {
	extend: "Ext.app.Controller",

	stores: [
	],
	views: [
		"Common.SelectAdverseReactionAlerts"
	],
	refs: [
		{ ref: "NoAdverseReactions", selector: "NursingDocs_Assessment [name=\"ND_Ass_None\"]"},
		{ ref: "AdverseReactionsCheckBoxes", selector: "NursingDocs_PretreatmentAssesment checkbox"}

	],

	// Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"ND_PA_CTCAE_TERM_001\"]")[0].getStore()
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Assessmment Tab Controller!");

		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});
	
		this.control({
			"NursingDocs_Assessment [name=\"ND_Ass_None\"]" : {
				change : this.ClickNoneCheckbox
			},
			"NursingDocs_PretreatmentAssesment checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_Assessment button[action=\"save\"]": {
                click: this.SaveAssessments
            }
			
		});
	},

	/* Note: This function gets called twice when a patient is selcted */
	PatientSelected : function() {
		// debugger;
	},

	ClickNoneCheckbox : function(btn, newValue, oldValue, eOpts) {
		var i, len, AdverseReactionChecks = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment checkbox");
		var hasPrev = this.application.Patient.Assessments.length;
		if (newValue && (hasPrev > 0)) {
			Ext.MessageBox.alert("Previous Adverse Reactions Alert", "This patient has had previous adverse reactions to this regimen. Please confirm your response of no adverse reactions for today." );
			len = AdverseReactionChecks.length;
			for (i = 0; i < len; i++) {
				AdverseReactionChecks[i].setValue(false);
			}
		}
	},

	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var selectName, commentName, selectTag, comments;
		var NoneCkBox = this.getNoAdverseReactions();
		var NoAdverseState = NoneCkBox.getValue();

		switch (btn.name) {
			case "ND_Ass_Fatigue":
				selectName = "ND_Ass_FatigueOptions";
				commentName = "ND_Ass_FatigueComments";
				break;
			case "ND_Ass_Anorexia":
				selectName = "ND_Ass_AnorexiaOptions";
				commentName = "ND_Ass_AnorexiaComments";
				break;
			case "ND_Ass_Nausea":
				selectName = "ND_Ass_NauseaOptions";
				commentName = "ND_Ass_NauseaComments";
				break;
			case "ND_Ass_Vomiting":
				selectName = "ND_Ass_VomitingOptions";
				commentName = "ND_Ass_VomitingComments";
				break;
			case "ND_Ass_Rash":
				selectName = "ND_Ass_RashOptions";
				commentName = "ND_Ass_RashComments";
				break;
			case "ND_Ass_Insomnia":
				selectName = "ND_Ass_InsomniaOptions";
				commentName = "ND_Ass_InsomniaComments";
				break;
			case "ND_Ass_Distress":
				selectName = "ND_Ass_DistressOptions";
				commentName = "ND_Ass_DistressComments";
				break;
			case "ND_Ass_Diarrhea":
				selectName = "ND_Ass_DiarrheaOptions";
				commentName = "ND_Ass_DiarrheaComments";
				break;
			case "ND_Ass_Dyspnea":
				selectName = "ND_Ass_DyspneaOptions";
				commentName = "ND_Ass_DyspneaComments";
				break;
			case "ND_Ass_Neuropathy":
				selectName = "ND_Ass_NeuropathyOptions";
				commentName = "ND_Ass_NeuropathyComments";
				break;
			case "ND_Ass_Other":
				selectName = "";
				commentName = "ND_Ass_OtherComments";
				break;
		}

		if ("" !== selectName ) {
			selectTag = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + selectName + "\"]")[0];
		}
		comments = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + commentName + "\"]")[0];

		if (btn.value) {
			NoneCkBox.setValue(false);
			comments.show();
			if ("" !== selectName ) {
				selectTag.show();
				selectTag.focus(true, true);
			}
			else {
				comments.focus(true, true);
			}

		}
		else {
			if ("" !== selectName ) {
				selectTag.hide();
				selectTag.setValue("");
			}
			comments.hide();
			comments.setValue("");
		}
	},

	AssessmentsPost : function(records, Patient, theApp) {
		var params = Ext.encode(records);
		var CMD = "POST";
		var URL = Ext.URLs.AddND_Assessment + "/" + Patient.PAT_ID;
		if (Patient.AssessmentRecordID) {
			CMD = "PUT";
			URL += "/" + Patient.AssessmentRecordID;
		}
		// theApp.loadMask("Saving Pretreatment Assessment Information...");
		Ext.Ajax.request({
			url: URL,
			method : CMD,
			jsonData : params,
			scope: this,
			success: function( response, opts ){
				// theApp.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + resp.msg );
				}
				else {
					theApp.fireEvent("loadAdverseEventsHistory");
					Ext.MessageBox.alert("Pretreatment Assessment", "Pretreatment Assessment Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
					Patient.AssessmentRecordID = resp.AssessmentID;
				}
			},
			failure : function( response, opts ) {
				// theApp.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - <br />" + resp.msg );
			}
		});
	},

	SaveAssessments : function() {
		var Patient = this.application.Patient;

		var assFormChecks = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment checkbox");
		var i, v, haveChecks = false, numChecks = assFormChecks.length, assFormCheck, assFormValue, assFormOption, assFormComments, assFormCommentsValue;
		var records = {}, assessmentsCount = 0;
		records.patientId = Patient.id;
		records.Details = [];

		for (i = 0; i < numChecks; i++) {
			assFormCheck = assFormChecks[i];
			v = assFormCheck.getValue();
			if (v) {
				haveChecks = true;
				assFormOption = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + assFormCheck.name + "Options\"]");
				assFormComments = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + assFormCheck.name + "Comments\"]");
				assFormValue = 0;
				assFormCommentsValue = "";
				if (assFormOption && assFormOption.length > 0) {
					assFormValue = assFormOption[0].getRawValue();
					if (null === assFormValue) {
						assFormValue = '';
					}
				}
				if (assFormComments) {
					assFormCommentsValue = assFormComments[0].getValue();
				}
				records.Details[assessmentsCount++] = { "sequence" : i, "fieldLabel" : assFormCheck.boxLabel, "choice" : true, "comments" : assFormCommentsValue, "levelChosen" : assFormValue};
			}
		}
		var NoneCkBox = this.getNoAdverseReactions();
		var NoAdverseState = NoneCkBox.getValue();
		if (NoAdverseState) {
		}
		else {
			if (haveChecks) {
				var PAT_ID = this.application.Patient.PAT_ID;	/* PAT_ID is used rather than just the Patient ID, because it defines a patient/treatment Regimen */
				var view = Ext.widget("SelectAdverseReactionAlerts", { "PAT_ID" : PAT_ID, "type" : "Pretreatment Assessments", "records" : records, "scope" : this, "fnc" : this.AssessmentsPost });


			}
			else {
				Ext.MessageBox.alert("Saving Error", "If there are no Adverse Events then you must check the \"No Adverse Reaction since Last Treatment\" checkbox" );
			}
		}
	}
});


