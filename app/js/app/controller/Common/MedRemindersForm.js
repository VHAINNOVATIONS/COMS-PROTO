/* http://alvinalexander.com/javascript/sencha-touch-extjs-json-encode-post-examples */
Ext.define("COMS.controller.Common.MedRemindersForm", {
	extend: "Ext.app.Controller",
	views : [ "Common.MedRemindersForm" ],
	refs: [
		{ ref : "MedRemindersForm", selector : "MedReminder MedRemindersForm" },
		{ ref : "MedRemindersGrid", selector : "MedReminder grid" }

	],

	init: function() {
		this.control({
			"MedRemindersForm button[text=\"Save\"]" : {
				click : this.SaveForm
			}
		});
	},



	clickCancel : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
	},



	_formSubmit : function(form, URL, CMD) {
		var theData = form.getValues();
		theData = Ext.JSON.encode(theData);
		form.submit({
			headers: { "Content-Type": "application/json;charset=utf-8" },
			// params: theData,
			scope : this,
			clientValidation: true,
			url: URL,
			method : CMD,
			success: function(form, action) {
				// debugger;
				var MR_ID, results = Ext.JSON.decode(action.response.responseText);
				if (results.success) {
					MR_ID = results.records[0].MR_ID;
					if (!this.application.MedReminders) {
						this.application.MedReminders = [];
					}
					this.application.MedReminders.push(MR_ID);
					form.reset();
				}
				//this.RefreshPanel();
			},
			failure: function(form, action) {
				// debugger;
				var SaveTitle = "Saving Medication Reminder FAILED";
				//this.RefreshPanel();
				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert(SaveTitle, 'Form fields may not be submitted with invalid values');
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert(SaveTitle, 'Server communication failed');
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert(SaveTitle, action.result.msg);
				}
			}
		});
	},



















		/* Cumulative Dosing Medications are stored in the Lookup Table with a Lookup_Type = "50" */
	SaveForm : function(theBtn, theEvent, eOpts) {
		var theGrid = this.getMedRemindersGrid();
		var theGridStore = theGrid.getStore();
		
		var AuthoringTabCtl = this.getController("Authoring.AuthoringTab");
		var form = theBtn.up('form').getForm();
		if (form.isValid()) {
			var theData = theBtn.up('form').getForm().getValues();
			var MedReminder = Ext.create(Ext.COMSModels.MedReminder, {
				"MR_ID" : theData.MR_ID,
				"TemplateID" : theData.TemplateID, 
				"Title" : theData.Title,
				"Description" : theData.Description,
				"ReminderWhenCycle" : theData.ReminderWhenCycle,
				"ReminderWhenPeriod" : theData.ReminderWhenPeriod
			});
			AuthoringTabCtl.AddMedReminder2GridStore(MedReminder);
			form.reset();
		}
	}




























/*****************
	RefreshPanel : function() {
		this.application.loadMask("Please wait; Loading Panel Information");
		var theGrid = this.getTheGrid();
		var theStore = theGrid.getStore();
		theStore.load();
		theGrid.getSelectionModel().deselectAll();
		var MedField = this.getMedication();
		MedField.getStore().load();
		var UnitsField = this.getUnits();
		UnitsField.getStore().load();

		var delBtn = this.getDeleteBtn();
		delBtn.setDisabled(true);
		delBtn.show();
		this.application.unMask();
	},




	deSelectGridRow : function(theRowModel, record, index, eOpts) {
	},
	
	selectGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var delBtn = this.getDeleteBtn();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
		var theForm = this.getThePanel();

		var MedField = this.getMedication();
		MedField.setRawValue(record.getData().MedName);
		MedField.setValue(record.getData().MedID);

		var DoseField = this.getDose();
		DoseField.setValue(record.getData().CumulativeDoseAmt);

		var UnitsField = this.getUnits();
		UnitsField.setValue(record.getData().UnitsID);
		UnitsField.setRawValue(record.getData().CumulativeDoseUnits);

		// theForm.loadRecord(record);
	},




	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("ID");
			var CMD = "DELETE";
			var URL = Ext.URLs.CumulativeDosingMeds + "/" + rID;
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
						Ext.MessageBox.alert("Delete Error", "Delete Error", "Cumulative Dose Medication - Delete Record, Error - <br />" + resp.msg );
					}
				});
		}
		else {
			this.application.unMask();
			this.RefreshPanel();
		}
	},

	DeleteSelectedRecords : function() {
		var theGrid = this.getTheGrid();
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
			}
		}, this);
	}

*******************/

});
