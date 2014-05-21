Ext.define('COMS.store.DiseaseStaging', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.DiseaseStaging,
	groupField : "Disease",
	proxy: {
		type: 'rest',
		url : Ext.URLs.DiseaseStaging,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});