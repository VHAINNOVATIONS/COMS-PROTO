Ext.define('COMS.view.NavigationTabs' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.NavigationTabs',
    name : 'Main Navigation Tabs',

// Add these when working through rest of panels - MWB 1/2/2014
// resizable: true,
// autoScroll : true,
    plain : true,
	
/************** WORK IN PROGRESS...
	tabBar : {
		items : [{ xtype : "checkbox", margins: "0 0 0 100", labelWidth : 200, labelAlign: "right", fieldLabel : "Use Accessibility Theme",
			listeners : { 
			**
				beforerender : { fn : function(ckBox, eOpts) {
					var temp = COMS_theme;
					if( "access" === temp) {
						ckBox.setValue(true);
					}
					else {
						ckBox.setValue(false);
					}
				}},
			 **

				change : { fn : function(ckBox, nValue, oValue, eOpts) {
					var temp = COMS_theme;
					if (nValue) {
						Ext.util.Cookies.set('theme', "access");
						location = location; // Refresh of page cannot be avoided as its an Ext-JS limitation
					}
					else {
						Ext.util.Cookies.set('theme', "default");
						location = location; // Refresh of page cannot be avoided as its an Ext-JS limitation
					}
				}}
			}
		}]
	},
************/
    initComponent: function() {
        wccConsoleLog("Navigation Tabs View - Initialization");

        // Based on the "Sessionrole" set in main.php ($role = $_SESSION['role'];)
        // determine who can see what tabs.
        // The same process can be used to show/hide various other elements such as buttons 
        if ("Administrator" === Sessionrole || "All Roles" === Sessionrole) {
			// this.activeTab = 6;	Opens the "Testing" Tab by default
            this.items = [
                { title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
                ,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
                ,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
                ,{ title : 'Template List', items : [ { xtype : 'TemplateListTab'} ] }
				,{ title : 'Template Promotion', items : [ {xtype : 'TemplatePromotionTab' }]}
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
                ,{ title : 'Site Configuration', items : [ {xtype : 'AdminTab' }]}

				// ,{ title : 'Testing', items : [ {xtype : 'DischargeInstructions', margin: "10" }]}
            ];
        }
        else if ("1" === SessionTemplateAuthoring) {
            this.items = [
                { title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
                ,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
                ,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
                ,{ title : 'Template List', items : [ { xtype : 'TemplateListTab'} ] }
                ,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
            ];
        }
        else {
            this.items = [
                { title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
                ,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
                ,{ title : 'Template List', items : [ { xtype : 'TemplateListTab'} ] }
                ,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
            ];
        }
        this.callParent(arguments);
    }
});