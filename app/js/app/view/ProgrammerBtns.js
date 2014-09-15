Ext.define("COMS.view.ProgrammerBtns" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.ProgrammerBtns",
	"name" : "ProgrammerBtns",
	"margin" : "10",
	"hidden" : true,
	
	"items" : [
		{ "xtype" : "container", "layout" : "hbox", "defaults" : { "margin" : 2 }, 
			items : [
				{ "xtype" : "button", "text" : "Debugger" },
				{ "xtype" : "button", "text" : "Load Treatment Data" },
				{ "xtype" : "button", "text" : "FS Optional Ques" },
				{ "xtype" : "button", "text" : "Infusion Reactions" },
				{ "xtype" : "button", "text" : "Refresh Cumulative Dosing" },
				{ "xtype" : "button", "text" : "Add Cumulative Dosing" }
			]
		},
		{ "xtype" : "container", "layout" : "hbox", "defaults" : { "margin" : 2 }, 
			items : [
				{ "xtype" : "button", "text" : "Patients List" },
				{ "xtype" : "button", "text" : "Change Admin Date" },
				{ "xtype" : "button", "text" : " " },
				{ "xtype" : "button", "text" : " " },
				{ "xtype" : "button", "text" : " " },
				{ "xtype" : "button", "text" : " " }
			]
		}
	]
})
