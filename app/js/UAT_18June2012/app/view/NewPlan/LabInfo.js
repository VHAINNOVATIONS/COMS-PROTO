Ext.define('COMS.view.NewPlan.LabInfo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.LabInfo',
	name : 'Patient Laboratory Information',

	autoEl : { tag : 'section' },
	cls : 'xPandablePanel',
	width: 950,
	collapsible : true,
	collapsed : true,

	title : "Laboratory Information",
	height: 300,

	store : "LabInfo",	// ??? <-- Create store dynamically from the model to pass Patient ID to the model via the Proxy.

	features: [ Ext.create('Ext.grid.feature.Grouping')	],
	columns : [
        { header: 'ID', dataIndex : 'ID', hidden : true },
        { header: 'Date', dataIndex : 'relDate' },
        { header: 'Collection Date', dataIndex : 'specColDate' },
		{ header: 'Lab Tech', dataIndex : 'author' },
        { header: 'Specimen', dataIndex : 'specimen', hidden : true },		// <-- This is the default field to be grouped on, so we hide it but still make it available if the user regroups the grid
        { header: 'Info', dataIndex : 'specInfo' },
		{ header : "Name", dataIndex : "name" },
		{ header : "Result", dataIndex : "result" },
		{ header : "Acceptable Range", dataIndex : "acceptRange" },
		{ header : "OUT of Range", dataIndex : "outOfRange" },
        { header: 'comment', dataIndex : 'comment' }
	]
});
