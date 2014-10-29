Ext.define("COMS.view.NewPlan.CTOS.FS_ToxicityGrid" ,{
	"extend" : "Ext.grid.Panel",
	"alias" : "widget.FS_ToxicityGrid",
	"id" : "FS_ToxicityGrid",
	"name" : "Toxicity Grid",
	"title" : "Toxicities",
	"margin" : "10 auto 10 auto",
	"buttonAlign" : "left",

	"store" : "ToxGridStore",

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
		{ "text" : "Grade", "dataIndex" : "Grade_Level", "flex" : 2}, 
		{ "text" : "Date", "dataIndex" : "tDate", "xtype" : "datecolumn", "format" : "m/d/Y", "flex" : 2 },
		{ "text" : "Detail", "renderer" : Ext.util.Format.htmlDecode, "dataIndex" : "Details", "flex" : 7 },
		{ "xtype" : "checkcolumn", "text" : "AE Alert", "dataIndex" : "Alert", "flex" : 1 },
	]
});

