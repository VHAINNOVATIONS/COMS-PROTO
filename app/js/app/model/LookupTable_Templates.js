Ext.define('COMS.model.LookupTable_Templates', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'id', type: 'string'},
            { name: 'description', type: 'string'},
            { name: 'force', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.Templates,
                destroy: Ext.URLs.DeleteTemplate
        },
        reader: {
            type: 'json',
            root : 'records'
        }
    }
});
