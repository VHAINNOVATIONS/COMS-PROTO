Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PatientEducationDetails", {
	"extend": "Ext.container.Container",
	"alias": "widget.PatientEducationDetails",
	"id": "PatientEducationDetails",
	"hidden": true,
	"name": "PatientEduDetails",
	"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
	"items": [
		{
			"xtype": "fieldset",
			"title": "Who Was Taught",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"name": "taught_Patient",
				"fieldLabel": "Patient"
			}, {
				"name": "taught_Patient",
				"fieldLabel": "Spouse"
			}, {
				"name": "taught_Patient",
				"fieldLabel": "Significant Other"
			}, {
				"xtype": "CkBoxTArea",
				"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
				"name": "taught_Other",
				"fieldLabel": "Other (Please designate)"
			}]
		},
		{
			"xtype": "fieldset",
			"title": "Pre Education Needs",
			"items": [{
				"xtype": "radiogroup",
				"columns": 1,
				"vertical": true,
				"defaultType": "radio",
				"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
				"items": [{
					"name": "Pre_Edu_KnowsWell",
					"inputValue": "1",
					"fieldLabel": "Already knows well"
				}, {
					"name": "Pre_Edu_NeedsReview",
					"inputValue": "2",
					"fieldLabel": "Needs review"
				}, {
					"name": "Pre_Edu_NewMaterial",
					"inputValue": "3",
					"fieldLabel": "New material"
				}]
			}]
		},
		{
			"xtype": "fieldset",
			"title": "Barriers to Learning",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"fieldLabel": "None"
			}, {
				"fieldLabel": "Desire/motivation"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Physical",
				"fieldLabel": "Physical"
			}, {
				"fieldLabel": "Hearing"
			}, {
				"fieldLabel": "Vision"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Cognition",
				"fieldLabel": "Cognition"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Religious_Cultural",
				"fieldLabel": "Religious/Cultural"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Emotional",
				"fieldLabel": "Emotional"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Language",
				"fieldLabel": "Language Barriers"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Communication",
				"fieldLabel": "Communication"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Financial",
				"fieldLabel": "Financial"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Other",
				"fieldLabel": "Other"
			}]
		}, {
			"xtype": "fieldset",
			"title": "Patient's Learning Style Preference",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"fieldLabel": "Verbal"
			}, {
				"fieldLabel": "Written"
			}, {
				"fieldLabel": "Demonstration"
			}, {
				"fieldLabel": "Audio-Visual"
			}, {
				"xtype": "CkBoxTArea",
				"name": "LearningPreference_Other",
				"fieldLabel": "Other"
			}]
		},
		{
			"xtype": "fieldset",
			"title": "Teaching Methods",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"fieldLabel": "Verbal",
				"name": "Teaching_Verbal"
			}, {
				"fieldLabel": "One to One",
				"name": "Teaching_1_to_1"
			}, {
				"fieldLabel": "Group",
				"name": "Teaching_Group"
			}, {
				"fieldLabel": "Telephone",
				"name": "Teaching_Phone"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Teaching_Demo",
				"fieldLabel": "Demonstration/<br>Return Demonstration"
			}]
		},
		{
			"xtype": "fieldset",
			"title": "Chemotherapy Discharge Instructions/Materials",
			"defaultType": "checkbox",
			"name" : "DischargeInstructionsMaterials",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [
				{
					"xtype": "radiogroup",
					"columns": 2,
					"defaultType": "radio",
					"fieldLabel": "Patient was given Chemotherapy discharge instructions.",
					"labelWidth": 370,
					"width": 20,
					"defaults": {
						"labelAlign": "right",
						"labelWidth": 30,
						"labelClsExtra": "NursingDocs-label"
					},
					"items": [{
						"name": "DischargeInstructions_Given",
						"inputValue": "1",
						"fieldLabel": "Yes"
					}, {
						"name": "DischargeInstructions_Given",
						"inputValue": "0",
						"fieldLabel": "No"
					}]
				},
				{ 
					"xtype" : "container",
					"name" : "DischargeInstructionsDetails",
					"id" : "DischargeInstructionsDetails",
					"hidden" : true,
					"defaultType": "checkbox",
					"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
					"items" : [
						{
							"xtype": "textarea",
							"grow": true,
							"fieldLabel": "Materials",
							"name": "DischargeInstructions_Materials",
							"width": 890
						},
						{
							"fieldLabel": "Krames on Demand",
							"name": "Teaching_Krames"
						}, {
							"fieldLabel": "HealtheVet ",
							"name": "Teaching_HealtheVet"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_InfoSheets",
							"fieldLabel": "Drug info sheet/<br>Food-drug/<br>Drug-drug interaction"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_VABrochure",
							"fieldLabel": "VA Brochure/<br>Handout"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_OtherWritten",
							"fieldLabel": "Other written material given"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_Mailed",
							"fieldLabel": "Mailed"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_Video",
							"fieldLabel": "Videotape"
						}, {
							"xtype": "CkBoxTArea",
							"name": "Teaching_Other",
							"fieldLabel": "Other"
						},
						{
							"xtype": "CheckCombo",
							"fieldLabel": "Select Instructions",
							"name": "ND_E_SelectDischargeInstr",
							"width": 450,
							"store": {
								"fields": ["name", "value"],
								"data": [{
									"name": "Neutropenic Precautions",
									"value": 1
								}, {
									"name": "Diarrhea Management",
									"value": 2
								}, {
									"name": "EGFR Rash",
									"value": 3
								}, {
									"name": "Cold Sensitivity",
									"value": 4
								}]
							},
							"displayField": "name",
							"valueField": "value"
						}, {
							"xtype": "container",
							"hidden": false,
							"name": "ND_E_DischargeInstr",
							"width": 800,
							"html": "<h2>No Instructions available at this time</h2>"
						},
						{
							"xtype": "textarea",
							"grow": true,
							"fieldLabel": "Comments",
							"name": "DischargeInstructions_Comments",
							"width": 890
						}
					]
				}
			]
		},

		{
			"xtype": "fieldset",
			"title": "Patient/Caregiver Response",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"fieldLabel": "Verbalizes understanding"
			}, {
				"fieldLabel": "Demonstrates accurately"
			}, {
				"xtype": "CkBoxTArea",
				"name": "PResponse_NeedsMoreInstrution",
				"fieldLabel": "Needs additional instruction/practice",
				"labelWidth": 200,
				"defaults": {
					"labelWidth": 200,
					"labelClsExtra": "NursingDocs-label"
				}
			}, {
				"xtype": "CkBoxTArea",
				"name": "PResponse_NeedsAssistance",
				"fieldLabel": "Needs assistance",
				"defaults": {
					"labelWidth": 200,
					"labelClsExtra": "NursingDocs-label"
				}
			}, {
				"xtype": "CkBoxTArea",
				"name": "PResponse_Unable2Learn",
				"fieldLabel": "Unable to learn",
				"defaults": {
					"labelWidth": 200,
					"labelClsExtra": "NursingDocs-label"
				}
			}, {
				"xtype": "CkBoxTArea",
				"name": "PResponse_NoParticipate",
				"fieldLabel": "Does not participate",
				"defaults": {
					"labelWidth": 200,
					"labelClsExtra": "NursingDocs-label"
				}
			}]
		}, {
			"xtype": "textarea",
			"grow": true,
			"labelWidth": 150,
			"labelAlign": "right",
			"labelClsExtra": "NursingDocs-label",
			"fieldLabel": "Additional Comments",
			"name": "PE_AdditionalComments",
			"width": 915
		}
	]
});