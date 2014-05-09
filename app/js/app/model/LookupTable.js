Ext.define('COMS.model.LookupTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'},		// should this sometimes be "name"?
		{ name: 'description', type: 'string'},
		{ name: 'lookupid', type:'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Lookups,
			update: Ext.URLs.AddLookup,		// KD - 12/20/11 - Added new URI to PUT data back to PHP
			destroy: Ext.URLs.DeleteLookup,	// KD - 12/23/11 - New URI called when deleting item from Lookup
			create: Ext.URLs.AddLookup
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty : 'message'
		}
	}
});
