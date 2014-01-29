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
		{ xtype : "container", layout : "hbox", items : [
			{
			    xtype : "datefield",
				width: 420,
				labelWidth : 310,
				labelAlign : "left",
				fieldLabel: "Enter a range of Administration Dates to search - From",
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
				name: "to_date",
			    minValue: new Date()  // limited to today or greater
			},
			{ 
				xtype : "container", 
				name : "PatientSelectionDate", 
				html : "&nbsp;<button type=\"button\" class=\"anchor\" name=\"SelectPatientAdminRange\">Select Patient by Administration Date(s)</button>" 
			}
		]},

        { xtype: 'box', autoEl: { tag: 'b', html: 'OR' } },
		{ xtype : "container", layout : "hbox", items : [
			{
			    xtype: 'textfield',
				labelWidth : 280,
				labelAlign : "left",
				width: 380,
				fieldLabel: "Enter Patient Identification (SSN) to query <abbr title=\"Computerized Patient Record System\">CPRS</abbr>",
		        name: 'CPRS_QueryString'
			},
			{ 
				xtype : "container", 
				name : "PatientQuery", 
				html : "&nbsp;<button type=\"button\" class=\"anchor\" name=\"QueryCPRS4Patient\">Query CPRS for Patient</button>" 
			}
		]},
        { xtype: 'box', margin: "10 60 10 60", autoEl: { tag: 'div', style: "background: #EFEFEF; padding: 0.5em; border: thin solid navy;", html: '(Note: For testing purposes, there are hundreds of patients available between 0010 and 0603. To search for a patient, use the spelling of the number for a last name and the number. For example: <b>FiveHundredTwenty, Patient</b> would be <b>f0520</b> or <b>OneHundredThirty, Patient</b> would be <b>o0130</b>).' } },
		{ xtype : "SelectPatient" }
	]
});