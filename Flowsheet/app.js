Ext.override(Ext.data.proxy.Ajax, { timeout:60000 });
Ext.URLs = [];
Ext.COMSModels = []; // Needed for Lookup Table Models, only needed for local dev environment.

Ext.URLs.FlowSheetRecords = "/Flowsheet/FS";		// "Flowsheet/Data";		// Used in Flowsheet Model
Ext.COMSModels.Flowsheet = "COMS.model.Flowsheet";


// Don't include a controller here until it's included in the "controllers" array in the Ext.application() below.
// Controllers must be included here if a store is used in the view managed by the controller
Ext.require([
	// Require loading of all models to prevent the occasional "me.model is null" error
	Ext.COMSModels.Flowsheet,
	"COMS.controller.NewPlan.CTOS.FlowSheetTab",
]);

Ext.application({
	name: "COMS",

	controllers: [
		"NewPlan.CTOS.FlowSheetTab"
	],

	launch: function () {
		wccConsoleLog("Launching Application Base");

		Ext.QuickTips.init();
		Ext.create("Ext.container.Container", {
			id: "AppContainer",
			layout: "fit",
			items: [
				{
					xtype: "container",
					contentEl: "EndControls"
				}
			]
		});

		Ext.get("Loader").fadeOut({
			duration: 1000
		});
		Ext.get("application").fadeIn({
			duration: 1000
		});
		Ext.get("footer").fadeIn({
			duration: 1000
		});
		wccConsoleLog("Application created");
	},

	loadMask: function (msg) {
		if (!msg) {
			msg = "One moment please, loading data...";
		}

		Ext.getBody().mask(msg, "x-mask-loading").setHeight(1000 + Ext.getBody().getHeight());
	},
	unMask: function () {
		Ext.getBody().unmask();
	}

});
