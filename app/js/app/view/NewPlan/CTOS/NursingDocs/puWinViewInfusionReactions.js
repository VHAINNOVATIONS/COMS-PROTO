Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinViewInfusionReactions",
	"title" : "Infusion Reactions",
	"closeAction" : "destroy",
	"width" : 820,
	"height" : 220,
	"minHeight" : 220,
	"autoShow" : true,
	"resizable" : true,
	"modal" : true,
	"items" : [ { "xtype" : "selInfusionReaction" } ]
});

