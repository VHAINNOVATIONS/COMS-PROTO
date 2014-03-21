Ext.define('COMS.store.Templates', {
    extend : 'Ext.data.Store',
    autoLoad: false,
    model : Ext.COMSModels.Templates,

    autoDestroy: true,
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
              if(options.params.ID!=null){
                  store.proxy.api.read = options.params.URL + options.params.ID;
              }else{
                  store.proxy.api.read = options.params.URL;
              }
            }
            
        }
        
    }
});