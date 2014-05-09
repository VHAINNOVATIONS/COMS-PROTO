Ext.define("COMS.view.Management.Buttons" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.ManagementBtns",
	"name" : "ManagementBtns",
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 0 0" },
	"layout": "hbox", 
	"items" : [ 
		{ "xtype" : "button", "text" : "Save", "scope" : this }, 
		{ "xtype" : "button", "text" : "Cancel", "scope" : this },
		{ "xtype" : "button", "text" : "Refresh", "scope" : this, "margin" : "0 0 0 765"}
	]
});
