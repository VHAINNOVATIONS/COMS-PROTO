Ext.define('COMS.model.DeliveryMechanism', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'type',
		'description'
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.DelivMech, 
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});