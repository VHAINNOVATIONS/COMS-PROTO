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
			}
		});
	},

	ClickDebugger : function(theBtn) {
		debugger;
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
