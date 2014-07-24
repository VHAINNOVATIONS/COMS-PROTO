Ext.define("COMS.view.NewPlan.CTOS.FlowSheetOptionalQues", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.FlowSheetOptionalQues",
	"title" : "Optional Information",
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
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "10" },
			"items" : [
				{
					"xtype" : "fieldset", "title" : "Disease Response", "collapsible" : true, 
					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "10", "width" : 700 },
					"items" : [
//						{ 
//							"xtype" : "textfield", 
//							"name" : "DiseaseResponse", 
//							"fieldLabel" : "Disease Response"
//						},
						{ "xtype" : "textareafield", "grow" : true, "height" : 180, "name" : "DRData", "fieldLabel" : "Disease Response"}
					]
				},

				{
					"xtype" : "fieldset", "title" : "Toxicity", "collapsible" : true, 
					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "10", "width" : 700 },
					"items" : [
						{ 
							"xtype" : "combobox", 
							"name" : "ToxInstr", 
							"store" : "Toxicity", 
							"displayField" : "Label", 
							"valueField" : "ID", 
							"fieldLabel" : "Toxicity" 
						},
						{ "xtype" : "displayfield", "name" : "ToxDetails", "fieldLabel" : "Details" },
						{ "xtype" : "textareafield", "grow" : true, "height" : 180,"name" : "Data", "fieldLabel" : "Comments"}
					]
				},
				{
					"xtype" : "fieldset", "title" : "Other", "collapsible" : true, 
					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "10", "width" : 700 },
					"items" : [
//						{ 
//							"xtype" : "textfield", 
//							"name" : "fs_Other", 
//							"fieldLabel" : "Other"
//						},
						{ "xtype" : "textareafield", "grow" : true, "height" : 180, "name" : "OtherData", "fieldLabel" : "Other"}
					]
				}
			],
	"buttons" : [
		{ "xtype" : "button", "text" : "Save",   "margin" : "10 30"},
		{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"}
	]
		}
	]


/*
	"extend" : "Ext.window.Window",
	"alias" : "widget.FlowSheetOptionalQues",

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
*/
});