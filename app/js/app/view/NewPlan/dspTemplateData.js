Ext.define('COMS.view.NewPlan.dspTemplateData' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.dspTemplateData',
	name : 'dsp Template Data',

	margin : '10',
	cls : 'CCOrderSheet',
	autoEl : { tag : 'section' },
	hidden : true,
	tpl : new Ext.XTemplate(
		"<a href=\"LookUp/PrintTemplate/{id}\" target=\"_blank\">Print</a> Template",
		"{[this.debuggerFcn( values, parent )]}",
		"<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>",
		"<table class=\"NoWrapHeader\">",
			"<tr>",
				"<td colspan=\"2\">",
					"<table><tr>",
						"<th>Max Number of Cycles:</th>",
						"<td>{CourseNumMax}</td>",
						"<th>Cycle Length:</th>",
						"<td>{CycleLength} <tpl for=\"CycleLengthUnit\">{name}</tpl></td>",
					"</tr></table>",
				"</td>",
			"</tr>",
			"<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>",
			"<tr><th>Description:</th><td>{Description}</td></tr>",
			"<tr><th>Emetogenic level:</th><tpl for=\"ELevel\"><td>{name}</td></tpl></tr>",
			"<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>",
			"<tr><th>Reference:</th><td>",

				"<table><tpl for=\"References\">",
					"<tr><td>{Reference}</td></tr>",
					"<tpl if=\"''!== ReferenceLink\">",
						"<tr><td>(<a href=\"{ReferenceLink}\" title=\"Link to PMID\" target=\"_blank\">Link to PMID</a>)</td></tr>",
					"</tpl>",
				"</tpl></table>",
			"</td></tr>",

		"</table>",

		"<table border=\"1\" class=\"InformationTable\">",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Pre Therapy</h2></th><tr>",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PreMHInstructions}</th><tr>",
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
				/* "<th>Total Cumulative Dosing</th>", */
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{[this.calcRoute(values)]}</td>",
					"<td>{Day}</td>",
					/* "<td rowspan=\"2\">{CumDosePerCycle} {CumDosePerCycleUnits} <br>
					   over {NumAdminDays} Admin Days per Cycle <br> 
					   resulting in {CumDosePerRegimen} {CumDosePerCycleUnits} over the course of the Regimen</td>", 
					 */
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{[this.dspInfusionFluid(values)]}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\">{InfusionTime1}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
		"</table>",


		"<table border=\"1\" class=\"InformationTable HighlightedInfoTable\">",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Therapy</h2></th><tr>",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {RegimenInstruction}</th><tr>",

			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
				/* "<th>Total Cumulative Dosing</th>", */
			"</tr>",

			"<tpl for=\"Meds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt} {Units}</td>",
					"<td>{[this.calcRoute(values)]}</td>",
					"<td>{Day}</td>",
					/* "<td rowspan=\"2\">{CumDosePerCycle} {CumDosePerCycleUnits} <br>
					   over {NumAdminDays} Admin Days per Cycle <br> 
					   resulting in {CumDosePerRegimen} {CumDosePerCycleUnits} over the course of the Regimen</td>", 
					 */
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{[this.dspInfusionFluid(values)]}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
			"</table>",













		"<table border=\"1\" class=\"InformationTable\">",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Post Therapy</h2></th><tr>",
			"<tr><th colspan=\"5\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PostMHInstructions}</th><tr>",
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
				/* "<th>Total Cumulative Dosing</th>", */
			"</tr>",
			"<tpl for=\"PostMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{[this.calcRoute(values)]}</td>",
					"<td>{Day}</td>",
					/* "<td rowspan=\"2\">{CumDosePerCycle} {CumDosePerCycleUnits} <br>over {NumAdminDays} Admin Days per Cycle <br> resulting in {CumDosePerRegimen} {CumDosePerCycleUnits} over the course of the Regimen</td>", */
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{[this.dspInfusionFluid(values)]}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\">{InfusionTime1}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
		"</table>",

		"<table border=\"1\" class=\"InformationTable HighlightedInfoTable\">",
		"<tr><th>Cumulative Medications:</th><td>{[this.CumDoseMeds( values, parent )]}</td></tr>",
		"</table>",


		"<table border=\"1\" class=\"InformationTable\">",
		"<tr><th style=\"width:45%;\">Patients Currently Undergoing This Regimen:</th><td>{[this.PatientList( values )]}</td></tr>",
		"</table>",



		{
				// XTemplate Configuration
			disableFormats: true,
			debuggerFcn : function ( current, prev ) {
				// debugger;
			},
			optionalData: function (data, data2) {
				if ("" !== data) {
					return ("<br /><em>" + data + " " + data2 + "</em>");
				}
				return "";
			},
			calcRoute : function(data) {
				var route = data.Infusion1 ? data.Infusion1 : data.Route;
				if (route.indexOf(" : ") > 0) {
					route = route.split(" : ")[0];
				}
				return route;
			},
			dspInfusionFluid : function( data ) {
				if (data.FluidType && "" !== data.FluidType) {
					return data.FluidType + " " + data.FluidVol + " ml";
				}
				else if (data.FluidType1 && "" !== data.FluidType1) {
					return data.FluidType1 + " " + data.FluidVol1 + " ml";
				}
				return "";
			},
			PatientList : function (current) {
				return "<button class=\"anchor PatientList\">" + current.PatientListCount + "</button>";
			},
			CumDoseMeds : function ( current, prev ) {
				var i, msg, medStr, cdmir, cdmirList = current.CumulativeDoseMedsInRegimen, len = cdmirList.length;
				var cdt, cdtMed, exceeds, xxx, cdtLen, cdtAmt, cdmirAmt;
				msg = "No Cumulative Dose Tracked Medications in this Regimen";

				if (len > 0) {
					if (1 === len) {
						msg = "There is";
						medStr = "Medication";
					}
					else {
						msg = "There are";
						medStr = "Medications";
					}

					msg = " " + len + " Cumulative Dose Tracked " + medStr + " in this Regimen";
					msg += "<table class=\"InformationTable\">";
					// msg += "<tr class=\"TemplateHeader\"><th>Medication Name</th><th>Lifetime Max</th><th>Total / Cycle</th><th>Total / Regimen</th></tr>";
					msg += "<tr class=\"TemplateHeader\">";
					msg +=		"<th rowspan=\"2\">Medication Name</th>";
					msg +=		"<th rowspan=\"2\">Lifetime Max</th>";
					msg +=		"<th colspan=\"2\">For This Regimen</th>";
					msg +=		"<th colspan=\"2\">For This Patient</th>";
					msg += "</tr>";
					msg += "<tr class=\"TemplateHeader\">";
					
					msg +=		"<th>Total / Cycle</th>";
					msg +=		"<th>Total / Regimen</th>";
					msg +=		"<th>Lifetime Total</th>";
					msg +=		"<th>Exceeds Max</th>";
					msg +=	"</tr>";

					
					// debugger;
					for (i0 = 0; i0 < len; i0++) {
						cdmir = cdmirList[i0];
						var cdmirUnits = cdmir.CumulativeDoseUnits;
						var m0 = cdmir.MedName;

						// var m1 = Ext.util.Format.number(("" + cdmir.CumulativeDoseAmt).replace(",", ""), "0,0") + " " + cdmirUnits;
						// var m2 = Ext.util.Format.number(("" + cdmir.CumDosePerCycle).replace(",", ""), "0,0") + " " + cdmirUnits;
						// var m3 = Ext.util.Format.number(("" + cdmir.CumDosePerRegimen).replace(",", ""), "0,0") + " " + cdmirUnits;
						var m1 = Ext.FormatNumber(("" + cdmir.CumulativeDoseAmt).replace(",", "")) + " " + cdmirUnits;
						var m2 = Ext.FormatNumber(("" + cdmir.CumDosePerCycle).replace(",", "")) + " " + cdmirUnits;
						var m3 = Ext.FormatNumber(("" + cdmir.CumDosePerRegimen).replace(",", "")) + " " + cdmirUnits;

						msg += "<tr>";
						msg += "<td>" + m0 + "</td>";
						msg += "<td>" + m1 + "</td>";
						msg += "<td>" + m2 + "</td>";
						msg += "<td>" + m3 + "</td>";
						
						var MedNotTracked = true;
						if (COMS.Patient.CumulativeDoseTracking) {
							cdtLen = COMS.Patient.CumulativeDoseTracking.length;
							if (cdtLen > 0) {
								for (i = 0; i < cdtLen; i++) {
									cdt = COMS.Patient.CumulativeDoseTracking[i];
									cdtMed = cdt.MedName;
									if (cdtMed === cdmir.MedName) {
										MedNotTracked = false;
										if ("string" == typeof cdt.CurCumDoseAmt) {
											cdtAmt = cdt.CurCumDoseAmt.replace(",", "");
										}
										else {
											cdtAmt = cdt.CurCumDoseAmt;
										}
										// msg += "<td>" + Ext.util.Format.number(cdt.CurCumDoseAmt, "0,0") + " " + cdmirUnits + "</td>";
										msg += "<td>" + Ext.FormatNumber(cdt.CurCumDoseAmt) + " " + cdmirUnits + "</td>";
										
									

										if ("string" == typeof cdmir.CumulativeDoseAmt) {
											cdmirAmt = cdmir.CumulativeDoseAmt.replace(",", "");
										}
										else {
											cdmirAmt = cdmir.CumulativeDoseAmt;
										}

										exceeds = (1 * cdtAmt) + (1 * cdmir.CumDosePerRegimen);
										if (exceeds > (1 * cdmirAmt)) {
											var xeedsByAmt = (exceeds - (1 * cdmirAmt));
											var xceedsByPct = ((xeedsByAmt / (1 * cdmirAmt)) * 100) + 100;
											// msg += "<td>" + Ext.util.Format.number(xceedsByPct, "0,0") + "%</td>";
											msg += "<td>" + Ext.FormatNumber(xceedsByPct) + "%</td>";

											msg += "</tr><tr><td colspan=\"6\" class=\"smlTCDWarning\">";
											// msg += "Warning, Regimen will exceed Patient's Lifetime Cumulative Dose of " + cdmir.MedName + " by " + Ext.util.Format.number(xeedsByAmt, "0,0") + " " + cdmirUnits + " (" + Ext.util.Format.number(xceedsByPct, "0,0") + "%) ";
											   msg += "Warning, Regimen will exceed Patient's Lifetime Cumulative Dose of " + cdmir.MedName + " by " + Ext.FormatNumber(xeedsByAmt) + " " + cdmirUnits + " (" + Ext.FormatNumber(xceedsByPct) + "%) ";
											msg += "</td></tr>";
										}
										else {
											msg += "<td>&nbsp;.</td>";
											msg += "<td>&nbsp;.</td>";
											msg += "</tr>";
										}
									}
								}
							}
						}
						if (MedNotTracked) {
							msg += "<td>N/A</td>";
							msg += "<td>N/A</td>";
							msg += "</tr>";
						}
					}
					msg += "</table>";
				}
				return msg;
			}
		}
	)
});