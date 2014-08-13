Ext.define('COMS.model.LookupTable', {
	extend: 'Ext.data.Model',
	fields: [ "id", "value", "description", "lookupid" ],
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
