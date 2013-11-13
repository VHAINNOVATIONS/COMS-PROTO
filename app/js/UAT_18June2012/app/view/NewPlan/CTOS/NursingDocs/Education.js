Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Education" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_Education",
	name : "Nursing Documentation Education Tab",
	title: "Discharge Instructions",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			// defaults : { collapsible : true, collapsed : false },
			items : [
				{ xtype : "fieldset",
					title : "Patient Education",
					name : "ND_E_PatientEducation",
					defaultType : "fieldcontainer",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
						{ 
							fieldLabel : "Patient Education",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_E_PE_Education", fieldLabel : "Yes"},  { name : "ND_E_PE_Education", fieldLabel : "No"}  ]
						},
						{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_E_PE_E_Comments", width: 850 },

						{ 
							fieldLabel : "Follow up",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 60, width : 90 },
							items : [ 
								{ name : "ND_E_PE_Followup", fieldLabel : "Inpatient"},  
								{ name : "ND_E_PE_Followup", fieldLabel : "Outpatient"}
							]
						},

						{ xtype : "container", name : "ND_E_PE_Outpatient", hidden : false, items : [

							
{ xtype : "datefield", labelWidth: 95, fieldLabel : "Next Chemotherapy Appt.", width: 200, name : "ND_E_ChemoAptDate" },
{ xtype : "datefield", labelWidth: 95, fieldLabel : "Next Clinic Appt.", width: 200, name : "ND_E_ClinicAptDate" },
{ xtype : "container", html : "Laboratory Test(s) Scheduled" },
{ xtype : "datefield", labelWidth: 95, margin: "10 0 0 50", fieldLabel : "", width: 200, name : "ND_E_LabTest1Date" },
{ xtype : "datefield", labelWidth: 95, margin: "10 0 0 50", fieldLabel : "", width: 200, name : "ND_E_LabTest2Date" },

				{ xtype : "fieldset",
					title : "Discharge Instructions",
					name : "ND_E_Discharge",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
							{ xtype : "checkboxfield", 
								margin : "5 10 5 0", 
								labelWidth: 60, 
								boxLabel : "Patient was given Chemotherapy discharge instructions.", 
								name : "ND_E_DischargeInstrGiven" 
							},

				
							{ xtype : "combo", hidden : false, 
								fieldLabel : "Select Instructions",
								name : "ND_E_SelectDischargeInstr",
								width : 350,
								multiSelect : true,
								store : { fields : [ "name", "value" ], data : [
								{name : "Neutropenic Precautions", value : 1},  
								{name : "Diarrhea Management", value : 2},  
								{name : "EGFR Rash", value : 3},  
								{name : "Cold Sensitivity", value : 4}
							] }, displayField : "name", valueField : "value" },

					{ xtype : "container", hidden : false,
								name : "ND_E_DischargeInstr",
								width : 800,
								html : "<h2>No Instructions available at this time</h2>"
					},







							{ xtype : "textarea", 
								grow : true, 
								labelWidth: 95, 
								fieldLabel : "Comments", 
								name : "ND_E_Discharge_Comments", 
								width: 850 
							}
					]
				}







								]}		// END ND_E_PE_Outpatient
					]
				},
				{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
			]
		}
	]
});

