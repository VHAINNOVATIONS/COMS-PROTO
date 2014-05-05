Ext.define("COMS.view.Management.SiteCommonInfo" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.SiteCommonInfo",
	"name" : "SiteCommonInfo",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "textfield", "name" : "Label", "fieldLabel" : "Reference Label", "labelWidth" : 140, "width" : 940},
		{ "xtype" : "htmleditor", "name" : "Details", "fieldLabel" : "Details", "labelAlign" : "top", "resizable" : true, "height" : 250, "width" : 940, "margin" : "0 0 10 0" },
		{ "xtype" : "container", "layout": "hbox", "items" : [
			{ "xtype" : "button", "text" : "Save", "scope" : this }, 
			{ "xtype" : "button", "text" : "Cancel", "scope" : this } 
		]},

		{  
			"xtype" : "grid",  "name" : "SiteCommonInfoList", "title" : "Site Common Information", 
			"store" : "SiteCommonInfo",
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
