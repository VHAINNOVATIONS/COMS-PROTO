Ext.define("COMS.view.Common.selCTOSTemplate" ,{
	extend: "Ext.container.Container",
    alias : "widget.selCTOSTemplate",
	name : "sel CTOS Template",
	autoEl : { tag : "section" },
	margin: "0",
	items : [
		{ xtype : "Search4Template" },
		{ xtype: "container",
			layout : "hbox",
	        items : [
				{ xtype : "selTemplateType" },
				{ 
					xtype : "button", 
					title : "ResetFilter",
					text : " Show All Templates ", 
					margin: "5 0 0 5",
					hidden: true
				}
			]
		},
		{ "xtype" : "box", "autoEl" : "div", cls : "centeredMsg", "name" : "AllTemplatesShownMsg", "html" : "All templates now available for selection", "hidden" : true },
		{ xtype : "selDiseaseAndStage" },
        { xtype : "selTemplate", name:"AllTemplates"}
	]
});