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

	"<tpl for=\".\">",
		"<table border=\"1\" class=\"InformationTable\">",
		"{[this.renderSection( values )]}",
		"</table>",
	"</tpl>",

			{
					// XTemplate Configuration
				disableFormats: true,
				renderSection : function ( current ) {
					var ToxType, buf = "";
					if (current.type == "Assessment") {
						ToxType = current.Link.Label;
						if ("Other" === ToxType) {
							ToxType = current.Link.OtherTox;
						}
						buf = "<tr><th colspan=\"2\" style=\"text-align: center;\">Assessment - " + current.date + "</th></tr>";
						if (current.Link.Alert) {
							buf += "<tr><th colspan=\"2\" style=\"text-align: center;color:red;\" class=\"alert\">" + ToxType + " - Flagged as an ALERT</th></tr>";
						}

						buf += "<tr><th style=\"width: 9em;\">Event:</th><td>" + ToxType + "</td></tr>";
						buf += "<tr><th style=\"width: 9em;\">Grade:</th><td>" + current.Link.Grade_Level + "</td></tr>";
						buf += "<tr><th style=\"width: 9em;\">Details:</th><td>" + current.Link.Details + "</td></tr>";
						buf += "<tr><th style=\"width: 9em;\">Comments:</th><td>" + current.Link.Comments + "</td></tr>";
					}
					else if (current.type == "Reaction") {
						buf = "<tr><th colspan=\"2\" style=\"text-align: center;\">Reaction - " + current.date + "</th></tr>";
						var details = current.Link.Details, dLen = details.length, i, rec;
						for (i = 0; i < dLen; i++) {
							rec = details[i];
							if (rec.alertEvent) {
								buf += "<tr><th colspan=\"2\" style=\"text-align: center;color:red;\" class=\"alert\">" + rec.fieldLabel + " - Flagged as an ALERT</th></tr>";
							}
							buf += "<tr><th style=\"width: 9em;\">Event:</th><td>" + rec.fieldLabel + "</td></tr>";
							buf += "<tr><th style=\"width: 9em;\">Section:</th><td>" + rec.sectionTitle + "</td></tr>";
							buf += "<tr><th style=\"width: 9em;\">Comments:</th><td>" + rec.comments + "</td></tr>";
						}
					}
					return buf;
				},
				debuggerFcn : function ( current, prev ) {
					// debugger;
				}
			}
	)

});