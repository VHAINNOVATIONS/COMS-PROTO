Ext.define('COMS.store.ClinicInfo', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.ClinicInfo,
	proxy: {
		type: 'rest',
		url : Ext.URLs.ClinicInfo,
		reader: {
			type: 'json',
			root : 'records'
		}
	},
	listeners: {
		"load" : function(store, records, success) {
			if(success){
				var i, aRecord, rLen = records.length;
				for (i = 0; i < rLen; i++) {
					aRecord = store.getAt(i);
					var raw = aRecord.get("Details");
					var dec = Ext.util.Format.htmlDecode(raw);
					aRecord.set("Details", dec);
				}
			}
		}
	}
});