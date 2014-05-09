Ext.define('COMS.view.Common.selDiseaseAndStage' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.selDiseaseAndStage',
	name : 'sel Disease Type/Stage',

	autoEl : { tag : 'section' },
	layout : 'hbox',
	hidden : true,
	hideMode : 'offsets',
	items : [
		{ xtype : 'selDisease' },
		{ xtype : 'selDiseaseStage' }
	]
});