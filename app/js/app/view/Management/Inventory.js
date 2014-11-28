Ext.define("COMS.view.Management.Inventory", {
	"extend": "Ext.form.Panel",
	"alias": "widget.Inventory",
	"name": "Inventory",
	"title": "Inventory",
	"autoEl": {
		tag: "section"
	},
	border: false,
	"defaults": {
		"labelAlign": "right",
		"labelClsExtra": "NursingDocs-label",
		"labelWidth" : 130,
		"allowBlank" : false,
		"margin": "10 0"
	},
	"items": [
		{ "xtype" : "container", "layout" : "hbox", "items" : [

		{
			"xtype" : "combobox", "name" : "selInventory","store" : "InventoryList",
				"emptyText" : "Select Date/Time of report",
				"allowBlank" : false,
				"width" : 360,
				"labelWidth" : 180,
				"fieldLabel" : "Select an Inventory Date <em>*</em>",
				"labelAlign" : "right",
				"displayField" : "Date",
				"valueField" : "id",
			},
		{ "xtype" : "box", "name" : "selInvError", "html" : "", "margin" : "4 0 0 5" }
		]},
			{ "xtype" : "button", "text" : "Generate New Report", "scope" : this },
		{ "xtype" : "box", "name" : "InvReportTitle", "html" : "", "style" : { "textAlign" : "center", "fontWeight" : "bold" }},
		{
			"xtype": "grid",
			"name": "InventoryConsumptionList",
			"title": "Inventory Consumption",
			"store": 'InventoryConsumption',
			"forceFit": true,
			"overflowY": "scroll",
			"margin": "10 0",
			"multiSelect": true,
			"viewConfig": {
				"stripeRows": true,
				"markDirty": false
			},
			"columns": [
				{
					"text": "Drug",
					"dataIndex": "Drug",
					"flex": 3
				},
				{
					"text": "Total Units",
					"dataIndex": "Total",
					"renderer" : function(value, metaData, record, row, col, store, gridView) {
						var theData = record.getData();
						return theData.Total + " " + theData.Unit.trim();
					},
					"flex": 2
				}
			]
		}
	]
});