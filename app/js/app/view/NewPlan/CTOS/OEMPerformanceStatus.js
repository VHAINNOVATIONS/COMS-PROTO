// Note: Controller for this widget is the "NewPlan.OEM" controller ("app\controller\NewPlan\OEM.js")
Ext.define("COMS.view.NewPlan.CTOS.OEMPerformanceStatus", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OEMPerformanceStatus",

	"title" : "Regimen Performance Status",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 400,

	initComponent : function() {
		this.items = [ {
			"xtype" : "form",
			"items" : [
				{
					xtype: 'radiogroup',
					name: 'perfStatusRadio',
					labelAlign: 'top',
					fieldLabel: 'Select the Performance Status',
					id: 'performanceRadios',
					margin: '5 5 25 5',
					columns: 1,
					items: this.itemsInGroup
				}
			]
		}];
		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', scope: this, handler: this.close }
		];

		this.callParent(arguments);
	}


});