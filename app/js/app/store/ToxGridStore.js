Ext.define('COMS.store.ToxGridStore', {
	extend : 'Ext.data.Store',
	autoSync : true,
	model : Ext.COMSModels.ToxGridModel,
	onCreateRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
		// debugger;
		// console.log(records);
	},

	onUpdateRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
		// console.log(records);
	},

	onDestroyRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
		// debugger;
		// console.log(records);
	}
});