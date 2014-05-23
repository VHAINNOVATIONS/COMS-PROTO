Ext.define('COMS.view.Common.selDiseaseStage' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDiseaseStage',
	name : 'Select Disease Stage Control',

	store : 'DiseaseStage',
	displayField: 'Stage',
	valueField: 'ID',
	queryMode: 'local',
	fieldLabel: 'Disease Stage',
	labelAlign: 'right',
	width: 250,
	size : 10,
	labelWidth: 90
});
