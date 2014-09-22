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
					break;
				default:
					return false;
			}
			// return (item.getData().name.indexOf("/") < 0);
		}
	]
});