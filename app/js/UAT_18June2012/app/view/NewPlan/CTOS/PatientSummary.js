Ext.define("COMS.view.NewPlan.CTOS.PSummary_Overview", {
//	extend : "Ext.form.FieldSet",
	extend : "Ext.container.Container",
	alias : "widget.PSummary_Overview",
	name : "PSummary_Overview", 
//	autoEl : { tag : "section" },
	
	title : "Chemotherapy Template Summary",
//	collapsible : true,
//	frame : true,
	margin: "10",

	tpl : new Ext.XTemplate(
		"<table border=\"1\" width=\"100%\" class=\"Therapy InformationTable\">",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=15%></colgroup>",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=61%></colgroup>",

		"	<thead><tr><th colspan=\"4\" class=\"large\">Patient Summary Information <span style=\"font-weight: normal;\">- for Patient: {PatientName}</span></th></tr></thead>",

		"	<tr><th align=\"right\">Regimen:</th><td colspan=\"3\">{RegimenName}</td></tr>",
		"	<tr><th align=\"right\">Description</th><td colspan=\"3\">{RegimenDescription}</td></tr>",
		"	<tr><th align=\"right\">Treatment Start:</th><td colspan=\"3\">{TreatmentStart}</td></tr>",
		"	<tr><th align=\"right\">Treatment End:</th><td colspan=\"3\">{TreatmentEnd}</td></tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		"		<td>{NeutropeniaRecommendation} (Note: Need to add recommendations to Lookup Table for FN)</td>",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>",
		"			<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>{ELevelRecommendationASCO}</p>",
		"			<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>",
		"		</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"5\">{[this.goalLink( values )]}</td></tr>",
		"	<tr><th>Clinical Trial</th><td colspan=\"5\">{[this.ctLink( values )]}</td></tr>",
		"	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"5\">{[this.PS( values )]}</td></tr>",
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
			goalLink : function ( current ) {
				if (current.Goal){
					return (current.Goal);
				}
				return ("No Goal Specified");
			},
			ctLink : function ( current ) {
				if (current.ClinicalTrial ) {
					return (current.ClinicalTrial);
				}
				return ("Clinical Trial Not Specified");
			},
			ctData : function ( current ) {
				if (current.ClinicalTrial) {
					return ("<tr><th>Type of Trial</th><td colspan=\"5\">" + current.ClinicalTrialType + "</td></tr>");
				}
				return ("");
			},
			PS : function ( current ) {
				var buf = current.PerformanceStatus;
				return (buf);
			}
		}
	)
});


Ext.define("COMS.view.NewPlan.CTOS.PatientSummary" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientSummary",

	name : "Patient Summary Tab",
	margin : "0 0 20 0",

	autoEl : { tag : "section" },
	title: "Patient Summary",
	items : [
//		{ xtype : "container", name : "heading", margin: "5 0 0 10", tpl : "<h2>Patient Summary for {PatientName}</h2>" },
		{ xtype : "PSummary_Overview" }
/******************
	{ xtype : "container", name : "body",
			html : ["<table>",
//				"<tr><td><b>Patient Summary</b><br><i>This page can contain lab results as well.</i></td></tr>",
//				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\"><b>Description:</b></td></tr>",
//				"<tr><td colspan=\"6\">SGleevec 400mg PO q day</td></tr>",
//				"<tr><td colspan=\"6\">Neutropenia Risk: Low: &lt; 17%<br /><b>Recommendation:</b> No Cycle1 preemptive therapy indicated </td></tr>",
//				"<tr><td>&nbsp;</td></tr>",
//				"<tr><td colspan=\"6\"><b>Emesis Risk:</b> Low <br /><b>Recommendation:</b> Routine use of antiemetics is not standard </td></tr>",
//				"<tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\">C1D1 Instructions: (See Order Sheet For Future Days and   Cycles) </td></tr>",
				"<tr><td colspan=\"6\"><table width=\"600\" border=\"2\"><tr><td>Drug Name</td><td>Drug Dose</td><td>Instructions</td></tr>",
				"<tr><td colspan=\"3\">&nbsp;</td></tr><tr><td>Gleevec (400 mg)</td><td>400 mg</td><td>PO daily; Provide script to patient</td></tr>",
				"</table></td></tr>",
				"<tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\"><span class=\"style6\">Alerts<br />",
				"<input name=\"alert\" type=\"text\" class=\"style6\" id=\"alert\" value=\"Consider ESA for HB&lt;10, HCt&lt;30 in solid tumors, lymphoma, myeloma and MDS.\" size=\"90\" /> </td></tr>",
				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\"><b>Information:</b></td></tr>",
				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\">",
				"<p>Understanding of the molecular pathophysiology of chronic myelogenous leukemia (CML) has led to targeted therapies for this ",
				"disease.  Imatinib mesylate (Gleevec) is a potent inhibitor of the BCR-ABL tyrosine kinase which offers 82% complete cytogenetic ",
				"remission and 86% overall survival at 7 years for patients diagnosed in chronic phase1.  Second generation tyrosine kinase ",
				"inhibitors (dasatinib, nilotinib) are effective for imatinib-resistant disease, and are being evaluated for front line therapy2.</p>",
				"<br><p>Although allogeneic hematopoietic-cell transplantation is the only proven curative treatment for CML, the procedure is an ",
				"option in only about 25 percent of patients and carries substantial risks. On the basis of the high early mortality rate associated with bone marrow transplantation and the promising results with Imatinib, early transplantation is not recommended</p><ol><li>  ASH 2009 Annual Meeting, abstract 186.</li><li>  N Engl J Med 2006 354:2531-2541        </li><li>  Mayo Clin Proc 81:973-988, 2006</li></ol></td></tr>",
				"<tr><td colspan=\"6\"></td></tr><tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\"><b>Reference:</b>    </td></tr>",
				"<tr><td colspan=\"6\">N Eng J Med 2001; 344:1038<br />N Eng J Med 2003; 348:994 <br />N Eng J Med 2006; 355:2408</td></tr>",
				"</table>"
			]
		}
***************/
	],

	initComponent: function() {
		wccConsoleLog("Patient Summary Tab View - Initialization");
		this.callParent(arguments);
	}
});