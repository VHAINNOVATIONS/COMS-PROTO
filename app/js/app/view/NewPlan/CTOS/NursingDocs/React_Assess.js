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









Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.React_Assess", {
	extend: "Ext.form.Panel",
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
					name: "ND_RA_Xtrav_Heating",
					boxLabel : " Topical heating applied",
					section: "Extravasation",
					sequence : 0,
					subField : "ND_RA_Xtrav_HeatFreq"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_HeatFreq",
					fieldLabel : "Frequency"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Cooling",
					boxLabel : " Topical cooling applied",
					section: "Extravasation",
					sequence : 1,
					subField : "ND_RA_Xtrav_CoolFreq"
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
					boxLabel : " Interventions",
					section: "Extravasation",
					sequence : 2,
					subField : "ND_RA_Xtrav_InterventionsGiven"
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
					boxLabel : " Antidotes",
					section: "Extravasation",
					sequence : 3,
					subField : "ND_RA_Xtrav_AntidotesGiven"
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
					boxLabel : " Measurements",		// labelAlign: "top",
					section: "Extravasation",
					sequence : 4,
					subField : "ND_RA_Xtrav_MeasurementsTaken"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_MeasurementsTaken",
					fieldLabel : "Enter Bi-Dimensional Measurements"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Edema",
					boxLabel : " Edema",
					section: "Extravasation",
					sequence : 5,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Erythema",
					boxLabel : " Erythema",
					section: "Extravasation",
					sequence : 6,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Discomfort",
					boxLabel : " Discomfort with movement",
					section: "Extravasation",
					sequence : 7,
					subField : "ND_RA_Xtrav_DiscomfortDesc"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_DiscomfortDesc",
					fieldLabel : "Enter Range of motion and describe discomfort felt"
				},

				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Other",
					boxLabel : " Other",
					section: "Extravasation",
					sequence : 8,
					subField : "ND_RA_Xtrav_OtherDetails"
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
					boxLabel : " Fever", 
					section: "Cytokine-Release Syndrome",
					sequence : 0,
					subField : "ND_RA_CRS_Temperature"
				},
				{ 
					xtype : "textfield", labelAlign: "right", labelClsExtra : "NursingDocs-label", hidden : true,
					name : "ND_RA_CRS_Temperature",
					fieldLabel : " - Temperature", xxlabelWidth: 110
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Chills", 
					boxLabel : " Chills",
					section: "Cytokine-Release Syndrome",
					sequence : 1,
					subField : ""

				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rigors", 
					boxLabel : " Rigors",
					section: "Cytokine-Release Syndrome",
					sequence : 2,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Nausea", 
					boxLabel : " Nausea",
					section: "Cytokine-Release Syndrome",
					sequence : 3,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Hypotension", 
					boxLabel : " Hypotension",
					section: "Cytokine-Release Syndrome",
					sequence : 4,
					subField : "ND_RA_CRS_Systolic",
					subField2 : "ND_RA_CRS_Diastolic"
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_BP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 130, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_Systolic", width: 60 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_CRS_Diastolic", width: 60 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},
				// -----------------------------------------------------

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Tachycardia", 
					boxLabel : " Tachycardia", 
					section: "Cytokine-Release Syndrome",
					sequence : 5,
					subField : "ND_RA_CRS_PulseFld"
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_Pulse", hidden : true,
					fieldLabel : " - Pulse", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_PulseFld", width: 150 },
					{ xtype : "displayfield", value : " (Highest value)" }
				]},
				// -----------------------------------------------------

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Asthenia", 
					boxLabel : " Asthenia",
					section: "Cytokine-Release Syndrome",
					sequence : 6,
					subField : ""

				},
				// -----------------------------------------------------

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Headache", 
					boxLabel : " Headache",
					section: "Cytokine-Release Syndrome",
					sequence : 7,
					subField : ""

				},
				// -----------------------------------------------------

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rash", 
					boxLabel : " Rash",
					section: "Cytokine-Release Syndrome",
					sequence : 8,
					subField : "ND_RA_CRS_RashDesc"
				},
				{ 
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CRS_RashDesc", 
					fieldLabel : "Enter description"
				},
				// -----------------------------------------------------

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_TongueEdema", 
					boxLabel : " Tongue and Laryngeal Edema",
					section: "Cytokine-Release Syndrome",
					sequence : 9,
					subField : ""

				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Dyspnea", 
					boxLabel : " Dyspnea",
					section: "Cytokine-Release Syndrome",
					sequence : 10,
					subField : ""

				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_CRS_Other",
					boxLabel : " Other",
					section: "Cytokine-Release Syndrome",
					sequence : 11,
					subField : "ND_RA_CRS_OtherDetails"
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
					boxLabel : " Uneasiness or Agitation",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 0,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_ChestTightness", 
					boxLabel : " Chest Tightness",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 1,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Hypotension", 
					boxLabel : " Hypotension",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 2,
					subField : "ND_RA_HorA_Systolic",
					subField2 : "ND_RA_HorA_Diastolic"
				},

				{ xtype : "fieldcontainer", name: "ND_RA_HorA_BP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 130, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_HorA_Systolic", width: 60 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_HorA_Diastolic", width: 60 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Dyspnea", 
					boxLabel : " Dyspnea",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 3,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Wheezing", 
					boxLabel : " Wheezing",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 4,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Urticaria", 
					boxLabel : " Urticaria",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 5,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_PeriorbitalEdema", 
					boxLabel : " Periorbital or facial edema",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 6,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Abdominal", 
					boxLabel : " Abdominal",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 7,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Cramping", 
					boxLabel : " Cramping",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 8,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Diarrhea", 
					boxLabel : " Diarrhea",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 9,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Nausea", 
					boxLabel : " Nausea",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 10,
					subField : ""
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_HorA_Other",
					boxLabel : " Other",
					section: "Hypersensitivity or Anaphylaxis",
					sequence : 11,
					subField : "ND_RA_HorA_OtherDetails"
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
					boxLabel : " Other",
					section: "Other",
					sequence : 0,
					subField : "ND_RA_CR_Comments"
				},
				{ 
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CR_Comments",
					fieldLabel : "Comments"
				}
			]
		},
		{ xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true, name : "ND_InfusReact_None", boxLabel : "No Adverse Reaction" },
		{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
	]
});

