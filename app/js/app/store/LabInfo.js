Ext.define("COMS.store.LabInfo", {
	extend : "Ext.data.Store",
	model : "COMS.model.LabInfo",
	groupField : "specimen"
});