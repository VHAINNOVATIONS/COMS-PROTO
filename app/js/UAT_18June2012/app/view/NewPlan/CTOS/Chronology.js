Ext.define("COMS.view.NewPlan.CTOS.ChronologyOverview" ,{
	extend: "Ext.container.Container",
	alias : "widget.ChronologyOverview",
	name : "Chronology Overview",
	margin : "10 5 20 5",

	autoEl : { tag : "section" },

	tpl : new Ext.XTemplate(
		"<table border=\"1\" width=\"100%\" class=\"Therapy InformationTable\">",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=15%></colgroup>",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=61%></colgroup>",

		"	<thead><tr><th colspan=\"4\" class=\"large\">Chronology Information <span style=\"font-weight: normal;\">- for Patient: {PatientName}</span></th></tr></thead>",

		"	<tr><th align=\"right\">Regimen:</th><td colspan=\"3\">{RegimenName}</td></tr>",
		"	<tr><th align=\"right\">Description</th><td colspan=\"3\">{RegimenDescription}</td></tr>",
		"	<tr><th align=\"right\">Treatment Start:</th><td colspan=\"3\">{TreatmentStart}</td></tr>",
		"	<tr><th align=\"right\">Treatment End:</th><td colspan=\"3\">{TreatmentEnd}</td></tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		"		<td>{NeutropeniaRecommendation} (Note: Need to add recommendations to Lookup Table for FN)</td>",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>",
		"			<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>{ELevelRecommendationASCO}</p>",
		"			<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>",
		"		</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"5\">{[this.goalLink( values )]}</td></tr>",
		"	<tr><th>Clinical Trial</th><td colspan=\"5\">{[this.ctLink( values )]}</td></tr>",
		"	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"5\">{[this.PS( values )]}</td></tr>",
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
			goalLink : function ( current ) {
				if (current.Goal){
					return (current.Goal);
				}
				return ("No Goal Specified");
			},
			ctLink : function ( current ) {
				if (current.ClinicalTrial ) {
					return (current.ClinicalTrial);
				}
				return ("Clinical Trial Not Specified");
			},
			ctData : function ( current ) {
				if (current.ClinicalTrial) {
					return ("<tr><th>Type of Trial</th><td colspan=\"5\">" + current.ClinicalTrialType + "</td></tr>");
				}
				return ("");
			},
			PS : function ( current ) {
				var buf = current.PerformanceStatus;
				return (buf);
			}
		}
	)
});


Ext.define("COMS.view.NewPlan.CTOS.ChronologyBody" ,{
	extend: "Ext.container.Container",
	alias : "widget.ChronologyBody",
	name : "Chronology Body",
	margin : "0 0 20 0",
	autoEl : { tag : "section" }
});

Ext.define("COMS.view.NewPlan.CTOS.Chronology" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.Chronology",

	name : "Chronology Tab",
	margin : "0 0 20 0",

	autoEl : { tag : "section" },
	title: "Chronology",
	items : [ { xtype : "ChronologyOverview" }, { xtype : "ChronologyBody" }],


	initComponent: function() {
		wccConsoleLog("Chronology Tab View - Initialization");
		this.callParent(arguments);
	}
});