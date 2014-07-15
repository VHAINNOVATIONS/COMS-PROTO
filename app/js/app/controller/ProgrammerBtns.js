Ext.define("COMS.controller.ProgrammerBtns", {
	extend: "Ext.app.Controller",
	views: [
		"ProgrammerBtns"
	],

	init: function () {
		this.control({
			"scope" : this,
			"ProgrammerBtns button[text=\"Load Treatment Data\"]" : {
				"click" : this.ClickLoadTreatmentData
			}
		});
	},


	ClickLoadTreatmentData : function(theBtn) {
		if (!this.application.Patient) {
			alert("Patient has not been selected/loaded yet");
			debugger;
		}
		else {
			// var theStore = Ext.getStore("ND_Treatment");
			// this.application.Patient.TreatmentStore = theStore;
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			thisCtl.LoadPreviousTreatmentData();
		}
	}
});
