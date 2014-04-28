// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.MHMed', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'mhid', type : 'string' },	// raw data
		{ name : 'templateid', type : 'string' },	// raw data            
		{ name : 'drugid', type : 'string' },	// raw data
                { name : 'preorpost', type : 'string' },	// raw data
                { name : 'description', type : 'string' },	// raw data
                { name : 'infusions' },	// raw data
                { name : 'adminDay', type: 'string'},
                { name : 'sequence', type: 'string'},
                { name : 'adminTime', type: 'string'}
	],
	hasMany : { model : 'COMS.model.MHMedInfusion', name : 'infusions' },		// Added - KD 2 Jan 2012
	belongsTo : 'COMS.model.CTOS'
      
//    proxy: {
//        type: 'rest',
//		url : Ext.URLs.MHMed,
//        reader: {
//            type: 'json',
//			root : 'records'
//        }
//    }
});
