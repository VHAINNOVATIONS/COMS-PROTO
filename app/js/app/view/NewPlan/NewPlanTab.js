Ext.define("COMS.view.NewPlan.NewPlanTab" ,{
	extend: "Ext.container.Container",
	alias : "widget.NewPlanTab",
	name : "New Patient Plan Tab",

	autoEl : { tag : "section" },
	title : "<h2>Patient Information</h2>",
	margin : "10",

	items : [
		{ "xtype" : "PatientSelection" },
		{
			"xtype" : "component",
			"hidden" : true, "name" : "CumulativeDosingWarning", 
			"autoEl" :  {
				"tag" : "section",
				"cls" : "TCDWarning"
			},
			"html" : "This is a warning of the Total Cumulative Dosing"
		},
		{ "xtype" : "ProgrammerBtns" },
		{ "xtype" : "PatientInfo" }
	],

	initComponent: function() {
		wccConsoleLog("New Plan Tab View - Initialization");
		this.callParent(arguments);
	}
});