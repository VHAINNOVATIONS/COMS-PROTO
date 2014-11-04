Ext.define("COMS.view.NewPlan.CTOS.FlowSheet" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.FlowSheet",
	"name" : "Flow Sheet Tab",
	"title" : "Flow Sheet",

	"padding" : "10",
	"items" : [
		{ "xtype" : "NursingDocs_Chemotherapy", "cls" : "Level1" },
		{ "xtype" : "FlowSheetGrid" },
		{ "xtype" : "DiseaseResponsePanel" },
		// { "xtype" : "ToxicitySideEffectsPanel" },
		{ "xtype" : "FS_ToxicityHistory" },
		{ "xtype" : "OtherInfoPanel" },
		{ "xtype" : "LabInfo" }
	]
});