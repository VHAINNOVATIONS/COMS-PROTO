Ext.define("COMS.view.ProgrammerBtns" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.ProgrammerBtns",
	"name" : "ProgrammerBtns",
	"margin" : "10",
	"layout" : "hbox", 
	"hidden" : true,

	"items" : [
		{ "xtype" : "button", "text" : "Debugger" },
		{ "xtype" : "button", "text" : "Load Treatment Data" },
		{ "xtype" : "button", "text" : "FS Optional Ques" },
		{ "xtype" : "button", "text" : "Infusion Reactions" },
		{ "xtype" : "button", "text" : "Refresh Cumulative Dosing" },
		{ "xtype" : "button", "text" : "Add Cumulative Dosing" }
	]
});
