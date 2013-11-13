Ext.define('COMS.view.Management.EditLookup', {
	extend: 'Ext.window.Window',
	alias : 'widget.EditLookup',

	title : 'Edit Lookup',
	layout: 'fit',
	autoShow: true,
	width: 640,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
            layout: 'hbox',
			defaults : { labelAlign: 'right', margin: '5 5 5 0'},
			items: [
				{ xtype: 'textfield', name : 'name', labelWidth: 50, width: 270, fieldLabel: 'Name' },
				{ xtype: 'textfield', name : 'description', labelWidth: 80, width: 340, fieldLabel: 'Description' }
			]
		} ];

		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', action: 'cancel' }
		];

		this.callParent(arguments);
	}
});