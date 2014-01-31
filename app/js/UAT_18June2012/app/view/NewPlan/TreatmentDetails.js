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
						"<th>Template:</th><td colspan=\"5\">{TemplateName} - {TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}",
						"</td>",
					"</tr>",
//				"</table>",

				// "<table border=\"1\" class=\"InformationTable\">",
					"<tr><th colspan=\"2\">Type(s) of Cancer: </th><td colspan=\"4\">",
						"<tpl for=\"Disease\">",
							"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
						"</tpl>",
					"</td></tr>",
					"<tr><th colspan=\"2\">Allergies: </th><td colspan=\"4\">",
						"<table width=\"100%\" class=\"centerHead\"><tr><th>Name</th><th>Type</th><th>Comment</th></tr>",
						"<tpl for=\"Allergies\">",
							"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
						"</tpl>",
						"</table>",
					"</td></tr>",
					"<tr><th colspan=\"2\">Clinical Trial: </th><td colspan=\"4\">{ClinicalTrial}</td></tr>",

					"<tr><th colspan=\"6\" style=\"text-align: center;\">Patient Vitals</th></tr>",
					"<tr><td colspan=\"6\" style=\"padding:0;\">",





		"<table style=\"margin:0 auto; width:100%;\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp</th>",
				"<th rowspan=\"2\">Pulse</th>",
				"<th rowspan=\"2\"><abbr title=\"Blood Pressure\">BP</abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Respiration in breaths per minute\">Resp</abbr></th>",
				"<th rowspan=\"2\">Pain</th>",
				"<th rowspan=\"2\"><abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub></abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Performance Status - Using the ECOG (Eastern Cooperative Oncology Group) Scale\">PS</abbr></th>",
				"<th rowspan=\"2\">Height<br />in Inches</th>",
				"<th rowspan=\"2\">Weight<br />in lbs.</th>",
				"<th colspan=\"4\"><abbr title=\"Body Surface Area\">BSA</abbr></th>",
			"</tr>",
			"<tr>",		// Pulse, BP, Respiration, 
				"<th ><abbr title=\"Body Surface Area Weight Formula\">Weight Form.</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Weight \">Weight</abbr> in KG</th>",
				"<th ><abbr title=\"Body Surface Area Formula\">Method</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Formula\">BSA</abbr></th>",
			"</tr>",
			"<tpl for=\"Vitals\">",
				"<tr>",
					"<td>{DateTaken}</td>",
					"<td>{Temperature}</td>",
					"<td>{Pulse}</td>",
					"<td>{BP}</td>",
					"<td>{Respiration}</td>",
					"<td>{Pain}</td>",
					"<td>{SPO2}</td>",
					"<td><abbr title=\"{PS}\">{PSID}</abbr></td>",
					"<td>{Height}</td>",
					"<td>{Weight}</td>",
					"<td>{WeightFormula}</td>",
					"<td>{BSA_Weight}</td>",
					"<td>{BSA_Method}</td>",
					"<td>{[this.BSACalc(values, parent)]}</td>",
				"</tr>",
			"</tpl>",
		"</table>",








					"</td></tr>",






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
							buf += "<tr><td colspan=\"4\">No " + v.name + " administered</td></tr>";
						}
						else {
							for (i = 0; i < aLen; i++) {
								aBuf = v.administered[i];
								buf += "<tr><th style=\"width:10em;\">" + aBuf.day + "</th><td style=\"width:10em;\">" + aBuf.date + "</td><td colspan=\"2\">" + aBuf.dosage + "</td></tr>";
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
					},
				BSACalc: function (data, pData) {
					data.Amputations = pData.Amputations;
					var BSA = Ext.BSA_Calc(data);
					if ("" !== BSA && 0 !== BSA) {
						return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " + 
							"weight=\"" + data.Weight + "\" " + 
							"height=\"" + data.Height + "\" " + 
							"weightFormula=\"" + data.WeightFormula + "\" " + 
							"bsa_Weight=\"" + data.BSA_Weight + "\" " + 
							"bsa_Method=\"" + data.BSA_Method + "\" " + 
						">" + BSA + "</button> m<sup>2</sup>");
					}
					return ("");
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
