Ext.define("COMS.view.Management.LockoutButtons" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.LockoutButtons",
	"name" : "LockoutButtons",

	"items" : [
		{ "xtype" : "box", "componentCls" : "scEditInstructions", "html" : "<span>Note:</span> To unlock one or more locked records, select the record(s) in the table below, and click the \"Unlock\" button" },
		{ "xtype" : "container", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 0 0" },
			"layout": "hbox", 
			"items" : [ 
				{ "xtype" : "button", "text" : "Unlock", "scope" : this }, 
				{ "xtype" : "box", "html" : "<div style=\"width:700px;\">&nbsp;</div>" },
				{ "xtype" : "button", "text" : "Refresh", "scope" : this }
			]
		}
	]
});

