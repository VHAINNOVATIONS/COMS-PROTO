Ext.define("COMS.controller.Common.puWinSelAmputation", {
	extend : "Ext.app.Controller",
	init: function() {
		this.control({
			"puWinSelAmputation" : {
				"show" : this.ShowWindow
			},
			"puWinSelAmputation button[text=\"Cancel\"]" : {
				click: this.Cancel
			},
			"puWinSelAmputation button[text=\"Save\"]" : {
				click: this.Save
			}
		});
	},

	ShowWindow : function() {
		var AmpuSelCtl = this.getController("NewPlan.AmputationSelection");
		AmpuSelCtl.renderAS();
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			var theData = theForm.getValues();
			var patient_id, AmputationDisplay, params, postData = [], dataEl = [], patientAmputations = [];
			for (var key in theData) {
				if (theData.hasOwnProperty(key)) {
					var el = [];
					el["description"] = key;
					patientAmputations.push(el);
					postData.push(key);
				}
			}
			params = {"Amputations" : postData };
			this.application.Patient.Amputations = patientAmputations;
			AmputationDisplay = Ext.get("PatientInformationTableAmputations");
			postData = postData.join("<br>");
			AmputationDisplay.setHTML(postData);

			patient_id = this.application.Patient.id;
			this.application.loadMask("Updating Patient Amputations");
			Ext.Ajax.request({
				url: Ext.URLs.Amputations + "/" + patient_id,
				method : "POST",
				jsonData : params,
				scope : this,
				success: function( response, opts ){
					this.application.unMask();
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					theForm.reset();
					btn.up('window').hide();
					if (!resp.success) {
						Ext.MessageBox.alert("Amputation Selection Save Error", "NewPlanTab - AmputationSelection, Save Error - " + resp.msg );
						this.application.Patient.Amputations = "";
					}
					else {
						Ext.MessageBox.alert('Thank you!', 'Patient amputation records have been saved');
					}
				},
				failure : function( response, opts ) {
					this.application.unMask();
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Amputation Selection Save Error", "NewPlanTab - AmputationSelection, Save Error - " + "e.message" + "<br />" + resp.msg );
					theForm.reset();
					btn.up('window').hide();
				}
			});
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
	}
});