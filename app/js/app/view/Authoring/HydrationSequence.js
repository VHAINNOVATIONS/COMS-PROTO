Ext.define('COMS.view.Authoring.HydrationSequence', {
	extend: 'Ext.window.Window',
	alias : 'widget.HydrationSequence',

	title : 'Information',
	layout: 'fit',
	autoShow: true,
	width: 440,
    height: 150,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
			defaults : { labelAlign: 'top', margin: '5'},
			items: [
                            {
                                xtype: 'radiogroup',
                                fieldLabel: 'You have entered a duplicate sequence number. Would you like to',
                                itemId: 'sequenceRadios',
                                columns: 1,
                                items: [
                                            { boxLabel  : 'Apply Next Sequence Number', name : 'ApplySequence', inputValue: '0'  }, 
                                            { boxLabel  : 'Insert as Entered and Re-sequence Drugs', name  : 'ApplySequence', inputValue: '1'  }
                                    ]
                            }
                        ]}];
                                    
		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', scope: this, handler: this.close }
		];

		this.callParent(arguments);
	}
});