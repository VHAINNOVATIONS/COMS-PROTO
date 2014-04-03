Ext.define("COMS.view.NewPlan.PatientHistory" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientHistory",
	name : "Patient Vitals",
	title : "Patient Vitals",

	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	items : [
        { xtype : "button", text : "Add Vitals", margin: "5 0 0 20", 
            listeners: {
                click : {
                    element : 'el', 
                    fn : function() {
                        var thePanel = Ext.ComponentQuery.query("PatientHistory container[name=\"AddVitals\"]")[0];
                        if (thePanel.hidden) {
                            thePanel.show();
                        } else {
                            thePanel.hide();
                        }
                    },
                    scope: this
                }
            }
        },
        { xtype : "container", name : "AddVitals", hidden : true, items : [
            { xtype : "VitalSignsEntryForm", margin: "5 auto 5 auto" },
            { xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ 
			    { xtype : "button", text : "Save"}, 
			    { xtype : "button", text : "Cancel"  } 
		    ]}
        ]},
		{ xtype : "VitalSignsHistory" }
	],

	initComponent: function() {
		wccConsoleLog("Patient History View - Initialization");
		this.callParent(arguments);
	}
});
