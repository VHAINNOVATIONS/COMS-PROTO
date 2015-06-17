Ext.define("COMS.view.Management.PharmacyManagement" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.PharmacyManagement",
	"name" : "PharmacyManagement",
	"autoEl" : { "tag" : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "box", "html" : "<em style=\"font-weight: bold; color: red;\">Note:</em> Information is required to permit interopability with associated VistA instance pharmacy packages"},
		{ "xtype" : "displayfield", "labelWidth" : 150, "width" : 300, "name" : "LastSyncTime", "fieldLabel" : "<em>Last Synchronization</em>", "margin" : "20 0" },
		{ "xtype" : "button", "name" : "Submit", "text" : "Synchronize Medication Lists", "formBind" : true }
	]
});