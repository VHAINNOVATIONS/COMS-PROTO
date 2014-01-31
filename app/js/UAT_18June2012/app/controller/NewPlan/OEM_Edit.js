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
		}
/**
		{
			ref: "FluidVol2",
			selector : "EditOEMRecord FluidVol[name=\"FluidVol2\"]"
		},
		{
			ref: "FlowRate2",
			selector : "EditOEMRecord FlowRate[name=\"FlowRate2\"]"
		},
		{
			ref: "InfusionTime2",
			selector : "EditOEMRecord displayfield[name=\"InfusionTime2\"]"
		}
**/
	
//		{
//			ref: "MyTemplates",
//			selector: "NewPlanTab PatientInfo OEM selAppliedTemplate"
//		},
//		{
//			ref: "theTable",
//			selector : "EditOEMRecord form container[name=\"DrugRecordForm\"]"
//		},
//
//		{
//			ref: "FluidInfoSpacer",
//			selector : "EditOEMRecord form container[name=\"FluidInfoSpacer\"]"
//		}
//		{
//			ref: "FluidType",
//			selector : "EditOEMRecord [name=\"FluidType\"]"
//		}
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

	SaveChanges : function(button, event, eOpts) {
		var win = button.up("window");
		var form = win.down("form");
		var record = form.getRecord();
		var values = form.getValues();
//		debugger;
		record.set(values);
		win.close();


			var PatientInfo = this.application.Patient;
			var CycleIdx = PatientInfo.MedRecord.CycleIdx;
			var DayIdx = PatientInfo.MedRecord.DayIdx;
			var MedIdx = PatientInfo.MedRecord.MedIdx;
			var TherapyType = PatientInfo.MedRecord.TherapyType;

			var AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;
			var CalcDayIndex = ((CycleIdx - 1) * AdminDaysPerCycle) + (DayIdx - 1);
			var Record2Change = PatientInfo.OEMRecords.OEMRecords[CalcDayIndex];


var MedRecord = PatientInfo.MedRecord;

// MWB - 3/15/2012 - Need to check if the dose unites is based on Surface Area then calculating BSA Dose then

MedRecord.BSA_Dose1 = "";
MedRecord.BSA_Dose2 = "";

if (values.Units.indexOf("/m2") > 0 || values.Units.indexOf("/ m2") > 0) {
	MedRecord.BSA_Dose1 = values.Dose * PatientInfo.BSA;
}
MedRecord.BSA_Dose1 = Ext.GeneralRounding2Digits(MedRecord.BSA_Dose1);

/*** MWB - 11/8/2013 Removed optional dosing
if (values.Units2.indexOf("/m2") > 0 || values.Units2.indexOf("/ m2") > 0) {
	MedRecord.BSA_Dose2 = values.Dose2 * PatientInfo.BSA;
}
MedRecord.BSA_Dose2 = Ext.GeneralRounding2Digits(MedRecord.BSA_Dose2);
**/




MedRecord.Dose1 = values.Dose;
MedRecord.DoseUnits1 = values.Units;
MedRecord.FlowRate1 = values.FlowRate;
MedRecord.FluidType1 = values.FluidType;
MedRecord.FluidVol1 = values.FluidVol;
MedRecord.AdminMethod1 = values.InfusionMethod;

/*** MWB - 11/8/2013 Removed optional dosing
MedRecord.Dose2 = values.Dose2;
MedRecord.DoseUnits2 = values.Units2;
MedRecord.FlowRate2 = values.FlowRate2;
MedRecord.FluidType2 = values.FluidType2;
MedRecord.FluidVol2 = values.FluidVol2;
MedRecord.AdminMethod2 = values.InfusionMethod2;
**/


var MedRecord1 = {};


MedRecord1.AdminMethod1 = MedRecord.AdminMethod1;
// MedRecord1.AdminMethod2 = MedRecord.AdminMethod2;
MedRecord1.AdminTime = MedRecord.AdminTime;
MedRecord1.BSA_Dose1 = MedRecord.BSA_Dose1;
// MedRecord1.BSA_Dose2 = MedRecord.BSA_Dose2;
MedRecord1.Dose1 = MedRecord.Dose1;
// MedRecord1.Dose2 = MedRecord.Dose2;
MedRecord1.DoseUnits1 = MedRecord.DoseUnits1;
// MedRecord1.DoseUnits2 = MedRecord.DoseUnits2;
MedRecord1.FlowRate1 = MedRecord.FlowRate1;
// MedRecord1.FlowRate2 = MedRecord.FlowRate2;
MedRecord1.FluidType1 = MedRecord.FluidType1;
// MedRecord1.FluidType2 = MedRecord.FluidType2;
MedRecord1.FluidVol1 = MedRecord.FluidVol1;
// MedRecord1.FluidVol2 = MedRecord.FluidVol2;
MedRecord1.InfusionTime1 = MedRecord.InfusionTime1;
// MedRecord1.InfusionTime2 = MedRecord.InfusionTime2;
//MedRecord1.Instructions = MedRecord.Instructions;
MedRecord1.Instructions = values.Instructions;
MedRecord1.Med = MedRecord.Med;
MedRecord1.MedID = MedRecord.MedID;
MedRecord1.id = MedRecord.id;
MedRecord1.Reason = MedRecord.Reason;

MedRecord1.CycleIdx = PatientInfo.MedRecord.CycleIdx;
MedRecord1.DayIdx = PatientInfo.MedRecord.DayIdx;
MedRecord1.MedIdx = PatientInfo.MedRecord.MedIdx;
MedRecord1.TherapyType = PatientInfo.MedRecord.TherapyType;
MedRecord1.AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;





// debugger;
			if ("Pre" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PreTherapy[MedIdx - 1] = MedRecord1;
			}else if ("Post" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PostTherapy[MedIdx - 1] = MedRecord1;
			} else {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].Therapy[MedIdx - 1] = MedRecord1;
			}
			this.application.Patient.OEMDataRendered = false;		// Force the tab contents to be re-calculated

		var OEMCtl = this.getController("NewPlan.OEM");
//		var nullSet = {};
//		nullSet.OEMRecords = [];
//		OEMCtl.displayOEM_Record_Data(nullSet);

// MWB - 5/31/2012 - Passing the OEMRecords in this function breaks the display rendering.
//		OEMCtl.displayOEM_Record_Data(PatientInfo.OEMRecords);

// MWB - 5/31/2012 - Let's try adding this back in instead of the above...
//			this.application.fireEvent("DisplayOEMData", PatientInfo.OEMRecords.OEMRecords);


		var saveCfg = { scope : this, callback : function( records, operation, success ) {
			var PatientInfo = this.application.Patient;
			var CycleIdx = PatientInfo.MedRecord.CycleIdx;
			var DayIdx = PatientInfo.MedRecord.DayIdx;
			var MedIdx = PatientInfo.MedRecord.MedIdx;

		}};
		record.save(saveCfg);
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

		if ("Pre" === RecordType || "Post" === RecordType) {
			ShowOptional = true;
			this.toggleOptionalDosing(true);
			if ("IV" == MedRecord.InfusionMethod2.substr(0, 2)) {
				ShowFluid2 = true;
				this.toggleFluidInfo2(true);
			}
		}

		if ("IV" == MedRecord.InfusionMethod.substr(0, 2)) {
			ShowFluid = true;
			this.toggleFluidInfo(true);
		}

		var EditRecordModel = this.getModel(Ext.COMSModels.Edit_OEMRecord);
		var aRecord = COMS.model.OEMEditRecord.create(MedRecord);
		theForm.loadRecord(aRecord);
	}


});
