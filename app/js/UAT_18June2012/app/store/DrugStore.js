Ext.define('COMS.store.DrugStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels['Drugs'],
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
                if(options.params.ID!=null){
                    store.proxy.url = options.params.URL + options.params.ID;
                }
            }
        },
        
        'load': function(store, options) {
            if(store!=null){
                store.sort('name','ASC');
            }
        }
    }
});
