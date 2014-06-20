Ext.define("COMS.view.NewPlan.AdverseEventsHistory", {
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.AdverseEventsHistory",
	"title" : "Adverse Events History",
	"name" : "AdverseEventsHistory",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"tpl" : new Ext.XTemplate(
		"{[this.debugger( values, parent )]}",
	
	"<tpl for=\".\">",
		"<table border=\"1\" class=\"InformationTable\">",
			/* "<tr><th style=\"width: 9em;\">Date:</th><td class=\"AEH_DateHeading\">{date}</td></tr>", */
			"<tpl for=\"Assessment\">",
				"<tr><th colspan=\"2\" style=\"text-align: center;\">Assessment - {date}</th></tr>",
				"<tpl for=\"Details\">",
					"<tpl if=\"alertEvent\"><tr><th colspan=\"2\" style=\"text-align: center;color:red;\" class=\"alert\">{fieldLabel} - Flagged as an ALERT</th></tr></tpl>",
					"<tr><th style=\"width: 9em;\">Event:</th><td>{fieldLabel}</td></tr>",
					"<tr><th style=\"width: 9em;\">Level:</th><td>{levelChosen}</td></tr>",
					"<tr><th style=\"width: 9em;\">Comments:</th><td>{comments}</td></tr>",
				"</tpl>",
			"</tpl>",
			"<tpl for=\"Reaction\">",
				"<tpl if=\"Details.length != 0\">",
						"{[this.debugger( values, parent )]}",
					"<tr><th colspan=\"2\" style=\"text-align: center;\">Reaction - {date}</th></tr>",
					"<tpl for=\"Details\">",
						"<tpl if=\"alertEvent\"><tr><th colspan=\"2\" style=\"text-align: center;color:red;\" class=\"alert\">{sectionTitle} - {fieldLabel} - Flagged as an ALERT</th></tr></tpl>",
						"<tr><th style=\"width: 9em;\">Section:</th><td>{sectionTitle}</td></tr>",
						"<tr><th style=\"width: 9em;\">Event:</th><td>{fieldLabel}</td></tr>",
						"<tr><th style=\"width: 9em;\">Comments:</th><td>{comments}</td></tr>",
					"</tpl>",
				"</tpl>",
			"</tpl>",
		"</table>",
	"</tpl>",

			{
					// XTemplate Configuration
				disableFormats: true,
				debugger : function ( current, prev ) {
					// debugger;
				}
			}
	)

});