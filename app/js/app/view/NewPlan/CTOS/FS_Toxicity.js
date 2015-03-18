Ext.define("COMS.view.NewPlan.CTOS.FS_Toxicity", {
	"extend" : "Ext.container.Container",
	"alias" : "widget.FS_Toxicity",

	"title" : "Toxicity",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 850,
	// "height" : 550,
	"closeAction" : "destroy",

	"items" : [
		{
			"xtype" : "form",
			"autoScroll" : true,
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200 },
			"items" : [
				{ 
					"xtype" : "container", 
					"name" : "ToxicityEditPanel",
					"hidden" : true,
					"anchor" : "100%",

					"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200, "margin" : "5 10" },
					"items" : [
						{ "xtype" : "RequiredInstr" },
						{ "xtype" : "container", "layout" : "hbox", "margin" : 0,
							"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200, "margin" : "5 10" },
							"items" : [ 
								{ 
									"xtype" : "combobox", 
									"name" : "ToxInstr", 
									"width" : 350,
									"store" : Ext.create('Ext.data.Store', { "fields" : ["Details", "Label", "ID", "Grade_Level"], "expandData" : true }),
									"queryMode" : "local",
									"displayField" : "Label", 
									"valueField" : "Label", 
									"fieldLabel" : "Toxicity <em>*</em>",
									"allowBlank" : false
								},
								{ "xtype" : "textfield", "anchor" : "100%", "labelWidth" : 105, "fieldLabel" : "Other Toxicity <em>*</em>", "name" : "OtherTox", "hidden": true, "allowBlank" : true }
							]
						},
						{ 
							"xtype" : "combobox", 
							"name" : "ToxLevel", 
							"width" : 350,
							"store" : Ext.create('Ext.data.Store', { fields: ["Details", "Label", "ID", "Grade_Level"], expandData: true }),
							"queryMode" : "local",
							"displayField" : "Grade_Level", 
							"valueField" : "Grade_Level", 
							"fieldLabel" : "Grade <em>*</em>",
							"allowBlank" : false
						},

						{ 
							"xtype" : "container", 
							"layout" : "fit",
							"anchor" : "100%",
							"margin" : 0,
							"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth" : 200, "margin" : "5 10" },
							"items" : [
								{ "xtype" : "textfield", "anchor" : "100%", "name" : "ToxEditLevel", "fieldLabel" : "Grade <em>*</em>", "hidden": true, "allowBlank" : true },
								{ "xtype" : "textareafield", "anchor" : "100%", "grow" : true, "height" : 90,  "name" : "ToxEditDetails", "fieldLabel" : "Details <em>*</em>", "hidden": true, "allowBlank" : true },
								{ "xtype" : "displayfield", "anchor" : "100%", "value" : "&nbsp;",  "name" : "ToxDetails", "fieldLabel" : "Details", "fieldCls" : "coms-displayfield-box x-form-display-field " },
								{ "xtype" : "textareafield", "anchor" : "100%", "grow" : true, "height" : 90,  "name" : "Data", "fieldLabel" : "Comments", "allowBlank" : true},
								{ 
									"xtype" : "checkbox", 
									"name" : "AdverseAlert", 
									"width" : 350,
									"fieldLabel" : "Adverse Event (AE) Alert",
									"allowBlank" : true
								}
							]
						},
						{ "xtype" : "hidden", "name" : "RecID", "margin" : 0 },
						{ "xtype" : "button", "text" : "Cancel", "name" : "Cancel", "width" : "125", "minWidth" : "75", style : {float: "right"} , "margin" : "0 10 0 0"},
						{ "xtype" : "button", "text" : " Save ", "name" : "Save", "minWidth" : "75", style : "float:right", "margin" : "0", "disabled" : true}
					]
				},

				{ "xtype" : "FS_ToxicityGrid", "margin" : "5 10"}
			],
			"buttons" : [
				{ "xtype" : "button", "text" : "Add", "margin" : "5 10"},
				{ "xtype" : "button", "text" : "Delete", "margin" : "5 10", "disabled" : true},
				{ "xtype" : "button", "text" : "Refresh", "margin" : "5 10"}
			]
		}
	]



});