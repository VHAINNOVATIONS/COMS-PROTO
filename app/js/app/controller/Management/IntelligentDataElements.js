Ext.define('COMS.controller.Management.IntelligentDataElements', {
    extend : 'Ext.app.Controller',
    stores : ["DiseaseStaging"],
    views : [ 
		'Management.IntelligentDataElements'
	],
	refs : [
		{
			ref : "IntelligentDataElements",
			selector : "IntelligentDataElements grid"
		},
		{
			ref : "IDE_Disease",
			selector : "IntelligentDataElements [name=\"Disease\"]"
		},
		{
			ref : "IDE_DiseaseID",
			selector : "IntelligentDataElements [name=\"DiseaseID\"]"
		},
		{
			ref : "IDE_Stage",
			selector : "IntelligentDataElements [name=\"Stage\"]"
		},
		{
			ref : "IDE_Delete",
			selector : "IntelligentDataElements button[text=\"Delete\"]"
		}
    ],
    

    init: function() {
        wccConsoleLog('Initialized Intelligent Data Elements Panel Navigation Controller!');
/********
        this.control({
			"IntelligentDataElements" : {
				beforerender: this.IDE_LoadPanelRequirements
			},
			"IntelligentDataElements grid" : {
					select: this.selectIDE_GridRow,
					deselect: this.deSelectIDE_GridRow
			},
			"IntelligentDataElements button[text=\"Cancel\"]" : {
				click: this.clickIDE_Cancel
			},
			"IntelligentDataElements button[text=\"Save\"]" : {
				click: this.clickIDE_sSave
			},
			"IntelligentDataElements button[text=\"Refresh\"]" : {
				click: this.IDE_LoadPanelRequirements
			},
			"IntelligentDataElements button[text=\"Delete\"]" : {
				click: this.IDE_DeleteRecords
			}
		});
**********/
    },

	deleteSelectedRecords : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("ID");
			var CMD = "DELETE";
			var URL = Ext.URLs.IDE_ + "/" + rID;
				Ext.Ajax.request({
					url: URL,
					method : CMD,
					scope: this,
					records : theRecords,
					success: function( response, opts ){
						this.deleteSelectedRecords(opts.records);
					},
					failure : function( response, opts ) {
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Clinic Info, Save Error - <br />" + resp.msg );
					}
				});
		}
		else {
			this.application.unMask();
			this.IDE_LoadPanelRequirements();
		}
	},

	IDE_DeleteRecords : function(theBtn) {
		var theGrid = theBtn.up("form").down("grid");
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Disease Staging records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteSelectedRecords(theRecords);
			}
		}, this);
	},

	IDE_LoadPanelRequirements : function() {
		this.application.loadMask("Please wait; Loading Disease Staging Information");

		var theGrid = this.getIDE_Grid();
		var theStore = theGrid.getStore();
		theStore.load();
		theGrid.getSelectionModel().deselectAll();

		var delBtn = this.getIDE__Delete();
		delBtn.setDisabled(true);
		delBtn.show();

		this.application.unMask();
		return true;
	},

	deSelectIDE_GridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var delBtn = this.getIDE__Delete();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},
	
	selectIDE_GridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var delBtn = this.getIDE__Delete();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}

		var recID = record.get("ID");
		var Disease = record.get("Disease");
		var DiseaseID = record.get("DiseaseID");
		var Stage = record.get("Stage");

		var theDiseaseField = this.getIDE__Disease();
		var theDiseaseIDField = this.getIDE__DiseaseID();
		var theStageField = this.getIDE__Stage();
		theDiseaseField.setValue(Disease);
		theDiseaseIDField.setValue(DiseaseID);
		theDiseaseField.recID = recID;
		theStageField.setValue(Stage);
	},

	clickIDE_Cancel : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
		var grid = theBtn.up("form").down("grid");
		grid.getSelectionModel().deselectAll();
	},
 
	clickIDE_Save : function(theBtn, theEvent, eOpts) {
		var CMD = "POST";
		var URL = Ext.URLs.IDE_;

		var form = theBtn.up('form').getForm();
		var grid = theBtn.up("form").down("grid");
		var theStore = grid.getStore();
		var theData = form.getValues();
		theStore.clearFilter(true);
		var theDiseaseField = this.getIDE__Disease();
		if (theDiseaseField.recID) {

			CMD = "PUT";
			URL += "/" + theDiseaseField.recID;
			delete theDiseaseField.recID;
		}
		else {
			var xx = theStore.filter([ {property: "Disease", value: theData.Disease},{property: "Stage", value: theData.Stage}]);
			if (theStore.getCount() >= 1) {
				// This is a duplicate Record. It's now a PUT.
				var Disease = theStore.getRange()[0].get("DiseaseID");
				var ID = theStore.getRange()[0].get("ID");
				var Stage = theStore.getRange()[0].get("Stage");
				CMD = "PUT";
				URL += "/" + ID;
			}
			theStore.clearFilter(true);
		}

		form.submit({
			scope : this,
			clientValidation: true,
			url: URL,
			method : CMD,
			success: function(form, action) {
				this.IDE_LoadPanelRequirements();
				form.reset();
			},
			failure: function(form, action) {
				var SaveTitle = "Saving Disease Stage FAILED";
				this.IDE_LoadPanelRequirements();
				form.reset();
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
	}
});

