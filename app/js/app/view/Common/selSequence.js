Ext.define('COMS.view.Common.selSequence' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selSequence',
	name : 'Sequence',

//	store : 'TemplateSources',
	store : { 
		fields : ["id"]
	},
	queryMode : "local",

        emptyText: "",
	width: 250,
	labelWidth: 125,
	fieldLabel: 'Select Sequence <em>*</em>',
	labelAlign: 'right',
	displayField: 'id',
	valueField: 'id',
        allowBlank: false,
	margin: '5 0 5 0',

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
    }
});
