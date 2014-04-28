Ext.define('COMS.view.Messages.MessagesUnread' ,{
	extend : "Ext.grid.Panel",
	alias : "widget.MessagesUnread",
	name : "Messages Tab",
	title : "Unread Messages",
	width: 925,
	margin : "10",
	autoEl : { tag : "section" },

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: { stripeRows: true, height: 300, forceFit: true },
	store : {
		// autoLoad: true,
        autoLoad: false,
		fields: [ "mid", "MTo", "CC", "Subject", "Message", "Date", "MFrom", "rid", "wid", "dateSent", "OpenLink", "timeSent" ],
		proxy: {
			type: "rest",
			url : "/Messages/Filtered/RID/16",
			reader: {
				type: "json",
				root : "records"
			}
		}
	},
	
	columns : [
		{header : "Date Sent", dataIndex : "dateSent", width: 80}, 
		{header : "Time", dataIndex : "timeSent", width: 30}, 
		{header : "From", dataIndex : "MFrom"},
		{header : "Subject", dataIndex : "Subject", width: 400},
		{header : "Open Link", dataIndex : "OpenLink", width: 125, renderer : renderURI}
	],
	bbar    : [
	 {
        text    : 'Refresh',
        handler : function() {
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
    
    if(value!=null && description !=null){
        return Ext.String.format(
                '<b><a href="{0}" target="_blank">Open Message</a></b>',
                value,
                record.data.OpenLink
        );
        
    }
}
