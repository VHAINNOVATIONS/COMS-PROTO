Ext.define("COMS.controller.Common.puWinSelCancer", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	refs: [
		{ ref: "Disease",		selector: "selDisease"},
		{ ref: "DiseaseStage",	selector: "selDiseaseStage"},
	{ ref: "DiseaseStageInput",	selector : "[name=\"Select Disease Stage Control\"]" }
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
		this.application.Cancer = recs[0].data;
		var stage = this.getDiseaseStage();
		var stageStore = stage.getStore();
		stageStore.removeAll();

					var stage = this.getDiseaseStage();
					var theStore = stage.getStore();
					var theInputField = this.getDiseaseStageInput();
					stage.setRawValue("");
					stage.setValue("");
					stage.clearValue();
					stage.reset();
					stage.resetOriginalValue();
					stage.lastSelection = [];

stage.clearValue();
stage.applyEmptyText();
stage.getPicker().getSelectionModel().doMultiSelect([], false);
var inputEl = stage.inputEl;
var orig = stage.originalValue;
var qu = stage.lastQuery;
var inputTagID = stage.getInputId();
var submitValue = stage.getSubmitValue()
var theValue = stage.getValue();



		stageStore.load({
			scope : this,
			params : {
				URL : Ext.URLs.DiseaseStage + "/",
				ID  : this.application.Cancer.id
			},
			callback : function(records, operation, success) {
				debugger;
				if(success){
					var stage = this.getDiseaseStage();
					var theStore = stage.getStore();
					var theInputField = this.getDiseaseStageInput();
					stage.setRawValue("");
					stage.setValue("");
					stage.clearValue();
					stage.reset();
					stage.resetOriginalValue();
					stage.lastSelection = [];

stage.clearValue();
stage.applyEmptyText();
stage.getPicker().getSelectionModel().doMultiSelect([], false);
// stage.bindStore(null);

var inputEl = stage.inputEl;
var orig = stage.originalValue;
var qu = stage.lastQuery;
var inputTagID = stage.getInputId();
var submitValue = stage.getSubmitValue()
var theValue = stage.getValue();





debugger;
				}
			}
		});
	},

	onDiseaseStageChange: function (combo, recs, eOpts) {
		this.application.Cancer.Stage = recs[0].data;
	}
});