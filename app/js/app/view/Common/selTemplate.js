Ext.define('COMS.view.Common.selTemplate' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selTemplate',
	name : 'Select Template',

	store : 'Templates',
<<<<<<< HEAD
	queryMode: 'local',
=======
        queryMode: 'local',
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
	width: 600,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template',
	labelAlign: 'right',
	displayField: 'description',
	valueField: 'id',
	hidden : true,
<<<<<<< HEAD
=======
//        listeners: {
//                scope: this,
//                beforequery: function(qe){
//                    if(qe.combo.lastValue == ''){
//                        //delete qe.combo.lastQuery;
//                    }
//                }
//            
//        },
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});
