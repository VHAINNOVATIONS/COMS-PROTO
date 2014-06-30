Ext.define("COMS.view.Common.puWinSelAmputation",{
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinSelAmputation",
	"title" : "Patient Amputations",
	"closeAction" : "hide",
	"width" : 400,
	"height" : 270,
	"minHeight" : 270,
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
				{  "xtype" : "AmputationSelection", "width" : 330 }
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});