Ext.define("COMS.view.Messages.MessagesPanels" ,{
	extend: "Ext.tab.Panel",
	alias : "widget.MessagesPanels",
	name : "Messages Panels",
	title: "Messages",
	plain : true,
	autoEl : { tag : 'nav' },
	padding : "20 10 5 10",

//	tabPosition : "bottom",

	items : [
		{ xtype : "MessagesTab" },
		{ xtype : "MessagesUnread" }
	]
});


/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */