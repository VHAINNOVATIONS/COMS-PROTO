Ext.define("COMS.controller.Common.puWinAddCumDose", {
	extend : "Ext.app.Controller",

	stores : [ "DiseaseType", "DiseaseStage" ],
	views : [ "Common.selDisease", "Common.selDiseaseStage" ],

	refs: [
		{ "ref" : "HistoricalDoseUnits",				selector: "puWinAddCumDose component[name=\"HistoricalDoseUnits\"]" },
		{ "ref" : "MedMaxAllowable",					selector: "puWinAddCumDose component[name=\"MedMaxAllowable\"]" },
		{ "ref" : "NewPlanTab",							selector: "NewPlanTab"}
	],

	init: function() {
		this.control({
			"puWinAddCumDose" : {
				"show" : function() {this.Saving=false;},
				"close" : this.Close
			},
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

	ClearWarning : function() {
		var msgSection = Ext.ComponentQuery.query("NewPlanTab")[0].query("[name=\"CumulativeDosingWarning\"]")[0];
		if (msgSection) {
			msgSection.update("");
			msgSection.hide();
		}
	},

	UpdateCumDoseInfo : function() {
		var cdInfo, appliedTemplate, len = 0, med2ckLen,  exceedsCount, WarningMsgBuf, curTemplateCumDoseTrackingMeds, i, j, med2Ck, med2ckFlg, rec, cur, max, WarningLimit, ExceedsWarningLimit;
		if (!this.application.Patient.AppliedTemplate || !this.application.Patient.CumulativeDoseTracking) {
			return;	// Template is not applied so no need to try for a warning msg
		}

		cdInfo = this.application.Patient.CumulativeDoseTracking;
		if (cdInfo) {
			len = cdInfo.length;
		}
		appliedTemplate = this.application.Patient.AppliedTemplate;
		curTemplateCumDoseTrackingMeds = appliedTemplate.CumulativeDoseMedsInRegimen;
		med2ckLen = curTemplateCumDoseTrackingMeds.length;

		exceedsCount = 0;
		WarningMsgBuf = "";

		for (i = 0; i < len; i++) {
			rec = cdInfo[i];
			med2ckFlg = false;
			for (j = 0; j < med2ckLen; j++) {
				med2Ck = curTemplateCumDoseTrackingMeds[j];
				if (med2Ck.MedName === rec.MedName) {
					med2ckFlg = true;

					cur = rec.CurCumDoseAmt;
					if (rec.MedMaxDose) {
						max = rec.MedMaxDose.replace(",", "") * 1;		// rec.MedMaxDose is string which may contain thousands separator
						ExceedsWarningLimit = (cur / max) * 100;
						WarningLimit = 0.75 * max;
						if (ExceedsWarningLimit > 75) {
							exceedsCount++;
							exceeds = cur - WarningLimit;
// 							var maxNum = Ext.util.Format.number(("" + max).replace(",", ""), "0,0");
							var maxNum = Ext.FormatNumber(("" + max).replace(",", ""));
// 							var ExceedsNum = Ext.util.Format.number(("" + exceeds).replace(",", ""), "0,0");
							var ExceedsNum = Ext.FormatNumber(("" + exceeds).replace(",", ""));
// 							var CurDose = Ext.util.Format.number(("" + cur).replace(",", ""), "0,0");
							var CurDose = Ext.FormatNumber(("" + cur).replace(",", ""));
							var pct = ((cur/max)*100);
							// pct = Ext.util.Format.number(pct, "0,0.0");
							pct = Ext.FormatNumber(pct);
							WarningMsgBuf += "<tr><td>" + rec.MedName + "</td>" + 
								"<td>" + maxNum + " " + rec.MedMaxDoseUnits + "</td>" + 
								"<td>" + CurDose + " " + rec.MedMaxDoseUnits + "</td>" + 
								"<td>" + pct + "%</td></tr>";
						}
					}
				}
			}

		}
		var plural = (exceedsCount > 1 ? "s " : " ");
		var tmpBuf = "Warning! <br>Regimen Medication" + plural + "Approaching or Exceeding Recommended Maximum Dose" + plural + "<table border=\"1\">"
		tmpBuf += "<tr><th>Medication</th><th>Recommended Max</th><th>Patient Lifetime Total</th><th>Percentage</th></tr>";
		tmpBuf += WarningMsgBuf + "</table>";

		var parent = this.getNewPlanTab();
		var msgSection = Ext.ComponentQuery.query("NewPlanTab")[0].query("[name=\"CumulativeDosingWarning\"]")[0];
		if (msgSection) {
			if (exceedsCount > 0) {
				msgSection.update(tmpBuf);
				msgSection.show();
			}
			else {
				msgSection.update("");
				msgSection.hide();
			}
		}
	},

	// Used by internal COMS operations to save info on Administered Medications.
	SaveNewCumDoseInfo : function( Info ) {
		//Info : { MedID, UnitsID, Source, AdministeredDose }
		Ext.Ajax.request({
			"scope" : this,
			"url" : Ext.URLs.PatientCumulativeDosing + "/" + this.application.Patient.id,
			"method" :"POST",
			"params" : {
				"MedName" : Info.MedName,
				"UnitName" : Info.UnitName,
				"Source" : "Administered and tracked via COMS on " + Ext.Date.format(new Date(), "m/d/Y"),
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
						this.UpdateCumDoseInfo();
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
		form.reset();
		if (form.owner.up("window")) {
			form.owner.up("window").close();
		}

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
		// form.owner.up("window").close();
		// form.reset();
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
					this.Close();
				},
				failure: function(form, action) {
					this.FormSubmitBad(form, action);
					this.Close();
				}
			}
		);
	},

	Save : function(btn) {
		if (!this.Saving) {		// Prevents multiple saves by clicking the "Save" button more than once
			var theForm = btn.up('form').getForm();
			if (theForm.isValid()) {
				this.Saving = true;
				this._submitForm(theForm);
			}
		}
	},

	Cancel : function(btn) {
		btn.up('form').getForm().reset();
		btn.up('window').close();
		this.Close();
	},

	Close : function() {
		Ext.COMS_UnLockSection();
	}
});