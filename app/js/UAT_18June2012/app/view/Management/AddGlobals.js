Ext.define('COMS.view.Management.Globals' ,{
	extend: 'Ext.form.FormPanel',
	alias : 'widget.Globals',
	name : 'Add Globals',
	id  : 'Globals',
	title : 'Add Globals',
	store : 'GlobalStore',
	items: [
		{
			xtype: 'form',
			margin : '10 10 10 10',
			layout: 'hbox',
			defaults : { margin: '5 5 5 0', labelAlign: 'right', labelWidth: 160, width: 300 },
			items: [
				{
					xtype: 'textfield',
					name: 'sitelist',
					fieldLabel: 'Change Site Code'
				},
				{
					xtype: 'textfield',
					name: 'domain',
					fieldLabel: 'Enter Local Domain'
				}
			]
		},
		{
			xtype : 'gridpanel',
			margin : '10 10 10 10',
			title : 'Current Selected Global Data',
			store : Ext.create('Ext.data.Store', {
					model : 'COMS.model.GlobalLookupModel'
				}),
			columns : [
				{header: 'sitelist',  dataIndex: 'sitelist',  flex: 1},
				{header: 'domain', dataIndex: 'domain', flex: 1}
			],
			dockedItems : [{
				xtype: 'toolbar',
				dock: 'bottom',
				buttonAlign: 'right',
				items: [
					{
						xtype: 'button',
						text: 'Edit Global',
						title: 'EditGlobal',
                        disabled: true
					}
				]
			}]
                        
		}
	],
	buttons : [ 
		{ text : 'Save', action : 'save' }, 
		{ text : 'Canel', scope : this } 
	],

	initComponent : function() {
		this.layoutConfig = {
			padding: 10
		};
		this.callParent(arguments);
	}
});