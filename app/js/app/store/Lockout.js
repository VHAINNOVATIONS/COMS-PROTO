Ext.define('COMS.store.Lockout', {
	extend : 'Ext.data.Store',
	fields:["id", "Patient_ID", "Section", "UserName", "dtLocked", "dtUnLocked", "Patient_DFN"],
	proxy: {
		type: 'rest',
		url : "/Patient/Lock",
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});
