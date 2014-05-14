Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.selDischargeInstructions" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selDischargeInstructions",
	"labelWidth" : 350,
	"labelAlign" : "right",
	"width" : 450,
	"labelClsExtra" : "NursingDocs-label", 
	"margin" : "0 10 5 10",
//	"queryMode" : "local",
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
		},
		listeners: {
			"load" : function(store, records, success) {
				if(success){
					var i, aRecord, rLen = records.length;
					for (i = 0; i < rLen; i++) {
						aRecord = store.getAt(i);
						var sDate = aRecord.get("date");
						sDate = Ext.util.Format.date(sDate.date.split(" ")[0]);
						aRecord.set("date", sDate);
					}
				}
			}
		}
	}),
	listeners: {
		"select" : function(theCombo, records, eOpts) {
			var theData = records[0].getData();
			debugger;
		}
	}
});

