Ext.define('COMS.model.PatientTemplates', {
	extend: 'Ext.data.Model',
    queryMode: 'local',
	fields: [
		'id',		
                'PatientId',
                'TemplateId',
		'DateApplied',
		'DateStarted',
                'DateEnded',
                'DateEndedActual',
                'Goal',
                'ClinicalTrial',
                'PerformanceStatus',
                'WeightFormula',
                'BSAFormula',
		'Amputations',
		'msg',
		"EotsID"

	],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.PatientTemplate,
                create: Ext.URLs.AddPatientTemplate		
        },
        
        reader: {
            type: 'json',
            root : 'records',
			successProperty : 'success',
			messageProperty: 'msg'
        }
    }
});
