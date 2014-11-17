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
		{ "xtype" : "FS_Toxicity", margin: "0 10 0 0" }
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
