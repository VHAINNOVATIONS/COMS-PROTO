Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.FollowupDetails", {
	"extend": "Ext.container.Container",
	"alias": "widget.FollowupDetails",
	"id": "FollowupDetails",
	"hidden": true,
	"defaults": {"labelAlign": "right","labelWidth": 200,"labelClsExtra": "NursingDocs-label"},
	"items": [{
		"xtype": "radiogroup",
		"columns": 2,
		"defaultType": "radio",
		"fieldLabel": "Follow up type",
		"width": 20,
		"defaults": {"labelAlign": "right","labelWidth": 70,"labelClsExtra": "NursingDocs-label"},
		"items": [{
			"name": "FollowUp_Type",
			"inputValue": "InPatient",
			"fieldLabel": "Inpatient"
		}, {
			"name": "FollowUp_Type",
			"inputValue": "OutPatient",
			"fieldLabel": "Outpatient"
		}]
	}, {
		"xtype" : "datefield",
		"fieldLabel" : "Next Chemotherapy Appt.",
		"width" : 300,
		"name" : "ND_E_ChemoAptDate"
	}, {
		"xtype" : "datefield",
		"fieldLabel" : "Next Clinic Appt.",
		"width" : 300,
		"name" : "ND_E_ClinicAptDate"
	}, {
		"xtype" : "box",
		"html" : "<div class='NursingDocs-label'>Laboratory Test(s) Scheduled</div>"
	}, {
		"xtype" : "datefield",
		"fieldLabel" : "&nbsp;",
		"labelSeparator" : "",
		"width" : 300,
		"name" : "ND_E_LabTest1Date"
	}, {
		"xtype" : "datefield",
		"fieldLabel" : "&nbsp;",
		"labelSeparator" : "",
		"width" : 300,
		"name" : "ND_E_LabTest2Date"
	}]
});