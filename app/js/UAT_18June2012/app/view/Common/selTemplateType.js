Ext.define('COMS.view.Common.selTemplateType' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selTemplateType',
	name : 'Select Template Type',
	store : 'TemplateSources',
	emptyText: "",
	width: 300,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template Source',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id',
	margin: '5 0 5 0',

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
    }
});
