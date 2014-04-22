Ext.define("COMS.view.Management.Meds" ,{
	extend: "Ext.tab.Panel",
	alias : "widget.MedsAdminTab",
	name : "Medications",
	autoEl : { tag : "nav" },
	padding : "10 10 5 10",
	defaults: {
		padding : "10 10 5 10"
	},
	plain : true,
	items : [
		{ xtype : "MedsNonRounded", title: "Medications Not Rounded"},
		{ xtype : "form", title : "Rounding Rules", 
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
		},

		{ xtype : "form", title : "Medication Holds",
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
		},
		{ xtype : "form", title : "IV Fluid Types", name : "IV_Fluid_Types",
			items : [ 
				{	xtype : "container", layout: "hbox", items : [
					{ 
						xtype : "combobox", name : "IV_Medication", fieldLabel : "Select IV Medication",  labelWidth: 120,  labelAlign: "right", width: 550, displayField : "name", valueField : "id",
						store : Ext.create('Ext.data.Store', {
							model : 'COMS.model.GenericLookupModel',
							proxy: {
								type: 'rest',
								api: {
									read: Ext.URLs.Drugs + "/InPatient"
								},
								reader: {
									type: 'json',
									root : 'records',
									successProperty : 'success'
								}
							}
						})
					},
					{ 
						xtype : "combobox",  name: "IV_FluidType", fieldLabel : "Select IV FLuid Type",  margin: "0 0 0 20", labelWidth: 120,  displayField : "name", valueField : "id",
						store : Ext.create('Ext.data.Store', {
							model : 'COMS.model.GenericLookupModel',
							proxy: {
								type: 'rest',
								api: {
									read: Ext.URLs.FluidType
								},
								reader: {
									type: 'json',
									root : 'records',
									successProperty : 'success'
								}
							}
						})
					}
				]
				},
				{  
					xtype : "grid",  name: "IV_FluidTypesList", title: "IV Fluid Types", store : "IVFluidType",
					columns : [ { text : "Medication", dataIndex : "MedName", width: 540 }, { text : "IV Fluid Type", dataIndex : "FluidType" } ]
				}
			],
			buttons : [ { text : "Save"}, { text : "Cancel" } ]
		}
	],

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}

});
