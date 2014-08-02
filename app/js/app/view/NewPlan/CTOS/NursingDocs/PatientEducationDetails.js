







Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.MedsInfoDisplay" ,{
	extend : "Ext.container.Container",
    alias : "widget.MedsInfoDisplay",
	name : "NursingDocs.MedsInfoDisplay",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"<section>",
		"<div class=\"SelectedSiteCommonInstructions\">",
		"<tpl for=\".\">",
			"{[this.tempCalc(values)]}",
			"<p><h3>{Medication}</h3>",
			"{Documentation}",
			"</p>",
		"</tpl>",
		"</div></section>",
		{
				// XTemplate Configuration
			disableFormats: true,
			tempCalc: function (data) {
				// debugger;
			}
		}
	)
});







Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.ClinicInfoDisplay" ,{
	extend : "Ext.container.Container",
    alias : "widget.ClinicInfoDisplay",
	name : "NursingDocs.ClinicInfoDisplay",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"<h2>Clinic Information:</h2><section>",
		"<div class=\"SelectedSiteCommonInstructions\">",
		"<tpl for=\".\">",
			"<p><h3>{Label}</h3>",
			"{Details}",
			"</p>",
		"</tpl>",
		"</div></section>"
	)
});
Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.SpclInstrDisplay" ,{
	extend : "Ext.container.Container",
    alias : "widget.SpclInstrDisplay",
	name : "NursingDocs.SpclInstrDisplay",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"<h2>Discharge Instructions:</h2><section>",
		"<div class=\"SelectedSiteCommonInstructions\">",
		"<tpl for=\".\">",
			"<p><h3>{Label}</h3>",
			"{Details}",
			"</p>",
		"</tpl>",
		"</div></section>"
	)
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.MedSpecificInfoDisplay" ,{
	extend : "Ext.container.Container",
    alias : "widget.MedSpecificInfoDisplay",
	name : "NursingDocs.MedSpecificInfoDisplay",
	autoScroll : true,
	html : "<hr>None Available<hr>",

	tpl : new Ext.XTemplate(
		"<h2>Medication Information:</h2><section>",
		"<div class=\"SelectedSiteCommonInstructions\">",
		"<tpl for=\".\">",
			"<p><h3>{Medication}</h3>",
			"{Documentation}",
			"</p>",
		"</tpl>",
		"</div></section>"
	)
});







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
				"name": "taught_Spouse",
				"fieldLabel": "Spouse"
			}, {
				"name": "taught_SignificantOther",
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
					"name": "Pre_Edu",
					"inputValue": "1",
					"fieldLabel": "Already knows well"
				}, {
					"name": "Pre_Edu",
					"inputValue": "2",
					"fieldLabel": "Needs review"
				}, {
					"name": "Pre_Edu",
					"inputValue": "3",
					"fieldLabel": "New material"
				}]
			}]
		},
		{
			"xtype": "fieldset",
			"title": "Barriers to Learning",
			"name" : "Barriers",
			"defaultType": "checkbox",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items": [{
				"fieldLabel": "None",
				"name" : "Barrier_None"
			}, {
				"fieldLabel": "Desire/motivation",
				"name" : "Barrier_Desire"
			}, {
				"xtype": "CkBoxTArea",
				"name": "Barrier_Physical",
				"fieldLabel": "Physical"
			}, {
				"fieldLabel": "Hearing",
				"name": "Barrier_Hearing"

			}, {
				"fieldLabel": "Vision",
				"name": "Barrier_Vision"
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
				"fieldLabel": "Verbal",
				"name": "LearningPreference_Verbal"
			}, {
				"fieldLabel": "Written",
				"name": "LearningPreference_Written"
			}, {
				"fieldLabel": "Demonstration",
				"name": "LearningPreference_Demo"
			}, {
				"fieldLabel": "Audio-Visual",
				"name": "LearningPreference_AudioVisual"
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
							"xtype" : "container",
							"layout" : "fit",
							"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
							"items" : [{
								"xtype": "textarea",
								"grow": true,
								"fieldLabel": "Materials",
								"name": "DischargeInstructions_Materials"
							}]
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
							// "noDataText" : "",
							"value" : "",		/* If a CheckCombo is not initialized with a value of "" the form shows up as Dirty */
							"fieldLabel": "Select Clinic Information",
							"name": "ND_E_SelectClinicInfo",
							"width": 450,
							"margin" : "5 0 10 0",
							"store" : "ClinicInfo",
							"displayField": "Label",
							"valueField": "ID"
						}, 
						{
							"xtype": "ClinicInfoDisplay"
						},
						{
							"xtype": "CheckCombo",
							// "noDataText" : "",
							"value" : "",
							"fieldLabel": "Select Discharge Instructions",
							"name": "ND_E_SelectDischargeInstr",
							"width": 450,
							"margin" : "5 0 10 0",
							"store" : "DischargeInstruction",
							"displayField": "Label",
							"valueField": "ID"
						}, 
						{
							"xtype": "SpclInstrDisplay"
						},

						{ "xtype" : "box", "name" : "MedSpecificInfoHeader", "html" : "Medication Specific Information:", "style": {"textAlign" : "right"}, "width": 200, "componentCls": "NursingDocs-label" },
						{ "xtype" : "MedSpecificInfoDisplay" },
						{
							"xtype" : "container",
							"layout" : "fit",
							"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
							"items" : [{
								"xtype": "textarea",
								"grow": true,
								"fieldLabel": "Comments",
								"name": "DischargeInstructions_Comments"
							}]
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
			"xtype" : "container",
			"layout" : "fit",
			"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
			"items" : [{
				"xtype": "textarea",
				"grow": true,
				"fieldLabel": "Additional Comments",
				"name": "PE_AdditionalComments"
			}]
		}
	]
});