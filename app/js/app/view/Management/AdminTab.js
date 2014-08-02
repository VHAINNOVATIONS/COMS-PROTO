Ext.define("COMS.view.Management.AdminTab" ,{
	extend: "Ext.tab.Panel",
	alias : "widget.AdminTab",
	name : "Admin Tab",
	autoEl : { tag : "nav" },
	padding : "10 10 5 10",
	plain : true,
<<<<<<< HEAD
	//activeTab: 7,
=======
	activeTab: 6,
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
	"defaults": { padding : "10 10 5 10", plain : true, "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	items : [
		{ xtype : "AddLookups", title: "Manage LookUps" },
		{ xtype : "DiseaseStaging", title: "Disease Staging" },
		{ xtype : "DeleteTemplate", title: "Delete Template"},
		{ xtype : "Globals", title: "Global Variables"},
		{ xtype : "Users", title: "COMS Users"},
		{ xtype : "ActiveWorkflows", title: "Active Workflows"},
		{ xtype : "IntelligentDataElements", title: "IDE"},
		{ xtype : "tabpanel", title: "Discharge Info", 
			defaults: {
				padding : "10 10 5 10"
			},
			items : [
				{ xtype : "DischargeInstructionManagement", title: "Discharge Instructions"},
<<<<<<< HEAD
				{ xtype : "ClinicInfo", title: "Clinic Information"},
				{ xtype : "MedRisks", title: "Neutropenia / Emesis Risks"}
			]
		},
		{ xtype : "tabpanel", title: "Medications",
=======
				{ xtype : "ClinicInfo", title: "Clinic Information"}
				,{ xtype : "MedRisks", title: "Neutropenia / Emesis Risks"}
			]
		},
		{ xtype : "tabpanel", title: "Medications", activeTab: 3,
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
			defaults: {
				padding : "10 10 5 10"
			},
			items : [
				{ xtype : "MedsNonRounded", title: "Medications Not Rounded"},
				{ xtype : "RoundingRules", title : "Rounding Rules"},
				{ xtype : "MedicationHolds", title : "Medication Holds"},
				{ xtype : "IV_Fluid_Types", title : "IV Fluid Types", name : "IV_Fluid_Types"},
<<<<<<< HEAD
				{ xtype : "MedicationDocumentation", title : "Medication Documentation", name : "Documented_Meds_Tab"},
				{ xtype : "Toxicity", title: "Toxicity"},
				{ xtype : "CumulativeDosing", title: "Cumulative Dose Medications"}
=======
				{ xtype : "MedicationDocumentation", title : "Medication Documentation", name : "Documented_Meds_Tab"}
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
			]
		}
	]
});
