Ext.define("COMS.controller.Common.puWinAddCumDose", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	refs: [
		{ "ref" : "HistoricalDoseUnits",				selector: "puWinAddCumDose component[name=\"HistoricalDoseUnits\"]" },
		{ "ref" : "MedMaxAllowable",					selector: "puWinAddCumDose component[name=\"MedMaxAllowable\"]" }
	],

	init: function() {
		this.control({
			"puWinAddCumDose button[text=\"Cancel\"]" : {
				click: this.Cancel
			},
			"puWinAddCumDose button[text=\"Save\"]" : {
				click: this.Save
			},
			"puWinAddCumDose combobox[name=\"value\"]" : {
				"change" : this.ChangeSelection
			} 
		});
	},


	ChangeSelection : function(combo, nvalue) {
		var theStore = combo.getStore();
		var theRecord = theStore.findRecord("MedID", nvalue);
		if (theRecord) {
			this.theData = theRecord.getData();
			var theUnits = this.theData.CumulativeDoseUnits;
			var theAmt = this.theData.CumulativeDoseAmt;
			var theField = this.getHistoricalDoseUnits();
			var theInfo = this.getMedMaxAllowable();
			if (theField) {
				theField.update("&nbsp; in " + theUnits);
			}
			if (theInfo) {
				theInfo.update("Max Allowable Lifetime Cumulative Dosage is " + theAmt + " " + theUnits);
			}
		}
	},


	_submitForm : function(form) {
		form.url += "/" + this.application.Patient.id;
		form.setValues({
			"Units" : this.theData.UnitsID,
			"CumulativeDoseUnits" : this.theData.CumulativeDoseUnits
		});
		form.submit(
			{
				scope : this,
				success: function(form, action) {
					var theInfo = this.getMedMaxAllowable();
					if (theInfo) {
						theInfo.update("");
					}
					var theField = this.getHistoricalDoseUnits();
					if (theField) {
						theField.update("");
					}

					form.owner.up("window").close();		// hide();
					form.reset();
					// Refresh the patient info table with latest data from DB
					Ext.Ajax.request({
						scope : this,
						url: Ext.URLs.PatientCumulativeDosing + "/" + this.application.Patient.id,
						success: function( response, opts ){
							var text = response.responseText;
							var resp = Ext.JSON.decode( text );
							if (resp.success) {
								var recs;
								if (resp.records) {
									recs = resp.records; 
									this.application.Patient.CumulativeDoseTracking = recs;
									var thisCtl = this.getController("NewPlan.NewPlanTab");
									var thePITable = thisCtl.getPatientInfoTableInformation();
									thePITable.update( this.application.Patient );
								}
							}
						}
					});
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
					form.owner.up("window").hide();
					form.reset();
				}
			}
		);
	},

	Save : function(btn) {
		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			this._submitForm(theForm);
/*** Dup check no longer works as the returning data from the call has changed, but we no longer need to do a dup check - MWB 8/14/2014
			Ext.Ajax.request({
				scope : this,
				pForm : theForm,
				url: Ext.URLs.PatientCumulativeDosing + "/" + this.application.Patient.id,
				success: function( response, opts ){
					var selectedMedID = opts.pForm.getValues().value;
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (resp.success) {
						var i, dupMed = false, recs, len;
						if (resp.records) {
							recs = resp.records; 
							len = recs.length;
							for (i = 0; i < len; i++) {
								if (recs[i].MedID === selectedMedID) {
									alert("Duplicate Medication selected. Please select another");
									dupMed = true;
									break;
								}
							}
						}
						if (!dupMed) {
							this._submitForm(theForm);
						}
					}
					else {
						alert("ERROR - Saving Patient Cumulative Medication Dosing History");
					}
				},
				failure : function( response, opts ) {
					alert("ERROR: Saving Patient Cumulative Medication Dosing History");
				}
			});
***/
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
	}
});