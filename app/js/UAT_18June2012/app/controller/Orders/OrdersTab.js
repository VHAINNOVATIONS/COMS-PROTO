
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
			}
        });
    },

	HandleRefresh : function( button, evt, eOpts ) {
		var theStore = Ext.getStore("OrdersStore");
		theStore.removeAll(true);
		theStore.load();
	},

    collapseCombo: function(picker, eOpts){
        alert(picker.getValue());
    },
	LoadStore : function() {
		var theStore = Ext.getStore("OrdersStore");
		theStore.groupField = "Patient_ID";
		theStore.load();
	},
	

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
	
 });
