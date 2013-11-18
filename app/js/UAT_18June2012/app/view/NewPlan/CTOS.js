/*
 *	MWB - 12/5/2011
 *	Chemotherapy Template Order Source View
 *	This view maintains all the controls for selecting and modifying a Chemotherapy Order Template for a specific Patient
 *	Note that when a new template is saved in this section it will be flagged as created by the current author and also classed as local for this VA facility
 *	It will also be linked to the currently selected patient (the GUID for the newly created template will be placed in the currently selected patients record
 *	It is rendered in the New Plan Tab once a patient has been selected.
 *	This view is managed by the 'CTOS' Control
 */
Ext.define("COMS.view.NewPlan.CTOS", {
	extend: "Ext.tab.Panel",
    alias : "widget.CTOS",

	name : "CTOS Tabs",

	margin : '0 0 20 0',
	plain : true,
	autoEl : { tag : 'nav' },
	width: 950,


	initComponent: function() {
		wccConsoleLog("Chemotherapy Template Order Source View - Initialization");

		// Based on the "Sessionrole" set in main.php ($role = $_SESSION['role'];)
		// determine who can see what tabs.
		// The same process can be used to show/hide various other elements such as buttons 

		if ("Administrator" === Sessionrole || "All Roles" === Sessionrole || "1" === SessionTemplateAuthoring) {
			this.items = [

				{
					title: "Chemotherapy Template Order Source",
					items : [
/***
						{ xtype : 'fieldcontainer', 
							fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
							defaultType: 'radiofield', defaults: { flex: 1 },
							items: [ 
								{ boxLabel  : 'Select from Templates currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'  }, 
								{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'  }
							]
						},
***/
//						{ xtype : 'selTemplate', name : 'MyTemplates'},
//						{ xtype : "selCTOSTemplate", hidden : true },
						{ xtype : "selCTOSTemplate" },
						{ xtype : 'dspTemplateData'},
						{ xtype : "button", name : "Apply", text : "Apply Template to Patient", hidden : true, margin: '0 0 10 50' },
						{ xtype : "button", name : "Edit", text : "Edit Template", hidden : true, margin: '0 0 10 5' }
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology", hidden : true },
				{ xtype : "KnowledgeBase", hidden : true }		// MWB - 7/16/2012 - Per e-mail from Sean this date, do not show KBase Tab, used "hidden" in case any functions expect the tab to be there
			];
		}
		else {
			this.items = [
				{
					title: "Chemotherapy Template Order Source",
					items : [
/***
						{ xtype : 'fieldcontainer', 
							fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
							defaultType: 'radiofield', defaults: { flex: 1 },
							items: [ 
								{ boxLabel  : 'Select from Templates currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'  }, 
								{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'  }
							]
						},
***/
//						{ xtype : 'selTemplate', name : 'MyTemplates'},
//						{ xtype : "selCTOSTemplate", hidden : true },
						{ xtype : "selCTOSTemplate" },
						{ xtype : 'dspTemplateData'}
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology" },
				{ xtype : "KnowledgeBase" }
			];
		}
		this.callParent(arguments);
	}
});
