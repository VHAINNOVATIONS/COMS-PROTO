Ext.define('COMS.model.Drugs', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['Drugs'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});
