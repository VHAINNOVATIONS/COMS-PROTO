Ext.define("COMS.view.Management.DiseaseStaging" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.DiseaseStaging",
	"name" : "DiseaseStaging",
	"autoEl" : { "tag" : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "selDisease", "name" : "Disease", "fieldLabel" : "Disease", "labelWidth" : 140, "hiddenName" : "DiseaseID", "submitValue" : true },
		{ "xtype" : "hidden", "name" : "DiseaseID" },
		{ "xtype" : "textfield", "name" : "Stage", "fieldLabel" : "Stage", "labelWidth" : 140},
		{ "xtype" : "ManagementBtns"},
		{  
			"xtype" : "grid",  "name" : "DiseaseStagingList", "title" : "Disease Stages", 
			"store" : "DiseaseStaging",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10",
			"multiSelect" : true,
			"features" : [ Ext.create("Ext.grid.feature.Grouping")],
			"columns" : [ 
				{ "text" : "Staging Designation", "dataIndex" : "Stage", "flex" : 3 }
			]
		}
	]
});
