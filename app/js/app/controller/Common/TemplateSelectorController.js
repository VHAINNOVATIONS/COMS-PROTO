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

	"refs": [
		
		{ "ref" : "SelectByCancer",            "selector" : "TemplateSelector [name=\"CSelectByCancer\"]" },
		{ "ref" : "LocationSelector",          "selector" : "TemplateSelector radiogroup" },
		{ "ref" : "BtnResetFilter",             "selector" : "TemplateSelector button[title=\"ResetFilter\"]" },

		{ "ref" : "CancerSelector",            "selector" : "TemplateSelector [name=\"CancerSelector\"]" },
		{ "ref" : "NoCancerStageMsg",          "selector" : "TemplateSelector [name=\"NoCancerStageSpecified\"]" },
		{ "ref" : "CancerStageSelector",       "selector" : "TemplateSelector [name=\"CancerStageSelector\"]" },
		{ "ref" : "TemplateByLocationList",    "selector" : "TemplateSelector [name=\"TemplateByLocationList\"]" },

		{ "ref" : "SelectAllTemplates",        "selector" : "TemplateSelector [name=\"CSelectAllTemplates\"]" },
		{ "ref" : "AllTemplateSelector",      "selector" : "TemplateSelector [name=\"AllTemplateSelector\"]" },
		{ "ref" : "BtnSetFilter",              "selector" : "TemplateSelector button[title=\"SetFilter\"]" }
	],


	"init": function() {
		this.control({
			"TemplateSelector" : {
				"afterrender" : this.onTemplateSelectorLoaded
			},
			"TemplateSelector button[name=\"ShowAllTemplatesBtn\"]" : {
				"click" : this.onResetFilter
			},
			"TemplateSelector button[title=\"SetFilter\"]" : {
				"click" : this.onSetFilter
			},
			"TemplateSelector radiogroup": {
				"change": this.onTemplateLocSelect
			},
			"TemplateSelector [name=\"CancerSelector\"]" : {
				"select" : this.onCancerSelect
				// "change" : this.onCancerSelect
			},
			"TemplateSelector [name=\"CancerStageSelector\"]" : {
				"select" : this.onCancerStageSelect
				// "change" : this.onCancerStageSelect
			},
			"TemplateSelector [name=\"AllTemplateSelector\"]" : {
				"select" : this.onAllTemplateSelect
				// "change" : this.onAllTemplateSelect
			},
			"TemplateSelector [name=\"TemplateByLocationList\"]" : {
				"select" : this.onTemplateByLocationSelect
				// "change" : this.onTemplateByLocationSelect
			}
		});
	},



	"baseSelector" : function(obj, endObj) {
		var thePanel = obj.up("panel");
		var query, qStr;
		if (thePanel.name) {
			query = "[name=\"" + thePanel.name + "\"]";
		}
		else {
			query = "[title=\"" + thePanel.title + "\"]";
		}
		qStr = query + " TemplateSelector [name=\"" + endObj + "\"]";
		var theObj = Ext.ComponentQuery.query(qStr);
console.log(qStr);
console.log(theObj.length);
		return theObj[0];
	},

	"SelectByCancer" : function(obj) {
		return this.baseSelector(obj, "CSelectByCancer");
	},

	"LocationSelector" : function(obj) {
		return this.baseSelector(obj, "rbSelectLocation");
	},

	"CancerSelector" : function(obj) {
		return this.baseSelector(obj, "CancerSelector");
	},

	"NoCancerStageMsg" : function(obj) {
		return this.baseSelector(obj, "NoCancerStageSpecified");
	},

	"CancerStageSelector" : function(obj) {
		return this.baseSelector(obj, "CancerStageSelector");
	},

	"TemplateByLocationList" : function(obj) {
		return this.baseSelector(obj, "TemplateByLocationList");
	},

	"AllTemplateSelector" : function(obj) {
		return this.baseSelector(obj, "AllTemplateSelector");
	},

	"BtnSetFilter" : function(obj) {
		return this.baseSelector(obj, "SelectTemplateByLocationBtn");
	},

	"BtnResetFilter" : function(obj) {
		return this.baseSelector(obj, "ShowAllTemplatesBtn");
	},

	"SelectAllTemplates" : function(obj) {
		return this.baseSelector(obj, "CSelectAllTemplates");
	},

	"NoCancerStageSpecified" : function(obj) {
		return this.baseSelector(obj, "NoCancerStageSpecified");
	},

	"onTemplateSelectorLoaded" : function(obj) {
		// debugger;
	},

	"resetAllCombos" : function(obj) {
		var theCombo;
		this.selectedCancer = "";

		theCombo = this.CancerSelector(obj);
		theCombo.lastQuery = null;
		theCombo.reset();
		theCombo.hide();

		theCombo = this.CancerStageSelector(obj);
		theCombo.lastQuery = null;
		theCombo.reset();
		theCombo.hide();

		theCombo = this.TemplateByLocationList(obj);
		theCombo.lastQuery = null;
		theCombo.reset();
		theCombo.hide();

		theCombo = this.AllTemplateSelector(obj);
		theCombo.lastQuery = null;
		theCombo.reset();
		theCombo.hide();

		theCombo = this.NoCancerStageMsg(obj);
		theCombo.hide();
	},

	"onSetFilter" : function(obj) {
		this.resetAllCombos(obj);
		this.SelectByCancer(obj).show();
		this.SelectAllTemplates(obj).hide();
		this.LocationSelector(obj).reset();
	},

	"onResetFilter" : function(obj) {
		this.resetAllCombos(obj);
		this.LocationSelector(obj).reset();

		this.SelectByCancer(obj).hide();
		this.SelectAllTemplates(obj).show();

		var theCombo = this.AllTemplateSelector(obj);
		theCombo.show();
		var theStore = theCombo.getStore();
		theStore.load({
			"scope": this,
			"params": {
				"cancerid": "ALL"
			}
		});
	},


	

	"onTemplateByLocationSelect" : function(theCombo, value) {
		var SrcPanel = theCombo.up("panel");
		var Template = value[0].getData();
		this.application.fireEvent("TemplateSelected", {"src" : SrcPanel, "template": Template});
	},
	"onAllTemplateSelect" : function(theCombo, value) {
		var SrcPanel = theCombo.up("panel");
		var Template = value[0].getData();
		this.application.fireEvent("TemplateSelected", {"src" : SrcPanel, "template": Template});
	},


	"onTemplateLocSelect": function(obj, value) {
		var qParam = value.templateSrc;
		this.resetAllCombos(obj);

		var theBtn = this.BtnResetFilter(obj);
		theBtn.show();

		var theCombo = this.CancerSelector(obj);
		theCombo.show();
		var theStore = theCombo.getStore();
		theStore.load({
			"scope": this,
			"params": {
				"location": qParam
			}
		});
	},

	"onCancerSelect" : function(obj, value) {
		var theCombo = this.CancerStageSelector(obj)
		theCombo.hide();
		theCombo.reset();

		var tmpCombo = this.NoCancerStageMsg(obj);
		tmpCombo.hide();
		tmpCombo = this.TemplateByLocationList(obj);
		tmpCombo.hide();
		tmpCombo.reset();

		var theCancer = value[0].getData();
		this.selectedCancer = theCancer;

		var theMsg;
		var theStore = theCombo.getStore();
		theCombo.lastQuery = null; 
		theStore.loadData([],false);
		theCombo.show();

		theStore.load({
			"scope": this,
			"params": {
				"cancerid": theCancer.CancerID
			},
			"callback" : function( records, operation, a, b) {
					// debugger;
				theCombo = this.CancerStageSelector(obj);
				if (records.length > 0) {
					theCombo.show();
				}
				else {
					theCombo.hide();
					theMsg = this.NoCancerStageMsg(obj);
					theMsg.show();
					var theCombo = this.TemplateByLocationList(obj);
					theCombo.show();
					var theStore = theCombo.getStore();
					theCombo.lastQuery = null; 
					theStore.load({
						"scope": this,
						"params": {
							"cancerid": theCancer.CancerID
						},
						"callback" : function( records, operation, a, b) {
						}
					});
				}
			}
		});
	},

	"onCancerStageSelect" : function(obj, value) {
		var theCancer = this.selectedCancer;
		this.selectedCancer = "";
		var theCombo = this.TemplateByLocationList(obj);
		theCombo.show();
		var theStore = theCombo.getStore();
		theCombo.lastQuery = null; 
		theStore.load({
			"scope": this,
			"params": {
				"cancerid": theCancer.CancerID
			},
			"callback" : function( records, operation, a, b) {
			}
		});
	}
});
