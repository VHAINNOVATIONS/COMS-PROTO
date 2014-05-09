Ext.define('COMS.view.Management.SelectGlobals' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.SelectGlobals',
	name : 'Select Lookup Control',

	store : "GlobalStore",
	labelWidth: 150,
	fieldLabel: 'Select Global Type',
	displayField: 'value',
	valueField: 'sitelist'
});