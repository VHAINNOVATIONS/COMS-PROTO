Ext.define("COMS.controller.NewPlan.CTOS.FS_Toxicity", {
	extend: "Ext.app.Controller",
	views : [ "RequiredInstr", "NewPlan.CTOS.FS_Toxicity", "NewPlan.CTOS.FS_ToxicityGrid" ],
	stores: [ "ToxGridStore" ],


	init: function () {
		this.control({
			"FS_Toxicity form" : {
				validitychange : this.CheckValidation
			},

			"FS_Toxicity form [name=\"ToxInstr\"]" : {
				beforequery : this.ToxInstrBeforeQuery,
				select : this.ToxInstrSelectRec
			},
			"FS_Toxicity form [name=\"ToxLevel\"]" : {
				beforequery : this.ToxLevelBeforeQuery,
				select : this.ToxLevelSelectRec
			},

			"FS_Toxicity grid" : {
					select: this.selectGridRow,
					beforerender: this.loadGridStore
			},

			"FS_Toxicity button[text=\"Add\"]" : {
				click: this.LockAndAddNewRecord
			},

			"FS_Toxicity button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			},

			"FS_Toxicity button[text=\"Refresh\"]" : {
				click: this.RefreshToxGrid
			},

			"FS_Toxicity button[name=\"Save\"]" : {
				click: this.Save
			},
			"FS_Toxicity button[name=\"Cancel\"]" : {
				click: this.Cancel
			}
		});
	},

	ToxLevel : "",
	ToxInstr : "",

	CheckValidation : function( theForm, valid, eOpts ) {
		var saveBtn = this.getSaveBtn(theForm);
		if (valid) {
			saveBtn.setDisabled(false);
		}
		else {
			saveBtn.setDisabled(true);
		}
	},

	loadGridStore : function(theGrid) {
		var theStore = theGrid.getStore();
		theStore.load({ url: Ext.URLs.ToxGrid + "/" + this.application.Patient.PAT_ID });
	},

	RefreshToxGrid : function(theBtn) {
		var theGrid = this.getTheGrid(theBtn);
		this.loadGridStore(theGrid);
	},

	gnrlGetComponent: function(thisComp, str) {
		if (thisComp.owner) {
			return thisComp.owner.findParentByType("FS_Toxicity").down(str);
		}
		else {
			return thisComp.findParentByType("FS_Toxicity").down(str);
		}
	},

	getAddRecordBtn :  function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[text=\"Add\"]");
	},
	getAddRecordPanel : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxicityEditPanel\"]");
	},
	
	getTheGrid : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"Toxicity Grid\"]");
	},

	getIDField : function (thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"RecID\"]");
	},
	getToxInstrFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxInstr\"]");
	},
	getOtherToxFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"OtherTox\"]");
	},
	getToxLevelFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxLevel\"]");
	},
	getToxEditLevelFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxEditLevel\"]");
	},

	getToxEditDetailsFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxEditDetails\"]");
	},
	getToxDetailsFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"ToxDetails\"]");
	},

	getCommentsFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"Data\"]");
	},

	getAlertFld : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"AdverseAlert\"]");
	},

	getDeleteBtn : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[text=\"Delete\"]");
	},

	getSaveBtn : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "[name=\"Save\"]");
	},
	getTheForm : function(thisComp) {
		return this.gnrlGetComponent(thisComp, "form");
	},


	getToxInstr : function(thisComp) {
		var theFld = this.getToxInstrFld(thisComp);
		var ret = theFld.getRawValue();
		return ret;
	},
	getToxLevel : function(thisComp) {
		var theFld = this.getToxLevelFld(thisComp);
		var ret = theFld.getRawValue();
		if (!theFld.isVisible()) {
			theFld = this.getToxEditLevelFld(thisComp);
			ret = theFld.getValue();
		}
		return ret;
	},

	clrToxLevel :  function(thisComp) {
		var theFld = this.getToxLevelFld(thisComp);
		theFld.setValue("");
	},
	
	clrDetails : function(thisComp) {
		var theFld = this.getToxDetailsFld(thisComp);
		theFld.setValue("&nbsp;");
	},

	Cancel : function(btn) {
		var theForm = btn.up('form').getForm();
		var theGrid = this.getTheGrid(theForm);
		theForm.reset();
		this.RowIdx = null;
		theGrid.getSelectionModel().clearSelections();

		this.releaseLock(this.getAddRecordPanel(btn));

	},

	Save : function(btn) {
		if (!this.Saving) {		// Prevents multiple saves by clicking the "Save" button more than once
			var theForm = btn.up('form').getForm();
			if (theForm.isValid()) {
				this.Saving = true;
				this.saveData(theForm);
			}
		}
	},

	saveData : function(theForm) {
		var theData = theForm.getFieldValues();
		if ("Other" !== theData.ToxInstr) {
			theData.OtherTox = "";
		}

		if (theData.ToxLevel !== "" && theData.ToxEditLevel == "") {
			delete theData.ToxEditLevel;
		}
		else if (theData.ToxEditLevel !== "") {
			theData.ToxLevel = theData.ToxEditLevel;
			delete theData.ToxEditLevel;
		}

		if (theData.ToxDetails !== "" && theData.ToxEditDetails == "") {
			delete theData.ToxEditDetails;
		}
		else if (theData.ToxEditDetails !== "") {
			theData.ToxDetails = theData.ToxEditDetails;
			delete theData.ToxEditDetails;
		}
		var theGrid = theForm.owner.ownerCt.down("FS_ToxicityGrid")
		var theStore = theGrid.getStore();
		var PAT_ID = this.application.Patient.PAT_ID;
		theStore.proxy.url = Ext.URLs.ToxGrid + "/" + PAT_ID;

		var AlertEvent = theData.AdverseAlert ? 1 : 0;

		var storeData = { 
			"tDate" : Ext.Date.format(new Date(), "m/d/Y"), 
			"Alert" : AlertEvent, 
			"Comments" : theData.Data, 
			"Details" : theData.ToxDetails, 
			"Grade_Level" : theData.ToxLevel, 
			"id" : theData.RecID, 
			"Label" : theData.ToxInstr,
			"OtherTox" : theData.OtherTox
		};
		
		var rec = Ext.create(Ext.COMSModels.ToxGridModel, storeData);
		rec.dirty = true;

		if (this.RowIdx && this.RowIdx >= 0) {
			theStore.removeAt(this.RowIdx, 1);
			theStore.insert(this.RowIdx, rec);
			this.RowIdx = null;
		}
		else {
			theStore.add(rec);
		}
		theStore.commitChanges();
		theForm.reset();
		this.Saving = false;

		this.releaseLock(this.getAddRecordPanel(theForm));
		this.application.fireEvent("loadAdverseEventsHistory");
	},

	selectGridRow : function(theRowModel, record, index, eOpts) {
		this.RowIdx = index;
		var theView = theRowModel.view;
		var recID = record.get("id");
		var Label = record.get("Label");
		var OtherTox = record.get("OtherTox");

		var Details = record.get("Details");
		var Grade_Level = record.get("Grade_Level");
		this.ToxLevel = Grade_Level;
		this.ToxInstr = Label;
		var Comments = record.get("Comments");
		var tDate = record.get("tDate");
		var Alert = record.get("Alert");

		Details = Ext.util.Format.htmlDecode(Details);

		var hiddenRecID = this.getIDField(theView);
		hiddenRecID.setValue(recID);

		var theToxInstrField = this.getToxInstrFld(theView);
		var theOtherToxField = this.getOtherToxFld(theView);

		var theToxDetailsField = this.getToxDetailsFld(theView);
		if (!theToxDetailsField.isVisible()) {
			theToxDetailsField = this.getToxEditDetailsFld(theView);
		}
		var theToxLevelField = this.getToxLevelFld(theView);
		if (!theToxLevelField.isVisible()) {
			theToxLevelField = this.getToxEditLevelFld(theView);
		}

		var theAlertField = this.getAlertFld(theView);
		var theCommentsField = this.getCommentsFld(theView);

		if ("Other" === Label) {
			theOtherToxField.show();
		}
		else {
			theOtherToxField.hide();
		}

		theToxInstrField.setValue(Label);
		theOtherToxField.setValue(OtherTox);

		theToxDetailsField.setValue(Details);
		theToxLevelField.setValue(Grade_Level);
		theCommentsField.setValue(Comments);
		theAlertField.setValue(Alert);

		var records = theRowModel.getSelection();
		
		var delBtn = this.getDeleteBtn(theView);
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},



	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("id");
			var CMD = "DELETE";
			var URL = Ext.URLs.ToxGrid + "/" + rID;
			Ext.Ajax.request({
				url: URL,
				method : CMD,
				scope: this,
				records : theRecords,
				success: function( response, opts ){
					this.deleteRecord(opts.records);
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Delete Toxicity Record, Save Error - <br />" + resp.msg );
				}
			});
		}
		else {
			this.application.unMask();
				this.theForm.getForm().reset();
				this.RowIdx = null;
				this.theGrid.getSelectionModel().deselectAll( true );
				var delBtn = this.getDeleteBtn(this.theForm);
				delBtn.setDisabled(true);
				delete this.theForm;
				delete this.RowIdx;
				delete this.theGrid;
				theApp.fireEvent("loadAdverseEventsHistory");
		}
	},

	DeleteSelectedRecords : function(theBtn) {
		var theGrid = this.getTheGrid(theBtn);
		var theForm = this.getTheForm(theBtn);
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		this.theForm = theForm;
		this.theGrid = theGrid;
		this.theRecords = theRecords;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Toxicity records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(this.theRecords);
			}
		}, this);
	},




















	loadToxInstrStore : function(theStore, theData) {
		var i, rec, len,
			ToxInstr = [], 
			ToxOther = [];
		len = theData.length;
		for (i = 0; i < len; i++) {
			rec = theData[i];
			var el = {Label: rec, value: rec};
			if (rec.indexOf("No Toxicities") >= 0 || rec.indexOf("Other") >= 0) {
				ToxOther.push(el);
			}
			else {
				ToxInstr.push(el);
			}
		}
		len = ToxOther.length;
		for (i = 0; i < len; i++) {
			ToxInstr.push(ToxOther[i]);
		}
		theStore.loadData(ToxInstr);
	},

	loadToxLevelStore : function(theStore, theData) {
		var theInstr = this.ToxInstr;
		var ToxList = [];
		var i, rec, len,
			ToxInstr = [], 
			ToxOther = [];
		len = theData.length;
		for (i = 0; i < len; i++) {
			rec = theData[i].getData();
			if (rec.Label === theInstr) {
				if ("" == rec.Grade_Level) {
					rec.Grade_Level = "None";
				}
				var el = {Details : rec.Details, Label: rec.Label, Grade_Level: rec.Grade_Level, ID: rec.ID };
				ToxList.push(el);
			}
		}
		theStore.loadData(ToxList);
	},


	ToxInstrBeforeQuery : function( queryEvent, eOpts ) {
		var qeCombo = queryEvent.combo;
		delete qeCombo.lastQuery;
		var qeQuery = queryEvent.query;
		var qeForceAll = queryEvent.forceAll;
		aStore = Ext.getStore("Toxicity");
		if (aStore.getTotalCount() <= 0) {
			this.application.loadMask("Loading...");
			aStore.load({
				scope: this,
				combo : qeCombo,
				store : aStore,
				callback: function(records, operation, success) {
					var data = operation.store.collect('Label');
					var cStore = operation.combo.getStore();
					this.loadToxInstrStore(cStore, data);
					this.application.unMask();
				}
			});
		}
		else {
			var data = aStore.collect('Label');
			var cStore = qeCombo.getStore();
			this.loadToxInstrStore(cStore, data);
		}
		return true;
	},

	getDetails4Label : function(theRecordData) {
			var aStore = Ext.getStore("Toxicity");
			var theRec = aStore.findRecord( "Label", theRecordData);
			var theData = theRec.getData().Details;
			return theData;

	},

	ToxInstrSelectRec : function(combo, recs, eOpts) {
		var theRecordData = recs[0].getData().Label;
		this.ToxInstr = theRecordData;
		var tLevel = this.getToxLevelFld(combo);
		var tELevel = this.getToxEditLevelFld(combo);
		var tDetails = this.getToxDetailsFld(combo);
		var tEDetails = this.getToxEditDetailsFld(combo);
		var AEAlert = this.getAlertFld(combo);
		var OtherTox = this.getOtherToxFld(combo);


		this.clrToxLevel(combo);
		this.clrDetails(combo);

		if ( theRecordData.indexOf("No Toxicities") >= 0 ) {
			OtherTox.hide();

			tELevel.hide();
			tLevel.hide();
			tEDetails.hide();
			tDetails.show();

			AEAlert.hide();

			OtherTox.allowBlank = true;
			tELevel.allowBlank = true;
			tLevel.allowBlank = true;
			tEDetails.allowBlank = true;

			var theData = this.getDetails4Label(theRecordData);
			tDetails.setValue( theData );

		}
		else if (theRecordData.indexOf("Other") >= 0) {
			OtherTox.show();

			tLevel.hide();
			tDetails.hide();

			tELevel.show();
			tEDetails.show();

			AEAlert.show();

			OtherTox.allowBlank = false;
			tELevel.allowBlank = false;
			tEDetails.allowBlank = false;

			tLevel.allowBlank = true;
			tDetails.allowBlank = true;

			var theData = this.getDetails4Label(theRecordData);
			tEDetails.setValue( theData );

		}
		else {
			OtherTox.hide();
			tELevel.hide();
			tLevel.show();
			tEDetails.hide();
			tDetails.show();

			OtherTox.allowBlank = true;
			tLevel.allowBlank = false;
			tELevel.allowBlank = true;
			tEDetails.allowBlank = true;
			AEAlert.allowBlank = true;
		}

	},

	ToxLevelBeforeQuery : function( queryEvent, eOpts ) {
		var qeCombo = queryEvent.combo;
		delete qeCombo.lastQuery;
		var theInstr = this.getToxInstr(qeCombo);
		this.ToxInstr = theInstr;
		if ("" != theInstr) {
			var qeQuery = queryEvent.query;
			var qeForceAll = queryEvent.forceAll;
			aStore = Ext.getStore("Toxicity");
			if (aStore.getTotalCount() <= 0) {
				this.application.loadMask("Loading...");
				aStore.load({
					scope: this,
					combo : qeCombo,
					store : aStore,
					callback: function(records, operation, success) {
						var cStore = operation.combo.getStore();
						var theRecords = operation.store.getRange();
						this.loadToxLevelStore(cStore, theRecords);
						this.application.unMask();
					}
				});
			}
			else {
				var cStore = qeCombo.getStore();
				this.loadToxLevelStore(cStore, aStore.getRange());
			}
			return true;
		}
		else {
			Ext.MessageBox.alert("Warning", "You must select a Toxicity first");
		}
		return false;
	}, 

	ToxLevelSelectRec : function(combo, recs, eOpts) {
		var theRecordData = recs[0].getData().Label;
		this.ToxLevel = theRecordData;
		var DetailsField = combo.findParentByType("FS_Toxicity").down("[name=\"ToxDetails\"]");
		var theData = recs[0].getData().Details;
		theData = Ext.util.Format.htmlDecode(theData);
		DetailsField.setValue(theData);
	},


	AddNewRecord : function(params) {
		var me = params.scope;
		var theBtn = params.theBtn;
		var theAddRecordPanel = me.getAddRecordPanel(theBtn);
		theAddRecordPanel.show();

		var f1 = me.getToxInstrFld(theAddRecordPanel);
		f1.allowBlank = false;
		var f2 = me.getToxLevelFld(theAddRecordPanel);
		f2.allowBlank = false;
		theBtn.setDisabled(true);
	},

	LockAndAddNewRecord : function(theBtn) {
		var params = { scope : this, theBtn : theBtn };
		Ext.COMS_LockSection(this.application.Patient.id, "Toxicity", this.AddNewRecord, params); 
	},

	releaseLock : function(thePanel) {
		thePanel.hide();

var f1 = this.getToxInstrFld(thePanel);
f1.allowBlank = true;
var f2 = this.getToxLevelFld(thePanel);
f2.allowBlank = true;

		var theBtn = this.getAddRecordBtn(thePanel);
		theBtn.setDisabled(false);
		Ext.COMS_UnLockSection();
	}



});