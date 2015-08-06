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
				afterrender : this.AmmendRecordRendered
			},
			"puWinTreatmentAmmend button[text=\"Cancel\"]" : {
				click: this.Cancel
			},

			"puWinTreatmentAmmend [name=\"ModifyData\"]" : { // Handles the Cell Edit (both start and end of edit cycle.
				cellclick : this.AssignVerify2SignHandler
			}
		});
	},
	ammendedComment : "<em class=\"required-field\">*</em>",


	Cancel : function(btn) {
		btn.up('window').close();
	},

	AmmendRecordRendered : function(theWin, eOpts ) {
		var theGrid = this.getGrid();
		var AddendumsHistory = this.getAddendumsHistory();

		var gStore = theGrid.getStore();
		var ahStore = AddendumsHistory.getStore();

		var theRecord = theWin.record;
		var theData = theRecord.getData();
		var theComment = theRecord.get("Comments");
		var thePos = theComment.indexOf(this.ammendedComment);
		if (-1 !== thePos || 0 === thePos) {
			theComment = theComment.replace(this.ammendedComment , " ").trim();
			theRecord.set("Comments", theComment);
		}
		gStore.add(theRecord);		// <--- This clears out the data in the Treatment Panel Grid... WHY?
		ahStore.add(theRecord);
		theGrid.getActiveView().refresh(true);
	},

	AssignVerify2SignHandler : function(tableView, cellElement, cellIdx, record, rowElement, rowIndex, evt, opts) {
		if (cellElement.innerHTML.search("Sign to Verify") > 0) {
			var theComment = record.get("Comments");
			var StartTime = record.get("StartTime");
			if ("" === StartTime) {
				Ext.MessageBox.alert("Error", "You MUST specify at least a \"Start Time\" for this administration");
			}
			else if ("" === theComment) {
				Ext.MessageBox.alert("Error", "You MUST make a comment on the reason for the addendum");
			}
			else {
				record.set("Treatment_User", "In Process...");
				var thePos = theComment.indexOf(this.ammendedComment);
				if (-1 === thePos || thePos > 0) {
					record.set("Comments", this.ammendedComment + " " + theComment);
				}
				
				var EditRecordWin = Ext.widget("Authenticate", { theView : tableView, theRow : rowIndex, curTreatmentRecord: record, retFcn : function(curTreatmentRecord, theScope, c) { 
					var pWin = Ext.ComponentQuery.query('puWinTreatmentAmmend')[0];
					var theParGrid = pWin.theGrid;		// The grid in the Treatment Tab
					var pGridStore = theParGrid.getStore();
					var record2Update = pWin.record;
					record2Update.set(curTreatmentRecord.getData());
					record2Update.commit();
					theParGrid.refreshNode(pWin.rIdx);
					pWin.close();
					this.close();
				} });
				var initialField = Ext.ComponentQuery.query('Authenticate [name=\"AccessCode\"]')[0];
				initialField.focus(true, true);
			}
		}
	}
});