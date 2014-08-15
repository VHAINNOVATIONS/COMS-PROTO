Ext.define("COMS.view.NewPlan.PatientInfoTable", {
	extend: "Ext.panel.Panel",
	alias: "widget.PatientInfoTable",
	name: "Patient Information Table",
	title : "Patient Information",
	
	autoEl : { tag : "section" },
	cls : "xPandablePanel",
	collapsible : true,
	collapsed : true,

	items: [
		{ xtype: "container", name: "PatientInfoTable", cls: "PI_PatientInformationTable", tpl: 
			new Ext.XTemplate(
				// "{[this.DebuggerFcn(values)]}",
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
						//"<button class=\"anchor ShowAllPatientData\" tabType=\"ShowAllPatientData\" name=\"ShowAllPatientData\">..</button>",
						"</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}</td>",
					"</tr>",

					"<tr>",
						"<th>",
						"{[this.AddEditBtns(\"Cancer\", values, parent)]}",
						"Type(s) of Cancer: </th>",
						"<td colspan=3>",
							"<tpl for=\"Disease\">",
								"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
							"</tpl>",
						"</td>",
					"</tr>",

					"<tr>",
						"<th>Allergies: </th>",
						"<td colspan=5>",
							"<tpl if=\"this.Allergies(values)\">",
								"<table class=\"DataTable\">",
									"<tr>",
										"<th>Name</th>",
										"<th>Type</th>",
										"<th>Comment</th>",
									"</tr>",
									"<tpl for=\"Allergies\">",
										"<tr><td>{name}</td><td>{type}</td><td>{comment}</td></tr>",
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
									"<th>&nbsp;</th>",
									"<th>Lifetime Total</th>",
									"<th>Received</th>",
									"<th>Source</th>",
								"</tr>",
								"<tpl for=\"CumulativeDoseTracking\">",
									"{[this.buildCumDoseMedInfo(values)]}",
								"</tpl>",
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

					clinicalTrial : function ( values ) {
						if ("" === values.TemplateID) {
							return "";
						}
						var x = values.ClinicalTrial || "NOT a clinical trial";
						return x;
					},

					BSA_Cell : function (values, parent) {
						if ("" === values.BSA_Method || "" === values.WeightFormula) {
							return "<abbr title=\"Not Available\">N/A</abbr>";
						}
						var buf = "<span id=\"PatientInfoTableBSA_Display\">" + values.BSA +  "</span>" + 
						"<button style=\"margin-left: .25em;\" class=\"anchor DoBSACalcs\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Update BSA</button> " + 
						"<span style=\"margin-left: .25em; font-weight: bold;\">Show</span><button class=\"anchor ShowBSACalcs\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Calculations</button>";
						return buf;
					},

					AddEditBtns : function (btnName, values, parent) {
						var Pre = "<button class=\"anchor AddEdit" + btnName + "\" tabType=\"AddEdit" + btnName + "\" ";
						var Mid = "name=\"AddEdit" + btnName + "\" ";
						var Post = ">Add/Edit</button>&nbsp;&nbsp;";
						return Pre + Mid + Post;
					},

					Allergies : function ( values ) {
						if (values.Allergies.length > 0) {
							return true;
						}
						return false;
					},
					buildCumDoseMedInfo : function ( data ) {
						var CurCumDoseList = data.CurCumDoseList;
						var len = CurCumDoseList.length;
						var buf = "";
							buf += "<tr>";
							buf += "<td style=\"vertical-align: top; text-align: center;\" rowspan=\"" + len + "\">" + data.MedName + " Maximum<div class=\"cdtEm\"> " + data.MedMaxDose + " " + data.MedMaxDoseUnits + "</div></td>";
							buf += "<td style=\"vertical-align: top; text-align: right;\" rowspan=\"" + len + "\">" + data.CurCumDoseAmt + " " + data.MedMaxDoseUnits + "</td>";

						var i;
						for (i = 0; i < len; i++) {
							if (i > 0) {
								buf += "<tr>";
							}
							buf += "<td style=\"vertical-align: top; text-align: right;\">" + CurCumDoseList[i].CumulativeDoseAmt + " " + CurCumDoseList[i].Units + "</td>";
							buf += "<td style=\"vertical-align: top;\">" + CurCumDoseList[i].Source + "</td>";
							buf += "</tr>";
						}
						return buf;
					},

					hasData : function (data) {
						if ("" === data) {
							return (false);
						}
						return (true);
					},

					TemplateName : function (name) {
						if ("" === name) {
							return ("None at this time");
						}
						return (name);
					},

					Links : function (name, id) {
						var buf1 = "";

						try {
							if ("" === name) {
								return ("&nbsp;");
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
								return ("None");
							}

							for (i =0; i < len; i++) {
								buf += a[i].description + "<br>";
							}
							return (buf);
						}
						catch (e) {
							return "";
						}
					},

					CalcBSA : function( data, parent ) {
						try {
							if ("" === data.BSA) {
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