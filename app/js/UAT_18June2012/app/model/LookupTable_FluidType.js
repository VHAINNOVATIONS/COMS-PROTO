Ext.define('COMS.model.LookupTable_FluidType', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['FluidType'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
