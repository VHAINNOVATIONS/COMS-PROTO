Ext.define('COMS.view.Management.Globals', {
	extend: "Ext.grid.Panel",
	alias: "widget.Globals",
	name: "Globals",
	title: "COMS Global Value",
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
		height: 300,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["sitelist", "domain"],
		proxy: {
			type: "rest",
			url: "/Admin/Globals",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Site Code",
			dataIndex: "sitelist",
			width: 120
		},
		{
			header: "Domain",
			dataIndex: "domain",
			width: 120
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});
