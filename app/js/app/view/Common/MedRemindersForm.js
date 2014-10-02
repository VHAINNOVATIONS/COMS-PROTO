Ext.define("COMS.view.Common.MedRemindersForm", {
	"extend": "Ext.form.Panel",
	"alias": "widget.MedRemindersForm",
	"header": false,
	"margin": 10,
	"bodyPadding": "5 5 0",

	/*** SQL Field Definitions for this form
	[MR_ID] [uniqueidentifier] NOT NULL,
	[Order_ID] [uniqueidentifier] NOT NULL,
	[Patient_ID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Date_Reminder] [datetime] NULL,
	[Date_ReminderDue] [datetime] NULL,
	[Date_Entered] [datetime] NULL,
	[Date_Modified] [datetime] NULL,
	[Status] [nvarchar](max) NULL
	***/

	defaultType: 'textfield',
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
	layout: 'anchor',
	items: [
		{ xtype : "container", layout : "hbox", 
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
			items : [
				{
					xtype: 'combo',
					name: 'ReminderWhenCycle',
					labelAlign: "right",
					fieldLabel: 'When <em>*</em>',
					labelWidth: 75,
					margin: "5 10 0 0",
					queryMode: 'local',
					store : ["Before", "After"]
				},

				{
					xtype: 'combo',
					name: 'ReminderWhenPeriod',
					margin: "5 10 0 0",
					queryMode: 'local',
					store : ["Cycle", "Administration Day"]
				}
			]
		},
		{ xtype : "textfield", 
			labelAlign: 'right',
			margin: '5 5 5 0',
			labelWidth: 75,
			anchor: '95%',
			fieldLabel: "Title <em>*</em>",
			name: 'Title'
		},
		{
			xtype: 'textareafield',
			grow: true,
			labelAlign: 'right',
			margin: '5 5 5 0',
			labelWidth: 75,
			anchor: '95%',
			fieldLabel: "Description",
			name: 'Description'
		},



		{ xtype: 'hiddenfield', name: 'TemplateID' },
		{ xtype: 'hiddenfield', name: 'MR_ID' },

		{
			xtype: 'container',
			layout: 'hbox',
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
			items: [
				{ "xtype" : "button", "text" : "Save", "scope" : this }, 
				{ "xtype" : "button", "text" : "Cancel", "scope" : this }
			]
		}
	]
});