Ext.define("COMS.view.Common.puWinSelCancer",{
	"extend" : "Ext.window.Window",
	"alias" : "widget.puWinSelCancer",
	"title" : "Patient Type(s) of Cancer",
	"name" : "piCancerSelection",
				closeAction: 'hide',
				width: 360,
				height: 270,
				minHeight: 270,
				layout: 'fit',
				resizable: true,
				modal: true,
	"items" : [
		{
			"xtype" : "form",
			layout: { type: "vbox", align: "stretch" },
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelAlign: 'top',
				labelWidth: 100,
				labelStyle: 'font-weight:bold'
			},
			defaults: {
				margins: '0 0 10 0'
			},

			items: [{ xtype : "selDisease" }, { xtype : "selDiseaseStage" }],
			buttons: [
				{ text: 'Save', scope : this },
				{ text: 'Cancel' }
			]
		}
	]
});