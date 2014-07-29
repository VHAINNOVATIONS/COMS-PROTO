Ext.define("COMS.view.NewPlan.CTOS.FlowSheetGrid" ,{
	"extend" : "Ext.grid.Panel",
	"alias" : "widget.FlowSheetGrid",
	"id" : "FlowSheetGrid",
	"name" : "Flow Sheet Grid",
	"title" : "Flowsheet",
	"margin" : "10 auto 10 auto",
	"buttonAlign" : "left",
	"enableLocking" : true,
	"columns" : [],
	
	"selType" : "cellmodel",

	"features" : [{
		"id" : "group",
		"ftype" : "groupingsummary",
		"groupHeaderTpl" : "{name}",
		"hideGroupedHeader" : true,
		"enableGroupingMenu" : false
	}],
	"dockedItems" : [
		{
			"xtype" : "toolbar",
			"dock" : "top",
			"items" : [
				{ "xtype" : "button", "text" :"<img src=\"/images/pencil.png\" /> Add General Information", "name" : "EditOptionalQues" }
			]
		},
		{
			"xtype" : "toolbar",
			"dock" : "bottom",
			"items" : [
				{ 
					"xtype" : "combobox",
					"name" : "ShowCycles",
					"fieldLabel" : "Select Cycle(s) to show",
					"labelWidth" : 150,
					"labelAlign" : "right",
					"width" : 500,
					"emptyText" : "List of Cycles",
					"store" : "FlowSheetCombo",
					"queryMode" : "local",
					"valueField" : "cols",
					"displayField" : "label"
				}
			]
		}
	]
});