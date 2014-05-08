Ext.define("COMS.view.Management.AdminTab" ,{
	extend: "Ext.tab.Panel",
	alias : "widget.AdminTab",
	name : "Admin Tab",
	autoEl : { tag : "nav" },
	padding : "10 10 5 10",
	defaults: {
		padding : "10 10 5 10",
		plain : true
	},
	plain : true,
	activeTab: 5,
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	items : [
		{ xtype : "AddLookups", title: "Manage LookUps" },
		{ xtype : "DeleteTemplate", title: "Delete Template"},
		{ xtype : "Globals", title: "Global Variables"},
		{ xtype : "Users", title: "COMS Users"},
		{ xtype : "ActiveWorkflows", title: "Active Workflows"},
		{ xtype : "tabpanel", title: "Discharge Info", 
			defaults: {
				padding : "10 10 5 10"
			},
			items : [
				{ xtype : "DischargeInstructionManagement", title: "Discharge Instructions"},
				{ xtype : "ClinicInfo", title: "Clinic Information"}
				,{ xtype : "MedRisks", title: "Neutropenia / Emesis Risks"}
			]
		},
		{ xtype : "tabpanel", title: "Medications", activeTab: 3,
			defaults: {
				padding : "10 10 5 10"
			},
			items : [
				{ xtype : "MedsNonRounded", title: "Medications Not Rounded"},
				{ xtype : "RoundingRules", title : "Rounding Rules"},
				{ xtype : "MedicationHolds", title : "Medication Holds"},
				{ xtype : "IV_Fluid_Types", title : "IV Fluid Types", name : "IV_Fluid_Types"},
				{ xtype : "MedicationDocumentation", title : "Medication Documentation", name : "Documented_Meds_Tab"}
			]
		}
	]
});
