Ext.define("COMS.view.Management.MedicationDocumentation" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.MedicationDocumentation",
	"name" : "MedicationDocumentation",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ 
			"xtype" : "combobox", "name" : "InPatient_Medication", "fieldLabel" : "Select InPatient Medication",  "labelWidth" : 200,  "labelAlign" : "right", "width" : 550, 
			"displayField" : "name", "valueField" : "id", "allowBlank" : false,
			"store" : Ext.create('Ext.data.Store', {
				"model" : 'COMS.model.GenericLookupModel',
				"proxy" : {
					"type" : 'rest',
					"api" : {
						"read" : Ext.URLs.Drugs + "/InPatient"
					},
					"reader" : {
						"type" : 'json',
						"root" : 'records',
						"successProperty" : 'success'
					}
				}
			})
		},
		{ "xtype" : "htmleditor", "name" : "Documentation", "fieldLabel" : "Documentation", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" },
		{ "xtype" : "ManagementBtns"},

		{  
			"xtype" : "grid",  "name" : "DocumentedInPatientMedsList", "title" : "Documented Medications", 
			"store" : "MedDocs",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Medication", "dataIndex" : "MedName", "flex" : 1}, 
				{ "text" : "Documentation", "dataIndex" : "Documentation", "flex" : 3 }
			]
		}
	]
});
