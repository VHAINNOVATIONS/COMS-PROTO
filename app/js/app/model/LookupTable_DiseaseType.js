Ext.define('COMS.model.LookupTable_DiseaseType', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.DiseaseType,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
