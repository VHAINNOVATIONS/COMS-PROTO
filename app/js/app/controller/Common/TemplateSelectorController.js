Ext.define("COMS.controller.Common.TemplateSelectorController", {
	"extend": "Ext.app.Controller",

	"models": [
		"Cancer", "CancerStage", "Template"
	],
	"stores": [
		"CancerList", "CancerStageList", "TemplateList"
	],
	"views": [
		"Common.TemplateSelector"
	],

	"refs": [{
		"ref": "CancerSelector",
		"selector": "TemplateSelector [name=\"CancerSelector\"]"
	}],

	"init": function() {
		this.control({
			"TemplateSelector radiogroup": {
				"change": this.onTemplateSrcSelect
			}
		});
	},
	"onTemplateSrcSelect": function(obj, value) {
		debugger;
		var theStore = this.getCancerSelector().getStore();
		theStore.load({
			"scope": this,
			"params": {
				"location": value.templateSrc
			},
			"failure": function(records, operation, a, b) {
				debugger;
			},
			"success": function(records, operation, a, b) {
				debugger;
			},
			"callback": function(records, operation, a, b) {
				debugger;
			}
		});
	}
});