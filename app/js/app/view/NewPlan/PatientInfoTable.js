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
				// "{[this.Debugger(values)]}",
				"{[this.CalcBSA(values)]}",		// Needed to calculate the BSA Value if none retrieved.
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
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
						"<br />{[this.Links(values.TemplateName, values.TemplateID)]}<button class=\"anchor ShowAllPatientData\" tabType=\"ShowAllPatientData\" name=\"ShowAllPatientData\">..</button></td>",
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
							"<table width=\"100%\"><tr><th style=\"text-align: center;\">Name</th><th style=\"text-align: center;\">Type</th><th style=\"text-align: center;\">Comment</th></tr>",
							"<tpl for=\"Allergies\">",
								"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
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
				"</table>",
				{
					// XTemplate Configuration
					disableFormats: true,

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
						"<button style=\"margin-left: 1em;\" class=\"anchor DoBSACalcs\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Update BSA</button> " + 
						"<span style=\"margin-left: 1em; font-weight: bold;\">Show</span> <button class=\"anchor ShowBSACalcs\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Calculations</button>";
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

					Debugger : function ( values ) {
						debugger;
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