Ext.define('COMS.model.LookupTable_TotalCoursesMax', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['TotalCoursesMax'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
