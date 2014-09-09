Ext.define("COMS.controller.ProgrammerBtns", {
	extend: "Ext.app.Controller",
	views: [
		"ProgrammerBtns",
		"NewPlan.CTOS.FlowSheetOptionalQues",
		"NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions",
		"TemplateList.puWinListPatients"
	],

	init: function () {
		this.control({
			"scope" : this,
			
			"ProgrammerBtns button[text=\"Debugger\"]" : {
				"click" : this.ClickDebugger
			},
			"ProgrammerBtns button[text=\"Load Treatment Data\"]" : {
				"click" : this.ClickLoadTreatmentData
			},
			"ProgrammerBtns button[text=\"FS Optional Ques\"]" : {
				"click" : this.ClickShowFSOptionalQues
			},
			"ProgrammerBtns button[text=\"Infusion Reactions\"]" : {
				"click" : this.ClickShowInfusionReactions
			},
			"ProgrammerBtns button[text=\"Refresh Cumulative Dosing\"]" : {
				"click" : this.ClickRefreshCumulativeDosing
			},
			"ProgrammerBtns button[text=\"Add Cumulative Dosing\"]" : {
				"click" : this.ClickAddCumulativeDosing
			},
			"ProgrammerBtns button[text=\"Patients List\"]" : {
				"click" : this.ClickPatientsList
			}
		});
	},

	PatientCheck : function() {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
			return false;
		}
		return true;
	},

	ClickDebugger : function() {
		debugger;
	},


	ClickPatientsList : function() {
		if (!this.application.TemplateListPatients) {
			this.application.TemplateListPatients = [
				{
					"Patient_ID": "239103B8-7413-E411-BAD9-000C2935B86F",
					"Date_Started": "07/25/2014",
					"Template_ID": "EEFB3BB2-3134-41B9-BFFE-E05554783DDD",
					"First_Name": "PATIENT",
					"Last_Name": "ONEHUNDREDTHIRTY",
					"SSID": "o0130 ",
					"Name": "PATIENT ONEHUNDREDTHIRTY"
				},
				{
					"Patient_ID": "BCA19DBA-1314-E411-BAD9-000C2935B86F",
					"Date_Started": "07/25/2014",
					"Template_ID": "EEFB3BB2-3134-41B9-BFFE-E05554783DDD",
					"First_Name": "PATIENT",
					"Last_Name": "ONEHUNDREDTHIRTYONE",
					"SSID": "o0131 ",
					"Name": "PATIENT ONEHUNDREDTHIRTYONE"
				},
				{
					"Patient_ID": "14483335-1514-E411-BAD9-000C2935B86F",
					"Date_Started": "07/25/2014",
					"Template_ID": "EEFB3BB2-3134-41B9-BFFE-E05554783DDD",
					"First_Name": "PATIENT",
					"Last_Name": "ONEHUNDREDTHIRTYTWO",
					"SSID": "o0132 ",
					"Name": "PATIENT ONEHUNDREDTHIRTYTWO"
				},
				{
					"Patient_ID": "3D33A5FE-9A16-E411-BAD9-000C2935B86F",
					"Date_Started": "08/08/2014",
					"Template_ID": "EEFB3BB2-3134-41B9-BFFE-E05554783DDD",
					"First_Name": "PATIENT",
					"Last_Name": "ONEHUNDREDTHIRTYFIVE",
					"SSID": "o0135 ",
					"Name": "PATIENT ONEHUNDREDTHIRTYFIVE"
				}
			];
		}
		Ext.widget("puWinListPatients");
	},

	ClickAddCumulativeDosing : function() {
		if (this.PatientCheck()) {
			var thisCtl = this.getController("Common.puWinAddCumDose");
			var Info = { "MedID" : "B495474E-A99F-E111-903E-000C2935B86F", "UnitsID" : "AB85F3AA-0B21-E111-BF57-000C2935B86F", "AdministeredDose" : "54,321"};
			thisCtl.SaveNewCumDoseInfo( Info );
		}
	},

	ClickRefreshCumulativeDosing : function() {
		if (this.PatientCheck()) {
			var thisCtl = this.getController("Common.puWinAddCumDose");
			thisCtl.RefreshPatientInfoDetails();
		}
	},

	ClickShowInfusionReactions : function() {
		if (this.PatientCheck()) {
			var InfusionReactions = Ext.widget("puWinViewInfusionReactions");
			InfusionReactions = InfusionReactions;
		}
	},

	ClickShowFSOptionalQues : function() {
		var OptQues = Ext.widget("FlowSheetOptionalQues");
		OptQues = OptQues;
	},

	ClickLoadTreatmentData : function() {
		if (this.PatientCheck()) {
			// var theStore = Ext.getStore("ND_Treatment");
			// this.application.Patient.TreatmentStore = theStore;
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			thisCtl.LoadPreviousTreatmentData();
		}
	}
});
