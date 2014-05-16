Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.DischargeInstructions" ,{
	extend: "Ext.app.Controller",
	views: [
		"CkBoxTArea",
		"NewPlan.CTOS.NursingDocs.DischargeInstructions", 
		"NewPlan.CTOS.NursingDocs.PatientEducationDetails",
		"NewPlan.CTOS.NursingDocs.FollowupDetails",
		"NewPlan.CTOS.NursingDocs.selDischargeInstructions"
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
		},

		{
			ref : "selDischargeInstruction2See",
			selector : "selDischargeInstructions"
		},
		{
			ref : "DischargeInstrForm",
			selector : "DischargeInstructions form"
		}
	],

	// Ext.ComponentQuery.query("DischargeInstructions [name=\"PatientEducation\"] [name=\"PatientEduDetails\"]")[0].getStore()
	init: function () {
		this.application.on( { DischargeInstructionSelected : this.DischargeInstrSelected, scope : this } );
		this.control({
			"DischargeInstructions [id=\"PrintDischargeInstructions\"]" : {
				"click" : function() {
console.log("PrintDischargeInstructions");
				}
			},
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
			"fieldset[name=\"Barriers\"] checkbox" : {
				"change" : function(btn, nValu, oValu, opts) {
					this.MExclusiveCkBoxs(btn, nValu);
				}
			},

			"DischargeInstructions" : {
				"afterrender" : this.DischargeInstrPanelLoadProc
			},

			"selDischargeInstructions" : {
				"select" : this.selDischargeInstructions
			}
		});
	},




	selDischargeInstructions : function(theCombo, records, eOpts) {
		var theData = records[0].getData();
		var theForm = theCombo.up("panel").down("form").getForm();
		var args = { "form" : theForm, "DischargeID" : theData.DischargeID, "PatientID" : theData.PatientID, "date" : theData.date };
		if (theForm.isDirty()) {
			Ext.MessageBox.show({
				title:"Save Changes?",
				msg: "You have made changes to this Discharge Instructions Form, do you want to save those changes before opening a new set of Discharge Instructions?",
				buttons: Ext.Msg.YESNOCANCEL,
				icon: Ext.Msg.QUESTION,
				scope : this,
				fn: function(btn){
					if ("no" === btn){
						args.SaveCurrent = false;
						this.application.fireEvent("DischargeInstructionSelected", args);
					}
					else if ("yes" === btn) {
						args.SaveCurrent = true;
						this.application.fireEvent("DischargeInstructionSelected", args);
					}
				}
			});
		}
		else {
			args.SaveCurrent = false;
			this.application.fireEvent("DischargeInstructionSelected", args);
		}
	},

	DischargeInstrSelected : function( args ) {
		var theForm = args.form;
		var Pat_ID = this.application.Patient.PAT_ID;
		var PreviousDischargeID = this.application.Patient.DischargeInfoID;
		args.Pat_ID = Pat_ID;
		args.PreviousDischargeID = PreviousDischargeID;

		if (args.SaveCurrent) {
			this.doFormSubmit(theForm, Pat_ID, PreviousDischargeID, args, this.LoadForm);
		}
		else {
			this.LoadForm(args);
		}
	},

	DischargeInstrPanelLoadProc : function(thePanel, eOpts) {
		var theForm = this.getDischargeInstrForm();
		var combo = this.getSelDischargeInstruction2See();
		var store = combo.getStore();
		var Pat_ID = this.application.Patient.PAT_ID;
		store.proxy.url = Ext.URLs.PatientDischarge + "/" + Pat_ID;	// Patient/DischargeInstructions/F8B904DF-D4CF-E311-A4B9-000C2935B86F
		store.load({
			"scope" : this,
			"form" : theForm,
			"Pat_ID" : Pat_ID,
			"callback" : function(records, operation, success) {
				var DischargeID;
				if(success){
					Ext.each(records, function(r) {
						var dateCk = Ext.util.Format.date(new Date());
						if (dateCk == r.get('date')) {
							DischargeID = r.get("DischargeID");
							return false;	/* Exit from the each loop */
						}
					});
				}
				if (DischargeID) {
					this.LoadForm({"form" : operation.form, "Pat_ID" : operation.Pat_ID, "DischargeID" : DischargeID});
				}
			}
		});
		this.LoadMedInfo();
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
		Ext.MessageBox.show({
			title:"Clear Form?",
			msg: "You have made changes to this Discharge Instructions Form, are you sure you want to CANCEL this form? All changes will be lost",
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn){
				if ("yes" === btn) {
					var form = theBtn.up('form').getForm();
					form.reset();
					Ext.getCmp("PatientEducationDetails").hide();
					Ext.getCmp("FollowupDetails").hide();
					Ext.getCmp("DischargeInstructionsDetails").hide();
				}
			}
		});
	},


	LoadForm : function( args ) {
		this.application.loadMask("Loading Discharge Instructions");

		var form = args.form;
		if (form.getForm) {
			form = form.getForm();
		}
		var Pat_ID = args.Pat_ID;
		var DischargeInstructionsID = args.DischargeID;

		var URL = Ext.URLs.PatientDischarge + "/" + Pat_ID + "/" + DischargeInstructionsID;

		Ext.ClearForm(form);
		Ext.getCmp("PatientEducationDetails").hide();
		Ext.getCmp("DischargeInstructionsDetails").hide();
		Ext.getCmp("FollowupDetails").hide();
		form.load({
			url: URL,
			method: "GET",
			scope : this,
			success: function(form, action) {
				// process input to show sections of the form
				var theData = action.result.data;
				if ("1" == theData.PE_Taught) {
					Ext.getCmp("PatientEducationDetails").show();
				}
				if ("1" == theData.DischargeInstructions_Given) {
					Ext.getCmp("DischargeInstructionsDetails").show();
				}
				if ("1" == theData.FollowUp_Type) {
					Ext.getCmp("FollowupDetails").show();
				}
				Ext.ClearDirtyFlags(form);
				this.application.unMask();
			},
		    failure: function(form, action) {
				Ext.Msg.alert("Load failed", action.result.errorMessage);
				this.application.unMask();
			}
		});
	},

	doFormSubmit : function(form, Pat_ID, PreviousDischargeID, fncArgs, fnc) {

		var CMD = "POST";
		var URL = Ext.URLs.PatientDischarge + "/" + Pat_ID;
		if (PreviousDischargeID) {
			CMD = "PUT";
			URL += "/" + PreviousDischargeID;
		}

		form.submit({
			scope : this,
			clientValidation: true,
			url: URL,
			method : CMD,
			success: function(form, action) {
				Ext.ClearDirtyFlags(form);	/* Undocumented function in app.js */
				this.application.Patient.DischargeInfoID = action.result.dischargeInfoID;
				Ext.MessageBox.alert("Discharge Instructions Saved", "Discharge Instructions Saved..." );
				if (fnc) {
					fnc(fncArgs);
				}
			},
			failure: function(form, action) {
				switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('Failure', 'Ajax communication failed');
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert('Failure', action.result.msg);
				}
			}
		});
	},

	SaveDischargeInstructions : function(theBtn, theEvent, eOpts) {
		var form = theBtn.up('form').getForm();
		var Pat_ID = this.application.Patient.PAT_ID;
		var PreviousDischargeID = this.application.Patient.DischargeInfoID;
		this.doFormSubmit(form, Pat_ID, PreviousDischargeID, null, null);
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
		if (newRecords || newRecords == "") {
			this.SpclInstrGetSelected(newRecords);
		}
		var len = this.spclInstrStore.length;
		if (records2Remove) {
			for (i = 0; i < len; i++) {
				var rec = this.spclInstrStore[i];
				if (rec.ID === records2Remove[0]) {
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
		if (newRecords || newRecords == "") {
			this.sciGetSelected(newRecords);
		}
		var len = this.sciStore.length;
		if (records2Remove) {
			for (i = 0; i < len; i++) {
				var rec = this.sciStore[i];
				if (rec.ID === records2Remove[0]) {
					Ext.Array.remove(this.sciStore, rec);
						var theStore = this.sciStore;
						var thePanel = this.getClinicInfoDetailsDisplay();
						this.commonRenderTable(thePanel, theStore);
					break;
				}
			}
		}
	}
});