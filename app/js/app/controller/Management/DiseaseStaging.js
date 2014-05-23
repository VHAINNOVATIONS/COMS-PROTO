Ext.define('COMS.controller.Management.DiseaseStaging', {
    extend : 'Ext.app.Controller',
    stores : ["DiseaseStaging"],
    views : [ 
		'Management.DiseaseStaging'
	],
	refs : [
		{
			ref : "DiseaseStaging",
			selector : "DiseaseStaging"
		},
		{
			ref : "DiseaseStagingGrid",
			selector : "DiseaseStaging grid"
		},
		{
			ref : "DiseaseStaging_Disease",
			selector : "DiseaseStaging selDisease"
		},
		{
			ref : "DiseaseStaging_DiseaseID",
			selector : "DiseaseStaging [name=\"DiseaseID\"]"
		},
		{
			ref : "DiseaseStaging_Stage",
			selector : "DiseaseStaging [name=\"Stage\"]"
		},
		{
			ref : "DiseaseStaging_Delete",
			selector : "DiseaseStaging button[text=\"Delete\"]"
		}
	],
	init: function() {
		wccConsoleLog('Initialized Disease Staging Elements Panel Navigation Controller!');
		this.control({
			"DiseaseStaging" : {
				beforerender: this.DiseaseStagingLoadPanelRequirements
			},
			"DiseaseStaging grid" : {
					select: this.selectDiseaseStagingGridRow,
					deselect: this.deSelectDiseaseStagingGridRow
			},
			"DiseaseStaging button[text=\"Cancel\"]" : {
				click: this.ResetDiseaseStagingPanel
			},
			"DiseaseStaging button[text=\"Save\"]" : {
				click: this.clickDiseaseStagingsSave
			},
			"DiseaseStaging button[text=\"Refresh\"]" : {
				click: this.DiseaseStagingLoadPanelRequirements
			},
			"DiseaseStaging button[text=\"Delete\"]" : {
				click: this.DiseaseStagingDeleteRecords
			}
		});
	},



	deleteSelectedRecords : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("ID");
			var CMD = "DELETE";
			var URL = Ext.URLs.DiseaseStaging + "/" + rID;
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
			this.DiseaseStagingLoadPanelRequirements();
		}
	},

	DiseaseStagingDeleteRecords : function(theBtn) {
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

	DiseaseStagingLoadPanelRequirements : function() {
		this.application.loadMask("Please wait; Loading Disease Staging Information");

		var theGrid = this.getDiseaseStagingGrid();
		var theStore = theGrid.getStore();
		theStore.load();
		theGrid.getSelectionModel().deselectAll();

		var delBtn = this.getDiseaseStaging_Delete();
		delBtn.setDisabled(true);
		delBtn.show();
		var theDiseaseField = this.getDiseaseStaging_Disease();
		if (theDiseaseField.recID) {
			delete theDiseaseField.recID;
		}

		this.application.unMask();
		return true;
	},

	deSelectDiseaseStagingGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var delBtn = this.getDiseaseStaging_Delete();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},
	
	selectDiseaseStagingGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var delBtn = this.getDiseaseStaging_Delete();
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

		var theDiseaseField = this.getDiseaseStaging_Disease();
		// var theDiseaseIDField = this.getDiseaseStaging_DiseaseID();
		var theStageField = this.getDiseaseStaging_Stage();
		theDiseaseField.setValue(DiseaseID);
		// theDiseaseIDField.setValue(DiseaseID);
		theDiseaseField.recID = recID;
		theStageField.setValue(Stage);
	},

	ResetDiseaseStagingPanel : function() {
		this.getDiseaseStaging().getForm().reset();
		this.getDiseaseStagingGrid().getSelectionModel().deselectAll();
		delete this.getDiseaseStaging_Disease().recID;
	},
 
	clickDiseaseStagingsSave : function(theBtn, theEvent, eOpts) {
		var CMD = "POST";
		var URL = Ext.URLs.DiseaseStaging;

		var form = theBtn.up('form').getForm();
		var grid = theBtn.up("form").down("grid");
		var theStore = grid.getStore();
		var theData = form.getValues();
		theStore.clearFilter(true);
		var theDiseaseField = this.getDiseaseStaging_Disease();
		if (theDiseaseField.recID) {

			CMD = "PUT";
			URL += "/" + theDiseaseField.recID;
			delete theDiseaseField.recID;
		}
		else {
			var xx = theStore.filter([ {property: "Disease", value: theData.selDisease},{property: "Stage", value: theData.Stage}]);
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
				this.DiseaseStagingLoadPanelRequirements();
				this.ResetDiseaseStagingPanel();
			},
			failure: function(form, action) {
				var SaveTitle = "Saving Disease Stage FAILED";
				this.DiseaseStagingLoadPanelRequirements();
				this.ResetDiseaseStagingPanel();
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
