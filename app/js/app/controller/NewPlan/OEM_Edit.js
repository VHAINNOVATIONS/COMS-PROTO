Ext.define("COMS.controller.NewPlan.OEM_Edit", {
	extend: "Ext.app.Controller",
	stores: [ "ReasonStore", "FluidType", "DrugStore", "DrugUnitsStore", "InfusionStore" ],
	views: [ "NewPlan.CTOS.OEM_Edit" ],
	refs: [
		{
			ref: "theWin",
			selector : "EditOEMRecord"
		},
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
		},
		{
			ref:  "SelectRoute",
			selector : "EditOEMRecord InfusionMethod"
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
			},
			"EditOEMRecord SelectDrug" : {
				select: this.EditOEM_DrugSelected
			}
		});
	},

	// Grab the list of routes from the Drug Info and build the Route Combo Store from that list
	AddDrugInfoFromVistA2OEMEditRouteStore : function(respObj, theScope) {
		// debugger;
		respObj.MedInfo;		// { Dosages : [{key: "", name: "", value: ""}], IEN : "", Name : "", Routes : [{ code : "", ien : "", name : "" }]
		var RouteCombo = theScope.getSelectRoute();
		var RouteStore = RouteCombo.getStore();
		var theRoutes = respObj.MedInfo.Routes;
		RouteStore.loadData(theRoutes, false);

/*
		var RouteCombo = theScope.getSelectRoute();
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

		if (theScope.isDrugHydration(respObj.MedInfo)) {
			theScope.getDrugPUWindow_DoseRouteFields().show();
			theScope.getDrugRegimenAmt().hide();
			theScope.getDrugRegimenUnits().hide();
		}
		else {
			theScope.getDrugPUWindow_DoseRouteFields().show();
			theScope.getDrugRegimenAmt().show();
			theScope.getDrugRegimenUnits().show();
		}
*/
	},

	EditOEM_DrugSelected : function(combo, records, eOpts) {
		// debugger;
		this.getSelectRoute().hide();
		var drugName, drugIEN;
		if(null !== records){
			drugName = records[0].data.name;
			drugIEN = records[0].data.IEN;
			var theWin = this.getTheWin();
			// this.getDrugInfoFromVistA(drugName, drugIEN, this.AddDrugInfoFromVistA2OEMEditRouteStore);
			console.log("getDrugInfoFromVistA @ 36515"); 
			Ext.getDrugInfoFromVistA(drugName, drugIEN, theWin, this, this.AddDrugInfoFromVistA2OEMEditRouteStore);
		}
	},

	routeSelected : function(combo, records, eOpts) {
		var thisCtl = this.getController("NewPlan.OEM_Edit");
		var route = combo.getValue();
		var theContainer = this.getFluidInfo();
		var aContainer;
		var f1;
		if (Ext.routeRequiresFluid(route)) {
			theContainer.show();
			f1 = this.getFluidVol();
			f1.allowBlank = false;
			f1 = this.getFlowRate();
			f1.allowBlank = false;
		}
		else {
			theContainer.hide();
			f1 = this.getFluidVol();
			f1.allowBlank = true;
			f1 = this.getFlowRate();
			f1.allowBlank = true;
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
		// debugger;

		MedRecord1.MedIdx = PatientInfo.MedRecord.MedIdx;
		MedRecord1.TherapyType = PatientInfo.MedRecord.TherapyType;
		MedRecord1.AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;
		MedRecord1.AdminTime = MedRecord.AdminTime;
		MedRecord1.Instructions = values.Instructions;
		MedRecord1.Med = MedRecord.Med;
		MedRecord1.MedID = MedRecord.MedID;
		MedRecord1.id = MedRecord.id;
		MedRecord1.Reason = MedRecord.Reason;
		MedRecord1.CycleIdx = MedRecord.CycleIdx;

		MedRecord1.DayIdx = MedRecord.DayIdx;
		MedRecord1.InfusionMethod = MedRecord.InfusionMethod;
		MedRecord1.InfusionMethodIEN = MedRecord.InfusionMethodIEN;
		MedRecord1.MedIEN = MedRecord.MedIEN;
		MedRecord1.OEMRecordID = MedRecord.OEMRecordID;
		MedRecord1.Order_ID = MedRecord.Order_ID;
		MedRecord1.TemplateID = MedRecord.TemplateID;
		MedRecord1.TherapyID = MedRecord.TherapyID;
		MedRecord1.Units = MedRecord.Units;
		MedRecord1.TherapyType = MedRecord.TherapyType;

		if ("Therapy" == TherapyType) {
				MedRecord1.AdminMethod = MedRecord.AdminMethod1;
				MedRecord1.BSA_Dose = MedRecord.BSA_Dose1;
				MedRecord1.Dose = MedRecord.Dose1;
				MedRecord1.DoseUnits = MedRecord.DoseUnits1;
				MedRecord1.FlowRate = MedRecord.FlowRate1;
				MedRecord1.FluidType = MedRecord.FluidType1;
				MedRecord1.FluidVol = MedRecord.FluidVol1;
				MedRecord1.InfusionTime = MedRecord.InfusionTime1;
		}
		else {
				MedRecord1.AdminMethod1 = MedRecord.AdminMethod1;
				MedRecord1.BSA_Dose1 = MedRecord.BSA_Dose1;
				MedRecord1.Dose1 = MedRecord.Dose1;
				MedRecord1.DoseUnits1 = MedRecord.DoseUnits1;
				MedRecord1.FlowRate1 = MedRecord.FlowRate1;
				MedRecord1.FluidType1 = MedRecord.FluidType1;
				MedRecord1.FluidVol1 = MedRecord.FluidVol1;
				MedRecord1.InfusionTime1 = MedRecord.InfusionTime1;
		}

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
		this.application.fireEvent("DisplayOEMData", PatientInfo);
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
		var theRouteField = this.getSelectRoute();
		var theRouteStore = theRouteField.getStore();
		var idx = theRouteStore.find("name", values.InfusionMethod);
		if (idx < 0) {
			idx = theRouteStore.find("ien", values.InfusionMethod);
		}
		if (idx >= 0) {
			var theRecord = theRouteStore.getRange(idx, idx)[0].getData();
			values.InfusionMethod = theRecord.name + " : " + theRecord.ien;
		}

		var InvalidFields = form.query("field{isValid()==false}");
		if (InvalidFields.length > 0) {
			var FieldLabelBuf = "", x, y, msg;
			for (i = 0; i < InvalidFields.length; i++) {
				x = InvalidFields[i].fieldLabel;
				FieldLabelBuf = FieldLabelBuf + "<li>" + x.substring(0, x.indexOf("<")).trim() + "</li>";
			}
			msg = "The following field is invalid:";
			if (InvalidFields.length > 1) {
				msg = "The following fields are invalid:";
			}
			msg = msg + "<ul>" + FieldLabelBuf + "</ul>";
			Ext.MessageBox.alert("Medication Edits", msg);
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
		var f1;

		if (Ext.routeRequiresFluid(MedRecord.InfusionMethod)) {
			this.getFluidInfo().show();
			f1 = this.getFluidVol();
			f1.allowBlank = false;
			f1 = this.getFlowRate();
			f1.allowBlank = false;
		}
		else {
			this.getFluidInfo().hide();
			f1 = this.getFluidVol();
			f1.allowBlank = true;
			f1 = this.getFlowRate();
			f1.allowBlank = true;
		}

		MedRecord.State = "";
		var EditRecordModel = this.getModel(Ext.COMSModels.Edit_OEMRecord);
		var aRecord = COMS.model.OEMEditRecord.create(MedRecord);


		theForm.loadRecord(aRecord);
		// Get Med Info and add list of Routes to the Route Store...
		// debugger;

		var drugName = MedRecord.Med;
		var drugIEN = MedRecord.MedIEN;
		var theWin = this.getTheWin();
		// this.getDrugInfoFromVistA(drugName, drugIEN, this.AddDrugInfoFromVistA2OEMEditRouteStore);
		// console.log("getDrugInfoFromVistA @ 36875"); 
		Ext.getDrugInfoFromVistA(drugName, drugIEN, theWin, this, this.AddDrugInfoFromVistA2OEMEditRouteStore);




		var FluidVol = thisCtl.getFluidVol();
		var FlowRate = thisCtl.getFlowRate();
		var InfusionTime = thisCtl.getInfusionTime();
		InfusionTime.setValue( Ext.CalcInfusionTime(FluidVol.getValue(), FlowRate.getValue(), true) );

	}


});
