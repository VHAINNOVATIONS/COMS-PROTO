var theMainItemsList = function(itemsInGroup) {
	var IIG_Panel = {
		xtype: "panel",
		title : "Performance Status <em>*</em>",
		name : "perfStatus",
		defaults : { labelAlign : "right", labelWidth: 300},
		items : [
			{
				xtype: 'radiogroup',
				name: 'perfStatusRadio',
				labelAlign: 'top',
				id: 'performanceRadios',
				margin: '5 5 25 5',
				columns: 1,
				items: itemsInGroup
			}
		]
	};
	return [
		{
			"xtype" : "form",
			"cls" : "custom-form",
			"defaults" : {
				"labelAlign" : "top",
				"margin" : "5"
			},
			"items" : [
				{
					"xtype" : "RequiredInstr"
				},
				{
					"xtype" : "datefield",
					"labelAlign" : "top",
					"name" : "startdate",
					"labelWidth" : 100,
					"width" : 178,
					"fieldLabel" : "Enter a Start Date <em>*</em>"
				}, 
				{
					"xtype" : "container",
					"layout" : "hbox",
					"defaults" : {
						"margin" : "5 10 5 0"
					},
					"items" : [{
						"xtype" : "combo",
						"name" : "BSA_FormulaWeight",
						"fieldLabel" : "Weight to use <em>*</em>",
						"labelAlign" : "top",
						"width" : 178,
						"labelStyle" : "font-weight: bold",
						"store" : {
							"fields" : ["weightType"],
							"data" : [{
								"weightType" : "Actual Weight"
							}, {
								"weightType" : "Ideal Weight"
							}, {
								"weightType" : "Adjusted Weight"
							}, {
								"weightType" : "Lean Weight"
							}, {
								"weightType" : "Other"
							}]
						},
						"queryMode" : "local",
						"displayField" : "weightType"
					}, {
						"xtype" : "combo",
						"name" : "BSA_Formula",
						"fieldLabel" : "BSA Formula <em>*</em>",
						"labelAlign" : "top",
						"width" : 178,
						"labelStyle" : "font-weight: bold",
						"store" : {
							"fields" : ["formula"],
							"data" : [{
								"formula" : "DuBois"
							}, {
								"formula" : "Mosteller"
							}, {
								"formula" : "Haycock"
							}, {
								"formula" : "Gehan and George"
							}, {
								"formula" : "Boyd"
							}, {
								"formula" : "Capped"
							}]
						},
						"queryMode" : "local",
						"displayField" : "formula"
					}]
				}, 
				{ 
					"xtype" : "container",
					"layout" : "hbox",
					"name" : "OtherWeightEntry",
					"hidden" : true,
					"defaults" : {
						"margin" : "5 5 5 0"
					},
					"items" : [
						{
							"xtype" : "textfield", 
							"name" : "OtherWeight", 
							"fieldLabel" : "Other weight to use <em>*</em>", 
							"labelWidth" : 170, 
							"labelAlign" : "right", 
							"width" : 220, 
							"labelStyle" : "font-weight: bold" 
						},
						{
							"xtype" : "box", "margin" : "10",
							"html" : "<span class=\"NursingDocs-boxLabel\">lbs.</span>"
						}
					]
				},

				{
					"xtype" : "radiogroup",
					"labelAlign" : "top",
					"name" : "goalRadio",
					"layout" : "hbox",
					"fieldLabel" : "Select the goal for this Regimen <em>*</em>",
					"columns" : 1,
					"items" : [{
						"boxLabel" : "Curative",
						"name" : "Goal",
						"inputValue" : "Curative",
						"width" : 100
					}, {
						"boxLabel" : "Palliative",
						"name" : "Goal",
						"inputValue" : "Palliative",
						"width" : 125
					}]
				}, 
				{
					"xtype" : "radiogroup",
					"name" : "ConcurRadTherapyRadio",
					"labelAlign" : "top",
					"layout" : "hbox",
					"fieldLabel" : "Patient undergoing concurrent radiation treatment <em>*</em>",
					"columns" : 1,
					"items" : [{
						"boxLabel" : "Yes",
						"name" : "ConcurRadTherapy",
						"inputValue" : true,
						"width" : 100
					}, {
						"boxLabel" : "No",
						"name" : "ConcurRadTherapy",
						"inputValue" : false,
						"width" : 125,
						"checked" : true
					}]
				}, 
				{
					"xtype" : "radiogroup",
					"name" : "clinicalTrialRadio",
					"labelAlign" : "top",
					"layout" : "hbox",
					"fieldLabel" : "Specify the type of clinical trial <em>*</em>",
					"columns" : 1,
					"items" : [{
						"boxLabel" : "Yes",
						"name" : "ClinicalTrial",
						"inputValue" : true,
						"width" : 100
					}, {
						"boxLabel" : "No",
						"name" : "ClinicalTrial",
						"inputValue" : false,
						"width" : 125,
						"checked" : true
					}]
				}, 
				{
					"xtype" : "textfield",
					"fieldLabel" : "Type of Trial",
					"width" : 178,
					"name" : "TypeOfTrial",
					"hidden" : true
				}, 
				{
					"xtype" : "radiogroup",
					"name" : "amputeeRadio",
					"labelAlign" : "top",
					"layout" : "hbox",
					"fieldLabel" : "Is the Patient an Amputee? <em>*</em>",
					"columns" : 1,
					"items" : [{
						"boxLabel" : "Yes",
						"name" : "Amputee",
						"inputValue" : true,
						"width" : 100
					}, {
						"boxLabel" : "No",
						"name" : "Amputee",
						"inputValue" : false,
						"width" : 125,
						"checked" : true
					}]
				}, 
				{ xtype : "AmputationSelection", "hidden" : true },
				IIG_Panel
			]
		}
	];
};
var theButtons = [
		{ text: "Apply Template" },
		{ text: "Cancel" }
	];

Ext.define("COMS.view.NewPlan.AskQues2ApplyTemplate", {
	extend: "Ext.window.Window",
	alias : "widget.AskQues2ApplyTemplate",
    buttonAlign: "center",
	title : "Apply Template",
	layout: "fit",
	autoShow: true,
	width: 500,
	initComponent : function() {
		this.items = theMainItemsList(this.itemsInGroup);
		this.buttons = theButtons;
		this.callParent(arguments);
	}
});