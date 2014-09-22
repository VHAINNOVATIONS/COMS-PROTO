Ext.define("COMS.view.Common.selTemplateSrc", {
	"extend"      : "Ext.form.FieldContainer",
	"alias"       : "widget.selTemplateSrc",
	"width"       : 570,
	"labelWidth"  : 160,
	"fieldLabel"  : "Select a Template Source <em>*</em>",
	"labelAlign"  : "right",
	"margin"      : "5 0 5 0",
	"layout"      : "hbox",
	"defaultType" : "radiofield", 
	"defaults"    : {
		"margin"  : "0 10 0 0"
	},
	"items"       : [ 
		{
			"boxLabel"   : "My Templates", 
			"name"       : "SelectTemplateSrc", 
			"inputValue" : "My Templates"
		}, 
		{
			"boxLabel"   : "Local Templates", 
			"name"       : "SelectTemplateSrc", 
			"inputValue" : "Local Templates"
		},
		{
			"boxLabel"   : "National Templates", 
			"name"       : "SelectTemplateSrc", 
			"inputValue" : "National Templates"
		}
	]
});