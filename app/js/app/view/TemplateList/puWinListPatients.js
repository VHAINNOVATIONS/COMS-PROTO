Ext.define("COMS.view.TemplateList.puWinListPatients", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinListPatients",
	"title" : "Patients Currently Undergoing Treatment",
	"closeAction" : "destroy",
	"width" : 820,
	"height" : 220,
	"minHeight" : 220,
	"autoShow" : true,
	"resizable" : true,
	"modal" : true,
	"defaults" : { "margin" : 10 },
	"items" : [
		{ "xtype" : "box", "name" : "gridInfo" },
		{
			"xtype" : "grid", 
			"name" : "patientsGrid",
			"store" : { "model" : "COMS.model.TemplateListPatients" },
			"columns" : [
				{ "text" : "Name", "dataIndex" : "Name", "flex" : 3 },
				{ "text" : "Date Treatment Started", "dataIndex" : "Date_Started", "flex" : 1 },
				{ "text" : "Projected End Date", "dataIndex" : "Est_End_Date", "flex" : 1 },

				{ "text" : "SSID", "dataIndex" : "SSID", "flex" : 1 }
			]
		}
	],
	"buttons" : [
		{ "text" : "Ok" }
	]
});

