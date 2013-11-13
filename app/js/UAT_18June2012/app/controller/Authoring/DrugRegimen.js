Ext.apply(Ext.data.validations, {
    fluidVolregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    adminTimeregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    flowRateregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    fluidTyperegimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    }
});

Ext.define("COMS.controller.Authoring.DrugRegimen", {
    extend: "Ext.app.Controller",
    stores: ['DrugRegimenStore'
    , 'DrugStore'
    , 'DrugUnitsStore'
    , 'InfusionStore'
    ],
    views: ['Authoring.AddDrugRegimen', 'Management.EditLookup', 'Authoring.HydrationSequence'],
    refs: [
    // Drug Regimen Buttons
    {
        ref: 'RemoveDrugRegimen',
        selector: 'AuthoringTab TemplateDrugRegimen button[text="Remove Drug"]'
    }, {
        ref: 'EditDrugRegimen',
        selector: 'AuthoringTab TemplateDrugRegimen button[text="Edit Drug"]'
    },

    // Drug Regimen Fields
    {
        ref: 'DrugRegimenAdminDay',
        selector: 'AddDrugRegimen textfield[name="Day"]'
    }, {
        ref: 'DrugRegimenDrug',
        selector: 'AddDrugRegimen combo[name="Drug"]'
    }, {
        ref: 'DrugRegimenSequence',
        selector: 'AddDrugRegimen combo[name="Sequence"]'
    },
    {
        ref: 'DrugRegimenAmt',
        selector: 'AddDrugRegimen textfield[name="Amt"]'
    }, {
        ref: 'DrugRegimenUnits',
        selector: 'AddDrugRegimen combo[name="Units"]'
    }, {
        ref: 'DrugRegimenRoute',
        selector: 'AddDrugRegimen combo[name="Route"]'
    }, {
        ref: 'DrugRegimenFluidVol',
        selector: 'AddDrugRegimen textfield[name="FluidVol"]'
    }, {
        ref: 'DrugRegimenInfusionTime',
        selector: 'AddDrugRegimen textfield[name="InfusionTime"]'
    }, {
        ref: 'DrugRegimenFlowRate',
        selector: 'AddDrugRegimen textfield[name="FlowRate"]'
    }, {
        ref: 'DrugRegimenFluidType',
        selector: 'AddDrugRegimen textfield[name="FluidType"]'
    }, {
        ref: 'DrugRegimenInstructions',
        selector: 'AddDrugRegimen textfield[name="Instructions"]'
    },
    {
        ref: 'DrugRegimenGrid',
        selector: 'AuthoringTab TemplateDrugRegimen grid'
    }, {
        ref: 'FluidInfo',
        selector: 'AddDrugRegimen container[name="fluidInfo"]'
    }, {
        ref: 'DrugRegimenAdminTime',
        selector: 'AddDrugRegimen textfield[name="AdminTime"]'
    }, {
        ref: 'DoseSpacer',
        selector: 'AddDrugRegimen container[name="dosespacer"]'
    }, { 
        ref: "PatientType",
        selector: "AddDrugRegimen radiogroup[name=\"patientRadio\"]"
    }

    ],

    // Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0].el.dom
    init: function () {
        wccConsoleLog('Initialized Drug Regimen Controller!');
        this.control({
            // MWB 30 Dec 2011 - Added the Drug Regimen functionality...
            'AuthoringTab TemplateDrugRegimen button': {
                click: this.DrugRegimenBtns
            },
            'AuthoringTab TemplateDrugRegimen grid': {
                itemclick: this.clickDrugRegimenGrid,
                itemcontextmenu: this.onCtxHandler
            },
            'AddDrugRegimen button[text="Save"]': { // Pop-up window
                click: this.SaveDrugRegimen
            },
            'EditLookup button[action="save"]': {
                click: this.clickSaveDrug
            },
            'AdminTab EditLookup button[action="cancel"]': {
                click: this.clickCancelDrug
            },
            'HydrationSequence[title=\"Therapy Sequence\"] button[text="Save"]': {
                click: this.SaveSequence
            },
            'AddDrugRegimen combo[name="Route"]': {
                select: this.routeSelected
            },
            'AddDrugRegimen textfield[name="FlowRate"]': {
                blur: this.calcInfusionTime
            },
            'AddDrugRegimen textfield[name="FluidVol"]': {
                blur: this.calcInfusionTime
            },
            'AddDrugRegimen combo[name="Drug"]' : {
                collapse: this.collapseCombo,
                expand : this.loadCombo
            }
        });
    },
    collapseCombo : function(picker,eOpts){
        if(picker.getValue() == null && picker.hiddenValue != null){
            picker.setRawValue(picker.hiddenValue);		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        }

    },    
    loadCombo: function (picker, eOpts) {

			if (picker.getStore()) {		// MWB - 6/19/2012 - Added to remove the filter added to the store
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
        if ('' != flowRate && '' != fluidVol) {
            this.getDrugRegimenInfusionTime().setValue(Ext.CalcInfusionTime(fluidVol, flowRate, true));
        }

    },

    routeSelected: function (combo, recs, eOpts) {
        var route = null;

        if (null != recs) {
            route = recs[0].data.name;
        } else {
            route = combo.getValue();
        }

        if (null != route && '' != route) {
            if ("IVPB" == route || "IV" == route || "IVP" == route) {
                this.getFluidInfo().show();
                this.getDoseSpacer().hide();
                this.getDrugRegimenAdminTime().show();
                this.getStore('LookupStore').load({
                    params: {
                        URL: Ext.URLs.Lookups,
                        id: '/FluidType'
                    }
                });
            } else {
                this.getDoseSpacer().show();
                this.getDrugRegimenAdminTime().hide();
                this.getFluidInfo().hide();
            }
        }
    },

    SaveSequence: function (button) {

        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];

        var win = button.up('window');
        var theForm = win.down('form');
        var values = theForm.getValues();
        var query = "AuthoringTab TemplateDrugRegimen grid";
        var theGrid = Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var hydrationForm = drugRegimen.down('form');
        var regimenValues = hydrationForm.getValues();
        var numRecords = theStore.count();

        var newRecord = this.validateRecord(regimenValues);

        if(null == newRecord){
            return;
        }
        
        if (0 == values.ApplySequence) {

            regimenValues.Sequence = numRecords + 1;
            newRecord.data.Sequence = regimenValues.Sequence;
            this.addRecord(drugRegimen,newRecord,regimenValues,theStore);
            
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
                id: 'inc',
                text: 'Increase Sequence',
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
                id: 'dec',
                text: 'Decrease Sequence',
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
            menu.items.get('inc').disabled = true;
        } else if (index == grid.getStore().count() - 1) {
            menu.items.get('dec').disabled = true;
        }
        menu.showAt(event.xy);
    },


    clickSaveDrug: function (button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();

        var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, {
            id: '26',
            value: values.name,
            description: values.description
        });

        lookupRecord.save({
            scope: this,
            waitMsg: 'Saving Data...',
            success: function (data) {
                wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
                win.close();
            },
            failure: function (err) {

                Ext.MessageBox.alert('Invalid', 'This Drug already exists.');

            }
        });
    },

    clickCancelDrug: function (button) {
        var win = button.up('window');
        win.close();
    },

    getSelectedRecord: function (destroy, query) {
        
        var theGrid, theView, theSelModel, HasSelection = false, selRows, theRecord, theStore, theIndex;

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
            record: theRecord,
            rowNum: theIndex
        };
    },

    insertNewDrugRegimenRecord: function (win, theStore, recNum, data) {
        var newRecord;
        var dupRecord = -1;
        var dupSequence = -1;
        var existingRecord = win.recIndex;
        var addDrugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
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
                    }else if(record.data.Drug === data.Drug && record.data.Sequence -1 != existingRecord){
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
                newAdminDays = data.Day.split(",");
                
                for(day in newAdminDays){
                    if(Ext.Array.contains(adminDays, newAdminDays[day])){
                        isDup = true;
                    }
                }
                
            }
            
            if(true === isDup){
                var DrugRegimenCtl = this.getController("Authoring.DrugRegimen");
                
                var msg = 'A duplicate medication for the same administration day exists. Would you like to continue?';
                
                Ext.MessageBox.show({
                        title: 'Information',
                        msg: msg,
                        width:300,
                        buttons: Ext.MessageBox.YESNO,
                        fn: function(buttonId) {
                            if("no" === buttonId) {
                                    return;
                                    win.close();

                            }else{
                                
                                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
                                    Ext.widget('HydrationSequence', {title: 'Therapy Sequence'});
                                    return;
                                }else{
                                    DrugRegimenCtl.addRecord(existingRecord,newRecord,data,theStore);
                                    win.close();
                                }
                            }
                        }
                });
                
            }else{
                dupRecord = -1;
                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
                    Ext.widget('HydrationSequence', {title: 'Therapy Sequence'});
                    return;
                }else if(dupSequence == dupSequence){
                    dupSequence = -1;
                }
                win.close();

            }

        }else{
            win.close();
        }
        
        if ( -1 == dupRecord && -1 == dupSequence) {
            this.addRecord(existingRecord,newRecord,data,theStore);
        }

    },
    addRecord: function(existingRecord,newRecord,data,theStore){
        
        
        if((data.Sequence-1) == existingRecord){
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

    validateRecord: function(data){

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
            var msg = '';

            errors.each(function (error) {
                //msg += "field: " + error.field + " message: " + error.message + "<br/>";
                msg += " message: " + error.message + "<br/>";
            });

            Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);
            return null;
        }else{
            return newRecord;
        }
        
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
    DrugRegimenBtns: function (button) { // Handles the onclick event of all the buttons for the Drug Regimen grid
        var ckRec = this.getSelectedRecord(false);
        var theQuery = "AuthoringTab TemplateDrugRegimen grid";
        var exist, view, puWin;
        if ("Add Drug" === button.text) {

            //KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
            exist = Ext.ComponentQuery.query('AddDrugRegimen')[0];
            if (!exist) {
                puWin = Ext.widget('AddDrugRegimen'); // Creates an instance of the "Add Drug Regimen" pop-up window
            } else {
                puWin = exist;
            }
            //KD
            this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, true);
        } else if ("AddNonForma" === button.title) {

            //KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
            exist = Ext.ComponentQuery.query('EditLookup')[0];
            if (!exist) {
                view = Ext.widget('EditLookup');
            } else {
                view = exist;
            }
            //KD
            view.setTitle("Add Non-Formulary Drug");
        } else if ("Edit Drug" === button.text) {
            if (ckRec.hasRecord) {   
                var record = Ext.create(Ext.COMSModels.DrugRegimen, ckRec.record.data);
                wccConsoleLog("Edit Drug Regimen for - " + ckRec.record.get('Drug'));
                puWin = Ext.widget('AddDrugRegimen'); // Creates an instance of the "Add Drug Regimen" pop-up window
                puWin.setTitle("Edit Drug Regimen");

                this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, false);

                puWin.recIndex = ckRec.rowNum; // Used in dup drug check on saving
                this.getDrugRegimenSequence().setValue(record.data.Sequence);
                this.getDrugRegimenAdminDay().setValue(record.data.Day);
                this.getDrugRegimenDrug().setValue(record.data.Drug);
                this.getDrugRegimenAmt().setValue(record.data.Amt);
                this.getDrugRegimenUnits().setValue(record.data.Units);
                this.getDrugRegimenRoute().setValue(record.data.Route);
                this.getDrugRegimenFluidVol().setValue(record.data.FluidVol);
                this.getDrugRegimenInfusionTime().setValue(record.data.InfusionTime);
                this.getDrugRegimenFlowRate().setValue(record.data.FlowRate);
                this.getDrugRegimenInstructions().setValue(record.data.Instructions);
                this.getDrugRegimenAdminTime().setValue(record.data.AdminTime);
                this.getDrugRegimenFluidType().setValue(record.data.FluidType);

                this.routeSelected(this.getDrugRegimenRoute(), null, null);
            }

        } else if ("Remove Drug" === button.text) {
            wccConsoleLog("Remove Drug Regimen for - " + ckRec.record.get('Drug'));
            this.getSelectedRecord(true);
        }
        this.getRemoveDrugRegimen().disable();
        this.getEditDrugRegimen().disable();
    },

    clickDrugRegimenGrid: function (grid, record) {
        this.getRemoveDrugRegimen().enable();
        this.getEditDrugRegimen().enable();
    },

    SaveDrugRegimen: function (button) { // Called when clicking on the "Save" button in the Pop-Up Window
        var win = button.up('window');

        wccConsoleLog("Adding new Drug Regimen");

        // var query = "AuthoringTab TemplateDrugRegimen";
        var theGrid = this.getDrugRegimenGrid(); // Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var theForm = win.down('form');
        var values = theForm.getValues();
        var numRecords = theStore.count();
        this.insertNewDrugRegimenRecord(win, theStore, numRecords, values);

    }
});
