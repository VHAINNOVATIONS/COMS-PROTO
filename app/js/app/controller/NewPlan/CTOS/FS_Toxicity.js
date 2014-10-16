Ext.define("COMS.controller.NewPlan.CTOS.FS_Toxicity", {
	extend: "Ext.app.Controller",
	views : [ "RequiredInstr", "NewPlan.CTOS.FS_Toxicity", "NewPlan.CTOS.FS_ToxicityGrid" ],

	init: function () {
		this.control({
			"FS_Toxicity form [name=\"ToxInstr\"]" : {
				beforequery : this.ToxInstrBeforeQuery,
				select : this.ToxInstrSelectRec
			},
			"FS_Toxicity form [name=\"ToxLevel\"]" : {
				beforequery : this.ToxLevelBeforeQuery,
				select : this.ToxLevelSelectRec
			},

			"FS_Toxicity grid" : {
					select: this.selectGridRow 
			},
			"FS_Toxicity button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
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

	getTheGrid : function(thisComp) {
		return thisComp.owner.findParentByType("FS_Toxicity").down("[name=\"Toxicity Grid\"]");
	},

	getToxInstrFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"ToxInstr\"]");
	},

	getToxLevelFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"ToxLevel\"]");
	},
	getToxEditLevelFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"ToxEditLevel\"]");
	},

	getToxEditDetailsFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"ToxEditDetails\"]");
	},
	getToxDetailsFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"ToxDetails\"]");
	},
	getAlertFld : function(thisComp) {
		return thisComp.findParentByType("FS_Toxicity").down("[name=\"AdverseAlert\"]");
	},

	getToxInstr : function(thisComp) {
		var theFld = this.getToxInstrFld(thisComp);
		var ret = theFld.getRawValue();
		return ret;
	},
	getToxLevel : function(thisComp) {
		var theFld = this.getToxLevelFld(thisComp);
		var ret = theFld.getRawValue();
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
		btn.up('form').getForm().reset();
	},

	Save : function(btn) {
		if (!this.Saving) {		// Prevents multiple saves by clicking the "Save" button more than once
			var theForm = btn.up('form').getForm();
			if (theForm.isValid()) {
				this.Saving = true;
				try {
					var theController = this.getController("NewPlan.CTOS.FS_Toxicity");
					theController.saveData(theForm);
					this.Saving = false;
				}
				catch (e) {
					this.Saving = false;
				}
			}
		}
	},




	selectGridRow : function(theRowModel, record, index, eOpts) {
		this.RowIdx = index;
		var theView = theRowModel.view;
		var recID = record.get("ID");
		var Label = record.get("Label");
		var Details = record.get("Details");
		var Grade_Level = record.get("Grade_Level");
		var Comments = record.get("Comments");
		var tDate = record.get("tDate");
		var Alert = record.get("Alert");

		Details = Ext.util.Format.htmlDecode(Details);

		var theToxInstrField = this.getToxInstrFld(theView);
		var theToxDetailsField = this.getToxDetailsFld(theView);
		if (!theToxDetailsField.isVisible()) {
			theToxDetailsField = this.getToxEditDetailsFld(theView);
		}
		var theToxLevelField = this.getToxLevelFld(theView);
		if (!theToxLevelField.isVisible()) {
			theToxLevelField = this.getToxEditLevelFld(theView);
		}

		var theAlertField = this.getAlertFld(theView);

		theToxInstrField.setValue(Label);
		theToxDetailsField.setValue(Details);
		theToxLevelField.setValue(Grade_Level);
		theAlertField.setValue(Alert);

		var records = theRowModel.getSelection();
		var delBtn = this.getDeleteBtn();
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
			var rID = record.get("ID");
			var CMD = "DELETE";
			var URL = Ext.URLs.ToxicityInstruction + "/" + rID;
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
			this.RefreshPanel();
			this.CancelForm();
		}
	},

	DeleteSelectedRecords : function(theForm) {
		debugger;
		var theGrid = this.getTheGrid(theForm);
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Toxicity records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
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

	loadToxLevelStore : function(theStore, theRecords) {
		var theInstr = this.ToxLevel;
		var ToxList = [];
		theRecords.each( function(rec) {
				var theData = rec.getData();
				if (theData.Label === theInstr) {
					if ("" == theData.Grade_Level) {
						theData.Grade_Level = "None";
					}
					var el = {Details : theData.Details, Label: theData.Label, Grade_Level: theData.Grade_Level, ID: theData.ID };
					ToxList.push(el);
				}
			},
			this
		);
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
		this.ToxLevel = theRecordData;
		var tLevel = this.getToxLevelFld(combo);
		var tELevel = this.getToxEditLevelFld(combo);
		var tDetails = this.getToxDetailsFld(combo);
		var tEDetails = this.getToxEditDetailsFld(combo);
		var AEAlert = this.getAlertFld(combo);

		this.clrToxLevel(combo);
		this.clrDetails(combo);

		if ( theRecordData.indexOf("No Toxicities") >= 0 ) {
			tELevel.hide();
			tLevel.hide();
			tEDetails.hide();
			tDetails.show();

			AEAlert.hide();

			tELevel.allowBlank = true;
			tLevel.allowBlank = true;
			tEDetails.allowBlank = true;

			var theData = this.getDetails4Label(theRecordData);
			tDetails.setValue( theData );

		}
		else if (theRecordData.indexOf("Other") >= 0) {
			tLevel.hide();
			tDetails.hide();

			tELevel.show();
			tEDetails.show();

			AEAlert.show();

			tELevel.allowBlank = false;
			tEDetails.allowBlank = false;

			tLevel.allowBlank = true;
			tDetails.allowBlank = true;

			var theData = this.getDetails4Label(theRecordData);
			tEDetails.setValue( theData );

		}
		else {
			tELevel.hide();
			tLevel.show();
			tEDetails.hide();
			tDetails.show();

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
						this.loadToxLevelStore(cStore, records);
						this.application.unMask();
					}
				});
			}
			else {
				var cStore = qeCombo.getStore();
				this.loadToxLevelStore(cStore, aStore);
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

	saveData : function(theForm) {
		var theData = theForm.getFieldValues();
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

		var storeData = { "tDate" : Ext.Date.format(new Date(), "m/d/Y"), "Alert" : theData.AdverseAlert, "Comments" : theData.Data, "Details" : theData.ToxDetails, "Grade_Level" : theData.ToxLevel, "ID" : "", "Label" : theData.ToxInstr };

		if (this.RowIdx !== null) {
			theStore.removeAt(this.RowIdx, 1);
			theStore.insert(this.RowIdx, storeData);
			this.RowIdx = null;
		}
		else {
			theStore.add(storeData);
		}
		theStore.commitChanges();
		theGrid.getView().refresh();
		theForm.reset();


	}
	


});