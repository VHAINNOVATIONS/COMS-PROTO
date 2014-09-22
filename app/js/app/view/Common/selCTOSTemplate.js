Ext.define("COMS.view.Common.selCTOSTemplate", {
	"extend" : "Ext.container.Container",
	"alias" : "widget.selCTOSTemplate",
	"name" : "selCTOSTemplate",
	"autoEl" : { "tag" : "section" },
	"margin" : "0",
	"items" : [
		{ "xtype" : "Search4Template", "hidden": false },
		{ "xtype" : "container",
			"layout" : "hbox",
			"items" : [
				{ "xtype" : "selTemplateSrc" },
				{ 
					"xtype" : "button", 
					"title" : "ResetFilter",
					"text" : " Show All Templates ", 
					"margin" : "5 0 0 5",
					"hidden" : true
				}
			]
		},
		{ 
			"xtype" : "box", "autoEl" : "div", "cls" : "centeredMsg", "name" : "AllTemplatesShownMsg", 
			"html" : "All templates now available for selection", "hidden" : true 
		},
		{ "xtype" : "selDiseaseAndStage", "margin" : "5 0 5 0" },
		{ "xtype" : "selTemplate", "name" :"AllTemplates"}
	]
});