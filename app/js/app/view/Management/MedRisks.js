Ext.define("COMS.view.Management.MedRisks" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.MedRisks",
	"name" : "MedRisks",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 

		{ "xtype" : "combo", "name" : "Label", "fieldLabel" : "Reference Label", "labelWidth" : 140, "width" : 500,
			    "queryMode" : "local", "displayField" : "name", "valueField" : "type",
			"store" : Ext.create("Ext.data.Store", { 
				"fields" : ["type", "name"],
				"data" : [
					{ "type" : "Neutropenia-1", "name" : "Febrile Neutropenia Risk Low (< 10%)" },
					{ "type" : "Neutropenia-2", "name" : "Febrile Neutropenia Risk Intermediate (10 - 20%)" },
					{ "type" : "Neutropenia-3", "name" : "Febrile Neutropenia Risk High (> 20%)" },
					{ "type" : "Emesis-1", "name" : "Emetogenic Level 1 (Frequency of emesis < 10%)"},
					{ "type" : "Emesis-2", "name" : "Emetogenic Level 2 (Frequency of emesis 10 - 30%)"},
					{ "type" : "Emesis-3", "name" : "Emetogenic Level 3 (Frequency of emesis 30 - 60%)"},
					{ "type" : "Emesis-4", "name" : "Emetogenic Level 4 (Frequency of emesis 60 - 90%)"},
					{ "type" : "Emesis-5", "name" : "Emetogenic Level 5 (Frequency of emesis > 90%)"}
				]
			})
		},

		{ "xtype" : "htmleditor", "name" : "Details", "fieldLabel" : "Details", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" },
		{ "xtype" : "container", "layout": "hbox", "items" : [
			{ "xtype" : "button", "text" : "Save", "scope" : this }, 
			{ "xtype" : "button", "text" : "Cancel", "scope" : this } 
		]}
		/*************/
		,

		{  
			"xtype" : "grid",  "name" : "MedRisksList", "title" : "Risk Information", 
			"store" : "MedRisks",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Label", "dataIndex" : "Label", "flex" : 1}, 
				{ "text" : "Details", "dataIndex" : "Details", "flex" : 3 }
			]
		}
		/***************/
	]
});
