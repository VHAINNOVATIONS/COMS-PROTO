// create reusable renderer
Ext.util.Format.comboRenderer = function (combo) {
	return function (value) {
		var record = combo.findRecord(combo.valueField, value);
		return record ? record.get(combo.displayField) : combo.valueNotFoundText;
	};
};

// create the combo instance
var combo = new Ext.form.ComboBox({
	typeAhead: true,
	triggerAction: "all",
	lazyRender: true,
	queryMode: "local",
	store: {
		fields: [{
			name: "orderstatus"
		}],
		data: [{
				orderstatus: "Ordered"
			}, {
				orderstatus: "In-Coordination"
			}, {
				orderstatus: "Cleared"
			}, {
				orderstatus: "Finalized"
			}, {
				orderstatus: "Dispensed"
			}, {
				orderstatus: "Administered"
			}, {
				orderstatus: "Cancelled"
			}

		]
	},
	displayField: "orderstatus"
});


Ext.define("COMS.view.Orders.OrdersTab", {
	extend: "Ext.grid.Panel",
	alias: "widget.OrdersTab", // Any references to this view should be for an xtype : "OrdersTab"
	name: "Orders Tab",
	margin: "0 10 10 10",
	autoScroll: "y",
	columnLines: true,
	width: 970, // Not used
	viewConfig: {
		stripeRows: true,
		height: 655,
		forceFit: true
	},
	store: "OrdersStore", // Since this is now a Grid, we need to get the name of our store

	plugins: [
		Ext.create("Ext.grid.plugin.CellEditing", {
			clicksToEdit: 1
		})
	],

	selType: "cellmodel",

	columns: [{
		header: "<div>Name</div>",
		dataIndex: "Last_Name",
		// width: 180,
		flex: 3,
		sortable: true,
		align: "left"
	}, {
		header: "<div>Patient</div>",
		dataIndex: "patientID",
		width: 60,
		sortable: true,
		align: "left",
		hidden: true
	}, {
		header: "<div>Template</div>",
		dataIndex: "templateID",
		width: 80,
		sortable: false,
		align: "left",
		editor: new Ext.form.TextField(),
		hidden: true
	}, {
		header: "<div>OrderID</div>",
		dataIndex: "orderid",
		width: 80,
		sortable: false,
		align: "left",
		editor: new Ext.form.TextField(),
		hidden: true
	}, {
		header: "<div class=\"multiLine\">Admin<br/>Day</div>",
		dataIndex: "adminDay",
		width: 45,
		sortable: true,
		align: "left"
	}, {
		header: "<div>Admin Date</div>",
		dataIndex: "adminDate",
		width: 70,
		sortable: true,
		align: "left",
		hidden: true
	}, {
		header: "<div>Type</div>",
		dataIndex: "type",
		// width: 75,
			flex: 2,
		sortable: false,
		align: "left"
	}, {
		header: "<div>Drug</div>",
		dataIndex: "drug",
		// width: 100,
		flex: 3,
		sortable: true,
		align: "left"
	}, {
		header: "<div>Dosage</div>",
		dataIndex: "dose",
		width: 50,
		sortable: false,
		align: "left"
	}, {
		header: "<div>Units</div>",
		dataIndex: "unit",
		width: 50,
		sortable: false,
		align: "left"
	}, {
		header: "<div>Route</div>",
		dataIndex: "route",
		width: 50,
		sortable: false,
		align: "left"
	}, {
		header: "<div class=\"multiLine\">Fluid/<br/>Volume</div>",
		dataIndex: "fluidVol",
		width: 50,
		sortable: false,
		align: "left"
	}, {
		header: "<div class=\"multiLine\">Flow<br/>Rate</div>",
		dataIndex: "flowRate",
		width: 40,
		sortable: false,
		align: "left"
	}, {
		header: "<div>Instructions</div>",
		dataIndex: "instructions",
		width: 120,
		sortable: false,
		align: "left"
	}, {
		header: "<div>Order Status</div>",
		dataIndex: "orderstatus",
		width: 90,
		sortable: true,
		align: "left",
		editor: combo
	}
	],
	buttons: [{
		text: "Refresh"
	}, {
		text: "Edit",
		disabled: true
	}, {
		text: "Update Records"
	}],
	buttonAlign: "left"
});
