Ext.define('COMS.controller.Management.Toxicity', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.Toxicity' ],
	stores : [ 'Toxicity'],
	refs: [
		{ ref : "ToxicityInstructionGrid",           selector : "Toxicity grid" },
		{ ref : "ToxicityInstruction_Instruction",   selector : "Toxicity [name=\"Label\"]" },
		{ ref : "ToxicityInstruction_Documentation", selector : "Toxicity [name=\"Details\"]" },
		{ ref : "ToxicityInstruction_Grade",         selector : "Toxicity [name=\"Grade_Level\"]" },
		{ ref : "DeleteBtn",                         selector : "Toxicity button[text=\"Delete\"]" }

	],

	init: function() {
		this.control({
			"Toxicity" : {
				beforerender: this.RefreshPanel
			},
			"Toxicity grid" : {
					select: this.selectGridRow,
					deselect: this.deSelectGridRow
			},
			"Toxicity button[text=\"Cancel\"]" : {
				click: this.CancelForm
			},
			"Toxicity button[text=\"Save\"]" : {
				click: this.SaveForm
			},
			"Toxicity button[text=\"Refresh\"]" : {
				click: this.RefreshPanel
			},
			"Toxicity button[text=\"Delete\"]" : {
				click: this.DeleteSelectedRecords
			}
		});
	},


	RefreshPanel : function(panel) {
		this.application.loadMask("Please wait; Loading Toxicity Instructions");
		var theGrid = this.getToxicityInstructionGrid();
		var theStore = theGrid.getStore();
		theStore.load();

		var delBtn = this.getDeleteBtn();
		delBtn.setDisabled(true);
		delBtn.show();

		this.application.unMask();
		return true;
	},

	selectGridRow : function(theRowModel, record, index, eOpts) {
		var recID = record.get("ID");
		var Label = record.get("Label");
		var Details = record.get("Details");
		var Grade_Level = record.get("Grade_Level");

		Details = Ext.util.Format.htmlDecode(Details);

		this.CurrentToxicityInstructionRecordID = recID;
		this.CurrentToxicityInstruction = Label;

		var theInstructionField = this.getToxicityInstruction_Instruction();
		var theDocsField = this.getToxicityInstruction_Documentation();
		var theGradeField = this.getToxicityInstruction_Grade();

		theInstructionField.setValue(Label);
		theDocsField.setValue(Details);
		theGradeField.setValue(Grade_Level);

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

	DeleteSelectedRecords : function() {
		var theGrid = this.getToxicityInstructionGrid();
		var theRecords = theGrid.getSelectionModel().getSelection();
		var len = theRecords.length, i, record;
		Ext.MessageBox.confirm("Confirm Deletion", "Are you sure you want to delete the selected Toxicity records?", function(btn) {
			if ("yes" === btn) {
				this.application.loadMask("Please wait; Deleting Selected Records");
				this.deleteRecord(theRecords);
			}
		}, this);
	},

	CancelForm : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
	},

	SaveForm : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up('form').getForm();
		var theData = form.getValues(false, false, false, true);

		if (form.isValid()) {
			var Label = theData.Label;
			var Details = Ext.util.Format.htmlEncode(theData.Details);
			var Grade_Level = theData.Grade_Level;
			var recID = this.CurrentToxicityInstructionRecordID;
			var URL = Ext.URLs.ToxicityInstruction;
			var CMD = "POST";
			if (recID && "" !== recID) {
				URL += "/" + recID;
				CMD = "PUT";
			}

			Ext.Ajax.request({
				url: URL,
				method: CMD,
				jsonData: {"Label" : Label, "Details" : Details, "Grade_Level" : Grade_Level },
				scope: this,
				theForm: form,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.CurrentToxicityInstructionRecordID = "";
					this.CurrentToxicityInstruction = "";
					opts.theForm.reset();
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "Site Configuration - Toxicity Instruction, Save Error - " + resp.msg );
					}
					else {
						var theGrid = this.getToxicityInstructionGrid();
						theGrid.getStore().load();
					}
				},
				failure: function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.CurrentToxicityInstructionRecordID = "";
					this.CurrentToxicityInstruction = "";
					opts.theForm.reset();
					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Toxicity Instruction, Save Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
		}
		else {
			var Msg = "";
			var Docs = "";
			if (!theData.Label) {
				Msg += "<li>Missing Toxicity Instruction</li>";
			}
			if (!theData.Grade_Level) {
				Msg += "<li>Missing Grade / Level Information</li>";
			}
			if ("" === theData.Details) {
				Msg += "<li>Missing Details for Toxicity Instruction</li>";
			}
			if ("" !== Msg) {
				Ext.MessageBox.alert('Invalid', 'Please fix the following errors:<ul>' + Msg + '</ul>');
			}
		}
	}
});

