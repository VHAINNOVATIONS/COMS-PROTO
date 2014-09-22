Ext.define("COMS.view.Common.puWinChangeAdminDate", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinChangeAdminDate",
	"title" : "Change Administration Date",
	"closeAction" : "destroy",
	"width" : 820,
	"height" : 215,
	"minHeight" : 215,
	"resizable" : true,
	"modal" : true,
	"autoShow" : true,
	"items" : [
		{
			"xtype" : "form",
			"url" : Ext.URLs.ChangeAdminDate,
			"border" : false,
			"bodyPadding" : 10,
			"defaults" : { "labelAlign" : "right", "labelStyle" : "font-weight:bold", "labelWidth" : 250, "width" : 500 },
			"items" : [
				{ "xtype": "RequiredInstr"},
				{ "xtype" : "displayfield", "name" : "CurAdminDate", "fieldLabel" : "Current Administration Date", "value" : Ext.Date.format( new Date(), "m/d/Y" ) },
				{ "xtype" : "datefield", 
					"fieldLabel" : "Enter new Administration Date <em>*</em>", 
					"minValue" : new Date(), 
					"name" : "NewAdminDate", 
					"width" : 370 
				},
				{ "xtype" : "box", "name" : "ChangeAdminDateOffsetMsg", "margin" : "0 0 5 70", "width" : 300 },
				{ "xtype" : "combobox",
					"fieldLabel" : "Dates to change <em>*</em>",
					"queryMode" : "local",
					"displayField" : "name",
					"valueField" : "data",
					"store" : { "fields" : [ "name", "data" ], "data" : [
						{ "name" : "This Administration Date Only", "data" : "This" },
						{ "name" : "All Future Dates in the Current Cycle", "data" : "Cycle" },
						{ "name" : "All Regimen Future Dates", "data" : "All" }
					]},
					"labelAlign" : "right", 
					"labelStyle" : "font-weight:bold", 
					"labelWidth" : 250, 
					"width" : 500 
				}
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});

