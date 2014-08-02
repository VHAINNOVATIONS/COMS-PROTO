Ext.define("COMS.view.Common.puWinSelCancer", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinSelCancer",
	"title" : "Patient Type of Cancer",
	"closeAction" : "hide",
	"width" : 520,
	"height" : 200,
	"minHeight" : 200,
	"layout" : "fit",
	"resizable" : true,
	"modal" : true,
	"items" : [
		{
			"xtype" : "form",
			"layout" : { "type" : "vbox", "align" : "stretch" },
			"border" : false,
			"bodyPadding" : 10,
			"items" : [
				{ "xtype" : "selDisease" }, 
				{ "xtype" : "selDiseaseStage" }
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});