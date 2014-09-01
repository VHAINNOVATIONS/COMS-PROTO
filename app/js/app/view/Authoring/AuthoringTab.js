/*
 *	MWB - 12/5/2011
 *	Template Authoring Tab View
 *	This view maintains the tabset for the "Template Authoring Tab" which is one of the main tabs in the application
 *	It is rendered in the application container as part of the main tabset (see "Navigation".
 *	This view is managed by the 'TemplateAuthoring' Control
 */
Ext.define('COMS.view.Authoring.AuthoringTab' ,{
    extend: 'Ext.container.Container',
    alias : 'widget.AuthoringTab',
    name : 'Template Author Tab',
		height: 'auto',

    //	margin : '10',
    autoEl : {
        tag : 'section'
    },
    items : [
    {
        xtype : 'container',
        autoEl : {
            tag : 'section'
        },
        title : 'Create New Template',
        defaults : {
            xtype : 'container', 
            labelAlign: 'right'
        },
        items : [

            {
                xtype : 'fieldcontainer', 
                fieldLabel : "What do you want to do?", 
                labelAlign: "right", 
                labelWidth : 180,
                defaultType: 'radiofield', 
                defaults: {
                    flex: 1
                },
                items: [ 
                {
                    boxLabel  : "Select Existing Template", 
                    name : "Authoring_SelectTemplateType", 
                    inputValue: 0
                }, 
                {
                    boxLabel  : "Create New Template", 
                    name  : "Authoring_SelectTemplateType", 
                    inputValue: 1
                }
                ]
            },
            {"xtype": "RequiredInstr"},
            {
                xtype : 'container',  
                name : "selCTOSTemplate", 
                hidden : true, 
                autoEl : {
                    tag : 'section'
                }, 
                margin: '0', 
                items : [

                { 
                    xtype : 'textfield', 
                    name : "PatientName", 
                    fieldLabel: 'Patient Name', 
                    labelAlign : "right", 
                    width : 500, 
                    labelWidth: 150,
                    hidden : true,
                    readOnly: true, 
                    disabled: true 
                },
                {
                    xtype : 'Search4Template'
                },
				
				{ xtype : "container" , layout : "hbox", items : [
				        {
					        xtype : 'selTemplateType'
						},
	                    { 
		                    xtype : 'button', 
			                title : 'ResetFilter',
				            text : 'Show All Templates', 
					        margin: '5 0 0 5',
						    hidden: true
	                    }
					]
				},

                {
                    xtype : 'selDiseaseAndStage', 
					name : "4ExistingTemplate", 
                },
                { 
                    xtype: 'container',
                    layout : 'hbox',
                    items : [
                    {
                        xtype : 'selTemplate', 
                        name:'FilteredTemplates'
                    }
                    ]

                }
                ]
            },
            {
                xtype : 'selDiseaseAndStage', 
                name : "4CreateNewTemplate", 
                hidden : true
            },
            {
                xtype : "container", 
                name : "courseInfo", 
                layout : "hbox", 
                margin : "5 5 0 0", 
                hidden: true, 
                items : [ 
                    {
                        xtype : "textfield", 
                        name : "CourseNum", 
                        fieldLabel : "Max Courses", 
                        labelAlign : "right", 
                        width : 250, 
                        labelWidth: 200, 
                        hidden: true
                    },
                    {
                        xtype : "textfield", 
                        name : "CourseNumMax", 
                        fieldLabel : "Max Cycles  <em>*</em>", 
                        labelAlign : "right", 
                        allowBlank : false,
                        width : 140, 
                        labelWidth: 95
                    }
                ]
            },
            {
                xtype : "CreateNewTemplate", 
                hidden : true
            }	// Does NOT have a "selDiseaseAndStage" component in it
        ]
    }
    ],

    initComponent: function() {
        wccConsoleLog(this.name + " - Initialization start...");
        this.callParent(arguments);
        wccConsoleLog(this.name + " - Initialization complete...");
    }
});
