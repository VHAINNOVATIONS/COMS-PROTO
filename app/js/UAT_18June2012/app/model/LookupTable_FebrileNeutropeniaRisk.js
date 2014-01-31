Ext.define('COMS.model.LookupTable_FebrileNeutropeniaRisk', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.FebrileNeutropeniaRisk,
		reader: {
		type: 'json',
			root : 'records'
		}
	}
});
