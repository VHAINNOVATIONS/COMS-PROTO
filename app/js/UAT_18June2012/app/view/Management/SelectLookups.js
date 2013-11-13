Ext.define('COMS.view.Management.SelectLookups' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.SelectLookups',
	name : 'Select Lookup Control',

	store : 'LookupStore',
	labelWidth: 150,
	fieldLabel: 'Select Lookup Type',
	displayField: 'value',
	valueField: 'id'
});