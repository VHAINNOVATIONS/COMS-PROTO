Ext.define("COMS.view.Common.puWinAddCumDose", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinAddCumDose",
	"title" : "Historical Cumulative Medication Dose Entry",
//	"closeAction" : "destroy",
	"closeAction" : "hide",
	"autoShow" : true,
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
				{ "xtype" : "component", "name" : "MedMaxAllowable", "margin" : "0 0 0 140", "autoEl" : { "tag" : "div" }},
				{ "xtype" : "container", "layout" : "hbox", "margin" : "5 0", "defaults" : { "labelAlign" : "right", "labelStyle" : 'font-weight:bold' }, "items" : [
					{ 
						"xtype" : "textfield", 
						"name" : "LifetimeDose", 
						"fieldLabel" : "Historical Dose <em>*</em>", 
						"labelWidth" : 140,
						"emptyText" : "Enter Historical dose"
					},
					{ "xtype" : "component", "name" : "HistoricalDoseUnits", "margin" : "4 0 0 0", "autoEl" : { "tag" : "span", "html" : "" }},
					{ "xtype" : "textfield", "name" : "Units", "hidden" : true },
					{ "xtype" : "textfield", "name" : "CumulativeDoseUnits", "hidden" : true }
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

