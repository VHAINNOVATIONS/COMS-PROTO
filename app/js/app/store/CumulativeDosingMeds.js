Ext.define('COMS.store.CumulativeDosingMeds', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.CumulativeDosingMeds,
	proxy: {
		type: 'rest',
		url : Ext.URLs.CumulativeDosingMeds,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});