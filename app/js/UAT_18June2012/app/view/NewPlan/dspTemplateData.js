Ext.define('COMS.view.NewPlan.dspTemplateData' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.dspTemplateData',
	name : 'dsp Template Data',

	margin : '10',
	cls : 'CCOrderSheet',
	autoEl : { tag : 'section' },
	hidden : true,
	tpl : new Ext.XTemplate(
		"<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>",
		"<table>",
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
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Pre Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PreMHInstructions}</th><tr>",

/**************** OLD
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
**************/

/*********** NEW **************/
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
/*********** END NEW **************/
		"</table>",









		"<table border=\"1\" class=\"InformationTable\" style=\"border: thick solid blue; margin-top: 1em; margin-bottom: 1em;\">",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {RegimenInstruction}</th><tr>",

			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",

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
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
			"</table>",













		"<table border=\"1\" class=\"InformationTable\">",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Post Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PostMHInstructions}</th><tr>",

/**************** OLD
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"<tpl for=\"PostMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2, values.Units2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2, \"\")]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
*********************************************************/


/*********** NEW **************/
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
/*********** END NEW **************/

		"</table>",


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data, data2) {
					if ("" !== data) {
						return ("<br /><em>" + data + " " + data2 + "</em>");
					}
					return ("");
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
//				'<th>OR</th>',
//				'<th>Amount</th>',
//				'<th>Unit</th>',
//				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PreMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
//				'<td></td>',
//				'<td>&nbsp;{Amt2}&nbsp;</td>',
//				'<td>&nbsp;{Units2}&nbsp;</td>',
//				'<td>&nbsp;{Infusion2}&nbsp;</td>',
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
//				'<th>Regimen<br>Dose</th>',
				'<th>Dose</th>',
//				'<th>% of Regimen Dose<hr>Reason</th>',
//				'<th>Patient Dose</th>',
				'<th>Route</th>',
				'<th>Administration Day</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="Meds">',
			'<tr><th rowspan="2">Date/Time</th><th rowspan="2">{#}</th>',
				'<td>{Drug}</td>',
				'<td>{Amt}{Units}</td>',
//				'<td><hr>{reason}&nbsp;</td>',
//				'<td>{PatDose}&nbsp;</td>',
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
//				'<th>OR</th>',
//				'<th>Amount</th>',
//				'<th>Unit</th>',
//				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PostMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
//				'<td></td>',
//				'<td>{Amt2}</td>',
//				'<td>{Units2}</td>',
//				'<td>{Infusion2}</td>',
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