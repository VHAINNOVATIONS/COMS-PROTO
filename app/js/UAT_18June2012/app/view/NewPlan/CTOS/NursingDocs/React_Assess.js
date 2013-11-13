Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RASection" ,{
	extend: "Ext.form.RadioGroup",
	alias : "widget.NursingDocs_RASection",
	columns : 2,
	labelClsExtra : "NursingDocs-label", 
	labelAlign: "right",
	labelWidth: 150,
	width: 300,
	defaults : {
		labelAlign: "right",
		labelWidth : 30,
		width : 50
	}
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RAFieldset" ,{
	extend: "Ext.form.FieldSet",
	alias : "widget.NursingDocs_RAFieldset",
	collapsible : true,
	collapsed : true,
	defaultType : "NursingDocs_RASection"
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RATextarea" ,{
	extend: "Ext.form.field.TextArea",
	alias : "widget.NursingDocs_RATextarea",
	labelAlign: "top", 
	labelWidth: 95, 
	width: 850, 
	height: 70, 
	grow : true,
	hidden : true,
	labelClsExtra : "NursingDocs-label"
});









Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.React_Assess" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_React_Assess",
	name : "Nursing Documentation Reaction/Assess Tab",
	title: "Infusion Reactions",
	items : [
		//------------------------------------------------------------------------------------
		//
		//	Extravasation
		//
		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Extravasation",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Heat",
					boxLabel : " Topical heating applied"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_HeatFreq",
					fieldLabel : "Frequency"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Cool",
					boxLabel : " Topical cooling applied"

				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_CoolFreq",
					fieldLabel : "Frequency"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Interventions",
					boxLabel : " Interventions"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_InterventionsGiven",
					fieldLabel : "Enter Interventions given"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Antidotes",
					boxLabel : " Antidotes"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_AntidotesGiven",
					fieldLabel : "Enter Antidotes given"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Measurements",
					boxLabel : " Measurements", labelAlign: "top"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_MeasurementsDetails",
					fieldLabel : "Enter Bi-Dimensional Measurements"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Edema",
					boxLabel : " Edema"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Erythema",
					boxLabel : " Erythema"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Discomfort",
					boxLabel : " Discomfort with movement"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_DiscomfortDetails",
					fieldLabel : "Enter Range of motion and describe discomfort felt"					
				},

				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},





		//------------------------------------------------------------------------------------
		//
		//	Cytokine-Release Syndrome
		//

		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Cytokine-Release Syndrome",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Fever",
					boxLabel : " Fever", width: 100
				},
				{ 
					xtype : "textfield", labelAlign: "right", labelClsExtra : "NursingDocs-label", hidden : true,
					name : "ND_RA_CRS_Temperature",
					fieldLabel : " - Temperature", labelWidth: 110
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Chills", 
					boxLabel : " Chills"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rigors", 
					boxLabel : " Rigors"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Nausea", 
					boxLabel : " Nausea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Hypotension", 
					boxLabel : " Hypotension", width: 100
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_HypotensionBP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_Systolic", width: 30 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_CRS_Diastolic", width: 30 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Tachycardia", 
					boxLabel : " Tachycardia", width: 100
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_TachycardiaPulse", hidden : true,
					fieldLabel : " - Pulse", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_Pulse", width: 150 },
					{ xtype : "displayfield", value : " (Highest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Asthenia", 
					boxLabel : " Asthenia"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Headache", 
					boxLabel : " Headache"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rash", 
					boxLabel : " Rash", width: 100
				},
				{ 
					xtype : "textfield", labelAlign: "right", labelClsExtra : "NursingDocs-label", hidden : true,
					name : "ND_RA_CRS_RashDesc", 
					fieldLabel : " - Description", labelWidth: 110
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_TongueEdema", 
					boxLabel : " Tongue and Laryngeal Edema"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Dyspnea", 
					boxLabel : " Dyspnea"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_CRS_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CRS_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},

		//------------------------------------------------------------------------------------
		//
		//	Hypersensitivity or Anaphylaxis
		//

		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Hypersensitivity or Anaphylaxis",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Uneasiness", 
					boxLabel : " Uneasiness or Agitation"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_ChestTightness", 
					boxLabel : " Chest Tightness"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Hypotension", 
					boxLabel : " Hypotension"
				},

				{ xtype : "fieldcontainer", name: "ND_RA_HorA_HypotensionBP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_HorA_Systolic", width: 30 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_HorA_Diastolic", width: 30 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Dyspnea", 
					boxLabel : " Dyspnea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Wheezing", 
					boxLabel : " Wheezing"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Urticaria", 
					boxLabel : " Urticaria"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_PeriorbitalEdema", 
					boxLabel : " Periorbital or facial edema"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Abdominal", 
					boxLabel : " Abdominal"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Cramping", 
					boxLabel : " Cramping"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Diarrhea", 
					boxLabel : " Diarrhea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Nausea", 
					boxLabel : " Nausea"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_HorA_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_HorA_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},

		//------------------------------------------------------------------------------------
		//
		//	Chemotherapy Reaction
		//
		{ 
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Other",
			name : "ND_RA_ChemoReaction",
			items : [ 
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CR_Reaction", 
					boxLabel : " Other"
				},
				{ 
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CR_Comments",
					fieldLabel : "Comments", labelWidth: 110
				}
			]
		},

		{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
	]
});

