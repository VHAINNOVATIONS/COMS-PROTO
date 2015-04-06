Ext.define("COMS.view.NewPlan.CTOS.NursingDocs" ,{
	extend : "Ext.container.Container",
	alias : "widget.NursingDocs",
	name : "Nursing Documentation Tabs",
	title: "Treatment Documentation",
	padding : "10",
	bodyCls : "Level1",
	bodyStyle: {
		background: '#ffc',
		padding: '10px'
	},

	items : [
		{ xtype : "NursingDocs_Chemotherapy", cls : "Level1" },
		{ xtype : "tabpanel", name : "NursingDocsTabs", plain : true, autoEl : { tag : 'nav' },
			items : [
				{ xtype : "NursingDocs_GenInfo", padding : "10" },
				{ xtype : "NursingDocs_Assessment", padding : "10" },
				{ xtype : "NursingDocs_PreTreatment", padding : "10" },
				{ xtype : "NursingDocs_Treatment", padding : "10" },
				{ xtype : "NursingDocs_React_Assess", padding : "10" },
				{ xtype : "NursingDocs_Education", padding : "10" }
			]
		}
	]
});
