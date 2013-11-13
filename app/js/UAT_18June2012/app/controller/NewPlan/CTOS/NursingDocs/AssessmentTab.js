/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.AssessmentTab", {
	extend: "Ext.app.Controller",

	stores: [
	],
	views: [
	],
	refs: [
	],

	// Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"ND_PA_CTCAE_TERM_001\"]")[0].getStore()
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Assessmment Tab Controller!");

		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});
	
		this.control({
			"NursingDocs_PretreatmentAssesment checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_Assessment button[action=\"save\"]": {
                click: this.SaveAssessments
            }
			
		});
	},


	PatientSelected : function() {
	},


	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var selectName, commentName, selectTag, comments;
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
			}
			comments.hide();
		}
	},


	SaveAssessments : function() {
		var Patient = this.application.Patient;

		var assFormChecks = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment checkbox");
		var i, v, haveChecks = false, numChecks = assFormChecks.length, assFormCheck, assFormValue, assFormOption, assFormComments, assFormCommentsValue;
		var record = {}, assessmentsCount = 0;
		record.patientId = Patient.id;
		record.assessmentDetails = [];

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
					assFormValue = assFormOption[0].getValue();
					if (null === assFormValue) {
						assFormValue = 0;
					}
				}
				if (assFormComments) {
					assFormCommentsValue = assFormComments[0].getValue();
				}

				record.assessmentDetails[assessmentsCount++] = { "sequence" : i, "fieldLabel" : assFormCheck.boxLabel, "choice" : true, "comments" : assFormCommentsValue, "levelChosen" : assFormValue};
			}
		}
		if (haveChecks)	{
			var params = Ext.encode(record);
			Ext.Ajax.request({
				url: Ext.URLs.AddND_Assessment,
				method : "POST",
				jsonData : params,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + resp.msg );
					}
					else {
						Ext.MessageBox.alert("Pretreatment Assessment", "Pretreatment Assessment Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + e.message + "<br />" + resp.msg );
				}
			});
		}
	}
});


