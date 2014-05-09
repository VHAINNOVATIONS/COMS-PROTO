Ext.define('COMS.model.Infusion', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.Infusion,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
