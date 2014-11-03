Ext.define("COMS.view.NewPlan.CTOS.FlowSheetOptionalQues", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.FlowSheetOptionalQues",
	"title" : "Adding General Information",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 950,
	"height" : 550,
	"closeAction" : "destroy",
	"defaultFocus" : "[name=\"DRData\"]",

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
						{ "xtype" : "textareafield", "grow" : true, "height" : 180, "name" : "DRData", "fieldLabel" : "Disease Response"}
					]
				},
				{ "xtype" : "FS_Toxicity" },
				{
					"xtype" : "fieldset", "title" : "Other", "collapsible" : true, 
					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "10", "width" : 700 },
					"items" : [
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
});