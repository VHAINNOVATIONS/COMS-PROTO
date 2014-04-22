Ext.define('COMS.view.Management.RoundingRules', {
	extend: "Ext.form.Panel",
	alias: "widget.RoundingRules",
	name: "RoundingRules",
	items : [ 
		{ 
			xtype : "radiogroup", 
			fieldLabel : "Select Rounding Percentage", 
			labelWidth: 170, 
			columns : 1, 
			vertical : true, 
			width : 450,
			items : [
				{ boxLabel : "No&nbsp;rounding", name : "RoundingRule", inputValue : "0", checked : true },
				{ boxLabel : "5%", name : "RoundingRule", inputValue : "5" },
				{ boxLabel : "10%", name : "RoundingRule", inputValue : "10" }
			]
		},
		{ 
			xtype : "container", 
			html : "Rounding Rules are applied based on the percentage specified when the Pharmacist finalizes an Order Entry Management Record"
		}			
	],
	buttons : [ 
		// The Rounding Value get's pushed into the Lookup Table
		{ text : "Save", action : "save" }, 
		{ text : "Cancel", scope : this } 
	]
});