Ext.define('COMS.model.OrdersTable', {
	extend: 'Ext.data.Model',
	fields: [
	
		{ name : 'patientID', type: 'string'},
		{ name : 'templateID', type: 'string'},
		{ name : 'adminDay', type: 'string'},
	{ name : "CourseNum", type : "string" },		// MWB - 6/17/2012 - This is really the "Cycle"
		{ name : 'adminDate', type: 'string'},
		{ name : 'drug', type: 'string'},
		{ name : 'type', type: 'string'},
		{ name : 'dose', type: 'string'},
		{ name : 'unit', type: 'string'},
		{ name : 'route', type: 'string'},
		{ name : 'fluidVol', type: 'string'},
		{ name : 'flowRate', type: 'string'},
		{ name : 'instructions', type: 'string'},
		{ name : 'orderstatus', type: 'string'},
		{ name : 'orderid', type: 'string'},
		{ name : 'Last_Name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Orders,
			update: Ext.URLs.Orders,
                        create: Ext.URLs.Orders
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
