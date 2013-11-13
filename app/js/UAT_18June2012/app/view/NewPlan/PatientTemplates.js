Ext.define("COMS.view.NewPlan.PatientTemplates" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientTemplates",
	name : "Patient Templates Table",
	title : "Treatment Regimens & Summaries",

	autoEl : { tag : "section" },
//	cls : "PI_PatientInformationTable",
	cls : "xPandablePanel",
	width: 950,
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
//		"{[this.fnc1(values)]}",

		"<table border=\"1\" style=\"margin: 10px auto;\" class=\"PatHistResults InformationTable\">",
			"<tr>",
				"<th>&nbsp;</th>",
				"<th>Template Name</th>",
				"<th>Start Date</th>",
				"<th>End Date</th>",
				"<th>&nbsp;</th><th>&nbsp;</th>",
			"</tr>",

			"<tpl if=\"''!== CurTemplate\">",
				"<tr>",
					"<th>Current Template:</th>",
					"<td>{CurTemplate.TemplateName}</td>",
						"<td>{CurTemplate.DateStarted}</td>",
						"<td>{CurTemplate.ScheduledEndDate}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" templateName=\"{CurTemplate.TemplateName}\" templateID=\"{CurTemplate.TemplateID}\">Show Details</button></td>",
					"<td>",
						"<button class=\"anchor\" name=\"GenerateEoTS\" templateName=\"{CurTemplate.TemplateName}\" templateID=\"{CurTemplate.TemplateID}\">Stop Treatment</button>",
						"<button style=\"display:none;\" class=\"anchor\" name=\"ShowEoTS\" templateName=\"{CurTemplate.TemplateName}\" templateID=\"{CurTemplate.TemplateID}\">Show End of Treatment Summary</button>",
					"</td>",
				"</tr>",
			"</tpl>",

			"<tpl for=\"Historical\">",
				"<tpl if=\"''!== TemplateName\">",
					"<tr>",
						"<th>Historical Template:</th>",
						"<td>{TemplateName}</td>",
						"<td>{DateStarted}</td>",
						"<td>{DateEndedActual}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" EotsID=\"{EotsID}\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show Details</button></td>",
						"<td>",
							"<tpl if=\"''=== EotsID\">",
								"<button class=\"anchor\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\" name=\"GenerateEoTS\">",
									"Generate End of Treatment Summary",
								"</button>",
							"</tpl>",
							"<tpl if=\"''!== EotsID\">",
								"<button class=\"anchor\" templateName=\"{TemplateName}\" EotsID=\"{EotsID}\" templateID=\"{TemplateID}\" name=\"ShowEoTS\">",
									"Show End of Treatment Summary",
								"</button>",
							"</tpl>",
						"</td>",
					"</tr>",
				"</tpl>",
			"</tpl>",
		"</table>",
		{
			fnc1 : function(data) {
				// debugger;
				/**
				console.log(data);
				if (data.CurTemplate) {
					console.log(data.CurTemplate);
				}
				if (data.Historical) {
					for (x = 0; x < data.Historical.length; x++) {
						console.log(data.Historical[x]);
					}
				}
				**/
				return "";
			}
		}
	)
});