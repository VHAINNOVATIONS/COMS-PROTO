Ext.define("COMS.controller.Common.puWinSelCancer", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	init: function() {
		this.control({
			"selDisease": {
				select: this.onDiseaseSelected
			},
			"selDiseaseStage": {
				select: this.onDiseaseStageChange
			},
			"puWinSelCancer button[text=\"Cancel\"]" : {
				click: this.Cancel
			},
			"puWinSelCancer button[text=\"Save\"]" : {
				click: this.Save
			}

		});
	},

	onDiseaseSelected: function (combo, recs, eOpts) {
		this.application.Cancer = recs[0].data;
		var stage = combo.next();
		var stageStore = stage.getStore();
		stage.reset();
		stageStore.removeAll();
		stageStore.load({
			scope : this,
			params : {
				URL : Ext.URLs.DiseaseStage + "/",
				ID  : this.application.Cancer.id
			}
		});
	},

	onDiseaseStageChange: function (combo, recs, eOpts) {
		this.application.Cancer.Stage = recs[0].data;
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			var theData = theForm.getValues();
			var postData = [], dataEl = [], patientCancerTypes = [];

			for (var key in theData) {
				if (theData.hasOwnProperty(key)) {
					var el = [];
					// el["description"] = key;
					el.description = key;
					patientCancerTypes.push(el);
					postData.push(key);
				}
			}
/**
			var params = {"Amputations" : postData };
			this.application.Patient.Amputations = patientAmputations;
			var AmputationDisplay = Ext.get("PatientInformationTableAmputations");
			postData = postData.join("<br>");
			AmputationDisplay.setHTML(postData);

			var patient_id = this.application.Patient.id;
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
						Ext.MessageBox.alert("Saving Error", "NewPlanTab - AmputationSelection, Save Error - " + resp.msg );
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
					Ext.MessageBox.alert("Saving Error", "NewPlanTab - AmputationSelection, Save Error - " + "e.message" + "<br />" + resp.msg );
					theForm.reset();
					btn.up('window').hide();
				}
			});
**/
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
	}
});