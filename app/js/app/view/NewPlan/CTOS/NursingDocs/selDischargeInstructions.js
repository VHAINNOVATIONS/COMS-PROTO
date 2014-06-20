Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.selDischargeInstructions" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selDischargeInstructions",
	"labelWidth" : 350,
	"labelAlign" : "right",
	"width" : 450,
	"labelClsExtra" : "NursingDocs-label", 
	"margin" : "0 10 5 10",
	"emptyText" : "Select Date",
	"displayField" : "date",
	"valueField" : "DischargeID",
	"fieldLabel" : "Select Date of Discharge Instructions to view",
	"store" : Ext.create("Ext.data.Store", {
		"fields" : ["date", "DischargeID", "PatientID"],
		"proxy" : {
			"type" : 'rest',
			"url" : Ext.URLs.PatientDischarge,
			"reader" : {
				"type" : 'json',
				"root" : 'records'
			}
		}
	})
});

