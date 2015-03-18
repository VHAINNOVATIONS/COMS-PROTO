Ext.define('COMS.store.DrugUnitsStore2', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.DrugUnits,

	filters: [
		function(item) {
			switch(item.getData().name.toUpperCase()) {
				case "UNITS":
				case "MG":
				case "MG/M2":
					return true;
				default:
					return false;
			}
		}
	]
});