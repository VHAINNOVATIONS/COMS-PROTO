// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.CTOS', {
    extend: 'Ext.data.Model',
    fields: [
            'id',					// GUID for this record
			'Order_IDR',
            'Disease',
            'DiseaseStage',
            'RegimenName',			// via lookup into Lookup Table for Regimen Name Data Type
			'Description',			// raw data
            'CourseNum',
            'CourseNumMax',
            'CycleLength',			// raw data
            'CycleLengthUnit',
			"CumulativeDoseMedsInRegimen",
            'ELevel',				// via lookup into Lookup Table for ELevel Data Type (this is a 1 element array containing the following elements: id, name, details)
            'FNRisk',				// raw data
			'FNRiskDetails',
            'KeepAlive',            // Flag used to indicate that this regimen is active or not
			'References',			// Array of References data, uses the 'hasMany' object below; Added - MWB 2 Jan 2012
//		'Ref',					// raw data	Removed - MWB 2 Jan 2012
//		'RefURI',				// raw data	Removed - MWB 2 Jan 2012

            'PreMHInstructions',	// raw data
            'RegimenInstruction',
            'PostMHInstructions',	// raw data

            'PreMHMeds',		// Array of PreMHMeds data, uses the 'hasMany' object below
            'Meds',		// Array of Meds data, uses the 'hasMany' object below
            'PostMHMeds'		// Array of PostMHMeds data, uses the 'hasMany' object below

    ],
    hasMany : [
            { model : 'COMS.model.CTOS_References', name : 'References' },		// Added - MWB 2 Jan 2012
			{ model : 'COMS.model.CumulativeDoseMedsInRegimen', name : 'CumulativeDoseMedsInRegimen' },
            { model : 'COMS.model.MHMed', name : 'PreMHMeds' },
            { model : 'COMS.model.Med', name : 'Meds' },
            { model : 'COMS.model.MHMed', name : 'PostMHMeds' }
    ],
    validations : [
      { type: 'presence', name: 'Disease', message: "Cancer Type must be selected"},  
      { type: 'presence', name: 'CourseNumMax', message: "Max Courses must be entered"},
      { type: 'presence', name: 'CycleLength', message: "Cycle Length must be selected"},
      { type: 'regimenVal', name: 'Meds', message: "At least 1 Therapy Regimen must be entered"},
      { type: 'presence', name: 'ELevel', message: "Emotegenic Level must be selected"},
      { type: 'presence', name: 'CycleLengthUnit', message: "Cycle Length Unit must be selected"}
    ],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.CTOS,
                create: Ext.URLs.AddCTOS,		// KD - 1/03/11 - Added new URI to PUT data back to PHP
				update: Ext.URLs.UpdateCTOS
        },
        
        reader: {
            type: 'json',
            root : 'records',
            successProperty : 'success'
        }
    }
});
