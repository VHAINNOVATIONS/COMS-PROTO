Ext.define("COMS.view.NewPlan.CTOS.FS_ToxicityGrid" ,{
	"extend" : "Ext.grid.Panel",
	"alias" : "widget.FS_ToxicityGrid",
	"id" : "FS_ToxicityGrid",
	"name" : "Toxicity Grid",
	"title" : "Toxicities",
	"margin" : "10 auto 10 auto",
	"buttonAlign" : "left",

	"store" : Ext.create('Ext.data.Store', { fields : ["ID", "Label", "Grade_Level", "Details", "Comments", "tDate", "Alert"] }),

	"selType" : "cellmodel",
	"forceFit" : true,
	"overflowY" : "scroll",
	"minHeight" : 150,
	"margin" : "10 0 0 0",
	"multiSelect" : true,
	"viewConfig" : { 
		"stripeRows" : true,
		"markDirty" : false 
	},
	"columns" : [ 
		{ "text" : "Toxicity", "dataIndex" : "Label", "flex" : 2}, 
		{ "text" : "Grade / Level", "dataIndex" : "Grade_Level", "flex" : 2}, 
		{ "text" : "Date", "dataIndex" : "tDate", "flex" : 1 },
		{ "text" : "Detail", "renderer" : Ext.util.Format.htmlDecode, "dataIndex" : "Details", "flex" : 6 },
		{ "xtype" : "checkcolumn", "text" : "AE Alert", "dataIndex" : "Alert", "flex" : 1 },
	]
});

