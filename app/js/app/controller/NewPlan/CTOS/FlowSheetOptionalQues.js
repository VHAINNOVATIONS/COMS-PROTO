Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetOptionalQues", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
		"NewPlan.CTOS.FlowSheetOptionalQues"
	],

    refs: [
		{ ref: "SaveBtn",					selector: "FlowSheetOptionalQues button[text=\"Save\"]"}
	],

	init: function () {
		this.control({
			"scope" : this,
			"FlowSheetOptionalQues button[text=\"Save\"]" : {
				click: this.Save
			},
			"FlowSheetOptionalQues button[text=\"Cancel\"]" : {
				click: this.Cancel
			}
		});
	},

	Save : function(btn) {
		this.application.loadMask("Saving Information");
		var PAT_ID = "", Cycle = "", Day = "";
		if (this.application && this.application.Patient) {
			PAT_ID = this.application.Patient.PAT_ID;
			if (this.application.Patient.ThisAdminDay) {
				Cycle = this.application.Patient.ThisAdminDay.Cycle;
				Day = this.application.Patient.ThisAdminDay.Day;
			}
		}

		var theForm = btn.up("form");
		theForm.getForm().submit({
			clientValidation: true,
			scope : this,
			"url" : Ext.URLs.FlowSheetOptionalInfo + "/" + PAT_ID,
			params : {
				"PAT_ID" : PAT_ID,
				"Cycle" : Cycle,
				"Day" : Day
			},
			success: function(form, action) {
			   Ext.Msg.alert('Success', "General Information has been successfully saved");
			   theForm.up("window").close();
			   var theCtrlr = this.getController("NewPlan.CTOS.FlowSheetTab");
			   theCtrlr.updateFlowsheetPanel();
			},
			failure: function(form, action) {
				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('Failure', 'Ajax communication failed');
						break;
					case Ext.form.action.Action.SERVER_INVALID:
					   Ext.Msg.alert('Failure', action.result.msg);
			   }
			   this.application.unMask();
			}
		});
	},

	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').close();
	}
});