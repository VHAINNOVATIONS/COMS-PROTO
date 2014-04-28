Ext.define('COMS.model.LookupTable_CycleLengthMax', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.CycleLengthMax,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
