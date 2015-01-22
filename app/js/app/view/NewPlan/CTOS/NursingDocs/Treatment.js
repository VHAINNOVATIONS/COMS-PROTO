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
    plugins: [ Ext.ND_cellEditing ],
	columns : [
		{ header : "", dataIndex : "typeOrder", hidden : true, renderer: Ext.ND_TreatmentTypeOrderRenderer },
		{ header : "Medication", dataIndex : "drug", width : 120 },
		{ header : "Dose", dataIndex : "dose", width : 50, editor: { allowBlank: false } },
		{ header : "Units", dataIndex : "unit", width : 70},
		{ header : "Route", dataIndex : "route", width : 50},
		{ header : "Start Time", dataIndex : "StartTime", renderer : Ext.ND_TreatmentTimeRenderer, 
			editor : new Ext.form.field.Time({
				increment : 1, 
				snapToIncrement : true, 
				format : "h:i A",
				id : "startTimeEditor"
			})
		},
		{ header : "End Time", dataIndex : "EndTime", renderer : Ext.ND_TreatmentTimeRenderer, 
			editor : new Ext.form.field.Time({
				increment : 1, 
				snapToIncrement : true, 
				format : "h:i A",
				id : "endTimeEditor"
			})
		},
		{ header : "Comments", dataIndex : "Comments", width : 250, 
			renderer : Ext.ND_CommentRenderer, 
			editor : { xtype : "textfield" } 
		},
		{ header : "Signature", dataIndex : "Treatment_User", width : 200, renderer : Ext.ND_TreatmentSignature },
		{ header : "", width : 40, xtype: 'actioncolumn', hideable: false, 
			handler: function (grid, rowIndex, colIndex, node, e, record, rowNode) {
				var AmmendTreatment = Ext.widget("puWinTreatmentAmmend", { record : record, scope : this });
			},
			getClass: function(v, meta, rec, row, col, store) {
				if ("Administered" === rec.get("orderstatus")) {
					this.items[0].tooltip = "Make addendum";
					return "EditCell";
				}
				this.items[0].tooltip = "";
				return "";
			}
		}
	]
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
                {
                    title : "Medication Given",
                    name : "ND_T_Meds",
                    defaults : { margin : "5 0 30 0" },
                    items : [
						{ xtype : "box", html : "Items marked with a <em class=\"required-field\">*</em> have an addendum", margin : "0", style : { "textAlign" : "center", "fontWeight" : "bold" }},
						{ xtype : "NursingDocs_Treatment_Meds", title : "Treatment Administered", name : "AdministeredMedsGrid" }
                    ]
                },
                { xtype : "button", text : "Administration Complete", hidden : true }
            ]
        }
    ]
});
