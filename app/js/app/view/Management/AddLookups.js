Ext.define("COMS.view.Management.AddLookups" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.AddLookups",
	"name" : "Add Lookups",
	// "id" : "addLookup",
	"title" : "Add Lookups",
	"store" : "LookupStore",
	"items" : [
		{
			"xtype" : "form",
			"margin" : "10 10 10 10",
			"layout" : "hbox",
			"defaults" : { "margin" : "5 5 5 0", "labelAlign" : "right", "labelWidth" : 160, "width" : 300 },
			"items" : [
				{
					"xtype" : "SelectLookups",
					"itemId" : "lookupType",
					"name" : "id",
					"labelWidth" : 130
				},
				{
					"xtype" : "textfield",
					"name" : "value",
					"fieldLabel" : "Enter Lookup Name"
				},
				{
					"xtype" : "textfield",
					"name" : "description",
					"fieldLabel" : "Enter Lookup Description"
				}
			]
		},
		{ "xtype" : "ManagementBtns"},
		{
			"xtype" : "grid",
			"forceFit" : true,
			"overflowY" : "scroll",
			"minHeight" : 500,
			"margin" : "10 0 0 0",
			"multiSelect" : true,
			"name" : "GenericLookupGrid",

			"title" : "Current Selected Lookup Type Data",
			"store" : "GenericLookup",
			"columns" : [
				{ "header" : "Lookup Name",  "dataIndex" : "name",  "flex" : 1 },
				{ "header" : "Lookup Description", "dataIndex" : "description", "flex" : 1 }
			],
			"dockedItems" : [{
				"xtype" : "toolbar",
				"dock" : "bottom",
				"buttonAlign" : "right",
				"items" : [
					{
						"xtype" : "button",
						"text" : "Edit Lookup",
						"title" : "EditLookup",
						"disabled" : true
					},
					{
						"xtype" : "button",
						"text" : "Remove Lookup",
						"title" : "RemoveLookup",
						"disabled" : true
					}
				]
			}]
		}
	]
});