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
			ref : "DischargeInstrDetailsDisplay",
			selector : "SpclInstrDisplay"
		},

		{
			ref : "SpclInstrDetailsDisplay",
			selector : "PatientEducationDetails [name=\"ND_E_SpclInstrDisplay\"]"
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
			}
		});
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