Ext.define("COMS.view.NewPlan.CTOS.DiseaseResponsePanel" ,{
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.DiseaseResponsePanel",
	"title" : "Disease Response",
	"name" : "DiseaseResponsePanel",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"autoEl" : { "tag" : "section" },
	"cls" : "Tab", 
	"tpl" : new Ext.XTemplate(
		"<tpl for=\"records\">",
			"<tpl if=\"Disease_Response != ''\">",
				"<table border=\"1\" width=\"100%\" class=\"FlowsheetTable\" id=\"DRPanel-{AdminDate}-{xindex}\">",
				"	<thead><tr><th><a name=\"DR_{AdminDate}\">Disease Response for date - {AdminDate}</a></th></tr></thead>",
				"	<tr><td>{Disease_Response}</td></tr>",
				"</table>",
			"</tpl>",
		"</tpl>"
	)
});