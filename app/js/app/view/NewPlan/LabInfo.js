Ext.define('COMS.view.NewPlan.LabInfo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.LabInfo',
	name : 'Patient Laboratory Information',

	autoEl : { tag : 'section' },
	cls : 'xPandablePanel',
	collapsible : true,
	collapsed : true,

	title : "Laboratory Information",
	height: 300,

	store: Ext.create("Ext.data.Store", {
		fields:["date", "name", "comment", "result", "sample", "specimen", "units"],
		groupField: "date",
		proxy: {
			type: "memory",
			reader: {
				type: "json",
				root: "items"
			}
		}
	}),
	
	features: [ 
		{
			ftype: "grouping",
			groupHeaderTpl: [
				"{name} : ({[values.children.length]}) Lab{[values.children.length> 1 ? 's' : '']}"
			],
			startCollapsed: true
		}
	],
	columns : [
		// { header: 'Date', dataIndex : 'date' },
		{ header: "Name", dataIndex : "name", width : 50 },
		// { header: 'Collection Date', dataIndex : 'specColDate' },
		// { header: 'Lab Tech', dataIndex : 'author' },
		{ header: 'Specimen', dataIndex : 'specimen' },
		{ header: 'Sample', dataIndex : 'sample' },
		// { header: 'Info', dataIndex : 'specInfo' },
		{ header: "Result", dataIndex : "result", 
			renderer: function(value, p, record) {
				return (value + " " + record.getData().units);
			}
		},
		// { header: "Units", dataIndex : "units" },
		// { header: "Acceptable Range", dataIndex : "acceptRange" },
		// { header: "OUT of Range", dataIndex : "outOfRange" },
		{ header: 'comment', dataIndex : 'comment', flex : 1 }
	]
});
