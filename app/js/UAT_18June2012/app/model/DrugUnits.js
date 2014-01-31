Ext.define('COMS.model.DrugUnits', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.DrugUnits,
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});