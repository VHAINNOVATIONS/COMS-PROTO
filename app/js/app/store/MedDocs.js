Ext.define("COMS.store.MedDocs", {
	extend : "Ext.data.Store",
	model : Ext.COMSModels.MedDocs,
	proxy: {
		type: 'rest',
		url : Ext.URLs.MedDoc,
		reader: {
			type: 'json',
			root : 'records'
		}
	},
	listeners: {
		"load" : function(store, records, success) {
			if(success){
				// debugger;
				var i, aRecord, rLen = records.length;
				for (i = 0; i < rLen; i++) {
					aRecord = store.getAt(i);
					var raw = aRecord.get("Documentation");
					var dec = Ext.util.Format.htmlDecode(raw);
					aRecord.set("Documentation", dec);
				}
			}
		}
	},
});