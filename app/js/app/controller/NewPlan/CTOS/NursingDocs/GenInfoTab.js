			/*****************************
			 *	Patient Record Structure
			 *		id, 
			 *		name,
			 *		Gender, 
			 *		DOB, 
			 *		Age, 
			 *		Amputee, 
			 *		BSA, 
			 *		BSA_Method, 
			 *		BSA_Weight, 
			 *		WeightFormula, 
			 *		TemplateDescription, 
			 *		TemplateID, 
			 *		TemplateName, 
			 *		TreatmentEnd, 
			 *		TreatmentStart, 
			 *		Disease : [ 
			 *			Stage, 
			 *			Type, 
			 *			coms.model.patientinfo_id 
			 *		], 
			 *		Measurements : [
			 *			BP, 
			 *			BSA, 
			 *			BSA_Method, 
			 *			BSA_Weight, 
			 *			DateTaken, 
			 *			Height, 
			 *			Weight, 
			 *			WeightFormula, 
			 *			coms.model.patientinfo_id
			 *		]
			 ****************************************************/

Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.GenInfoTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
		"Common.VitalSignsHistory"
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},


		{
			ref: "ndct_GenInfoTab",
			selector: "NursingDocs_GenInfo"
		},

		{
			ref: "ndVitalSignsForm",
			// selector: "NursingDocs_VitalSigns"
            selector: "VitalSignsEntryForm"
		},

		{
			ref: "ndVitalsTempF",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsTempF\"]"
		},
		{
			ref: "ndVitalsTempLoc",
			selector: "NursingDocs_VitalSigns [name=\"ndVitalsTempLoc\"]"
		},
		{
			ref: "ndVitalsTempC",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsTempC\"]"
		},
		{
			ref: "ndVitalsPulse",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsPulse\"]"
		},
		{
			ref: "ndVitalsSystolic",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsSystolic\"]"
		},
		{
			ref: "ndVitalsGender",
			selector: "NursingDocs_VitalSigns [name=\"ndVitalsGender\"]"
		},
		{
			ref: "ndVitalsHeightIN",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsHeightIN\"]"
		},
		{
			ref: "ndVitalsHeightCM",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsHeightCM\"]"
		},
		{
			ref: "ndVitalsResp",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsResp\"]"
		},
		{
			ref: "ndVitalsDiastolic",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsDiastolic\"]"
		},
		{
			ref: "ndVitalsAge",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsAge\"]"
		},
		{
			ref: "ndVitalsWeightP",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]"
		},
		{
			ref: "ndVitalsWeightKG",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsWeightKG\"]"
		},
		{
			ref: "ndVitalsPain",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsPain\"]"
		},
		{
			ref: "ndVitalsO2Level",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsO2Level\"]"
		},
		{
			ref: "ndVitalsBSA",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsBSA\"]"
		},
		{
			ref: "VitalSignsHistory",
	        selector: "NursingDocs_GenInfo VitalSignsHistory"
		},
		{
			ref : "ND_PT_TabLabInfo",
			selector : "NursingDocs_GenInfo [name=\"ND_PT_LabInfo\"]"
		},

		
		{
			"ref" : "ndctWarning",
			"selector" : "NursingDocs_Chemotherapy [name=\"ndctWarning\"]"
		},
		{
			"ref" : "CycleInfo",
			"selector" : "NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]"
		},
		{
			"ref" : "ndctRegimen",
			"selector" : "NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]"
		},
		{
			"ref" : "ndctCycle",
			"selector" : "NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]"
		},
		{
			"ref" : "ndctDay",
			"selector" : "NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]"
		},
		{
			"ref" : "ndctDate",
			"selector" : "NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]"
		},
		{
			"ref" : "FNLPanel",
			"selector" : "NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]"
		},
		{
			"ref" : "EmoPanel",
			"selector" : "NursingDocs_Chemotherapy [name=\"EmesisInfo\"]"
		}
	],


	init: function () {
		wccConsoleLog("Initialized Nursing Docs General Info Tab Controller!");

		this.application.on( 
			{ 
				PopulateNDTabs : this.GenInfoRendered,	// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				scope : this 
			} 
		);
	

		this.control({
			"NursingDocs_GenInfo" : {
				afterrender : this.GenInfoRendered
			},

			"VitalSignsEntryForm textfield[name=\"ndVitalsTempF\"]" : {
				blur : this.ConvertTemp
			},

			"VitalSignsEntryForm textfield[name=\"ndVitalsHeightIN\"]" : {
				blur : this.ConvertHeight
			},

			// "NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]" : {
            "VitalSignsEntryForm textfield[name=\"ndVitalsWeightP\"]" : {
				blur : this.ConvertWeight
			},

			"PatientHistory NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]" : {
				blur : this.ConvertWeight
			},
			"NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]" : {
				blur : this.ConvertWeight
			},
			"NursingDocs_GenInfo NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]" : {
				blur : this.ConvertWeight
			},

            "VitalSignsEntryForm button[name=\"ShowBSA\]" : {
                click: this.NDGIVS_BSA_Calculations
            },

            "NursingDocs_GenInfo button[action=\"save\"]": {
                click: this.btnSaveGenInfo
            },
			"NursingDocs_DualDosingVerification button[name=\"DDV_FirstSig\"]" : {
                click: this.btnFirstSignature
			},
			"NursingDocs_DualDosingVerification button[name=\"DDV_SecSig\"]" : {
                click: this.btnSecondSignature
			},
            "Authenticate[title=\"Signature of first verifier\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            },
            "Authenticate[title=\"Signature of second verifier\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            },
			"NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]" : {
					afterrender : Ext.togglePanelOnTitleBarClick
			},
			"NursingDocs_Chemotherapy [name=\"EmesisInfo\"]" : {
					afterrender : Ext.togglePanelOnTitleBarClick
			}
		});

	},

	ndctRender : function( panel ) {
		Ext.togglePanelOnTitleBarClick(panel);
	},

	AuthenticateUser : function (button) {
		var win = button.up('window');
		var SigNameField = win.SigName;
		var SigField = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigNameField + "\"]")[0];

		var SigName1Field = win.SigName1;
		var Sig1Field = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigName1Field + "\"]")[0];
		var Sig1 = Sig1Field.getValue();

		var SigName2Field = win.SigName2;
		var Sig2Field = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigName2Field + "\"]")[0];
		var Sig2 = Sig1Field.getValue();

        var values = win.down('form').getValues();
		if ("" !== values.AccessCode && "" !== values.VerifyCode) {
			if (values.AccessCode === Sig1 || values.AccessCode === Sig2) {
				Ext.MessageBox.alert("Authentication Error", "You can't sign this record twice. Please have another sign to verify");
			}
			else {
				Ext.Ajax.request({
					scope : this,
					url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
					success: function( response, opts ){
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						if (resp.success) {
							win.close();
							SigField.setValue(values.AccessCode);
						}
						else {
							Ext.MessageBox.alert("Authentication Error", "Authentication failed! Please click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
						}
					},
					failure : function( response, opts ) {
						Ext.MessageBox.alert("Authentication Error", "Authentication failed! \n\nPlease click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
					}
				});
			}
		}
	},




	btnFirstSignature : function( button ) {
		var SigNameFld1 = "DDV_FirstSig1";
		var SigNameFld2 = "DDV_FirstSig4";
		var EditRecordWin = Ext.widget("Authenticate", { title : "Signature of first verifier", SigName : SigNameFld1, SigName1 : SigNameFld1, SigName2 : SigNameFld2 });
		Ext.ComponentQuery.query("Authenticate form")[0].getForm().getFields().getAt(0).focus("", true);



	},

	btnSecondSignature : function( button ) {
		var SigNameFld1 = "DDV_FirstSig1";
		var SigNameFld2 = "DDV_FirstSig4";
		var EditRecordWin = Ext.widget("Authenticate", { title : "Signature of second verifier", SigName : SigNameFld2, SigName1 : SigNameFld1, SigName2 : SigNameFld2 });
		Ext.ComponentQuery.query("Authenticate form")[0].getForm().getFields().getAt(0).focus("", true);
	},

	ConvertWeight : function( fld, eOpts ) {
        var inValue = fld.getValue();
        var NDVitalsWeightKG = fld.ownerCt.query("displayfield[name=\"ndVitalsWeightKG\"]")[0];
        var kg = "";
        if ("" !== inValue) {
            kg = Ext.lbs2kg(inValue);
        }
        NDVitalsWeightKG.setValue("(" + kg + " kg)");
        this.ndgiUpdateBSA(fld);
	},
	ConvertHeight : function( fld, eOpts ) {
        var inValue = fld.getValue();
        var NDVitalsHeightCM = fld.ownerCt.query("displayfield[name=\"ndVitalsHeightCM\"]")[0];
        var cm = "";
        if ("" !== inValue) {
            cm = Ext.in2cm(inValue);
        }
        NDVitalsHeightCM.setValue("(" + cm + " cm)");
        this.ndgiUpdateBSA(fld);
	},
	ConvertTemp : function( fld, eOpts ) {
        var inValue = fld.getValue();
        var NDVitalsTempC = fld.ownerCt.query("displayfield[name=\"ndVitalsTempC\"]")[0];
        var c = "";
        if ("" !== inValue) {
            c = Ext.f2C(fld.getValue());
        }
        NDVitalsTempC.setValue("(" + c + " &deg;C)");
	},





	ClearTabData : function() {
        var thisCtl;
		try {
			thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
			if (!thisCtl.getNdct_GenInfoTab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Loading Error", "ND - ClearTabData() - Error - " + e.message );
		}
		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
		thisCtl.getNdVitalsTempF().setValue("");
		thisCtl.getNdVitalsTempC().setValue("");
		thisCtl.getNdVitalsTempLoc().setValue("");
		thisCtl.getNdVitalsPulse().setValue("");
		thisCtl.getNdVitalsSystolic().setValue("");
		thisCtl.getNdVitalsGender().setValue("");
		thisCtl.getNdVitalsHeightIN().setValue("");
		thisCtl.getNdVitalsHeightCM().setValue("");
		thisCtl.getNdVitalsResp().setValue("");
		thisCtl.getNdVitalsDiastolic().setValue("");
		thisCtl.getNdVitalsAge().setValue("");
		thisCtl.getNdVitalsWeightP().setValue("");
		thisCtl.getNdVitalsWeightKG().setValue("");
		thisCtl.getNdVitalsPain().setValue("");
		thisCtl.getNdVitalsO2Level().setValue("");
		thisCtl.getNdVitalsBSA().setValue("");

		this.ChemoBioSectionHandler(true);
	},


    getNextAdminDate : function() {
        var ListOfAdminDays = this.application.Patient.OEMRecords.OEMRecords,
            today = new Date(), 
            AdminDate, 
            AdminDate1 = null, 
            LastAdminDate = null,
            msg = "";
        for (i = 0; i < ListOfAdminDays.length; i++ ) {
            LastAdminDate = AdminDate;
            AdminDate = ListOfAdminDays[i].AdminDate;
            AdminDate1 = new Date(AdminDate);
            if (AdminDate1.getTime() > today.getTime()) {
                if (LastAdminDate !== null) {
                    msg = "<br />Last Administration Date: <b>" + LastAdminDate + "</b>";
                }
                msg += "<br />Next Administration Date: <b>" + AdminDate + "</b>";
                return msg;
            }
        }
        if (LastAdminDate !== null) {
            msg = "<br />Last Administration Date: <b>" + LastAdminDate + "</b><br />There are no additional Administration Dates";
        }

        return msg;
    },

	setNDCTWarning : function(msg, show, ThisAdminDay) {
		var ndctWarning = this.getNdctWarning(), 
			CycleInfo = this.getCycleInfo(),
			ndctCycle = this.getNdctCycle(),
			ndctDay = this.getNdctDay(),
			ndctDate = this.getNdctDate();

		el = ndctWarning.getEl();
		if (el) {
			if (show) {
				el.setHTML(msg);
				ndctWarning.show();
			}
			else {
				el.setHTML("");
				ndctWarning.hide();
			}
		}
		if (ThisAdminDay) {
			CycleInfo.show();
			ndctCycle = ThisAdminDay.Cycle;
			ndctDay = ThisAdminDay.Day;
			ndctDate = ThisAdminDay.Date;
		}
		else {
			CycleInfo.hide();
			ndctCycle = "";
			ndctDay = "";
			ndctDate = "";
		}
	},

	getFNRiskInfo : function(FNRisk) {
		var FNLPanel = this.getFNLPanel();
		if (FNRisk) {
			var FNLevelInfo = FNRisk < 10 ? "Low Risk" : FNRisk <= 20 ? "Intermediate Risk" : "High Risk";
			FNLPanel.setTitle("Febrile Neutropenia Level = " + FNRisk + "% (" + FNLevelInfo + ")");
			var PanelID = FNLPanel.getId();
			var URL = Ext.URLs.MedRisks + "/Type/" + (FNRisk < 10 ? "Neutropenia-1" : FNRisk <= 20 ? "Neutropenia-2" : "Neutropenia-3");
			Ext.Ajax.request({
				scope : this,
				url: URL,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );

					for (i = 0; i < resp.length; i++) {
						var raw = resp[i].Details;
						var dec = Ext.util.Format.htmlDecode(raw);
						resp[i].Details = dec;
					}


					this.application.unMask();
					this.getFNLPanel().update(resp, false);
					this.getFNLPanel().doLayout();
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					this.application.unMask();
					Ext.MessageBox.alert("Retrieve Error", "Error attempting to retrieve information on Neutropenia Level - " + e.message + "<br />" + resp );
				}
			});
		}
		else {
			FNLPanel.setTitle("Febrile Neutropenia Level = Not Specified");
		}
	},


	getEmoLevelInfo : function(ELevel) {
		var EmoPanel = this.getEmoPanel();
		if (!ELevel) {
			EmoPanel.setTitle("Emetogenic Level = Not Specified");
			return;
		}
		EmoPanel.setTitle("Emetogenic Level = " + ELevel);
		var eLevel1 = ELevel.split(" ")[0];
		var x = "";
		switch (eLevel1) {
			case "Low":
				x = "Emesis-1";
				break;
			case "Medium":
				x = "Emesis-2";
				break;

			case "Moderate":
				x = "Emesis-3";
				break;
			case "High":
				x = "Emesis-4";
				break;
			case "Very":
				x = "Emesis-5";
				break;
		}

		var URL = Ext.URLs.MedRisks + "/Type/" + x;
		Ext.Ajax.request({
			scope : this,
			url: URL,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.application.unMask();
				for (i = 0; i < resp.length; i++) {
					var raw = resp[i].Details;
					var dec = Ext.util.Format.htmlDecode(raw);
					resp[i].Details = dec;
				}
				this.getEmoPanel().update(resp, false);
				this.getEmoPanel().doLayout();
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.application.unMask();
				Ext.MessageBox.alert("Retrieve Error", "Error attempting to retrieve information on Emetogenic Level - " + e.message + "<br />" + resp );
			}
		});
	},

	ChemoBioSectionHandler : function ( Clear, ThisAdminDay ) {		// Handles parsing and posting of data in the Chemotherapy/Biotherapy sections in ND and Flowsheet
		// if Clear is true then clear out the fields
		
		var ndctRegimen = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]");
		var ndctCycle = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]");
		var ndctDay = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]");
		var ndctDate = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]");

		var Patient = this.application.Patient;
		var TempDesc = Patient.TemplateDescription;
		if ("" === TempDesc) {
			TempDesc = Patient.TemplateName;
		}


		// this.getEmoLevelInfo(Patient.AppliedTemplate.ELevel[0].name);


		var EmoLevel = "";
		try {
			EmoLevel = Patient.AppliedTemplate.ELevel[0].name;
			this.getEmoLevelInfo(EmoLevel);
		}
		catch (e) {
			this.getEmoLevelInfo(null);
		}

		this.getFNRiskInfo(Patient.AppliedTemplate.FNRisk);

		this.getNdctRegimen().setValue(TempDesc);

		if (Clear) {
			this.getNdctWarning().setValue("");
			this.getNdctWarning().hide();

			this.getCycleInfo().setValue("");
			this.getCycleInfo().hide();

			this.getNdctRegimen().setValue("");

			this.getNdctCycle().setValue("");
			this.getNdctDay().setValue("");
			this.getNdctDate().setValue("");
		}
		else {
			if (ThisAdminDay) {
				this.setNDCTWarning("", false, ThisAdminDay);
			}
			else {
				var msg = this.getNextAdminDate();
				this.setNDCTWarning("<div class=\"ndctWarning\"><span>Note:</span> - This is not a scheduled Administration Day for this Regimen</div>" + msg, true, ThisAdminDay);
			}
		}
	},





	SaveVitals : function(parent) {
		var Patient = this.application.Patient;
		var ThisAdminDay = this.application.Patient.ThisAdminDay;		// This is the OEM Record for a specific Admin Day - 
		// { id, AdminDate, Cycle, Day, PostTherapy, PostTherapyInstr, PreTherapy, PreTherapyInstr, Therapy, TherapyInstr }

		var Temperature = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsTempF\"]")[0];
        var TemperatureLocation = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsTempLoc\"]")[0];
		var Pulse = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsPulse\"]")[0];
		var Systolic = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsSystolic\"]")[0];
		var Height = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsHeightIN\"]")[0];
		var Respiration = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsResp\"]")[0];
		var Diastolic = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsDiastolic\"]")[0];
		var Weight = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsWeightP\"]")[0];
		var Pain = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsPain\"]")[0];
		var SPO2 = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsO2Level\"]")[0];
		var BSA = Ext.ComponentQuery.query(parent + " [name=\"ndVitalsBSA\"]")[0];
        var NDVitalsWeightKG = Ext.ComponentQuery.query("displayfield[name=\"ndVitalsWeightKG\"]")[0];
        var NDVitalsHeightCM = Ext.ComponentQuery.query("displayfield[name=\"ndVitalsHeightCM\"]")[0];
        var NDVitalsTempC = Ext.ComponentQuery.query("displayfield[name=\"ndVitalsTempC\"]")[0];

		var dt = new Date();
		var record = {};
		record.patientId = Patient.id;
		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");
		record.Temperature = Temperature.getValue();
        record.TemperatureLocation = TemperatureLocation.getValue();
		record.Pulse = Pulse.getValue();
		record.Systolic = Systolic.getValue();
		record.Diastolic = Diastolic.getValue();
		record.Height = Height.getValue();
		record.Respiration = Respiration.getValue();
		record.Weight = Weight.getValue();
		record.Pain = Pain.getValue();
		record.SPO2 = SPO2.getValue();
		record.BSA = BSA.getValue();
		record.BP = Systolic.getValue() + " / " + Diastolic.getValue();

		var flg1 = "" === record.Temperature;
        var flg1a = "" === record.TemperatureLocation;
		var flg2 = "" === record.Pulse;
		var flg3 = "" === record.Systolic;
		var flg4 = "" === record.Height;
		var flg5 = "" === record.Respiration;
		var flg6 = "" === record.Diastolic;
		var flg7 = "" === record.Weight;
		var flg8 = null === record.Pain;
		var flg9 = "" === record.SPO2;
		var flg10 = "" === record.BSA;

		if (flg1 && flg1a && flg2 && flg3 && flg4 && flg5 && flg6 && flg7 && flg8 && flg9 && flg10) {
			return false;
		}
        if (record.SPO2 && (record.SPO2 <= 0 || record.SPO2 > 100)) {
            Ext.MessageBox.alert("Vital Signs", "Vital Signs cannot be saved. <abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub>%</abbr> cannot be &gt; 100%" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
			return true;
		}

		Temperature.setValue("");
        TemperatureLocation.setValue("");
		Pulse.setValue("");
		Systolic.setValue("");
		Height.setValue("");
		Respiration.setValue("");
		Diastolic.setValue("");
		Weight.setValue("");
		Pain.setValue("");
		SPO2.setValue("");
		BSA.setValue("");
        NDVitalsWeightKG.setValue("");
        NDVitalsHeightCM.setValue("");
        NDVitalsTempC.setValue("");

		if (ThisAdminDay) {
			record.Cycle = ThisAdminDay.Cycle;
			record.Day = ThisAdminDay.Day;
		}
		else {	// This is NOT an AdminDay for this Regimen
			record.Cycle = "";
			record.Day = "";
		}

		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;

		var params = Ext.encode(record);
		this.SavingVitals = true;
		this.application.loadMask("One moment please, saving Patient Vitals...");

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.AddVitals,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.SavingVitals = false;
				// if (!this.SavingVitals && !this.SavingGenInfo) {
					this.application.unMask();
				// }


				if (resp.success) {
			        var newPlanTabCtl = this.getController("NewPlan.NewPlanTab");
					newPlanTabCtl.loadVitals("Update Vitals");
					Ext.MessageBox.alert("Vital Signs", "Vitals Information Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
				}
				else {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + resp.msg );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.application.unMask();
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + e.message + "<br />" + resp.msg );
			}
		});
		return (true);
	},
	
	SaveGenInfo : function() {
		var Patient = this.application.Patient;

		var rgPatientID = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"rgPatientID\"]")[0].getValue();
		var rgConsent = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"rgConsent\"]")[0].getValue();
		var PatientIDComment = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"PatientIDComment\"]")[0].getValue();

		var rgEduAssess = Ext.ComponentQuery.query("NursingDocs_PatientTeaching [name=\"rgEduAssess\"]")[0].getValue();
		var rgPlanReviewed = Ext.ComponentQuery.query("NursingDocs_PatientTeaching [name=\"rgPlanReviewed\"]")[0].getValue();

		var flg1 = null === rgPatientID.patientIDGood || undefined === rgPatientID.patientIDGood;
		var flg2 = null === rgConsent.consentGood || undefined === rgConsent.consentGood;
		var flg3 = null === rgEduAssess.educationGood || undefined === rgEduAssess.educationGood;
		var flg4 = null === rgPlanReviewed.planReviewed || undefined === rgPlanReviewed.planReviewed;
		var flg5 = "" === PatientIDComment;

		if (flg1 && flg2 && flg3 && flg4 && flg5) {
			return (false);
		}

		var record = {};
		record.patientId = Patient.id;

		record.patientIDGood = rgPatientID.patientIDGood || false;
		record.consentGood = rgConsent.consentGood || false;
		record.comment = PatientIDComment;

		record.educationGood = rgEduAssess.educationGood || false;
		record.planReviewed = rgPlanReviewed.planReviewed || false;
		var params = Ext.encode(record);
		this.SavingGenInfo = true;

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.AddND_GenInfo,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.SavingGenInfo = false;
				if (!this.SavingVitals && !this.SavingGenInfo) {
					this.application.unMask();
				}

				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - General Information Section, Save Error - " + resp.msg );
				}
				else {
					Ext.MessageBox.alert("Saving Patient Identification/Teaching", "Saving Patient Identification/Teaching Complete" );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - General Information Section, Save Error - " + e.message + "<br />" + resp.msg );
			}
		});
		return (true);
	},


	btnSaveGenInfo : function (button) {
		this.SavingVitals = false;
		this.SavingGenInfo = false;
		this.application.loadMask("One moment please, saving General Information...");
		var SaveGood1 = this.SaveGenInfo();
		var SaveGood2 = this.SaveVitals("NursingDocs_VitalSigns");
		this.application.unMask();
		if (!SaveGood1 && !SaveGood2) {
			Ext.MessageBox.alert("No Data Saved", "There was no data specified to be saved" );
		}
	},














	GenInfoRendered : function ( component, eOpts ) {
        var tempScratch, tempScratch1, Patient, thisCtl;
		// try {
			Patient = this.application.Patient;
			thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
			if (!thisCtl.getNdct_GenInfoTab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		//}
		//catch (e) {
		//	Ext.MessageBox.alert("Loading Error", "ND - GenInfoRendered() - Error - " + e.message );
		//}

		
		
		wccConsoleLog("GenInfoTab Rendered ---- ");
		wccConsoleLog("... GenInfoRendered() Called ... ");

		this.application.Patient.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );

//		try {
			var NDVitalsTempF = thisCtl.getNdVitalsTempF();
			var NDVitalsTempC = thisCtl.getNdVitalsTempC();
			var NDVitalsTempLoc = thisCtl.getNdVitalsTempLoc();
			var NDVitalsPulse = thisCtl.getNdVitalsPulse();
			var NDVitalsSystolic = thisCtl.getNdVitalsSystolic();
			var NDVitalsGender = thisCtl.getNdVitalsGender();
			var NDVitalsHeightIN = thisCtl.getNdVitalsHeightIN();
			var NDVitalsHeightCM = thisCtl.getNdVitalsHeightCM();
			var NDVitalsResp = thisCtl.getNdVitalsResp();
			var NDVitalsDiastolic = thisCtl.getNdVitalsDiastolic();
			var NDVitalsAge = thisCtl.getNdVitalsAge();
			var NDVitalsWeightP = thisCtl.getNdVitalsWeightP();
			var NDVitalsWeightKG = thisCtl.getNdVitalsWeightKG();
			var NDVitalsPain = thisCtl.getNdVitalsPain();
			var NDVitalsO2Level = thisCtl.getNdVitalsO2Level();
			var NDVitalsBSA = thisCtl.getNdVitalsBSA();

			var LaboratoryInfo = thisCtl.getND_PT_TabLabInfo();
			LaboratoryInfo.update( Patient.History );

			var VitalSigns = thisCtl.getVitalSignsHistory();
			VitalSigns.update( Patient );

			var ThisAdminDay = this.application.Patient.ThisAdminDay;
			this.ChemoBioSectionHandler(false, ThisAdminDay);

			NDVitalsGender.setValue((("M" === Patient.Gender) ? "Male" : "Female"));
			NDVitalsAge.setValue(Patient.Age);
			NDVitalsPain.setValue("");
			NDVitalsO2Level.setValue("");
			NDVitalsBSA.setValue("");		// Patient.BSA);

			NDVitalsTempF.setValue("");
			NDVitalsTempC.setValue("");
            NDVitalsTempLoc.setValue("");
			NDVitalsPulse.setValue("");

			NDVitalsSystolic.setValue("");
			NDVitalsDiastolic.setValue("");
			NDVitalsResp.setValue("");
			NDVitalsHeightIN.setValue("");
			NDVitalsHeightCM.setValue("( cm)");
			NDVitalsWeightP.setValue("");
			NDVitalsWeightKG.setValue("( kg)");






			var VSHTemplateDataBtns;
			if (VitalSigns && VitalSigns.rendered) {		// Make sure the Vital Signs in the ND/GenInfo tab are rendered before trying to attach.
		        var newCtl = this.getController("NewPlan.NewPlanTab");
				VSHTemplateDataBtns = VitalSigns.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", newCtl.HandleVSHCalcDoseButtons, this);
			}

//		}
//		catch (e1) {
//			debugger;
//			//Ext.MessageBox.alert("Rendering Error", "ND - GenInfoRendered() - Error - " + e1.message );
//		}

	},

	HandleVSFormShowCalcButtons : function (evt, btn) {
		var Patient = this.application.Patient;
		PatientData = Ext.ShowBSACalcs(Patient, false, null, null);

		Ext.MessageBox.show({
			title : "Body Surface Area Calculations",
			msg : PatientData,
			buttons : Ext.MessageBox.OK
		});
	},

	ndgiUpdateBSA : function(fld) {
        var Parent = fld.up(".VitalSignsEntryForm");
        var HeightEditFieldValue = Parent.query("container [name=\"ndVitalsHeightIN\"]")[0].getValue();
        var WeightEditFieldValue = Parent.query("container [name=\"ndVitalsWeightP\"]")[0].getValue();

        var Patient = this.application.Patient;
		var params = {};
		params = Ext.apply(params, Patient);

		params.Weight = WeightEditFieldValue;
		params.Height = HeightEditFieldValue;
        
        if ("" !== params.Weight && "" !== params.Height) {
			Patient.Height = params.Height;
			Patient.Weight = params.Weight;
			params.BSA = Ext.BSA_Calc(params);
			this.getNdVitalsBSA().setValue(params.BSA);
		}
        else {
            this.getNdVitalsBSA().setValue("");
        }
	}

});
