/*
 *	Since this widget is a window, it's not a sub object to any other class when attempting to get a handle to it.
 *	Hence it's reference is : Ext.ComponentQuery.query('AddReference')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddReference button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddReference button[action="save"]')[0].el.dom
 */	
Ext.define('COMS.view.Authoring.AddReference', {
	extend: 'Ext.window.Window',
	alias : 'widget.AddReference',

	title : 'Add New Reference',
	layout: 'fit',
	autoShow: true,
	width: 600,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
			defaults : { labelAlign: 'right', width: 580, margin: '5 0 5 0'	},
			items: [
				{	xtype : 'combo',
					fieldLabel : 'Select Reference', 
					name : 'SelReference', 
					store : 'LUReferences', 
					displayField: 'name',
					valueField: 'description'
				},
				{ xtype : 'container', html : '<div style="text-align:center;">OR Enter a new reference below</div>' },
				{ xtype: 'textfield', name : 'Reference', fieldLabel: 'Reference' },
				{ xtype: 'textfield', name : 'ReferenceLink', fieldLabel: 'URL' }
			]
		} ];

		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', action: 'cancel' }
		];

		this.callParent(arguments);
	}
});