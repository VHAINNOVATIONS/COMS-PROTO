Ext.define('COMS.view.Authoring.References' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.TemplateReferences',
	margin: '0 20 20 20',
	title : 'References',
	store: 'ReferencesStore',
	viewConfig: { stripeRows: true },
	plugins: [ Ext.create("Ext.grid.plugin.CellEditing", { clicksToEdit: 1 }) ],

	columns : [
			{header: 'Reference',  dataIndex: 'Reference',  flex: 1},
			{header: 'Reference Link', dataIndex: 'ReferenceLink', flex: 1, renderer : renderURI}
	],
	buttons: [
		{ text: 'Add Reference', title: 'AddReference' },
		{ text: 'Remove Reference', title: 'RemoveReference', disabled: true },
		{ text: 'Edit Reference', title: 'EditReference', disabled: true}
	],
	buttonAlign: 'left'
//	initComponent: function() {
//		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
//		this.plugins = [cellEditing];
//		this.callParent(arguments);
//	}
});


function renderURI(value, p, record) {
	var description = record.data.ReferenceLink;
	var tmp;
	if(null !== value && null !== description){
		tmp = Ext.String.format('<b><a href="{0}">{0}</a></b>', value, record.data.ReferenceLink );
		return tmp;
	}
}
