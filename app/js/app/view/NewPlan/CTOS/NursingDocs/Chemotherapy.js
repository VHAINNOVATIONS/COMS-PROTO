Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_Chemotherapy",
	name : "NursingDocs.Chemotherapy",
	title : "Chemotherapy / Biotherapy---",

	items : [ 
		{ "xtype" : "displayfield", "name" : "ndctRegimen", "fieldLabel" : "Regimen", "labelClsExtra" : "NursingDocs-label" },
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : "10", "name" : "NeutropeniaInfo", "title" : "---"}, 
		{ "xtype" : "panel", "collapsible" : true, "collapsed" : true, "margin" : "0 0 10 0", "bodyPadding" : "10", "name" : "EmesisInfo", "title" : "---"}, 
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