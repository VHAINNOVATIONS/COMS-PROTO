Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.VitalSignsEntryForm", {
	extend: "Ext.form.Panel",
    alias: "widget.VitalSignsEntryForm",
    name: "NursingDocs.VitalSignsEntryForm",
    cls : "VitalSignsEntryForm",
		height : 100,
		border: false,

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
                    value: "",
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
                value: "",
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
                value: "",
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
            items: [
				{
					xtype: "displayfield",
					name: "ndVitalsBSA",
					fieldLabel: "<abbr title=\"Body Surface Area\">BSA</abbr>",
					labelWidth: 60,
					width: 105,
					margin: "0 5 0 0",
					labelClsExtra: "NursingDocs-label"
				}, 
				{ "xtype" : "button", "baseCls" : "anchor", "name" : "AddVitals_PatientInfoPanel", "text" : "Calculations" }
			]
		}
	]
});