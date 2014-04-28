Ext.define('COMS.model.MedsNonRoundedTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'Lookup_ID', type: 'string'},
		{ name: 'Name', type: 'string'},
		{ name: 'NonRounding', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.MedsNonRounded
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
