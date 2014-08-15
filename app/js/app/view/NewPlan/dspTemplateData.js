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
					"<tr><td>(<a href={ReferenceLink} title=\"Link to PMID\" target=\"_blank\">Link to PMID</a>)</td></tr>",
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
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
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
					"<td>{Route}</td>",
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
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
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
				return ("");
			},
			dspInfusionFluid : function( data ) {
				if (data.FluidType && "" !== data.FluidType) {
					return data.FluidType + " " + data.FluidVol + " ml";
				}
				else if (data.FluidType1 && "" !== data.FluidType1) {
					return data.FluidType1 + " " + data.FluidVol1 + " ml";
				}
			},
			CumDoseMeds : function ( current, prev ) {
				// debugger;
				var i, msg, medStr, cdmir, cdmirList = current.CumulativeDoseMedsInRegimen, len = cdmirList.length;
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
					msg += "<tr class=\"TemplateHeader\"><th>Medication Name</th><th>Lifetime Max</th><th>Total / Cycle</th><th>Total / Regimen</th></tr>";
					for (i = 0; i < len; i++) {
						cdmir = cdmirList[i];
						var cdmirUnits = cdmir.CumulativeDoseUnits;
						var m0 = cdmir.MedName;
						var m1 = cdmir.CumulativeDoseAmt + " " + cdmirUnits;
						var m2 = cdmir.CumDosePerCycle + " " + cdmirUnits;
						var m3 = cdmir.CumDosePerRegimen + " " + cdmirUnits;

						msg += "<tr>";
						msg += "<td>" + m0 + "</td>";
						msg += "<td>" + m1 + "</td>";
						msg += "<td>" + m2 + "</td>";
						msg += "<td>" + m3 + "</td>";
						msg += "</tr>";
						var cdtLen = COMS.Patient.CumulativeDoseTracking.length;
						if (cdtLen > 0) {
							var i, cdt, cdtMed, exceeds, xxx;
							for (i = 0; i < cdtLen; i++) {
								cdt = COMS.Patient.CumulativeDoseTracking[i];
								cdtMed = cdt.MedID;
								if (cdtMed === cdmir.MedID) {
									exceeds = (1 * cdt.CumulativeDoseAmt) + (1 * cdmir.CumDosePerRegimen);
									if (exceeds > (1 * cdmir.CumulativeDoseAmt)) {
										var xeedsByAmt = (exceeds - (1 * cdmir.CumulativeDoseAmt));
										msg += "<tr><td colspan=\"4\" class=\"smlTCDWarning\">";
										msg += "Warning, Regimen will exceed Patient's Lifetime Cumulative Dose of " + cdmir.MedName + " by " + xeedsByAmt + " " + cdmirUnits;
										msg += "</td></tr>";
									}
								}
							}
						}
					}
					msg += "</table>";
				}
				return msg;
			}
		}
	),







	tpl_Ver1 : new Ext.XTemplate(
		"<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>",
		"<table>",
		"<tr>",
			"<td colspan=\"2\">",
				"<table><tr><th>Max Number of Cycles:</th><td>{CourseNumMax}</td><th>Cycle Length:</th>",
					"<td>{CycleLength} <tpl for=\"CycleLengthUnit\">{name}</tpl></td>",
				"</tr></table>",
			"</td>",
		"</tr>",
		"<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>",
		"<tr><th>Emetogenic level:</th><tpl for=\"ELevel\"><td>{name}</td></tpl></tr>",
		"<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>",
		"<tr><th>Reference:</th><td>",

		"<table><tpl for=\"References\">",
			"<tr><td>{Reference}</td></tr>",
			"<tr><td>(<a href={ReferenceLink} title=\"Link to PMID\" target=\"_blank\">Link to PMID</a>)</td></tr>",
		"</tpl></table>",
		"</td></tr>",

		"</table>",

		"<section class=\"CourseMeds\">",
			"<h2>Pre Therapy</h2>",
			"<div>Instructions: {PreMHInstructions}</div>",
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"PreMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",





		"<section class=\"CourseMeds\">",
			"<h2>Therapy</h2>",
			"<div>Instructions: {RegimenInstruction}</div>",                        
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"Meds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt} {Units}</td>",
					"<td>{Route}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",





		"<section class=\"CourseMeds\">",
			"<h2>Post Therapy</h2>",
			"<div>Instructions: {PostMHInstructions}</div>",
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"PostMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data) {
					if ("" !== data) {
						return ("<br /><em>" + data + "</em>");
					}
					return ("");
				}
		}
	),




	tpl_old : new Ext.XTemplate(
		'<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>',
		'<table>',
		'<tr>',
			'<td colspan="2">',
				'<table><tr><th>Max Number of Cycles:</th><td>{CourseNumMax}</td><th>Cycle Length:</th>',
					'<td>{CycleLength} <tpl for="CycleLengthUnit">{name}</tpl></td>',
				'</tr></table>',
			'</td>',
		'</tr>',
		'<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>',
		'<tr><th>Emetogenic level:</th><tpl for="ELevel"><td>{name}</td></tpl></tr>',
		'<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>',
		'<tr><th>Reference:</th><td>',
		'<table><tpl for="References">',
			'<tr><td>{Reference}</td></tr>',
			'<tr><td>(<a href={ReferenceLink} title=\'Link to PMID\' target=\'_blank\'>Link to PMID</a>)</td></tr>',
		'</tpl></table></td></tr>',
		'</table>',

		'<section class="CourseMeds">',
			'<h2>Pre Therapy</h2>',
			'<div>Instructions: {PreMHInstructions}</div>',
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",
			'<tr class="TemplateHeader">',
				'<th>Drug</th>',
				'<th>Amount</th>',
				'<th>Unit</th>',
				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PreMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
				'<td>{Instructions}</td>',
			'</tr>',
			'</tpl>',
			'</tbody></table>',
		'</section>',





		'<section class="CourseMeds">',
			'<h2>Therapy</h2>',
			'<div>Instructions: {RegimenInstruction}</div>',                        
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			'<tr class="TemplateHeader">',
				'<th>&nbsp;</th>',
				'<th>&nbsp;</th>',
				'<th>Drug</th>',
				'<th>Dose</th>',
				'<th>Route</th>',
				'<th>Administration Day</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="Meds">',
			'<tr><th rowspan="2">Date/Time</th><th rowspan="2">{#}</th>',
				'<td>{Drug}</td>',
				'<td>{Amt}{Units}</td>',
				'<td>{Route}</td>',
				'<td>{Day}</td>',
			'</tr>',
			'<tr>',
				'<th class="NoBorder">Fluid/Volume: </th><td class="NoBorder">{FluidVol}</td>',
				'<th class="NoBorder">Administration Time: </th><td class="NoBorder" colspan="2">{InfusionTime}</td>',
			'</tpl>',
			'</tbody></table>',
		'</section>',





		'<section class="CourseMeds">',
			'<h2>Post Therapy</h2>',
			'<div>Instructions: {PostMHInstructions}</div>',
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			'<tr class="TemplateHeader">',
				'<th>Drug</th>',
				'<th>Amount</th>',
				'<th>Unit</th>',
				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PostMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
				'<td>{Instructions}</td>',
			'</tr>',
			'</tpl>',
			'</tbody></table>',
		'</section>',


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data) {
					if ("" !== data) {
						return ("<br /><em>" + data + "</em>");
					}
					return ("");
				}
		}
	)
                

});