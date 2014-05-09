Ext.define("COMS.view.Management.BlankTab" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.BlankTab",
	"name" : "BlankTab",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "htmleditor", "name" : "Documentation", "fieldLabel" : "Documentation", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" }
	]
});
