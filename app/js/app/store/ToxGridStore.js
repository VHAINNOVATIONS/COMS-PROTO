Ext.define('COMS.store.ToxGridStore', {
	extend : 'Ext.data.Store',
	autoSync : true,
	model : Ext.COMSModels.ToxGridModel,
	groupField: "tDate",

	sortOnLoad: true,
	sorters: { property: 'tDate', direction : 'DESC' },

	onCreateRecords : function(records, operation, success) {
		Ext.loadAdverseEventsHistoryLaunchLoc = "onCreateRecords from ToxGridStore";
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	},

	onUpdateRecords : function(records, operation, success) {
		Ext.loadAdverseEventsHistoryLaunchLoc = "onUpdateRecords from ToxGridStore";
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	},

	onDestroyRecords : function(records, operation, success) {
		Ext.loadAdverseEventsHistoryLaunchLoc = "onDestroyRecords from ToxGridStore";
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	}
});