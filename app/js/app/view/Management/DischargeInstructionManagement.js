Ext.define("COMS.view.Management.DischargeInstructionManagement" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.DischargeInstructionManagement",
	"name" : "DischargeInstructionManagement",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "textfield", "name" : "Label", "fieldLabel" : "Discharge Instruction", "labelWidth" : 140, "width" : 940},
		{ "xtype" : "htmleditor", "name" : "Details", "fieldLabel" : "Documentation", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" },

		{ "xtype" : "ManagementBtns"},


		{  
			"xtype" : "grid",  "name" : "DischargeInstructionsList", "title" : "Discharge Instructions", 
			"store" : "DischargeInstruction",
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
