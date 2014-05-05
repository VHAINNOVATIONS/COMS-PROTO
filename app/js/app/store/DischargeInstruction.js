Ext.define('COMS.store.DischargeInstruction', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.DischargeInstruction,
	proxy: {
		type: 'rest',
		url : Ext.URLs.DischargeInstruction,
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