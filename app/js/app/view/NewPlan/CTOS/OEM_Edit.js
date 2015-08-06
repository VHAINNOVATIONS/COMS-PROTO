Ext.define("COMS.view.NewPlan.CTOS.FluidVol" ,{
	"extend" : "Ext.form.field.Text",
	"alias" : "widget.FluidVol",
	"fieldLabel": "Fluid Volume <em class=\"required-field\">*</em>",
	"maskRe" : /[0-9\.]/,
	"labelWidth": 95,
	"width": 210,
	"allowBlank": false
});

Ext.define("COMS.view.NewPlan.CTOS.FlowRate" ,{
	"extend" : "Ext.form.field.Text",
	"alias" : "widget.FlowRate",
	"fieldLabel" : "Flow Rate",
	"width" : 140,
	"labelWidth" : 70
});

Ext.define("COMS.view.NewPlan.CTOS.AdminDay" ,{
	"extend" : "Ext.form.field.Text",
	"alias" : "widget.AdminDay",
	"fieldLabel": "Administration Day(s) <em class=\"required-field\">*</em>",
	"maskRe" : /^[-,0-9 ]+$/,
	"width": 250,
	"labelWidth": 140,
	"allowBlank": false
});

Ext.define("COMS.view.NewPlan.CTOS.DossageAmt" ,{
	"extend" : "Ext.form.field.Text",
	"alias" : "widget.DossageAmt",
	"maskRe" : /[0-9\.]/,
	"fieldLabel" : "Dosage Amount <em class=\"required-field\">*</em>",
	"width" : 200,
	"labelWidth" : 130
});

Ext.define("COMS.view.NewPlan.CTOS.AdminTime" ,{
	"extend" : "Ext.form.field.Time",
	"alias" : "widget.AdminTime",
	"fieldLabel": "Administration Time",
	"width": 290,
	"labelWidth": 130
});


Ext.define("COMS.view.NewPlan.CTOS.SelectFluidType" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.SelectFluidType",
	"fieldLabel": "Select Fluid Type <em class=\"required-field\">*</em>",
	"labelWidth": 115,
	"width": 200,
	"store" : "FluidType",
	"displayField": "name",
	"valueField": "id"
});


Ext.define("COMS.view.NewPlan.CTOS.SelectDrug" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.SelectDrug",
	"fieldLabel": "Select Drug <em>*</em>",
	"labelWidth": 115,
	"width": 425,
	"store": "DrugStore",
	"allowBlank": false,
	"displayField": "name",
	"valueField": "id",		// "valueField" : "IEN",
	"queryMode" : "local",
	"typeAhead" : true
});

Ext.define("COMS.view.NewPlan.CTOS.DrugUnits" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.DrugUnits",
	"fieldLabel": "Units <em class=\"required-field\">*</em>",
	"labelWidth": 95,
	"width": 210,
	"store": "DrugUnitsStore",
	"displayField" : "name",
	"valueField" : "name"
});

Ext.define("COMS.view.NewPlan.CTOS.InfusionMethod" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.InfusionMethod",
	"fieldLabel": "Route <em class=\"required-field\">*</em>",
	"width": 240,
	"labelWidth": 70,
	"store": "InfusionStore",
	"displayField": "name",
	"valueField": "name"
});

Ext.define("COMS.view.NewPlan.CTOS.SelectReason" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.SelectReason",
	"fieldLabel" : "Select Reason <em class=\"required-field\">*</em>",
	"labelWidth" : 115,
	"width" : 400,
	"store" : "ReasonStore",
	"allowBlank" : false,
	"displayField" : "value",
	"valueField" : "id"
});



Ext.define("COMS.view.NewPlan.CTOS.OEM_Edit" ,{
	"extend" : "Ext.window.Window",
	"alias" : "widget.EditOEMRecord",
	"title" : "Edit Drug Record",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 900,
	"modal" : true,
	"items" : [
		{
			"xtype": "form",
			"items": [
				{"xtype": "RequiredInstr"},

				{
					"xtype": "container",
					"defaults" : {
						"labelAlign" : "right",
						"margin" : "0"
					},
					"items": [
						// Row 1 - Drug
						{
							"xtype" : "container",
							"layout" : "hbox",
							"defaults" : {
								"labelAlign" : "right",
								"margin" : "0 0 5 0"
							},
							"items" : [
								{ "xtype" : "container",  "width" : 20, "html": "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>" },
								{ "xtype" : "SelectDrug", "name": "Med", "colspan" : 2, "margin" : "2 2 2 2" },
								{ "xtype" : "SelectReason", "name" : "Reason", "colspan" : 2, "margin" : "2"}
							]
						},

						// Row 2 - Dosing
						{
							"xtype" : "container",
							"layout" : "hbox",
							"defaults" : {
								"labelAlign" : "right",
								"margin" : "0 0 5 0"
							},
							"items" : [
								{ "xtype" : "container", "width" : 20, "html": "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>" },
								{ "xtype" : "DossageAmt", "name" : "Dose", "margin" : "2 2 2 2" },
								{ "xtype" : "DrugUnits", "name" : "Units", "margin" : "2 2 2 2" },
								{ "xtype" : "InfusionMethod", "name" : "InfusionMethod", "colspan" : 2, "margin" : "2 2 2 2" }
							]
						},

						// Row 3 - Fliud Info - "FluidInfoSpacer", "FluidType", "FluidInfoVol", "FluidInfoRate", "InfusionTime"
						{
							"xtype" : "container",
							"layout" : "hbox",
							"name" : "fluidInfo",
							"hidden" : true,
							"defaults" : {
								"labelAlign" : "right",
								"margin" : "0 0 5 0"
							},
							"items" : [
								{ "xtype" : "container",  "width" : 30, "html" : "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>", "name" : "FluidInfoSpacer" },
								{ "xtype" : "SelectFluidType", "name" : "FluidType", "margin" : "2 2 2 2" },
								{ "xtype" : "container", "layout" : "hbox", "width" : 270, "margin" : "2 0 0 0", "defaults": { "labelAlign" : "right" }, "items" : [
									{ "xtype" : "FluidVol", "name" : "FluidVol", "margin" : "0 0 2 1" },
									{ "xtype" : "container", "width" : 20, "html" : "ml", "margin" : "3 0 2 2"}
								], "name" : "FluidInfoVol" },
								{ "xtype" : "container", "layout" : "hbox", "width" : 180, "margin" : "2 0 0 0", "defaults": { "labelAlign" : "right" }, "items" : [
									{ "xtype" : "FlowRate", "name" : "FlowRate", "margin" : "0 0 2 1" },
									{ "xtype" : "container", "html" : "ml/hr", "margin" : "3 0 2 2"}
								], "name" : "FluidInfoRate" },
								{ "xtype" : "displayfield", "fieldLabel" : "Infusion Time", "name" : "InfusionTime", "margin" : "2 0 0 0", "width" : 200 }
							]
						},
						{
							"xtype" : "textfield",
							"labelAlign" : "right",
							"colspan" : 5,
							"margin" : "2 0 0 2",
							"labelWidth" : 75,
							"width" : 805,
							"fieldLabel" : "Instructions",
							"name" : "Instructions"
						},
						{ "xtype" : "hiddenfield", "colspan" : 5, "name" : "Order_ID" }
					]
				},
				{ "xtype" : "button", "text" : "Save", "action" : "save", "margin" : "10 30"  },
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"  }
			]
		}
	]
});
