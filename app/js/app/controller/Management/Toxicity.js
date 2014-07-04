Ext.define('COMS.controller.Management.Toxicity', {
	extend : 'Ext.app.Controller',
	views : [ 'Management.Toxicity' ],
	stores : [ 'Toxicity'],
	refs: [
		{
			ref : "ToxicityInstructionGrid",
			selector : "Toxicity grid"
		},
		{
			ref : "ToxicityInstruction_Instruction",
			selector : "Toxicity [name=\"Label\"]"
		},
		{
			ref : "ToxicityInstruction_Documentation",
			selector : "Toxicity [name=\"Details\"]"
		}
	],

	init: function() {
		this.control({
			"Toxicity" : {
				beforerender: this.ToxicityInstructionLoadGrid
			},
			"Toxicity grid" : {
					select: this.selectToxicityInstructionGridRow
			},
			"Toxicity button[text=\"Cancel\"]" : {
				click: this.clickToxicityInstructionCancel
			},
			"Toxicity button[text=\"Save\"]" : {
				click: this.clickToxicityInstructionSave
			},
			"Toxicity button[text=\"Refresh\"]" : {
				click: this.ToxicityInstructionLoadGrid
			}
		});
	},

/* Toxicity Instruction */
	ToxicityInstructionLoadGrid : function(panel) {
		this.application.loadMask("Please wait; Loading Toxicity Instructions");
		var theGrid = this.getToxicityInstructionGrid();
		var theStore = theGrid.getStore();
		theStore.load();
		this.application.unMask();
		return true;
	},

	selectToxicityInstructionGridRow : function(theRowModel, record, index, eOpts) {
		var recID = record.get("ID");
		var Label = record.get("Label");
		var Details = record.get("Details");

		this.CurrentToxicityInstructionRecordID = recID;
		this.CurrentToxicityInstruction = Label;

		var theInstructionField = this.getToxicityInstruction_Instruction();
		var theDocsField = this.getToxicityInstruction_Documentation();
		theInstructionField.setValue(Label);
		theDocsField.setValue(Details);
	},

	clickToxicityInstructionCancel : function(theBtn, theEvent, eOpts) {
		theBtn.up('form').getForm().reset();
	},

	clickToxicityInstructionSave : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up('form').getForm();
		var theData = form.getValues(false, false, false, true);

		if (form.isValid()) {
			var Label = theData.Label;
			var Details = Ext.util.Format.htmlEncode(theData.Details);
			var recID = this.CurrentToxicityInstructionRecordID;
			var URL = Ext.URLs.ToxicityInstruction;
			var CMD = "POST";
			if ("" !== recID && this.CurrentToxicityInstruction === Label) {
				URL += "/" + recID;
				CMD = "PUT";
			}

			Ext.Ajax.request({
				url: URL,
				method : CMD,
				jsonData : {"Label" : Label, "Details" : Details },
				scope: this,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.CurrentToxicityInstructionRecordID = "";
					this.CurrentToxicityInstruction = "";
					var theInstructionField = this.getToxicityInstruction_Instruction();
					var theDocsField = this.getToxicityInstruction_Documentation();
					theInstructionField.setValue("");
					theDocsField.setValue("");

					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "Site Configuration - Toxicity Instruction, Save Error - " + resp.msg );
					}
					else {
						var theGrid = this.getToxicityInstructionGrid();
						theGrid.getStore().load();
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.CurrentToxicityInstructionRecordID = "";
					this.CurrentToxicityInstruction = "";
					var theInstructionField = this.getToxicityInstruction_Instruction();
					var theDocsField = this.getToxicityInstruction_Documentation();
					theInstructionField.setValue("");
					theDocsField.setValue("");

					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Toxicity Instruction, Save Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
		}
		else {
			var Msg = "";
			var Docs = "";
			if (!theData.Label) {
				Msg += "<li>Missing Instruction Selection</li>";
			}
			if ("" === theData.Details) {
				Msg += "<li>Missing Documentation for Toxicity Instruction</li>";
			}
			if ("" !== Msg) {
				Ext.MessageBox.alert('Invalid', 'Please fix the following errors:<ul>' + Msg + '</ul>');
			}
		}
	}, 
});

