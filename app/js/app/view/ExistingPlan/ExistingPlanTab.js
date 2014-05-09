Ext.define('COMS.view.ExistingPlan.ExistingPlanTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.ExistingPlanTab',
	name : 'Existing Plan Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});