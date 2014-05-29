Ext.define("COMS.controller.Common.puWinSelCancer", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	refs: [
		{ ref: "Disease",		selector: "selDisease"},
		{ ref: "DiseaseStage",	selector: "selDiseaseStage"}
	],


	init: function() {
		this.control({
			"selDisease": {
				select: this.piDiseaseSelected
			},
			"selDiseaseStage": {
				select: this.onDiseaseStageChange,
				beforequery : function(qe) {
					// debugger;
					// delete qe.combo.lastQuery;
					// qe.combo.store.removeAll();
				}
			},
		});
	},

	piDiseaseSelected: function (combo, recs, eOpts) {
		debugger;
		this.application.Cancer = recs[0].data;
		var stage = this.getDiseaseStage();
		var stageStore = stage.getStore();
		stageStore.removeAll();
		stageStore.load({
			params : {
				URL : Ext.URLs.DiseaseStage + "/",
				ID  : this.application.Cancer.id
			},
			callback : function(records, operation, success) {
				debugger;
				if(success){
					stage.setRawValue("");
					stage.setValue("");
				}
			}
		});
	},

	onDiseaseStageChange: function (combo, recs, eOpts) {
		debugger;
		this.application.Cancer.Stage = recs[0].data;
	}
});