Ext.define('COMS.view.Common.selTemplate' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selTemplate',
	name : 'Select Template',

	store : 'Templates',
        queryMode: 'local',
	width: 600,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template',
	labelAlign: 'right',
	displayField: 'description',
	valueField: 'id',
	hidden : true,
//        listeners: {
//                scope: this,
//                beforequery: function(qe){
//                    if(qe.combo.lastValue == ''){
//                        //delete qe.combo.lastQuery;
//                    }
//                }
//                
//        },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});
