Ext.define('COMS.view.Management.AdminTab' ,{
	extend: 'Ext.tab.Panel',
	alias : 'widget.AdminTab',
	name : 'Admin Tab',
	autoEl : { tag : 'nav' },
	padding : "20 10 5 10",
	plain : true,
	items : [
		{ xtype : "AddLookups", title: "Add LookUps" },
		{ xtype : "DeleteTemplate", title: "Delete Template"},
		{ xtype : "Globals", title: "Global Variables"},
		{ xtype : "Users", title: "COMS Users"},
		{ xtype : "ActiveWorkflows", title: "Active Workflows"},
		{ xtype : "MedsNonRounded", title: "Medications Not Rounded"},
		{ xtype : "form", title : "Rounding Rules", padding : "10 10 5 10", items : [ 
			{ xtype : "radiogroup", fieldLabel : "Select Rounding Percentage", labelWidth: 170, columns : 1, vertical : true, width : 450,
				items : [
					{ boxLabel : "No&nbsp;rounding", name : "RoundingRule", inputValue : "0", checked : true },
					{ boxLabel : "5%", name : "RoundingRule", inputValue : "5" },
					{ boxLabel : "10%", name : "RoundingRule", inputValue : "10" }
				]
			},
			{ 
				xtype : "container", 
				html : "Rounding Rules are applied based on the percentage specified when the Pharmacist finalizes an Order Entry Management Record"
			}			
		],
		buttons : [ 
			// The Rounding Value get's pushed into the Lookup Table
			{ text : 'Save', action : 'save' }, 
			{ text : 'Canel', scope : this } 
		]
		},

        { xtype : "form", title : "Medication Holds", padding : "10 10 5 10", items : [ 
            { xtype : "radiogroup", fieldLabel : "Allow Medication Holds", labelWidth: 170, columns : 1, vertical : true, width : 450,
                items : [
                    { boxLabel : "Yes", name : "AllowMedHolds", inputValue : true, checked : true },
                    { boxLabel : "No", name : "AllowMedHolds", inputValue : false }
                ]
            }
        ],
		buttons : [ // Button access : form[name=\"Medication Holds\"] button[action=\"save\"]
			// The Hod value get's pushed into the Lookup Table
			{ text : 'Save', action : 'save' }, 
			{ text : 'Canel', scope : this } 
		]}

	],

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});

