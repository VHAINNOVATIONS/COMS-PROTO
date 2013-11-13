// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.CTOS_References', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'RefID', type : 'string' },	// raw data
		{ name : 'Ref', type : 'string' },	// raw data
		{ name : 'RefURI', type : 'string' }	// raw data
	],
	belongsTo : 'COMS.model.CTOS'
/**************** Proxy not needed as this data is loaded as part of the CTOS Retrieval - MWB 2 Jan 2012
	proxy: {
		type: 'rest',
		url : Ext.URLs['MHMed'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
****************/
});
