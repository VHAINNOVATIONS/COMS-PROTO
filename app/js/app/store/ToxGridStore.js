Ext.define('COMS.store.ToxGridStore', {
	extend : 'Ext.data.Store',
	autoSync : true,
	model : Ext.COMSModels.ToxGridModel,
	groupField: "tDate",
	// sortInfo: { field: "tDate", direction: "DESC" },

	sortOnLoad: true,
	sorters: { property: 'tDate', direction : 'DESC' },
/***
	listeners : {
		load: {
			fn: function(theStore, records, successful, eOpts) {
				Ext.getCmp("FS_ToxicityGrid").getView().getFeature("FS_ToxGridSummary").collapseAllButTop();
			},
			scope : this
		}
	},
***/
	onCreateRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	},

	onUpdateRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	},

	onDestroyRecords: function(records, operation, success) {
		COMS.Application.fireEvent("loadAdverseEventsHistory");
	}
});