Ext.define("COMS.view.Management.Toxicity" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.Toxicity",
	"name" : "Toxicity",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "textfield", "allowBlank": false, "name" : "Label", "fieldLabel" : "Toxicity <em>*</em>", "labelWidth" : 160, "width" : 922},
		{ "xtype" : "textfield", "allowBlank": false, "name" : "Grade_Level", "fieldLabel" : "Grade <em>*</em>", "labelWidth" : 160, "width" : 922},
		{ "xtype" : "htmleditor", "allowBlank": false, "style" : "color: white", "name" : "Details", "fieldLabel" : "Documentation <em>*</em>", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 922, "margin" : "0 0 10 0" },
		{ "xtype" : "ManagementBtns"},
		{  
			"xtype" : "grid",  "name" : "ToxicityInstructionsList", "title" : "Toxicity", 
			"store" : "Toxicity",
			
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",
			"multiSelect" : true,
			"viewConfig" : { 
				"stripeRows" : true,
				"markDirty" : false 
			},
			"features" : [ Ext.create("Ext.grid.feature.Grouping")],
			"columns" : [ 
				{ "text" : "Toxicity", "dataIndex" : "Label", "flex" : 1}, 
				{ "text" : "Grade", "dataIndex" : "Grade_Level", "flex" : 1}, 
				{ "text" : "Detail", "renderer" : Ext.util.Format.htmlDecode, "dataIndex" : "Details", "flex" : 3 }
			]
		}
	]
});
