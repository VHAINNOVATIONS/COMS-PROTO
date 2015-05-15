Ext.define("COMS.view.NewPlan.PatientInfoTable", {
	extend: "Ext.panel.Panel",
	alias: "widget.PatientInfoTable",
	name: "Patient Information Table",
	title : "Patient Information",
	
	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	items: [		// Patient Information Table
		{ xtype: "container", name: "PatientInfoTable", cls: "PI_PatientInformationTable", tpl: 
			new Ext.XTemplate(
				"{[this.DebuggerFcn(values)]}",
				"{[this.CalcBSA(values)]}",		// Needed to calculate the BSA Value if none retrieved.
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th style=\"width:15em\">Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>{[this.AddEditBtns(\"Amputation\", values, parent)]}Amputee:</th><td id=\"PatientInformationTableAmputations\">{[this.Amputee(values.Amputations)]}</td>",
					"</tr>",


					"<tr>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method:</th><td>{WeightFormula}</td>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Formula:</th><td>{BSA_Method}</td>",
						"<th>",
						"{[this.AddEditBtns(\"BSA\", values, parent)]}<abbr title=\"Body Surface Area\">BSA</abbr>:",
                        "</th><td>{[this.BSA_Cell(values, parent)]}</td>",
					"</tr>",

					"<tr>",
						"<th>Template:</th><td colspan=\"5\">{[this.TemplateName(values.TemplateName)]}",
						"<tpl if=\"this.hasData(TemplateDescription)\">",
							"<br />{TemplateDescription}",
						"</tpl>",
						"{[this.Links(values.TemplateName, values.TemplateID)]}",
						"</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Goal:</th><td>{Goal}</td>",
						"<th>Concurrent Radiation:</th><td>",
							"{[this.ConcurRadTherapy(values.ConcurRadTherapy)]}",
						"</td>",
						"<td colspan=2>&nbsp;</td>",
					"</tr>",

					"<tr>",
						"<th>",
						"{[this.AddEditBtns(\"Cancer\", values, parent)]}",
						"Type(s) of Cancer: </th>",
						"<td colspan=5>",
							"<table class=\"DataTable\"><tr><th>Disease</th><th>Stage</th><th>Recorded on</th><th>User</th><th>Delete</th></tr>",
							"<tpl for=\"Disease\">",
								"{[this.DebuggerFcn(values)]}",
								"<tr><td>{DiseaseName}</td><td>{DiseaseStage}</td><td>{date}</td><td>{Author}</td><td>",
									"{[this.DeleteCancer(out, values, parent, xindex, xcount)]}",
								"</td></tr>",
							"</tpl>",
							"</table>",
						"</td>",
					"</tr>",

					"<tr>",
						"<th>Allergies: </th>",
						"<td colspan=5>",

							"<tpl if=\"this.Allergies(values)\">",
								"<table class=\"DataTable\">",
									"<tr>",
										"<th>Name</th>",
										// "<th>Type</th>",
										"<th>Comment</th>",
									"</tr>",
									"<tpl for=\"Allergies\">",
										"<tr><td>{name}</td>",
										// "<td>{type}</td>",
										"<td>{reaction}</td></tr>",
									"</tpl>",
								"</table>",
							"</tpl>",
							"<tpl if=\"this.Allergies(values) == false\">",
								"No Known Allergies",
							"</tpl>",
						"</td>",
					"</tr>",

					"<tr>",
						"<th>Clinical Trial: </th>",
						"<td colspan=5>",
							"{[this.clinicalTrial(values)]}",
						"</td>",
					"</tr>",

					"<tr>",
						"<th style=\"vertical-align: top;\">Medication Cumulative Dose Tracking: <br><button class=\"anchor AddCumulativeMedication\" tabType=\"AddCumulativeMedication\" name=\"AddCumulativeMedication\">Add Medication</button></th>",
						"<td colspan=5>",
							"<table class=\"DataTable\">",
								"<tr>",
									"<th>Medication / Maximum</th>",
									"<th>Lifetime Total / %</th>",
									"<th>Received / %</th>",
									"<th>Source</th>",
								"</tr>",
								"{[this.buildCumDoseMedInfo(values)]}",
							"</table>",
						"</td>",
					"</tr>",


				"</table>",
				{
					// XTemplate Configuration
					disableFormats: true,
					DebuggerFcn : function ( values ) {
						// debugger;
					},

					ConcurRadTherapy : function (ConcurRadTherapy) {
						if ('0' === ConcurRadTherapy) {
							return "No";
						}
						else if ('' === ConcurRadTherapy) {
							return "";
						}
						else {
							return "Yes";
						}
					},

					DeleteCancer : function (out, values, parent, xindex, xcount) {
						var ci = xindex-1;
						return "<button class=\"anchor DeleteCancerType\" tabType=\"DeleteCancerType\" CancerIdx=\"" + ci + "\" name=\"DeleteCancerType\">Delete</button>";
					},

					clinicalTrial : function ( values ) {
						if ("" === values.TemplateID) {
							return "";
						}
						var x = values.ClinicalTrial || "NOT a clinical trial";
						return x;
					},

					BSA_Cell : function (data) {
						var NAMsg = "<abbr title='Not Available'>N/A</abbr>";
						var btnBuf = "<button style=\"margin-left: .25em;\" class=\"anchor DoBSACalcs\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Update BSA</button> " + 
								"<span style=\"margin-left: .25em; font-weight: bold;\">Show</span><button class=\"anchor ShowBSACalcs\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Calculations</button>";
						if (
							(data.hasOwnProperty("BSA")           && "" !== data.BSA           ) && 
							(data.hasOwnProperty("BSA_Method")    && "" !== data.BSA_Method    && 0 !== data.BSA_Method) && 
							(data.hasOwnProperty("BSA_Weight")    && "" !== data.BSA_Weight    && 0 !== data.BSA_Weight) && 
							(data.hasOwnProperty("WeightFormula") && "" !== data.WeightFormula && 0 !== data.WeightFormula) && 
							(data.hasOwnProperty("Height")        && "" !== data.Height        && 0 !== data.Height) && 
							(data.hasOwnProperty("Weight")        && "" !== data.Weight        && 0 !== data.Weight)
						) {
							var BSA = Ext.BSA_Calc(data);
							if ("" !== BSA && 0 !== BSA && "0.00" !== BSA) {
								data.BSA = BSA;
								return "<span id=\"PatientInfoTableBSA_Display\">" + BSA +  " m<sup>2</sup></span>" + btnBuf;
							}
						}
						data.BSA = "N/A";
						return "<span id=\"PatientInfoTableBSA_Display\"><abbr title='Not Available'>N/A</abbr></span>";
					},

					AddEditBtns : function (btnName, values, parent) {
						var Pre = "<button class=\"anchor AddEdit" + btnName + "\" tabType=\"AddEdit" + btnName + "\" ";
						var Mid = "name=\"AddEdit" + btnName + "\" ";
						var Post = ">Add/Edit</button>&nbsp;&nbsp;";
						if ("Cancer" == btnName) {
							Post = ">Add</button>&nbsp;&nbsp;";
						}
						
						return Pre + Mid + Post;
					},

					Allergies : function ( values ) {
						// debugger;
						if (values.Allergies.length > 0) {
							return true;
						}
						return false;
					},
					buildCumDoseMedInfo : function ( data ) {
						var key, buf = "",
							CurCumDoseAmt,
							Pct2,
							CurCumDoseList = data.CumulativeDoseTracking,
							CurCumDoseAmtNum, CumulativeDoseAmt,
							MedName, Units,
							MedMaxDoseNum,
							MaxCumDose4PatientAmt,
							MedMaxDose,
							innerArray,
							i, len, MaxCumDose4Patient, MaxCumDosePct4Patient,
							InnerArrayBuf;
						for (key in CurCumDoseList) {
							if (CurCumDoseList.hasOwnProperty(key)) {
								MedName = CurCumDoseList[key].MedName;
								Units = CurCumDoseList[key].MaxCumulativeDoseUnits;
								MedMaxDoseNum =("" + CurCumDoseList[key].MaxCumulativeDoseAmt).replace(",", "");
								// MedMaxDose = Ext.util.Format.number(MedMaxDoseNum, "0,0");
								MedMaxDose = Ext.FormatNumber(MedMaxDoseNum);
								innerArray = CurCumDoseList[key].Patient;
								len = innerArray.length;
								MaxCumDose4Patient = 0;
								MaxCumDosePct4Patient = 0;
								InnerArrayBuf = "";

								buf += "<tr>";
								buf += "<td style=\"vertical-align: top; text-align: center;\" rowspan=\"" + innerArray.length + "\">" + MedName + "<div class=\"cdtEm\"> ";
								buf += MedMaxDose + " " +  Units + "</div></td>";
								buf += "<td style=\"vertical-align: top; text-align: right;\" rowspan=\"" + innerArray.length + "\">";
								for (i = 0; i < len; i++) {
									CurCumDoseAmtNum = 1 * ("" + innerArray[i].Amt).replace(",", "");
									MaxCumDose4Patient += CurCumDoseAmtNum;
									// CurCumDoseAmt = Ext.util.Format.number(CurCumDoseAmtNum, "0,0");
									CurCumDoseAmt = Ext.FormatNumber(CurCumDoseAmtNum);
									Pct2 = (( CurCumDoseAmtNum / MedMaxDoseNum ) * 100);
									// Pct2 = Ext.util.Format.number(Pct2, "0,0.0");
									Pct2 = Ext.FormatNumber(Pct2);
									if (i > 0) {
										InnerArrayBuf += "<tr>";
									}
									// CumulativeDoseAmt = Ext.util.Format.number(("" + innerArray[i].Amt).replace(",", ""), "0,0");
									CumulativeDoseAmt = Ext.FormatNumber(("" + innerArray[i].Amt).replace(",", ""));
									InnerArrayBuf += "<td style=\"vertical-align: top; text-align: right;\">" + CumulativeDoseAmt + " " + Units + " / " + Pct2 + "% </td>";
									InnerArrayBuf += "<td style=\"vertical-align: top;\">" + innerArray[i].Src + "</td>";
									InnerArrayBuf += "</tr>";
								}
								MaxCumDosePct4Patient = MaxCumDose4Patient / MedMaxDoseNum;
								// MaxCumDose4PatientAmt = Ext.util.Format.number(MaxCumDose4Patient, "0,0");
								MaxCumDose4PatientAmt = Ext.FormatNumber(MaxCumDose4Patient);
								Pct2 = (MaxCumDosePct4Patient * 100);
								// Pct2 = Ext.util.Format.number(Pct2, "0,0.0");
								Pct2 = Ext.FormatNumber(Pct2);
								buf += MaxCumDose4PatientAmt + " " + Units + " / " + Pct2 + "% </td>" + InnerArrayBuf;
							}
						}
						return buf;
					},

					hasData : function (data) {
						if ("" === data) {
							return false;
						}
						return true;
					},

					TemplateName : function (name) {
						if ("" === name) {
							return "None at this time";
						}
						return name;
					},

					Links : function (name, id) {
						var buf1 = "";

						try {
							if ("" === name) {
								return "&nbsp;";
							}

							// This is the link which appears at the end of the "Calculate BSA" table.
							// This was formerly an anchor
							Ext.ComponentQuery.query("NewPlanTab PatientInfo PatientInfoTable container[name=\"BSA_OEM_Link\"]")[0].el.dom.innerHTML = 
								"&nbsp;<button class=\"anchor\" " + 
								"name=\"Open Order Entry Management Tab\" " + 
								"title=\"Open Order Entry Management Tab\" " + 
								"tabType=\"OEM\" " + 
								"templateName=\"" + name + "\" " + 
								"templateID=\"" + id + "\" " + 
								">Open</button> " +
								"Order Entry Management (<abbr title=\"Order Entry Management\">OEM</abbr>) Tab using this Body Surface Area (<abbr title=\"Body Surface Area\">BSA</abbr>) Value";

							// This was formerly an anchor
							buf1 = 
								"&nbsp;<button class=\"anchor\" " + 
								"name=\"Open Template in CTOS Tab\" " +
								"title=\"Open Template in CTOS Tab\" " +
								"tabType=\"CTOS\" " +
								"templateName=\"" + name + "\" " +
								"templateID=\"" + id + "\" " +
								">Open Template</button> " + 
								"in Chemotherapy Template Order Source (<abbr title=\"Chemotherapy Template Order Source\">CTOS</abbr>) Tab";
						}
						catch (e) {
							return "";
						}
						return buf1;
					},

					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						try {
							var i, len = a.length, buf = "";
							if (0 === len) {
								return "None";
							}

							for (i =0; i < len; i++) {
								buf += a[i].description + "<br>";
							}
							return buf;
						}
						catch (e) {
							return "";
						}
					},

					CalcBSA : function( data, parent ) {
						try {
							if ("" === data.BSA || "<abbr title='Not Available'>N/A</abbr>" === data.BSA) {
								data.BSA = Ext.BSA_Calc(data);
								data.Vitals[0].BSA = data.BSA;
							}
						}
						catch (e) {
							return "";
						}
					}
				}
			)
		}
	]
});