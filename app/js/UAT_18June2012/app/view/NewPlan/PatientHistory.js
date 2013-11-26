// MWB 17 Feb 2012 - Added Vital Statistics history here and in the NewPlanTab Controller
function getPHVitalsTableTemplate () {
	return new Ext.XTemplate(
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp</th>",
				"<th rowspan=\"2\">Pulse</th>",
				"<th rowspan=\"2\"><abbr title=\"Blood Pressure\">BP</abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Respiration in breaths per minute\">Resp</abbr></th>",
				"<th rowspan=\"2\">Pain</th>",
				"<th rowspan=\"2\"><abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub></abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Performance Status\">PS</abbr></th>",
				"<th rowspan=\"2\">Height<br />in Inches</th>",
				"<th rowspan=\"2\">Weight<br />in lbs.</th>",
				"<th colspan=\"4\"><abbr title=\"Body Surface Area\">BSA</abbr></th>",
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
					"<td>{PS}</td>",
					"<td>{Height}</td>",
					"<td>{Weight}</td>",
					"<td>{WeightFormula}</td>",
					"<td>{BSA_Weight}</td>",
					"<td>{BSA_Method}</td>",
					"<td>{BSA}</td>",
				"</tr>",
			"</tpl>",
		"</table>"
	);
}



Ext.define("COMS.view.NewPlan.PatientHistory" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientHistory",
	name : "Patient Vitals",
	title : "Patient Vitals",

	autoEl : { tag : "section" },
//	cls : "PI_PatientInformationTable",
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	items : [
		{ xtype : "VitalSignsHistory" }
	],

	initComponent: function() {
		wccConsoleLog("Patient History View - Initialization");
		this.callParent(arguments);
	}
});