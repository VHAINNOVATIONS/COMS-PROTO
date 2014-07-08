Ext.define("COMS.view.NewPlan.CTOS.OtherPUWin", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OtherPUWin",

	"title" : "Other",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 500,
	"height" : 300,
	"closeAction" : "destroy",
	// "url" : Ext.URLs.Edit_OEMRecord,

	"items" : [
		{
			"xtype" : "form",
			"margin" : "10",
			"autoScroll" : true,
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
			"items" : [
				{ "xtype" : "textareafield", "grow" : true, "width" : 430, "height" : 180, "margin" : "10", "name" : "Data", "fieldLabel" : "Comments"}
			],
			"buttons" : [
				{ "xtype" : "button", "text" : "Save",   "margin" : "10 30"},
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"}
			]
		}
	]

});