Ext.define('COMS.view.Authoring.MedReminder' ,{
	extend: 'Ext.form.Panel',
	alias : 'widget.MedReminder',
	margin: '0 20 20 20',
	title : 'Medication Reminders',
	items: [
		{
			xtype : "grid",
			store: "MedReminders",
			viewConfig: { stripeRows: true },

			columns : [
				{header: 'When',  dataIndex: 'ReminderWhenCycle',  flex: 1},
				{header: '',  dataIndex: 'ReminderWhenPeriod',  flex: 1},
				{header: 'Title', dataIndex: 'Title', flex: 5}
			],
			buttons: [
				{ text: 'Add Reminder', title: 'AddReminder'},
				{ text: 'Remove Reminder', title: 'RemoveReminder', disabled: true },
				{ text: 'Edit Reminder', title: 'EditReminder', disabled: true}
			],
			buttonAlign: 'left'
		},
			{ xtype : "MedRemindersForm", hidden : true }
		]
});
