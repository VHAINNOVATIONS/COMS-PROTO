/*global Ext */
/*
 *	Since this widget is a window, it's not a sub object to any	other class when attempting to get a handle to it.
 *	Hence it's reference is	: Ext.ComponentQuery.query('AddHydrationDrug')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddHydrationDrug button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddHydrationDrug button[action="save"]')[0].el.dom
 */
Ext.define('COMS.view.Authoring.AddHydrationDrug', {
	extend: 'Ext.window.Window',
	alias: 'widget.AddHydrationDrug',

	title: 'Add New Drug',
	layout: 'fit',
	autoShow: true,
	width: 785,
	modal: true,

	initComponent: function () {
		this.items = [
			{
				xtype: 'form',
				items: [
					{"xtype": "RequiredInstr"},
					{
						xtype: 'container',
						layout: 'hbox',
						defaults: {
							labelAlign: 'right',
							margin: '5 5 5 0'
						},
						items: [{
							xtype: 'radiogroup',
							labelAlign: 'left',
							name: 'patientRadio',
							fieldLabel: 'Medication Type',
							itemId: 'patientRadios',
							columns: 2,
							items: [{
								boxLabel: 'InPatient',
								name: 'PatientType',
								inputValue: 'InPatient',
								width: 100,
								checked: true
							}, {
								boxLabel: 'OutPatient',
								name: 'PatientType',
								inputValue: 'OutPatient',
								width: 125
							}]
						}]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						defaults: {
							labelAlign: 'right',
							margin: '5 5 5 0'
						},
						items: [{
							xtype: 'combo',
							fieldLabel: 'Select Drug <em>*</em>',
							labelWidth: 80,
							width: 405,
							name: 'Drug',
							store: 'DrugStore',
							queryMode: 'local',
							allowBlank: false,
							displayField: 'name',
							valueField: 'name'
						}]
					},

					{
						'xtype' : 'container',
						'layout' : 'hbox',
						'defaults' : {
							'labelAlign' : 'right',
							'margin' : '5 5 5 0'
						},
						'items' : [
						{
							'xtype' : 'container',
							'width' : 10,
							'name' : 'dosespacer',
							'html' : "<span style='margin-left: 15px; font-weight: bold;'>&nbsp;</span>",
							'hidden' : false
						}, 
						{
							'xtype' : 'textfield',
							'fieldLabel' : 'Administration Time',
							'width' : 220,
							'hidden' : true,
							'labelWidth' : 130,
							// 'allowBlank' : false,
							'name' : 'AdminTime'
						}, 
						{
							'xtype' : 'textfield',
							'maskRe' : /[0-9\.]/,
							'fieldLabel' : 'Dosage Amount <em>*</em>',
							'width' : 180,
							'labelWidth' : 120,
							'allowBlank' : false,
							'name' : 'Amt1'
						}, 
						{
							'xtype' : 'combo',
							'fieldLabel' : 'Units <em>*</em>',
							'width' : 150,
							'labelWidth' : 45,
							'store' : 'DrugUnitsStore',
							'displayField' : 'name',
							'valueField' : 'name',
							'allowBlank' : false,
							'name' : 'Units1'
						}, 
						{
							'xtype' : 'combo',
							'fieldLabel' : 'Route <em>*</em>',
							'width' : 180,
							'labelWidth' : 65,
							'store' : 'InfusionStore',
							'displayField' : 'name',
							'valueField' : 'name' ,
							'allowBlank' : false,
							'name' : 'Infusion1'
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
							margin: '0 0 5 0'
						},
						items: [
							{
								xtype: 'combo',
								name: 'FluidType1',
								fieldLabel: 'Fluid Type <em>*</em>',
								width: 205,
								lableWidth: 85,
								allowBlank: false,
								queryMode: 'local',
								displayField: 'value',
								valueField: 'value',
								store: 'LookupStore'
							},
							{
								xtype: 'textfield',
								maskRe: /[0-9\.]/,
								name: 'FluidVol1',
								fieldLabel: 'Fluid Volume <em>*</em>',
								labelWidth: 85,
								margin: '0 0 5 15',
								width: 175,
								allowBlank: false
							}, {
								xtype: 'container',
								html: 'ml',
								readOnly: true,
								name: 'fluidVolUnit1',
								margin: '2 0 0 3',
								width: 20
							}, {
								xtype: 'textfield',
								name: 'FlowRate1',
								maskRe: /[0-9\.]/,
								fieldLabel: 'Flow Rate <em>*</em>',
								width: 140,
								labelWidth: 95,
								allowBlank: false
							}, {
								xtype: 'container',
								html: 'ml/hr',
								readOnly: true,
								name: 'flowRateUnit1',
								margin: '2 0 0 3',
								width: 30
							}, {
								xtype: 'textfield',
								name: 'InfusionTime1',
								fieldLabel: 'Infusion Time',
								width: 180,
								lableWidth: 100,
								readOnly: true
							}
						]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						defaults: {
							labelAlign: 'right',
							margin: '0 5 5 0'
						},
						items: [
						{
							xtype: 'textfield',
							maskRe: /^[-,0-9 ]+$/,
							name: 'Day',
							fieldLabel: 'Administration Day(s) <em>*</em>',
							width: 270,
							labelWidth: 150,
							allowBlank: false,
							margin: '0 5 5 0'
						},
						{
							xtype: 'selSequence'
						}
						]
					},
					{
						xtype: 'textfield',
						labelAlign: 'right',
						margin: '5 5 5 0',
						labelWidth: 75,
						width: 765,
						fieldLabel: "Instructions",
						name: 'Instructions'
					}
				]
			}
		];
		this.buttons = [
			{
				text: 'Save',
				action: 'save'
			},
			{
				text: 'Cancel',
				scope: this,
				handler: this.close
			}
		];
		this.callParent(arguments);
	}
});