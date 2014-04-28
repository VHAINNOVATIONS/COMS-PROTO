Ext.define("COMS.view.Testing.TestTab" ,{
	extend: "Ext.tab.Panel",
	alias : "widget.TestTab",
	name : "Test Tab",
	padding : "10 10 5 10",
	defaults: {
		padding : "10 10 5 10",
		plain : true
	},
	plain : true,
	activeTab: 5,
	items : [
		{ xtype : "DischargeInstructions", title: "Patient Education" }
	]
});
