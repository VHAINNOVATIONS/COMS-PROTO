Ext.define("COMS.controller.ProgrammerBtns", {
	extend: "Ext.app.Controller",
	views: [
		"ProgrammerBtns",
		"NewPlan.CTOS.FlowSheetOptionalQues"
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

		});
	},

	ClickDebugger : function(theBtn) {
		debugger;
	},

	ClickShowFSOptionalQues : function(theBtn) {
		var OptQues = Ext.widget("FlowSheetOptionalQues");
	},

	ClickLoadTreatmentData : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
			// debugger;
		}
		else {
			// var theStore = Ext.getStore("ND_Treatment");
			// this.application.Patient.TreatmentStore = theStore;
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			thisCtl.LoadPreviousTreatmentData();
		}
	}
});
