Ext.define('COMS.model.LabInfo', {
	extend: 'Ext.data.Model',
	fields: [
		'ID',			// GUID of the Lab Result
		'relDate',		// Release date of the test - should be a date type field
		'author',		// Author of this lab result
		'specimen',		// Specimen - What the specimen was (e.g. blood, stool, urine, etc) - Internally held as a GUID which links to the Speciment Type Lookup Category
		'specInfo',		// Specimen info - any additional information on the specimen - raw data/comment
		'specColDate',	// Specimen Collection Date - should be a date type field
		'ResultID',
		'name',
		'units',
		'result',
		'mdwsId',
		'acceptRange',
		'site',
		'outOfRange',
		'comment'
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.LabInfo,
		reader: {
			type: 'json',
			root: 'records'
		}
	}

});