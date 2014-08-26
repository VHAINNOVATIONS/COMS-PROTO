Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinViewInfusionReactions",
	"title" : "Infusion Reactions",
	"closeAction" : "destroy",
	"width" : 820,
	"height" : 220,
	"minHeight" : 220,
	"autoShow" : true,
	"resizable" : true,
	"modal" : true,
	"items" : [ { "xtype" : "selInfusionReaction" } ]

/********************

	tpl : new Ext.XTemplate(
        "{[this.tempCalc(values, parent)]}",
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

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
					"<td>{[this.BSACalc(values, parent)]}</td>",
				"</tr>",
			"</tpl>",

			
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
            tempCalc: function (data, pData) {
            },
            BSA_WeightCalc: function (data, pData) {
                if ("" == data.WeightFormula || "" == data.BSA_Method || "" == data.Weight) {
                    return "";
                }
				return Ext.BSAWeight(data);
            },
            BPCalc: function (data, pData) {
                if ("0/0" == data.BP) {
                    return "";
                }
                return data.BP;
            },

            TempCalc: function (data, pData) {
                if ("" == data.Temperature) {
                    return data.Temperature;
                }
                var tempF = data.Temperature;
                var tempC = Ext.TempF2C(tempF);
                return tempF + "/" + tempC;
            },
            HeightCalc: function (data, pData) {
                if ("" == data.Height) {
                    return data.Height;
                }
                var height = data.Height;
                var mHeight = Ext.In2CM(height);
                return height + "/" + mHeight;
            },
            WeightCalc: function (data, pData) {
                if ("" == data.Weight) {
                    return data.Weight;
                }
                var weight = data.Weight;
                var mWeight = Ext.Pounds2Kilos(weight);
                return weight + "/" + mWeight;
            },

			BSACalc: function (data, pData) {
				data.Amputations = pData.Amputations;
				if ("" === data.WeightFormula || "" === data.BSA_Method) {
					return "<abbr title=\"Not Available\">N/A</abbr>";
				}
				var BSA = Ext.BSA_Calc(data);
				if ("" !== BSA && 0 !== BSA && "0.00" !== BSA) {
					return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " + 
						"weight=\"" + data.Weight + "\" " + 
						"height=\"" + data.Height + "\" " + 
						"weightFormula=\"" + data.WeightFormula + "\" " + 
						"bsa_Weight=\"" + data.BSA_Weight + "\" " + 
						"bsa_Method=\"" + data.BSA_Method + "\" " + 
					">" + BSA + "</button> m<sup>2</sup>");
				}
				return "<abbr title=\"Not Available\">N/A</abbr>";
			}
		}
	)


	"buttons" : [
		{ "text" : "Close" }
	]
**************/
});

