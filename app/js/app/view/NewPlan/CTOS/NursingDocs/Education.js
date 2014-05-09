Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Education", {
	extend: "Ext.panel.Panel",
	alias: "widget.NursingDocs_Education",
	name: "Nursing Documentation Education Tab",
	title: "Discharge Instructions",
	items: [{xtype : 'DischargeInstructions' }]
});