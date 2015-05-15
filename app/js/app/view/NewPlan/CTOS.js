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

	initComponent: function() {
		wccConsoleLog("Chemotherapy Template Order Source View - Initialization");
		var ApplyBtn = { xtype : "container", name : "Apply", html : "", hidden : true, margin: '0 0 10 50' };
		var EditBtn = { xtype : "container", name : "Edit", html : "", hidden : true, margin: '0 0 10 50' };
		var What2DoBtns;
		
		if ("Provider" === Sessionrole || "All Roles" === Sessionrole) {
			if ("1" == SessionPreceptee) {
				ApplyBtn = { xtype : "button", name : "Apply", text : "Apply Template to Patient - Requires Cosigner", hidden : true, margin: '0 0 10 50' };
				What2DoBtns = [ 
					{ boxLabel  : 'Select Template currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'}, 
					{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'}
				];
			}
			else {
				ApplyBtn = { xtype : "button", name : "Apply", text : "Apply Template to Patient", hidden : true, margin: '0 0 10 50' };
				What2DoBtns = [ 
					{ boxLabel  : 'Select Template currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'}, 
					{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'},
					{ boxLabel  : 'Approve Pending Template', name  : 'NewPlan_What2Do', inputValue: '2', hidden: true}
				];
			}
			if("1" === SessionTemplateAuthoring) {
				EditBtn = { xtype : "button", name : "Edit", text : "Edit Template", hidden : true, margin: '0 0 10 5' };
			}
		}

		if ("Administrator" === Sessionrole || "All Roles" === Sessionrole || "1" === SessionTemplateAuthoring) {
			this.items = [
				{
					title: "Chemotherapy Template Order Source",
					items : [
						{ xtype : "form", name: "NewPlan_CTOS_Form", items : [
							{ xtype : 'fieldcontainer', name : 'NewPlan_What2Do_Btns', hidden: true,
								fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
								defaultType: 'radiofield', defaults: { flex: 1 },
								items: What2DoBtns
							},
							{ xtype : 'selTemplate', name : 'MyTemplates'},		/* Select Existing Template */
							{ xtype : "selCTOSTemplate", hidden : true },
							{ xtype : 'dspTemplateData'},
							ApplyBtn, 
							EditBtn
						]}
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology", hidden : true },
				{ xtype : "KnowledgeBase", hidden : true }
			];
		}
		else {
			this.items = [
				{
					title: "Chemotherapy Template Order Source",
					items : [
						{ xtype : 'fieldcontainer', name : 'NewPlan_What2Do_Btns', hidden: true,
							fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
							defaultType: 'radiofield', defaults: { flex: 1 },
							items: What2DoBtns
						},
						{ xtype : 'selTemplate', name : 'MyTemplates'},
						{ xtype : "selCTOSTemplate", hidden : true },
						{ xtype : 'dspTemplateData'}
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology", hidden : true },
				{ xtype : "KnowledgeBase", hidden : true }
			];
		}
		this.callParent(arguments);
	}
});
