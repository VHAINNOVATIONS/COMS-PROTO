Ext.define('COMS.controller.TemplateList.puWinListPatients', {
	extend: 'Ext.app.Controller',
	views: [ "TemplateList.puWinListPatients" ],

	refs: [
		{ ref: "theGrid", selector: "puWinListPatients grid"}
	],

	init: function () {
		this.control({
			"scope" : this,
			"puWinListPatients" : {
				"beforerender" : this.renderPanel,
				"close" : function() { delete this.application.TemplateListPatients; }
			},
			"puWinListPatients button": {
				"click" : this.closeWindow
			}
		});
	},

	closeWindow : function(btn) {
		delete this.application.TemplateListPatients;
		btn.up('window').close();
	},


	renderPanel: function (panel) {
		if (this.application.TemplateListPatients) {
			var theGrid = this.getTheGrid();
			theGrid.getStore().loadData(this.application.TemplateListPatients);
		}
		else {
			Ext.Msg.alert("Error", "No Patient Information is available for display for this template");
		}
		return true;
	}
});
