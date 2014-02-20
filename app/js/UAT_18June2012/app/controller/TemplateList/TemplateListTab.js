Ext.define('COMS.controller.TemplateList.TemplateListTab', {
	extend: 'Ext.app.Controller',
	views: [
		'TemplateList.TemplateListTab'
	],


    refs: [
		{ ref: "theSelect",    selector: "TemplateListTab selTemplateType"},
		{ ref: "theGrid",     selector: "TemplateListTab grid"}
    ],

	init: function () {
		wccConsoleLog('Initialized TemplateList Tab Panel Navigation Controller!');
		this.control({
			// Handlers for the contents within the tab panel itself
			"TemplateListTab" : {
                beforerender: this.renderPanel
            }
		});
	},


    renderPanel: function (panel) {
        debugger;
        var theSelect = this.getTheSelect();
        var theGrid = this.getTheGrid();
        theGrid.getStore().load();
        return true;
    }
});
