Ext.define("COMS.view.NewPlan.PatientTemplates" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientTemplates",
	name : "Patient Templates Table",
	title : "Treatment Regimens & Summaries",

	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,


	/**
	 * Data Format passed to this template:
	 *
	 * {
	 *     DateStarted : "11/11/2013",
	 *     ScheduledEndDate,
	 *     TemplateID,
	 *     TemplateName,
	 *     Historical : [
	 *         {
	 *             DateApplied,
	 *             DateEnded,
	 *             DateEndedActual,
	 *             DtateStarted,
	 *             EotsID,
	 *             TemplateID,
	 *             TemplateName,
	 *             id
	 *         }
	 *     ]
	 * }
	 **/


	tpl : new Ext.XTemplate(
		"<table border=\"1\" style=\"margin: 10px auto;\" class=\"PatHistResults InformationTable\">",
			"<tr>",
				"<th>&nbsp;</th>",
				"<th>Template Name</th>",
				"<th>Start Date</th>",
				"<th>End Date</th>",
				"<th>&nbsp;</th><th>&nbsp;</th>",
			"</tr>",

				"<tpl for=\"Current\">",
					"<tr>",
						"<th>Current Template:</th>",
						"<tpl if=\"null === TemplateDescription || ''=== TemplateDescription\">",
							"<td>{TemplateName}</td>",
						"</tpl>",
						"<tpl if=\"null !== TemplateDescription && '' !== TemplateDescription\">",
							"<td>{TemplateDescription}/<br />({TemplateName})</td>",
						"</tpl>",
						"<td>{DateStarted}</td>",
						"<td>{[this.dspDateEnded(values)]}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" EotsID=\"{EotsID}\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show Details</button></td>",
						"<td>",
							"<tpl if=\"null === EotsID || ''=== EotsID\">",
								"<button class=\"anchor\" name=\"GenerateEoTS\" ",
									"templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">", 
										"Stop Treatment", 
								"</button>",
							"</tpl>",
							"<tpl if=\"null !== EotsID && ''!== EotsID\">",
								"<button class=\"anchor\" templateName=\"{TemplateName}\" EotsID=\"{EotsID}\" templateID=\"{TemplateID}\" name=\"ShowEoTS\">",
									"Show End of Treatment Summary",
								"</button>",
							"</tpl>",
						"</td>",
					"</tr>",
				"</tpl>",

				"<tpl for=\"Historical\">",
					"<tr>",
						"<th>Historical Template:</th>",
						"<tpl if=\"null === TemplateDescription || ''=== TemplateDescription\">",
							"<td>{TemplateName}</td>",
						"</tpl>",
						"<tpl if=\"null !== TemplateDescription && '' !== TemplateDescription\">",
							"<td>{TemplateDescription}/<br />({TemplateName})</td>",
						"</tpl>",
						"<td>{DateStarted}</td>",
						"<td>{[this.dspDateEnded(values)]}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" EotsID=\"{EotsID}\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show Details</button></td>",
						"<td>",
							"<tpl if=\"null === EotsID || ''=== EotsID\">",
								"<button class=\"anchor\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\" name=\"GenerateEoTS\">",
									"Generate End of Treatment Summary",
								"</button>",
							"</tpl>",
							"<tpl if=\"null !== EotsID && ''!== EotsID\">",
								"<button class=\"anchor\" templateName=\"{TemplateName}\" EotsID=\"{EotsID}\" templateID=\"{TemplateID}\" name=\"ShowEoTS\">",
									"Show End of Treatment Summary",
								"</button>",
							"</tpl>",
						"</td>",
					"</tr>",
				"</tpl>",

		"</table>",
		{
			dspDateEnded : function(data) {
				if ("" !== data.DateEndedActual) {
					return data.DateEndedActual;
				}
				return data.DateEnded;
			},
			fnc1 : function(data) {
				return "";
			}
		}
	)
});