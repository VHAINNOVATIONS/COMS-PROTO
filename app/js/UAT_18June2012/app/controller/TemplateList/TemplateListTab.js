Ext.define('COMS.controller.TemplateList.TemplateListTab', {
    extend: 'Ext.app.Controller',
    stores: [
        "TemplateListStore"
        ,"TemplateListByLocationStore"
    ],
    views: [
        'TemplateList.TemplateListTab',
        'Common.selTemplateByStages'
    ],

    refs: [
        { ref: "theGrid", selector: "TemplateListTab grid"},
        {
            ref: "TemplateType",
            selector: "TemplateListTab selTemplateByStages selTemplateType"
        },
    ],

	init: function () {
		this.control({
			// Handlers for the contents within the tab panel itself
			"TemplateListTab" : {
				beforerender: this.renderPanel
			}
			, "TemplateListTab selTemplateByStages selTemplateType": {
				select: this.TemplateTypeChange
			}
			, "TemplateListTab selTemplateByStages button": {
				click: this.ShowAllTemplates
			}
		});
	},

	renderPanel: function (panel) {
		var theGrid = this.getTheGrid();
		theGrid.getStore().load();
		return true;
	},
    TemplateTypeChange: function (combo, recs, eOpts) {
        var guid = combo.getValue();
        var text = combo.getRawValue();
        var theGrid = this.getTheGrid();
        theGrid.reconfigure("TemplateListByLocationStore");
        var newURL = Ext.URLs.TemplateListByLocation + "/" + guid;
        theGrid.getStore().load({url : newURL});
    },

    ShowAllTemplates: function() {
        var theGrid = this.getTheGrid();
        theGrid.reconfigure("TemplateListStore");
        theGrid.getStore().load();
    }
});
