Ext.define("COMS.view.Management.Roles", {
	"extend": "Ext.form.Panel",
	"alias": "widget.Roles",
	"name": "Roles",
	"title": "COMS Users Roles",
	"autoEl": {
		"tag": "section"
	},
	"defaults": {
		"labelAlign": "right",
		"labelClsExtra": "NursingDocs-label"
	},
	"items": [
		{"xtype": "RequiredInstr"},
		{
			"xtype": "container",
			"layout": "hbox",
			"margin" : "0 0 10 0",
			"defaults" : {"margin" : "0 10 0 0" },
			"items": [
				{
					"xtype" : "textfield",
					"name" : "name",
					"fieldLabel" : "Name <em class=\"required-field\">*</em>",
					"labelWidth": 50,
					"width": 190,
					"allowBlank" : false
				}, 
				{
					"xtype" : "textfield",
					"name" : "email",
					"fieldLabel" : "Email Address <em class=\"required-field\">*</em>",
					"labelWidth": 90,
					"width": 220,
					"vtype" : "email"
				}, 
				{
					"xtype" : "textfield",
					"name" : "AccessCode",
					"fieldLabel" : "Access Code <em class=\"required-field\">*</em>",
					"labelWidth": 85,
					"width": 200,
					"allowBlank" : false
				},
/**

				{
					"xtype": "combo",
					"name": "Label",
					"fieldLabel": "User",
					"labelWidth": 35,
					"width": 200,
					"displayField": "Description",
					"valueField": "Lookup_ID",
	store: {
		// autoLoad: true,
        autoLoad: false,
		fields: ["Lookup_ID", "Description"],
		proxy: {
			type: "rest",
			url: "/Admin/Users",
			reader: {
				type: "json",
				root: "records"
			}
		}
	}
				},
**/
				{
					"xtype": "combo",
					"name": "Role",
					"fieldLabel": "Role <em class=\"required-field\">*</em>",
					"labelWidth": 40,
					"width": 120,
					"queryMode": "local",
					"displayField": "name",
					"valueField": "name",
					"store": Ext.create("Ext.data.Store", {
						"fields": ["name"],
						"data": [
							{ "name": "All Roles" },
							{ "name": "Provider" },
							{ "name": "Nurse" },
							{ "name": "Pharmacist" }
						]
					})
				},
				{ "xtype" : "checkbox",  "name" : "TemplateAuthoring", "labelWidth" : 110, "fieldLabel" : "Template Authoring" }
			]
		},
		{
			"xtype": "ManagementBtns"
		},
		{
			"xtype": "grid",
			"name": "RolesList",
			"title": "User Roles",
			"autoScroll": "y",
			"cls" : "custom-grid",
			"columnLines" : true,
			"viewConfig" : {
				"stripeRows" : true,
				"height" : 600,
				"forceFit" : true
			},
			"store" : {
				"autoLoad" : false,
					// username, role, displayname, email, templateAuthoring
				"fields" : [ "rid", "username", "vcode", "role", "lastlogin", "DisplayName", "Email", "TemplateAuthoring", "Role_ID", "Last_SessionID" ],
				"proxy" : {
					"type" : "rest",
					"url" : "/Admin/UserRoles",
					"reader" : {
						"type" : "json",
						"root" : "records"
					}
				}
			},
			"columns" : [
				{
					"header" : "Name",
					"dataIndex" : "DisplayName",
					"width" : 120
				},
				{
					"header" : "Email Address",
					"dataIndex" : "Email",
					"width" : 180
				},
				{
					"header" : "Access Code",
					"dataIndex" : "username",
					"width" : 120
				},
				{
					"header" : "Role",
					"dataIndex" : "role",
					"width" : 120
				},
				{
					"header" : "Template Authoring",
					"dataIndex" : "TemplateAuthoring",
					"renderer" : function (value, p, record) {
						if (value) {
							return "Yes";
						}
						return "No";
					},
					"width" : 120
				}
			]
		}
	]
});
