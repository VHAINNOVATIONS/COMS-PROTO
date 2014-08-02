Ext.define("COMS.controller.Common.SelectAdverseReactionAlerts", {
	"extend" : "Ext.app.Controller",
	"records" : [],

	"views" : [ "Common.SelectAdverseReactionAlerts" ],

	"refs" : [
		{ ref: "hiddenfield",		selector: "hiddenfield"},
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
		var theWin = btn.up("window");
		var theForm = btn.up("form").getForm();
		var PAT_ID = theWin.PAT_ID;
		var records = theWin.records;
		var theValues = theForm.getValues().AdverseReactions4Alert;
		theValues = theValues.split(",");
		var i, j, k, alertEvent, rec, rec1, len1 = theValues.length, len2 = records.Details.length, len3;
		for (i = 0; i < len1; i++) {
			alertEvent = theValues[i];
			for (j = 0; j < len2; j++) {
				rec = records.Details[j];
				rec.alertEvent = false;
				if (rec.sectionTitle) {
					if (alertEvent == rec.sectionTitle + " - " + rec.fieldLabel) {
						rec.alertEvent = true;
						break;
					}
				}
				else {
					if (alertEvent == rec.fieldLabel) {
						rec.alertEvent = true;
						break;
					}
				}
			}
		}




		theWin.fnc(records, this.application.Patient, this.application);

		theWin.close();
	},

	"CancelProc" : function(btn) {
		btn.up("window").close();
	},

	"WidgetRenderred" : function(theWindow, eOpts) {
		var theDetails = theWindow.initialConfig.records.Details;
		var theType = theWindow.initialConfig.type;
		theWindow.down("hiddenfield").setValue(theType);
		var theCombo = theWindow.down("checkcombo");
		var i, tmp, len = theDetails.length, dStore = [];
		for (i = 0; i < len; i++) {
			tmp = "";
			if (theDetails[i].sectionTitle) {
				tmp = theDetails[i].sectionTitle + " - ";
			}
			tmp += theDetails[i].fieldLabel;
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
