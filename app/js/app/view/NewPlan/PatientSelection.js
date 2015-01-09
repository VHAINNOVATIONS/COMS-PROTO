Ext.define("COMS.view.NewPlan.PatientSelection" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientSelection",
	name : "PatientSelection",

	cls : "xPandablePanel",

	collapsible : true,
	collapsed : false,
	title : "Patient Selection",
    resizable : true,
    autoScroll : true,
    autoHeight: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults : {
        margin: "5 0 5 10"
    },


	items : [
	{ xtype: 'box', cls : "x-form-item-label", html : "Enter a range of Administration Dates to search" },
		{ xtype : "container", layout : "hbox", items : [
			{
				xtype : "datefield",
				width: 320,
				labelWidth : 220,
				labelAlign : "right",
				labelClsExtra : "NursingDocs-label",
				fieldLabel: "From",
				name: "from_date",
				value : new Date(),
				minValue: new Date()  // limited to today or greater
			},
			{
				xtype : "datefield",
				width: 150,
				labelWidth : 40,
				labelAlign : "right",
				fieldLabel: "To",
				labelClsExtra : "NursingDocs-label",
				name: "to_date",
				minValue: new Date()  // limited to today or greater
			},
			{ 
				xtype : "container", 
				name : "PatientSelectionDate", 
				html : "&nbsp;<button type=\"button\" class=\"anchor\" name=\"SelectPatientAdminRange\">Select Patient by Administration Date(s)</button>" 
			}
		]},

		{ xtype: 'box', html: "<div class=\"NursingDocs-label\">OR</div><div class=\"x-form-item-label\">Enter Patient Identification (SSN) to query <abbr title=\"Computerized Patient Record System\">CPRS</abbr></div>" },
		{ xtype : "container", layout : "hbox", items : [
			{
			    xtype: 'textfield',
				width: 320,
				labelWidth : 220,
				labelAlign : "right",
				labelClsExtra : "NursingDocs-label",
				fieldLabel: "Patient Identification (SSN)",
				name: 'CPRS_QueryString'
			},
			{ 
				xtype : "container", 
				name : "PatientQuery", 
				html : "&nbsp;<button type=\"button\" class=\"anchor QueryCPRS4Patient\" name=\"QueryCPRS4Patient\">Query CPRS for Patient</button>" 
			}
		]},
			/* style: "background: #EFEFEF; padding: 0.5em; border: thin solid navy;" */
        // { xtype: 'box', cls: "coms-section-emphasis", margin: "10 60 10 60", autoEl: { tag: 'div', html: '(Note: For testing purposes, there are hundreds of patients available between 0010 and 0603. To search for a patient, use the spelling of the number for a last name and the number. For example: <b>FiveHundredTwenty, Patient</b> would be <b>f0520</b> or <b>OneHundredThirty, Patient</b> would be <b>o0130</b>).' } },
        { xtype: 'box', cls: "coms-section-emphasis", margin: "10 60 10 60", autoEl: { tag: 'div', html: 
		"<p>Note: The Innovations Sandbox/Future Technology Lab contains hundreds of available patients with a numeric last name and \"Patient\" first name. " +
		"To search for a patient, use the first letter from the spelling of the number, a zero, and the three digit number itself.</p>" +
		"<p>For example, <br><b>\"ThreeHundredTwenty, Patient\"</b> is available as t0320 or T0320; <br><b>\"OneHundredThirty, Patient\"</b> is available as o0130 or O0130 " +
		"(where the first character is the letter \"Oh\" as opposed to the number \"Zero\".)</p>" +
		"<p>Due to multiple users accessing patients throughout the COMS Enhancement Period, patients will be allocated as follows:" +
		"<ul>"+
			"<li>VHA/OI&T Stakeholders may use the 100, 200, 300 and 400 series</li> " + 
			"<li>Development Team may use the 500 series</li>" +
		"</ul>" } },
		{ xtype : "SelectPatient" }
	]
});