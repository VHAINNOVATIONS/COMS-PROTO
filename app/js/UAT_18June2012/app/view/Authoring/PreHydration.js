/*global Ext */
Ext.define('COMS.view.Authoring.PreHydration' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.TemplatePreHydration',

	margin: '0 20 20 20',
	title : 'Pre Therapy',
	items : [
		{ xtype : 'textfield', fieldLabel: 'PreHydration Instructions', labelAlign: 'right', width : 840, labelWidth: 150 },
		{ xtype : 'grid',
			height : 150,
			title : 'PreHydration Drug Regimen',
			store : { fields: ['Drug', 'Dosage1', 'Unit1', 'Infusion1', 'Dosage2', 'Unit2', 'Infusion2', 'Comments'] },

			columns : [
				{header : 'Drug', dataIndex : 'Drug' },
				{header : 'Dosage Amount', dataIndex : 'Dosage1', width: 90 },
				{header : 'Units', dataIndex : 'Units1', width: 40 },
				{header : 'Administration Method', dataIndex : 'Infusion1', width: 50 },

//				{header : 'OR', width: 25 },
//				{header : 'Dosage Amount', dataIndex : 'Dosage2', width: 25 },
//				{header : 'Units', dataIndex : 'Units2', width: 25 },
//				{header : 'Administration Method', dataIndex : 'Infusion2', width: 50 },

				{header : 'Instructions', dataIndex : 'Comments' }
			],
			dockedItems : [{
				xtype: 'toolbar',
				dock: 'bottom',
				buttonAlign: 'right',
				items: [
					{
						xtype: 'button',
						text: 'Add Drug',
						title: 'AddDrug'
					},
					{
						xtype: 'button',
						text: 'Remove Drug',
						title: 'RemoveDrug',
						disabled: true
					}
				]
			}]
		}

	]
});