Ext.define('COMS.view.Common.selDiseaseStage' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDiseaseStage',
	name : 'Select Disease Stage Control',
	"emptyText" : "Select a Cancer Stage",

	store : 'DiseaseStage',
	displayField: 'Stage',
	valueField: 'ID',
	queryMode: 'local',
	fieldLabel: 'Cancer Stage',
	labelAlign: 'right',
	width: 250,
	size : 10,
	labelWidth: 90
});
