Ext.define("COMS.view.Management.CumulativeDosing" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.CumulativeDosing",
	"name" : "CumulativeDosing",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "hiddenfield", "name" : "id", "value" : "60" },					/* This represents the Lookup_Type_ID in the Lookup Table */
//		{ "xtype" : "hiddenfield", "name" : "description", "value" : "" },	
		{ 
			"xtype" : "combobox", "name" : "value", "fieldLabel" : "Medication",  "labelWidth" : 200,  "labelAlign" : "right", "width" : 922, 
			"displayField" : "name", "valueField" : "id", "allowBlank" : false,
			"store" : Ext.create('Ext.data.Store', {
				"model" : 'COMS.model.GenericLookupModel',
				"proxy" : {
					"type" : 'rest',
					"api" : {
						"read" : Ext.URLs.Drugs
					},
					"reader" : {
						"type" : 'json',
						"root" : 'records',
						"successProperty" : 'success'
					}
				}
			})
		},
		{ "xtype" : "ManagementBtns"},

		{  
			"xtype" : "grid",  "name" : "Medications2TrackList", "title" : "Cumulative Dose Medications List", 
			"store" : "CumulativeDosingMeds",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Medication", "dataIndex" : "name", "flex" : 1}
			]
		}

	]
});
