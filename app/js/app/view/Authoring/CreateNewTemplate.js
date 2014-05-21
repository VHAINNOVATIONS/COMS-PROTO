/*
 *	MWB - 2/3/2012
 *	Create New Template View
 *	This view is managed by the 'TemplateAuthoring' Control
 */
Ext.define('COMS.view.Authoring.CreateNewTemplate' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.CreateNewTemplate',
	name : 'Create New Template',
	defaults : {xtype : 'container', labelAlign: 'right', padding : '5 0 0 0' },
	items : [
		{ xtype : 'CycleLength' },
		{
			layout: 'hbox', 
			defaults : {displayField: 'value', valueField: 'id' },
			items: [
				{ xtype: 'combo', name: 'EmotegenicLevel', fieldLabel: 'Emotegenic Level <em>*</em>', labelAlign: 'right', 
					width: 400, labelWidth: 120, allowBlank: false,
					store: 'EmotegenicLevel', displayField : 'name', valueField : 'id'
				},
				{ xtype : 'textfield', maskRe: /[0-9\.]/, maxValue: 100, minValue: 0, name: 'FebrileNeutropeniaRisk', fieldLabel: 'Febrile Neutropenia Risk', labelAlign: 'right', width : 210, labelWidth: 150 },
				{ xtype : 'container', html : "%", margin: '1 0 0 3' }
			]
		},

		{ xtype : 'TemplateHydration', title : 'Pre Therapy', type : 'Pre' },
		{ xtype : 'TemplateDrugRegimen', title : 'Therapy' },
		{ xtype : 'TemplateHydration', title : 'Post Therapy', type : 'Post' },
		{ xtype : 'TemplateReferences',height : 130 },


                { xtype : "container", layout : "hbox", margin : "5 5 0 0", items : [ 
                        { xtype : 'textfield', name : "RegimenName", fieldLabel: 'Chemotherapy Regimen Name', labelAlign : "right", width : 700, labelWidth: 200, readOnly: true, disabled: true },
                        { xtype : "container", margin: "2 0 0 5", html : "<span style=\"color: blue;\">Generated</span>" }
                ]},
            
                { xtype : "container", layout : "hbox", margin : "5 5 0 0", items : [ 
                        { xtype : "textfield", name : "TemplateAlias", fieldLabel : "Template Name", labelAlign : "right", width : 700 },
                        { xtype : "container", margin: "2 0 0 5", html : "<span style=\"color: blue;\">Optional</span>" }
                ]},
                { xtype : "textfield", name : "KeepActive", hidden: true, value:"1" },


		{
			layout: 'hbox', 
			margin: '0 0 10 300',	// style: 'margin-left: 300px;',
			items: [
				{xtype : 'button', text : 'Save Template', action: 'save'},
				{xtype : 'container',html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},
//				{xtype : 'button', text : 'Save Template As...', action: 'saveAs'},
//				{xtype : 'container',html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},
				{xtype : 'button',text : 'Clear Template', action: 'clear'}
			]
		}
	]
});

