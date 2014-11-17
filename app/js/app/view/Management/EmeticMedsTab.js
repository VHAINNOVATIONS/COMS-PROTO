Ext.define("COMS.view.Management.EmeticMedsTab" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.EmeticMedsTab",
	"name" : "EmeticMedsTab",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ { "xtype" : "EmeticMeds" } ]
});
