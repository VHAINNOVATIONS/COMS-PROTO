Ext.define('COMS.store.ReasonStore', {
    extend : 'Ext.data.Store',
    autoLoad: true,          // KD 03/27/12 - When autoload is commented out then none of the Performance Status are available when Applying Template
    model : Ext.COMSModels.LookupTable,
    proxy: {
        type: 'ajax',
        url: Ext.URLs.Reasons,
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});