Ext.define("COMS.controller.NewPlan.CTOS.ChronologyTab", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
	    "NewPlan.CTOS.Chronology"
	],

	refs: [
	    {
		    ref: "Chronology",
			selector: "Chronology"
	    },
	    {
		    ref: "ChronologyOverview",
			selector: "ChronologyOverview"
	    },
	    {
		    ref: "ChronologyBody",
			selector: "ChronologyBody"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Chronology Tab Controller!");

		this.application.on( { PatientSelected : this.PatientSelected, scope : this } );

		this.control({
			"Chronology" : {
				beforeactivate : this.BeforeTabActivated,
				render : this.TabRendered
			}
		});
	},

	TabContentsCleared : true,



	DeliveredTemplate : function() {
		return (new Ext.XTemplate(

		"<table border=\"1\" class=\"Chronology InformationTable\">",
			"<colgroup width=30%></colgroup>",
			"<colgroup width=70%></colgroup>",

/************************* PRE-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PreTherapy)\">",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"2\">Pre Therapy</th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th>",
					"<th>Dosing</th>",
				"</tr>",

				"<tpl for=\"PreTherapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose1} {DoseUnits1}",
							"<tpl if=\"this.hasData(BSA_Dose1)\">",
								"({BSA_Dose1} {DoseUnits1})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod1}",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<br />{FluidType1} {FluidVol1} ml - {FlowRate1} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]})",
								"</tpl>",
						"</td>",
					"</tr>",
				"</tpl>",		// END PreTherapy Loop TPL
			"</tpl>",		// END IF Has PreTherapy TPL



/************************* THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(Therapy)\">",
				"<tr><th colspan=\"2\" class=\"TherapySpacer\">&nbsp;</th></tr>",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"2\">Therapy</th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th>",
					"<th>Dosing</th>",
				"</tr>",

				"<tpl for=\"Therapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose} {DoseUnits}",
							"<tpl if=\"this.hasData(BSA_Dose)\">",
								"({BSA_Dose} {DoseUnits})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod}",

								"<tpl if=\"this.ShowFluid(AdminMethod, FluidType, FluidVol, FlowRate)\">",
									"<br />{FluidType} {FluidVol} ml - {FlowRate} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol, values.FlowRate)]})",
								"</tpl>",
						"</td>",
					"</tr>",

				"</tpl>",		// END Therapy Loop TPL
				"<tr><th colspan=\"2\" class=\"TherapySpacer\">&nbsp;</th></tr>",
			"</tpl>",		// END IF Has Therapy TPL

/************************* POST-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PostTherapy)\">",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"2\">Post Therapy</th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th>",
					"<th>Dosing</th>",
				"</tr>",
				"<tpl for=\"PostTherapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose1} {DoseUnits1}",
							"<tpl if=\"this.hasData(BSA_Dose1)\">",
								"({BSA_Dose1} {DoseUnits1})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod1}",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<br />{FluidType1} {FluidVol1} ml - {FlowRate1} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]})",
								"</tpl>",
						"</td>",
					"</tr>",
				"</tpl>",		// END PostTherapy Loop TPL
			"</tpl>",		// END IF Has PostTherapy TPL
/************************* END POST-THERAPY SECTION *************************************************/
			"</table>",
			{
					// XTemplate Configuration
				disableFormats: true,
				pIndex : 0,
				curCycle : 0,
				curDay : 0,
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

				SaveIdx : function (xindex, Cycle, Day, values) {
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
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}

					var Cycle = this.curCycle;
					// var Day = parent[idx-1].Day;
					var Day = this.curDay;
					var Type = type;
					var TypeIdx = idx;
					var pIndex = this.pIndex;

					var buf = "href=\"#Cycle_" + Cycle + "_Day_" + Day + "_Med_" + idx + "\" " + 
						"name=\"Edit_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + 
						"cycle=\"" + Cycle + "\" " + 
						"day=\"" + Day + "\" " + 
						"type=\"" + Type + "\" " + 
						"medidx=\"" + idx + "\" " + 
						"typeidx=\"" + pIndex + "\"" ;
					return "<br /><a class=\"EditOEM_Record\" " + buf + ">Edit</a>";
				},
				CalcEditAdminDate : function( current ) {
					var AdminDate = current.AdminDate;
					var today = new Date();
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}
					var buf = "";
					return " - <button class=\"anchor EditOEM_Record\" " + buf + ">Change Admin Date</button>";
				}
			}

		)
		);
	},

	OrderTemplate : function() {
		return (new Ext.XTemplate(

		"<table border=\"1\" class=\"Chronology InformationTable\">",
			"<colgroup width=30%></colgroup>",
			"<colgroup width=50%></colgroup>",
			"<colgroup width=20%></colgroup>",

/************************* PRE-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PreTherapy)\">",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"3\">Pre Therapy - <span>{PreTherapyInstr}</span></th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th><th>Dosing</th><th>Administration Time</th>",
				"</tr>",

				"<tpl for=\"PreTherapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose1} {DoseUnits1}",
							"<tpl if=\"this.hasData(BSA_Dose1)\">",
								"({BSA_Dose1} {DoseUnits1})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod1}",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<br />{FluidType1} {FluidVol1} ml - {FlowRate1} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]})",
								"</tpl>",

								"<tpl if=\"this.hasData(Dose2)\">",
									"<div class=\"OptionalMarker\">",
									"	<span>",
									"		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									"	</span>",
									"&nbsp;OR &nbsp;",
									"	<span>",
									"		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									"	</span>",
									"</div>",

									"{Dose2} {DoseUnits2}",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"({BSA_Dose2} {DoseUnits2})",
										"</tpl>",
									"&nbsp;-&nbsp;{AdminMethod2}",
									"<tpl if=\"this.ShowFluid(AdminMethod2, FluidType2, FluidVol2, FlowRate2)\">",
											"<br />{FluidType2} {FluidVol2} ml - {FlowRate2} ml/hr (Duration: ",
											"{[this.CalcInfusionTime(values.FluidVol2, values.FlowRate2)]})",
									"</tpl>",	
								"</tpl>",
						"</td>",
						"<td>{AdminTime}</td>",
					"</tr>",

					"<tpl if=\"this.hasData(Instructions)\">",
						"<tr class=\"Therapy\"><td colspan=\"3\">{Instructions}</td></tr>",
					"</tpl>",
				"</tpl>",		// END PreTherapy Loop TPL
			"</tpl>",		// END IF Has PreTherapy TPL







/************************* THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(Therapy)\">",
				"<tr><th colspan=\"3\" class=\"TherapySpacer\">&nbsp;</th></tr>",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"3\">Therapy - <span>{TherapyInstr}</span></th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th>",
					"<th>Dosing</th>",
					"<th>Administration Time</th>",
				"</tr>",

				"<tpl for=\"Therapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose} {DoseUnits}",
							"<tpl if=\"this.hasData(BSA_Dose)\">",
								"({BSA_Dose} {DoseUnits})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod}",

								"<tpl if=\"this.ShowFluid(AdminMethod, FluidType, FluidVol, FlowRate)\">",
									"<br />{FluidType} {FluidVol} ml - {FlowRate} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol, values.FlowRate)]})",
								"</tpl>",
						"</td>",
						"<td>{AdminTime}</td>",
					"</tr>",

					"<tpl if=\"this.hasData(Instructions)\">",
						"<tr class=\"Therapy\"><td colspan=\"3\">{Instructions}</td></tr>",
					"</tpl>",
				"</tpl>",		// END Therapy Loop TPL
				"<tr><th colspan=\"3\" class=\"TherapySpacer\">&nbsp;</th></tr>",
			"</tpl>",		// END IF Has Therapy TPL

/************************* POST-THERAPY SECTION *************************************************/
			"<tpl if=\"this.hasDrug(PostTherapy)\">",
				"<tr class=\"TherapyType\">",
					"<th colspan=\"3\">Post Therapy - <span>{PostTherapyInstr}</span></th>",
				"</tr>",
				"<tr class=\"header\">",
					"<th>Drug</th><th>Dosing</th><th>Administration Time</th>",
				"</tr>",

				"<tpl for=\"PostTherapy\">",
					"<tr>",
						"<th>",
							"{Med}",
						"</th>",
						"<td>",
							"{Dose1} {DoseUnits1}",
							"<tpl if=\"this.hasData(BSA_Dose1)\">",
								"({BSA_Dose1} {DoseUnits1})",
								"</tpl>",
								"&nbsp;-&nbsp;{AdminMethod1}",

								"<tpl if=\"this.ShowFluid(AdminMethod1, FluidType1, FluidVol1, FlowRate1)\">",
									"<br />{FluidType1} {FluidVol1} ml - {FlowRate1} ml/hr (Duration: ",
										"{[this.CalcInfusionTime(values.FluidVol1, values.FlowRate1)]})",
								"</tpl>",

								"<tpl if=\"this.hasData(Dose2)\">",
									"<div class=\"OptionalMarker\">",
									"	<span>",
									"		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									"	</span>",
									"&nbsp;OR &nbsp;",
									"	<span>",
									"		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
									"	</span>",
									"</div>",

									"{Dose2} {DoseUnits2}",
										"<tpl if=\"this.hasData(BSA_Dose2)\">",
											"({BSA_Dose2} {DoseUnits2})",
										"</tpl>",
									"&nbsp;-&nbsp;{AdminMethod2}",
									"<tpl if=\"this.ShowFluid(AdminMethod2, FluidType2, FluidVol2, FlowRate2)\">",
											"<br />{FluidType2} {FluidVol2} ml - {FlowRate2} ml/hr (Duration: ",
											"{[this.CalcInfusionTime(values.FluidVol2, values.FlowRate2)]})",
									"</tpl>",	
								"</tpl>",
						"</td>",
						"<td>{AdminTime}</td>",
					"</tr>",

					"<tpl if=\"this.hasData(Instructions)\">",
						"<tr class=\"Therapy\"><td colspan=\"3\">{Instructions}</td></tr>",
					"</tpl>",
				"</tpl>",		// END PostTherapy Loop TPL
			"</tpl>",		// END IF Has PostTherapy TPL
/************************* END POST-THERAPY SECTION *************************************************/







			"</table>",
			{
					// XTemplate Configuration
				disableFormats: true,
				pIndex : 0,
				curCycle : 0,
				curDay : 0,
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

				SaveIdx : function (xindex, Cycle, Day, values) {
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
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}

					var Cycle = this.curCycle;
					// var Day = parent[idx-1].Day;
					var Day = this.curDay;
					var Type = type;
					var TypeIdx = idx;
					var pIndex = this.pIndex;

					var buf = "href=\"#Cycle_" + Cycle + "_Day_" + Day + "_Med_" + idx + "\" " + 
						"name=\"Edit_" + Type + "_" + Cycle + "_" + Day + "_" + idx + "\" " + 
						"cycle=\"" + Cycle + "\" " + 
						"day=\"" + Day + "\" " + 
						"type=\"" + Type + "\" " + 
						"medidx=\"" + idx + "\" " + 
						"typeidx=\"" + pIndex + "\"" ;
					return "<br /><a class=\"EditOEM_Record\" " + buf + ">Edit</a>";
				},
				CalcEditAdminDate : function( current ) {
					var AdminDate = current.AdminDate;
					var today = new Date();
					var aDate = new Date(AdminDate);
					if (aDate < today) {
						return ("");	// No Edit link if the Admin Date is before today
					}
					var buf = "";
					return " - <button class=\"anchor EditOEM_Record\" " + buf + ">Change Admin Date</button>";
				}
			}

		)
		);
	},

	createChildren : function( component, eOpts ) {
		var i, j, fsIndex = 0, fsTitle, fsMargin, fsCollapsed, thisDay, thisDayFS, thisCycle, thisCycleFS, insertIdx = 0, InnerFSName = "";
		var oTpl, dTpl, nTpl, margin, collapsed, thisDayFSName;
		var oHtml, dHtml, nHtml;
		var Patient = this.application.Patient;
		if ("" === Patient.TemplateID) {
			return;		// No Template assigned to this patient
		}
		try {
			var NumCycles = Patient.OEMRecords.numCycles;
			var DaysPerCycle = Patient.OEMRecords.AdminDaysPerCycle;
			var AdminDays = Patient.OEMRecords.OEMRecords;
			var NumDaysTotal = AdminDays.length;
			var InnerFS = [], OuterFS = [];
			var UpdateData = Patient.OEMRecords;

			UpdateData.TreatmentStart = UpdateData.OEMRecords[0].AdminDate;
			var i1 = UpdateData.OEMRecords.length - 1;
			UpdateData.TreatmentEnd = UpdateData.OEMRecords[i1].AdminDate;

			var thisCtl = this.getController("NewPlan.CTOS.ChronologyTab");
			var Overview = thisCtl.getChronologyOverview();
			Overview.update(UpdateData);

			var Body = thisCtl.getChronologyBody();

			for (i = 0; i < NumCycles; i++ ) {
				fsTitle = "Cycle " + (1 + i) + " of " + NumCycles;
				margin = ((0 === i) ? "10 10 5 10" : "5 10 10 10");
				collapsed = ((0 === i) ? false : true);
				thisCycleFS = Ext.create("Ext.form.FieldSet", {
						title: fsTitle,
						collapsible : true,
						collapsed : collapsed,
						frame : true,
						margin : margin
				});
				for (j = 0; j < DaysPerCycle; j++) {
					var DayIdx = (DaysPerCycle * i) + j;
					thisDay = AdminDays[DayIdx];
					fsTitle = "Admin Date - " + thisDay.AdminDate;

					// Calculate a unique name for this particular Fieldset, based on Cycle and Day in Cycle
					thisDayFSName = "Cycle_" + (1 + i) + "_Day_" + (1+j);

					margin = ((0 === i) ? "10 10 5 10" : "5 10 10 10");
					collapsed = ((0 === i) ? false : true);

					oTpl = this.OrderTemplate();
					oHtml = oTpl.apply(Patient.OEMRecords.OEMRecords[DayIdx]);
					dTpl = this.DeliveredTemplate();
					dHtml = dTpl.apply(Patient.OEMRecords.OEMRecords[DayIdx]);

					thisDayFS = Ext.create("Ext.form.FieldSet", {
						title: fsTitle,
						name : thisDayFSName,
						collapsible : true,
						collapsed : collapsed,
						frame : true,
						margin : margin,
						defaultType : "fieldset",
						defaults : { collapsible : true, margin : "5 10 5 10", frame : true },
						items : [
							{ title : "Ordered", name : (thisDayFSName + "_Ordered"), html : oHtml },
							{ title : "Finalized/Dispensed", name : (thisDayFSName + "_Final_Dispensed"), html : dHtml },
							{ title : "Administered", name : (thisDayFSName + "_Administered"), html : dHtml },
							{ title : "Nursing Documentation", name : (thisDayFSName + "_NurseDocs") }
						]
					});
					thisCycleFS.insert(j, thisDayFS);
				}
				Body.insert( i, thisCycleFS );
			}
		}
		catch (err) {
			// debugger;
		}
	},

	/**********************
	 *
	 *	Called when the "PatientSelected" event is triggered from the top of the NewTab Panel Select Patient drop down
	 *	This adjusts the values in the "Select Applied Template" drop down based on the selected user
	 *
	 **********************/
	PatientSelected: function (combo, recs, eOpts) {
		var thisCtl = this.getController("NewPlan.CTOS.ChronologyTab");
		var Overview = thisCtl.getChronologyOverview();
		var Body = thisCtl.getChronologyBody();
		var Chronology = thisCtl.getChronology();
		if (Chronology) {
			if (Chronology.rendered) {
				Overview.removeAll(true);
				Body.removeAll(true);
				this.TabContentsCleared = true;
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Chronology Tab has been rendered");
	},

	BeforeTabActivated : function (component, eOpts ) {
		wccConsoleLog("Chronology Tab has been rendered");
		if ( this.TabContentsCleared ) {
			this.TabContentsCleared = false;
			this.createChildren( component, eOpts );
		}
		return true;
	}
});
