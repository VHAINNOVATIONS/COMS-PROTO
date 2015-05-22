Ext.define("COMS.view.Management.AdminTab" ,{
	"extend" : "Ext.tab.Panel",
	"alias" : "widget.AdminTab",
	"name" : "Admin Tab",
	"autoEl" : { "tag" : "nav" },
	"padding" : "10 10 5 10",
	"plain" : true,
	"defaults" : { "padding" : "10 10 5 10", "plain" : true, "labelAlign" : "right", "labelClsExtra" : "NursingDocs-label" },
	"items" : [
		{ "xtype" : "tabpanel", "title" : "Documentation Lists and Contents", 
			"defaults" : {
				"padding" : "10 10 5 10"
			},
			"items" : [
				{ "xtype" : "ClinicInfo", "title" : "Clinic Information"},
				{ "xtype" : "DischargeInstructionManagement", "title" : "Discharge Instructions"},
				{ "xtype" : "AddLookups", "title" : "LookUps" },
				{ "xtype" : "MedicationDocumentation", "title" : "Medication Documentation", "name" : "Documented_Meds_Tab"},
				{ "xtype" : "Toxicity", "title" : "Toxicity"}
			]
		},
		{ "xtype" : "tabpanel", "title" : "Template Management",
			"defaults" : {
				"padding" : "10 10 5 10"
			},
			"items" : [
				{ "xtype" : "DeleteTemplate", "title" : "Delete Template"},
				{ "xtype" : "DiseaseStaging", "title" : "Disease Staging" },
				{ "xtype" : "EmeticMedsTab", "title" : "Emetic Medications", "name" : "Emetic_Meds_Tab"},
				{ "xtype" : "MedRisks", "title" : "Neutropenia / Emesis Risks"},
				{ "xtype" : "tabpanel", "title" : "Import / Export Template", "closable" : false, "html" : "<h1>Not Yet Available</h1>" }
			]
		},
		{ "xtype" : "tabpanel", "title" : "User Access",
			"defaults" : {
				"padding" : "10 10 5 10"
			},
			"items" : [
				{ "xtype" : "LockoutTab", "title" : "Lockout"},
				{ "xtype" : "Roles", "title" : "User Roles" }
			]
		},
		
		{ "xtype" : "tabpanel", "title" : "Clinical Decision Support",
			"defaults" : {
				"padding" : "10 10 5 10"
			},
			"items" : [
				{ "xtype" : "CumulativeDosing", "title" : "Cumulative Dose Medications"},
				{ "xtype" : "IntelligentDataElements", "title" : "Intelligent Data Entry"}
			]
		},
		{ "xtype" : "tabpanel", "title" : "Facility Preferences",
			"defaults" : {
				"padding" : "10 10 5 10"
			},
			"items" : [
				{ "xtype" : "ActiveWorkflows", "title" : "Active Workflows"},
				{ "xtype" : "IV_Fluid_Types", "title" : "IV Fluid Types", "name" : "IV_Fluid_Types"},
				{ "xtype" : "MedicationHolds", "title" : "Medication Holds"},
				{ "xtype" : "MedsNonRounded", "title" : "Medications Not Rounded"},
				{ "xtype" : "RoundingRules", "title" : "Rounding Rules"},
				{ "xtype" : "PharmacyManagement", "title" : "Pharmacy Management", "closable" : false},
				{ "xtype" : "tabpanel", "title" : "Signature Verifications", "closable" : false, "html" : "<h1>Not Yet Available</h1>" }
			]
		}
	]
});