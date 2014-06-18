Ext.define("COMS.view.Common.SelectAdverseReactionAlerts", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.SelectAdverseReactionAlerts",

	"title" : "Select Adverse Reaction Alerts",
	"autoShow" : true,
	"width" : 800,
	"items" : [
		{ 
			"xtype" : "form", "items" : [
				{ "xtype" : "box", "html" : "<h1>Adverse Reactions which will generate an alert</h1>" },
				{
					"xtype": "checkcombo",
					"noDataText" : "Select Adverse Reactions to cause an alert",
					"value" : "",		/* If a CheckCombo is not initialized with a value of "" the form shows up as Dirty */
					"labelClsExtra" : "NursingDocs-boxLabel", 
					"labelAlign" : "right",
					"labelWidth" : 150,
					"fieldLabel": "Adverse Reactions",
					"name": "ND_E_SelectAdverseReactions4Alert",
					"width": 450,
					"margin" : "5 0 10 0",
					"displayField": "fieldLabel",
					"valueField": "fieldLabel"
				},
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel", "scope" : this }
			]
		}

	]
});