Ext.define('COMS.controller.Management.Inventory', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.Inventory' ],
	stores : ["InventoryConsumption", "InventoryList"],
	refs: [
		{ ref : "SelInventoryReport",    selector : "Inventory [name=\"selInventory\"]" },
		{ ref : "SelInventoryError",     selector : "Inventory [name=\"selInvError\"]" },
		{ ref : "InvReportTitle",        selector : "Inventory [name=\"InvReportTitle\"]" },
		{ ref : "InventoryGrid",         selector : "Inventory grid" }
	],
	InvStore : null,

	init: function() {
		this.getStore("InventoryList").on("load", this.StoreLoaded, this);

		this.control({
			"AdminTab Inventory" : {
				activate : this.LoadPanel
			},
			"Inventory [name=\"selInventory\"]" : {
				select : this.ShowReport
			},
			"Inventory button[text=\"Generate New Report\"]" : {
				click: this.GenerateReport
			}
		});
	},

	LoadPanel : function(theTab, e, opts) {
		this.application.loadMask("Please wait; Loading list of reports");
		this.InvStore = this.getStore("InventoryList");
		this.InvStore.load();
	},

	StoreLoaded : function(theStore, records, successful, eOpts ) {
		var invRptTitle = this.getInvReportTitle().getEl();
		invRptTitle.setHTML("");

		var errLabel = this.getSelInventoryError().getEl();
		if (records.length === 0) {
			errLabel.setHTML("No Inventory reports are available");
		}
		else {
			errLabel.setHTML("");
		}
		this.application.unMask();
	},

	setReportTitle : function(record) {
		var Title;
		if ("01/01/1900 12:00AM" == record.StartDate || "" == record.StartDate) {
			Title = "Inventory Report as of " + record.Date;
		}
		else {
			Title = "Inventory Report from " + record.StartDate + " - " + record.Date;
		}
		var invRptTitle = this.getInvReportTitle().getEl();
		invRptTitle.setHTML(Title);
	},

	ShowReport : function(combo, records, opts) {
		var theRecord = records[0].getData();
		delete combo.lastQuery;
		var theReportID = theRecord.ID;
		this.setReportTitle(theRecord);
		var theGrid = this.getInventoryGrid();
		var theStore = theGrid.getStore();
		theStore.proxy.url = "/Reports/Inventory/" + theReportID;
		theStore.load();
	},

	GenerateReport : function() {
		this.application.loadMask("Please wait; Generating new report");
		var lastRecDate = "", lastRec = null, numRecs = this.InvStore.getCount();
		if (numRecs > 0) {
			lastRec = this.InvStore.getAt(numRecs-1);
			lastRecDate = lastRec.getData().Date;
			debugger;
		}
		var CMD = "POST";
		var URL = Ext.URLs.Inventory;
		Ext.Ajax.request({
			url: URL,
			method : CMD,
			scope: this,
			jsonData : { "LastInvDate" : lastRecDate },
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success) {
					if (resp.msg) {
						var invRptTitle = this.getInvReportTitle().getEl();
						invRptTitle.setHTML(resp.msg);
						var errLabel = this.getSelInventoryError().getEl();
						errLabel.setHTML("");
					}
					else {
						this.setReportTitle({StartDate : resp.StartDate, Date : resp.Date});
						var theGrid = this.getInventoryGrid();
						var theStore = theGrid.getStore();
						theStore.proxy.url = "/Reports/Inventory/" + resp.ReportID;
						theStore.load();
						var theCombo = this.getSelInventoryReport();
						theStore = theCombo.getStore();
						theStore.load();
					}
				}
				this.application.unMask();
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Delete Emetic Medication Record, Save Error - <br />" + resp.msg );
				this.application.unMask();
			}
		});
	}
});
