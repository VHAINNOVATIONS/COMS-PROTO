Ext.define('COMS.controller.Authoring.TemplateListTab', {
	extend: 'Ext.app.Controller',
	views: [
		'Authoring.TemplateListTab'
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
        panel.getStore().load();
        return true;
    }
});
