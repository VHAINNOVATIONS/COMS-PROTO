Ext.define("COMS.controller.ProgrammerBtns", {
	extend: "Ext.app.Controller",
	views: [
		"ProgrammerBtns",
		"NewPlan.CTOS.FlowSheetOptionalQues",
		"NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions"
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
			}
		});
	},

	ClickDebugger : function(theBtn) {
		debugger;
	},

	ClickAddCumulativeDosing : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
		}
		else {
			var thisCtl = this.getController("Common.puWinAddCumDose");
			var Info = { "MedID" : "B495474E-A99F-E111-903E-000C2935B86F", "UnitsID" : "AB85F3AA-0B21-E111-BF57-000C2935B86F", "AdministeredDose" : "54,321"};
			thisCtl.SaveNewCumDoseInfo( Info );
		}
	},

	ClickRefreshCumulativeDosing : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
		}
		else {
			var thisCtl = this.getController("Common.puWinAddCumDose");
			thisCtl.RefreshPatientInfoDetails();
		}
	},

	ClickShowInfusionReactions : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
		}
		else {
			var InfusionReactions = Ext.widget("puWinViewInfusionReactions");
		}
	},

	ClickShowFSOptionalQues : function(theBtn) {
		var OptQues = Ext.widget("FlowSheetOptionalQues");
	},

	ClickLoadTreatmentData : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
		}
		else {
			// var theStore = Ext.getStore("ND_Treatment");
			// this.application.Patient.TreatmentStore = theStore;
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			thisCtl.LoadPreviousTreatmentData();
		}
	}
});
