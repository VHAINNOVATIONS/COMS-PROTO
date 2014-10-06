Ext.define("COMS.view.NewPlan.MedRemindersPanel" ,{
	"extend" : "Ext.panel.Panel",
	"alias" : "widget.MedRemindersPanel",
	"title" : "Medication Reminders", 
	"collapsible" : true, 
	"collapsed" : true, 
	"margin" : "0 0 10 0", 

	"autoEl" : { "tag" : "section" },
	"cls" : "xPandablePanel",

	"resizable" : true,
	"autoScroll" : true,
	"autoHeight" : true,

	"layout" : {
		"type" : "vbox",
		"align" : "stretch"
	},

	"defaults" : {
		"margin" : "5 10 5 10"
	},
	"items" : [
			{ "xtype" : "MedRemindersGrid" },
			{ "xtype" : "MedRemindersForm" }
	]
});
