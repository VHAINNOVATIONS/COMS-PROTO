Ext.define('COMS.store.FebrileNeutropeniaRisk', {
    extend : 'Ext.data.Store',
	model : Ext.COMSModels['FebrileNeutropeniaRisk'],
	data : [
		{ id : '1', value : 'Low' },
		{ id : '2', value : 'Medium' },
		{ id : '3', value : 'Moderate' },
		{ id : '4', value : 'High' }
	]
});