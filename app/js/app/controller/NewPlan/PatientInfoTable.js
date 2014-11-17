/*************************************
 *
 *	Note: Once the BSA is calculated it's stored in the "this.application.Patient.BSA" variable for global access.
 *	The name of the BSA Formula (Mosteller, DuBois, etc) is also stored in "this.application.Patient.BSA_Method"
 *
 *************************************/
Ext.define("COMS.controller.NewPlan.PatientInfoTable", {
	extend: "Ext.app.Controller",
	views : [
		"NewPlan.PatientInfoTable"
	],
	WeightInKilos : 0,
	Weight2Use : 0,
	TypeOfWeight : "",
	HeightInMeters : 0,


	refs: [
		{
			ref: "PatientInfo",
			selector: "NewPlanTab PatientInfo"
		},
		{
			ref: "PatientInfoTable",
			selector: "NewPlanTab PatientInfo PatientInfoTable"
		},
		{
			ref: "BSA_Section",
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"]"
		},

			// Display only fields for displaying the currently selected Patients info
		{
			ref: "BSA_Gender",
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container displayfield[name=\"BSA_Gender\"]"
		},
		{
			ref: "BSA_Height",
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container displayfield[name=\"BSA_Height\"]"
		},
		{
			ref: "BSA_Weight",
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container displayfield[name=\"BSA_Weight\"]"
		},
		{
			ref: "BSA_Amputee",
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container displayfield[name=\"BSA_Amputee\"]"
		},

			// Fields
		{
			ref: "BSA_FormulaWeight",	// Combo box for selecting the type of weight to use
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container combo[name=\"BSA_FormulaWeight\"]"
		},

		{
			ref: "BSA_Formula",			// Combo box for selecting the type of BSA Formula to use
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container combo[name=\"BSA_Formula\"]"
		},
		{
			ref: "BSA_CappedValue",		// Text field (numeric filter) for manually entering the BSA Value
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container [name=\"BSA_CappedValue\"]"
		},
		{
			ref: "BSA_Calc",			// Display field to display the calculated BSA value
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container [name=\"BSA_Calc\"]"
		},
		{
			ref: "BSA_OtherWeight",		// Text field (numeric filter) for manually entering the "Other" weight Value
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container [name=\"BSA_OtherWeight\"]"
		},
		{
			ref: "BSA_CalcWeight",		// Display field to display the calculated weight based on the type of weight selected
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container [name=\"BSA_CalcWeight\"]"
		},

		{
			ref: "BSA_CalcFormula",		// Display field to display the BSA Calculation Formula
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] [name=\"BSA_CalcFormula\"]"
		},
		{
			ref: "BSA_WeightFormula",	// Display field to display the Weight Calculation Formula
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] [name=\"BSA_WeightFormula\"]"
		},
		{
			ref: "CTOS_Tabs",			// The CTOS Tabset
			selector: "NewPlanTab PatientInfo CTOS"
		},
		{
			ref: "BSA_OEM_Link",		// The Link to the OEM tab, next to the BSA Calculation
			selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSA_OEM_Link\"]"
		}
	],


	// Ext.ComponentQuery.query("NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] [name=\"BSA_CalcFormula\"]")[0].el.dom
	init: function() {
		wccConsoleLog("Initialized PatientInformationTable Controller!");
		this.application.on({ PatientSelected : this.PatientSelected, scope : this });

//		var ptInfo = Ext.ComponentQuery.query("PatientInfoTable")[0];
//		ptInfo.body.query(".AddEditAmputation");

		this.control({
			"NewPlanTab PatientInfo" : {
				afterrender : this.PatientInfoRendered
			}
		});
	},


	/* See: http://stackoverflow.com/questions/8079942/ext-js-proper-technique-to-add-listeners-to-dom-created-via-an-xtemplate */
	/* Also see: Element.addListener delegate property */
	attachCOMSEvents : function() {
		/* Switching Contrast Mode */
		/*
		Ext.getBody().on("click", function(event, target){
			alert("Switching to Normal Contrast Mode");
			location.href = document.url;
		}, null, {
			delegate: "button#NormalContrastMode"
		});
		Ext.getBody().on("click", function(event, target){
			alert("Switching to High Contrast Mode");
			location.href = document.url;
		}, null, {
			delegate: "button#HighContrastMode"
		});
		*/
	},


	PatientSelected : function(recs, eOpts) {	// MWB 10 Feb 2012 - This event is passed up from the PatientSelected handler in the NewPlanTab controller, NOT from the combo itself
		wccConsoleLog("Patient selected - Adjust BSA Calculations");
		// console.log("PatientSelected within PatientInfoTable");
		var thisCtl = this.getController("NewPlan.PatientInfoTable");
		var piData = recs[0].data;

		
		try {
			thisCtl.getBSA_WeightFormula().labelEl.dom.innerHTML = "";
			thisCtl.getBSA_CalcFormula().labelEl.dom.innerHTML = "";

			thisCtl.getBSA_FormulaWeight().setValue("");
			thisCtl.getBSA_Formula().setValue("");
			thisCtl.getBSA_WeightFormula().setValue("");
			thisCtl.getBSA_CalcFormula().setValue("");
			thisCtl.getBSA_CappedValue().setValue("");
			thisCtl.getBSA_Calc().setValue("");
			thisCtl.getBSA_OtherWeight().setValue("");
			thisCtl.getBSA_CalcWeight().setValue("");
			thisCtl.getBSA_Section().hide();
			thisCtl.getBSA_OEM_Link().hide();
		}
		catch (e) {
			// Not really an error, just that the components have not yet been rendered
			wccConsoleLog("Patient Selected - Potential Error!!!");
		}
	},

	PatientInfoRendered : function(thePanel, opts) {
		this.AssignLinkClicksInPatientInformationTable(thePanel, opts);
	},

	HandleBtnClicks : function(cmp, tag) {
		// console.log("NewPlan - PatientInfoTable - HandleBtnClicks");
		// debugger;
	},


	showAmputationWiget : function() {
		if (!this.puWinAmputations) {
			this.puWinAmputations = Ext.widget("puWinSelAmputation");
			this.puWinAmputations.show();
		}
		else {
			this.puWinAmputations.show();
		}
	},

	ShowBSAWidget : function() {
		if (!this.puWinBSA) {
			this.puWinBSA = Ext.widget("puWinSelBSA");
			this.puWinBSA.show();
		}
		else {
			try {
			this.puWinBSA.show();
		}
			catch (e) {
				this.puWinBSA = Ext.widget("puWinSelBSA");
				this.puWinBSA.show();
			}
		}
	},

	ShowCancerWidget : function() {
		if (!this.puWinCancer) {
			this.puWinCancer = Ext.widget("puWinSelCancer");
			this.puWinCancer.show();
		}
		else {
			try {
			this.puWinCancer.show();
		}
			catch (e) {
				this.puWinCancer = Ext.widget("puWinSelCancer");
				this.puWinCancer.show();
			}
		}
	},

	ShowAddCumulativeMedication : function() {
		if (!this.puWinCumDose) {
			this.puWinCumDose = Ext.widget("puWinAddCumDose");
			this.puWinCumDose.show();
		}
		else {
			try {
				this.puWinCumDose.show();
			}
			catch (e) {
				this.puWinCumDose = Ext.widget("puWinAddCumDose");
				this.puWinCumDose.show();
			}
		}
	},


	AssignLinkClicksInPatientInformationTable : function(thePanel, opts) {
	/* See: http://stackoverflow.com/questions/8079942/ext-js-proper-technique-to-add-listeners-to-dom-created-via-an-xtemplate */
		thePanel.body.on("click", 
			function( evt, target ) {
				var theClass = target.className;
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				// var tabType = target.getAttribute("tabtype");

/**
 * Amputation information is stored in the Lookup table in the following manner:
 *  Lookup_Type = 30
 *  Lookup_Type_ID = null
 *  Name = Patient GUID
 *  Description = Amputation (e.g. "Left Foot", "Lower Left Arm", etc) One Amputation per record
 *  Use Patient Controller
 **/
				switch( theClass ) {
					case "anchor AddEditAmputation" : 
						console.log("Click Anchor");
						Ext.COMS_LockSection(this.application.Patient.id, "Amputations", this.showAmputationWiget);
						break;
					case "anchor AddEditBSA" : 
						Ext.COMS_LockSection(this.application.Patient.id, "AddEditBSA", this.ShowBSAWidget);
						break;
					case "anchor AddEditCancer" : 
						Ext.COMS_LockSection(this.application.Patient.id, "AddEditCancer", this.ShowCancerWidget);
						break;
					case "anchor AddCumulativeMedication" :
						Ext.COMS_LockSection(this.application.Patient.id, "AddCumulativeMedication", this.ShowAddCumulativeMedication);
						break;
					case "anchor DoBSACalcs" : 
						thisCtl.ShowBSACalcsPUWin({}, "DoBSACalcs");
						break;
					case "anchor ShowBSACalcs" : 
						thisCtl.ShowBSACalcsPUWin({}, "ShowBSACalcs");
						break;
					case "anchor ShowAllPatientData" : 
						var Patient = this.application.Patient;
						var htmlData = prettyPrint( Patient, { maxDepth : 5 } ).innerHTML;
						Ext.create('Ext.window.Window', {
							title: 'Patient Info',
							height: 800,
							width: 950,
							autoScroll : true,
							html : htmlData
						}).show();
						break;
				}
			},
			this, 
			{
				delegate : "button.anchor"
			}
		);
	}
});
