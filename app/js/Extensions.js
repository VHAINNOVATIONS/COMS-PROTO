/**
 *
 * EXTENSIONS FILE
 *
 **/
/*************************************************************
 *
 *	All Dosing and BSA Calculations are grouped here
 *	and attached directly to the Ext object
 *	so that they can be made available to any xTemplate formulas
 *
 *************************************************************/
// data.BSA = Ext.BSA_Calc(data.Height, data.BSA_Weight, data.BSA_Method, data.Gender);
Ext.BSA_Formulas = [];
Ext.BSA_Formulas.Capped = "= Capped BSA";
Ext.BSA_Formulas.DuBois = "= 0.20247 x (Height(m)<sup>0.725</sup>) x (Weight(kg)<sup>0.425</sup>)";
Ext.BSA_Formulas.Mosteller = "= <span style=\"white-space: nowrap; font-size:larger\">&radic;<span style=\"text-decoration:overline;\">&nbsp;(Height(cm) * Weight(kg))/3600 &nbsp;</span></span>";
Ext.BSA_Formulas.Haycock = "= 0.024265 x (Height(cm)<sup>0.3964</sup>) x (Weight(kg)<sup>0.5378</sup>)";
Ext.BSA_Formulas.Gehan_George = "= 0.0235 x (Height(cm)<sup>0.42246</sup>) x (Weight(kg)<sup>0.51456</sup>)";
Ext.BSA_Formulas.Boyd = "= 0.0003207 * (Height(cm)<sup>0.3</sup>) * Weight(g) <sup>(0.7285-0.0188 log Weight(g))</sup>";

Ext.BSA_Formulas.IdealWeightF = "((Height in Inches - 60) * 2.3) + 45.5";
Ext.BSA_Formulas.IdealWeightM = "((Height in Inches - 60) * 2.3) + 50";
Ext.BSA_Formulas.AdjustedWeight = "((Weight In Kilos - Ideal Weight) * 0.4) + Ideal Weight;";
Ext.BSA_Formulas.LeanWeightF = "(1.07 * WeightInKilos) - 148 * (WeightInKilos<sup>2</sup> / (100*Height in M<sup>2</sup>));";
Ext.BSA_Formulas.LeanWeightM = "(1.1 * WeightInKilos) - 128 * (WeightInKilos<sup>2</sup> / (100*Height in M<sup>2</sup>));";




// Data from Amputee Calculator from - http://www.oncologypharmacist.net/clinical_tools.html
// Fraction of Weight and BSA Corresponding to Amputated Limbs
// Body Part Amputated	% Loss in Weight	% of BSA to Subtract
Ext.Amputations = [];

// weight = % weight loss due to amputation
// BSA = % BSA reduction due to amputation
Ext.Amputations["Upper Left Arm"] = {
	BSA: 6
};
Ext.Amputations["Upper Right Arm"] = {
	BSA: 6
};

Ext.Amputations["Lower Left Arm"] = {
	BSA: 4
};
Ext.Amputations["Lower Right Arm"] = {
	BSA: 4
};

Ext.Amputations["Left Hand and Fingers"] = {
	BSA: 3
};
Ext.Amputations["Right Hand and Fingers"] = {
	BSA: 3
};

Ext.Amputations["Left Thigh"] = {
	BSA: 12
};
Ext.Amputations["Right Thigh"] = {
	BSA: 12
};

Ext.Amputations["Lower Left Leg"] = {
	BSA: 6
};
Ext.Amputations["Lower Right Leg"] = {
	BSA: 6
};

Ext.Amputations["Left Foot"] = {
	BSA: 3
};
Ext.Amputations["Right Foot"] = {
	BSA: 3
};


/*
 * Sections:
 *		Amputations
 *		AddEditBSA
 *		AddEditCancer
 *		AddCumulativeMedication
 *		
 *	Enable Lock:
 *		Ext.COMS_LockSection(<ID of patient to lock>, <Section to lock>, <Callback Function when lock is enabled to continue>);
 *	Example:
 *		Ext.COMS_LockSection(this.application.Patient.id, "Amputations", this.showAmputationWiget); 
 *
 *	Call to Unlock last locked section
 *		Ext.COMS_UnLockSection();
 */
Ext.COMS_LockoutAjaxCall = function(fcn, rid, section, callback, params) {
	/* 
	 *	fcn = "Lock", "Unlock" 
	 *	rid = Patient_ID if fcn = "Lock", Record_ID if fcn = "Unlock";
	 *	section = Section to manage
	 */
	var CMD = "POST";
	var URL = Ext.URLs.Lockout + "/" + rid;
	if ("Unlock" == fcn) {
		CMD = "PUT";
	}
	else {
		URL += "/" + section;
	}
	Ext.Ajax.request({
		url: URL,
		method : CMD,
		scope: this,
		lockCallback : callback,
		params : params,
		success: function( response, opts ){
			var text = response.responseText;
			var resp = Ext.JSON.decode( text );
			if (resp.records) {
				LockedInfo = resp.records[0];
			}
			if (resp.success) {
				if (opts.lockCallback) {
					opts.lockCallback.call(this, opts.params);
				}
			}
			else {
				var Owner = resp.records[0].UserName;
				if (Owner === dName) {
					opts.lockCallback.call(this, opts.params);
				}
				else {
					Ext.MessageBox.alert(resp.records[0].Section + " section Locked", "The " + resp.records[0].Section + " section is currently locked by " + Owner );
					opts.lockCallback = null;
				}
			}
		},
		failure : function( response, opts ) {
			opts.lockCallback = null;
			var text = response.responseText;
			var resp = Ext.JSON.decode( text );
			Ext.MessageBox.alert("Saving Error", "Saving Error", "Can't " + fcn + " desired section - <br />" + resp.msg );
		}
	});
};

Ext.COMS_LockSection = function(PatientID, Section, callback, params) {
	Ext.COMS_LockoutAjaxCall("Lock", PatientID, Section, callback, params);
};

Ext.COMS_UnLockSection = function() {
	try {
		if (LockedInfo) {
			Ext.COMS_LockoutAjaxCall("Unlock", LockedInfo.id, LockedInfo.Section, null, null);
			LockedInfo = null;
		}
	}
	catch (e) {
//		console.log("LockedInfo does not exist");
	}
};

Ext.togglePanelOnTitleBarClick = function(panel) {
	try {
		var x = panel.header.el;
		if (x) {
			x.on('click', function() {
				if (panel.collapsed) {
					panel.expand();
				}
				else {
					panel.collapse();
				}
			});
		}
	}
	catch (e) {
		alert("Error togglePanelOnTitleBarClick");

	}
};

Ext.GeneralRounding2Digits = function (n) {
	var ret = Ext.FormatNumber(+(Math.round(n + "e+" + 2) + "e-" + 2));
	n = ret.search(/\./i);
	if (n > 0) {	// We have a decimal point
		n = ret.search(/0$/i);
		if (n>0) {
			ret = ret.substring(0, ret.length - 1);
		}
	}
	return ret;
};

Ext.In2Meters = function (h) {
	var h1 = (0.0254 * h);
	var ret = Ext.GeneralRounding2Digits(h1);
	return ret;
};

Ext.In2CM = function (h) {
	var h1 = (2.54 * h);
	var ret = Ext.GeneralRounding2Digits(h1);
	return ret;
};

Ext.Pounds2Kilos = function (w) {
	var w1 = (0.45359237 * w);
	var ret = Ext.GeneralRounding2Digits(w1);
	return ret;
};

Ext.TempF2C = function (f) {
	var t1 = ((5 * (f - 32)) / 9);
	var ret = Ext.GeneralRounding2Digits(t1);
	return ret;
};

Ext.HeightSquared = function (h) {
	var ret = Math.pow(h, 2);
	return ret;
};

Ext.WeightSquared = function (w) {
	var ret = Math.pow(w, 2);
	return ret;
};

Ext.IdealWeight = function (h, g) { // Height in Inches
	if (h < 60) {
		h = 60;
	}
	var IdealWeight = ((h - 60) * 2.3) + 45.5; // in KG
	if ("M" === g) {
		IdealWeight = ((h - 60) * 2.3) + 50;
	}
	return IdealWeight;
};

Ext.AdjustedWeight = function (w, h, g) { // Height in Inches, weight in pounds
	var WeightInKilos = Ext.Pounds2Kilos(w);
	var IdealWeight = Ext.IdealWeight(h, g);
	return ((WeightInKilos - IdealWeight) * 0.4) + IdealWeight;
};

Ext.LeanWeight = function (w, h, g) { // Height in Inches, weight in pounds
	var WeightInKilos = Ext.Pounds2Kilos(w);
	var WeightSquared = Ext.WeightSquared(WeightInKilos);

	var HeightInM = Ext.In2Meters(h);
	var HeightInM100 = (100 * HeightInM);
	var HeightSquared = Ext.HeightSquared(HeightInM100);
	// var IdealWeight = Ext.IdealWeight(h, g);
	var LeanWeight = (1.07 * WeightInKilos) - 148 * (WeightSquared / HeightSquared);

	if ("M" === g) {
		LeanWeight = (1.1 * WeightInKilos) - 128 * (WeightSquared / HeightSquared);
	}
	LeanWeight = Ext.FormatNumber(+(Math.round(LeanWeight + "e+" + 2) + "e-" + 2));
	return LeanWeight;
};



Ext.ShowUnitPerWeightCalcs = function (PatientInfo, saveCalc, Dose, calcDose, origDose) {
	var x1 = Dose.split(" ");
	var units = x1[1].split("/")[0];

	var temp = Ext.apply(PatientInfo, {
		dose: Dose,
		calcDose: calcDose,
		origDose: origDose,
		units : units
	});
/**
	var AdditionalPossibleXTemplateInfo =
		"<tr><th>BSA Weight <br>({WeightFormula})</th><td>{BSA_Weight} kg</td></tr>",
		"<tr><th>Height:</th><td>{Height} in {[this.HeightInCM(values)]}</td></tr>",
		"<tr><th>Weight</th><td>{Weight} lbs {[this.WeightInKG(values)]}</td></tr>";
 **/
	var html = new Ext.XTemplate(
		"<table class=\"InformationTable\" border=\"1\">",
		"<tr><th>Actual Weight: </th><td>{Weight} lbs{[this.WeightInKG(values)]}</td></tr>",
		"<tr><th>Ordered Dose: </th><td>{origDose} {units}/kg</td></tr>",
		"<tr><th>Calculated&nbsp;Dose: </th><td>{[this.calcDose(values)]}</td></tr>",
		"</table>", {
			// XTemplate Configuration
			disableFormats: true,
			WeightInKG: function (x) {
				if ("" === x.Weight) {
					return "";
				}
				var x1 = Ext.Pounds2Kilos(x.Weight);
				return (" = " + x1 + " kg");
			},
			calcDose: function (x) {
				var kg = Ext.Pounds2Kilos(x.Weight);
				var dose = x.origDose;
				return x.origDose + "&nbsp;*&nbsp;" + kg + "kg&nbsp;=&nbsp;" + (1*kg*dose) + x.units;
			}
		}
	);
	var newFormula = html.applyTemplate(temp);
	return newFormula;
};

Ext.ShowAUCCalcs = function (PatientInfo, saveCalc, Dose, calcDose) {
	var temp = Ext.apply(PatientInfo, {
		dose: Dose,
		calcDose: calcDose
	});

	var html = new Ext.XTemplate(
		"<table class=\"InformationTable\" border=\"1\">",
		"<tr><th>Age:</th><td>{Age}</td></tr>",
		"<tr><th>Weight</th><td>{Weight} lbs{[this.WeightInKG(values)]}</td></tr>",
		"<tr><th>Gender</th><td>{Gender}</td></tr>",
		"<tr><th>Serum&nbsp;Creatinine</th><td>{[this.Serum(values)]}</td></tr>",
		"<tr><th>AUC</th><td>{[this.AUC(values)]}</td></tr>",
		"{[this.calcGFR(values)]}",
		"</table>", {
			// XTemplate Configuration
			disableFormats: true,
			HeightInCM: function (x) {
				if ("" === x.Height) {
					return "";
				}
				var x1 = Ext.In2CM(x.Height);
				return (" = " + x1 + " cm");
			},

			WeightInKG: function (x) {
				if ("" === x.Weight) {
					return "";
				}
				var x1 = Ext.Pounds2Kilos(x.Weight);
				return (" = " + x1 + " kg");
			},

			Serum: function (x) {
				var sc = x.SerumCreatinine || 1;
				return sc;
			},
			AUC: function (x) {
				var auc = x.dose.split(" ")[0];
				return auc;
			},



			calcGFR: function (x) {
				var gender = x.Gender;
				var kg = Ext.Pounds2Kilos(x.Weight);
				// var dose = x.dose.split(" ")[0];
				var sc = x.SerumCreatinine || 1;
				var AUC = x.dose.split(" ")[0];
				var age = x.Age;

				var GFR = Ext.CalcGFR(age, kg, gender, x.SerumCreatinine);
				var Dose = (GFR + 25) * AUC;
				Dose = Ext.GeneralRounding2Digits(Dose);

				var calc1 = "<td>((140 - Age) x Weight(kg))</td>";
				var calc2 = "<td>((140 - " + age + ") x " + kg + ")</td>";

				if ("F" === gender) {
					calc1 = "<td>((140 - Age) x Weight(kg)) x 0.85</td>";
					calc2 = "<td>((140 - " + age + ") x " + kg + ") x 0.85</td>";
				}

				var r1 = "<tr><th>GFR</th>" +
					"<td>" +
					"<table class=\"GFR_Calc\">" +
					"<tr>" +
					"<td rowspan=3 style='width: 20px;'>&nbsp;=&nbsp;&nbsp;</td>" +
					calc1 +
					"</tr><tr>" +
					"<td><hr /></td>" +
					"</tr><tr>" +
					"<td>72&nbsp;x&nbsp;(Serum&nbsp;Creatinine)</td>" +
					"</tr>" +
					"</table>" +
					"</td></tr>";

				var r2 = "<tr><th>&nbsp;</th>" +
					"<td>" +
					"<table class=\"GFR_Calc\">" +
					"<tr>" +
					"<td rowspan=3 style='width: 20px;'>&nbsp;=&nbsp;&nbsp;</td>" +
					calc2 +
					"</tr><tr>" +
					"<td><hr /></td>" +
					"</tr><tr>" +
					"<td>72&nbsp;x&nbsp;" + sc + "</td>" +
					"</tr>" +
					"</table>" +
					"</td></tr>";

				var r3 = "<tr><th>&nbsp;</th>" +
					"<td>" +
					"<table class=\"GFR_Calc\">" +
					"<tr>" +
					"<td style='width: 20px;'>&nbsp;=&nbsp;&nbsp;</td>" +
					"<td style='text-align: left;'>" + GFR + "</td>" +
					"</tr>" +
					"</table>" +
					"</td></tr>";


				var r4 = "<tr><th>Dosing</th><td>(GFR + 25) X AUC mg</td></tr>";
				var r5 = "<tr><th>&nbsp;</th><td>(" + GFR + " + 25) X " + AUC + " mg</td></tr>";
				var r6 = "<tr><th>&nbsp;</th><td>" + (GFR + 25) * AUC + " mg</td></tr>";
				return r1 + r2 + r3 + r4 + r5 + r6;
			}
		}
	);
	var newFormula = html.applyTemplate(temp);
	return newFormula;
};

Ext.ShowBSACalcs = function (PatientInfo, saveCalc, Dose, calcDose, OrigDose) {
	// Dose is the original dosage (e.g. 15 mg/m2)
	// calcDose is the calculated dosage based on Dosage Units and various formula (e.g. 15mg, if the BSA is 1 in the above example)
	// Dose, calcDose and calcDoseUnits are passed by the HandleOEMCalcDoseButtons() in the OEM.js controller
	var temp = PatientInfo;
	var ckDose = "";
	if (Dose) {
		ckDose = Dose.toLowerCase();
	}
	if (Dose && ckDose.search("auc") >= 0) {
		return Ext.ShowAUCCalcs(PatientInfo, saveCalc, ckDose, calcDose);
	}
	if (Dose && ckDose.search("mg/kg") >= 0 || ckDose.search("units/kg") >= 0) {
		return Ext.ShowUnitPerWeightCalcs(PatientInfo, saveCalc, ckDose, calcDose, OrigDose);
	}

	if ("" === temp.BSA_Method) {
		temp.Formula = "";
		temp.PatientInfo_BSA = "";
	} else {
		temp.Formula = Ext.BSA_Formulas[PatientInfo.BSA_Method];
		PatientInfo.BSA_Weight = Ext.BSAWeight(PatientInfo);
		temp.PatientInfo_BSA = PatientInfo.BSA;
	}

	delete temp.Dose;
	delete temp.calcDose;
	if (calcDose && Dose) {
		temp.Dose = ckDose;
		temp.calcDose = calcDose;
	}

	switch (PatientInfo.BSA_Method) {
	case "Capped":
		break;

	case "DuBois":
		temp.PatientInfo_BSA = Ext.BSA_DuBois(PatientInfo.Height, PatientInfo.BSA_Weight);
		break;

	case "Mosteller":
		temp.PatientInfo_BSA = Ext.BSA_Mosteller(PatientInfo.Height, PatientInfo.BSA_Weight);
		break;

	case "Haycock":
		temp.PatientInfo_BSA = Ext.BSA_Haycock(PatientInfo.Height, PatientInfo.BSA_Weight);
		break;

	case "Gehan and George":
		temp.Formula = Ext.BSA_Formulas.Gehan_George;
		temp.PatientInfo_BSA = Ext.BSA_Gehan_George(PatientInfo.Height, PatientInfo.BSA_Weight);
		break;

	case "Boyd":
		temp.PatientInfo_BSA = Ext.BSA_Boyd(PatientInfo.Height, PatientInfo.BSA_Weight);
		break;
	}

	switch (PatientInfo.WeightFormula) {
	case "Ideal Weight":
		if ("M" === PatientInfo.Gender) {
			temp.WF = Ext.BSA_Formulas.IdealWeightM;
		} else {
			temp.WF = Ext.BSA_Formulas.IdealWeightF;
		}
		break;
	case "Adjusted Weight":
		temp.WF = Ext.BSA_Formulas.AdjustedWeight;
		break;
	case "Lean Weight":
		if ("M" === PatientInfo.Gender) {
			temp.WF = Ext.BSA_Formulas.LeanWeightM;
		} else {
			temp.WF = Ext.BSA_Formulas.LeanWeightF;
		}
		break;
	default:
		temp.WF = "Weight in KG";
		break;
	}

	if ("" === calcDose) {
		calcDose = OrigDose * temp.BSA;
		calcDose = Ext.GeneralRounding2Digits(calcDose);
	}


	var html = new Ext.XTemplate(
		"<table class=\"InformationTable\" border=\"1\">",
		"<tr><th>Height:</th><td>{Height} in {[this.HeightInCM(values)]}</td></tr>",
		"<tr><th>Weight</th><td>{Weight} lbs {[this.WeightInKG(values)]}</td></tr>",
		"<tr><td colspan=\"2\" style=\"text-align: center;\">",
		"<button class=\"anchor changeBSAHeightWeight\" title=\"Select Height/Weight used in BSA Calculations from list of Vitals\">Select</button> different Height/Weight from Vitals",
	// {[this.changeHeightWeight(values)]}
		"</td></tr>",
		"<tr><th>Gender</th><td>{Gender}</td></tr>",
		"<tr><th>Amputations</th><td>",

		"<tpl if=\"this.HasAmputations(values)\">",
		"<tpl for=\"Amputations\">",
		"{description}{[this.BSAReduction(values, parent)]}",
		"<br /></tpl>",
		"</tpl>",
		"<tpl if=\"this.NoAmputations(values)\">",
		"None Listed",
		"</tpl>",


		"</td></tr>",

		"<tr><th>Weight Method</th><td>{[this.dspWeightFormula(values)]}</td></tr>",

		"<tr><th>BSA Method</th><td>{BSA_Method}</td></tr>",

		"<tr><th>BSA Formula</th><td>{Formula}</td></tr>",

		"{[this.showBSACalc(values)]}",

		"<tr><th>BSA</th><td>{[this.finalBSA(values)]}</td></tr>",
		"<tpl if=\"calcDose\">",
		"<tr><th>Dose</th><td>{[this.finalBSA(values)]} * {Dose} = {calcDose} {[this.finalBSAUnits(values)]}</td></tr>",
		"</tpl>",
		"</table>", {
			// XTemplate Configuration
			disableFormats: true,
			// locPatient : "",
			HeightInCM: function (x) {
				if ("" === x.Height) {
					return "";
				}
				var x1 = Ext.In2CM(x.Height);
				return (" = " + x1 + " cm");
			},

			WeightInKG: function (x) {
				if ("" === x.Weight) {
					return "";
				}
				var x1 = Ext.Pounds2Kilos(x.Weight);
				return (" = " + x1 + " kg");
			},
			HasAmputations: function (x) {
				if (0 === x.Amputations.length) {
					return false;
				}
				return true;
			},

			NoAmputations: function (x) {
				if (0 === x.Amputations.length) {
					return true;
				}
				return false;
			},
			BSAReduction: function (values, parent) {
				if ("" !== values.description) {
					var y = values.description;
					var x = Ext.Amputations;
					var z = x[y];
					if (parent.BSA_Reduction) {
						parent.BSA_Reduction += z.BSA;
					} else {
						parent.BSA_Reduction = z.BSA;
					}

					return " - Reduce BSA by " + z.BSA + " %";
				}
				return "None Identified";
			},
			dspWeightFormula: function (x) {
				var tmp = "";
				if ("" === x.WeightFormula) {
					return "&nbsp;";
				}
				var x1, WeightInKilos, HeightInMeters, tmp1;
				x1 = Ext.Pounds2Kilos(x.Weight);
				WeightInKilos = Ext.Pounds2Kilos(x.Weight);
				HeightInMeters = Ext.In2Meters(x.Height);

				tmp1 = x1 + " kg";
				var xtramsg = ((x.Height < 60) ? (" Min Ideal Weight = " + (("M" === x.Gender) ? "50" : "45.5")) : "");
				switch (x.WeightFormula) {
				case "Ideal Weight":
					x1 = Ext.IdealWeight(x.Height, x.Gender);
					tmp1 = ("((" + x.Height + " - 60) * 2.3) + " + ("M" === x.Gender ? "50" : "45.5"));
					tmp1 += " = " + x1 + " kg";
					// console.log("Calculating " + x.WeightFormula + " - " + x1);
					break;
				case "Adjusted Weight":
					x1 = Ext.AdjustedWeight(x.Weight, x.Height, x.Gender);
					tmp1 = ("((" + WeightInKilos + " - " + Ext.IdealWeight(x.Height, x.Gender) + ") * 0.4) + " + Ext.IdealWeight(x.Height, x.Gender));
					tmp1 += " = " + x1 + " kg";
					//console.log("Calculating " + x.WeightFormula + " - " + x1);
					break;
				case "Lean Weight":
					x1 = Ext.LeanWeight(x.Weight, x.Height, x.Gender);
					tmp1 = ("(" + ("M" === x.Gender ? "1.1" : "1.07") + " * " + WeightInKilos + ") - " + ("M" === x.Gender ? "128" : "148") + " * (" + WeightInKilos + "<sup>2</sup> / 100 * " + (2.54 * HeightInMeters) + "<sup>2</sup>))");
					tmp1 += " = " + x1 + " kg";
					//console.log("Calculating " + x.WeightFormula + " - " + x1);
					break;
				}

				tmp += x.WeightFormula + "</td></tr>"; // The name of the Weight Method used (e.g. Actual, Ideal, Adjusted, etc).
				tmp += "<tr><th>&nbsp;</th><td>= " + x.WF + " = " + x1 + " kg</td></tr>"; // The string for calculating the weight as well as the result of the calculation
				tmp += "<tr><th>&nbsp;</th><td>= " + tmp1 + xtramsg; // The details of the calculation as well as the result.
				//console.log("BSA_Weight - " + x1);
				x.BSA_Weight = x1;
				//					this.locPatient.BSA_Weight = x.BSA_Weight;	//??????????????????????
				return ("= " + tmp);
			},



			showBSACalc: function (x) {
				var strFormula, BSA_Value;
				if ("" === x.BSA_Method) {
					return "";
				}

				var HInMeters = Ext.In2Meters(x.Height);
				// var WInKg = Ext.Pounds2Kilos(x.Weight);
				BSA_Value = x.BSA;
				x.BSA_NoReduction = ""; // Original Calculated BSA w/o reduction due to amputations;
				switch (x.BSA_Method) {
				case "DuBois":
					strFormula = ("= 0.20247 * " + HInMeters + "<sup>0.725</sup> * " + x.BSA_Weight + "<sup>0.425</sup>");
					BSA_Value = Ext.BSA_DuBois(HInMeters, x.BSA_Weight);
					break;

				case "Mosteller":
					strFormula = ("= <span style=\"white-space: nowrap; font-size:larger\">&radic;<span style=\"text-decoration:overline;\">&nbsp;(" + Ext.In2CM(x.Height) + " * " + x.BSA_Weight + ")/3600 &nbsp;</span></span>");
					BSA_Value = Ext.BSA_Mosteller(HInMeters, x.BSA_Weight);
					break;

				case "Haycock":
					strFormula = ("= 0.024265 * " + Ext.In2CM(x.Height) + "<sup>0.3964</sup> * " + x.BSA_Weight + "<sup>0.5378</sup>");
					BSA_Value = Ext.BSA_Haycock(HInMeters, x.BSA_Weight);
					break;

				case "Gehan and George":
					strFormula = ("= 0.0235 * " + Ext.In2CM(x.Height) + "<sup>0.42246</sup> * " + x.BSA_Weight + "<sup>0.51456</sup>");
					BSA_Value = Ext.BSA_Gehan_George(HInMeters, x.BSA_Weight);
					break;

				case "Boyd":
					strFormula = ("= 0.0003207 * " + Ext.In2CM(x.Height) + "<sup>0.3</sup>) * " + (1000 * x.BSA_Weight) + "<sup>(0.7285-0.0188 log " + (1000 * x.BSA_Weight) + ")</sup>");
					BSA_Value = Ext.BSA_Boyd(HInMeters, x.BSA_Weight);
					break;
				default:
					BSA_Value = "";
					break;

				}

				var pAmpu = x.Amputations;
				var AmpuReduction = "";
				if (pAmpu.length > 0) {
					var Reduction = 0;
					var AmpuList = Ext.Amputations;
					var i, y, z;
					for (i = 0; i < pAmpu.length; i++) {
						y = pAmpu[i].description;
						z = AmpuList[y];
						if (0 !== Reduction) {
							Reduction += z.BSA;
						} else {
							Reduction = z.BSA;
						}
					}

					var tmp2 = ((BSA_Value * Reduction) / 100);
					var t1 = tmp2 + "e+" + 2;
					var t2 = Math.round(t1);
					var t3 = t2 + "e-" + 2;
					// var t4 = Ext.GeneralRounding2Digits(t3);
					tmp2 = Ext.FormatNumber(+t3);
					tmp2 = Ext.FormatNumber(+(Math.round(tmp2 + "e+" + 2) + "e-" + 2));
					var Final = (BSA_Value - tmp2);

					var f1 = Final + "e+" + 2;
					var f2 = Math.round(f1);
					var f3 = f2 + "e-" + 2;
					// var f4 = Ext.GeneralRounding2Digits(f3);
					Final = Ext.FormatNumber(+f3);

					AmpuReduction = " - " + Reduction + "% (due to Amputations) = " + Final;
				}

				x.BSA_NoReduction = BSA_Value; // Original Calculated BSA w/o reduction due to amputations;
				var buf = "<tr><th>&nbsp;</th><td>" + strFormula + " = " + BSA_Value + AmpuReduction + " m<sup>2</sup></td></tr>";
				return buf;
			},


			finalBSA: function (v) {
				return ("= " + Ext.BSA_Calc(v) + " m<sup>2</sup>");
			},

			finalBSAUnits : function(v) {
				return v.Dose.split(" ")[1].split("/")[0];
			},

			changeHeightWeight : function () {
				return "<button class=\"anchor changeBSAHeightWeight\" title=\"Change Height/Weight used in BSA Calculations\">Change Height/Weight</button>";
			}
		}
	);

	var newFormula = html.applyTemplate(temp);

	if (saveCalc) {
		PatientInfo.BSA = temp.BSA;
		PatientInfo.BSA_Weight = temp.BSA_Weight;
	}

	return newFormula;

};




Ext.BSAWeight = function (PatientInfo) { // Returns weight in Kilos
	// var h = Ext.In2Meters(PatientInfo.Height);	// Height (in Metres)
	if (!PatientInfo.hasOwnProperty("Height") || !PatientInfo.hasOwnProperty("Weight") || !PatientInfo.hasOwnProperty("Gender") ||
	   ("" === PatientInfo.Height || "" === PatientInfo.Weight)
	) {
		PatientInfo.BSA_Weight = "";
		return "";
	}
	var h = PatientInfo.Height; // Height (in Inches)
	var w = PatientInfo.Weight; // Ext.Pounds2Kilos(PatientInfo.Weight);
	var g = PatientInfo.Gender; // Gender (M/F)
	var CalcWeight = w;

	switch (PatientInfo.WeightFormula) {
	case "Actual Weight":
		CalcWeight = Ext.Pounds2Kilos(w);
		break;

	case "Ideal Weight":
		CalcWeight = Ext.IdealWeight(h, g); // Height in Inches
		break;

	case "Adjusted Weight":
		CalcWeight = Ext.AdjustedWeight(w, h, g); // Weight in pounds, Height in Inches
		break;

	case "Lean Weight":
		CalcWeight = Ext.LeanWeight(w, h, g); // Weight in pounds, Height in Inches
		break;

	default:
		PatientInfo.BSA_Weight = "";
		return "";
	}

	CalcWeight = Ext.FormatNumber(+(Math.round(CalcWeight + "e+" + 2) + "e-" + 2));
	PatientInfo.BSA_Weight = CalcWeight;
	return CalcWeight;
};


Ext.BSA_Calc = function (PatientInfo) {

	var h = Ext.In2Meters(PatientInfo.Height); // Height (in Metres)
	var w = Ext.BSAWeight(PatientInfo);

	// PatientInfo.BSA_Weight;				// BSA_Weight (in Kilos)
	var t = PatientInfo.BSA_Method; // BSA Method (string)
	// var g = PatientInfo.Gender; // Gender (M/F)
	var BaseBSA = "";


	if (0 === h || 0 === w || "" === t) {
		return "";
	}

	switch (t) {
	case "Capped":
		break;

	case "DuBois":
		BaseBSA = Ext.BSA_DuBois(h, w);
		break;

	case "Mosteller":
		BaseBSA = Ext.BSA_Mosteller(h, w);
		break;

	case "Haycock":
		BaseBSA = Ext.BSA_Haycock(h, w);
		break;

	case "Gehan and George":
		BaseBSA = Ext.BSA_Gehan_George(h, w);
		break;

	case "Boyd":
		BaseBSA = Ext.BSA_Boyd(h, w);
		break;
	}



	var pAmpu = PatientInfo.Amputations;
	var Final = BaseBSA;
	if (pAmpu && pAmpu.length > 0) {
		var Reduction = 0;
		var x = Ext.Amputations;
		var i, y, z;
		for (i = 0; i < pAmpu.length; i++) {
			y = pAmpu[i].description;
			z = x[y];
			if (0 !== Reduction) {
				Reduction += z.BSA;
			} else {
				Reduction = z.BSA;
			}
		}

		var tmp = ((BaseBSA * Reduction) / 100);

		var tmp1 = Ext.FormatNumber(+(Math.round(tmp + "e+" + 2) + "e-" + 2));
		Final = (Final - tmp1);
		var f1 = Final + "e+" + 2;
		var f2 = Math.round(f1);
		var f3 = f2 + "e-" + 2;
		// var f4 = Ext.GeneralRounding2Digits(f3);

		Final = Ext.FormatNumber(+f3);
	}

	//	PatientInfo.BSA = Final;
	return Final; // MWB - 6/27/2012 -
};

Ext.DoseCalc = function (Patient, d, du) {
	// MWB - 7/6/2012 - Note this function is never called as of this date
	// h == Height in inches
	// w == Weight in pounds
	// t == BSA Method (string)
	// g == Gender (M/F)
	// d == Dose
	// du = Dose Units

	// var PatientHeight = Patient.Height;
	var PatientWeight = Patient.Weight; // BSA_Weight???
	// var PatientBSA_Method = Patient.BSA_Method;
	var PatientBSA = Patient.BSA;
	// var PatientGender = Patient.Gender;

	// console.log("Return Dose = " + d + " - " + du );

	var ReturnDose = Ext.GeneralRounding2Digits(d) + " " + du;
	if ("AUC" !== du.toUpperCase()) {
		var x = du.split("/");
		if (x.length > 0) {
			if ("M2" === x[1].toUpperCase()) { // Use BSA Calculation
				ReturnDose = Ext.GeneralRounding2Digits(d * PatientBSA) + " " + x[0];
			} else if ("KG" === x[1].toUpperCase()) {
				ReturnDose = Ext.GeneralRounding2Digits(d * PatientWeight) + " " + x[0];
			} else {
				alert("Unknown Dosage Calculation required - " + du);
			}
		}
	}
	//	else {
	// Use Calvert Formula
	// alert("AUC Dosing requires Calvert Formula, Not Yet Available");
	// consle.log("AUC Dosing requires Calvert Formula, Not Yet Available - " + d + " = " + du);
	//	}

	return ReturnDose;
};

Ext.CalcGFR = function(age, kg, gender, SerumCreatinine) {
	var GFR = (140 - age) * kg;
	SerumCreatinine = SerumCreatinine || 1; // fail safe if no SC is available from Lab Results
	if ("F" === gender) {
		GFR = GFR * 0.85;
	}
	GFR = 1 * Ext.GeneralRounding2Digits(GFR / (72 * SerumCreatinine));
	return GFR;
};

Ext.CalcAUCDose = function (Patient, AUC) {
	var age = Patient.Age;
	var gender = Patient.Gender;
	var wt = Patient.Weight; // in pounds
	var kg = Ext.Pounds2Kilos(wt);
	AUC = AUC || 1; // fail safe if no AUC is passed;

	var GFR = Ext.CalcGFR(age, kg, gender, Patient.SerumCreatinine);
	var Dose = (GFR + 25) * AUC;
	Dose = Ext.GeneralRounding2Digits(Dose);
	// Dose = Ext.FormatNumber("" + Dose);
	return Dose + " mg";
};


// http://www.halls.md/bsa/bsaVuReport.htm
// http://www.halls.md/body-surface-area/refs.htm
//  1 inches = 0.0254 meters = 2.54 cm
//	1 pound = 0.45359237 kilograms
//
// Generica formula:
// hMultiplier x (height ^ hPower) x wMultiplier x (weight ^ wPower)
// Note: Mosteller MAY be slightly different (I don't remember my "basic algebra" enough to know if Mosteller could still follow the same pattern)

// The Mosteller formula - http://www.halls.md/body-surface-area/refs.htm
// BSA = Math.sqrt( (cm*kg)/3600 )
//     = Math.sqrt( ((HeightInInches * 2.54) * (WeightInPounds * 0.45359237 ))/3600);
//
// The DuBois and DuBois formula - http://www.halls.md/body-surface-area/refs.htm
// BSA (m^2) = 0.20247 x Height(m)^0.725 x Weight(kg)^0.425
//          = 0.20247 * (Math.pow((0.0254 * HeightInInches), 0.725)) * (Math.pow((0.45359237 * WeightInPounds), 0.425));
//
// Haycock formula - http://www.halls.md/body-surface-area/refs.htm
// BSA (m^2) = 0.024265 x Height(cm)^0.3964 x Weight(kg)^0.5378
//
// Gehan and George formula - http://www.halls.md/body-surface-area/refs.htm
// BSA (m^2) = 0.0235 x Height(cm)^0.42246 x Weight(kg)^0.51456
//
// Boyd BSA Formula -  - http://www.ispub.com/journal/the-internet-journal-of-anesthesiology/volume-2-number-2/a-linear-equation-for-estimating-the-body-surface-area-in-infants-and-children.html
// BSA (cm^2) = 0.0003207 * (Height(cm)^0.3) * Weight(g) ^(0.7285-0.0188 log Weight(g))
//
// Boyd Approximation - http://www.ispub.com/journal/the-internet-journal-of-anesthesiology/volume-2-number-2/a-linear-equation-for-estimating-the-body-surface-area-in-infants-and-children.html
// BSA (cm^2) = 1321 + 0.3433* Wt(g)
// BSA (m^2) = (1321 + 0.3433* Wt(g))/10000

Ext.generic_BSA_Calc = function (h, w, hMultiplier, hPower, wMultiplier, wPower) {
	// var HeightInInches = h.split(" ")[0];
	// var HeightInMeters = (0.0254 * HeightInInches);
	// var HeightInCM = (2.54 * HeightInInches);
	// var WeightInPounds = w.split(" ")[0];
	// var WeightInKilograms = (0.45359237 * WeightInPounds);
	var HeightInMeters = h;
	var WeightInKilograms = w;

	var H1 = Math.pow(HeightInMeters, hPower);
	var W1 = Math.pow(WeightInKilograms, wPower);

	var BSA = hMultiplier * H1 * wMultiplier * W1;


	var rBSA = Ext.FormatNumber(+(Math.round(BSA + "e+" + 2) + "e-" + 2));
	return rBSA;
};

Ext.BSA_Mosteller = function (h, w) { // Height in Meters, Weight in Kg
	if (w <= 0) { // MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
		w = 0;
	}
	if (h <= 0) {
		h = 0;
	}
	var BSA = Math.sqrt((h * 100 * w) / 3600);

	var rBSA = Ext.FormatNumber(+(Math.round(BSA + "e+" + 2) + "e-" + 2));
	return rBSA;
};

Ext.BSA_DuBois = function (h, w) { // Height in Meters, Weight in Kg
	if (w <= 0) { // MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
		w = 0;
	}
	if (h <= 0) {
		h = 0;
	}
	return this.generic_BSA_Calc(h, w, 0.20247, 0.725, 1, 0.425);
};

Ext.BSA_Haycock = function (h, w) { // Height in Meters, Weight in Kg
	if (w <= 0) { // MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
		w = 0;
	}
	if (h <= 0) {
		h = 0;
	}
	return this.generic_BSA_Calc(h * 100, w, 0.024265, 0.3964, 1, 0.5378);
};
Ext.BSA_Gehan_George = function (h, w) { // Height in Meters, Weight in Kg
	if (w <= 0) { // MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
		w = 0;
	}
	if (h <= 0) {
		h = 0;
	}
	return this.generic_BSA_Calc(h * 100, w, 0.0235, 0.42246, 1, 0.51456);
};
Ext.BSA_Boyd = function (h, w) { // Height in Meters, Weight in Kg
	if (w <= 0) { // MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
		w = 0;
	}
	if (h <= 0) {
		h = 0;
	}
	var BSA = 0.0003207 * Math.pow(h * 100, 0.3) * Math.pow(w * 1000, (0.7285 - 0.0188 * Math.log(w * 1000) / Math.LN10));

	var rBSA = Ext.FormatNumber(+(Math.round(BSA + "e+" + 2) + "e-" + 2));
	return rBSA;
};
/*************************************************************
 *
 *	END BSA Calculations Modules
 *
 *************************************************************/


Ext.GetListOfChangedFields = function(theForm) {
	if (theForm.isDirty()) {
		var changedData = Array();
		var itemsList = theForm.getFields().items;
		var iLen = itemsList.length;
		var f;
		for (var i = 0; i < iLen; i++){
			f = itemsList[i];
			if(f.isDirty()){
				var data = {
					"fieldName" : f.getName(),
					"originalValue" : f.originalValue,
					"newValue" : f.getValue()
				};
				if (data.originalValue) {
					changedData.push(data);
				}
			}
		}
		return changedData;
	}
	return false;
};

/* Clear dirty flags for all fields on the form */
/* Call upon successful form submit */
Ext.ClearDirtyFlags = function(theForm) {
	if (theForm.isDirty()) {
		var i, f, itemsList = theForm.getFields().items;
		var iLen = itemsList.length;
		for (i = 0; i < iLen; i++){
			f = itemsList[i];
			if(f.isDirty()){
				f.originalValue = f.getValue();
			}
		}
	}
};

Ext.ClearForm = function(theForm) {
	var i, f, itemsList = theForm.getFields().items;
	var iLen = itemsList.length;
	for (i = 0; i < iLen; i++){
		f = itemsList[i];
		if ("radiofield" == f.xtype) {
			f.setValue(false);
		}
		else if ("checkboxfield" == f.xtype) {
			f.setValue("off");
		}
		else {
			f.setValue("");
		}
		f.originalValue = f.setValue();
		
	}
};

Ext.SetForm2ReadOnly = function(formID, readOnly) {
	var allFields = Ext.query("#" + formID + " input");
	var allText = Ext.query("#" + formID + "  textarea");
	var i, f, itemsList = allFields.concat(allText);
	var iLen = itemsList.length;
	for (i = 0; i < iLen; i++){
		f = itemsList[i];
		f.readOnly = readOnly;
		f.readonly = readOnly;
		if (readOnly) {
			f.setAttribute("disabled", true);
		}
		else {
			f.removeAttribute("disabled");
		}
	}
};

Ext.getDrugInfoFromVistA = function (drugName, drugIEN, theWin, theScope, fnc) {
	// debugger;
	var URL = Ext.URLs.DrugInfo + "/" + drugIEN;
	// var theWin = this.getAddDrugPUWindow();
	if (theWin) {
		theWin.setLoading( "Loading Drug Information");
	}
	Ext.Ajax.request({
		url: URL,
		scope: theScope,
		fnc : fnc,
		success: function(response, opts) {
			var respObj = Ext.decode(response.responseText);
			if (theWin) {
				theWin.setLoading( false );
			}
			opts.fnc(respObj, opts.scope);
		},
		failure: function(response, opts) {
			// var theWin = this.getAddDrugPUWindow();
			if (theWin) {
				theWin.setLoading( false );
			}
			wccConsoleLog('server-side failure with status code ' + response.status);
		}
	});
};

Ext.define('COMS.Ajax', {
	extend: 'Ext.data.Connection',
	singleton: true,
	onComplete: function (request) {
		var me = this;
		var options = request.options;
		var result = (!request.timedout && request.xhr.status) ? me.parseStatus(request.xhr.status) : null;
		var success = (!request.timedout) ? result.success : null;
		var response;
		if (success) {
			response = me.createResponse(request);
			me.fireEvent('requestcomplete', me, response, options);
			Ext.callback(options.success, options.scope, [response, options]);
		} else {
			if (!result || result.isException || request.aborted || request.timedout) {
				response = me.createException(request);
			} else {
				response = me.createResponse(request);
			}
			me.fireEvent('requestexception', me, response, options);
			Ext.callback(options.failure, options.scope, [response, options]);
		}
		Ext.callback(options.callback, options.scope, [options, success, response]);
		delete me.requests[request.id];
		return response;
	}
});

/* taken from - 
 * http://www.learnsomethings.com/2011/10/25/ext-grid-grouping-summary-collapse-all-expand-all-and-collapse-all-but-the-top-group-overrides-for-extjs4/ 
 */
Ext.override(Ext.grid.feature.Grouping, {
	collapseAll: function() {
		var self = this, groups = this.view.el.query('.x-grid-group-body');
		Ext.Array.forEach(groups, function (group) {        
			self.collapse(Ext.get(group.id));    
		});
	},
	expandAll: function() {
		var self = this, groups = this.view.el.query('.x-grid-group-body');   
		Ext.Array.forEach(groups, function (group) {    
			self.expand(Ext.get(group.id));    
		});
	},
	collapseAllButTop: function() {
		var self = this, groups = this.view.el.query('.x-grid-group-body');
		Ext.Array.forEach(groups, function (group) {        
			self.collapse(Ext.get(group.id));    
		});
		if(groups.length > 0){
			this.expand(Ext.get(groups[0].id));
		}
	}
});



Ext.ND_TreatmentTimeRenderer = function(v) {
	if (v && "" !== v) {
		var v1, v2, v3;
		if ("string" == typeof v) {
			v1 = v.split("T");
			if (v1.length > 0) {
				v1 = v1.join(" ");
			}
			v1 = new Date(v1);
			if (isNaN(v1)) {
				return v;
			}
		}
		else {
			v1 = new Date(v);
		}
		v2 = Ext.Date.format(v1, "h:i A");
		return v2;
	}
	return v;
};

Ext.ND_TreatmentTypeOrderRenderer = function(v) {
	switch (v) {
		case 1:
			return "Pre Therapy";
		case 2:
			return "Therapy";
		case 3:
			return "Post Therapy";
	}
};

Ext.ND_TreatmentSignature = function(value, metadata, record, rowIndex, colIndex, store, view) {
	var aStyle = "style=\"text-decoration:underline; color: navy;\"";
	var dspValue = "Sign to Verify";
	var retBuf = "";
	var status = record.getData().orderstatus;
	var dspStatus = record.getData().ActualOrderStatus;
	// if ("Not Dispensed" == status || "Cancelled" ) {
	if ("Dispensed" == status || "Administered" == status ) {
		if (value) {
			aStyle = "";
			dspValue = (value + " - " + record.get("Treatment_Date"));
		}
	}
	else {
		aStyle = "";
		dspValue = "";
	}
	retBuf = Ext.String.format("<span class=\"anchor TreatmentSigner\" {0} row={1} col={2}>{3}</span>", aStyle, rowIndex, colIndex, dspValue);

	return retBuf;
};

Ext.ND_TreatmentAmmendIcon = function(value, metadata, record, rowIndex, colIndex, store, view) {
	var aClass = "";
	if ("Administered" === record.getData().orderstatus) {
		aClass = "class=\"EditCell\" ";
	}
	return Ext.String.format("<div {0} row={1} col={2}>&nbsp;</div>", aClass, rowIndex, colIndex);
};

Ext.ND_CommentRenderer = function(value, metadata, record, rowIndex, colIndex, store, view) {
	if ("Administered" === record.getData().orderstatus || "Dispensed" === record.getData().orderstatus) {
		return value;
	}
	else {
		return record.getData().ActualOrderStatus;
	}
};

// plugins: [ Ext.ND_cellEditing ],
// plugins: [ Ext.create("Ext.grid.plugin.CellEditing", { clicksToEdit: 1 }) ],
Ext.ND_cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    pluginId: 'cellplugin',
    clicksToEdit: 1,
    listeners : {
        scope: this,
        beforeedit: function(e, options) {
			if ("Administered" === options.record.getData().orderstatus || "Dispensed" === options.record.getData().orderstatus) {
				return true;
			}
			else {
				return false;
			}
			/** - https://ahlearns.wordpress.com/2012/06/22/ext-js-4-simple-grid-with-cell-editing/
            // Allow edits in the first column to new rows only
            if (options.colIdx === 0) {
                if (options.record.phantom === true) {
                    return true;
                }
                return false;
            }
			 **/
        }
    }
});