Ext.define('COMS.store.UsersStore', {
	extend : 'Ext.data.Store',
        listeners: {
            'beforeload' : function(store, options){
                
                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }                
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.Lookups;
                }
            }
            

        },
        
	model : Ext.COMSModels.UsersTable
});