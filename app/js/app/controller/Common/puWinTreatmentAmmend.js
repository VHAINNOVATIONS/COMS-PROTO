Ext.define("COMS.controller.Common.puWinTreatmentAmmend", {
	extend : "Ext.app.Controller",
	views : [ "NewPlan.CTOS.NursingDocs.Authenticate", "Common.puWinTreatmentAmmend" ],
	refs : [
		{ ref : "AddendumsHistory", selector : "puWinTreatmentAmmend [name=\"AddendumsHistory\"]"},
		{ ref : "Grid", selector : "puWinTreatmentAmmend [name=\"ModifyData\"]" }
	],
	init: function () {
		this.control({
			"puWinTreatmentAmmend" : { 
				scope : this,
				afterrender : this.AmmendRecordRendered,
				activate : this.ActivateWindow
			},
			"puWinTreatmentAmmend button[text=\"Cancel\"]" : {
				click: this.Cancel
			},

			"puWinTreatmentAmmend [name=\"ModifyData\"]" : { // Handles the Cell Edit (both start and end of edit cycle.
				cellclick : this.AssignVerify2SignHandler
//				beforeedit : this.beforeCellEdit,
//				edit : this.afterCellEdit,
			}

			/**
			"puWinTreatmentAmmend [name=\"ModifyData\"]" : {
				cellclick : this.AssignVerify2SignHandler

			}
			
			,
			"Authenticate[title=\"Authenticate\"] button[action=\"save\"]": {
				click: this.AuthenticateUser
			}
			**/
		});
	},


	Cancel : function(btn) {
		btn.up('window').close();
	},

	ActivateWindow : function( theWin, eOpts ) {
		var theGrid = this.getGrid();
		var theStore = theGrid.getStore();
		var theData = theWin.record.getData();
		theStore.loadRawData(theData);

		var AddendumsHistory = this.getAddendumsHistory();
		theStore = AddendumsHistory.getStore();
		theStore.loadRawData(theData);
	},
	AmmendRecordRendered : function() {
	},

	AssignVerify2SignHandler : function(tableView, cellElement, cellIdx, record, rowElement, rowIndex, evt, opts) {
		// debugger;
		if (cellElement.innerHTML.search("Sign to Verify") > 0) {
			var StartTime = record.get("StartTime");
			if ("" === StartTime) {
				Ext.MessageBox.alert("Error", "You MUST specify at least a \"Start Time\" for this administration");
			}
			else if ("" === record.get("Comments")) {
				Ext.MessageBox.alert("Error", "You MUST make a comment on the reason for the addendum");
			}
			else {
				record.set("Treatment_User", "In Process...");
				var EditRecordWin = Ext.widget("Authenticate");
				EditRecordWin.curTreatmentRecord = record;
				var initialField = Ext.ComponentQuery.query('Authenticate [name=\"AccessCode\"]')[0];
				initialField.focus(true, true);
			}
		}
	}
});
