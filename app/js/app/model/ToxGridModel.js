Ext.define('COMS.model.ToxGridModel', {
	extend: 'Ext.data.Model',
	fields: ["id", "Label", "OtherTox", "Grade_Level", "Details", "Comments", {name: 'tDate', type: 'date', dateFormat:'m/d/Y'}, "Alert"],
	proxy: {
		type: 'rest',
		url : Ext.URLs.ToxGrid,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
