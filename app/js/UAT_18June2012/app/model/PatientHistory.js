/* Note: This model may have to be refactored once we identify what type of info is held in the Radiation History */
Ext.define('COMS.model.PatientHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'DiseaseType', type : 'string' },
		{ name : 'DiseaseCat', type : 'string' },
		{ name : 'PerfStat', type : 'string' },
		{ name : 'TreatIndic', type : 'string' },
		{ name : 'Protocol', type : 'string' },
		{ name : 'Chemo', type : 'string' },		// Whether patient had any previous Chemo History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
		{ name : 'Radiation', type : 'string' }		// Whether patient had any previous Radiation History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['PatientHistory'],
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});
