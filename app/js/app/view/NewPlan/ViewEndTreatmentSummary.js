Ext.define('COMS.view.NewPlan.ViewEndTreatmentSummary', {
	extend: 'Ext.window.Window',
	alias : 'widget.ViewEndTreatmentSummary',
	buttonAlign: 'center',
	name : "End of Treatment Summary",
	title : "End of Treatment Summary",

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
				"<h1>End of Treatment Summary</h1>",
				"<h2>Reason for generating End of Treatment Summary {EoTS.EndReason}</h2>",
				"<h2 style=\"margin-top: 1em;\">Patient Information for - {name}</h2>",
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values)]}</td>",
					"</tr>",

					"<tr>",

						"<th>Template:</th><td colspan=\"5\">{EoTS.TemplateName} - {EoTS.TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{EoTS.TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{EoTS.TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{EoTS.TreatmentEnd}",
//							"<tpl if=\"''!== EoTS.TreatmentOriginalEnd\">",
//								"&nbsp;<em>(Original Scheduled End Date - {EoTS.TreatmentOriginalEnd})</em>",
//							"</tpl>",
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

						"<h2 style=\"margin-top: 1em; text-align: left;\">Initial Vital Signs</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
<<<<<<< HEAD
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Formula</th>",
=======
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{EoTS.FirstVitals.DateTaken}</td>",
										"<td>{EoTS.FirstVitals.Height}</td>",
										"<td>{EoTS.FirstVitals.Weight}</td>",
										"<td>{EoTS.FirstVitals.BP}</td>",
										"<td>{EoTS.FirstVitals.Temperature}</td>",
										"<td>{EoTS.FirstVitals.Pain}</td>",
										"<td>{EoTS.FirstVitals.Pulse}</td>",
										"<td>{EoTS.FirstVitals.Respiration}</td>",
										"<td>{EoTS.FirstVitals.SPO2}</td>",
										"<td>{EoTS.FirstVitals.WeightFormula}</td>",
										"<td>{EoTS.FirstVitals.BSA_Weight}</td>",
										"<td>{EoTS.FirstVitals.BSA_Method}</td>",
										"<td>{EoTS.FirstVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{EoTS.FirstVitals.PSID} - {EoTS.FirstVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Final Vital Signs</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
<<<<<<< HEAD
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Formula</th>",
=======
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{EoTS.LastVitals.DateTaken}</td>",
										"<td>{EoTS.LastVitals.Height}</td>",
										"<td>{EoTS.LastVitals.Weight}</td>",
										"<td>{EoTS.LastVitals.BP}</td>",
										"<td>{EoTS.LastVitals.Temperature}</td>",
										"<td>{EoTS.LastVitals.Pain}</td>",
										"<td>{EoTS.LastVitals.Pulse}</td>",
										"<td>{EoTS.LastVitals.Respiration}</td>",
										"<td>{EoTS.LastVitals.SPO2}</td>",
										"<td>{EoTS.LastVitals.WeightFormula}</td>",
										"<td>{EoTS.LastVitals.BSA_Weight}</td>",
										"<td>{EoTS.LastVitals.BSA_Method}</td>",
										"<td>{EoTS.LastVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{EoTS.LastVitals.PSID} - {EoTS.LastVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Medications</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Meds\">",
									"{[this.Check1(values, parent)]}",
								"</tpl>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Disease Response</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.DiseaseResponse\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Disease Responses Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Toxicity Response</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Toxicity\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Toxicity Side Effects Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Other Comments</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Other\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Other Comments Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Provider Report</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tpl if=\"''!== EoTS.ProviderReport\">",
								"<tr><td>{EoTS.ProviderReport}</td></tr>",
							"</tpl>",
							"<tpl if=\"''=== EoTS.ProviderReport\">",
								"<tr><td>No Provider Report listed</td></tr>",
							"</tpl>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Follow-Up Appointments</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tpl if=\"''!== EoTS.FollowUpAppointments\">",
								"<tr><td>{EoTS.FollowUpAppointments}</td></tr>",
							"</tpl>",
							"<tpl if=\"''=== EoTS.FollowUpAppointments\">",
								"<tr><td>No Follow-Up Appointments listed</td></tr>",
							"</tpl>",
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
						// var Meds = v.EoTS.Meds;
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
					}
				}
			)
		}
	],
	buttons : [
		{ text: "Close", action: "cancel" }
	],
	initComponent: function() {
		wccConsoleLog("End of Treatment Summary View - Initialization");
		this.callParent(arguments);
	}
});
