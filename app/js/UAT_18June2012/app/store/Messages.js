Ext.define("COMS.store.Messages", {
	extend : "Ext.data.Store",
//	autoLoad: true,
    autoLoad: false,
	model : "COMS.model.Messages",
	groupField: 'MStatus'
});