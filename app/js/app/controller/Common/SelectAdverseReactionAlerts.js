Ext.define("COMS.controller.Common.SelectAdverseReactionAlerts", {
	"extend" : "Ext.app.Controller",
	"records" : [],

	"views" : [ "Common.SelectAdverseReactionAlerts" ],

	"refs" : [
		{ ref: "Disease",		selector: "selDisease"},
		{ ref: "DiseaseStage",	selector: "selDiseaseStage"},
		{ ref: "DiseaseStageInput",	selector : "[name=\"Select Disease Stage Control\"]" }
	],

	"init" : function() {
		this.control({
			"SelectAdverseReactionAlerts button[text=\"Cancel\"]" : {
				click: this.CancelProc
			},
			"SelectAdverseReactionAlerts button[text=\"Save\"]" : {
				click: this.SaveAlerts
			},
			"SelectAdverseReactionAlerts" : {
				afterrender : this.WidgetRenderred
			}

		});
	},

	"SaveAlerts" : function(btn) {
		var theForm = btn.up("form").getForm();
		theForm.url = 'save-form.php';
		theForm.submit({
			success: function(theForm, action) {
				Ext.Msg.alert('Success', action.result.msg);
			},
			failure: function(theForm, action) {
				Ext.Msg.alert('Failed', action.result.msg);
			}
		});
		btn.up("window").close();
	},

	"CancelProc" : function(btn) {
		btn.up("window").close();
	},

	"WidgetRenderred" : function(theWindow, eOpts) {
		var theCombo = theWindow.down("checkcombo");
		var theDetails = theWindow.initialConfig.records.Details;
		var i, tmp, len = theDetails.length, dStore = [];
		for (i = 0; i < len; i++) {
			tmp = theDetails[i];
			tmp = theDetails[i].sectionTitle + " - " + theDetails[i].fieldLabel;
			tmp = { "fieldLabel" : tmp };
			dStore.push( tmp );
		}
		var theStore = Ext.create('Ext.data.Store', {
			"fields" : ["fieldLabel"],
			"data" : dStore
		});
		theCombo.bindStore(theStore);
	}
});
