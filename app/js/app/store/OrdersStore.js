Ext.define('COMS.store.OrdersStore', {
	extend : 'Ext.data.Store',
//	autoLoad: true,
    autoLoad: false,
	model : Ext.COMSModels.OrdersTable,
	groupField: 'adminDate'
});
