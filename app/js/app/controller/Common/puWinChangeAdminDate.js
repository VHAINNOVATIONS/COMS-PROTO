Ext.define("COMS.controller.Common.puWinChangeAdminDate", {
	"extend" : "Ext.app.Controller",

	"views" : [
		"Common.puWinChangeAdminDate"
	],


	"refs" : [
		{ "ref" : "NewAdminDate",		"selector" : "puWinChangeAdminDate [name=\"NewAdminDate\"]"},
		{ "ref" : "CurAdminDate",		"selector" : "puWinChangeAdminDate [name=\"CurAdminDate\"]"},
		{ "ref" : "ChangeAdminDateOffsetMsg",		"selector" : "puWinChangeAdminDate [name=\"ChangeAdminDateOffsetMsg\"]"}
	],


	"init" : function() {
		this.application.on( { ProcAdminDateChange : this.ProcAdminDateChange, scope : this } );
		this.control({
			"scope" : this,
			"puWinChangeAdminDate" : {
				"beforerender" : this.setMinDate
			},
			"puWinChangeAdminDate [name=\"NewAdminDate\"]" : {
				"change" : this.updateNewDate,
				"expand" : this.InitNewDatePicker
			},
			"puWinChangeAdminDate combobox" : {
				"change" : this.Dates2Change
			},
			
			"puWinChangeAdminDate button[text=\"Cancel\"]" : {
				"click" : this.Cancel
			},
			"puWinChangeAdminDate button[text=\"Save\"]" : {
				"click" : this.Save
			}
		});
	},
	"offsetDays" : 0,
	"newDate" : "",
	"AcceptableChangeMsg" : "",
	"CurCycle" : 0,
	"Range2Change" : [],

	"getNextCycleIdx" : function ( curCycle, idx ) {
		var i, tmp, list = this.getOEMRecords(), len = list.length;
		for (i = idx+1; i < len; i++) {
			tmp = list[i];
			if (tmp.Cycle !== curCycle) {
				return i;
			}
		}
		return null;
	},

	"getIdx4AdminDate" : function(AdminDate) {
		var tmp, 
			i, 
			list = this.getOEMRecords(), 
			len = list.length;
		for (i = 0; i < len; i++) {
			tmp = list[i];
			if (tmp.AdminDate == AdminDate) {
				return i;
			}
		}
		return null;
	},

	"initializeCurAdminDate" : function(AdminDate) {
		var cur = this.getCurAdminDate();
		cur.setValue(AdminDate);
	},
	"InitNewDatePicker" : function(fld) {
		var cur = this.getCurAdminDate();
		var AdminDate = cur.getValue();
		fld.setValue(AdminDate);
	},

	"getMinDate" : function() {
		// var newDate = Ext.Date.add(new Date(), Ext.Date.DAY, -5);
		var newDate = new Date();
		return newDate;
	},

	"getOEMRecords" : function() {
		var OEMRecords = this.application.Patient.OEMRecords.OEMRecords;
		return OEMRecords;
	},

	"addDays2Date" : function(nDays, aDate) {
		var ms = nDays * 86400000;
		var aDateDate = new Date(aDate);
		var dt = Ext.Date.add(aDateDate, Ext.Date.MILLI, ms);
		var dt1 = Ext.Date.format(dt, "m/d/Y");
		return dt1;
	},

	"Dates2ChangeHandler" : function() {
		var nRange,
			NextCycleIdx,
			LastDayOfCycleRec,
			NewLastDateOfCycle,
			StartOfNextCycle,
			NewDateInList, 
			list, 
			CurDate, 
			CurAdminDayIdx;
		nRange = this.nRange;
		if (!nRange) {
			return;
		}
		this.AcceptableChangeMsg = "";
		this.Range2Change = [];
		list = this.getOEMRecords();
		CurDate = new Date(this.getCurAdminDate().getValue());
		CurDate = Ext.Date.format(CurDate, "m/d/Y");
		CurAdminDayIdx = this.getIdx4AdminDate(CurDate);

		NewDateInList = this.getIdx4AdminDate(this.newDate);
		// nRange == "This", "Cycle", "All"
		
		if ("This" == nRange) {
			if (NewDateInList) {
				this.AcceptableChangeMsg = "There is another administration day on this date";
			}
			else if (CurAdminDayIdx < list.length) {
				this.AcceptableChangeMsg = "The new date jumps over other Administration Days";
			}
			else {
				this.Range2Change[0] = CurAdminDayIdx;
			}
		}
		else if ("Cycle" == nRange) {
/*
 * get start of next cycle
 * get last date of this cycle
 * add offsetDays to last date of this cycle.
 * if offset of last day of this cycle > start of next cycle then error
 */
			this.CurCycle = 0;
			if (CurAdminDayIdx) {
				this.CurCycle = list[CurAdminDayIdx].Cycle;
				NextCycleIdx = this.getNextCycleIdx(this.CurCycle, CurAdminDayIdx);
				if (NextCycleIdx) {
					LastDayOfCycleRec = list[NextCycleIdx - 1];
					NewLastDateOfCycle = this.addDays2Date(this.offsetDays, LastDayOfCycleRec.AdminDate);
					StartOfNextCycle = list[NextCycleIdx];

					var NextCycle = new Date(StartOfNextCycle.AdminDate);
					var thisCycle = new Date(NewLastDateOfCycle);
					if (NextCycle <= thisCycle) {
						this.AcceptableChangeMsg = "Changes will overlap the next cycle";
					}
					else {
						this.Range2Change[0] = CurAdminDayIdx;
						this.Range2Change[1] = NextCycleIdx - 1;
					}
				}
				else {
					LastDayOfCycleRec = list.length;
					NewLastDateOfCycle = this.addDays2Date(this.offsetDays, LastDayOfCycleRec.AdminDate);
					var thisCycle = new Date(NewLastDateOfCycle);
					this.Range2Change[0] = CurAdminDayIdx;
					this.Range2Change[1] = LastDayOfCycleRec;
				}
			}
		}
		else {
			this.Range2Change[0] = CurAdminDayIdx;
			this.Range2Change[1] = list.length-1;
		}
	},

	"Dates2Change" : function(fld, nRange) {
		this.nRange = nRange;
		this.Dates2ChangeHandler();
	},

	"updateNewDate" : function(fld, nDate) {
		var CurDate = new Date(this.getCurAdminDate().getValue());
		var MinDate = this.getMinDate();
		this.AcceptableChangeMsg = "";
		if (nDate) {
			/* Formula now takes into account Daylight Savings Time */
			var EndDateConverted = Date.UTC(nDate.getFullYear(), nDate.getMonth(), nDate.getDate());
			var StartDateConverted = Date.UTC(CurDate.getFullYear(), CurDate.getMonth(), CurDate.getDate());
			var nDays = ( EndDateConverted - StartDateConverted) / 86400000;

			var dt = Ext.Date.add(MinDate, Ext.Date.DAY, nDays);
			var dt1 = Ext.Date.format(dt, "m/d/Y");
			var m1 = "days";
			if (1 === nDays) {
				m1 = "days";
			}
			this.getChangeAdminDateOffsetMsg().update("New Administration Date(s) will be offset by <span style=\"font-weight:bold\";>" + nDays + "</span> " + m1);
			this.newDate = Ext.Date.format(nDate, "m/d/Y");
			this.offsetDays = nDays;
		}
		this.Dates2ChangeHandler();
	},

	"setMinDate" : function() {
		var dateFld = this.getNewAdminDate();
		dateFld.setMinValue( this.getMinDate() );
	},

	"Cancel" : function(btn) {
		btn.up('window').close();
	},

	"Save" : function(btn) {
		var range2change = this.Range2Change;
		var msg = this.AcceptableChangeMsg;
		var list = this.getOEMRecords(), len = list.length;

		
		if ("" === this.AcceptableChangeMsg) {
			if (1 === range2change.length) {
				this.application.fireEvent("ProcAdminDateChange", range2change[0], 0);
			}
			else {
				this.application.fireEvent("ProcAdminDateChange", range2change[0], range2change[1]);
			}
			btn.up('window').close();
			return;
		}
		Ext.MessageBox.alert('Warning', this.AcceptableChangeMsg + "<br>The requested date change will NOT be performed");
	},

	ProcAdminDateChange : function(idxOfFirstRec2Change, idxOfLastRec2Change, theScope) {
		var list = this.getOEMRecords();
		var listLen = list.length;
		var rec = list[idxOfFirstRec2Change];
		var OldDate = rec.AdminDate;
		var NewDate = this.addDays2Date(this.offsetDays, OldDate); 
		rec.AdminDate = NewDate;
		NewDate = Ext.Date.format(new Date(NewDate), "Y-m-d");
		// console.log("Changing Admin Date from - " + OldDate + " to - " + NewDate);
	
		var URL = "/Patient/UpdateAdminDate/" + rec.id + "/" + NewDate;		// TemplateID/AdminDate = 21F92BED-7DA5-4CA2-92B3-4EE1FD5E601C; 2014-09-25

		Ext.Ajax.request({
			scope : this,
			url: URL,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success) {

					if (idxOfFirstRec2Change < idxOfLastRec2Change) {
						idxOfFirstRec2Change++;
						// console.log("Firing next event - " + idxOfFirstRec2Change);
						this.application.fireEvent("ProcAdminDateChange", idxOfFirstRec2Change, idxOfLastRec2Change);
					}
					else {
						// console.log("Finished changing dates");
						this.application.Patient.TreatmentStart = list[0].AdminDate;
						this.application.Patient.TreatmentEnd = list[listLen-1].AdminDate;
						var PatientInfo = this.application.Patient;
						PatientInfo.OEMDataRendered = false;
						var theController = this.getController("NewPlan.OEM");
						theController.displayOEM_Record_Data(PatientInfo);
						var theTab = theController.getOEMTab();
						theController.tabRendered(theTab);
					}
				}
				else {
					alert("load EoTS - Error");
				}
			},
			failure : function( response, opts ) {
				this.application.unMask();
				alert("EoTS Data Load Failed...");
			}
		});
	}
});