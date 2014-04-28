Ext.define('COMS.view.Management.ActiveWorkflows', {
	extend: "Ext.grid.Panel",
	alias: "widget.ActiveWorkflows",
	name: "ActiveWorkflows",
	title: "COMS Active Workflows",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 600,
		forceFit: true
	},
	store: {
		// autoLoad: true,
        autoLoad: false,
		fields: ["WorkFlowName", "Active", "Reason", "NoSteps", "Body"],
		proxy: {
			type: "rest",
			url: "/Admin/ActiveWorkflows",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Workflow Name",
			dataIndex: "WorkFlowName",
			width: 120
		},
		{
			header: "Reason",
			dataIndex: "Reason",
			width: 120
		},
		//{
		//	header: "NoSteps",
		//	dataIndex: "NoSteps",
		//	width: 120
		//},
		{
			header: "Body",
			dataIndex: "Body",
			width: 180
		},
		{
			header: "Active",
			dataIndex: "Active",
			width: 50
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});
