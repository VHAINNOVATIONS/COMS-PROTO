Ext.define('COMS.model.DiseaseStage', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'ID', type: 'string'},
		{ name: 'Stage', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.DiseaseStage,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
