Ext.define('COMS.controller.Management.IntelligentDataElements', {
    extend : 'Ext.app.Controller',
    stores : ["IDEntry"],
    views : [ 
		'Management.IntelligentDataElements'
	],
	refs : [
		{
			ref : "ThePanel",
			selector : "IntelligentDataElements"
		},
		{
			ref : "TheGrid",
			selector : "IntelligentDataElements grid"
		},
		{
			ref : "DeleteBtn",
			selector : "IntelligentDataElements button[text=\"Delete\"]"
		}
    ],
    

    init: function() {
        wccConsoleLog('Initialized Intelligent Data Elements Panel Navigation Controller!');

        this.control({
			"IntelligentDataElements" : {
				beforerender: this.RefreshPanel
			},
			"IntelligentDataElements grid" : {
					select: this.selectGridRow,
					deselect: this.deSelectGridRow
			},
			"IntelligentDataElements button[text=\"Cancel\"]" : {
				click: this.CancelForm
			},
			"IntelligentDataElements button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"IntelligentDataElements button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"IntelligentDataElements button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});

    },



	_formSubmit : function(form, URL, CMD) {
			form.submit({
				scope : this,
				clientValidation: true,
				url: URL,
				method : CMD,
				success: function(form, action) {
					this.RefreshPanel();
					this.CancelForm();
				},
				failure: function(form, action) {
					var SaveTitle = "Saving Intelligent Data Entry Configuration FAILED";
					this.RefreshPanel();
					this.CancelForm();
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
	SaveForm : function(theBtn, theEvent, eOpts) {
		var form = this.getThePanel().getForm();
		var URL = Ext.URLs.IntelligentDataEntry;
		var CMD = "POST";
		var theStore = this.getTheGrid().store;
		var theKey = form.getValues().Vital2Check;
		var theRecord;
		if ("" !== theKey) {
			theRecord = theStore.findRecord("Vital2Check", theKey);
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

	CancelForm : function() {
		this.getThePanel().getForm().reset();
		this.getTheGrid().getSelectionModel().deselectAll();
	},


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
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Intelligent Data Entry records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
			}
		}, this);
	},

	RefreshPanel : function() {
		this.application.loadMask("Please wait; Loading Panel Information");
		var theGrid = this.getTheGrid();
		var theStore = theGrid.getStore();
		theStore.load();
		theGrid.getSelectionModel().deselectAll();

		/* This store is required for Vital Signs Validation and must be updated in the application variable pool */
		var rootCtrlr = this.getController("NewPlan.NewPlanTab");
		rootCtrlr.InitIntelligentDataElementStore();

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
		theForm.loadRecord(record);
	}
 
});

