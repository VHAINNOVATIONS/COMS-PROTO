/*global Ext */
Ext.getHydrationFormValues = function(config, value) {
	var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
	var hydrationForm = addHydrationDrug.down('form');
	return hydrationForm.getValues();
};
Ext.HydrationRouteValidation = function(config, value){
	var values = Ext.getHydrationFormValues(config, value);
	var route = values.Infusion1;

	if (Ext.routeRequiresFluid(route)) {
		if('' === value){
			return false;
		}
	}
	return true;
};
Ext.apply(Ext.data.validations,{
			amt1hydration: function(config, value) {
				var values = Ext.getHydrationFormValues(config, value);
				if(('' === values.Amt1) && ('' === value)){
					return false;
				}
				if(('' === value) && ((values.Units1 && ('' !== values.Units1)) || (values.Infusion1 && ('' !== values.Infusion1)))) {
					return false;
				}
				return true;
			},

			unit1hydration: function(config, value){
				var values = Ext.getHydrationFormValues(config, value);
				if('' === value && ('' !== values.Amt1 || values.Infusion1 && '' !== values.Infusion1)){
					return false;
				}else{
					return true;
				}
			},

			route1hydration: function(config, value){
				var values = Ext.getHydrationFormValues(config, value);
				if('' === value && ('' !== values.Amt1 || values.Units1 && '' !== values.Units1)){
					return false;
				}else{
					return true;
				}
			},
			fluidVol1hydration: function(config, value){
				return Ext.HydrationRouteValidation(config, value);
			},
			adminTimehydration: function(config, value){
				return Ext.HydrationRouteValidation(config, value);
			},
			flowRate1hydration: function(config, value){
				return Ext.HydrationRouteValidation(config, value);
			},
			fluidType1hydration: function(config, value){
				return Ext.HydrationRouteValidation(config, value);
			}
		});

Ext.define('COMS.controller.Authoring.Hydration', {
	extend: 'Ext.app.Controller',
	stores: [
		'TotalCoursesMax',
		'CycleLengthMax',
		'TimeFrameUnit',
		'EmetogenicLevel',
		'FebrileNeutropeniaRisk',
		'ReferencesStore',
		'LUReferences',
		'HydrationStore',
		'DrugStore',
		'DrugUnitsStore',
		'InfusionStore'
	],
	views: [
		'Authoring.Hydration',
		'Authoring.AddHydrationDrug',
		'Authoring.HydrationSequence'
	],


	refs: [
		{
			ref: "AddDrugPUWindow",
			selector: "AddHydrationDrug"
		}, 
		{
			ref: "DrugPUWindow_DoseRouteFields",
			selector: "AddHydrationDrug [name=\"Dose_RouteFields\"]"
		},
		// Hydration Buttons
		{
			ref: 'RemovePreHydration',
			selector: 'AuthoringTab TemplateHydration[title="Pre Therapy"] button[text="Remove Drug"]'
		}, {
			ref: 'EditPreHydration',
			selector: 'AuthoringTab TemplateHydration[title="Pre Therapy"] button[text="Edit Drug"]'
		}, {
			ref: 'RemovePostHydration',
			selector: 'AuthoringTab TemplateHydration[title="Post Therapy"] button[text="Remove Drug"]'
		}, {
			ref: 'EditPostHydration',
			selector: 'AuthoringTab TemplateHydration[title="Post Therapy"] button[text="Edit Drug"]'
		},

		// Hydration Fields
		{
			ref: 'HydrationDrugCombo',
			selector: 'AddHydrationDrug combo[name="Drug"]'
		}, {
			ref: 'HydrationSequenceCombo',
			selector: 'AddHydrationDrug combo[name="Sequence"]'
		}, {
			ref: 'HydrationAmt1',
			selector: 'AddHydrationDrug textfield[name="Amt1"]'
		}, {
			ref: 'HydrationUnits1',
			selector: 'AddHydrationDrug combo[name="Units1"]'
		}, {
			ref: 'HydrationInfusion1',
			selector: 'AddHydrationDrug combo[name="Infusion1"]'
		}, {
			ref: "DrugRoute",
			selector: "AddHydrationDrug [name=\"Infusion1\"]"
		}, {
			ref: 'HydrationInstructions',
			selector: 'AddHydrationDrug textfield[name="Instructions"]'
		}, {
			ref: 'HydrationFluidVol1',
			selector: 'AddHydrationDrug textfield[name="FluidVol1"]'
		}, {
			ref: 'HydrationFlowRate1',
			selector: 'AddHydrationDrug textfield[name="FlowRate1"]'
		}, {
			ref: 'HydrationInfusionTime1',
			selector: 'AddHydrationDrug textfield[name="InfusionTime1"]'
		}, {
			ref: 'HydrationFluidType1',
			selector: 'AddHydrationDrug textfield[name="FluidType1"]'
		}, {
			ref: 'HydrationDay',
			selector: 'AddHydrationDrug textfield[name="Day"]'
		}, {
			ref: 'HydrationGrid',
			selector: 'AuthoringTab TemplateHydration grid'
		}, {
			ref: 'FluidInfo',
			selector: 'AddHydrationDrug container[name="fluidInfo"]'
		}, {
			ref: 'FluidInfo1',
			selector: 'AddHydrationDrug container[name="fluidInfo1"]'
		}, {
			ref: 'HydrationAdminTime',
			selector: 'AddHydrationDrug textfield[name="AdminTime"]'
		}, {
			ref: 'Dose1Spacer',
			selector: 'AddHydrationDrug container[name="dosespacer"]'
		}, {
			ref: "PatientType",
			selector: "AddHydrationDrug radiogroup[name=\"patientRadio\"]"
		}
	],


	// Ext.ComponentQuery.query('TemplatePreHydration button[text="Add Drug"]')[0].el.dom
	init: function () {
		wccConsoleLog('Initialized Authoring Tab Panel Navigation Controller!');
		this.control({
			"AddHydrationDrug" : {
				"activate" : this.ShowFields
			},
			// MWB 28 Dec 2011 - Added the Pre/Post Hydration Add Drug functionality...
			'AuthoringTab TemplateHydration button': {
				click: this.HydrationBtns
			},
			'AuthoringTab TemplateHydration grid': { // The Hydration Grid Control
				itemclick: this.clickUpdateHydration,
				itemcontextmenu: this.onCtxHandler
			},
			'AddHydrationDrug button[text="Save"]': { // Pop-up window
				click: this.SaveHydrationDrug
			},
			'HydrationSequence[name=\"Hydration Sequence\"] button[text="Save"]' : {
				click: this.SaveSequence
			},
			'AddHydrationDrug combo[name="Infusion1"]' : {
				select: this.routeSelected
			},
			'AddHydrationDrug textfield[name="FlowRate1"]' : {
				blur: this.calcInfusionTime
			},
			'AddHydrationDrug textfield[name="FluidVol1"]' : {
				blur: this.calcInfusionTime
			},
			'AddHydrationDrug combo[name="Drug"]' : {
				select: this.drugSelected,
				// collapse: this.collapseCombo,
				expand : this.loadCombo
			},
			"AddHydrationDrug combo[name=\"FluidType1\"]" : {
				beforequery: function(queryEvent) {
					delete queryEvent.combo.lastQuery;
				},
				expand: this.FluidTypeRouteSelected
			}
		});
	},

	ShowFields : function( theWin, eOpts ) {
		var RouteInfoFields = this.getDrugPUWindow_DoseRouteFields();
		var theRouteField = this.getDrugRoute();
		var v = theRouteField.getValue();
		var d = theRouteField.getDisplayValue();
		if (v) {
			RouteInfoFields.show();
		}
	},


	getDrugInfoFromVistA : function (drugName, fnc) {
		var URL = Ext.URLs.DrugInfo + "/" + encodeURIComponent(drugName.toLowerCase());
		var theWin = this.getAddDrugPUWindow();
		if (theWin) {
			theWin.setLoading( "Loading Drug Information");
		}
		Ext.Ajax.request({
			url: URL,
			scope: this,
			fnc : fnc,
			success: function(response, opts) {
				var respObj = Ext.decode(response.responseText);
				opts.fnc(respObj, this);
			},
			failure: function(response, opts) {
				var theWin = this.getAddDrugPUWindow();
				if (theWin) {
					theWin.setLoading( false );
				}
				wccConsoleLog('server-side failure with status code ' + response.status);
			}
		});
	},

	AddDrugInfoFromVistA2Store : function(respObj, theScope) {
var theValue = theScope.getHydrationInfusion1().getValue();
		var theWin = theScope.getAddDrugPUWindow();
		if (theWin) {
			theWin.setLoading( false );
		}
		var RouteCombo = theScope.getDrugRoute();
		var RouteStore = RouteCombo.getStore();
		var theRoutes = respObj.MedInfo.Routes;
		var RoutesData4Store = [];
		var aRoute;
		var i, rLen = theRoutes.length;
		for (i = 0; i < rLen; i++ ) {
			aRoute = {};
			aRoute.id = theRoutes[i].ien;
			aRoute.name = theRoutes[i].name;
			aRoute.description = theRoutes[i].ien;
			RoutesData4Store.push(aRoute);
		}
		RouteStore.loadData(RoutesData4Store);


theScope.getHydrationInfusion1().setValue(theValue);

		theScope.getDrugPUWindow_DoseRouteFields().show();
	},

	drugSelected : function(combo, recs, eOpts){
		this.getDrugPUWindow_DoseRouteFields().hide();
		var drugName;
		if(null !== recs){
			drugName = recs[0].data.name;
		}else{
			drugName = combo.getValue();
		}
		this.getDrugInfoFromVistA(drugName, this.AddDrugInfoFromVistA2Store);
	},

//	collapseCombo : function(picker,eOpts){
//		if(picker.getValue() === null && picker.hiddenValue !== null){
//			picker.setRawValue(picker.hiddenValue);
//		}
//	},

	loadCombo: function (picker, eOpts) {
		if (picker.getStore()) {		// MWB - 6/19/2012 - Added to remove the filter added to the store
			picker.getStore().clearFilter();
		}
		var originalHiddenVal = null;
		picker.hiddenValue = picker.getRawValue();
		picker.clearValue();

		var URI, id;
		var patientType = this.getPatientType().getValue().PatientType;

		if (picker.name === "Drug") {
			URI = Ext.URLs.Drugs + "/";
			id = patientType;
		}

		picker.getStore().load({
				params: {
					URL: URI,
					ID: id
				},
				callback: function (records, operation, success) {
					if (success) {
						if (null !== originalHiddenVal) {
							picker.setRawValue(originalHiddenVal);
						}
					}
				}
		});
	},

	calcInfusionTime: function(field, eOpts){

		var index = field.name.length - 1;
		var lastChar = field.name.substring(index,field.name.length);
		var fluidVol,flowRate,infusionTime;

		if('1' === lastChar){
			fluidVol = this.getHydrationFluidVol1().getValue();
			flowRate = this.getHydrationFlowRate1().getValue();
			infusionTime = this.getHydrationInfusionTime1();
		}
		if('' !== flowRate && '' !== fluidVol){
			infusionTime.setValue(Ext.CalcInfusionTime(fluidVol,flowRate,true));
		}

	},

	FluidTypeRouteSelected: function(combo, recs, eOpts){
				/* MWB - 4/17/2014 - for new requirement (*IV Fluid Type Choices Issue #80) need to get the drug to determine which fluid types are allowable */
				// var theDrug = combo.up("form").down("combo[name=\"Drug\"]");
				var theDrug = combo.up("form").down("combo[name=\"Drug\"]").valueModels[0].data;
				var theDrugID = theDrug.id;

				this.getStore('LookupStore').load({
						params: {
						URL : Ext.URLs.LookupIVFluidType4Med,
						id  : theDrugID
					}
				});
	},

	routeSelected: function(combo, recs, eOpts){
		var route=null;
		if(null !== recs){
			route = recs[0].data.name;
		}else{
			route = combo.getValue();
		}

		if(null !== route && '' !== route){
			if(Ext.routeRequiresFluid(route)) {
				if('Infusion1' === combo.getName()){
					this.getFluidInfo().show();
				}
				this.getDose1Spacer().hide();
				this.getHydrationAdminTime().show();
			}
			else if("IVP" === route){
				this.getHydrationAdminTime().show();
			}
			else {
				if('Infusion1' === combo.getName()){
					this.getFluidInfo().hide();
					this.getDose1Spacer().show();
					this.getHydrationAdminTime().hide();
				}
			}
		}
	},

	SaveSequence: function(button, opts){		// MWB - 7/19/2012 - Changes...
		wccConsoleLog("SaveSequence()");
		var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];

		var win = button.up('window');
		var HydrationType = addHydrationDrug.type;
		var theForm = win.down('form');
		var values = theForm.getValues();
		var query = "AuthoringTab TemplateHydration[title=\"" + HydrationType + " Therapy\"] grid";
		var theGrid = Ext.ComponentQuery.query(query)[0];
		var theStore = theGrid.getStore();
		var hydrationForm = addHydrationDrug.down('form');
		var hydrationValues = hydrationForm.getValues();
		var numRecords = theStore.count();

		var newRecord = this.validateRecord(hydrationValues,HydrationType);

		if (null === newRecord){
			/* Record did not pass validation and an error message has been displayed */
			return;
		}

		if ("0" === values.ApplySequence){
			hydrationValues.Sequence = numRecords + 1;
			newRecord.data.Sequence = hydrationValues.Sequence;
			this.addRecord(addHydrationDrug,newRecord,hydrationValues,theStore);
		} else if ("1" === values.ApplySequence){
			var i,  
				records = [], 
				index = hydrationValues.Sequence - 1, 
				replacedRecord = theStore.getAt(index);

			replacedRecord.data.Sequence++;
			records.push(replacedRecord);

			theStore.removeAt(index);
			theStore.insert(index++, newRecord);

			for(i = index; i <= numRecords; i++){
				var tmpModel = theStore.getAt(i);
				theStore.removeAt(i);
				theStore.insert(i,records.pop());
				if(tmpModel){
					tmpModel.data.Sequence++;
					records.push(tmpModel);
				}
			}
		}
		win.close();
		addHydrationDrug.close();

	},

	onCtxHandler: function onCtxHandler(grid,record,item,index,event) {
		event.stopEvent();
		var menu = new Ext.menu.Menu({
			items: [{
				id: 'inc',
				text: 'Increase Sequence',
				handler: function() {

					var theStore = grid.getStore();
					var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!

					var prevRecord = theStore.getAt(index-1);


					var desiredSequence = prevRecord.data.Sequence;
					var currSequence = currRecord.data.Sequence;

					currRecord.data.Sequence = desiredSequence;
					prevRecord.data.Sequence = currSequence;

					theStore.removeAt(index);
					theStore.removeAt(index-1);

					theStore.insert(index-1,currRecord);
					theStore.insert(index,prevRecord);


				}
			}, {
				id: 'dec',
				text: 'Decrease Sequence',
				handler: function() {
					var theStore = grid.getStore();
					var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!

					var nextRecord = theStore.getAt(index+1);


					var desiredSequence = nextRecord.data.Sequence;
					var currSequence = currRecord.data.Sequence;

					currRecord.data.Sequence = desiredSequence;
					nextRecord.data.Sequence = currSequence;

					theStore.removeAt(index+1);
					theStore.removeAt(index);

					theStore.insert(index,nextRecord);
					theStore.insert(index+1,currRecord);

				}
			}]
		});


		if(0 === index){
			menu.items.get('inc').disabled = true;
		}else if(index === grid.getStore().count()-1){
			menu.items.get('dec').disabled = true;
		}

		menu.showAt(event.xy);

	},



	// Used in both the Hydration and Refernce Grids
	getSelectedRecord: function (destroy) {
		var theGrid, theView, theSelModel, HasSelection = false, selRows, theRecord, theStore, theIndex;

		theGrid = Ext.ComponentQuery.query(this.theQuery)[0];
		theView = theGrid.getView();
		theSelModel = theView.getSelectionModel();
		HasSelection = theSelModel.hasSelection();
		if (HasSelection) {
			selRows = theSelModel.getSelection();
			theRecord = selRows[0];
			theStore = theView.getStore();
			theIndex = theStore.indexOf(theRecord);
			if (destroy) {
				for(var i=theStore.count()-1;i>theIndex;i--){
					var currRecord = theStore.getAt(i);
					var prvRecord = theStore.getAt(i-1);
					currRecord.data.Sequence = prvRecord.data.Sequence;
					theStore.removeAt(i);
					theStore.insert(i,currRecord);
				}
				theStore.removeAt(theIndex);
				return {};
			}
		}
        return {
            hasRecord: HasSelection,
            selModel : theSelModel,
            record: theRecord,
            rowNum: theIndex
        };
	},


	insertNewHydrationRecord: function (win, theStore, HydrationType, recNum, data) {
		var newRecord;
		var dupRecord = -1;
		var dupSequence = -1;
		var existingRecord = win.recIndex;
		var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
		var title = addHydrationDrug.title;
		wccConsoleLog("insertNewHydrationRecord()");

		newRecord = this.validateRecord(data,HydrationType);

		if (recNum > 0 && null !== newRecord) {
			/*
			 * Check if there is a duplicate.
			 * If editing a record then duplicate drug should be a different sequence number
			 * If adding a record then duplicate drug can be any record
			 */
			dupRecord = theStore.findBy(

			function (record, id) {
					if (null === existingRecord && record.data.Drug === data.Drug) {
						return true;
					}else if(record.data.Drug === data.Drug && record.data.Sequence -1 !== existingRecord){
						return true;
					}
					return false;
			});


			var isDup = false;
			/*
			 * If the duplicate was found check if duplicate is on the same admin day(s).
			 */
			if (-1 !== dupRecord) {
				var tmpRecord = theStore.getAt(dupRecord);
				var adminDays = tmpRecord.data.Day;
				adminDays = adminDays.split(",");
				var day, newAdminDays = data.Day.split(",");

				for(day in newAdminDays){
					if(Ext.Array.contains(adminDays, newAdminDays[day])){
						isDup = true;
					}
				}
			}

			if(true === isDup){
				var HyrdationCtl = this.getController("Authoring.Hydration");
				var msg = 'A duplicate medication for the same administration day exists. Would you like to continue?';

				Ext.MessageBox.show({
					title: 'Information',
					msg: msg,
					width:300,
					buttons: Ext.MessageBox.YESNO,
					fn: function(buttonId, Opts) {
						if("no" === buttonId) {
								return;
						}else{
							dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
							if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
								Ext.widget('HydrationSequence', {title: HydrationType + ' Therapy Sequence', name: 'Hydration Sequence'});
								win.close();
								return;
							}else{
								HyrdationCtl.addRecord(existingRecord,newRecord,data,theStore);
							}
						}
					}
				});
			}
			else{
				dupRecord = -1;
				dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
				if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
					Ext.widget('HydrationSequence', {title: HydrationType +' Therapy Sequence', name: 'Hydration Sequence'});
					return;
				}
				dupSequence = -1;
				win.close();
			}
		}
		if ( -1 === dupRecord && -1 === dupSequence) {
			this.addRecord(existingRecord,newRecord,data,theStore);
		}
		win.close();
	},

	validateRecord: function(data,HydrationType){
		var newRecord = Ext.create(Ext.COMSModels.Hydration, {
			hydrationType: HydrationType,
			Sequence: data.Sequence,
			Drug: data.Drug,
			Amt1: data.Amt1,
			Units1: data.Units1,
			Infusion1: data.Infusion1,
			Instructions: data.Instructions,
			FluidVol1: data.FluidVol1,
			FlowRate1: data.FlowRate1,
			InfusionTime1: data.InfusionTime1,
			FluidType1: data.FluidType1,
			Day: data.Day,
			AdminTime: data.AdminTime
		});

		var errors = newRecord.validate();
		if(errors.length > 0){
			var msg='';
			errors.each(function(error){
				msg += " message: " + error.message + "<br/>";
			});
			Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);
			return null;
		}
		return newRecord;
	},

	addRecord: function(existingRecord,newRecord,data,theStore){
		if((data.Sequence-1) === existingRecord){
			theStore.removeAt(existingRecord);
			theStore.insert(existingRecord, newRecord);
		}else if((data.Sequence-1) < theStore.count()){
			var desiredSequence = data.Sequence - 1;
			var currRecord = theStore.getAt(desiredSequence);
			currRecord.data.Sequence = existingRecord+1;

			theStore.removeAt(desiredSequence);
			theStore.insert(desiredSequence,newRecord);

			theStore.removeAt(existingRecord);
			theStore.insert(existingRecord,currRecord);
		}else{
			theStore.insert((data.Sequence-1), newRecord);
		}
	},

	SaveHydrationDrug: function (button) { // Called when clicking on the "Save" button in the Hydration Drug Pop-Up Window

		wccConsoleLog("SaveHydrationDrug()");
		var win = button.up('window');
		var HydrationType = win.type;
		wccConsoleLog("Adding new Drug to the " + HydrationType + " Drug Section");

		var query = "AuthoringTab TemplateHydration[title=\"" + HydrationType + " Therapy\"] grid";
		var theGrid = Ext.ComponentQuery.query(query)[0];
		var theStore = theGrid.getStore();
		var theForm = win.down('form');
		var values = theForm.getValues();

		/* MWB - 3/9/2015 Change in Drug Route methods due to VistA requirements means we need the name AND id (aka IEN) */
		theRouteField = this.getDrugRoute();
		values.Infusion1 = theRouteField.getDisplayValue() + " : " + theRouteField.getValue();

		var numRecords = theStore.count();
		this.insertNewHydrationRecord(win, theStore, HydrationType, numRecords, values);
	},


	// MWB 28 Dec 2011 - Added the Pre/Post Hydration Add Drug functionality...
	clickUpdateHydration: function (grid, record) {
		var panel = grid.up("container").up("container");
		var type = panel.type;
		if ("Pre" === type) {
			this.getRemovePreHydration().enable();
			this.getEditPreHydration().enable();
		} else {
			this.getRemovePostHydration().enable();
			this.getEditPostHydration().enable();
		}
	},

	addToSequenceStore: function(combo,addSequence){
		var theGrid = Ext.ComponentQuery.query(this.theQuery)[0];
		var theStore = theGrid.getStore();
		var sequenceCnt = theStore.count();
		var tmpModel;

		if(sequenceCnt==0){
			sequenceCnt++;
			tmpModel = Ext.create(Ext.COMSModels.GenericLookup,{
				id: sequenceCnt
			});
			combo.getStore().add(tmpModel);
		}else{
			if(addSequence){
				sequenceCnt++;
			}

			var store = combo.getStore();
			for(var i=1;i<=sequenceCnt;i++){
				tmpModel = Ext.create(Ext.COMSModels.GenericLookup,{
					id: i
				});
				store.add(tmpModel);

			}
		}

	},

    RemoveSelectedHydrationDrug: function (btn, text) {
        var theQuery = this.theQuery;
        if ("yes" === btn) {
            wccConsoleLog("Remove " + this.panelType + " Therapy Drug - " + this.ckRec.record.get('Drug'));
            this.getSelectedRecord(true);
        }
        else {
            var record = this.getSelectedRecord(false);   // get the record and deselect it
            if (record.hasRecord) {
                record.selModel.deselectAll();
            }
        }
        delete this.panelType;
        delete this.ckRec;
        delete this.theQuery;
    },

	EditDrugGetDetails : function(record) {
		var drugName = record.getData().Drug;
		var hdPanel = Ext.widget('AddHydrationDrug'); // Creates an instance of the "Add Hydration Drug" pop-up window
		var RouteInfoFields = this.getDrugPUWindow_DoseRouteFields();
		RouteInfoFields.hide();

		hdPanel.type = this.panelType;
		hdPanel.setTitle("Edit " + this.panelType + " Therapy Drug");
		var theCombo = this.getHydrationSequenceCombo();
		this.addToSequenceStore(theCombo,false);
		hdPanel.recIndex = this.ckRec.rowNum;	// Used in dup drug check on saving

		this.getHydrationSequenceCombo().setValue(record.data.Sequence);
		this.getHydrationDrugCombo().setValue(record.data.Drug);
		this.getHydrationAmt1().setValue(record.data.Amt1);
		this.getHydrationUnits1().setValue(record.data.Units1);

var theRouteName, theRouteID, theRoute = record.data.Infusion1;

if (theRoute.indexOf(" : ") > 0) {
	theRoute = theRoute.split(" : ");
	theRouteID = theRoute[1];
	theRouteName = theRoute[0];
	this.getHydrationInfusion1().setValue(theRouteID);
	this.getHydrationInfusion1().setRawValue(theRouteID);
}
else {
	this.getHydrationInfusion1().setValue(theRoute);
}


		this.routeSelected(this.getHydrationInfusion1(),null,null);

		this.getHydrationInstructions().setValue(record.data.Instructions);
		this.getHydrationFluidVol1().setValue(record.data.FluidVol1);
		this.getHydrationFlowRate1().setValue(record.data.FlowRate1);
		this.getHydrationInfusionTime1().setValue(record.data.InfusionTime1);
		this.getHydrationFluidType1().setValue(record.data.FluidType1);

		this.getHydrationDay().setValue(record.data.Day);
		this.getHydrationAdminTime().setValue(record.data.AdminTime);

		this.getDrugInfoFromVistA(drugName, this.AddDrugInfoFromVistA2Store);
		RouteInfoFields.show();
	},

	HydrationBtns: function (button) { // Handles the onclick event of all the buttons for both the pre and post hydration grids
		var panel = button.up("panel").up("container");
		this.theQuery = "AuthoringTab TemplateHydration[title=\"" + panel.type + " Therapy\"] grid";
		if ("Add Drug" === button.text) {
			var view, exist = Ext.ComponentQuery.query('AddHydrationDrug')[0];
			if(!exist) {
				view = Ext.widget('AddHydrationDrug'); // Creates an instance of the "Add Hydration Drug" pop-up window
			}
			else {
				view = exist;
			}
			view.type = panel.type;
			view.setTitle("Add " + panel.type + " Therapy Drug");
			this.addToSequenceStore(this.getHydrationSequenceCombo(),true);
		} else {
			var ckRec = this.getSelectedRecord(false);
			if (ckRec.hasRecord) {
				this.panelType = panel.type;
				this.ckRec = ckRec;
				var record = Ext.create(Ext.COMSModels.Hydration, ckRec.record.data);
				if ("Remove Drug" === button.text) {
					Ext.Msg.confirm( "Remove Drug", "Are you sure you want to remove this drug from this template?", this.RemoveSelectedHydrationDrug, this);
				}
				else if ("Edit Drug" === button.text) {
					wccConsoleLog("Edit " + panel.type + " Therapy Drug - " + ckRec.record.get('Drug'));
					this.EditDrugGetDetails(record);
				}
			}
			else {
				Ext.MessageBox.alert('Invalid', 'Please select a Row in the Drug Regimen Grid.');
			}
		}
		if ("Pre" === panel.type) {
			this.getRemovePreHydration().disable();
			this.getEditPreHydration().disable();
		}
		else {
			this.getRemovePostHydration().disable();
			this.getEditPostHydration().disable();
		}
	}

});
