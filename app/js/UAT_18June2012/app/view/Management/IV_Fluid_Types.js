Ext.define('COMS.view.Management.IV_Fluid_Types', {
	extend: "Ext.form.Panel",
	alias: "widget.IV_Fluid_Types",
	name: "IV_Fluid_Types",
	items : [ 
		{ 
			xtype : "combobox", name : "IV_Medication", fieldLabel : "Select IV Medication",  labelWidth: 200,  labelAlign: "right", width: 550, 
			displayField : "name", valueField : "id",
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
			xtype: "CheckCombo", 
			name: "IV_FluidTypeMulti", 
			fieldLabel : "Select IV Fluid Type (one or more)", labelAlign: "right", labelWidth: 200,  width: 450, 
			displayField : "name", valueField : "id",
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
		},
		{  
			xtype : "grid",  name: "IV_FluidTypesList", title: "IV Fluid Types", store : "IVFluidType",
			columns : [ 
				{ text : "Medication", dataIndex : "MedName", width: 540 }, 
				{ text : "IV Fluid Type", dataIndex : "FluidType" }
			]
		}
	],
	buttons : [ 
		{ text : "Save", action : "save" }, 
		{ text : "Cancel", scope : this } 
	]
});
