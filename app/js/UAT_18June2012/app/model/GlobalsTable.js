Ext.define('COMS.model.GlobalsTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'sitelist', type: 'string'},
		{ name: 'domain', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.GlobalLookupModel
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
