Ext.define("COMS.view.Management.ClinicInfo" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.ClinicInfo",
	"name" : "ClinicInfo",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "textfield", "name" : "Label", "fieldLabel" : "Clinic Information Label", "labelWidth" : 200, "width" : 900},
		{ "xtype" : "htmleditor", "name" : "Details", "fieldLabel" : "Details", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" },

		{ "xtype" : "ManagementBtns"},

		{  
			"xtype" : "grid",  "name" : "ClinicInfoList", "title" : "Clinic Information", 
			"store" : "ClinicInfo",
			"multiSelect" : true,
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",

			"columns" : [ 
				{ "text" : "Label", "dataIndex" : "Label", "flex" : 1}, 
				{ "text" : "Details", "dataIndex" : "Details", "flex" : 3 }
			]
		}
	]
});
