Ext.define('COMS.model.Allergies', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'type',
		'comment'		// Comment - raw data/comment
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.Allergies, 
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});