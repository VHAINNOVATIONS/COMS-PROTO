Ext.define("COMS.view.Management.Buttons" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.ManagementBtns",
	"name" : "ManagementBtns",

	"items" : [
		{ "xtype" : "box", "componentCls" : "scEditInstructions", "html" : "<span>Note:</span> To edit a record, click the record in the table below, make changes in the Text field above, and click the \"Save\" button" },
		{ "xtype" : "container", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 0 0" },
			"layout": "hbox", 
			"items" : [ 
				{ "xtype" : "button", "text" : "Save", "scope" : this }, 
				{ "xtype" : "button", "text" : "Cancel", "scope" : this },
<<<<<<< HEAD
				{ "xtype" : "box", "html" : "<div style=\"width:700px;\">&nbsp;</div>" },
=======
				{ "xtype" : "box", "html" : "<div style=\"width:710px;\">&nbsp;</div>" },
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
				{ "xtype" : "button", "text" : "Delete", "scope" : this, "disabled" : true, "hidden" : true },
				{ "xtype" : "button", "text" : "Refresh", "scope" : this }
			]
		}
	]
});

