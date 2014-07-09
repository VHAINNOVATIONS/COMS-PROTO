Ext.define('COMS.controller.Management.CumulativeDosing', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.CumulativeDosing' ],
	stores : [ 'CumulativeDosingMeds' ],
	refs: [
		{
			ref : "Medication",
			selector : "CumulativeDosing [name=\"Medication\"]"
		},
		{
			ref : "ThePanel",
			selector : "CumulativeDosing"
		},
		{
			ref : "TheGrid",
			selector : "CumulativeDosing grid"
		},
		{
			ref : "DeleteBtn",
			selector : "CumulativeDosing button[text=\"Delete\"]"
		}
	],

	init: function() {
		this.control({
			"CumulativeDosing" : {
				beforerender: this.RefreshPanel
			},
			"CumulativeDosing grid" : {
					select: this.selectGridRow,
					deselect: this.deSelectGridRow
			},
			"CumulativeDosing button[text=\"Cancel\"]" : {
				click: this.clickCancel
			},
			"CumulativeDosing button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"CumulativeDosing button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"CumulativeDosing button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});
	},

	clickCancel : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
		this.getTheGrid().getSelectionModel().deselectAll();
	},



	_formSubmit : function(form, URL, CMD) {
			form.submit({
				scope : this,
				clientValidation: true,
				url: URL,
				method : CMD,
				success: function(form, action) {
					this.RefreshPanel();
					//this.CancelForm();
				},
				failure: function(form, action) {
					var SaveTitle = "Saving Intelligent Data Entry Configuration FAILED";
					this.RefreshPanel();
					//this.CancelForm();
					switch (action.failureType) {
						case Ext.form.action.Action.CLIENT_INVALID:
							Ext.Msg.alert(SaveTitle, 'Form fields may not be submitted with invalid values');
							break;
						case Ext.form.action.Action.CONNECT_FAILURE:
							Ext.Msg.alert(SaveTitle, 'Ajax communication failed');
							break;
						case Ext.form.action.Action.SERVER_INVALID:
							Ext.Msg.alert(SaveTitle, action.result.msg);
					}
				}
			});
	},
		/* Cumulative Dosing Medications are stored in the Lookup Table with a Lookup_Type = "50" */
	SaveForm : function(theBtn, theEvent, eOpts) {
		var form = this.getThePanel().getForm();
		var URL = Ext.URLs.AddLookup;
		var CMD = "POST";
		var theStore = this.getTheGrid().store;
		var theKey = form.getValues().Medication;
		var theRecord;
		if ("" !== theKey) {
			theRecord = theStore.findRecord("Medication", theKey);
		}

		if (theRecord) {
			var quesAnswer = Ext.Msg.show({
				"title" : "Duplicate Record", 
				"msg" : "A " + theKey + " record already exsists, do you wish to overwrite the existing " + theKey + " record?", 
				"buttons" : Ext.Msg.YESNO, 
				"icon" : Ext.Msg.QUESTION,
				"scope" : this,
				"fn" : function( btnID, txt, opt) {
					if ("yes" === btnID) {
						CMD = "PUT";
						URL += "/" + theKey;
						this._formSubmit(form, URL, CMD);
					}
				}
			});
		}
		else {
			this._formSubmit(form, URL, CMD);
		}
	},


	RefreshPanel : function() {
		this.application.loadMask("Please wait; Loading Panel Information");
		var theGrid = this.getTheGrid();
		var theStore = theGrid.getStore();
		theStore.load();
		theGrid.getSelectionModel().deselectAll();

//		var rootCtrlr = this.getController("NewPlan.NewPlanTab");
//		rootCtrlr.InitIntelligentDataElementStore();
//		var delBtn = this.getDeleteBtn();
//		delBtn.setDisabled(true);
//		delBtn.show();
		this.application.unMask();
	}



/********** disabled for present ***************
	deSelectGridRow : function(theRowModel, record, index, eOpts) {
	},
	
	selectGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
//		var delBtn = this.getDeleteBtn();
//		if (records.length <= 0) {
//			delBtn.setDisabled(true);
//		}
//		else {
//			delBtn.setDisabled(false);
//		}
		var theForm = this.getThePanel();
		theForm.loadRecord(record);
	}




	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("Vital2Check");
			var CMD = "DELETE";
			var URL = Ext.URLs.IntelligentDataEntry + "/" + rID;
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
						Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Delete IDE Record, Save Error - <br />" + resp.msg );
					}
				});
		}
		else {
			this.application.unMask();
			this.RefreshPanel();
			this.CancelForm();
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
	},

*************************************/









});

