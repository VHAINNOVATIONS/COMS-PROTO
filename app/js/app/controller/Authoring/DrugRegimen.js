Ext.StdRouteValidation = function (config, value) {
	var drugRegimen = Ext.ComponentQuery.query("AddDrugRegimen")[0];
	var form = drugRegimen.down("form");
	var values = form.getValues();
	var route = values.Route;

	if (Ext.routeRequiresFluid(route)) {
		if ("" == value) {
			return false;
		}
	}
	return true;
};
Ext.routeRequiresFluid = function (route) {
	route = route.toUpperCase();
	if ("IVPB" == route) {
		return true;
	}
	if ("IV" == route) {
		return true;
	}
	if ("INTRAVENOUS" == route) {
		return true;
	}

	if ("INTRATHECAL" == route) {
		return true;
	}
	if ("INTRA-ARTERIAL" == route) {
		return true;
	}
	if ("INTRA-HEPATIC" == route) {
		return true;
	}
	if ("PERITONEAL" == route) {
		return true;
	}
	if ("INTRAVESICULAR" == route) {
		return true;
	}
	if ("INTRAOCULAR" == route) {
		return true;
	}
	if ("INTRAVITREAL" == route) {
		return true;
	}
	return false;
};

Ext.apply(Ext.data.validations, {
	fluidVolregimen: function (config, value) {
		return Ext.StdRouteValidation(config, value);
	},

	adminTimeregimen: function (config, value) {
		return Ext.StdRouteValidation(config, value);
	},

	flowRateregimen: function (config, value) {
		return Ext.StdRouteValidation(config, value);
	},

	fluidTyperegimen: function (config, value) {
		return Ext.StdRouteValidation(config, value);
	}
});

Ext.define("COMS.controller.Authoring.DrugRegimen", {
	extend: "Ext.app.Controller",
	stores: ["DrugRegimenStore", "DrugStore", "DrugUnitsStore", "InfusionStore"],
	views: ["Authoring.AddDrugRegimen", "Management.EditLookup", "Authoring.HydrationSequence"],
	refs: [
		{
			ref: "AddDrugPUWindow",
			selector: "AddDrugRegimen"
		}, 
		{
			ref: "DrugPUWindow_DoseRouteFields",
			selector: "AddDrugRegimen [name=\"Dose_RouteFields\"]"
		},

        // Drug Regimen Buttons
		{
			ref: "RemoveDrugRegimen",
			selector: "AuthoringTab TemplateDrugRegimen button[text=\"Remove Drug\"]"
        }, {
			ref: "EditDrugRegimen",
			selector: "AuthoringTab TemplateDrugRegimen button[text=\"Edit Drug\"]"
        },

        // Drug Regimen Fields
		{
			ref: "DrugRegimenAdminDay",
			selector: "AddDrugRegimen textfield[name=\"Day\"]"
        }, {
			ref: "DrugRegimenDrug",
			selector: "AddDrugRegimen combo[name=\"Drug\"]"
        }, {
			ref: "DrugRegimenSequence",
			selector: "AddDrugRegimen combo[name=\"Sequence\"]"
        }, {
			ref: "DrugRegimenAmt",
			selector: "AddDrugRegimen textfield[name=\"Amt\"]"
        }, {
			ref: "DrugRegimenUnits",
			selector: "AddDrugRegimen combo[name=\"Units\"]"
        }, {
			ref: "DrugRegimenRoute",
			selector: "AddDrugRegimen combo[name=\"Route\"]"
        }, {
			ref: "DrugRegimenFluidVol",
			selector: "AddDrugRegimen textfield[name=\"FluidVol\"]"
        }, {
			ref: "DrugRegimenInfusionTime",
			selector: "AddDrugRegimen textfield[name=\"InfusionTime\"]"
        }, {
			ref: "DrugRegimenFlowRate",
			selector: "AddDrugRegimen textfield[name=\"FlowRate\"]"
        }, {
			ref: "DrugRegimenFluidType",
			selector: "AddDrugRegimen textfield[name=\"FluidType\"]"
        }, {
			ref: "DrugRegimenInstructions",
			selector: "AddDrugRegimen textfield[name=\"Instructions\"]"
        }, {
			ref: "DrugRegimenGrid",
			selector: "AuthoringTab TemplateDrugRegimen grid"
        }, {
			ref: "FluidInfo",
			selector: "AddDrugRegimen container[name=\"fluidInfo\"]"
        }, {
			ref: "DrugRegimenAdminTime",
			selector: "AddDrugRegimen textfield[name=\"AdminTime\"]"
        }, {
			ref: "DoseSpacer",
			selector: "AddDrugRegimen container[name=\"dosespacer\"]"
        }, {
			ref: "PatientType",
			selector: "AddDrugRegimen radiogroup[name=\"patientRadio\"]"
        },
		{
			ref: "DrugRoute",
			selector: "AddDrugRegimen [name=\"Route\"]"
		}


    ],

	// Ext.ComponentQuery.query("AuthoringTab TemplateDrugRegimen grid")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Drug Regimen Controller!");
		this.control({
			"AddDrugRegimen" : {
				"activate" : this.ShowFields
			},
			// MWB 30 Dec 2011 - Added the Drug Regimen functionality...
			"AuthoringTab TemplateDrugRegimen button": {
				click: this.DrugRegimenBtns
			},
			"AuthoringTab TemplateDrugRegimen grid": {
				itemclick: this.clickDrugRegimenGrid,
				itemcontextmenu: this.onCtxHandler
			},
			"AddDrugRegimen button[text=\"Save\"]": { // Pop-up window
				click: this.SaveDrugRegimen
			},
			"EditLookup button[action=\"save\"]": {
				click: this.clickSaveDrug
			},
			"EditLookup button[action=\"cancel\"]": {
				click: this.clickCancelDrug
			},

			"AdminTab EditLookup button[action=\"cancel\"]": {
				click: this.clickCancelDrug
			},
			"HydrationSequence[title=\"Therapy Sequence\"] button[text=\"Save\"]": {
				click: this.SaveSequence
			},
			"AddDrugRegimen combo[name=\"Route\"]": {
				select: this.routeSelected
			},
			"AddDrugRegimen textfield[name=\"FlowRate\"]": {
				blur: this.calcInfusionTime
			},
			"AddDrugRegimen textfield[name=\"FluidVol\"]": {
				blur: this.calcInfusionTime
			},
			"AddDrugRegimen combo[name=\"Drug\"]": {
				select: this.drugSelected,
				expand: this.loadCombo
			},
			"AddDrugRegimen combo[name=\"FluidType1\"]": {
				beforequery: function (queryEvent) {
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

	getDrugInfoFromVistA : function (drugName, drugID, fnc) {
		var URL = Ext.URLs.DrugInfo + "/" + drugID;
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

	// Grab the list of routes from the Drug Info and build the Route Combo Store from that list
	AddDrugInfoFromVistA2Store : function(respObj, theScope) {
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
		theScope.getDrugPUWindow_DoseRouteFields().show();
	},

	drugSelected : function(combo, recs, eOpts){
		// debugger;
		this.getDrugPUWindow_DoseRouteFields().hide();
		var drugName, drugID;
		if(null !== recs){
			drugName = recs[0].data.name;
			drugID = recs[0].data.IEN;
			this.getDrugInfoFromVistA(drugName, drugID, this.AddDrugInfoFromVistA2Store);
		}
	},

//	collapseCombo: function (picker, eOpts) {
//		if (picker.getValue() == null && picker.hiddenValue != null) {
//			picker.setRawValue(picker.hiddenValue); // MWB 15 Feb 2012 - Added missing ";" as per JSLint
//		}
//	},

	loadCombo: function (picker, eOpts) {

		if (picker.getStore()) { // MWB - 6/19/2012 - Added to remove the filter added to the store
			picker.getStore().clearFilter();
		}


		var originalHiddenVal = null;
		picker.hiddenValue = picker.getRawValue();
		picker.clearValue();

		var URI, id;
		var patientType = this.getPatientType().getValue().PatientType;

		if (picker.name == "Drug") {
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
					if (null != originalHiddenVal) {
						picker.setRawValue(originalHiddenVal);
					}
				}
			}
		});

	},
	calcInfusionTime: function (field, eOpts) {
		var fluidVol = this.getDrugRegimenFluidVol().getValue();
		var flowRate = this.getDrugRegimenFlowRate().getValue();
		if ("" != flowRate && "" != fluidVol) {
			this.getDrugRegimenInfusionTime().setValue(Ext.CalcInfusionTime(fluidVol, flowRate, true));
		}

	},

	/* Determine fluid Type allowed based on Medication selected */
	FluidTypeRouteSelected: function (combo, recs, eOpts) {
		var theDrug = combo.up("form").down("combo[name=\"Drug\"]").valueModels[0].data;
		var theDrugID = theDrug.id;

		this.getStore("LookupStore").load({
			params: {
				URL: Ext.URLs.LookupIVFluidType4Med,
				id: theDrugID
			}
		});
	},



	routeSelected: function (combo, recs, eOpts) {
		var route = null;

		if (null != recs) {
			route = recs[0].data.name;
		} else {
			route = combo.getValue();
		}

		if (null != route && "" != route) {
			if (Ext.routeRequiresFluid(route)) {
				this.getFluidInfo().show();
				this.getDoseSpacer().hide();
				this.getDrugRegimenAdminTime().show();
			} else if ("IVP" === route) {
				this.getDrugRegimenAdminTime().show();
			} else {
				this.getDoseSpacer().show();
				this.getDrugRegimenAdminTime().hide();
				this.getFluidInfo().hide();
			}
		}



	},

	SaveSequence: function (button) {

		var drugRegimen = Ext.ComponentQuery.query("AddDrugRegimen")[0];

		var win = button.up("window");
		var theForm = win.down("form");
		var values = theForm.getValues();
		var query = "AuthoringTab TemplateDrugRegimen grid";
		var theGrid = Ext.ComponentQuery.query(query)[0];
		var theStore = theGrid.getStore();
		var hydrationForm = drugRegimen.down("form");
		var regimenValues = hydrationForm.getValues();
		var numRecords = theStore.count();

		var newRecord = this.validateRecord(regimenValues);

		if (null == newRecord) {
			return;
		}

		if (0 == values.ApplySequence) {

			regimenValues.Sequence = numRecords + 1;
			newRecord.data.Sequence = regimenValues.Sequence;
			this.addRecord(drugRegimen, newRecord, regimenValues, theStore);

			win.close();
			drugRegimen.close();


		} else if (1 == values.ApplySequence) {

			var records = [];
			var index = regimenValues.Sequence - 1;
			var replacedRecord = theStore.getAt(index);
			var i, tmpModel;

			replacedRecord.data.Sequence++;
			records.push(replacedRecord);

			theStore.removeAt(index);
			theStore.insert(index++, newRecord);

			for (i = index; i <= numRecords; i++) {
				tmpModel = theStore.getAt(i);

				theStore.removeAt(i);
				theStore.insert(i, records.pop());

				if (null != tmpModel) {
					tmpModel.data.Sequence++;
					records.push(tmpModel);
				}
			}
			win.close();
			drugRegimen.close();
		}
	},

	onCtxHandler: function onCtxHandler(grid, record, item, index, event) {
		event.stopEvent();
		var menu = new Ext.menu.Menu({
			items: [{
				id: "inc",
				text: "Increase Sequence",
				handler: function () {
					var theStore = grid.getStore();
					var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
					var prevRecord = theStore.getAt(index - 1);

					var desiredSequence = prevRecord.data.Sequence;
					var currSequence = currRecord.data.Sequence;

					currRecord.data.Sequence = desiredSequence;
					prevRecord.data.Sequence = currSequence;

					theStore.removeAt(index);
					theStore.removeAt(index - 1);

					theStore.insert(index - 1, currRecord);
					theStore.insert(index, prevRecord);
				}
            }, {
				id: "dec",
				text: "Decrease Sequence",
				handler: function () {
					var theStore = grid.getStore();
					var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
					var nextRecord = theStore.getAt(index + 1);

					var desiredSequence = nextRecord.data.Sequence;
					var currSequence = currRecord.data.Sequence;

					currRecord.data.Sequence = desiredSequence;
					nextRecord.data.Sequence = currSequence;

					theStore.removeAt(index + 1);
					theStore.removeAt(index);

					theStore.insert(index, nextRecord);
					theStore.insert(index + 1, currRecord);
				}
            }]
		});


		if (0 == index) {
			menu.items.get("inc").disabled = true;
		} else if (index == grid.getStore().count() - 1) {
			menu.items.get("dec").disabled = true;
		}
		menu.showAt(event.xy);
	},


	clickSaveDrug: function (button) {
		var win = button.up("window");
		var form = win.down("form");
		var values = form.getValues();

		var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, {
			id: "26",
			value: values.name,
			description: values.description
		});

		lookupRecord.save({
			scope: this,
			waitMsg: "Saving Data...",
			success: function (data) {
				wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
				win.close();
			},
			failure: function (err) {

				Ext.MessageBox.alert("Invalid", "This Drug already exists.");

			}
		});
	},

	clickCancelDrug: function (button) {
		var win = button.up("window");
		win.close();
	},

	getSelectedRecord: function (destroy) {
		var i, theGrid, theView, theSelModel, HasSelection = false,
			selRows, theRecord, theStore, theIndex, currRecord, prvRecord;

		theGrid = this.getDrugRegimenGrid();
		theView = theGrid.getView();
		theSelModel = theView.getSelectionModel();
		HasSelection = theSelModel.hasSelection();
		if (HasSelection) {
			selRows = theSelModel.getSelection();
			theRecord = selRows[0];
			theStore = theView.getStore();
			theIndex = theStore.indexOf(theRecord);
			if (destroy) {
				for (i = theStore.count() - 1; i > theIndex; i--) {
					currRecord = theStore.getAt(i);
					prvRecord = theStore.getAt(i - 1);
					currRecord.data.Sequence = prvRecord.data.Sequence;
					theStore.removeAt(i);
					theStore.insert(i, currRecord);
				}
				theStore.removeAt(theIndex);
				return;
			}
		}
		return {
			hasRecord: HasSelection,
			selModel: theSelModel,
			record: theRecord,
			rowNum: theIndex
		};
	},

	insertNewDrugRegimenRecord: function (win, theStore, recNum, data) {
		var newRecord;
		var dupRecord = -1;
		var dupSequence = -1;
		var existingRecord = win.recIndex;
		var addDrugRegimen = Ext.ComponentQuery.query("AddDrugRegimen")[0];
		var title = addDrugRegimen.title;

		newRecord = this.validateRecord(data);

		if (recNum > 0 && null !== newRecord) {
			/*
			 * Check if there is a duplicate. 
			 * If editing a record then duplicate drug should be a different sequence number
			 * If adding a record then duplicate drug can be any record
			 */
			dupRecord = theStore.findBy(

				function (record, id) {
					if (null == existingRecord && record.data.Drug === data.Drug) {
						return true;
					}
					if (record.data.Drug === data.Drug && record.data.Sequence - 1 != existingRecord) {
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
				var newAdminDays = data.Day.split(",");
				var day;


				for (day in newAdminDays) {
					if (newAdminDays.hasOwnProperty(day)) {
						if (Ext.Array.contains(adminDays, newAdminDays[day])) {
							isDup = true;
						}
					}
				}

			}

			if (true === isDup) {
				var DrugRegimenCtl = this.getController("Authoring.DrugRegimen");

				var msg = "A duplicate medication for the same administration day exists. Would you like to continue?";

				Ext.MessageBox.show({
					title: "Information",
					msg: msg,
					width: 300,
					buttons: Ext.MessageBox.YESNO,
					fn: function (buttonId) {
						if ("no" === buttonId) {
							win.close();
							return;
						}
						dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
						if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0, "Edit".length) !== "Edit") {
							Ext.widget("HydrationSequence", {
								title: "Therapy Sequence"
							});
							return;
						}
						DrugRegimenCtl.addRecord(existingRecord, newRecord, data, theStore);
						win.close();
					}
				});

			} else {
				dupRecord = -1;
				dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
				if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0, "Edit".length) !== "Edit") {
					Ext.widget("HydrationSequence", {
						title: "Therapy Sequence"
					});
					return;
				}
				//if(dupSequence == dupSequence){
				dupSequence = -1;
				//}
				win.close();
			}

		} else {
			win.close();
		}

		if (-1 == dupRecord && -1 == dupSequence) {
			this.addRecord(existingRecord, newRecord, data, theStore);
		}

	},
	addRecord: function (existingRecord, newRecord, data, theStore) {


		if ((data.Sequence - 1) == existingRecord) {
			theStore.removeAt(existingRecord);
			theStore.insert(existingRecord, newRecord);
		} else if ((data.Sequence - 1) < theStore.count()) {

			var desiredSequence = data.Sequence - 1;
			var currRecord = theStore.getAt(desiredSequence);
			currRecord.data.Sequence = existingRecord + 1;

			theStore.removeAt(desiredSequence);
			theStore.insert(desiredSequence, newRecord);

			theStore.removeAt(existingRecord);
			theStore.insert(existingRecord, currRecord);

		} else {
			theStore.insert((data.Sequence - 1), newRecord);
		}

	},

	validateRecord: function (data) {

		var newRecord = Ext.create(Ext.COMSModels.DrugRegimen, {
			Drug: data.Drug,
			Amt: data.Amt,
			Units: data.Units,
			Route: data.Route,
			Day: data.Day,
			FluidVol: data.FluidVol,
			InfusionTime: data.InfusionTime,
			FlowRate: data.FlowRate,
			Instructions: data.Instructions,
			Sequence: data.Sequence,
			AdminTime: data.AdminTime,
			FluidType: data.FluidType
		});

		var errors = newRecord.validate();
		if (errors.length > 0) {
			var msg = "";

			errors.each(function (error) {
				//msg += "field: " + error.field + " message: " + error.message + "<br/>";
				msg += " message: " + error.message + "<br/>";
			});

			Ext.MessageBox.alert("Invalid", "Validation Errors:<br/>" + msg);
			return null;
		}
		return newRecord;
	},

	addToSequenceStore: function (combo, theQuery, addSequence) {
		var i, tmpModel, store;
		var theGrid = Ext.ComponentQuery.query(theQuery)[0];
		var theStore = theGrid.getStore();
		var sequenceCnt = theStore.count();

		if (sequenceCnt == 0) {
			sequenceCnt++;
			tmpModel = Ext.create(Ext.COMSModels.GenericLookup, {
				id: sequenceCnt
			});
			combo.getStore().add(tmpModel);
		} else {
			if (addSequence) {
				sequenceCnt++;
			}

			store = combo.getStore();
			for (i = 1; i <= sequenceCnt; i++) {
				tmpModel = Ext.create(Ext.COMSModels.GenericLookup, {
					id: i
				});
				store.add(tmpModel);
			}
		}
	},

	//--------------------------------------------------------------------------------
	//	Drug Regimen Grid Handlers
	//
	RemoveSelectedDrug: function (btn, text) {
		if ("yes" === btn) {
			this.getSelectedRecord(true); // bool param will either destroy (true) or return (false) the selected record
		} else {
			var record = this.getSelectedRecord(false); // get the record and deselect it
			if (record.hasRecord) {
				record.selModel.deselectAll();
			}
		}
	},
	DrugRegimenBtns: function (button) { // Handles the onclick event of all the buttons for the Drug Regimen grid
		var ckRec = this.getSelectedRecord(false);
		var theQuery = "AuthoringTab TemplateDrugRegimen grid";
		var exist, view, puWin;
		if ("Add Drug" === button.text) {

			//KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
			exist = Ext.ComponentQuery.query("AddDrugRegimen")[0];
			if (!exist) {
				puWin = Ext.widget("AddDrugRegimen"); // Creates an instance of the "Add Drug Regimen" pop-up window
			} else {
				puWin = exist;
			}
			//KD
			this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, true);
		} else if ("AddNonForma" === button.title) {

			//KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
			exist = Ext.ComponentQuery.query("EditLookup")[0];
			if (!exist) {
				view = Ext.widget("EditLookup");
			} else {
				view = exist;
			}
			//KD
			view.setTitle("Add Non-Formulary Drug");
		} else if ("Edit Drug" === button.text) {
			if (ckRec.hasRecord) {
				var record = Ext.create(Ext.COMSModels.DrugRegimen, ckRec.record.data);
				var recordData = record.getData();
				var DrugSplit = recordData.Drug.split(" : ");
				var drugName = DrugSplit[0];
				var drugID = DrugSplit[1];
				wccConsoleLog("Edit Drug Regimen for - " + ckRec.record.get("Drug"));
				puWin = Ext.widget("AddDrugRegimen"); // Creates an instance of the "Add Drug Regimen" pop-up window
				puWin.setTitle("Edit Drug Regimen");
				this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, false);
				puWin.recIndex = ckRec.rowNum; // Used in dup drug check on saving
				this.getDrugRegimenSequence().setValue(recordData.Sequence);
				this.getDrugRegimenAdminDay().setValue(recordData.Day);
				this.getDrugRegimenDrug().setValue(drugID);
				this.getDrugRegimenDrug().setRawValue(drugName);
				this.getDrugRegimenAmt().setValue(recordData.Amt);
				this.getDrugRegimenUnits().setValue(recordData.Units);
				this.getDrugRegimenRoute().setValue(recordData.Route);
				this.getDrugRegimenFluidVol().setValue(recordData.FluidVol);
				this.getDrugRegimenInfusionTime().setValue(recordData.InfusionTime);
				this.getDrugRegimenFlowRate().setValue(recordData.FlowRate);
				this.getDrugRegimenInstructions().setValue(recordData.Instructions);
				this.getDrugRegimenAdminTime().setValue(recordData.AdminTime);
				this.getDrugRegimenFluidType().setValue(recordData.FluidType);
				this.routeSelected(this.getDrugRegimenRoute(), null, null);
				var RouteInfoFields = this.getDrugPUWindow_DoseRouteFields();
				this.getDrugInfoFromVistA(drugName, drugID, this.AddDrugInfoFromVistA2Store);
				RouteInfoFields.show();
			}
		} else if ("Remove Drug" === button.text) {
			wccConsoleLog("Remove Drug Regimen for - " + ckRec.record.get("Drug"));
			Ext.Msg.confirm("Remove Drug", "Are you sure you want to remove this drug from this template?", this.RemoveSelectedDrug, this);
		}
		this.getRemoveDrugRegimen().disable();
		this.getEditDrugRegimen().disable();
	},

	clickDrugRegimenGrid: function (grid, record) {
		this.getRemoveDrugRegimen().enable();
		this.getEditDrugRegimen().enable();
	},

	SaveDrugRegimen: function (button) { // Called when clicking on the "Save" button in the Pop-Up Window
		var win = button.up("window");
		wccConsoleLog("Adding new Drug Regimen");
		var theGrid = this.getDrugRegimenGrid(); // Ext.ComponentQuery.query(query)[0];
		var theStore = theGrid.getStore();
		var theForm = win.down("form");
		var values = theForm.getValues();

		/* MWB - 3/9/2015 Change in Drug Route methods due to VistA requirements means we need the name AND id (aka IEN) */
		var theRouteField = this.getDrugRoute();
		values.Route = theRouteField.getDisplayValue() + " : " + theRouteField.getValue();

		var theDrugField = this.getDrugRegimenDrug();
		values.Drug = theDrugField.getDisplayValue() + " : " + theDrugField.getValue();

		var numRecords = theStore.count();
		this.insertNewDrugRegimenRecord(win, theStore, numRecords, values);
	}
});