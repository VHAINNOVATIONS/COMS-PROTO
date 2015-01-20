Ext.define("COMS.controller.Common.puWinSelBSA", {
	extend : "Ext.app.Controller",
	init: function() {
		this.control({
			"puWinSelBSA" : {
				"close" : this.Close
			},
			"puWinSelBSA button[text=\"Cancel\"]" : {
				click: this.Cancel
			},
			"puWinSelBSA button[text=\"Save\"]" : {
				click: this.Save
			}
		});
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var Patient = this.application.Patient;
		if (theForm.isValid()) {
			var theData = theForm.getValues();
			var patient_id = this.application.Patient.id;
			Ext.Ajax.request({
				url: "/Patient/BSA/" + patient_id,
				method : "POST",
				jsonData : theData,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.COMS_UnLockSection();
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "NewPlanTab - BSA Selection, Save Error - " + resp.msg );
					}
					else {
						Patient.WeightFormula = theData.WeightFormula;
						Patient.BSAFormula = theData.BSAFormula;
						Patient.BSA_Method = theData.BSAFormula;
						var piTableInfo = thisCtl.getPatientInfoTableInformation();
						piTableInfo.update(Patient);
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.COMS_UnLockSection();
					Ext.MessageBox.alert("Saving Error", "NewPlanTab - BSA Selection, Save Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
				theForm.reset();
				btn.up('window').hide();
				Ext.MessageBox.alert('Thank you!', 'Patient BSA Determination has been saved');
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
		Ext.COMS_UnLockSection();
	},

	Close : function() {
		Ext.COMS_UnLockSection();
	}
});