Ext.define('COMS.model.LookupTable_TemplateSources', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.TemplateSources,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
