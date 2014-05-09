Ext.define('COMS.model.GlobalLookupModel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'sitelist', type: 'string'},
		{ name: 'domain', type: 'string'}			
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Lookups
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
