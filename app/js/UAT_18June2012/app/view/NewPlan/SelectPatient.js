Ext.define("COMS.view.NewPlan.SelectPatient" ,{
//	extend: "Ext.form.field.ComboBox",
	extend: "Ext.container.Container",
	alias : "widget.SelectPatient",
	name : "Select Patient Control",
	hidden : true,
	items : [
		{ xtype : "container", name : "Confirm", tpl : "Please click here to confirm this is the patient you want : <tpl for=\".\"><button class=\"anchor\" name=\"PatientConfirm\" pid=\"{Patient_ID}\" pn=\"{Patient_Name}\">{Patient_Name}</button></tpl>", hidden : true},
		{ xtype : "combobox", 
			name : "Select", 
			hidden : true,
			store : "Patients", 
			labelWidth: 150,
			width: 450,
			fieldLabel: "Select Patient from <abbr title=\"Computerized Patient Record System\">CPRS</abbr>",
			displayField: "name",
			valueField: "id"
		}
	]
});