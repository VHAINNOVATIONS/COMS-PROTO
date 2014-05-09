Ext.define('COMS.controller.Common.selTemplateByStages', {
	extend: 'Ext.app.Controller',
	views: [
		'Common.selTemplateByStages'
	]


/***
Need to find a good way to override these local functions, till then 
the event handlers for these controls are in the component who invokes these controls.
    , refs: [
//      { ref: "theSelect",    selector: "TemplateListTab selTemplateType"},
//      { ref: "theGrid",     selector: "TemplateListTab grid"}
        {
            ref: "TemplateType",
            selector: "selTemplateByStages selTemplateType"
        },
        {
            ref: "Disease",
            selector: "selTemplateByStages selDisease"
        },
        {
            ref: "DiseaseStage",
            selector: "selTemplateByStages selDiseaseStage"
        },
        {
            ref: "DiseaseAndStage",
            selector: "selTemplateByStages selDiseaseAndStage"
        },
        {
            ref: "Template",
            selector: "selTemplateByStages selTemplate"
        }
    ],

	init: function () {
		console.log('Initialized Common.selTemplateByStages Controller!');
        this.control({
//			"selTemplateByStages selTemplateType": {
//				select: this.TemplateTypeChange,
//				collapse: this.collapseCombo,
//				expand: this.loadCombo
//			},
			"selTemplateByStages selDisease": {
				select: this.DiseaseSelected,
				collapse: this.collapseCombo,
				expand: this.loadCombo
			},
			"selTemplateByStages selDiseaseStage": {
				select: this.DiseaseStageChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo

			},
			"selTemplateByStages selTemplate": {
				select: this.selTemplateChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo
			},
			"selTemplateByStages button": {
				click: this.resetTemplateFilter
			}
		});
	},

    HandlerTemp : function () {
        debugger;
        alert("Function Change");
    },

    /---* To be used later when this control is used in different tabs. *---/
    InTemplateListTab : function( obj ) {
        var outerContainerName = "tltSelTemplateByStages";
        var parent = obj.up();
        if (parent) {
            if (outerContainerName === parent.name) {
                return true;
            }
            parent = parent.up();
            if (parent) {
                if (outerContainerName === parent.name) {
                    return true;
                }
                parent = parent.up();
                if (parent) {
                    if (outerContainerName === parent.name) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

	//-------------------------------------------------------------------------
	//
	//	Template Source (National/Local/Personal) Selected - Phase 1 of the CTOS Tab
	//
	//
	TemplateTypeChange: function (combo, recs, eOpts) {
console.log("selTemplateByStages - Template Type Change");
debugger;
		var thisCtl = this.getController("Common.selTemplateByStages");

		if (null !== recs[0]) {
			this.application.TemplateType = recs[0].data;
		}
        if (this.InTemplateListTab(combo)) {
            return;
        }
		var obj = thisCtl.getTemplateDiseaseAndStage();
		obj.show();

// Not needed unless in authoring tab and haven't moved this there yet
//		var existingTemplate = Ext.ComponentQuery.query('selTemplateByStages fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
//		if (existingTemplate.getValue()) {
//			this.getResetButton().show();
//		}

	},
	//
	//
	//	END Template Source Selected
	//
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//
	//	Disease Type Selected - Phase 2 of the CTOS Tab
	//
	//
	DiseaseSelected: function (combo, recs, eOpts) {
        console.log("selTemplateByStages - Disease Type has been selected");
debugger;
		if (this.application.Cancer != recs[0].data) {
			this.application.ResetClicked = false;
		}
		this.application.Cancer = recs[0].data;
        debugger;
        if (this.InTemplateListTab(combo)) {
            var args = {"foo" : "bar"};
            // var theApp = COMS.getApplication();
            this.application.fireEvent("DiseaseSelected", args);

        }
        else {
            this.getTemplate().show();
        }
	},



	//-------------------------------------------------------------------------
	//
	//	Disease Stage Selected - Phase 2 of the CTOS Tab
	//
	//
	DiseaseStageChange: function (combo, recs, eOpts) {
        console.log("selTemplateByStages - Disease Type and Stage has been selected; onDiseaseStageChange");
debugger;
		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		this.application.Cancer.Stage = recs[0].data;

		combo.hiddenValue = recs[0].data.name;

		this.getTemplate().show();

		if (existingTemplate.getValue()) {
			this.getResetButton().show();
		}
	},



	loadCombo: function (picker, eOpts) {
console.log("loadCombo");
debugger;
        var originalHiddenVal = null;
        picker.hiddenValue = picker.getRawValue();
        picker.clearValue();
        var URI, id;

        if (picker.name == "FilteredTemplates") {
console.log("loadCombo - FilteredTemplates");
            if (this.application.ResetClicked) {
                URI = Ext.URLs.Templates;
                id = null;
                originalHiddenVal = picker.hiddenValue;
            } else {
                URI = Ext.URLs.Templates + "/Cancer/";
                id = this.application.Cancer.id;
            }
        } else if (picker.name == "Select Disease Stage Control") {
console.log("loadCombo - Select Disease Stage Control");
            URI = Ext.URLs.DiseaseStage + "/";
            id = this.application.Cancer.id;
        } else if (picker.name == "Select Disease Control"){
console.log("loadCombo - Select Disease Control");
            if(null != this.application.TemplateType && null != this.application.TemplateType.id){
                URI = Ext.URLs.DiseaseType + "/Source/";
                id = this.application.TemplateType.id;
                this.application.TemplateType.id = null;
            }else{
                URI = Ext.URLs.DiseaseType;
                id = '';
            }
        }
        else {
console.log("loadCombo - Unknown Picker - " + picker.name);
        }

console.log("Loading store - " + URI + " - " + id);
		picker.getStore().load({
			params: {
				URL: URI,
				ID: id
			},
			callback: function (records, operation, success) {
				if (success) {
					if (null != originalHiddenVal) {
						picker.setRawValue(originalHiddenVal);
					}
				}
			}
		});
	},

	collapseCombo: function (picker, eOpts) {

		if (picker.getValue() == null && picker.hiddenValue != null) {
			picker.setRawValue(picker.hiddenValue);
		}
	},


	resetTemplateFilter: function (button) {

		if (null != this.application.Template) {
			this.getTemplate().setRawValue(this.application.Template.description);
		}

		this.application.ResetClicked = true;
		this.loadCombo(this.getTemplate());
		this.loadCombo(this.getDisease());
		Ext.MessageBox.alert('Success', 'Template filters have been removed. All available Templates and Cancer Types will be displayed. ');
	}

****/
});
