Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.DischargeInstructions", {
	"extend": "Ext.form.Panel",
	"alias": "widget.DischargeInstructions",
	"items": [
		{"xtype": "RequiredInstr"},
		{
			"xtype": "fieldset",
			"title": "Patient Education",
			"name": "PatientEducation",
			"margin": "10",
			"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
			"items": [{
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
				"items": [{
					"name": "PE_Taught",
					"inputValue": "1",
					"fieldLabel": "Yes"
				}, {
					"name": "PE_Taught",
					"inputValue": "0",
					"fieldLabel": "No"
				}]
			}, {
				"xtype": "PatientEducationDetails",
				"defaults": { "labelAlign": "right", "labelWidth": 200, "labelClsExtra": "NursingDocs-label" },
			}]
		},
/***/
			
		{
			"xtype": "fieldset",
			"title": "Follow up",
			"name": "Followup",
			"margin": "10",
			"defaults": {
				"labelAlign": "right",
				"labelWidth": 200,
				"labelClsExtra": "NursingDocs-label"
			},
			"items": [{
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
			}, {
				"xtype": "FollowupDetails"
			}]
		}
		/***/
	]
});