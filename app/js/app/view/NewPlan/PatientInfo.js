<<<<<<< HEAD
Ext.define("COMS.view.NewPlan.PatientInfo" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.PatientInfo",
	name : "Patient Information",

	cls : "xPandablePanel",
=======
Ext.define('COMS.view.NewPlan.PatientInfo' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.PatientInfo',
	name : 'Patient Information',

	cls : 'xPandablePanel',
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca

	collapsed : true,

    resizable : true,
    autoScroll : true,
    autoHeight: true,
    layout: {
<<<<<<< HEAD
        type: "vbox",
        align: "stretch"
=======
        type: 'vbox',
        align: 'stretch'
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
    },
    defaults : {
        margin: "5 0 5 10"
    },


	items : [
		{ xtype : "container", hidden : true, name : "UpdateMDWSDataContainer", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "DisplayMDWSDataContainer", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "MDWSStatus", html : "Updating Patient Info from MDWS" },
<<<<<<< HEAD
		{ xtype : "PatientInfoTable" },
		{ xtype : "AdverseEventsHistory" },
		{ xtype : "PatientTemplates" },
		{ xtype : "PatientHistory" },		// Panel Title = "Patient Vitals"
		{ xtype : "LabInfo" },
		{ xtype : "CTOS" }
=======
		{ xtype : 'PatientInfoTable' },
		{ xtype : 'PatientTemplates' },
		{ xtype : 'PatientHistory' },		// Panel Title = "Patient Vitals"
		{ xtype : 'LabInfo' },
		{ xtype : 'CTOS' }
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
	]
});
