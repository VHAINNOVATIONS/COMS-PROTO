Ext.define('COMS.model.PatientCumulativeDosing', {
	extend: 'Ext.data.Model',
	fields: ["name", "LifetimeDose", "Units"],
	proxy: {
		type: 'rest',
		url : Ext.URLs.PatientCumulativeDosing,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
