Ext.define('COMS.store.DrugUnitsStore2', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.DrugUnits,
	filters: [
		function(item) {
			return (item.getData().name.indexOf("/") < 0);
		}
	]
});