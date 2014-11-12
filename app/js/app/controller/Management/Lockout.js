Ext.define('COMS.controller.Management.Lockout', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.Lockout' ],
	stores : ["Lockout"],
	refs: [
		{ ref : "LockoutGrid",           selector : "Lockout grid" },
		{ ref : "UnlockBtn",             selector : "Lockout button[text=\"Unlock\"]" }
	],

	init: function() {
		this.control({
			"Lockout " : {
				beforerender: this.RefreshPanel
			},
			"Lockout grid" : {
				select: this.selectGridRow
			},
			"Lockout button[text=\"Unlock\"]" : {
				click: this.UnlockSelectedRecords
			},
			"Lockout button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			}
		});
	},

	RefreshPanel : function() {
		this.application.loadMask("Please wait; Loading Current Lockouts");

		var theGrid = this.getLockoutGrid();
		var theStore = theGrid.getStore();
		theStore.load();

		var UnlockBtn = this.getUnlockBtn();
		UnlockBtn.setDisabled(true);

		this.application.unMask();
		return true;
	},

	selectGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var UnlockBtn = this.getUnlockBtn();
		if (records.length <= 0) {
			UnlockBtn.setDisabled(true);
		}
		else {
			UnlockBtn.setDisabled(false);
		}
	},

	UnlockRecord : function(theRecords) {
		var record = theRecords.pop();
		debugger;
		if (record) {
			var rID = record.get("id");
			var CMD = "PUT";
			var URL = Ext.URLs.Lockout + "/" + rID;
			Ext.Ajax.request({
				url: URL,
				method : CMD,
				scope: this,
				records : theRecords,
				success: function( response, opts ){
					this.UnlockRecord(opts.records);
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Delete Emetic Medication Record, Save Error - <br />" + resp.msg );
				}
			});
		}
		else {
			this.application.unMask();
			this.RefreshPanel();
		}
	},

	UnlockSelectedRecords : function() {
		var theGrid = this.getLockoutGrid();
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Unlock", "Are you sure you want to unlock the selected sections?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Unlocking selected Records");
				this.UnlockRecord(theRecords);
			}
		}, this);
	}
});
