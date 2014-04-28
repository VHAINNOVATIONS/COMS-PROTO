Ext.define('COMS.model.UsersTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'username', type: 'string'},
		{ name: 'role', type: 'string'},
		{ name: 'DisplayName', type: 'string'},
		{ name: 'Email', type: 'string'},
		{ name: 'cprsUsername', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.UsersLookupModel
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
