Ext.define("COMS.view.Management.IntelligentDataElements" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.IntelligentDataElements",
	"name" : "IntelligentDataElements",
	"defaults": { "labelAlign": "right", "labelWidth" : 220, "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
	{ 
		"xtype" : "combo", 
		"name" : "selDataElement",
		"fieldLabel" : "Select Data Element to configure <em>*</em>",
		"width" : 400, 
		"allowBlank" : false,
		"margin" : "0 5 5 0",
		"displayField" : "value", 
		"valueField" : "id",
		"store" : Ext.create('Ext.data.Store', {
			fields: ["id", "value"],
			data : [
				{ "id" : 1, "value" : "Temperature"},
				{ "id" : 2, "value" : "Height"},
				{ "id" : 3, "value" : "Weight"},
				{ "id" : 4, "value" : "BP Diastolic"},
				{ "id" : 5, "value" : "BP Systolic"},
				{ "id" : 6, "value" : "Pulse"},
				{ "id" : 7, "value" : "Respiration"},
				{ "id" : 8, "value" : "Pain"},
				{ "id" : 9, "value" : "SP O<sub>2</sub>"}
			]
		})
	},
	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox", "labelWidth" : 220, "fieldLabel" : "Min/Max Value" },
		{ "xtype" : "textfield", "name" : "MinValue", "labelWidth" : 80, "width" : 130, "fieldLabel" : "Min" },
		{ "xtype" : "textfield", "name" : "MaxValue", "labelWidth" : 50, "width" : 100, "fieldLabel" : "Max" },
		{ "xtype" : "textfield", "name" : "VarianceMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding Min/Max" },

	]},
	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox", "labelWidth" : 220, "fieldLabel" : "% Variance from Value" },
		{ "xtype" : "textfield", "name" : "MinValue", "labelWidth" : 80, "width" : 130, "fieldLabel" : "% Variance" },
		{ "xtype" : "textfield", "name" : "MaxValue", "labelWidth" : 50, "width" : 100, "fieldLabel" : "Value" },
		{ "xtype" : "textfield", "name" : "VarianceMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding % Variance" }

	]},

	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox", "labelWidth" : 220, "fieldLabel" : "% Variance from last entry" },
		{ "xtype" : "textfield", "name" : "MinValue", "labelWidth" : 80, "width" : 130, "fieldLabel" : "% Variance" },
		{ "xtype" : "textfield", "name" : "VarianceMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding % Variance" }
		
	]}


/**
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
**/
	]
});
