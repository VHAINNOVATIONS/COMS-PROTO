Ext.define('COMS.model.Toxicity', {
	extend: 'Ext.data.Model',
	fields: ["ID", "Label", "Grade_Level", "Details"],
	proxy: {
		type: 'rest',
		url : Ext.URLs.ToxicityInstruction,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
