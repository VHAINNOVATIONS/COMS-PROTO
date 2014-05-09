Ext.define('COMS.store.TotalCoursesStore', {
    extend : 'Ext.data.Store',
    model : 'COMS.model.TemplateDetailModel',
    listeners: {
        'beforeload' : function(store, options){

            var regimenVal = Ext.getCmp("regimen").getValue().split(' ').join('');

            if(regimenVal!='' && regimenVal.length > 0){
                store.proxy.url = '/coms/LookUp/getTemplateDetails/'+regimenVal+'/Total_Courses_Max';
            }else{
                store.proxy.url = '/coms/LookUp/getTemplateDetails/Total_Courses_Max';
            }

        }

    }
});