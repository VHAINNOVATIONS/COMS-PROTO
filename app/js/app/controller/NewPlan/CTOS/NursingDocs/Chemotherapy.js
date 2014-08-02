Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.Chemotherapy", {
	extend: "Ext.app.Controller",

	refs: [
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
		this.application.on( 
			{ 
				PatientSelected : this.ChemoBioSectionHandler,
				scope : this 
			} 
		);
		this.control({
			"NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]" : {
				afterrender : function() {
					var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.Chemotherapy");
					thisCtl.getFNRiskInfoAfterRender();
				},
				scope : this 
			},
			"NursingDocs_Chemotherapy [name=\"EmesisInfo\"]" : {
				afterrender : function() {
					var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.Chemotherapy");
					thisCtl.getEmoLevelInfoAfterRender();
				},
				scope : this 
			}

		});
	},

	ClearTabData : function() {
		console.log("Chemotherapy - ClearTabData");
		this.ChemoBioSectionHandler(true);
	},



	getFNRiskInfoAfterRender : function() {
		var Data = this.application.Patient.OEMRecords;
		if (Data) {
			this.getFNRiskInfo(Data.FNRisk);
		}
	},

	getEmoLevelInfoAfterRender : function() {
		var Data = this.application.Patient.OEMRecords;
		if (Data) {
			this.getEmoLevelInfo(Data.ELevelName);
		}
	},

	/* Calling getFNRiskInfo() or  getEmoLevelInfo() before the panels are rendered causes a the "Expand/Collapse Icon to not be displayed */
	getFNRiskInfo : function(FNRisk) {
		var i, len, FNLPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]");
		var FNLevelInfo = FNRisk < 10 ? "Low Risk" : FNRisk <= 20 ? "Intermediate Risk" : "High Risk";
		var theFNLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.NeutropeniaRecommendation);

		len = FNLPanel.length;
		var theTitle = "Febrile Neutropenia Level = " + FNRisk + "% (" + FNLevelInfo + ")";

		for (i = 0; i < len; i++) {
			if (FNLPanel[i].rendered) {
				FNLPanel[i].setTitle(theTitle);
				FNLPanel[i].update(theFNLevelData);
				FNLPanel[i].doLayout();
			}
		}
	},

	getEmoLevelInfo : function(ELevel) {
		var i, len, EmoPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"EmesisInfo\"]");
		len = EmoPanel.length;
		var emoTitle = "Emetogenic Level = Not Specified",
			theEmoLevelData = "Not Yet Available";

		if (ELevel && Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendation)) {
			emoTitle = "Emetogenic Level = " + ELevel;
			theEmoLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendation);
			/*
				"<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>" + Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendationASCO) + "</p>" +
				"<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>" + Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendationNCCN) + "</p>";
			*/
		}
		for (i = 0; i < len; i++) {
			if (EmoPanel[i].rendered) {
				EmoPanel[i].setTitle(emoTitle);
				if (ELevel) {
					EmoPanel[i].update(theEmoLevelData);
					EmoPanel[i].doLayout();
				}
			}
		}
	},

	setChemoBioField : function(fieldQuery, value, showField) {
		console.log("setChemoBioField - " + fieldQuery);
		var theField = Ext.ComponentQuery.query(fieldQuery);
		var i, len = theField.length;
		for (i = 0; i < len; i++) {
			theField[i].setValue(value);
			if (showField) {
				theField[i].show();
			}
			else {
				theField[i].hide();
			}
		}
	},

	showMultiContainer : function(fieldQuery, showField) {
		var theField = Ext.ComponentQuery.query(fieldQuery);
		var i, len = theField.length;
		for (i = 0; i < len; i++) {
			if (showField) {
				theField[i].show();
			}
			else {
				theField[i].hide();
			}
		}
	},

	ChemoBioSectionHandler : function ( Clear ) {		// Handles parsing and posting of data in the Chemotherapy/Biotherapy sections in ND and Flowsheet
		if (!this.application.Patient.ThisAdminDay) {
			this.application.Patient.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		}
		var ThisAdminDay = this.application.Patient.ThisAdminDay;
/*
		var ndctRegimenAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]");
		var ndctCycleAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]");
		var ndctDayAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]");
		var ndctDateAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]");
*/
		var Patient = this.application.Patient;
		var TempDesc = Patient.TemplateDescription;
		if ("" === TempDesc) {
			TempDesc = Patient.TemplateName;
		}

		// var EmoLevel = "", FNRisk = "";
		// var Data = Patient.OEMRecords;
		// this.getFNRiskInfo(Data.FNRisk);
		// this.getEmoLevelInfo(Data.ELevelName);


		this.getFNRiskInfoAfterRender();
		this.getEmoLevelInfoAfterRender();

		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]", TempDesc, ("" !== TempDesc));

/*
		this.showMultiContainer("NursingDocs_Chemotherapy [name=\"ndctWarning\"]", false);
		this.showMultiContainer("NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]", false);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]", "", false);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]", "", false);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]", "", false);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]", "", false);
*/
		if (ThisAdminDay) {
			this.setNDCTWarning("", false, ThisAdminDay);
		}
		else {
			var msg = this.getNextAdminDate();
			this.setNDCTWarning("<div class=\"ndctWarning\"><span>Note:</span> - This is not a scheduled Administration Day for this Regimen</div>" + msg, true, ThisAdminDay);
		}

		this.showMultiContainer("NursingDocs_Chemotherapy [name=\"ndctWarning\"]", true);
		this.showMultiContainer("NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]", true);
	
	
	},



	setNDCTWarning : function(msg, show, ThisAdminDay) {
		var theField = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"ndctWarning\"]");
		var i, len = theField.length;
		for (i = 0; i < len; i++) {
			el = theField[i].getEl();
			if (el) {
				el.setHTML(msg);
			}
			if (show) {
				theField[i].show();
			}
			else {
				theField[i].hide();
			}
		}

		this.showMultiContainer("NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]", !ThisAdminDay);
		if (ThisAdminDay) {
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]", ThisAdminDay.Cycle, ThisAdminDay);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]", ThisAdminDay.Day, ThisAdminDay);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]", ThisAdminDay.AdminDate, ThisAdminDay);
		}
	},

	getNextAdminDate : function() {
		var ListOfAdminDays,
			today = new Date(), 
			AdminDate, 
			AdminDate1 = null, 
			LastAdminDate = null,
			msg = "";
		if (this.application.Patient && this.application.Patient.OEMRecords) {
			ListOfAdminDays = this.application.Patient.OEMRecords.OEMRecords;
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
		}
		return msg;
	}


});