/*jslint devel: true, undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
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
		, 'EmotegenicLevel'
		, 'FebrileNeutropeniaRisk'
		, 'ReferencesStore'
		, 'LUReferences'
		, 'HydrationStore'
		, 'DrugStore'
		, 'DrugUnitsStore'
		, 'InfusionStore'
		, 'CTOS'
		],
	views: [
		'Authoring.References'
		, 'Authoring.Hydration'
		, 'Authoring.DrugRegimen'
		, 'Authoring.AddReference'
		, 'Authoring.CreateNewTemplate'
		, 'Authoring.CycleLength'

		, 'Common.Search4Template'
		, "Common.selCTOSTemplate"
		, "Common.selTemplateType"
		, "Common.selDiseaseAndStage"
		, "Common.selDisease"
		, "Common.selDiseaseStage"
		, "Common.selTemplate"
		, "Common.selSequence"

		],


	refs: [
		{
		ref: "NewTemplate",
		selector: "AuthoringTab CreateNewTemplate"
	},

		{
		ref: "ExistingTemplate",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"]"
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
		ref: "TemplateSource",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selTemplateType"
	},


		{
		ref: "Template",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selTemplate"
	},

		{
		ref: "ResetButton",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] button[title=\"ResetFilter\"]"
	},

		{
		ref: 'NewPlanTemplate',
		selector: 'NewPlanTab PatientInfo CTOS selCTOSTemplate selTemplate'
	},

		{
		ref: "PatientNameField",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] textfield[name=\"PatientName\"]"
	},


		{
		ref: "ExistingCourseInfo",
		selector: "AuthoringTab container[name=\"courseInfo\"]"
	},


		// Reference Buttons
	{
		ref: "RemoveReference",
		selector: "AuthoringTab TemplateReferences button[title=\"RemoveReference\"]"
	}, {
		ref: 'EditReference',
		selector: 'AuthoringTab TemplateReferences button[title="EditReference"]'
	},


		// Reference Fields
	{
		ref: 'ReferenceName',
		selector: 'AddReference textfield[name="Reference"]'
	}, {
		ref: 'ReferenceLink',
		selector: 'AddReference textfield[name="ReferenceLink"]'
	}, {
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

		// Basic Fields (CycleLength, Regimen Name, Emotegenic Level, Febrile Neutropenia Risk)
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
		ref: "EmotegenicLevel",
		selector: "AuthoringTab combo[name=\"EmotegenicLevel\"]"
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
		selector: "TemplateReferences"
	}


	],

	// Ext.ComponentQuery.query("AddReference combo[name=\"CycleLength\"]")[0].el.dom
	init: function () {
		wccConsoleLog('Initialized Authoring Tab Panel Navigation Controller!');
		this.control({

			// Handlers for the contents within the tab panel itself
			"AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]": {
				change: this.AuthorTypeSelected
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
			},
			"AuthoringTab selTemplateType": {
				select: this.onTemplateTypeChange
			},
			"AuthoringTab selDisease": {
				select: this.DiseaseSelected,
				collapse: this.collapseCombo,
				expand: this.loadCombo
			},
			//KD - 01/23/2012 - Added collapse and expand handlers for disease stage combo
			//This was done to handle the loading issues when going back and forth between
			//CTOS and Template Authoring and random Loading issues.
			"AuthoringTab selDiseaseStage": {
				select: this.onDiseaseStageChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo

			},
			"AuthoringTab selTemplate": {
				select: this.selTemplateChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo
			},
			"AuthoringTab container[name=\"selCTOSTemplate\"] button[title=\"ResetFilter\"]": {
				click: this.resetTemplateFilter
			}
		});
	},

	//KD - 01/23/2012 - This is shared function between Disease stage combo and Select Templates combo    
	loadCombo: function (picker, eOpts) {

		var originalHiddenVal = null;
		picker.hiddenValue = picker.getRawValue();
		picker.clearValue();

		var URI, id;

		if (picker.name == "FilteredTemplates") {
			if (this.application.ResetClicked) {
				URI = Ext.URLs.Templates;
				id = null;
				originalHiddenVal = picker.hiddenValue;
			} else {
				URI = Ext.URLs.Templates + "/Cancer/";
				id = this.application.Cancer.id;
			}

		} else if (picker.name == "Select Disease Stage Control") {
			URI = Ext.URLs.DiseaseStage + "/";
			id = this.application.Cancer.id;
		} else if (picker.name == "Select Disease Control"){
                    if(null != this.application.TemplateType && null != this.application.TemplateType.id){
			URI = Ext.URLs.DiseaseType + "/Source/";
			id = this.application.TemplateType.id;
                        this.application.TemplateType.id = null;
                    }else{
                        URI = Ext.URLs.DiseaseType;
                        id = '';
                    }
                    
                    /*
                    if(eOpts.length && "Refresh" === eOpts){
                        URI = Ext.URLs.DiseaseType;
                        this.application.TemplateType.id = null;
                        id = '';
                    }else if(null != this.application.TemplateType && null != this.application.TemplateType.id){
			URI = Ext.URLs.DiseaseType + "/Source/";
			id = this.application.TemplateType.id;
                    }*/
                }

		picker.getStore().load({
			params: {
				URL: URI,
				ID: id
			},
			callback: function (records, operation, success) {
				if (success) {
					if (null != originalHiddenVal) {
						picker.setRawValue(originalHiddenVal);
					}
				}
			}
		});

	},

	collapseCombo: function (picker, eOpts) {

		if (picker.getValue() == null && picker.hiddenValue != null) {
			picker.setRawValue(picker.hiddenValue);
		}

	},


	resetTemplateFilter: function (button) {

		if (null != this.application.Template) {
			this.getTemplate().setRawValue(this.application.Template.description);
		}

		this.application.ResetClicked = true;
		this.loadCombo(this.getTemplate());
		this.loadCombo(this.getDisease());
		Ext.MessageBox.alert('Success', 'Template filters have been removed. All available Templates and Cancer Types will be displayed. ');

	},

	saveTemplateAs: function (button) {
		alert("Saving Template with new name...");
		var Template = this.PrepareTemplate2Save();
		this.SaveTemplate2DB(Template, button);
		return;
	},

	saveTemplate: function (button) {
		this.application.loadMask("Please wait; Saving Template");
		var Template = this.PrepareTemplate2Save();
		this.SaveTemplate2DB(Template, button);
		return;
	},

	PrepareTemplate2Save: function () {
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
		var emotegenicLevel = this.getEmotegenicLevel().getValue();

		if (null != emotegenicLevel && null != emotegenicLevel.id) {
			emotegenicLevel = emotegenicLevel.id;
		} else if (null == emotegenicLevel) {
			emotegenicLevel = '';
		}

		var fnRisk = this.getFebrileNeutropeniaRisk().getValue();

		var preMhInstructions = this.getPreHydrationInstructions().getValue();
		var postMhInstructions = this.getPostHydrationInstructions().getValue();
		var therapyInstructions = this.getRegimenInstruction().getValue();

		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();

		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();

		var referencesArray = [], ref, limitCount = refstore.count(), i, referenceModel;

		for (i = 0; i < refstore.count(); i++) {
			referenceModel = refstore.getAt(i);
			ref = Ext.create(Ext.COMSModels.CTOS_References, {
				RefID: referenceModel.data.id,
				Ref: referenceModel.data.Reference,
				RefURI: referenceModel.data.ReferenceLink
			});
			referencesArray.push(ref);
		}

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
			ELevel: emotegenicLevel,
			FNRisk: fnRisk,
			References: referencesArray,
			PreMHInstructions: preMhInstructions,
			PostMHInstructions: postMhInstructions,
			RegimenInstruction: therapyInstructions,
			PreMHMeds: preMHArray,
			PostMHMeds: postMHArray,
			Meds: drugArray,
			Disease: diseaseId,
			DiseaseStage: diseaseStageId
		});

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
				this.getNewPlanTemplate().getStore().removeAll(true);
				this.getNewPlanTemplate().getStore().load();

				this.getTemplate().getStore().removeAll(true);
				this.getTemplate().getStore().load();

				this.clearTemplate(button);
				Ext.MessageBox.alert('Success', 'Template saved with name: ' + data.data.RegimenName);
				this.application.unMask();

			},
			failure: function (record, op) {
				wccConsoleLog("Save Template Failed");
				this.application.unMask();
				var ErrMsg = "Unknown Framework Error when attempting to save Template";
				if (op.request.scope.reader.jsonData["frameworkErr"]) {
					ErrMsg = op.request.scope.reader.jsonData["frameworkErr"];
				}
				Ext.MessageBox.alert('Failure', 'Template was not saved: ' + ErrMsg);
			}
		});
	},

	clearTemplate: function (button) {

		var NewTemplateObj = this.getNewTemplate();
		var ExistingTemplateObj = this.getExistingTemplate();
		var templateCombo = this.getTemplate();
		var selDiseaseAndStageObj = this.getNewTemplateDiseaseAndStage();
		var existingDiseaseAndStageObj = this.getTemplateDiseaseAndStage();
		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		var newTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[1];

		var lblReqFields = Ext.ComponentQuery.query("AuthoringTab container[name=\"lblRequiredFields\"]")[0];

		if (this.getExistingCourseInfo().hidden == false) {
			this.getExistingCourseInfo().hide();
			this.clearValue(this.getCourseNum());
			this.clearValue(this.getCourseNumMax());
		}

		if (this.getPatientNameField().hidden == false) {
			this.getPatientNameField().hide();
		}

		if (templateCombo.hidden == false) {
			this.getTemplate().hide();
		}

		if (ExistingTemplateObj.hidden == false) {
			ExistingTemplateObj.hide();
			this.getResetButton().hide();
		}
		if (NewTemplateObj.hidden == false) {
			NewTemplateObj.hide();
		}
		if (selDiseaseAndStageObj.hidden == false) {
			selDiseaseAndStageObj.hide();
		}
		if (existingDiseaseAndStageObj.hidden == false) {
			existingDiseaseAndStageObj.hide();
		}


		if (button != null && (button.action == 'save' || button.action == 'clear')) {
			existingTemplate.setValue(false);
			newTemplate.setValue(false);
			lblReqFields.hide();

			var thisCtl = this.getController("NewPlan.NewPlanTab");
			thisCtl.clearCTOS();

		}

		this.clearValue(this.getTemplate());
		this.getTemplate().hiddenValue = null;

		this.clearValue(this.getDisease());
		this.clearValue(this.getEmotegenicLevel());
		this.clearValue(this.getExistingDisease());
		this.clearValue(this.getDiseaseStage());
		this.clearValue(this.getExistingDiseaseStage());
		this.clearValue(this.getCycleLength());
		this.clearValue(this.getCycleLengthUnit());
		this.clearValue(this.getRegimenName());
		this.clearValue(this.getTemplateAlias());
		this.clearValue(this.getEmotegenicLevel());
		this.clearValue(this.getFebrileNeutropeniaRisk());
		this.clearValue(this.getPreHydrationInstructions());
		this.clearValue(this.getPostHydrationInstructions());
		this.clearValue(this.getRegimenInstruction());

		this.getTemplateSource().setValue('');

		//            this.getNewPlanDisease().setValue('');
		//            this.getNewPlanDiseaseStage().setValue('');
		//var templatesource = Ext.ComponentQuery.query('AuthoringTab selTemplateType')[0];
		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();
		refstore.removeAll(true);
		refgrid.getView().refresh(true);

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
		if (field.getValue() || field.getRawValue()) {
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


	// User has selected what they want to do...
	AuthorTypeSelected: function (rbtn, newValue, oldValue, eOpts) {
		wccConsoleLog("User has selected what to do");

		var NewTemplateObj = this.getNewTemplate();
		var ExistingTemplateObj = this.getExistingTemplate();
		var selDiseaseAndStageObj = this.getNewTemplateDiseaseAndStage();

		var lblReqFields = Ext.ComponentQuery.query("AuthoringTab container[name=\"lblRequiredFields\"]")[0];

		lblReqFields.show();
		var What2Do = rbtn.inputValue;

		if (newValue) {
			if (0 === What2Do) { // Select an Existing Template
				this.clearTemplate(rbtn);
				ExistingTemplateObj.show();
				selDiseaseAndStageObj.hide();
				NewTemplateObj.hide();
			} else { // Create a New Template
				this.application.loadMask();
				this.clearTemplate(rbtn);
                                this.loadCombo(this.getDisease());
				ExistingTemplateObj.hide();
				// MWB 5 Jan 2012
				// Note: need to add some code in here to clear out all the fields if an existing template was selected first.
				// Also need to alert the user that any unsaved data in their existing template will be lost and prompt them to save it first.
				this.getExistingCourseInfo().show();
				selDiseaseAndStageObj.show();
				NewTemplateObj.show();
				this.application.unMask();

			}
		}

	},

	//-------------------------------------------------------------------------
	//
	//	Template Source (National/Local/Personal) Selected - Phase 1 of the CTOS Tab
	//
	//
	onTemplateTypeChange: function (combo, recs, eOpts) {
		wccConsoleLog("Select Template Type");
		if (null !== recs[0]) {
		this.application.TemplateType = recs[0].data;
		}
		var obj = this.getTemplateDiseaseAndStage();
		obj.show();

		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		if (existingTemplate.getValue()) {
			this.getResetButton().show();
		}

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
	DiseaseSelected: function (combo, recs, eOpts) {
		wccConsoleLog('Disease Type has been selected');
		if (this.application.Cancer != recs[0].data) {
			this.application.ResetClicked = false;
		}
		this.application.Cancer = recs[0].data;
		this.getTemplate().show();
	},



	//-------------------------------------------------------------------------
	//
	//	Disease Stage Selected - Phase 2 of the CTOS Tab
	//
	//
	onDiseaseStageChange: function (combo, recs, eOpts) {
		wccConsoleLog("Disease Type and Stage has been selected");
		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		this.application.Cancer.Stage = recs[0].data;

		combo.hiddenValue = recs[0].data.name;

		this.getTemplate().show();

		if (existingTemplate.getValue()) {
			this.getResetButton().show();
		}


	},

	afterCTOSLoaded: function (template) {
		wccConsoleLog("CTOS Loaded - Processing");

		this.getExistingCourseInfo().show();
		this.getNewTemplate().show();

                var disease = this.getExistingDisease();

                var diseaseRecord = disease.getStore().getById(template.data.Disease);

                if(null === diseaseRecord){
                    var authorCtl = this.getController("Authoring.AuthoringTab");
                    disease.getStore().load({
                        params: {
                                URL: Ext.URLs.DiseaseType + "/",
                                ID: disease.getValue()
                        },
                        callback: function (records, operation, success) {
                                if (success) {
                                    var diseaseRecord = disease.getStore().getById(disease.getValue());
                                    authorCtl.afterFindDisease(template);
                                }else{
                                    Ext.MessageBox.alert('Failure', 'Cancer type could not be found for this template. ');
                                }
                        }
                    });

                }else {
                    this.afterFindDisease(template);
                }
        },
        
        afterFindDisease: function (template){

		this.getExistingDisease().setValue(template.data.Disease);

		this.getExistingDiseaseStage().setValue(template.data.DiseaseStage[0].name);

		this.getCourseNum().setValue(template.data.CourseNum);
		this.getCourseNumMax().setValue(template.data.CourseNumMax);

		this.getCycleLength().setValue(template.data.CycleLength);

		this.getCycleLengthUnit().setValue(template.data.CycleLengthUnit[0].name);

		this.getRegimenName().setValue(template.data.RegimenName);

		this.getEmotegenicLevel().setValue(template.data.ELevel[0].name);

		this.getFebrileNeutropeniaRisk().setValue(template.data.FNRisk);

		this.getPreHydrationInstructions().setValue(template.data.PreMHInstructions);

		this.getPostHydrationInstructions().setValue(template.data.PostMHInstructions);

		this.getRegimenInstruction().setValue(template.data.RegimenInstruction);


		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();
		refstore.removeAll();

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
		refstore.add(template.data.References);
		drugstore.add(template.data.Meds);
		postMhStore.add(template.data.PostMHMeds);

		this.application.unMask();

	},

	selTemplateChange: function (combo, recs, eOpts) {
		wccConsoleLog("Template has been selected");

		var CTOSModelParam = recs[0].data.id;

		wccConsoleLog("Template Params = " + CTOSModelParam);

		//this.getTemplate().hiddenValue = recs[0].data.description;
		this.application.Template = recs[0].data;

		combo.hiddenValue = this.application.Template.description;

		this.application.loadMask();


		var mytemplate;
		var authoringCtl = this.getController("Authoring.AuthoringTab");

		//KD - 01/23/2012 - Modified the way the CTOS object gets loaded. This should help with performance.
		this.getStore('CTOS').load({
			params: {
				URL: Ext.URLs.CTOS,
				id: this.application.Template.id
			},
			callback: function (records, operation, success) {
				if (success) {
					mytemplate = this.getAt(0);
					authoringCtl.afterCTOSLoaded(mytemplate);
				} else {
					authoringCtl.application.unMask();
					Ext.MessageBox.alert('Failure', 'Load Template Failed: ' + operation.request.scope.reader.jsonData["frameworkErr"]);

				}
			}
		});

	},




	//--------------------------------------------------------------------------------
	//	Reference Grid Handlers
	//
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
				id: '9',
				value: this.getReferenceName().getValue(),
				description: this.getReferenceLink().getValue()
			});

			//KD - 12/28/11 - Record is being edited
		} else {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
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

				//KD - 12/28/11 - Check to ensure the duplicate record is in the combo store
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
							id: op.request.scope.reader.jsonData["lookupid"],
							Reference: record.data.value,
							ReferenceLink: record.data.description
						});
					}
					catch (e) {
					}
				}


				//KD - 12/28/11 - If the record does not exist in the grid store then add it to the grid
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
