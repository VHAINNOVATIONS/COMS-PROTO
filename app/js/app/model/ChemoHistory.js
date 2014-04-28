/* Note: This model may have to be refactored once we identify what type of info is held in the Chemo History */
Ext.define('COMS.model.ChemoHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'results', type : 'string' }		// Whether patient had any previous Chemo History - blank or Internally held as a GUID which links to the ChemoHistoryInfo Table
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs.ChemoHistory,
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
