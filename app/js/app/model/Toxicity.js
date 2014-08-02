Ext.define('COMS.model.Toxicity', {
	extend: 'Ext.data.Model',
	fields: ["ID", "Label", "Details"],
	proxy: {
		type: 'rest',
		url : Ext.URLs.ToxicityInstruction,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
