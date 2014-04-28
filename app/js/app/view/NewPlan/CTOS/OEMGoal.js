// Note: Controller for this widget is the "NewPlan.OEM" controller ("app\controller\NewPlan\OEM.js")
// Check out the "handleGoal_CTrial()" function which is attached via the "displayOEM_Record_Data()" function
Ext.define("COMS.view.NewPlan.CTOS.OEMGoal", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OEMGoal",

	"title" : "Regimen Goal",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 250,
	"url" : Ext.URLs.Edit_OEMRecord,

	"items" : [
		{
			"xtype" : "form",
			"items" : [
				{ "xtype" : "container", "margin" : "10 10 0 10", "html" : "<strong>Select the goal for this Regimen</strong>" },

				{
					"xtype" : "fieldcontainer",
					"defaults" : {
						"labelAlign" : "right", 
						"margin" : "0 15"
					},
					"defaultType" : "radiofield",
					"items": [
						{
							"boxLabel" : "Curative",
							"name" : "goal",
							"inputValue" : "Curative"
						},
						{
							"boxLabel" : "Palliative",
							"name" : "goal",
							"inputValue" : "Palliative"
						}
					]
				},
				{ "xtype" : "button", "text" : "Save", "action" : "save", "margin" : "10 30"  },
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"  }
			]
		}
	]
});