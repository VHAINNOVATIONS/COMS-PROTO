/*
 *	Since this widget is a window, it's not a sub object to any other class when attempting to get a handle to it.
 *	Hence it's reference is : Ext.ComponentQuery.query('AddDrugRegimen')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddDrugRegimen button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddDrugRegimen button[action="save"]')[0].el.dom
 */
Ext.define('COMS.view.Authoring.AddDrugRegimen', {
	extend: 'Ext.window.Window',
	alias: 'widget.AddDrugRegimen',

	title: 'Add New Drug Regimen',
	layout: 'fit',
	autoShow: true,
	width: 800,
	items: [{
		xtype: "form",
		//defaults : { margin: '5', labelAlign: "right" },
		items: [
			{
				xtype: 'container',
				margin: '10 0 10 5',
				html: '<b>Fields with a <span style="color:red">*</span> are required fields</b>',
				width: 220
			},
			{
				xtype: 'container',
				layout: 'hbox',
				defaults: { labelAlign: 'right', margin: '5 5 5 0'},
				items: [
					{
						xtype: 'radiogroup',
						labelAlign: 'left',
						name: 'patientRadio',
						fieldLabel: 'Medication Type',
						itemId: 'patientRadios',
						columns: 2,
						items: [
							{ boxLabel  : 'InPatient', name : 'PatientType', inputValue: 'InPatient', width: 100, checked: true  },
							{ boxLabel  : 'OutPatient', name  : 'PatientType', inputValue: 'OutPatient', width: 125  }
						]
					}
				]
			},
			{
				xtype: 'container',
				layout: 'hbox',
				defaults: { labelAlign: 'right', margin: '5 5 5 0'},
				items: [
					{
						xtype: 'combo',
						fieldLabel: 'Select Drug <em>*</em>',
						labelWidth: 80,
						width: 425,
						name: 'Drug',
						store: 'DrugStore',
						queryMode: 'local',
						displayField: 'name',
						valueField: 'name',
						allowBlank: false
					}
				]
			},
			{
				xtype: 'container',
				layout: 'hbox',
				defaults: { labelAlign: 'right', margin: '0 5 5 0'},
				items: [
					{
						xtype: 'selSequence'
					},
					{
						xtype: 'textfield',
						fieldLabel: 'Administration Day(s) <em>*</em>',
						labelWidth: 140,
						width: 285,
						maskRe: /^[-,0-9 ]+$/,
						name: 'Day',
						allowBlank: false,
						colspan : 4,
						margin: '0 0 5 30'
					}
				]
			},
			{
				xtype: 'container',
				layout: 'hbox',
				defaults: {
					labelAlign: 'right',
					margin: '5 5 5 0'
				},
				items: [
					{
						xtype: 'textfield',
						maskRe: /[0-9\.]/,
						name: 'Amt',
						fieldLabel: 'Dosage Amount <em>*</em>',
						width: 205,
						labelWidth: 115,
						allowBlank: false
					},
					{
						xtype: 'combo',
						fieldLabel: 'Units <em>*</em>',
						width: 150,
						labelWidth: 45,
						name: 'Units',
						store: 'DrugUnitsStore',
						displayField: 'name',
						valueField: 'name',
						allowBlank: false
					},
					{
						xtype: 'combo',
						fieldLabel: 'Route <em>*</em>',
						name: 'Route',
						labelWidth: 50,
						width: 195,
						store: 'InfusionStore',
						displayField: 'name',
						valueField: 'name' ,
						allowBlank: false
					},
					{
						xtype: 'container',
						width: 195,
						name: 'dosespacer',
						html: "<span style='margin-left: 150px; font-weight: bold;'>&nbsp;</span>",
						hidden: false
					},
					{
						xtype: 'timefield',
						name: 'AdminTime',
						fieldLabel: 'Administration Time <em>*</em>',
						labelWidth: 100,
						width: 215,
						colspan : 2,
						margin: '0 0 5 0',
						hidden: true,
						allowBlank: false
					}
				]
			},
			{
				xtype: 'container',
				layout: 'hbox',
				name: 'fluidInfo',
				hidden: true,
				defaults: {
					labelAlign: 'right',
					margin: '5 0 5 0'
				},
				items: [
					{
						xtype: 'combo',
						name: 'FluidType',
						fieldLabel: 'Fluid Type <em>*</em>',
						width: 220,
						lableWidth:85,
						allowBlank: false,
						queryMode: 'local',
						displayField: 'value',
						valueField: 'value',
						store: 'LookupStore'
					},
					{
						xtype: 'textfield',
						fieldLabel: 'Fluid Volume <em>*</em>',
						maskRe: /[0-9\.]/,
						labelWidth: 85,
						width: 170,
						name: 'FluidVol',
						margin: '5 0 5 5',
						colspan : 1,
						allowBlank: false
					},
					{
						xtype: 'container',
						html: 'ml',
						readOnly: true,
						name: 'fluidVolUnit',
						width: 20
					},
					{
						xtype: 'textfield',
						fieldLabel: 'Flow Rate <em>*</em>',
						maskRe: /[0-9\.]/,
						labelWidth: 70,
						width: 120,
						name: 'FlowRate',
						colspan : 1,
						allowBlank: false
					},
					{
						xtype: 'container',
						html: 'ml/hr',
						readOnly: true,
						name: 'flowRateUnit',
						width: 50
					},
					{
						xtype: 'textfield',
						name: 'InfusionTime',
						fieldLabel: 'Infusion Time',
						width: 195,
						lableWidth:120,
						readOnly: true
					}
				]
			},
			{
				xtype: 'textfield',
				labelAlign: 'right',
				margin: '0 5 5 0',
				labelWidth: 75,
				width: 780,
				fieldLabel: "Instructions",
				name: 'Instructions',
				colspan : 4
			}
		]
	}],

	initComponent: function () {
		this.buttons = [{
			text: 'Save',
			action: 'save'
		}, {
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];
		this.callParent(arguments);
	}
});
