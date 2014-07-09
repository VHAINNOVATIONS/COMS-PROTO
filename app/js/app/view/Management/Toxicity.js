Ext.define("COMS.view.Management.Toxicity" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.Toxicity",
	"name" : "Toxicity",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "textfield", "name" : "Label", "fieldLabel" : "Toxicity Instruction", "labelWidth" : 160, "width" : 922},
		{ "xtype" : "htmleditor", "style" : "color: white", "name" : "Details", "fieldLabel" : "Documentation", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 922, "margin" : "0 0 10 0" },
		{ "xtype" : "ManagementBtns"}
	
	,

		{  
			"xtype" : "grid",  "name" : "ToxicityInstructionsList", "title" : "Toxicity Instructions", 
			"store" : "Toxicity",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Instruction", "dataIndex" : "Label", "flex" : 1}, 
				{ "text" : "Documentation", "dataIndex" : "Details", "flex" : 3 }
			]
		}

	]
});
