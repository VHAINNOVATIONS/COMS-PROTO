Ext.define("COMS.controller.Management.AddLookups", {
	extend : "Ext.app.Controller",
	views : [ "Management.AddLookups" ],
	stores : [ "GenericLookup" ],
	refs: [
		{ ref : "AddLookupsGrid", selector : "AddLookups grid" },
		{ ref : "AddLookupsNameField", selector : "AddLookups [name=\"value\"]" },
		{ ref : "AddLookupsDescField", selector : "AddLookups [name=\"description\"]" },
		{ ref : "AddLookupsGrid", selector : "AddLookups grid" },
		{ ref : "DeleteBtn", selector : "AddLookups button[text=\"Delete\"]" }

	],

	init: function() {
		this.control({
			"AddLookups" : {
				beforerender: this.RefreshPanel
			},

			"AddLookups SelectLookups" : {
				select : this.LookupSelected
			},
			"AddLookups grid" : {
					select: this.selectGridRow,
					deselect: this.deSelectGridRow
			},
			"AddLookups button[text=\"Cancel\"]" : {
				click: this.CancelForm
			},
			"AddLookups button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"AddLookups button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"AddLookups button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});
	},

	theGridStore : null,
	theCurrentLookupURL : null,


	RefreshPanel : function() {
		var delBtn = this.getDeleteBtn();
		delBtn.setDisabled(true);
		delBtn.show();
	},

	
	// Load the grid"s store to see all the values for the selected type
	LookupSelected : function ( combo, recs, eOpts ) {
		var theData = recs[0].data.value;
		this.theGridStore = this.getAddLookupsGrid().getStore();
		this.theCurrentLookupURL = Ext.URLs.BaseView + "/" + theData;
		this.theGridStore.load({url:this.theCurrentLookupURL});
	},

	selectGridRow : function(theRowModel, record, index, eOpts) {
		var recID = record.get("id");
		var RecName = record.get("name");
		var RecDesc = record.get("description");
		this.CurrentGenericLookupRecID = recID;
		this.CurrentGenericLookupRecName = RecName;
		this.CurrentGenericLookupRecDesc = RecDesc;

		var theNameField = this.getAddLookupsNameField();
		var theDescField = this.getAddLookupsDescField();
		theNameField.setValue(RecName);
		theDescField.setValue(RecDesc);

		var records = theRowModel.getSelection();
		var delBtn = this.getDeleteBtn();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},

	deSelectGridRow : function(theRowModel, record, index, eOpts) {
	},

	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.getData();
			var recID = rID.id;
			var modelData = {};
			if (recID) {	// We are updating an existing record
				modelData.id = recID;				// This is the actual GUID or lookup_ID in the lookup table
			}
			var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, modelData);
			lookupRecord.destroy(
				{
					scope : this,
					waitMsg : "Deleting Data...",
					success: function(data) {
						var theNameField = this.getAddLookupsNameField();
						var theDescField = this.getAddLookupsDescField();
						theNameField.setValue("");
						theDescField.setValue("");

						this.theGridStore.load({url:this.theCurrentLookupURL});
						this.application.unMask();
					},
					failure: function(err){
						Ext.MessageBox.alert("Invalid", "This reference has NOT been deleted.");
						this.application.unMask();
					}
				}
			);
		}
		else {
			this.application.unMask();
			this.CancelForm();
		}
	},

	DeleteSelectedRecords : function() {
		var theGrid = this.getAddLookupsGrid();
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Lookup records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
			}
		}, this);
	},


	CancelForm : function(theBtn, theEvent, eOpts) {
		theBtn.up("form").getForm().reset();
	},

	SaveForm : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up("form").getForm();
		if (form.isValid()) {
			var recID = this.CurrentGenericLookupRecID;
			var values = form.getValues();
			var Description = Ext.util.Format.htmlEncode(values.description);
			var Value = Ext.util.Format.htmlEncode(values.value);
			var modelData = {};
			modelData.lookupid = values.id;		// This is really the lookup_type in the lookup table (e.g. 29 for Drugs, etc)
			modelData.value = Value;
			modelData.description = Description;
			if (recID) {	// We are updating an existing record
				modelData.id = recID;				// This is the actual GUID or lookup_ID in the lookup table
			}
			var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, modelData);

			lookupRecord.save({
				scope : this,
				waitMsg : "Saving Data...",
				success: function(data) {
					delete this.CurrentGenericLookupRecID;
					delete this.CurrentGenericLookupRecName;
					delete this.CurrentGenericLookupRecDesc;
					
					var theNameField = this.getAddLookupsNameField();
					var theDescField = this.getAddLookupsDescField();
					theNameField.setValue("");
					theDescField.setValue("");
					this.theGridStore.load({url:this.theCurrentLookupURL});
				},
				failure: function(err){
					Ext.MessageBox.alert("Invalid", "This reference already exists.");
					delete this.CurrentGenericLookupRecID;
					delete this.CurrentGenericLookupRecName;
					delete this.CurrentGenericLookupRecDesc;

					var theNameField = this.getAddLookupsNameField();
					var theDescField = this.getAddLookupsDescField();
					theNameField.setValue("");
					theDescField.setValue("");
				}
			});
		}
		else {
			var Msg = "";
			var Docs = "";
			var theData = form.getValues(false, false, false, true);
			if (!theData.description) {
				Msg += "<li>Missing Lookup Description</li>";
			}
			if ("" === theData.value) {
				Msg += "<li>Missing Lookup Name</li>";
			}
			if ("" !== Msg) {
				Ext.MessageBox.alert("Invalid", "Please fix the following errors:<ul>" + Msg + "</ul>");
			}
		}
	}
});

