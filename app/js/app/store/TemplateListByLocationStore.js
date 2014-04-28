Ext.define('COMS.store.TemplateListByLocationStore', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.TemplateList,
	groupField: 'DiseaseName',
	proxy: {
		type: 'rest',
		url: Ext.URLs.TemplateListByLocation,
		reader: {
			type: 'json',
			root: 'records'
		}
	}

});
