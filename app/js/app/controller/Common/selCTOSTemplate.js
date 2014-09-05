Ext.define("COMS.controller.Common.selCTOSTemplate", {
	"extend" : "Ext.app.Controller",
	"views" : [
		"Common.selCTOSTemplate"
	],
	"refs" : [
		{ ref: "selCTOSTemplate",				selector: "selCTOSTemplate"},
		{ ref: "ResetButton",					selector: "selCTOSTemplate button[title=\"ResetFilter\"]"},
		{ ref: "DiseaseAndStage",				selector: "selCTOSTemplate selDiseaseAndStage"},
		{ ref: "AllTemplatesShownMsg",			selector: "selCTOSTemplate [name=\"AllTemplatesShownMsg\"]"},
		{ ref: "Template",						selector: "selCTOSTemplate selTemplate[name=\"AllTemplates\"]"},
		{ ref: "Disease",						selector: "selCTOSTemplate selDiseaseAndStage selDisease"},
		{ ref: "DiseaseStage",					selector: "selCTOSTemplate selDiseaseAndStage selDiseaseStage"},
		{ ref: "selTemplateSrc",				selector: "selCTOSTemplate selTemplateSrc"}


	],
	init: function() {
		this.control({
			// "scope" : this,
			"selCTOSTemplate button[title=\"ResetFilter\"]" : {
				click : this.resetTemplateFilter
			},

			// "selCTOSTemplate fieldcontainer radiofield[name=\"SelectTemplateSrc\"]": {
			//	change: this.AuthorTypeSelected
			// },


			"selCTOSTemplate selTemplateSrc radiofield[name=\"SelectTemplateSrc\"]": {
				change : this.onTemplateSrcChange
			},
			"selCTOSTemplate selDisease" : {
				select : this.DiseaseSelected,
				"beforequery" : this.clearSelDiseaseComboStore
				// collapse: this.collapseCombo,
				// expand: this.loadCombo
			},
			"selCTOSTemplate selDiseaseStage" : {
				select : this.onDiseaseStageChange,
				// collapse: this.collapseCombo,
				// expand : this.loadCombo
			},
			"selCTOSTemplate selTemplate" : {
				select : this.selTemplateChange,
				"beforequery" : this.clearSelTemplateComboStore
				// collapse: this.collapseCombo,
				// expand : this.loadCombo
			}
		});
	},

	clearSelTemplateComboStore : function(queryEvent) {
		var selTemplateCombo = queryEvent.combo;
		var selCTOSTemplateObj = selTemplateCombo.up("selCTOSTemplate");
		delete queryEvent.combo.lastQuery;
		debugger;
		var selDiseaseCombo = this.getDiseaseObj(selCTOSTemplateObj);
		var theProxy = selTemplateCombo.getStore().proxy;
		theProxy.api.read = Ext.URLs.Templates + "/Cancer/" + selDiseaseCombo.getValue();
	},

	clearSelDiseaseComboStore : function(queryEvent) {
		var selCTOSTemplateObj = queryEvent.combo.up("selCTOSTemplate");

		delete queryEvent.combo.lastQuery;

		var TemplateSrc = this.getTemplateSrc(selCTOSTemplateObj);

		var selDiseaseCombo = this.getDiseaseObj(selCTOSTemplateObj);
		var theProxy = selDiseaseCombo.getStore().proxy;
		theProxy.url = Ext.URLs.DiseaseType + "/Source/" + TemplateSrc;

		var selTemplateCombo = this.getSelTemplateCombo(selCTOSTemplateObj);
		delete selTemplateCombo.lastQuery;
	},

	getTemplateSrcObj : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("selTemplateSrc");
	},
	getDiseaseObj : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("selDisease");
	},
	getDiseaseStageObj : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("selDiseaseStage");
	},
	getSelTemplateCombo : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("selTemplate[name=\"AllTemplates\"]");
	},
	getResetFilterBtn : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("button[title=\"ResetFilter\"]");
	},
	getDiseaseAndStageObj : function(selCTOSTemplateObj) {
		return selCTOSTemplateObj.down("selDiseaseAndStage");
	},


	resetTemplateSrc : function(selCTOSTemplateObj) {
		var TemplateSrcRadios = selCTOSTemplateObj.down("selTemplateSrc");
		var theRadios = TemplateSrcRadios.items.items;
		var i, aRadio, rLen = theRadios.length;
		for (i = 0; i < rLen; i++) {
			theRadios[i].setRawValue(false);
			theRadios[i].setValue(false);
		}

		var aCombo, Combos = Ext.ComponentQuery.query("combobox", selCTOSTemplateObj);
		rLen = Combos.length;
		for (i = 0; i < rLen; i++) {
			aCombo = Combos[i];
			aCombo.clearValue();
			aCombo.applyEmptyText();
			aCombo.getPicker().getSelectionModel().doMultiSelect([], false);
		}
		this.hideFilterSelector(selCTOSTemplateObj);
	},

	getTemplateSrc : function(selCTOSTemplateObj) {
		var TemplateSrcRadios = selCTOSTemplateObj.down("selTemplateSrc");
		var theRadios = TemplateSrcRadios.items.items;
		var i, aRadio, rLen = theRadios.length;
		for (i = 0; i < rLen; i++) {
			aRadio = theRadios[i];
			if (aRadio.rawValue) {
				return aRadio.inputValue;
			}
		}
		return "";
	},

	onTemplateSrcChange : function(rbtn, newValue, oldValue, eOpts) {
		var selCTOSTemplateObj = rbtn.up("selCTOSTemplate");
		this.showFilterSelector(selCTOSTemplateObj);
		// this.showHideShowAllClickedSection(selCTOSTemplateObj, false);

			// Why do we need to set Patient.TemplateType ???
		if (this.application.Patient) {
			this.application.Patient.TemplateType = this.getTemplateSrc(selCTOSTemplateObj);
		}
	},

	
	DiseaseSelected : function(combo, recs, eOpts) {
		wccConsoleLog('Disease Type has been selected');
		var selCTOSTemplateObj = combo.up("selCTOSTemplate");
		var selDiseaseStage = this.getDiseaseStageObj(selCTOSTemplateObj);

		if (this.application.Cancer != recs[0].data) {
			this.application.ResetClicked = false;
			selDiseaseStage.reset();
		}
		this.application.Cancer = recs[0].data;
		this.getSelTemplateCombo(selCTOSTemplateObj).show();
	},

	onDiseaseStageChange : function(a, b, c) {
//		debugger;
	},

	selTemplateChange : function(combo, recs) {
		var theController, theTemplate, parent, parentName = "";
		theTemplate = recs[0].data;
		parent = combo.up("AuthoringTab");
		if (parent) {
			parentName = "AuthoringTab";
		}
		else {
			parent = combo.up("NewPlanTab");
			if (parent) {
				parentName = "NewPlanTab";
				theController = this.getController("NewPlan.NewPlanTab");
				theController.ShowSelectedTemplate(theTemplate);
			}
			else {
				parent = combo.up("TemplateListTab");
				if (parent) {
					parentName = "TemplateListTab";
				}
				else {
					alert("Unknown parent to selCTOSTemplate");
				}
			}
		}
	},

	resetTemplateFilter : function(button){
		var selCTOSTemplateObj = button.up("selCTOSTemplate");
		this.hideFilterSelector(selCTOSTemplateObj);
		this.getSelTemplateCombo(selCTOSTemplateObj).show();
	},

	showInitialSelector : function (selCTOSTemplateObj) {
		this.getTemplateSrcObj(selCTOSTemplateObj).show();
		this.hideFilterSelector(selCTOSTemplateObj);
	},

	showFilterSelector : function (selCTOSTemplateObj) {
		this.getResetFilterBtn(selCTOSTemplateObj).show();
		this.getDiseaseAndStageObj(selCTOSTemplateObj).show();
		this.getSelTemplateCombo(selCTOSTemplateObj).hide();
	},

	hideFilterSelector : function (selCTOSTemplateObj) {
		this.getResetFilterBtn(selCTOSTemplateObj).hide();
		this.getDiseaseAndStageObj(selCTOSTemplateObj).hide();
		this.getSelTemplateCombo(selCTOSTemplateObj).hide();
	},

	hideInitialAndFilterSelector : function (selCTOSTemplateObj) {
		this.getTemplateSrcObj(selCTOSTemplateObj).hide();
		this.hideFilterSelector(selCTOSTemplateObj);
	},

	showTemplateSrcSelector : function(selCTOSTemplateObj) {
		this.getTemplateSrcObj(selCTOSTemplateObj).show();
		this.showHideButtonAndDSCombos(selCTOSTemplateObj, false);
		this.showHideShowAllClickedSection(selCTOSTemplateObj, true);
	},

	showHideButtonAndDSCombos : function(selCTOSTemplateObj, showState) {
		var ShowAllButton = this.getResetFilterBtn(selCTOSTemplateObj);
		var theDiseaseAndStageCombos = this.getDiseaseAndStageObj(selCTOSTemplateObj);
		var selTemplateSrcCombo = this.getTemplateSrcObj(selCTOSTemplateObj);

		if (showState) {
			selTemplateSrcCombo.show();
			ShowAllButton.show();
			theDiseaseAndStageCombos.show();
		} 
		else {
			selTemplateSrcCombo.show();
			ShowAllButton.hide();
			theDiseaseAndStageCombos.hide();
		}
	},

	showHideShowAllClickedSection : function(selCTOSTemplateObj, showState) {
		var theTemplateCombo = this.getSelTemplateCombo(selCTOSTemplateObj);
		var theDiseaseAndStageCombos = selCTOSTemplateObj.down("selDiseaseAndStage");
		var theDiseaseCombo = selCTOSTemplateObj.down("selDiseaseAndStage selDisease");
		var AllTemplatesShownMsg = selCTOSTemplateObj.down("[name=\"AllTemplatesShownMsg\"]");
		var ShowAllButton = selCTOSTemplateObj.down("button[title=\"ResetFilter\"]");

		if(this.application.Patient && this.application.Patient.Template){
			theTemplateCombo.setRawValue(this.application.Patient.Template.description);
		}

		if (showState) {
			this.application.ResetClicked = true;
			theDiseaseAndStageCombos.hide();
			theTemplateCombo.show();
			ShowAllButton.hide();
			AllTemplatesShownMsg.show();
		}
		else {
			this.application.ResetClicked = false;
			theDiseaseAndStageCombos.show();
			theTemplateCombo.hide();
			ShowAllButton.show();
			AllTemplatesShownMsg.hide();
		}
	}

});
