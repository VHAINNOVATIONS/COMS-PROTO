Ext.define("COMS.view.Common.DEMOpuWin", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.DEMOpuWin",
	"title" : "DEMO Pop Up Window",
	"closeAction" : "destroy",
	"autoShow" : true,
	"width" : 920,
	"height" : 640,
	"minHeight" : 440,
	"layout" : "fit",
	"resizable" : true,
	"modal" : true,
	"items" : [
//		{ "xtype" : "FS_Toxicity" }
		{ "xtype" : "EmeticMeds" }
	]
});

