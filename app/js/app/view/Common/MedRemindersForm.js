Ext.define("COMS.view.Common.MedRemindersForm", {
	"extend": "Ext.form.Panel",
	"alias": "widget.MedRemindersForm",
	"title": "Medication Reminders",

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

	collapsible: true,
	bodyPadding: '5 5 0',
	defaultType: 'textfield',
	
	"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
	layout: 'anchor',
	items: [
		{
			fieldLabel: 'Title',
			name: 'Title',
			anchor: '95%',

		},
		{
			fieldLabel: 'Description',
			name: 'Description',

			xtype: 'textareafield',
			grow: true,
			anchor: '95%',
		},
		{
			xtype: 'container',
			layout: 'hbox',
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
			items: [
				{
					fieldLabel: 'Reminder',
					name: 'Date_Reminder',
					format: 'm/d/Y',
					minValue : new Date(),
					xtype: 'datefield'
				},
				{
					fieldLabel: 'Date Entered',
					name: 'Date_Entered',
					format: 'm/d/Y',
					minValue : new Date(),
					value: new Date(),
					xtype: 'datefield',
					readOnly: true
				}
			]
		},
		{
			xtype: 'container',
			layout: 'hbox',
			"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label", "labelWidth": 85, margin: "5 10 5 0" },
			items: [
				{
					fieldLabel: 'ReminderDue',
					name: 'Date_ReminderDue',
					format: 'm/d/Y',
					minValue : new Date(),
					xtype: 'datefield'
				},
				{
					fieldLabel: 'Date Edited',
					name: 'Date_Modified',
					format: 'm/d/Y',
					value: new Date(),
					xtype: 'datefield',
					readOnly: true
				},
				{
					fieldLabel: 'Status',
					name: 'Status',
					xtype : 'textfield'
				}
			]
		},

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