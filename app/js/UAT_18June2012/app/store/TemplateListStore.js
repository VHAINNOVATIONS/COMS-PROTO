Ext.define('COMS.store.TemplateListStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels.TemplateList,
    groupField: 'DiseaseName'
});
