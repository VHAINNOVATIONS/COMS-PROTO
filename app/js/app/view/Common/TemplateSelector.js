Ext.define("COMS.view.Common.TemplateSelector" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.TemplateSelector",
	"autoEl" : { "tag" : "section" },
	"items"  : [
		{
			"xtype"      : "radiogroup",
			"cls"        : "TemplateSelectorRB",
			"fieldLabel" : "Select a Template Source <em>*</em>",
			"width"        : "75%",
			"labelWidth"   : "25%",

			"columns"    : 3,
			"items"      : [
				{ "boxLabel" : "My Templates", "name" : "templateSrc", "inputValue" : "1" },
				{ "boxLabel" : "Local Templates", "name" : "templateSrc", "inputValue" : "2"},
				{ "boxLabel" : "National Templates", "name" : "templateSrc", "inputValue" : "3" }
			]
		},
		{
			"xtype"        : "combo",
			"name"         : "CancerSelector",
			"cls"          : "TemplateSelectorC",
			"hidden"       : false,
			"width"        : "75%",
			"labelWidth"   : "25%",
			"fieldLabel"   : "Select type of Cancer",
			"displayField" : "name",
			"valueField"   : "ien",
			"store"        : "CancerList"
		},
		{
			"xtype"        : "combo",
			"cls"          : "TemplateSelectorS",
			"hidden"       : false,
			"width"        : "75%",
			"labelWidth"   : "25%",
			"fieldLabel"   : "Select Cancer Stage",
			"displayField" : "name",
			"valueField"   : "ien",
			"store"        : "CancerStageList"
		},
		{
			"xtype"        : "combo",
			"cls"          : "TemplateSelectorT",
			"hidden"       : false,
			"width"        : "75%",
			"labelWidth"   : "25%",
			"fieldLabel"   : "Select Template",
			"displayField" : "name",
			"valueField"   : "ien",
			"store"        : "TemplateList"
		}
	]
});