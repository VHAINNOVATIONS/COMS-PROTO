Ext.define("COMS.view.Common.selTemplate", {
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selTemplate",
	"name" : "Select Template",
	"store" : "Templates",
	"width" : 600,
	"size" : 60,
	"labelWidth" : 190,
	"fieldLabel" : "Select a Template <em>*</em>",
	"labelAlign" : "right",
	"displayField" : "description",
	"valueField" : "id",
	"hidden" : true
});
