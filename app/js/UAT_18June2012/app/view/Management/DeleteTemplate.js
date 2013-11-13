Ext.define('COMS.view.Management.DeleteTemplate' ,{
	extend: 'Ext.form.FormPanel',
	alias : 'widget.DeleteTemplate',
	name : 'Delete Template',
	id  : 'deleteTemplate',
	title : 'Delete Template',
	items: [
		{
			xtype: 'form',
			margin : '10 10 10 10',
			layout: 'hbox',
			defaults : { margin: '5 5 5 0', labelAlign: 'right'},
			items: [
                                    { xtype : 'selDisease' }			
                               ]
		},
		{
			xtype : 'gridpanel',
			margin : '10 10 10 10',
			title : 'Templates',
			store : 'Templates',
                        multiSelect: true,
			columns : [
				{header: 'Template Name',  dataIndex: 'description',  flex: 1}
			],
			dockedItems : [{
				xtype: 'toolbar',
				dock: 'bottom',
				buttonAlign: 'right',
				items: [
					{
						xtype: 'button',
						text: 'Show All Templates',
						title: 'AllTemplates'
					},
					{
						xtype: 'button',
						text: 'Remove Template',
						title: 'RemoveTemplate',
						disabled: true
					}
				]
			}]
                        
		}
	],
//	buttons : [ 
//		{ text : 'Save', action : 'save' }, 
//		{ text : 'Canel', scope : this } 
//	],

	initComponent : function() {
		this.layoutConfig = {
			padding: 10
		};
		this.callParent(arguments);
	}
});