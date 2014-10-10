Ext.define('COMS.store.Toxicity', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.Toxicity,
	groupField : "Label"
});