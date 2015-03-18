Ext.application({
	name: "COMS",

	/******************** LIST OF CONTROLLERS *****************/
	controllers: [
		// Include all controllers used in this app here
		// Each controller must include all the views used by that controller
		// as part of that controller definition
		// Controllers must be included here if a store is used in the view managed by the controller
		"Navigation",
		"ProgrammerBtns",
		"CkBoxTArea",
		"Common.DEMOpuWin",
		"Common.EmeticInfo",
		"NewPlan.CTOS.FS_Toxicity",
		"Common.SelectAdverseReactionAlerts",
		"Common.puWinSelAmputation",
		"Common.puWinSelCancer",
		"Common.puWinAddCumDose",
		"Common.puWinSelBSA",
		"Common.selCTOSTemplate",
		"Common.puWinChangeAdminDate",
		"Common.MedRemindersForm",
		"Common.puWinTreatmentAmmend",
		"NewPlan.AdverseEventsHistory",
		"NewPlan.AskQues2ApplyTemplate",
		"NewPlan.NewPlanTab",
		"NewPlan.AmputationSelection",
//		"NewPlan.PatientHistory",
		"Orders.OrdersTab",
		"Authoring.AuthoringTab",
		"TemplateList.TemplateListTab",
		"TemplateList.puWinListPatients",
		"TemplatePromotion.TemplatePromotionTab",
		"Authoring.DrugRegimen",
		"Authoring.Hydration",
		"Management.AdminTab",
		"Management.DiseaseStaging",
		"Management.IntelligentDataElements",
		"Management.Toxicity",
		"Management.AddLookups",
		"Management.CumulativeDosing",
		"Management.EmeticMeds",
		"Management.Lockout",
		"Management.Inventory",
		"NewPlan.CTOS.NursingDocs.DischargeInstructions",
		"NewPlan.OEM",
		"NewPlan.PatientInfoTable",
		"NewPlan.OEM_Edit",
		"NewPlan.CTOS.FlowSheetTab",
		"NewPlan.CTOS.FlowSheetOptionalQues",
		"NewPlan.CTOS.ChronologyTab",
		"NewPlan.CTOS.PatientSummaryTab",
		"NewPlan.CTOS.NursingDocs.NursingDocs",
		"NewPlan.CTOS.NursingDocs.GenInfoTab",
		"NewPlan.CTOS.NursingDocs.AssessmentTab",
		"NewPlan.CTOS.NursingDocs.PreTreatmentTab",
		"NewPlan.CTOS.NursingDocs.TreatmentTab",
		"NewPlan.CTOS.NursingDocs.React_AssessTab",
		"NewPlan.CTOS.NursingDocs.EducationTab",
		"NewPlan.CTOS.NursingDocs.Chemotherapy",
//		"NewPlan.CTOS.NursingDocs.VitalSignsEntryForm",
		"NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions",
		"Messages.MessagesTab",
		"NewPlan.EndTreatmentSummary",
		"NewPlan.ViewEndTreatmentSummary",
		"NewPlan.TreatmentDetails"
	],

	launch: function () {
		wccConsoleLog("Launching Application Base");
//		console.log("Disable Cache - app.launch()");
		Ext.Loader.setConfig({ disableCaching:false });
		Ext.Ajax.disableCaching = false;
		Ext.Loader.config.disableCaching = false;
		Ext.HandleLogout();

		Ext.QuickTips.init();
		Ext.create("Ext.container.Container", {
			id: "AppContainer",
			renderTo: "MainContent",
			layout: "fit",
			items: [{
				xtype: "NavigationTabs"
			}, {
				xtype: "container",
				contentEl: "EndControls"
			}]
		});

		Ext.get("Loader").fadeOut({
			duration: 1000
		});
		Ext.get("application").fadeIn({
			duration: 1000
		});
		Ext.get("footer").fadeIn({
			duration: 1000
		});
		wccConsoleLog("Application created");


		/******************************
		 *
		 *	MWB 15 Feb 2012 - Added additional global functions for use throughout the app
		 *	These functions are now part of the Ext library and can be accessed anywhere via:
		 *	Ext.FcnName(params)
		 *	e.g. Ext.CalcInfusionTime( 1000, 100) returns ==> "10 / 0" (e.g. 10 hours / 0 minutes);
		 *
		 ******************************/


		Ext.apply(Ext, {
			roundNumber: function (number, decimals) { // Arguments: number to round, number of decimal places
				var n1 = parseFloat(number);
				var n2 = n1.toFixed(parseInt(decimals, 10));
				return n2;
			},
				// Note this function DOES fail if num = "123.000"
			FormatNumber : function(num) {		// Formats number with the "Always Lead, Never Follow" format (e.g. 123,456 and 0.567 not 123,456.00 or .678)
				var n1 = parseInt(num, 10);
				if (n1 == num) {
					return Ext.util.Format.number(num, "0,000");
				}
				var ret = Ext.util.Format.number(num, "0,000.00");
				var n = ret.search(/0$/i);
				if (n>0) {
					ret = ret.substring(0, ret.length - 1);
				}
				 return ret;
			},

			in2cm: function (height) { // Inches to Centimeters; rounded to 2 decimal places
				return Ext.In2CM(height);
			},

			lbs2kg: function (weight) { // Pounds to Kilograms; rounded to 2 decimal places
				return Ext.Pounds2Kilos(weight);
			},
			f2C: function (f) { // Degrees Farenheight to Celcius; rounded to 1 decimal place
				return Ext.TempF2C(f);
			},

			CalcInfusionTime: function (vol, rate, label) { // Calculate Infusion time in Hrs/Min given Volume and Rate.
				var infTime = vol / rate;
				var Hrs = infTime.toFixed(3);
				var tmp = Hrs.split(".");
				// var Frac;
				if (tmp.length > 1) {
					Hrs = tmp[0];
					// Frac = tmp[1];
				}
				var Min = 0;
				if (infTime > 1) {
					Min = ((infTime - Hrs) * 60).toFixed(0);
				} else if (infTime < 1) {
					Min = (infTime * 60).toFixed(0);
				}
				if (Min > 50) { // Handle rounding of weird flow rates, should never happen in Real World but does in testing.
					Hrs = 1 + parseInt(Hrs, 10);
					Min = 0;
				}

				var retbuf = Hrs + " / " + Min;
				if (label) {
					retbuf = (Hrs + " hrs / " + Min + " min");
				}
				return retbuf;
			}
		});
	},

	loadText: "",
	showLoadingMask: function (loadingMessage) {
		if (Ext.isEmpty(loadingMessage)) {
			this.loadText = 'Loading... Please wait';
		}
		//Use the mask function on the Ext.getBody() element to mask the body element during Ajax calls
		Ext.Ajax.on('beforerequest', function () {
				//            console.log("Loading"); 
				Ext.getBody().mask(this.loadText, 'loading');
			},
			Ext.getBody()
		);
		Ext.Ajax.on('requestcomplete', Ext.getBody().unmask, Ext.getBody());
		Ext.Ajax.on('requestexception', Ext.getBody().unmask, Ext.getBody());
	},

	loadMask: function (msg) {
		if (!msg) {
			msg = "One moment please, loading data...";
		}

		Ext.getBody().mask(msg, "x-mask-loading").setHeight(1000 + Ext.getBody().getHeight());
	},
	unMask: function () {
		Ext.getBody().unmask();
	}

});

