Ext.define('COMS.model.LookupTable_CycleLengthStore', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs.CycleLengthStore,
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});
