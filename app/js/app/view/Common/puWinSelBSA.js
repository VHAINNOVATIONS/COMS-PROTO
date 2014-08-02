Ext.define("COMS.view.Common.puWinSelBSA",{
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinSelBSA",
	"title" : "Body Surface Area (BSA) Method Selection",
	"name" : "puBSASelection",
	"closeAction" : 'hide',
	"width" : 360,
	"height" : 270,
	"minHeight" : 270,
	"layout" : 'fit',
	"resizable" : true,
	"modal" : true,
	"items" : [
		{
			"xtype" : "form",
			"layout" : { "type" : "vbox", "align" : "stretch" },
			"border" : false,
			"bodyPadding" : 10,
			"fieldDefaults" : {
				"labelAlign" : 'top',
				"labelWidth" : 100,
				"labelStyle" : 'font-weight:bold'
			},
			"defaults" : {
				"margins" : '0 0 10 0'
			},

			"items" : [
				{
					"xtype" : "combo",
					"name" : "WeightFormula",
					"fieldLabel" : "Weight to use <em>*</em>",
					"labelAlign" : "top",
					"width" : 178,
					"labelStyle" : "font-weight: bold",
					"store" : {
							"fields" : ["weightType"],
							"data" : [ 
									{ "weightType" : "Actual Weight" },
									{ "weightType" : "Ideal Weight" },
									{ "weightType" : "Adjusted Weight" },
									{ "weightType" : "Lean Weight" },
									{ "weightType" : "Other" }
							]
					},
					"queryMode" : "local",
					"displayField" : "weightType"
				},
				{
					"xtype" : "combo",
					"name" : "BSAFormula",
					"fieldLabel" : "BSA Formula <em>*</em>",
					"labelAlign" : "top",
					"width" : 178,
					"labelStyle" : "font-weight: bold",
					"store" : {
						"fields" : ["formula"],
						"data" : [ 
							{ "formula" : "DuBois" },
							{ "formula" : "Mosteller" },
							{ "formula" : "Haycock" },
							{ "formula" : "Gehan and George" },
							{ "formula" : "Boyd" },
							{ "formula" : "Capped" }
						]
					},
					"queryMode" : "local",
					"displayField" : "formula"
				}
			],
			"buttons" : [
				{ "text" : "Save", "scope" : this },
				{ "text" : "Cancel" }
			]
		}
	]
});
