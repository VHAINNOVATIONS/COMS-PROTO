Ext.define("COMS.view.Management.LockoutTab" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.LockoutTab",
	"name" : "LockoutTab",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ { "xtype" : "Lockout" } ]
});
