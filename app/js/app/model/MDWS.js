Ext.define("COMS.model.MDWs", {
	extend: "Ext.data.Model",
	fields: [ "id", "data" ],	// These fields are a placeholder till we know what data MDWs will be sending back
	proxy: {
		type: 'rest',
		url : Ext.URLs.MDWS,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
