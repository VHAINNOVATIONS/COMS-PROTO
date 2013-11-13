Ext.define('COMS.model.DiseaseStage', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['DiseaseStage'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
