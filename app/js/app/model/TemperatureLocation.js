Ext.define('COMS.model.TemperatureLocation', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'type',
		'description'
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.TempLoc, 
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});