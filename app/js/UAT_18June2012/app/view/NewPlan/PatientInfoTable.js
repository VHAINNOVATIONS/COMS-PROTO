/*jslint undef: true, debug: true, sloppy: true, white: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 6/1/2012

Ext.define("COMS.view.NewPlan.BSAInfoTable", {
	extend: "Ext.container.Container",
	alias: "widget.BSAInfoTable",
	name: "BSAInfoTable",
	title : "Body Surface Area Information",
	
	autoEl : { tag : 'section' },
	cls : 'xPandablePanel',
	hidden: true,
	items: [
		{
			xtype: "container",
			layout: { type: "hbox" },
			defaults: {
				labelAlign: "right",
				labelWidth: 60,
				width: 130,
				labelStyle: "font-weight: bold"
			},
			items: [
				{ xtype: "displayfield", fieldLabel: "Gender", name: "BSA_Gender" },
				{ xtype: "displayfield", fieldLabel: "Height", name: "BSA_Height" },
				{ xtype: "displayfield", fieldLabel: "Weight", width: 200, name: "BSA_Weight" },
				{ xtype: "displayfield", fieldLabel: "Amputee", name: "BSA_Amputee" }
			]
		},
		{ xtype: "container", layout: { type: "hbox" },
			items: [
				{
					xtype: "combo",
					name: "BSA_FormulaWeight",
					fieldLabel: "Weight to use",
					labelAlign: "right",
					labelStyle: "font-weight: bold",
					store: {
						fields: ["weightType"],
						data: [ { weightType: "Actual Weight" },
								{ weightType: "Ideal Weight" },
								{ weightType: "Adjusted Weight" },
								{ weightType: "Other" }
						]
					},
					queryMode: "local",
					displayField: "weightType"
				},
				{
					xtype: "displayfield", 
					fieldLabel: "Calc Weight", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90, 
					labelStyle: "font-weight: bold", 
					name: "BSA_CalcWeight", 
					hidden: true 
				},
				{
					xtype: "textfield", 
					maskRe: /[0-9\.]/, 
					fieldLabel: "Weight (in pounds)", 
					labelAlign: "right", 
					width: 200, 
					labelWidth: 140, 
					labelStyle: "font-weight: bold", 
					name: "BSA_OtherWeight", 
					hidden: true 
				},
				{
					xtype: "displayfield", 
					fieldLabel: "Formula", 
					labelAlign: "right", 
					width: 900, 
					labelWidth: 60, 
					labelStyle: "font-weight: bold", 
					name: "BSA_WeightFormula", 
					hidden: true 
				}
			]
		},
		{
			xtype: "container",
			layout: { type: "hbox" },
			items: [
				{
					xtype: "combo",
					name: "BSA_Formula",
					fieldLabel: "BSA Formula",
					labelAlign: "right",
					labelStyle: "font-weight: bold",
					store: {
						fields: ["formula"],
						data: [ 
							{ formula: "DuBois" },
							{ formula: "Mosteller" },
							{ formula: "Haycock" },
							{ formula: "Gehan and George" },
							{ formula: "Boyd" },
							{ formula: "Capped" }
						]
					},
					queryMode: "local",
					displayField: "formula"
				},
				{ 
					xtype: "displayfield", 
					fieldLabel: "Calc BSA", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90,
					labelStyle: "font-weight: bold", 
					name: "BSA_Calc", 
					hidden: true 
				},
				{ 
					xtype: "textfield", 
					maskRe: /[0-9\.]/, 
					fieldLabel: "BSA", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90, 
					labelStyle: "font-weight: bold", 
					name: "BSA_CappedValue", 
					hidden: true 
				},
				{ 
					xtype: "displayfield", 
					fieldLabel: "Formula", 
					labelAlign: "right", 
					labelStyle: "font-weight: bold", 
					width: 900, 
					labelWidth: 60, 
					name: "BSA_CalcFormula", 
					hidden: true 
				}
			]
		},
		{
			xtype : "container",
			name : "BSA_OEM_Link",
			margin : "0 0 10 10",
			html : "", 
			hidden: true 
		}
	]
});



Ext.define("COMS.view.NewPlan.PatientInfoTable", {
	extend: "Ext.panel.Panel",
	alias: "widget.PatientInfoTable",
	name: "Patient Information Table",
	title : "Patient Information",
	
	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	items: [
		{ xtype: "container", name: "PatientInfoTable", cls: "PI_PatientInformationTable", tpl: 
			new Ext.XTemplate(
				// "{[this.Debugger(values)]}",
				"{[this.CalcBSA(values)]}",		// Needed to calculate the BSA Value if none retrieved.

				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values.Amputations)]}</td>",
					"</tr>",


					"<tr>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method:</th><td>{WeightFormula}</td>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method:</th><td>{BSA_Method}</td>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr>:</th><td>{BSA} ",
						"<button class=\"anchor\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Calculate BSA</button> ",
						"<button class=\"anchor\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Show Calculations</button></td>",
					"</tr>",

					"<tr>",
						"<th>Template:</th><td colspan=\"5\">{[this.TemplateName(values.TemplateName)]}",
						"<tpl if=\"this.hasData(TemplateDescription)\">",
							"<br />{TemplateDescription}",
						"</tpl>",
						"<br />{[this.Links(values.TemplateName, values.TemplateID)]}<button class=\"anchor\" tabType=\"ShowAllPatientData\" name=\"ShowAllPatientData\">..</button></td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}</td>",
					"</tr>",
					"<tr>",
						"<th>Type(s) of Cancer: </th>",
						"<td colspan=3>",
							"<tpl for=\"Disease\">",
								"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
							"</tpl>",
						"</td>",
					"</tr>",
					"<tr>",
						"<th>Allergies: </th>",
						"<td colspan=5>",
							"<table width=\"100%\"><tr><th style=\"text-align: center;\">Name</th><th style=\"text-align: center;\">Type</th><th style=\"text-align: center;\">Comment</th></tr>",
							"<tpl for=\"Allergies\">",
								"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
							"</tpl>",
							"</table>",
						"</td>",
					"</tr>",
					"<tr>",
						"<th>Clinical Trial: </th>",
						"<td colspan=5>",
							"{[this.clinicalTrial(values)]}",
						"</td>",
					"</tr>",
				"</table>",
				"{[this.PostRendering(values, parent)]}",
				{
					// XTemplate Configuration
					disableFormats: true,

					clinicalTrial : function ( values ) {
						var x = values.ClinicalTrial || "NOT a clinical trial";
						return x;
					},

					Debugger : function ( values ) {
						// debugger;
					},
					PostRendering : function(values, parent) {
							// Call this function when the entire xTemplate has been completed
						try {
							Ext.PostTemplateProcessing("Patient Info Table", values, parent);								
						}
						catch (e) {
							// debugger;
						}
					},

					hasData : function (data) {
						if ("" === data) {
							return (false);
						}
						return (true);
					},

					TemplateName : function (name) {
						if ("" === name) {
							return ("None at this time");
						}
						return (name);
					},

					Links : function (name, id) {
						// debugger;
						var buf1 = "";

						try {

						if ("" === name) {
							return ("&nbsp;");
						}

						// This is the link which appears at the end of the "Calculate BSA" table.
						// This was formerly an anchor
						Ext.ComponentQuery.query("NewPlanTab PatientInfo PatientInfoTable container[name=\"BSA_OEM_Link\"]")[0].el.dom.innerHTML = 
							"&nbsp;<button class=\"anchor\" " + 
							"name=\"Open Order Entry Management Tab\" " + 
							"title=\"Open Order Entry Management Tab\" " + 
							"tabType=\"OEM\" " + 
							"templateName=\"" + name + "\" " + 
							"templateID=\"" + id + "\" " + 
							">Open</button> " +
							"Order Entry Management (<abbr title=\"Order Entry Management\">OEM</abbr>) Tab using this Body Surface Area (<abbr title=\"Body Surface Area\">BSA</abbr>) Value";

						// This was formerly an anchor
						buf1 = 
							"&nbsp;<button class=\"anchor\" " + 
							"name=\"Open Template in CTOS Tab\" " +
							"title=\"Open Template in CTOS Tab\" " +
							"tabType=\"CTOS\" " +
							"templateName=\"" + name + "\" " +
							"templateID=\"" + id + "\" " +
							">Open Template</button> " + 
							"in Chemotherapy Template Order Source (<abbr title=\"Chemotherapy Template Order Source\">CTOS</abbr>) Tab";
						}
						catch (e) {
							// debugger;
						}

						return ( buf1 );
					},

					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						try {
							var i, len = a.length, buf = "";
							if (0 === len) {
								return ("None");
							}

							for (i =0; i < len; i++) {
								buf += a[i].description + "<br>";
							}
							return (buf);
						}
						catch (e) {
							// debugger;
							return ("");
						}

					},

					CalcBSA : function( data, parent ) {
						try {
							if ("" === data.BSA) {
								data.BSA = Ext.BSA_Calc(data);
								data.Vitals[0].BSA = data.BSA;
							}
						}
						catch (e) {
							// debugger;
							return ("");
						}
					}
				}
			)
		},
		{ xtype: "BSAInfoTable" }
	]
});