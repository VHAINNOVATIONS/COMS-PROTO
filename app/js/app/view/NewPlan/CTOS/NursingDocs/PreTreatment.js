Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PreTreatment" ,{
	extend: "Ext.form.Panel",
	alias : "widget.NursingDocs_PreTreatment",
	name : "Nursing Documentation Pre Treatment Tab",
	title: "IV Site",

	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			defaults : { labelClsExtra : "NursingDocs-label" },
			items : [
				{ 
					title : "<abbr title=\"Intravenous\">IV</abbr> Access",
					name : "ND_PT_IVAccess",
					defaults : { labelAlign : "right", labelWidth: 95, labelClsExtra : "NursingDocs-label" },
					items : [
						{ xtype : "datefield", fieldLabel : "Date Accessed", width: 200, name: "ND_PT_IVA_Date" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Device",
							name : "ND_PT_IVA_Device",
							width : 180,
							store : { fields : [ "name", "value" ], data : [
							{name : "Peripheral IV", value : 1},
							{name : "Port", value : 2},
							{name : "PICC", value : 4},
							{name : "Central Catheter", value : 5}
						] }, displayField : "name", valueField : "value" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Gauge",
							name : "ND_PT_IVA_Gauge",
							width : 210,
							store : { fields : [ "name", "value" ], data : [
							{name : "18g", value : 1},
							{name : "18g Non-Coring", value : 2},
							{name : "20g", value : 3},
							{name : "20g Non-Coring", value : 4},
							{name : "22g", value : 5},
							{name : "22g Non-Coring", value : 6},
							{name : "24g", value : 7},
							{name : "24g Non-Coring", value : 8}
						] }, displayField : "name", valueField : "value" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Location",
							name : "ND_PT_IVA_Location",
							width : 310,
							store : {fields : [ "name", "value" ], data : [
							{name : "Left Ventral Proximal Forearm", value : 1},
							{name : "Right Ventral Proximal Forearm", value : 2},
							{name : "Left Ventral Distal Forearm", value : 3},
							{name : "Right Ventral Distal Forearm", value : 4},
							{name : "Left Dorsal Proximal Forearm", value : 5},
							{name : "Right Dorsal Proximal Forearm", value : 6},
							{name : "Left Dorsal Distal Forearm", value : 7},
							{name : "Right Dorsal Distal Forearm", value : 8},
							{name : "Left Dorsum of hand", value : 9},
							{name : "Right Dorsum of hand", value : 10},
							{name : "Left side of Chest", value : 11},
							{name : "Right side of Chest", value : 12}
							] }, displayField : "name", valueField : "value" },
						{ xtype : "combo",
							fieldLabel : "Delivery Mechanism",
							name : "ND_PT_IVA_DeliveryMechanism",
							width : 310,
							store : "DeliveryMechanism",
                        labelClsExtra : "NursingDocs-label",
                        valueField: 'name',
                        displayField: 'name',
                        triggerAction: 'all',
                        editable: false

                        }
					]
				},

				{ 
					title : "Site Appearance",
					name : "ND_PT_SiteAppearance",
					defaults : { labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
					items : [ {
						xtype : "container",
						margin: "0 0 0 100", 
						layout : "hbox",
						defaultType: "checkboxfield",
						defaults : { margin : "5 10 5 0", labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
						items : [
							{ boxLabel : "Absence of symptoms", name : "ND_PT_SA_Absence", id : "ckSymptomAbsence" },
							{ boxLabel : "Pain", name : "ND_PT_SA_Pain" },
							{ boxLabel : "Swelling", name : "ND_PT_SA_Swelling" },
							{ boxLabel : "Erythema", name : "ND_PT_SA_Redness" },
							{ boxLabel : "Line Disconnected/Port De Accessed", name : "ND_PT_SA_Removed" }
						]
					},
					{ xtype : "textarea", grow : true, labelWidth: 95, fieldLabel : "Comments", name : "ND_PT_SA_Comments", width: 850 }
					]
				},

				{ 
					title : "Brisk blood return verified",
					name : "ND_PT_BloodReturn",
					defaultType : "fieldcontainer",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
						{ 
							fieldLabel : "Pre treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_PreTreatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_PreTreatment", fieldLabel : "No"}  ]
						},
						{ 
							fieldLabel : "During treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_Treatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_Treatment", fieldLabel : "No"}  ]
						},
						{ 
							fieldLabel : "Post treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_PostTreatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_PostTreatment", fieldLabel : "No"}  ]
						},
						{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_PT_BR_Comments", width: 850 }
					]
				},

				{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_PT_SA_Comments", width: 850 },
				{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
			]
		}
	]
});
