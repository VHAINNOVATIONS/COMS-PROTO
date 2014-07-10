Ext.define("COMS.view.Common.puWinAddCumDose", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinAddCumDose",
	"title" : "Lifetime Cumulative Medication Dose Tracking",
	"closeAction" : "hide",
	"width" : 520,
	"height" : 200,
	"minHeight" : 200,
	"layout" : "fit",
	"resizable" : true,
	"modal" : true,
	"items" : [
		{
			"xtype" : "form",
			"url" : Ext.URLs.PatientCumulativeDosing,
			"layout" : { "type" : "vbox", "align" : "stretch" },
			"border" : false,
			"bodyPadding" : 10,
			"defaults" : { "labelAlign" : "right", "labelStyle" : 'font-weight:bold' },
			"items" : [
				{"xtype": "RequiredInstr"},
				{ 
					"xtype" : "combobox", 
					"name" : "value", 
					"fieldLabel" : "Medication <em>*</em>",  
					"width" : 922,
					"displayField" : "name",
					"valueField" : "id",
					"allowBlank" : false,
					"store" : "CumulativeDosingMeds"
				},
				{ "xtype" : "container", "layout" : "hbox", "defaults" : { "labelAlign" : "right", "labelStyle" : 'font-weight:bold' }, "items" : [
					{ 
						"xtype" : "textfield", 
						"name" : "LifetimeDose", 
						"fieldLabel" : "Lifetime Dose <em>*</em>", 
						"emptyText" : "Enter lifetime dose"
					},
					{
						"xtype" : "combo",
						"fieldLabel" : "Units <em>*</em>",
						"width" : 150,
						"labelWidth" : 60,
						
						"store" : "DrugUnitsStore",
						"displayField" : "name",
						"valueField" : "name",
						"allowBlank" : false,
						"name" : "Units"
					}
				]}
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});

