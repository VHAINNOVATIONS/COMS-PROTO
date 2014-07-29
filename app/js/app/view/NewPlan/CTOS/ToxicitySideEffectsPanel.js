Ext.define("COMS.view.NewPlan.CTOS.ToxicitySideEffectsPanel" ,{
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.ToxicitySideEffectsPanel",
	"title" : "Toxicity / Side Effects",
	"name" : "ToxicitySideEffectsPanel",
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 
	"bodyPadding" : "10",
	"tpl" : new Ext.XTemplate(
		//			"{[this.debuggerFcn( values, parent )]}",
		"<tpl for=\"records\">",
			"<tpl if=\"ToxicityInstr != ''\">",
				"<table border=\"1\" width=\"100%\" class=\"FlowsheetTable\" id=\"ToxPanel-{AdminDate}-{xindex}\">",
				"	<thead><tr><th><a name=\"Tox_{AdminDate}\">Toxicity Information for date - {AdminDate}</a></th></tr></thead>",
				"	<tr><td>{[this.formatData(values.ToxicityInstr)]}</td></tr>",
				"	<tr><td>{[this.formatData(values.ToxicityDetails)]}</td></tr>",
				"	<tr><td>{[this.formatData(values.Toxicity)]}</td></tr>",
				"</table>",
			"</tpl>",
		"</tpl>",
		{
			disableFormats: true,
			formatData : function(data) {
				return Ext.util.Format.htmlDecode(data);
			}
		}
	)
});