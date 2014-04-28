Ext.define('COMS.store.DiseaseType', {
    extend : 'Ext.data.Store',
    /*
     * KD - 5/9/12 - This listener was added because there are several ways the DiseaseType store can be accessed
     * 1) Retrieve Cancer Types based on the Template Source selected
     * 2) Retrieve a specific Cancer type based on id
     * 3) Retrieve ALL Cancer Types
     * 
     * If no options are provided the default is to retrieve all Cancer types.
     */
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
              if(options.params.ID!=null){
                  store.proxy.url = options.params.URL + options.params.ID;
              }
            }
        }
        
    },

    model : Ext.COMSModels.DiseaseType
});
