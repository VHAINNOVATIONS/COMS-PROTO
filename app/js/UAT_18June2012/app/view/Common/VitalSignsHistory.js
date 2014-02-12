Ext.define("COMS.view.Common.VitalSignsHistory" ,{
	extend : "Ext.container.Container",
    alias : "widget.VitalSignsHistory",
	name : "NursingDocs.VitalSignsHistory",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp</th>",
                "<th rowspan=\"2\">Temp Taken</th>",
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
                    "<td>{TemperatureLocation}</td>",
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

		{
					// XTemplate Configuration
				disableFormats: true,
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
});