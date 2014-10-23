Ext.define("COMS.view.NewPlan.CTOS.FS_Toxicity", {
	"extend" : "Ext.container.Container",
	"alias" : "widget.FS_Toxicity",

	"title" : "Toxicity",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 850,
	"height" : 450,
	"closeAction" : "destroy",

	"items" : [
		{
			"xtype" : "form",
			"margin" : "10",
			"autoScroll" : true,
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200 },
			"items" : [
				{ 
					"xtype" : "container", 
					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200 },
					"items" : [
						{ "xtype" : "RequiredInstr" },
						{ 
							"xtype" : "combobox", 
							"margin" : "10", 
							"name" : "ToxInstr", 
							"store" : Ext.create('Ext.data.Store', { fields: ["Details", "Label", "ID", "Grade_Level"], expandData: true }),
							"queryMode" : "local",

							"displayField" : "Label", 
							"valueField" : "Label", 
							"fieldLabel" : "Toxicity <em>*</em>",
							"allowBlank" : false
						},
						{ 
							"xtype" : "combobox", 
							"margin" : "10", 
							"name" : "ToxLevel", 
							"width" : 450,
							"store" : Ext.create('Ext.data.Store', { fields: ["Details", "Label", "ID", "Grade_Level"], expandData: true }),
							"queryMode" : "local",
							"displayField" : "Grade_Level", 
							"valueField" : "Grade_Level", 
							"fieldLabel" : "Grade / Level <em>*</em>",
							"allowBlank" : false
						},

						{ "xtype" : "textfield", "margin" : "10", "name" : "ToxEditLevel", "width" : 350, "fieldLabel" : "Grade / Level <em>*</em>", "hidden": true, "allowBlank" : true },
						{ "xtype" : "textareafield", "grow" : true, "width" : 800, "height" : 90, "margin" : "10", "name" : "ToxEditDetails", "fieldLabel" : "Details <em>*</em>", "hidden": true, "allowBlank" : true },

						{ "xtype" : "displayfield", "width" : 800, "value" : "&nbsp;", "margin" : "10", "name" : "ToxDetails", "fieldLabel" : "Details", "fieldCls" : "coms-displayfield-box x-form-display-field " },
						{ "xtype" : "textareafield", "grow" : true, "width" : 800, "height" : 90, "margin" : "10", "name" : "Data", "fieldLabel" : "Comments", "allowBlank" : true},
						{ 
							"xtype" : "checkbox", 
							"margin" : "10", 
							"name" : "AdverseAlert", 
							"width" : 350,
							"fieldLabel" : "Adverse Event (AE) Alert",
							"allowBlank" : true
						},
						{ "xtype" : "hidden", "name" : "RecID" },

						{ "xtype" : "button", "text" : "Cancel", "name" : "Cancel", "minWidth" : "75", style : {float: "right"} , "margin" : "0 10 0 0"},
						{ "xtype" : "button", "text" : " Save ", "name" : "Save", "minWidth" : "75", style : "float:right", "margin" : "0", "disabled" : true}
					],
				},

				{ "xtype" : "FS_ToxicityGrid", "margin" : 10}
			],
			"buttons" : [
				{ "xtype" : "button", "text" : "Delete", "margin" : "10 0", "disabled" : true}
			]
		}
	]



});