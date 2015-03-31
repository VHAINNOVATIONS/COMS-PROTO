Ext.define("COMS.controller.Common.puWinSelCancer", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	init: function() {
		this.control({
			"puWinSelCancer" : {
				"close" : this.Close
			},
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

	getDiseaseHistory : function(Patient) {
		var URL = Ext.URLs.CancerType + "/" + Patient.id;
		Ext.Ajax.request({
			url: URL,
			method : "GET",
			scope : this,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "Patient Information Type of Cancer, Save Error - " + resp.msg );
					this.application.Patient.Disease = null;
				}
				else {
					// Ext.MessageBox.alert('Thank you!', 'Patient Information Type of Cancer has been saved');
					this.application.Patient.Disease = resp.records;
					this.updatePITable(this.application.Patient);
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "Patient Information Type of Cancer, Save Error - " + "e.message" + "<br />" + resp.msg );
				theForm.reset();
				btn.up('window').hide();
			}
		});
	},

	delDiseaseHistory : function(Patient, PDH_ID) {
		var URL = Ext.URLs.CancerType + "/" + Patient.id + "/" + PDH_ID;
		Ext.Ajax.request({
			url: URL,
			method : "DELETE",
			scope : this,
			success: function( response, opts ){
				Ext.COMS_UnLockSection();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (!resp.success) {
					Ext.MessageBox.alert("Delete Error", "Patient Information Type of Cancer, Delete Error - " + resp.msg );
				}
				else {
					this.application.Patient.Disease = resp.records;
					this.updatePITable(this.application.Patient);
				}
			},
			failure : function( response, opts ) {
				Ext.COMS_UnLockSection();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Delete Error", "Patient Information Type of Cancer, Delete Error - " + "e.message" + "<br />" + resp.msg );
				theForm.reset();
				btn.up('window').hide();
			}
		});
	},


	updatePITable : function(Patient) {
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var piTableInfo = thisCtl.updatePITable(this.application.Patient);
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			var theData = theForm.getValues();
			var postData = [], dataEl = [], patientCancerTypes = [];

			var patient_id = this.application.Patient.id;
			var DiseaseID = theForm.findField("selDisease").getValue();
			var DiseaseStageID = theForm.findField("Select Disease Stage Control").getValue();

			var DiseaseName = theForm.findField("selDisease").getRawValue();
			var DiseaseStageName = theForm.findField("Select Disease Stage Control").getRawValue();
			var params = { Patient_ID : patient_id, "Disease_ID" : DiseaseID, "DiseaseStage_ID" : DiseaseStageID };

			Ext.Ajax.request({
				url: Ext.URLs.CancerType,
				method : "POST",
				jsonData : params,
				scope : this,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					theForm.reset();
					btn.up('window').hide();
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "Patient Information Type of Cancer, Save Error - " + resp.msg );
						this.application.Patient.ListOfDiseases = "";
					}
					else {
						// Ext.MessageBox.alert('Thank you!', 'Patient Information Type of Cancer has been saved');
						this.application.Patient.Disease = resp.records;
						this.updatePITable(this.application.Patient);
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "Patient Information Type of Cancer, Save Error - " + "e.message" + "<br />" + resp.msg );
					theForm.reset();
					btn.up('window').hide();
				}
			});
			this.Close();
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
		this.Close();
	},

	Close : function() {
		Ext.COMS_UnLockSection();
	}
});