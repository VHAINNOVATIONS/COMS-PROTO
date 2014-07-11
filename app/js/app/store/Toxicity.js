Ext.define('COMS.store.Toxicity', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.Toxicity,

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