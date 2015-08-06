Ext.define('COMS.model.MedDocs', {
	extend: 'Ext.data.Model',
	fields: ["ID", "Med_ID", "MedName", "Documentation"],
	"proxy" : {
		"type" : "rest",
		"api" : {
			"read" : Ext.URLs.MedDoc,
			"update" : Ext.URLs.MedDoc,
			"destroy" : Ext.URLs.MedDoc,
			"create" : Ext.URLs.MedDoc
		},
		"reader" : {
			"type" : "json",
			"root" : "records",
			"successProperty" : "success",
			"messageProperty" : "message"
		}
	}
});