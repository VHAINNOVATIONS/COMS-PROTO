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

	// Used by internal COMS operations to save info on Administered Medications.
	SaveNewCumDoseInfo : function( Info ) {
		//Info : { MedID, UnitsID, Source, AdministeredDose }
		Ext.Ajax.request({
			"scope" : this,
			"url" : Ext.URLs.PatientCumulativeDosing + "/" + this.application.Patient.id,
			"method" :"POST",
			"params" : {
				"Source" : "Administered and tracked via COMS on " + Ext.Date.format(new Date(), "d/m/Y"),
				"value" : Info.MedID,
				"LifetimeDose" : Info.AdministeredDose,
				"Units" : Info.UnitsID,
				"CumulativeDoseUnits" : Info.UnitsID,
				"AdministeredByCOMS" : 1
			},
			"success" : this.RefreshPatientInfoDetails
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

	RefreshPatientInfoDetails : function() {
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

	FormSubmitGood : function(form) {
		var theInfo = this.getMedMaxAllowable();
		if (theInfo) {
			theInfo.update("");
		}
		var theField = this.getHistoricalDoseUnits();
		if (theField) {
			theField.update("");
		}
		if (form.owner.up("window")) {
			form.owner.up("window").close();		// hide();
		}
		form.reset();
		// Refresh the patient info table with latest data from DB
		this.RefreshPatientInfoDetails();

	},
	FormSubmitBad : function(form, action) {
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
				success: function(form) {
					this.FormSubmitGood(form);
				},
				failure: function(form, action) {
					this.FormSubmitBad(form, action);
				}
			}
		);
	},

	Save : function(btn) {
/**
		Info = { 
			MedID : "7D95474E-A99F-E111-903E-000C2935B86F", 
			UnitsID : "AB85F3AA-0B21-E111-BF57-000C2935B86F", 
			AdministeredDose : 2468
		};
		this.SaveNewCumDoseInfo ( Info );
		return;
 **/

		var theForm = btn.up('form').getForm();
		if (theForm.isValid()) {
			this._submitForm(theForm);
		}
	},
	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').hide();
	}
});