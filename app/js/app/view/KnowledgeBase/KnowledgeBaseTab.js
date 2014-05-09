Ext.define('COMS.view.KnowledgeBase.KnowledgeBaseTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.KnowledgeBaseTab',
	name : 'Knowledge Base Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});


