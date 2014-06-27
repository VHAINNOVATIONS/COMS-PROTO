Ext.define("COMS.view.OEM.selAppliedTemplate" ,{
	extend: "Ext.form.field.ComboBox",
	alias : "widget.selAppliedTemplate",
	name : "Select Applied Template",

	store : "Templates",

	width: 600,
	size : 60,
	labelWidth: 150,
	fieldLabel: "Select a Template",
	labelAlign: "right",
	displayField: "description",
	valueField: "id",
	hidden : true
});


Ext.define("COMS.view.OEM.OEM_Level1", {
	extend : "Ext.container.Container",
	alias : "widget.OEM_Level1",
	name : "OEM_Level1", 
	autoEl : { tag : "section" },
	cls : "Tab", 
	tpl : new Ext.XTemplate(
		"<tpl for=\"Patient\">",
//			"{[this.debugger( values, parent )]}",
			"<a href=\"Patient/PrintOrders/{id}\" target=\"PrintWin\">Print</a> Orders (opens new window)&nbsp;",
			"<a href=\"Fsheet/?PID={id}&PName={name}\" target=\"FlowsheetWin\">Flowsheet</a> (opens new window)",
		"</tpl>",
		"<table border=\"1\" width=\"100%\" class=\"Therapy InformationTable\">",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=15%></colgroup>",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=61%></colgroup>",

		"	<thead><tr><th colspan=\"4\" class=\"large\">Order Entry Management (<abbr title=\"Order Entry Management\">OEM</abbr>) Information <span style=\"font-weight: normal;\">- for Patient: {PatientName}</span></th></tr></thead>",

		"	<tr><th align=\"right\">Regimen:</th><td colspan=\"3\">{RegimenName}</td></tr>",
		"	<tr><th align=\"right\">Description</th><td colspan=\"3\">{RegimenDescription}</td></tr>",
		"	<tr><th align=\"right\">Treatment Start:</th><td colspan=\"3\">{TreatmentStart}</td></tr>",
		"	<tr><th align=\"right\">Treatment End:</th><td colspan=\"3\">{TreatmentEnd}</td></tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Febrile Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		"		<td>{FNRiskDetails}</td>",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>{ELevelRecommendation}</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"3\">{[this.goalLink( values )]}</td></tr>",
		// "	<tr><th>Clinical Trial</th><td colspan=\"3\">{[this.ctLink( values )]}</td></tr>",
		// "	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"3\">{[this.PS( values )]}</td></tr>",
		"</table>",
			{
					// XTemplate Configuration
				disableFormats: true,
				debugger : function ( current, prev ) {
					// debugger;
				},
				goalLink : function ( current ) {
					return (current.Goal || "No Goal Specified - <button name=\"AddGoal\" class=\"anchor\">Add Goal</button>");
				},
				ctLink : function ( current ) {
					return (current.ClinicalTrial || "Clinical Trial Not Specified - <button name=\"AddClinicalTrial\" class=\"anchor\">Add Clinical Trial</button>");
				},
				ctData : function ( current ) {
					return "";
				},
				PS : function ( current ) {
					var buf = current.PerformanceStatus + " <button name=\"EditPerformanceStatus\" class=\"anchor\">Change Performance Status</button>";
					return (buf);
				}

			}
		)
});



// MWB - 18 Jan 2012 - Contents of this container are updated by an XTemplate in the controller file (app/controller/NewPlan/OEM.js)
Ext.define("COMS.view.OEM.dspOEMTemplateData" ,{
	extend : "Ext.container.Container",
	alias : "widget.dspOEMTemplateData",
	name : "Display Applied Template Data",

	hidden : false,
	autoEl : { tag : "section" },

	tpl : new Ext.XTemplate(
		"<section name=\"OEM_Data\">",
		
"<tpl for=\"OEMRecords\">",
	"<section {[this.SaveIdx(xindex, values.Cycle, values.Day, values, parent)]} id=\"Section_{[this.CalcName(values)]}\" class=\"OEMRecord\" {[ this.CalcStyle(values) ]}>",
		"<a href=\"#\" id=\"{[this.CalcName(values)]}\" name=\"{[this.CalcName(values)]}\"></a>",
		"<h2>Cycle {Cycle} (of {[parent.numCycles]}); Admin Day: {Day}</h2>",
		"<div>Date: {AdminDate}{[this.CalcEditAdminDate(values)]}</div>",

		"<table border=\"1\" class=\"Therapy InformationTable\">",
			"<colgroup width=30%></colgroup>",
			"<colgroup width=50%></colgroup>",
			"<colgroup width=20%></colgroup>",




/************************* PRE-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PreTherapy)\">",
				"<tr class=\"TherapyType\"><th colspan=\"3\">Pre Therapy <span>{PreTherapyInstr}</span></th></tr>",
				"<tr class=\"header\">",
					"<th>Drug</th><th>Dosing</th><th>Administration Time</th>",
				"</tr>",

				"<tpl for=\"PreTherapy\">",
					"<tr>",
						"<th style=\"vertical-align: top;\">",
							"{Med} ({Dose1} {DoseUnits1})",
							"<div style=\"font-weight: normal; font-style: italic;\">{Instructions}</div>",
							"{[this.CalcAnchor( \"Pre\", xindex, values, parent )]}",
							"{[this.showReason(values, parent)]}",
							"<div style=\"text-align: left;\">Order Status : <span>{Order_Status}</span></div>",
							"</th>",
						"<td>",

							"<table class=\"OEMRecord_Element InformationTable\">",
								"<colgroup width=30%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",

								"<tr class=\"header\">",
									"<th>Drug</th>",
									"<th>Dose</th>",
									"<th>",
										"<tpl if=\"this.hasData(BSA_Dose1)\">",
											"<abbr title=\"Body Surface Area\">BSA</abbr> Dose",
										"</tpl>",
									"</th>",
									"<th>Administration</th>",
								"</tr>",

								"<tr>",
									"<td>{Med}</td>",
									"<td>{Dose1} {DoseUnits1}</td>",
									"<tpl if=\"this.hasData(BSA_Dose1)\">",
										"<td>{BSA_Dose1} {DoseUnits1}</td>",
									"</tpl>",
									"<tpl if=\"this.hasNOData(BSA_Dose1)\">",
										"<td>&nbsp;</td>",
									"</tpl>",
									"<td>{AdminMethod1}</td>",
								"</tr>",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<tr class=\"header\">",
										"<th>Fluid Type</th><th>Fluid Volume</th><th>Flow Rate</th><th>Infusion Time</th>",
									"</tr>",

									"<tr>",
										"<td>{FluidType1}</td>",
										"<td>{FluidVol1} ml</th>",
										"<td>{FlowRate1} ml/hr</td>",
										"<td>{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]}</td>",
									"</tr>",
								"</tpl>",
/*** OPTIONAL DOSING NO LONGER NEEDED
								"<tpl if=\"this.hasData(Dose2)\">",
									"<tr class=\"header\">",
										"<th colspan=\"4\">OR</th>",
									"</tr>",

									"<tr class=\"header\">",
										"<th>Drug</th>",
										"<th>Dose</th>",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"<th><abbr title=\"Body Surface Area\">BSA</abbr> Dose</th>",
										"</tpl>",
										"<tpl if=\"this.hasNOData(BSA_Dose2)\">",
											"<th>&nbsp;</th>",
										"</tpl>",
										"<th>Administration</th>",
									"</tr>",

									"<tr>",
										"<td>{Med}</td>",
										"<td>{Dose2} {DoseUnits2}</td>",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"<td>{BSA_Dose2} {DoseUnits2}</td>",
										"</tpl>",
										"<tpl if=\"this.hasNOData(BSA_Dose2)\">",
											"<td>&nbsp;</td>",
										"</tpl>",
										"<td>{AdminMethod2}</td>",
									"</tr>",

									"<tpl if=\"this.ShowFluid(AdminMethod2, FluidType2, FluidVol2, FlowRate2)\">",
										"<tr class=\"header\">",
											"<th>Fluid Type</th><th>Fluid Volume</th><th>Flow Rate</th><th>Infusion Time</th>",
										"</tr>",
										"<tr>",
											"<td>{FluidType2}</td>",
											"<td>{FluidVol2} ml</th>",
											"<td>{FlowRate2} ml/hr</td>",
											"<td>{[this.CalcInfusionTime(values.FluidVol2, values.FlowRate2)]}</td>",
										"</tr>",
									"</tpl>",	
								"</tpl>",
**/
							"</table>",

						"</td>",
						"<td style=\"vertical-align: top; padding-left: 1em;\">{AdminTime}</td>",
					"</tr>",


				"</tpl>",		// END PreTherapy Loop TPL
			"</tpl>",		// END IF Has PreTherapy TPL



/************************* THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(Therapy)\">",
					"<tr><td colspan=\"3\" style=\"border-left: 1px solid white; border-right: 1px solid white;\">&nbsp;</td></tr>",
					"<tr class=\"TherapyType\">",
						"<th class=\"BorderTLR\" colspan=\"3\">Therapy <span>{TherapyInstr}</span></th>",
					"</tr>",
					"<tr class=\"header\">",
						"<th class=\"BorderLeft\">Drug</th>",
						"<th>Dosing</th>",
						"<th class=\"BorderRight\">Administration Time</th>",
					"</tr>",

				"<tpl for=\"Therapy\">",
					"<tr>",
						"<th class=\"BorderLeft BorderBottom\" style=\"vertical-align: top;\">",
							"{Med} ({Dose} {DoseUnits})",

							"<div style=\"font-weight: normal; font-style: italic;\">{Instructions}</div>",
							"{[this.CalcAnchor( \"Therapy\", xindex, values, parent )]}",
							"{[this.showReason(values, parent)]}",
							"<div style=\"text-align: left;\">Order Status : <span>{Order_Status}</span></div>",

                        "</th>",
						"<td class=\"BorderBottom\">",
							"<table class=\"OEMRecord_Element InformationTable\">",
								"<colgroup width=40%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",

								"<tr class=\"header\">",
									"<th>Drug</th>",
									"<th>Dose</th>",
									"<th>{[this.calculatedDose(values)]}</th>",
									"<th>Administration</th>",
								"</tr>",

								"<tr>",
									"<td>{Med}</td>",
									"<td>{Dose} {DoseUnits}</td>",
									"<td>{[this.calculateDose(values, parent)]}</td>",
									"</td>",
									"<td>{AdminMethod}</td>",
								"</tr>",

								"<tpl if=\"this.ShowFluid(AdminMethod, FluidType, FluidVol, FlowRate)\">",
									"<tr class=\"header\">",
										"<th>Fluid Type</th><th>Fluid Volume</th><th>Flow Rate</th><th>Infusion Time</th>",
									"</tr>",

									"<tr>",
										"<td>{FluidType}</td>",
										"<td>{FluidVol} ml</th>",
										"<td>{FlowRate} ml/hr</td>",
										"<td>{[this.CalcInfusionTime(values.FluidVol, values.FlowRate)]}</td>",
									"</tr>",
								"</tpl>",
							"</table>",
						
						"</td>",
						"<td class=\"BorderBottom BorderRight\" style=\"vertical-align: top; padding-left: 1em;\">{AdminTime}</td>",
					"</tr>",
				"</tpl>",		// END Therapy Loop TPL
				"<tr><td colspan=\"3\" style=\"border-left: 1px solid white; border-right: 1px solid white;\">&nbsp;</td></tr>",
			"</tpl>",		// END IF Has Therapy TPL

/************************* END THERAPY SECTION *************************************************/






/************************* POST-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PostTherapy)\">",
			"<tr class=\"TherapyType\"><th colspan=\"3\">Post Therapy <span>{PostTherapyInstr}</span></th></tr>",
				"<tr class=\"header\">",
					"<th>Drug</th><th>Dosing</th><th>Administration Time</th>",
				"</tr>",

				"<tpl for=\"PostTherapy\">",
					"<tr>",
						"<th style=\"vertical-align: top;\">",
							"{Med} ({Dose1} {DoseUnits1})",

							"<div style=\"font-weight: normal; font-style: italic;\">{Instructions}</div>",
							"{[this.CalcAnchor( \"Post\", xindex, values, parent )]}",
							"{[this.showReason(values, parent)]}",
							"<div style=\"text-align: left;\">Order Status : <span>{Order_Status}</span></div>",

						"</th>",
						"<td>",

							"<table class=\"OEMRecord_Element InformationTable\">",
								"<colgroup width=30%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",
								"<colgroup width=20%></colgroup>",

								"<tr class=\"header\">",
									"<th>Drug</th>",
									"<th>Dose</th>",
									"<th>",
										"<tpl if=\"this.hasData(BSA_Dose1)\">",
											"<abbr title=\"Body Surface Area\">BSA</abbr> Dose",
										"</tpl>",
									"</th>",
									"<th>Administration</th>",
								"</tr>",

								"<tr>",
									"<td>{Med}</td>",
									"<td>{Dose1} {DoseUnits1}</td>",
									"<tpl if=\"this.hasData(BSA_Dose1)\">",
										"<td>{BSA_Dose1} {DoseUnits1}</td>",
									"</tpl>",
									"<tpl if=\"this.hasNOData(BSA_Dose1)\">",
										"<td>&nbsp;</td>",
									"</tpl>",
									"<td>{AdminMethod1}</td>",
								"</tr>",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<tr class=\"header\">",
										"<th>Fluid Type</th><th>Fluid Volume</th><th>Flow Rate</th><th>Infusion Time</th>",
									"</tr>",

									"<tr>",
										"<td>{FluidType1}</td>",
										"<td>{FluidVol1} ml</th>",
										"<td>{FlowRate1} ml/hr</td>",
										"<td>{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]}</td>",
									"</tr>",
								"</tpl>",
/*** OPTIONAL DOSING NO LONGER NEEDED
								"<tpl if=\"this.hasData(Dose2)\">",
									"<tr class=\"header\">",
										"<th colspan=\"4\">OR</th>",
									"</tr>",

									"<tr class=\"header\">",
										"<th>Drug</th>",
										"<th>Dose</th>",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"<th><abbr title=\"Body Surface Area\">BSA</abbr> Dose</th>",
										"</tpl>",
										"<tpl if=\"this.hasNOData(BSA_Dose2)\">",
											"<th>&nbsp;</th>",
										"</tpl>",
										"<th>Administration</th>",
									"</tr>",

									"<tr>",
										"<td>{Med}</td>",
										"<td>{Dose2} {DoseUnits2}</td>",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"<td>{BSA_Dose2} {DoseUnits2}</td>",
										"</tpl>",
										"<tpl if=\"this.hasNOData(BSA_Dose2)\">",
											"<td>&nbsp;</td>",
										"</tpl>",
										"<td>{AdminMethod2}</td>",
									"</tr>",

									"<tpl if=\"this.ShowFluid(AdminMethod2, FluidType2, FluidVol2, FlowRate2)\">",
										"<tr class=\"header\">",
											"<th>Fluid Type</th><th>Fluid Volume</th><th>Flow Rate</th><th>Infusion Time</th>",
										"</tr>",
										"<tr>",
											"<td>{FluidType2}</td>",
											"<td>{FluidVol2} ml</th>",
											"<td>{FlowRate2} ml/hr</td>",
											"<td>{[this.CalcInfusionTime(values.FluidVol2, values.FlowRate2)]}</td>",
										"</tr>",
									"</tpl>",	
								"</tpl>",
*********/
							"</table>",

						"</td>",
						"<td style=\"vertical-align: top; padding-left: 1em;\">{AdminTime}</td>",
					"</tr>",
				"</tpl>",		// END PostTherapy Loop TPL
			"</tpl>",		// END IF Has PostTherapy TPL

			"<tr><th colspan=\"3\" style=\"padding: 0.5em 0; text-align:left;\" >Digital Signature: Doctor</th></tr>",
			"<tr><th colspan=\"3\" style=\"padding: 0.5em 0; text-align:left;\" >Digital Signature: Co-Signer (Optional)</th></tr>",
			"<tr><th colspan=\"3\" style=\"padding: 0.5em 0; text-align:left;\" >Digital Signature: Pharmacist</th></tr>",
		"</table>",
		"<hr />",
	"</section>",
"</tpl>",	// End TPL for AdminDay
		"</section>",

			{
					// XTemplate Configuration
				disableFormats: true,
				Patient : {},
				pIndex : 0,
				curCycle : 0,
				curDay : 0,
                SiteConfig : {},

                showReason : function(values, parent) {
                    if ("" !== values.Reason) {
                        return "<div style=\"text-align: left;\">Medication Changed from Template: <span>" + values.Reason + "</span></div>";
                    }
                    return "";
                },

				calculatedDose : function ( values ) {
					var du = values.DoseUnits.toUpperCase();
					var ret = "";
					var r1 = du.search("M2");
					var r2 = du.search("KG");
					var r3 = du.search("AUC");
					if (r1 > 0 || r2 > 0 || r3 >= 0 ) {
						ret = "Calculated Dose";
					}
					return (ret);
				},
				calculateDose : function ( values, parent ) {
					try {
					if ("" !== this.calculatedDose(values)) {
						var Dose = "", Units, ret, du = values.DoseUnits.toUpperCase();
						if (values.BSA_Dose) {
							if ("" === values.BSA_Dose) {
								if (du.search("M2") > 0) {
									Dose = values.Dose * this.Patient.BSA;
									Units = values.DoseUnits.substr(0, du.search("/"));
									values.BSA_Dose = Dose + " " + Units;
								}
								else if (du.search("KG") > 0) {
									Dose = values.Dose * this.Patient.BSA_Weight;
									Units = values.DoseUnits.substr(0, du.search("/"));
									values.BSA_Dose = Dose + " " + Units;
								}
								else if (du.search("AUC") >= 0) {
									Dose = Ext.CalcAUCDose(this.Patient, this.Patient.Dose);
									values.BSA_Dose = Dose;
								}
								if ("" !== Dose) {
									ret = "<button class=\"anchor dspOEMDoseCalcs\" " + 
										"dose=\"" + values.Dose + "\" " + 
										"doseUnits=\"" + values.DoseUnits + "\" " + 
										"units=\"" + Units + "\" " + 
										"calcDose=\"" + Dose + "\" " +
										"name=\"dspOEMDoseCalcs\" " + 
										"title=\"Show Dosage Calculation\">" + Dose + " " + Units + "</button>";
								}
							}
							else {
								Units = values.DoseUnits.substr(0, du.search("/"));

								ret = "<button class=\"anchor dspOEMDoseCalcs\" " + 
									"dose=\"" + values.Dose + "\" " + 
									"doseUnits=\"" + values.DoseUnits + "\" " + 
									"units=\"" + Units + "\" " + 
									"calcDose=\"" + values.BSA_Dose + "\" " +
									"name=\"dspOEMDoseCalcs\" " + 
									"title=\"Show Dosage Calculation\">" + values.BSA_Dose + "</button>";
							}
						}
						else {
							if (du.search("M2") > 0) {
								Dose = values.Dose * this.Patient.BSA;
								Units = values.DoseUnits.substr(0, du.search("/"));
								values.BSA_Dose = Dose + " " + Units;
							}
							else if (du.search("KG") > 0) {
								Dose = values.Dose * this.Patient.BSA_Weight;
								Units = values.DoseUnits.substr(0, du.search("/"));
								values.BSA_Dose = Dose + " " + Units;
							}
							else if (du.search("AUC") >= 0) {
									Dose = Ext.CalcAUCDose(this.Patient, this.Patient.Dose);
									values.BSA_Dose = Dose;
							}
							if ("" !== Dose) {
								ret = "<button class=\"anchor dspOEMDoseCalcs\" " + 
									"dose=\"" + values.Dose + "\" " + 
									"doseUnits=\"" + values.DoseUnits + "\" " + 
									"units=\"" + Units + "\" " + 
									"calcDose=\"" + Dose + "\" " +
									"name=\"dspOEMDoseCalcs\" " + 
									"title=\"Show Dosage Calculation\">" + Dose + " " + Units + "</button>";
							}
						}
						return (ret);
					}						
					}
					catch (ee) {
						var ErrorObj = ee;
						var errMsg = "";
						var o;
						for (o in ee) {
							if (ee.hasOwnProperty(o)) {
								errMsg += o + "\n";
							}
						}
						alert("Error - Saving updated OEM Record in OEM View - " + ee.message + "\n" + errMsg );
					}
					return("");
				}, 

				hasData: function (instr) {
					return ("" !== instr);
				},
				hasNOData: function (instr) {
					return ("" === instr);
				},
				hasDrug : function (therapy) {
					if (therapy) {
						return (null !== therapy[0].Med);
					}
					return (false);
				},

				SaveIdx : function (xindex, Cycle, Day, values, parent) {
					if (parent.Patient) {
						this.Patient = parent.Patient;
					}
                    if (parent.SiteConfig) {
                        this.SiteConfig = parent.SiteConfig;
                    }
					this.pIndex = xindex;
					this.curCycle = Cycle;
					this.curDay = Day;
				},

				ShowFluid : function(AdminMethod, FluidType, FluidVol, FlowRate) {
					var lineNo = 0;
					var a2, flg = true;
					try {
						if ("" === AdminMethod) {
							return false;
						}
						if ("IV" !== AdminMethod.substr(0,2)) {
							return false;
						}
						a2 = FluidType + FluidVol + FlowRate;
						try {
							flg = ("" !== a2.trim());							
						}
						catch (e) {
						}
						return( flg );
					}
					catch (err) {
						return( false );
					}
				},

				CalcInfusionTime : function (vol, rate) {
					return (Ext.CalcInfusionTime(vol, rate, true));
				},

				CalcStyle : function ( current ) {
					if (1 === current.Cycle && 1 === current.Day) {
						return "style=\"display:block;\"";
					}
					return ("style=\"display:hidden;\"");
				},

				CalcName : function ( current ) {
					return ("Cycle_" + current.Cycle + "_Day_" + current.Day);
				},
				CalcAnchor : function ( type, idx, current, parent ) {
					// Anchor onClick handler located in the OEM.js controller
					// var Cycle = parent[idx-1].Cycle;
					var AdminDate = parent.AdminDate;
					var today = new Date();
                    today.setHours(0, 0, 0, 0);
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}
                    if ("Cancelled" == current.Order_Status || 
                        "Dispensed" == current.Order_Status || 
                        "Finalized" == current.Order_Status ) {
                        return("");     // No links if Order has been dispensed or Finalized
                    }

					var Cycle = this.curCycle;
					// var Day = parent[idx-1].Day;
					var Day = this.curDay;
					var Type = type;
					var TypeIdx = idx;
					var pIndex = this.pIndex;

					var buf = "href=\"#Cycle_" + Cycle + "_Day_" + Day + "_Med_" + idx + "\" " + 
						// "name=\"Edit_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + 
						"cycle=\"" + Cycle + "\" " + 
						"day=\"" + Day + "\" " + 
						"type=\"" + Type + "\" " + 
						"medidx=\"" + idx + "\" " + 
						"typeidx=\"" + pIndex + "\"" ;
                    var buf2 = "med=\"" + current.Med + "\" " + 
                        "medID=\"" + current.MedID + "\" " + 
                        "OrderID=\"" + current.Order_ID + "\" " + buf;

                    var btn1 = "",
                        btn2 = "",
                        btn3 = "",
                        StatusMsg = "";

                    if (this.SiteConfig.MedHold === "1") {
                        if ("Hold" == current.Status) {
                            StatusMsg = "Release from Hold";
                        }
                        else {
                            StatusMsg = "Hold";
                        }
                        btn2 = "<button class=\"anchor OEM_RecordMedHold\" " + buf2 + " id=\"Hold_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + ">" + StatusMsg + "</button>";
                    }
                    btn1 = "<button class=\"anchor EditOEM_Record\" " + buf + " name=\"Edit_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" id=\"Edit_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + ">Edit</button>";
                    btn3 = "<button class=\"anchor OEM_RecordMedCancel\" " + buf2 + " id=\"Cancel_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + ">Cancel</button>";

                    var btns = "<table style=\"width:100%; margin: 5px 0; border:none;\"><tr>" + 
                        "<th style=\"text-align:center; border:none;\">" + btn3 + "</th>" + 
                        "<th style=\"text-align:center; border:none;\">" + btn1 + "</th>" + 
                        "<th style=\"text-align:center; border:none;\">" + btn2 + "</th></tr></table>";

					// return "<br />" + btn1 + btn2 + btn3; //  + "<br /><button class=\"anchor EditOEM_Record\" " + buf + ">Remove Medication</button>";
                    return btns;

				},
				CalcEditAdminDate : function( current ) {
					var AdminDate = current.AdminDate;
					var today = new Date();
                    today.setHours(0, 0, 0, 0);
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}
					var buf = "";
					return " - <button class=\"anchor ChangeOEM_AdminDate\" " + buf + ">Change Admin Date</button>";
				}
			}
	)
});



/*
 *	MWB - 01/16/2012
 *	Order Entry Management Tab
 *	This view maintains all the controls for the Order Entry Management for a specific Patient
 *	It is rendered in the New Plan Tab the CTOS Tabset once a patient has been selected.
 *	This view is managed by the "OEM" Control
 */
Ext.define("COMS.view.NewPlan.OEM", {
	extend: "Ext.panel.Panel",
	alias : "widget.OEM",

	name : "OEM Tab",
	margin : "0 0 20 0",
	autoEl : { tag : "section" },

	title: "Order Entry Management",
	items : [ 
		{ xtype : "OEM_Level1"},
		{ xtype : "combo", name : "SelectAdminDay2View",
			fieldLabel : "Select Admin Day to view",
			labelWidth : 150,
			queryMode : "local",
			displayField : "date",
			valueField : "LinkName",
			store : { 
                fields : [ "date", "LinkName" ], 
                data : [
                    { date : "day1", LinkName : "Cycle_1-Day_1" }, 
                    { date : "day2", LinkName : "Cycle_1-Day_2" }, 
                    { date : "day3", LinkName : "Cycle_1-Day_3" }
                ]
            }
		},
		{ xtype : "dspOEMTemplateData"}
	]
});

