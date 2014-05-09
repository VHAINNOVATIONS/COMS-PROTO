Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.GoalInfo" ,{
	extend: "Ext.form.FieldSet",
	alias : "widget.NursingDocs_PatientID",
	name : "NursingDocs.PatientID",

	title : "Patient Identification",

	defaults : {
        labelAlign: "right",
		labelWidth : 210,
		width : 320,
		margin : "5 10 15 10"
	},
	items : [
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgPatientID",
			fieldLabel : "Patient identification verified with 2 information sources?", 
			labelClsExtra : "NursingDocs-label", 
			labelAlign: "right",
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "patientIDGood", fieldLabel : "Yes", inputValue: true }, 
				{ name : "patientIDGood", fieldLabel : "No", inputValue: false }
			]
		},

		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgConsent",
			fieldLabel : "Consent Documentation on File?", 
			labelClsExtra : "NursingDocs-label", 
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "consentGood", fieldLabel : "Yes", inputValue: true },
				{ name : "consentGood", fieldLabel : "No", inputValue: false } 
			]
		},

		{ 
			xtype : "textareafield", 
			name : "PatientIDComment",
			grow : true, 
			fieldLabel : "Comment", 
			labelClsExtra : "NursingDocs-label", 
			value : "", 
			width: 700 
		}

	]
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PatientTeaching" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_PatientTeaching",
	name : "NursingDocs.PatientTeaching",
	title : "Patient Teaching",
//	margin : "5 10 5 10",
	items : [
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgEduAssess",
			margin : "0",
			fieldLabel : "Education assessment complete?", 
			labelClsExtra : "NursingDocs-label", 
			labelWidth : 230,
			labelAlign: "right",
			width : 350,
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "educationGood", fieldLabel : "Yes", inputValue: true },
				{ name : "educationGood", fieldLabel : "No", inputValue: false } 
			]
		},
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgPlanReviewed",
			margin : "0",
			fieldLabel : "Pre-procedure plan reviewed with patient/significant other, questions answered?", 
			labelClsExtra : "NursingDocs-label", 
			labelWidth : 530,
			labelAlign: "right",
			width : 650,
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "planReviewed", fieldLabel : "Yes", inputValue: true },
				{ name : "planReviewed", fieldLabel : "No", inputValue: false } 
			]
		}
	]
});




Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.DualDosingVerification" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_DualDosingVerification",
	name : "NursingDocs.DualDosingVerification",
	title : "Dual Verification of Dosing",
	items : [
		{ xtype : "container", 
			layout : { 
				type : "table", 
				// tableAttrs: { border : 1 },
				columns : 4
			},
			defaults : { labelAlign : "right", labelWidth : 60, margin: "5 0 5 0" }, 
			items : [
				{ 
					xtype : "button", 
					name: "DDV_FirstSig",
					text : "Sign to Verify",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig1",
					margin : "0 0 0 20"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig2",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig3",
					margin : "0"
				},


				{ 
					xtype : "button", 
					name: "DDV_SecSig",
					text : "Sign to Verify",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig4",
					margin : "0 0 0 20"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig5",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig6",
					margin : "0"
				}
			]
		}
	]
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.VitalSignsTable", {
    extend: "Ext.container.Container",
    alias: "widget.VitalSignsEntryForm",
    name: "NursingDocs.VitalSignsEntryForm",
        cls : "VitalSignsEntryForm",

    layout: {
        type: "table",

        tableAttrs: {
            border: 1
        },
        columns: 4
    },
    defaults: {
        labelAlign: "right",
        labelWidth: 60,
            cellCls : "InformationTable"
    },
    items: [
        // Row 1 - Col 1
        {
            xtype: "container",
            layout: "hbox",
            defaults: {
                labelAlign: "right"
            },
            width: 370,
            margin: "3 0 0 0",
            items: [{
                    xtype: "textfield",
                    maskRe: /[0-9\.]/,
                    name: "ndVitalsTempF",
                    fieldLabel: "Temp.",
                    labelWidth: 60,
                    width: 100,
                    labelClsExtra: "NursingDocs-label"
                }, {
                    xtype: "container",
                    html: "&deg;F",
                    margin: "4 5 0 4"
                }, {
                    xtype: "displayfield",
                    name: "ndVitalsTempC",
                    labelSeparator: "",
                    value: " (  &deg;C)",
                    labelWidth: 5,
                    width: 60
                },
                {
                    xtype: 'combo',
                    width: 170,
                    name: "ndVitalsTempLoc",
                    fieldLabel: "Taken",
                    labelWidth: 45,
                    margin: "0 0 0 5",
                    labelClsExtra: "NursingDocs-label",
                    store: "TemperatureLocation",
                    valueField: 'name',
                    displayField: 'name',
                    triggerAction: 'all',
                    editable: false
                }
            ]
        },
        // Row 1 - Col 2
        {
            xtype: "textfield",
            maskRe: /[0-9]/,
            name: "ndVitalsPulse",
            fieldLabel: "Pulse",
            labelWidth: 50,
            width: 90,
            margin: "0 10 0 0",
            labelClsExtra: "NursingDocs-label"
        },

        // Row 1 - Col 3
        {
            xtype: "fieldcontainer",
            name: "ndVitalsBP",
            width: 170,
            margin: "5 0 0 0",
            fieldLabel: "<abbr title=\"Blood Pressure\">BP</abbr>",
            labelWidth: 50,
            labelClsExtra: "NursingDocs-label",
            defaults: {
                hideLabel: true
            },
            layout: "hbox",
            items: [{
                xtype: "textfield",
                maskRe: /[0-9]/,
                name: "ndVitalsSystolic",
                width: 30
            }, {
                xtype: "displayfield",
                value: " / "
            }, {
                xtype: "textfield",
                maskRe: /[0-9]/,
                name: "ndVitalsDiastolic",
                width: 30
            }]
        },

        // Row 1 - Col 4
        {
            xtype: "displayfield",
            name: "ndVitalsGender",
            fieldLabel: "Patient Gender",
            labelWidth: 110,
            labelClsExtra: "NursingDocs-label",
            labelAlign: "right",
            width: 160,
            margin: "0 10 4 0"
        },
        // Row 2 ----------------------------------------------------------------------------------
        {
            xtype: "container",
            layout: "hbox",
            defaults: {
                labelAlign: "right"
            },
            // width : 280,
            margin: "3 0 0 0",
            items: [{
                xtype: "textfield",
                maskRe: /[0-9\.]/,
                name: "ndVitalsHeightIN",
                fieldLabel: "Height",
                labelWidth: 60,
                width: 105,
                labelClsExtra: "NursingDocs-label"
            }, {
                    xtype: "container",
                    html: "inches",
                    margin: "4 5 0 4"
                }, {
                xtype: "displayfield",
                name: "ndVitalsHeightCM",
                labelSeparator: "",
                value: " (  cm)",
                width: 90
            }]
        }, {
            xtype: "textfield",
            maskRe: /[0-9]/,
            name: "ndVitalsResp",
            fieldLabel: "<abbr title=\"Respiration - in Breaths per minute\">Resp</abbr>",
            labelWidth: 50,
            width: 90,
            margin: "0 10 0 0",
            labelClsExtra: "NursingDocs-label"
        }, {
            xtype: "numberfield",
            name: "ndVitalsO2Level",
            fieldLabel: "<abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub>%</abbr>",
            labelWidth: 60,
            width: 100,
            hideTrigger: true,
            margin: "0 10 0 0",
            minValue: 0,
            maxValue: 100,
            labelClsExtra: "NursingDocs-label"
        }, {
            xtype: "displayfield",
            name: "ndVitalsAge",
            fieldLabel: "Age",
            labelWidth: 50,
            width: 90,
            margin: "0 10 0 0",
            labelClsExtra: "NursingDocs-label"
        },

        // Row 3 ----------------------------------------------------------------------------------
        {
            xtype: "container",
            layout: "hbox",
            defaults: {
                labelAlign: "right"
            },
            // width : 280,
            margin: "3 0 0 0",
            items: [{
                xtype: "textfield",
                maskRe: /[0-9\.]/,
                name: "ndVitalsWeightP",
                fieldLabel: "Weight",
                labelWidth: 60,
                width: 105,
                labelClsExtra: "NursingDocs-label"
            }, 
                {
                    xtype: "container",
                    html: "lbs",
                    margin: "4 5 0 4"
                },
            {
                xtype: "displayfield",
                name: "ndVitalsWeightKG",
                labelSeparator: "",
                value: " (  kg)",
                width: 90
            }]
        }, {
            xtype: "numberfield",
            maxValue: 10,
            minValue: 0,
            name: "ndVitalsPain",
            fieldLabel: "Pain",
            labelWidth: 50,
            width: 100,
            margin: "0 50 0 0",
            hideTrigger: true,
            labelClsExtra: "NursingDocs-label"
        }, {
            xtype: "container",
            layout: "hbox",
            colspan: 2,
            defaults: {
                labelAlign: "right"
            },
            items: [{
                xtype: "displayfield",
                name: "ndVitalsBSA",
                fieldLabel: "<abbr title=\"Body Surface Area\">BSA</abbr>",
                labelWidth: 60,
                width: 105,
                margin: "0 5 0 0",
                labelClsExtra: "NursingDocs-label"
            }, 
            {
                xtype: "container",
                name: "ndVitalsCalcBSA",
                html: "Show <button name=\"ShowBSA\" class=\"anchor NDGIVS_BSA_Calculations\">Calculations</button>",
                margin: "0 10 0 0"
            }

            ]
        }
    ]
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.VitalSigns" ,{
	extend: "Ext.form.FieldSet",
	alias : "widget.NursingDocs_VitalSigns",
	name : "NursingDocs.VitalSigns",
	title : "Vital Signs",
	items : [{ xtype : "VitalSignsEntryForm" }]
});






Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.GenInfo" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_GenInfo",
	name : "Nursing Documentation General Info Tab",
	title: "General Information",
	items : [
		{ 
			xtype : "fieldset",
			collapsible : true, 
			collapsed : true,
			title : "Laboratory Information",
			name : "ND_PT_LabInfo",
			tpl : [
				'<table width="100%" border=1 class="LabInfoResults">',
				'<tpl for=".">',
					'<tr><th>Report&nbsp;Release&nbsp;Date:</th><td>{relDate}</td></tr>',
					'<tr><th>Name:</th><td>{name}',
								// '<a href="#" style="margin-left: 1em;" onclick="labInfoDetails({#}, this); return false;">Show Details</a>',
					'</td></tr>',

					'<tr id="LabInfoDetails_{#}"><td colspan="2" class="LabInfoDetails">',
						'<table width="100%" class="LabInfoDetails">',
							'<tr><th class="topLeftBrdr">Provider</th><td colspan="4" class="topRightBrdr">{provider}</td></tr>',
							'<tr><th class="leftBrdr">Specimen</th><td colspan="4" class="rightBrdr">{specimen} {specInfo}</td></tr>',
							'<tr>',
								'<th class="center leftBrdr">Name</th>',
								'<th class="center">Results</th>',
								'<th class="center">Units</th>',
								'<th class="center rightBrdr">Normal Range</th>',
							'</tr>',

							'<tpl for="results">',
								'<tpl if="OutOfRange">',
									'<tr xxclass="LabInfoOutOfRange">',
										'<td xxclass="LabInfoOutOfRange">{name}</td>',
										'<td xxclass="LabInfoOutOfRange">{result}</td>',
										'<td>{units}</td>',
										'<td xxclass="LabInfoOutOfRange">{range}</td>',
									'</tr>',
								'</tpl>',
								'<tpl if="true !== OutOfRange">',
									'<tr><td>{name}</td>',
										'<td>{result}</td>',
										'<td>{units}</td>',
										'<td>{range}</td>',
									'</tr>',
								'</tpl>',
							'</tpl>',
						'</table>',
					'</td></tr>',

					'<tr><th class="leftBrdr">Reference</th>',
					'<td class="rightBrdr">{ref}</td></tr>',
					'<tr><th class="bottomLeftBrdr">Site</th><td class="bottomRightBrdr">{site}</td></tr>',
		
					'<tr class="dblBorder"><th>Comments:</th><td>{comment}</td></tr>',
				'</tpl>',
				'</table>'
			]
		},


		{ xtype : "NursingDocs_PatientID"},
		{ xtype : "NursingDocs_PatientTeaching"},
		{ xtype : "NursingDocs_DualDosingVerification"},

		{ xtype : "NursingDocs_VitalSigns"},
		{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ 
			{ xtype : "button", text : "Save", action : "save" }, 
			{ xtype : "button", text : "Cancel"  } 
		]},
		{ xtype : "fieldset", title : "Vital Signs - Historical", items : [ { xtype : "VitalSignsHistory" } ]}
	]
});
