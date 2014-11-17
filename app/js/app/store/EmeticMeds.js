Ext.define('COMS.store.EmeticMeds', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.EmeticMeds,
	groupField: 'EmoLevelName',
	autoLoad: true	/* Load this store on start up so we have a local copy when we need to find the emetogenic level of a medication */
});