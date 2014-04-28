Ext.define('COMS.view.Messages.MessagesTab', {
	extend: "Ext.grid.Panel",
	alias: "widget.MessagesTab",
	name: "Messages Tab",
	title: "My Messages",
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
		// autoLoad: true,
        autoLoad: false,
		fields: ["mid", "MTo", "CC", "Subject", "Message", "Date", "MFrom", "rid", "wid", "dateSent", "OpenLink", "timeSent", "MStatus"],
		proxy: {
			type: "rest",
			url: "/Messages/Filtered/RID/16",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},
	
	features: [ Ext.create('Ext.grid.feature.Grouping')],

	columns: [
		//{header : "mid", dataIndex : "mid", width: 25}, 
			//{header : "rid", dataIndex : "rid", width: 25}, 
			//{header : "wid", dataIndex : "wid", width: 25}, 
			//{header : "To", dataIndex : "MTo", width: 250}, 
			//{header : "CC", dataIndex : "CC"}, 
			//{header : "Date", dataIndex : "Date", width: 200}, 
		{
			header: "Date Sent",
			dataIndex: "dateSent",
			width: 80
		},
		{
			header: "Status",
			dataIndex: "MStatus",
			width: 80,
			hidden: true
		},
		{
			header: "Time",
			dataIndex: "timeSent",
			width: 30
		},
		{
			header: "To",
			dataIndex: "MTo"
		},
		{
			header: "From",
			dataIndex: "MFrom"
		},
		{
			header: "CC",
			dataIndex: "CC"
		},
		{
			header: "Subject",
			dataIndex: "Subject",
			width: 400
		},
		{
			header: "Action",
			dataIndex: "OpenLink",
			width: 60,
			renderer: renderURI
		}
		//{header : "Message", dataIndex : "Message", width: 200}
	],
	bbar: [
		{
			text: 'Refresh',
			handler: function () {
				var grid = Ext.ComponentQuery.query('MessagesTab')[0];
				var mystore = grid.getStore();
				mystore.removeAll(true);
				var myview = grid.getView();
				myview.refresh(true);
				mystore.load();
			}
		}
	]
});

function renderURI(value, p, record) {
	var description = record.data.OpenLink;
	if (null !== value && null !== description) {
		return Ext.String.format('<b><a href="{0}" target="_blank">Open</a></b>', value, record.data.OpenLink);
	}
	return ("");
}