Ext.define('COMS.view.Management.MedsNonRounded', {
	extend: "Ext.grid.Panel",
	alias: "widget.MedsNonRounded",
	name: "MedsNonRounded",
	title: "Medication Except from Rounding",
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
		fields: ["Lookup_ID", "Name", "NonRounding"],
		proxy: {
			type: "rest",
			url: "/Admin/MedsNonRounded",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
//		{
//			header: "Lookup ID",
//			dataIndex: "Lookup_ID",
//			width: 120
//		},
		{
			header: "Name",
			dataIndex: "Name",
			width: 120
		},
		{
			header: "Non-Rounding Applied",
			dataIndex: "NonRounding",
			width: 120
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});
