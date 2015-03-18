Ext.define("COMS.controller.Orders.OrdersTab", {
	"extend" : "Ext.app.Controller",
	"stores" : ["OrdersStore"],
	"views" : ["Orders.OrdersTab"],
	"models" : ["OrdersTable"],

	"refs" : [
		{
			"ref" : "Orders",
			"selector" : "OrdersTab"
		}
	],

	"init" : function () {
		this.control({
			"OrdersTab": {
				collapse: this.collapseCombo,
				activate : this.PanelReady,
				beforeactivate : this.PanelReady,
				enable : this.PanelReady,
				focus : this.PanelReady,
				afterrender : this.PanelReady
			},
			"OrdersTab button[text=\"Refresh\"]": {
				click: this.HandleRefresh
			},
			"OrdersTab button[text=\"Update Records\"]": {
				click: function () {
					var theGrid = this.getOrders();
					theGrid.setLoading( "Updating Order Records", false );

					this.PostedRecsFailed = [];
					this.PostedRecs = [];

					var HandleResponse = function(record, status, theScope) {
						if (theScope.PostedRecs.length <= 0) {
							var theGrid = theScope.getOrders();
							theGrid.setLoading( false, false );
							if (theScope.PostedRecsFailed.length <= 0) {
								Ext.MessageBox.alert("Success", "The Order Status has been updated.");
								theScope.getController("Orders.OrdersTab").LoadOrdersStore(true);
							}
							else {
								Ext.MessageBox.alert("Invalid", "The Order Status was not updated");
							}
						}
						else {
							var aRec = theScope.PostedRecs.pop();
							if (aRec) {
								var tmpData = aRec.getData();
								console.log("Saving a single Record - " + tmpData.drug + " - " + tmpData.type + " - " + tmpData.route);
								aRec.save({
									scope: theScope,
									success: ResponseAlertGood,
									failure: ResponseAlertFail
								});
							}
						}
					};
					var ResponseAlertFail = function(record) {
						this.PostedRecsFailed.push(record);
						HandleResponse(record, false, this);
					};
					var ResponseAlertGood = function(record) {
						HandleResponse(record, true, this);
					};

					var theStore = Ext.getStore("OrdersStore");
					var DirtyRecords = theStore.getUpdatedRecords();
					var drLen = DirtyRecords.length;
					this.NumRecords = drLen;
					if (drLen > 0) {
						// Run Update Process for each record.
						var i, rec;
						for (i = 0; i < drLen; i++) {
							this.CurRecIdx = i;
							rec = DirtyRecords[i];
							var recData = rec.getData();
							var orderStatus = recData.orderstatus;
							if (null == orderStatus || "" == orderStatus) {
								Ext.MessageBox.alert("Information", "Please select an Order Status");
								return;
							}

							var order = Ext.create("COMS.model.OrdersTable", {
								orderstatus: orderStatus,
								templateID: recData.templateID,
								drug: recData.drug,
								dose: recData.dose,
								unit: recData.unit,
								patientID: recData.patientID,
								dfn: recData.dfn,
								type: recData.type,
								route: recData.route,
								orderid: recData.orderid,
								Last_Name: recData.Last_Name,
								adminDay : recData.adminDate
							});
							this.PostedRecs.push(order);
						}
						HandleResponse(null, null, this);	// Save the first record.
					}
					else {
						theGrid.setLoading( false, false );
					}
				}
			}
		});
	},

	PanelReady : function (thePanel, eOpts) {
	},

	"HandleRefresh" : function (button, evt, eOpts) {
		this.LoadOrdersStore(false);
	},

	"LoadOrdersStore" : function (LoadAndRenderOEMTab) {
		var PatientInfo, theStore;
		theStore = Ext.getStore("OrdersStore");
		if (theStore) {
			theStore.load({
				scope: this,
				callback: function() {
					if (false !== LoadAndRenderOEMTab) {
						if (this.application.Patient) {
							PatientInfo = this.application.Patient;
							PatientInfo.OEMDataRendered = false;
							this.application.fireEvent("DisplayOEMRecordData", PatientInfo);
						}
					}
				}
			});
		}
	}
});