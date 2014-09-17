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
    viewConfig:{ markDirty: false },
    selType: "cellmodel",
    plugins: [
        // Event handler for this is assigned to the "beforeedit" event and calls the "CellEdit()" function in the TreatmentTab controller
        Ext.create("Ext.grid.plugin.CellEditing", {
            clicksToEdit: 1
        })
    ],



    initComponent: function() {
        wccConsoleLog("Treatment Meds Grid - Initialization");
        var startTimeField = new Ext.form.field.Time( { increment : 1, snapToIncrement : true, id : "startTimeEditor", format : "h:i A" });
        var endTimeField = new Ext.form.field.Time( { increment : 1, snapToIncrement : true, id : "endTimeEditor", format : "h:i A" });

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
        { header : "Units", dataIndex : "unit", width : 70},
        { header : "Route", dataIndex : "route", width : 50},
        { header : "Start Time", dataIndex : "StartTime",
            renderer: function(v) {
				if ("" !== v) {
					var v1, v2, v3;
					if ("string" == typeof v) {
						v1 = v.split("T");
						if (v1.length > 0) {
							v1 = v1.join(" ");
						}
						v1 = new Date(v1);
					}
					else {
						v1 = new Date(v);
					}
					v2 = Ext.Date.format(v1, "h:i A");
					return v2;
				}
				return v;
            },
            editor : startTimeField
        },
        { header : "End Time", dataIndex : "EndTime",
            renderer: function(v) {
				if ("" !== v) {
					var v1, v2, v3;
					if ("string" == typeof v) {
						v1 = v.split("T");
						if (v1.length > 0) {
							v1 = v1.join(" ");
						}
						v1 = new Date(v1);
					}
					else {
						v1 = new Date(v);
					}
					v2 = Ext.Date.format(v1, "h:i A");
					return v2;
				}
				return v;
            },
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
    ];
        this.callParent(arguments);
    }
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Treatment" ,{
    extend: "Ext.panel.Panel",
    alias : "widget.NursingDocs_Treatment",
    name : "Nursing Documentation Treatment Tab",
    title: "Administration",
    items : [
        { xtype : "fieldset",
            padding : "10",
            defaultType : "fieldset",
            items : [
                // { xtype : "button", text : "Administration Complete" },
                {
                    title : "Medication Given",
                    name : "ND_T_Meds",
                    defaults : { margin : "5 0 30 0" },
                    items : [
                        { xtype : "NursingDocs_Treatment_Meds", title : "Treatment Administered", name : "AdministeredMedsGrid" }
                    ]
                },
                { xtype : "button", text : "Administration Complete" }
            ]
        }
    ]
});
