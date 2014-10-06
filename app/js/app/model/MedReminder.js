Ext.define('COMS.model.MedReminder', {
	extend: 'Ext.data.Model',
	fields: ["MR_ID", "TemplateID", "Title", "Description", "ReminderWhenCycle", "ReminderWhenPeriod"],
	proxy: {
		type: 'rest',
		url : "/Patient/MedReminders",
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});