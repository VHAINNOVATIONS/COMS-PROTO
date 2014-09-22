Ext.define('COMS.view.Common.Search4Template' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.Search4Template',

	layout : 'hbox', 
	items : [
		{ 
			xtype: 'textfield', 
			name : 'CancerTypeSearch', 
			margin: '5 0 0 0', 
			width: 500, 
			size : 50, 
			labelWidth: 160, 
			fieldLabel: 'Search', 
			labelAlign: 'right' 
		},

		{ 
			xtype : 'button', 
			text : 'Search', 
			margin: '5 0 0 3' 
		}
	]
});
