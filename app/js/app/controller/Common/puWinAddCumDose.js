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
		var cdInfo = this.application.Patient.CumulativeDoseTracking;
		var i, rec, exceedsCount = 0, len = cdInfo.length, cur, max, WarningLimit, ExceedsWarningLimit, WarningMsgBuf = "";


		for (i = 0; i < len; i++) {
			rec = cdInfo[i];
			cur = rec.CurCumDoseAmt;
			max = (rec.MedMaxDose * 1);		// rec is string
			ExceedsWarningLimit = (cur / max) * 100;
			WarningLimit = 0.75 * max;
			if (ExceedsWarningLimit > 75) {
				exceedsCount++;
				exceeds = cur - WarningLimit;
				var maxNum = Ext.util.Format.number(("" + max).replace(",", ""), "0,0");
				var ExceedsNum = Ext.util.Format.number(("" + exceeds).replace(",", ""), "0,0");
				var CurDose = Ext.util.Format.number(("" + cur).replace(",", ""), "0,0");
				WarningMsgBuf += "<tr><td>" + rec.MedName + "</td>" + 
					"<td>" + maxNum + " " + rec.MedMaxDoseUnits + "</td>" + 
					"<td>" + CurDose + " " + rec.MedMaxDoseUnits + "</td></tr>";
			}
		}
		var tmpBuf = "Warning! <br>The following Medication" + (exceedsCount > 1 ? "s have " : " has ") + "exceeded 75% of the recommended maximum dose<table border=\"1\">"
		tmpBuf += "<tr><th>Medication</th><th>Recommended Max</th><th>Patient Lifetime Dosage</th></tr>";
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