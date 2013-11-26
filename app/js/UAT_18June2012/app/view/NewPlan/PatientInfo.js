Ext.define('COMS.view.NewPlan.PatientInfo' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.PatientInfo',
	name : 'Patient Information',

	cls : 'xPandablePanel',

	collapsed : true,
	items : [
		{ xtype : "container", hidden : true, name : "UpdateMDWSDataContainer", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "DisplayMDWSDataContainer", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "MDWSStatus", html : "Updating Patient Info from MDWS" },
		{ xtype : 'PatientInfoTable' },
		{ xtype : 'PatientTemplates' },
		{ xtype : 'PatientHistory' },
		{ xtype : 'LabInfo' },
		{ xtype : 'CTOS' }
	]
});
