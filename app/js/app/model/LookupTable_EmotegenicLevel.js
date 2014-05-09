Ext.define('COMS.model.LookupTable_EmotegenicLevel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.EmotegenicLevel,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
