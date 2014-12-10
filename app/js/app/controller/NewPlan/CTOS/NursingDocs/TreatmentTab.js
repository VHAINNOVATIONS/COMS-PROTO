// Loading Error - NursingDocs_TreatmentTab - Error - TreatmentTab.js - 89Patient is undefined
//	init: function () {
//	AuthenticateUser : function (button)
//	abSignHandler : function(grid, rowIndex, colIndex)
//	CellEditCommit : function (editor, eObj)
//	CellEdit : function (plugin, eObj, beforeEdit)
//	LoadPreviousTreatmentData : function()
//	ClearTabData : function( )
//	TabRendered : function ( component, eOpts )
//	BtnClicked : function (button)

Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.TreatmentTab", {
	extend: "Ext.app.Controller",

	stores: [
		"ND_Treatment"
	],
	views : [
		"NewPlan.CTOS.NursingDocs.Authenticate",
		"Common.puWinTreatmentAmmend"
	],

	refs: [
	    { ref: "CTOS", selector: "NewPlanTab CTOS" },
		{ ref : "NursingDocsTabSet", selector : "NursingDocs" },
		{ ref : "ND_T_Tab", selector : "NursingDocs_Treatment" },
		{ ref : "ND_T_T_Warning", selector : "NursingDocs_Treatment [name=\"ND_T_T_Warning\"]" },
		{ ref : "ND_T_T_Regimen", selector : "NursingDocs_Treatment [name=\"ND_T_T_Regimen\"]" },
		{ ref : "ND_T_T_Cycle", selector : "NursingDocs_Treatment [name=\"ND_T_T_Cycle\"]" },
		{ ref : "ND_T_T_Day", selector : "NursingDocs_Treatment [name=\"ND_T_T_Day\"]" },
		{ ref : "ND_T_T_Date", selector : "NursingDocs_Treatment [name=\"ND_T_T_Date\"]" },
		{ ref : "ND_T_Meds", selector : "NursingDocs_Treatment [name=\"ND_T_Meds\"]" },
		{ ref : "NursingDocs_Treatment_Meds", selector : "NursingDocs_Treatment_Meds" },		// Meds Grid in Treatment
		{ ref : "NursingDocs_Treatment_MedsView", selector : "NursingDocs_Treatment_Meds > tableview" },		// Meds Grid in Treatment
		{ ref : "TreatmentCompleteBtn", selector : "NursingDocs_Treatment button[text=\"Administration Complete\"]"}
	],


	// Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Administration Complete\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Treatment Tab Controller!");
		this.application.on({ 
				PopulateNDTabs : this.TabRendered,		// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				// SignTreatment : this.abSignHandler,		// Event is fired off from the Treatment Tab "Sign" action button.
				scope : this 
		});

		this.control({
			"NursingDocs_Treatment" : { afterrender : this.TabRendered },
			"NursingDocs_Treatment_Meds" : { // Handles the Cell Edit (both start and end of edit cycle.
				cellclick : this.AssignVerify2SignHandler6,
				beforeedit : this.beforeCellEdit,
				edit : this.afterCellEdit,
				scope : this
			},
			"NursingDocs_Treatment button[name=\"btnPreMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPOMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnIVMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPostMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnHydration\"]" : { click : this.BtnClicked },

			"Authenticate[title=\"Authenticate\"] button[action=\"save\"]": {
				click: {
					scope : this,
					fn : this.AuthenticateUser
				}
			},
			"NursingDocs_Treatment button[text=\"Administration Complete\"]" : { click : this.TreatmentCompleteClicked }
		});
	},

	TreatmentStore : null,
	TreatmentRecords : [],
	curTreatmentRecord : null,

	AssignVerify2SignHandler6 : function(tableView, cellElement, cellIdx, record, rowElement, rowIndex, evt, opts) {		// 		<-- MWB - 7/4/2012 - Assignment is done as part of the renderer for the grid
		if (cellElement.innerHTML.search("Sign to Verify") > 0) {
			var StartTime = record.get("StartTime");
			if ("" === StartTime) {
				Ext.MessageBox.alert("Error", "You MUST specify at least a \"Start Time\" for this administration");
			}
			else {
				this.curTreatmentRecord = record;
				record.set("Treatment_User", "In Process...");
					// Prompt user and issue AJAX call to verify their credentials and save this record if credentials verified.
				var EditRecordWin = Ext.widget("Authenticate");
				EditRecordWin.curTreatmentRecord = record;
				var initialField = Ext.ComponentQuery.query('Authenticate [name=\"AccessCode\"]')[0];
				initialField.focus(true, true);
			}
		}
	},


	SaveTreatmentRecord : function(curTreatmentRecord) {
		var tData = curTreatmentRecord.getData();
		var drug = curTreatmentRecord.get("drug");
		var res = drug.replace(/^\d+\. /, "");
		curTreatmentRecord.set("drug", drug);
		curTreatmentRecord.set("Treatment_User", curTreatmentRecord.get("AccessCode"));
		curTreatmentRecord.set("Treatment_Date", Ext.Date.format(new Date(), "m/d/Y - g:i a"));
		curTreatmentRecord.set("StartTime", Ext.Date.format(tData.StartTime, "h:i a"));
		curTreatmentRecord.set("EndTime", Ext.Date.format(tData.EndTime, "h:i a"));

		this.application.loadMask("Saving record of changes");
		// POST Changed data row back to server then upon successful posting of the data...
		curTreatmentRecord.save({
			scope : this,
			callback : function(record, operation) {
				var theData = record.getData();
				if ("Therapy" === theData.type) {
							var thisCtl = this.getController("Common.puWinAddCumDose");
							// var Info = { "MedID" : "B495474E-A99F-E111-903E-000C2935B86F", "UnitsID" : "AB85F3AA-0B21-E111-BF57-000C2935B86F", "AdministeredDose" : "54,321"};
							var Info = { "MedID" : "", "MedName" : theData.drug, "UnitsID" : "", "UnitName" : theData.unit, "AdministeredDose" : theData.dose};
							thisCtl.SaveNewCumDoseInfo( Info );
				}

				this.application.unMask();
				if (!operation.success) {
						Ext.MessageBox.alert("Error", "Administration Record Save failed... unknown reason");
				}
			}
		});
		delete this.curTreatmentRecord;
	},

	AuthenticateUser : function (button) {
debugger;
// get Route
// if Route !== Oral the End Time MUST be set before signing
// IF the medication is ORAL, SubQ, IM or IVP then only a start time is required before the user can sign off on the record
// ELSE IF the medication is IV or IVPB, then a start AND End time are required before the user can sign off on the record
		var curTreatmentRecord = button.up("Authenticate").curTreatmentRecord;

		this.SignRecordBtn = button;
		button.hide();
		this.application.loadMask("Authenticating digital signature");
		var win = button.up('window');
		var form = win.down('form');
		var values = form.getValues();
		var SignData = window.SessionUser + " - " + Ext.Date.format(new Date(), "m/d/Y - g:i a");

		curTreatmentRecord.set("AccessCode", values.AccessCode);
		curTreatmentRecord.set("User", values.AccessCode);
		curTreatmentRecord.set("VerifyCode", values.VerifyCode);
		curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);
		curTreatmentRecord.set("templateID", this.application.Patient.AppliedTemplateID);


		Ext.Ajax.request({
			scope : this,
			url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
			success: function( response, opts ){
				this.application.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success && "Failed" !== resp.records) {
					win.close();
					this.SaveTreatmentRecord (curTreatmentRecord);
				}
				else {
					Ext.MessageBox.alert("Error", "Authentication failed! Please click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
					this.SignRecordBtn.show();
				}
			},
			failure : function( response, opts ) {
				this.application.unMask();
				Ext.MessageBox.alert("Error", "Authentication failed! \n\nPlease click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
				this.SignRecordBtn.show();
			}
		});
	},

	beforeCellEdit : function (plugin, eObj, beforeEdit) {
		var StartTimeField = Ext.getCmp("startTimeEditor");
		var EndTimeField = Ext.getCmp("endTimeEditor");


// IF the medication is ORAL, SubQ, IM or IVP then only a start time is required before the user can sign off on the record
// ELSE IF the medication is IV or IVPB, then a start AND End time are required before the user can sign off on the record


        var timeMax = Ext.Date.format(new Date(), 'h:i A');
		EndTimeField.setMaxValue(timeMax);
		StartTimeField.setMaxValue(timeMax);
        StartTimeField.setValue("07:00 AM");
        StartTimeField.setRawValue("07:00 AM");

		if ("" === eObj.record.get("Treatment_User")) {
			var StartTimeFieldValue = eObj.record.get("StartTime");
			if ("EndTime" === eObj.field && "" !== StartTimeFieldValue) {
				EndTimeField.setMinValue(StartTimeFieldValue);
			}
			else {
				EndTimeField.setMinValue("");
				StartTimeField.setMinValue("");
			}
			return true;		// This record hasn't been signed so it is editable
		}
		return false;	// Can't edit record that's been signed.
	},

	afterCellEdit : function (editor, eObj) {
		var theRecord = eObj.record;
		var theStore = eObj.grid.getStore();
		var newValue = eObj.value;
		var oldValue = eObj.originalValue;
		var rowIndex = eObj.rowIdx;
		var Cycle = eObj.record.get("CourseNum");

		if (null === this.curTreatmentRecord) {
			this.TreatmentStore = eObj.grid.getStore();
			this.curTreatmentRecord = eObj.record;    // this.TreatmentStore.getAt(rowIndex);
			this.curTreatmentRecord.set("TreatmentID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("rowIdx", rowIndex);
		}
  
		if ("StartTime" === eObj.field || "EndTime" === eObj.field) {
			var eObjValue1 = Ext.Date.format( eObj.value, "h:i A");
			eObj.value = Ext.Date.parse(eObjValue1, "h:i A");
		}

		this.curTreatmentRecord.set(eObj.field + "_originalValue", eObj.originalValue);
		this.curTreatmentRecord.set(eObj.field, eObj.value);
		this.curTreatmentRecord.set("Cycle", Cycle);    // MWB - 6/17/2012 - Carry over from CourseNum from Orders data
		return true;
	},

/**
 * Load all the current (e.g. dispensed) orders in the system
 * select orders for the current patient for the current day
 * This is what should get sent to the Nursing Doc Treatment Store
 **/
	LoadPreviousTreatmentData : function() {
		var Patient = this.application.Patient;
		var PAT_ID = Patient.PAT_ID;
		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.ReadND_Treatment + "/" + PAT_ID,
			success: function( response, opts ){
				var tempData, tsRecord;
				var obj = Ext.decode(response.responseText);
				var TreatmentHistoryRecords = obj.records;
				this.application.Patient.TreatmentHistory = TreatmentHistoryRecords;			// Treatment History (all days)
				// Note: record.Treatment_User === The person who signed the treatment record.

				var treatmentStore = this.application.Patient.TreatmentStore;

				// Now that we have the store of todays records (treatmentStore)
				// We need to compare each store record with each of the TreatmentHistory records (TreatmentHistoryRecords)
				// to find matches and then ensure that the treatmentStore records are updated with the TreatmentHistory records

				var MatchingRecord, i, aRec, len = TreatmentHistoryRecords.length;
				var findByFcn = function(record, id) {
					return this.Record2Find.AdminDate === record.get("adminDate") && 
					this.Record2Find.Drug === record.get("drug") && 
					this.Record2Find.Type === record.get("type");
				};
				for (i = 0; i < len; i++) {
					aRec = TreatmentHistoryRecords[i];
					this.Record2Find = aRec;
					MatchingRecord = treatmentStore.findBy(findByFcn, this);
					tsRecord = treatmentStore.getAt(MatchingRecord);
					if (tsRecord) {
						var temp, dbg_temp = tsRecord.data;
						tsRecord.set("StartTime", aRec.StartTime);
						tsRecord.set("EndTime", aRec.EndTime);
						tsRecord.set("Comments", aRec.Comments);

						/* May not need this process, but might need to pull the "OriginalValue" from the aRec */
						temp = tsRecord.get("dose");
						tsRecord.set("dose_originalValue", temp);
						temp = tsRecord.get("drug");
						tsRecord.set("drug_originalValue", temp);
						temp = tsRecord.get("route");
						tsRecord.set("route_originalValue", temp);
						tsRecord.set("dose", aRec.Dose);
						tsRecord.set("drug", aRec.Drug);
						tsRecord.set("route", aRec.Route);
						tsRecord.set("PAT_ID", aRec.PAT_ID);
						tsRecord.set("Treatment_User", aRec.Treatment_User);
						tsRecord.set("Treatment_Date", aRec.Treatment_Date);
					}
				}
			},
			failure : function( response, opts ) {
				Ext.MessageBox.alert("Error", "Administration Information failed to load");
			}
		});
	},

	LoadTreatmentStore : function() {
		var Patient = this.application.Patient;
		var theStore = Ext.getStore("ND_Treatment");

		var re = new RegExp(Patient.id);
		var today = Ext.Date.format( new Date(), "m/d/Y");
		var today4URL = Ext.Date.format( new Date(), "Y-m-d");
		var reDate = new RegExp(today);
		var reDispensed = new RegExp("Dispensed");
/*****
		theStore.clearFilter(true);
		theStore.filter([
			{property: "patientID", value: re}
			,{property: "adminDate", value: reDate}
			,{property: "orderstatus", value: reDispensed}
		]);
*****/
this.PatientID = Patient.id;
this.AdminDate = today;

		/***
		 *	Instead of a filter (which still loads all the data down to the client), set the proxy of the store with parameters to the Orders service call
		 *
		 *	theStore.proxy.api.read = Ext.URLs.ND_Treatment + PatientID + "/" + AdminDate + "/" + OrderStatus;
		 *
		 ***/

		this.application.loadMask("Loading Treatment Administration Information");
		theStore.proxy.api.read = Ext.URLs.ND_TreatmentDispensed + Patient.id + "/" + today4URL;
		theStore.load({
			scope : this,
			callback: function(records,operation,success){
				this.application.unMask();
				if(success){
//					var theStore = Ext.getStore("ND_Treatment");
//					this.application.Patient.TreatmentStore = theStore;	// The store containing all the records for today's treatment
//					this.LoadPreviousTreatmentData();
				}
				else {
					Ext.MessageBox.alert("Error", "Administration Grid store failed to load");
				}
			}
		});
	},


	ClearTabData : function( ) {
		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
		try {
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			if (!thisCtl.getND_T_Tab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}

			var theTreatmentGrid = Ext.ComponentQuery.query("NursingDocs_Treatment [name=\"AdministeredMedsGrid\"]")[0];
			var Patient = this.application.Patient;
			if (theTreatmentGrid && theTreatmentGrid.rendered && "" !== Patient.PAT_ID) {
				this.LoadTreatmentStore();
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Error", "Loading Error - NursingDocs_TreatmentTab - Error - TreatmentTab.js - ClearTabData() " + e.message );
		}
	},


	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Nursing Docs Treatment Administration Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl;
		try {
			thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			if (!thisCtl.getND_T_Tab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Error", "Loading Error - Nursing Docs Treatment Administration Tab Render() - Error - " + e.message );
			return;
		}

		this.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		var ThisAdminDay = this.ThisAdminDay;
		var theMeds, MedsLen, newMeds, i, aMed, Dose, Dose1, Dose2, am1, am2;

		var tcBtns = Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Administration Complete\"]");
		if (ThisAdminDay) {
			for (i = 0; i < tcBtns.length; i++) {
				tcBtns[i].show();
			}
		}
		else {
			for (i = 0; i < tcBtns.length; i++) {
				tcBtns[i].hide();
			}
		}

		var theTreatmentGrid = Ext.ComponentQuery.query("NursingDocs_Treatment [name=\"AdministeredMedsGrid\"]")[0];
		if (theTreatmentGrid && theTreatmentGrid.rendered) {
			// Never gets to this point...
			this.ClearTabData();
		}
	},

	BtnClicked : function (button) {
		var PatientInfo = this.application.Patient;
		var ThisAdminDay = this.ThisAdminDay;
		
		var EditRecordWin = Ext.widget("EditNursingDocs_Treatment");

		var title, theMedList, ComboStore, theMeds, MedsLen, Records, ComboStoreIndex = 0;

		switch( button.name ) {
			case "btnPreMed":
				title = "Edit Pre Medication";
				theMeds = ThisAdminDay.PreTherapy;
			break;
			case "btnPOMed":
				title = "Edit PO Medication";
			break;
			case "btnIVMed":
				title = "Edit IV/SQ/IM Medication";
				theMeds = ThisAdminDay.Therapy;
			break;
			case "btnPostMed":
				title = "Edit Post Medication";
				theMeds = ThisAdminDay.PostTherapy;
			break;
			case "btnHydration":
				title = "Edit Hydration Meds";
			break;
			default : 
				title = "Unknown Button Clicked";
			break;
		}

		EditRecordWin.setTitle(title);

		theMedList = Ext.ComponentQuery.query("EditNursingDocs_Treatment form combobox[name=\"Med\"]")[0];
		ComboStore = theMedList.getStore();
		ComboStore.removeAll();
		ComboStore.add(theMeds);

	},

	TreatmentCompleteClicked : function (button) {
		Ext.Msg.show({
			title:"Administration Complete?",
			msg: "Are you finished documenting administration of medications for this patient?",
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			callback: function(btn, text){
				if ("yes" === btn) {
					Ext.MessageBox.alert("Administration completion", "Administration is complete, Save complete");
				}
				else {
					Ext.MessageBox.alert("Administration completion", "Administration is NOT complete, No data specified to be saved");
				}
			}
		});
	}
});

Ext.ND_TreatmentTimeRenderer = function(v) {
	if (v && "" !== v) {
		var v1, v2, v3;
		if ("string" == typeof v) {
			v1 = v.split("T");
			if (v1.length > 0) {
				v1 = v1.join(" ");
			}
			v1 = new Date(v1);
			if (isNaN(v1)) {
				return v;
			}
		}
		else {
			v1 = new Date(v);
		}
		v2 = Ext.Date.format(v1, "h:i A");
		return v2;
	}
	return v;
};

Ext.ND_TreatmentTypeOrderRenderer = function(v) {
	switch (v) {
		case 1:
			return "Pre Therapy";
		case 2:
			return "Therapy";
		case 3:
			return "Post Therapy";
	}
};

Ext.ND_TreatmentSignature = function(v, metadata, record, rowIndex, colIndex, store, view) {
	var aStyle = "style=\"text-decoration:underline; color: navy;\"";
	var dspValue = "Sign to Verify";
	if (v) {
		aStyle = "";
		dspValue = (v + " - " + record.get("Treatment_Date"));
	}
	return Ext.String.format("<span class=\"anchor TreatmentSigner\" {0} row={1} col={2}>{3}</span>", aStyle, rowIndex, colIndex, dspValue);
};

Ext.ND_TreatmentAmmendIcon = function(v, metadata, record, rowIndex, colIndex, store, view) {
	var aClass = "";
	if ("Administered" === record.getData().orderstatus) {
		aClass = "class=\"EditCell\" ";
	}
	return Ext.String.format("<div {0} row={1} col={2}>&nbsp;</div>", aClass, rowIndex, colIndex);
};