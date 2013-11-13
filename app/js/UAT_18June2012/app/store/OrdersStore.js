Ext.define('COMS.store.OrdersStore', {
	extend : 'Ext.data.Store',
	autoLoad: true,
	model : Ext.COMSModels.OrdersTable,
	groupField: 'adminDate'
});
