Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.AssessmentCombo", {
	extend : "Ext.form.field.ComboBox",
    alias : "widget.NursingDocs_AssCombo",
	hidden : true,
	labelWidth : 150,
	labelAlign : "right",
	width : 840,
	labelClsExtra : "NursingDocs-label", 
	margin : "0 10 5 10",
	queryMode : "local",
	displayField : "grade",
	valueField : "gradeLevel"
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PretreatmentAssesment" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_PretreatmentAssesment",
	name : "NursingDocs.PretreatmentAssesment",
	title : "Pretreatment Assesment",

	defaults : { labelAlign : "left"}, 
	items : [
		{ xtype : "container", html : "<h3>Pretreatment Assessment of Adverse Events since last treatment:</h3>" },

		{ xtype : "fieldset", title : "Notes on Assessment Events", collapsible : true, collapsed : true, html1 : ["<h3>Note:</h3><div>",
			"After reviewing several pages on the <a href=\"http://ctep.cancer.gov\" target=\"_blank\">CTEP</a> (Cancer Therapy Evaluation Program)Site, ",
			"including their <a href=\"http://ctep.cancer.gov/protocolDevelopment/electronic_applications/ctc.htm#ctc_40\" target=\"_blank\">documentation</a> on \"Common Terminology Criteria for Adverse Events (CTCAE) and Common Toxicity Criteria (CTC)\".<br>",
			"I have generated values for the following select boxes, from the most recent release of the core terminology in <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/CTCAE_4.03_2010-06-14.xls\" target=\"_blank\">Excel spreadsheet</a><br>",
			"from the NCI Common Terminology Criteria for Adverse Events (CTCAE) v.4 <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/About.html\" target=\"_blank\">data files</a>, located on the <a href=\"http://evs.nci.nih.gov/\" target=\"_blank\">National Cancer Institute - Enterprise Vocabulary Services</a> site",
			"</div>"],

			html : ["<h3>Note:</h3><div>",
			"The <a href=\"http://ctep.cancer.gov\" target=\"_blank\">CTEP</a> (Cancer Therapy Evaluation Program) Site, ",
			"contains <a href=\"http://ctep.cancer.gov/protocolDevelopment/electronic_applications/ctc.htm#ctc_40\" target=\"_blank\">documentation</a> on \"Common Terminology Criteria for Adverse Events (CTCAE) and Common Toxicity Criteria (CTC)\". ",
			"The following assessment terms and levels have been obtained from the most recent release of the core terminology in <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/CTCAE_4.03_2010-06-14.xls\" target=\"_blank\">Excel spreadsheet</a><br>",
			"from the <abbr title=\"National Cancer Institute\">NCI</abbr> Common Terminology Criteria for Adverse Events (CTCAE) v.4 <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/About.html\" target=\"_blank\">data files</a>, located on the <a href=\"http://evs.nci.nih.gov/\" target=\"_blank\">National Cancer Institute - Enterprise Vocabulary Services</a> site.",
			"</div>"]
		},




/****************************
		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Fatigue",
			boxLabel : "Fatigue"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_FatigueOptions",
			fieldLabel : "Level of Fatigue",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Fatigue relieved by rest", gradeLevel : "1" }, 
				{ grade : "2. Fatigue not relieved by rest; limiting instrumental Activity of Daily Living", gradeLevel : "2" }, 
				{ grade : "3. Fatigue not relieved by rest; limiting self care Activity of Daily Living", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_FatigueComments",
			fieldLabel : " Comments"
		},

		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Anorexia",
			boxLabel : "Anorexia"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_AnorexiaOptions",
			fieldLabel : "Level of Anorexia",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Loss of appetite without alteration in eating habits", gradeLevel : "1" }, 
				{ grade : "2. Oral intake altered without significant weight loss or malnutrition; oral nutritional supplements indicated", gradeLevel : "2" }, 
				{ grade : "3. Associated with significant weight loss or malnutrition (e.g., inadequate oral caloric and/or fluid intake); tube feeding or TPN indicated", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_AnorexiaComments",
			fieldLabel : " Comments"
		},



		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Nausea",
			boxLabel : "Nausea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_NauseaOptions",
			fieldLabel : "Level of Nausea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Loss of appetite without alteration in eating habits", gradeLevel : "1" }, 
				{ grade : "2. Oral intake decreased without significant weight loss, dehydration or malnutrition", gradeLevel : "2" }, 
				{ grade : "3. Inadequate oral caloric or fluid intake; tube feeding, TPN, or hospitalization indicated", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_NauseaComments",
			fieldLabel : " Comments"
		},


		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Vomiting",
			boxLabel : "Vomiting"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_VomitingOptions",
			fieldLabel : "Level of Vomiting",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. 1 - 2 episodes (separated by 5 minutes) in 24 hrs", gradeLevel : "1" }, 
				{ grade : "2. 3 - 5 episodes (separated by 5 minutes) in 24 hrs", gradeLevel : "2" }, 
				{ grade : "3. >=6 episodes (separated by 5 minutes) in 24 hrs; tube feeding, TPN or hospitalization indicated", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_VomitingComments",
			fieldLabel : " Comments"
		},



		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Rash",
			boxLabel : "Rash"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_RashOptions",
			fieldLabel : "Level of Rash",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Macules/papules covering <10% BSA with or without symptoms (e.g., pruritus, burning, tightness)", gradeLevel : "1" }, 
				{ grade : "2. Macules/papules covering 10 - 30% BSA with or without symptoms (e.g., pruritus, burning, tightness); limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Macules/papules covering >30% BSA with or without associated symptoms; limiting self care ADL", gradeLevel : "3" }

			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_RashComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Insomnia",
			boxLabel : "Insomnia"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_InsomniaOptions",
			fieldLabel : "Level of Insomnia",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Mild difficulty falling asleep, staying asleep or waking up early", gradeLevel : "1" }, 
				{ grade : "2. Moderate difficulty falling asleep, staying asleep or waking up early", gradeLevel : "2" },
				{ grade : "3. Severe difficulty in falling asleep, staying asleep or waking up early", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_InsomniaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Distress",
			boxLabel : "Distress"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DistressOptions",
			fieldLabel : "Level of Distress",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Mild pain", gradeLevel : "1" }, 
				{ grade : "2. Moderate pain; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Severe pain; limiting self care ADL", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DistressComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Diarrhea",
			boxLabel : "Diarrhea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DiarrheaOptions",
			fieldLabel : "Level of Diarrhea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Increase of <4 stools per day over baseline; mild increase in ostomy output compared to baseline", gradeLevel : "1" }, 
				{ grade : "2. Increase of 4 - 6 stools per day over baseline; moderate increase in ostomy output compared to baseline", gradeLevel : "2" }, 
				{ grade : "3. Increase of >=7 stools per day over baseline; incontinence; hospitalization indicated; severe increase in ostomy output compared to baseline; limiting self care Activity of Daily Living", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DiarrheaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Dyspnea",
			boxLabel : "Dyspnea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DyspneaOptions",
			fieldLabel : "Level of Dyspnea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Shortness of breath with moderate exertion", gradeLevel : "1" },
				{ grade : "2. Shortness of breath with minimal exertion; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Shortness of breath at rest; limiting self care ADL", gradeLevel : "3" }, 
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }, 
				{ grade : "5. Death", gradeLevel : "5" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DyspneaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Neuropathy",
			boxLabel : "Neuropathy"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_NeuropathyOptions",
			fieldLabel : "Level of Neuropathy",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Asymptomatic; clinical or diagnostic observations only; intervention not indicated", gradeLevel : "1" }, 
				{ grade : "2. Moderate symptoms; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Severe symptoms; limiting self care ADL; assistive device indicated", gradeLevel : "3" }, 
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }, 
				{ grade : "5. Death", gradeLevel : "5" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_NeuropathyComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Other",
			boxLabel : "Other"
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_OtherComments",
			fieldLabel : " Comments"
		},

		{ xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true, name : "ND_Ass_None", boxLabel : "No Adverse Reaction since Last Treatment" },
****************/
		{ "xtype" : "FS_Toxicity", margin: "0 10 0 0" }

		// { xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
	]
});








Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Assessment" ,{
	extend: "Ext.form.Panel",
	alias : "widget.NursingDocs_Assessment",
	name : "Nursing Documentation Assessment Tab",
	title: "Assessment",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			items : [
				{ xtype : "NursingDocs_PretreatmentAssesment"}
			]
		}
	]
});
