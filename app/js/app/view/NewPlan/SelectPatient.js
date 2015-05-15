Ext.define("COMS.view.NewPlan.SelectPatient" ,{
	extend: "Ext.container.Container",
	alias : "widget.SelectPatient",
	name : "Select Patient Control",
	hidden : true,
	items : [
		{ xtype : "container", name : "Confirm", tpl : "Please click here to confirm this is the patient you want : <tpl for=\".\"><button class=\"anchor\" name=\"PatientConfirm\" pid=\"{Patient_ID}\" pn=\"{Patient_Name}\">{Patient_Name}</button>{NoPatientFound}</tpl>", hidden : true},
		{ xtype : "box", name : "NoPatient", html : "<div style=\"text-align: center; font-weight:bold; font-size:larger\">No Patient by that ID can be found in <abbr title=\"Computerized Patient Record System\">CPRS</abbr></div>", hidden : true},
		{ xtype : "combobox", 
			name : "Select", 
			hidden : true,
			store : "Patients", 
			labelWidth: 150,
			fieldLabel: "Select Patient from <abbr title=\"Computerized Patient Record System\">CPRS</abbr>",
			displayField: "name",
			valueField: "id"
		}
	]
});