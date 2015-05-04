Ext.define('COMS.store.DiseaseStage', {
	extend : 'Ext.data.Store',
        // autoDestroy: true,
        autoLoad: false,
        listeners: {
            'beforeload' : function(store, options){
                if(options.params.ID!=null){
                    store.proxy.url = options.params.URL + options.params.ID;
                }else{
                    store.proxy.url = options.params.URL;
                }

            }

        },
        
	model : Ext.COMSModels.DiseaseStage
});