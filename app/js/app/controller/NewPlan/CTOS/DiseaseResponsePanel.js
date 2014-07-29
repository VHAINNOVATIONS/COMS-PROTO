Ext.define("COMS.controller.NewPlan.CTOS.DiseaseResponsePanel", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
		"NewPlan.CTOS.ToxicitySideEffectsPanel"
	],

    refs: [
		{ ref: "SaveBtn",					selector: "FlowSheetOptionalQues button[text=\"Save\"]"},
		{ ref: "ToxDetails",				selector: "FlowSheetOptionalQues [name=\"ToxDetails\"]"}
	],

	init: function () {
		this.control({
			"scope" : this,
			"FlowSheetOptionalQues button[text=\"Save\"]" : {
				//click: this.Save
			},
			"FlowSheetOptionalQues combobox[name=\"ToxInstr\"]" : {
				//"change" : this.SelectToxInstr
			}
		});
	}

});