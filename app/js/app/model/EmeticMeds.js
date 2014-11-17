Ext.define('COMS.model.EmeticMeds', {
	extend: 'Ext.data.Model',
	fields: [ "id", "EmoLevel", "EmoLevelName", "MedID", "MedName", "MedType" ],
	proxy: {
		type: 'rest',
		url : Ext.URLs.EmeticMeds,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
