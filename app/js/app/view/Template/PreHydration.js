Ext.define('COMS.view.Template.PreHydration' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.TemplatePreHydration',

	margin: '0 20 20 20',
    title : 'Pre Hydration',

    initComponent: function() {
        this.store = {
            fields: ['Drug', 'Unit', 'Comments']
        };

        this.columns = [
            { header: 'Drug', dataIndex: 'drug', editor : { allowBlank:false /* , xtype : 'selDrug' */ } },
            { header: 'Unit', dataIndex: 'unit', editor: { allowBlank:false }},
            { header: 'Comments', dataIndex: 'description', width: 270, editor: { allowBlank:false }, flex: 1 }
        ];

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