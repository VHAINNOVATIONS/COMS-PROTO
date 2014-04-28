Ext.define('COMS.store.IVFluidType', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.IVFluidType,
	proxy: {
		type: 'rest',
		url : Ext.URLs.IVFluidType,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});