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
					"name" : "LastName",
					"fieldLabel" : "Last Name <em class=\"required-field\">*</em>",
					"labelWidth": 80,
					"width": 190,
					"allowBlank" : false
				}, 
				{
					"xtype" : "textfield",
					"name" : "FirstName",
					"fieldLabel" : "First Name <em class=\"required-field\">*</em>",
					"labelWidth": 80,
					"width": 190,
					"allowBlank" : false
				}, 
				{
					"xtype" : "button",
					"name" : "GetUserList",
					"text" : "Get Users"
				}
			]
		},
		{
			"xtype": "container",
			"layout": "hbox",
			"margin" : "0 0 10 0",
			"defaults" : {"margin" : "0 10 0 0" },
			"items": [
				{
					"xtype": "combo",
					"name": "SelVistAUser",
					"fieldLabel": "Users",
					"labelWidth": 35,
					"width": 200,
					"displayField": "name",
					"valueField": "duz",
					"typeAhead" : true,
					"hidden" : true,
					"store" : {
						"fields" : ["name", "duz"],
						"proxy" : {
							"type" : "rest",
							"reader" : {
								"type" : "json",
								"root" : "records"
							}
						}
					}
				},
			{
					"xtype" : "box", "name" : "SelVistAUserNoMatch", "html" : "No match for name entered, please select from choices provided", "hidden" : true 
			},
				{
					"xtype": "combo",
					"name": "Role",
					"hidden" : true,
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
				{ 
					"xtype" : "checkbox",
					"name" : "TemplateAuthoring",
					"labelWidth" : 110,
					"fieldLabel" : "Template Authoring",
					"hidden": true 
				}
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
				"fields" : [ "rid", "username", "vcode", "role", "lastlogin", "DisplayName", "TemplateAuthoring", "Role_ID", "Last_SessionID" ],
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
					"header" : "DUZ",
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