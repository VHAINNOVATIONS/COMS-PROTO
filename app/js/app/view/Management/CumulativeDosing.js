Ext.define("COMS.view.Management.CumulativeDosing" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.CumulativeDosing",
	"name" : "CumulativeDosing",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		// { "xtype" : "hiddenfield", "name" : "id", "value" : "60" },					/* This represents the Lookup_Type_ID in the Lookup Table */
		// { "xtype" : "hiddenfield", "name" : "description" },					/* This field will hold the Max Dosage and Units as a combined object in the lookup table */
		{ 
			"xtype" : "combobox", "name" : "MedName", "fieldLabel" : "Medication",  "labelWidth" : 200,  "labelAlign" : "right", "width" : 922, 
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
		{ "xtype" : "container", "layout" : "hbox", "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" }, "items" : [
			{ "xtype" : "textfield", "name" : "CumulativeDoseAmt", "emptyText" : "Enter Lifetime Max Allowable", "fieldLabel" : "Max Dosage", "labelWidth" : 200,  "labelAlign" : "right", "width" : 400 },
			{
				"xtype" : "combo",
				"fieldLabel" : "Units <em>*</em>",
				"width" : 150,
				"labelWidth" : 60,
				
				"store" : "DrugUnitsStore2",
				"displayField" : "name",
				"valueField" : "id",
				"allowBlank" : false,
				"name" : "CumulativeDoseUnits"
			}
		]},
		{ "xtype" : "ManagementBtns"},

		{  
			"xtype" : "grid",  "name" : "Medications2TrackList", "title" : "Cumulative Dose Medications List", 
			"store" : "CumulativeDosingMeds",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Medication", "dataIndex" : "MedName", "flex" : 3},
				{ "text" : "Max Dose", "dataIndex" : "CumulativeDoseAmt", "flex" : 1},
				{ "text" : "Units", "dataIndex" : "CumulativeDoseUnits", "flex" : 1}
			/*
				{ "text" : "Units", "dataIndex" : "UnitsID", "flex" : 1},
				{ "text" : "Units", "dataIndex" : "ID", "flex" : 1},
				{ "text" : "Units", "dataIndex" : "MedID", "flex" : 1}
			*/
			]
		}

	]
});
