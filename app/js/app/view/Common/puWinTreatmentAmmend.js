Ext.define("COMS.view.Common.puWinTreatmentAmmend", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinTreatmentAmmend",
	"title" : "Make Addendum to Treatment",
	"closeAction" : "destroy",
	"autoShow" : true,
	"autoScroll" : true,
	"width" : 1000,
	"height" : 450,
	// "layout" : "fit",
	"modal" : true,
	"items" : [
		// { "xtype" : "box", html : "Ammendments to this record<hr>" },

		{ "xtype" : "box", html : "<h1>Addendums to Patient Treatment Record</h1><h2>Previous Addendums to Patient Treatment Record</h2>" },

		{ "xtype" : "grid", "name" : "AddendumsHistory",
			margin: "10 5 30 5",
			autoScroll : true,
			columnLines : true,
			sortableColumns : false,
			enableColumnHide : false,
			enableColumnMove : false,
			viewConfig:{ markDirty: false },
			store : {
				fields : [
					"Cycle",
					"adminDay",
					"adminDate",
					"typeOrder",	// Used to display therapy type in grid in sorted order (Pre = 1, Therapy = 2, Post = 3)
					"type",			// Indicates type of Therapy this record is for e.g. PreTherapy, Therapy, PostTherapy
					"drug",		// Includes sequence in the treatment type (e.g. "1. Ibuprofin" in Pre Therapy, "3. Mylanta" in Post Therapy
					"MedID",
					"dose",
					"unit",
					"UnitID",
					"route",
					"StartTime",
					"EndTime",
					"Comments",
					"User",
					"Treatment_User",
					"Treatment_Date",		// Time/Date stamp of when the treatment was recorded
					"drug_originalValue",
					"dose_originalValue",
					"unit_originalValue",
					"route_originalValue",
					"orderstatus"
				]
			},
			columns : [
				{ header : "Medication", dataIndex : "drug", width : 120 },
				{ header : "Dose", dataIndex : "dose", width : 50, editor: { allowBlank: false } },
				{ header : "Units", dataIndex : "unit", width : 70},
				{ header : "Route", dataIndex : "route", width : 50},
				{ header : "Start Time", dataIndex : "StartTime" },
				{ header : "End Time", dataIndex : "EndTime" },
				{ header : "Comments", dataIndex : "Comments", width : 250},
				{ header : "Signature", dataIndex : "Treatment_User", width : 200, renderer : Ext.ND_TreatmentSignature }
			]
		},

		{ "xtype" : "box", html : "<h2>Make Addendum to Patient Treatment Record</h2>" },
		{ "xtype" : "grid", margin: "10 5 10 5",
			name : "ModifyData",
			store : {
				fields : [
					"Cycle",
					"adminDay",
					"adminDate",
					"typeOrder",	// Used to display therapy type in grid in sorted order (Pre = 1, Therapy = 2, Post = 3)
					"type",			// Indicates type of Therapy this record is for e.g. PreTherapy, Therapy, PostTherapy
					"drug",		// Includes sequence in the treatment type (e.g. "1. Ibuprofin" in Pre Therapy, "3. Mylanta" in Post Therapy
					"MedID",
					"dose",
					"unit",
					"UnitID",
					"route",
					"StartTime",
					"EndTime",
					"Comments",
					"User",
					"Treatment_User",
					"Treatment_Date",		// Time/Date stamp of when the treatment was recorded
					"drug_originalValue",
					"dose_originalValue",
					"unit_originalValue",
					"route_originalValue",
					"orderstatus"
				]
			},

			autoScroll : true,
			columnLines : true,
			sortableColumns : false,
			enableColumnHide : false,
			enableColumnMove : false,
			viewConfig:{ markDirty: false },
			selType: "cellmodel",
			plugins: [ Ext.create("Ext.grid.plugin.CellEditing", { clicksToEdit: 1 }) ],
			columns : [
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
				{ header : "Comments", dataIndex : "Comments", width : 250, editor : { xtype : "textfield" } },
				{ header : "Signature", dataIndex : "", width : 200, renderer : Ext.ND_TreatmentSignature }
			]
		}
	]
});
