Ext.define("COMS.view.NewPlan.CTOS.OtherInfoPanel" ,{
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.OtherInfoPanel",
	"title" : "Other Information",
	"name" : "OtherInfoPanel",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"autoEl" : { "tag" : "section" },
	"cls" : "Tab", 
	"tpl" : new Ext.XTemplate(
		"<tpl for=\"records\">",
			"<tpl if=\"Other != ''\">",
				"<table border=\"1\" width=\"100%\" class=\"FlowsheetTable\" id=\"OIPanel-{AdminDate}-{xindex}\">",
				"	<thead><tr><th><a name=\"OI_{AdminDate}\" id=\"OI_{AdminDate}\">Other Information for date - {AdminDate}</a></th></tr></thead>",
				"	<tr><td>{[this.formatData(values.Other, xindex)]}</td></tr>",
				// "	<tr><td>{Other}</td></tr>",
				"</table>",
			"</tpl>",
		"</tpl>",
		{
			disableFormats: true,
			formatData : function(data, idx) {
				return Ext.util.Format.htmlDecode(data);
			}
		}
	)
});