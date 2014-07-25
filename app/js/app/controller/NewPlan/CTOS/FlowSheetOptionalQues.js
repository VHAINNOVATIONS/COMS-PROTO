Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetOptionalQues", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
		"NewPlan.CTOS.FlowSheetOptionalQues"
	],

    refs: [
		{ ref: "SaveBtn",					selector: "FlowSheetOptionalQues button[text=\"Save\"]"},
		{ ref: "ToxDetails",					selector: "FlowSheetOptionalQues [name=\"ToxDetails\"]"}
	],

	init: function () {
		this.control({
			"scope" : this,
			"FlowSheetOptionalQues button[text=\"Save\"]" : {
				click: this.Save
			},
			"FlowSheetOptionalQues combobox[name=\"ToxInstr\"]" : {
				"change" : this.SelectToxInstr
			}
		});
	},

	SelectToxInstr : function(theCombo, nValue, oValue, eOpts) {
		// debugger;
		var ToxDetailsField = this.getToxDetails();

		var comboStore = theCombo.getStore();
		var theRecord = comboStore.findRecord("ID", nValue);
		var theData = theRecord.getData();
		ToxDetailsField.setValue(theData.Details);



	},

	Save : function(btn) {
		var PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F", Cycle = "", Day = "";
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
			"url" : Ext.URLs.FlowSheetOptionalInfo,
			params : {
				"PAT_ID" : PAT_ID,
				"Cycle" : Cycle,
				"Day" : Day
			},
			success: function(form, action) {
			   Ext.Msg.alert('Success', "Optional Information has been successfully saved");
			   theForm.up("window").close();
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
			}
		});
	}
});