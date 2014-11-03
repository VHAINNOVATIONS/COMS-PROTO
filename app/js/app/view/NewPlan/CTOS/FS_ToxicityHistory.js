Ext.define("COMS.view.NewPlan.CTOS.FS_ToxicityHistory", {
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.FS_ToxicityHistory",
	"title" : "Toxicity History",
	"name" : "FS_ToxicityHistory",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"tpl" : new Ext.XTemplate(
		"<tpl for=\".\">",
			"<table border=\"1\" class=\"InformationTable\">",
			"{[this.renderSection( values )]}",
			"</table>",
		"</tpl>",
		{
				// XTemplate Configuration
			disableFormats: true,
			renderSection : function ( current ) {
				var buf = "";
				if (current.type == "Assessment") {
					buf = "<tr><th colspan=\"2\" style=\"text-align: center;\">Assessment - " + current.date + "</th></tr>";
					if (current.Link.Alert) {
						buf += "<tr><th colspan=\"2\" style=\"text-align: center;color:red;\" class=\"alert\">" + current.Link.Label + " - Flagged as an ALERT</th></tr>";
					}
					buf += "<tr><th style=\"width: 9em;\">Event:</th><td>" + current.Link.Label + "</td></tr>";
					buf += "<tr><th style=\"width: 9em;\">Grade:</th><td>" + current.Link.Grade_Level + "</td></tr>";
					buf += "<tr><th style=\"width: 9em;\">Details:</th><td>" + current.Link.Details + "</td></tr>";
					buf += "<tr><th style=\"width: 9em;\">Comments:</th><td>" + current.Link.Comments + "</td></tr>";
					return buf;
				}
				return "";
			},
			debuggerFcn : function ( current, prev ) {
				// debugger;
			}
		}
	)
});