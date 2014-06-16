Ext.define("COMS.view.NewPlan.PatientInfo" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.PatientInfo",
	name : "Patient Information",

	cls : "xPandablePanel",

	collapsed : true,

    resizable : true,
    autoScroll : true,
    autoHeight: true,
    layout: {
        type: "vbox",
        align: "stretch"
    },
    defaults : {
        margin: "5 0 5 10"
    },


	items : [
		{ xtype : "container", hidden : true, name : "UpdateMDWSDataContainer", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "DisplayMDWSDataContainer", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "MDWSStatus", html : "Updating Patient Info from MDWS" },
		{ xtype : "PatientInfoTable" },
		{ xtype : "AdverseEventsHistory" },
		{ xtype : "PatientTemplates" },
		{ xtype : "PatientHistory" },		// Panel Title = "Patient Vitals"
		{ xtype : "LabInfo" },
		{ xtype : "CTOS" }
	]
});
