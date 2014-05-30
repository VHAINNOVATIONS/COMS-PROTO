
Ext.define('COMS.controller.Orders.OrdersTab', {
    extend : 'Ext.app.Controller',
    stores : ['OrdersStore'],
    views : ['Orders.OrdersTab'],
    models : ['OrdersTable'],

	refs: [
	{ ref : "Orders", selector : "OrdersTab" }	// BUT, if we did want to get a handle to the grid control at some point this would allow us to use "this.getOrders()" to get the grid panel.
    ],


    init: function() {
        wccConsoleLog('Initialized Orders Tab Panel Navigation Controller!');
        this.control({
            'OrdersTab':{
                collapse: this.collapseCombo
            },
			"OrdersTab button[text=\"Refresh\"]" : {
				click : this.HandleRefresh
			},
			"OrdersTab button[text=\"Update Records\"]" : {
				click : function() { 
					debugger; 
					var theStore = Ext.getStore("OrdersStore");
					var DirtyRecords = theStore.getUpdatedRecords();
					if (DirtyRecords.length > 0) {
						// Run Update Process for each record.
						var i, rec;
						for (i = 0; i < DirtyRecords.length; i++) {
							rec = DirtyRecords[i];
							var orderStatus = rec.get('orderstatus');
                                if(null == orderStatus || '' == orderStatus){
                                    Ext.MessageBox.alert('Information', 'Please select an Order Status');
                                    return;
                                }
                                var order = Ext.create('COMS.model.OrdersTable', {
                                        orderstatus: rec.get('orderstatus'),
                                        templateID: rec.get('templateID'),
                                        drug: rec.get('drug'),
										patientID: rec.get('patientID'),
										type: rec.get('type'),
										route: rec.get('route'),
										orderid: rec.get('orderid'),
										Last_Name: rec.get('Last_Name')
                                });
                                order.save({
                                        scope: this,
                                        success: function (data) {
                                            Ext.MessageBox.alert('Success', 'The Order Status has been updated.');
                                        },
                                        failure: function (record, op) {
                                            Ext.MessageBox.alert('Invalid', 'The Order Status was not updated');
                                        }
                                });
						}
					}
				}
			}


        });
    },

	HandleRefresh : function( button, evt, eOpts ) {
		var theStore = Ext.getStore("OrdersStore");
		theStore.removeAll(true);
		theStore.groupField = "Patient_ID";
		theStore.load();
	},
/**
    collapseCombo: function(picker, eOpts){
        alert(picker.getValue());
    },

	LoadStore : function() {
		var theStore = Ext.getStore("OrdersStore");
		theStore.groupField = "Patient_ID";
		theStore.load();
	}
/***	
	,
	

SaveChanges : function(button, event, eOpts) {
		var win = button.up("window");
		var form = win.down("form");
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
                alert("here");
		
			var Template_ID = this.application.templateID().getValue();
			var Order_Status = this.application.orderstatus().getValue();
			var Drug_Name = this.application.drug().getValue();
			var Patient_ID = this.application.patientID().getValue();
			var type = this.application.type().getValue();
			var route = this.application.route().getValue();
			var orderid = this.application.orderid().getValue();
			var Last_Name = this.application.Last_Name().getValue();

		var saveCfg = { scope : this, callback : function( records, operation, success ) {
			
			var Template_ID = this.application.templateID().getValue();
			var Order_Status = this.application.orderstatus().getValue();
			var Drug_Name = this.application.drug().getValue();
			var Patient_ID = this.application.patientID().getValue();
			var type = this.application.type().getValue();
			var route = this.application.route().getValue();
			var orderid = this.application.orderid().getValue();
			var Last_Name = this.application.Last_Name().getValue();

		}};
		record.save(saveCfg);
	}
***/
 });
