Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.DischargeInstructions" ,{
	extend: "Ext.app.Controller",
	views: [
		"CkBoxTArea",
		"NewPlan.CTOS.NursingDocs.DischargeInstructions", 
		"NewPlan.CTOS.NursingDocs.PatientEducationDetails",
		"NewPlan.CTOS.NursingDocs.FollowupDetails"
	],
	refs: [
		{
			ref : "Barrier_Physical",
			selector : "CkBoxTArea[name=\"Barrier_Physical\"]"
		},
		{
			ref : "Barrier_Physical_ckbox",
			selector : "CkBoxTArea[name=\"Barrier_Physical\"] checkbox"
		},
		{
			ref : "PatientEduDetails",
			selector : "DischargeInstructions fieldset[name=\"PatientEducation\"] container[name=\"PatientEduDetails\"]"
		},
		{
			ref : "DischargeInstrDetails",
			selector : "PatientEducationDetails [name=\"ND_E_DischargeInstr\"]"
		},

		{
			ref : "ClinicInfoDetails",
			selector : "PatientEducationDetails [name=\"ND_E_ClinicInfoDetails\"]"
		},
		{
			ref : "ClinicInfoDetailsDisplay",
			selector : "ClinicInfoDisplay"
		},
		{
			ref : "DischargeInstrDetailsDisplay",
			selector : "SpclInstrDisplay"
		},
		{
			ref : "SpclInstrDetailsDisplay",
			selector : "PatientEducationDetails [name=\"ND_E_SpclInstrDisplay\"]"
		},

		{
			ref : "MedSpecificInfoDisplay",
			selector : "PatientEducationDetails MedSpecificInfoDisplay"
		}



	],

	// Ext.ComponentQuery.query("DischargeInstructions [name=\"PatientEducation\"] [name=\"PatientEduDetails\"]")[0].getStore()
	init: function () {
		this.control({
			"PatientEducationDetails [name=\"ND_E_SelectClinicInfo\"]" : {
				"change" : this.ClinicInfoSelected
			},
			"PatientEducationDetails [name=\"ND_E_SelectDischargeInstr\"]" : {
				"change" : this.SpclInstrSelected
			},
			"[name=\"PatientEducation\"] [name=\"PE_Taught\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("PatientEducationDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			},

			"[name=\"Followup\"] [name=\"FollowupNeeded\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("FollowupDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			},

			"[name=\"DischargeInstructionsMaterials\"] [name=\"DischargeInstructions_Given\"]" : {
				"change" : function(theFld, newV, oldV, eOpts) {
					var theSectionByID = Ext.getCmp("DischargeInstructionsDetails");
					if ("Yes" === theFld.fieldLabel && newV) {
						theSectionByID.show();
					}
					else if ("No" === theFld.fieldLabel && newV) {
						theSectionByID.hide();
					}
				}
			},
			"DischargeInstructions button[text=\"Save\"]" : {
				"click" : this.SaveDischargeInstructions
			},
			"DischargeInstructions button[text=\"Cancel\"]" : {
				"click" : this.CancelDischargeInstructions
			},
			"PatientEducationDetails [name=\"MedSpecificInfoHeader\"]" : {
				"click" : this.DisplayMedInfo
			},
			"PatientEducationDetails" : {
				"afterrender" : this.LoadMedInfo,
			},
			"PatientEducationDetails [name=\"ND_E_DischargeInstr\"]" : {
				"show" : this.LoadMedInfo,
			},
			"fieldset[name=\"Barriers\"] checkbox" : {
				"change" : function(btn, nValu, oValu, opts) {
					this.MExclusiveCkBoxs(btn, nValu);
				}
			}
		});
	},


	MExclusiveCkBoxs : function(btn, nValu) {
		var label = btn.getFieldLabel();
		var ckboxs = Ext.ComponentQuery.query("fieldset[name=\"Barriers\"] checkbox");
		var tAreas = Ext.ComponentQuery.query("fieldset[name=\"Barriers\"] textarea");
		if ("None" === label) {
			if (nValu) {
				var i, cBox, tArea, cl = ckboxs.length, tl = tAreas.length;
				for (i = 1; i < cl; i++) {
					cBox = ckboxs[i];
					cBox.setValue("");
				}
				for (i = 0; i < tl; i++) {
					tArea = tAreas[i];
					tArea.setValue("");
					tArea.hide();
				}
			}
		}
		else if (nValu) {
			ckboxs[0].setValue("");
		}
	},

	LoadMedInfo : function() {
		var theMeds = this.application.Patient.AppliedTemplate.Meds;
		Ext.Ajax.request({
			url: Ext.URLs.TemplateMedDocs + "/" + this.application.Patient.AppliedTemplate.id,
			scope: this,
			theMeds : theMeds,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				var MedRecords = resp.records;
				var thePanel = this.getMedSpecificInfoDisplay();

				for (i = 0; i < MedRecords.length; i++) {
					var dec, raw = MedRecords[i].Documentation;
					if ("" === raw) {
						dec = "No additional information provided for this medication";
					}
					else {
						dec = Ext.util.Format.htmlDecode(raw);
					}
					MedRecords[i].Documentation = dec;
				}
				thePanel.update(MedRecords);
			},
			failure : function( response, opts ) {
				debugger;
			}
		});

		/* MedSpecificInfoDisplay */
	},
	DisplayMedInfo : function() {
		var htmlData = prettyPrint( COMS.Patient.AppliedTemplate, { maxDepth : 5 } ).innerHTML;
		Ext.create('Ext.window.Window', {
			title: 'Patient Template',
			height: 800,
			width: 950,
			autoScroll : true,
			html : htmlData
		}).show();
	},

	CancelDischargeInstructions : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up('form').getForm();
	},

	SaveDischargeInstructions : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up('form').getForm();
		var theData = form.getValues(false, false, false, true);
		Ext.MessageBox.alert("Discharge Instructions Saved", "Discharge Instructions Saved..." );


/**
		if (form.isValid()) {
			var Label = theData.Label;
			var Details = Ext.util.Format.htmlEncode(theData.Details);
			var recID = this.CurrentMedRisksRecordID;
			var URL = Ext.URLs.MedRisks;
			var CMD = "POST";
			if ("" !== recID && this.CurrentMedRisks === Label) {
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
					this.CurrentMedRisksRecordID = "";
					this.CurrentMedRisks = "";
					var theLabelField = this.getMedRisks_Label();
					var theDetailsField = this.getMedRisks_Details();
					theLabelField.setValue("");
					theDetailsField.setValue("");

					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "Site Configuration - Clinic Info, Save Error - " + resp.msg );
					}
					else {
						var thisCtl = this.getController("Management.AdminTab");
						var theGrid = thisCtl.getMedRisksGrid();
						theGrid.getStore().load();
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.CurrentMedRisksRecordID = "";
					this.CurrentMedRisks = "";
					var theLabelField = this.getMedRisks_Label();
					var theDetailsField = this.getMedRisks_Details();
					theLabelField.setValue("");
					theDetailsField.setValue("");

					Ext.MessageBox.alert("Saving Error", "Saving Error", "Site Configuration - Clinic Info, Save Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
		}
		else {
			var Msg = "";
			if ("" === theData.Label) {
				Msg += "<li>Missing Label Selection</li>";
			}
			if ("" === theData.Details) {
				Msg += "<li>Missing Details for Label</li>";
			}
			if ("" !== Msg) {
				Ext.MessageBox.alert('Invalid', 'Please fix the following errors:<ul>' + Msg + '</ul>');
			}
		}
**/
	},

	commonRenderTable : function(thePanel, theStore) {
		var Records = theStore,
			len = Records.length,
			Data = [],
			i,
			theRec;
		if (len > 0) {
			for (i = 0; i < len; i++) {
				theRec = Records[i];
				var doc = theRec.Details;
				doc = Ext.util.Format.htmlDecode(doc);
				Data.push({"Label" : theRec.Label, "Details" : doc });
			}
		}
		thePanel.update(Data);
	},


	/**
	 * Special Instructions
	 **/
	spclInstrStore : [],
	SpclInstrGetSelected : function(key) {
			Ext.Ajax.request({
				url: Ext.URLs.DischargeInstruction + "/" + key,
				method : "GET",
				scope: this,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Error", "Site Configuration - Special Instructions Details, Retrieve Error - " + resp.msg );
					}
					else {
						Ext.Array.include(this.spclInstrStore, resp.records[0]);
						var theStore = this.spclInstrStore;
						var thePanel = this.getDischargeInstrDetailsDisplay();
						this.commonRenderTable(thePanel, theStore);
						// this.renderSpclInstrTable();
						console.log("Adding Record for " + resp.records[0].Label + " - " + resp.records[0].ID);
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );

					Ext.MessageBox.alert("Error", "Error", "Site Configuration - Special Instructions Details, Retrieve Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
	},

	SpclInstrSelected : function(theCkBox, nValue, oValue, eOpts) {
		var newKeys, oldKeys, newRecords, records2Remove;
		console.log("SpclInstrSelected - ");
		console.log(nValue);

		if (nValue && "" !== nValue ) {
			newKeys = nValue.split(",");
		}
		if (oValue && "" !== oValue ) {
			oldKeys = oValue.split(",");
		}
		
		// var diff1 = Ext.Array.difference(newKeys, oldKeys);
		newRecords = null;
		records2Remove = null;
		if (newKeys && !oldKeys) {
			newRecords = newKeys;
			records2Remove = null;
		}
		else if (newKeys && oldKeys) {
			newRecords = Ext.Array.difference(newKeys, oldKeys);
			if (0 == newRecords.length) {
				newRecords = null;
			}
			records2Remove = Ext.Array.difference(oldKeys, newKeys);
		}
		else if (!newKeys && oldKeys) {
			newRecords = null;
			records2Remove = oldKeys;
		}
		console.log("Add New Records = " + newRecords);
		console.log("Remove old Records = " + records2Remove);
		if (newRecords || newRecords == "") {
			this.SpclInstrGetSelected(newRecords);
		}
		var len = this.spclInstrStore.length;
		if (records2Remove) {
			for (i = 0; i < len; i++) {
				var rec = this.spclInstrStore[i];
				if (rec.ID === records2Remove[0]) {
					console.log("Removing Record for " + rec.Label + " - " + rec.ID);
					Ext.Array.remove(this.spclInstrStore, rec);

						var theStore = this.spclInstrStore;
						var thePanel = this.getDischargeInstrDetailsDisplay();
						this.commonRenderTable(thePanel, theStore);


					// this.renderSpclInstrTable();
					break;
				}
			}
		}
	},

	/**
	 * Clinic Information
	 **/
	sciStore : [],
	sciGetSelected : function(key) {
			Ext.Ajax.request({
				url: Ext.URLs.ClinicInfo + "/" + key,
				method : "GET",
				scope: this,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Error", "Site Configuration - Clinic Info, Retrieve Error - " + resp.msg );
					}
					else {
						Ext.Array.include(this.sciStore, resp.records[0]);
						var theStore = this.sciStore;
						var thePanel = this.getClinicInfoDetailsDisplay();
						this.commonRenderTable(thePanel, theStore);

						// this.renderSCITable();
						console.log("Adding Record for " + resp.records[0].Label + " - " + resp.records[0].ID);
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );

					Ext.MessageBox.alert("Error", "Error", "Site Configuration - Clinic Info, Retrieve Error - " + "e.message" + "<br />" + resp.msg );
				}
			});
	},
	ClinicInfoSelected : function(theCkBox, nValue, oValue, eOpts) {
		var newKeys, oldKeys, newRecords, records2Remove;
		console.log("ClinicInfoSelected - ");
		console.log(nValue);

		if (nValue && "" !== nValue ) {
			newKeys = nValue.split(",");
		}
		if (oValue && "" !== oValue ) {
			oldKeys = oValue.split(",");
		}
		newRecords = null;
		records2Remove = null;
		if (newKeys && !oldKeys) {
			newRecords = newKeys;
			records2Remove = null;
		}
		else if (newKeys && oldKeys) {
			newRecords = Ext.Array.difference(newKeys, oldKeys);
			if (0 == newRecords.length) {
				newRecords = null;
			}
			records2Remove = Ext.Array.difference(oldKeys, newKeys);
		}
		else if (!newKeys && oldKeys) {
			newRecords = null;
			records2Remove = oldKeys;
		}
		console.log("Add New Records = " + newRecords);
		console.log("Remove old Records = " + records2Remove);
		if (newRecords || newRecords == "") {
			this.sciGetSelected(newRecords);
		}
		var len = this.sciStore.length;
		if (records2Remove) {
			for (i = 0; i < len; i++) {
				var rec = this.sciStore[i];
				if (rec.ID === records2Remove[0]) {
					console.log("Removing Record for " + rec.Label + " - " + rec.ID);
					Ext.Array.remove(this.sciStore, rec);
						var theStore = this.sciStore;
						var thePanel = this.getClinicInfoDetailsDisplay();
						this.commonRenderTable(thePanel, theStore);

					// this.renderSCITable();
					break;
				}
			}
		}
	}
});