Ext.define('COMS.view.Management.ManagementTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.ManagementTab',
	name : 'Management Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});

