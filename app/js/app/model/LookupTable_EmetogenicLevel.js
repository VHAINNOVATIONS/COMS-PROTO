Ext.define('COMS.model.LookupTable_EmetogenicLevel', {
	extend: 'Ext.data.Model',
	fields: [ "id", "name", "description" ],
	proxy: {
		type: 'rest',
		url : Ext.URLs.EmetogenicLevel,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
