/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
Ext.define('COMS.view.NewPlan.CTOS.NursingDocs.Authenticate', {
	extend: 'Ext.window.Window',
	alias : 'widget.Authenticate',
	title : 'Authenticate',
	layout: 'fit',
	autoShow: true,
	width: 400,

	initComponent: function() {
            this.items = [ {
                    xtype: 'form',
                    cls: 'custom-form',
                    defaults : { labelAlign: 'top', margin: '5'},
                    items: [
							{ xtype : "RequiredFieldLabel" },
                            { xtype: "textfield", name : "AccessCode", labelWidth: 100, width: 178, fieldLabel: "Access Code <em>*</em>"  },
                            { xtype: "textfield", name : "VerifyCode", labelWidth: 100, width: 178, fieldLabel: "Verify Code <em>*</em>"  }
                    ]
            } ];
            
            this.buttons = [
                    { text: 'Sign Record', action: 'save' },
                    { text: 'Cancel', scope: this, handler: this.close }
            ];

            this.callParent(arguments);
	}
});
