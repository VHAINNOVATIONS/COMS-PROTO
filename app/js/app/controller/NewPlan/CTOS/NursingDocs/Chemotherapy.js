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

/*********************
	init: function () {
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
			}
		});
	},
***/
	GenInfoRendered : function ( component, eOpts ) {
		console.log("Chemotherapy - GenInfoRendered");
        var tempScratch, tempScratch1, Patient, thisCtl;
		Patient = this.application.Patient;
//		thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
//		if (!thisCtl.getNdct_GenInfoTab().rendered) {
//			return;		// Traps possible call from the PopulateNDTabs event
//		}
		this.application.Patient.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		var ThisAdminDay = this.application.Patient.ThisAdminDay;
		this.ChemoBioSectionHandler(false, ThisAdminDay);
	},

	ClearTabData : function() {
		console.log("Chemotherapy - ClearTabData");
		this.ChemoBioSectionHandler(true);
	},


	getFNRiskInfo : function(FNRisk) {
		var i, len, FNLPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"NeutropeniaInfo\"]");
		var FNLevelInfo = FNRisk < 10 ? "Low Risk" : FNRisk <= 20 ? "Intermediate Risk" : "High Risk";
		var theFNLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.NeutropeniaRecommendation);

		len = FNLPanel.length;

		for (i = 0; i < len; i++) {
			FNLPanel[i].setTitle("Febrile Neutropenia Level = " + FNRisk + "% (" + FNLevelInfo + ")");
			FNLPanel[i].update(theFNLevelData, false);
			FNLPanel[i].doLayout();
		}
	},


	getEmoLevelInfo : function(ELevel) {
		var i, len, EmoPanel = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"EmesisInfo\"]");
		len = EmoPanel.length;
		var emoTitle = "Emetogenic Level = Not Specified",
			theEmoLevelData = "";

		if (ELevel) {
			emoTitle = "Emetogenic Level = " + ELevel;
			theEmoLevelData = Ext.util.Format.htmlDecode(this.application.Patient.OEMRecords.ELevelRecommendation);
		}
		for (i = 0; i < len; i++) {
			EmoPanel[i].setTitle(emoTitle);
			if (ELevel) {
				EmoPanel[i].update(theEmoLevelData, false);
				EmoPanel[i].doLayout();
			}
		}
	},

	setChemoBioField : function(fieldQuery, value, showField) {
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

	showHideMultiContainer : function(fieldQuery, showField) {
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

	ChemoBioSectionHandler : function ( Clear, ThisAdminDay ) {		// Handles parsing and posting of data in the Chemotherapy/Biotherapy sections in ND and Flowsheet
		console.log("Chemotherapy - ChemoBioSectionHandler");

		var ndctRegimenAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]");
		var ndctCycleAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]");
		var ndctDayAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]");
		var ndctDateAr = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]");

		var Patient = this.application.Patient;
		var TempDesc = Patient.TemplateDescription;
		if ("" === TempDesc) {
			TempDesc = Patient.TemplateName;
		}

		var EmoLevel = "", FNRisk = "";
		var Data = Patient.OEMRecords;
		this.getEmoLevelInfo(Data.ELevelName);
		this.getFNRiskInfo(Data.FNRisk);

		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]", TempDesc, false);

		/*************************** NEW EXAMPLE USAGE MWB 6/27/2014 ****************************/

		if (Clear) {
			this.setChemoBioField("NursingDocs_Chemotherapy [name=\"ndctWarning\"]", "", false);

			this.setChemoBioField("NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]", "", false);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]", "", false);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]", "", false);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]", "", false);
			this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]", "", false);
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



	setNDCTWarning : function(msg, show, ThisAdminDay) {
		console.log("Chemotherapy - setNDCTWarning");
		this.setChemoBioField("NursingDocs_Chemotherapy [name=\"ndctWarning\"]", msg, show);

		this.showHideMultiContainer("NursingDocs_Chemotherapy [name=\"ndctCycleInfo\"]", !ThisAdminDay);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]", ThisAdminDay.Cycle, ThisAdminDay);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]", ThisAdminDay.Day, ThisAdminDay);
		this.setChemoBioField("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]", ThisAdminDay.AdminDate, ThisAdminDay);
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
    }


});