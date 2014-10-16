Ext.define("COMS.controller.Common.DEMOpuWin", {
	extend : "Ext.app.Controller",

	stores : [  ],
	views : [ "NewPlan.CTOS.FS_Toxicity" ],

	refs: [
		{ "ref" : "HistoricalDoseUnits",				selector: "puWinAddCumDose component[name=\"HistoricalDoseUnits\"]" },
		{ "ref" : "MedMaxAllowable",					selector: "puWinAddCumDose component[name=\"MedMaxAllowable\"]" },
		{ "ref" : "NewPlanTab",							selector: "NewPlanTab"}
	],

	init: function() {
		this.control({
			"DEMOpuWin button[text=\"Delete\"]" : {
				click: this.Delete
			},
			"DEMOpuWin button[text=\"Done\"]" : {
				click: this.Done
			}
		});
	},


	Delete : function(btn) {
		var theForm = btn.up('form').getForm();
		var theController = this.getController("NewPlan.CTOS.FS_Toxicity");
		theController.DeleteSelectedRecords(theForm);
	},

	Done : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').close();
	}
});