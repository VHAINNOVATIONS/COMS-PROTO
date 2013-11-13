Ext.define('COMS.view.NavigationTabs' ,{
	extend: 'Ext.tab.Panel',
	alias : 'widget.NavigationTabs',
	name : 'Main Navigation Tabs',

	plain : true,

		// MWB - 5/28/2012 - Moved down to the initComponent so that we can control at load time who sees what tabs
//	items : [
//		{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
//		,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
//		,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
//		,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
//		,{ title : 'Admin', items : [ {xtype : 'AdminTab' }]}	// KD - 12/20/11 - Added new Tab  to PUT data back to PHP
//	],
	initComponent: function() {
		wccConsoleLog("Navigation Tabs View - Initialization");

		// Based on the "Sessionrole" set in main.php ($role = $_SESSION['role'];)
		// determine who can see what tabs.
		// The same process can be used to show/hide various other elements such as buttons 
		if ("Administrator" === Sessionrole || "All Roles" === Sessionrole) {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
				,{ title : 'Admin', items : [ {xtype : 'AdminTab' }]}	// KD - 12/20/11 - Added new Tab  to PUT data back to PHP
			];
		}
		else if ("1" === SessionTemplateAuthoring) {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
			];
		}
		else {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
			];
		}



		this.callParent(arguments);
	}
});