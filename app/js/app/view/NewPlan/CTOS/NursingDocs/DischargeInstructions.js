Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.DischargeInstructions", {
	"extend": "Ext.panel.Panel",
	"alias": "widget.DischargeInstructions",
	"items": [
		{"xtype": "RequiredInstr"},
		{ "xtype" : "container", "layout" : "hbox", "defaults" : { "margin" : "0 0 5 10" }, "items" : [
			{ "xtype" : "selDischargeInstructions"},
			{ "xtype" : "button", "baseCls" : "anchor", "id" : "PrintDischargeInstructions", "text" : "Print Discharge Instructions" }
		]},
		{ "xtype" : "form", "submitEmptyText" : false, "trackResetOnLoad" : true, "margin" : "0 10 0 10", "items" : [
			{
				"xtype": "fieldset",
				"title": "Patient Education",
				"name": "PatientEducation",
				"margin": "10 20 10 10",
				"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
				"items": [
					{
						"xtype": "radiogroup",
						"columns": 2,
						"defaultType": "radio",
						"fieldLabel": "Patient Education",
						"width": 20,
						"defaults": {
							"labelAlign": "right",
							"labelWidth": 50,
							"labelClsExtra": "NursingDocs-label"
						},
						"items": [
							{ "name": "PE_Taught", "inputValue": "1", "fieldLabel": "Yes" }, 
							{ "name": "PE_Taught", "inputValue": "0", "fieldLabel": "No" }
						]
					}, 
					{
						"xtype": "PatientEducationDetails",
						"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
					}
				]
			},

			{
				"xtype": "fieldset",
				"title": "Follow up",
				"name": "Followup",
				"margin": "10 20 10 10",
				"defaults": {
					"labelAlign": "right",
					"labelWidth": 200,
					"labelClsExtra": "NursingDocs-label"
				},
				"items": [
					{
						"xtype": "radiogroup",
						"columns": 2,
						"defaultType": "radio",
						"fieldLabel": "Followup Needed",
						"width": 20,
						"defaults": {
							"labelAlign": "right",
							"labelWidth": 50,
							"labelClsExtra": "NursingDocs-label"
						},
						"items": [{
							"name": "FollowupNeeded",
							"inputValue": "1",
							"fieldLabel": "Yes"
						}, {
							"name": "FollowupNeeded",
							"inputValue": "0",
							"fieldLabel": "No"
						}]
					}, 
					{
						"xtype": "FollowupDetails"
					}
				]
			}
		],
		"buttons" : [
			{ xtype: "button", "text" : "Save", "scope" : this }, 
			{ xtype: "button", "text" : "Cancel", "scope" : this }
		]
		}
	]
});