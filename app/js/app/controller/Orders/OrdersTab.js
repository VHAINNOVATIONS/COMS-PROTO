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

			"Authenticate[title=\"Authenticate to Sign Orders\"] button[action=\"save\"]": {
				click: {
					scope : this,
					fn : this.OrdersAuthenticateUser
				}
			},

			"OrdersTab button[text=\"Update Records\"]": {
				click: function () {
					var curTreatmentRecord;
					this.OrdersUpdateRecords();



/**************
					var EditRecordWin = Ext.widget("Authenticate", 
						{ 
							title: "Authenticate to Sign Orders",
							// Note: Any model instance would do the "TreatmentAuthenticateUser()" function just requires a model for setting the variables for authenticating the user info.
							curTreatmentRecord : Ext.create(Ext.COMSModels.ND_Treatment, {}), 
							retFcn : function(curTreatmentRecord, theScope, c) { 
								var theGrid = theScope.getOrders();
								theGrid.setLoading( "Updating Order Records", false );

								theScope.PostedRecsFailed = [];
								theScope.PostedRecs = [];

								var theStore = Ext.getStore("OrdersStore");
								var DirtyRecords = theStore.getUpdatedRecords();
								var drLen = DirtyRecords.length;
								theScope.NumRecords = drLen;
								if (drLen > 0) {
									// Run Update Process for each record.
									var i, rec;
									for (i = 0; i < drLen; i++) {
										theScope.CurRecIdx = i;
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
										theScope.PostedRecs.push(order);
									}
									theScope.HandleResponse(null, null, theScope);	// Save the first record.
								}
								else {
									theGrid.setLoading( false, false );
								}
								this.close();
							}
						}
					);
****************/
				}
			}
		});
	},


	OrdersUpdateRecords : function() {
		var theGrid = this.getOrders();
		theGrid.setLoading( "Updating Order Records", false );

		this.PostedRecsFailed = [];
		this.PostedRecs = [];

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
			this.HandleResponse(null, null, this);	// Save the first record.
		}
		else {
			theGrid.setLoading( false, false );
		}
	},

	OrdersAuthenticateUser : function (button) {		// Handler for Authenticate widget after user clicks "Sign"
		var theWin = button.up("Authenticate");
		var curTreatmentRecord = theWin.curTreatmentRecord;

		this.SignRecordBtn = button;
		button.hide();
		var win = button.up('window');

		win.setLoading("Authenticating digital signature", false);
		var form = win.down('form');
		var values = form.getValues();
		var SignData = window.SessionUser + " - " + Ext.Date.format(new Date(), "m/d/Y - g:i a");

		curTreatmentRecord.set("AccessCode", values.AccessCode);
		curTreatmentRecord.set("User", values.AccessCode);
		curTreatmentRecord.set("VerifyCode", values.VerifyCode);

		Ext.Ajax.request({
			scope : this,
			url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
			success: function( response, opts ){
				win.setLoading(false, false);
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success && "Failed" !== resp.records) {
					curTreatmentRecord.set("AccessCode", "");
					curTreatmentRecord.set("User", resp.records);
					curTreatmentRecord.set("VerifyCode", "");
					if (win.retFcn) {
						win.retFcn(curTreatmentRecord, this);
					}
					else {
						win.close();
					}
				}
				else {
					Ext.MessageBox.alert("Error", "Authentication failed! Please click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
					this.SignRecordBtn.show();
				}
			},
			failure : function( response, opts ) {
				win.setLoading(false, false);
				Ext.MessageBox.alert("Error", "Authentication failed! \n\nPlease click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
				this.SignRecordBtn.show();
			}
		});
	},

	HandleResponse : function(record, status, theScope) {
			if (theScope.PostedRecs.length <= 0) {
				var theGrid = theScope.getOrders();
				theGrid.setLoading( false, false );
				if (theScope.PostedRecsFailed.length <= 0) {
					Ext.MessageBox.alert("Success", "The Order Status has been updated.");
					theScope.getController("Orders.OrdersTab").LoadOrdersStore(true, true);
				}
				else {
					Ext.MessageBox.alert("Invalid", "The Order Status was not updated");
				}
			}
			else {
				var aRec = theScope.PostedRecs.pop();
				if (aRec) {
					var tmpData = aRec.getData();
					// console.log("Saving a single Record - " + tmpData.drug + " - " + tmpData.type + " - " + tmpData.route);
					aRec.save({
						scope: theScope,
						success: this.ResponseAlertGood,
						failure: this.ResponseAlertFail
					});
				}
			}
		},

	ResponseAlertFail : function(record) {
		this.PostedRecsFailed.push(record);
		this.HandleResponse(record, false, this);
	},
	ResponseAlertGood : function(record) {
		this.HandleResponse(record, true, this);
	},

	PanelReady : function (thePanel, eOpts) {
	},

	HandleRefresh : function (button, evt, eOpts) {
		this.LoadOrdersStore(false, true);
	},

	LoadOrdersStore : function (LoadAndRenderOEMTab, forceRefresh) {
		var PatientInfo, theStore;
		theStore = Ext.getStore("OrdersStore");
		if (theStore) {
			if (0 == theStore.getCount() || forceRefresh) {
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
	}
});
