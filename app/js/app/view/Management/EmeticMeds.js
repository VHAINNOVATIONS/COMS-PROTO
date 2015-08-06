Ext.define("COMS.view.Management.EmeticMeds", {
	"extend": "Ext.form.Panel",
	"alias": "widget.EmeticMeds",
	"name": "EmeticMeds",
	"autoEl": {
		"tag" : "section"
	},
	"border" : false,
	"defaults": {
		"labelAlign": "right",
		"labelClsExtra": "NursingDocs-label",
		"labelWidth" : 150,
		"allowBlank" : false,
		"margin": "10 0"
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
				"labelWidth" : 150,
				"allowBlank" : false,
				"margin" : "5 5 5 0"
			},
			"items" : [{
				"xtype" : "radiogroup",
				"name" : "patientRadio",
				"fieldLabel" : "Medication Type",
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
			"fieldLabel" : "Select Drug <em>*</em>",
			"labelWidth" : 150,
			"width" : 425,
			"name" : "Drug",
			"emptyText" : "Select Drug",
			"allowBlank" : false,
			"labelAlign" : "right",

			"displayField" : "name",
			"valueField" : "IEN",
			"queryMode" : "local",
			"typeAhead" : true,
			"editable" : true,

			store : Ext.create('Ext.data.Store', {
				model : Ext.COMSModels.Drugs,
				proxy: {
					type: 'rest',
					api: {
						read: Ext.URLs.Drugs + "/InPatient"
					},
					reader: {
						type: 'json',
						root : 'records',
						successProperty : 'success'
					}
				}
			})
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
			"margin": "10 0",
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
					"flex": 1,
					"hidden": true
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