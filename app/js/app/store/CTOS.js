Ext.define('COMS.store.CTOS', {
	extend : 'Ext.data.Store',
        autoDestroy: true,
        autoLoad: false,
        listeners: {
            'beforeload' : function(store, options){

                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }else{
                        store.proxy.api.create = Ext.URLs.AddCTOS;
                    }
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.CTOS;
                }
            }
            

        },

        model : Ext.COMSModels.CTOS
});