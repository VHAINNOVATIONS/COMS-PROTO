Ext.define('COMS.view.Management.MedicationHolds', {
	extend: "Ext.form.Panel",
	alias: "widget.MedicationHolds",
	name: "MedicationHolds",
	items : [ 
		{ xtype : "radiogroup", fieldLabel : "Allow Medication Holds", labelWidth: 170, columns : 1, vertical : true, width : 450,
			items : [
				{ boxLabel : "Yes", name : "AllowMedHolds", inputValue : "1", checked : true },
				{ boxLabel : "No", name : "AllowMedHolds", inputValue : "0" }
			]
		}
	],
	buttons : [ 
		{ text : "Save", action : "save" }, 
		{ text : "Cancel", scope : this } 
	]
});
