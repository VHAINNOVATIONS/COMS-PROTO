/**
 *
 * Based on ViewEndTreatmentSummary.js
 *
 **/
Ext.define('COMS.view.NewPlan.TreatmentDetails', {
	extend: 'Ext.window.Window',
	alias : 'widget.TreatmentDetails',
	buttonAlign: 'center',
	name : "Treatment Details",
	title : "Treatment Details",

	autoEl : { tag : "section" },
	autoShow: true,
	width: 950,
	height: 800,
	layout : "fit",
	cls : "Report",
	items : [
		{ xtype: "container", name: "PatientInfoTableHeader", margin: "0 10 10 10", autoScroll: true, tpl:
			new Ext.XTemplate(
				"{[this.Check(values)]}",
				"<h1>Treatment Details</h1>",
				"<h2 style=\"margin-top: 1em;\">Patient Information for - {name}</h2>",
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values)]}</td>",
					"</tr>",

					"<tr>",
						"<th>Template:</th><td colspan=\"5\">{TD.TemplateName} - {TD.TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TD.TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TD.TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TD.TreatmentEnd}",
						"</td>",
					"</tr>",
				"</table>",

				"<table border=\"1\" class=\"InformationTable\">",
					"<tr><th>Type(s) of Cancer: </th><td colspan=3>",
						"<tpl for=\"Disease\">",
							"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
						"</tpl>",
					"</td></tr>",
					"<tr><th>Allergies: </th><td colspan=3>",
						"<table width=\"100%\" class=\"centerHead\"><tr><th>Name</th><th>Type</th><th>Comment</th></tr>",
						"<tpl for=\"Allergies\">",
							"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
						"</tpl>",
						"</table>",
					"</td></tr>",
					"<tr><th>Clinical Trial: </th><td colspan=3>{ClinicalTrial}</td></tr>",
				"</table>",

				"<br /><br />",
				{
					// XTemplate Configuration
					disableFormats: true,
					name : function(v, p) {
						return (v.name);
					},
					admin : function(v, p) {
						return ("<tr><th>" + v.day + "</th><td>" + v.date + "</td><td colspan=\"2\">" + v.dosage + "</td></tr>");
					},
					Check : function( v ) {
					},
					Check1 : function( v, p ) {
						var buf = "";
						buf = "<tr><th style=\"text-align: left;\" colspan=\"4\">" + v.name + "</th></tr>";
						var i, aLen = v.administered.length, aBuf;
						if (0 === aLen) {
							buf += "<tr><td colspan=\"4\">No " + v.name + " administered</td></tr>"
						}
						else {
							for (i = 0; i < aLen; i++) {
								aBuf = v.administered[i];
								buf += "<tr><th style=\"width:10em;\">" + aBuf.day + "</th><td style=\"width:10em;\">" + aBuf.date + "</td><td colspan=\"2\">" + aBuf.dosage + "</td></tr>"
							}
						}
						return(buf);
					},
					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						var retBuf = "None";
						if (a.Amputations) {
							var ampu = a.Amputations;
							var i, len = ampu.length, buf = "";
							if (len > 0) {
								for (i =0; i < len; i++) {
									buf += ampu[i].description + "<br>";
								}
								return (buf);
							}
						}
						return(retBuf);
					}
				}
			)
		}
	],
	buttons : [
		{ text: "Close", action: "cancel" }
	],
	initComponent: function() {
		wccConsoleLog("Treatment Details View - Initialization");
		this.callParent(arguments);
	}
});
