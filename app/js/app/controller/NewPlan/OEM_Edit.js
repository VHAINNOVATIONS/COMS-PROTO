Ext.define("COMS.controller.NewPlan.OEM_Edit", {
	extend: "Ext.app.Controller",

	stores: [
            "ReasonStore", "FluidType", "DrugStore", "DrugUnitsStore", "InfusionStore"
	],


	views: [
		"NewPlan.CTOS.OEM_Edit"
	],

	refs: [
		{
			ref: "theForm",
			selector : "EditOEMRecord form"
		},
		{
			ref: "SelectedMed",
			selector : "EditOEMRecord SelectDrug"
		},
		{
			ref: "FluidVol",
			selector : "EditOEMRecord FluidVol[name=\"FluidVol\"]"
		},
		{
			ref: "FlowRate",
			selector : "EditOEMRecord FlowRate[name=\"FlowRate\"]"
		},
		{
			ref: "InfusionTime",
			selector : "EditOEMRecord displayfield[name=\"InfusionTime\"]"
		},
		{
			ref: "FluidInfo",
			selector : "EditOEMRecord container[name=\"fluidInfo\"]"
		},
        {
            ref:  "SelectReason",
            selector : "EditOEMRecord SelectReason"
        }
	],


	// Ext.ComponentQuery.query("EditOEMRecord FluidVol[name=\"FluidVol2\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Edit OEM Record Controller!");

		this.application.on({ OEMEditRecord : this.OEMEditRecord, scope : this });

		this.control({

            "EditOEMRecord button[text=\"Save\"]" : {
                click: this.SaveChanges
            },
            "EditOEMRecord button[text=\"Cancel\"]" : {
                click: this.CloseWidget
            },

			"EditOEMRecord FlowRate[name=\"FlowRate\"]" : { 
				blur : this.CalcInfusionTime
			},
			"EditOEMRecord FlowRate[name=\"FlowRate2\"]" : { 
				blur : this.CalcInfusionTime2
			},
			"EditOEMRecord InfusionMethod[name=\"InfusionMethod\"]" : {
				select: this.routeSelected
			}
		});
	},


	routeSelected : function(combo, records, eOpts) {
		var thisCtl = this.getController("NewPlan.OEM_Edit");
		var route = combo.getValue();
		var theContainer = this.getFluidInfo();
		var aContainer;
        if ("IVPB" == route || "IV" == route) {
			theContainer.show();
		}
		else {
			theContainer.hide();
		}
	},
	CalcInfusionTime : function() {
		var thisCtl = this.getController("NewPlan.OEM_Edit");

		var FluidVol = thisCtl.getFluidVol();
		var FlowRate = thisCtl.getFlowRate();
		var InfusionTime = thisCtl.getInfusionTime();

		InfusionTime.setValue( Ext.CalcInfusionTime(FluidVol.getValue(), FlowRate.getValue(), true) );
	},
	CalcInfusionTime2 : function() {
		var thisCtl = this.getController("NewPlan.OEM_Edit");

		var FluidVol = thisCtl.getFluidVol2();
		var FlowRate = thisCtl.getFlowRate2();
		var InfusionTime = thisCtl.getInfusionTime2();

		InfusionTime.setValue( Ext.CalcInfusionTime(FluidVol.getValue(), FlowRate.getValue(), true) );
	},

	SaveMedRecord : function(record, values, multipleRecords) {
		record.set(values);
		var PatientInfo = this.application.Patient;
		var MedRecord = PatientInfo.MedRecord;
		var MedRecord2Check; 
		var CycleIdx = MedRecord.CycleIdx;
		var DayIdx = MedRecord.DayIdx;
		var MedIdx = MedRecord.MedIdx;
		var MedID = MedRecord.MedID;
		var TherapyType = MedRecord.TherapyType;
		var saveCfg, CalcDayIndex;

		var AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;

		var MaxRecords = PatientInfo.OEMRecords.OEMRecords.length;
		var i, CkRecord2Match;
		for (i = 0; i < MaxRecords; i++) {
			CkRecord2Match = PatientInfo.OEMRecords.OEMRecords[i];
			if (CkRecord2Match.Cycle == CycleIdx && CkRecord2Match.Day == DayIdx) {
				CalcDayIndex = i;
			}
		}
		var Record2Change = PatientInfo.OEMRecords.OEMRecords[CalcDayIndex];


		// MWB - 3/15/2012 - Need to check if the dose unites is based on Surface Area then calculating BSA Dose then

		MedRecord.BSA_Dose1 = "";
		MedRecord.BSA_Dose2 = "";

		if (values.Units.indexOf("/m2") > 0 || values.Units.indexOf("/ m2") > 0) {
			MedRecord.BSA_Dose1 = values.Dose * PatientInfo.BSA;
		}
		MedRecord.BSA_Dose1 = Ext.GeneralRounding2Digits(MedRecord.BSA_Dose1);

		MedRecord.Dose1 = values.Dose;
		MedRecord.DoseUnits1 = values.Units;
		MedRecord.FlowRate1 = values.FlowRate;
		MedRecord.FluidType1 = values.FluidType;
		MedRecord.FluidVol1 = values.FluidVol;
		MedRecord.AdminMethod1 = values.InfusionMethod;
		MedRecord.Reason = values.Reason;

		var MedRecord1 = {};

		MedRecord1.AdminMethod1 = MedRecord.AdminMethod1;
		MedRecord1.AdminTime = MedRecord.AdminTime;
		MedRecord1.BSA_Dose1 = MedRecord.BSA_Dose1;
		MedRecord1.Dose1 = MedRecord.Dose1;
		MedRecord1.DoseUnits1 = MedRecord.DoseUnits1;
		MedRecord1.FlowRate1 = MedRecord.FlowRate1;
		MedRecord1.FluidType1 = MedRecord.FluidType1;
		MedRecord1.FluidVol1 = MedRecord.FluidVol1;
		MedRecord1.InfusionTime1 = MedRecord.InfusionTime1;
		MedRecord1.Instructions = values.Instructions;
		MedRecord1.Med = MedRecord.Med;
		MedRecord1.MedID = MedRecord.MedID;
		MedRecord1.id = MedRecord.id;
		MedRecord1.Reason = MedRecord.Reason;

		MedRecord1.MedIdx = PatientInfo.MedRecord.MedIdx;
		MedRecord1.TherapyType = PatientInfo.MedRecord.TherapyType;
		MedRecord1.AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;


		if (multipleRecords) {
			for (i = CalcDayIndex; i < MaxRecords; i++) {
				CkRecord2Match = PatientInfo.OEMRecords.OEMRecords[i];
				if ("Pre" == TherapyType) {
					MedRecord2Check = PatientInfo.OEMRecords.OEMRecords[i].PreTherapy[MedIdx - 1];
				}else if ("Post" == TherapyType) {
					MedRecord2Check = PatientInfo.OEMRecords.OEMRecords[i].PostTherapy[MedIdx - 1];
				} else {
					MedRecord2Check = PatientInfo.OEMRecords.OEMRecords[i].Therapy[MedIdx - 1];
				}
				if (MedRecord2Check.MedID === MedID) {
					if ("Pre" == TherapyType) {
						PatientInfo.OEMRecords.OEMRecords[i].PreTherapy[MedIdx - 1] = MedRecord1;
					}else if ("Post" == TherapyType) {
						PatientInfo.OEMRecords.OEMRecords[i].PostTherapy[MedIdx - 1] = MedRecord1;
					} else {
						PatientInfo.OEMRecords.OEMRecords[i].Therapy[MedIdx - 1] = MedRecord1;
					}

					saveCfg = { scope : this};
					record.save();
				}
			}
			PatientInfo.OEMDataRendered = false;		// Force the tab contents to be re-calculated
		}
		else {
			// MedRecord1.CycleIdx = PatientInfo.MedRecord.CycleIdx;
			// MedRecord1.DayIdx = PatientInfo.MedRecord.DayIdx;

			if ("Pre" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PreTherapy[MedIdx - 1] = MedRecord1;
			}else if ("Post" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PostTherapy[MedIdx - 1] = MedRecord1;
			} else {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].Therapy[MedIdx - 1] = MedRecord1;
			}

			saveCfg = { scope : this, callback : function( records, operation, success ) {
				var PatientInfo = this.application.Patient;
				var CycleIdx = PatientInfo.MedRecord.CycleIdx;
				var DayIdx = PatientInfo.MedRecord.DayIdx;
				var MedIdx = PatientInfo.MedRecord.MedIdx;
				PatientInfo.OEMDataRendered = false;		// Force the tab contents to be re-calculated
			}};
	//		record.save(saveCfg);
			record.save();
		}
	
		PatientInfo = this.application.Patient;
		PatientInfo.OEMDataRendered = false;
		this.application.fireEvent("DisplayOEMData", PatientInfo, "fromEdit");
	},
	
	SaveChanges : function(button, event, eOpts) {
		var win = button.up("window"),
			form = win.down("form"),
			record = form.getRecord(),
			values = form.getValues(),
			thisCtl = this.getController("NewPlan.OEM_Edit"),
			sReason = thisCtl.getSelectReason(),
			strReason = sReason.rawValue,
			dlgTitle = "Save Medication Edits - ",
			dlgMsg = "Save medication edits for this date only or all future Administration dates",
			newStat = "Cancel",
			theMed = thisCtl.getSelectedMed(),
			medName = theMed.getValue();

		if (!form.form.isValid()) {
			Ext.MessageBox.alert("Medication Edits", "Please select a reason for the change in medication");
			return;
		}

		values.Reason = strReason;

		Ext.Msg.show({
			title: dlgTitle + medName,
			msg: dlgMsg,
			modal: true,
			buttonText: {
				yes: 'This date Only', no: 'All Future', cancel: 'Cancel'
			},
			scope:this,
			status: newStat,
			buttons: Ext.Msg.YESNOCANCEL,
			// el : element,
			fn: function(btnID, txt, opt) {
				if ("cancel" === btnID) {
					Ext.MessageBox.alert("Medication Edit", "Medication edit - " + medName + " has been cancelled");
			    }
				else {
					if ("This date Only" === opt.buttonText[btnID]) {
						this.SaveMedRecord(record, values, false);
					}
					else if ("All Future" === opt.buttonText[btnID]) {
						this.SaveMedRecord(record, values, true);
					}
					win.close();
				}
			}
		});
	},

	CloseWidget : function(button, event, eOpts) {
        var win = button.up('window');
		win.close();
	},


// MWB 5 Mar 2012
// Note: There are currently bugs in the 4.1 Library with regards to the Table Layout which prevents controlling the hide/showing of elements
// See : http://www.sencha.com/forum/showthread.php?183820-4.1-B3-Error-when-calling-hide-on-nested-elements

	toggleFluidInfo : function(showBlock) {
		return;
/************************** KEEP IN PLACE TILL ABOVE NOTED PROBLEM CAN BE RESOLVED
		if (showBlock) {
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoSpacer\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidType\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoVol\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoRate\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionTime\"]")[0].show();
		}
		else {
			Ext.ComponentQuery.query("EditOEMRecord form container[name=\"FluidInfoSpacer\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidType\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoVol\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoRate\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionTime\"]")[0].hide();
		}
***************************/
	},

// MWB 5 Mar 2012
// Note: There are currently bugs in the 4.1 Library with regards to the Table Layout which prevents controlling the hide/showing of elements
// See : http://www.sencha.com/forum/showthread.php?183820-4.1-B3-Error-when-calling-hide-on-nested-elements
	toggleOptionalDosing : function(showBlock) {
		return;
/************************** KEEP IN PLACE TILL ABOVE NOTED PROBLEM CAN BE RESOLVED
		if (showBlock) {
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"OptionalDosingLabel\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"OptionalDosing\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"Dose2\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"Units2\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionMethod2\"]")[0].show();
		}
		else {
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"OptionalDosingLabel\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"OptionalDosing\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"Dose2\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"Units2\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionMethod2\"]")[0].hide();
		}
*****************/
	},


// MWB 5 Mar 2012
// Note: There are currently bugs in the 4.1 Library with regards to the Table Layout which prevents controlling the hide/showing of elements
// See : http://www.sencha.com/forum/showthread.php?183820-4.1-B3-Error-when-calling-hide-on-nested-elements
	toggleFluidInfo2 : function(showBlock) {
		return;
/************************** KEEP IN PLACE TILL ABOVE NOTED PROBLEM CAN BE RESOLVED
		if (showBlock) {
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfoSpacer\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidType2\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfo2Vol\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfo2Rate\"]")[0].show();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionTime2\"]")[0].show();
		}
		else {
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfo2Spacer\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidType2\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfo2Vol\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"FluidInfo2Rate\"]")[0].hide();
			Ext.ComponentQuery.query("EditOEMRecord form [name=\"InfusionTime2\"]")[0].hide();
		}
***************/
	},


	OEMEditRecord : function(MedRecord, RecordType, arg2) {
		this.application.Patient.MedRecord = MedRecord;

		var thisCtl = this.getController("NewPlan.OEM_Edit");
		var theForm = thisCtl.getTheForm();
		var ShowOptional = false;
		var ShowFluid = false, ShowFluid2 = false;

		if ("IV" == MedRecord.InfusionMethod.substr(0, 2)) {
			ShowFluid = true;
			this.toggleFluidInfo(true);
		}

        MedRecord.State = "";
		var EditRecordModel = this.getModel(Ext.COMSModels.Edit_OEMRecord);
		var aRecord = COMS.model.OEMEditRecord.create(MedRecord);


		theForm.loadRecord(aRecord);
	}


});
