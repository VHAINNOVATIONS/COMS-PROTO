Ext.define('COMS.store.TemplateListStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels.TemplateList,
    groupField: 'DiseaseName',
	autoLoad: true,
	proxy: {
		type: 'rest',
		url: Ext.URLs.TemplateList,
		reader: {
			type: 'json',
			root: 'records'
		}
	}

});
