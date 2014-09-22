
// End of Treatment Summary Controller
// Requires the model: 
//		EndTreatmentSummary
//
// Requires the URL for Reading:
//		Ext.URLs.EoTS = "/EndTreatmentSummary/EoTS";
// Param = EoTS GUID;
// Returns data structure for a specific EoTS;
// Example Usage - https://devtest.dbitpro.com/EndTreatmentSummary/EoTS/28225CF5-3937-E111-9B9C-000C2935B86F

// Requires the URL for Writing/Posting EoTS to SQL:
//		Ext.URLs.AddEoTS = "/EndTreatmentSummary/EoTS";
// Expects a POST data consistent with the EndTreatmentSummary Model
//
Ext.define("COMS.controller.NewPlan.EndTreatmentSummary", {
    extend : "Ext.app.Controller",
	EoTSData : {},		// This is used for storing the EoTS Data calculated within this controller rather than passing a variable around.
						// This will be the record stored on the back end when saving the EoTS
						// 
						// EoTS Record Object {
						//	Name - Taken directly from PatientInfo
						//	Gender - Taken directly from PatientInfo
						//	Age - Taken directly from PatientInfo
						//	DOB - Taken directly from PatientInfo
						//	Amputations - Taken directly from PatientInfo
						//	EoTS_TemplateName - Taken directly from PatientInfo
						//	TemplateDescription - Taken directly from PatientInfo
						//	TreatmentStatus - Taken directly from PatientInfo (but SHOULD be "Completed" plus the "End Reason"
						//	TreatmentStart - Taken directly from PatientInfo
						//	TreatmentEnd - Taken directly from PatientInfo
						//	Vitals - getVitals()
						//	EndReason - FinishUpReason4Change()
						// }

    stores : [
    ],

	models : ["EndTreatmentSummary"],

    views : [
		"NewPlan.EndTreatmentSummary"
    ],

    refs: [
		{ ref: "PatientInfoTable", selector: "EndTreatmentSummary [name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableHeader", selector: "EndTreatmentSummary [name=\"PatientInfoTableHeader\"]"},
		{ ref: "PatientInfoTableBody", selector: "EndTreatmentSummary [name=\"PatientInfoTableBody\"]"},
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
		{ ref: "EOTS_PDChangeOther", selector: "EndTreatmentSummary [name=\"EOTS_PDChangeOther\"]"},

		{ ref: "ProviderReport", selector: "EndTreatmentSummary [name=\"ProviderReport\"]"},
		{ ref: "FollowUpAppointments", selector: "EndTreatmentSummary [name=\"FollowUpAppointments\"]"},


	    {
		    ref: "AdministeredMedsGrid",
			selector: "EndTreatmentSummary [name=\"AdministeredMedsGrid\"]"
	    },

	    {
		    ref: "DiseaseResponseGrid",
			selector: "EndTreatmentSummary [name=\"DiseaseResponseGrid\"]"
	    },
	    {
		    ref: "ToxicityGrid",
			selector: "EndTreatmentSummary [name=\"ToxicityGrid\"]"
	    },
	    {
		    ref: "OtherGrid",
			selector: "EndTreatmentSummary [name=\"OtherGrid\"]"
	    },
	    {
		    ref: "SaveBtn",
			selector: "EndTreatmentSummary button[action=\"save\"]"
		},
	    {
		    ref: "CancelBtn",
			selector: "EndTreatmentSummary button[action=\"cancel\"]"
		}

	],

    Start_EOTS1 : function() {
        wccConsoleLog("Start_EOTS1");
    },
    Start_EOTS2 : function() {
        wccConsoleLog("Start_EOTS2");
    },
    Start_EOTS3 : function() {
        wccConsoleLog("Start_EOTS3");
    },

    init: function() {  // called at application initialization time
        wccConsoleLog("Initialized End of Treatment Summary Controller!");
        this.control({
            "EndTreatmentSummary" : {
                beforeactivate: this.Start_EOTS3,
                beforerender: this.Start_EOTS2,
                beforeshow: this.Start_EOTS1,
				afterrender : this.AfterRenderWindow,
				close : this.CloseEoTSWin, 
				resize : this.ResizeTable
            },
            "EndTreatmentSummary button[action=\"save\"]": {
                click: this.SaveEoTS
            },
            "EndTreatmentSummary button[action=\"cancel\"]": {
                click: this.CancelEoTS
            },
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

	CycleDates : [],
	PerformanceStatus : [],
	DiseaseResponse : [],
	Toxicity : [],
	Other : [],
	Drugs : [],

	EoTS_PerformanceStatus : [],
	EoTS_DiseaseResponse : [],
	EoTS_Toxicity : [],
	EoTS_Other : [],
	EoTS_Drugs : [],

	parseFSData4EoTS : function( tType, dName, tDataStore, EoTS_DataStore, data ) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary"),
		    i, el, tmp, bl,
		    buf = [], 
		    HasDataFlag = false,
		    tmpEoTS;
		for (i in data) {
			if (data.hasOwnProperty(i) && "&nbsp;" !== i && "label" !== i) {
				el = data[i];
				if ("" !== el) {

					if (el.indexOf("<button") >= 0) {
						if (el.indexOf("Write</button") < 0) {
							var el2=el.replace(/<button class="anchor .*data="/,"").replace(/".*$/, "");
							if (unescape) {
                                el = unescape(el2);
                            }
                            else {
                                el = decodeURI(el2);
                            }
							el = el.replace(/\n/g, "<br />");
							if ("" === el2) {
								el = "No entry recorded";
							}
						}
						else {
							el = "";
						}
					}
					if ("" !== el) {
						if ("" === tType) {
							tmpEoTS = {};
							tmpEoTS.day = i;
							tmpEoTS.date = thisCtl.CycleDates[i];
							tmpEoTS.desc = el;
							buf.push("<tr><th style=\"width:10em;\">" + i + "</th><td style=\"width:10em;\">" + thisCtl.CycleDates[i] + "</td><td colspan=\"2\">" + el + "</td></tr>");
						}
						else {
							tmpEoTS = {};
							tmpEoTS.day = i;
							tmpEoTS.date = thisCtl.CycleDates[i];
							tmpEoTS.dosage = el;
							buf.push("<tr><th style=\"width:10em;\">" + i + "</th><td style=\"width:10em;\">" + thisCtl.CycleDates[i] + "</td><td colspan=\"2\">" + el + "</td></tr>");
						}
						HasDataFlag = true;
					}
				}
			}
		}
		if (HasDataFlag) {
			if ("" === tType) {
				tmp = {};
				tmp = Ext.apply({}, tmpEoTS);
			}
			else {
				tmp = {};
				tmp.administered = [];
				tmp.administered.push(tmpEoTS);
				tmp.name = dName;
			}
			EoTS_DataStore.push(tmp);
		}
		else {
			tmpEoTS = {};
			if ("" === tType) {
				tmpEoTS.day = "";
				tmpEoTS.date = "";
				tmpEoTS.desc = "No " + dName + ("Other" === dName? " Comments" : "") + " Recorded";
				buf.push("<tr><td colspan=\"4\">No " + dName + ("Other" === dName? " Comments" : "") + " Recorded</td></tr>");
			}
			else {
				tmpEoTS.name = dName;
				tmpEoTS.administered = [];
				buf.push("<tr><td colspan=\"4\">No " + dName + " Administered</td></tr>");
			}
			EoTS_DataStore.push(tmpEoTS);
		}
		var b1 = "<tr><th colspan=\"4\" style=\"font-weight:bold; padding-left: 2em; text-align: left;\">" + dName + "</th></tr>" + buf.join("");
		tDataStore.push(b1);
	},

	noParse : function( data ) {
	},

	parseFlowsheetData : function( ) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var pData = this.application.Patient.FlowsheetData;
		var i, j, elLen, pdLen = pData.length, el;

		thisCtl.CycleDates = {};
		for (i = 0; i < pdLen; i++) {
			el = pData[i];
			if ("Date" === el.label) {
				thisCtl.CycleDates = Ext.apply(thisCtl.CycleDates, el);
				break;
			}
		}

		for (i = 0; i < pdLen; i++) {
			el = pData[i];

			switch(el.label) {
				case "Weight (lbs)":
					thisCtl.noParse(el);
					break;
				case "Date":
					thisCtl.noParse(el);
					break;
				case "Performance Status":

					thisCtl.parseFSData4EoTS("", el.label, thisCtl.PerformanceStatus, thisCtl.EoTS_PerformanceStatus, el);
					break;
				case "Disease Response":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.DiseaseResponse, thisCtl.EoTS_DiseaseResponse, el);
					break;
				case "Toxicity Side Effects":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.Toxicity, thisCtl.EoTS_Toxicity, el);
					break;
				case "Other":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.Other, thisCtl.EoTS_Other, el);
					break;
				case "Unknown...":
					thisCtl.noParse(el);
					break;
				default :
					thisCtl.parseFSData4EoTS(el["&nbsp;"], el.label, thisCtl.Drugs, thisCtl.EoTS_Drugs, el);
					break;
			}
		}

		var theGrid = thisCtl.getAdministeredMedsGrid();
		var theGridEl = theGrid.getEl();
		theGridEl.update("<h2 style=\"margin-top: 2em;\">Medication Administered</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.Drugs.join("") + "</table>");

		theGrid = thisCtl.getDiseaseResponseGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Patient Disease Response</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.DiseaseResponse.join("") + "</table>");

		theGrid = thisCtl.getToxicityGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Toxicity Side Effects</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.Toxicity.join("") + "</table>");

		theGrid = thisCtl.getOtherGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Other Comments</h2><table class=\"InformationTable\" border=\"1\">" + thisCtl.Other.join("") + "</table>");

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
		
//		var Flowsheet = Ctl.createFlowsheet(thisCtl.parseFlowsheetData);
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
	},


		// Function called when user clicks on the "Change" link to change the reason for generating the EoTS
	HandleChangeClicks : function() {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		this.getReason4EOTSAnswer().show();
		var ChangeBtnEl = Ext.ComponentQuery.query("EndTreatmentSummary")[0].el.select("button.anchor");
		ChangeBtnEl.hide();

			// Reason4EOTSAnswer is the name of the group of buttons for the top level
			// EOTS_Reason is the name of the Radio Buttons for the top level.
			// EOTS_ReasonOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTSAnswer = this.getReason4EOTSAnswer();
		var answer1 = Reason4EOTSAnswer.getValue();
		var EOTS_Reason = this.getEOTS_Reason();
		var EOTS_ReasonOther = this.getEOTS_ReasonOther();

			// Reason4EOTS_TCReason is the name of the group of buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
			// EOTS_TChange is the name of the Radio Buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
			// EOTS_TChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_TCReason = this.getReason4EOTS_TCReason();
		var answer2 = Reason4EOTS_TCReason.getValue();
		var EOTS_TChange = this.getEOTS_TChange();
		var EOTS_TChangeOther = this.getEOTS_TChangeOther();

			// Reason4EOTS_PDReason is the name of the group of buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
			// EOTS_PDChange is the name of the Radio Buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
			// EOTS_PDChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_PDReason = this.getReason4EOTS_PDReason();
		var answer3 = Reason4EOTS_PDReason.getValue();
		var EOTS_PDChange = this.getEOTS_PDChange();
		var EOTS_PDChangeOther = this.getEOTS_PDChangeOther();

		if ("Treatment Change" === answer1.EOTS_Reason) {
			Reason4EOTS_TCReason.show();
			if ("Other" === answer2.EOTS_TChange) {
				EOTS_TChangeOther.show();
			}
		}
		else if ("Patient Discontinuation" === answer1.EOTS_Reason) {
			Reason4EOTS_PDReason.show();
			if ("Other" === answer3.EOTS_PDChange) {
				EOTS_PDChangeOther.show();
			}
		}

		this.getPatientInfoTable().hide();
		this.getPatientInfoTableHeader().hide();
		this.getPatientInfoTableBody().hide();
		this.getSaveBtn().hide();
		this.getCancelBtn().hide();

	},


	// Resize the EoTS Window based on the browser's size via the "onWindowResize" event handler
	AfterRenderWindow : function(theWin, eOPts) {
		Ext.EventManager.onWindowResize( this.ResizeTheEoTSWin, theWin );
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * 0.1;
		smaller = max - smaller;
		theWin.setHeight(smaller);
		Ext.Function.defer( theWin.focus, 2000, this );
	},

	ResizeTheEoTSWin : function() {
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * 0.1;
		smaller = max - smaller;
		this.setHeight(smaller);
	},

	ResizeTable : function(theWin, width, height, eOpts) {
		var tBody = this.getPatientInfoTableBody();
		if (tBody) {
			var max = theWin.getHeight();
			var smaller = max - 230;
			tBody.setHeight(smaller);
		}
	},


	// Make sure to remove the "onWindowResize" event handler when the EoTS window is closed.
	CloseEoTSWin : function(theWin, eOPts) {
		Ext.EventManager.removeResizeListener( this.ResizeTheEoTSWin, theWin );
	},

	SaveEoTS : function(button) {
        var win = button.up('window');
		var ProvRep = this.getProviderReport();
		var FUA = this.getFollowUpAppointments();
		this.EoTSData.ClinicalTrial = this.application.Patient.ClinicalTrial;

		this.EoTSData.ProviderReport = ProvRep.value;
		this.EoTSData.FollowUpAppointments = FUA.value;

		var EoTSSaveRecord = Ext.apply({}, this.EoTSData);
		delete EoTSSaveRecord.LastVitals;
		delete EoTSSaveRecord.FirstVitals;

        var EoTSRecord = Ext.create(Ext.COMSModels.EoTS, EoTSSaveRecord );

		EoTSRecord.save({
            scope: this,
            success: function (data) {
                wccConsoleLog("Saved EoTS " );
                if (win.widget ) {
                    Ext.widget(win.widget,{itemsInGroup: win.itemsInGroup, ChangeTemplate: win.ChangeTemplate});
                }
		        win.close();
				// alert("Update History display with to display EoTS via ID returned in data");
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var Patient = this.application.Patient;
				thisCtl.loadTemplates("Update Templates");

// MWB - 8/2/2012 Clear out current template info...
Patient.TemplateDescription = "";
Patient.TemplateID = "";
Patient.TreatmentEnd = "";
Patient.TreatmentStart = "";


			},
			failure : function (arg0, arg1) {
				alert("End of Treatment Summary Failure to save record...");
		        win.close();
			}
		});

	},

	CancelEoTS : function(button) {
        var win = button.up('window');
        win.close();
	},









//-----------------------------
//
// Get Vitals for EoTS
// This function is intended to get the vitals for a patient at the start and at the end of the treatment cycle.
// It should be examined again and probably tweaked when we have some consistent data to work with.
//
	getVitals : function() {
		var PatientInfo = this.application.Patient;
		var allVitals = PatientInfo.Vitals;
		var i, vitals, FirstVital = null, dt, vLen = allVitals.length;
		var soTreatment = new Date(this.EoTSData.TreatmentStart);
		var eoTreatment = new Date(this.EoTSData.TreatmentEnd);

		this.EoTSData.Vitals = [];
		for (i = vLen-1; i >= 0; i--) {
			vitals = allVitals[i];
			if (vitals.DateTaken) {
				if (0 === this.EoTSData.Vitals.length) {
					this.EoTSData.Vitals[0] = vitals;
					this.EoTSData.Vitals[1] = vitals;
				}
				dt = new Date(vitals.DateTaken);
				if (dt <= soTreatment) {
					this.EoTSData.Vitals[0] = vitals;
				}
				if (dt <= eoTreatment) {										// Right now our patients have vitals all over the place
					this.EoTSData.Vitals[1] = vitals;							// This code is intended to ensure that the FirstVital is before the Last Vital
				}
			}
		}
		this.EoTSData.FirstVitals = this.EoTSData.Vitals[0];		// The xTemplate view requires First/LastVitals, but the model uses an array of Vitals.
		this.EoTSData.LastVitals = this.EoTSData.Vitals[1];
	},

	createAdministeredMedsGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "AdministeredMedsStore";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	createDiseaseResponseGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "DiseaseResponseGrid";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	createToxicityGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "ToxicityGrid";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	buildEoTSGrid : function (theGrid, storeID, gFields, gCols, gData ) {
		var store = Ext.create('Ext.data.Store', {
		    storeId: storeID,
		    fields: gFields,
		    data: { storeID : gData },
		    proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: storeID
		        }
		    }
		});

		theGrid = Ext.create('Ext.grid.Panel', {
		    renderTo: theGrid.getEl(),
			autoScroll: 'y',
			columnLines: true,
			viewConfig: { stripeRows: true, forceFit: true },

		    store: Ext.data.StoreManager.lookup(storeID),
		    columns: gCols
		});

		theGrid.on("afterlayout", function() {
			theGrid.forceComponentLayout();	// Since the grid is added after the panel has been rendered, this function causes the panel to resize to fit the grid.
		}, this);
	}
});