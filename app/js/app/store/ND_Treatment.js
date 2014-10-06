Ext.define('COMS.store.ND_Treatment', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.ND_Treatment,
	groupField : "typeOrder",
	listeners: {
		beforeload : function(theStore, operation, opts) {
			//debugger;
		},
		load : function(theStore, records, state, opts) {
			//debugger;
		}
	}
});