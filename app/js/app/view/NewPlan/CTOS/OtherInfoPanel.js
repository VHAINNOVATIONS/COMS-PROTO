Ext.define("COMS.view.NewPlan.CTOS.OtherInfoPanel" ,{
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.OtherInfoPanel",
	"title" : "Other Information",
	"name" : "OtherInfoPanel",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"tpl" : new Ext.XTemplate(
		"<tpl for=\"records\">",
			"<tpl if=\"Other != ''\">",
				"<table border=\"1\" width=\"100%\" class=\"FlowsheetTable\">",
				"	<thead><tr><th><a name=\"OI_{AdminDate}\">Other Information for date - {AdminDate}</a></th></tr></thead>",
				"	<tr><td>{Other}</td></tr>",
				"</table>",
			"</tpl>",
		"</tpl>"
	)
});