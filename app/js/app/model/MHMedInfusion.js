// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.MHMedInfusion', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'amt', type : 'string' },	// raw data
                { name : 'unit', type : 'string' },	// raw data
                { name : 'type', type : 'string' },	// raw data
                { name : 'instruction', type : 'string' },	// raw data
                { name : 'flowRate', type : 'string' },	// raw data
                { name : 'fluidVol', type : 'string' },	// raw data
                { name : 'fluidType', type : 'string' },	// raw data                
                { name : 'infusionTime', type : 'string' }	// raw data                                
                
	],
	belongsTo : 'COMS.model.MHMed'
//    proxy: {
//        type: 'rest',
//		url : Ext.URLs.MHMed,
//        reader: {
//            type: 'json',
//			root : 'records'
//        }
//    }
});
