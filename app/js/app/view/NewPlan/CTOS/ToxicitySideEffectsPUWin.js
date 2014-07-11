Ext.define("COMS.view.NewPlan.CTOS.ToxicitySideEffectsPUWin", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.ToxicitySideEffectsPUWin",

	"title" : "Toxicity Side Effects",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 850,
	"height" : 450,
	"closeAction" : "destroy",

	"items" : [
		{
			"xtype" : "form",
			"margin" : "10",
			"autoScroll" : true,
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
			"items" : [
				{ 
					"xtype" : "combobox", 
					"width" : 800, 
					"margin" : "10", 
					"name" : "ToxInstr", 
					"store" : "Toxicity", 
					"displayField" : "Label", 
					"valueField" : "ID", 
					// "optField" : "Details", 
					"fieldLabel" : "Toxicity" 
				},
				{ "xtype" : "displayfield", "width" : 430, "margin" : "10", "name" : "ToxDetails", "fieldLabel" : "Details" },
				{ "xtype" : "textareafield", "grow" : true, "width" : 800, "height" : 180, "margin" : "10", "name" : "Data", "fieldLabel" : "Comments"}
			],
			"buttons" : [
				{ "xtype" : "button", "text" : "Save",   "margin" : "10 30"},
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"}
			]
		}
	]

});