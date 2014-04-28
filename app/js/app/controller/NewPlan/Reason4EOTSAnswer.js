Ext.define("COMS.controller.NewPlan.Reason4EOTSAnswer", {
    extend : "Ext.app.Controller",
    stores : [
    ],

	models : ["EndTreatmentSummary"],

    views : [
		"NewPlan.Reason4EOTSAnswer"
    ],

    refs: [
		{ ref: "Reason4EOTSHead", selector: "EndTreatmentSummary [name=\"Reason4EOTSHead\"]"},

		// Radio Groups
		{ ref: "Reason4EOTSAnswer", selector: "EndTreatmentSummary [name=\"Reason4EOTSAnswer\"]"},
		{ ref: "Reason4EOTS_TCReason", selector: "EndTreatmentSummary [name=\"Reason4EOTS_TCReason\"]"},
		{ ref: "Reason4EOTS_PDReason", selector: "EndTreatmentSummary [name=\"Reason4EOTS_PDReason\"]"},

		// Radio Buttons for each group
		{ ref: "EOTS_Reason", selector: "EndTreatmentSummary [name=\"EOTS_Reason\"]"},
		{ ref: "EOTS_TChange", selector: "EndTreatmentSummary [name=\"EOTS_TChange\"]"},
		{ ref: "EOTS_PDChange", selector: "EndTreatmentSummary [name=\"EOTS_PDChange\"]"},

		// "Other" text fields for "Other" option for each group
		{ ref: "EOTS_ReasonOther", selector: "EndTreatmentSummary [name=\"EOTS_ReasonOther\"]"},
		{ ref: "EOTS_TChangeOther", selector: "EndTreatmentSummary [name=\"EOTS_TChangeOther\"]"},
		{ ref: "EOTS_PDChangeOther", selector: "EndTreatmentSummary [name=\"EOTS_PDChangeOther\"]"}
	],


    init: function() {
        wccConsoleLog("Initialized Reason for End of Treatment Controller!");
        this.control({

				// Change Button in one of the 3 Radio Groups
			"EndTreatmentSummary [name=\"Reason4EOTSAnswer\"]" : {
				change : this.Reason4Change1
			},
			"EndTreatmentSummary [name=\"Reason4EOTS_TCReason\"]" : {
				change : this.Reason4Change2
			},
			"EndTreatmentSummary [name=\"Reason4EOTS_PDReason\"]" : {
				change : this.Reason4Change3
			},

			"EndTreatmentSummary [name=\"EOTS_ReasonOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			},
			"EndTreatmentSummary [name=\"EOTS_TChangeOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			},
			"EndTreatmentSummary [name=\"EOTS_PDChangeOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			}
        });
    },

	Look4Enter : function( theField, evt, eOpts ) {
		var theKey = evt.getKey();
		if (evt.ENTER === theKey) {
			this.Reason4ChangeDone( theField, "", "", eOpts);
		}
	},


		// Reason4EOTSAnswer btn has changed
	Reason4Change1 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},

		// Reason4EOTS_TCReason btn has changed
	Reason4Change2 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},

		// Reason4EOTS_PDReason btn has changed
	Reason4Change3 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},



	Reason4Change : function( theField, nValue, oValue, eOpts) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var Head = thisCtl.getReason4EOTSHead();
		var FieldName = theField.name;
		var ReasonMsg = "";
		var EndOfChange = false;

// Reason4EOTSAnswer is the name of the group of buttons for the top level
// EOTS_Reason is the name of the Radio Buttons for the top level.
// EOTS_ReasonOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTSAnswer = this.getReason4EOTSAnswer();
		var EOTS_Reason = this.getEOTS_Reason();
		var EOTS_ReasonOther = this.getEOTS_ReasonOther();

// Reason4EOTS_TCReason is the name of the group of buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
// EOTS_TChange is the name of the Radio Buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
// EOTS_TChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_TCReason = this.getReason4EOTS_TCReason();
		var EOTS_TChange = this.getEOTS_TChange();
		var EOTS_TChangeOther = this.getEOTS_TChangeOther();

// Reason4EOTS_PDReason is the name of the group of buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
// EOTS_PDChange is the name of the Radio Buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
// EOTS_PDChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_PDReason = this.getReason4EOTS_PDReason();
		var EOTS_PDChange = this.getEOTS_PDChange();
		var EOTS_PDChangeOther = this.getEOTS_PDChangeOther();

		Reason4EOTSAnswer.hide();
		EOTS_ReasonOther.hide();

		Reason4EOTS_TCReason.hide();
		EOTS_TChangeOther.hide();

		Reason4EOTS_PDReason.hide();
		EOTS_PDChangeOther.hide();


		// Determine which radio button was clicked and show/hide appropriate sections as needed
		if ("Reason4EOTSAnswer" === FieldName) {	// Top level radio button clicked
			ReasonMsg = nValue.EOTS_Reason;

			if ("Treatment Change" === ReasonMsg ) {	// If Treatment Change is checked then need to display secondary set of Radio Buttons
				Reason4EOTS_TCReason.show();		// Secondary set of Radio Buttons
				Reason4EOTSAnswer.show();
			}
			else if ("Patient Discontinuation" === ReasonMsg ) {	// If Patient Discontinuation is checked then need to display secondary set of Radio Buttons
				Reason4EOTS_PDReason.show();		// Secondary set of Radio Buttons
				Reason4EOTSAnswer.show();
			}
			else if ("Other" === ReasonMsg) {	// Needs to show the text field for an "Other" reason
				EOTS_ReasonOther.show();
				Reason4EOTSAnswer.show();
			}
			else {
				EndOfChange = true;
			}
		}

		// Treatment Change - Process Secondary Buttons
		else if ("Reason4EOTS_TCReason" === FieldName) {	// User has selected "Treatment Change" so this handles the secondary radio buttons
			ReasonMsg = "Treatment Change - " + nValue.EOTS_TChange;

			if ("Other" === nValue.EOTS_TChange) {	// Needs to show the text field for an "Other" reason for "Treatment Change"
				Reason4EOTS_TCReason.show();		// Secondary set of Radio Buttons
				EOTS_TChangeOther.show();
				Reason4EOTSAnswer.show();
			}
			else {
				EndOfChange = true;
			}
		}

		// Patient Discontinuation - Process Secondary Buttons
		else if ("Reason4EOTS_PDReason" === FieldName) {	// User has selected "Patient Discontinuation" so this handles the secondary radio buttons
			ReasonMsg = "Patient Discontinuation - " + nValue.EOTS_PDChange;

			if ("Other" === nValue.EOTS_PDChange) {	// Needs to show the text field for an "Other" reason for "Patient Discontinuation"
				EOTS_PDChangeOther.show();
				Reason4EOTSAnswer.show();
				Reason4EOTS_PDReason.show();
			}
			else {
				EndOfChange = true;
			}
		}




		else if ("EOTS_ReasonOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = nValue;
		}
		else if ("EOTS_TChangeOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = "Treatment Change - " + nValue;
		}
		else if ("EOTS_PDChangeOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = "Patient Discontinuation - " + nValue;
		}


		var Reason = "<span style=\"font-weight: normal; font-size: 100%;\">" + ReasonMsg + "</span>";
		var ChangeBtn = "";
		
		if (EndOfChange) {
			ChangeBtn = "<button class=\"anchor\" name=\"ChangeReason\" style=\"margin-left: 1em;\">Change</button>";
			this.FinishUpReason4Change(Reason, ChangeBtn);
		}
		else {
			thisCtl.getReason4EOTSHead().el.setHTML("<h2>Reason for generating End of Treatment Summary - " + Reason + ChangeBtn + "</h2>");
		}
	},





	Reason4ChangeDone : function( theField, nValue, oValue, eOpts) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var answer1 = thisCtl.getReason4EOTSAnswer().getValue();
		var answer2 = thisCtl.getReason4EOTS_TCReason().getValue();
		var answer3 = thisCtl.getReason4EOTS_PDReason().getValue();

		var answer = "";
		if ("Treatment Change" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + answer1.EOTS_TChange + " - " + theField.value;
		}
		else if ("Patient Discontinuation" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + answer1.EOTS_PDChange + " - " + theField.value;
		}
		else if ("Other" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + theField.value;
		}

		var ChangeBtn = "<button class=\"anchor\" name=\"ChangeReason\" style=\"margin-left: 1em;\">Change</button>";
		this.FinishUpReason4Change(answer, ChangeBtn);

	},


	FinishUpReason4Change : function(Reason, Btn) {
		this.EoTSData.EndReason = Reason;
		var Patient = this.application.Patient;
		this.getReason4EOTSHead().el.setHTML("<h2>Reason for generating End of Treatment Summary - " + Reason + Btn + "</h2>");
		var ChangeBtnEl = Ext.ComponentQuery.query("EndTreatmentSummary")[0].el.select("button.anchor");
		ChangeBtnEl.on("click", this.HandleChangeClicks, this);

		this.EoTSData.TreatmentOriginalEnd = "";

		var i, tHist = Patient.TemplateHistory;
		var thLen = 0;
		if (tHist) {
			thLen = tHist.length;
		}
		if (this.application.Patient.EoTS_TemplateID === Patient.TemplateID) {		// Terminating current template
			this.EoTSData.TreatmentStart = Patient.TreatmentStart;
			this.EoTSData.TreatmentOriginalEnd = Patient.TreatmentEnd;
			this.EoTSData.TreatmentEnd = Ext.Date.format(new Date(), "m/d/Y");
		}
		else {
			for (i = 0; i < thLen; i++) {
				if (tHist[i].TemplateID === this.application.Patient.EoTS_TemplateID) {
					this.EoTSData.TreatmentStart = tHist[i].DateStarted;
					this.EoTSData.TreatmentEnd = tHist[i].DateEnded;
				}
			}
		}

		this.EoTSData.Name = Patient.name;
		this.EoTSData.PatientID = Patient.id;		// MWB - 6/12/2012
		this.EoTSData.PAT_ID = Patient.PAT_ID;


		this.EoTSData.Gender = Patient.Gender;
		this.EoTSData.Age = Patient.Age;
		this.EoTSData.DOB = Patient.DOB;
		this.EoTSData.Amputations = Patient.Amputations;
		this.EoTSData.TemplateName = this.application.Patient.EoTS_TemplateName;
		this.EoTSData.TemplateID = this.application.Patient.EoTS_TemplateID;
		this.EoTSData.TemplateDescription = "";
		this.EoTSData.TreatmentStatus = "Ended";
		this.EoTSData.Disease = Patient.Disease;		// Contains an array of objects consisting of { Type : "", Stage : ""}
		this.EoTSData.Allergies = Patient.Allergies;	// Contains an array of objects consisting of { name : "", type : "", comment : "" }
		this.EoTSData.Trial = Patient.ClinicalTrial || "NOT a clinical trial";

		this.getVitals();

		var Ctl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");

		
		thisCtl.CycleDates = [];
		thisCtl.PerformanceStatus = [];
		thisCtl.DiseaseResponse = [];
		thisCtl.Toxicity = [];
		thisCtl.Other = [];
		thisCtl.Drugs = [];

		thisCtl.EoTS_PerformanceStatus = [];
		thisCtl.EoTS_DiseaseResponse = [];
		thisCtl.EoTS_Toxicity = [];
		thisCtl.EoTS_Other = [];
		thisCtl.EoTS_Drugs = [];
		
		
		var Flowsheet = Ctl.createFlowsheet(thisCtl.parseFlowsheetData);

		this.EoTSData.OriginalEnd = this.application.Patient.TreatmentEnd;
		this.EoTSData.Meds = this.EoTS_Drugs;
		this.EoTSData.DiseaseResponse = this.EoTS_DiseaseResponse;
		this.EoTSData.Toxicity = this.EoTS_Toxicity;
		this.EoTSData.Other = this.EoTS_Other;

		this.EoTSData.TreatmentReport = "";
		this.EoTSData.PatientDiseaseResponse = "";
		this.EoTSData.ToxicitySideEffects = "";
		this.EoTSData.ProviderReport = "";
		this.EoTSData.FollowUpAppointments = "";

		this.getReason4EOTSAnswer().hide();
		this.getPatientInfoTable().show();
		this.getPatientInfoTableHeader().show();
		this.getPatientInfoTableBody().show();
		this.getSaveBtn().show();
		this.getCancelBtn().show();


		var PatientInfo = this.application.Patient;
		var PITableHdr = this.getPatientInfoTableHeader();
		var PITable = this.getPatientInfoTable();

		PITableHdr.update( this.EoTSData );

		PITable.update( this.EoTSData );

		this.application.unMask();
	}


});