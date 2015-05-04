Ext.define("COMS.controller.NewPlan.NewPlanTab", {
	/********************************
	 *
	 *	PatientSelected function is what loads all the data
	 *
	 * Function List:
	 *
	 *		MaskPITPanelOnExpand : function (p, ani, opts) {
	 *		MaskPITable : function (msg) {
	 *		clickPatientListCount : function( evt, itemClicked ) {
	 *		tabRendered : function( theTab ) {
	 *		InitIntelligentDataElementStore : function() {
	 *		cancelApply : function(button){
	 *		CancelVitals : function(btn) {
	 *		SaveVitals : function() {
	 *		handlePatientSelectionRender : function( panel ) {
	 *		resetPatientInfoPanel: function(thisCtl) {
	 *		resetTRSPanel: function(thisCtl, numTemplates) {
	 *		resetVitalsPanel: function(thisCtl, numVitals) {
	 *		resetLabInfoPanelPanelTitleBar: function(thisCtl, numLabResults) {
	 *		resetCTOSPanel: function(thisCtl) {
	 *		resetPanels: function(thisCtl, numTemplates, numVitals, numLabResults) {
	 *
	 *		HandleTemplateBtnClicks : function (event, element) {
	 *		ShowBSACalcsPUWin : function(opts, tab2switch2) {
	 *		afterrender : function(theWin, eOpts) {
	 *		HandleAnchorClicks : function (event, element) {
	 *		loadCombo : function(picker, eOpts){
	 *		callback: function(records,operation,success){
	 *		collapseCombo : function(picker,eOpts){
	 *		resetTemplateFilter : function(button){
	 *		editTemplate : function(button){
	 *		callback: function (records, operation, success) {
	 *		afterFindDisease : function(diseaseRecord){
	 *		callback: function(records,operation,success){
	 *		afterFindTemplate : function(templateRecord,controller,template){
	 *		ShowAskQues2ApplyTemplate : function(records, operation, success) {
	 *		applyTemplateToPatient : function(button){
	 *		clearCTOS : function(button){
	 *		TemplateTypeSelected : function(rbtn, newValue, oldValue, eOpts ) {
	 *		PatientModelLoadSQLPostTemplateApplied : function( PatientGUID, TreatmentID ) {
	 *		PatientModelLoadSQL : function( query ) {
	 *		PatientModelLoadMDWS : function(query) {
	 *		PatientStoreQuery : function( ) {
	 *		QSEnter : function( fld, e, eOpts ) {
	 *		LoadAllData4PatientByMDWSGUID : function(patientMDWSGUID) {
	 *		ConfirmPatientClick : function(evt, btn) {
	 *		handleShowUpdateMDWSClickEvent : function( evt, btn ) {
	 *		handlePatientSelectionClickEvent : function( evt, theBtn ) {
	 *		loadMDWSData : function() {
	 *		loadAllergyInfo : function() {
	 *		loadCumulativeMedDosing : function() {
	 *		loadLabInfo : function() {
	 *		extractDate : function(aDate) {
	 *		ConvertAssocArray : function(theData) {
	 *		extractAllergies : function(vDataRec) {
	 *		extractLabs : function(rec) {
	 *		extractProblems : function(rec) {
	 *		extractVitals : function(rec) {
	 *		parseVPR : function (vData) {
	 *		loadVitals : function(RetCode) {
	 *		loadAllTemplatesApplied2Patient : function() {
	 *		loadTemplates : function() {
	 *		getFNRiskInfo : function(FNRisk) {
	 *		getEmoLevelInfo : function(ELevel) {
	 *		manageOrderRecordsAfterLoading : function(OEMRecords) {
	 *		loadOrderRecords : function( ) {
	 *		PatientSelected : function(combo, recs, eOpts) {
	 *		UpdateOEMRecords : function(aRec, bRec) {
	 *		reAddHandlers : function() {
	 *		buildTemplateInfo : function(thisCtl, Patient, comeFrom) {
	 *		DataLoadCountDecrement : function(module) {
	 *		fieldContainerWalk : function(item, y, z) {
	 *		getObjLenMsg : function (Obj) {
	 *		updateKnownProblems : function() {
	 *		updateLabInfo : function() {
	 *		PatientDataLoadComplete : function(Loaded) {
	 *		HandleVSHCalcDoseButtons : function( event, element ) {
	 *		AssignBtnHandlers : function() {
	 *		onTemplateTypeChange : function(combo, recs, eOpts) {
	 *		DiseaseSelected : function(combo, recs, eOpts) {
	 *		onDiseaseStageChange : function(combo, recs, eOpts) {
	 *		CTOS_DataLoad2 : function(TemplateID) {
	 *		CTOS_DataLoad : function(TemplateID) {
	 *		LoadSpecifiedTemplate : function(TemplateID, module) {
	 *		ShowSelectedTemplate : function(theTemplate) {
	 *		selTemplateChange : function(combo, recs, eOpts) {
	 *		SaveBSAInfo : function() {	// Used to update the BSA if it's recalculated
	 *		LoadOEM_OrderData : function() {
	 *		selectMedReminderGridRow : function(theRowModel, record, index, eOpts) {
	 *		getAnyMedReminders4Template : function(TemplateID) {
	 *		RefreshMedRemindersGrid : function() {
	 *		AddMedReminders2Store : function(MedReminders) {
	 *		getMedRemindersInArray : function() {
	 *
	 ********************************/
    extend : "Ext.app.Controller",
    puWinAmputations : null,
    puWinBSASelection : null,

    stores : [
		"Patients",
		"PatientHistory",
		"LabInfo",
		"TemplateSources",
		"DiseaseType",
		"DiseaseStage",
		"Templates",
		"CTOS",
		"PerfStatStore",
		"TemperatureLocation",
		"DeliveryMechanism",
		"IDEntry",
		'MedReminders'
    ],



	models : ["LabInfo", "AllTemplatesApplied2Patient", "IDEntry", Ext.COMSModels.MedReminder],

	views : [
		"NewPlan.NewPlanTab",
		"NewPlan.MedRemindersPanel",
		"NewPlan.PatientSelection",
		"NewPlan.SelectPatient",
		"NewPlan.PatientInfo",
		"NewPlan.PatientInfoTable",
		"NewPlan.PatientTemplates",
		"NewPlan.PatientHistory",
		"NewPlan.LabInfo",
		"NewPlan.KnownProblems",
		"NewPlan.OEM",
		"NewPlan.AdverseEventsHistory",
		"NewPlan.CTOS",
		"NewPlan.CTOS.PatientSummary",
		"NewPlan.CTOS.NursingDocs",
		"NewPlan.CTOS.KnowledgeBase",
		"Common.Search4Template",
		"Common.selCTOSTemplate",
		"Common.selTemplateSrc",
		"Common.selDiseaseAndStage",
		"Common.selDisease",
		"Common.selDiseaseStage",
		"Common.selTemplate",
		"Common.VitalSignsHistory",
		"Common.puWinSelCancer",
		"Common.puWinAddCumDose",
		"Common.puWinSelBSA",
		"Common.puWinSelAmputation",
		"Common.MedRemindersForm",
		"Common.MedRemindersGrid",
		"Authoring.MedReminder",
		"NewPlan.dspTemplateData",
		"NewPlan.AskQues2ApplyTemplate",
		"NewPlan.AmputationSelection",
		"NewPlan.BSASelection",
		"NewPlan.EndTreatmentSummary"
	],

    refs: [
		{ ref: "NewPlanTab",					selector: "NewPlanTab"},

		{ ref: "CTOS",							selector: "NewPlanTab CTOS"},
		{ ref: "ApplyTemplateBtn",				selector: "NewPlanTab CTOS button[name=\"Apply\"]"},
		{ ref: "EditTemplateBtn",				selector: "NewPlanTab CTOS button[name=\"Edit\"]"},
		{ ref: "What2DoBtns",				    selector: "NewPlanTab CTOS [name=\"NewPlan_What2Do_Btns\"]"},
		{ ref: "NewPlan_CTOS_Form",			    selector: "NewPlanTab CTOS form[name=\"NewPlan_CTOS_Form\"]"},


		{ ref: "PatientInfo",					selector: "NewPlanTab PatientInfo"},

		{ ref: "PatientInfoTable",				selector: "NewPlanTab PatientInfo PatientInfoTable"},
		{ ref: "PatientInfoTableInformation",	selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableBSACalcs",		selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"]"},

		{ ref: "PatientInfoMedReminders",		selector: "NewPlanTab PatientInfo MedRemindersPanel"},
		{ ref: "PatientInfoMedRemindersTitle",	selector: "NewPlanTab PatientInfo MedRemindersPanel [name=\"Title\"]"},
		{ ref: "MedRemindersGrid",	selector: "NewPlanTab PatientInfo MedRemindersPanel grid"},
		{ ref: "MedRemindersForm",		selector: "NewPlanTab PatientInfo MedRemindersPanel MedRemindersForm"},
		{ ref: "PatientInfoMedRemindersDescription",	selector: "NewPlanTab PatientInfo MedRemindersPanel [name=\"Description\"]"},
		{ ref: "PatientInfoMedRemindersWhenCycle",		selector: "NewPlanTab PatientInfo MedRemindersPanel [name=\"ReminderWhenCycle\"]"},
		{ ref: "PatientInfoMedRemindersWhenPeriod",		selector: "NewPlanTab PatientInfo MedRemindersPanel [name=\"ReminderWhenPeriod\"]"},

		{ ref: "CTOS_MedRemindersGrid",		selector: "NewPlanTab CTOS MedRemindersGrid"},
		{ ref: "CTOS_MedRemindersForm",		selector: "NewPlanTab CTOS MedRemindersForm"},
		{ ref: "CTOS_MedRemindersDescription",	selector: "NewPlanTab CTOS MedRemindersPanel [name=\"Description\"]"},
		{ ref: "CTOS_MedRemindersWhenCycle",		selector: "NewPlanTab CTOS MedRemindersPanel [name=\"ReminderWhenCycle\"]"},
		{ ref: "CTOS_MedRemindersWhenPeriod",		selector: "NewPlanTab CTOS MedRemindersPanel [name=\"ReminderWhenPeriod\"]"},

		{ ref: "PatientTemplates",				selector: "NewPlanTab PatientInfo PatientTemplates"},
		{ ref: "PatientHistory",				selector: "NewPlanTab PatientInfo PatientHistory"},
		{ ref: "LaboratoryInfo",				selector: "NewPlanTab PatientInfo LabInfo"},
		{ ref: "KnownProblems",					selector: "NewPlanTab PatientInfo KnownProblems"},

		{ ref: "CTOSDataDsp",					selector: "NewPlanTab PatientInfo CTOS dspTemplateData"},

		{ ref: "VitalSigns",					selector: "NewPlanTab PatientHistory VitalSignsHistory"},

		{ ref: "selCTOSTemplate",				selector: "NewPlanTab selCTOSTemplate"},
		{ ref: "SelectPatientSection",			selector: "NewPlanTab SelectPatient"},
		{ ref: "PatientSelectionPanel",			selector: "NewPlanTab PatientSelection"},
		{ ref: "SelectPatient",					selector: "NewPlanTab SelectPatient combobox"},
		{ ref: "ConfirmPatient",				selector: "NewPlanTab SelectPatient container[name=\"Confirm\"]"},

		{ ref: "AuthoringTab",					selector: "AuthoringTab"},
		{ ref: "NavigationTabs",				selector: "NavigationTabs"},

		{ ref: "NDGI_VitalSigns",				selector: "NursingDocs_GenInfo VitalSignsHistory"},
		{ ref: "ProgrammerBtns",				selector: "ProgrammerBtns"}
    ],

	Modules2Load : [],		// Used to track which modules are in the process of being loaded and to load modules synchronously rather than asyncronously which works more efficiently on the back end.


    init: function() {
        wccConsoleLog("Initialized New Plan Tab Panel Navigation Controller!");
        this.application.btnEditTemplatClicked=false;
		this.application.on({ LoadOEMData : this.LoadOEM_OrderData, scope : this });

		this.application.on({ UpdateBSAWeightHeight : function(opts, tab2Switch2) {
			var weight = opts.weight;
			var height = opts.height;
			var Patient = this.application.Patient;
			var newBSA = "";
			if ("" !== height) {
				Patient.Height = height.substring(0, height.indexOf(" "));
			}
			if ("" !== weight) {
				Patient.Weight = weight.substring(0, weight.indexOf(" "));
			}
			if("" !== height || "" !== weight) {
				newBSA = Ext.BSA_Calc(Patient);
			}
			opts.BSA = newBSA;
 			this.ShowBSACalcsPUWin(opts, tab2Switch2);
		}, scope : this });

        this.control({
			"NewPlanTab PatientInfo MedRemindersPanel grid" : {
				select: this.selectMedReminderGridRow
			},


			"NewPlanTab PatientInfo CTOS dspTemplateData" : {
				afterrender : this.tabRendered
			},
            "NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]" : {
                change : this.TemplateTypeSelected
            },

			"NewPlanTab PatientSelection textfield[name=\"CPRS_QueryString\"]" : {
				specialkey : this.QSEnter
			},
            "NewPlanTab SelectPatient combobox" : {
                select : this.PatientSelected
            },

            "NewPlanTab CTOS button[name=\"Apply\"]" : {
                click: this.applyTemplateToPatient
            },
            "NewPlanTab CTOS button[name=\"Edit\"]" : {
                click: this.editTemplate
            },
			"NewPlanTab MedRemindersPanel" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },

            "NewPlanTab PatientSelection" : {
                afterrender: this.handlePatientSelectionRender
            },
            "NewPlanTab PatientInfo PatientInfoTable" : {
                afterrender: Ext.togglePanelOnTitleBarClick,
				expand : this.MaskPITPanelOnExpand
            },
            "NewPlanTab PatientInfo PatientTemplates" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "NewPlanTab PatientInfo PatientHistory" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "NewPlanTab PatientInfo LabInfo" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "NewPlanTab PatientInfo KnownProblems" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "NewPlanTab PatientInfo AdverseEventsHistory" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "NewPlanTab ToxicitySideEffectsPanel" : {
                afterrender: Ext.togglePanelOnTitleBarClick
            },
            "PatientHistory [name=\"AddVitals\"] button[text=\"Save\"]" : {
                click: this.SaveVitals
            },
            "PatientHistory [name=\"AddVitals\"] button[text=\"Cancel\"]" : {
                click: this.CancelVitals
            }
       });
	   this.InitIntelligentDataElementStore();
       wccConsoleLog("New Plan Tab Panel Navigation Controller Initialization complete!");
    },

	updatePITable : function(PatientData) {
		var piTable = this.getPatientInfoTable();
		if (!PatientData) {
			piTable.update("");
		}
		else {
			piTable.update(PatientData);
		}
		return piTable;
	},


	MaskPITPanelOnExpand : function (p, ani, opts) {
//		if ("Patient Information" !== p.title ) {
//			this.MaskPITable("Loading Patient Information");
//		}
//		else {
//			this.MaskPITable(false);
//		}
	},

	MaskPITable : function (msg) {
//		var PITablePanel = this.getPatientInfoTable();
//		if (msg) {
//			PITablePanel.setTitle("Patient Information - " + msg);
//			PITablePanel.setLoading(msg, false);
//		}
//		else {
//			PITablePanel.setTitle("Patient Information");
//			PITablePanel.setLoading(false, false);
//		}
	},

	clickPatientListCount : function( evt, itemClicked ) {
		if ("anchor PatientList" == itemClicked.className) {
			var thePatients = this.application.CurrentTemplate.data.PatientList;
			var theDesc = this.application.CurrentTemplate.data.Description;
			var theController = this.getController("TemplateList.TemplateListTab");
			theController.showPatientListWidget(thePatients, theDesc);
		}
	},

	tabRendered : function( theTab ) {
		theTab.mon(theTab.el, 'click', this.clickPatientListCount, this);
	},

	InitIntelligentDataElementStore : function() {
		var theStore = this.getStore("IDEntry");
		theStore.load({
			scope: this,
			callback: function(records, operation, success) {
				var IDE = [], i, len = records.length, rec;
				for (i = 0; i < len; i++) {
					rec = records[i].getData();
					IDE.push(rec);
				}
				this.application.IntelligentDataElements = IDE;
			}
		});
	},

	cancelApply: function(button){
		wccConsoleLog("CancelApplication of Template");
	},


	CancelVitals : function(btn) {
		btn.up('form').getForm().reset();
	},

    SaveVitals : function() {
        var theController = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
        if (theController) {
            theController.SaveVitals("PatientHistory");
        }
    },


    handlePatientSelectionRender : function( panel ) {
        var Btns = Ext.select("button.anchor.QueryCPRS4Patient");
        if (Btns) {
            Btns.on("click", this.handlePatientSelectionClickEvent, this);
        }
		if ("Programmer" === dName ) {
			// this.getProgrammerBtns().show();
		}
        Ext.togglePanelOnTitleBarClick(panel);
    },

	resetPatientInfoPanel: function(thisCtl) {
		var PatientInformationPanel = thisCtl.getPatientInfo();
		PatientInformationPanel.collapse();
	},

	resetTRSPanel: function(thisCtl, numTemplates) {
		var TRSPanel = thisCtl.getPatientTemplates(),
			buf =  "Treatment Regimens & Summaries";
		if (numTemplates && "" !== numTemplates) {
			buf += "<span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + numTemplates + ")</span>";
		}
		TRSPanel.collapse();
		TRSPanel.setTitle(buf);
	},

	resetVitalsPanel: function(thisCtl, numVitals) {
		var VitalsPanel = thisCtl.getPatientHistory(),
			buf =  "Patient Vitals ";
		if (numVitals && "" !== numVitals) {
			buf += "<span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + numVitals + ")</span>";
		}
		VitalsPanel.collapse();
		VitalsPanel.setTitle(buf);
	},

	resetLabInfoPanelPanelTitleBar: function(thisCtl, numLabResults) {
		var LabInfoPanel = thisCtl.getLaboratoryInfo(),
			buf =  "Laboratory Information ";
		if (numLabResults && "" !== numLabResults) {
			buf += "<span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + numLabResults + ")</span>";
		}
		LabInfoPanel.collapse();
		LabInfoPanel.setTitle(buf);
	},

	resetCTOSPanel: function(thisCtl) {
		var CTOSPanel = thisCtl.getCTOS();
		CTOSPanel.setActiveTab(0);
		try {   /* One or more of the controls may not be available based on role of user */
			thisCtl.getNewPlan_CTOS_Form().getForm().reset();
			Ext.ComponentQuery.query("NewPlanTab box[name=\"AllTemplatesShownMsg\"]")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab selTemplate")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab selDiseaseAndStage")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab selCTOSTemplate")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab dspTemplateData")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab button[name=\"Apply\"]")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab button[name=\"Edit\"]")[0].hide();
			this.getMyTemplates().hide();
			this.getSelCTOSTemplate().hide();
		}
		catch (err) {
		}
	},

	resetPanels: function(thisCtl, numTemplates, numVitals, numLabResults) {
		this.resetPatientInfoPanel(thisCtl);
		this.resetTRSPanel(thisCtl, numTemplates);
		this.resetVitalsPanel(thisCtl, numVitals);
		this.resetLabInfoPanelPanelTitleBar(thisCtl, numLabResults);
		this.resetCTOSPanel(thisCtl);
		this.getWhat2DoBtns().hide();
	},




	HandleTemplateBtnClicks : function (event, element) {
		wccConsoleLog("HandleTemplateBtnClicks - PatientInfoTable!");
		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;
		var tab2switch2 = element.getAttribute("tabtype");
		var btnName = element.getAttribute("name");
		var Patient = this.application.Patient;
		var fncName = "Unknown ";


		switch (btnName) {
			case "ShowTemplateDetails":
				fncName = "Show Details";
				this.application.Patient.TD = {};
				this.application.Patient.TD_TemplateID = element.getAttribute("templateid");
				this.application.Patient.TD_TemplateName = element.getAttribute("templatename");
				this.application.Patient.TD_ID = element.getAttribute("EotsID");
				this.application.Patient.TD_Type = "Show";

				Ext.widget("TreatmentDetails");
				fncName = "";
				break;
			case "GenerateEoTS":
                fncName = "Generate End of Treatment Summary";
                this.application.Patient.EoTS_TemplateID = element.getAttribute("templateid");
                this.application.Patient.EoTS_TemplateName = element.getAttribute("templatename");
                // Have TemplateID = this.application.Patient.AppliedTemplateID
                // TemplateName = this.application.Patient.AppliedTemplate.Description
                this.application.Patient.EoTS_Type = "Generate";
                Ext.widget("EndTreatmentSummary");
                fncName = "";
                break;

			case "ShowEoTS":
				fncName = "Show End of Treatment Summary";
				this.application.Patient.EoTS_TemplateID = element.getAttribute("templateid");
				this.application.Patient.EoTS_TemplateName = element.getAttribute("templatename");
				this.application.Patient.EoTS_ID = element.getAttribute("EotsID");
				this.application.Patient.EoTS_Type = "Show";
		        this.application.loadMask("Loading End of Treatment Summary Information...");
				delete(this.application.Patient.EoTS);	// Clear out any previous EoTS info just in case...

				Ext.Ajax.request({
					scope : this,
					url: Ext.URLs.EoTS + "/" + this.application.Patient.EoTS_ID,
					success: function( response, opts ){
						this.application.unMask();
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						if (resp.success) {
							if (resp.records[0]) {
								this.application.Patient.EoTS = resp.records[0];
								Ext.widget("ViewEndTreatmentSummary");
							}
							else {
								alert("No records available for this EoTS");
							}
						}
						else {
							alert("load EoTS - Error");
						}
					},
					failure : function( response, opts ) {
						this.application.unMask();
						alert("EoTS Data Load Failed...");
					}
				});


				fncName = "";
				break;
		}
		if ("" !== fncName) {
			alert(fncName + " - NewPlanTab.js-HandleTemplateBtnClicks() function not yet available");
		}
	},

/**
 * Amputation information is stored in the Lookup table in the following manner:
 *  Lookup_Type = 30
 *  Lookup_Type_ID = null
 *  Name = Patient GUID
 *  Description = Amputation (e.g. "Left Foot", "Lower Left Arm", etc) One Amputation per record
 *  Use Patient Controller
 **/

	ShowBSACalcsPUWin : function(opts, tab2switch2) {
		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;
		var xx, yy, tmpData, tempBSA, DataEl, OEMData, OEM_Data_Record;
		var PatientInfo;
		var PatientData;

		var Patient = this.application.Patient;

			tempBSA = Patient.BSA;
			this.application.Patient.BSA_Reduction = 0;
			PatientData = Ext.ShowBSACalcs(Patient, true, null, null, null);

			/* MWB - 6/4/2014 Added new code to allow user to select Height/Weight for BSA Calculations */
			Ext.widget('window', {
				title: "Dosage Calculations",
				closeAction: "destroy",
				width: 520,
				height: 370,
				minHeight: 300,
				resizable: true,
				modal: true,
				scope : this,
				items: [ { xtype : "box", "html" : PatientData }],
				buttons : [ 
					{ "text" : "Ok", "handler" : function(btn) {
							btn.up('window').close();
						}
					}
				],
				listeners : {
					"afterrender" : function(theWin, eOpts) {
						var btn = theWin.el.select("button.changeBSAHeightWeight");
						btn.on("click", function(theBtn, evt, eOpts) {
							var theVitals = this.application.Patient.Vitals;
							var htList = [];
							var wtList = [];
							var VitalsLen = theVitals.length;
							var i, htObj, wtObj, temp1, temp2;
							var defaultValues = {"height" : "", "weight" : ""};
							for (i = 0; i < VitalsLen; i++) {
								temp1 = theVitals[i].Height;
								if ("" !== temp1) {
									temp2 = Ext.In2CM(temp1);
									htObj = { "dsp" : temp1 + " / " + temp2 + " (in/cm) - " + theVitals[i].DateTaken, "value" : temp1 + "-" + theVitals[i].DateTaken };
									if ("" == defaultValues.height) {
										defaultValues.height = htObj;
									}
									htList.push(htObj);
								}

								temp1 = theVitals[i].Weight;
								if ("" !== temp1) {
									temp2 = Ext.Pounds2Kilos(temp1);
									wtObj = { "dsp" : temp1 + " / " + temp2 + " (lbs/kg) - " + theVitals[i].DateTaken, "value" : temp1 + "-" + theVitals[i].DateTaken };
									if ("" == defaultValues.height) {
										defaultValues.weight = wtObj;
									}
									wtList.push(wtObj);
								}
							}

							var htStore = Ext.create('Ext.data.Store', {
								"fields" : ["dsp", "value"],
								"data" : htList
							});

							var wtStore = Ext.create('Ext.data.Store', {
								"fields" : ["dsp", "value"],
								"data" : wtList
							});

							var htCombo = {
								"xtype" : "combo", 
								"margin" : "10 0 10 0", 
								"width" : 350,
								"name" : "SelectBSAHeight", 
								"id" : "SelectBSAHeight",
								"fieldLabel" : "Height", 
								"labelAlign" : "right", 
								"emptyText" : "Select Height",
								"value" : htList[0].value,
								"store" : htStore,
								"queryMode" : "local",
								"displayField" : "dsp",
								"valueField" : "value"
							};

							var wtCombo = {
								"xtype" : "combo", 
								"width" : 350,
								"name" : "SelectBSAWeight", 
								"id" : "SelectBSAWeight",
								"fieldLabel" : "Weight", 
								"labelAlign" : "right", 
								"emptyText" : "Select Weight",
								"value" : wtList[0].value,
								"store" : wtStore,
								"queryMode" : "local",
								"displayField" : "dsp",
								"valueField" : "value"
							};


							Ext.widget('window', {
								title: "Change Height / Weight for BSA Calculations",
								closeAction: 'destroy',
								width: 400,
								height: 150,
								resizable: true,
								modal: true,
								scope : this,
								"defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
								items: [ htCombo, wtCombo ],
								buttons : [ 
									{ "text" : "Save", scope : this, pWin : theWin, "handler" : function(btn) {
											var height1 = Ext.getCmp("SelectBSAHeight");
											var height = height1.getRawValue();
											var weight1 = Ext.getCmp("SelectBSAWeight");
											var weight = weight1.getRawValue();

											this.application.fireEvent("UpdateBSAWeightHeight", {height : height, weight : weight}, "DoBSACalcs");

											btn.up('window').close();
											btn.pWin.close();
										}
									},
									{ "text" : "Cancel", "handler" : function(btn) {
											btn.up('window').close();
										}
									}
								]
							}, this).show();
						}, theWin.scope);
					}
				}
			}).show();


			this.PatientDataLoadComplete("Update BSA");	// Use this call to update the BSA in the PatientInfoTable.
			if (opts.BSA) {
				Patient.BSA = opts.BSA;
			}
			if ("DoBSACalcs" === tab2switch2 && tempBSA !== Patient.BSA) {
				this.SaveBSAInfo();		// POSTs the BSA Calculations and formula as a Patient Vitals Record.
				var spanTag = Ext.get("PatientInfoTableBSA_Display");
				spanTag.setHTML(Patient.BSA);
			}
	},
	//-------------------------------------------------------------------------
	// MWB 25 Jan 2012 - Event handler for the anchor onclick events in the PatientTemplate Table.
	// When the user clicks on one of the anchors in the list of templates applied to a patient
	// an event is fired off up the stack, passing the name of the template, and the tab the template should be displayed in
	// e.g. OEM or CTOS
	// The event itself should then be captured in either the CTOS or the OEM controller and processed accordingly.
	//
	// MWB 27 Jan 2012 - Added additional functionality
	// MWB 30 Jan 2012 - Added additional functionality
	// MWB 31 Jan 2012 - Added control for the BSA Anchor
	// MWB 09 Feb 2012 - Added additional param - DateTaken
    // MWB 08 Apr 2014 - Added functionality for Add/Edit BSA and Amputations
    //
	HandleAnchorClicks : function (event, element) {
		wccConsoleLog("HandleAnchorClicks - PatientInfoTable - " + element.getAttribute("tabtype"));
		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;

		var xx, yy, tmpData, tempBSA, DataEl, OEMData, OEM_Data_Record;
		var PatientInfo;
		var PatientData;

		var tab2switch2 = element.getAttribute("tabtype");

		var Patient = this.application.Patient;


		if("DoBSACalcs" === tab2switch2 || "ShowBSACalcs" === tab2switch2) {
			this.ShowBSACalcsPUWin({}, tab2switch2);
		} else if("ShowAllPatientData" === tab2switch2) {
			PatientInfo = Patient;
			// PatientData = "<div style=\"margin-left: 1em;\"><ul>" + this.getPatientDataAsString() + "</ul></div>";
			var htmlData = prettyPrint( Patient, { maxDepth : 5 } ).innerHTML;
			Ext.create('Ext.window.Window', {
			    title: 'Patient Info',
			    height: 800,
			    width: 950,
				autoScroll : true,
			    html : htmlData
			}).show();

		} else if("BSA" === tab2switch2) {
			gender = element.getAttribute("gender");
			height = element.getAttribute("height");
			weight = element.getAttribute("weight");
			Amputee = element.getAttribute("amputee");
			DateTaken = element.getAttribute("date");	// MWB 09 Feb 2012 - Added additional param - DateTaken
			this.application.fireEvent("CalculateBSA", {gender : gender, height : height, weight : weight, amputee : Amputee, date : DateTaken }); // MWB 09 Feb 2012 - Added additional param - DateTaken
		} else if ("CTOS" === tab2switch2) {
			templateName = element.getAttribute("templatename");
			templateID = element.getAttribute("templateid");
			this.CTOS_DataLoad2(templateID);
			CTOSTabs = this.getCTOS();
	        CTOSTabs.setActiveTab(0);		// Show the CTOS Tab
		} 
		else if ("Show Details" === tab2switch2 || "Edit" === tab2switch2) {
			alert("Function not yet available");
		} else {
			templateName = element.getAttribute("templatename");
			templateID = element.getAttribute("templateid");
			this.application.fireEvent("TemplateSelected", {tabType : tab2switch2, templateName : templateName, templateID : templateID});
		}
	},


    //KD - 01/23/2012 - This is shared function between Disease stage combo and Select Templates combo
    loadCombo : function(picker, eOpts){
        var originalHiddenVal=null;
        picker.hiddenValue = picker.getRawValue();
        picker.clearValue();

        var URI,id;

        if("Select Disease Stage Control" == picker.name){
            URI = Ext.URLs.DiseaseStage + "/";
            if(eOpts && eOpts.length && eOpts.length > 0){
                id = eOpts;
            }else{
                id = this.application.Patient.Disease.id;
            }
        } else if (picker.name == "selDisease"){
            if(eOpts && eOpts.length && "Refresh" === eOpts){
                URI = Ext.URLs.DiseaseType;
                id = '';
            }else if(null != this.application.Patient.TemplateType.id){
                URI = Ext.URLs.DiseaseType + "/Source/";
                id = this.application.Patient.TemplateType.id;
            }
        }

        picker.getStore().load({
            params: {
                URL : URI,
                ID  : id
            },
            callback: function(records,operation,success){
                if(success){
                    if(null!=originalHiddenVal){
                        picker.setRawValue(originalHiddenVal);
                    }
                }
            }
        });

    },

    collapseCombo : function(picker,eOpts){
        if(picker.getValue() == null && picker.hiddenValue != null){
            picker.setRawValue(picker.hiddenValue);		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        }

    },

	resetTemplateFilter : function(button){

        if(null != this.application.Patient.Template){
            this.getTemplate().setRawValue(this.application.Patient.Template.description);
        }

        this.application.ResetClicked=true;
        this.loadCombo(this.getTemplate());
        this.loadCombo(this.getDisease(),"Refresh");

		this.getDiseaseAndStage().hide();
        this.getTemplate().show();
		button.hide();
		this.getAllTemplatesShownMsg().show();
    },


    editTemplate : function(button){
        this.application.loadMask("Edit Template");

        this.application.btnEditTemplatClicked=true;

        var disease = this.getDisease();

        var diseaseRecord = disease.getStore().getById(disease.getValue());

        if(0 == this.getSelTemplateType().getStore().count()){
            this.getSelTemplateType().getStore().load();
        }


        if(null === diseaseRecord){
            var newPlanCtl = this.getController("NewPlan.NewPlanTab");
            disease.getStore().load({
                params: {
                        URL: Ext.URLs.DiseaseType + "/",
                        ID: disease.getValue()
                },
                callback: function (records, operation, success) {
                        if (success) {
                            var diseaseRecord = disease.getStore().getById(disease.getValue());
                            newPlanCtl.afterFindDisease(diseaseRecord);
                        }else{
                            Ext.MessageBox.alert('Failure', 'Cancer type could not be found for this template. ');
                        }
                }
            });

        }else {
            this.afterFindDisease(diseaseRecord);
        }
    },

    afterFindDisease : function(diseaseRecord){
        var thisCtl = this.getController("Authoring.AuthoringTab");
        var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];


        var template=null;
        var templateTypeModel, templateType = this.getSelTemplateType();

        if(Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()){
            /*
             * Assigning the template type to a Local Template. Not correct logic
             * but just something to get past the error when editing a template.
             */
            templateTypeModel = this.getSelTemplateType().getStore().getAt(1);
            templateType.setValue(templateTypeModel);
            template = this.getMyTemplates();
        }else if(Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()){
            template = this.getTemplate();
        }

        if(null == template){
            /*
             * Assigning the template type to a Local Template. Not correct logic
             * but just something to get past the error when editing a template.
             */
            templateTypeModel = this.getSelTemplateType().getStore().getAt(1);
            templateType.setValue(templateTypeModel);
            template = this.getMyTemplates();
        }
        existingTemplate.setValue(true);

        var rbtn = Ext.create(Ext.form.Radio,{
            inputValue : 0
        });

        thisCtl.AuthorTypeSelected(rbtn,true,null,null);
        thisCtl.getPatientNameField().setValue(this.application.Patient.name);
        thisCtl.getPatientNameField().show();

        var templateSourceRecord = this.getSelTemplateType().getStore().findBy(

            function (record, id) {

                    if(record.data.id == templateType.getValue()){
                        return true;
                    }

                    return false;
            });

        var templateSourceRecords = [];

        var tmp = templateType.getStore().getAt(templateSourceRecord);
        templateSourceRecords.push(tmp);
        thisCtl.getTemplateSource().setValue(tmp);
        thisCtl.onTemplateTypeChange(null,templateSourceRecords,null);

        var diseaseRecords = [];
        diseaseRecords.push(diseaseRecord);

        thisCtl.getExistingDisease().setRawValue(diseaseRecord.data.name);
        thisCtl.DiseaseSelected(thisCtl.getExistingDisease(),diseaseRecords,null);

        var diseaseStage = this.getDiseaseStage();
        var diseaseStageRecord = diseaseStage.getStore().getById(diseaseStage.value.id);
        var diseaseStageRecords = [];


        if(null != diseaseStageRecord){
	        diseaseStageRecords.push(diseaseStageRecord);
			thisCtl.getExistingDiseaseStage().setRawValue(diseaseStageRecord.data.name);
		    thisCtl.onDiseaseStageChange(thisCtl.getExistingDiseaseStage(),diseaseStageRecords,null);
        }else{
            thisCtl.getExistingDiseaseStage().setRawValue('');
        }

        var templateRecord;
        if(null!=this.application.Patient.AppliedTemplateID){
            templateRecord = template.getStore().getById(this.application.Patient.AppliedTemplateID);
        }else{
            templateRecord = template.getStore().getById(this.application.Patient.Template.id);
        }

        template.clearValue();

        if(null==templateRecord){
            var newPlanCtl = this.getController("NewPlan.NewPlanTab");
            template.getStore().load({
                params: {
                    URL: Ext.URLs.Templates + "/",
                    ID: (null == this.application.Patient.Template) ? this.application.Patient.AppliedTemplateID : this.application.Patient.Template.id
                },
                callback: function(records,operation,success){
                    if(success){
                        templateRecord = this.getAt(0);
                        newPlanCtl.afterFindTemplate(templateRecord,thisCtl,template);
                    }
                }
            });

        }else{
            this.afterFindTemplate(templateRecord,thisCtl,template);
        }
    },
	afterFindTemplate : function(templateRecord,controller,template){
		var templateRecords = [];
		this.collapseCombo(template,null);
		this.collapseCombo(this.getDiseaseStage(),null);
		templateRecords.push(templateRecord);
		controller.getTemplate().setRawValue(templateRecord.data.description);
		controller.selTemplateChange(controller.getTemplate(),templateRecords,null);

		// this.getNavigationTabs().setActiveTab(1);
		// MWB - 5/29/2012 - With the addition of the "Orders" tab and the fact that the Orders tab might NOT be visible to all users
		// we need to get the index of the "Template Authoring" tab by walking the titles of the tabs.
		var allTabs = this.getNavigationTabs().items;
		allTabs.findBy(function(aTabPanel) {
			if ("Template Authoring" === aTabPanel.title) {
				this.getNavigationTabs().setActiveTab(aTabPanel);
			}
		},
		this );
	},

	initAskQues2ApplyTemplateFields : function (theFields, fieldName, fieldLabel) {
		var i, j, aField, afName, theLabel, fieldIsSet;
		if(Ext.isArray(fieldLabel)) {		// Handles Amputations Array
			for (j = 0; j < fieldLabel.length; j++) {
				fieldIsSet = fieldLabel[j].description;
				for (i = theFields.length-1; i >= 0; i--) {
					aField = theFields[i];
					afName = aField.name;
					if (afName === fieldName && fieldIsSet == afName) {
						return true;
					}
				}
			}
		}
		else {		// Handles Performance Status radio buttons list
			for (i = theFields.length-1; i >= 0; i--) {
				aField = theFields[i];
				if (aField.name === fieldName) {
					theLabel = aField.boxLabel[0];
					if (theLabel == fieldLabel) {
						return aField.inputValue;
					}
				}
			}
		}
		return "";
	},


	ShowAskQues2ApplyTemplate : function(records, operation, success) {
		var i, itemsInGroup = [];	// new Array();
		var TemplateApplied = this.application.Patient.TemplateID;
		var TemplateApproved = false;

		for (i = 0; i < records.length; i++ ){
			var record = records[i];
			if(record.data.value !== '5' ){
				itemsInGroup.push({
					boxLabel : record.data.value + ' - ' + record.data.description,
					name : 'PerfStatus',
					inputValue : record.data.id,
					width : 450
				});
			}
		}

		if(TemplateApplied && TemplateApproved){
			Ext.MessageBox.show({
				title: 'Information',
				msg: 'Template already applied. Would you like to archive existing template and apply current selection?',
				width:300,
				buttons: Ext.MessageBox.OKCANCEL,
				scope: this,
				fn: function(buttonId) {
					if("ok" === buttonId) {
						try {
							var fncName = "Generate End of Treatment Summary";
							this.application.Patient.EoTS_TemplateID = this.application.Patient.AppliedTemplate.id;
							this.application.Patient.EoTS_TemplateName = this.application.Patient.AppliedTemplate.Description;
							this.application.Patient.EoTS_Type = "Generate";
							Ext.widget("EndTreatmentSummary", { widget : "AskQues2ApplyTemplate", itemsInGroup: itemsInGroup, ChangeTemplate: true });
							fncName = "";
						}
						catch (err) {
							alert("Failure to Add Date Widget");
						}
					}
				}
			});
		}
		else {
			var theWidget = Ext.ComponentQuery.query("AskQues2ApplyTemplate");
			if (theWidget.length > 0) {
				theWidget[0].show();
			}
			else {
				theWidget = Ext.widget("AskQues2ApplyTemplate",{itemsInGroup: itemsInGroup, ChangeTemplate: false, scope:this});
			}

			var theForm = theWidget.items.items[0].getForm();
			/*
			"id",
			"name",
			"DOB",
			"Gender",
			"Age",
			"ApprovedByUser",
			"AssignedByUser",
			"ConcurRadTherapy",
			"Goal",
			"PerformanceStatus",

			// "Measurements",		// Array of measurements
			"DFN",				// Data File Name which links to MDWS
			"Disease",			// Array of diseases

			"TemplateName",		// Info on the currently active template
			"TemplateDescription",
			"TemplateID",
			"PAT_ID",				// This is really the "Treatemen ID" but for now just using the existing SQL Field name.
			// "TreatmentID",		// ID of the record containing this Treatment. This ID acts as a link for all records for this treatment process.
			"TreatmentStart",
			"TreatmentEnd",
			"TreatmentStatus",
			"ClinicalTrial",

			"WeightFormula",
			"BSA_Method",
			"BSA_Weight",
			"BSA",
			"BSAFormula",

			"Amputations",
			 */

			var PatientDetails = this.application.Patient;
			// theForm.getFields().items[35].boxLabel[0]
			var theFields = theForm.getFields().items;
			/***
			var i, aField, theLabel, thePerfStat;
			for (i = theFields.length-1; i >= 0; i--) {
				aField = theFields[i];
				if (aField.name === "PerfStatus") {
					theLabel = aField.boxLabel[0];
					if (theLabel == PatientDetails.PerformanceStatus) {
						thePerfStat = aField.inputValue;
						break;
					}
				}
			}
			***/
			var theValues2Set = {
				"startdate"              : PatientDetails.TreatmentStart, 
				"BSA_FormulaWeight"      : PatientDetails.BSA_Method,
				"BSA_Formula"            : PatientDetails.BSAFormula,
				"Goal"                   : PatientDetails.Goal,
				"ConcurRadTherapy"       : PatientDetails.ConcurRadTherapy,
				"ClinicalTrial"          : PatientDetails.ClinicalTrial !== "",
				"TypeOfTrial"            : PatientDetails.ClinicalTrial,
				"amputations"            : PatientDetails.Amputations,
				"Upper Left Arm"         : this.initAskQues2ApplyTemplateFields(theFields, "Upper Left Arm", PatientDetails.Amputations),
				"Lower Left Arm"         : this.initAskQues2ApplyTemplateFields(theFields, "Lower Left Arm", PatientDetails.Amputations),
				"Left Hand and Fingers"  : this.initAskQues2ApplyTemplateFields(theFields, "Left Hand and Fingers", PatientDetails.Amputations),
				"Left Thigh"             : this.initAskQues2ApplyTemplateFields(theFields, "Left Thigh", PatientDetails.Amputations),
				"Lower Left Leg"         : this.initAskQues2ApplyTemplateFields(theFields, "Lower Left Leg", PatientDetails.Amputations),
				"Left Foot"              : this.initAskQues2ApplyTemplateFields(theFields, "Left Foot", PatientDetails.Amputations),
				"Upper Right Arm"        : this.initAskQues2ApplyTemplateFields(theFields, "Upper Right Arm", PatientDetails.Amputations),
				"Lower Right Arm"        : this.initAskQues2ApplyTemplateFields(theFields, "Lower Right Arm", PatientDetails.Amputations),
				"Right Hand and Fingers" : this.initAskQues2ApplyTemplateFields(theFields, "Right Hand and Fingers", PatientDetails.Amputations),
				"Right Thigh"            : this.initAskQues2ApplyTemplateFields(theFields, "Right Thigh", PatientDetails.Amputations),
				"Lower Right Leg"        : this.initAskQues2ApplyTemplateFields(theFields, "Lower Right Leg", PatientDetails.Amputations),
				"Right Foot"             : this.initAskQues2ApplyTemplateFields(theFields, "Right Foot", PatientDetails.Amputations),
				"PerfStatus"             : this.initAskQues2ApplyTemplateFields(theFields, "PerfStatus", PatientDetails.PerformanceStatus),
				"WeightFormula"          : PatientDetails.WeightFormula
			};

			theForm.setValues(theValues2Set);

		}
	},




    applyTemplateToPatient : function(button){
        var startDate = new Date(this.application.Patient.TreatmentStart);
        var dateEnded = new Date(this.application.Patient.TreatmentEnd);
        var today = new Date();

        this.getStore('PerfStatStore').load({ 
            scope : this,
            callback : this.ShowAskQues2ApplyTemplate
        });
    },

    clearCTOS : function(button){
        if(this.getCTOSDataDsp().hidden==false){
            this.getCTOSDataDsp().hide();
            if ("1" === SessionTemplateAuthoring) {
				if ("Provider" === Sessionrole || "All Roles" === Sessionrole) {
					this.getApplyTemplateBtn().hide();
				}
				this.getEditTemplateBtn().hide();
            }
            this.application.selTemplate=null;

            if(!button){
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].setValue(false);
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].setValue(false);
            }else if("2" === button){
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].setValue(false);
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].setValue(false);
                if(this.getPatientInfo().hidden == false){
                    this.getLaboratoryInfo().hide();
                    this.getPatientHistory().hide();
                    this.getPatientTemplates().hide();
                    this.getPatientInfoTable().hide();
                    this.getPatientInfo().hide();
                    this.getSelectPatient().setValue('');
                    this.getSelectPatient().getStore().removeAll();
                    this.getSelectPatient().lastQuery = null;
                    this.getCTOS().hide();
                }
            }
        }
    },

	TemplateTypeSelected : function(rbtn, newValue, oldValue, eOpts ) {
		wccConsoleLog("What to do has been selected");
		var selCTOSTemplateObj = this.getSelCTOSTemplate();
		this.application.Patient.AppliedTemplateID = null;
		var i;
		var theParentPanel = rbtn.up("panel");
		var What2Do = rbtn.inputValue;

		if( newValue ) {
			if ("0" === What2Do) {
				var current = this.application.Patient.AllTemplatesApplied2Patient.get("current");
				if (current) {
					var theTemplate = current[0].TemplateID;
					this.CTOS_DataLoad(theTemplate, theParentPanel);
				}
				
				this.clearCTOS(What2Do);
				selCTOSTemplateObj.hide();
			}
			else {
				this.clearCTOS(What2Do);

				var theController = this.getController("Common.selCTOSTemplate");
				theController.resetTemplateSrc(selCTOSTemplateObj);
				selCTOSTemplateObj.show();
			}
		}
	},







	// Called to complete the "TemplateApplied" process. Called from the success event of the patientTemplate.save() AJAX call in the "ApplyTemplate()" function above.
	PatientModelLoadSQLPostTemplateApplied : function( PatientGUID, TreatmentID ) {
		// console.log("Loading Patient Info Model from PatientModelLoadSQLPostTemplateApplied function");
		var pModel = this.getModel("PatientInfo");
		var pModelParam = PatientGUID;
		this.application.PatientID = PatientGUID;	// Not yet used... MWB - 5/25/2012
		this.application.TreatmentID = TreatmentID;
		this.application.PAT_ID = TreatmentID;		// PAT_ID and TreatmentID are the same thing, just set differently in different places.



		pModel.load(pModelParam, {
			scope : this,
			success : function( patientInfo, response ) {

				this.application.Patient.Amputations = patientInfo.data.Amputations;
				this.application.Patient.BSA = patientInfo.data.BSA;
				this.application.Patient.BSAFormula = patientInfo.data.BSAFormula;		// This should really be the string of the formula for calculating the BSA
				this.application.Patient.BSA_Method = patientInfo.data.BSAFormula;		// but the Framework returns the name of the method (e.g. DuBois) as the BSAFormula
				this.application.Patient.BSA_Weight = patientInfo.data.BSA_Weight;
				this.application.Patient.TemplateDescription = patientInfo.data.TemplateDescription;
				this.application.Patient.TemplateID = patientInfo.data.TemplateID;
				this.application.Patient.TemplateName = patientInfo.data.TemplateName;
				this.application.Patient.TreatmentEnd = patientInfo.data.TreatmentEnd;
				this.application.Patient.TreatmentStart = patientInfo.data.TreatmentStart;
				this.application.Patient.TreatmentStatus = patientInfo.data.TreatmentStatus;
				this.application.Patient.TreatmentID = this.application.TreatmentID;
				this.application.Patient.WeightFormula = patientInfo.data.WeightFormula;

				this.application.loadMask("Loading Patient Records");
				this.application.DataLoadCount = 5;		// Count of # of modules to load
				this.loadMDWSData();					// module 1
				this.loadTemplates("Templates");					// module 5
                this.loadAllTemplatesApplied2Patient("PatientModelLoadSQLPostTemplateApplied");
				this.loadOrderRecords();				// module 6
// console.log("Load Order Records from - PatientModelLoadSQLPostTemplateApplied");
                if (this.application.Patient.TemplateID) {
                    this.LoadSpecifiedTemplate(this.application.Patient.TemplateID, "pModel");
                }
                else {
					this.DataLoadCountDecrement("pModelLoad - PASS");
					this.PatientDataLoadComplete("No Current Template Applied to patient to load");
                }

				var theRealID = this.application.Patient.id;
				this.LoadAllData4PatientByMDWSGUID( theRealID );
			},
			failure : function (record, operation) {
				this.application.unMask();
				wccConsoleLog("Patient Info failed to load properly");
			}
		});
	},

	//----------------------------------------------------------------------------------------------------------------
	//
	//	Patient Selection via Admin Dates or entering Patient ID (First Letter of Last Name followed by last 4 of SSN
	//
	//----------------------------------------------------------------------------------------------------------------
	PatientModelLoadSQL : function( query ) {
		var PatientStore = COMS.store.Patients.create();
		this.application.loadMask("One moment please, retrieving Patient Information for " + query + "...");
		PatientStore.load({ scope : this, callback :
			function( records, operation, status) {
				this.application.unMask();
// wccConsoleLog("PatientModelLoadSQL - Load Complete");
				var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
				var query = "";
				var SSN= "";
				var PatientInfo = {}, Patient_ID, Patient_Name;
				if (CPRS_QueryString) {
					query = CPRS_QueryString.getValue();
				}

				if ("" !== query) {
					SSN = query.substring(1);
					var i, nRecs = records.length, flag = false, tmpSSN;

					for (i = 0; i < nRecs; i++) {
						tmpSSN = records[i].get("DFN");
						tmpSSN = tmpSSN.substring(2);
						if (SSN === tmpSSN) {
							flag = true;
							Patient_ID = records[i].get("id");
							Patient_Name = records[i].get("name");
							this.application.TempPatient = records[i];
						}
					}

					// Additional code here to perform proper query in MDWS for data
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var SelectPatientSection = thisCtl.getSelectPatientSection();
					var SelectPatient = thisCtl.getSelectPatient();
					var ConfirmPatient = thisCtl.getConfirmPatient();
					SelectPatientSection.show();
					SelectPatient.hide();
					if (flag) {
						PatientInfo.Patient_Name = Patient_Name;
						PatientInfo.Patient_ID = Patient_ID;
						ConfirmPatient.update( PatientInfo );
						// CPRS_QueryString.setValue("");
						ConfirmPatient.show();
						ConfirmPatient.el.select("button").on("click", this.ConfirmPatientClick, this);
					}
					else {
						SelectPatient.show();
					}
				}
			}
		});
	},

	PatientModelLoadMDWS : function(query) {
        // Load Patient Information via /Mymdws/Match/ Service Call
		// console.log("Loading Patient Info MDWS Model from PatientModelLoadMDWS function");
        var pModel = this.getModel("PatientInfoMDWS");
        var pModelParam = query;
		this.application.PatientSSN_ID = query;
		this.application.loadMask("One moment please, retrieving Patient Information for " + query + "...");

        pModel.load(pModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
// wccConsoleLog("PatientModelLoadMDWS - Load Complete");
                wccConsoleLog("Patient Info Loaded - Processing");
				this.application.unMask();

				/* We now have a Match of data including the VPR */
				var theRecords = response.resultSet.records;
				this.application.PossiblePatients = [];
				for (i = 0; i < theRecords.length; i++) {
					var aRecord = theRecords[i];
					var theData = aRecord.getData();
					this.application.PossiblePatients[theData.id] = theData;
				}


				var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
				var query = "";
				var SSN= "";
				var PatientInfo = {}, Patient_ID, Patient_Name;
				if (CPRS_QueryString) {
					query = CPRS_QueryString.getValue();
				}

				if ("" !== query) {
					var record = patientInfo.data;
					Patient_ID = record.id;
					// Patient_Name = record.name;
					Patient_Name = record.VPR.data.items[0].fullName;
					var data = record;
					this.application.TempPatient = record;

					// Additional code here to perform proper query in MDWS for data
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var SelectPatientSection = thisCtl.getSelectPatientSection();
					var SelectPatient = thisCtl.getSelectPatient();
					var ConfirmPatient = thisCtl.getConfirmPatient();
					SelectPatientSection.show();
					SelectPatient.hide();
					PatientInfo.Patient_Name = Patient_Name;
					PatientInfo.Patient_ID = Patient_ID;
					ConfirmPatient.update( PatientInfo );
					ConfirmPatient.show();
					ConfirmPatient.el.select("button").on("click", this.ConfirmPatientClick, this);
				}
            },
            failure : function (record, operation) {
				this.application.unMask();
	            Ext.MessageBox.alert('Error', 'Patient Info failed to load properly.<br />' + operation.error);
                wccConsoleLog("Patient Info failed to load properly");
            }
        });
	},



	// Get here by either clicking on the "Query CPRS for Patient" button or hitting the "Enter" key in the SSN Field.
	PatientStoreQuery : function( ) {
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		thisCtl.getPatientInfo().hide();
		var puWinAddCumDoseCtl = this.getController("Common.puWinAddCumDose");
		puWinAddCumDoseCtl.ClearWarning();


		var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
		var query = "";
		if (CPRS_QueryString) {
			query = CPRS_QueryString.getValue();
		}
		if ("" === query) {
			return;
		}

		Ext.ComponentQuery.query('NewPlanTab PatientSelection [name=\"from_date\"]')[0].setValue("");
		Ext.ComponentQuery.query('NewPlanTab PatientSelection [name=\"to_date\"]')[0].setValue("");

// MWB - 2/12/2014 - UseNewQueryMethod is not used anyplace else... So it's a global intended for future use
		if (UseNewQueryMethod) {
			this.PatientModelLoadMDWS( query );
		}
		else {
			this.PatientModelLoadSQL( query );
		}
	},

	// Event handler for pressing the "Enter" key in the "Enter Patient Identification" field.
	QSEnter : function( fld, e, eOpts ) {
		// alert("QSEnter");
		if (e.ENTER === e.getKey()) {
			this.PatientStoreQuery();
		}
	},


	LoadAllData4PatientByMDWSGUID : function(patientMDWSGUID) {
		var pModel = this.getModel("PatientInfo");
		this.application.loadMask("Loading Patient Records... After selecting template");

		pModel.load(patientMDWSGUID, {
			scope : this,
			success : function( patientInfo, response ) {
				var recs = [];
				recs[0] = { data : patientInfo.data };

				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var NewPlanTab = thisCtl.getNewPlanTab();
				var PatientSelection = thisCtl.getPatientSelectionPanel();
				PatientSelection.collapse();

				this.resetPanels(thisCtl, "", "", "");

				var ConfirmPatient = thisCtl.getConfirmPatient();
				ConfirmPatient.hide();

				this.PatientSelected(null, recs, null);		// Load all data via multiple Ajax calls

				// Attach event handler to the "Update" and "Show" MDWS Data buttons (styled to look like links) in "view\NewPlan\PatientInfo.js"
		//		{ xtype : "container", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info" },
		//		{ xtype : "container", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info" },

				var Btns = Ext.ComponentQuery.query("NewPlanTab PatientInfo")[0].el.select("button.anchor");
				Btns.on("click", this.handleShowUpdateMDWSClickEvent, this);
				Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].show();
				Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].hide();
				Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
			},
			failure : function (record, operation) {
				this.application.unMask();
				wccConsoleLog("Patient Info failed to load properly");
			}
		});
	},

	ConfirmPatientClick : function(evt, btn) {
		var patientMDWSGUID = btn.getAttribute("pid");
		this.LoadAllData4PatientByMDWSGUID( patientMDWSGUID );
	},

	handleShowUpdateMDWSClickEvent : function( evt, btn ) {
		wccConsoleLog("handleShowUpdateMDWSClickEvent - PatientInfoTable!");

		var PatientInfo = this.application.Patient;
		var btnName = btn.getAttribute("name");
		var Update = Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0];
		var Display = Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0];
		if ("UpdateMDWSData" == btnName) {
			this.application.DataLoadCount = 1;
			this.loadMDWSData();
		}
		else if ("DisplayMDWSData" == btnName) {
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].show();
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
		}
	},










	handlePatientSelectionClickEvent : function( evt, theBtn ) {
        // console.log("handlePatientSelectionClickEvent");
		wccConsoleLog("handlePatientSelectionClickEvent - PatientInfoTable!");

		//---------------------------------
		//
		//	This block of code is in place till we can do a reliable query for Patient Information
		//	At that point we will have to create a COMS Service which will query MDWS and return either a single Patient Record
		//	OR a list of Patient Records to be used as the Store for the "SelectPatient" combo box.
		//	If a SINGLE record is returned then no combo box is required, just a single link/button to "Accept" and Use the returned Patient Record.
		//
		//---------------------------------
		// alert( "User clicked - " + theBtn.name );
		if ("SelectPatientAdminRange" === theBtn.name ) {
			// Note: For some reason MS-IE 8 receives this event even though the SelectPatientAdminRange button isn't clicked.

			// alert("Select Patient Admin Range");
			// Additional code here to perform proper query in MDWS for data
			var thisCtl = this.getController("NewPlan.NewPlanTab");
			var SelectPatientSection = thisCtl.getSelectPatientSection();
			var SelectPatient = thisCtl.getSelectPatient();
			var ConfirmPatient = thisCtl.getConfirmPatient();
			// Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0].setValue("");
			SelectPatientSection.show();
			ConfirmPatient.hide();
			SelectPatient.show();
			thisCtl.getPatientInfo().hide();
		}
		else if ("QueryCPRS4Patient" === theBtn.name ) {
			// alert("Query CPRS 4 Patient");
			// Load the "Patients" Store.
			// Upon load, find the patient looked for by DFN
			this.PatientStoreQuery();
		}
	},


	loadMDWSData : function() {
		// console.log("Loading MDWS Data - Start/End, Ajax call removed, no longer needed - MWB - 2/23/2015");
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].hide();
		this.DataLoadCountDecrement("loadMDWSData Pass");
		this.PatientDataLoadComplete("MDWS Mega Call");
/****************
		var PatientInfo = this.application.Patient;
		var URLParam = "/DFN/" + PatientInfo.DFN;
		if (this.application.PatientSSN_ID) {
			URLParam = "/SSN/" + this.application.PatientSSN_ID;
		}

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.MegaMDWS + URLParam,
			success: function( response, opts ){
// wccConsoleLog("MDWS Data - Load Complete");
console.log("Loading MDWS Data - Finished");
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success) {
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].hide();
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].hide();
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
					this.DataLoadCountDecrement("loadMDWSData Pass");
					this.PatientDataLoadComplete("MDWS Mega Call");
				}
				else {
					alert("loadMDWSData() - Error");
				}
			},
			failure : function( response, opts ) {
				this.DataLoadCountDecrement("loadMDWSData FAIL");
				this.PatientDataLoadComplete("MDWS Mega Call");
				alert("MDWS Data Load Failed...");
			}
		});
**************/
	},


//------------------------------------------------------------------------------------------------------------------------------
//
//	Start of data loading section.
//	The 5 "Load" functions here load the various pieces of Patient Data Asynchronously.
//	After each function finishes loading it's particular data set a call is made to the PatientDataLoadComplete() function
//	This function will execute and completion process (e.g. unmask and finish rendering data and managing event handlers)
//
//------------------------------------------------------------------------------------------------------------------------------

    loadAllergyInfo : function() {
		// console.log("Loading Allergy Info - Start/End, Ajax call removed, no longer needed - MWB - 2/23/2015");
		this.DataLoadCountDecrement("loadAllergyInfo PASS");
		this.PatientDataLoadComplete("Allergy Info");

/******************
        var liModel = this.getModel("Allergies");
        var liModelParam = this.application.Patient.id;

		liModel.load(liModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
                wccConsoleLog("Allergy Info Loaded - Processing");
console.log("Loading Allergy Info - Finished");
// wccConsoleLog("Allergies Model - Load Complete");
                var rawData = Ext.JSON.decode(response.response.responseText);
				var tmp = "0 Records";
				this.application.Patient.Allergies = rawData.records;

					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.DataLoadCountDecrement("loadAllergyInfo PASS");
				this.PatientDataLoadComplete("Allergy Info");

            },
            failure : function (err, response) {
                this.DataLoadCountDecrement("loadAllergyInfo FAIL");
				this.PatientDataLoadComplete("Allergy Info - FAILED Loading");
            }
        });
***************/
    },


	loadCumulativeMedDosing : function() {
// console.log("Loading Cumulative Med Dosing - Start");
		var liModel = this.getModel("PatientCumulativeDosing");
		var liModelParam = this.application.Patient.id;
		liModel.load(liModelParam, {
			scope : this,
			success : function( patientInfo, response ) {
				// console.log("Loading Cumulative Med Dosing - Finished");
				var rawData = Ext.JSON.decode(response.response.responseText);
				var tmp = "0 Records";
				this.application.Patient.CumulativeDoseTracking = rawData.records;
				this.DataLoadCountDecrement("loadCumulativeMedDosing PASS");
				this.PatientDataLoadComplete("Cumulative Medication Dose Info");
			},
			failure : function (err, response) {
				this.DataLoadCountDecrement("loadCumulativeMedDosing FAIL");
				this.PatientDataLoadComplete("Cumulative Medication Dose Info - FAILED Loading");
			}
		});
	},


    loadLabInfo : function() {
		// console.log("Loading Lab Data - Start/End, Ajax call removed, no longer needed - MWB - 2/23/2015");
		this.DataLoadCountDecrement("loadLabInfo PASS");
		this.PatientDataLoadComplete("Lab Info");
    },










	convertVPR : {
		Allergies : [],
		Vitals : [],
		Labs : [],
		Problems : [],
		vHeight : "",
		vWeight : "",
		vIdx : "",
		aIdx : "",
		lIdx : "",
		pIdx : "",
		theVPRData : {},

		extractDate : function(aDate) {
			aDate = String(aDate);
			var d1 = "", d2 = "";
			if (aDate.length >= 14 ) {
				d1 = aDate.substring(8,10) + ":" + aDate.substring(10,12) + ":" + aDate.substring(12, 14);
			}
			d2 = aDate.substring(4,6) + "/" + aDate.substring(6,8) + "/" + aDate.substring(0,4);
			if (d1 !== "") {
				d2 += " " + d1;
			}
			return (d2);
		},
		getObserved : function(aDate) {
			var d1 = aDate.split(" ");
			var d2 = d1[0].split("/");
			var d3 = d2[2] + d2[0] + d2[2];
			var d4 = d1[1].split(":");
			var d5 = d4.join("");
			return d3+d5;
		},

		ConvertAssocArray : function(theData) {
			var key, newData = [];
			for (key in theData) {
				if (theData.hasOwnProperty(key)) {
					newData.push(theData[key]);
				}
			}
			return newData;
		},

		extractAllergies : function(vDataRec) {
			var typeUID;
			if (vDataRec.uid) {
				typeUID = vDataRec.uid.split(":")[2];		// uid = "urn:va:vital:9E5A:100500:7990"
				if ("allergy" === typeUID.toLowerCase()) {
					this.Allergies.push({name: vDataRec.products[0].name, reaction : vDataRec.reactions[0].name });
					return true;
				}
			}
			return false;
		},

		extractLabs : function(rec) {
			var thisLab = { name : "", comment : "", result : "", sample : "", specimen : "", units : ""}, typeUID, nIdx, DateTaken;
			if (rec.uid) {
				typeUID = rec.uid.split(":")[2];		// uid = "urn:va:vital:9E5A:100500:7990"
				if ("lab" === typeUID.toLowerCase()) {
					nIdx = rec.observed.toString();
					DateTaken = this.extractDate(nIdx);
					thisLab.date = DateTaken;

					if (rec.typeName) {
						thisLab.name = rec.typeName;
					}
					if (rec.comment) {
						thisLab.comment = rec.comment;
					}
					if (rec.result) {
						thisLab.result = rec.result;
					}
					if (rec.sample) {
						thisLab.sample = rec.sample;
					}
					if (rec.specimen) {
						thisLab.specimen = rec.specimen;
					}
					if (rec.units) {
						thisLab.units = rec.units;
					}
					this.Labs.push(thisLab);
				}
			}
		},

		extractProblems : function(rec) {
			var thisProblem = {}, DateEntered = "", DateUpdated = "", DateOfOnset = "", Problem = "", serviceConnected = "No", statusName = "", unverified = "";
			if (rec.uid) {
				typeUID = rec.uid.split(":")[2];		// uid = "urn:va:vital:9E5A:100500:7990"
				if ("problem" === typeUID.toLowerCase()) {
					if (rec.entered) {
						DateEntered = this.extractDate(rec.entered);
					}
					if (rec.onset) {
						DateOfOnset = this.extractDate(rec.onset);
					}
					if (rec.updated) {
						DateUpdated = this.extractDate(rec.updated);
					}
					if (rec.problemText) {
						Problem = rec.problemText;
					}
					if (rec.serviceConnected) {
						serviceConnected = "Yes";
					}
					if (rec.statusName) {
						statusName = rec.statusName;
					}
					if (rec.unverified) {
						unverified = rec.unverified;
					}
					thisProblem.DateEntered = DateEntered;
					thisProblem.DateOfOnset = DateOfOnset;
					thisProblem.DateUpdated = DateUpdated;
					thisProblem.Problem = Problem;
					thisProblem.serviceConnected = serviceConnected;
					thisProblem.statusName = statusName;
					thisProblem.unverified = unverified;
					this.Problems.push(thisProblem);
				}
			}
		},

		extractVitals : function(rec) {
			var typeUID, nIdx, typeName, data, DateTaken;
			if (rec.uid) {
				typeUID = rec.uid.split(":")[2];		// uid = "urn:va:vital:9E5A:100500:7990"
				if ("vital" === typeUID.toLowerCase()) {
					nIdx = rec.observed.toString();
					if (this.vIdx !== nIdx) {
						this.vIdx = nIdx;
						DateTaken = this.extractDate(nIdx);
						this.Vitals[this.vIdx] = {Observed : nIdx, DateTaken : DateTaken, BSA : "0", BSA_Method: "-", BSA_Weight : "-", WeightFormula : "-", PS : "No Change", PSID : "N/C"};
					}
					switch (rec.typeName) {
					case "BLOOD PRESSURE":
						data = "BP";
						break;
					case "PULSE":
						data = "Pulse";
						break;
					case "PAIN":
						data = "Pain";
						break;
					case "RESPIRATION":
						data = "Respiration";
						break;
					case "TEMPERATURE":
						data = "Temperature";
						units = "Temperature_Units";
						this.Vitals[this.vIdx][units] = rec.units;
						if ("c" == rec.units) {
							// convert to F
						}
						loc = "TemperatureLocation";
						if (rec.qualifiers) {
							this.Vitals[this.vIdx][loc] = rec.qualifiers[0].name;
						}
						break;
					case "WEIGHT":
						data = "Weight";
						units = "Weight_Units";
						this.Vitals[this.vIdx][units] = rec.units;
						if ("kg" == rec.units) {
							// convert to lbs
						}
						if (this.application && this.application.Patient) {
							if ("" === this.application.Patient.Weight) {
								this.application.Patient.Weight = rec.result;
							}
						}
						break;
					case "HEIGHT":
						data = "Height";
						units = "Height_Units";
						this.Vitals[this.vIdx][units] = rec.units;
						if ("cm" == rec.units) {
							// convert to inches
						}
						if ("m" == rec.units) {
							// convert to inches
						}
						if (this.application && this.application.Patient) {
							if ("" === this.application.Patient.Height) {
								this.application.Patient.Height = rec.result;
							}
						}
						break;
					default:
						data = rec.typeName;
						break;
					}
					this.Vitals[this.vIdx][data] = rec.result;
					return true;
				}
			}
			return false;
		},

		parseVPR : function (vData) {
			var rec, i, flg, vals, theVPRData, age, name, dob, yr, mon, m, day, birthDate, rootObj, 
				gc = "", 
				today=new Date(),
				len = vData.length;
			this.Allergies = [];
			this.Vitals = [];
			this.Labs = [];
			this.Problems = [];
			

			for (i = 0; i < len; i++) {
				rec = vData[i];
				if (rec.hasOwnProperty("genderCode")) {
					rootObj = rec;
					name = rootObj.fullName;
					dob = rootObj.dateOfBirth.toString();
					yr = dob.slice(0, 4);
					mon = dob.slice(4, 6);
					day = dob.slice(6, 8);
					dob = mon + "/" + day + "/" + yr;
					birthDate = new Date(dob);
					age = today.getFullYear() - birthDate.getFullYear();
					m = today.getMonth() - birthDate.getMonth();
					if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
						age--;
					}
					// "urn:va:pat-gender:M"
					vals = rec.genderCode.split(':');
					gc = vals[vals.length-1];
					rootObj.dob = dob;
					rootObj.age = age;
					rootObj.gender = gc;
				}
				flg = this.extractVitals(rec);
				if (!flg) {
					flg = this.extractAllergies(rec);
					if (!flg) {
						theLabs = this.extractLabs(rec);
						if (!flg) {
							flg = this.extractProblems(rec);
						}
					}
				}
			}
			var theVitals = this.ConvertAssocArray(this.Vitals);

			theVPRData = { "Allergies" : this.Allergies, "Vitals" : theVitals, "Labs" : this.Labs, "Problems" : this.Problems, "rootObj" : rootObj };
			return theVPRData;
		}
	},

	copyNonVitals2Vitals : function(SQLRec) {
		/**
		var j, vRec, vitals = this.application.Patient.Vitals, vLen = this.application.Patient.Vitals.length;
		for (j = 0; j < vLen; j++) {
			if (SQLRec.DateTaken === vitals[j].DateTaken) {
				// console.log("Found Vital Match - " + SQLRec.DateTaken + " - Merging records");
				vRec = vitals[j];
				if ("N/C" !== SQLRec.PSID) {
					vRec.PSID = SQLRec.PSID;
					vRec.PS = SQLRec.PS;
				}
				//if (!vRec.MostRecent) {
					//vRec.MostRecent = true;
					if (!vRec.BSA) {
						vRec.BSA = SQLRec.BSA;
					}
					if (!vRec.BSA_Method) {
						vRec.BSA_Method = SQLRec.BSA_Method;
					}
					if (!vRec.BSA_Weight) {
						vRec.BSA_Weight = SQLRec.BSA_Weight;
					}
					if (!vRec.WeightFormula) {
						vRec.WeightFormula = SQLRec.WeightFormula;
					}
					if (!vRec.PS) {
						vRec.PS = SQLRec.PS;
					}
					if (!vRec.PSID) {
						vRec.PSID = SQLRec.PSID;
					}
					if (!vRec.TemperatureLocation) {
						vRec.TemperatureLocation = SQLRec.TemperatureLocation
					}
**/
						/***
					vRec.BSA = SQLRec.BSA;
					vRec.BSA_Method = SQLRec.BSA_Method;
					vRec.BSA_Weight = SQLRec.BSA_Weight;
					vRec.WeightFormula = SQLRec.WeightFormula;
					vRec.PS = SQLRec.PS;
					vRec.PSID = SQLRec.PSID;
					vRec.TemperatureLocation = SQLRec.TemperatureLocation
						 ***/
				//}
/**
				return;
			}
			else {
				if ("N/C" !== SQLRec.PSID) {
					vRec = [];
					vRec.PSID = SQLRec.PSID;
					vRec.PS = SQLRec.PS;
					vRec.DateTaken = SQLRec.DateTaken;
					vitals.push(vRec);
				}
			}
		}
**/
	},

	Convert2AssocArray : function(theData) {
		var i, k, rec, key, key1, key2, recLen = theData.length, assocRec, assocArray = [];
		for (i = 0; i < recLen; i++) {
			key = "";
			key1 = "";
			key2 = "";
			rec = theData[i];
			k = rec.DateTaken;
			try {
				if (k) {
					key = k.split(" ");
					
					key1 = key[0].split("/");
					key1 = key1[2] + key1[0] + key1[1];
					if (key.length > 1) {
						key2 = key[1].split(":");
						key2 = key2[0] + key2[1] + key2[2];
					}
					key = key1 + key2;
				}
			}
			catch (e) {
				wccConsoleLog("NewPlanTab - Convert2AssocArray - Error");
			}
			if ("" !== key ) {
				if (assocArray.hasOwnProperty(key)) {
					assocRec = assocArray[key];
					for (k in assocRec) {
						if (assocRec.hasOwnProperty(k) && rec.hasOwnProperty(k)) {
							if (!assocRec[k] || "" === assocRec[k]) {
								assocRec[k] = rec[k];
							}
						}
						else if (rec.hasOwnProperty(k)) {
							assocRec[k] = rec[k];
						}
					}
				}
				else {
					assocArray[key] = rec;
				}
			}
		}
		return assocArray;
	},

	clearMostRecent : function() {
		var j, vitals = this.application.Patient.Vitals, vLen = this.application.Patient.Vitals.length;
		for (j = 0; j < vLen; j++) {
			vitals[j].MostRecent = false;
		}
	},

	MergeWithVPR_Array : function(SQLRecords) {
		var i, key, key1, sRec, vRec, VPR_vitals;
		VPR_vitals = this.Convert2AssocArray(this.application.Patient.ParsedVPR.Vitals);
		if (SQLRecords.length > 0) {
			SQLRecords = this.Convert2AssocArray(SQLRecords);
			for (key in VPR_vitals) {
				if (VPR_vitals.hasOwnProperty(key)) {
					if (SQLRecords.hasOwnProperty(key)) {
						vRec = VPR_vitals[key];
						sRec = SQLRecords[key];
						delete SQLRecords[key];
						for (key1 in sRec) {
							if (sRec.hasOwnProperty(key1)) {
								if (vRec.hasOwnProperty(key1)) {
									if (vRec[key1] == "") {
										vRec[key1] = sRec[key1];
									}
								}
								else {
									vRec[key1] = sRec[key1];
								}
							}
						}
					}
				}
				else if (SQLRecords.hasOwnProperty(key)) {
					VPR_vitals[key] = SQLRecords[key];
					delete SQLRecords[key];
				}
				else {
					wccConsoleLog("NewPlanTab - MergeWithVPR_Array - SQLRecords.hasOwnProperty = FALSE");
				}
			}

			var tmpGender = this.application.Patient.Gender;

			for (key in SQLRecords) {
				if (SQLRecords.hasOwnProperty(key)) {
					if (VPR_vitals.hasOwnProperty(key)) {
						wccConsoleLog("NewPlanTab - MergeWithVPR_Array - VPR_vitals.hasOwnProperty = TRUE");
					}
					else {
						SQLRecords[key].Observed = this.convertVPR.getObserved(SQLRecords[key].DateTaken);
						VPR_vitals[key] = SQLRecords[key];
					}
				}
			}

			var retVitals = [];
			for (key in VPR_vitals) {
				if (VPR_vitals.hasOwnProperty(key)) {
					VPR_vitals[key].Gender = tmpGender;
					retVitals.push(VPR_vitals[key]);
				}
			}
			retVitals.sort(function (a, b) {
				aD = new Date(a.DateTaken);
				bD = new Date(b.DateTaken);
				return aD>bD ? -1 : aD<bD ? 1 : 0;
			});
			return retVitals;
		}
	},


/* Note: If there are no current vitals in SQL we still need to process any vitals in the VistA VPR */
	loadVitals : function(RetCode) {
		var pVitalsModel = this.getModel("Vitals"), pVitalsModelParam = this.application.Patient.id;
		pVitalsModel.load(pVitalsModelParam, {
			scope : this,
			success : function( patientInfo, response ) {
				if (!RetCode) {
					RetCode = "Update Vitals";
				}
				var rawData = Ext.JSON.decode(response.response.responseText);
				if (rawData && rawData.records) {
					var mergedVitals = this.MergeWithVPR_Array(rawData.records);
					this.application.Patient.Vitals = mergedVitals;
				}
				this.DataLoadCountDecrement("loadVitals PASS");
				this.PatientDataLoadComplete(RetCode);
			},
			failure : function (err, response) {
				if (!RetCode) {
					RetCode = "Update Vitals";
				}
				this.DataLoadCountDecrement("loadVitals FAIL");
				this.PatientDataLoadComplete(RetCode + " - FAILED Loading");
			}
		});
	},


	reloadVPR : function() {
				Ext.Ajax.request({
					scope : this,
					url: Ext.URLs.LoadVPR + "/" + this.application.Patient.EoTS_ID,
					success: function( response, opts ){
						this.application.unMask();
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						if (resp.success) {
							if (resp.records[0]) {
								this.application.Patient.EoTS = resp.records[0];
								Ext.widget("ViewEndTreatmentSummary");
							}
							else {
								alert("No records available for this EoTS");
							}
						}
						else {
							alert("load EoTS - Error");
						}
					},
					failure : function( response, opts ) {
						this.application.unMask();
						alert("EoTS Data Load Failed...");
					}
				});
	},

    /**
     *
     * Gets the current and historical templates applied to the patient from the "Patient_Assigned_Templates", "Master_Template", "EoTS" and "Lookup" tables
     *
     **/
    loadAllTemplatesApplied2Patient : function() {
// console.log("Loading All Templates Applied 2 Patient - Start");
        // console.log("loadAllTemplatesApplied2Patient Entry Point");
        var phModel = this.getModel("AllTemplatesApplied2Patient");
        var phModelParam = this.application.Patient.id;
        phModel.load(phModelParam, {
            scope : this,
            success : function( AllTemplatesApplied2Patient, response ) {
// console.log("Loading All Templates Applied 2 Patient - Finished");
                this.application.Patient.AllTemplatesApplied2Patient = AllTemplatesApplied2Patient;
                this.DataLoadCountDecrement("loadAllTemplatesApplied2Patient Part 1 - PASS");
                this.PatientDataLoadComplete("All Templates Applied");
                var current = AllTemplatesApplied2Patient.get("current");
                if (current && current[0]) {
                    current = current[0];
                    if (current.TemplateID) {
                        this.LoadSpecifiedTemplate(current.TemplateID, "loadAllTemplatesApplied2Patient");
                    }
                    else {
                        this.DataLoadCountDecrement("loadAllTemplatesApplied2Patient Part 2 - PASS");
                        this.PatientDataLoadComplete("No Current Template Applied to patient to load");
                    }
                }
            },
            failure : function (err, response) {
                this.DataLoadCountDecrement("loadAllTemplatesApplied2Patient Part 1 - FAIL");
                this.PatientDataLoadComplete("Templates - Failed to load - " + response.error);
            }
        });
    },




	loadTemplates : function() {
// console.log("Loading Templates - Start");
        var phModel = this.getModel("PatientTemplates");
        var phModelParam = this.application.Patient.id;
        phModel.load(phModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
// console.log("Loading Templates - Finished");
// wccConsoleLog("PatientTemplates Model - Load Complete");
				var rawData = Ext.JSON.decode(response.response.responseText);
                // First take all the data received and put it into a local JSON object for the TPL to process
                wccConsoleLog("Patient Templates Loaded - Processing");

				this.application.Patient.TemplateHistory = rawData.records;


					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.DataLoadCountDecrement("loadTemplates PASS");

				this.PatientDataLoadComplete("Templates");


            },
            failure : function (err, response) {
// wccConsoleLog("PatientTemplates Model - Load FAILED - " + response.error);
                wccConsoleLog("PatientHistory store failed to load properly - " + response.error);
				this.DataLoadCountDecrement("loadTemplates FAIL");

				this.PatientDataLoadComplete("Templates - Failed to load - " + response.error);
            }
        });
//
//	List of Templates for patient
//
	},


	getFNRiskInfo : function(FNRisk) {
		var FNLevelInfo = FNRisk < 10 ? "Low Risk" : FNRisk <= 20 ? "Intermediate Risk" : "High Risk";
		var URL = Ext.URLs.MedRisks + "/Type/" + (FNRisk < 10 ? "Neutropenia-1" : FNRisk <= 20 ? "Neutropenia-2" : "Neutropenia-3");
		Ext.Ajax.request({
			scope : this,
			url: URL,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				/* For some reason the text is double encoded (e.g. &lt; == &amp;lt;) */
				resp = Ext.util.Format.htmlDecode(resp);
				resp = Ext.util.Format.htmlDecode(resp);
				if (this.application.Patient) {
					if (this.application.Patient.OEMRecords) {
						this.application.Patient.OEMRecords.NeutropeniaRecommendation = resp;
						this.application.Patient.OEMRecords.FNRiskDetails = resp;
					}
				}

				this.application.unMask();
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.application.unMask();
				Ext.MessageBox.alert("Retrieve Error", "Error attempting to retrieve information on Neutropenia Level - " + resp );
			}
		});
	},

	getEmoLevelInfo : function(ELevel) {
		var eLevel1 = ELevel.split(" ")[0];
		var x = "";
		switch (eLevel1) {
			case "Minimal" :
			case "Low":
				x = "Emesis-1";
				break;

			case "Low" :
			case "Medium":
				x = "Emesis-2";
				break;

			case "Moderate" :
			case "Moderate":
				x = "Emesis-3";
				break;

			case "High" :
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
				// console.log("getEmoLevelInfo from Site Config - Complete");
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				resp = Ext.util.Format.htmlDecode(resp);
				resp = Ext.util.Format.htmlDecode(resp);
				this.application.unMask();
				if (this.application.Patient) {
					if (this.application.Patient.OEMRecords) {
						this.application.Patient.OEMRecords.ELevelRecommendation = resp;
					}
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.application.unMask();
				Ext.MessageBox.alert("Retrieve Error", "Error attempting to retrieve information on Emetogenic Level - " + resp );
			}
		});
	},

	manageOrderRecordsAfterLoading : function(OEMRecords) {

			// If BSA_Dose is empty then calculate it for each record and save that record back.
			// BUT we need to calculate the BSA value and BSA_Weight before we load the records...
			// Then walk through theData.OEMRecords;
			var a, b, c, aRec, bRec, bRecUnits, calcDose, updateRecord = false, tmpDose, Dose, Units,
				theRecords, oRecLen,
				tRecords, oTherapyLen;

//			if (this.application.Patient && this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
//				theRecords = this.application.Patient.OEMRecords.OEMRecords;
				theRecords = OEMRecords;
				oRecLen = theRecords.length;
				for (a = 0; a < oRecLen; a++) {
					aRec = theRecords[a];
					if (aRec.Therapy) {
						oTherapyLen = aRec.Therapy.length;
						for (b = 0; b < oTherapyLen; b++) {
							bRec = aRec.Therapy[b];
							bRecUnits = bRec.DoseUnits.toUpperCase();
							calcDose = false;

							if (bRecUnits.search("M2") > 0 || bRecUnits.search("KG") > 0 || bRecUnits.search("AUC") >= 0 ) {
								calcDose = true;
							}

							if (calcDose) {
								if ("" === bRec.BSA_Dose || "NaN mg" === bRec.BSA_Dose) {
									if (bRecUnits.search("M2") > 0) {
										Dose = bRec.Dose * Patient.BSA;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										bRec.BSA_Dose = Dose + " " + Units;
										updateRecord = true;
									}
									else if	(bRecUnits.search("KG") > 0) {
										Dose = bRec.Dose * Patient.BSA_Weight;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										bRec.BSA_Dose = Dose + " " + Units;
										updateRecord = true;
									}
									else if (bRecUnits.search("AUC") >= 0) {
										Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
										bRec.BSA_Dose = Dose;
										updateRecord = true;
									}
								}
								else {
									// MWB - 7/12/2012 - Fix to update Dosage Calculations every time patient info is loaded.
									// DO NOT IMPLEMENT until further notice...
									// Implement as per SIC's e-mail - 7/12/2012 08:56 AM

									if (bRecUnits.search("M2") > 0) {
										Dose = bRec.Dose * Patient.BSA;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										tmpDose = Dose + " " + Units;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}
									else if	(bRecUnits.search("KG") > 0) {
										Dose = bRec.Dose * Patient.BSA_Weight;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										tmpDose = Dose + " " + Units;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}
									else if (bRecUnits.search("AUC") >= 0) {
										Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
										tmpDose = Dose;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}

								}
							}
						}
					}
					else {
						oTherapyLen = aRec.Therapy.length;
						for (b = 0; b < oTherapyLen; b++) {
							bRec = aRec.Therapy[b];
							this.UpdateOEMRecords(aRec, bRec);
						}
					}
				}
//			}
	},

	loadOrderRecords : function( ) {
// console.log("Loading Orders - Start");
		var PatientID = this.application.Patient.id;
		var OEMRecordsModel = this.getModel("OEMRecords");
		OEMRecordsModel.load( PatientID, {
			scope: this,
			success: function (TemplateData, response) {
				try {
// console.log("Loading Orders - Finished");
					wccConsoleLog("Template Data Loaded - Processing");
					var theData = TemplateData.data;
					theData.PatientName = this.application.Patient.name;
					theData.RegimenName = this.application.Patient.TemplateName;
					theData.RegimenDescription = this.application.Patient.TemplateDescription;

					this.application.Patient.OEMRecords = theData;
					this.getEmoLevelInfo(theData.ELevelName);
					this.getFNRiskInfo(theData.FNRisk);
					this.manageOrderRecordsAfterLoading(theData);
					var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.Chemotherapy");
					thisCtl.ChemoBioSectionHandler(true);

				}
				catch (err) {
					var errMsg1 = "ERROR in parsing data for Template " + this.application.Patient.TemplateName;
					alert("ERROR in Loading Order Entry Management Record Data for Template : " + this.application.Patient.TemplateName);
					wccConsoleLog(errMsg1);
					wccConsoleLog(err.message + " @ Line# " + err.lineNo);
				}

//				this.DataLoadCountDecrement("loadOrderRecords PASS");
//				this.PatientDataLoadComplete("OEM Records");

//				if (this.application.DataLoadCount <= 0) {
//					PatientInfo = this.application.Patient;
//					PatientInfo.OEMDataRendered = false;
//					this.application.fireEvent("DisplayOEMData", PatientInfo);
//				}


			},
			failure: function (err) {
				wccConsoleLog("Template Data failed to load properly");
				// alert("Warning - No Order Information available for Patient " + this.application.Patient.name);
//				this.DataLoadCountDecrement("loadOrderRecords FAIL");
//				this.PatientDataLoadComplete("Templates - Failed to load");
			}
		});
	},

    //-------------------------------------------------------------------------
    //
    //	Patient Selected - Phase 1 for this panel
    //	Causes Patient Info
    //	(including Patient History, Laboratory Information and CTOS Tabset) to be displayed
    //
	//	MWB 10 Feb 2012 - Made several minor changes for code cleanup and
	//		sorted the PatientMeasurements for disply of most recent measurements first
	//
	//	MWB 22 Mar 2012 - This is the only point where the Select Event for the Combo Box is trapped.
	//		The end of this event handler fires off a "PatientSelected" event which is intercepted throughout the application
	//		When we change from a Combo Box to an Edit Field to enter Patient ID this should be the only place which needs to get changed.
	//
	PatientSelected : function(combo, recs, eOpts) {
		wccConsoleLog("NewPlanTab - Patient Selected has changed or been refreshed");
		if(null === recs){		// MWB 10 Feb 2012 - If the recs come back as null then something's wrong, exit the function
			return;
		}

		// The recs data comes from either selecting an entry in a combo box (SelectPatient), or by virtue of a query
		// (via either the PatientModelLoadMDWS() or PatientModelLoadSQL()) into the recs array.
		var piData;
		if (recs[0].data) {
			piData = recs[0].data;
		}
		else {
			piData = recs[0];
		}


		this.application.Patient = piData;
		var pVPR = this.convertVPR.parseVPR(this.application.TempPatient.VPR.data.items);
		this.application.Patient.ParsedVPR = pVPR;
		this.application.Patient.Allergies = pVPR.Allergies;
		this.application.Patient.Vitals    = pVPR.Vitals;
		this.application.Patient.name      = pVPR.rootObj.fullName;
		this.application.Patient.Gender    = pVPR.rootObj.gender;
		this.application.Patient.Age       = pVPR.rootObj.age;
		this.application.Patient.DOB       = pVPR.rootObj.dob;

		// Get a handle to the frameset itself
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var fs = thisCtl.getPatientInfo();

		// Update the legend (via the setTitle method) of the Frameset and expand it
		fs.setTitle("<h2>Patient Information for - " + this.application.Patient.name + "</h2>");
		fs.show();
		fs.expand();

		// Display the selected patient's info in the table via it's template
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].show();
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();

		var theMedRemindersPanel = this.getPatientInfoMedReminders();
		var theBtns = Ext.ComponentQuery.query("NewPlanTab PatientInfo MedRemindersPanel button");
		for (i = 0; i < theBtns.length; i++) {
			theBtns[i].hide();
		}
		this.getPatientInfoMedRemindersTitle().setReadOnly(true);
		this.getPatientInfoMedRemindersDescription().setReadOnly(true);
		this.getPatientInfoMedRemindersWhenCycle().setReadOnly(true);
		this.getPatientInfoMedRemindersWhenPeriod().setReadOnly(true);
		var theTemplateID = this.application.Patient.TemplateID;
		this.getAnyMedReminders4Template(theTemplateID);




			// MWB 02 Feb 2012 - Clear out the CTOS Tab when changing the patient
		var piTable = thisCtl.updatePITable("");

		piTable.collapse();

		var piTable1 = thisCtl.getPatientInfoTableInformation();
		piTable1.update("");

		var btn;
		if ("1" === SessionTemplateAuthoring) {
			var CTOSData = thisCtl.getCTOSDataDsp();
			CTOSData.update("");
			CTOSData.hide();
			btn = this.getEditTemplateBtn();
			if (btn) {
				btn.hide();
			}
		}
		if ("Provider" === Sessionrole || "All Roles" === Sessionrole) {
			btn = this.getApplyTemplateBtn();
			if (btn) {
				btn.hide();
			}
		}

		this.application.PatientSelectedRecs = recs;
		this.application.PatientSelectedOpts = eOpts;

		// this.MaskPITable("Loading Patient Information");
		this.application.loadMask("Loading Patient Records... For selected patient");
		this.application.DataLoadCount = 10;		// Count of # of modules to load
		/* Modules to load - Update this count when a new module is added
		 *	MDWS Mega Call Loaded - loadMDWSData
		 *	Lab Info Loaded - loadLabInfo
		 *	Allergy Info Loaded - loadAllergyInfo
		 *	Vitals Loaded - loadVitals
		 *	Templates Loaded - loadTemplates
		 *	All Templates Applied Loaded - loadAllTemplatesApplied2Patient
		 *	OEM Records Loaded - loadOrderRecords
		 *	Current Applied Template Loaded - LoadSpecifiedTemplate
		 *	Current Applied Template Loaded --- Yes this module is called twice for some reason, need to find out why.
		 */

// wccConsoleLog("Loading Patient Records");
		// this.Modules2Load.push({func : this.loadOrderRecords, name : "loadOrderRecords"});
		this.Modules2Load.push({func : this.loadAllergyInfo, name : "loadAllergyInfo"});
		this.Modules2Load.push({func : this.loadLabInfo, name : "loadLabInfo"});
		this.Modules2Load.push({func : this.loadMDWSData, name : "LoadMDWSData"});

		this.Modules2Load.push({func : this.loadCumulativeMedDosing, name : "loadCumulativeMedDosing"});

		this.Modules2Load.push({func : this.loadAllTemplatesApplied2Patient, name : "loadAllTemplatesApplied2Patient - PatientSelected"});
		this.Modules2Load.push({func : this.loadTemplates, name : "loadTemplates - Templates"});
		this.Modules2Load.push({func : this.loadVitals, name : "loadVitals - Vitals"});



			/**
		this.loadMDWSData();					// module 1
		this.loadLabInfo();						// module 2
		this.loadAllergyInfo();					// module 3
		this.loadVitals("Vitals");				// module 4
		this.loadTemplates("Templates");		// module 5
		this.loadAllTemplatesApplied2Patient("PatientSelected");
		this.loadOrderRecords();				// module 6
		this.loadCumulativeMedDosing();
			**/

		var puWinSelCancerCtl = this.getController("Common.puWinSelCancer");
		puWinSelCancerCtl.getDiseaseHistory(this.application.Patient);

        if (this.application.Patient.TemplateID) {
            this.LoadSpecifiedTemplate(this.application.Patient.TemplateID, "PatientSelected");
        }
        else {
            this.DataLoadCountDecrement("PatientSelected No Current Template Applied decrement of DataLoadCount");
            this.DataLoadCountDecrement("PatientSelected No Current Template Applied Second decrement of DataLoadCount");
            this.PatientDataLoadComplete("No Current Template Applied to patient to load");
        }
    },
    //
    //
    //	END Patient Selected
    //
    //-------------------------------------------------------------------------




	UpdateOEMRecords : function(aRec, bRec) {
		// console.log("UpdateOEMRecords");
		try {
			var oemEditRec = {
				"TemplateID" : this.application.Patient.OEMRecords.id,
				"OEMRecordID" : aRec.id,
				"Order_ID" : bRec.Order_ID,
				"TherapyID" : bRec.id,
				"TherapyType" : "Therapy",		// Because we're only looking at the aRec.Therapy array (first if() of the initial for(a = 0; a < oRecLen; a++) loop above
				"Instructions" : bRec.Instructions,
				"AdminTime" : bRec.AdminTime,
				"MedID" : bRec.MedID,
				"Med" : bRec.Med,
				"Reason" : (bRec.Reason || ""),		// This variable may not be set initially
				"Dose" : bRec.Dose,
				"BSA_Dose" : bRec.BSA_Dose,
				"Units" : bRec.DoseUnits,
				"InfusionMethod" : bRec.AdminMethod,
				"FluidType" : bRec.FluidType,
				"FluidVol" : bRec.FluidVol,
				"FlowRate" : bRec.FlowRate,
				"InfusionTime" : bRec.InfusionTime,
					// These variables aren't needed for a Therapy record as there's no "optional" dosing allowed for a "Therapy", only for Pre/Post.
				"Dose2" : "",
				"BSA_Dose2" : "",
				"Units2" : "",
				"InfusionMethod2" : "",
				"FluidType2" : "",
				"FluidVol2" : "",
				"FlowRate2" : "",
				"InfusionTime2" : ""
			};

			var oemRec = Ext.create(Ext.COMSModels.Edit_OEMRecord, oemEditRec);		// Create an instance of this model with the data specified
			oemRec.save();
		}
		catch (ee) {
			var ErrorObj = ee;
			var errMsg = "";
			var o;
			for (o in ee) {
				if (ee.hasOwnProperty(o)) {
					errMsg += o + "\n";
				}
			}
			alert("Error - Saving updated OEM Record in NewPlan Controller - " + ee.message + "\n" + errMsg );
		}
	},

/*********************/
	reAddHandlers : function() {
		// console.log("Re-Assigning event handlers in 30 seconds");
		// Ext.Function.defer( this.AssignBtnHandlers, 30000, this );
	},
/**********************/

	buildTemplateInfo : function(thisCtl, Patient, comeFrom) {
        var TemplateInfo, 
            patientTemplates = thisCtl.getPatientTemplates(),
            currentTemplates = this.application.Patient.CurrentTemplatesApplied2Patient,
            historicalTemplates = this.application.Patient.HistoricalTemplatesApplied2Patient,
            numRecords = 0;
        
        if (currentTemplates) {
            numRecords += currentTemplates.length;
        }
        if (historicalTemplates) {
            numRecords += historicalTemplates.length;
        }

        TemplateInfo = {};
        TemplateInfo.Historical = this.application.Patient.HistoricalTemplatesApplied2Patient;
        TemplateInfo.Current = this.application.Patient.CurrentTemplatesApplied2Patient;

        // Render # of templates for initial display of the panel - MWB - 11/11/2013
        patientTemplates.update( TemplateInfo );

        var strRecs = "No Records Available";
        if (1 === numRecords ) {
            strRecs = numRecords + " Record";
        }
        else if (numRecords > 1) {
            strRecs = numRecords + " Records";
        }
        this.resetTRSPanel(thisCtl, strRecs);
        return patientTemplates;
	},

	DataLoadCountDecrement : function(module) {
		this.application.DataLoadCount--;
		wccConsoleLog("DataLoadCountDecrement - (" + this.application.DataLoadCount + ") " + module);
	},


	fieldContainerWalk : function(item, y, z) {
		if (this.application.Patient.AllTemplatesApplied2Patient && "0" == item.inputValue) {
			var current = this.application.Patient.AllTemplatesApplied2Patient.get("current");
			var label;
			if (current) {
				label = "Select <span class=\"em\">\"" + current[0].TemplateDescription + "\"</span> template (as currently appled to patient)";
			}
			else {
				label = "No Template currently applied to this patient";
			}
			item.el.down('.x-form-cb-label').update(label);
		}
	},


	getObjLenMsg : function (Obj) {
		var tmp = "No Records Available", v, key, len = 0;
		if (Obj) {
			v = Obj;
			for (key in v) {
				if (v.hasOwnProperty(key)) {
					len++;
				}
			}
		if (len > 0) {
			tmp = len + " Record";
			tmp += (1 === len) ? "" : "s";
			}
		}
		return tmp;
	},

	updateKnownProblems : function() {
		var buf =  "Existing Conditions ";
		var tmp = "No Records Available";
		var KnownProblemsPanel = this.getKnownProblems();
		var KnownProblemsData = this.application.Patient.ParsedVPR.Problems;

		if (KnownProblemsData && KnownProblemsData.length > 0) {
			tmp = KnownProblemsData.length;
			if (tmp > 1) {
				tmp = tmp + " Records";
			}
			else {
				tmp = tmp + " Record";
			}
		}
		buf += "<span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>";
		KnownProblemsPanel.setTitle(buf);
		KnownProblemsPanel.getStore().loadData(KnownProblemsData);
	},


	updateLabInfo : function() {
		var LaboratoryInfoPanel = this.getLaboratoryInfo();
		var LabsData = this.application.Patient.ParsedVPR.Labs;
		tmp = this.getObjLenMsg(LabsData);
		this.resetLabInfoPanelPanelTitleBar(this, tmp);
		LaboratoryInfoPanel.getStore().loadData(LabsData);
	},

	PatientDataLoadComplete : function(Loaded) {
		wccConsoleLog("PatientDataLoadComplete - " + Loaded);
		var DataLoadCount = this.application.DataLoadCount;
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var Patient = this.application.Patient;
		var piTableInfo, patientTemplates, dspVSHTemplateData, VSHTemplateDataBtns;
		var KnownProblems, CumDoseCtl;

		if ("All Templates Applied" === Loaded) {
			var historical = this.application.Patient.AllTemplatesApplied2Patient.get("historical"),
				current = this.application.Patient.AllTemplatesApplied2Patient.get("current");
			this.application.Patient.CurrentTemplatesApplied2Patient = current;
			this.application.Patient.HistoricalTemplatesApplied2Patient = historical;
			if (current && current[0]) {
				current = current[0];
				if (!this.application.Patient.AppliedTemplate) {
					this.application.Patient.AppliedTemplate = {};
					}
				this.application.Patient.AppliedTemplate.id = current.TemplateID; 
				this.application.Patient.AppliedTemplate.Description = current.TemplateDescription;
				var scratch = this.getWhat2DoBtns();
				scratch.show();
				scratch.items.each(this.fieldContainerWalk,this);

				this.application.Patient.AppliedTemplate.Name = current.TemplateName;
				this.application.Patient.AppliedTemplateID = current.TemplateID;
				this.application.Patient.TemplateDescription = current.TemplateDescription;
				this.application.Patient.TemplateName = current.TemplateName;
				this.application.Patient.TemplateID = current.TemplateID;
				this.application.Patient.TreatmentStart = current.DateStarted;
				this.application.Patient.TreatmentEnd = current.DateEnded;
			}
			patientTemplates = this.buildTemplateInfo(thisCtl, Patient, "PatientDataLoadComplete Update Templates Loaded");
			COMS.Patient = this.application.Patient;
			COMS.Application = this.application;
		}

		if ("No Current Template Applied to patient to load" === Loaded) {
				var selCTOSTemplateObj = this.getSelCTOSTemplate();
				var theController = this.getController("Common.selCTOSTemplate");
				theController.resetTemplateSrc(selCTOSTemplateObj);
				selCTOSTemplateObj.show();
		}

		if ("Update BSA" === Loaded) {
			piTableInfo = thisCtl.getPatientInfoTableInformation();
			piTableInfo.update(Patient);
			CumDoseCtl = this.getController("Common.puWinAddCumDose");
			CumDoseCtl.UpdateCumDoseInfo( );
			Ext.Function.defer( this.AssignBtnHandlers, 2000, this );
		}

		if ("Update Vitals" === Loaded) {
			var ND_VitalSignsHistory = Ext.ComponentQuery.query("NursingDocs_GenInfo fieldset[title=\"Vital Signs - Historical\"] VitalSignsHistory")[0];
			if (ND_VitalSignsHistory) {
				globalAppPatientScope = this;
				ND_VitalSignsHistory.update(Patient);
			}

			PatientHistoryVitalStats = thisCtl.getVitalSigns();
			PatientHistoryVitalStats.update(Patient);
			KnownProblems = this.getKnownProblems();
			KnownProblems.update(this.application.Patient.ParsedVPR.Problems);

			tmp = this.getObjLenMsg(this.application.Patient.Vitals);
			this.resetVitalsPanel(thisCtl, tmp);

			dspVSHTemplateData = this.getVitalSigns();
			VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
			VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);

			dspVSHTemplateData = this.getNDGI_VitalSigns();
			if (dspVSHTemplateData && dspVSHTemplateData.rendered) {
				VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);
			}

			COMS.Patient = this.application.Patient;
			COMS.Application = this.application;
		}


		var Modules2Load = this.Modules2Load;
		if (Modules2Load.length > 0) {
			var Module = Modules2Load.pop();
			var func2Call = Ext.bind(Module.func, this);
			// console.log("Running " + Module.name);
			func2Call();
		}
		else {
			DataLoadCount = 0;
		}


		if (DataLoadCount <= 0) {		// All remote data for this patient has been loaded
			var len, tmp;
			var piTable;
			var PatientHistoryVitalStats;

			if (Ext.Date.isEqual(new Date(Patient.TreatmentStart), new Date(new Date().toDateString()))) {
				var PostStatus = " - Rest Day";
				if (Patient.TreatmentStatus.search("Admin Day") >= 0) {
					PostStatus = " - Admin Day";
				}
				Patient.TreatmentStatus = "Template Applied" + PostStatus;
			}

			this.application.unMask();
			this.getCTOS().show();

			thisCtl.getPatientInfo().expand();

			// piTable = thisCtl.getPatientInfoTable();
			piTable = thisCtl.updatePITable(Patient);

			piTable.show();

			piTableInfo = thisCtl.getPatientInfoTableInformation();
			piTableInfo.update(Patient);
			piTableInfo.show();

			CumDoseCtl = this.getController("Common.puWinAddCumDose");
			CumDoseCtl.UpdateCumDoseInfo( );

			this.updateKnownProblems();
			this.updateLabInfo();

			PatientHistoryVitalStats = thisCtl.getVitalSigns();
			PatientHistoryVitalStats.update(Patient);
			tmp = this.getObjLenMsg(this.application.Patient.Vitals);
			this.resetVitalsPanel(thisCtl, tmp);

			dspVSHTemplateData = this.getVitalSigns();
			VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
			VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);

			dspVSHTemplateData = this.getNDGI_VitalSigns();
			if (dspVSHTemplateData && dspVSHTemplateData.rendered) {		// Make sure the Vital Signs in the ND/GenInfo tab are rendered before trying to attach.
				VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);
			}

			patientTemplates = this.buildTemplateInfo(thisCtl, Patient, "PatientDataLoadComplete AND DataLoadCount < 0");
			patientTemplates.show();



			this.loadOrderRecords();
// console.log("Load Order Records from - PatientModelLoadSQLPostTemplateApplied");
/**
this.Modules2Load.push({func : this.loadOrderRecords, name : "loadOrderRecords"});

			// If BSA_Dose is empty then calculate it for each record and save that record back.
			// BUT we need to calculate the BSA value and BSA_Weight before we load the records...
			// Then walk through theData.OEMRecords;
			var a, b, c, aRec, bRec, bRecUnits, calcDose, updateRecord = false, tmpDose, Dose, Units,
				theRecords, oRecLen,
				tRecords, oTherapyLen;

			if (this.application.Patient && this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
				theRecords = this.application.Patient.OEMRecords.OEMRecords;
				oRecLen = theRecords.length;
				for (a = 0; a < oRecLen; a++) {
					aRec = theRecords[a];
					if (aRec.Therapy) {
						oTherapyLen = aRec.Therapy.length;
						for (b = 0; b < oTherapyLen; b++) {
							bRec = aRec.Therapy[b];
							bRecUnits = bRec.DoseUnits.toUpperCase();
							calcDose = false;

							if (bRecUnits.search("M2") > 0 || bRecUnits.search("KG") > 0 || bRecUnits.search("AUC") >= 0 ) {
								calcDose = true;
							}

							if (calcDose) {
								if ("" === bRec.BSA_Dose || "NaN mg" === bRec.BSA_Dose) {
									if (bRecUnits.search("M2") > 0) {
										Dose = bRec.Dose * Patient.BSA;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										bRec.BSA_Dose = Dose + " " + Units;
										updateRecord = true;
									}
									else if	(bRecUnits.search("KG") > 0) {
										Dose = bRec.Dose * Patient.BSA_Weight;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										bRec.BSA_Dose = Dose + " " + Units;
										updateRecord = true;
									}
									else if (bRecUnits.search("AUC") >= 0) {
										Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
										bRec.BSA_Dose = Dose;
										updateRecord = true;
									}
								}
								else {
									// MWB - 7/12/2012 - Fix to update Dosage Calculations every time patient info is loaded.
									// DO NOT IMPLEMENT until further notice...
									// Implement as per SIC's e-mail - 7/12/2012 08:56 AM

									if (bRecUnits.search("M2") > 0) {
										Dose = bRec.Dose * Patient.BSA;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										tmpDose = Dose + " " + Units;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}
									else if	(bRecUnits.search("KG") > 0) {
										Dose = bRec.Dose * Patient.BSA_Weight;
										Dose = Ext.GeneralRounding2Digits(Dose);
										Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
										tmpDose = Dose + " " + Units;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}
									else if (bRecUnits.search("AUC") >= 0) {
										Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
										tmpDose = Dose;
										if (tmpDose != bRec.BSA_Dose) {
											bRec.BSA_Dose = tmpDose;
											updateRecord = true;
										}
									}

								}
							}
						}
					}
					else {
						oTherapyLen = aRec.Therapy.length;
						for (b = 0; b < oTherapyLen; b++) {
							bRec = aRec.Therapy[b];
							this.UpdateOEMRecords(aRec, bRec);
						}
					}
				}
			}
********************/



			Ext.Function.defer( this.AssignBtnHandlers, 2000, this );
			this.application.fireEvent("PatientSelected", this.application.PatientSelectedRecs, this.application.PatientSelectedOpts);	// MWB 10 Feb 2012 - Added additional parameters
		}
	},
	/**********************************************
	 *
	 * END PatientDataLoadComplete() function
	 *
	 **********************************************/


	HandleVSHCalcDoseButtons : function( event, element ) {
	/******* Button definition in view\Common\VitalSignsHistory.js
				return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " +
					"weight=\"" + data.Weight + "\" " +
					"height=\"" + data.Height + "\" " +
					"weightFormula=\"" + data.WeightFormula + "\" " +
					"bsa_Weight=\"" + data.BSA_Weight + "\" " +
					"bsa_Method=\"" + data.BSA_Method + "\" " +
				">" + data.BSA + "</button> m<sup>2</sup>");
	********/
		var btnTitle = element.getAttribute("title");
		if ("Show Dosage Calculation" === btnTitle) {
			var Patient = this.application.Patient;
			var params = {};
			params.Weight = element.getAttribute("weight");
			params.Height = element.getAttribute("height");
			params.WeightFormula = element.getAttribute("weightFormula");
			params.BSA_Weight = element.getAttribute("bsa_Weight");
			params.BSA_Method = element.getAttribute("bsa_Method");
			params.Gender = Patient.Gender;
			params.Amputations = Patient.Amputations;

			params.BSA = Ext.BSA_Calc(params);


			var PatientData = Ext.ShowBSACalcs(params, false, null, null, null);

			Ext.MessageBox.show({
				title : "Dosage Calculations",
				msg : PatientData,
				buttons : Ext.MessageBox.OK
			});
		}
	},



























	AssignBtnHandlers : function() {
		try {
			var thisCtl = this.getController("NewPlan.NewPlanTab");
			Ext.Patient = this.application.Patient;		// MWB - 5/30/2012 - Need this so that the Patient Info can be accessed within xTemplates

			var patientTemplates = thisCtl.getPatientTemplates();

			var btns1 = patientTemplates.el.select("button");
			btns1.removeAllListeners();
			btns1.on("click", this.HandleTemplateBtnClicks, this);
		}
		catch (e) {
			wccConsoleLog("Error in AssignBtnHandlers");
		}
	},


    //-------------------------------------------------------------------------
    //
    //	Template Source (National/Local/Personal) Selected - Phase 1 of the CTOS Tab
    //
    //
    onTemplateTypeChange : function(combo, recs, eOpts) {
        wccConsoleLog("Select Template Type");
        this.application.Patient.TemplateType = recs[0].data;
        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var obj = thisCtl.getDiseaseAndStage();
        obj.show();
        this.getResetButton().show();
    },

	//
    //
    //	END Template Source Selected
    //
    //-------------------------------------------------------------------------


    //-------------------------------------------------------------------------
    //
    //	Disease Type Selected - Phase 2 of the CTOS Tab
    //
    //
    DiseaseSelected : function(combo, recs, eOpts) {
        wccConsoleLog("Disease Type has been selected");

        if(this.application.Patient.Disease != recs[0].data){
            this.application.ResetClicked=false;
        }

        this.application.Patient.Disease = recs[0].data;

        var obj = this.getTemplate();	// MWB 19 Jan 2012 - Added per customer request to not require selecting Disease Stage before displaying list of templates
        obj.show();
        // this.getResetButton().show();

    },
    //-------------------------------------------------------------------------
    //
    //	Disease Stage Selected - Phase 2 of the CTOS Tab
    //
    //
    onDiseaseStageChange : function(combo, recs, eOpts) {
        wccConsoleLog("Disease Type and Stage has been selected");

        this.application.Patient.DiseaseStage = recs[0].data;

        combo.hiddenValue = recs[0].data.name;

        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var obj = thisCtl.getTemplate();
        obj.show();
        // this.getResetButton().show();
    },



	/**************************************************
	 *
	 *	MWB 30 Jan 2012 - Modified to break out the Loading of the Template from the Select Tag
	 *	This was done to make use of the loading function by the "HandleClickEvents" function above
	 *
	 **************************************************/
// Load the selected template - Called when user clicks on the "Show Template" in the Patient Info Table via the "HandleAnchorClicks - PatientInfoTable!" function above.
// This template is one which is currently applied to the patient.
	CTOS_DataLoad2 : function(TemplateID) {
	        this.application.loadMask("CTOS DataLoad2"); // MWB 19 Jan 2012 - Mask the screen
			var CTOSModel = this.getModel("CTOS");
			var CTOSModelParam = TemplateID;

			wccConsoleLog("Template Params = " + CTOSModelParam);

			this.clearCTOS();

	        CTOSModel.load(CTOSModelParam, {
				scope: this,
				success: function (CTOSTemplateData, response) {
					wccConsoleLog("CTOS Loaded - Processing");
					this.application.Patient.AppliedTemplateID = TemplateID;

					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var CTOSData = thisCtl.getCTOSDataDsp();

// MWB - 6/7/2012 - Need to add Template Timing info to the data object
					CTOSTemplateData.data.ELevelRecommendation = CTOSTemplateData.data.ELevel[0].details;
					CTOSData.update(CTOSTemplateData.data);
					this.getDisease().setValue(CTOSTemplateData.data.Disease);
					this.loadCombo(this.getDiseaseStage(),CTOSTemplateData.data.Disease);

					if(this.getDiseaseStage().getStore().count()==0){
						this.loadCombo(this.getDiseaseStage(),this.getDisease().getValue());
					}

					this.getDiseaseStage().setValue(CTOSTemplateData.data.DiseaseStage[0].name);

					CTOSData.show();
					if ("1" === SessionTemplateAuthoring) {
						this.getEditTemplateBtn().show();
					}
					if ("Provider" === Sessionrole || "All Roles" === Sessionrole) {
						this.getApplyTemplateBtn().disable();	// Template is already applied to patient
						this.getApplyTemplateBtn().hide();	// so no need to have it available.
					}

					this.application.CurrentTemplate = CTOSData;	// MWB - 5/21/2012 - Hang onto the current template data for use in calculating the proper end date when applying the template.
					this.application.unMask(); // MWB 19 Jan 2012 - Unmask the screen

					wccConsoleLog("CTOS Loaded - Rendering complete");
				},
				failure: function (err) {
					wccConsoleLog("CTOS Data failed to load properly");
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var CTOSData = thisCtl.getCTOSDataDsp();
					CTOSData.update("<h2 class='errMsg'>No information available for Template " + this.application.Patient.Template.name + "</h2>");
					Ext.MessageBox.alert("Template Load Error", "Unknown Error in loading Template " + this.application.Patient.Template.name + " - CTOS_DataLoad2" );

					this.application.unMask();	// MWB 19 Jan 2012 - Unmask the screen
				}
	        });
	},




// Load the selected template - This is done by browsing through the available templates and selecting one from the drop down.
	CTOS_DataLoad : function(TemplateID, thePanel) {
		if (thePanel) {
			thePanel.setLoading("Loading Selected Template", false);
		}
		var CTOSModel = this.getModel("CTOS");
		var CTOSModelParam = TemplateID;
		wccConsoleLog("Template Params = " + CTOSModelParam );

		CTOSModel.load(CTOSModelParam, {
			scope : this,
			thePanel : thePanel,
			success : function( CTOSTemplateData, response ) {
				wccConsoleLog("CTOS Loaded - Processing");
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var CTOSData = thisCtl.getCTOSDataDsp();
				var ApplyBtn = this.getApplyTemplateBtn();
				var TemplateApplied;


				CTOSTemplateData.data.ELevelRecommendation = CTOSTemplateData.data.ELevel[0].details;
				CTOSData.update( CTOSTemplateData.data );
				if(CTOSData.hidden){
					CTOSData.show();
				}

				var patientAppliedTemplates = Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0];
				TemplateApplied = patientAppliedTemplates.getValue();

				if ("1" === SessionTemplateAuthoring) {
					this.getEditTemplateBtn().show();
				}
				if ("Provider" === Sessionrole || "All Roles" === Sessionrole) {
					// Reset default button text.
					if ("0" === SessionPreceptee) {
						ApplyBtn.setText("Apply Template to Patient");
					}
					else {
						ApplyBtn.setText("Apply Template to Patient - Requires Cosigner");
					}
					
					if(TemplateApplied){
						ApplyBtn.disable();
					}else{
						ApplyBtn.enable();
					}
					if (TemplateApplied &&
						"0" === SessionPreceptee && 
						"" === this.application.Patient.CurrentTemplatesApplied2Patient[0].ApprovedByUser && 
						"" !== this.application.Patient.CurrentTemplatesApplied2Patient[0].AssignedByUser) {
						ApplyBtn.setText("Approve Regimen");
						ApplyBtn.enable();
					}
					ApplyBtn.show();
				}

				/* Manage the Med Reminders Panel for the CTOS Template Display... */
				var theTemplateID2Pass2MedReminders = CTOSTemplateData.internalId;

				var mrGrid = this.getCTOS_MedRemindersGrid();
				var mrForm = this.getCTOS_MedRemindersForm();
				var mrDescField = this.getCTOS_MedRemindersDescription();
				var mrCycleField = this.getCTOS_MedRemindersWhenCycle();
				var mrPeriodField = this.getCTOS_MedRemindersWhenPeriod();

				if (mrGrid) {
					mrGrid.show();
				}
				if (mrForm) {
					mrForm.show();
				}
				this.application.CurrentTemplate = CTOSData;	// MWB - 5/21/2012 - Hang onto the current template data for use in calculating the proper end date when applying the template.

				if (response.thePanel) {
					response.thePanel.setLoading(false, false);
				}
			},

			failure : function (err, response) {
				wccConsoleLog("Laboratory Info failed to load properly");
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var CTOSData = thisCtl.getCTOSDataDsp();
				CTOSData.update( "<h2 class='errMsg'>No information available for Template " + this.application.Patient.Template.name + "</h2>" );
				if (response.thePanel) {
					response.thePanel.setLoading(false, false);
				}
			}
		});
	},


	LoadSpecifiedTemplate : function(TemplateID, module) {
		if (this.application.Patient && this.application.Patient.AppliedTemplate && this.application.Patient.AppliedTemplate.id == TemplateID) {
			// console.log("Specified Template (" + TemplateID + ") already loaded... (from " + module + ")");
			return;
		}
		// console.log("Loading Specified Template - Start - " + TemplateID + " (from " + module + ")");
		var CTOSModel = this.getModel("CTOS");
		var CTOSModelParam = TemplateID;
		this.clearCTOS();
		CTOSModel.load(CTOSModelParam, {
			scope: this,
			success: function (CTOSTemplateData, response) {
				// console.log("Loading Specified Template - Finished");
				this.application.Patient.AppliedTemplateID = TemplateID;
				CTOSTemplateData.data.ELevelRecommendation = CTOSTemplateData.data.ELevel[0].details;
				this.application.Patient.AppliedTemplate = CTOSTemplateData.data;
				this.DataLoadCountDecrement("LoadSpecifiedTemplate (from " + module + ") - PASS");
				this.PatientDataLoadComplete("Current Applied Template Loaded");
			},
			failure : function (err, response) {
				this.DataLoadCountDecrement("LoadSpecifiedTemplate (from " + module + ") - FAIL");
				this.PatientDataLoadComplete("Current Applied Template - Failed to load - " + response.error);
				Ext.MessageBox.alert("Loading Template Error", "NewPlanTab - Current Applied Template - Failed to load - " + response.error);
			}
		});
	},


	ShowSelectedTemplate : function(theTemplate) {
		this.application.Patient.Template = theTemplate;
		combo.hiddenValue = this.application.Patient.Template.description;
		this.CTOS_DataLoad(this.application.Patient.Template.id, null);
	},

	selTemplateChange : function(combo, recs, eOpts) {
		wccConsoleLog("Template has been selected");
		var theTemplate = recs[0].data;
		this.ShowSelectedTemplate(theTemplate);
	},


	SaveBSAInfo : function() {	// Used to update the BSA if it's recalculated
		var Patient = this.application.Patient;
		var ThisAdminDay = this.application.Patient.ThisAdminDay;		// This is the OEM Record for a specific Admin Day -
		// { id, AdminDate, Cycle, Day, PostTherapy, PostTherapyInstr, PreTherapy, PreTherapyInstr, Therapy, TherapyInstr }

		var dt = new Date();
		var record = {};
		if (ThisAdminDay) {
			record.Cycle = ThisAdminDay.Cycle;
			record.Day = ThisAdminDay.Day;
		}
		else {	// This is NOT an AdminDay for this Regimen
			record.Cycle = "";
			record.Day = "";
		}
		record.PatientID = Patient.id;
		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");
		record.Height = String(Patient.Height);
		record.Weight = String(Patient.Weight);
		record.BSA = String(Patient.BSA);
		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;


		record.BP = "";
		record.Systolic = "";
		record.Diastolic = "";
		record.Temperature = "";
		record.Pulse = "";
		record.Respiration = "";
		record.Pain = 0;
		record.SPO2 = "";


		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");

		record.Height = String(Patient.Height);
		record.Weight = String(Patient.Weight);
		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;
		record.BSA = String(Patient.BSA);

		record.BP = "";
		record.Diastolic = 0;
		record.Systolic = 0;

		record.Cycle = "";
		record.Day = "";
		record.Pain = null;
		record.Pulse = 0;
		record.Respiration = "";
		record.SPO2 = "";
		record.Temperature = "";
		record.PatientID = Patient.id;
		var params = Ext.encode(record);

		Ext.Ajax.request({
			url: Ext.URLs.AddVitals,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );

				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + resp.msg );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + "e.message" + "<br />" + resp.msg );
			}
		});
		return (true);
	},

	LoadOEM_OrderData : function() {
		// console.log("Loading OEM Data");
		if (this.application.Patient) {
			this.application.DataLoadCount = 1;
			this.loadOrderRecords();
			// console.log("Load Order Records from - LoadOEM_OrderData");
		}
	},




	selectMedReminderGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var theForm = this.getMedRemindersForm();
		if (!theForm.isVisible()) {
			theForm.show();
		}
		var theData = record.getData();
		var aForm = theForm.getForm();
		aForm.setValues({
			"ReminderWhenCycle" : theData.ReminderWhenCycle, 
			"ReminderWhenPeriod" : theData.ReminderWhenPeriod,
			"Title" : theData.Title,
			"Description" : theData.Description,
			"MR_ID" : theData.MR_ID,
			"TemplateID" : theData.TemplateID
		});
	},



	getAnyMedReminders4Template : function(TemplateID) {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();
		MedRemindersStore.removeAll();
		if ("" !== TemplateID) {
			MedRemindersStore.proxy.url = Ext.URLs.MedReminders + "/" + TemplateID;
			MedRemindersStore.load();
		}
	},

	RefreshMedRemindersGrid : function() {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();
		MedRemindersStore.removeAll(true);
		MedRemindersGrid.getView().refresh(true);
	},

	AddMedReminders2Store : function(MedReminders) {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();
		MedRemindersStore.removeAll();
		MedRemindersStore.add(MedReminders);
	},


	getMedRemindersInArray : function() {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();

		var MedRemindersArray = [], MedRemindersRec, limitCount = MedRemindersStore.count(), i, MedRemindersModel;
		for (i = 0; i < limitCount; i++) {
			MedRemindersModel = MedRemindersStore.getAt(i);
			MedRemindersRec = Ext.create(Ext.COMSModels.MedReminder, {
				"MR_ID" : MedRemindersModel.data.MR_ID,
				"TemplateID" : MedRemindersModel.data.TemplateID, 
				"Title" : MedRemindersModel.data.Title,
				"Description" : MedRemindersModel.data.Description,
				"ReminderWhenCycle" : MedRemindersModel.data.ReminderWhenCycle,
				"ReminderWhenPeriod" : MedRemindersModel.data.ReminderWhenPeriod
			});
			MedRemindersArray.push(MedRemindersRec);
		}
		return MedRemindersArray;
	}

});


