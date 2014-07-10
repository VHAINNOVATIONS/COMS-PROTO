Ext.define("COMS.view.Common.puWinAddCumDose", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinAddCumDose",
	"title" : "Lifetime Cumulative Medication Dose Tracking",
	"closeAction" : "hide",
	"width" : 820,
	"height" : 220,
	"minHeight" : 220,
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
					"labelWidth" : 140,
					"width" : 922,
					"displayField" : "MedName",
					"valueField" : "MedID",
					"allowBlank" : false,
					"store" : "CumulativeDosingMeds"
				},
				{ "xtype" : "container", "layout" : "hbox", "margin" : "5 0", "defaults" : { "labelAlign" : "right", "labelStyle" : 'font-weight:bold' }, "items" : [
					{ 
						"xtype" : "textfield", 
						"name" : "LifetimeDose", 
						"fieldLabel" : "Lifetime Dose <em>*</em>", 
						"labelWidth" : 140,
						"emptyText" : "Enter lifetime dose"
					},
					{
						"xtype" : "combo",
						"fieldLabel" : "Units <em>*</em>",
						"width" : 150,
						"labelWidth" : 60,
						
						"store" : "DrugUnitsStore2",
						"displayField" : "name",
						"valueField" : "id",
						"allowBlank" : false,
						"name" : "Units"
					}
				]},
				{ 
					"xtype" : "textfield", 
					"name" : "Source", 
					"fieldLabel" : "Source of information", 
					"labelWidth" : 140
				}
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});

