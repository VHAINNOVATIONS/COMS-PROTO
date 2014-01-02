Ext.define('COMS.controller.Authoring.TemplateListTab', {
	extend: 'Ext.app.Controller',
	views: [
		'Authoring.TemplateListTab'
	],

	init: function () {
		wccConsoleLog('Initialized TemplateList Tab Panel Navigation Controller!');
        /***
		this.control({
			// Handlers for the contents within the tab panel itself
			"TemplateListTab" : {
                beforerender: this.renderPanel
            }
		});
        ***/
	},


    renderPanel: function (panel) {
        if (panel.contentLoaded !== true) {
            panel.contentLoaded = true;
            var url = Ext.URLs.Templates;
            Ext.Ajax.request({
                url: url,
                success: function (response) {
                    var buf = "<table border=\"1\" class=\"InformationTable\"><tr><th style=\"text-align: center;\">Template Name</th><th style=\"text-align: center;\">Description</th><th>Disease Name</th><th>&nbsp;</th></tr>",
                        data = Ext.decode(response.responseText);
                        records = data.records;
                    for (i=0; i < data.total; i++) {
                        buf += "<tr><td>" + records[i].name + "</td>";
                        buf += "<td>" + records[i].description + "</td>";
                        buf += "<td>" + records[i].DiseaseName + "</td>";
                        buf += "<td><a href=\"" + Ext.URLs.PrintTemplate + "/" +  records[i].id + "\" target=\"print_template\">View/Print</td></tr>";
                    }
                    buf += "</table>";
                    panel.update(buf);
                }
            });
        }
        return true;
    }
});
