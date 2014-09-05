Ext.define('COMS.view.Common.selTemplate' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selTemplate',
	name : 'Select Template',
	store : 'Templates',
//	queryMode: 'local',
	width: 600,
	size : 60,
	labelWidth: 160,
	fieldLabel: 'Select a Template',
	labelAlign: 'right',
	displayField: 'description',
	valueField: 'id',
	hidden : true
});
