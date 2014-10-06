Ext.define("COMS.view.Common.MedRemindersGrid", {
	"extend": "Ext.grid.Panel",
	"alias": "widget.MedRemindersGrid",
	"header": false,
	//"margin": 10,
	//"bodyPadding": "5 5 0",
	// store: "MedReminders",
	viewConfig: { stripeRows: true },
	plugins: [ Ext.create("Ext.grid.plugin.CellEditing", { clicksToEdit: 1 }) ],
	columns : [
		{header: 'When',  dataIndex: 'ReminderWhenCycle',  flex: 1},
		{header: '',  dataIndex: 'ReminderWhenPeriod',  flex: 1},
		{header: 'Title', dataIndex: 'Title', flex: 5}
	],
	buttonAlign: 'left',
	buttons: [
		{ text: 'Add Reminder', title: 'AddReminder'},
		{ text: 'Remove Reminder', title: 'RemoveReminder', disabled: true }
	],

	initComponent: function () {
		var me = this;

		var theStore = Ext.create("COMS.store.MedReminders");
		Ext.apply(me, {
			store: theStore
		}); 

		me.callParent();
	}
});