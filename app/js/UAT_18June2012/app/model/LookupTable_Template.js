Ext.define('COMS.model.LookupTable_Template', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['Template'],
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});
