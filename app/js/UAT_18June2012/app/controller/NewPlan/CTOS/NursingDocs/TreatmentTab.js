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

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.TreatmentTab", {
	extend: "Ext.app.Controller",

	stores: [
		"ND_Treatment"
	],
	views : [
		"NewPlan.CTOS.NursingDocs.Authenticate"
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
		{ ref : "TreatmentCompleteBtn", selector : "NursingDocs_Treatment button[text=\"Treatment Complete\"]"}
	],


	// Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Treatment Complete\"]")[0].el.dom
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
				beforeedit : this.CellEdit,	// Start Cell Editing
				edit : this.CellEditCommit,	// Cell Editing finished
				scope : this
			},
			"NursingDocs_Treatment button[name=\"btnPreMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPOMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnIVMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPostMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnHydration\"]" : { click : this.BtnClicked },

            "Authenticate[title=\"Authenticate\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            },
			"NursingDocs_Treatment button[text=\"Treatment Complete\"]" : { click : this.TreatmentCompleteClicked }


		});
	},


	TreatmentStore : null,
	TreatmentRecords : [],
	curTreatmentRecord : null,



	AssignVerify2SignHandler6 : function(tableView, cellElement, cellIdx, record, rowElement, rowIndex, evt, opts) {		// 		<-- MWB - 7/4/2012 - Assignment is done as part of the renderer for the grid
		if (cellElement.innerHTML.search("Sign to Verify") > 0) {
			var StartTime = record.get("StartTime");
			if ("" === StartTime) {
				Ext.MessageBox.alert("Error", "You MUST specify at least a \"Start Time\" for this treatment");
			}
			else {
				this.curTreatmentRecord = record;
				record.set("Treatment_User", "In Process...");
					// Prompt user and issue AJAX call to verify their credentials and save this record if credentials verified.
				var EditRecordWin = Ext.widget("Authenticate");
			}
		}
	},


	AuthenticateUser : function (button) {
		this.SignRecordBtn = button;
		button.hide();
        this.application.loadMask("Authenticating digital signature");
		var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
		var SignData = window.SessionUser + " - " + Ext.Date.format(new Date(), "m/d/Y - g:i a");

		this.curTreatmentRecord.set("AccessCode", values.AccessCode);
		this.curTreatmentRecord.set("User", values.AccessCode);
		this.curTreatmentRecord.set("VerifyCode", values.VerifyCode);
		this.curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);

		Ext.Ajax.request({
			scope : this,
			url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
			success: function( response, opts ){
				this.application.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success && "Not a Valid Access Code" !== response.records) {
					this.curTreatmentRecord.set("Treatment_User", this.curTreatmentRecord.get("AccessCode"));
					this.curTreatmentRecord.set("Treatment_Date", Ext.Date.format(new Date(), "m/d/Y - g:i a"));

					win.close();
			        this.application.loadMask("Saving record of changes");
					// POST Changed data row back to server then upon successful posting of the data...
					this.curTreatmentRecord.save({
						scope : this,
						callback : function(record, operation) {
							this.application.unMask();
							if (operation.success) {
							}
							else {
								Ext.MessageBox.alert("Error", "Treatment Record Save failed... unknown reason");
							}
						}
					});
					this.curTreatmentRecord = null;
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

	CellEditCommit : function (editor, eObj) {
		var theRecord = eObj.record;
		var theStore = eObj.grid.getStore();
		var newValue = eObj.value;
		var oldValue = eObj.originalValue;
		var rowIndex = eObj.rowIdx;
		var Cycle = eObj.record.get("CourseNum");

		if (null === this.curTreatmentRecord) {
			this.TreatmentStore = eObj.grid.getStore();
			this.curTreatmentRecord = eObj.record;		// this.TreatmentStore.getAt(rowIndex);
			this.curTreatmentRecord.set("TreatmentID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("rowIdx", rowIndex);
		}

		this.curTreatmentRecord.set(eObj.field + "_originalValue", eObj.originalValue);
		this.curTreatmentRecord.set(eObj.field, eObj.value);
		this.curTreatmentRecord.set("Cycle", Cycle);		// MWB - 6/17/2012 - Carry over from CourseNum from Orders data
		return true;
	},


	CellEdit : function (plugin, eObj, beforeEdit) {
		if ("" === eObj.record.get("Treatment_User")) {
			return true;		// This record hasn't been signed so it is editable
		}
		return false;	// Can't edit record that's been signed.
/****
		if ("" !== eObj.record.get("StartTime")) {		// if we have a start time then this record has been edited and saved, so it can't be edited again
			return false;
		};
		return true;
 ****/
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
				for (i = 0; i < len; i++) {
					aRec = TreatmentHistoryRecords[i];
					this.Record2Find = aRec;
					MatchingRecord = treatmentStore.findBy(function (record, id) {

wccConsoleLog("Admin Date - " + this.Record2Find.AdminDate + " : " + record.get("adminDate"));
wccConsoleLog("Drug - " + this.Record2Find.Drug + " : " + record.get("drug"));
wccConsoleLog("Type - " + this.Record2Find.Type + " : " + record.get("type"));

							return this.Record2Find.AdminDate === record.get("adminDate") && 
								this.Record2Find.Drug === record.get("drug") && 
								this.Record2Find.Type === record.get("type");
						},
						this
					);
					tsRecord = treatmentStore.getAt(MatchingRecord);
					if (tsRecord) {
						var dbg_temp = tsRecord.data;
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
				Ext.MessageBox.alert("Error", "Treatment Information failed to load");
			}
		});
	},

	LoadTreatmentStore : function() {
		var Patient = this.application.Patient;
		var theStore = Ext.getStore("ND_Treatment");

		var re = new RegExp(Patient.id);
		var today = Ext.Date.format( new Date(), "m/d/Y");
		var reDate = new RegExp(today);
		var reDispensed = new RegExp("Dispensed");

		theStore.clearFilter(true);
		theStore.filter([
			{property: "patientID", value: re}
			,{property: "adminDate", value: reDate}
			,{property: "orderstatus", value: reDispensed}
		]);

        this.application.loadMask("Loading Treatment Information");
		theStore.load({
			scope : this,
			callback: function(records,operation,success){
				this.application.unMask();
				if(success){
					var theStore = Ext.getStore("ND_Treatment");
					this.application.Patient.TreatmentStore = theStore;	// The store containing all the records for today's treatment
					this.LoadPreviousTreatmentData();
				}
				else {
					Ext.MessageBox.alert("Error", "Treatment Grid store failed to load");
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
		wccConsoleLog("Nursing Docs Treatment Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl;
		try {
			thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			if (!thisCtl.getND_T_Tab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Error", "Loading Error - Nursing Docs Treatment Tab Render() - Error - " + e.message );
			return;
		}

		this.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		var ThisAdminDay = this.ThisAdminDay;
		var theMeds, MedsLen, newMeds, i, aMed, Dose, Dose1, Dose2, am1, am2;


		var tcBtns = Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Treatment Complete\"]");
		if (ThisAdminDay) {
			tcBtns[0].show();
			tcBtns[1].show();
		}
		else {
			tcBtns[0].hide();
			tcBtns[1].hide();
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
			title:"Treatment Complete?",
			msg: "Are you finished documenting administration of medications for this patient?",
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			callback: function(btn, text){
				if ("yes" === btn) {
					Ext.MessageBox.alert("Treatment completion", "Treatment is complete, Save complete");
				}
				else {
					Ext.MessageBox.alert("Treatment completion", "Treatment is NOT complete, No data specified to be saved");
				}
			}
		});
	}
});