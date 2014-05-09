Ext.define('COMS.model.LookupTable_TimeFrameUnit', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.TimeFrameUnit,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
