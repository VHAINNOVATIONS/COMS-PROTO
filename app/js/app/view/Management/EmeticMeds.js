Ext.define("COMS.view.Management.EmeticMeds", {
	"extend": "Ext.form.Panel",
	"alias": "widget.EmeticMeds",
	"name": "EmeticMeds",
	"autoEl": {
		tag: "section"
	},
	"margin": 10,
	"defaults": {
		"labelAlign": "right",
		"labelClsExtra": "NursingDocs-label",
		"labelWidth" : 130,
		"allowBlank" : false,
		"margin": 10
	},
	"items": [
		{
			"xtype" : "combo",
			"name" : "EmetogenicLevel",
			"fieldLabel" : "Emotegenic Level <em>*</em>",
			"labelAlign" : "right",
			"store" : "EmetogenicLevel",
			"displayField" : "name",
			"valueField" : "description"
		},
		{
			"xtype" : "container",
			"layout" : "hbox",
			"defaults": {
				"labelAlign": "right",
				"labelClsExtra": "NursingDocs-label",
				"width" : 350,
				"labelWidth" : 130,
				"allowBlank" : false,
				"margin" : "5 5 5 0"
			},
			"items" : [{
				"xtype" : "radiogroup",
				"name" : "patientRadio",
				"fieldLabel" : "Medication Type",
				"itemId" : "patientRadios",
				"columns" : 2,
				"items" : [{
					"boxLabel" : "InPatient",
					"name" : "PatientType",
					"inputValue" : "InPatient",
					"checked" : true
				}, 
				{
					"boxLabel" : "OutPatient",
					"name" : "PatientType",
					"inputValue" : "OutPatient"
				}]
			}]
		},
		{
			"xtype" : "combo",
			"typeAhead" : true,
			"minChars" : 2,
			"fieldLabel" : "Select Drug <em>*</em>",
			"name" : "Drug",
			"store" : "DrugStore",
			"displayField" : "name",
			"valueField" : "id",
			"width" : 500
		},
		{
			"xtype": "ManagementBtns"
		},
		{
			"xtype": "grid",
			"name": "EmeticMedsList",
			"title": "Emetic Meds",
			"store": "EmeticMeds",
			"forceFit": true,
			"overflowY": "scroll",
			"margin": "10",
			"multiSelect": true,
			"viewConfig": {
				"stripeRows": true,
				"markDirty": false
			},
			"features": [Ext.create("Ext.grid.feature.Grouping")],
			"columns": [
				{
					"text": "Emetic Level",
					"dataIndex": "EmoLevelName",
					"flex": 1
				},
				{
					"text": "Medication",
					"dataIndex": "MedName",
					"flex": 2
				},
				{
					"text": "ID",
					"dataIndex": "id",
					"hidden": true
				},
				{
					"text": "Med ID",
					"dataIndex": "MedID",
					"hidden": true
				}
			]
		}
	]
});