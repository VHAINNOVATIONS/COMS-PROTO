Ext.define("COMS.view.Management.CheckCombo" ,{
	extend: "Ext.ux.CheckCombo",
	alias: "widget.CheckCombo",
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
});