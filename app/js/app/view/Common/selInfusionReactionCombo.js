Ext.define("COMS.view.Common.selInfusionReactionCombo" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selInfusionReaction",
	"name" : "Select Infusion Reactions",
	"store" : Ext.create("Ext.data.Store", {
		"fields" : [ "id", "date", "author" ],
		"proxy" : {
			"type" : "rest",
			"reader" : {
				"type" : "json",
				"root" : "records"
			}
		}
	}),

	"width" : 300,
	"displayField" : "date",
	"valueField" : "id",
	"labelWidth" : 120,
	"labelAlign" : "right",
	"fieldLabel" : "Infusion Reactions"
});
