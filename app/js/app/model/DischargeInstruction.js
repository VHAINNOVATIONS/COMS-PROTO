Ext.define('COMS.model.DischargeInstruction', {
	extend: 'Ext.data.Model',
	fields: ["ID", "Label", "Details"],
	"proxy" : {
		"type" : "rest",
		"api" : {
			"read" : Ext.URLs.DischargeInstruction,
			"update" : Ext.URLs.DischargeInstruction,
			"destroy" : Ext.URLs.DischargeInstruction,
			"create" : Ext.URLs.DischargeInstruction
		},
		"reader" : {
			"type" : "json",
			"root" : "records",
			"successProperty" : "success",
			"messageProperty" : "message"
		}
	}
});