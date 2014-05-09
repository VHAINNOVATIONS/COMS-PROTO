Ext.define('COMS.model.LUReferences', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.References,
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});
