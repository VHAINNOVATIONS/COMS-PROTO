/*globals Ext */
// Note: Controller for this widget is the "NewPlan.OEM" controller ("app\controller\NewPlan\OEM.js")
// Check out the "handleGoal_CTrial()" function which is attached via the "displayOEM_Record_Data()" function

Ext.define("COMS.view.NewPlan.CTOS.OEMClinicalTrial", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OEMClinicalTrial",

	"title" : "Regimen Clinical Trial",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 250,

	"items" : [
		{
			"xtype" : "form",
			"items" : [
				{ "xtype" : "container", "margin" : "10 10 0 10", "html" : "<strong>Specify the type of Clinical Trial</string>" },

				{
					"xtype" : "fieldcontainer",
					"defaults" : {
						"labelAlign" : "right",
						"margin" : "0 15"
					},
					"layout" : "hbox",
					"defaultType" : "radiofield",
					"items": [
						{
							"boxLabel" : "Yes",
							"name" : "trial",
							"inputValue" : true
						},
						{
							"boxLabel" : "No",
							"name" : "trial",
							"inputValue" : false
						}
					]
				},
				{ "xtype" : "textfield", "fieldLabel" : "Type of Trial" },
				{ "xtype" : "button", "text" : "Save", "action" : "save", "margin" : "10 30"  },
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"  }
			]
		}
	]
});
