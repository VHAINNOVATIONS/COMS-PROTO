Ext.define('COMS.store.TemplateListStore', {
    extend : 'Ext.data.Store',
//    autoLoad: true,
    autoLoad: false,
    model : Ext.COMSModels['TemplateList'],
    groupField: 'DiseaseName'
});
