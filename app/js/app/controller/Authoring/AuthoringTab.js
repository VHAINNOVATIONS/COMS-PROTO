// var tmpRecord; MWB - 28 Dec 2011; Eliminated need for global variable by using the "getSelectedRecord()" function below
// Also cleaned up code below to not require the tmpRecord variable
Ext.apply(Ext.data.validations, {
	regimenVal: function (config, value) {
		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();

		if (0 == drugstore.count()) {
			return false;
		}
		return true;
	}
});


Ext.define('COMS.controller.Authoring.AuthoringTab', {
	extend: 'Ext.app.Controller',
	stores: [
		'TotalCoursesMax'
		, 'CycleLengthMax'
		, 'TimeFrameUnit'
		, 'EmetogenicLevel'
		, 'FebrileNeutropeniaRisk'
		, 'ReferencesStore'
		, 'LUReferences'
		, 'HydrationStore'
		, 'DrugStore'
		, 'DrugUnitsStore'
		, 'InfusionStore'
		, 'CTOS'
		, 'MedReminders'
		],
	views: [
		'Authoring.References'
		, 'Authoring.MedReminder'
		, 'Authoring.Hydration'
		, 'Authoring.DrugRegimen'
		, 'Authoring.AddReference'
		, 'Authoring.CreateNewTemplate'
		, 'Authoring.CycleLength'

		, 'Common.Search4Template'
		, "Common.selCTOSTemplate"
		, "Common.selDiseaseAndStage"
		, "Common.selDisease"
		, "Common.selDiseaseStage"
		, "Common.selTemplate"
		, "Common.selSequence"
		, "Common.MedRemindersForm"
		, "Common.EmeticInfo"
		],


	refs: [
		{
			ref: "AuthoringTab",
			selector: "AuthoringTab"
		},

		{ ref : "MedRemindersForm", selector : "AuthoringTab MedReminder MedRemindersForm" },
		{ ref : "MedRemindersGrid", selector : "AuthoringTab MedReminder grid" },
	 	{ ref : "AddReminderBtn", selector : "AuthoringTab MedReminder button[title=\"AddReminder\"]" },
		{ ref : "RemoveReminderBtn", selector : "AuthoringTab MedReminder button[title=\"RemoveReminder\"]" },
		{ ref : "EditReminderBtn", selector : "AuthoringTab MedReminder button[title=\"EditReminder\"]" },


// AuthoringTab TemplateReferences

		{
			ref: "ReqInstr",
			selector: "AuthoringTab RequiredInstr"
		},

		{
			ref: "NewTemplate",
			selector: "AuthoringTab CreateNewTemplate"
		},

		{
			ref: "CTOSTemplateSelection",
			selector: "AuthoringTab selCTOSTemplate"
		},


		{
		ref: "TemplateDiseaseAndStage",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage"
		},

		{
		ref: "NewTemplateDiseaseAndStage",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"]"
		},


		{
		ref: "DiseaseStage",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"] selDiseaseStage"
		},

		{
		ref: "Disease",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"] selDisease"
		},
		{
		ref: "ExistingDiseaseStage",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage selDiseaseStage"
		},

		{
		ref: "ExistingDisease",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage selDisease"
		},

		{
		ref: "ExistingCourseInfo",
		selector: "AuthoringTab container[name=\"courseInfo\"]"
		},

		// Reference Buttons
	{
		ref: "RemoveReference",
		selector: "AuthoringTab TemplateReferences button[title=\"RemoveReference\"]"
	}, 

	{
		ref: 'EditReference',
		selector: 'AuthoringTab TemplateReferences button[title="EditReference"]'
	},

		// Reference Fields
	{
		ref: 'ReferenceName',
		selector: 'AddReference textfield[name="Reference"]'
	}, 
	{
		ref: 'ReferenceLink',
		selector: 'AddReference textfield[name="ReferenceLink"]'
	}, 
	{
		ref: 'ReferenceCombo',
		selector: 'AddReference combo[name="SelReference"]'
	},
	{
		ref: "CourseNum",
		selector: "AuthoringTab textfield[name=\"CourseNum\"]"
	},
	{
		ref: "CourseNumMax",
		selector: "AuthoringTab textfield[name=\"CourseNumMax\"]"
	},
		// Basic Fields (CycleLength, Regimen Name, Emetogenic Level, Febrile Neutropenia Risk)
	{
		ref: "CycleLength",
		selector: "AuthoringTab combo[name=\"CycleLength\"]"
	},
	{
		ref: "CycleLengthUnit",
		selector: "AuthoringTab combo[name=\"CycleLengthUnits\"]"
	},
	{
		ref: "RegimenName",
		selector: "AuthoringTab textfield[name=\"RegimenName\"]"
	},
	{
		ref: "TemplateAlias",
		selector: "AuthoringTab textfield[name=\"TemplateAlias\"]"
	},
	{
		ref: "EmetogenicLevel",
		selector: "AuthoringTab combo[name=\"EmetogenicLevel\"]"
		},
		{
		ref: "FebrileNeutropeniaRisk",
		selector: "AuthoringTab textfield[name=\"FebrileNeutropeniaRisk\"]"
		},
		{
		ref: "PreHydrationInstructions",
		selector: "TemplateHydration[title=\"Pre Therapy\"] textfield[name=\"HydrationInstructions\"]"
		},
		{
		ref: "PreHydrationGrid",
		selector: "TemplateHydration[title=\"Pre Therapy\"] grid"
		},

		{
		ref: "PostHydrationInstructions",
		selector: "TemplateHydration[title=\"Post Therapy\"] textfield[name=\"HydrationInstructions\"]"
		},
		{
		ref: "PostHydrationGrid",
		selector: "TemplateHydration[title=\"Post Therapy\"] grid"
		},
		{
		ref: "RegimenGrid",
		selector: "TemplateDrugRegimen grid"
		},
		{
		ref: "RegimenInstruction",
		selector: "TemplateDrugRegimen textfield[name=\"RegimenInstructions\"]"
		},
		{
		ref: "ReferencesGrid",
		selector: "AuthoringTab TemplateReferences"
		},
		{
		ref: "Active",
		selector: "AuthoringTab textfield[name=\"KeepActive\"]"
		},
	{
		ref: "PatientListCount",
		selector: "AuthoringTab displayfield[name=\"PatientListCount\"]"
	}
	],

	// Ext.ComponentQuery.query("AddReference combo[name=\"CycleLength\"]")[0].el.dom
	init: function () {
		wccConsoleLog('Initialized Authoring Tab Panel Navigation Controller!');
		this.control({


			"AuthoringTab MedReminder button[title=\"AddReminder\"]" : {
				click: this.ShowAddReminder
			},

			"AuthoringTab MedReminder button[title=\"RemoveReminder\"]" : {
				click: this.RemoveSelectedReminder
			},
			"AuthoringTab MedReminder button[title=\"EditReminder\"]" : {
				click: this.EditSelectedReminder
			},
			"AuthoringTab MedReminder grid" : {
				// itemclick: this.clickMedReminderGridCell,
				select: this.selectMedReminderGridRow,
				deselect: this.deSelectMedReminderGridRow
			},











			// Handlers for the contents within the tab panel itself
			"AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]": {
				change: this.TemplateTypeSelected
			},



			'AuthoringTab TemplateReferences': { // The References Grid Control
				itemclick: this.clickUpdateReference
			},
			'AuthoringTab TemplateReferences [title="AddReference"]': { // The "Add Reference" button on the grid control
				click: this.clickAddReference
			},
			'AuthoringTab TemplateReferences button[title="RemoveReference"]': {
				click: this.removeReference
			},
			'AuthoringTab TemplateReferences button[title="EditReference"]': {
				click: this.editReference
			},



			"AuthoringTab displayfield[name=\"PatientListCount\"]" : {
				render : function(c) {
					c.getEl().on('click', function(){ this.fireEvent('click', c); }, c);
				},
				click: this.ShowPatientListInfo
			},


			// Handlers for the "Reference" pop-up window
			'AddReference combobox': { // Pop-up window
				select: this.ReferenceSelected
			},
			'AddReference button[action="save"]': {
				click: this.clickSaveReference
			},
			'AddReference button[action="cancel"]': {
				click: this.clickCancelReference
			},
			'AuthoringTab CreateNewTemplate button[action="save"]': {
				click: this.saveTemplate
			},
			'AuthoringTab CreateNewTemplate button[action="saveAs"]': {
				click: this.saveTemplateAs
			},
			'AuthoringTab CreateNewTemplate button[action="clear"]': {
				click: this.clearTemplate
			}
		});
	},


	updateEmeticMedLevel : function( template ) {
		var HighestLevel = 0, HLName, HLMName, el, eln;
		var theData = template.getData();
		var theMeds = Ext.Array.merge(theData.Meds, theData.PreMHMeds, theData.PostMHMeds);
		var EmeticMedStore = Ext.getStore("EmeticMeds");
		var buf, i, aRec, aMed, medRec, medLen = theMeds.length;
		for (i = 0; i < medLen; i++) {
			aMed = theMeds[i];
			aRec = EmeticMedStore.findRecord("MedName", aMed.Drug, 0, false, false, true);
			if (aRec) {
				el = aRec.getData().EmoLevel;
				if (el > HighestLevel) {
					HighestLevel = el;
					HLName = aRec.getData().EmoLevelName;
					HLMName = aRec.getData().MedName;
				}
			}
		}
		if (HighestLevel > 0) {
			buf = "<span style=\"border: 3px solid red; padding: 1em;\">" + HLMName + " has a " + HLName + "</div>";
			var EmeticInfoCtl = this.getController("Common.EmeticInfo");
			EmeticInfoCtl.setEmeticInfoContent(buf);
		}
	},


	getCourseInfo : function( thisTab ) {
		return thisTab.down("[name=\"courseInfo\"]");
	},
	getNewTemplateForm : function( thisTab ) {
		return thisTab.down("CreateNewTemplate");
	},


	HideSelectedTemplateForm : function() {
		var thisTab = this.getAuthoringTab();
		this.getCourseInfo(thisTab).hide();
		this.getNewTemplateForm(thisTab).hide();
		// this.selTemplateChange(theTemplate);
	},

	ShowSelectedTemplateForm : function(theTemplate) {
		var thisTab = this.getAuthoringTab();
		this.getCourseInfo(thisTab).show();
		this.getNewTemplateForm(thisTab).show();
		if (theTemplate) {
			this.selTemplateChange(theTemplate);
		}
	},




	selTemplateChange : function (theTemplate) {
		// var CTOSModelParam = theTemplate.id;
		this.application.Template = theTemplate;
		// combo.hiddenValue = this.application.Template.description;
		this.application.loadMask();
		var mytemplate;
		var authoringCtl = this.getController("Authoring.AuthoringTab");

		this.getStore('CTOS').load({
			params: {
				URL: Ext.URLs.CTOS,
				id: theTemplate.id
			},
			callback: function (records, operation, success) {
				if (success) {
					mytemplate = this.getAt(0);
					authoringCtl.afterCTOSLoaded(mytemplate);
				} else {
					authoringCtl.application.unMask();
					Ext.MessageBox.alert('Failure', 'Load Template Failed: ' + operation.request.scope.reader.jsonData.frameworkErr);
				}

			}
		});
	},


	// User has selected what they want to do...
	TemplateTypeSelected: function (rbtn, newValue, oldValue, eOpts) {
		wccConsoleLog("User has selected what to do");
		var theController = this.getController("Common.selCTOSTemplate");
		var radioType = rbtn.inputValue;

		var selCTOSTemplate = this.getCTOSTemplateSelection();
		var lblReqFields = this.getReqInstr();
		lblReqFields.show();

		if (0 == radioType && newValue) {		// Select Existing Template
			selCTOSTemplate.show();
			theController.showInitialSelector(selCTOSTemplate);
			theController.resetTemplateSrc(selCTOSTemplate);
			this.clearTemplate(null);
			this.HideSelectedTemplateForm();
		}
		else if (1 == radioType && newValue) {	// Create New Template
			selCTOSTemplate.hide();
			this.clearTemplate(null);
			this.ShowSelectedTemplateForm(null);
			theController.hideInitialAndFilterSelector(selCTOSTemplate);
		}
	},



	clearTemplate: function (button) {

		// var NewTemplateObj = this.getNewTemplate();
		// var CTOSTemplateSelectionObj = this.getCTOSTemplateSelection();
		var courseNum = this.getCourseNum();
		var courseNumMax = this.getCourseNumMax();

		var lblReqFields = Ext.ComponentQuery.query("AuthoringTab RequiredInstr")[0];

		if (this.getExistingCourseInfo().hidden == false) {
			this.getExistingCourseInfo().hide();
			this.clearValue(courseNum);
			this.clearValue(courseNumMax);
		}
		lblReqFields.hide();
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		thisCtl.clearCTOS();

		thisCtl = this.getController("Common.selCTOSTemplate");
		var CTOSTemplate = this.getCTOSTemplateSelection();
		thisCtl.resetTemplateSrc(CTOSTemplate);


		this.clearValue(this.getDisease());
		this.clearValue(this.getEmetogenicLevel());
		this.clearValue(this.getExistingDisease());
		this.clearValue(this.getDiseaseStage());
		this.clearValue(this.getExistingDiseaseStage());
		this.clearValue(this.getCycleLength());
		this.clearValue(this.getCycleLengthUnit());
		this.clearValue(this.getRegimenName());
		this.clearValue(this.getTemplateAlias());
		this.clearValue(this.getEmetogenicLevel());
		this.clearValue(this.getFebrileNeutropeniaRisk());
		this.clearValue(this.getPreHydrationInstructions());
		this.clearValue(this.getPostHydrationInstructions());
		this.clearValue(this.getRegimenInstruction());
		this.clearValue(this.getPatientListCount());

		this.RefreshReferencesGrid();
		this.RefreshMedRemindersGrid();

		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();
		drugstore.removeAll(true);
		druggrid.getView().refresh(true);

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();
		preMhStore.removeAll(true);
		preMHgrid.getView().refresh(true);

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();
		postMhStore.removeAll(true);
		postMHgrid.getView().refresh(true);
	},

	clearValue: function (field) {
		if (field && (field.getValue() || field.getRawValue())) {
			field.reset();
		}
	},

	// Used in both the Hydration and Refernce Grids
	getSelectedRecord: function (destroy, query) {
		var theGrid, theView, theSelModel, HasSelection = false,
			selRows, theRecord, theStore, theIndex;

		theGrid = Ext.ComponentQuery.query(query)[0];
		theView = theGrid.getView();
		theSelModel = theView.getSelectionModel();
		HasSelection = theSelModel.hasSelection();
		if (HasSelection) {
			selRows = theSelModel.getSelection();
			theRecord = selRows[0];
			theStore = theView.getStore();
			theIndex = theStore.indexOf(theRecord);
			if (destroy) {
				theStore.removeAt(theIndex);
				return {};
			}
		}
		return {
			hasRecord: HasSelection,
			record: theRecord,
			rowNum: theIndex
		};
	},


	ShowPatientListInfo: function () {
		var Temp = this.SelectedTemplate;
		var thePatients = Temp.getData().PatientList;
		var theTemplateDesc = Temp.getData().Description;
		var theController = this.getController("TemplateList.TemplateListTab");
		theController.showPatientListWidget(thePatients, theTemplateDesc);
	},


	afterCTOSLoaded: function (template) {
		wccConsoleLog("CTOS Loaded - Processing");
		this.SelectedTemplate = template;
		this.getAnyMedReminders4Template( template.internalId );
		this.getExistingCourseInfo().show();
		this.getNewTemplate().show();
		var disease = this.getExistingDisease();
		var diseaseRecord = disease.getStore().getById(template.data.Disease);
		if(null === diseaseRecord){
			var authorCtl = this.getController("Authoring.AuthoringTab");
			var SelectedDiseaseID = disease.getValue();
			if (!SelectedDiseaseID) {
				SelectedDiseaseID = template.data.Disease;
			}
			disease.getStore().load({
				params: {
						URL: Ext.URLs.DiseaseType + "/",
						ID: SelectedDiseaseID
				},
				callback: function (records, operation, success) {
						if (success) {
							diseaseRecord = disease.getStore().getById(disease.getValue());
							authorCtl.LoadFormWithExistingData(template);
						}else{
							this.application.unMask();
							Ext.MessageBox.alert('Failure', 'Cancer type could not be found for this template. ');
						}
				}
			});
		}
		else {
			this.LoadFormWithExistingData(template);
		}
		this.updateEmeticMedLevel(template);
	},

	/* Load Form with existing data */
	LoadFormWithExistingData : function (template){
		// 
		// var UserDefinedAlias = template.data.Description;
		this.getTemplateAlias().setValue(template.data.Description);
		this.getExistingDisease().setValue(template.data.Disease);
		this.getExistingDiseaseStage().setValue(template.data.DiseaseStage[0].name);
		this.getCourseNum().setValue(template.data.CourseNum);
		this.getCourseNumMax().setValue(template.data.CourseNumMax);
		this.getCycleLength().setValue(template.data.CycleLength);
		this.getCycleLengthUnit().setValue(template.data.CycleLengthUnit[0].name);
		this.getRegimenName().setValue(template.data.RegimenName);
		this.getEmetogenicLevel().setValue(template.data.ELevel[0].name);
		this.getFebrileNeutropeniaRisk().setValue(template.data.FNRisk);
		this.getPreHydrationInstructions().setValue(template.data.PreMHInstructions);
		this.getPostHydrationInstructions().setValue(template.data.PostMHInstructions);
		this.getRegimenInstruction().setValue(template.data.RegimenInstruction);
		this.getPatientListCount().setValue(template.data.PatientListCount);


		this.AddReferences2Store(template.data.References);
		// this.AddMedReminders2Store(template.data.MedReminders);




		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();
		drugstore.removeAll();
		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();
		preMhStore.removeAll();
		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();
		postMhStore.removeAll();
		preMhStore.add(template.data.PreMHMeds);
		
		drugstore.add(template.data.Meds);
		postMhStore.add(template.data.PostMHMeds);
		this.application.unMask();
},
















































	saveTemplateAs: function (button) {
		alert("Saving Template with new name...");
		var Template = this.PrepareTemplate2Save();
		this.SaveTemplate2DB(Template, button);
	},

    isDuplicateDescription: function(description, alias) {
        if (description === alias) {
            return true;
        }
        var patt = /Ver\s+\d+$/;    // If description ends in "Ver ###" then check to see if it's a duplicate version of another alias
        if (description.search(patt) > 0) {
            description = description.replace(patt, "").trim();
            return (description === alias);
        }
        return false;
    },
    
    saveTemplate: function (button) {
        var UserAlias = this.getTemplateAlias().getValue();
        var haveDuplicate = false;
        var patt = /Ver\s+\d+$/;    // If description ends in "Ver ###" then check to see if it's a duplicate version of another alias
        if (UserAlias.search(patt) > 0) {   // strip off any version # from the alias
            UserAlias = UserAlias.replace(patt, "").trim();
        }

        /* Get a list of all templates by alias */
        Ext.Ajax.request({
            url: Ext.URLs.TemplateAlias,
            scope: this,
            alias: UserAlias,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var Records = obj.records;
                var i, matchingRecord, record2Flag, Template,
                    alias = opts.alias, 
                    origAlias = this.getTemplateAlias().getValue(),
                    dupCount = 0;
                for (i = 0; i < obj.total; i++ ) {
                    if (this.isDuplicateDescription(Records[i].description, alias)) {
                        dupCount++;
                        if (Records[i].description === alias) {
                            matchingRecord = Records[i];
                        }
                        if (Records[i].description === origAlias) {
                            record2Flag = Records[i];
                        }
                    }
                }
                if (dupCount > 0) {
                    alias += " Ver " + (dupCount+1);
                    this.getTemplateAlias().setValue(alias);
                    var temp = this.getTemplateAlias().getValue();
                    this.haveDuplicate = true;
                }
                if (this.haveDuplicate) {
                    Ext.Msg.confirm("Saving Change of previous Template", "Do you wish to keep the original version of this template active?", function(btn) {
                        if ("yes" === btn) {
                            Ext.Msg.alert("Status", "Saving New Template, Old Template remains Active");
                            this.application.loadMask("Please wait; Saving Template");
                            Template = this.PrepareTemplate2Save(true);
							if (Template) {
								this.SaveTemplate2DB(Template, button);
							}
                        }
                        else {
                            Ext.Msg.alert("Status", "Saving New Template, Old Template Flagged as In-Active");
                            this.application.loadMask("Please wait; Saving Template");
                            Template = this.PrepareTemplate2Save(true);
							if (Template) {
								this.SaveTemplate2DB(Template, button);
							}
                            this.flagTemplateInactive(record2Flag.name);
                        }
                    }, this);
                }
				else {
                            this.application.loadMask("Please wait; Saving Template");
                            Template = this.PrepareTemplate2Save(true);
							if (Template) {
								this.SaveTemplate2DB(Template, button);
							}
				}

            },
            failure: function(response, opts) {
                wccConsoleLog('server-side failure with status code ' + response.status);
            }
        });
        return;
	},

    flagTemplateInactive: function (record2FlagID) {
        var id2LookFor = record2FlagID;
        Ext.Ajax.request({
            url: Ext.URLs.FlagTemplateInactive,
            method: "POST",
            jsonData: {
                id : id2LookFor
            },
            scope: this,
            success: function(response, opts) {
                var obj = Ext.decode(response.responseText);
                var Records = obj.records;
                var i, alias = opts.alias, dupCount = 0;
            },
            failure: function(response, opts) {
                wccConsoleLog('server-side failure with status code ' + response.status);
            }
        });
    },

	PrepareTemplate2Save: function (KeepAlive) {
		var diseaseId = null;
		var diseaseStageId = null;

		if (null == this.application.Cancer) {
			diseaseId = '';
			diseaseStageId = '';
		} else {
			diseaseId = this.application.Cancer.id;
			if (null == this.application.Cancer.Stage) {
				diseaseStageId = '';
			} else {
				diseaseStageId = this.application.Cancer.Stage.id;
			}

		}
		
		var Order_IDR = '00000000-0000-0000-0000-000000000000';

		var courseNum = this.getCourseNum().getValue();
		var courseNumMax = this.getCourseNumMax().getValue();

		var cycleLength = this.getCycleLength().getValue();
		var cycleLengthUnit = this.getCycleLengthUnit().getValue();

		if (null != cycleLengthUnit && null != cycleLengthUnit.id) {
			cycleLengthUnit = cycleLengthUnit.id;
		} else if (null == cycleLengthUnit) {
			cycleLengthUnit = '';
		}

		//var regimenName = this.getRegimenName().getValue();
		var templateAlias = this.getTemplateAlias().getValue();
		var emetogenicLevel = this.getEmetogenicLevel().getValue();

		if (null != emetogenicLevel && null != emetogenicLevel.id) {
			emetogenicLevel = emetogenicLevel.id;
		} else if (null == emetogenicLevel) {
			emetogenicLevel = '';
		}

		var fnRisk = this.getFebrileNeutropeniaRisk().getValue();

		var preMhInstructions = this.getPreHydrationInstructions().getValue();
		var postMhInstructions = this.getPostHydrationInstructions().getValue();
		var therapyInstructions = this.getRegimenInstruction().getValue();


		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();


		var drugArray = [], drug, drugModel;
		limitCount = drugstore.count();

		for (i = 0; i < limitCount; i++) {
			drugModel = drugstore.getAt(i);
			drug = Ext.create(Ext.COMSModels.Med, {
				Drug: drugModel.data.Drug,
				Amt: drugModel.data.Amt,
				Units: drugModel.data.Units,
				Route: drugModel.data.Route,
				Day: drugModel.data.Day,
				FluidVol: drugModel.data.FluidVol,
				InfusionTime: drugModel.data.InfusionTime,
				FlowRate: drugModel.data.FlowRate,
				Instructions: drugModel.data.Instructions,
				Sequence: drugModel.data.Sequence,
				AdminTime: drugModel.data.AdminTime,
				FluidType: drugModel.data.FluidType

			});

			drugArray.push(drug);
		}

		var preMHArray = [], postMHArray = [], preMhModel, postMhModel, preMH, postMH, infusionArray, infusion1, infusion2;
		limitCount = preMhStore.count();

		for (i = 0; i < limitCount; i++) {
			preMhModel = preMhStore.getAt(i);
			infusionArray = [];

			infusion1 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: preMhModel.data.Amt1,
				unit: preMhModel.data.Units1,
				type: preMhModel.data.Infusion1,
				flowRate: preMhModel.data.FlowRate1,
				fluidVol: preMhModel.data.FluidVol1,
				fluidType: preMhModel.data.FluidType1,
				infusionTime: preMhModel.data.InfusionTime1,
				instruction: preMhModel.data.Instructions
			});

			infusion2 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: preMhModel.data.Amt2,
				unit: preMhModel.data.Units2,
				type: preMhModel.data.Infusion2,
				flowRate: preMhModel.data.FlowRate2,
				fluidVol: preMhModel.data.FluidVol2,
				fluidType: preMhModel.data.FluidType2,
				infusionTime: preMhModel.data.InfusionTime2,
				instruction: preMhModel.data.Instructions
			});

			if ('' != preMhModel.data.Amt1 && '' != preMhModel.data.Units1 && '' != preMhModel.data.Infusion1) {
				infusionArray.push(infusion1);
			}
			if ('' != preMhModel.data.Amt2 && '' != preMhModel.data.Units2 && '' != preMhModel.data.Infusion2) {
				infusionArray.push(infusion2);
			}

			preMH = Ext.create(Ext.COMSModels.MHMed, {
				drugid: preMhModel.data.Drug,
				preporpost: 'Pre',
				description: preMhModel.data.Instructions,
				infusions: infusionArray,
				adminDay: preMhModel.data.Day,
				sequence: preMhModel.data.Sequence,
				adminTime: preMhModel.data.AdminTime
			});

			preMHArray.push(preMH);

		}

		limitCount = postMhStore.count();

		for (i = 0; i < limitCount; i++) {
			postMhModel = postMhStore.getAt(i);
			infusionArray = [];

			infusion1 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: postMhModel.data.Amt1,
				unit: postMhModel.data.Units1,
				type: postMhModel.data.Infusion1,
				flowRate: postMhModel.data.FlowRate1,
				fluidVol: postMhModel.data.FluidVol1,
				fluidType: postMhModel.data.FluidType1,
				infusionTime: postMhModel.data.InfusionTime1,
				instruction: postMhModel.data.Instructions
			});

			infusion2 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: postMhModel.data.Amt2,
				unit: postMhModel.data.Units2,
				type: postMhModel.data.Infusion2,
				flowRate: postMhModel.data.FlowRate1,
				fluidVol: postMhModel.data.FluidVol1,
				fluidType: postMhModel.data.FluidType1,
				infusionTime: postMhModel.data.InfusionTime1,
				instruction: postMhModel.data.Instructions
			});

			if ('' != postMhModel.data.Amt1 && '' != postMhModel.data.Units1 && '' != postMhModel.data.Infusion1) {
				infusionArray.push(infusion1);
			}
			if ('' != postMhModel.data.Amt2 && '' != postMhModel.data.Units2 && '' != postMhModel.data.Infusion2) {
				infusionArray.push(infusion2);
			}

			postMH = Ext.create(Ext.COMSModels.MHMed, {
				drugid: postMhModel.data.Drug,
				preporpost: 'Post',
				description: postMhModel.data.Instructions,
				infusions: infusionArray,
				adminDay: postMhModel.data.Day,
				sequence: postMhModel.data.Sequence,
				adminTime: postMhModel.data.AdminTime
			});
			postMHArray.push(postMH);
		}

		var template = Ext.create(Ext.COMSModels.CTOS, {
			Order_IDR: Order_IDR,
			CourseNum: courseNum,
			CourseNumMax: courseNumMax,
			RegimenName: templateAlias,
			CycleLength: cycleLength,
			CycleLengthUnit: cycleLengthUnit,
			ELevel: emetogenicLevel,
			FNRisk: fnRisk,
			References: this.getReferencesInArray(),
			PreMHInstructions: preMhInstructions,
			PostMHInstructions: postMhInstructions,
			RegimenInstruction: therapyInstructions,
			PreMHMeds: preMHArray,
			PostMHMeds: postMHArray,
			Meds: drugArray,
			Disease: diseaseId,
			DiseaseStage: diseaseStageId,
			KeepAlive: KeepAlive
		});
return template;
		var errors = template.validate();

		if (errors.length > 0) {
			var msg = '';
			errors.each(function (error) {
				//msg += "field: " + error.field + " message: " + error.message + "<br/>";
				msg += " message: " + error.message + "<br/>";
			});

			Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);
			this.application.unMask();
			return null;
		}
		return template;
	},


	SaveTemplate2DB: function (template, button) {
		template.save({
			scope: this,
			success: function (data) {
				wccConsoleLog("Saved Template ");
				// this.getNewPlanTemplate().getStore().removeAll(true);
				// this.getNewPlanTemplate().getStore().load();

				// this.getTemplate().getStore().removeAll(true);
				// this.getTemplate().getStore().load();

				this.saveAllMedReminders(data.data.id);

				this.clearTemplate(button);
				Ext.MessageBox.alert('Success', 'Template saved with name: ' + data.data.RegimenName);
				this.application.unMask();

			},
			failure: function (record, op) {
				wccConsoleLog("Save Template Failed");
				this.application.unMask();
				var ErrMsg = "Unknown Framework Error when attempting to save Template";
				if (op.request.scope.reader.jsonData.frameworkErr) {
					ErrMsg = op.request.scope.reader.jsonData.frameworkErr;
				}
				Ext.MessageBox.alert('Failure', 'Template was not saved: ' + ErrMsg);
			}
		});
	},



















	//--------------------------------------------------------------------------------
	//	Med Reminders Grid Handlers
	//
	ShowAddReminder : function (theBtn) {
		var theForm = this.getMedRemindersForm();
		if (theForm.isVisible()) {
			theForm.hide();
			theBtn.setText("Add Reminder");
		}
		else {
			theForm.show();
			theBtn.setText("Hide Reminder Form");
		}

	},

	selectMedReminderGridRow : function(theRowModel, record, index, eOpts) {
		var records = theRowModel.getSelection();
		var theForm = this.getMedRemindersForm();
		if (!theForm.isVisible()) {
			theForm.show();
			this.getAddReminderBtn().setText("Hide Reminder Form");
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

		var delBtn = this.getRemoveReminderBtn();
		if (records.length <= 0) {
			delBtn.setDisabled(true);
		}
		else {
			delBtn.setDisabled(false);
		}
	},

	deSelectMedReminderGridRow : function(theRowModel, record, index, eOpts) {
	},



	deleteRecord : function(theRecords) {
		var record = theRecords.pop();
		if (record) {
			var rID = record.get("ID");
			var CMD = "DELETE";
			var URL = Ext.URLs.MedReminders + "/" + rID;
/**
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
**/
		}

		else {
			this.application.unMask();
			//this.RefreshPanel();
			//this.CancelForm();
		}
	},

	RemoveSelectedReminder : function(arg1, arg2, arg3) {
	},
	
	EditSelectedReminder : function(arg1, arg2, arg3) {
	},

	getAnyMedReminders4Template : function(TemplateID) {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();
		MedRemindersStore.removeAll();
		MedRemindersStore.proxy.url = Ext.URLs.MedReminders + "/" + TemplateID;
		MedRemindersStore.load();
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
	AddMedReminder2GridStore : function(MedReminderRec) {
		var MedRemindersGrid = this.getMedRemindersGrid();
		var MedRemindersStore = MedRemindersGrid.getStore();
		var theData = MedReminderRec.getData();
		if ("" !== theData.MR_ID) {
			var ExistingRecIndex = MedRemindersStore.findExact("MR_ID", theData.MR_ID);
			if (ExistingRecIndex >= 0) {
				MedRemindersStore.removeAt(ExistingRecIndex);
			}
		}
		MedRemindersStore.add(MedReminderRec);
		MedRemindersGrid.getView().refresh();
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
	},
	saveAllMedReminders : function(TemplateID) {
		var MedReminders = this.getMedRemindersInArray();
		var rec, i, len = MedReminders.length;
		this.application.unMask();
		for (i = 0; i < len; i++)  {
			rec = MedReminders[i];
			rec.proxy.url = Ext.URLs.MedReminders + "/" + TemplateID;
			rec.save({
				scope : this,
				waitMsg: 'Saving Data...',
				success: function (data) {
				},
				failure: function (data) {
					alert("Failure to save Med Reminder");
				}
			});
		}
	},





	//--------------------------------------------------------------------------------
	//	Reference Grid Handlers
	//
	RefreshReferencesGrid : function() {
			var refgrid = this.getReferencesGrid();
			var refstore = refgrid.getStore();
			refstore.removeAll(true);
			refgrid.getView().refresh(true);
	},

	AddReferences2Store : function(References) {
		// template.data.References
			var refgrid = this.getReferencesGrid();
			var refstore = refgrid.getStore();
			refstore.removeAll();
			refstore.add(References);
	},


	getReferencesInArray : function() {
			var refgrid = this.getReferencesGrid();
			var refstore = refgrid.getStore();

			var referencesArray = [], ref, limitCount = refstore.count(), i, referenceModel;
			for (i = 0; i < limitCount; i++) {
				referenceModel = refstore.getAt(i);
				ref = Ext.create(Ext.COMSModels.CTOS_References, {
					RefID: referenceModel.data.id,
					Ref: referenceModel.data.Reference,
					RefURI: referenceModel.data.ReferenceLink
				});
				referencesArray.push(ref);
			}
			return referencesArray;
	},

	ReferenceSelected: function (combo, recs, eOpts) {
		wccConsoleLog('Reference Selected - ' + recs[0].data.name);
		var piData = recs[0].data;
		this.getReferenceName().setValue(piData.name);
		this.getReferenceLink().setValue(piData.description);
	},

	removeReference: function (button) {
		var ckRec = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences');
		if (ckRec.hasRecord) {
			wccConsoleLog('Remove Reference - ' + ckRec.record.get('Reference') + ' - ' + ckRec.record.get('ReferenceLink'));
			var reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: ckRec.record.get('Reference'),
				description: ckRec.record.get('ReferenceLink'),
				lookupid: ckRec.record.get('id')
			});

			reference.destroy({
				scope: this,
				success: function (data) {
					this.getSelectedRecord(true, 'AuthoringTab TemplateReferences'); // remove the selected record from the current store
					this.getRemoveReference().disable();
					this.getEditReference().disable();
				}
			});
		} else {
			Ext.MessageBox.alert('Invalid', 'Please select a Row in the References Grid.');
		}
	},

	editReference: function (grid, record) {
		var ckRec = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences');
		if (ckRec.hasRecord) {
			wccConsoleLog('Editing Reference - ' + ckRec.record.get('Reference') + ' - ' + ckRec.record.get('ReferenceLink'));
			var view = Ext.widget('AddReference'); // Creates an instance of the "Add Reference" pop-up window
			view.setTitle("Edit Reference");
			view.down('form').loadRecord(ckRec.record);
			this.getReferenceCombo().setValue(ckRec.record.get('Reference'));
		} else {
			Ext.MessageBox.alert('Invalid', 'Please select a Row in the References Grid.');
		}
	},

	clickAddReference: function (button) {
		var view = Ext.widget('AddReference'); // Creates an instance of the "Add Reference" pop-up window
		view.setTitle("Add Reference");
	},

	clickUpdateReference: function (grid, record) {
		this.getRemoveReference().enable();
		this.getEditReference().enable();
	},

	clickCancelReference: function (button) {
		var win = button.up('window');
		this.getRemoveReference().disable();
		this.getEditReference().disable();
		win.close();

	},

	clickSaveReference: function (button) {
		// Click on the "Save" button in the Reference PopUp window.
		// var grid = Ext.widget('TemplateReferences');		// Note: this gets a new instance of a particular widget by it's xtype, NOT an existing instance
		var grid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0]; // Get's a specific existing instance of the widget by it's CSS style reference
		var store = grid.getStore();
		var win = button.up('window');
		var form = win.down('form');
		var values = form.getValues();

		var record = form.getRecord();
		var rowNum = store.indexOf(record);
		var reference;
		var existingRecord = null;

		if (this.getSelectedRecord(false, 'AuthoringTab TemplateReferences').hasRecord) {
			existingRecord = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences').record;
		}
		//KD - 12/28/11 - Check to ensure a record is not being edited or selected from drop down
		if (!record && !existingRecord) {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: values.Reference,
				description: values.ReferenceLink,
				lookupid: ''
			});

			//KD - 12/28/11 - Check to ensure a record is not being edited but is selected from drop down
		} else if (!record && existingRecord) {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',	// "9" is a "Magic Number" for the type of record being stored in the Lookup Table
				value: this.getReferenceName().getValue(),
				description: this.getReferenceLink().getValue()
			});

			//KD - 12/28/11 - Record is being edited
		} else {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',	// "9" is a "Magic Number" for the type of record being stored in the Lookup Table
				value: values.Reference,
				description: values.ReferenceLink,
				lookupid: record.get('id')
			});
		}

		this.application.loadMask("Please wait; Saving Reference");
		reference.save({
			scope: this,
			waitMsg: 'Saving Data...',
			success: function (data) {
				wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
				var ref = Ext.create(Ext.COMSModels.References, {
					id: data.data.lookupid,
					Reference: data.data.value,
					ReferenceLink: data.data.description
				});

				var comboReference = Ext.create(Ext.COMSModels.LUReferences, {
					id: data.data.lookupid,
					name: data.data.value,
					description: data.data.description
				});

				if (-1 === rowNum) {
					store.insert(0, ref);
				} else {
					store.removeAt(rowNum);
					store.insert(rowNum, ref);
				}

				this.getReferenceCombo().getStore().insert(0, comboReference);
				this.getRemoveReference().disable();
				this.getEditReference().disable();
				win.close();
				this.application.unMask();
			},
			failure: function (record, op) {
				var thisCtl = this.getController('Authoring.AuthoringTab');
				var comboStore = this.getReferenceCombo().getStore();

				var recordIndex = comboStore.findBy(

				function (record, id) {
					if (record.get('name') === thisCtl.getReferenceName().getValue() && record.get('description') === thisCtl.getReferenceLink().getValue()) {
						return true;
					}
					return false;
				});

				var ref;
				var existingRowNum = -1;
				if (recordIndex !== -1) {
					var comboRecord = comboStore.getAt(recordIndex);
					ref = Ext.create(Ext.COMSModels.References, {
						id: comboRecord.get('id'),
						Reference: comboRecord.get('name'),
						ReferenceLink: comboRecord.get('description')
					});
					existingRowNum = store.find('id', comboRecord.get('id'));
				} else {
					try {
						ref = Ext.create(Ext.COMSModels.References, {
							id: op.request.scope.reader.jsonData.lookupid,
							Reference: record.data.value,
							ReferenceLink: record.data.description
						});
					}
					catch (e) {
					}
				}
				if (-1 === existingRowNum) {
					store.insert(0, ref);
					this.getRemoveReference().disable();
					this.getEditReference().disable();
					win.close();
					this.application.unMask();
				} else {
					Ext.MessageBox.alert('Invalid', 'This reference already exists.');
				}
			}
		});
	}
});
