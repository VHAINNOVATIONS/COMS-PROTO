Ext.define('COMS.store.OrdersStore', {
	extend : 'Ext.data.Store',
	autoLoad: false,
	model : Ext.COMSModels.OrdersTable,
	groupField: 'Last_Name'
});
