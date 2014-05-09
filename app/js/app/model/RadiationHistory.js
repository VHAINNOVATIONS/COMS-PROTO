/* Note: This model may have to be refactored once we identify what type of info is held in the Radiation History */
Ext.define('COMS.model.RadiationHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'results', type : 'string' }		// Whether patient had any previous Radiation History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.RadiationHistory,
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});
