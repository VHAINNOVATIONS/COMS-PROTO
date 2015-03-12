Ext.define('COMS.model.OrdersTable', {
	extend: 'Ext.data.Model',
	fields: [ 'patientID', 'dfn', 'templateID', 'adminDay', "CourseNum", 'adminDate', 'drug', 'type', 'dose', 'unit', 'route', 'fluidVol', 'fluidType', 'flowRate', 'instructions', 'orderstatus', 'ActualOrderStatus', 'orderid', 'Last_Name' ],
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
