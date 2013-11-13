Ext.define("COMS.store.Messages", {
	extend : "Ext.data.Store",
	autoLoad: true,
	model : "COMS.model.Messages",
	groupField: 'MStatus'
});