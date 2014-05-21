Ext.define('COMS.view.Common.selDisease' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDisease',
	name : 'Select Disease Control',

	store : 'DiseaseType',
    allowBlank: false,
	width: 500,
	size : 50,
	labelWidth: 150,
	fieldLabel: 'Select a type of cancer <em>*</em>',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id'
        
});
