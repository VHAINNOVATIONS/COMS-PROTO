Ext.define('COMS.view.NewPlan.EndTreatmentSummary', {
	extend: 'Ext.window.Window',
	alias : 'widget.EndTreatmentSummary',
	buttonAlign: 'center',
	name : "End of Treatment Summary",
	title : "End of Treatment Summary",

	autoEl : { tag : "section" },
	autoShow: true,
	width: 950,
	height: 800,
	cls : "Report",
	// defaults : { layout : "fit", autoScroll : true  },
	items : [
		{ xtype : "container", html : "<h1>End of Treatment Summary</h1>" },


		{ xtype : "container", margin: "0 26 10 10", // Margin is "weird" because the scroll bar in the following container shows up and 26px is the width of the scroll bar.
			items : [
			{ xtype : "container", name : "Reason4EOTSHead", html : "<h2>Reason for generating End of Treatment Summary</h2>" },

			{ xtype : "radiogroup", name : "Reason4EOTSAnswer", width: 200, hideLabel : true, columns : 1, vertical : true,
				items : [
					{ boxLabel : "Completed Prescribed Course", name : "EOTS_Reason", inputValue : "Completed Prescribed Course"},
					{ boxLabel : "Treatment Change", name : "EOTS_Reason", inputValue : "Treatment Change"},

					// { xtype : "container", name : "Reason4EOTS_Change", hidden : true, items : [
						{ xtype : "radiogroup", name : "Reason4EOTS_TCReason", width: 200, hidden : true, hideLabel : true, margin: "0 10 0 20", columns : 1, vertical : true, items : [
							{ boxLabel : "Toxicity", name : "EOTS_TChange", inputValue : "Toxicity"},
							{ boxLabel : "Progression of the Disease", name : "EOTS_TChange", inputValue : "Progression of the Disease"},
							{ boxLabel : "Patient Refusal", name : "EOTS_TChange", inputValue : "Patient Refusal"},
							{ boxLabel : "Other", name : "EOTS_TChange", inputValue : "Other"},
							{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_TChangeOther", hideLabel : true }
						]},
					// ]},// 
					{ boxLabel : "Patient Discontinuation", name : "EOTS_Reason", inputValue : "Patient Discontinuation"},

					// { xtype : "container", name : "Reason4EOTS_PD", hidden : true, items : [
						{ xtype : "radiogroup", name : "Reason4EOTS_PDReason", width: 200, hideLabel : true, hidden : true, margin: "0 10 0 20", columns : 1, vertical : true, items : [
							{ boxLabel : "Patient Terminated Regimen", name : "EOTS_PDChange", inputValue : "Patient Terminated Regimen"},
							{ boxLabel : "Patient Left VA System", name : "EOTS_PDChange", inputValue : "Patient Left VA System"},
							// { boxLabel : "Patient Refusal", name : "EOTS_PDChange", inputValue : "Patient Refusal"},
							{ boxLabel : "Other", name : "EOTS_PDChange", inputValue : "Other"},
							{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_PDChangeOther", hideLabel : true }
						]},
					// ]},

					{ boxLabel : "Other ", name : "EOTS_Reason", inputValue : "Other"},
					{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_ReasonOther", hideLabel : true }
				]
			}
		]},


		{ xtype: "container", name: "PatientInfoTableHeader", hidden : true, margin: "0 10 10 10", tpl: 
			new Ext.XTemplate(
				"<h2>Patient Information for - {Name}</h2>",
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values.Amputations)]}</td>",
					"</tr>",

					"<tr>",

						"<th>Template:</th><td colspan=\"5\">{TemplateName} - {TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}",
							"<tpl if=\"''!== TreatmentOriginalEnd\">",
								"&nbsp;<em>(Original Scheduled End Date - {TreatmentOriginalEnd})</em>",
							"</tpl>",
						"</td>",
					"</tr>",
				"</table>",
				{
					// XTemplate Configuration
					disableFormats: true,
					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						var i, len = a.length, buf = "";
						if (0 === len) {
							return ("None");
						}

						for (i =0; i < len; i++) {
							buf += a[i].description + "<br>";
						}
						return (buf);					
					}
				}
			)
		},


		{ xtype : "container", name: "PatientInfoTableBody", hidden : true,
			autoScroll : true, 
			height : 590, 
			// layout : "fit",
			// defaults : { layout : "fit" },
			margin: "0 10 10 10", 
			items : [
				{ xtype: "container", name: "PatientInfoTable", hidden : true, tpl: 
					new Ext.XTemplate(
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
							"<tr><th>Clinical Trial: </th><td colspan=3>{Trial}</td></tr>",
							"<tr><th colspan=\"4\" style=\"text-align: center\">Initial Vital Signs</th></tr>",
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
										"<td>{FirstVitals.DateTaken}</td>",
										"<td>{FirstVitals.Height}</td>",
										"<td>{FirstVitals.Weight}</td>",
										"<td>{FirstVitals.BP}</td>",
										"<td>{FirstVitals.Temperature}</td>",
										"<td>{FirstVitals.Pain}</td>",
										"<td>{FirstVitals.Pulse}</td>",
										"<td>{FirstVitals.Respiration}</td>",
										"<td>{FirstVitals.SPO2}</td>",
										"<td>{FirstVitals.WeightFormula}</td>",
										"<td>{FirstVitals.BSA_Weight}</td>",
										"<td>{FirstVitals.BSA_Method}</td>",
										"<td>{FirstVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{FirstVitals.PSID} - {FirstVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
							"<tr><th colspan=\"4\" style=\"text-align: center\">Final Vital Signs</th></tr>",
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
										"<td>{LastVitals.DateTaken}</td>",
										"<td>{LastVitals.Height}</td>",
										"<td>{LastVitals.Weight}</td>",
										"<td>{LastVitals.BP}</td>",
										"<td>{LastVitals.Temperature}</td>",
										"<td>{LastVitals.Pain}</td>",
										"<td>{LastVitals.Pulse}</td>",
										"<td>{LastVitals.Respiration}</td>",
										"<td>{LastVitals.SPO2}</td>",
										"<td>{LastVitals.WeightFormula}</td>",
										"<td>{LastVitals.BSA_Weight}</td>",
										"<td>{LastVitals.BSA_Method}</td>",
										"<td>{LastVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{LastVitals.PSID} - {LastVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>"
					)
				},

//				{ xtype : "container", html : "<h2>Treatment Report</h2><div style=\"margin-left: 2em;\">To be obtained from...</div>" },

					// These grids are built on the fly in the app\controller\NewPlan\EndTreatmentSummary.js createFlowsheet() 
					// (Search for: theGrid = Ext.create)
//				{ xtype : "container", name : "AdministeredMedsGrid", html : "<h2>Medication Administered</h2>" },
//				{ xtype : "container", name : "DiseaseResponseGrid", html : "<h2>Patient Disease Response</h2>" },
//				{ xtype : "container", name : "ToxicityGrid", html : "<h2>Toxicity Side Effects</h2>" },
//				{ xtype : "container", name : "OtherGrid", html : "<h2>Other Comments</h2>" },


				{ xtype : "container", name : "AdministeredMedsGrid" },
				{ xtype : "container", name : "DiseaseResponseGrid" },
				{ xtype : "container", name : "ToxicityGrid" },
				{ xtype : "container", name : "OtherGrid" },


				{ xtype : "container", html : "<h2 style=\"margin-top: 2em;\">Provider Report</h2>" },
				{ xtype : "htmleditor", name : "ProviderReport", width: 880, height: 200, autoScroll : true, margin : "0 30 0 0" },

				{ xtype : "container", html : "<h2 style=\"margin-top: 2em;\">Follow-Up Appointments</h2>" },
				{ xtype : "htmleditor", name : "FollowUpAppointments", width: 890, height: 200, autoScroll : true, margin : "0 30 0 0" }
			]
		}
	],
	buttons : [
		{ text: "Save", hidden : true, action: "save" },
		{ text: "Cancel", hidden : true, action: "cancel" }
	],
	initComponent: function() {
		wccConsoleLog("End of Treatment Summary View - Initialization");
        Ext.apply(arguments, { widget : this.widget , itemsInGroup: this.itemsInGroup, ChangeTemplate: this.ChangeTemplate });
		this.callParent(arguments);
	}
});
