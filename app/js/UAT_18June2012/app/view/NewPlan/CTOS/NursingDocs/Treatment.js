/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Treatment_Meds", {
	extend: "Ext.grid.Panel",
	alias : "widget.NursingDocs_Treatment_Meds",

	store : "ND_Treatment",

	autoScroll : true,
	columnLines : true,
	sortableColumns : false,
	enableColumnHide : false,
	enableColumnMove : false,
    features: [{ftype:'grouping'}],

	selType: "cellmodel",
	plugins: [
		// Event handler for this is assigned to the "beforeedit" event and calls the "CellEdit()" function in the TreatmentTab controller
		Ext.create("Ext.grid.plugin.CellEditing", {
			clicksToEdit: 1
		})
	],



	initComponent: function() {
		wccConsoleLog("Treatment Meds Grid - Initialization");
		var startTimeField = new Ext.form.field.Time( { increment : 1, snapToIncrement : true, id : "startTimeEditor", format : "g:i" });
		var endTimeField = new Ext.form.field.Time( { increment : 1, snapToIncrement : true, id : "endTimeEditor", format : "g:i" });

		this.columns = [
		{ header : "", dataIndex : "typeOrder", hidden : true,
	        renderer: function(value) {
				switch (value) {
					case 1:
						return "Pre Therapy";
					case 2:
						return "Therapy";
					case 3:
						return "Post Therapy";			
				}
			}
		},
		{ header : "Medication", dataIndex : "drug", width : 120 },
		{ header : "Dose", dataIndex : "dose", width : 50, editor: { allowBlank: false } },
		{ header : "Units", dataIndex : "unit", width : 70, editor : { 
				xtype: "combo", 
				store: "DrugUnitsStore", 
				displayField: "name", 
				valueField: "name" 
			} 
		}, 
		{ header : "Route", dataIndex : "route", width : 50, editor : { 
				xtype: "combo", 
				store: "InfusionStore", 
				displayField: "name", 
				valueField: "name" 
			} 
		},
		{ header : "Start Time", dataIndex : "StartTime", 
			renderer: Ext.util.Format.dateRenderer("h:i A"),
			editor : startTimeField
		},
		{ header : "End Time", dataIndex : "EndTime", 
			renderer: Ext.util.Format.dateRenderer("h:i A"),
			editor : endTimeField
		},
		{ header : "Comments", dataIndex : "Comments", width : 250, editor : { xtype : "textfield" } },
		{ header : "Signature", dataIndex : "Treatment_User", renderer: 
			function(value, metadata, record, rowIndex, colIndex, store, view) {
				var aStyle = "style=\"text-decoration:underline; color: navy;\" ";
				var dspValue = "Sign to Verify";
				if (value) {
					aStyle = "";
					dspValue = (value + " - " + record.get("Treatment_Date"));
				}
				return Ext.String.format("<span class=\"anchor TreatmentSigner\" {0}row={1} col={2}>{3}</span>", aStyle, rowIndex, colIndex, dspValue);
			},
			width : 200
		}

		
//		,{ xtype : "actionbuttoncolumn", width : 100, header : "Signature", items : [
//			{
//				text : "Sign to Verify",
//				eventName: "SignTreatment"
//			}
//		]}
	];
		this.callParent(arguments);
	}
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Treatment" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_Treatment",
	name : "Nursing Documentation Treatment Tab",
	title: "Treatment",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			items : [
				{ xtype : "button", text : "Treatment Complete" },
				{
					title : "Medication Given",
					name : "ND_T_Meds",
					defaults : { margin : "5 0 30 0" },
					items : [
					// { xtype : "NursingDocs_Treatment_Meds", title : "Pre Therapy", name : "PreMedsGrid" },
					// { xtype : "NursingDocs_Treatment_Meds", title : "Therapy", name : "MedsGrid" },
					{ xtype : "NursingDocs_Treatment_Meds", title : "Treatment Administered", name : "AdministeredMedsGrid" }
						
					]
				},
				{ xtype : "button", text : "Treatment Complete", hidden : true }
			]
		}
	]
});
