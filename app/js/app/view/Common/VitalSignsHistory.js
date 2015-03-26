Ext.define("COMS.view.Common.VitalSignsHistory" ,{
	extend : "Ext.container.Container",
    alias : "widget.VitalSignsHistory",
	name : "NursingDocs.VitalSignsHistory",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"{[this.tempCalc(values, parent)]}",
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp<br />&deg;F/&deg;C</th>",
				"<th rowspan=\"2\">Temp Taken</th>",
				"<th rowspan=\"2\">Pulse</th>",
				"<th rowspan=\"2\"><abbr title=\"Blood Pressure\">BP</abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Respiration in breaths per minute\">Resp</abbr></th>",
				"<th rowspan=\"2\">Pain</th>",
				"<th rowspan=\"2\"><abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub></abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Performance Status - Using the ECOG (Eastern Cooperative Oncology Group) Scale\">PS</abbr></th>",
				"<th rowspan=\"2\">Height<br />in Inches/cm</th>",
				"<th rowspan=\"2\">Weight<br />in lbs/kg</th>",
				"<th colspan=\"4\"><abbr title=\"Body Surface Area\">BSA</abbr></th>",
			"</tr>",
			"<tr>",		// Pulse, BP, Respiration, 
				"<th ><abbr title=\"Body Surface Area Weight Formula\">Weight Form.</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Weight \">Weight</abbr> in KG</th>",
				"<th ><abbr title=\"Body Surface Area Formula\">Method</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Formula\">BSA</abbr></th>",
			"</tr>",
			"{[this.getLastHWBSAInfo(values, parent, xindex, xcount)]}",
			"<tpl for=\"Vitals\">",
				"<tr>",
					"<td>{DateTaken}</td>",
					"<td>{[this.TempCalc(values, parent)]}</td>",
                    "<td>{TemperatureLocation}</td>",
					"<td>{Pulse}</td>",
					"<td>{[this.BPCalc(values, parent)]}</td>",
					"<td>{Respiration}</td>",
					"<td>{Pain}</td>",
					"<td>{SPO2}</td>",
					"<td><abbr title=\"{PS}\">{PSID}</abbr></td>",
					"<td>{[this.HeightCalc(values, parent)]}</td>",
					"<td>{[this.WeightCalc(values, parent)]}</td>",
					"<td>{WeightFormula}</td>",
					"<td>{[this.BSA_WeightCalc(values, parent)]}</td>",
    				"<td>{BSA_Method}</td>",
					"<td>{[this.BSACalc(values, parent, xindex)]}</td>",
				"</tr>",
			"</tpl>",
		"</table>",

		{
				// XTemplate Configuration
			disableFormats: true,
			tempCalc: function (data, pData) {
				// debugger;
			},
			getLastHWBSAInfo: function (data, pData, pDataIndex, pDataLen) {
				var Vitals = data.Vitals, vLen = data.Vitals.length;
				var i, v, h = "", w = "", bm = "", bw = "", wf = "";
				for (i = vLen-1; i >= 0; i--) {
					v = Vitals[i];
/*
					if ("" == v.Height || "-" == v.Height || !("Height" in v)) {
						v.Height = h;
					}
					else {
						h = v.Height;
					}

					if ("" == v.Weight || "-" == v.Weight || !("Weight" in v)) {
						v.Weight = w;
					}
					else {
						w = v.Weight;
					}
*/
					if ("" == v.BSA_Method || "-" == v.BSA_Method || !("BSA_Method" in v)) {
						v.BSA_Method = bm;
					}
					else {
						bm = v.BSA_Method;
					}

					if ("" == v.BSA_Weight || "-" == v.BSA_Weight || !("BSA_Weight" in v)) {
						v.BSA_Weight = bw;
					}
					else {
						bw = v.BSA_Weight;
					}
					if ("" == v.WeightFormula || "-" == v.WeightFormula || !("WeightFormula" in v)) {
						v.WeightFormula = wf;
					}
					else {
						wf = v.WeightFormula;
					}
				}
				return "";
			},

			BSA_WeightCalc: function (data, pData) {
				if ("" == data.Gender) {
					data.Gender = pData.Gender;
				}
				return Ext.BSAWeight(data);
			},

			BPCalc: function (data, pData) {
				if (data.BP) {
					if ("0/0" == data.BP) {
						return "";
					}
					return data.BP;
				}
				return "";
			},

			TempCalc: function (data, pData) {
				if (data.Temperature) {
					if ("" == data.Temperature) {
						return "";
					}
					var tempF = data.Temperature;
					var tempC = Ext.TempF2C(tempF);
					return tempF + "/" + tempC;
				}
				return "";
			},

			HeightCalc: function (data, pData) {
				if (data.hasOwnProperty("Height")) {
					if ("" == data.Height) {
						return "";
					}
					var height = data.Height;
					var mHeight = Ext.In2CM(height);
					return height + "/" + mHeight;
				}
				return "";
			},

			WeightCalc: function (data, pData) {
				if (data.hasOwnProperty("Weight")) {
					if ("" == data.Weight) {
						return "";
					}
					var weight = data.Weight;
					var mWeight = Ext.Pounds2Kilos(weight);
					return weight + "/" + mWeight;
				}
				return "";
			},

			BSACalc: function (data, pData, pDataIndex) {
				var NAMsg = "<abbr title=\"Not Available\">N/A</abbr>";
				var btnBuf = "<button style=\"margin-left: .25em;\" class=\"anchor DoBSACalcs\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Update BSA</button> " + 
								"<span style=\"margin-left: .25em; font-weight: bold;\">Show</span><button class=\"anchor ShowBSACalcs\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Calculations</button>";

				if (
					(data.hasOwnProperty("BSA")           && "" !== data.BSA           ) && 
					(data.hasOwnProperty("BSA_Method")    && "" !== data.BSA_Method    && 0 !== data.BSA_Method) && 
					(data.hasOwnProperty("BSA_Weight")    && "" !== data.BSA_Weight    && 0 !== data.BSA_Weight) && 
					(data.hasOwnProperty("WeightFormula") && "" !== data.WeightFormula && 0 !== data.WeightFormula) && 
					(data.hasOwnProperty("Height")        && "" !== data.Height        && 0 !== data.Height) && 
					(data.hasOwnProperty("Weight")        && "" !== data.Weight        && 0 !== data.Weight)
				) {
					data.Amputations = pData.Amputations;
					var BSA = Ext.BSA_Calc(data);
					if ("" !== BSA && 0 !== BSA && "0.00" !== BSA) {
						if (1 === pDataIndex) {
							pData.BSA = BSA;
						}
						return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " + 
							"weight=\"" + data.Weight + "\" " + 
							"height=\"" + data.Height + "\" " + 
							"weightFormula=\"" + data.WeightFormula + "\" " + 
							"bsa_Weight=\"" + data.BSA_Weight + "\" " + 
							"bsa_Method=\"" + data.BSA_Method + "\" " + 
						">" + BSA + "</button> m<sup>2</sup>");
					}
				}
				if (1 === pDataIndex) {
					pData.BSA = NAMsg;
				}
				return NAMsg;
			}
		}
	)
});