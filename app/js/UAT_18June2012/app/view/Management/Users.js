Ext.define('COMS.view.Management.Users', {
	extend: "Ext.grid.Panel",
	alias: "widget.Users",
	name: "Users",
	title: "COMS Users Value",
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
		autoLoad: true,
		fields: ["username", "role", "DisplayName", "Email", "cprsUsername"],
		proxy: {
			type: "rest",
			url: "/Admin/Users",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Username",
			dataIndex: "username",
			width: 120
		},
		{
			header: "Role",
			dataIndex: "role",
			width: 120
		},
		{
			header: "Display Name",
			dataIndex: "DisplayName",
			width: 120
		},
		{
			header: "Email",
			dataIndex: "Email",
			width: 120
		},
		{
			header: "CPRS Username (ACCESS CODE)",
			dataIndex: "cprsUsername",
			width: 180
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});
