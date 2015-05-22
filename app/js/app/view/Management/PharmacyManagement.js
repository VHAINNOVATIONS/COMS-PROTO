Ext.define("COMS.view.Management.PharmacyManagement" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.PharmacyManagement",
	"name" : "PharmacyManagement",
	"autoEl" : { tag : "section" },
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ 
		{ "xtype" : "box", "html" : "<em style=\"font-weight: bold; color: red;\">Note:</em> Information is required to permit interopability with associated VistA instance pharmacy packages"},
		{ "xtype": "RequiredInstr"},
		{ "xtype" : "textfield", "name" : "Host", "fieldLabel" : "VistA Host IP<em>*</em>", "allowBlank" : false },
		{ "xtype" : "textfield", "name" : "Port", "fieldLabel" : "VistA Port <em>*</em>", "allowBlank" : false },
		{ "xtype" : "textfield", "name" : "AccessCode", "fieldLabel" : "Access Code <em>*</em>", "allowBlank" : false },
		{ "xtype" : "textfield", "name" : "VerifyCode", "fieldLabel" : "Verify Code <em>*</em>", "inputType" : "password", "allowBlank" : false },
		{ "xtype" : "button", "name" : "Submit", "text" : "Submit", "formBind" : true }
	]
});