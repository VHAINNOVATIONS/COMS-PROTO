Ext.define('COMS.model.AppliedTemplateInfo', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'PatientID',
        'TemplateID',
        'DateApplied',
        'DateStarted',
        'DateEnded',
        'DateEndedActual',
        'TemplateName',
        'TemplateDescription',
        "EotsID"
    ]
});

Ext.define('COMS.model.AllTemplatesApplied2Patient', {
    extend: 'Ext.data.Model',
    fields : [
        "current",
        "historical"
    ],
	hasMany : [
		{ model : "COMS.model.AppliedTemplateInfo", name : "current" },
		{ model : "COMS.model.AppliedTemplateInfo", name : "historical" }
    ],
    proxy: {
        type: 'rest',
        url : Ext.URLs.PatientTemplates,
        reader: {
            type: 'json',
            root : 'records',
            successProperty : 'success',
            messageProperty: 'msg'
        }
    }
});
