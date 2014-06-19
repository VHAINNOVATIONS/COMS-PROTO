Ext.define("COMS.view.Common.SelectAdverseReactionAlerts", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.SelectAdverseReactionAlerts",

	"title" : "Select Adverse Reaction Alerts",
	"autoShow" : true,
	"width" : 800,
	"items" : [
		{ 
			"xtype" : "form", "items" : [
				{ "xtype" : "box", "html" : "<h1>Adverse Reactions which would trigger an alert</h1>" },
				{
					"xtype": "checkcombo",
					"value" : "",		/* If a CheckCombo is not initialized with a value of "" the form shows up as Dirty */
					"labelClsExtra" : "NursingDocs-boxLabel", 
					"labelAlign" : "right",
					"labelWidth" : 250,
					"fieldLabel": "Select Adverse Reaction(s) which would trigger an alert",
					"name": "AdverseReactions4Alert",
					"width": 550,
					"margin" : "5 0 10 0",
					"displayField": "fieldLabel",
					"valueField": "fieldLabel"
				},
				{
					"xtype" : "hiddenfield",
					"name" : "AdverseReactionsType"
				}
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel", "scope" : this }
			]
		}

	]
});