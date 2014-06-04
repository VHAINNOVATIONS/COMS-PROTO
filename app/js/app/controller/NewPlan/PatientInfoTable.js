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
		this.application.on({ CalculateBSA : this.CalculateBSA, scope : this });
		this.application.on({ PatientSelected : this.PatientSelected, scope : this });
		this.control({
			"NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container combo[name=\"BSA_Formula\"]" : {
				select : this.BSA_Selected
			},
			"NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container combo[name=\"BSA_FormulaWeight\"]" : {
				select : this.BSA_WeightSelected
			},
			"NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"] container [name=\"BSA_CappedValue\"]" : {
				blur : this.BSA_Capped_Blur
			},
			"button[name=\"AddVitals_PatientInfoPanel\"]" : {
					click : this.ShowBSACalculations
			}
		});
	},




	/*************************************************************
	 *
	 *	BSA Calculations Modules
	 *
	 *************************************************************/

	ShowBSACalculations : function(evt, btn) {
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
		thisCtl.HandleVSFormShowCalcButtons(evt, btn);
	},


	/********
	 *
	 *	MWB - 6 Feb 2012
	 *	BSA_Completed( PatientInfo )
	 *	Call Save Method to post the BSA up to the current Patient Record
	 *	The following data is available in the Patient object passed
	 *	Patient.WeightFormula = Actual, Ideal, Adjusted, Other/Manual Entry 
	 *	Patient.Weight = The weight based on above selection
	 *	Patient.BSA_Method = DuBois, Mosteller, Haycock, Gehan and Geortge, Boyd, Capped/Manual Entry
	 *	Patient.BSA = The BSA based on above selection
	 *	When Storing the BSA Info it should be stored in the same grouping as the Patient's Height/Weight/BP since the BSA is based on a particular set of info
	 *	When retrieving the Patient's info in the "Select Patient" call, the BSA info above should also be returned as part of the "Measurements" section.
	 *
	 *	New Patient Info Record
	 *		{
	 *			"id":"28225CF5-3937-E111-9B9C-000C2935B86F", 
	 *			"name":"John Q Smith", 
	 *			"DOB":"04/15/1966", 
	 *			"Gender":"M", 
	 *			"Age":"45", 
	 *			"Measurements":[
	 *				{
	 *					"Height":"69 inches", 
	 *					"Weight":"154 lbs", 
	 *					"BP":"120/40", 
	 *					"WeightFormula" : "Actual",
	 *					"Weight" : "154 lbs",
	 *					"BSA_Method" : "DuBois",
	 *					"BSA" : "1.85",
	 *					"DateTaken":"01/19/2012"
	 *				}
	 *			], 
	 *			"Disease":[
	 *				{
	 *					"Type":"Stomach",
	 *					"Stage":"Stage I"
	 *				}, 
	 *				{
	 *					"Type":"Pancreatic",
	 *					"Stage":"Stage III"
	 *				}
	 *			],
	 *			"TemplateName":"2012-1-0001-ABCD-Dexamethasone450Pemetrexed450-20120119",
	 *			"TemplateDescription":"Appendix Cancer Mix 1 - sic",
	 *			"TemplateID":"88603EF6-D342-E111-8EFF-000C2935B86F", 
	 *			"TreatmentStart":"01/19/2012",
	 *			"TreatmentEnd":"01/24/2012",
	 *			"Amputee":"false"
	 *		}
	 *
	 *
	 ********/
	BSA_Completed : function (Patient) {	// This function is called upon completion of BSA Calculations
            var measurements = [];
            
            var measurement = Ext.create('COMS.model.PatientInfoMeasurements', {
                Height: this.application.Patient.Height,
				Weight : this.application.Patient.Weight,

				BSA_Weight: this.application.Patient.BSA_Weight,		// MWB 09 Feb 2012 - Add this to the model, this may NOT be the Weight as recorded above
                BP: this.application.Patient.BP,
                DateTaken: this.application.Patient.DateTaken,
                WeightFormula: this.application.Patient.WeightFormula,
                BSA_Method: this.application.Patient.BSA_Method,
                BSA: this.application.Patient.BSA 
            });
            
            measurements.push(measurement);
                
            var patientInfo = Ext.create(Ext.COMSModels.PatientInfo, {
                id: this.application.Patient.id,
                Measurements : measurements,
                TemplateID : this.application.Patient.TemplateID
                
            });
            
            patientInfo.save({
                scope: this,
                success: function (data) {
                    wccConsoleLog("Saved Patient measturements " );

                },
                failure: function (record, op) {
                    wccConsoleLog("Save Template Failed");
                }
            });
            
            
	},

	PatientSelected : function(recs, eOpts) {	// MWB 10 Feb 2012 - This event is passed up from the PatientSelected handler in the NewPlanTab controller, NOT from the combo itself
        wccConsoleLog("Patient selected - Adjust BSA Calculations");
        var thisCtl = this.getController("NewPlan.PatientInfoTable");
		var piData = recs[0].data;

// MWB 10 Feb 2012 - 
// Add functionality to grab BSA from the first Measurement element (which should be the most recent data) and use that to preset the BSA values for the OEM tab
// If no BSA exists for that then require the calculation of a BSA
		
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

	BSA_Capped_Blur : function(cappedFld, eOpts) {		// Called when focus moves out of the BSA_Capped Value field
		this.application.Patient.BSA = cappedFld.getRawValue();
		this.application.Patient.BSAFormula = "Capped";
		this.BSA_Completed(this.application.Patient);

        var thisCtl = this.getController("NewPlan.PatientInfoTable");

		var curTab = thisCtl.getCTOS_Tabs().getActiveTab().title;
		if ("Order Entry Management" == curTab) {
			var PatientInfo = this.application.Patient;
			this.application.fireEvent("TemplateSelected", {tabType : "OEM", templateName : PatientInfo.TemplateName, templateID : PatientInfo.TemplateID});
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
	// MWB 09 Feb 2012 - Added additional functionality
	CalculateBSA : function( opts, arg2) {
		var height = opts.height;
		var weight = opts.weight;
		var gender = opts.gender;
		var amputee = opts.amputee;

		// MWB 09 Feb 2012 - Added additional functionality
		//var DateTaken = opts.date;
		var DateTaken = Ext.Date.dateFormat(new Date(), 'Y-m-j');
		this.application.Patient.DateTaken = DateTaken;
		this.application.Patient.Weight = weight;	// This is the recorded weight.
                this.application.Patient.Height = height;
		// MWB 09 Feb 2012 - END Added additional functionality

		var WeightInKilograms =	Math.round((0.45359237 * weight.split(" ")[0]) * 100) / 100;

        var thisCtl = this.getController("NewPlan.PatientInfoTable");
		thisCtl.getBSA_Gender().setValue(gender);
		thisCtl.getBSA_Height().setValue(height + " in");
		thisCtl.getBSA_Weight().setValue(weight + " lbs (" + WeightInKilograms + " kg)");

		thisCtl.getBSA_Amputee().setValue(amputee);
		thisCtl.getBSA_Section().show();
	},

	BSA_WeightSelected : function(combo, recs, eOpts) {
        wccConsoleLog("BSA Weight Type selected");

        var thisCtl = this.getController("NewPlan.PatientInfoTable");

			// Reset fields and global values
		thisCtl.getBSA_Formula().setValue("");
		thisCtl.getBSA_CappedValue().hide();
		thisCtl.getBSA_Calc().hide();
		this.application.Patient.BSA = "";
		this.application.Patient.BSA_Method = "";

		this.WeightInKilos = 0;
		this.Weight2Use = 0;
		this.TypeOfWeight = "";

		var selection = recs[0].data;
		var Formula2UseLabel = "Formula"; 
		var Formula2Use = "";
		var Gender = thisCtl.getBSA_Gender().getValue();

		var Height = thisCtl.getBSA_Height().getValue().split(" ")[0];
		var HeightInMeters = Math.round((0.0254 * Height) * 100) / 100;
		var HeightSquared = Math.pow(HeightInMeters, 2);

		var Weight = thisCtl.getBSA_Weight().getValue().split(" ")[0];
		this.WeightInKilos =	Math.round((0.45359237 * Weight) * 100) / 100;
		var WeightSquared = Math.pow(this.WeightInKilos, 2);

		var Amputee = thisCtl.getBSA_Amputee().getValue();

		var IdealWeight = ((Height - 60) * 2.3) + 45.5;	// in KG
		if ("M" === Gender) {
			IdealWeight = ((Height - 60) * 2.3) + 50;
		}

		var AdjustedWeight = ((this.WeightInKilos - IdealWeight) * 0.25) + IdealWeight;

		var LeanWeight = (1.07 * this.WeightInKilos) - 148 * (WeightSquared / (100*HeightSquared));
		if ("M" === Gender) {
			LeanWeight = (1.1 * this.WeightInKilos) - 128 * (WeightSquared / (100*HeightSquared));
		}

		this.TypeOfWeight = selection.weightType;
		switch(selection.weightType) {
			case "Actual Weight": 
				thisCtl.getBSA_OtherWeight().hide();
				thisCtl.getBSA_CalcWeight().show();
				Formula2Use = "= " + this.WeightInKilos + " kg";
				thisCtl.getBSA_CalcWeight().setValue(this.WeightInKilos + " kg");
				this.Weight2Use = this.WeightInKilos;
				break;

			case "Ideal Weight" : 
				thisCtl.getBSA_OtherWeight().hide();
				thisCtl.getBSA_CalcWeight().show();

				if ("M" === Gender) {
					// Formula2Use = "Ideal Weight = 50 kg + 2.3 kg for each inch over 60 inches"; 
					Formula2Use = "= 50 kg + 2.3 kg for each inch over 60 inches"; 
				}
				else {
					// Formula2Use = "Ideal Weight = 45.5 kg + 2.3 kg for each inch over 60 inches"; 
					Formula2Use = "= 45.5 kg + 2.3 kg for each inch over 60 inches"; 
				}
				thisCtl.getBSA_CalcWeight().setValue(IdealWeight + " kg");
				this.Weight2Use = IdealWeight;
				break;

			case "Adjusted Weight" : 
				thisCtl.getBSA_OtherWeight().hide();
				thisCtl.getBSA_CalcWeight().show();
				// Formula2Use = "Adjusted Weight = [(Current body weight - ideal body weight) x 0.25] + Ideal Body Weight"; 
				Formula2Use = "= [(Current body weight - ideal body weight) x 0.25] + Ideal Body Weight"; 
				thisCtl.getBSA_CalcWeight().setValue(AdjustedWeight + " kg");
				this.Weight2Use = AdjustedWeight;
				break;


			case "Lean Weight" : 
				thisCtl.getBSA_OtherWeight().hide();
				thisCtl.getBSA_CalcWeight().show();
				if ("M" === Gender) {
					// Formula2Use = "Lean Weight = (1.10 x Weight(kg)) - 128 x ( Weight^2/(100 x Height)^2)"; 
					Formula2Use = "= (1.10 x Weight(kg)) - 128 x ( Weight^2/(100 x Height)^2)"; 
				}
				else {
					// Formula2Use = "Lean Weight = (1.07 x Weight(kg)) - 148 x ( Weight^2/(100 x Height)^2)"; 
					Formula2Use = "= (1.07 x Weight(kg)) - 148 x ( Weight^2/(100 x Height)^2)"; 
				}
				thisCtl.getBSA_CalcWeight().setValue(LeanWeight + " kg");
				this.Weight2Use = LeanWeight;
				break;


			case "Other" : 
				thisCtl.getBSA_CalcWeight().hide();
				thisCtl.getBSA_OtherWeight().show();
				break;
		}

		if ("Other" === selection.weightType) {
			thisCtl.getBSA_WeightFormula().hide();
		}
		else {
			thisCtl.getBSA_WeightFormula().labelEl.dom.innerHTML = Formula2UseLabel;
			thisCtl.getBSA_WeightFormula().setValue(Formula2Use);
			thisCtl.getBSA_WeightFormula().show();
		}

	},

	BSA_Selected : function(combo, recs, eOpts) {
        wccConsoleLog("BSA Formula selected");
		var selection = recs[0].data;
		var PatientInfo = this.application.Patient;
        var thisCtl = this.getController("NewPlan.PatientInfoTable");
		this.application.Patient.BSA = "";
		this.application.Patient.BSA_Method = "";

		var Height = thisCtl.getBSA_Height().getValue().split(" ")[0];
		var HeightInMeters = Math.round((0.0254 * Height) * 100) / 100;

		var Formula2Use = "";
		var BSA_Value = "";
		var temp = "";
		if ("Other" === this.TypeOfWeight) {
			temp = thisCtl.getBSA_OtherWeight().getValue();
			if ("" !== temp) {
				if("" !== temp.split(" ")[0]) {
					temp = temp.split(" ")[0];
				}
			}
			this.WeightInKilos = parseInt(temp, 10);
			this.Weight2Use = parseInt(temp, 10);
		}
		else {
			this.WeightInKilos = parseInt(this.WeightInKilos, 10);
			this.Weight2Use = parseInt(this.Weight2Use, 10);
		}
		if (0 === this.Weight2Use && "Capped" !== selection.formula) {
			alert("No Weight available to use...");
			thisCtl.getBSA_Formula().setValue("");
			thisCtl.getBSA_CappedValue().hide();
			thisCtl.getBSA_Calc().hide();
			return;
		}


		switch(selection.formula) {
			case "Capped" : 
				thisCtl.getBSA_CappedValue().show();
				thisCtl.getBSA_Calc().hide();
				Formula2Use = Ext.BSA_Formulas.Capped; 
				this.application.Patient.BSA_Method = "Manual Entry";
			break;

			case "DuBois" : 
				Formula2Use = Ext.BSA_Formulas.DuBois; 
				BSA_Value = Ext.BSA_DuBois(HeightInMeters, this.Weight2Use);

				thisCtl.getBSA_CappedValue().hide();
				thisCtl.getBSA_Calc().show();
				thisCtl.getBSA_Calc().setValue( BSA_Value );

				this.application.Patient.BSA_Method = "DuBois";
				this.application.Patient.BSA = BSA_Value;
			break;

			case "Mosteller" : 
				Formula2Use = Ext.BSA_Formulas.Mosteller;
				BSA_Value = Ext.BSA_Mosteller(HeightInMeters, this.Weight2Use);

				thisCtl.getBSA_CappedValue().hide();
				thisCtl.getBSA_Calc().show();
				thisCtl.getBSA_Calc().setValue( BSA_Value );

				this.application.Patient.BSA_Method = "Mosteller";
				this.application.Patient.BSA = BSA_Value;

			break;

			case "Haycock" : 
				Formula2Use = Ext.BSA_Formulas.Haycock;
				BSA_Value = Ext.BSA_Haycock(HeightInMeters, this.Weight2Use);

				thisCtl.getBSA_CappedValue().hide();
				thisCtl.getBSA_Calc().show();
				thisCtl.getBSA_Calc().setValue( BSA_Value );

				this.application.Patient.BSA_Method = "Haycock";
				this.application.Patient.BSA = BSA_Value;
			break;

			case "Gehan and George" : 
				Formula2Use = Ext.BSA_Formulas.Gehan_George;
				BSA_Value = Ext.BSA_Gehan_George(HeightInMeters, this.Weight2Use);

				thisCtl.getBSA_CappedValue().hide();
				thisCtl.getBSA_Calc().show();
				thisCtl.getBSA_Calc().setValue( BSA_Value );

				this.application.Patient.BSA_Method = "Gehan and George";
				this.application.Patient.BSA = BSA_Value;
			break;

			case "Boyd" : 
				Formula2Use = Ext.BSA_Formulas.Boyd;
				BSA_Value = Ext.BSA_Boyd(HeightInMeters, this.Weight2Use);

				thisCtl.getBSA_CappedValue().hide();
				thisCtl.getBSA_Calc().show();
				thisCtl.getBSA_Calc().setValue( BSA_Value );

				this.application.Patient.BSA_Method = "Boyd";
				this.application.Patient.BSA = BSA_Value;
			break;
		}
		thisCtl.getBSA_CalcFormula().show();
		thisCtl.getBSA_CalcFormula().labelEl.dom.innerHTML = "Formula ";
		thisCtl.getBSA_CalcFormula().setValue(Formula2Use);

		this.application.Patient.WeightFormula = this.TypeOfWeight;
		this.application.Patient.BSA_Weight = this.Weight2Use;		// MWB 09 Feb 2012 - Added additional functionality

		thisCtl.getBSA_OEM_Link().show();

		// If the OEM Tab is currently displayed AND the BSA has been (re)Calculated, then re-render the OEM tab as the dosing amounts have changed.
		var curTab = thisCtl.getCTOS_Tabs().getActiveTab().title;
		if ("Order Entry Management" == curTab && "Capped" !== selection.formula) {
			this.application.fireEvent("TemplateSelected", {tabType : "OEM", templateName : PatientInfo.TemplateName, templateID : PatientInfo.TemplateID});
		}

		if ("Capped" !== selection.formula) {
			this.BSA_Completed(this.application.Patient);
		}
	}

});


