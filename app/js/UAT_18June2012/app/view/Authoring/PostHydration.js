Ext.define('COMS.view.Template.PostHydration' ,{
	extend: 'Ext.container.Container',
//	extend: 'Ext.grid.Panel',
	alias : 'widget.TemplatePostHydration',

	margin: '0 20 20 20',
	title : 'Post Therapy',
	items : [
		{ xtype : 'textfield', fieldLabel: 'PreHydration Instructions', width : 640, labelWidth: 200 },
		{ xtype : 'gridpanel', columns : [
				{ header: 'Drug', dataIndex: 'drug', editor : { allowBlank:false /* , xtype : 'selDrug' */ } },
				{ header: 'Unit', dataIndex: 'unit', editor: { allowBlank:false }},
				{ header: 'Comments', dataIndex: 'description', width: 270, editor: { allowBlank:false }, flex: 1 }
			]
		}

	],

	initComponent: function() {
		this.store = {
			fields: ['Drug', 'Unit', 'Comments']
		};
/* MWB - 10/29/2013 Added spacing in comment below because it was preventing the entire colums array from being commented out
        this.columns = [
            { header: 'Drug', dataIndex: 'drug', editor : { allowBlank:false / * , xtype : 'selDrug' * / } },
            { header: 'Unit', dataIndex: 'unit', editor: { allowBlank:false }},
            { header: 'Comments', dataIndex: 'description', width: 270, editor: { allowBlank:false }, flex: 1 }
        ];
*/
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		});

		this.dockedItems = [{
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
					disabled: true,
					handler: function(){
						//addReferenceRow();
					}
				}
			]
		}];
		this.plugins = [cellEditing];
		this.callParent();
    }
});