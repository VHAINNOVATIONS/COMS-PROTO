Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_Chemotherapy",
	name : "NursingDocs.Chemotherapy",
	title : "Chemotherapy / Biotherapy",

	items : [ 
		{ "xtype" : "displayfield", "name" : "ndctRegimen", "fieldLabel" : "Regimen", "labelClsExtra" : "NursingDocs-label" },
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : "10", "name" : "NeutropeniaInfo", "title" : ""}, 
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : "10", "name" : "EmesisInfo", "title" : ""}, 
		{ "xtype" : "box", "name" : "ndctWarning"}, 
		{ 
			xtype : "container", 
			name : "ndctCycleInfo",
			layout : "hbox",
			defaults : {
				labelAlign: "right",
				xtype : "displayfield",
				labelClsExtra : "NursingDocs-label"
			},
			items : [ { name : "ndctCycle", fieldLabel : "Cycle" }, { name : "ndctDay", fieldLabel : "Day"}, { name : "ndctDate", fieldLabel : "Date" } ]
		}
	]
});

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
