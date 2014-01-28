Ext.define("COMS.view.NewPlan.PatientSelection" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientSelection",
	name : "PatientSelection",

	cls : "xPandablePanel",

	collapsible : true,
	collapsed : false,
	title : "Patient Selection",
/** NEW **
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
** END NEW **/


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

		{ xtype : "container", margin: 0, contentEl : "SelectionOr" },
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
		{ xtype : "container", margin: 0, contentEl : "TestInfo" },
		{ xtype : "SelectPatient" }
	]
});