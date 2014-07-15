Ext.define("COMS.view.Management.IntelligentDataElements" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.IntelligentDataElements",
	"name" : "IntelligentDataElements",
	"defaults": { "labelAlign": "right", "labelWidth" : 220, "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
	{ "xtype" : "box", "autoEl" : "h1", "html" : "Intelligent Data Elements Configuration" },

	{ 
		"xtype" : "combo", 
		"name" : "Vital2Check",
		"fieldLabel" : "Select Data Element to configure <em>*</em>",
		"width" : 400, 
		"allowBlank" : false,
		"margin" : "0 5 5 0",
		"displayField" : "value", 
		"valueField" : "id",
		"store" : Ext.create('Ext.data.Store', {
			fields: ["id", "value"],
			data : [
				{ "id" : "Temperature", "value" : "Temperature"},
				{ "id" : "Height", "value" : "Height"},
				{ "id" : "Weight", "value" : "Weight"},
				{ "id" : "BP_Systolic", "value" : "BP Systolic"},
				{ "id" : "BP_Diastolic", "value" : "BP Diastolic"},
				{ "id" : "Pulse", "value" : "Pulse"},
				{ "id" : "Respiration", "value" : "Respiration"},
				{ "id" : "Pain", "value" : "Pain"},
				{ "id" : "SP_O2", "value" : "SP O2"}
			]
		})
	},
	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox",  "name" : "MinMax", "labelWidth" : 220, "fieldLabel" : "Min/Max Value" },
		{ "xtype" : "textfield", "name" : "MinValue", "labelWidth" : 80, "width" : 130, "fieldLabel" : "Min" },
		{ "xtype" : "textfield", "name" : "MaxValue", "labelWidth" : 50, "width" : 100, "fieldLabel" : "Max" },
		{ "xtype" : "textfield", "name" : "MinMaxMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding Min/Max" }

	]},
	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox",  "name" : "PctVarFromValue", "labelWidth" : 220, "fieldLabel" : "% Variance from Value" },
		{ "xtype" : "textfield", "name" : "PctVarFromValuePct", "labelWidth" : 80, "width" : 130, "fieldLabel" : "% Variance" },
		{ "xtype" : "textfield", "name" : "PctVarFromValueValue", "labelWidth" : 50, "width" : 100, "fieldLabel" : "Value" },
		{ "xtype" : "textfield", "name" : "PctVarFromValueMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding % Variance" }

	]},

	{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "margin" : "0 10 10 0" }, "items" : [
		{ "xtype" : "checkbox",  "name" : "PctVarFromLast", "labelWidth" : 220, "fieldLabel" : "% Variance from last entry" },
		{ "xtype" : "textfield", "name" : "PctVarFromLastPct", "labelWidth" : 80, "width" : 130, "fieldLabel" : "% Variance" },
		{ "xtype" : "textfield", "name" : "PctVarFromLastMsg", "labelWidth" : 150, "width" : 400, "fieldLabel" : "Display if exceeding % Variance" }
		
	]},


		{ "xtype" : "ManagementBtns"},


/**
		{ "xtype" : "selDisease", "name" : "Disease", "fieldLabel" : "Disease", "labelWidth" : 140, "hiddenName" : "DiseaseID", "submitValue" : true },
		{ "xtype" : "hidden", "name" : "DiseaseID" },
		{ "xtype" : "textfield", "name" : "Stage", "fieldLabel" : "Stage", "labelWidth" : 140},
		{ "xtype" : "ManagementBtns"},
***/
		{  
			"xtype" : "grid",  "name" : "IDEntryList", "title" : "Intelligent Data Entry", 
			"store" : "IDEntry",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10",
			"multiSelect" : true,
			"columns" : [ 
				{"text" : "Vital ", "dataIndex" : "Vital2Check" }, 
				// {"text" : "Min/Max", "dataIndex" : "MinMax" }, 
				{"text" : "Min", "dataIndex" : "MinValue", "width" : 30},
				{"text" : "Max", "dataIndex" : "MaxValue", "width" : 30},
				{"text" : "Msg", "dataIndex" : "MinMaxMsg"},
				// {"text" : "% Variance", "dataIndex" : "PctVarFromValue" }, 
				{"text" : "%", "dataIndex" : "PctVarFromValuePct", "width" : 30},
				{"text" : "Value", "dataIndex" : "PctVarFromValueValue", "width" : 12},
				{"text" : "Msg", "dataIndex" : "PctVarFromValueMsg" }, 
				// {"text" : "% From Last", "dataIndex" : "PctVarFromLast" }, 
				{"text" : "%", "dataIndex" : "PctVarFromLastPct", "width" : 12},
				{"text" : "Msg", "dataIndex" : "PctVarFromLastMsg" }
			]
		}

	]
});
