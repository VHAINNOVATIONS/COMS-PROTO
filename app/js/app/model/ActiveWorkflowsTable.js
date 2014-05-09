Ext.define('COMS.model.ActiveWorkflowsTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'WorkFlowName', type: 'string'},
		{ name: 'Active', type: 'string'},
		{ name: 'Reason', type: 'string'},
		{ name: 'NoSteps', type: 'string'},
		{ name: 'Body', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.ActiveWorkflows
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});
