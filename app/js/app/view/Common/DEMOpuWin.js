Ext.define("COMS.view.Common.selInPatientMed" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selInPatientMed",
	"name" : "InPatientMed",
	"emptyText" : "Select an In Patient Medication",
	"allowBlank" : false,
	"fieldLabel" : "Select IV Medication",
	"labelAlign" : "right",

	"labelWidth" : 200,
	"width" : 550,

			"displayField" : "name",
			"valueField" : "IEN",
			"queryMode" : "local",
			"typeAhead" : true,
			"typeAheadDelay" : 1000,
			"editable" : true,

			store : Ext.create('Ext.data.Store', {
				model : Ext.COMSModels.Drugs,
				proxy: {
					type: 'rest',
					api: {
						read: Ext.URLs.Drugs + "/InPatient"
					},
					reader: {
						type: 'json',
						root : 'records',
						successProperty : 'success'
					}
				}
			})
	});

Ext.define("COMS.view.Common.selOutPatientMed" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selOutPatientMed",
	"name" : "OutPatientMed",
	"emptyText" : "Select an Out Patient Medication",
	"allowBlank" : false,
	"fieldLabel" : "Select IV Medication",
	"labelAlign" : "right",

	"labelWidth" : 200,
	"width" : 550,

			"displayField" : "name",
			"valueField" : "IEN",
			"queryMode" : "local",
			"typeAhead" : true,
			"typeAheadDelay" : 1000,
			"editable" : true,

			store : Ext.create('Ext.data.Store', {
				model : Ext.COMSModels.Drugs,
				proxy: {
					type: 'rest',
					api: {
						read: Ext.URLs.Drugs + "/InPatient"
					},
					reader: {
						type: 'json',
						root : 'records',
						successProperty : 'success'
					}
				}
			})
	});

Ext.define("COMS.view.Common.DEMOpuWin", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.DEMOpuWin",
	"title" : "DEMO Pop Up Window",
	"closeAction" : "destroy",
	"autoShow" : true,
	"width" : 920,
	"height" : 640,
	"minHeight" : 440,
	"layout" : "fit",
	"resizable" : true,
	"modal" : true,
	"items" : [
//		{ "xtype" : "FS_Toxicity" }
		{ "xtype" : "EmeticMeds" }
	]
});

