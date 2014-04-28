Ext.define('COMS.store.HydrationStore', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.Hydration,
        listeners: {
                    'load': function(store, options) {
                        if(store!=null){
                            store.sort('Sequence','ASC');
                        }
                    }
                }
        
});