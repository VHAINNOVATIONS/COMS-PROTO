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
					"{[this.debuggerFcn( values, parent )]}",
					"<tr>",
						"<th>Current Template:</th>",
						"<tpl if=\"null === TemplateDescription || ''=== TemplateDescription\">",
							"<td>{TemplateName}</td>",
						"</tpl>",
						"<tpl if=\"null !== TemplateDescription && '' !== TemplateDescription\">",
							"<td>{TemplateDescription}</td>",
						"</tpl>",
						"<td>{DateStarted}</td>",
						"<td>{[this.dspDateEnded(values)]}</td>",
						"<tpl if=\"'' === ApprovedByUser && '' !== AssignedByUser && '1' === SessionPreceptee\">",
							"<td colspan='2'>Template pending approval by cosigner</td>",
						"</tpl>",

						"<tpl if=\"'' === ApprovedByUser && '' !== AssignedByUser && '1' !== SessionPreceptee\">",
							"<td colspan='2'><button class=\"anchor\" name=\"ApproveRequest2ApplyTemplate\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Approve Regimen</button></td>",
						"</tpl>",
						"<tpl if=\"'' !== ApprovedByUser && '' !== AssignedByUser\">",
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
						"</tpl>",



					"</tr>",
				"</tpl>",

				"<tpl for=\"Historical\">",
					"<tr>",
						"<th>Historical Template:</th>",
						"<tpl if=\"null === TemplateDescription || ''=== TemplateDescription\">",
							"<td>{TemplateName}</td>",
						"</tpl>",
						"<tpl if=\"null !== TemplateDescription && '' !== TemplateDescription\">",
							"<td>{TemplateDescription}</td>",
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
			},
			debuggerFcn : function ( current, prev ) {
				// debugger;
				if ("1" === SessionPreceptee) {
					var assign = current.AssignedByUser;
				}
				else {
					var apprvd = current.ApprovedByUser;
				}
			}
		}
	)
});