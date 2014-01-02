Ext.define('COMS.model.TemplateList', {
	extend: 'Ext.data.Model',
	fields: [
		'name',
		'id',
		'regimenId',
		'description',
		'DiseaseName'
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.TemplateList,
		reader: {
			type: 'json',
			root: 'records'
		}
	}

});