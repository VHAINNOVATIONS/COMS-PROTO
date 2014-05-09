Ext.define('COMS.view.Common.selTempLoc' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selTemperatureLoc',
	name : 'Select Temperature Location',

	width: 500,
	size : 50,
	labelWidth: 150,
	displayField: 'name',
	valueField: 'name',
    fieldLabel: "Temperature Location"
});
