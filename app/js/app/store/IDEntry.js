Ext.define('COMS.store.IDEntry', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.IDEntry,
	proxy: {
		type: 'rest',
		url : Ext.URLs.IntelligentDataEntry,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});