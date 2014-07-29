Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_Chemotherapy",
	name : "NursingDocs.Chemotherapy",
	title : "Chemotherapy / Biotherapy",

	items : [ 
		{ "xtype" : "box", "name" : "Link2XternalFlowsheet", "html" : "" },
		{ "xtype" : "displayfield", "name" : "ndctRegimen", "fieldLabel" : "Regimen", "labelClsExtra" : "NursingDocs-label" },
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : 10, "name" : "NeutropeniaInfo"}, 
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : 10, "name" : "EmesisInfo"}, 
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