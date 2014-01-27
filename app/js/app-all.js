/*
Copyright(c) 2011 Company Name
*/

/*jslint undef: true, unparam: true, sloppy: true, eqeq: false, vars: true, white: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 6/1/2012

// Useful functions within the application
/**
 *
 *	this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
 *	If the date passed is an Admin day for the current Patients currently active template then
 *	the OEM Data for that Admin day is returned.
 *	Else returns null.
 *	Member of the "NewPlan.OEM" controller
 *
 **/


Ext.override(Ext.data.proxy.Ajax, { timeout:60000 });
// MWB 21 Jan 2012 - Cleaned up the code, ran through JSLint which caught a couple of missing ";" and http://jsbeautifier.org/
// All URLs for the application (REST Data Stores) must be included here.
// This way whenever the base structure/path of all the URLs needs to change it can be done in a single place.
// Moved into the index.php file (approx line 47) to be based on the $Version php variable;

var theJSPath = theJSPath + "app";
Ext.URLs = [];
Ext.COMSModels = []; // Needed for Lookup Table Models, only needed for local dev environment.
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		"COMS": theJSPath,
		"Ext.ux" : "/libs/ExtJS_4.1.0/examples/ux"
//		"Ext.ux" : theJSPath + "/ux"	// <--- Comment out line above and UNcomment this line to build deployment version
	}
});

Ext.URLs.Reasons = "/Workflow/Reasons";
Ext.URLs.Patients = "/Patient/viewall";
// No Params,
// Returns list of all patients and their info, used in the "Select Patient from CRPS" combobox
// Example Usage - https://devtest.dbitpro.com/Patient/viewall
//
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns the info for the specified patient.
//	{
//	    "success": true,
//	    "total": 1,
//	    "records": [
//	        {
//	            "id": "4A12C2FF-E4A4-E111-903E-000C2935B86F",
//	            "name": "PATIENT  FIVEHUNDREDTWENTY",
//	            "DOB": "04/07/1935",
//	            "Gender": "M",
//	            "Age": "77",
//	            "DFN": "100519",
//	            "TemplateName": "",
//	            "TemplateDescription": "",
//	            "TemplateID": "",
//	            "TreatmentStart": "",
//	            "TreatmentEnd": "",
//	            "TreatmentStatus": "",
//	            "Goal": "",
//	            "ClinicalTrial": "",
//	            "WeightFormula": "",
//	            "BSAFormula": "",
//	            "PerformanceStatus": "",
//	            "Amputations": []
//	        }
//	    ]
//	}
// Example Usage - https://devtest.dbitpro.com/Patient/viewall/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.DiseaseType = "/LookUp/view/DiseaseType";
// No Params,
// Returns list of all Diseases, used in "Select Disease Type" combobox
// Example Usage - https://devtest.dbitpro.com/LookUp/view/DiseaseType

Ext.URLs.LabInfo = "/Patient/LabInfoResults";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of Lab Info Results for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/LabInfoResults/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.Allergies = "/Patient/Allergies";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of Allergies for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/Allergies/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.PatientHistory = "/Patient/History";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of History Results for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/History/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.PatientTemplate = "/Patient/Template/";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns Template currently applied for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/Template/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddPatientTemplate = "/Patient/savePatientTemplate/";

Ext.URLs.SavePatient = "/Patient/savePatient";

Ext.URLs.OEMRecords = "/Patient/OEM";		// MWB 02/17/2012 - Added OEM Record URI
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of OEM Records for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/OEM/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.Edit_OEMRecord = "/Patient/OEM";	// MWB 3/5/2012 - Added Edit/Save OEM Record URI - Pending Kevin's specific URI from the framework


Ext.URLs.Vitals = "/Patient/Vitals";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of Vitals for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/Vitals/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddVitals = "/Patient/Vitals";

Ext.URLs.Templates = "/LookUp/Templates";
// No Param - Returns list of templates available

Ext.URLs.BaseView = "/LookUp/view";
Ext.URLs.TimeFrameUnit = "/LookUp/view/TimeFrameUnit";
Ext.URLs.EmotegenicLevel = "/LookUp/view/Emetogenic";
Ext.URLs.TemplateSources = "/LookUp/view/TemplateSource";

Ext.URLs.DiseaseStage = "/LookUp/DiseaseStage";
// Param = DiseaseType ID,
// Returns list of all Stages for the specified Disease Type, used in "Select Disease Stage" combobox
// Example Usage - https://devtest.dbitpro.com/LookUp/DiseaseStage/C884F3AA-0B21-E111-BF57-000C2935B86F

Ext.URLs.Lookups = "/LookUp/viewall";
Ext.URLs.AddLookup = "/LookUp/save"; //KD - 12/20/11 - new URI associated with adding data to the lookup table
Ext.URLs.DeleteLookup = "/LookUp/delete"; //KD - 12/23/11 - new URI associated with deleting data from the lookup table
Ext.URLs.References = "/LookUp/view/References"; // MWB - 12/27/2011 - Moved from local to SQL Data Store
Ext.URLs.HydrationDrug = "/LookUp/Hydration"; // MWB - 12/28/2011 - Added Hydration drug listing
//Ext.URLs.Drugs = "/LookUp/view/Drug/NonFormaDrug"; // MWB - 12/29/2011 - Added drug listing //KD - 1/13/11 - To support Non-Formulary Drugs
Ext.URLs.Drugs = "/LookUp/view/Drug"; //KD - 05/17/12 - Will Append 'InPatient' or 'OutPatient' in Controller
Ext.URLs.DrugUnits = "/LookUp/view/Unit/Drug"; // MWB - 12/29/2011 - Added drug units listing
Ext.URLs.DrugRegimen = "/LookUp/DrugRegimen"; // MWB - 12/30/2011 - Added drug Regimen
Ext.URLs.Infusion = "/LookUp/view/Route"; // MWB - 12/30/2011 - Added Infusion
Ext.URLs.CTOS = "/LookUp/TemplateData/"; // MWB - 1/2/2012 - Added TemplateData/CTOS
Ext.URLs.AddCTOS = "/LookUp/saveTemplate/";
Ext.URLs.DeleteTemplate = "/LookUp/deleteTemplate"; //KD 1/26/12 - To delete Templates.

Ext.URLs.FluidType = "/LookUp/view/FluidType"; //KD 3/7/2012 - Retrieve Fluid Types

Ext.URLs.AdminGlobals = "/Admin/Globals";
// No Params
// Returns list of globals
// Example usage - https://devtest.dbitpro.com/Admin/Globals
// returns - {"success":true,"total":1,"records":[{"domain":"sictest.dbitpro.com","sitelist":"901"}]}

Ext.URLs.AdminUsers = "/Admin/Users";
Ext.URLs.ActiveWorkflows = "/Admin/ActiveWorkflows";
Ext.URLs.MedsNonRounded = "/Admin/MedsNonRounded";
Ext.URLs.Orders = "/Orders/Orders";

// Ext.URLs.ND_Treatment = "/Treatment/NDT";
// Ext.URLs.AddND_Treatment = "/Treatment/NDT";
Ext.URLs.ReadND_Treatment = "/NursingDoc/Treatment";	// Param = PAT_ID to obtain all treatments for the current ID. Used mostly in Flowsheet
Ext.URLs.ND_Treatment = "/Orders/Orders";		// This URI is called to obtain the initial Treatment Record from the Orders generated.
Ext.URLs.AddND_Treatment = "/Orders/Orders";



// Param = none
// Returns all the orders for all patients for the next 3 days.
// The ND_Treatment store has a filter to grab ONLY the orders for the current patient for the current day.
// (see app\controller\NewPlan\CTOS\NursingDocs\TreatmentTab.js)


Ext.URLs.FlowSheetRecords = "/Flowsheet/FS";		// "Flowsheet/Data";		// Used in Flowsheet Model
Ext.URLs.AddFlowSheetRecords = "/Flowsheet/FS";		// "Flowsheet/Data";		// Used in Flowsheet Model
// OLD DATA ---> Param = Flowsheet Record GUID - This is the ID for the Flowsheet which is an array of FlowsheetAdminDay records
// Param = PAT_ID - Patient Treatment ID which identifies the set of records for the current treatment (including flowsheet, nursing docs, OEM, etc)
// Returns Success or Failure of data retrieval from MDWs as a standard JSON object:
//	{
//		"success": "true",
//		"total": "1",
//		"records": [
//			{
//				"FlowsheetAdminDay" : [
//					"id" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//					"PatientID" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//					"Cycle" : 1,
//					"Day" : 1,
//					"AdminDate" : "06/06/2012",
//					"PS" : "Dead",
//					"PSID" : 5,
//					"Weight" : 250,		// Weight in pounds
//					"DiseaseResponse" : "",
//					"Toxicity" : "",
//					"Other" : "",
//					"Labs" : [
//						"id" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"PatientID" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"Cycle" : 1,
//						"Day" : 1,
//						"AdminDate" : "06/06/2012",
//						"Name" : "",
//						"Data" : ""
//					]
//					"PreTherapy" : [
//						"id" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"PatientID" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"Cycle" : 1,
//						"Day" : 1,
//						"AdminDate" : "06/06/2012",
//						"Drug" : "",
//						"AdministeredDose" : ""
//					]
//					"Therapy" : [
//						"id" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"PatientID" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"Cycle" : 1,
//						"Day" : 1,
//						"AdminDate" : "06/06/2012",
//						"Drug" : "",
//						"AdministeredDose" : ""
//					]
//					"PostTherapy" : [
//						"id" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"PatientID" : "28225CF5-3937-E111-9B9C-000C2935B86F",
//						"Cycle" : 1,
//						"Day" : 1,
//						"AdminDate" : "06/06/2012",
//						"Drug" : "",
//						"AdministeredDose" : ""
//					]
//				]
//			}
//		]
//	}
//		OR
//	{"success":"false","message":"Some Error Message","records":""}
// Example Usage - https://devtest.dbitpro.com/Mymdws/Match/B0087


Ext.URLs.MDWS = "/mdws/Patient/index.php";

Ext.URLs.MDWSMatch = "/Mymdws/Match";
// Param = Patient SSN (e.g. B0087)
// Returns Success or Failure of data retrieval from MDWs as a standard JSON object:
//	{
//		"success": "true",
//		"total": "1",
//		"records": {
//			"ID": "94FE3D4E-B78F-E111-8613-000C2935B86F",
//			"Name": "EIGHTYSEVEN-PATIENT BCMA",
//			"Age": 77,
//			"DOB": "04/07/1935",
//			"Gender": "M",
//			"lname": "BCMA",
//			"fname": "EIGHTYSEVEN-PATIENT",
//			"dfn": 100102,
//			"TemplateID": "",
//			"TemplateDescription": "",
//			"TemplateName": "",
//			"TreatmentStart": "",
//			"DateTaken": "",
//			"TreatmentEnd": ""
//		}
//	}
//		OR
//	{"success":"false","message":"Some Error Message","records":""}
// Example Usage - https://devtest.dbitpro.com/Mymdws/Match/B0087



Ext.URLs.MegaMDWS = "/Mymdws/Mega";
// Param = Patient DFN (e.g. 100001)
// Returns Success or Failure of data retrieval from MDWs as a standard JSON object:
//	{"success":"true","message":"Mega call completed succesfully","records":""}
//		OR
//	{"success":"false","message":"MDWS is down...","records":""}
// Example Usage - https://devtest.dbitpro.com/Mymdws/Mega/100000



Ext.URLs.ND_IVSite = "/NursingDoc/IVSite/";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/IVSite/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_IVSite = "/NursingDoc/IVSite/";
// JSON -
//	{
//		"patientId":"2A225CF5-3937-E111-9B9C-000C2935B86F",
//		"DeviceID":"1",
//		"DeviceName":"Hickman",
//		"GaugeID":"2",
//		"GaugeName":"22g",
//		"LocationID":"3",
//		"LocationName":"Right Dorsal Proximal Forearm",
//		"AccessComments":"Some long comment",
//		"NoSymptoms":true,
//		"Pain":true,
//		"Swelling":false,
//		"Erythema":false,
//		"Disconnected":true,
//		"AppearanceComments":"Some more long comments",
//		"PreTreatment":true,
//		"DuringTreatment":false,
//		"PostTreatment":true,
//		"BBRVComments":"Some more BBRV Comments"
//	}
// Note: sequence and levelChosen must be integers.






























Ext.URLs.ND_React_Assess = "/NursingDoc/React_Assess/";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/React_Assess/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_React_Assess = "/NursingDoc/React_Assess/";


Ext.URLs.ND_Assessment = "/NursingDoc/Assessment/";			// MWB - 22 Feb 2012
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/Assessment/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_Assessment = "/NursingDoc/Assessment/";		// MWB - 22 Feb 2012
// JSON -
//	{
//		"patientId":"2A225CF5-3937-E111-9B9C-000C2935B86F",
//		"assessmentDetails":[
//			{"sequence":4,"fieldLabel":"Sleep","choice":false,"comments":"Lots of comments","levelChosen":5},
//			{"sequence":2,"fieldLabel":"Jog","choice":true,"comments":"Lots of comments","levelChosen":3}
//		]
//	}
// Note: sequence and levelChosen must be integers.

Ext.URLs.ND_GenInfo = "/NursingDoc/GenInfo/";				// MWB - 22 Feb 2012
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/GenInfo/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_GenInfo = "/NursingDoc/GenInfo/";			// MWB - 22 Feb 2012

// Ext.URLs.CTCAE_SOC = "/js/MWB_OEM1/app/data1/NursingDocs/CTCAE_SOC.js";
Ext.URLs.CTCAE_SOC = "/NursingDoc/CTCAE_SOC";
// Ext.URLs.CTCAE_Data = "/js/MWB_OEM1/app/data1/NursingDocs/CTCAE_Data";
Ext.URLs.CTCAE_Data = "/NursingDoc/CTCAE_Data";



Ext.URLs.EoTS = "/EndTreatmentSummary/EoTS";
// Param = EoTS GUID;
// Returns data structure for a specific EoTS;
// Example Usage - https://devtest.dbitpro.com/EndTreatmentSummary/EoTS/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddEoTS = "/EndTreatmentSummary/EoTS";



Ext.URLs.ChemoHistory = theJSPath + "/data1/ChemoHistory.js";
// Used in the ChemoHistory Model.

Ext.URLs.RadiationHistory = theJSPath + "/data1/RadiationHistory.js";
// Used in the RadiationHistory Model.

// Ext.URLs.Template = theJSPath + "/data1/Templates.js";
Ext.URLs.CycleLengthMax = theJSPath + "/data1/CycleLengthMax.js";
// Used in the LookupTable_CycleLengthMax model.


// INLINE FOR TESTING: Ext.URLs.Messages = "app/data1/Messages/Filtered/RID/16.js";
// Param = Role ID,
// Returns list of all Messages for the specified Role ID, used in "MessagesTab" Grid Control
// Example Usage - https://devtest.dbitpro.com/Messages/1



Ext.COMSModels.Allergies = "COMS.model.Allergies";
Ext.COMSModels.ChemoHistory = "COMS.model.ChemoHistory";
Ext.COMSModels.CTOS = "COMS.model.CTOS";
Ext.COMSModels.CTOS_References = "COMS.model.CTOS_References";
Ext.COMSModels.CycleLengthMax = "COMS.model.LookupTable_CycleLengthMax";
Ext.COMSModels.CycleLengthStore = "COMS.model.LookupTable_CycleLengthStore";
Ext.COMSModels.DiseaseType = "COMS.model.LookupTable_DiseaseType";
Ext.COMSModels.DiseaseStage = "COMS.model.DiseaseStage";
Ext.COMSModels.Drugs = "COMS.model.Drugs"; // MWB - 12/29/2011 - Added drug listing
Ext.COMSModels.DrugUnits = "COMS.model.DrugUnits"; // MWB - 12/29/2011 - Added drug units listing
Ext.COMSModels.DrugRegimen = "COMS.model.DrugRegimen"; // MWB - 12/30/2011 - Added Drug Regimen
Ext.COMSModels.EmotegenicLevel = "COMS.model.LookupTable_EmotegenicLevel";
Ext.COMSModels.FebrileNeutropeniaRisk = "COMS.model.LookupTable_FebrileNeutropeniaRisk";
Ext.COMSModels.GenericLookup = "COMS.model.GenericLookupModel";
Ext.COMSModels.Hydration = "COMS.model.HydrationDrug"; // MWB 12/28/2011 - Added for the Hydration Drugs
Ext.COMSModels.Infusion = "COMS.model.Infusion"; // MWB - 12/30/2011 - Added Infusion
Ext.COMSModels.LabInfo = "COMS.model.LabInfo";
Ext.COMSModels.LUReferences = "COMS.model.LUReferences"; // MWB 12/27/2011 - Added for the AddReference Combo
Ext.COMSModels.LookupTable = "COMS.model.LookupTable"; //KD - 12/20/11 - Model associated with adding data to the lookup table
Ext.COMSModels.Med = "COMS.model.Med";
Ext.COMSModels.MHMedInfusion = "COMS.model.MHMedInfusion";
Ext.COMSModels.MHMed = "COMS.model.MHMed";
Ext.COMSModels.PatientHistory = "COMS.model.PatientHistory";
Ext.COMSModels.PatientInfo = "COMS.model.PatientInfo";
Ext.COMSModels.PatientInfoMDWS = "COMS.model.PatientInfoMDWS";

Ext.COMSModels.GlobalsTable = "COMS.model.GlobalsTable";
Ext.COMSModels.GlobalLookupModel = "COMS.model.GlobalLookupModel";
Ext.COMSModels.UsersTable = "COMS.model.UsersTable";
Ext.COMSModels.ActiveWorkflowsTable = "COMS.model.ActiveWorkflowsTable";
Ext.COMSModels.MedsNonRoundedTable = "COMS.model.MedsNonRoundedTable";
Ext.COMSModels.OrdersTable = "COMS.model.OrdersTable";

Ext.COMSModels.PatientTemplates = "COMS.model.PatientTemplates";
Ext.COMSModels.References = "COMS.model.References";
Ext.COMSModels.RadiationHistory = "COMS.model.RadiationHistory";
Ext.COMSModels.Template = "COMS.model.LookupTable_Template";
Ext.COMSModels.Templates = "COMS.model.LookupTable_Templates";
Ext.COMSModels.TemplateSources = "COMS.model.LookupTable_TemplateSources";
Ext.COMSModels.TimeFrameUnit = "COMS.model.LookupTable_TimeFrameUnit";
Ext.COMSModels.TotalCoursesMax = "COMS.model.LookupTable_TotalCoursesMax";
Ext.COMSModels.OEMRecords = "COMS.model.OEMRecords";	// MWB - 02/17/2012 - OEM Record Model
Ext.COMSModels.MDWs = "COMS.model.MDWs";				// MWB - 3/15/2012 - MDWs Data Model
Ext.COMSModels.Edit_OEMRecord = "COMS.model.OEMEditRecord";		// MWB 03/5/2012 - Added Edit/Save OEM Record Model
Ext.COMSModels.Vitals = "COMS.model.Vitals";
Ext.COMSModels.ND_Assessment = "COMS.model.ND_Assessment";	// MWB - 22 Feb 2012
Ext.COMSModels.ND_GenInfo = "COMS.model.ND_GenInfo";		// MWB - 22 Feb 2012
Ext.COMSModels.ND_CTCAE_SOC = "COMS.model.ND_CTCAE_SOC";	// MWB - 27 Feb 2012
Ext.COMSModels.ND_CTCAE_Data = "COMS.model.ND_CTCAE_Data";	// MWB - 27 Feb 2012
// INLINE FOR TESTING: Ext.COMSModels.Messages = "COMS.model.Messages";


Ext.COMSModels.EoTS = "COMS.model.EndTreatmentSummary";
Ext.COMSModels.ND_Treatment = "COMS.model.ND_Treatment";
Ext.COMSModels.Flowsheet = "COMS.model.Flowsheet";


Ext.define('COMS.model.Allergies', {
	extend: 'Ext.data.Model',
	fields: [
		'id',
		'name',
		'type',
		'comment'		// Comment - raw data/comment
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.Allergies, 
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});
Ext.define('COMS.model.GenericLookupModel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},		// should this sometimes be "name" or "value"?
		{ name: 'description', type: 'string'},
		{ name: 'lookupid', type:'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Lookups
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.LookupTable_CycleLengthMax', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['CycleLengthMax'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_Template', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['Template'],
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});

Ext.define('COMS.model.LookupTable_Templates', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'id', type: 'string'},
            { name: 'description', type: 'string'},
            { name: 'force', type: 'string'}
    ],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.Templates,
                destroy: Ext.URLs.DeleteTemplate
        },
        reader: {
            type: 'json',
            root : 'records'
        }
    }
});

Ext.define('COMS.model.LookupTable_TemplateSources', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
                { name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['TemplateSources'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_CycleLengthStore', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['CycleLengthStore'],
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});

Ext.define('COMS.model.LookupTable_DiseaseType', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['DiseaseType'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.DiseaseStage', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['DiseaseStage'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_TimeFrameUnit', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['TimeFrameUnit'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_TotalCoursesMax', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['TotalCoursesMax'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_EmotegenicLevel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['EmotegenicLevel'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.LookupTable_FebrileNeutropeniaRisk', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['FebrileNeutropeniaRisk'],
		reader: {
		type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.References', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'Reference', type: 'string'},
		{ name: 'ReferenceLink', type: 'string'}
	]
});

Ext.define('COMS.model.LUReferences', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['References'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});

Ext.define('COMS.model.LookupTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'},		// should this sometimes be "name"?
		{ name: 'description', type: 'string'},
		{ name: 'lookupid', type:'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Lookups,
			update: Ext.URLs.AddLookup,		// KD - 12/20/11 - Added new URI to PUT data back to PHP
			destroy: Ext.URLs.DeleteLookup,	// KD - 12/23/11 - New URI called when deleting item from Lookup 
                        create: Ext.URLs.AddLookup
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty : 'message'
		}
	}
});

Ext.define('COMS.model.HydrationDrug', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'hydrationType', type: 'string' },	// specifies pre or post hydration 
                { name: 'Sequence', type: 'string'},
		{ name: 'Drug', type: 'string'},

		{ name: 'Amt1', type: 'string'},
		{ name: 'Units1', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Infusion1', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		{ name: 'Amt2', type: 'string'},
		{ name: 'Units2', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Infusion2', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string
		{ name: 'Instructions', type: 'string'},
                { name: 'FluidVol1', type: 'string'},
                { name: 'FlowRate1', type: 'string'},
		{ name: 'InfusionTime1', type: 'string'},		
                { name: 'FluidType1', type: 'string'},
                { name: 'FluidVol2', type: 'string'},
                { name: 'FlowRate2', type: 'string'},
                { name: 'FluidType2', type: 'string'},
		{ name: 'InfusionTime2', type: 'string'},		
                { name: 'AdminTime', type: 'string'},
                { name: 'Day', type: 'string'}
	],
        validations : [
            { type: 'presence', name: 'Drug', message: 'Please select a drug'},
            { type: 'presence', name: 'Sequence', message: 'Please select a sequence'},
            { type: 'amt1hydration', name: 'Amt1', message: 'Dosage Amount1 must be entered.'},
            { type: 'unit1hydration', name: 'Units1', message: 'Units 1 must be entered.'},
            { type: 'route1hydration', name: 'Infusion1', message: 'Route 1 must be entered.'},
            { type: 'amt2hydration', name: 'Amt2', message: 'Dosage Amount2 must be entered.'},
            { type: 'unit2hydration', name: 'Units2', message: 'Units 2 must be entered.'},
            { type: 'route2hydration', name: 'Infusion2', message: 'Route 2 must be entered.'},
            { type: 'fluidVol1hydration', name: 'FluidVol1', message: 'Fluid Volume 1 must be entered.'},
            { type: 'fluidVol2hydration', name: 'FluidVol2', message: 'Fluid Volume 2 must be entered.'},
            { type: 'adminTimehydration', name: 'AdminTime', message: 'Administration Time must be entered.'},
            { type: 'presence', name: 'Day', message: 'Administration Day(s) must be entered.'},
            { type: 'flowRate1hydration', name: 'FlowRate1', message: 'Flow Rate 1 must be entered'},
            { type: 'flowRate2hydration', name: 'FlowRate2', message: 'Flow Rate 2 must be entered'},
            { type: 'fluidType1hydration', name: 'FluidType1', message: 'Fluid Type 1 must be entered '},
            { type: 'fluidType2hydration', name: 'FluidType2', message: 'Fluid Type 2 must be entered '}
        ],
	proxy: {
		type: 'rest',
		url : Ext.URLs['HydrationDrug'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});

Ext.define('COMS.model.Drugs', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['Drugs'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});

Ext.define('COMS.model.DrugUnits', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs['DrugUnits'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}

});
Ext.define('COMS.model.DrugRegimen', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'Drug', type: 'string'},
		{ name: 'Amt', type: 'string'},
		{ name: 'Units', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Route', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string
                { name: 'Sequence', type: 'string'},
		// { name: 'PctDose', type: 'string'},
		// { name: 'PctDose', type: 'string'},
		{ name: 'Day', type: 'string'},
		{ name: 'FluidVol', type: 'string'},
		{ name: 'InfusionTime', type: 'string'},		
		{ name: 'AdminTime', type: 'string'},
		{ name: 'FlowRate', type: 'string'},
                { name: 'FluidType', type: 'string'},
        { name: 'Instructions', type: 'string'}
	],
        validations : [
            { type: 'presence', name: 'Drug', message: 'Please select a drug'},
            { type: 'presence', name: 'Sequence', message: 'Please select a sequence'},
            { type: 'presence', name: 'Amt', message: 'Amount must be entered.'},
            { type: 'presence', name: 'Units', message: 'Units must be entered.'},
				// the name used to be "Infusion" rather than "Route", Infusion doesn't exist in the model, 
				// but a bug in the RC version of the library prevented this from being found. 
				// The release version fixed that bug which is why I saw a validation error and the UAT-Test site (which uses the RC library) did not.
			{ type: 'presence', name: 'Route', message: 'Route must be entered.'},		
            { type: 'fluidVolregimen', name: 'FluidVol', message: 'Fluid Volume must be entered.'},
            { type: 'adminTimeregimen', name: 'AdminTime', message: 'Administration Time must be entered.'},
            { type: 'flowRateregimen', name: 'FlowRate', message: 'Flow Rate must be entered'},
            { type: 'fluidTyperegimen', name: 'FluidType', message: 'Fluid Type must be selected'},
            { type: 'presence', name: 'Day', message: 'Administration Day(s) must be entered.'}
        ],
	proxy: {
		type: 'rest',
		url : Ext.URLs.DrugRegimen,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define('COMS.model.Infusion', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'description', type: 'string'}
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.Infusion,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.CTOS_References', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'RefID', type : 'string' },	// raw data
		{ name : 'Ref', type : 'string' },	// raw data
		{ name : 'RefURI', type : 'string' }	// raw data
	],
	belongsTo : 'COMS.model.CTOS'
/**************** Proxy not needed as this data is loaded as part of the CTOS Retrieval - MWB 2 Jan 2012
	proxy: {
		type: 'rest',
		url : Ext.URLs['MHMed'],
		reader: {
			type: 'json',
			root : 'records'
		}
	}
****************/
});

Ext.define('COMS.model.Med', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'Drug', type: 'string'},
		{ name: 'Amt', type: 'string'},
		{ name: 'Units', type: 'string'},		// Internally, use a GUID to the Units Lookup Table, but this should be the actual string
		{ name: 'Route', type: 'string'},	// Internally, use a GUID to the Infusion Method Lookup Table, but this should be the actual string

		{ name: 'Day', type: 'string'},
		{ name: 'FluidVol', type: 'string'},
		{ name: 'InfusionTime', type: 'string'},
		{ name: 'FlowRate', type: 'string'},
		{ name: 'Instructions', type: 'string'},
		{ name : 'FluidType', type : 'string' },	// raw data                                
		{ name : 'Sequence', type: 'string'},
		{ name: 'AdminTime', type: 'string'}
	],

    belongsTo : 'COMS.model.CTOS'
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.MHMedInfusion', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'amt', type : 'string' },	// raw data
                { name : 'unit', type : 'string' },	// raw data
                { name : 'type', type : 'string' },	// raw data
                { name : 'instruction', type : 'string' },	// raw data
                { name : 'flowRate', type : 'string' },	// raw data
                { name : 'fluidVol', type : 'string' },	// raw data
                { name : 'fluidType', type : 'string' },	// raw data                
                { name : 'infusionTime', type : 'string' }	// raw data                                
                
	],
	belongsTo : 'COMS.model.MHMed'
//    proxy: {
//        type: 'rest',
//		url : Ext.URLs['MHMed'],
//        reader: {
//            type: 'json',
//			root : 'records'
//        }
//    }
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.MHMed', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'mhid', type : 'string' },	// raw data
		{ name : 'templateid', type : 'string' },	// raw data            
		{ name : 'drugid', type : 'string' },	// raw data
                { name : 'preorpost', type : 'string' },	// raw data
                { name : 'description', type : 'string' },	// raw data
                { name : 'infusions' },	// raw data
                { name : 'adminDay', type: 'string'},
                { name : 'sequence', type: 'string'},
                { name : 'adminTime', type: 'string'}
	],
	hasMany : { model : 'COMS.model.MHMedInfusion', name : 'infusions' },		// Added - KD 2 Jan 2012
	belongsTo : 'COMS.model.CTOS'
      
//    proxy: {
//        type: 'rest',
//		url : Ext.URLs['MHMed'],
//        reader: {
//            type: 'json',
//			root : 'records'
//        }
//    }
});

Ext.define('COMS.model.PatientTemplates', {
	extend: 'Ext.data.Model',
    queryMode: 'local',
	fields: [
		'id',		
                'PatientId',
                'TemplateId',
		'DateApplied',
		'DateStarted',
                'DateEnded',
                'DateEndedActual',
                'Goal',
                'ClinicalTrial',
                'PerformanceStatus',
                'WeightFormula',
                'BSAFormula',
		'Amputations',
		'msg',
		"EotsID"

	],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.PatientTemplate,
                create: Ext.URLs.AddPatientTemplate		
        },
        
        reader: {
            type: 'json',
            root : 'records',
			successProperty : 'success',
			messageProperty: 'msg'
        }
    }
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define('COMS.model.CTOS', {
    extend: 'Ext.data.Model',
    fields: [
            'id',					// GUID for this record
			'Order_IDR',
            'Disease',
            'DiseaseStage',
            'RegimenName',			// via lookup into Lookup Table for Regimen Name Data Type
            'CourseNum',
            'CourseNumMax',
            'CycleLength',			// raw data
            'CycleLengthUnit',
            'ELevel',				// via lookup into Lookup Table for ELevel Data Type
            'FNRisk',				// raw data

			'References',			// Array of References data, uses the 'hasMany' object below; Added - MWB 2 Jan 2012
//		'Ref',					// raw data	Removed - MWB 2 Jan 2012
//		'RefURI',				// raw data	Removed - MWB 2 Jan 2012

            'PreMHInstructions',	// raw data
            'RegimenInstruction',
            'PostMHInstructions',	// raw data

            'PreMHMeds',		// Array of PreMHMeds data, uses the 'hasMany' object below
            'Meds',		// Array of Meds data, uses the 'hasMany' object below
            'PostMHMeds'		// Array of PostMHMeds data, uses the 'hasMany' object below

    ],
    hasMany : [
            { model : 'COMS.model.CTOS_References', name : 'References' },		// Added - MWB 2 Jan 2012
            { model : 'COMS.model.MHMed', name : 'PreMHMeds' },
            { model : 'COMS.model.Med', name : 'Meds' },
            { model : 'COMS.model.MHMed', name : 'PostMHMeds' }
    ],
    validations : [
      { type: 'presence', name: 'Disease', message: "Cancer Type must be selected"},  
      { type: 'presence', name: 'CourseNumMax', message: "Max Courses must be entered"},
      { type: 'presence', name: 'CycleLength', message: "Cycle Length must be selected"},
      { type: 'regimenVal', name: 'Meds', message: "At least 1 Therapy Regimen must be entered"},
      { type: 'presence', name: 'ELevel', message: "Emotegenic Level must be selected"},
      { type: 'presence', name: 'CycleLengthUnit', message: "Cycle Length Unit must be selected"}
    ],
    proxy: {
        type: 'rest',
        api: {
                read: Ext.URLs.CTOS,
                create: Ext.URLs.AddCTOS		// KD - 1/03/11 - Added new URI to PUT data back to PHP
        },
        
        reader: {
            type: 'json',
            root : 'records',
            successProperty : 'success'
        }
    }
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 5/31/2012

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define("COMS.model.OEMRecordsTherapy", {
    extend: "Ext.data.Model",
    fields: [
		"id",
		"Instructions",
		"Med",
		"AdminTime",

		"Order_ID",		// MWB - 7/2/2012 - New Data for Orders
		"Dose",
		"BSA_Dose",
		"DoseUnits",
		"AdminMethod",

		"FluidType",
		"FluidVol",
		"FlowRate",
		"InfusionTime"
	],
	belongsTo : "COMS.model.OEMRecord"
});


Ext.define("COMS.model.OEMRecordsPrePostTherapy", {
    extend: "Ext.data.Model",
    fields: [
			"id",
			"Instructions",
			"Med",
			"AdminTime",

			"Order_ID",		// MWB - 7/2/2012 - New Data for Orders
			"Dose1",
			"BSA_Dose1",
			"DoseUnits1",
			"AdminMethod1",

			"FluidType1",
			"FluidVol1",
			"FlowRate1",
			"InfusionTime1",

			"Dose2",
			"BSA_Dose2",
			"DoseUnits2",
			"AdminMethod2",

			"FluidType2",
			"FluidVol2",
			"FlowRate2",
			"InfusionTime2"
	],
	belongsTo : "COMS.model.OEMRecord"
});
Ext.define("COMS.model.OEMRecord", {
    extend: "Ext.data.Model",
    fields: [
            "id",					// GUID for this record
			"Cycle",
			"Day",
			"AdminDate",
			"PreTherapyInstr",
			"TherapyInstr",
			"PostTherapyInstr",
			"PreTherapy",
			"Therapy",
			"PostTherapy"
    ],
    hasMany : [
            { model : "COMS.model.OEMRecordsPrePostTherapy", name : "PreTherapy" },
            { model : "COMS.model.OEMRecordsPrePostTherapy", name : "PostTherapy" },
            { model : "COMS.model.OEMRecordsTherapy", name : "Therapy" }
    ],
	belongsTo : "COMS.model.OEMRecords"
});



Ext.define("COMS.model.OEMRecords", {
    extend: "Ext.data.Model",
	fields : [
		"id",							// ID of this particular OEM Record

        "FNRisk",						// Febrile Neutropenia Risk (%)
        "NeutropeniaRecommendation",	// Recommendation for now can be blank

        "ELevelName",					// Emotegenic Level string (e.g. Low (10% - 30%)), taken from Lookup Table
        "ELevelID",						// ID of the ELevel string taken from Lookup Table
        "ELevelRecommendationASCO",		// ASCO Recommendation taken from new table (see "MWB 17 Feb 2012" comment in controller\OEM.js)
        "ELevelRecommendationNCCN",		// NCCN Recommendation taken from new table (see "MWB 17 Feb 2012" comment in controller\OEM.js)

		"Goal",							// Goal of this Treatment Regimen
		"ClinicalTrial",				// Is this a clinical trial (true/false)
		"TrialType",					// If this IS a clinical trial, then this is a string
		"PerformanceStatus",			// Performance Status


		"numCycles",					// Number of Cycles
		"AdminDaysPerCycle",			// # of Admin Days in any given cycle
		"OEMRecords"					// All the OEM Records.
	],
	hasMany : [ { model : "COMS.model.OEMRecord", name : "OEMRecords" } ],

    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.OEMRecords
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success",
			messageProperty : "msg"
        }
    }
});

/*jslint undef:	true, debug: true, sloppy: true, vars: true, white:	true, plusplus:	true, maxerr: 50, indent: 4	*/
// MWB - JSLint run successfully on 5/31/2012
Ext.define("COMS.model.OEMEditRecord", {
	extend:	"Ext.data.Model",
	fields : [
		"TemplateID",		// ID of the specific template this	record belongs to. This	ID should be for a template	specific to	this patient. There	might be multiple templates	with the same name but this	template should	be unique and only linked to this patient
		"OEMRecordID",		// ID of the specific OEM Record of	the	specified template
		"Order_ID",			// ID of the Order Record for this record

		"TherapyID",		// ID of the specific Therapy (Pre,	Post or	Therapy) record	of the specified OEM Record
		"TherapyType",		// Type	of Therapy (Pre, Post or Therapy)
		"Instructions",		// Instructions	for	this record
		"AdminTime",		// Time	of day the med is supposed to be administered
		"MedID",			// ID of the med being administered
		"Med",				// Name	of the med being administered
                "Reason",

		"Dose",				// Base	Dose of	the	Med
		"BSA_Dose",			// BSA Dose	of the Med (blank unless Units is measured in surface area)
		"Units",			// Units
		"InfusionMethod",	// Infusion	Method
		"FluidType",		// Fluid Type (blank unless	the	infusion method	is an IV Type)
		"FluidVol",			// Fluid Volume	(blank unless the infusion method is an	IV Type)
		"FlowRate",			// FlowRate	(blank unless the infusion method is an	IV Type)
		"InfusionTime",		// Duration	of the infusion	 (can be left blank	as it's	computed locally, otherwise	blank unless the infusion method is	an IV Type)

	// Optional	Dosing blank if	the	TherapyType	is "Therapy"
		"Dose2",			// Base	Dose of	the	Med																											   
		"BSA_Dose2",		// BSA Dose	of the Med (blank unless Units is measured in surface area)															   
		"Units2",			// Units																														   
		"InfusionMethod2",	// Infusion	Method																												   
		"FluidType2",		// Fluid Type (blank unless	the	infusion method	is an IV Type)																	   
		"FluidVol2",		// Fluid Volume	(blank unless the infusion method is an	IV Type)																   
		"FlowRate2",		// FlowRate	(blank unless the infusion method is an	IV Type)																	   
		"InfusionTime2"		// Duration	of the infusion	 (can be left blank	as it's	computed locally, otherwise	blank unless the infusion method is	an IV Type)
	],


	proxy: {
		type : "rest",
		api: {
			read : Ext.URLs.Edit_OEMRecord,
			update : Ext.URLs.Edit_OEMRecord,
			create : Ext.URLs.Edit_OEMRecord
		},
		reader:	{
			type: "json",
			root : "records",
			successProperty	: "success"
		}
	}
});

/* Note: This model may have to be refactored once we identify what type of info is held in the Chemo History */
Ext.define('COMS.model.ChemoHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'results', type : 'string' }		// Whether patient had any previous Chemo History - blank or Internally held as a GUID which links to the ChemoHistoryInfo Table
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['ChemoHistory'],
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});

Ext.define('COMS.model.LabInfo', {
	extend: 'Ext.data.Model',
	fields: [
		'ID',			// GUID of the Lab Result
		'relDate',		// Release date of the test - should be a date type field
		'author',		// Author of this lab result
		'specimen',		// Specimen - What the specimen was (e.g. blood, stool, urine, etc) - Internally held as a GUID which links to the Speciment Type Lookup Category
		'specInfo',		// Specimen info - any additional information on the specimen - raw data/comment
		'specColDate',	// Specimen Collection Date - should be a date type field
		'ResultID',
		'name',
		'units',
		'result',
		'mdwsId',
		'acceptRange',
		'site',
		'outOfRange',
		'comment'
	],
	proxy: {
		type: 'rest',
		url: Ext.URLs.LabInfo,
		reader: {
			type: 'json',
			root: 'records'
		}
	}

});
/* Note: This model may have to be refactored once we identify what type of info is held in the Radiation History */
Ext.define('COMS.model.PatientHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'DiseaseType', type : 'string' },
		{ name : 'DiseaseCat', type : 'string' },
		{ name : 'PerfStat', type : 'string' },
		{ name : 'TreatIndic', type : 'string' },
		{ name : 'Protocol', type : 'string' },
		{ name : 'Chemo', type : 'string' },		// Whether patient had any previous Chemo History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
		{ name : 'Radiation', type : 'string' }		// Whether patient had any previous Radiation History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['PatientHistory'],
        reader: {
            type: 'json',
			root : 'records'
        }
    }
});

/************* OLD MODEL ************************
Ext.define('COMS.model.PatientInfo', {
	extend: 'Ext.data.Model',
	idProperty : 'id',
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string'},
		{ name: 'Height', type: 'string'},
		{ name: 'Weight', type: 'string'},
		{ name: 'Age', type: 'string'},
		{ name: 'DOB', type: 'string'},
		{ name: 'Gender', type: 'string'},
		{ name: 'Date', type: 'string'},
		{ name: 'BP', type: 'string'}
	],
    proxy: {
        type: 'rest',
		url : Ext.URLs['Patients'],
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
*****************************************************/
//
// MWB - 01/27/2012
// Major rewrite of the model due to changing the data coming back from the Web Service
//
Ext.define("COMS.model.PatientInfoDiseases", {
	extend: "Ext.data.Model",
	fields: [
		"Type",
		"Stage"
	],
	belongsTo : "COMS.model.PatientInfo"
});



Ext.define("COMS.model.PatientInfoAmputee", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.PatientInfo"
});

/***********
Ext.define("COMS.model.PatientInfoMeasurements", {
	extend: "Ext.data.Model",
	fields: [
		"Height",
		"Weight",
		"BP",
		"DateTaken",
		"WeightFormula",
		"BSA_Method",
		"BSA_Weight",
		"BSA"
	],
	belongsTo : "COMS.model.PatientInfo"
});
***************/

Ext.define("COMS.model.PatientInfo", {
	extend: "Ext.data.Model",
	idProperty : "id",
	fields: [
		"id",
		"name",
		"DOB",
		"Gender",
		"Age",
		// "Measurements",		// Array of measurements
		"DFN",				// Data File Name which links to MDWS
		"Disease",			// Array of diseases

		"TemplateName",		// Info on the currently active template
		"TemplateDescription",
		"TemplateID",
		"PAT_ID",				// This is really the "Treatemen ID" but for now just using the existing SQL Field name.
		// "TreatmentID",		// ID of the record containing this Treatment. This ID acts as a link for all records for this treatment process.
		"TreatmentStart",
        "TreatmentEnd",
		"TreatmentStatus",
		"ClinicalTrial",

		"WeightFormula",
		"BSA_Method",
		"BSA_Weight",
		"BSA",
		"BSAFormula",

		"Amputations",
		"message"			// Used in case an error message is returned from the framework
	],

	hasMany : [
		{ model : "COMS.model.PatientInfoDiseases", name : "Disease" },
		{ model : "COMS.model.PatientInfoAmputee", name : "Amputations" }

		// ,{ model : "COMS.model.PatientInfoMeasurements", name : "Measurements" }
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Patients,
			update: Ext.URLs.SavePatient,
			create: Ext.URLs.SavePatient
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty: 'message'
		}
	}        
});
Ext.define("COMS.model.PatientInfoMDWSDiseases", {
	extend: "Ext.data.Model",
	fields: [
		"Type",
		"Stage"
	],
	belongsTo : "COMS.model.PatientInfoMDWS"
});

/**********
Ext.define("COMS.model.PatientInfoMDWSMeasurements", {
	extend: "Ext.data.Model",
	fields: [
		"Height",
		"Weight",
		"BP",
		"DateTaken",
		"WeightFormula",
		"BSA_Method",
		"BSA_Weight",
		"BSA"
	],
	belongsTo : "COMS.model.PatientInfoMDWS"
});
************/

Ext.define("COMS.model.PatientInfoAmputee", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.PatientInfo"
});

Ext.define("COMS.model.PatientInfoMDWS", {
	extend: "Ext.data.Model",
	idProperty : "id",
	fields: [
		"id",
		"name",
		"DOB",
		"Gender",
		"Age",
		// "Measurements",		// Array of measurements
		"DFN",				// Data File Name which links to MDWS
		"Disease",			// Array of diseases

		"TemplateName",		// Info on the currently active template
		"TemplateDescription",
		"TemplateID",
		"TreatmentStart",
        "TreatmentEnd",
		"TreatmentStatus",

		"Amputations",
		"message"			// Used in case an error message is returned from the framework
	],

	hasMany : [
		{ model : "COMS.model.PatientInfoMDWSDiseases", name : "Disease" },
		{ model : "COMS.model.PatientInfoAmputee", name : "Amputations" }

//		{ model : "COMS.model.PatientInfoMDWSMeasurements", name : "Measurements" }
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.MDWSMatch
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success',
			messageProperty: 'message'
		}
	}        
});
/* Note: This model may have to be refactored once we identify what type of info is held in the Radiation History */
Ext.define('COMS.model.RadiationHistory', {
	extend: 'Ext.data.Model',
	fields: [
		{ name : 'results', type : 'string' }		// Whether patient had any previous Radiation History - blank or Internally held as a GUID which links to the RadiationHistoryInfo Table
	],
	proxy: {
		type: 'rest',
		url : Ext.URLs.RadiationHistory,
		reader: {
			type: 'json',
			root: 'records'
		}
	}
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.Assessment", {
	extend: "Ext.data.Model",
	fields: [
		"sequence",			// The order that this record is to be displayed (fatigue = 1, anorexia = 2, nauesa = 3, vomiting = 4, diarrhea = 5 all others as neeeded
		"fieldLabel",		// The label for the assessment: "fatigue", "Anorexia", "Nausea", etc 
							// Note: the Label should be stored in the Lookup Table and a GUID to that label value stored in the SQL Record for the entries
							// We need the actual label string here so a lookup will need to be done on the SQL side before sending the data to this object
		"choice",			// The value chosen for this assessment: true, false, null 
		"comments",			// The user entered comments
		"levelChosen"		// The level of the Assessment: 1, 2, 3, 4 etc based on the type of assessment
	],
	belongsTo : "COMS.model.ND_Assessment"
});


Ext.define("COMS.model.ND_Assessment", {
	extend: "Ext.data.Model",
	fields: [
			"PatientID",			// GUID for the Patient
            "id",					// GUID for this record
			"date",					// Date assessment made
			"author",				// ID of person who entered this assessment record
            "assessmentDetails"		// Array of Assessment data, uses the "hasMany" object below;
    ],
    hasMany : [
            { model : "COMS.model.Assessment", name : "assessmentDetails" }
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_Assessment,
                create: Ext.URLs.AddND_Assessment
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_GenInfo", {
	extend: "Ext.data.Model",
	fields: [
			"patientId",			// GUID for the Patient
            "id",					// GUID for this record
			"date",					// Date assessment made
			"author",				// ID of person who entered this assessment record

			// Patient Identification section
			"patientIDGood",		// true/false/null - For the "Patient Identification verified..." field
			"consentGood",			// true/false/null - For the "Consent obtained" field
			"comment",				// String			- For the Comment Field in the Patient Identification section

			// Patient Teaching section
			"educationGood",		// true/false/null - "Education assessment complete" field
			"planReviewed"			// true/false/null - "Pre-Procedure plan reviewed..." field
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.ND_GenInfo,
                create: Ext.URLs.AddND_GenInfo
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_CTCAE_SOC", {
	extend: "Ext.data.Model",
	fields: [
            "cat",					// Category for this record
			"soc"					// SOC Data (used to select a category in the Nursing Docs
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.CTCAE_SOC
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_CTCAE_Data", {
	extend: "Ext.data.Model",
	fields: [
            "code",				// Data from the CTCAE Spreadsheet VVVVV
            "cat",				// This is a cross reference field to the CTCAE_SOC data table
            "soc",
            "term",
            "grade1",
            "grade2",
            "grade3",
            "grade4",
            "grade5",
            "termdef"
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.CTCAE_Data
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});

Ext.define("COMS.model.MDWs", {
	extend: "Ext.data.Model",
	fields: [ "id", "data" ],	// These fields are a placeholder till we know what data MDWs will be sending back
	proxy: {
		type: 'rest',
		url : Ext.URLs.MDWS,
		reader: {
			type: 'json',
			root : 'records'
		}
	}
});

Ext.define("COMS.model.Vitals", {
	extend: "Ext.data.Model",
	fields: [
			"PatientID",			// GUID for the Patient
            "Height",
            "Weight",
            "BP",
			"Diastolic",
			"Systolic",
            "WeightFormula",
            "BSA_Method",
            "BSA",
            "BSA_Weight",
            "DateTaken",
            "Temperature",
            "Pulse",
            "Respiration",
            "Pain",
            "SPO2",
            "Cycle",
            "Day",
            "PS",
            "Age",
            "Gender",
			"PS_ID"				// MWB - 6/21/2012 - Added so we can save the PS if passed
	],
	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.Vitals,
			update: Ext.URLs.Vitals,
			create: Ext.URLs.Vitals
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty: "msg"
		}
	}
});

Ext.define('COMS.model.GlobalsTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'sitelist', type: 'string'},
		{ name: 'domain', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.GlobalLookupModel
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.GlobalLookupModel', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'sitelist', type: 'string'},
		{ name: 'domain', type: 'string'}			
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Lookups
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.UsersTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'username', type: 'string'},
		{ name: 'role', type: 'string'},
		{ name: 'DisplayName', type: 'string'},
		{ name: 'Email', type: 'string'},
		{ name: 'cprsUsername', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.UsersLookupModel
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.ActiveWorkflowsTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'WorkFlowName', type: 'string'},
		{ name: 'Active', type: 'string'},
		{ name: 'Reason', type: 'string'},
		{ name: 'NoSteps', type: 'string'},
		{ name: 'Body', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.ActiveWorkflows
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.MedsNonRoundedTable', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'Lookup_ID', type: 'string'},
		{ name: 'Name', type: 'string'},
		{ name: 'NonRounding', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.MedsNonRounded
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

Ext.define('COMS.model.OrdersTable', {
	extend: 'Ext.data.Model',
	fields: [
	
		{ name : 'patientID', type: 'string'},
		{ name : 'templateID', type: 'string'},
		{ name : 'adminDay', type: 'string'},
	{ name : "CourseNum", type : "string" },		// MWB - 6/17/2012 - This is really the "Cycle"
		{ name : 'adminDate', type: 'string'},
		{ name : 'drug', type: 'string'},
		{ name : 'type', type: 'string'},
		{ name : 'dose', type: 'string'},
		{ name : 'unit', type: 'string'},
		{ name : 'route', type: 'string'},
		{ name : 'fluidVol', type: 'string'},
		{ name : 'flowRate', type: 'string'},
		{ name : 'instructions', type: 'string'},
		{ name : 'orderstatus', type: 'string'},
		{ name : 'orderid', type: 'string'},
		{ name : 'Last_Name', type: 'string'}
	],
	proxy: {
		type: 'rest',
		api: {
			read: Ext.URLs.Orders,
			update: Ext.URLs.Orders,
                        create: Ext.URLs.Orders
		},
		reader: {
			type: 'json',
			root : 'records',
			successProperty : 'success'
		}
	}
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */

// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader

Ext.define("COMS.model.FlowSheetMed", {
    extend: "Ext.data.Model",
    fields: [
		"id",
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"Drug",
		"AdministeredDose"
	],
	belongsTo : "COMS.model.FlowsheetAdminDay"
});


Ext.define("COMS.model.FlowSheetLab", {
	extend: "Ext.data.Model",
	fields: [
		"id",
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"Name",
		"Data"
	],
	belongsTo : "COMS.model.FlowsheetAdminDay"
});



Ext.define("COMS.model.FlowsheetAdminDay", {
    extend: "Ext.data.Model",
	fields : [
		"id",							// ID of this particular Flowsheet Admin Day Record
		"PatientID",
		"Cycle",
		"Day",
		"AdminDate",
		"PS",
		"PSID",
		"Weight",
		"DiseaseResponse",
		"Toxicity",
		"Other",
		"Labs",
		"PreTherapy",
		"Therapy",
		"PostTherapy"
	],
	hasMany : [ 
		{ model : "COMS.model.FlowSheetLab", name : "Labs" },
		{ model : "COMS.model.FlowSheetMed", name : "PreTherapy" },
		{ model : "COMS.model.FlowSheetMed", name : "Therapy" },
		{ model : "COMS.model.FlowSheetMed", name : "PostTherapy" }
	],
	belongsTo : "COMS.model.Flowsheet"
});


//
Ext.define("COMS.model.Flowsheet", {
    extend: "Ext.data.Model",
	fields : [
		"PAT_ID",				// GUID for the Treatment record
		"FlowsheetAdminDay"
	],
	hasMany : [ 
		{ model : "COMS.model.FlowsheetAdminDay", name : "FlowsheetAdminDay" }
	],

    proxy: {
        type: "rest",
        api: {
			read: Ext.URLs.FlowSheetRecords,
			create: Ext.URLs.AddFlowSheetRecords,
			update: Ext.URLs.AddFlowSheetRecords
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success",
			messageProperty : "msg"
        }
    }
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.AssessmentTab", {
	extend: "Ext.app.Controller",

	stores: [
	],
	views: [
	],
	refs: [
	],

	// Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"ND_PA_CTCAE_TERM_001\"]")[0].getStore()
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Assessmment Tab Controller!");

		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});
	
		this.control({
			"NursingDocs_PretreatmentAssesment checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_Assessment button[action=\"save\"]": {
                click: this.SaveAssessments
            }
			
		});
	},


	PatientSelected : function() {
	},


	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var selectName, commentName, selectTag, comments;
		switch (btn.name) {
			case "ND_Ass_Fatigue":
				selectName = "ND_Ass_FatigueOptions";
				commentName = "ND_Ass_FatigueComments";
				break;
			case "ND_Ass_Anorexia":
				selectName = "ND_Ass_AnorexiaOptions";
				commentName = "ND_Ass_AnorexiaComments";
				break;
			case "ND_Ass_Nausea":
				selectName = "ND_Ass_NauseaOptions";
				commentName = "ND_Ass_NauseaComments";
				break;
			case "ND_Ass_Vomiting":
				selectName = "ND_Ass_VomitingOptions";
				commentName = "ND_Ass_VomitingComments";
				break;
			case "ND_Ass_Rash":
				selectName = "ND_Ass_RashOptions";
				commentName = "ND_Ass_RashComments";
				break;
			case "ND_Ass_Insomnia":
				selectName = "ND_Ass_InsomniaOptions";
				commentName = "ND_Ass_InsomniaComments";
				break;
			case "ND_Ass_Distress":
				selectName = "ND_Ass_DistressOptions";
				commentName = "ND_Ass_DistressComments";
				break;
			case "ND_Ass_Diarrhea":
				selectName = "ND_Ass_DiarrheaOptions";
				commentName = "ND_Ass_DiarrheaComments";
				break;
			case "ND_Ass_Dyspnea":
				selectName = "ND_Ass_DyspneaOptions";
				commentName = "ND_Ass_DyspneaComments";
				break;
			case "ND_Ass_Neuropathy":
				selectName = "ND_Ass_NeuropathyOptions";
				commentName = "ND_Ass_NeuropathyComments";
				break;
			case "ND_Ass_Other":
				selectName = "";
				commentName = "ND_Ass_OtherComments";
				break;
		}

		if ("" !== selectName ) {
			selectTag = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + selectName + "\"]")[0];
		}
		comments = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + commentName + "\"]")[0];

		if (btn.value) {
			comments.show();
			if ("" !== selectName ) {
				selectTag.show();
				selectTag.focus(true, true);
			}
			else {
				comments.focus(true, true);
			}

		}
		else {
			if ("" !== selectName ) {
				selectTag.hide();
			}
			comments.hide();
		}
	},


	SaveAssessments : function() {
		var Patient = this.application.Patient;

		var assFormChecks = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment checkbox");
		var i, v, haveChecks = false, numChecks = assFormChecks.length, assFormCheck, assFormValue, assFormOption, assFormComments, assFormCommentsValue;
		var record = {}, assessmentsCount = 0;
		record.patientId = Patient.id;
		record.assessmentDetails = [];

		for (i = 0; i < numChecks; i++) {
			assFormCheck = assFormChecks[i];
			v = assFormCheck.getValue();
			if (v) {
				haveChecks = true;
				assFormOption = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + assFormCheck.name + "Options\"]");
				assFormComments = Ext.ComponentQuery.query("NursingDocs_PretreatmentAssesment [name=\"" + assFormCheck.name + "Comments\"]");

				assFormValue = 0;
				assFormCommentsValue = "";

				if (assFormOption && assFormOption.length > 0) {
					assFormValue = assFormOption[0].getValue();
					if (null === assFormValue) {
						assFormValue = 0;
					}
				}
				if (assFormComments) {
					assFormCommentsValue = assFormComments[0].getValue();
				}

				record.assessmentDetails[assessmentsCount++] = { "sequence" : i, "fieldLabel" : assFormCheck.boxLabel, "choice" : true, "comments" : assFormCommentsValue, "levelChosen" : assFormValue};
			}
		}
		if (haveChecks)	{
			var params = Ext.encode(record);
			Ext.Ajax.request({
				url: Ext.URLs.AddND_Assessment,
				method : "POST",
				jsonData : params,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + resp.msg );
					}
					else {
						Ext.MessageBox.alert("Pretreatment Assessment", "Pretreatment Assessment Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + e.message + "<br />" + resp.msg );
				}
			});
		}
	}
});



/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.PreTreatmentTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},
		{
			ref : "ND_PT_Tab",
			selector : "NursingDocs_PreTreatment"
		}
//		,
//
//		{
//			ref : "ND_PT_TabLabInfo",
//			selector : "NursingDocs_PreTreatment [name=\"ND_PT_LabInfo\"]"
//		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Pre Treatment Tab Controller!");

//		this.application.on({
//			PatientSelected : this.PatientSelected,
//			scope : this
//		});
		
		this.control({
			"NursingDocs_PreTreatment" : {
				afterrender : this.TabRendered
			},
            "NursingDocs_PreTreatment button[action=\"save\"]": {
                click: this.btnSaveIVSiteInfo
            }
		});
	},


	btnSaveIVSiteInfo : function (button) {
		Ext.MessageBox.alert("IV Site", "IV Site Information Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("PreTreatment Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.PreTreatmentTab");
//		var LaboratoryInfo = thisCtl.getND_PT_TabLabInfo();
//		LaboratoryInfo.update( Patient.History );
	}

});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.React_AssessTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},
		{
			ref : "ND_RA_Tab",
			selector : "NursingDocs_React_Assess"
		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs React / Assess Tab Controller!");

//		this.application.on({
//			PatientSelected : this.PatientSelected,
//			scope : this
//		});
		
		this.control({
			"NursingDocs_React_Assess checkbox" : {
				change : this.ClickCheckbox
			},
            "NursingDocs_React_Assess button[action=\"save\"]": {
                click: this.SaveReact_Assess
            },

			"NursingDocs_React_Assess" : {
				afterrender : this.TabRendered
			}
		});
	},

	SaveReact_Assess : function() {
		var Patient = this.application.Patient;

		var ReactAssesFormChecks = Ext.ComponentQuery.query("NursingDocs_React_Assess checkbox");
		var i, v, haveChecks = false, numChecks = ReactAssesFormChecks.length, ReactAssesFormCheck, ReactAssesFormValue, ReactAssesFormOption, ReactAssesFormComments, ReactAssesFormCommentsValue;
		var record = {}, ReactAssesessmentsCount = 0;
		record.patientId = Patient.id;
		record.Details = [];

		for (i = 0; i < numChecks; i++) {
			ReactAssesFormCheck = ReactAssesFormChecks[i];
			v = ReactAssesFormCheck.getValue();
			if (v) {
				haveChecks = true;
				ReactAssesFormOption = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Options\"]");
				ReactAssesFormComments = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + ReactAssesFormCheck.name + "Comments\"]");

				ReactAssesFormValue = 0;
				ReactAssesFormCommentsValue = "";

				if (ReactAssesFormOption && ReactAssesFormOption[0]) {
					ReactAssesFormValue = ReactAssesFormOption[0].getValue();
					if (null === ReactAssesFormValue) {
						ReactAssesFormValue = 0;
					}
				}
				if (ReactAssesFormComments && ReactAssesFormComments[0]) {
					ReactAssesFormCommentsValue = ReactAssesFormComments[0].getValue();
				}

				record.Details[ReactAssesessmentsCount++] = { "sequence" : i, "fieldLabel" : ReactAssesFormCheck.boxLabel, "choice" : true, "comments" : ReactAssesFormCommentsValue, "levelChosen" : ReactAssesFormValue};
			}
		}
		if (haveChecks)	{
			var params = Ext.encode(record);
			/***************
			Ext.Ajax.request({
				url: Ext.URLs.AddND_React_Assess,
				method : "POST",
				jsonData : params,
				success: function( response, opts ){
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					if (!resp.success) {
						Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + resp.msg );
					}
				},
				failure : function( response, opts ) {
					var text = response.responseText;
					var resp = Ext.JSON.decode( text );
					Ext.MessageBox.alert("Saving Error", "ND - Assessment Section, Save Error - " + e.message + "<br />" + resp.msg );
				}
			});
			*****************/
			Ext.MessageBox.alert("Infusion Reactions", "Infusion Reactions Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
		}
	},


	ClickCheckbox : function(btn, newValue, oldValue, eOpts) {
		var fldName = "", commentName, txtField, comments;
		switch (btn.name) {
			case "ND_RA_Xtrav_Heat":
				fldName = "ND_RA_Xtrav_HeatFreq";
			break;
			
			case "ND_RA_Xtrav_Cool":
				fldName = "ND_RA_Xtrav_CoolFreq";
			break;
			
			case "ND_RA_Xtrav_Interventions":
				fldName = "ND_RA_Xtrav_InterventionsGiven";
			break;
			
			case "ND_RA_Xtrav_Antidotes":
				fldName = "ND_RA_Xtrav_AntidotesGiven";
			break;
			
			case "ND_RA_Xtrav_Measurements":
				fldName = "ND_RA_Xtrav_MeasurementsDetails";
			break;
			
			case "ND_RA_Xtrav_Discomfort":
				fldName = "ND_RA_Xtrav_DiscomfortDetails";
			break;

			case "ND_RA_Xtrav_Other":
				fldName = "ND_RA_Xtrav_OtherDetails";
			break;
			
			case "ND_RA_CRS_Fever":
				fldName = "ND_RA_CRS_Temperature";
			break;
			
			case "ND_RA_CRS_Hypotension":
				fldName = "ND_RA_CRS_HypotensionBP";
			break;
			
			case "ND_RA_CRS_Tachycardia":
				fldName = "ND_RA_CRS_TachycardiaPulse";
			break;
			
			case "ND_RA_CRS_Rash":
				fldName = "ND_RA_CRS_RashDesc";
			break;

			case "ND_RA_CRS_Other":
				fldName = "ND_RA_CRS_OtherDetails";
			break;
			
			case "ND_RA_HorA_Hypotension":
				fldName = "ND_RA_HorA_HypotensionBP";
			break;
			
			case "ND_RA_HorA_Other":
				fldName = "ND_RA_HorA_OtherDetails";
			break;
			

			case "ND_RA_CR_Reaction":
				fldName = "ND_RA_CR_Comments";
			break;
		}

		if ("" !== fldName ) {
			txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"" + fldName + "\"]")[0];
			if (btn.value) {
				if ("" !== fldName ) {
					txtField.show();
					if ("ND_RA_HorA_HypotensionBP" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_HorA_Systolic\"]")[0];
					}
					else if ("ND_RA_CRS_HypotensionBP" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Systolic\"]")[0];
					}
					else if ("ND_RA_CRS_TachycardiaPulse" === fldName) {
						txtField = Ext.ComponentQuery.query("NursingDocs_React_Assess [name=\"ND_RA_CRS_Pulse\"]")[0];
					}
					txtField.focus(true, true);
				}
			}
			else {
				if ("" !== fldName ) {
					txtField.hide();
				}
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("React / Assess Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.React_AssessTab");
	}
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.EducationTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},
		{
			ref : "ND_E_Tab",
			selector : "NursingDocs_Education"
		},

		{
			ref : "ND_E_PE_Outpatient",
			selector : "NursingDocs_Education [name=\"ND_E_PE_Outpatient\"]"
		},
		{
			ref : "ND_E_DischargeInstrGiven",
			selector : "NursingDocs_Education [name=\"ND_E_DischargeInstrGiven\"]"
		},
		{
			ref : "ND_E_PE_Outpatient",
			selector : "NursingDocs_Education [name=\"\"]"
		}
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Education Tab Controller!");
		this.control({
            "NursingDocs_Education button[action=\"save\"]": {
                click: this.SaveEducation
            }
		});
	},

	SaveEducation : function(button) {
		Ext.MessageBox.alert("Discharge Instructions", "Discharge Instructions Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
	}

});

Ext.define('COMS.view.NavigationTabs' ,{
	extend: 'Ext.tab.Panel',
	alias : 'widget.NavigationTabs',
	name : 'Main Navigation Tabs',

	plain : true,

		// MWB - 5/28/2012 - Moved down to the initComponent so that we can control at load time who sees what tabs
//	items : [
//		{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
//		,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
//		,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
//		,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
//		,{ title : 'Admin', items : [ {xtype : 'AdminTab' }]}	// KD - 12/20/11 - Added new Tab  to PUT data back to PHP
//	],
	initComponent: function() {
		wccConsoleLog("Navigation Tabs View - Initialization");

		// Based on the "Sessionrole" set in main.php ($role = $_SESSION['role'];)
		// determine who can see what tabs.
		// The same process can be used to show/hide various other elements such as buttons 
		if ("Administrator" === Sessionrole || "All Roles" === Sessionrole) {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
				,{ title : 'Admin', items : [ {xtype : 'AdminTab' }]}	// KD - 12/20/11 - Added new Tab  to PUT data back to PHP
			];
		}
		else if ("1" === SessionTemplateAuthoring) {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Template Authoring', items : [ { xtype : 'AuthoringTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
			];
		}
		else {
			this.items = [
				{ title : 'Patient',  items : [ { xtype : 'NewPlanTab' } ] }
				,{ title : 'Orders', items : [ { xtype : 'OrdersTab'} ] }
				,{ title : 'Messages', items : [ { xtype : 'MessagesTab' } ] }
			];
		}



		this.callParent(arguments);
	}
});
Ext.define("COMS.view.NewPlan.NewPlanTab" ,{
	extend: "Ext.container.Container",
	alias : "widget.NewPlanTab",
	name : "New Patient Plan Tab",

	autoEl : { tag : "section" },
	title : "<h2>Patient Information</h2>",
	margin : "10",

	items : [
		{ xtype : "PatientSelection" },
		{ xtype : "PatientInfo" }
	],
	initComponent: function() {
		wccConsoleLog("New Plan Tab View - Initialization");
		this.callParent(arguments);
	}
});
/*
 *	MWB - 12/5/2011
 *	Template Authoring Tab View
 *	This view maintains the tabset for the "Template Authoring Tab" which is one of the main tabs in the application
 *	It is rendered in the application container as part of the main tabset (see "Navigation".
 *	This view is managed by the 'TemplateAuthoring' Control
 */
Ext.define('COMS.view.Authoring.AuthoringTab' ,{
    extend: 'Ext.container.Container',
    alias : 'widget.AuthoringTab',
    name : 'Template Author Tab',

    //	margin : '10',
    autoEl : {
        tag : 'section'
    },
    items : [
    {
        xtype : 'container',
        autoEl : {
            tag : 'section'
        },
        title : 'Create New Template',
        defaults : {
            xtype : 'container', 
            labelAlign: 'right'
        },
        items : [

            {
                xtype : 'fieldcontainer', 
                fieldLabel : "What do you want to do?", 
                labelAlign: "right", 
                labelWidth : 180,
                defaultType: 'radiofield', 
                defaults: {
                    flex: 1
                },
                items: [ 
                {
                    boxLabel  : "Select Existing Template", 
                    name : "Authoring_SelectTemplateType", 
                    inputValue: 0
                }, 
                {
                    boxLabel  : "Create New Template", 
                    name  : "Authoring_SelectTemplateType", 
                    inputValue: 1
                }
                ]
            },
            {
                xtype: 'container',
                name: 'lblRequiredFields',
                margin: '0 0 10 40',
                html: '<b>Fields with a <span style="color:red">*</span> are required fields</b>',
                width: 220,
                hidden: true
            },
            {
                xtype : 'container',  
                name : "selCTOSTemplate", 
                hidden : true, 
                autoEl : {
                    tag : 'section'
                }, 
                margin: '0', 
                items : [

                { 
                    xtype : 'textfield', 
                    name : "PatientName", 
                    fieldLabel: 'Patient Name', 
                    labelAlign : "right", 
                    width : 500, 
                    labelWidth: 150,
                    hidden : true,
                    readOnly: true, 
                    disabled: true 
                },
                {
                    xtype : 'Search4Template'
                },
				
				{ xtype : "container" , layout : "hbox", items : [
				        {
					        xtype : 'selTemplateType'
						},
	                    { 
		                    xtype : 'button', 
			                title : 'ResetFilter',
				            text : 'Show All Templates', 
					        margin: '5 0 0 5',
						    hidden: true
	                    }
					]
				},

                {
                    xtype : 'selDiseaseAndStage'
                },
                { 
                    xtype: 'container',
                    layout : 'hbox',
                    items : [
                    {
                        xtype : 'selTemplate', 
                        name:'FilteredTemplates'
                    }
                    ]

                }
                ]
            },
            {
                xtype : 'selDiseaseAndStage', 
                name : "4CreateNewTemplate", 
                hidden : true
            },
            {
                xtype : "container", 
                name : "courseInfo", 
                layout : "hbox", 
                margin : "5 5 0 0", 
                hidden: true, 
                items : [ 
                    {
                        xtype : "textfield", 
                        name : "CourseNum", 
                        fieldLabel : "Max Courses", 
                        labelAlign : "right", 
                        width : 250, 
                        labelWidth: 200, 
                        hidden: true
                    },
                    {
                        xtype : "textfield", 
                        name : "CourseNumMax", 
                        fieldLabel : "Max Cycles  <em>*</em>", 
                        labelAlign : "right", 
                        allowBlank : false,
                        width : 140, 
                        labelWidth: 95
                    }
                ]
            },
            {
                xtype : "CreateNewTemplate", 
                hidden : true
            }	// Does NOT have a "selDiseaseAndStage" component in it
        ]
    }
    ],

    initComponent: function() {
        wccConsoleLog(this.name + " - Initialization start...");
        this.callParent(arguments);
        wccConsoleLog(this.name + " - Initialization complete...");
    }
});


Ext.define('COMS.view.ExistingPlan.ExistingPlanTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.ExistingPlanTab',
	name : 'Existing Plan Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});
Ext.define('COMS.view.KnowledgeBase.KnowledgeBaseTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.KnowledgeBaseTab',
	name : 'Knowledge Base Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});



Ext.define('COMS.view.Messages.MessagesTab', {
	extend: "Ext.grid.Panel",
	alias: "widget.MessagesTab",
	name: "Messages Tab",
	title: "My Messages",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 300,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["mid", "MTo", "CC", "Subject", "Message", "Date", "MFrom", "rid", "wid", "dateSent", "OpenLink", "timeSent", "MStatus"],
		proxy: {
			type: "rest",
			url: "/Messages/Filtered/RID/16",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},
	
	features: [ Ext.create('Ext.grid.feature.Grouping')],

	columns: [
		//{header : "mid", dataIndex : "mid", width: 25}, 
			//{header : "rid", dataIndex : "rid", width: 25}, 
			//{header : "wid", dataIndex : "wid", width: 25}, 
			//{header : "To", dataIndex : "MTo", width: 250}, 
			//{header : "CC", dataIndex : "CC"}, 
			//{header : "Date", dataIndex : "Date", width: 200}, 
		{
			header: "Date Sent",
			dataIndex: "dateSent",
			width: 80
		},
		{
			header: "Status",
			dataIndex: "MStatus",
			width: 80,
			hidden: true
		},
		{
			header: "Time",
			dataIndex: "timeSent",
			width: 30
		},
		{
			header: "To",
			dataIndex: "MTo"
		},
		{
			header: "From",
			dataIndex: "MFrom"
		},
		{
			header: "CC",
			dataIndex: "CC"
		},
		{
			header: "Subject",
			dataIndex: "Subject",
			width: 400
		},
		{
			header: "Action",
			dataIndex: "OpenLink",
			width: 60,
			renderer: renderURI
		}
		//{header : "Message", dataIndex : "Message", width: 200}
	],
	bbar: [
		{
			text: 'Refresh',
			handler: function () {
				var grid = Ext.ComponentQuery.query('MessagesTab')[0];
				var mystore = grid.getStore();
				mystore.removeAll(true);
				var myview = grid.getView();
				myview.refresh(true);
				mystore.load();
			}
		}
	]
});

function renderURI(value, p, record) {
	var description = record.data.OpenLink;
	if (null !== value && null !== description) {
		return Ext.String.format('<b><a href="{0}" target="_blank">Open</a></b>', value, record.data.OpenLink);
	}
	return ("");
}
Ext.define('COMS.view.Management.ManagementTab' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.ManagementTab',
	name : 'Management Tab',

	margin : '10',
	autoEl : { tag : 'section' },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.items = [{ xtype : 'container', html : "Content for " + this.name }];
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});


Ext.define('COMS.view.Management.AdminTab' ,{
	extend: 'Ext.tab.Panel',
	alias : 'widget.AdminTab',
	name : 'Admin Tab',
	autoEl : { tag : 'nav' },
	padding : "20 10 5 10",
	plain : true,
	items : [
		{ xtype : "AddLookups", title: "Add LookUps" },
		{ xtype : "DeleteTemplate", title: "Delete Template"},
		{ xtype : "Globals", title: "Global Variables"},
		{ xtype : "Users", title: "COMS Users"},
		{ xtype : "ActiveWorkflows", title: "Active Workflows"},
		{ xtype : "MedsNonRounded", title: "Medications Not Rounded"},
		{ xtype : "form", title : "Rounding Rules", padding : "10 10 5 10", items : [ 
			{ xtype : "radiogroup", fieldLabel : "Select Rounding Percentage", labelWidth: 170, columns : 1, vertical : true, width : 450,
				items : [
					{ boxLabel : "No&nbsp;rounding", name : "RoundingRule", inputValue : "0", checked : true },
					{ boxLabel : "5%", name : "RoundingRule", inputValue : "5" },
					{ boxLabel : "10%", name : "RoundingRule", inputValue : "10" }
				]
			},
			{ 
				xtype : "container", 
				html : "Rounding Rules are applied based on the percentage specified when the Pharmacist finalizes an Order Entry Management Record"
			}			
		],
		buttons : [ 
			// The Rounding Value get's pushed into the Lookup Table
			{ text : 'Save', action : 'save' }, 
			{ text : 'Canel', scope : this } 
		]
		}
	],

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});


Ext.define("COMS.view.NewPlan.PatientSelection" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientSelection",
	name : "PatientSelection",

	cls : "xPandablePanel",

	collapsible : true,
	collapsed : false,
	title : "Patient Selection",

	items : [
		{ xtype : "container", margin : "10 0 0 10", layout : "hbox", items : [
			{
			    xtype : "datefield",
				width: 420,
				labelWidth : 310,
				labelAlign : "left",
				fieldLabel: "Enter a range of Administration Dates to search - From",
				name: "from_date",
				value : new Date(),
			    minValue: new Date()  // limited to today or greater
			},
			{
			    xtype : "datefield",
				width: 150,
				labelWidth : 40,
				labelAlign : "right",
			    fieldLabel: "To",
				name: "to_date",
			    minValue: new Date()  // limited to today or greater
			},
			{ 
				xtype : "container", 
				name : "PatientSelectionDate", 
				html : "&nbsp;<button type=\"button\" class=\"anchor\" name=\"SelectPatientAdminRange\">Select Patient by Administration Date(s)</button>" 
			}
		]},

		{ xtype : "container", margin: "0 0 0 10", html : "<b>OR</b>" },
		{ xtype : "container", margin : "0 0 0 10", layout : "hbox", items : [
			{
			    xtype: 'textfield',
				labelWidth : 280,
				labelAlign : "left",
				width: 380,
				fieldLabel: "Enter Patient Identification (SSN) to query <abbr title=\"Computerized Patient Record System\">CPRS</abbr>",
		        name: 'CPRS_QueryString'
			},
			{ 
				xtype : "container", 
				name : "PatientQuery", 
				html : "&nbsp;<button type=\"button\" class=\"anchor\" name=\"QueryCPRS4Patient\">Query CPRS for Patient</button>" 
			}
		]},
		{ xtype : "container", html : "<div style=\"background: #EFEFEF; padding: 0.5em; margin: 0.5em 5em; border: thin solid navy;\">(Note: For testing purposes, there are hundreds of patients available between 0010 and 0603. To search for a patient, use the spelling of the number for a last name and the number. For example: <b>FiveHundredTwenty, Patient</b> would be <b>f0520</b> or <b>OneHundredThirty, Patient</b> would be <b>o0130</b>).</div>" },
		{ xtype : "SelectPatient", margin: "0 0 10 10" }		
	]
});
Ext.define("COMS.view.NewPlan.SelectPatient" ,{
//	extend: "Ext.form.field.ComboBox",
	extend: "Ext.container.Container",
	alias : "widget.SelectPatient",
	name : "Select Patient Control",
	hidden : true,
	items : [
		{ xtype : "container", name : "Confirm", tpl : "Please click here to confirm this is the patient you want : <tpl for=\".\"><button class=\"anchor\" name=\"PatientConfirm\" pid=\"{Patient_ID}\" pn=\"{Patient_Name}\">{Patient_Name}</button></tpl>", hidden : true},
		{ xtype : "combobox", 
			name : "Select", 
			hidden : true,
			store : "Patients", 
			labelWidth: 150,
			width: 450,
			fieldLabel: "Select Patient from <abbr title=\"Computerized Patient Record System\">CPRS</abbr>",
			displayField: "name",
			valueField: "id"
		}
	]
});
Ext.define('COMS.view.NewPlan.PatientInfo' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.PatientInfo',
	name : 'Patient Information',

	cls : 'xPandablePanel',

	collapsed : true,
	items : [
		{ xtype : "container", hidden : true, name : "UpdateMDWSDataContainer", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "DisplayMDWSDataContainer", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info from MDWS" },
		{ xtype : "container", hidden : true, name : "MDWSStatus", html : "Updating Patient Info from MDWS" },
		{ xtype : 'PatientInfoTable' },
		{ xtype : 'PatientTemplates' },
		{ xtype : 'PatientHistory' },
		{ xtype : 'LabInfo' },
			// MWB - 12/12/2011
			// Removed - During 09-Dec customer meeting, client said DiagImage & Pharmacy were not needed
			// Also removed from NewPlanTab view
		// { xtype : 'DiagImage' },
		// { xtype : 'Pharmacy' }
		{ xtype : 'CTOS' }
	]
});

/*jslint undef: true, debug: true, sloppy: true, white: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 6/1/2012

Ext.define("COMS.view.NewPlan.BSAInfoTable", {
	extend: "Ext.container.Container",
	alias: "widget.BSAInfoTable",
	name: "BSAInfoTable",
	title : "Body Surface Area Information",
	
	autoEl : { tag : 'section' },
	cls : 'xPandablePanel',
	hidden: true,
	items: [
		{
			xtype: "container",
			layout: { type: "hbox" },
			defaults: {
				labelAlign: "right",
				labelWidth: 60,
				width: 130,
				labelStyle: "font-weight: bold"
			},
			items: [
				{ xtype: "displayfield", fieldLabel: "Gender", name: "BSA_Gender" },
				{ xtype: "displayfield", fieldLabel: "Height", name: "BSA_Height" },
				{ xtype: "displayfield", fieldLabel: "Weight", width: 200, name: "BSA_Weight" },
				{ xtype: "displayfield", fieldLabel: "Amputee", name: "BSA_Amputee" }
			]
		},
		{ xtype: "container", layout: { type: "hbox" },
			items: [
				{
					xtype: "combo",
					name: "BSA_FormulaWeight",
					fieldLabel: "Weight to use",
					labelAlign: "right",
					labelStyle: "font-weight: bold",
					store: {
						fields: ["weightType"],
						data: [ { weightType: "Actual Weight" },
								{ weightType: "Ideal Weight" },
								{ weightType: "Adjusted Weight" },
								{ weightType: "Other" }
						]
					},
					queryMode: "local",
					displayField: "weightType"
				},
				{
					xtype: "displayfield", 
					fieldLabel: "Calc Weight", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90, 
					labelStyle: "font-weight: bold", 
					name: "BSA_CalcWeight", 
					hidden: true 
				},
				{
					xtype: "textfield", 
					maskRe: /[0-9\.]/, 
					fieldLabel: "Weight (in pounds)", 
					labelAlign: "right", 
					width: 200, 
					labelWidth: 140, 
					labelStyle: "font-weight: bold", 
					name: "BSA_OtherWeight", 
					hidden: true 
				},
				{
					xtype: "displayfield", 
					fieldLabel: "Formula", 
					labelAlign: "right", 
					width: 900, 
					labelWidth: 60, 
					labelStyle: "font-weight: bold", 
					name: "BSA_WeightFormula", 
					hidden: true 
				}
			]
		},
		{
			xtype: "container",
			layout: { type: "hbox" },
			items: [
				{
					xtype: "combo",
					name: "BSA_Formula",
					fieldLabel: "BSA Formula",
					labelAlign: "right",
					labelStyle: "font-weight: bold",
					store: {
						fields: ["formula"],
						data: [ 
							{ formula: "DuBois" },
							{ formula: "Mosteller" },
							{ formula: "Haycock" },
							{ formula: "Gehan and George" },
							{ formula: "Boyd" },
							{ formula: "Capped" }
						]
					},
					queryMode: "local",
					displayField: "formula"
				},
				{ 
					xtype: "displayfield", 
					fieldLabel: "Calc BSA", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90,
					labelStyle: "font-weight: bold", 
					name: "BSA_Calc", 
					hidden: true 
				},
				{ 
					xtype: "textfield", 
					maskRe: /[0-9\.]/, 
					fieldLabel: "BSA", 
					labelAlign: "right", 
					width: 160, 
					labelWidth: 90, 
					labelStyle: "font-weight: bold", 
					name: "BSA_CappedValue", 
					hidden: true 
				},
				{ 
					xtype: "displayfield", 
					fieldLabel: "Formula", 
					labelAlign: "right", 
					labelStyle: "font-weight: bold", 
					width: 900, 
					labelWidth: 60, 
					name: "BSA_CalcFormula", 
					hidden: true 
				}
			]
		},
		{
			xtype : "container",
			name : "BSA_OEM_Link",
			margin : "0 0 10 10",
			html : "", 
			hidden: true 
		}
	]
});



Ext.define("COMS.view.NewPlan.PatientInfoTable", {
	extend: "Ext.panel.Panel",
	alias: "widget.PatientInfoTable",
	name: "Patient Information Table",
	title : "Patient Information",
	
	autoEl : { tag : "section" },
//	cls : "PI_PatientInformationTable",
	cls : "xPandablePanel",
	width: 950,
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
						"<th>Amputee:</th><td>{[this.Amputee(values.Amputations)]}</td>",
					"</tr>",


					"<tr>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method:</th><td>{WeightFormula}</td>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method:</th><td>{BSA_Method}</td>",
						"<th><abbr title=\"Body Surface Area\">BSA</abbr>:</th><td>{BSA} ",
						"<button class=\"anchor\" tabType=\"DoBSACalcs\" name=\"DoBSACalcs\">Calculate BSA</button> ",
						"<button class=\"anchor\" tabType=\"ShowBSACalcs\" name=\"ShowBSACalcs\">Show Calculations</button></td>",
					"</tr>",

					"<tr>",
						"<th>Template:</th><td colspan=\"5\">{[this.TemplateName(values.TemplateName)]}",
						"<tpl if=\"this.hasData(TemplateDescription)\">",
							"<br />{TemplateDescription}",
						"</tpl>",
						"<br />{[this.Links(values.TemplateName, values.TemplateID)]}<button class=\"anchor\" tabType=\"ShowAllPatientData\" name=\"ShowAllPatientData\">..</button></td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}</td>",
					"</tr>",
					"<tr>",
						"<th>Type(s) of Cancer: </th>",
						"<td colspan=3>",
							"<tpl for=\"Disease\">",
								"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
							"</tpl>",
						"</td>",
					"</tr>",
					"<tr>",
						"<th>Allergies: </th>",
						"<td colspan=5>",
							"<table width=\"100%\"><tr><th style=\"text-align: center;\">Name</th><th style=\"text-align: center;\">Type</th><th style=\"text-align: center;\">Comment</th></tr>",
							"<tpl for=\"Allergies\">",
								"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
							"</tpl>",
							"</table>",
						"</td>",
					"</tr>",
					"<tr>",
						"<th>Clinical Trial: </th>",
						"<td colspan=5>",
							"{[this.clinicalTrial(values)]}",
						"</td>",
					"</tr>",
				"</table>",
				"{[this.PostRendering(values, parent)]}",
				{
					// XTemplate Configuration
					disableFormats: true,

					clinicalTrial : function ( values ) {
						var x = values.ClinicalTrial || "NOT a clinical trial";
						return x;
					},

					Debugger : function ( values ) {
						// debugger;
					},
					PostRendering : function(values, parent) {
							// Call this function when the entire xTemplate has been completed
						try {
							Ext.PostTemplateProcessing("Patient Info Table", values, parent);								
						}
						catch (e) {
							// debugger;
						}
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
						// debugger;
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
							// debugger;
						}

						return ( buf1 );
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
							// debugger;
							return ("");
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
							// debugger;
							return ("");
						}
					}
				}
			)
		},
		{ xtype: "BSAInfoTable" }
	]
});
Ext.define("COMS.view.NewPlan.PatientTemplates" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientTemplates",
	name : "Patient Templates Table",
	title : "Treatment Regimens & Summaries",

	autoEl : { tag : "section" },
//	cls : "PI_PatientInformationTable",
	cls : "xPandablePanel",
	width: 950,
	collapsible : true,
	collapsed : true,


	tpl : [
		"<table border=\"1\" style=\"margin: 10px auto;\" class=\"PatHistResults InformationTable\">",
			"<tr>",
				"<th>&nbsp;</th>",
				"<th>Template Name</th>",
				"<th>Start Date</th>",
				"<th>End Date</th>",
				"<th>&nbsp;</th><th>&nbsp;</th>",
			"</tr>",

			"<tpl if=\"''!== TemplateName\">",
				"{[this.Check(values)]}",
				"<tr>",
					"<th>Current Template:</th>",
					"<td>{TemplateName}</td>",
						"<td>{DateStarted}</td>",
						"<td>{ScheduledEndDate}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show Details</button></td>",
					"<td>",
						"<button class=\"anchor\" name=\"GenerateEoTS\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Stop Treatment</button>",
						"<button style=\"display:none;\" class=\"anchor\" name=\"ShowEoTS\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show End of Treatment Summary</button>",
					"</td>",
				"</tr>",
			"</tpl>",

			"<tpl for=\"Historical\">",
				"<tpl if=\"''!== TemplateName\">",
					"<tr>",
						"<th>Historical Template:</th>",
						"<td>{TemplateName}</td>",
						"<td>{DateStarted}</td>",
						"<td>{DateEndedActual}</td>",
						"<td><button class=\"anchor\" name=\"ShowTemplateDetails\" templateName=\"{TemplateName}\" templateID=\"{TemplateID}\">Show Details</button></td>",
						"<td>{[this.EoTSBtn( values )]}</td>",
					"</tr>",
				"</tpl>",
			"</tpl>",
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
			Check : function( v ) {
				// debugger;
			},
			EoTSBtn : function ( current ) {
				var retBuf, btnBuf = "<button class=\"anchor\" templateName=\"" + current.TemplateName + "\" templateID=\"" + current.TemplateID + "\"";
				if ("" === current.EotsID){
					retBuf = btnBuf + "name=\"GenerateEoTS\">Generate End of Treatment Summary</button>";
				}
				else {
					retBuf = btnBuf + "name=\"ShowEoTS\" EotsID=\"" + current.EotsID + "\">Show End of Treatment Summary</button>";
				}
				return retBuf;
			}
		}
	]
});
// MWB 17 Feb 2012 - Added Vital Statistics history here and in the NewPlanTab Controller
function getPHVitalsTableTemplate () {
	return new Ext.XTemplate(
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp</th>",
				"<th rowspan=\"2\">Pulse</th>",
				"<th rowspan=\"2\"><abbr title=\"Blood Pressure\">BP</abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Respiration in breaths per minute\">Resp</abbr></th>",
				"<th rowspan=\"2\">Pain</th>",
				"<th rowspan=\"2\"><abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub></abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Performance Status\">PS</abbr></th>",
				"<th rowspan=\"2\">Height<br />in Inches</th>",
				"<th rowspan=\"2\">Weight<br />in lbs.</th>",
				"<th colspan=\"4\"><abbr title=\"Body Surface Area\">BSA</abbr></th>",
				"</tr>",
			"<tpl for=\"Vitals\">",
				"<tr>",
					"<td>{DateTaken}</td>",
					"<td>{Temperature}</td>",
					"<td>{Pulse}</td>",
					"<td>{BP}</td>",
					"<td>{Respiration}</td>",
					"<td>{Pain}</td>",
					"<td>{SPO2}</td>",
					"<td>{PS}</td>",
					"<td>{Height}</td>",
					"<td>{Weight}</td>",
					"<td>{WeightFormula}</td>",
					"<td>{BSA_Weight}</td>",
					"<td>{BSA_Method}</td>",
					"<td>{BSA}</td>",
				"</tr>",
			"</tpl>",
		"</table>"
	);
}



Ext.define("COMS.view.NewPlan.PatientHistory" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientHistory",
	name : "Patient History",
	title : "Patient History",

	autoEl : { tag : "section" },
//	cls : "PI_PatientInformationTable",
	cls : "xPandablePanel",
	width: 950,
	collapsible : true,
	collapsed : true,

	items : [
		{
			xtype : "fieldset", name : "Vital Statistics History",
			title : "Vital Statistics",
			collapsible : true,
			margin : "5 10 5 10",
			items : [ { xtype : "VitalSignsHistory" } ]
		}
	],

	initComponent: function() {
		wccConsoleLog("Patient History View - Initialization");
		this.callParent(arguments);
	}
});
Ext.define('COMS.view.NewPlan.LabInfo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.LabInfo',
	name : 'Patient Laboratory Information',

	autoEl : { tag : 'section' },
	cls : 'xPandablePanel',
	width: 950,
	collapsible : true,
	collapsed : true,

	title : "Laboratory Information",
	height: 300,

	store : "LabInfo",	// ??? <-- Create store dynamically from the model to pass Patient ID to the model via the Proxy.

	features: [ Ext.create('Ext.grid.feature.Grouping')	],
	columns : [
        { header: 'ID', dataIndex : 'ID', hidden : true },
        { header: 'Date', dataIndex : 'relDate' },
        { header: 'Collection Date', dataIndex : 'specColDate' },
		{ header: 'Lab Tech', dataIndex : 'author' },
        { header: 'Specimen', dataIndex : 'specimen', hidden : true },		// <-- This is the default field to be grouped on, so we hide it but still make it available if the user regroups the grid
        { header: 'Info', dataIndex : 'specInfo' },
		{ header : "Name", dataIndex : "name" },
		{ header : "Result", dataIndex : "result" },
		{ header : "Acceptable Range", dataIndex : "acceptRange" },
		{ header : "OUT of Range", dataIndex : "outOfRange" },
        { header: 'comment', dataIndex : 'comment' }
	]
});

/*jslint undef: true, sloppy: true, eqeq: true, sub: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 5/31/2012

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
		"		<th>Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		//"		<td>{NeutropeniaRecommendation} (Note: Need to add recommendations to Lookup Table for FN)</td>",
		"		<td>The 2005 Update Committee agreed unanimously that reduction in febrile neutropenia(FN) is an important clinical outcome that justifies the use of CSFs, ",
		"regardless of impact on other factors, when the risk of FN is approximately 20% and no other equally effective regimen that does not require CSFs is available. ",
		"Primary prophylaxis is recommended for the prevention of FN in patients who are at high risk based on age, medical history, disease characteristics, and ",
		"myelotoxicity of the chemotherapy regimen. ",
			"CSF use allows a modest to moderate increase in dose-density and/or dose-intensity of chemotherapy regimens. ",
			"Dose-dense regimens should only be used within an appropriately designed clinical trial or if supported by convincing efficacy data. ",
			"Prophylactic CSF for patients with diffuse aggressive lymphoma aged 65 years and older treated with curative chemotherapy (CHOP or more aggressive regimens) ",
			"should be given to reduce the incidence of FN and infections. ",
			"Current recommendations for the management of patients exposed to lethal doses of total body radiotherapy, but not doses high enough to lead to certain death ",
			"due to injury to other organs, includes the prompt administration of CSF or pegylated G-CSF",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>",
		"			<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>{ELevelRecommendationASCO}</p>",
		"			<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>",
		"		</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"3\">{[this.goalLink( values )]}</td></tr>",
		// "	<tr><th>Clinical Trial</th><td colspan=\"3\">{[this.ctLink( values )]}</td></tr>",
		// "	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"3\">{[this.PS( values )]}</td></tr>",
		"</table>",
			{
					// XTemplate Configuration
				disableFormats: true,

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
							"{[this.CalcAnchor( \"Pre\", xindex, values, parent )]}",	// xindex = Drug Index for PreTherapy
							"<div style=\"font-weight: normal; font-style: italic;background:none;\">{Instructions}</div>",
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
							"</table>",

						"</td>",
						"<td style=\"vertical-align: top; padding-left: 1em;\">{AdminTime}</td>",
					"</tr>",

//					"<tpl if=\"this.hasData(Instructions)\">",
//						"<tr class=\"Therapy\"><td colspan=\"3\">{Instructions}</td></tr>",
//					"</tpl>",

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
							"{[this.CalcAnchor( \"Therapy\", xindex, values, parent )]}",	// xindex = Drug Index for Therapy
							"<div style=\"font-weight: normal; font-style: italic;background:none;\">{Instructions}</div>",
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
							"{[this.CalcAnchor( \"Post\", xindex, values, parent )]}",	// xindex = Drug Index for PostTherapy
							"<div style=\"font-weight: normal; font-style: italic;background:none;\">{Instructions}</div>",
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



		"{[this.PostRendering(values, parent)]}",
		"</section>",

			{
					// XTemplate Configuration
				disableFormats: true,
				Patient : "",
				pIndex : 0,
				curCycle : 0,
				curDay : 0,


				PostRendering : function(values, parent) {
						// Call this function when the entire xTemplate has been completed
						Ext.PostTemplateProcessing("OEM", values, parent);
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
					return "<br /><button class=\"anchor EditOEM_Record\" " + buf + ">Edit</button>";
				},
				CalcEditAdminDate : function( current ) {
					var AdminDate = current.AdminDate;
					var today = new Date();
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
			store : { fields : [ "date", "LinkName" ], data : [{ date : "day1", LinkName : "Cycle_1-Day_1" }, { date : "day2", LinkName : "Cycle_1-Day_2" }, { date : "day3", LinkName : "Cycle_1-Day_3" }] }
		},
		{ xtype : "dspOEMTemplateData"}
	]
});


/*
 *	MWB - 12/5/2011
 *	Chemotherapy Template Order Source View
 *	This view maintains all the controls for selecting and modifying a Chemotherapy Order Template for a specific Patient
 *	Note that when a new template is saved in this section it will be flagged as created by the current author and also classed as local for this VA facility
 *	It will also be linked to the currently selected patient (the GUID for the newly created template will be placed in the currently selected patients record
 *	It is rendered in the New Plan Tab once a patient has been selected.
 *	This view is managed by the 'CTOS' Control
 */
Ext.define("COMS.view.NewPlan.CTOS", {
	extend: "Ext.tab.Panel",
    alias : "widget.CTOS",

	name : "CTOS Tabs",

	margin : '0 0 20 0',
	plain : true,
	autoEl : { tag : 'nav' },
	width: 950,


	initComponent: function() {
		wccConsoleLog("Chemotherapy Template Order Source View - Initialization");

		// Based on the "Sessionrole" set in main.php ($role = $_SESSION['role'];)
		// determine who can see what tabs.
		// The same process can be used to show/hide various other elements such as buttons 

		if ("Administrator" === Sessionrole || "All Roles" === Sessionrole || "1" === SessionTemplateAuthoring) {
			this.items = [

				{
					title: "Chemotherapy Template Order Source",
					items : [
						{ xtype : 'fieldcontainer', 
							fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
							defaultType: 'radiofield', defaults: { flex: 1 },
							items: [ 
								{ boxLabel  : 'Select from Templates currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'  }, 
								{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'  }
							]
						},
						{ xtype : 'selTemplate', name : 'MyTemplates'},
						{ xtype : "selCTOSTemplate", hidden : true },
						{ xtype : 'dspTemplateData'},
						{ xtype : "button", name : "Apply", text : "Apply Template to Patient", hidden : true, margin: '0 0 10 50' },
						{ xtype : "button", name : "Edit", text : "Edit Template", hidden : true, margin: '0 0 10 5' }
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology", hidden : true },
				{ xtype : "KnowledgeBase", hidden : true }		// MWB - 7/16/2012 - Per e-mail from Sean this date, do not show KBase Tab, used "hidden" in case any functions expect the tab to be there
			];
		}
		else {
			this.items = [
				{
					title: "Chemotherapy Template Order Source",
					items : [
						{ xtype : 'fieldcontainer', 
							fieldLabel : "What do you want to do?", labelAlign: "right", labelWidth : 180,
							defaultType: 'radiofield', defaults: { flex: 1 },
							items: [ 
								{ boxLabel  : 'Select from Templates currently applied to this patient', name : 'NewPlan_What2Do', inputValue: '0'  }, 
								{ boxLabel  : 'Select an existing standard template', name  : 'NewPlan_What2Do', inputValue: '1'  }
							]
						},
						{ xtype : 'selTemplate', name : 'MyTemplates'},
						{ xtype : "selCTOSTemplate", hidden : true },
						{ xtype : 'dspTemplateData'}
					]
				},

				{ xtype : "OEM" },
				{ xtype : "NursingDocs" },
				{ xtype : "FlowSheet" },
				{ xtype : "Chronology" },
				{ xtype : "KnowledgeBase" }
			];
		}
		this.callParent(arguments);
	}
});

Ext.define("COMS.view.NewPlan.CTOS.PSummary_Overview", {
//	extend : "Ext.form.FieldSet",
	extend : "Ext.container.Container",
	alias : "widget.PSummary_Overview",
	name : "PSummary_Overview", 
//	autoEl : { tag : "section" },
	
	title : "Chemotherapy Template Summary",
//	collapsible : true,
//	frame : true,
	margin: "10",

	tpl : new Ext.XTemplate(
		"<table border=\"1\" width=\"100%\" class=\"Therapy InformationTable\">",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=15%></colgroup>",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=61%></colgroup>",

		"	<thead><tr><th colspan=\"4\" class=\"large\">Patient Summary Information <span style=\"font-weight: normal;\">- for Patient: {PatientName}</span></th></tr></thead>",

		"	<tr><th align=\"right\">Regimen:</th><td colspan=\"3\">{RegimenName}</td></tr>",
		"	<tr><th align=\"right\">Description</th><td colspan=\"3\">{RegimenDescription}</td></tr>",
		"	<tr><th align=\"right\">Treatment Start:</th><td colspan=\"3\">{TreatmentStart}</td></tr>",
		"	<tr><th align=\"right\">Treatment End:</th><td colspan=\"3\">{TreatmentEnd}</td></tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		"		<td>{NeutropeniaRecommendation} (Note: Need to add recommendations to Lookup Table for FN)</td>",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>",
		"			<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>{ELevelRecommendationASCO}</p>",
		"			<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>",
		"		</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"5\">{[this.goalLink( values )]}</td></tr>",
		"	<tr><th>Clinical Trial</th><td colspan=\"5\">{[this.ctLink( values )]}</td></tr>",
		"	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"5\">{[this.PS( values )]}</td></tr>",
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
			goalLink : function ( current ) {
				if (current.Goal){
					return (current.Goal);
				}
				return ("No Goal Specified");
			},
			ctLink : function ( current ) {
				if (current.ClinicalTrial ) {
					return (current.ClinicalTrial);
				}
				return ("Clinical Trial Not Specified");
			},
			ctData : function ( current ) {
				if (current.ClinicalTrial) {
					return ("<tr><th>Type of Trial</th><td colspan=\"5\">" + current.ClinicalTrialType + "</td></tr>");
				}
				return ("");
			},
			PS : function ( current ) {
				var buf = current.PerformanceStatus;
				return (buf);
			}
		}
	)
});


Ext.define("COMS.view.NewPlan.CTOS.PatientSummary" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.PatientSummary",

	name : "Patient Summary Tab",
	margin : "0 0 20 0",

	autoEl : { tag : "section" },
	title: "Patient Summary",
	items : [
//		{ xtype : "container", name : "heading", margin: "5 0 0 10", tpl : "<h2>Patient Summary for {PatientName}</h2>" },
		{ xtype : "PSummary_Overview" }
/******************
	{ xtype : "container", name : "body",
			html : ["<table>",
//				"<tr><td><b>Patient Summary</b><br><i>This page can contain lab results as well.</i></td></tr>",
//				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\"><b>Description:</b></td></tr>",
//				"<tr><td colspan=\"6\">SGleevec 400mg PO q day</td></tr>",
//				"<tr><td colspan=\"6\">Neutropenia Risk: Low: &lt; 17%<br /><b>Recommendation:</b> No Cycle1 preemptive therapy indicated </td></tr>",
//				"<tr><td>&nbsp;</td></tr>",
//				"<tr><td colspan=\"6\"><b>Emesis Risk:</b> Low <br /><b>Recommendation:</b> Routine use of antiemetics is not standard </td></tr>",
//				"<tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\">C1D1 Instructions: (See Order Sheet For Future Days and   Cycles) </td></tr>",
				"<tr><td colspan=\"6\"><table width=\"600\" border=\"2\"><tr><td>Drug Name</td><td>Drug Dose</td><td>Instructions</td></tr>",
				"<tr><td colspan=\"3\">&nbsp;</td></tr><tr><td>Gleevec (400 mg)</td><td>400 mg</td><td>PO daily; Provide script to patient</td></tr>",
				"</table></td></tr>",
				"<tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\"><span class=\"style6\">Alerts<br />",
				"<input name=\"alert\" type=\"text\" class=\"style6\" id=\"alert\" value=\"Consider ESA for HB&lt;10, HCt&lt;30 in solid tumors, lymphoma, myeloma and MDS.\" size=\"90\" /> </td></tr>",
				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\"><b>Information:</b></td></tr>",
				"<tr><td>&nbsp;</td></tr><tr><td colspan=\"6\">",
				"<p>Understanding of the molecular pathophysiology of chronic myelogenous leukemia (CML) has led to targeted therapies for this ",
				"disease.  Imatinib mesylate (Gleevec) is a potent inhibitor of the BCR-ABL tyrosine kinase which offers 82% complete cytogenetic ",
				"remission and 86% overall survival at 7 years for patients diagnosed in chronic phase1.  Second generation tyrosine kinase ",
				"inhibitors (dasatinib, nilotinib) are effective for imatinib-resistant disease, and are being evaluated for front line therapy2.</p>",
				"<br><p>Although allogeneic hematopoietic-cell transplantation is the only proven curative treatment for CML, the procedure is an ",
				"option in only about 25 percent of patients and carries substantial risks. On the basis of the high early mortality rate associated with bone marrow transplantation and the promising results with Imatinib, early transplantation is not recommended</p><ol><li>  ASH 2009 Annual Meeting, abstract 186.</li><li>  N Engl J Med 2006 354:2531-2541        </li><li>  Mayo Clin Proc 81:973-988, 2006</li></ol></td></tr>",
				"<tr><td colspan=\"6\"></td></tr><tr><td>&nbsp;</td></tr>",
				"<tr><td colspan=\"6\"><b>Reference:</b>    </td></tr>",
				"<tr><td colspan=\"6\">N Eng J Med 2001; 344:1038<br />N Eng J Med 2003; 348:994 <br />N Eng J Med 2006; 355:2408</td></tr>",
				"</table>"
			]
		}
***************/
	],

	initComponent: function() {
		wccConsoleLog("Patient Summary Tab View - Initialization");
		this.callParent(arguments);
	}
});
Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Chemotherapy" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_Chemotherapy",
	name : "NursingDocs.Chemotherapy",
	title : "Chemotherapy / Biotherapy",

	items : [ { xtype : "displayfield", name : "ndctWarning"}, { 
		xtype : "container", 
		layout : "hbox",
		defaults : {
		    labelAlign: "right"
		},
		items : [
			{ xtype : "displayfield", name : "ndctRegimen", fieldLabel : "Regimen", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctCycle", fieldLabel : "Cycle", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctDay", fieldLabel : "Day", labelClsExtra : "NursingDocs-label" },
			{ xtype : "displayfield", name : "ndctDate", fieldLabel : "Date", labelClsExtra : "NursingDocs-label" }
		]
	}]
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs" ,{
	extend : "Ext.container.Container",
	alias : "widget.NursingDocs",
	name : "Nursing Documentation Tabs",
	title: "Nursing Documentation",
	padding : "10",
	bodyCls : "Level1",
bodyStyle: {
    background: '#ffc',
    padding: '10px'
},

	items : [
		{ xtype : "NursingDocs_Chemotherapy", cls : "Level1" },
		{ xtype : "tabpanel", plain : true, autoEl : { tag : 'nav' },
			items : [
				{ xtype : "NursingDocs_GenInfo", padding : "10" },
				{ xtype : "NursingDocs_Assessment", padding : "10" },
				{ xtype : "NursingDocs_PreTreatment", padding : "10" },
				{ xtype : "NursingDocs_Treatment", padding : "10" },
				{ xtype : "NursingDocs_React_Assess", padding : "10" },
				{ xtype : "NursingDocs_Education", padding : "10" }
			]
		}
	]
});

Ext.define("COMS.view.NewPlan.CTOS.KnowledgeBase" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.KnowledgeBase",

	name : "Knowledge Base Tab",
	margin : "0 0 20 0",

	autoEl : { tag : "section" },
	title: "Knowledge Base",
	html:	[
		"<h2>Knowlege Base Article on Gleevec</h2>",
		"<p><span class=\"style2\"><strong>Gleevec &tm;</strong></span><br />",
		"<span class=\"style2\">Generic name:</span> Imatinib Mesylate<br /><span class=\"style2\">Other names:</span> STI-571<br /><br />",
		"Gleevec is the trade name for the generic drug name Imatinib Mesylate. STI-571 is another name for Imatinib Mesylate. ",
		"In some cases, health care professionals may use the trade name Gleevec or other name STI-571 when referring to the generic drug name Imatinib Mesylate.<br />",
		"<br />",
		"<span class=\"style2\">Drug type:</span> Gleevec is a targeted therapy. Gleevec is classified as a signal transduction inhibitor - ",
		"proteintyrosine kinase inhibitor. (For more detail, see &quot;How this drug works&quot; below).<br /><br />",
		"<span class=\"style2\">What Gleevec is used for:</span><br />",
		"<ul>",
		"<li>Newly diagnosed adult and pediatric patients with Philadelphia chromosome positive chronic myeloid<br />leukemia (Ph+ CML) in chronic phase.</li>",
		"<li>Ph+ CML in blast crisis, accelerated phase, or chronic phase after failure of interferon-alpha therapy.</li>",
		"<li>Adult patients with relapsed or refractory Philadelphia chromosome + acute lymphoblastic leukemia (Ph+ALL)</li>",
		"<li>Adult patients with myelodysplastic/myeloproliferative diseases (MDS/MPD) associated with PDGFR gene rearrangements.</li>",
		"<li>Gastrointestinal stromal tumors that are C-kit positive.</li>",
		"</ul>",
		"<span class=\"style2\">Note:</span> If a drug has been approved for one use, physicians may elect to use this same drug for other problems if they ",
		"believe it may be helpful.<br /><br />",
		"<ul><span class=\"style2\">How Gleevec is given:</span>",
		"<li>Gleevec is a pill, taken by mouth, once or twice daily.</li>",
		"<li>Gleevec should be taken with a large glass of water, after a meal.</li>",
		"<li>The amount of Gleevec that you will receive depends on many factors, including your general health or other health problems, and the type of ",
		"cancer or condition being treated. Your doctor will determine your dose and schedule.</li>",
		"</ul>",
		"<br />",
		"<ul><span class=\"style2\">Side effects of Gleevec:</span><br />",
		"Important things to remember about the side effects of Gleevec:",
		"<li>Most people do not experience all of the side effects listed.</li>",
		"<li>Side effects are often predictable in terms of their onset and duration.</li>",
		"<li>Side effects are almost always reversible and will go away after treatment is complete.</li>",
		"<li>There are many options to help minimize or prevent side effects.</li>",
		"<li>There is no relationship between the presence or severity of side effects and the effectiveness of the medication.</li>",
		"<li>The side effects of Gleevec and their severity depend on how much of the drug is given. In other words, high doses may produce more severe side effects.</li>",
		"</ul><br />",
		"<ul><span class=\"style2\">The following side effects are common (occurring in greater than 30%) for patients taking Gleevec: </span> ",
		"<li>Low blood counts. Your white and red blood cells and platelets may temporarily decrease. ",
		"This can put you at increased risk for infection, anemia and/or bleeding.</li>",
		"<li>Nausea and vomiting</li><li>Edema (swelling of the face, feet, hands)</li>",
		"<li>Muscle cramps and bone pain</li><li>Diarrhea</li>",
		"<li>Hemorrhage (see bleeding problems)</li>",
		"<li>Skin rash (see skin reactions)</li>",
		"<li>Fever</li></ul><br />",
		"<ul><span class=\"style2\">These side effects are less common side effects (occurring in about 10-29%) of patients receiving Gleevec:</span>",
		"<li>Headache</li>",
		"<li>Fatigue</li>",
		"<li>Joint pain</li>",
		"<li>Indigestion (see heartburn)</li>",
		"<li>Abdominal pain</li>",
		"<li>Cough</li>",
		"<li>Shortness of breath</li>",
		"<li>Poor appetite</li>",
		"<li>Constipation</li>",
		"<li>Night sweats (see skin reactions)</li>",
		"<li>Nose bleeds (see bleeding problems)</li>",
		"<li>Weakness</li>",
		"<li>Your fertility, meaning your ability to conceive or father a child, may be affected by Gleevec.",
		" Please discuss this issue with your health care provider.</li>",
		"</ul>A <em>rare, but potentially serious</em> side effect of Gleevec is liver toxicity. ",
		"There may be elevations in transaminase, bilirubin, and lactate dehydrogenase.<br /><br />",
		"Not all side effects are listed above. Some that are rare (occurring in less than 10% of patients) are not listed here. ",
		"However, you should always inform your health care provider if you experience any unusual symptoms.<br /><br />",
		"<span class=\"style2\">When to contact your doctor or health care provider:</span><br /><br />",
		"<ul><span class=\"style2\">Contact your health care provider immediately, day or night, if you should experience any of the<br />",
		"following symptoms:</span>",
		"<li>Fever of 100.5 F (38 C) or higher, chills (possible signs of infection)</li>",
		"<li>Shortness of breath, difficulty breathing</li>",
		"<li>Significant bleeding from nose, mouth, vagina, rectum that will does not stop within 15 minutes.</li>",
		"</ul><br />",
		"<ul><span class=\"style2\">The following symptoms require medical attention, but are not an emergency. ",
		"Contact your health care provider within 24 hours of noticing any of the following:</span>",
		"<li>Nausea (interferes with ability to eat and unrelieved with prescribed medication).</li>",
		"<li>Vomiting (vomiting more than 4-5 times in a 24 hour period).Diarrhea (4-6 episodes in a 24-hour period).</li>",
		"<li>Unusual bleeding or bruising</li><li>Black or tarry stools, or blood in your stools</li><li>Blood in the urine</li>",
		"<li>Extreme fatigue (unable to carry on self-care activities)</li>",
		"<li>Swelling, redness and/or pain in one leg or arm and not the other</li>",
		"<li>Yellowing of the skin or eyes</li>",
		"<li>Swelling of the feet or ankles. Sudden weight gain.</li>",
		"</ul>",
		"<em>Always inform your health care provider if you experience any unusual symptoms.</em><br /><br />",
		"<ul><span class=\"style2\">Precautions:</span>",
		"<li>Before starting Gleevec treatment, make sure you tell your doctor about any other medications you are taking ",
		"(including prescription, over-the-counter, vitamins, herbal remedies, etc.). ",
		"Do not take aspirin, products containing aspirin unless your doctor specifically permits this. ",
		"St. John\'s Wort may decrease the effectiveness of this medication.</li>",

		"<li>Discuss pain remedies with your doctor before taking. Acetominophen (Tylenol) may not be recommended.",
		" Be sure to discuss this with your doctor.</li><li>Do not receive any kind of immunization or vaccination without your doctor\'s approval while taking Gleevec.</li>",
		"<li>Inform your health care professional if you are pregnant or may be pregnant prior to starting this treatment. ",
		"Pregnancy category D (Gleevec may be hazardous to the fetus. Women who are pregnant or become pregnant must be advised of the potential hazard to the fetus).</li>",
		"<li>For both men and women: Do not conceive a child (get pregnant) while taking Gleevec. ",
		"Barrier methods of contraception, such as condoms, are recommended. ",
		"Discuss with your doctor when you may safely become pregnant or conceive a child after therapy.</li>",
		"<li>Do not breast feed while taking this medication.</li>",
		"</ul><br />",
		"<ul><span class=\"style2\">Self-care tips:</span>",
		"<li>Take this medication after a meal with a large glass of water to reduce upset stomach. ",
		"Take this medication at about the same time each day.</li>",
		"<li>If you miss a dose of this medication, do not take the missed dose at all and do not double the next one. ",
		"Instead, go back to your regular dosing schedule and check with your health care provider.</li>",
		"<li>You may be at risk of infection so try to avoid crowds or people with colds and those not feeling well, and report fever or any other signs of ",
		"infection immediately to your health care provider.</li>",
		"<li>Wash your hands often.</li>",
		"<li>Drink at least two to three quarts of fluid every 24 hours, unless you are instructed otherwise.</li>",
		"<li>Use an electric razor and a soft toothbrush to minimize bleeding.</li>",
		"<li>Avoid contact sports or activities that could cause injury.</li>",
		"<li>In general, drinking alcoholic beverages should be kept to a minimum or avoided completely. You should discuss this with your doctor.</li>",
		"<li>Get plenty of rest.</li>",
		"<li>Maintain good nutrition.</li>",
		"<li>If you experience symptoms or side effects, be sure to discuss them with your health care team. ",
		"They can prescribe medications and/or offer other suggestions that are effective in managing such problems.</li>",
		"</ul><br />",
		"<span class=\"style2\">Monitoring and testing:</span><br />",
		"You will be checked regularly by your health care professional while you are taking Gleevec, to monitor side effects and check your response to therapy. ",
		"Periodic blood work to monitor your complete blood count (CBC) as well as the function of other organs (such as your kidneys and liver) will also be ordered by your doctor.<br /><br />",
		"<span class=\"style2\">How Gleevec works:</span><br />",
		"Targeted therapy is the result of about 100 years of research dedicated to understanding the differences between cancer cells and normal cells. ",
		"To date, cancer treatment has focused primarily on killing rapidly dividing cells because one feature of cancer cells is that divide rapidly. ",
		"Unfortunately, some of our normal cells divide rapidly too, causing multiple side effects.<br /><br />",
		"Targeted therapy is about identifying other features of cancer cells. Scientists look for specific differences in the cancer cells and the normal cells. ",
		"This information is used to create a targeted therapy to attack the cancer cells without damaging the normal cells, thus leading to fewer side effects. ",
		"Each type of targeted therapy works a little bit differently but all interfere with the ability of the cancer cell to grow, divide, repair and/or communicate with other cells.<br /><br />",
		"There are different types of targeted therapies, defined in three broad categories. ",
		"Some targeted therapies focus on the internal components and function of the cancer cell. ",
		"The targeted therapies use small molecules that can get into the cell and disrupt the function of the cells, causing them to die. ",
		"There are several types of targeted therapy that focus on the inner parts of the cells. ",
		"Other targeted therapies target receptors that are on the outside of the cell. ",
		"Therapies that target receptors are also known as monoclonal antibodies. ",
		"Antiangiogenesis inhibitors target the blood vessels that supply oxygen to the cells, ultimately causing the cells to starve.<br /><br />",
		"Researchers agree that targeted therapies are not a replacement for traditional therapies. ",
		"They may best be used in combination with traditional therapies. ",
		"More research is needed to identify which cancers may be best treated with targeted therapies and to identify additional targets for more types of cancer.<br /><br />",
		"Imatinib mesylate belongs to the signal transduction inhibitor category of targeted therapies. It is particularly a protein-tyrosine kinase inhibitor.<br /><br />",
		"Note: We strongly encourage you to talk with your health care professional about your specific medical condition and treatments. ",
		"The information contained in this website is meant to be helpful and educational, but is not a substitute for medical advice.<br /><br />",
		"<p><br />Drug information Provided by:<br />",
		"Chemocare.com - a program of the Scott Hamilton CARES initiative<br />",
		"Copyright 2005 by The Cleveland Clinic Foundation. All Rights Reserved.<br />",
		"Content provided by Cleveland Clinic Cancer Center<br /></p>"

	],

	initComponent: function() {
		wccConsoleLog("Knowledge Base Tab View - Initialization");
		this.callParent(arguments);
	}
});
Ext.define('COMS.view.Common.Search4Template' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.Search4Template',

	layout : 'hbox', 
	items : [
		{ 
			xtype: 'textfield', 
			name : 'CancerTypeSearch', 
			margin: '5 0 0 0', 
			width: 500, 
			size : 50, 
			labelWidth: 150, 
			fieldLabel: 'Search', 
			labelAlign: 'right' 
		},

		{ 
			xtype : 'button', 
			text : 'Search', 
			margin: '5 0 0 3' 
		}
	]
});

Ext.define('COMS.view.Common.selCTOSTemplate' ,{
	extend: 'Ext.container.Container',
    alias : 'widget.selCTOSTemplate',
	name : 'sel CTOS Template',
	autoEl : { tag : 'section' },
	margin: '0',
	items : [
		{ xtype : 'Search4Template' },
		{	xtype: 'container',
			layout : 'hbox',
	        items : [
				{ xtype : 'selTemplateType' },
				{ 
					xtype : 'button', 
					title : 'ResetFilter',
					text : ' Show All Templates ', 
					margin: '5 0 0 5',
					hidden: true
				}
			]
		},
		{ xtype : 'selDiseaseAndStage' },
        {xtype : 'selTemplate', name:'AllTemplates'}
	]
});
Ext.define('COMS.view.Common.selTemplateType' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selTemplateType',
	name : 'Select Template Type',

        /*
         * KD - 5/9/12 - Pulling the Template Sources from the DB. The primary benefit is the 
         * backend query used to retrieve the Cancer types for the selecte Template Source. The 
         * join can be done on ID's rather than case statements.
         * 
         */
	store : 'TemplateSources',
/*	store : { 
		fields : ["id", "name"], 
		data : [ 
                        {id : 0, name : "--Select Source--"},
			{id : 1, name : "My Templates"}, 
			{id : 2, name : "Local Templates"}, 
			{id : 3, name : "National Templates"}
		]
	},*/
	//queryMode : "local",

        emptyText: "",
	width: 300,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template Source',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id',
	margin: '5 0 5 0',

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
    }
});

Ext.define('COMS.view.Common.selDiseaseAndStage' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.selDiseaseAndStage',
	name : 'sel Disease Type/Stage',

	autoEl : { tag : 'section' },
	layout : 'hbox',
	hidden : true,
	hideMode : 'offsets',
	items : [
		{ xtype : 'selDisease' },
		{ xtype : 'selDiseaseStage' }
	]
});
Ext.define('COMS.view.Common.selDisease' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDisease',
	name : 'Select Disease Control',

	store : 'DiseaseType',
        allowBlank: false,
	width: 500,
	size : 50,
        queryMode: 'local',
	labelWidth: 150,
	fieldLabel: 'Select a type of cancer <em>*</em>',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id'
        
});

Ext.define('COMS.view.Common.selDiseaseStage' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDiseaseStage',
	name : 'Select Disease Stage Control',

	store : 'DiseaseStage',
	displayField: 'name',
	valueField: 'id',
        queryMode: 'local',
	fieldLabel: 'Disease Stage',
	labelAlign: 'right',
	width: 190,
	size : 10,
	labelWidth: 90
});

Ext.define('COMS.view.Common.selTemplate' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selTemplate',
	name : 'Select Template',

	store : 'Templates',
        queryMode: 'local',
	width: 600,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template',
	labelAlign: 'right',
	displayField: 'description',
	valueField: 'id',
	hidden : true,
//        listeners: {
//                scope: this,
//                beforequery: function(qe){
//                    if(qe.combo.lastValue == ''){
//                        //delete qe.combo.lastQuery;
//                    }
//                }
//                
//        },

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
	}
});

Ext.define("COMS.view.Common.VitalSignsHistory" ,{
	extend : "Ext.container.Container",
    alias : "widget.VitalSignsHistory",
	name : "NursingDocs.VitalSignsHistory",
	autoScroll : true,

	tpl : new Ext.XTemplate(
		"<table border=\"1\" class=\"PatHistResults InformationTable\">",

			"<tr>",		// Pulse, BP, Respiration, 
				"<th rowspan=\"2\">Date</th>",
				"<th rowspan=\"2\">Temp</th>",
				"<th rowspan=\"2\">Pulse</th>",
				"<th rowspan=\"2\"><abbr title=\"Blood Pressure\">BP</abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Respiration in breaths per minute\">Resp</abbr></th>",
				"<th rowspan=\"2\">Pain</th>",
				"<th rowspan=\"2\"><abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub></abbr></th>",
				"<th rowspan=\"2\"><abbr title=\"Performance Status - Using the ECOG (Eastern Cooperative Oncology Group) Scale\">PS</abbr></th>",
				"<th rowspan=\"2\">Height<br />in Inches</th>",
				"<th rowspan=\"2\">Weight<br />in lbs.</th>",
				"<th colspan=\"4\"><abbr title=\"Body Surface Area\">BSA</abbr></th>",
			"</tr>",
			"<tr>",		// Pulse, BP, Respiration, 
				"<th ><abbr title=\"Body Surface Area Weight Formula\">Weight Form.</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Weight \">Weight</abbr> in KG</th>",
				"<th ><abbr title=\"Body Surface Area Formula\">Method</abbr></th>",
				"<th ><abbr title=\"Body Surface Area Formula\">BSA</abbr></th>",
			"</tr>",
			"<tpl for=\"Vitals\">",
				"<tr>",
					"<td>{DateTaken}</td>",
					"<td>{Temperature}</td>",
					"<td>{Pulse}</td>",
					"<td>{BP}</td>",
					"<td>{Respiration}</td>",
					"<td>{Pain}</td>",
					"<td>{SPO2}</td>",
					"<td><abbr title=\"{PS}\">{PSID}</abbr></td>",
					"<td>{Height}</td>",
					"<td>{Weight}</td>",
					"<td>{WeightFormula}</td>",
					"<td>{BSA_Weight}</td>",
					"<td>{BSA_Method}</td>",
					"<td>{[this.BSACalc(values, parent)]}</td>",
				"</tr>",
			"</tpl>",
		"</table>",

		{
					// XTemplate Configuration
				disableFormats: true,
				BSACalc: function (data, pData) {
					data.Amputations = pData.Amputations;
					var BSA = Ext.BSA_Calc(data);
					if ("" !== BSA && 0 !== BSA) {
						return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " + 
							"weight=\"" + data.Weight + "\" " + 
							"height=\"" + data.Height + "\" " + 
							"weightFormula=\"" + data.WeightFormula + "\" " + 
							"bsa_Weight=\"" + data.BSA_Weight + "\" " + 
							"bsa_Method=\"" + data.BSA_Method + "\" " + 
						">" + BSA + "</button> m<sup>2</sup>");
					}
					return ("");
				}
		}
	)
});
Ext.define('COMS.view.NewPlan.dspTemplateData' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.dspTemplateData',
	name : 'dsp Template Data',

	margin : '10',
	cls : 'CCOrderSheet',
	autoEl : { tag : 'section' },
	hidden : true,
	tpl : new Ext.XTemplate(
		"<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>",
		"<table>",
		"<tr>",
			"<td colspan=\"2\">",
				"<table><tr>",
					"<th>Max Number of Cycles:</th>",
					"<td>{CourseNumMax}</td>",
					"<th>Cycle Length:</th>",
					"<td>{CycleLength} <tpl for=\"CycleLengthUnit\">{name}</tpl></td>",
				"</tr></table>",
			"</td>",
		"</tr>",
		"<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>",
		"<tr><th>Emetogenic level:</th><tpl for=\"ELevel\"><td>{name}</td></tpl></tr>",
		"<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>",
		"<tr><th>Reference:</th><td>",

		"<table><tpl for=\"References\">",
			"<tr><td>{Reference}</td></tr>",
			"<tr><td>(<a href={ReferenceLink} title=\"Link to PMID\" target=\"_blank\">Link to PMID</a>)</td></tr>",
		"</tpl></table>",
		"</td></tr>",

		"</table>",


		"<table border=\"1\" class=\"InformationTable\">",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Pre Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PreMHInstructions}</th><tr>",

/**************** OLD
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
**************/

/*********** NEW **************/
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
/*********** END NEW **************/
		"</table>",









		"<table border=\"1\" class=\"InformationTable\" style=\"border: thick solid blue; margin-top: 1em; margin-bottom: 1em;\">",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {RegimenInstruction}</th><tr>",

			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",

			"<tpl for=\"Meds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt} {Units}</td>",
					"<td>{Route}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
			"</table>",













		"<table border=\"1\" class=\"InformationTable\">",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important;\"><h2 style=\"text-align: left;\">Post Therapy</h2></th><tr>",
			"<tr><th colspan=\"6\" style=\"text-align: left; border: none !important; font-weight: normal;\">Instructions: {PostMHInstructions}</th><tr>",

/**************** OLD
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"<tpl for=\"PostMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2, values.Units2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2, \"\")]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
*********************************************************/


/*********** NEW **************/
			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"<tpl for=\"PreMHMeds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt1} {Units1} {[this.optionalData(values.Amt2, values.Units2)]} </td>",
					"<td>{Infusion1}{[this.optionalData(values.Infusion2, \"\")]}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
				"<tpl if=\"''!== Instructions\">",
					"<tr><td colspan=\"5\">{Instructions}</td></tr>",
				"</tpl>",
			"</tpl>",
/*********** END NEW **************/

		"</table>",


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data, data2) {
					if ("" !== data) {
						return ("<br /><em>" + data + " " + data2 + "</em>");
					}
					return ("");
				}
		}
	),


























	tpl_Ver1 : new Ext.XTemplate(
		"<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>",
		"<table>",
		"<tr>",
			"<td colspan=\"2\">",
				"<table><tr><th>Max Number of Cycles:</th><td>{CourseNumMax}</td><th>Cycle Length:</th>",
					"<td>{CycleLength} <tpl for=\"CycleLengthUnit\">{name}</tpl></td>",
				"</tr></table>",
			"</td>",
		"</tr>",
		"<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>",
		"<tr><th>Emetogenic level:</th><tpl for=\"ELevel\"><td>{name}</td></tpl></tr>",
		"<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>",
		"<tr><th>Reference:</th><td>",

		"<table><tpl for=\"References\">",
			"<tr><td>{Reference}</td></tr>",
			"<tr><td>(<a href={ReferenceLink} title=\"Link to PMID\" target=\"_blank\">Link to PMID</a>)</td></tr>",
		"</tpl></table>",
		"</td></tr>",

		"</table>",

		"<section class=\"CourseMeds\">",
			"<h2>Pre Therapy</h2>",
			"<div>Instructions: {PreMHInstructions}</div>",
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",
			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"PreMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",





		"<section class=\"CourseMeds\">",
			"<h2>Therapy</h2>",
			"<div>Instructions: {RegimenInstruction}</div>",                        
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			"<tr class=\"TemplateHeader\">",
				"<th>Sequence #</th>",
				"<th>Drug</th>",
				"<th>Dose</th>",
				"<th>Route</th>",
				"<th>Administration Day</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"Meds\">",
				"<tr>",
					"<th rowspan=\"2\">{Sequence}</th>",
					"<td>{Drug}</td>",
					"<td>{Amt} {Units}</td>",
					"<td>{Route}</td>",
					"<td>{Day}</td>",
				"</tr>",
				"<tr>",
					"<th class=\"NoBorder\">Fluid/Volume: </th><td class=\"NoBorder\">{FluidVol}</td>",
					"<th class=\"NoBorder\">Infusion Time: </th><td class=\"NoBorder\" colspan=\"2\">{InfusionTime}</td>",
				"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",





		"<section class=\"CourseMeds\">",
			"<h2>Post Therapy</h2>",
			"<div>Instructions: {PostMHInstructions}</div>",
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			"<tr class=\"TemplateHeader\">",
				"<th>Drug</th>",
				"<th>Amount</th>",
				"<th>Unit</th>",
				"<th>Route</th>",
				"<th>Instructions</th>",
			"</tr>",
			"</thead><tbody>",
			"<tpl for=\"PostMHMeds\">",
			"<tr>",
				"<td>{Drug}</td>",
				"<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>",
				"<td>{Units1}{[this.optionalData(values.Units2)]}</td>",
				"<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>",
				"<td>{Instructions}</td>",
			"</tr>",
			"</tpl>",
			"</tbody></table>",
		"</section>",


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data) {
					if ("" !== data) {
						return ("<br /><em>" + data + "</em>");
					}
					return ("");
				}
		}
	),




	tpl_old : new Ext.XTemplate(
		'<h1>CANCER CHEMOTHERAPY IV ORDER SHEET</h1>',
		'<table>',
		'<tr>',
			'<td colspan="2">',
				'<table><tr><th>Max Number of Cycles:</th><td>{CourseNumMax}</td><th>Cycle Length:</th>',
					'<td>{CycleLength} <tpl for="CycleLengthUnit">{name}</tpl></td>',
				'</tr></table>',
			'</td>',
		'</tr>',
		'<tr><th>Chemotherapy Regimen Name:</th><td>{RegimenName}</td></tr>',
		'<tr><th>Emetogenic level:</th><tpl for="ELevel"><td>{name}</td></tpl></tr>',
		'<tr><th>Febrile Neutropenia risk:</th><td>{FNRisk} %</td></tr>',
		'<tr><th>Reference:</th><td>',
		'<table><tpl for="References">',
			'<tr><td>{Reference}</td></tr>',
			'<tr><td>(<a href={ReferenceLink} title=\'Link to PMID\' target=\'_blank\'>Link to PMID</a>)</td></tr>',
		'</tpl></table></td></tr>',
		'</table>',

		'<section class="CourseMeds">',
			'<h2>Pre Therapy</h2>',
			'<div>Instructions: {PreMHInstructions}</div>',
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",
			'<tr class="TemplateHeader">',
				'<th>Drug</th>',
				'<th>Amount</th>',
				'<th>Unit</th>',
				'<th>Route</th>',
//				'<th>OR</th>',
//				'<th>Amount</th>',
//				'<th>Unit</th>',
//				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PreMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
//				'<td></td>',
//				'<td>&nbsp;{Amt2}&nbsp;</td>',
//				'<td>&nbsp;{Units2}&nbsp;</td>',
//				'<td>&nbsp;{Infusion2}&nbsp;</td>',
				'<td>{Instructions}</td>',
			'</tr>',
			'</tpl>',
			'</tbody></table>',
		'</section>',





		'<section class="CourseMeds">',
			'<h2>Therapy</h2>',
			'<div>Instructions: {RegimenInstruction}</div>',                        
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			'<tr class="TemplateHeader">',
				'<th>&nbsp;</th>',
				'<th>&nbsp;</th>',
				'<th>Drug</th>',
//				'<th>Regimen<br>Dose</th>',
				'<th>Dose</th>',
//				'<th>% of Regimen Dose<hr>Reason</th>',
//				'<th>Patient Dose</th>',
				'<th>Route</th>',
				'<th>Administration Day</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="Meds">',
			'<tr><th rowspan="2">Date/Time</th><th rowspan="2">{#}</th>',
				'<td>{Drug}</td>',
				'<td>{Amt}{Units}</td>',
//				'<td><hr>{reason}&nbsp;</td>',
//				'<td>{PatDose}&nbsp;</td>',
				'<td>{Route}</td>',
				'<td>{Day}</td>',
			'</tr>',
			'<tr>',
				'<th class="NoBorder">Fluid/Volume: </th><td class="NoBorder">{FluidVol}</td>',
				'<th class="NoBorder">Administration Time: </th><td class="NoBorder" colspan="2">{InfusionTime}</td>',
			'</tpl>',
			'</tbody></table>',
		'</section>',





		'<section class="CourseMeds">',
			'<h2>Post Therapy</h2>',
			'<div>Instructions: {PostMHInstructions}</div>',
			"<table border=\"1\" width=\"100%\" class=\"InformationTable\"><thead>",

			'<tr class="TemplateHeader">',
				'<th>Drug</th>',
				'<th>Amount</th>',
				'<th>Unit</th>',
				'<th>Route</th>',
//				'<th>OR</th>',
//				'<th>Amount</th>',
//				'<th>Unit</th>',
//				'<th>Route</th>',
				'<th>Instructions</th>',
			'</tr>',
			'</thead><tbody>',
			'<tpl for="PostMHMeds">',
			'<tr>',
				'<td>{Drug}</td>',
				'<td>{Amt1}{[this.optionalData(values.Amt2)]}</td>',
				'<td>{Units1}{[this.optionalData(values.Units2)]}</td>',
				'<td>{Infusion1}{[this.optionalData(values.Infusion2)]}</td>',
//				'<td></td>',
//				'<td>{Amt2}</td>',
//				'<td>{Units2}</td>',
//				'<td>{Infusion2}</td>',
				'<td>{Instructions}</td>',
			'</tr>',
			'</tpl>',
			'</tbody></table>',
		'</section>',


		{
					// XTemplate Configuration
				disableFormats: true,
				optionalData: function (data) {
					if ("" !== data) {
						return ("<br /><em>" + data + "</em>");
					}
					return ("");
				}
		}
	)
                

});
Ext.define('COMS.view.NewPlan.AddDate', {
	extend: 'Ext.window.Window',
	alias : 'widget.AddDate',
        buttonAlign: 'center',
	title : 'Apply Template',
	layout: 'fit',
	autoShow: true,
	width: 400,

//        constructor: function(myStore){
//            this.initComponent(myStore.myStore);
//            this.show();
//        },

	initComponent: function() {
            

            this.items = [ {
                    xtype: 'form',
                    cls: 'custom-form',
                    defaults : { labelAlign: 'top', margin: '5'},
                    items: [
							{ xtype : "RequiredFieldLabel" },
                            {
                                xtype: 'datefield', labelAlign: 'top', name : 'startdate', labelWidth: 100, width: 178, fieldLabel: 'Enter a Start Date <em>*</em>' 
                            },
                            {
                                xtype : "container",
                                layout : "hbox",
                                defaults : { margin : "5 10 5 0"},                                    
                                items : [
                                    {
                                        xtype: "combo",
                                        name: "BSA_FormulaWeight",
                                        fieldLabel: "Weight to use <em>*</em>",
                                        labelAlign: "top",
                                        width: 178,
                                        labelStyle: "font-weight: bold",
                                        store: {
                                                fields: ["weightType"],
                                                data: [ 
                                                        { weightType: "Actual Weight" },
                                                        { weightType: "Ideal Weight" },
                                                        { weightType: "Adjusted Weight" },
                                                        { weightType: "Lean Weight" },
                                                        { weightType: "Other" }
                                                ]
                                        },
                                        queryMode: "local",
                                        displayField: "weightType"
                                    },
                                    {
                                        xtype: "combo",
                                        name: "BSA_Formula",
                                        fieldLabel: "BSA Formula <em>*</em>",
                                        labelAlign: "top",
                                        width: 178,
                                        labelStyle: "font-weight: bold",
                                        store: {
                                                fields: ["formula"],
                                                data: [ 
                                                        { formula: "DuBois" },
                                                        { formula: "Mosteller" },
                                                        { formula: "Haycock" },
                                                        { formula: "Gehan and George" },
                                                        { formula: "Boyd" },
                                                        { formula: "Capped" }
                                                ]
                                        },
                                        queryMode: "local",
                                        displayField: "formula"
                                    }
                                ]
                            },                            
                            {
                                xtype: 'radiogroup',
                                labelAlign: 'top',
                                name: 'goalRadio',
                                layout: 'hbox',
                                fieldLabel: 'Select the goal for this Regimen <em>*</em>',
                                itemId: 'goalRadios',
                                columns: 1,
                                items: [
                                            { boxLabel  : 'Curative', name : 'Goal', inputValue: 'Curative', width: 100  }, 
                                            { boxLabel  : 'Palliative', name  : 'Goal', inputValue: 'Palliative', width: 125  }
                                    ]
                            },
                            {
                                xtype: 'radiogroup',
                                name: 'clinicalTrialRadio',
                                labelAlign: 'top',
                                layout: 'hbox',
                                fieldLabel: 'Specify the type of clinical trial <em>*</em>',
                                itemId: 'clinicalRadios',
                                columns: 1,
                                items: [
                                            { boxLabel  : 'Yes', name : 'ClinicalTrial', inputValue: true, width: 100  }, 
                                            { boxLabel  : 'No', name  : 'ClinicalTrial', inputValue: false, width: 125, checked: true  }
                                    ]
                            },
                            { 
                                xtype : "textfield", fieldLabel : "Type of Trial", width: 178, name: 'TypeOfTrial', hidden: true                                 
                            },
                            {
                                xtype: 'radiogroup',
                                name: 'amputeeRadio',
                                labelAlign: 'top',
                                layout: 'hbox',
                                fieldLabel: 'Is the Patient an Amputee? <em>*</em>',
                                itemId: 'amputeeRadios',
                                columns: 1,
                                items: [
                                            { boxLabel  : 'Yes', name : 'Amputee', inputValue: true, width: 100  }, 
                                            { boxLabel  : 'No', name  : 'Amputee', inputValue: false, width: 125, checked: true  }
                                    ]
                            },
                            {
                                xtype : "panel",
                                title : "Amputation Location <em>*</em>",
                                name : "amputationLocation",
                                hidden: true,
                                layout : "hbox",
                                defaults : { margin : "5 10 5 5", labelAlign : "top", labelWidth: 60},//, labelClsExtra : "NursingDocs-label" },
                                items : [
                                    { xtype: "checkboxgroup",
                                        //fieldLabel: "Left Side",
                                        vertical: true,
                                        width: 300,
                                        height: 150,
                                        columns: 2,
                                        shadow: true,
                                        name: "amputations",
                                        //border: '1',
                                        //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
                                        items: [
                                        { boxLabel : "Upper Left Arm", name : "bodyPart1" },
                                        { boxLabel : "Lower Left Arm", name : "bodyPart2" },
                                        { boxLabel : "Left Hand and Fingers", name : "bodyPart3" },

                                        { boxLabel : "Left Thigh", name : "bodyPart4" },
                                        { boxLabel : "Lower Left Leg", name : "bodyPart5" },
                                        { boxLabel : "Left Foot", name : "bodyPart6" },

                                        { boxLabel : "Upper Right Arm", name : "bodyPart7" },
                                        { boxLabel : "Lower Right Arm", name : "bodyPart8" },
                                        { boxLabel : "Right Hand and Fingers", name : "bodyPart9" },

                                        { boxLabel : "Right Thigh", name : "bodyPart10" },
                                        { boxLabel : "Lower Right Leg", name : "bodyPart11" },
                                        { boxLabel : "Right Foot", name : "bodyPart12" }
                                        
                                        ]
                                    }/*,
                                    { xtype: "checkboxgroup",
                                        fieldLabel: "Right Side",
                                        vertical: true,
                                        columns: 1,
                                        width: 160,
                                        height: 150,
                                        shadow: true,
                                        //border: '1',
                                        //style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
                                        items: [
                                        { boxLabel : "Upper Right Arm", name : "ND_PT_SA_Swelling" },
                                        { boxLabel : "Lower Right Arm", name : "ND_PT_SA_Pain" },
                                        { boxLabel : "Right Hand and Fingers", name : "ND_PT_SA_Absence" },
                                        { boxLabel : "Right Thigh", name : "ND_PT_SA_Removed" },
                                        { boxLabel : "Lower Right Leg", name : "ND_PT_SA_Removed" },
                                        { boxLabel : "Right Foot", name : "ND_PT_SA_Redness" }
                                        ]
                                    }*/
                                ]
                            },                            
                            {
                                xtype: "panel",
                                title : "Performance Status <em>*</em>",
                                name : "perfStatus",
                                defaults : { labelAlign : "right", labelWidth: 60},
                                items : [                                 
                                    {
                                        xtype: 'radiogroup',
                                        name: 'perfStatusRadio',
                                        labelAlign: 'top',
                                        //fieldLabel: 'Select the Performance Status',
                                        id: 'performanceRadios',
                                        margin: '5 5 25 5',
                                        columns: 1,
                                        items: this.itemsInGroup
                                    }
                                ]
                            }

                    ]
            } ];
            
            this.buttons = [
                    { text: 'Save', action: 'save' },
                    { text: 'Cancel', scope: this, handler: this.close }
            ];

            this.callParent(arguments);
	}
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define('COMS.view.NewPlan.EndTreatmentSummary', {
	extend: 'Ext.window.Window',
	alias : 'widget.EndTreatmentSummary',
	buttonAlign: 'center',
	name : "End of Treatment Summary",
	title : "End of Treatment Summary",

	autoEl : { tag : "section" },
	autoShow: true,
	width: 950,
	height: 800,
	cls : "Report",
	// defaults : { layout : "fit", autoScroll : true  },
	items : [
		{ xtype : "container", html : "<h1>End of Treatment Summary</h1>" },


		{ xtype : "container", margin: "0 26 10 10", // Margin is "weird" because the scroll bar in the following container shows up and 26px is the width of the scroll bar.
			items : [
			{ xtype : "container", name : "Reason4EOTSHead", html : "<h2>Reason for generating End of Treatment Summary</h2>" },

			{ xtype : "radiogroup", name : "Reason4EOTSAnswer", width: 200, hideLabel : true, columns : 1, vertical : true,
				items : [
					{ boxLabel : "Completed Prescribed Course", name : "EOTS_Reason", inputValue : "Completed Prescribed Course"},
					{ boxLabel : "Treatment Change", name : "EOTS_Reason", inputValue : "Treatment Change"},

					// { xtype : "container", name : "Reason4EOTS_Change", hidden : true, items : [
						{ xtype : "radiogroup", name : "Reason4EOTS_TCReason", width: 200, hidden : true, hideLabel : true, margin: "0 10 0 20", columns : 1, vertical : true, items : [
							{ boxLabel : "Toxicity", name : "EOTS_TChange", inputValue : "Toxicity"},
							{ boxLabel : "Progression of the Disease", name : "EOTS_TChange", inputValue : "Progression of the Disease"},
							{ boxLabel : "Patient Refusal", name : "EOTS_TChange", inputValue : "Patient Refusal"},
							{ boxLabel : "Other", name : "EOTS_TChange", inputValue : "Other"},
							{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_TChangeOther", hideLabel : true }
						]},
					// ]},// 
					{ boxLabel : "Patient Discontinuation", name : "EOTS_Reason", inputValue : "Patient Discontinuation"},

					// { xtype : "container", name : "Reason4EOTS_PD", hidden : true, items : [
						{ xtype : "radiogroup", name : "Reason4EOTS_PDReason", width: 200, hideLabel : true, hidden : true, margin: "0 10 0 20", columns : 1, vertical : true, items : [
							{ boxLabel : "Patient Terminated Regimen", name : "EOTS_PDChange", inputValue : "Patient Terminated Regimen"},
							{ boxLabel : "Patient Left VA System", name : "EOTS_PDChange", inputValue : "Patient Left VA System"},
							// { boxLabel : "Patient Refusal", name : "EOTS_PDChange", inputValue : "Patient Refusal"},
							{ boxLabel : "Other", name : "EOTS_PDChange", inputValue : "Other"},
							{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_PDChangeOther", hideLabel : true }
						]},
					// ]},

					{ boxLabel : "Other ", name : "EOTS_Reason", inputValue : "Other"},
					{ xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_ReasonOther", hideLabel : true }
				]
			}
		]},


		{ xtype: "container", name: "PatientInfoTableHeader", hidden : true, margin: "0 10 10 10", tpl: 
			new Ext.XTemplate(
				"<h2>Patient Information for - {Name}</h2>",
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values.Amputations)]}</td>",
					"</tr>",

					"<tr>",

						"<th>Template:</th><td colspan=\"5\">{TemplateName} - {TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{TreatmentEnd}",
							"<tpl if=\"''!== TreatmentOriginalEnd\">",
								"&nbsp;<em>(Original Scheduled End Date - {TreatmentOriginalEnd})</em>",
							"</tpl>",
						"</td>",
					"</tr>",
				"</table>",
				{
					// XTemplate Configuration
					disableFormats: true,
					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						var i, len = a.length, buf = "";
						if (0 === len) {
							return ("None");
						}

						for (i =0; i < len; i++) {
							buf += a[i].description + "<br>";
						}
						return (buf);					
					}
				}
			)
		},


		{ xtype : "container", name: "PatientInfoTableBody", hidden : true,
			autoScroll : true, 
			height : 590, 
			// layout : "fit",
			// defaults : { layout : "fit" },
			margin: "0 10 10 10", 
			items : [
				{ xtype: "container", name: "PatientInfoTable", hidden : true, tpl: 
					new Ext.XTemplate(
						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><th>Type(s) of Cancer: </th><td colspan=3>",
								"<tpl for=\"Disease\">",
									"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
								"</tpl>",
							"</td></tr>",
							"<tr><th>Allergies: </th><td colspan=3>",
								"<table width=\"100%\" class=\"centerHead\"><tr><th>Name</th><th>Type</th><th>Comment</th></tr>",
								"<tpl for=\"Allergies\">",
									"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
								"</tpl>",
								"</table>",
							"</td></tr>",
							"<tr><th>Clinical Trial: </th><td colspan=3>{Trial}</td></tr>",
							"<tr><th colspan=\"4\" style=\"text-align: center\">Initial Vital Signs</th></tr>",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{FirstVitals.DateTaken}</td>",
										"<td>{FirstVitals.Height}</td>",
										"<td>{FirstVitals.Weight}</td>",
										"<td>{FirstVitals.BP}</td>",
										"<td>{FirstVitals.Temperature}</td>",
										"<td>{FirstVitals.Pain}</td>",
										"<td>{FirstVitals.Pulse}</td>",
										"<td>{FirstVitals.Respiration}</td>",
										"<td>{FirstVitals.SPO2}</td>",
										"<td>{FirstVitals.WeightFormula}</td>",
										"<td>{FirstVitals.BSA_Weight}</td>",
										"<td>{FirstVitals.BSA_Method}</td>",
										"<td>{FirstVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{FirstVitals.PSID} - {FirstVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
							"<tr><th colspan=\"4\" style=\"text-align: center\">Final Vital Signs</th></tr>",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{LastVitals.DateTaken}</td>",
										"<td>{LastVitals.Height}</td>",
										"<td>{LastVitals.Weight}</td>",
										"<td>{LastVitals.BP}</td>",
										"<td>{LastVitals.Temperature}</td>",
										"<td>{LastVitals.Pain}</td>",
										"<td>{LastVitals.Pulse}</td>",
										"<td>{LastVitals.Respiration}</td>",
										"<td>{LastVitals.SPO2}</td>",
										"<td>{LastVitals.WeightFormula}</td>",
										"<td>{LastVitals.BSA_Weight}</td>",
										"<td>{LastVitals.BSA_Method}</td>",
										"<td>{LastVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{LastVitals.PSID} - {LastVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>"
					)
				},

//				{ xtype : "container", html : "<h2>Treatment Report</h2><div style=\"margin-left: 2em;\">To be obtained from...</div>" },

					// These grids are built on the fly in the app\controller\NewPlan\EndTreatmentSummary.js createFlowsheet() 
					// (Search for: theGrid = Ext.create)
//				{ xtype : "container", name : "AdministeredMedsGrid", html : "<h2>Medication Administered</h2>" },
//				{ xtype : "container", name : "DiseaseResponseGrid", html : "<h2>Patient Disease Response</h2>" },
//				{ xtype : "container", name : "ToxicityGrid", html : "<h2>Toxicity Side Effects</h2>" },
//				{ xtype : "container", name : "OtherGrid", html : "<h2>Other Comments</h2>" },


				{ xtype : "container", name : "AdministeredMedsGrid" },
				{ xtype : "container", name : "DiseaseResponseGrid" },
				{ xtype : "container", name : "ToxicityGrid" },
				{ xtype : "container", name : "OtherGrid" },


				{ xtype : "container", html : "<h2 style=\"margin-top: 2em;\">Provider Report</h2>" },
				{ xtype : "htmleditor", name : "ProviderReport", width: 880, height: 200, autoScroll : true, margin : "0 30 0 0" },

				{ xtype : "container", html : "<h2 style=\"margin-top: 2em;\">Follow-Up Appointments</h2>" },
				{ xtype : "htmleditor", name : "FollowUpAppointments", width: 890, height: 200, autoScroll : true, margin : "0 30 0 0" }
			]
		}
	],
	buttons : [
		{ text: "Save", hidden : true, action: "save" },
		{ text: "Cancel", hidden : true, action: "cancel" }
	],
	initComponent: function() {
		wccConsoleLog("End of Treatment Summary View - Initialization");
		this.callParent(arguments);
	}
});

Ext.define('COMS.store.Patients', {
	extend : 'Ext.data.Store',
	model : 'COMS.model.PatientInfo'
});
Ext.define('COMS.store.PatientHistory', {
	extend : 'Ext.data.Store',
	model : 'COMS.model.PatientHistory'
});
Ext.define("COMS.store.LabInfo", {
	extend : "Ext.data.Store",
	model : "COMS.model.LabInfo",
	groupField : "specimen"
});
Ext.define('COMS.store.TemplateSources', {
	extend : 'Ext.data.Store',
        autoLoad: true,
	model : Ext.COMSModels['TemplateSources']
});

Ext.define('COMS.store.DiseaseType', {
    extend : 'Ext.data.Store',
    /*
     * KD - 5/9/12 - This listener was added because there are several ways the DiseaseType store can be accessed
     * 1) Retrieve Cancer Types based on the Template Source selected
     * 2) Retrieve a specific Cancer type based on id
     * 3) Retrieve ALL Cancer Types
     * 
     * If no options are provided the default is to retrieve all Cancer types.
     */
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
              if(options.params.ID!=null){
                  store.proxy.url = options.params.URL + options.params.ID;
              }
            }
        }
        
    },

    model : Ext.COMSModels['DiseaseType']
});

Ext.define('COMS.store.DiseaseStage', {
	extend : 'Ext.data.Store',
        autoDestroy: true,
        autoLoad: false,
        listeners: {
            'beforeload' : function(store, options){

                if(options.params.ID!=null){
                    store.proxy.url = options.params.URL + options.params.ID;
                }else{
                    store.proxy.url = options.params.URL;
                }

            }

        },
        
	model : Ext.COMSModels['DiseaseStage']
});
Ext.define('COMS.store.Templates', {
    extend : 'Ext.data.Store',
    autoDestroy: true,
    autoLoad: false,
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
              if(options.params.ID!=null){
                  store.proxy.api.read = options.params.URL + options.params.ID;
              }else{
                  store.proxy.api.read = options.params.URL;
              }
            }
            
        }
        
    },
    model : Ext.COMSModels['Templates']

        
});
Ext.define('COMS.store.CTOS', {
	extend : 'Ext.data.Store',
        autoDestroy: true,
        autoLoad: false,
        listeners: {
            'beforeload' : function(store, options){

                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }else{
                        store.proxy.api.create = Ext.URLs.AddCTOS;
                    }
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.CTOS;
                }
            }
            

        },

        model : Ext.COMSModels.CTOS
});
Ext.define('COMS.store.PerfStatStore', {
    extend : 'Ext.data.Store',
//    autoLoad: true,
      autoLoad: true,          // KD 03/27/12 - When autoload is commented out then none of the Performance Status are available when Applying Template
    model : Ext.COMSModels.LookupTable,
    proxy: {
        type: 'ajax',
        url: Ext.URLs.Lookups + '/PerformanceStatus',
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
Ext.define('COMS.store.OrdersStore', {
	extend : 'Ext.data.Store',
	autoLoad: true,
	model : Ext.COMSModels.OrdersTable,
	groupField: 'adminDate'
});

Ext.define('COMS.view.Authoring.References' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.TemplateReferences',
	margin: '0 20 20 20',
	title : 'References',
	store: 'ReferencesStore',
	viewConfig: { stripeRows: true },

	columns : [
			{header: 'Reference',  dataIndex: 'Reference',  flex: 1},
			{header: 'Reference Link', dataIndex: 'ReferenceLink', flex: 1, renderer : renderURI}
	],
	buttons: [
		{ text: 'Add Reference', title: 'AddReference' }, 
		{ text: 'Remove Reference', title: 'RemoveReference', disabled: true },
                { text: 'Edit Reference', title: 'EditReference', disabled: true}
	],
	buttonAlign: 'left',
	initComponent: function() {
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
		this.plugins = [cellEditing];
		this.callParent(arguments);
	}
});


function renderURI(value, p, record) {
    
    var description = record.data.ReferenceLink;
    
    if(value!=null && description !=null){
        return Ext.String.format(
                '<b><a href="{0}">{0}</a></b>',
                value,
                record.data.ReferenceLink
        );
        
    }
}

Ext.define('COMS.view.Authoring.Hydration', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TemplateHydration',
	margin: '0 20 20 20',
	items: [
		{
			xtype: 'textfield',
			name: "HydrationInstructions",
			fieldLabel: 'Instructions',
			labelAlign: 'right',
			margin: '10 10 0 10',
			width: 840,
			labelWidth: 100
		},
		{
			xtype: 'grid',
			autoScroll: 'y',
			cls: 'custom-grid',
			columnLines: true,
			width: 925,
			viewConfig: {
				stripeRows: true,
				height: 125,
				forceFit: true
			},
			title: 'Drug Regimen',
			margin: '10 10 10 10',
			store: {
				model: Ext.COMSModels.Hydration
			},
			// create here since each instance of the Hydration panel needs it's own store
			columns: [
				{
					header: 'Sequence',
					dataIndex: 'Sequence',
					width: 60,
					sortable: true,
					align: 'center',
					renderer: function (value, p, record) {
						return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
					}
				},
				{
					header: 'Admin<br/>Day(s)',
					dataIndex: 'Day',
					width: 80,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
					}
				},
				{
					header: 'Admin<br/>Time',
					dataIndex: 'AdminTime',
					width: 60,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
					}
				},
				{
					header: 'Drug',
					dataIndex: 'Drug',
					width: 100,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						return Ext.String.format('{0}<br/><div class="OptionalDosing">-- <b>OR</b> --</div>', value, value);
					}
				},
				{
					header: 'Dosage<br/>Amount',
					dataIndex: 'Amt1',
					width: 50,
					sortable: false,
					align: 'center',
					renderer: renderAmt
				},
				{
					header: 'Units',
					dataIndex: 'Units1',
					width: 50,
					sortable: false,
					renderer: renderUnit,
					align: 'center'
				},
				{
					header: 'Route',
					dataIndex: 'Infusion1',
					width: 50,
					sortable: false,
					renderer: renderRoute,
					align: 'center'
				},
				{
					header: 'Dosage<br/>Amount',
					dataIndex: 'Amt2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Units',
					dataIndex: 'Units2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Route',
					dataIndex: 'Infusion2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Fluid/<br/>Volume',
					dataIndex: 'FluidVol1',
					width: 50,
					sortable: false,
					renderer: renderFluidVol,
					align: 'center'
				},
				{
					header: 'Flow<br/>Rate',
					dataIndex: 'FlowRate1',
					width: 40,
					sortable: false,
					renderer: renderFlowRate,
					align: 'center'
				},
				{
					header: 'Infusion<br/>Time',
					dataIndex: 'InfusionTime1',
					width: 100,
					sortable: false,
					renderer: renderInfusionTime,
					align: 'center'
				},
				{
					header: 'Fluid/<br/>Type',
					dataIndex: 'FluidType1',
					width: 50,
					sortable: false,
					renderer: renderFluidType,
					align: 'center'
				},
				{
					header: 'Flow<br/>Rate',
					dataIndex: 'FlowRate2',
					width: 40,
					sortable: false,
					hidden: true
				},
				{
					header: 'Fluid/<br/>Volume',
					dataIndex: 'FluidVol2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Infusion<br/>Time',
					dataIndex: 'InfusionTime2',
					width: 60,
					sortable: false,
					hidden: true
				},
				{
					header: 'Fluid/<br/>Type',
					dataIndex: 'FluidType2',
					width: 50,
					sortable: false,
					hidden: true
				},
				{
					header: 'Instructions',
					dataIndex: 'Instructions',
					width: 217,
					sortable: false,
					align: 'center',
					renderer: function (value, p, record) {
						return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
					}
				}
			],
			buttons: [
				{
					text: 'Add Drug'
				},
				{
					text: 'Remove Drug',
					disabled: true
				},
				{
					text: 'Edit Drug',
					disabled: true
				}
			],
			buttonAlign: 'left'
		}		// END of Grid definition
	]
});

function renderAmt(value, p, record) {

	var amt2 = record.data.Amt2;

	if (null != value && null != amt2 && '' != amt2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, amt2);
	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderUnit(value, p, record) {

	var unit2 = record.data.Units2;

	if (null != value && null != unit2 && '' != unit2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, unit2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderRoute(value, p, record) {

	var route2 = record.data.Infusion2;

	if (null != value && null != route2 && '' != route2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, route2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderFluidVol(value, p, record) {

	var val2 = record.data.FluidVol2;

	if (null != value && null != val2 && '' != val2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderFlowRate(value, p, record) {

	var val2 = record.data.FlowRate2;

	if (null != value && null != val2 && '' != val2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderInfusionTime(value, p, record) {

	var val2 = record.data.InfusionTime2;

	if (null != value && null != val2 && '' != val2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}

function renderFluidType(value, p, record) {

	var val2 = record.data.FluidType2;

	if (null != value && null != val2 && '' != val2) {
		return Ext.String.format('{0}<br/><div class="OptionalDosing">{1}</div>', value, val2);

	}
	return Ext.String.format('{0}<br/><div class="OptionalDosing">&nbsp;</div>', value, value);
}
Ext.define('COMS.view.Authoring.DrugRegimen' ,{
	extend: 'Ext.panel.Panel',
	alias : 'widget.TemplateDrugRegimen',
        border : 3,
	margin: '0 20 20 20',
        
        items:[
		{ xtype : 'textfield', name : "RegimenInstructions", fieldLabel: 'Instructions', labelAlign: 'right', margin : '10 10 0 10', width : 840, labelWidth: 100 },
                { xtype: 'grid',
                    autoScroll: 'y',
                    columnLines: true,
                    width: 925,
                    title : 'Drug Regimen',
                    viewConfig: {stripeRows: true, height: 125, forceFit: true},
                    margin: '10 10 10 10',
                    // store : { fields: ['Day', 'Drug', 'Dosage', 'Unit', 'PctDose', 'Reason', 'PDose', 'Route', 'AdminDay'] },
                    store : { model : Ext.COMSModels.DrugRegimen },	// create here since each instance of the Hydration panel needs it's own store
                    columns : [
                                {header : 'Sequence', dataIndex : 'Sequence', width: 60, sortable : true, align: 'center' },                        
                                {header : 'Admin<br/>Day(s)', dataIndex : 'Day', width: 80, align: 'center' },
                                {header : 'Admin<br/>Time', dataIndex : 'AdminTime', width: 60, align: 'center' },
                                {header : 'Drug', dataIndex : 'Drug', width: 100, align: 'center' },                                
                                {header : 'Dosage<br/>Amount', dataIndex : 'Amt', width: 50, align: 'center' },
                                {header : 'Units', dataIndex : 'Units', width: 50, align: 'center' },
                                {header : 'Route', dataIndex : 'Route', width: 50, align: 'center' },
                                // These are only needed during the administration
                                // {header : '% of Regimen Dose', dataIndex : 'PctDose', width: 110 },
                                // {header : 'Reason', dataIndex : 'Reason', flex : 1 },
                                // {header : 'Patient Dose', dataIndex : 'PDose', width: 90 },
                                {header : 'Fluid/<br/>Volume', dataIndex : 'FluidVol', width: 50, align: 'center' },
                                {header : 'Flow<br/>Rate', dataIndex : 'FlowRate', width: 40, align: 'center'},
                                {header : 'Infusion<br/>Time', dataIndex : 'InfusionTime', width: 100, align: 'center' },
                                {header : 'Fluid/<br/>Type', dataIndex : 'FluidType', width: 50, align: 'center'},
                                {header : 'Instructions', dataIndex: 'Instructions', flex: 1, align: 'center'}
                             ],
                            buttons: [
                                    { text: 'Add Drug' }, 
                                    { text: 'Add Non-Formulary Drug', title: 'AddNonForma' },
                                    { text: 'Remove Drug', disabled: true },
                                    { text: 'Edit Drug', disabled: true }
                            ],
                            buttonAlign: 'left'
                }
        ]
 
});

/*
 *	Since this widget is a window, it's not a sub object to any other class when attempting to get a handle to it.
 *	Hence it's reference is : Ext.ComponentQuery.query('AddReference')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddReference button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddReference button[action="save"]')[0].el.dom
 */	
Ext.define('COMS.view.Authoring.AddReference', {
	extend: 'Ext.window.Window',
	alias : 'widget.AddReference',

	title : 'Add New Reference',
	layout: 'fit',
	autoShow: true,
	width: 600,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
			defaults : { labelAlign: 'right', width: 580, margin: '5 0 5 0'	},
			items: [
				{	xtype : 'combo',
					fieldLabel : 'Select Reference', 
					name : 'SelReference', 
					store : 'LUReferences', 
					displayField: 'name',
					valueField: 'description'
				},
				{ xtype : 'container', html : '<div style="text-align:center;">OR Enter a new reference below</div>' },
				{ xtype: 'textfield', name : 'Reference', fieldLabel: 'Reference' },
				{ xtype: 'textfield', name : 'ReferenceLink', fieldLabel: 'URL' }
			]
		} ];

		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', action: 'cancel' }
		];

		this.callParent(arguments);
	}
});
/*
 *	MWB - 2/3/2012
 *	Create New Template View
 *	This view is managed by the 'TemplateAuthoring' Control
 */
Ext.define('COMS.view.Authoring.CreateNewTemplate' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.CreateNewTemplate',
	name : 'Create New Template',
	defaults : {xtype : 'container', labelAlign: 'right', padding : '5 0 0 0' },
	items : [
		{ xtype : 'CycleLength' },
		{
			layout: 'hbox', 
			defaults : {displayField: 'value', valueField: 'id' },
			items: [
				{ xtype: 'combo', name: 'EmotegenicLevel', fieldLabel: 'Emotegenic Level <em>*</em>', labelAlign: 'right', 
					width: 300, labelWidth: 120, allowBlank: false,
					store: 'EmotegenicLevel', displayField : 'name', valueField : 'id'
				},
				{ xtype : 'textfield', maskRe: /[0-9\.]/, maxValue: 100, minValue: 0, name: 'FebrileNeutropeniaRisk', fieldLabel: 'Febrile Neutropenia Risk', labelAlign: 'right', width : 210, labelWidth: 150 },
				{ xtype : 'container', html : "%", margin: '1 0 0 3' }
			]
		},

		{ xtype : 'TemplateHydration', title : 'Pre Therapy', type : 'Pre' },
		{ xtype : 'TemplateDrugRegimen', title : 'Therapy' },
		{ xtype : 'TemplateHydration', title : 'Post Therapy', type : 'Post' },
		{ xtype : 'TemplateReferences',height : 130 },


                { xtype : "container", layout : "hbox", margin : "5 5 0 0", items : [ 
                        { xtype : 'textfield', name : "RegimenName", fieldLabel: 'Chemotherapy Regimen Name', labelAlign : "right", width : 700, labelWidth: 200, readOnly: true, disabled: true },
                        { xtype : "container", margin: "2 0 0 5", html : "<span style=\"color: blue;\">Generated</span>" }
                ]},
            
                { xtype : "container", layout : "hbox", margin : "5 5 0 0", items : [ 
                        { xtype : "textfield", name : "TemplateAlias", fieldLabel : "Template Name", labelAlign : "right", width : 700 },
                        { xtype : "container", margin: "2 0 0 5", html : "<span style=\"color: blue;\">Optional</span>" }
                ]},

		{
			layout: 'hbox', 
			margin: '0 0 10 300',	// style: 'margin-left: 300px;',
			items: [
				{xtype : 'button', text : 'Save Template', action: 'save'},
				{xtype : 'container',html : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},
				{xtype : 'button',text : 'Clear Template', action: 'clear'}
			]
		}
	]
});


Ext.define('COMS.view.Authoring.CycleLength' ,{
	extend: 'Ext.container.Container',
	alias : 'widget.CycleLength',
	name : 'Cycle Length',
	defaults : {xtype : 'combo', labelAlign: 'right', padding : '5 0 0 0', displayField: 'value', valueField: 'id' },
	layout: 'hbox', 

	items : [
		{name: 'CycleLength', fieldLabel: 'Cycle Length <em>*</em>', labelAlign: 'right',
			width: 155, labelWidth: 95,allowBlank : false,
			store: 'CycleLengthMax',
			margin: '0 5 5 0'
		},
		{name: 'CycleLengthUnits', 
			width: 70,
			store: 'TimeFrameUnit', displayField : 'name', valueField : 'id', allowBlank : false,    /* idField : 'id', */
			margin: '0 5 5 0'
		}
	]
});

Ext.define('COMS.view.Common.selSequence' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selSequence',
	name : 'Sequence',

//	store : 'TemplateSources',
	store : { 
		fields : ["id"]
	},
	queryMode : "local",

        emptyText: "",
	width: 250,
	labelWidth: 125,
	fieldLabel: 'Select Sequence <em>*</em>',
	labelAlign: 'right',
	displayField: 'id',
	valueField: 'id',
        allowBlank: false,
	margin: '5 0 5 0',

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
    }
});

Ext.define('COMS.store.TotalCoursesMax', {
    extend : 'Ext.data.Store',
	model : Ext.COMSModels['TotalCoursesMax'],
	data : [
		{ id : '1', value : '1' },
		{ id : '2', value : '2' },
		{ id : '3', value : '3' },
		{ id : '4', value : '4' },
		{ id : '5', value : '5' },
		{ id : '6', value : '6' },
		{ id : '7', value : '7' },
		{ id : '8', value : '8' },
		{ id : '9', value : '9' },
		{ id : '10', value : '10' }
	]
});
Ext.define('COMS.store.CycleLengthMax', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels['CycleLengthMax']
});
Ext.define('COMS.store.TimeFrameUnit', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels['TimeFrameUnit']
});
Ext.define('COMS.store.EmotegenicLevel', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels['EmotegenicLevel']
});
Ext.define('COMS.store.FebrileNeutropeniaRisk', {
    extend : 'Ext.data.Store',
	model : Ext.COMSModels['FebrileNeutropeniaRisk'],
	data : [
		{ id : '1', value : 'Low' },
		{ id : '2', value : 'Medium' },
		{ id : '3', value : 'Moderate' },
		{ id : '4', value : 'High' }
	]
});
Ext.define('COMS.store.ReferencesStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels['References']
});
Ext.define('COMS.store.LUReferences', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels['LUReferences']
});
Ext.define('COMS.store.HydrationStore', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels['Hydration'],
        listeners: {
                    'load': function(store, options) {
                        if(store!=null){
                            store.sort('Sequence','ASC');
                        }
                    }
                }
        
});
Ext.define('COMS.store.DrugStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels['Drugs'],
    listeners: {
        'beforeload' : function(store, options){
            
            if(options.params){
                if(options.params.ID!=null){
                    store.proxy.url = options.params.URL + options.params.ID;
                }
            }
        },
        
        'load': function(store, options) {
            if(store!=null){
                store.sort('name','ASC');
            }
        }
    }
});

Ext.define('COMS.store.DrugUnitsStore', {
    extend : 'Ext.data.Store',
    model : Ext.COMSModels['DrugUnits']
});
Ext.define('COMS.store.InfusionStore', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.Infusion
});
/*
 *	Since this widget is a window, it's not a sub object to any other class when attempting to get a handle to it.
 *	Hence it's reference is : Ext.ComponentQuery.query('AddDrugRegimen')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddDrugRegimen button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddDrugRegimen button[action="save"]')[0].el.dom
 */
Ext.define('COMS.view.Authoring.AddDrugRegimen', {
	extend: 'Ext.window.Window',
	alias: 'widget.AddDrugRegimen',

	title: 'Add New Drug Regimen',
	layout: 'fit',
	autoShow: true,
	width: 800,
	items: [{
		xtype: "form",
		//defaults : { margin: '5', labelAlign: "right" },
		items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 5',
                            html: '<b>Fields with a <span style="color:red">*</span> are required fields</b>',
                            width: 220
                        },                            
                        {
                          xtype: 'container',
                          layout: 'hbox',
                          defaults: { labelAlign: 'right', margin: '5 5 5 0'},
                          items: [
                                    {
                                            xtype: 'radiogroup',
                                            labelAlign: 'left',
                                            name: 'patientRadio',
                                            fieldLabel: 'Medication Type',
                                            itemId: 'patientRadios',
                                            columns: 2,
                                            items: [
                                                        { boxLabel  : 'InPatient', name : 'PatientType', inputValue: 'InPatient', width: 100, checked: true  }, 
                                                        { boxLabel  : 'OutPatient', name  : 'PatientType', inputValue: 'OutPatient', width: 125  }
                                                ]
                                    }                                   
                                ]},                        {
                          xtype: 'container',
                          layout: 'hbox',
                          defaults: { labelAlign: 'right', margin: '5 5 5 0'},
                          items: [
                                    {
                                        xtype: 'combo', 
                                        fieldLabel: 'Select Drug <em>*</em>', 
                                        labelWidth: 80, 
                                        width: 425, 
                                        name: 'Drug', 
                                        store: 'DrugStore',
                                        queryMode: 'local',
                                        displayField: 'name', 
                                        valueField: 'name',
                                        allowBlank: false
                                    }                                    
                                ]},
						{
                          xtype: 'container',
                          layout: 'hbox',
                          defaults: { labelAlign: 'right', margin: '0 5 5 0'},
                          items: [
                                    {
					xtype: 'selSequence'
                                    }, 
                                    {
					xtype: 'textfield', 
                                        fieldLabel: 'Administration Day(s) <em>*</em>', 
                                        labelWidth: 140, 
                                        width: 285, 
                                        maskRe: /^[-,0-9 ]+$/, 
                                        name: 'Day',
                                        allowBlank: false,
                                        colspan : 4,
                                        margin: '0 0 5 30'
                                    }
                        ]},                    
                        {
                          xtype: 'container',
                          layout: 'hbox',
                          defaults: {
                                    labelAlign: 'right',
                                    margin: '5 5 5 0'
                          },
                          items: [                      
                                {
					xtype: 'textfield', 
                                        maskRe: /[0-9\.]/, 
                                        name: 'Amt', 
                                        fieldLabel: 'Dosage Amount <em>*</em>', 
                                        width: 205,
                                        labelWidth: 115,
                                        allowBlank: false
				}, {
					xtype: 'combo', 
                                        fieldLabel: 'Units <em>*</em>', 
                                        width: 150, 
                                        labelWidth: 45, 
                                        name: 'Units', 
                                        store: 'DrugUnitsStore', 
                                        displayField: 'name', 
                                        valueField: 'name',
                                        allowBlank: false
				},{
                                        xtype: 'combo', 
                                        fieldLabel: 'Route <em>*</em>', 
                                        name: 'Route', 
                                        labelWidth: 50, 
                                        width: 195, 
                                        store: 'InfusionStore', 
                                        displayField: 'name', 
                                        valueField: 'name' ,
                                        allowBlank: false
                                },
                                {
					xtype: 'container',
					width: 195,
                                        name: 'dosespacer',
					html: "<span style='margin-left: 150px; font-weight: bold;'>&nbsp;</span>",
                                        hidden: false
				},                                    
                                {
					xtype: 'timefield', 
					name: 'AdminTime',
					fieldLabel: 'Administration Time <em>*</em>',
                                        labelWidth: 100, 
                                        width: 215, 
                                        colspan : 2,
                                        margin: '0 0 5 0',
                                        hidden: true,
                                        allowBlank: false
				}
                            
                            ]
			},
                        {
                          xtype: 'container',
                          layout: 'hbox',
                          name: 'fluidInfo',
                          hidden: true,
                          defaults: {
                                    labelAlign: 'right',
                                    margin: '5 0 5 0'
                          },
                          items: [                      
                                {
                                        xtype: 'textfield', 
                                        fieldLabel: 'Fluid/Volume <em>*</em>', 
                                        maskRe: /[0-9\.]/,
                                        labelWidth: 85, 
                                        width: 170, 
                                        name: 'FluidVol',
                                        margin: '5 0 5 5',
                                        colspan : 1,
                                        allowBlank: false
				}, 
                                {
                                    xtype: 'container',
                                    html: 'ml',
                                    readOnly: true,
                                    name: 'fluidVolUnit',
                                    width: 20
                                },                            
                                {
                                        xtype: 'textfield', 
                                        fieldLabel: 'Flow Rate <em>*</em>', 
                                        maskRe: /[0-9\.]/,
                                        labelWidth: 70, 
                                        width: 120, 
                                        name: 'FlowRate', 
                                        colspan : 1,
                                        allowBlank: false
				},
                                {
                                    xtype: 'container',
                                    html: 'ml/hr',
                                    readOnly: true,
                                    name: 'flowRateUnit',
                                    width: 50
                                },                                                            
                                {
					xtype: 'textfield',
                                        name: 'InfusionTime', 
                                        fieldLabel: 'Infusion Time', 
					width: 195,
                                        lableWidth:120,
                                        readOnly: true
				},
                                {
					xtype: 'combo',
					name: 'FluidType',
					fieldLabel: 'Fluid Type <em>*</em>',
					width: 220,
                                        lableWidth:85,
                                        allowBlank: false,
                                        queryMode: 'local',
					displayField: 'value',
					valueField: 'value',
                                        store: 'LookupStore'
				}                                
                            ]
			},
                        {
                            xtype: 'textfield',
                            labelAlign: 'right',
                            margin: '0 5 5 0',
                            labelWidth: 75,
                            width: 780,
                            fieldLabel: "Instructions",
                            name: 'Instructions',
                            colspan : 4
                        }
		]
	}],

	initComponent: function () {
		this.buttons = [{
			text: 'Save',
			action: 'save'
		}, {
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];
		this.callParent(arguments);
	}
});

Ext.define('COMS.view.Management.EditLookup', {
	extend: 'Ext.window.Window',
	alias : 'widget.EditLookup',

	title : 'Edit Lookup',
	layout: 'fit',
	autoShow: true,
	width: 640,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
            layout: 'hbox',
			defaults : { labelAlign: 'right', margin: '5 5 5 0'},
			items: [
				{ xtype: 'textfield', name : 'name', labelWidth: 50, width: 270, fieldLabel: 'Name' },
				{ xtype: 'textfield', name : 'description', labelWidth: 80, width: 340, fieldLabel: 'Description' }
			]
		} ];

		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', action: 'cancel' }
		];

		this.callParent(arguments);
	}
});
Ext.define('COMS.view.Authoring.HydrationSequence', {
	extend: 'Ext.window.Window',
	alias : 'widget.HydrationSequence',

	title : 'Information',
	layout: 'fit',
	autoShow: true,
	width: 440,
    height: 150,

	initComponent: function() {
		this.items = [ {
			xtype: 'form',
			defaults : { labelAlign: 'top', margin: '5'},
			items: [
                            {
                                xtype: 'radiogroup',
                                fieldLabel: 'You have entered a duplicate sequence number. Would you like to',
                                itemId: 'sequenceRadios',
                                columns: 1,
                                items: [
                                            { boxLabel  : 'Apply Next Sequence Number', name : 'ApplySequence', inputValue: '0'  }, 
                                            { boxLabel  : 'Insert as Entered and Re-sequence Drugs', name  : 'ApplySequence', inputValue: '1'  }
                                    ]
                            }
                        ]}];
                                    
		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', scope: this, handler: this.close }
		];

		this.callParent(arguments);
	}
});
Ext.define('COMS.store.DrugRegimenStore', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.DrugRegimen
});
/*
 *	Since this widget is a window, it's not a sub object to any other class when attempting to get a handle to it.
 *	Hence it's reference is : Ext.ComponentQuery.query('AddHydrationDrug')[0].el.dom
 *	The reference to the "Save" button is Ext.ComponentQuery.query('AddHydrationDrug button')[0].el.dom
 *	The reference to the "Cancel" button is Ext.ComponentQuery.query('AddHydrationDrug button[action="save"]')[0].el.dom
 */
Ext.define('COMS.view.Authoring.AddHydrationDrug', {
	extend: 'Ext.window.Window',
	alias: 'widget.AddHydrationDrug',

	title: 'Add New Drug',
	layout: 'fit',
	autoShow: true,
	width: 785,

	initComponent: function () {
		this.items = [{
			xtype: 'form',
			items: [
                            {
                                xtype: 'container',
                                margin: '10 0 10 5',
                                html: '<b>Fields with a <span style="color:red">*</span> are required fields</b>',
                                width: 220
                            },                            
                            {
				xtype: 'container',
				layout: 'hbox',
				defaults: {
					labelAlign: 'right',
					margin: '5 5 5 0'
				},
				items: [
                                {
                                        xtype: 'radiogroup',
                                        labelAlign: 'left',
                                        name: 'patientRadio',
                                        fieldLabel: 'Medication Type',
                                        itemId: 'patientRadios',
                                        columns: 2,
                                        items: [
                                                    { boxLabel  : 'InPatient', name : 'PatientType', inputValue: 'InPatient', width: 100, checked: true  }, 
                                                    { boxLabel  : 'OutPatient', name  : 'PatientType', inputValue: 'OutPatient', width: 125  }
                                            ]
                                }                                
                            ]},{
				xtype: 'container',
				layout: 'hbox',
				defaults: {
					labelAlign: 'right',
					margin: '5 5 5 0'
				},
				items: [{
					xtype: 'combo',
					fieldLabel: 'Select Drug <em>*</em>',
					labelWidth: 80,
					width: 405,
					name: 'Drug',
					store: 'DrugStore',
                                        queryMode: 'local',
                                        allowBlank: false,
					displayField: 'name',
					valueField: 'name'
				}]},
				 {
				xtype: 'container',
				layout: 'hbox',
				defaults: {
					labelAlign: 'right',
					margin: '0 5 5 0'
				},
				items: [{
					xtype: 'selSequence'
				},
                                {
					xtype: 'textfield',
                                        //maskRe: /[0-9\.]/,
                                        maskRe: /^[-,0-9 ]+$/,
					name: 'Day',
					fieldLabel: 'Administration Day(s) <em>*</em>',
					width: 270,
                                        labelWidth:130,
                                        allowBlank: false,
					margin: '5 0 5 30'
				}
                        
                        ]},
                        {
				xtype: 'container',
				layout: 'hbox',
				defaults: {
					labelAlign: 'right',
					margin: '5 5 5 0'
				},
				items: [
                                {
					xtype: 'container',
					width: 10,
                                        name: 'dosespacer',
					html: "<span style='margin-left: 15px; font-weight: bold;'>&nbsp;</span>",
                                        hidden: false
				},                                    
                                {
					xtype: 'timefield',
					name: 'AdminTime',
					fieldLabel: 'Administration Time <em>*</em>',
					width: 200,
					margin: '0 0 5 0',
                                        hidden: true,
                                        lableWidth:85,
                                        allowBlank: false
				},                                    
                                {
					xtype: 'textfield',
					maskRe: /[0-9\.]/,
					name: 'Amt1',
					fieldLabel: 'Dosage Amount <em>*</em>',
					width: 200,
					labelWidth: 105
				}, {
					xtype: 'combo',
					fieldLabel: 'Units <em>*</em>',
					width: 155,
					labelWidth: 45,
					name: 'Units1',
					store: 'DrugUnitsStore',
					displayField: 'name',
					valueField: 'name'
				}, {
					xtype: 'combo',
					fieldLabel: 'Route <em>*</em>',
					name: 'Infusion1',
					width: 200,
					store: 'InfusionStore',
					displayField: 'name',
					valueField: 'name'
                                        
				}                                
                            ]
			},
                        {
				xtype: 'container',
				layout: 'hbox',
                                name: 'fluidInfo',
                                hidden: true,
				defaults: {
					labelAlign: 'right',
					margin: '0 0 5 0'
				},
				items: [
                                {
					xtype: 'textfield',
					maskRe: /[0-9\.]/,
					name: 'FluidVol1',
					fieldLabel: 'Fluid/Volume <em>*</em>',
                                        labelWidth: 85,
                                        margin: '0 0 5 15',
					width: 175,
                                        allowBlank: false
				}, 
                                {
                                    xtype: 'container',
                                    html: 'ml',
                                    readOnly: true,
                                    name: 'fluidVolUnit1',
                                    width: 20
                                },                            
                                {
					xtype: 'textfield',
					name: 'FlowRate1',
                                        maskRe: /[0-9\.]/,
					fieldLabel: 'Flow Rate <em>*</em>',
					width: 140,
                                        labelWidth: 95,
                                        allowBlank: false
				},
                                {
                                    xtype: 'container',
                                    html: 'ml/hr',
                                    readOnly: true,
                                    name: 'flowRateUnit1',
                                    width: 30
                                },                                                            
                                {
					xtype: 'textfield',
					name: 'InfusionTime1',
					fieldLabel: 'Infusion Time',
					width: 180,
                                        lableWidth:100,
                                        readOnly: true
				},                                
                                {
					xtype: 'combo',
					name: 'FluidType1',
					fieldLabel: 'Fluid Type <em>*</em>',
					width: 205,
                                        lableWidth:85,
                                        allowBlank: false,
                                        queryMode: 'local',
					displayField: 'value',
					valueField: 'value',
                                        store: 'LookupStore'
				}                                
                                
                            ]
                        },
                        {       xtype: "container", colspan : 5, 
                                html: "<div style=\"text-align: center; font-weight: bold;\">Fields below are required only if entering an optional Dosage Amount</div>", 
                                cls : "OptionalDosing", 
                                name : "OptionalDosingLabel" 
                        },
			{
				xtype: 'container',
				layout: 'hbox',
                                cls : "OptionalDosing", 
				defaults: {
					labelAlign: 'right',
					margin: '5 5 5 0'
				},
				items: [{
					xtype: 'container',
					width: 195,
					html: "<span style='margin-left: 150px; font-weight: bold;'>OR</span>"
				}, {
					xtype: 'textfield',
					maskRe: /[0-9\.]/,
					name: 'Amt2',
					fieldLabel: 'Dosage Amount',
					width: 200
				}, {
					xtype: 'combo',
					fieldLabel: 'Units',
					width: 155,
					labelWidth: 45,
					name: 'Units2',
					store: 'DrugUnitsStore',
					displayField: 'name',
					valueField: 'name'
				}, {
					xtype: 'combo',
					fieldLabel: 'Route',
					name: 'Infusion2',
					width: 200,
					store: 'InfusionStore',
					displayField: 'name',
					valueField: 'name'
				}]
			}, 
                        {
				xtype: 'container',
				layout: 'hbox',
                                name: 'fluidInfo1',
                                cls : "OptionalDosing", 
                                hidden: true,
				defaults: {
					labelAlign: 'right',
					margin: '5 0 5 0'
				},
				items: [
                                {
					xtype: 'textfield',
					maskRe: /[0-9\.]/,
					name: 'FluidVol2',
					fieldLabel: 'Fluid/Volume <em>*</em>',
                                        labelWidth: 85,
                                        margin: '0 0 5 15',
					width: 175,
                                        allowBlank: false
				}, 
                                {
                                    xtype: 'container',
                                    html: 'ml',
                                    readOnly: true,
                                    name: 'fluidVolUnit2',
                                    width: 20
                                },                            
                                {
					xtype: 'textfield',
					name: 'FlowRate2',
                                        maskRe: /[0-9\.]/,
					fieldLabel: 'Flow Rate <em>*</em>',
					width: 135,
                                        labelWidth: 90,
                                        allowBlank: false
				},
                                {
                                    xtype: 'container',
                                    html: 'ml/hr',
                                    readOnly: true,
                                    name: 'flowRateUnit2',
                                    width: 30
                                },                                                            
                                {
					xtype: 'textfield',
					name: 'InfusionTime2',
					fieldLabel: 'Infusion Time',
					width: 185,
                                        lableWidth:100,
                                        readOnly: true
				},                                
                                {
					xtype: 'combo',
					name: 'FluidType2',
					fieldLabel: 'Fluid Type <em>*</em>',
					width: 205,
                                        lableWidth:85,
                                        allowBlank: false,
                                        queryMode: 'local',
					displayField: 'value',
					valueField: 'value',
                                        store: 'LookupStore'
                                        
				}                               
                                
                            ]
                        },
                        {
				xtype: 'textfield',
				labelAlign: 'right',
				margin: '5 5 5 0',
				labelWidth: 75,
				width: 765,
				fieldLabel: "Instructions",
				name: 'Instructions'
			}


			]
		}];

		this.buttons = [{
			text: 'Save',
			action: 'save'
		}, {
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];

		this.callParent(arguments);
	}
});

Ext.define('COMS.view.Management.AddLookups' ,{
	extend: 'Ext.form.FormPanel',
	alias : 'widget.AddLookups',
	name : 'Add Lookups',
	id  : 'addLookup',
	title : 'Add Lookups',
	store : 'LookupStore',
	items: [
		{
			xtype: 'form',
			margin : '10 10 10 10',
			layout: 'hbox',
			defaults : { margin: '5 5 5 0', labelAlign: 'right', labelWidth: 160, width: 300 },
			items: [
				{
					xtype: 'SelectLookups',
					itemId: 'lookupType',
					name : 'id',
					labelWidth : 130
				},
				{
					xtype: 'textfield',
					name: 'value',
					fieldLabel: 'Enter Lookup Name'
				},
				{
					xtype: 'textfield',
					name: 'description',
					fieldLabel: 'Enter Lookup Description'
				}
			]
		},
		{
			xtype : 'gridpanel',
			margin : '10 10 10 10',
			title : 'Current Selected Lookup Type Data',
			store : Ext.create('Ext.data.Store', {
					model : 'COMS.model.GenericLookupModel'
				}),
			columns : [
				{header: 'Lookup Name',  dataIndex: 'name',  flex: 1},
				{header: 'Lookup Description', dataIndex: 'description', flex: 1}
			],
			dockedItems : [{
				xtype: 'toolbar',
				dock: 'bottom',
				buttonAlign: 'right',
				items: [
					{
						xtype: 'button',
						text: 'Edit Lookup',
						title: 'EditLookup',
                        disabled: true
					},
					{
						xtype: 'button',
						text: 'Remove Lookup',
						title: 'RemoveLookup',
						disabled: true
					}
				]
			}]
                        
		}
	],
	buttons : [ 
		{ text : 'Save', action : 'save' }, 
		{ text : 'Canel', scope : this } 
	],

	initComponent : function() {
		this.layoutConfig = {
			padding: 10
		};
		this.callParent(arguments);
	}
});
Ext.define('COMS.view.Management.SelectLookups' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.SelectLookups',
	name : 'Select Lookup Control',

	store : 'LookupStore',
	labelWidth: 150,
	fieldLabel: 'Select Lookup Type',
	displayField: 'value',
	valueField: 'id'
});
Ext.define('COMS.view.Management.DeleteTemplate' ,{
	extend: 'Ext.form.FormPanel',
	alias : 'widget.DeleteTemplate',
	name : 'Delete Template',
	id  : 'deleteTemplate',
	title : 'Delete Template',
	items: [
		{
			xtype: 'form',
			margin : '10 10 10 10',
			layout: 'hbox',
			defaults : { margin: '5 5 5 0', labelAlign: 'right'},
			items: [
                                    { xtype : 'selDisease' }			
                               ]
		},
		{
			xtype : 'gridpanel',
			margin : '10 10 10 10',
			title : 'Templates',
			store : 'Templates',
                        multiSelect: true,
			columns : [
				{header: 'Template Name',  dataIndex: 'description',  flex: 1}
			],
			dockedItems : [{
				xtype: 'toolbar',
				dock: 'bottom',
				buttonAlign: 'right',
				items: [
					{
						xtype: 'button',
						text: 'Show All Templates',
						title: 'AllTemplates'
					},
					{
						xtype: 'button',
						text: 'Remove Template',
						title: 'RemoveTemplate',
						disabled: true
					}
				]
			}]
                        
		}
	],
//	buttons : [ 
//		{ text : 'Save', action : 'save' }, 
//		{ text : 'Canel', scope : this } 
//	],

	initComponent : function() {
		this.layoutConfig = {
			padding: 10
		};
		this.callParent(arguments);
	}
});
Ext.define('COMS.view.Management.Globals', {
	extend: "Ext.grid.Panel",
	alias: "widget.Globals",
	name: "Globals",
	title: "COMS Global Value",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 300,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["sitelist", "domain"],
		proxy: {
			type: "rest",
			url: "/Admin/Globals",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Site Code",
			dataIndex: "sitelist",
			width: 120
		},
		{
			header: "Domain",
			dataIndex: "domain",
			width: 120
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});

Ext.define('COMS.view.Management.SelectGlobals' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.SelectGlobals',
	name : 'Select Lookup Control',

	store : "GlobalStore",
	labelWidth: 150,
	fieldLabel: 'Select Global Type',
	displayField: 'value',
	valueField: 'sitelist'
});
Ext.define('COMS.view.Management.Users', {
	extend: "Ext.grid.Panel",
	alias: "widget.Users",
	name: "Users",
	title: "COMS Users Value",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 600,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["username", "role", "DisplayName", "Email", "cprsUsername"],
		proxy: {
			type: "rest",
			url: "/Admin/Users",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Username",
			dataIndex: "username",
			width: 120
		},
		{
			header: "Role",
			dataIndex: "role",
			width: 120
		},
		{
			header: "Display Name",
			dataIndex: "DisplayName",
			width: 120
		},
		{
			header: "Email",
			dataIndex: "Email",
			width: 120
		},
		{
			header: "CPRS Username (ACCESS CODE)",
			dataIndex: "cprsUsername",
			width: 180
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});

Ext.define('COMS.view.Management.ActiveWorkflows', {
	extend: "Ext.grid.Panel",
	alias: "widget.ActiveWorkflows",
	name: "ActiveWorkflows",
	title: "COMS Active Workflows",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 600,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["WorkFlowName", "Active", "Reason", "NoSteps", "Body"],
		proxy: {
			type: "rest",
			url: "/Admin/ActiveWorkflows",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
		{
			header: "Workflow Name",
			dataIndex: "WorkFlowName",
			width: 120
		},
		{
			header: "Reason",
			dataIndex: "Reason",
			width: 120
		},
		//{
		//	header: "NoSteps",
		//	dataIndex: "NoSteps",
		//	width: 120
		//},
		{
			header: "Body",
			dataIndex: "Body",
			width: 180
		},
		{
			header: "Active",
			dataIndex: "Active",
			width: 50
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});

Ext.define('COMS.view.Management.MedsNonRounded', {
	extend: "Ext.grid.Panel",
	alias: "widget.MedsNonRounded",
	name: "MedsNonRounded",
	title: "Medication Except from Rounding",
	width: 925,
	margin: "10",
	autoEl: {
		tag: "section"
	},

	autoScroll: 'y',
	cls: 'custom-grid',
	columnLines: true,
	viewConfig: {
		stripeRows: true,
		height: 600,
		forceFit: true
	},
	store: {
		autoLoad: true,
		fields: ["Lookup_ID", "Name", "NonRounding"],
		proxy: {
			type: "rest",
			url: "/Admin/MedsNonRounded",
			reader: {
				type: "json",
				root: "records"
			}
		}
	},

	columns: [
//		{
//			header: "Lookup ID",
//			dataIndex: "Lookup_ID",
//			width: 120
//		},
		{
			header: "Name",
			dataIndex: "Name",
			width: 120
		},
		{
			header: "Non-Rounding Applied",
			dataIndex: "NonRounding",
			width: 120
		}
//	selType: 'cellmodel',
//	plugins: [
//	Ext.create('Ext.grid.plugin.CellEditing',{
//	clicksToEdit: 1
//	})
	]
});

Ext.define('COMS.store.LookupStore', {
	extend : 'Ext.data.Store',
        listeners: {
            'beforeload' : function(store, options){
                
                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }                
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.Lookups;
                }
            }

        },
        
	model : Ext.COMSModels.LookupTable
});
Ext.define('COMS.store.GlobalStore', {
	extend : 'Ext.data.Store',
        listeners: {
            'beforeload' : function(store, options){
                
                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }                
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.Lookups;
                }
            }
            

        },
        
	model : Ext.COMSModels.GlobalsTable
});
Ext.define('COMS.store.UsersStore', {
	extend : 'Ext.data.Store',
        listeners: {
            'beforeload' : function(store, options){
                
                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }                
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.Lookups;
                }
            }
            

        },
        
	model : Ext.COMSModels.UsersTable
});
Ext.define('COMS.store.ActiveWorkflowsStore', {
	extend : 'Ext.data.Store',
        listeners: {
            'beforeload' : function(store, options){
                
                if(options.params){
                    if(options.params.id!=null){
                        store.proxy.api.read = options.params.URL + options.params.id;
                    }                
                }
            },
            'load': function(store, records, success) {
                if(success){
                    store.proxy.api.read = Ext.URLs.Lookups;
                }
            }
            

        },
        
	model : Ext.COMSModels.ActiveWorkflowsTable
});
// Note: Controller for this widget is the "NewPlan.OEM" controller ("app\controller\NewPlan\OEM.js")
// Check out the "handleGoal_CTrial()" function which is attached via the "displayOEM_Record_Data()" function
Ext.define("COMS.view.NewPlan.CTOS.OEMGoal", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OEMGoal",

	"title" : "Regimen Goal",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 250,
	"url" : Ext.URLs.Edit_OEMRecord,

	"items" : [
		{
			"xtype" : "form",
			"items" : [
				{ "xtype" : "container", "margin" : "10 10 0 10", "html" : "<strong>Select the goal for this Regimen</strong>" },

				{
					"xtype" : "fieldcontainer",
					"defaults" : {
						"labelAlign" : "right", 
						"margin" : "0 15"
					},
					"defaultType" : "radiofield",
					"items": [
						{
							"boxLabel" : "Curative",
							"name" : "goal",
							"inputValue" : "Curative"
						},
						{
							"boxLabel" : "Palliative",
							"name" : "goal",
							"inputValue" : "Palliative"
						}
					]
				},
				{ "xtype" : "button", "text" : "Save", "action" : "save", "margin" : "10 30"  },
				{ "xtype" : "button", "text" : "Cancel", "margin" : "10 0"  }
			]
		}
	]
});
// Note: Controller for this widget is the "NewPlan.OEM" controller ("app\controller\NewPlan\OEM.js")
Ext.define("COMS.view.NewPlan.CTOS.OEMPerformanceStatus", {
	"extend" : "Ext.window.Window",
	"alias" : "widget.OEMPerformanceStatus",

	"title" : "Regimen Performance Status",
	"layout" : "fit",
	"autoShow" : true,
	"width" : 400,

	initComponent : function() {
		this.items = [ {
			"xtype" : "form",
			"items" : [
				{
					xtype: 'radiogroup',
					name: 'perfStatusRadio',
					labelAlign: 'top',
					fieldLabel: 'Select the Performance Status',
					id: 'performanceRadios',
					margin: '5 5 25 5',
					columns: 1,
					items: this.itemsInGroup
				}
			]
		}];
		this.buttons = [
			{ text: 'Save', action: 'save' },
			{ text: 'Cancel', scope: this, handler: this.close }
		];

		this.callParent(arguments);
	}


});
/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
Ext.define("COMS.view.NewPlan.CTOS.RequiredFieldLabel" ,{
	extend: "Ext.container.Container",
	alias : "widget.RequiredFieldLabel",
	margin: "10 0 5 10",
	html: "<b>Fields with a <em class=\"required-field\">*</em> are required fields</b>",
	width: 220
});

Ext.define("COMS.view.NewPlan.CTOS.FluidVol" ,{
	extend: "Ext.form.field.Text",
	alias : "widget.FluidVol",
	"fieldLabel": "Fluid/Volume <em class=\"required-field\">*</em>",
	"maskRe" : /[0-9\.]/,
	"labelWidth": 95,
	"width": 210,
	"allowBlank": false
});

Ext.define("COMS.view.NewPlan.CTOS.FlowRate" ,{
	extend: "Ext.form.field.Text",
	alias : "widget.FlowRate",
	fieldLabel : "Flow Rate",
	width : 140,
	labelWidth : 70
});

Ext.define("COMS.view.NewPlan.CTOS.AdminDay" ,{
	extend: "Ext.form.field.Text",
	alias : "widget.AdminDay",
	"fieldLabel": "Administration Day(s) <em class=\"required-field\">*</em>",
	"maskRe" : /^[-,0-9 ]+$/,
	"width": 250,
	"labelWidth": 140,
	"allowBlank": false
});

Ext.define("COMS.view.NewPlan.CTOS.DossageAmt" ,{
	extend: "Ext.form.field.Text",
	alias : "widget.DossageAmt",
	maskRe  :	/[0-9\.]/, 
	fieldLabel : "Dosage Amount <em class=\"required-field\">*</em>", 
	width : 200, 
	labelWidth : 115
});
	
Ext.define("COMS.view.NewPlan.CTOS.AdminTime" ,{
	extend: "Ext.form.field.Time",
	alias : "widget.AdminTime",
	"fieldLabel": "Administration Time <em class=\"required-field\">*</em>",
	"width": 290,
	"labelWidth": 130,
	"allowBlank": false
});


Ext.define("COMS.view.NewPlan.CTOS.SelectFluidType" ,{
	extend : "Ext.form.field.ComboBox",
	alias : "widget.SelectFluidType",
	"fieldLabel": "Select Fluid Type <em class=\"required-field\">*</em>",
	"labelWidth": 115,
	"width": 200,
	store : { fields : [ "FluidTypeName", "FluidTypeID" ], data : [{ FluidTypeName : "Normal", FluidTypeID : "Normal Saline" }, { FluidTypeName : "D5W", FluidTypeID : "D5W" }] },
	"displayField": "FluidTypeName",
	"valueField": "FluidTypeID"
});


Ext.define("COMS.view.NewPlan.CTOS.SelectDrug" ,{
	extend : "Ext.form.field.ComboBox",
	alias : "widget.SelectDrug",
	"fieldLabel": "Select Drug <em class=\"required-field\">*</em>",
	"labelWidth": 115,
	"width": 300,
	"store": "DrugStore",
	"allowBlank": false,
	"displayField": "name",
	"valueField": "id"
});

Ext.define("COMS.view.NewPlan.CTOS.DrugUnits" ,{
	extend : "Ext.form.field.ComboBox",
	alias : "widget.DrugUnits",
	"fieldLabel": "Units <em class=\"required-field\">*</em>", 
	"labelWidth": 95,
	"width": 210,
	"store": "DrugUnitsStore", 
	"displayField" : "name", 
	"valueField" : "name"
	/*************, 
	"validator" : function(value){
		var addHydrationDrug = Ext.ComponentQuery.query("AddHydrationDrug")[0];
		var hydrationForm = addHydrationDrug.down("form");
		var hydrationValues = hydrationForm.getValues();

		if("" !== hydrationValues.Amt1 && "" === value){
			return "Units must be selected";
		}else{
			return true;
		}
	}
	***************/
});

Ext.define("COMS.view.NewPlan.CTOS.InfusionMethod" ,{
	extend : "Ext.form.field.ComboBox",
	alias : "widget.InfusionMethod",

	"fieldLabel": "Route <em class=\"required-field\">*</em>", 
	"width": 140,
	"labelWidth": 70,
	"store": "InfusionStore",
	"displayField": "name",
	"valueField": "name"
	/************,
	"validator": function(value){
		var addHydrationDrug = Ext.ComponentQuery.query("AddHydrationDrug")[0];
		var hydrationForm = addHydrationDrug.down("form");
		var hydrationValues = hydrationForm.getValues();
		                                            
		if("" !== hydrationValues.Amt2 && "" === value){
			return "Route must be selected";
		}else{
			return true;
		}
	}
	**************/
});

Ext.define("COMS.view.NewPlan.CTOS.SelectReason" ,{
	extend : "Ext.form.field.ComboBox",
	alias : "widget.SelectReason",
	fieldLabel: "Select Reason <em class=\"required-field\">*</em>",
	labelWidth: 115,
	width: 300,
	store: "ReasonStore",
	allowBlank: false,
	displayField: "value",
	valueField: "id"
});



Ext.define("COMS.view.NewPlan.CTOS.OEM_Edit" ,{
	extend: "Ext.window.Window",
	alias : "widget.EditOEMRecord",

	title: "Edit Drug Record",
	layout: "fit",
	autoShow: true,
	width: 900,

	items : [
		{
			"xtype": "form",
			"items": [
				{ "xtype": "RequiredFieldLabel" },

				{
					"xtype": "container",
					"layout": { "type" : "table", "columns" : 5, tableAttrs : { style: { margin : "0 0 0 20"}, border : 0} },
					defaults: {
						labelAlign: "right", 
						margin: "0"
					},
					"items": [
						// Row 1 - Drug
						{ xtype: "container",  width: 20, "html": "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>" },
						{ xtype: "SelectDrug", "name": "Med", colspan : 2, margin: "2 2 2 2" },

                                                { xtype: "SelectReason", name:"Reason", colspan: 2, margin: "2"},

						// Row 2 - Dosing
						{ xtype: "container",  width: 20, "html": "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>" },
						{ xtype: "DossageAmt", name : "Dose", margin: "2 2 2 2" },
						{ xtype: "DrugUnits", name : "Units", margin: "2 2 2 2" },
						{ xtype: "InfusionMethod", name : "InfusionMethod",  colspan : 2, margin: "2 2 2 2" },


							// Row 3 - Fliud Info - "FluidInfoSpacer", "FluidType", "FluidInfoVol", "FluidInfoRate", "InfusionTime"
							{ xtype: "container",  width: 30, html: "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>", name : "FluidInfoSpacer" },

							{ xtype: "SelectFluidType", name : "FluidType", margin: "2 2 2 2" },
							{ xtype: "container", layout : "hbox", width :270, margin: "2 0 0 0", "defaults": { labelAlign: "right" }, items : [
								{ xtype: "FluidVol", name : "FluidVol", margin: "0 0 2 1" },
								{ xtype: "container", width: 20, html : "ml", margin: "1 0 2 2"}
							], name : "FluidInfoVol" },
							{ xtype: "container", layout : "hbox", width :180, margin: "2 0 0 0", "defaults": { labelAlign: "right" }, items : [
								{ xtype: "FlowRate", name : "FlowRate", margin: "0 0 2 1" },
								{ xtype: "container", html : "ml/hr", margin: "1 0 2 2"}
							], name : "FluidInfoRate" },
							{ xtype: "displayfield", fieldLabel: "Infusion Time", name : "InfusionTime", width: 200 },

						// Row 5 - Optional Dosing - "OptionalDosingLabel", "OptionalDosing", "Dose2", "Units2", "InfusionMethod2"
						{ xtype: "container", colspan : 5, html: "<div style=\"text-align: center; font-weight: bold;\">Fields below are required only if entering an optional Dosage Amount</div>", cellCls : "OptionalDosing", name : "OptionalDosingLabel" },

						{ xtype: "container", width: 30, html: "<span style=\"font-weight: bold;\">&nbsp;OR</span>", cellCls : "OptionalDosing", name : "OptionalDosing" },
						{ xtype: "DossageAmt", name : "Dose2", margin: "2 2 2 2", cellCls : "OptionalDosing" },
						{ xtype: "DrugUnits", name : "Units2", margin: "2 2 2 2", cellCls : "OptionalDosing" },
						{ xtype: "InfusionMethod", name : "InfusionMethod2",  cellCls : "OptionalDosing", colspan : 2, margin: "2 2 2 2" },

						// Row 6 - Optional Fluid Info - "FluidInfo2", "FluidType2", "FluidInfo2Vol", "FluidInfo2Rate", "InfusionTime2"
						{ xtype: "container", width: 30, html: "<span style=\"font-weight: bold;\">&nbsp;&nbsp;&nbsp;</span>", cellCls : "OptionalDosing", name : "FluidInfo2Spacer" },

						{ xtype: "SelectFluidType", name : "FluidType2", margin: "2 2 2 2", cellCls : "OptionalDosing" },
						{ xtype: "container", layout : "hbox", width :270, margin: "2 0 0 0", "defaults": { labelAlign: "right" }, items : [
							{ xtype: "FluidVol", name : "FluidVol2", margin: "0 0 2 1"},
							{ xtype: "container", width: 20, html : "ml", margin: "1 0 2 2"}
						], cellCls : "OptionalDosing", name : "FluidInfo2Vol" },
						{ xtype: "container", layout : "hbox", width :180, margin: "2 0 0 0", "defaults": { labelAlign: "right" }, items : [
							{ xtype: "FlowRate", name : "FlowRate2", margin: "0 0 2 1"},
							{ xtype: "container", html : "ml/hr", margin: "1 0 2 2"}
						], cellCls : "OptionalDosing", name : "FluidInfo2Rate" },
						{ xtype: "displayfield", fieldLabel: "Infusion Time", name : "InfusionTime2", width: 200, cellCls : "OptionalDosing" },
						{
							xtype : "textfield",
							labelAlign : "right",
							colspan : 5,
							margin : "2 0 0 2",
							labelWidth : 75,
							width : 805,
							fieldLabel : "Instructions",
							name : "Instructions"
						},
						{ xtype: "hiddenfield", colspan: 5, name : "Order_ID" }
					]
				},
				{ xtype : "button", text : "Save", action : "save", margin : "10 30"  },
				{ xtype : "button", text: "Cancel", margin : "10 0"  }
			]
		}		// End of form
	]
});

Ext.define('COMS.store.ReasonStore', {
    extend : 'Ext.data.Store',
    autoLoad: true,          // KD 03/27/12 - When autoload is commented out then none of the Performance Status are available when Applying Template
    model : Ext.COMSModels.LookupTable,
    proxy: {
        type: 'ajax',
        url: Ext.URLs.Reasons,
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
Ext.define("COMS.view.NewPlan.CTOS.FlowSheet" ,{
	extend : "Ext.container.Container",
	alias : "widget.FlowSheet",
	name : "Flow Sheet Tab",
	title : "Flowsheet",

	padding : "10",
	items : [
		{ xtype : "NursingDocs_Chemotherapy", cls : "Level1" },
		{ xtype : "container", name : "flowsheet grid" }		// Grid is built on the fly in the 
																// app\controller\NewPlan\CTOS\FlowSheetTab.js createFlowsheet() 
																// (Search for: theGrid = Ext.create)
	],

	initComponent: function() {
		wccConsoleLog("Flow Sheet Tab View - Initialization");
		this.callParent(arguments);
	}
});
Ext.define("COMS.view.NewPlan.CTOS.ChronologyOverview" ,{
	extend: "Ext.container.Container",
	alias : "widget.ChronologyOverview",
	name : "Chronology Overview",
	margin : "10 5 20 5",

	autoEl : { tag : "section" },

	tpl : new Ext.XTemplate(
		"<table border=\"1\" width=\"100%\" class=\"Therapy InformationTable\">",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=15%></colgroup>",
			"<colgroup width=12%></colgroup>",
			"<colgroup width=61%></colgroup>",

		"	<thead><tr><th colspan=\"4\" class=\"large\">Chronology Information <span style=\"font-weight: normal;\">- for Patient: {PatientName}</span></th></tr></thead>",

		"	<tr><th align=\"right\">Regimen:</th><td colspan=\"3\">{RegimenName}</td></tr>",
		"	<tr><th align=\"right\">Description</th><td colspan=\"3\">{RegimenDescription}</td></tr>",
		"	<tr><th align=\"right\">Treatment Start:</th><td colspan=\"3\">{TreatmentStart}</td></tr>",
		"	<tr><th align=\"right\">Treatment End:</th><td colspan=\"3\">{TreatmentEnd}</td></tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Neutropenia&nbsp;Risk:</th>",
		"		<td>{FNRisk}%</td>",
		"		<th>Recommendation:</th>",
		"		<td>{NeutropeniaRecommendation} (Note: Need to add recommendations to Lookup Table for FN)</td>",
		"	</tr>",
		"	<tr class=\"MultiLineRow\">",
		"		<th>Emesis Risk:</th>",
		"		<td>{ELevelName}</td>",
		"		<th>Recommendation:</th>",
		"		<td>",
		"			<abbr title=\"American Society of Clinical Oncology\">ASCO</abbr><p>{ELevelRecommendationASCO}</p>",
		"			<abbr title=\"National Comprehensive Cancer Network\">NCCN</abbr><p>{ELevelRecommendationNCCN}</p>",
		"		</td>",
		"	</tr>",

		"	<tr><th>Goal</th><td colspan=\"5\">{[this.goalLink( values )]}</td></tr>",
		"	<tr><th>Clinical Trial</th><td colspan=\"5\">{[this.ctLink( values )]}</td></tr>",
		"	{[this.ctData( values )]}",
		"	<tr><th>Performance&nbsp;Status</th><td colspan=\"5\">{[this.PS( values )]}</td></tr>",
		"</table>",
		{
				// XTemplate Configuration
			disableFormats: true,
			goalLink : function ( current ) {
				if (current.Goal){
					return (current.Goal);
				}
				return ("No Goal Specified");
			},
			ctLink : function ( current ) {
				if (current.ClinicalTrial ) {
					return (current.ClinicalTrial);
				}
				return ("Clinical Trial Not Specified");
			},
			ctData : function ( current ) {
				if (current.ClinicalTrial) {
					return ("<tr><th>Type of Trial</th><td colspan=\"5\">" + current.ClinicalTrialType + "</td></tr>");
				}
				return ("");
			},
			PS : function ( current ) {
				var buf = current.PerformanceStatus;
				return (buf);
			}
		}
	)
});


Ext.define("COMS.view.NewPlan.CTOS.ChronologyBody" ,{
	extend: "Ext.container.Container",
	alias : "widget.ChronologyBody",
	name : "Chronology Body",
	margin : "0 0 20 0",
	autoEl : { tag : "section" }
});

Ext.define("COMS.view.NewPlan.CTOS.Chronology" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.Chronology",

	name : "Chronology Tab",
	margin : "0 0 20 0",

	autoEl : { tag : "section" },
	title: "Chronology",
	items : [ { xtype : "ChronologyOverview" }, { xtype : "ChronologyBody" }],


	initComponent: function() {
		wccConsoleLog("Chronology Tab View - Initialization");
		this.callParent(arguments);
	}
});
/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.GoalInfo" ,{
	extend: "Ext.form.FieldSet",
	alias : "widget.NursingDocs_PatientID",
	name : "NursingDocs.PatientID",

	title : "Patient Identification",

	defaults : {
        labelAlign: "right",
		labelWidth : 210,
		width : 320,
		margin : "5 10 15 10"
	},
	items : [
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgPatientID",
			fieldLabel : "Patient identification verified with 2 information sources?", 
			labelClsExtra : "NursingDocs-label", 
			labelAlign: "right",
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "patientIDGood", fieldLabel : "Yes", inputValue: true }, 
				{ name : "patientIDGood", fieldLabel : "No", inputValue: false }
			]
		},

		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgConsent",
			fieldLabel : "Consent obtained?", 
			labelClsExtra : "NursingDocs-label", 
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "consentGood", fieldLabel : "Yes", inputValue: true },
				{ name : "consentGood", fieldLabel : "No", inputValue: false } 
			]
		},

		{ 
			xtype : "textareafield", 
			name : "PatientIDComment",
			grow : true, 
			fieldLabel : "Comment", 
			labelClsExtra : "NursingDocs-label", 
			value : "", 
			width: 700 
		}

	]
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PatientTeaching" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_PatientTeaching",
	name : "NursingDocs.PatientTeaching",
	title : "Patient Teaching",
//	margin : "5 10 5 10",
	items : [
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgEduAssess",
			margin : "0",
			fieldLabel : "Education assessment complete?", 
			labelClsExtra : "NursingDocs-label", 
			labelWidth : 230,
			labelAlign: "right",
			width : 350,
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "educationGood", fieldLabel : "Yes", inputValue: true },
				{ name : "educationGood", fieldLabel : "No", inputValue: false } 
			]
		},
		{ 
			xtype : "radiogroup", 
			columns : 2,
			name: "rgPlanReviewed",
			margin : "0",
			fieldLabel : "Pre-procedure plan reviewed with patient/significant other, questions answered?", 
			labelClsExtra : "NursingDocs-label", 
			labelWidth : 530,
			labelAlign: "right",
			width : 650,
			defaults : {
				labelAlign: "right",
				labelWidth : 30,
				width : 50
			},
			items : [
				{ name : "planReviewed", fieldLabel : "Yes", inputValue: true },
				{ name : "planReviewed", fieldLabel : "No", inputValue: false } 
			]
		}
	]
});




Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.DualDosingVerification" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_DualDosingVerification",
	name : "NursingDocs.DualDosingVerification",
	title : "Dual Verification of Dosing",
	items : [
		{ xtype : "container", 
			layout : { 
				type : "table", 
				// tableAttrs: { border : 1 },
				columns : 4
			},
			defaults : { labelAlign : "right", labelWidth : 60, margin: "5 0 5 0" }, 
			items : [
				{ 
					xtype : "button", 
					name: "DDV_FirstSig",
					text : "Sign to Verify",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig1",
					margin : "0 0 0 20"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig2",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig3",
					margin : "0"
				},


				{ 
					xtype : "button", 
					name: "DDV_SecSig",
					text : "Sign to Verify",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig4",
					margin : "0 0 0 20"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig5",
					margin : "0"
				},
				{ 
					xtype : "displayfield", 
					name: "DDV_FirstSig6",
					margin : "0"
				}
			]
		}
	]
});







Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.VitalSigns" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_VitalSigns",
	name : "NursingDocs.VitalSigns",
	title : "Vital Signs",

	items : [
		{ xtype : "container", 
			layout : { 
				type : "table", 
				// tableAttrs: { border : 1 },
				columns : 4
			},
			defaults : { labelAlign : "right", labelWidth : 60 }, 
			items : [
				// Row 1
				{ 
					xtype : "container", 
					layout : "hbox",
					defaults : { labelAlign : "right" },
					width : 240,
					margin : "3 0 0 0",
					items : [
						{ 
							xtype : "textfield", maskRe: /[0-9\.]/, 
							name : "ndVitalsTempF", 
							fieldLabel : "Temp.", labelWidth : 60, width: 105, labelClsExtra : "NursingDocs-label" 
						}, 
						{ xtype : "displayfield", labelSeparator : "", value : "&deg;F", width : 20, margin : "0 0 0 2" },
						{ xtype : "displayfield", name : "ndVitalsTempC", labelSeparator : "", value : " (  &deg;C)", width : 90 /*, baseBodyCls : "x-form-field x-form-text" */ }
					]
				},
				{ xtype : "textfield",  maskRe: /[0-9]/, name : "ndVitalsPulse", fieldLabel : "Pulse", labelWidth : 60, width: 100, margin : "0 90 0 0", labelClsExtra : "NursingDocs-label" }, 

				{ xtype : "fieldcontainer", name: "ndVitalsBP", width : 200, margin : "5 0 0 0",
					fieldLabel : "<abbr title=\"Blood Pressure\">BP</abbr>", labelWidth: 60, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
						{ xtype : "textfield", maskRe: /[0-9]/, name : "ndVitalsSystolic", width: 30 },
						{ xtype : "displayfield", value : " / " },
						{ xtype : "textfield", maskRe: /[0-9]/, name : "ndVitalsDiastolic", width: 30 }
					]
				},
					
					
					
				// { xtype : "textfield",  maskRe: /[0-9]/, name : "ndVitalsSystolic", fieldLabel : "Systolic", labelWidth : 60, width: 100, margin : "0 90 0 0", labelClsExtra : "NursingDocs-label" }, 
				{ xtype : "displayfield", 
					/* baseBodyCls : "x-form-field x-form-text", */
					name : "ndVitalsGender", 
					fieldLabel : "Patient Gender", 
					labelWidth : 110,
					labelClsExtra : "NursingDocs-label", 
					labelAlign: "right",
					width : 150,
					margin : "0 10 4 0"
				},
		//---------------------------------------------------------------------------
				// Row 2
				{ 
					xtype : "container", 
					layout : "hbox",
					defaults : { labelAlign : "right" },
					width : 240,
					margin : "3 0 0 0",
					items : [
						{ 
							xtype : "textfield", maskRe: /[0-9\.]/, 
							name : "ndVitalsHeightIN", 
							fieldLabel : "Height", labelWidth : 60, width: 105, labelClsExtra : "NursingDocs-label" 
						}, 
						{ xtype : "displayfield", labelSeparator : "", value : "inches", width : 40, margin : "0 0 0 2" },
						{ xtype : "displayfield", name : "ndVitalsHeightCM", labelSeparator : "", value : " (  cm)", width : 90
						// baseBodyCls : "x-form-field x-form-text"
						}
						// { xtype : "displayfield", labelSeparator : "", value : " CM)", width : 10, margin : "0 0 0 2" }
					]
				},
				{  xtype : "textfield",  maskRe: /[0-9]/, name : "ndVitalsResp", fieldLabel : "<abbr title=\"Respiration - in Breaths per minute\">Resp</abbr>", labelWidth : 60, width: 100, margin : "0 90 0 0", labelClsExtra : "NursingDocs-label" }, 
				{  
					xtype : "textfield",  
					maskRe: /[0-9\.]/, 
					name : "ndVitalsO2Level", 
					fieldLabel : "<abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub>%</abbr>", 
					labelWidth : 60, 
					width: 100, 
					margin : "0 90 0 0", 
					labelClsExtra : "NursingDocs-label" 
				}, 
				// {  xtype : "textfield",  maskRe: /[0-9]/, name : "ndVitalsDiastolic", fieldLabel : "Diastolic", labelWidth : 60, width: 100, margin : "0 90 0 0", labelClsExtra : "NursingDocs-label" }, 
				{  xtype : "displayfield", name : "ndVitalsAge", fieldLabel : "Age", labelWidth : 60, width: 100, margin : "0 10 0 0", labelClsExtra : "NursingDocs-label" },



		//---------------------------------------------------------------------------
				// Row 3
				{ 
					xtype : "container", 
					layout : "hbox",
					defaults : { labelAlign : "right" },
					// width : 240,
					margin : "3 0 0 0",
					items : [
						{ 
							xtype : "textfield", 
							maskRe: /[0-9\.]/, 
							name : "ndVitalsWeightP", 
							fieldLabel : "Weight", 
							labelWidth : 60, 
							width: 105, 
							labelClsExtra : "NursingDocs-label" 
						}, 
						{ 
							xtype : "displayfield", 
							labelSeparator : "", 
							value : "lbs", 
							width : 25, 
							margin : "0 0 0 2" 
						},
						{ 
							xtype : "displayfield", 
							name : "ndVitalsWeightKG", 
							labelSeparator : "", 
							value : " (  kg)", 
							width : 90
						}
					]
				},
				{  
					xtype : "numberfield", 
					maxValue: 10, 
					minValue: 0, 
					name : "ndVitalsPain", 
					fieldLabel : "Pain", 
					labelWidth : 60, 
					width: 120, 
					margin : "0 90 0 0", 
					labelClsExtra : "NursingDocs-label" 
				}, 
/******************
				{  
					xtype : "textfield",  
					maskRe: /[0-9\.]/, 
					name : "ndVitalsO2Level", 
					fieldLabel : "<abbr title=\"Saturation of Peripheral Oxygen\">SP O<sub>2</sub>%</abbr>", 
					labelWidth : 60, 
					width: 100, 
					margin : "0 90 0 0", 
					labelClsExtra : "NursingDocs-label" 
				}, 
*******************/
				{
					xtype : "container", 
					layout : "hbox",
					colspan : 2,
					defaults : { labelAlign : "right" },
					margin : "3 0 0 0",
					width: 240,
					items : [
						{  
							xtype : "displayfield", 
							name : "ndVitalsBSA", 
							fieldLabel : "<abbr title=\"Body Surface Area\">BSA</abbr>", 
							labelWidth : 60, 
							width: 105, 
							margin : "0 5 0 0", 
							labelClsExtra : "NursingDocs-label" 
						}, 
						{  
							xtype : "container",  
							name : "ndVitalsCalcBSA", 
							html : "Show <button name=\"ShowBSA\" class=\"anchor NDGIVS_BSA_Calculations\">Calculations</button>", 
							width: 180, 
							margin : "0 50 0 0" 
						}
					]
				}
			]
		}
	]
});








Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.GenInfo" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_GenInfo",
	name : "Nursing Documentation General Info Tab",
	title: "General Information",
	items : [
		{ 
			xtype : "fieldset",
			collapsible : true, 
			collapsed : true,
			title : "Laboratory Information",
			name : "ND_PT_LabInfo",
			tpl : [
				'<table width="100%" border=1 class="LabInfoResults">',
				'<tpl for=".">',
					'<tr><th>Report&nbsp;Release&nbsp;Date:</th><td>{relDate}</td></tr>',
					'<tr><th>Name:</th><td>{name}',
								// '<a href="#" style="margin-left: 1em;" onclick="labInfoDetails({#}, this); return false;">Show Details</a>',
					'</td></tr>',

					'<tr id="LabInfoDetails_{#}"><td colspan="2" class="LabInfoDetails">',
						'<table width="100%" class="LabInfoDetails">',
							'<tr><th class="topLeftBrdr">Provider</th><td colspan="4" class="topRightBrdr">{provider}</td></tr>',
							'<tr><th class="leftBrdr">Specimen</th><td colspan="4" class="rightBrdr">{specimen} {specInfo}</td></tr>',
							'<tr>',
								'<th class="center leftBrdr">Name</th>',
								'<th class="center">Results</th>',
								'<th class="center">Units</th>',
								'<th class="center rightBrdr">Normal Range</th>',
							'</tr>',

							'<tpl for="results">',
								'<tpl if="OutOfRange">',
									'<tr xxclass="LabInfoOutOfRange">',
										'<td xxclass="LabInfoOutOfRange">{name}</td>',
										'<td xxclass="LabInfoOutOfRange">{result}</td>',
										'<td>{units}</td>',
										'<td xxclass="LabInfoOutOfRange">{range}</td>',
									'</tr>',
								'</tpl>',
								'<tpl if="true !== OutOfRange">',
									'<tr><td>{name}</td>',
										'<td>{result}</td>',
										'<td>{units}</td>',
										'<td>{range}</td>',
									'</tr>',
								'</tpl>',
							'</tpl>',
						'</table>',
					'</td></tr>',

					'<tr><th class="leftBrdr">Reference</th>',
					'<td class="rightBrdr">{ref}</td></tr>',
					'<tr><th class="bottomLeftBrdr">Site</th><td class="bottomRightBrdr">{site}</td></tr>',
		
					'<tr class="dblBorder"><th>Comments:</th><td>{comment}</td></tr>',
				'</tpl>',
				'</table>'
			]
		},


		{ xtype : "NursingDocs_PatientID"},
		{ xtype : "NursingDocs_PatientTeaching"},
		{ xtype : "NursingDocs_DualDosingVerification"},

		{ xtype : "NursingDocs_VitalSigns"},
		{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ 
			{ xtype : "button", text : "Save", action : "save" }, 
			{ xtype : "button", text : "Cancel"  } 
		]},
		{ xtype : "fieldset", title : "Vital Signs - Historical", items : [ { xtype : "VitalSignsHistory" } ]}
	]
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.AssessmentCombo", {
	extend : "Ext.form.field.ComboBox",
    alias : "widget.NursingDocs_AssCombo",
	hidden : true,
	labelWidth : 150,
	labelAlign : "right",
	width : 840,
	labelClsExtra : "NursingDocs-label", 
	margin : "0 10 5 10",
	queryMode : "local",
	displayField : "grade",
	valueField : "gradeLevel"
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PretreatmentAssesment" ,{
    extend: "Ext.form.FieldSet",
    alias : "widget.NursingDocs_PretreatmentAssesment",
	name : "NursingDocs.PretreatmentAssesment",
	title : "Pretreatment Assesment",

	defaults : { labelAlign : "left"}, 
	items : [
		{ xtype : "container", html : "<h3>Pretreatment Assessment of Adverse Events since last treatment:</h3>" },

		{ xtype : "fieldset", title : "Notes on Assessment Events", collapsible : true, collapsed : true, html1 : ["<h3>Note:</h3><div>",
			"After reviewing several pages on the <a href=\"http://ctep.cancer.gov\" target=\"_blank\">CTEP</a> (Cancer Therapy Evaluation Program)Site, ",
			"including their <a href=\"http://ctep.cancer.gov/protocolDevelopment/electronic_applications/ctc.htm#ctc_40\" target=\"_blank\">documentation</a> on \"Common Terminology Criteria for Adverse Events (CTCAE) and Common Toxicity Criteria (CTC)\".<br>",
			"I have generated values for the following select boxes, from the most recent release of the core terminology in <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/CTCAE_4.03_2010-06-14.xls\" target=\"_blank\">Excel spreadsheet</a><br>",
			"from the NCI Common Terminology Criteria for Adverse Events (CTCAE) v.4 <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/About.html\" target=\"_blank\">data files</a>, located on the <a href=\"http://evs.nci.nih.gov/\" target=\"_blank\">National Cancer Institute - Enterprise Vocabulary Services</a> site",
			"</div>"],

			html : ["<h3>Note:</h3><div>",
			"The <a href=\"http://ctep.cancer.gov\" target=\"_blank\">CTEP</a> (Cancer Therapy Evaluation Program) Site, ",
			"contains <a href=\"http://ctep.cancer.gov/protocolDevelopment/electronic_applications/ctc.htm#ctc_40\" target=\"_blank\">documentation</a> on \"Common Terminology Criteria for Adverse Events (CTCAE) and Common Toxicity Criteria (CTC)\". ",
			"The following assessment terms and levels have been obtained from the most recent release of the core terminology in <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/CTCAE_4.03_2010-06-14.xls\" target=\"_blank\">Excel spreadsheet</a><br>",
			"from the <abbr title=\"National Cancer Institute\">NCI</abbr> Common Terminology Criteria for Adverse Events (CTCAE) v.4 <a href=\"http://evs.nci.nih.gov/ftp1/CTCAE/About.html\" target=\"_blank\">data files</a>, located on the <a href=\"http://evs.nci.nih.gov/\" target=\"_blank\">National Cancer Institute - Enterprise Vocabulary Services</a> site.",
			"</div>"]
		},


		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Fatigue",
			boxLabel : "Fatigue"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_FatigueOptions",
			fieldLabel : "Level of Fatigue",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Fatigue relieved by rest", gradeLevel : "1" }, 
				{ grade : "2. Fatigue not relieved by rest; limiting instrumental Activity of Daily Living", gradeLevel : "2" }, 
				{ grade : "3. Fatigue not relieved by rest; limiting self care Activity of Daily Living", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_FatigueComments",
			fieldLabel : " Comments"
		},

		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Anorexia",
			boxLabel : "Anorexia"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_AnorexiaOptions",
			fieldLabel : "Level of Anorexia",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Loss of appetite without alteration in eating habits", gradeLevel : "1" }, 
				{ grade : "2. Oral intake altered without significant weight loss or malnutrition; oral nutritional supplements indicated", gradeLevel : "2" }, 
				{ grade : "3. Associated with significant weight loss or malnutrition (e.g., inadequate oral caloric and/or fluid intake); tube feeding or TPN indicated", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_AnorexiaComments",
			fieldLabel : " Comments"
		},



		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Nausea",
			boxLabel : "Nausea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_NauseaOptions",
			fieldLabel : "Level of Nausea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Loss of appetite without alteration in eating habits", gradeLevel : "1" }, 
				{ grade : "2. Oral intake decreased without significant weight loss, dehydration or malnutrition", gradeLevel : "2" }, 
				{ grade : "3. Inadequate oral caloric or fluid intake; tube feeding, TPN, or hospitalization indicated", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_NauseaComments",
			fieldLabel : " Comments"
		},


		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Vomiting",
			boxLabel : "Vomiting"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_VomitingOptions",
			fieldLabel : "Level of Vomiting",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. 1 - 2 episodes (separated by 5 minutes) in 24 hrs", gradeLevel : "1" }, 
				{ grade : "2. 3 - 5 episodes (separated by 5 minutes) in 24 hrs", gradeLevel : "2" }, 
				{ grade : "3. >=6 episodes (separated by 5 minutes) in 24 hrs; tube feeding, TPN or hospitalization indicated", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_VomitingComments",
			fieldLabel : " Comments"
		},



		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Rash",
			boxLabel : "Rash"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_RashOptions",
			fieldLabel : "Level of Rash",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Macules/papules covering <10% BSA with or without symptoms (e.g., pruritus, burning, tightness)", gradeLevel : "1" }, 
				{ grade : "2. Macules/papules covering 10 - 30% BSA with or without symptoms (e.g., pruritus, burning, tightness); limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Macules/papules covering >30% BSA with or without associated symptoms; limiting self care ADL", gradeLevel : "3" }

			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_RashComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Insomnia",
			boxLabel : "Insomnia"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_InsomniaOptions",
			fieldLabel : "Level of Insomnia",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Mild difficulty falling asleep, staying asleep or waking up early", gradeLevel : "1" }, 
				{ grade : "2. Moderate difficulty falling asleep, staying asleep or waking up early", gradeLevel : "2" },
				{ grade : "3. Severe difficulty in falling asleep, staying asleep or waking up early", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_InsomniaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Distress",
			boxLabel : "Distress"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DistressOptions",
			fieldLabel : "Level of Distress",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Mild pain", gradeLevel : "1" }, 
				{ grade : "2. Moderate pain; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Severe pain; limiting self care ADL", gradeLevel : "3" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DistressComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Diarrhea",
			boxLabel : "Diarrhea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DiarrheaOptions",
			fieldLabel : "Level of Diarrhea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Increase of <4 stools per day over baseline; mild increase in ostomy output compared to baseline", gradeLevel : "1" }, 
				{ grade : "2. Increase of 4 - 6 stools per day over baseline; moderate increase in ostomy output compared to baseline", gradeLevel : "2" }, 
				{ grade : "3. Increase of >=7 stools per day over baseline; incontinence; hospitalization indicated; severe increase in ostomy output compared to baseline; limiting self care Activity of Daily Living", gradeLevel : "3" },
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DiarrheaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Dyspnea",
			boxLabel : "Dyspnea"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_DyspneaOptions",
			fieldLabel : "Level of Dyspnea",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Shortness of breath with moderate exertion", gradeLevel : "1" },
				{ grade : "2. Shortness of breath with minimal exertion; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Shortness of breath at rest; limiting self care ADL", gradeLevel : "3" }, 
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }, 
				{ grade : "5. Death", gradeLevel : "5" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_DyspneaComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Neuropathy",
			boxLabel : "Neuropathy"
		},
		{	xtype : "NursingDocs_AssCombo", 
			name : "ND_Ass_NeuropathyOptions",
			fieldLabel : "Level of Neuropathy",
			store : { fields : [ "grade", "gradeLevel" ], data : [
				{ grade : "1. Asymptomatic; clinical or diagnostic observations only; intervention not indicated", gradeLevel : "1" }, 
				{ grade : "2. Moderate symptoms; limiting instrumental ADL", gradeLevel : "2" }, 
				{ grade : "3. Severe symptoms; limiting self care ADL; assistive device indicated", gradeLevel : "3" }, 
				{ grade : "4. Life-threatening consequences; urgent intervention indicated", gradeLevel : "4" }, 
				{ grade : "5. Death", gradeLevel : "5" }
			] }
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_NeuropathyComments",
			fieldLabel : " Comments"
		},




		//-------------------------------------------------------------
		//
		//
		//
		{
			xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-boxLabel", inputValue : true,
			name: "ND_Ass_Other",
			boxLabel : "Other"
		},
		{
			xtype : "NursingDocs_RATextarea", hidden : true,
			name : "ND_Ass_OtherComments",
			fieldLabel : " Comments"
		}
	]
});








Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Assessment" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_Assessment",
	name : "Nursing Documentation Assessment Tab",
	title: "Assessment",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			items : [
				{ xtype : "NursingDocs_PretreatmentAssesment"},
				{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
			]
		}
	]
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.PreTreatment" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_PreTreatment",
	name : "Nursing Documentation Pre Treatment Tab",
	title: "IV Site",

	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			defaults : { labelClsExtra : "NursingDocs-label" },
			items : [
				{ 
					title : "<abbr title=\"Intravenous\">IV</abbr> Access",
					name : "ND_PT_IVAccess",
					defaults : { labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
					items : [
/*********** OLD *******************
						{ xtype : "container",
							layout : "hbox",
							defaults : { labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
						items : [
							{ xtype : "datefield", labelWidth: 95, fieldLabel : "Date Accessed", width: 200, name : "ND_PT_IVA_Date" },
		
							// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
							{ xtype : "combo", 
								fieldLabel : "Device", 
								name : "ND_PT_IVA_Device",
								width : 180,
								store : { fields : [ "name", "value" ], data : [
								{name : "Peripheral IV", value : 1},  
								{name : "Port", value : 2},  
								{name : "Hickman", value : 3},  
								{name : "PICC", value : 4},  
								{name : "Central Line", value : 5}
							] }, displayField : "name", valueField : "value" },
		
							// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
							{ xtype : "combo", 
								fieldLabel : "Gauge", 
								name : "ND_PT_IVA_Gauge",
								width : 150,
								store : { fields : [ "name", "value" ], data : [
								{name : "22g", value : 1},  
								{name : "20g", value : 2}
							] }, displayField : "name", valueField : "value" },
		
							// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
							{ xtype : "combo", 
								fieldLabel : "Location", 
								name : "ND_PT_IVA_Location",
								width : 310,
								store : { fields : [ "name", "value" ], data : [
								{name : "Left Ventral Proximal Forearm", value : 1},  
								{name : "Right Ventral Proximal Forearm", value : 2},  
								{name : "Left Ventral Distal Forearm", value : 3},  
								{name : "Right Ventral Distal Forearm", value : 4},  
		
								{name : "Left Dorsal Proximal Forearm", value : 5},  
								{name : "Right Dorsal Proximal Forearm", value : 6},  
		
								{name : "Left Dorsal Distal Forearm", value : 7},  
								{name : "Right Dorsal Distal Forearm", value : 8},  

								{name : "Left Dorsum of hand", value : 9},  
								{name : "Right Dorsum of hand", value : 10},  
		
								{name : "Left Port", value : 11},  
								{name : "Right Port", value : 12},  
		
								{name : "Left Hickman", value : 13},  
								{name : "Right Hickman", value : 14},  
		
								{name : "Left PICC", value : 15},  
								{name : "Right PICC", value : 16}
		
							] }, displayField : "name", valueField : "value" }
						]
						},
						{ xtype : "textarea", grow : true, labelWidth: 95, fieldLabel : "Comments", name : "ND_PT_SA_Comments", width: 850 }
****************************************/
/********** NEW - SIC - 1 Aug 2012 ***************/
						{ xtype : "datefield", labelWidth: 95, fieldLabel : "Date Accessed", width: 200, name: "ND_PT_IVA_Date" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Device",
							name : "ND_PT_IVA_Device",
							width : 180,
							store : { fields : [ "name", "value" ], data : [
							{name : "Peripheral IV", value : 1},
							{name : "Port", value : 2},
							{name : "PICC", value : 4},
							{name : "Central Catheter", value : 5}
						] }, displayField : "name", valueField : "value" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Gauge",
							name : "ND_PT_IVA_Gauge",
							width : 150,
							store : { fields : [ "name", "value" ], data : [
							{name : "18g", value : 1},
							{name : "18g Non-Coring", value : 2},
							{name : "20g", value : 3},
							{name : "20g Non-Coring", value : 4},
							{name : "22g", value : 5},
							{name : "22g Non-Coring", value : 6},
							{name : "24g", value : 7},
							{name : "24g Non-Coring", value : 8}
						] }, displayField : "name", valueField : "value" },

						// MWB - 28 Feb 2012 - Currently this is static data but will eventually be replaced by a SQL Based Store
						{ xtype : "combo",
							fieldLabel : "Location",
							name : "ND_PT_IVA_Location",
							width : 310,
							store : {fields : [ "name", "value" ], data : [
							{name : "Left Ventral Proximal Forearm", value : 1},
							{name : "Right Ventral Proximal Forearm", value : 2},
							{name : "Left Ventral Distal Forearm", value : 3},
							{name : "Right Ventral Distal Forearm", value : 4},
							{name : "Left Dorsal Proximal Forearm", value : 5},
							{name : "Right Dorsal Proximal Forearm", value : 6},
							{name : "Left Dorsal Distal Forearm", value : 7},
							{name : "Right Dorsal Distal Forearm", value : 8},
							{name : "Left Dorsum of hand", value : 9},
							{name : "Right Dorsum of hand", value : 10},
							{name : "Left side of Chest", value : 11},
							{name : "Right side of Chest", value : 12}
							] }, displayField : "name", valueField : "value" }
/********** END NEW - SIC - 1 Aug 2012 ***************/
					]
				},

				{ 
					title : "Site Appearance",
					name : "ND_PT_SiteAppearance",
					defaults : { labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
					items : [ {
						xtype : "container",
						margin: "0 0 0 100", 
						layout : "hbox",
						defaultType: "checkboxfield",
						defaults : { margin : "5 10 5 0", labelAlign : "right", labelWidth: 60, labelClsExtra : "NursingDocs-label" },
						items : [
							{ boxLabel : "Absence of symptoms", name : "ND_PT_SA_Absence" },
							{ boxLabel : "Pain", name : "ND_PT_SA_Pain" },
							{ boxLabel : "Swelling", name : "ND_PT_SA_Swelling" },
							{ boxLabel : "Erythema", name : "ND_PT_SA_Redness" },
							{ boxLabel : "Line Disconnected/Port De Accessed", name : "ND_PT_SA_Removed" }
						]
					},
					{ xtype : "textarea", grow : true, labelWidth: 95, fieldLabel : "Comments", name : "ND_PT_SA_Comments", width: 850 }
					]
				},

				{ 
					title : "Brisk blood return verified",
					name : "ND_PT_BloodReturn",
					defaultType : "fieldcontainer",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
						{ 
							fieldLabel : "Pre treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_PreTreatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_PreTreatment", fieldLabel : "No"}  ]
						},
						{ 
							fieldLabel : "During treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_Treatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_Treatment", fieldLabel : "No"}  ]
						},
						{ 
							fieldLabel : "Post treatment",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_PT_BR_PostTreatment", fieldLabel : "Yes"},  { name : "ND_PT_BR_PostTreatment", fieldLabel : "No"}  ]
						},
						{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_PT_BR_Comments", width: 850 }
					]
				},

				{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_PT_SA_Comments", width: 850 },
				{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
			]
		}
	]
});

/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Treatment_Meds", {
	extend: "Ext.grid.Panel",
	alias : "widget.NursingDocs_Treatment_Meds",

	store : "ND_Treatment",

	autoScroll : true,
	columnLines : true,
	sortableColumns : false,
	enableColumnHide : false,
	enableColumnMove : false,
    features: [{ftype:'grouping'}],

	selType: "cellmodel",
	plugins: [
		// Event handler for this is assigned to the "beforeedit" event and calls the "CellEdit()" function in the TreatmentTab controller
		Ext.create("Ext.grid.plugin.CellEditing", {
			clicksToEdit: 1
		})
	],

	initComponent: function() {
		wccConsoleLog("Treatment Meds Grid - Initialization");
		this.columns = [
		{ header : "", dataIndex : "typeOrder", hidden : true,
	        renderer: function(value) {
				switch (value) {
					case 1:
						return "Pre Therapy";
					case 2:
						return "Therapy";
					case 3:
						return "Post Therapy";			
				}
			}
		},
		{ header : "Medication", dataIndex : "drug", width : 120 },
		{ header : "Dose", dataIndex : "dose", width : 50, editor: { allowBlank: false } },
		{ header : "Units", dataIndex : "unit", width : 70, editor : { 
				xtype: "combo", 
				store: "DrugUnitsStore", 
				displayField: "name", 
				valueField: "name" 
			} 
		}, 
		{ header : "Route", dataIndex : "route", width : 50, editor : { 
				xtype: "combo", 
				store: "InfusionStore", 
				displayField: "name", 
				valueField: "name" 
			} 
		},
		{ header : "Start Time", dataIndex : "StartTime", 
			// renderer: Ext.util.Format.dateRenderer("h:i A"),
			editor : {
				xtype : "timefield", 
				format : "h:i A",
				minValue: Ext.Date.parse("06:00 AM", "h:i A"),
				maxValue: Ext.Date.parse("08:00 PM", "h:i A"),
				increment: 15
			}
		},
		{ header : "End Time", dataIndex : "EndTime", 
			// renderer: Ext.util.Format.dateRenderer("h:i A"),
			editor : {
				xtype : "timefield", 
				format : "h:i A",
				minValue: Ext.Date.parse("06:00 AM", "h:i A"),
				maxValue: Ext.Date.parse("08:00 PM", "h:i A"),
				increment: 15
			}
		},
		{ header : "Comments", dataIndex : "Comments", width : 250, editor : { xtype : "textfield" } },
		{ header : "Signature", dataIndex : "Treatment_User", renderer: 
			function(value, metadata, record, rowIndex, colIndex, store, view) {
				var aStyle = "style=\"text-decoration:underline; color: navy;\" ";
				var dspValue = "Sign to Verify";
				if (value) {
					aStyle = "";
					dspValue = (value + " - " + record.get("Treatment_Date"));
				}
				return Ext.String.format("<span class=\"anchor TreatmentSigner\" {0}row={1} col={2}>{3}</span>", aStyle, rowIndex, colIndex, dspValue);
			},
			width : 200
		}

		
//		,{ xtype : "actionbuttoncolumn", width : 100, header : "Signature", items : [
//			{
//				text : "Sign to Verify",
//				eventName: "SignTreatment"
//			}
//		]}
	];


		


















		
		
		
		this.callParent(arguments);
	}
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Treatment" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_Treatment",
	name : "Nursing Documentation Treatment Tab",
	title: "Treatment",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			items : [
				{ xtype : "button", text : "Treatment Complete" },
				{
					title : "Medication Given",
					name : "ND_T_Meds",
					defaults : { margin : "5 0 30 0" },
					items : [
					// { xtype : "NursingDocs_Treatment_Meds", title : "Pre Therapy", name : "PreMedsGrid" },
					// { xtype : "NursingDocs_Treatment_Meds", title : "Therapy", name : "MedsGrid" },
					{ xtype : "NursingDocs_Treatment_Meds", title : "Treatment Administered", name : "AdministeredMedsGrid" }
						
					]
				},
				{ xtype : "button", text : "Treatment Complete", hidden : true }
			]
		}
	]
});

Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RASection" ,{
	extend: "Ext.form.RadioGroup",
	alias : "widget.NursingDocs_RASection",
	columns : 2,
	labelClsExtra : "NursingDocs-label", 
	labelAlign: "right",
	labelWidth: 150,
	width: 300,
	defaults : {
		labelAlign: "right",
		labelWidth : 30,
		width : 50
	}
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RAFieldset" ,{
	extend: "Ext.form.FieldSet",
	alias : "widget.NursingDocs_RAFieldset",
	collapsible : true,
	collapsed : true,
	defaultType : "NursingDocs_RASection"
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.RATextarea" ,{
	extend: "Ext.form.field.TextArea",
	alias : "widget.NursingDocs_RATextarea",
	labelAlign: "top", 
	labelWidth: 95, 
	width: 850, 
	height: 70, 
	grow : true,
	hidden : true,
	labelClsExtra : "NursingDocs-label"
});









Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.React_Assess" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_React_Assess",
	name : "Nursing Documentation Reaction/Assess Tab",
	title: "Infusion Reactions",
	items : [
		//------------------------------------------------------------------------------------
		//
		//	Extravasation
		//
		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Extravasation",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Heat",
					boxLabel : " Topical heating applied"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_HeatFreq",
					fieldLabel : "Frequency"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Cool",
					boxLabel : " Topical cooling applied"

				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_CoolFreq",
					fieldLabel : "Frequency"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Interventions",
					boxLabel : " Interventions"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_InterventionsGiven",
					fieldLabel : "Enter Interventions given"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Antidotes",
					boxLabel : " Antidotes"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_AntidotesGiven",
					fieldLabel : "Enter Antidotes given"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Measurements",
					boxLabel : " Measurements", labelAlign: "top"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_MeasurementsDetails",
					fieldLabel : "Enter Bi-Dimensional Measurements"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Edema",
					boxLabel : " Edema"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Erythema",
					boxLabel : " Erythema"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Discomfort",
					boxLabel : " Discomfort with movement"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_DiscomfortDetails",
					fieldLabel : "Enter Range of motion and describe discomfort felt"					
				},

				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_Xtrav_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_Xtrav_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},





		//------------------------------------------------------------------------------------
		//
		//	Cytokine-Release Syndrome
		//

		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Cytokine-Release Syndrome",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Fever",
					boxLabel : " Fever", width: 100
				},
				{ 
					xtype : "textfield", labelAlign: "right", labelClsExtra : "NursingDocs-label", hidden : true,
					name : "ND_RA_CRS_Temperature",
					fieldLabel : " - Temperature", labelWidth: 110
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Chills", 
					boxLabel : " Chills"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rigors", 
					boxLabel : " Rigors"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Nausea", 
					boxLabel : " Nausea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Hypotension", 
					boxLabel : " Hypotension", width: 100
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_HypotensionBP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_Systolic", width: 30 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_CRS_Diastolic", width: 30 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Tachycardia", 
					boxLabel : " Tachycardia", width: 100
				},

				{ xtype : "fieldcontainer", name: "ND_RA_CRS_TachycardiaPulse", hidden : true,
					fieldLabel : " - Pulse", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_CRS_Pulse", width: 150 },
					{ xtype : "displayfield", value : " (Highest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Asthenia", 
					boxLabel : " Asthenia"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Headache", 
					boxLabel : " Headache"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Rash", 
					boxLabel : " Rash", width: 100
				},
				{ 
					xtype : "textfield", labelAlign: "right", labelClsExtra : "NursingDocs-label", hidden : true,
					name : "ND_RA_CRS_RashDesc", 
					fieldLabel : " - Description", labelWidth: 110
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_TongueEdema", 
					boxLabel : " Tongue and Laryngeal Edema"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CRS_Dyspnea", 
					boxLabel : " Dyspnea"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_CRS_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CRS_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},

		//------------------------------------------------------------------------------------
		//
		//	Hypersensitivity or Anaphylaxis
		//

		{
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Hypersensitivity or Anaphylaxis",
			items : [
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Uneasiness", 
					boxLabel : " Uneasiness or Agitation"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_ChestTightness", 
					boxLabel : " Chest Tightness"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Hypotension", 
					boxLabel : " Hypotension"
				},

				{ xtype : "fieldcontainer", name: "ND_RA_HorA_HypotensionBP", hidden : true,
					fieldLabel : " - Blood Pressure", labelWidth: 110, 
					labelClsExtra : "NursingDocs-label",  defaults: { hideLabel : true }, layout : "hbox", items : [
					{ xtype : "textfield", name : "ND_RA_HorA_Systolic", width: 30 },
					{ xtype : "displayfield", value : " / " },
					{ xtype : "textfield", name : "ND_RA_HorA_Diastolic", width: 30 },
					{ xtype : "displayfield", value : " (Lowest value)" }
				]},

				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Dyspnea", 
					boxLabel : " Dyspnea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Wheezing", 
					boxLabel : " Wheezing"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Urticaria", 
					boxLabel : " Urticaria"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_PeriorbitalEdema", 
					boxLabel : " Periorbital or facial edema"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Abdominal", 
					boxLabel : " Abdominal"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Cramping", 
					boxLabel : " Cramping"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Diarrhea", 
					boxLabel : " Diarrhea"
				},
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_HorA_Nausea", 
					boxLabel : " Nausea"
				},
				// -----------------------------------------------------
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name: "ND_RA_HorA_Other",
					boxLabel : " Other"
				},
				{
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_HorA_OtherDetails",
					fieldLabel : "Enter description"					
				}
			]
		},

		//------------------------------------------------------------------------------------
		//
		//	Chemotherapy Reaction
		//
		{ 
			xtype : "NursingDocs_RAFieldset", collapsed : false,
			title : "Other",
			name : "ND_RA_ChemoReaction",
			items : [ 
				{
					xtype : "checkbox", boxLabelCls : "x-form-cb-label NursingDocs-label", inputValue : true,
					name : "ND_RA_CR_Reaction", 
					boxLabel : " Other"
				},
				{ 
					xtype : "NursingDocs_RATextarea",
					name : "ND_RA_CR_Comments",
					fieldLabel : "Comments", labelWidth: 110
				}
			]
		},

		{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
	]
});


Ext.define("COMS.view.NewPlan.CTOS.NursingDocs.Education" ,{
	extend: "Ext.panel.Panel",
	alias : "widget.NursingDocs_Education",
	name : "Nursing Documentation Education Tab",
	title: "Discharge Instructions",
	items : [
		{ xtype : "fieldset",
			padding : "10",
			defaultType : "fieldset",
			// defaults : { collapsible : true, collapsed : false },
			items : [
				{ xtype : "fieldset",
					title : "Patient Education",
					name : "ND_E_PatientEducation",
					defaultType : "fieldcontainer",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
						{ 
							fieldLabel : "Patient Education",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 30, width : 50 },
							items : [ { name : "ND_E_PE_Education", fieldLabel : "Yes"},  { name : "ND_E_PE_Education", fieldLabel : "No"}  ]
						},
						{ xtype : "textarea", grow : true, labelWidth: 95, labelAlign: "right", fieldLabel : "Comments", name : "ND_E_PE_E_Comments", width: 850 },

						{ 
							fieldLabel : "Follow up",  defaultType : "radiofield", layout : "hbox",
							defaults : { labelAlign: "right", labelWidth : 60, width : 90 },
							items : [ 
								{ name : "ND_E_PE_Followup", fieldLabel : "Inpatient"},  
								{ name : "ND_E_PE_Followup", fieldLabel : "Outpatient"}
							]
						},

						{ xtype : "container", name : "ND_E_PE_Outpatient", hidden : false, items : [

							
{ xtype : "datefield", labelWidth: 95, fieldLabel : "Next Chemotherapy Appt.", width: 200, name : "ND_E_ChemoAptDate" },
{ xtype : "datefield", labelWidth: 95, fieldLabel : "Next Clinic Appt.", width: 200, name : "ND_E_ClinicAptDate" },
{ xtype : "container", html : "Laboratory Test(s) Scheduled" },
{ xtype : "datefield", labelWidth: 95, margin: "10 0 0 50", fieldLabel : "", width: 200, name : "ND_E_LabTest1Date" },
{ xtype : "datefield", labelWidth: 95, margin: "10 0 0 50", fieldLabel : "", width: 200, name : "ND_E_LabTest2Date" },

				{ xtype : "fieldset",
					title : "Discharge Instructions",
					name : "ND_E_Discharge",
					defaults : { labelAlign: "right", labelWidth : 120, labelClsExtra : "NursingDocs-label"  },
					items : [ 
							{ xtype : "checkboxfield", 
								margin : "5 10 5 0", 
								labelWidth: 60, 
								boxLabel : "Patient was given Chemotherapy discharge instructions.", 
								name : "ND_E_DischargeInstrGiven" 
							},

				
							{ xtype : "combo", hidden : false, 
								fieldLabel : "Select Instructions",
								name : "ND_E_SelectDischargeInstr",
								width : 350,
								multiSelect : true,
								store : { fields : [ "name", "value" ], data : [
								{name : "Neutropenic Precautions", value : 1},  
								{name : "Diarrhea Management", value : 2},  
								{name : "EGFR Rash", value : 3},  
								{name : "Cold Sensitivity", value : 4}
							] }, displayField : "name", valueField : "value" },

					{ xtype : "container", hidden : false,
								name : "ND_E_DischargeInstr",
								width : 800,
								html : "<h2>No Instructions available at this time</h2>"
					},







							{ xtype : "textarea", 
								grow : true, 
								labelWidth: 95, 
								fieldLabel : "Comments", 
								name : "ND_E_Discharge_Comments", 
								width: 850 
							}
					]
				}







								]}		// END ND_E_PE_Outpatient
					]
				},
				{ xtype : "container", layout : "hbox", defaults : {margin: "5 0 0 20"}, items : [ { xtype : "button", text : "Save", action : "save" }, { xtype : "button", text : "Cancel"  } ]}
			]
		}
	]
});


Ext.define("COMS.store.ND_CTCAE_SOC", {
	extend : "Ext.data.Store",
	model : Ext.COMSModels.ND_CTCAE_SOC
});
Ext.define("COMS.store.ND_CTCAE_Data", {
	extend : "Ext.data.Store",
	model : Ext.COMSModels.ND_CTCAE_Data
});
/*jslint undef: true, unparam: true, sloppy: true, vars: true, white: true, maxerr: 50, indent: 4 */
Ext.define('COMS.view.NewPlan.CTOS.NursingDocs.Authenticate', {
	extend: 'Ext.window.Window',
	alias : 'widget.Authenticate',
	title : 'Authenticate',
	layout: 'fit',
	autoShow: true,
	width: 400,

	initComponent: function() {
            this.items = [ {
                    xtype: 'form',
                    cls: 'custom-form',
                    defaults : { labelAlign: 'top', margin: '5'},
                    items: [
							{ xtype : "RequiredFieldLabel" },
                            { xtype: "textfield", name : "AccessCode", labelWidth: 100, width: 178, fieldLabel: "Access Code <em>*</em>"  },
                            { xtype: "textfield", name : "VerifyCode", labelWidth: 100, width: 178, fieldLabel: "Verify Code <em>*</em>"  }
                    ]
            } ];
            
            this.buttons = [
                    { text: 'Sign Record', action: 'save' },
                    { text: 'Cancel', scope: this, handler: this.close }
            ];

            this.callParent(arguments);
	}
});

Ext.define("COMS.model.EoTSVitals", {
	extend: "Ext.data.Model",
	fields: [
		"DateTaken",
		"Height",
		"Weight",
		"BP",
		"Temperature",
		"Pain",
		"Pulse",
		"Respiration",
		"SPO2",
		"WeightFormula",
		"BSA_Weight",
		"BSA_Method",
		"BSA",
		"PSID",
		"PS"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSAllergies", {
	extend: "Ext.data.Model",
	fields: [
		"name",
		"type",
		"comment"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSAmputations", {
	extend: "Ext.data.Model",
	fields: [
		"description"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSMedAdmin", {
	extend: "Ext.data.Model",
	fields: [
		"day", "date", "dosage"
	],
	belongsTo : "COMS.model.EoTSMeds"
});
Ext.define("COMS.model.EoTSMeds", {
	extend: "Ext.data.Model",
	fields: [
		"name", "administered"
	],
	hasMany : [
		{ model : "COMS.model.EoTSMeds", name : "administered" }
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EoTSResponses", {
	extend: "Ext.data.Model",
	fields: [
		"day", "date", "desc"
	],
	belongsTo : "COMS.model.EndTreatmentSummary"
});

Ext.define("COMS.model.EndTreatmentSummary", {
	extend: "Ext.data.Model",
	fields: [
		"Name",
		"PatientID",			// GUID for the Patient
		"PAT_ID",
		"Gender",
		"Age",
		"DOB",
		"Amputations",
		"ClinicalTrial",
		"Allergies",
		"TemplateName",
		"TemplateID",
		"TemplateDescription",
		"TreatmentStatus",
		"TreatmentStart",
		"TreatmentEnd",
		"Vitals",
		"EndReason",
		"ProviderReport",
		"FollowUpAppointments",

		"Meds",
		"DiseaseResponse",
		"Toxicity",
		"Other"
	],

	hasMany : [
		{ model : "COMS.model.EoTSVitals", name : "Vitals" },
		{ model : "COMS.model.EoTSAllergies", name : "Allergies" },
		{ model : "COMS.model.EoTSAmputations", name : "Amputations" },
		{ model : "COMS.model.EoTSMeds", name : "Meds" },
		{ model : "COMS.model.EoTSResponses", name : "DiseaseResponse" },
		{ model : "COMS.model.EoTSResponses", name : "Toxicity" },
		{ model : "COMS.model.EoTSResponses", name : "Other" }
	],
	
	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.EoTS,
			create: Ext.URLs.EoTS,
			update: Ext.URLs.EoTS
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty: "msg"
		}
	}
});

Ext.define('COMS.view.NewPlan.ViewEndTreatmentSummary', {
	extend: 'Ext.window.Window',
	alias : 'widget.ViewEndTreatmentSummary',
	buttonAlign: 'center',
	name : "End of Treatment Summary",
	title : "End of Treatment Summary",

	autoEl : { tag : "section" },
	autoShow: true,
	width: 950,
	height: 800,
	layout : "fit",
	cls : "Report",
	items : [
		{ xtype: "container", name: "PatientInfoTableHeader", margin: "0 10 10 10", autoScroll: true, tpl: 
			new Ext.XTemplate(
				"{[this.Check(values)]}",
				"<h1>End of Treatment Summary</h1>",
				"<h2>Reason for generating End of Treatment Summary {EoTS.EndReason}</h2>",
				"<h2 style=\"margin-top: 1em;\">Patient Information for - {name}</h2>",
				"<table border=\"1\" class=\"InformationTable\">",
					"<tr>",
						"<th>Gender:</th><td>{Gender}</td>",
						"<th>Age:</th><td>{Age}</td>",
						"<th>Amputee:</th><td>{[this.Amputee(values)]}</td>",
					"</tr>",

					"<tr>",

						"<th>Template:</th><td colspan=\"5\">{EoTS.TemplateName} - {EoTS.TemplateDescription}</td>",
					"</tr>",

					"<tr>",
						"<th>Regimen Status:</th><td>{EoTS.TreatmentStatus}</td>",
						"<th>Regimen Start Date:</th><td>{EoTS.TreatmentStart}</td>",
						"<th>Regimen End Date:</th><td>{EoTS.TreatmentEnd}",
//							"<tpl if=\"''!== EoTS.TreatmentOriginalEnd\">",
//								"&nbsp;<em>(Original Scheduled End Date - {EoTS.TreatmentOriginalEnd})</em>",
//							"</tpl>",
						"</td>",
					"</tr>",
				"</table>",



						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><th>Type(s) of Cancer: </th><td colspan=3>",
								"<tpl for=\"Disease\">",
									"<div>{Type}&nbsp;-&nbsp;{Stage}</div>",
								"</tpl>",
							"</td></tr>",
							"<tr><th>Allergies: </th><td colspan=3>",
								"<table width=\"100%\" class=\"centerHead\"><tr><th>Name</th><th>Type</th><th>Comment</th></tr>",
								"<tpl for=\"Allergies\">",
									"<tr><td>{name}</td><td>{type}</td><td>{comment}</td>",
								"</tpl>",
								"</table>",
							"</td></tr>",
							"<tr><th>Clinical Trial: </th><td colspan=3>{ClinicalTrial}</td></tr>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Initial Vital Signs</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{EoTS.FirstVitals.DateTaken}</td>",
										"<td>{EoTS.FirstVitals.Height}</td>",
										"<td>{EoTS.FirstVitals.Weight}</td>",
										"<td>{EoTS.FirstVitals.BP}</td>",
										"<td>{EoTS.FirstVitals.Temperature}</td>",
										"<td>{EoTS.FirstVitals.Pain}</td>",
										"<td>{EoTS.FirstVitals.Pulse}</td>",
										"<td>{EoTS.FirstVitals.Respiration}</td>",
										"<td>{EoTS.FirstVitals.SPO2}</td>",
										"<td>{EoTS.FirstVitals.WeightFormula}</td>",
										"<td>{EoTS.FirstVitals.BSA_Weight}</td>",
										"<td>{EoTS.FirstVitals.BSA_Method}</td>",
										"<td>{EoTS.FirstVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{EoTS.FirstVitals.PSID} - {EoTS.FirstVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Final Vital Signs</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tr><td colspan=\"4\">",
								"<table width=\"100%\" class=\"centerHead\">",
									"<tr>",
										"<th>Date Vitals Taken</th>",
										"<th>Height</th>",
										"<th>Weight</th>",
										"<th>Blood Pressure</th>",
										"<th>Temperature</th>",
										"<th>Pain</th>",
										"<th>Pulse</th>",
										"<th>Respiration</th>",
										"<th><abbr title=\"Oxygen %\">SPO2</abbr></th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Weight</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr> Method</th>",
										"<th><abbr title=\"Body Surface Area\">BSA</abbr></th>",
									"</tr>",
									"<tr>",
										"<td>{EoTS.LastVitals.DateTaken}</td>",
										"<td>{EoTS.LastVitals.Height}</td>",
										"<td>{EoTS.LastVitals.Weight}</td>",
										"<td>{EoTS.LastVitals.BP}</td>",
										"<td>{EoTS.LastVitals.Temperature}</td>",
										"<td>{EoTS.LastVitals.Pain}</td>",
										"<td>{EoTS.LastVitals.Pulse}</td>",
										"<td>{EoTS.LastVitals.Respiration}</td>",
										"<td>{EoTS.LastVitals.SPO2}</td>",
										"<td>{EoTS.LastVitals.WeightFormula}</td>",
										"<td>{EoTS.LastVitals.BSA_Weight}</td>",
										"<td>{EoTS.LastVitals.BSA_Method}</td>",
										"<td>{EoTS.LastVitals.BSA}</td>",
									"</tr>",
									"<tr><th style=\"text-align: right\">Performance Status:</th>",
									"<td colspan=\"12\">{EoTS.LastVitals.PSID} - {EoTS.LastVitals.PS}</td></tr>",
								"</table>",
							"</td></tr>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Medications</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Meds\">",
									"{[this.Check1(values, parent)]}",
								"</tpl>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Disease Response</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.DiseaseResponse\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Disease Responses Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Toxicity Response</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Toxicity\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Toxicity Side Effects Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Other Comments</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
								"<tpl for=\"EoTS.Other\">",
									"<tpl if=\"''!== day\">",
										"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
									"</tpl>",
									"<tpl if=\"''=== day\">",
										"<tr><td colslan=\"4\">No Other Comments Recorded</td></tr>",
									"</tpl>",
//									"<tr><th style=\"width:10em;\">{day}</th><td style=\"width:10em;\">{date}</td><td>{desc}</td></tr>",
								"</tpl>",								
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Provider Report</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tpl if=\"''!== EoTS.ProviderReport\">",
								"<tr><td>{EoTS.ProviderReport}</td></tr>",
							"</tpl>",
							"<tpl if=\"''=== EoTS.ProviderReport\">",
								"<tr><td>No Provider Report listed</td></tr>",
							"</tpl>",
						"</table>",

						"<h2 style=\"margin-top: 1em; text-align: left;\">Follow-Up Appointments</h2>",
						"<table border=\"1\" class=\"InformationTable\">",
							"<tpl if=\"''!== EoTS.FollowUpAppointments\">",
								"<tr><td>{EoTS.FollowUpAppointments}</td></tr>",
							"</tpl>",
							"<tpl if=\"''=== EoTS.FollowUpAppointments\">",
								"<tr><td>No Follow-Up Appointments listed</td></tr>",
							"</tpl>",
						"</table>",

					"<br /><br />",
				{
					// XTemplate Configuration
					disableFormats: true,
					name : function(v, p) {
						return (v.name);
					},
					admin : function(v, p) {
						return ("<tr><th>" + v.day + "</th><td>" + v.date + "</td><td colspan=\"2\">" + v.dosage + "</td></tr>");
					},
					Check : function( v ) {
					},
					Check1 : function( v, p ) {
						// var Meds = v.EoTS.Meds;
						var buf = "";
						buf = "<tr><th style=\"text-align: left;\" colspan=\"4\">" + v.name + "</th></tr>";
						var i, aLen = v.administered.length, aBuf;
						if (0 === aLen) {
							buf += "<tr><td colspan=\"4\">No " + v.name + " administered</td></tr>"
						}
						else {
							for (i = 0; i < aLen; i++) {
								aBuf = v.administered[i];
								buf += "<tr><th style=\"width:10em;\">" + aBuf.day + "</th><td style=\"width:10em;\">" + aBuf.date + "</td><td colspan=\"2\">" + aBuf.dosage + "</td></tr>"
							}
						}
						return(buf);
					},
					Amputee : function(a) {
						// Amputee info is now an array of descriptions
						var retBuf = "None";
						if (a.Amputations) {
							var ampu = a.Amputations;
							var i, len = ampu.length, buf = "";
							if (len > 0) {
								for (i =0; i < len; i++) {
									buf += ampu[i].description + "<br>";
								}
								return (buf);
							}
						}
						return(retBuf);
					}
				}
			)
		}
	],
	buttons : [
		{ text: "Close", action: "cancel" }
	],
	initComponent: function() {
		wccConsoleLog("End of Treatment Summary View - Initialization");
		this.callParent(arguments);
	}
});

Ext.define('Ext.ux.grid.column.ActionButtonColumn', {

    extend: 'Ext.grid.column.Column',
    alias: ['widget.actionbuttoncolumn'],
    alternateClassName: 'Ext.grid.ActionButtonColumn',

    /**
* @cfg {Function} handler A function called when the button is clicked.
* The handler(or event) is passed the following parameters:<div class="mdetail-params"><ul>
* <li><code>view</code> : TableView<div class="sub-desc">The owning TableView.</div></li>
* <li><code>rowIndex</code> : Number<div class="sub-desc">The row index clicked on.</div></li>
* <li><code>colIndex</code> : Number<div class="sub-desc">The column index clicked on.</div></li>
* </ul></div>
*/

    /**
* @cfg {Array} items An Array which may contain multiple button definitions, each element of which may contain:
* <div class="mdetail-params"><ul>
* <li><code>text</code> : String<div class="sub-desc">The button text to be used as innerHTML (html tags are accepted).</div></li>
* <li><code>iconIndex</code> : String<div class="sub-desc">Optional, however either iconIndex or iconCls must be configured. Field name of the field of the grid store record that contains css class of the button to show. If configured, shown icons can vary depending of the value of this field.</div></li>
* <li><code>hideIndex</code> : String<div class="sub-desc">Optional. Field name of the field of the grid store record that contains hide flag (falsie [null, '', 0, false, undefined] to show, anything else to hide).</div></li>
* <li><code>showIndex</code> : String<div class="sub-desc">Optional. This is the polar opposite of hideIndex. Will show this button if the field specified is truethy</div></li>.
* <li><code>eventName</code> : String<div class="sub-desc">Optional. This is a unique name for an event that will get created on the parent gridview. (ignored if handler is specified)</div></li>
* <li><code>handler</code> : Function<div class="sub-desc">A function called when the button is clicked.</div></li>
* <li><code>scope</code> : Ref<div class="sub-desc">The scope (<em>this</em>) of the handler function.</div></li>
* <li><code>cls</code> : String<div class="sub-desc">cls spefies the class of the button. In addition, if there is no handler or eventName set the class is stripped down to Alpha characters and suffixed with "click" to create an event on the parent gridview</div></li>
* </ul></div>
*/
    header: '&#160;',

    sortable: false,
    btns: [],
    constructor: function(config) {

        var me = this,
        cfg = Ext.apply({}, config),
        items = cfg.items || [me],
        l = items.length,
        i,
        item;
        me.btns = new Ext.util.MixedCollection();
        // This is a Container. Delete the items config to be reinstated after construction.
        delete cfg.items;
        me.callParent([cfg]);

        // Items is an array property of ActionButtonColumns
        me.items = items;
        var gv = '';

        // Renderer closure iterates through items creating a button element for each and tagging with an identifying
        me.renderer = function(v, meta, rec, rowIndex, colIndex, store, view) {
			if ("COMS.store.ND_Treatment" === store.$className) {		// HACK to get past signing button column
				if (Ext.ColSigned) {
					if (Ext.ColSigned[rowIndex]) {
						return Ext.ColSigned[rowIndex];
					}
				}
			}

            if (gv == '') {
                gv = view;

                var evnts = {
                    'actionbuttonclick':true
                }
                Ext.Array.each(items, function(btn) {
                    if (btn.handler) { }
                    else if (btn.eventName) {
                        evnts[btn.eventName] = true;
                    } else if (btn.cls) {
                        var evntName = btn.cls.replace(/[^a-zA-Z]/,'')+'click';
                        evnts[evntName]=true;
                    }
                });
                view.addEvents(evnts);
            }

            // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
            v = Ext.isFunction(cfg.renderer) ? cfg.renderer.apply(this, arguments)||'' : '';

            meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';

            for (i = 0; i < l; i++) {

                item = items[i];

                var nid = Ext.id();
                var cls = Ext.baseCSSPrefix + 'action-col-button ' + Ext.baseCSSPrefix + 'action-col-button-' + String(i)+(item.cls ? ' '+item.cls : '');
                var iconCls = item.iconIndex ? rec.data[item.iconIndex] : (item.iconCls ? item.iconCls : '');
                var fun = Ext.emptyFn;
                var context = me;
                if (item.handler) {
                    if (item.context) {
                        context = item.context;
                    }
                    fun = Ext.bind(item.handler, context, [view, rowIndex, colIndex]);
                }
                else {
                    (function(item) {
                        var eventName = 'actionbuttonclick';
                        if (typeof item.eventName != 'undefined') {
                            eventName = item.eventName;
                        } else if (typeof item.cls != 'undefined') {
                            eventName = item.cls.replace(/[^a-zA-Z]/,'')+'click';
                        }
                        fun = function() {
                            if (eventName != 'actionbuttonclick') {
                                view.fireEvent('actionbuttonclick', this, view, rowIndex, colIndex);
                            }
                            view.fireEvent(eventName, view, rowIndex, colIndex);
                        }
                    })(item);
                }
                var hide;
                if (typeof item.showIndex != 'undefined') {
                    hide = !rec.data[item.showIndex];
                } else if (typeof item.hideIndex != 'undefined') {
                    hide = rec.data[item.hideIndex];
                }

                Ext.Function.defer(me.createGridButton, 100, me, [item.text, nid, rec, cls, fun, hide, iconCls]);

                v += '<div id="' + nid + '">&#160;</div>';
            }
            return v;
        };
    },

    createGridButton: function(value, id, record, cls, fn, hide, iconCls) {
        var target = Ext.get(id);
        if (target !== null) {
            var btn = new Ext.Button({
                text: value,
                cls: cls,
                iconCls: iconCls,
                hidden: hide,
                handler: fn,
                renderTo: target.parent()
            });
            this.btns.add(btn);
            Ext.get(id).remove();
        }
    },

    destroy: function() {
        delete this.items;
        delete this.renderer;
        this.btns.each(function(btn){
            btn.destroy();
        });
        return this.callParent(arguments);
    },

    cascade: function(fn, scope) {
        fn.call(scope||this, this);
    },

    // Private override because this cannot function as a Container, and it has an items property which is an Array,
    // NOT a MixedCollection.
    getRefItems: function() {
        return [];
    }
});

Ext.define("COMS.model.ND_Treatment", {
	extend: "Ext.data.Model",
	fields : [
		"patientID",			// GUID for the Patient
		"templateID",			// GUID for the Template
		"PAT_ID",				// GUID for the Treatment record
		"Cycle",
		"CourseNum",			// MWB - 6/17/2012 - This is really the "Cycle"
		"adminDay",
		"adminDate",
		"type",			// Indicates type of Therapy this record is for e.g. PreTherapy, Therapy, PostTherapy
		"typeOrder",	// Used to display therapy type in grid in sorted order (Pre = 1, Therapy = 2, Post = 3)
		"drug",
		"dose",
		"unit",
		"route",
		"StartTime",
		"EndTime",
		"Comments",
		"User",
		"Treatment_User",
		"Treatment_Date",		// Time/Date stamp of when the treatment was recorded
		"drug_originalValue",
		"dose_originalValue",
		"unit_originalValue",
		"route_originalValue",
		"orderstatus"
	],

	proxy: {
		type: "rest",
		api: {
			read: Ext.URLs.ND_Treatment,	// this is really /Order/Orders <--- MWB - 6/29/2012 Removed for testing???
			// read: Ext.URLs.ReadND_Treatment,		// Parameter = PAT_ID -> "/NursingDoc/Treatment/<PAT_ID>",
			create: "/NursingDoc/Treatment",
			update: "/NursingDoc/Treatment"
		},
		reader: {
			type: "json",
			root : "records",
			successProperty : "success",
			messageProperty : "msg"
		}
	}
});
Ext.define('COMS.controller.Navigation', {
	extend: 'Ext.app.Controller',
	// Views can be referenced here before they are declared in 
	// app.js, but they DO need to be referenced here 
	// before they are listed in the NavigationTabs Controller
	// else a "namespace is undefined" error occurs
	views: [
		'NavigationTabs'
		, 'NewPlan.NewPlanTab'
		, 'Authoring.AuthoringTab'
		, 'ExistingPlan.ExistingPlanTab'
		, 'KnowledgeBase.KnowledgeBaseTab'
		, 'Messages.MessagesTab'
		, 'Management.ManagementTab'
		, 'Management.AdminTab' // KD - 12/20/11 - Added new URI to PUT data back to PHP
		],

	// For this controller the following is mostly for debugging
	// It should be removed prior to releasing to production
	init: function () {
		wccConsoleLog('Initialized Navigation Controller!');
		this.control({
			'NavigationTabs': {
				render: this.onPanelRendered,
				beforetabchange: this.tabChanged
			}
		});
	},

	tabChanged: function (tabPanel, newCard, oldCard, eOpts) {
		var editTemplate = this.application.btnEditTemplatClicked;
		var newPlanCtl = this.getController("NewPlan.NewPlanTab");
		var authoringCtl = this.getController("Authoring.AuthoringTab");
		var adminCtl = this.getController("Management.AdminTab");

		var existingTemplate;
		var template = null;

		if ("Orders" === newCard.title) {
			try {
				var theStore = Ext.getStore("OrdersStore");
				if (theStore) {
					theStore.removeAll(true);
					theStore.load();
				}
			}
			catch (e) {
				alert("Store Load Error in Navigation.js");
			}
		}

		if (!editTemplate && "Template Authoring" == newCard.title && "Start New Plan" == oldCard.title) {
			if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()) {
				template = newPlanCtl.getMyTemplates();
			} else if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()) {
				template = newPlanCtl.getTemplate();
			}

			if (null != template) {
				template.clearValue();
				newPlanCtl.getDiseaseStage().clearValue();

				newPlanCtl.collapseCombo(template, null);
				newPlanCtl.collapseCombo(newPlanCtl.getDiseaseStage(), null);
			}

			existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
			if (existingTemplate.getValue()) {
				authoringCtl.getTemplate().clearValue();
				authoringCtl.getExistingDiseaseStage().clearValue();

				authoringCtl.collapseCombo(authoringCtl.getTemplate(), null);
				authoringCtl.collapseCombo(authoringCtl.getExistingDiseaseStage(), null);
			}
		}

		if (editTemplate && "Start New Plan" == newCard.title && "Template Authoring" == oldCard.title) {
			this.application.btnEditTemplatClicked = false;
		}

		if (!editTemplate && "Admin" == newCard.title) {
			template = null;

			if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()) {
				template = newPlanCtl.getMyTemplates();
			} else if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()) {
				template = newPlanCtl.getTemplate();
			}

			if (null != template) {
				template.clearValue();
				newPlanCtl.getDiseaseStage().clearValue();

				newPlanCtl.collapseCombo(template, null);
				newPlanCtl.collapseCombo(newPlanCtl.getDiseaseStage(), null);
			}

			existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
			if (existingTemplate.getValue()) {
				authoringCtl.getTemplate().clearValue();
				authoringCtl.getExistingDiseaseStage().clearValue();

				authoringCtl.collapseCombo(authoringCtl.getTemplate(), null);
				authoringCtl.collapseCombo(authoringCtl.getExistingDiseaseStage(), null);
			}
			adminCtl.getTemplateGrid().getStore().removeAll();
		}
	},

	onPanelRendered: function () {
		wccConsoleLog('Main Navigation Tab Panel has been rendered');
	}
});
/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 6/1/2012

Ext.define("COMS.controller.NewPlan.NewPlanTab", {
    extend : "Ext.app.Controller",

    stores : [
    "Patients"	// Used by the "SelectPatient", "PatientInfo" views
    , "PatientHistory"
    , "LabInfo"
    , "TemplateSources"
    , "DiseaseType"
    , "DiseaseStage"
    , "Templates"
    , "CTOS"
    , "PerfStatStore"
    ],



	models : ["LabInfo"],

    views : [
    "NewPlan.NewPlanTab"
	,"NewPlan.PatientSelection"
	,"NewPlan.SelectPatient"
    ,"NewPlan.PatientInfo"
    ,"NewPlan.PatientInfoTable"
    ,"NewPlan.PatientTemplates"
    ,"NewPlan.PatientHistory"
    ,"NewPlan.LabInfo"
    // MWB - 12/12/2011
    // Removed - During 09-Dec customer meeting, client said DiagImage & Pharmacy were not needed
    // Also removed from PatientInfor view
    // "NewPlan.DiagImage",
    // "NewPlan.Pharmacy",
    ,"NewPlan.OEM"	// MWB - 16-Jan-2012 - Added new view


	,"NewPlan.CTOS"
    ,"NewPlan.CTOS.PatientSummary"	// MWB 27-Jan-2012 - Added new view
//    ,"NewPlan.CTOS.FlowSheet"		// MWB 27-Jan-2012 - Added new view
    ,"NewPlan.CTOS.NursingDocs"		// MWB 27-Jan-2012 - Added new view
    ,"NewPlan.CTOS.KnowledgeBase"	// MWB 27-Jan-2012 - Added new view


    ,'Common.Search4Template'
    ,"Common.selCTOSTemplate"
    ,"Common.selTemplateType"
    ,"Common.selDiseaseAndStage"
    ,"Common.selDisease"
    ,"Common.selDiseaseStage"
    ,"Common.selTemplate"
	,"Common.VitalSignsHistory"
    ,"NewPlan.dspTemplateData"
    ,"NewPlan.AddDate"
	,"NewPlan.EndTreatmentSummary"
    ],

    refs: [
		{ ref: "ApplyTemplateBtn",				selector: "NewPlanTab CTOS button[name=\"Apply\"]"},
		{ ref: "EditTemplateBtn",				selector: "NewPlanTab CTOS button[name=\"Edit\"]"},
		{ ref: "ResetButton",					selector: "NewPlanTab PatientInfo CTOS selCTOSTemplate button[title=\"ResetFilter\"]"},
		{ ref: "PatientInfo",					selector: "NewPlanTab PatientInfo"},
		{ ref: "PatientInfoTable",				selector: "NewPlanTab PatientInfo PatientInfoTable"},
		{ ref: "PatientInfoTableInformation",	selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableBSACalcs",		selector: "NewPlanTab PatientInfo PatientInfoTable container[name=\"BSAInfoTable\"]"},
		{ ref: "PatientTemplates",				selector: "NewPlanTab PatientInfo PatientTemplates"},
		{ ref: "PatientHistory",				selector: "NewPlanTab PatientInfo PatientHistory"},
		{ ref: "PatientHistoryGeneral",			selector: "NewPlanTab PatientInfo PatientHistory [name=\"General Patient History\"]"},
		{ ref: "LaboratoryInfo",				selector: "NewPlanTab PatientInfo LabInfo"},
		{ ref: "VitalSigns",					selector: "NewPlanTab PatientHistory VitalSignsHistory"},
		{ ref: "NDGI_VitalSigns",				selector: "NursingDocs_GenInfo VitalSignsHistory"},
		{ ref: "selCTOSTemplate",				selector: "NewPlanTab selCTOSTemplate"},
		{ ref: "selTemplateType",				selector: "NewPlanTab PatientInfo CTOS selTemplateType"},
		{ ref: "DiseaseAndStage",				selector: "NewPlanTab PatientInfo CTOS selCTOSTemplate selDiseaseAndStage"},
		{ ref: "Disease",						selector: "NewPlanTab PatientInfo CTOS selCTOSTemplate selDiseaseAndStage selDisease"},
		{ ref: "DiseaseStage",					selector: "NewPlanTab PatientInfo CTOS selCTOSTemplate selDiseaseAndStage selDiseaseStage"},
		{ ref: "Template",						selector: "NewPlanTab PatientInfo CTOS selTemplate[name=\"AllTemplates\"]"},
		{ ref: "MyTemplates",					selector: "NewPlanTab PatientInfo CTOS selTemplate[name=\"MyTemplates\"]"},
		{ ref: "CTOSDataDsp",					selector: "NewPlanTab PatientInfo CTOS dspTemplateData"},
		{ ref: "AuthoringTab",					selector: "AuthoringTab"},
		{ ref: "NavigationTabs",				selector: "NavigationTabs"},
		{ ref: "SelectPatientSection",			selector: "NewPlanTab SelectPatient"},
		{ ref: "PatientSelectionPanel",			selector: "NewPlanTab PatientSelection"},
		{ ref: "NewPlanTab",					selector: "NewPlanTab"},
		{ ref: "SelectPatient",					selector: "NewPlanTab SelectPatient combobox"},
		{ ref: "ConfirmPatient",				selector: "NewPlanTab SelectPatient container[name=\"Confirm\"]"},
		{ ref: "CTOS",							selector: "NewPlanTab CTOS"},
		{ ref: "TypeOfTrial",					selector: "AddDate textfield[name=\"TypeOfTrial\"]"},
		{ ref: "Goal",							selector: "AddDate form radiogroup[name=\"goalRadio\"]"},
		{ ref: "AmputeeType",					selector: "AddDate form panel[name=\"amputationLocation\"]"}
                
    ],


    init: function() {
        wccConsoleLog("Initialized New Plan Tab Panel Navigation Controller!");
        this.application.btnEditTemplatClicked=false;
        this.control({
            "NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]" : {
                change : this.TemplateTypeSelected
            },

			"NewPlanTab PatientSelection textfield[name=\"CPRS_QueryString\"]" : {
				specialkey : this.QSEnter
			},

            "NewPlanTab PatientSelection": {
                render: this.onPanelRendered
            },
            "NewPlanTab SelectPatient combobox" : {
                select : this.PatientSelected
            },

            "NewPlanTab PatientInfo CTOS selTemplateType" : {
                select : this.onTemplateTypeChange
            },
            "NewPlanTab PatientInfo CTOS selDisease" : {
                select : this.DiseaseSelected,
                collapse: this.collapseCombo,
                expand: this.loadCombo
            },
            //KD - 01/23/2012 - Added collapse and expand handlers for disease stage combo
            //This was done to handle the loading issues when going back and forth between
            //CTOS and Template Authoring and random Loading issues.
            "NewPlanTab PatientInfo CTOS selDiseaseStage" : {
                select : this.onDiseaseStageChange,
                collapse: this.collapseCombo,
                expand : this.loadCombo
            },
            "NewPlanTab PatientInfo CTOS selTemplate" : {
                select : this.selTemplateChange,
                collapse: this.collapseCombo,
                expand : this.loadCombo
            },
            "NewPlanTab CTOS button[name=\"Apply\"]" : {
                click: this.applyTemplateToPatient
            },
            "NewPlanTab CTOS button[name=\"Edit\"]" : {
                click: this.editTemplate
            },
            "NewPlanTab PatientInfo CTOS selCTOSTemplate button[title=\"ResetFilter\"]" : {
                click: this.resetTemplateFilter
            },

            'AddDate button[action="save"]': {
                click: this.ApplyTemplate
            },
            'AddDate button[action="cancel"]': {
                click: this.cancelDate
            },
            'AddDate form radiogroup[name=\"clinicalTrialRadio\"]':{
                change : this.ClinicalTrialTypeSelected  
            },
            'AddDate form radiogroup[name=\"amputeeRadio\"]':{
                change : this.AmputeeSelected  
            }
        });
    },



    onPanelRendered: function() {
        wccConsoleLog("New Plan Tab Panel has been rendered");
		// Grabs all the buttons within the "PatientSelection" container of the "NewPlanTab" container
		var Btns = Ext.ComponentQuery.query("NewPlanTab [name=\"PatientSelection\"]")[0].el.select("button.anchor");
		Btns.on("click", this.handlePatientSelectionClickEvent, this);
    },





    AmputeeSelected: function (rbtn, newValue, oldValue, eOpts ) {
        wccConsoleLog("User has selected Amputee Type");

        if (true === newValue.Amputee) {	
            this.getAmputeeType().show();
        }
        else {	
            this.getAmputeeType().hide();
        }

    },

    ClinicalTrialTypeSelected: function (rbtn, newValue, oldValue, eOpts ) {
        wccConsoleLog("User has selected Clinical Trial Type");

        if (true === newValue.ClinicalTrial) {	
            this.getTypeOfTrial().show();
        }
        else {	
            this.getTypeOfTrial().hide();
        }

    },

	// Save button for the AddDate Widget. This widget is for applying a new template to a patient
    ApplyTemplate: function(button){
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
        var amputations = [];
        
        if('' === values.startdate){
            Ext.MessageBox.alert('Invalid', 'You must select a start date.');
            return;
        }
        
        if(null == values.BSA_FormulaWeight){
            Ext.MessageBox.alert('Invalid', 'You must select a Weight Formula.');
            return;
        }
        
        if(null == values.BSA_Formula){
            Ext.MessageBox.alert('Invalid', 'You must select a BSA Formula.');
            return;
        }

        if(null == values.Goal){
            Ext.MessageBox.alert('Invalid', 'You must select a Goal.');
            return;
        }
        
        if(null == values.PerfStatus){
            Ext.MessageBox.alert('Invalid', 'You must select a Performance Status.');
            return;
        }

        if(null == values.ClinicalTrial){
            Ext.MessageBox.alert('Invalid', 'Please select either Yes to specify a type of clinical trial or select No.');
            return;
        }
        
        if(true === values.ClincalTrial && '' === values.TypeOfTrial){
            Ext.MessageBox.alert('Invalid', 'Please enter the type of Clinical Trial.');
            return;
        }
        
        if(true === values.Amputee){
            var amputationsCB = Ext.ComponentQuery.query('AddDate form panel checkboxgroup[name=\"amputations\"]')[0];
            var checkedVals = amputationsCB.getChecked();
			var i;

            if(0 === checkedVals.length){
                Ext.MessageBox.alert('Invalid', 'You must select an Amputation Type.');
                return;
            }

            for(i=0;i<checkedVals.length;i++){
                amputations.push(checkedVals[i].boxLabel);
            }
        }
        
        var startDate = Ext.Date.dateFormat(new Date(values.startdate), 'Y-m-j');		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        var today = Ext.Date.dateFormat(new Date(), 'Y-m-j');
		var TemplateInfo = this.application.CurrentTemplate.data;
		var MaxCycles = TemplateInfo.CourseNumMax;
		var CycleLength = TemplateInfo.CycleLength; // (need to convert to days... 8 == weeks...
		var CycleLengthUnit = TemplateInfo.CycleLengthUnit[0].name;
		switch (CycleLengthUnit) {
			case "Weeks":
				CycleLength = CycleLength * 7;
				break;
			case "Months" : 
				CycleLength = CycleLength * 30;
				break;
			case "Years" : 
				CycleLength = CycleLength * 365;
				break;		
		}
		var RegimenDuration = CycleLength * MaxCycles;
        var future;

        win.close();

        Ext.MessageBox.show({
            msg: 'Applying template, please wait...',
            progressText: 'Applying...',
            width:300,
            wait:true,
            waitConfig: {interval:200},
            icon:'ext-mb-download' //custom class in COMS.css
        });

        startDate = Ext.Date.dateFormat(new Date(values.startdate), 'Y-m-j');		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        today = Ext.Date.dateFormat(new Date(), 'Y-m-j');
        future = Ext.Date.dateFormat(Ext.Date.add(new Date(values.startdate), Ext.Date.DAY, RegimenDuration),'Y-m-j');

        var newCtl = this.getController("NewPlan.NewPlanTab");

        var patientTemplate = Ext.create(Ext.COMSModels.PatientTemplates, {
            PatientId: this.application.Patient.id,
            TemplateId: this.application.Patient.Template.id,
            DateApplied : today,
            DateStarted : startDate,
            DateEnded : future,
            Goal : values.Goal,
            ClinicalTrial: values.TypeOfTrial,
            PerformanceStatus: values.PerfStatus,
            WeightFormula: values.BSA_FormulaWeight,
            BSAFormula: values.BSA_Formula,
            BSA_Method: values.BSA_Formula,
            Amputations: amputations
             
        });

		patientTemplate.save({
            scope: this,
            success: function (data) {
                wccConsoleLog("Saved Template " );
					Ext.MessageBox.hide();
					// Ext.MessageBox.alert('Success', 'Template applied to Patient ');

					/**********
					 *	data.data = {
					 *	Amputations :  []
					 *	BSAFormula :  "DuBois"
					 *	ClinicalTrial :  ""
					 *	DateApplied :  "2012-05-25"
					 *	DateEnded :  "2012-11-9"
					 *	DateStarted :  "2012-05-25"
					 *	Goal :  "Curative"
					 *	PatientId :  "B1781155-AAA6-E111-903E-000C2935B86F"
					 *	PerformanceStatus :  "72DA9443-FF74-E111-B684-000C2935B86F"
					 *	TemplateId :  "2C987ADB-F6A0-E111-903E-000C2935B86F"
					 *	WeightFormula :  "Actual Weight"
					 *	id :  "519C8379-AAA6-E111-903E-000C2935B86F" <-- TreatmentID for linking all records together
					 *	}
					 ***********/
					this.PatientModelLoadSQLPostTemplateApplied(data.data.PatientId, data.data.id);
            },
            failure : function(record, op) {

                wccConsoleLog("Apply Template Failed");
                Ext.MessageBox.hide();
                Ext.MessageBox.alert('Failure', 'Template not applied to Patient. <br />' + op.request.scope.reader.jsonData["frameworkErr"]);

            }
        });

    },
    cancelDate: function(button){

    },



	HandleTemplateBtnClicks : function (event, element) {
		wccConsoleLog("HandleTemplateBtnClicks - PatientInfoTable!");
		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;
		var tab2switch2 = element.getAttribute("tabtype");
		var btnName = element.getAttribute("name");
		var Patient = this.application.Patient;
		var FncName = "Unknown ";


		switch (btnName) {
			case "ShowTemplateDetails":
				fncName = "Show Details";
				templateName = element.getAttribute("templatename");
				templateID = element.getAttribute("templateid");
	
				this.CTOS_DataLoad2(templateID);
				CTOSTabs = this.getCTOS();
		        CTOSTabs.setActiveTab(0);		// Show the CTOS Tab


				fncName = "";
				break;
			case "GenerateEoTS":
				fncName = "Generate End of Treatment Summary";
				this.application.Patient.EoTS_TemplateID = element.getAttribute("templateid");
				this.application.Patient.EoTS_TemplateName = element.getAttribute("templatename");
				this.application.Patient.EoTS_Type = "Generate";

				Ext.widget("EndTreatmentSummary");
				fncName = "";
				break;
			case "ShowEoTS":
				fncName = "Show End of Treatment Summary";
				this.application.Patient.EoTS_TemplateID = element.getAttribute("templateid");
				this.application.Patient.EoTS_TemplateName = element.getAttribute("templatename");
				this.application.Patient.EoTS_ID = element.getAttribute("EotsID");
				this.application.Patient.EoTS_Type = "Show";
		        this.application.loadMask("Loading End of Treatment Summary Information...");
				delete(this.application.Patient.EoTS);	// Clear out any previous EoTS info just in case...

				Ext.Ajax.request({
					scope : this,
					url: Ext.URLs.EoTS + "/" + this.application.Patient.EoTS_ID,
					success: function( response, opts ){
						this.application.unMask();
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						if (resp.success) {
							if (resp.records[0]) {
								this.application.Patient.EoTS = resp.records[0];
								Ext.widget("ViewEndTreatmentSummary");
							}
							else {
								alert("No records available for this EoTS");
							}
						}
						else {
							alert("load EoTS - Error");
						}
					},
					failure : function( response, opts ) {
						this.application.unMask();
						alert("EoTS Data Load Failed...");
					}
				});


				fncName = "";
				break;
		}
		if ("" !== fncName) {
			alert(fncName + " - NewPlanTab.js-HandleTemplateBtnClicks() function not yet available");
		}
	},



	getPatientDataAsString : function() {
		var PatientInfo = this.application.Patient;
		var PatientData = "";
		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;
		var xx, yy, tmpData, tempBSA, DataEl, OEMData, OEM_Data_Record;

		for (DataEl in PatientInfo){
			if (PatientInfo.hasOwnProperty(DataEl)) {
				tmpData = "";
				xx = PatientInfo[DataEl];
				if ("string" === (typeof xx)){
					tmpData = xx;
				}
				else if ("number" === (typeof xx)){
					tmpData = xx;
				}
				else if ("boolean" === (typeof xx)){
					tmpData = xx;
				}
				else {
					if (null !== xx) {
						tmpData = " - " + xx.length + " Record";
						if (1 !== xx.length) {
							tmpData += "s";
						}
					}
					switch (DataEl) {
					case "Amputations":
						var i;
						tmpData += "<ul>";
						for (i = 0; i < xx.length; i++) {
							tmpData += "<li style=\"margin-left: 1em;\">" + xx[i].description + "</li>";
						}
						tmpData += "</ul>";
						break;

					case "Vitals":
						tmpData += "<ul>";
						tmpData += "</ul>";
						break;

					case "Allergies":
						tmpData += "<ul>";
						tmpData += "</ul>";
						break;

					case "History":
						tmpData += "<ul>";
						tmpData += "</ul>";
						break;

					case "OEMRecords":
						tmpData = "<ul>";
						yy = xx;
						for (OEMData in yy) {
							if (yy.hasOwnProperty(OEMData)) {
								OEM_Data_Record = yy[OEMData];
								OEMTmpData = "";
								if ("string" === (typeof OEM_Data_Record)){
									OEMTmpData = OEM_Data_Record;
								}
								else if ("number" === (typeof OEM_Data_Record)){
									OEMTmpData = OEM_Data_Record;
								}
								else if ("boolean" === (typeof OEM_Data_Record)){
									OEMTmpData = OEM_Data_Record;
								}
								else {
									switch (OEMData) {
										case "OEMRecords":
											OEMTmpData = " - " + OEM_Data_Record.length + " Records";
											break;

										default:
											OEMTmpData = "NYA - " + (typeof OEM_Data_Record);
											break;
									}
								}
								tmpData += "<li style=\"margin-left: 1em;\"><b>" + OEMData + "</b> - " + OEMTmpData + "</li>";
							}
						}
						tmpData += "</ul>";
						break;

					case "TemplateHistory":
						tmpData += "<ul>";
						tmpData += "Array of Template History Data goes here";
						tmpData += "</ul>";
						break;

					case "Disease":
						tmpData += "<ul>";
						tmpData += "Array of Disease Data goes here";
						tmpData += "</ul>";
						break;

					default:
						tmpData = "NYA - " + (typeof xx);
						break;
					}
				}
				PatientData += "<li><b>" + DataEl + "</b> - " + tmpData + "</li>";
			}
		}
		return (PatientData);
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
	// MWB 31 Jan 2012 - Added control for the BSA Anchor
	// MWB 09 Feb 2012 - Added additional param - DateTaken
	HandleAnchorClicks : function (event, element) {
		wccConsoleLog("HandleAnchorClicks - PatientInfoTable - " + element.getAttribute("tabtype"));
		// console.log("Handle Anchor Clicks - " + element.getAttribute("tabtype"));

		var templateName, templateID, CTOSTabs, gender, height, weight, Amputee, DateTaken;

		var xx, yy, tmpData, tempBSA, DataEl, OEMData, OEM_Data_Record;
		var PatientInfo;
		var PatientData;

		var tab2switch2 = element.getAttribute("tabtype");

		var Patient = this.application.Patient;


		PatientData = "<div style=\"margin-left: 1em;\"><ul>" + this.getPatientDataAsString() + "</ul></div>";
		wccConsoleLog(PatientData);
		PatientData = "";




		if("DoBSACalcs" === tab2switch2 || "ShowBSACalcs" === tab2switch2) {
			tempBSA = Patient.BSA;
			this.application.Patient.BSA_Reduction = 0;
			PatientData = Ext.ShowBSACalcs(Patient, true, null, null);

			Ext.MessageBox.show({
				title : "Body Surface Area Calculations",
				msg : PatientData,
				buttons : Ext.MessageBox.OK
			});

			this.PatientDataLoadComplete("Update BSA");	// Use this call to update the BSA in the PatientInfoTable.
			if ("DoBSACalcs" === tab2switch2 && tempBSA !== Patient.BSA) {
				// wccConsoleLog("Saving Updated BSA Info - " + tempBSA + " - " + Patient.BSA);
				this.SaveBSAInfo();		// POSTs the BSA Calculations and formula as a Patient Vitals Record.
			}
		} else if("ShowAllPatientData" === tab2switch2) {
			PatientInfo = Patient;
			PatientData = "<div style=\"margin-left: 1em;\"><ul>" + this.getPatientDataAsString() + "</ul></div>";
			Ext.create('Ext.window.Window', {
			    title: 'Patient Info',
			    height: 200,
			    width: 400,
				autoScroll : true,
			    html : PatientData
			}).show();

		} else if("BSA" === tab2switch2) {
			gender = element.getAttribute("gender");
			height = element.getAttribute("height");
			weight = element.getAttribute("weight");
			Amputee = element.getAttribute("amputee");
			DateTaken = element.getAttribute("date");	// MWB 09 Feb 2012 - Added additional param - DateTaken
			this.application.fireEvent("CalculateBSA", {gender : gender, height : height, weight : weight, amputee : Amputee, date : DateTaken }); // MWB 09 Feb 2012 - Added additional param - DateTaken
		} else if ("CTOS" === tab2switch2) {
			templateName = element.getAttribute("templatename");
			templateID = element.getAttribute("templateid");
			this.CTOS_DataLoad2(templateID);
			CTOSTabs = this.getCTOS();
	        CTOSTabs.setActiveTab(0);		// Show the CTOS Tab
		} else if ("Show Details" === tab2switch2 || "Edit" === tab2switch2) {
			alert("Function not yet available");
		} else {
			templateName = element.getAttribute("templatename");
			templateID = element.getAttribute("templateid");
			this.application.fireEvent("TemplateSelected", {tabType : tab2switch2, templateName : templateName, templateID : templateID});
		}
	},


    //KD - 01/23/2012 - This is shared function between Disease stage combo and Select Templates combo
    loadCombo : function(picker, eOpts){

        var originalHiddenVal=null;
        picker.hiddenValue = picker.getRawValue();
        picker.clearValue();

        var URI,id;

        if("MyTemplates" == picker.name){
            URI = Ext.URLs.Templates + "/Patient/";
            id = this.application.Patient.id;
        }else if("AllTemplates" == picker.name){
            if(this.application.ResetClicked){
                URI = Ext.URLs.Templates;
                id = null;
                originalHiddenVal = picker.hiddenValue;
            }else{
                URI = Ext.URLs.Templates + "/Cancer/";
                id = this.application.Patient.Disease.id;
            }
        }else if("Select Disease Stage Control" == picker.name){
            URI = Ext.URLs.DiseaseStage + "/";
            if(eOpts.length && eOpts.length > 0){
                id = eOpts;
            }else{
                id = this.application.Patient.Disease.id;
            }
        } else if (picker.name == "Select Disease Control"){
            if(eOpts.length && "Refresh" === eOpts){
                URI = Ext.URLs.DiseaseType;
                id = '';
            }else if(null != this.application.Patient.TemplateType.id){
                URI = Ext.URLs.DiseaseType + "/Source/";
                id = this.application.Patient.TemplateType.id;
            }
        }

        picker.getStore().load({
            params: {
                URL : URI,
                ID  : id
            },
            callback: function(records,operation,success){
                if(success){
                    if(null!=originalHiddenVal){
                        picker.setRawValue(originalHiddenVal);
                    }
                }
            }
        });

    },

    collapseCombo : function(picker,eOpts){
        if(picker.getValue() == null && picker.hiddenValue != null){
            picker.setRawValue(picker.hiddenValue);		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        }

    },

	resetTemplateFilter : function(button){
        if(null != this.application.Patient.Template){
            this.getTemplate().setRawValue(this.application.Patient.Template.description);
        }

        this.application.ResetClicked=true;
        this.loadCombo(this.getTemplate());
        this.loadCombo(this.getDisease(),"Refresh");

        this.getDiseaseAndStage().hide();
        this.getTemplate().show();

        Ext.MessageBox.alert('Success', 'Template filters have been removed. <br />All available Templates will be displayed. ');

    },


    editTemplate : function(button){
        this.application.loadMask("Edit Template");

        this.application.btnEditTemplatClicked=true;
        
        var disease = this.getDisease();
        
        var diseaseRecord = disease.getStore().getById(disease.getValue());

        if(0 == this.getSelTemplateType().getStore().count()){
            this.getSelTemplateType().getStore().load();
        }
        

        if(null === diseaseRecord){
            var newPlanCtl = this.getController("NewPlan.NewPlanTab");
            disease.getStore().load({
                params: {
                        URL: Ext.URLs.DiseaseType + "/",
                        ID: disease.getValue()
                },
                callback: function (records, operation, success) {
                        if (success) {
                            var diseaseRecord = disease.getStore().getById(disease.getValue());
                            newPlanCtl.afterFindDisease(diseaseRecord);
                        }else{
                            Ext.MessageBox.alert('Failure', 'Cancer type could not be found for this template. ');
                        }
                }
            });
            
        }else {
            this.afterFindDisease(diseaseRecord);
        }


    },

    afterFindDisease : function(diseaseRecord){
        var thisCtl = this.getController("Authoring.AuthoringTab");
        var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];


        var template=null;
        var templateType = this.getSelTemplateType();

        if(Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()){
            /*
             * Assigning the template type to a Local Template. Not correct logic 
             * but just something to get past the error when editing a template.
             */
            templateTypeModel = this.getSelTemplateType().getStore().getAt(1);
            templateType.setValue(templateTypeModel);
            template = this.getMyTemplates();
        }else if(Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()){
            template = this.getTemplate();
        }

        if(null == template){
            /*
             * Assigning the template type to a Local Template. Not correct logic 
             * but just something to get past the error when editing a template.
             */
            templateTypeModel = this.getSelTemplateType().getStore().getAt(1);
            templateType.setValue(templateTypeModel);
            template = this.getMyTemplates();
        }
        existingTemplate.setValue(true);

        var rbtn = Ext.create(Ext.form.Radio,{
            inputValue : 0
        });

        thisCtl.AuthorTypeSelected(rbtn,true,null,null);
        thisCtl.getPatientNameField().setValue(this.application.Patient.name);
        thisCtl.getPatientNameField().show();

        var templateSourceRecord = this.getSelTemplateType().getStore().findBy(

            function (record, id) {
                    
                    if(record.data.id == templateType.getValue()){
                        return true;
                    }
                    
                    return false;
            });

        var templateSourceRecords = [];

        var tmp = templateType.getStore().getAt(templateSourceRecord);
        templateSourceRecords.push(tmp);
        thisCtl.getTemplateSource().setValue(tmp);
        thisCtl.onTemplateTypeChange(null,templateSourceRecords,null);

        var diseaseRecords = [];
        diseaseRecords.push(diseaseRecord);
        //thisCtl.getExistingDisease().getStore().load();

        thisCtl.getExistingDisease().setRawValue(diseaseRecord.data.name);
        //thisCtl.getExistingDisease().setValue(diseaseRecord);
        thisCtl.DiseaseSelected(thisCtl.getExistingDisease(),diseaseRecords,null);

        var diseaseStage = this.getDiseaseStage();
        var diseaseStageRecord = diseaseStage.getStore().getById(diseaseStage.value.id);
        var diseaseStageRecords = [];


        if(null != diseaseStageRecord){
	        diseaseStageRecords.push(diseaseStageRecord);
			thisCtl.getExistingDiseaseStage().setRawValue(diseaseStageRecord.data.name);
		    thisCtl.onDiseaseStageChange(thisCtl.getExistingDiseaseStage(),diseaseStageRecords,null);
        }else{
            thisCtl.getExistingDiseaseStage().setRawValue('');
        }


        //var templateRecord = template.getStore().getById(template.getValue());
        var templateRecord;
        if(null!=this.application.Patient.AppliedTemplateID){
            templateRecord = template.getStore().getById(this.application.Patient.AppliedTemplateID);   
        }else{
            templateRecord = template.getStore().getById(this.application.Patient.Template.id);   
        }
        
        template.clearValue();
        //diseaseStage.clearValue();

        if(null==templateRecord){
            var newPlanCtl = this.getController("NewPlan.NewPlanTab");
            template.getStore().load({
                params: {
                    URL: Ext.URLs.Templates + "/",
                    ID: (null == this.application.Patient.Template) ? this.application.Patient.AppliedTemplateID : this.application.Patient.Template.id
                },
                callback: function(records,operation,success){
                    if(success){
                        templateRecord = this.getAt(0);
                        newPlanCtl.afterFindTemplate(templateRecord,thisCtl,template);
                    }
                }
            });

        }else{
            this.afterFindTemplate(templateRecord,thisCtl,template);
        }
    },
    afterFindTemplate : function(templateRecord,controller,template){
        var templateRecords = [];

        this.collapseCombo(template,null);
        this.collapseCombo(this.getDiseaseStage(),null);

        templateRecords.push(templateRecord);

        controller.getTemplate().setRawValue(templateRecord.data.description);

        controller.selTemplateChange(controller.getTemplate(),templateRecords,null);

		//        this.getNavigationTabs().setActiveTab(1);
		// MWB - 5/29/2012 - With the addition of the "Orders" tab and the fact that the Orders tab might NOT be visible to all users
		// we need to get the index of the "Template Authoring" tab by walking the titles of the tabs.
		var allTabs = this.getNavigationTabs().items;
		allTabs.findBy(function(aTabPanel) {
			if ("Template Authoring" === aTabPanel.title) {
				this.getNavigationTabs().setActiveTab(aTabPanel);
			}
		},
		this );
    },

    applyTemplateToPatient : function(button){
        var startDate = new Date(this.application.Patient.TreatmentStart);
        var dateEnded = new Date(this.application.Patient.TreatmentEnd);
        var today = new Date();

//        if(Ext.Date.between(today,startDate,dateEnded)){
//            Ext.MessageBox.alert('Information', 'The currently applied template is still active. A new template may not be applied at this time. ');
//            return;
//        }

        var itemsInGroup = [];	// new Array();
        //var myStore = this.getStore('PerfStatStore').load();
        var myStore = this.getStore('PerfStatStore');

        myStore.each( function(record){
            if(record.data.value == '5' ){
                return;
            }
            itemsInGroup.push({
                boxLabel : record.data.value + ' - ' + record.data.description,
                name : 'PerfStatus',
                inputValue : record.data.id,
                width : 360
            });
        });

        if(this.application.Patient.TemplateID){
			Ext.MessageBox.show({
				title: 'Information',
				msg: 'Template already applied. Would you like to archive existing template and apply current selection?',
				width:300,
				buttons: Ext.MessageBox.OKCANCEL,
				fn: function(buttonId) {
					if("ok" === buttonId) {
						Ext.widget('AddDate',{itemsInGroup: itemsInGroup});
					}
				}
			});
        }
		else{
			Ext.widget('AddDate',{itemsInGroup: itemsInGroup});        
		}
    },

    clearCTOS : function(button){

        if(this.getCTOSDataDsp().hidden==false){
            this.getCTOSDataDsp().hide();
			if ("1" === SessionTemplateAuthoring) {
            this.getApplyTemplateBtn().hide();
            this.getEditTemplateBtn().hide();
			}
            this.getDiseaseAndStage().hide();
            this.getResetButton().hide();
            this.getDisease().setValue('');
            this.getDiseaseStage().setValue('');
            this.application.selTemplate=null;
            this.getMyTemplates().hiddenValue=null;
            this.getTemplate().hiddenValue=null;
            this.getDiseaseStage().hiddenValue=null;

            if(!button){
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].setValue(false);
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].setValue(false);
                this.getTemplate().hide();
                this.getMyTemplates().hide();
                this.getTemplate().setValue('');
                this.getMyTemplates().setValue('');
                this.getSelCTOSTemplate().hide();
            }else if("0" === button){
                this.getTemplate().hide();
                this.getTemplate().setValue('');
            }else if("1" === button){
                this.getMyTemplates().setValue('');
                this.getMyTemplates().hide();
            }else if("2" === button){
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].setValue(false);
                Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].setValue(false);
                this.getTemplate().hide();
                this.getMyTemplates().hide();
                this.getTemplate().setValue('');
                this.getMyTemplates().setValue('');
                this.getSelCTOSTemplate().hide();
                if(this.getPatientInfo().hidden == false){
                    this.getLaboratoryInfo().hide();
                    this.getPatientHistory().hide();
                    this.getPatientTemplates().hide();
                    this.getPatientInfoTable().hide();
                    this.getPatientInfo().hide();
                    this.getSelectPatient().setValue('');
                    this.getSelectPatient().getStore().removeAll();
                    this.getSelectPatient().lastQuery = null;
                    this.getCTOS().hide();
                }
            }

        }

    },

    TemplateTypeSelected : function(rbtn, newValue, oldValue, eOpts ) {
        wccConsoleLog("What to do has been selected");
        //var set0 = this.getAppliedTemplateList();
        var set0 = this.getMyTemplates();
        var set1 = this.getSelCTOSTemplate();
        this.application.Patient.AppliedTemplateID = null;

        var What2Do = rbtn.inputValue;
        if( newValue ) {
            if ("0" === What2Do) {
                this.clearCTOS(What2Do);
                set0.show();
                set1.hide();
            }
            else {
                this.clearCTOS(What2Do);
                set0.hide();
                this.getSelTemplateType().setValue('');
                set1.show();
            }
        }
    },







	// Called to complete the "TemplateApplied" process. Called from the success event of the patientTemplate.save() AJAX call in the "ApplyTemplate()" function above.
	PatientModelLoadSQLPostTemplateApplied : function( PatientGUID, TreatmentID ) {
        var pModel = this.getModel("PatientInfo");
        var pModelParam = PatientGUID;
		this.application.PatientID = PatientGUID;	// Not yet used... MWB - 5/25/2012
		this.application.TreatmentID = TreatmentID;
		this.application.PAT_ID = TreatmentID;		// PAT_ID and TreatmentID are the same thing, just set differently in different places.

        pModel.load(pModelParam, {
            scope : this,
            success : function( patientInfo, response ) {

// wccConsoleLog("PatientModelLoadSQLPostTemplateApplied - Load Complete - Refreshing Patient Info Table...");
// debugger;
				// duplicate of code in the ConfirmPatientClick event handler...
//				var recs = [];
//				recs[0] = { data : patientInfo.data };
//				this.PatientSelected(null, recs, null);



//		this.application.Patient = patientInfo.data;

this.application.Patient.Amputations = patientInfo.data.Amputations;
this.application.Patient.BSA = patientInfo.data.BSA;
this.application.Patient.BSAFormula = patientInfo.data.BSAFormula;		// This should really be the string of the formula for calculating the BSA
this.application.Patient.BSA_Method = patientInfo.data.BSAFormula;		// but the Framework returns the name of the method (e.g. DuBois) as the BSAFormula
this.application.Patient.BSA_Weight = patientInfo.data.BSA_Weight;
this.application.Patient.TemplateDescription = patientInfo.data.TemplateDescription;
this.application.Patient.TemplateID = patientInfo.data.TemplateID;
this.application.Patient.TemplateName = patientInfo.data.TemplateName;
this.application.Patient.TreatmentEnd = patientInfo.data.TreatmentEnd;
this.application.Patient.TreatmentStart = patientInfo.data.TreatmentStart;
this.application.Patient.TreatmentStatus = patientInfo.data.TreatmentStatus;
this.application.Patient.TreatmentID = this.application.TreatmentID;
this.application.Patient.WeightFormula = patientInfo.data.WeightFormula;








// Try this...
		this.application.loadMask("Loading Patient Records");
		this.application.DataLoadCount = 4;		// There are 6 modules to be loaded...
		this.loadMDWSData();					// module 1
		this.loadTemplates("Templates");					// module 5
		this.loadOrderRecords();				// module 6
		this.LoadSpecifiedTemplate(this.application.Patient.TemplateID);





//		this.application.Patient = patientInfo.data;
/**********
		// Get a handle to the frameset itself
        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var fs = thisCtl.getPatientInfo();

        // Update the legend (via the setTitle method) of the Frameset and expand it
        fs.setTitle("<h2>Patient Information for - " + this.application.Patient.name + "</h2>");
        fs.show();
		fs.expand();

        // Display the selected patient's info in the table via it's template
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].show();
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();

			// MWB 02 Feb 2012 - Clear out the CTOS Tab when changing the patient
		var piTable = thisCtl.getPatientInfoTable();
        piTable.update(this.application.Patient );
		piTable.collapse();

		var piTable1 = thisCtl.getPatientInfoTableInformation();
        piTable1.update(this.application.Patient );
	
		var CTOSData = thisCtl.getCTOSDataDsp();
		CTOSData.update("");
		CTOSData.hide();
		this.getApplyTemplateBtn().hide();
		this.getEditTemplateBtn().hide();

*****************/









































            },
            failure : function (record, operation) {
				this.application.unMask();
	            // Ext.MessageBox.alert('MDWS Error', 'Patient Info failed to load properly from MDWS.<br />' + operation.error);
				// debugger;		// check message value of record/operation
				// Unknown MDWS Error; No further details to report
                wccConsoleLog("Patient Info failed to load properly from MDWS");
            }
        });
	},

	//----------------------------------------------------------------------------------------------------------------
	//
	//	Patient Selection via Admin Dates or entering Patient ID (First Letter of Last Name followed by last 4 of SSN
	//
	//----------------------------------------------------------------------------------------------------------------
	PatientModelLoadSQL : function( query ) {
		var PatientStore = COMS.store.Patients.create();
		this.application.loadMask("One moment please, retrieving Patient Information for " + query + "...");
		PatientStore.load({ scope : this, callback : 
			function( records, operation, status) {
				this.application.unMask();
// wccConsoleLog("PatientModelLoadSQL - Load Complete");
				var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
				var query = "";
				var SSN= "";
				var PatientInfo = {}, Patient_ID, Patient_Name;
				if (CPRS_QueryString) {
					query = CPRS_QueryString.getValue();
				}

				if ("" !== query) {
					SSN = query.substring(1);
					var i, nRecs = records.length, flag = false, tmpSSN;

					for (i = 0; i < nRecs; i++) {
						tmpSSN = records[i].get("DFN");
						tmpSSN = tmpSSN.substring(2);
						if (SSN === tmpSSN) {
							flag = true;
							Patient_ID = records[i].get("id");
							Patient_Name = records[i].get("name");
							this.application.TempPatient = records[i];
						}
					}

					// Additional code here to perform proper query in MDWS for data
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var SelectPatientSection = thisCtl.getSelectPatientSection();
					var SelectPatient = thisCtl.getSelectPatient();
					var ConfirmPatient = thisCtl.getConfirmPatient();
					SelectPatientSection.show();
					SelectPatient.hide();
					if (flag) {
						PatientInfo.Patient_Name = Patient_Name;
						PatientInfo.Patient_ID = Patient_ID;
						ConfirmPatient.update( PatientInfo );
						// CPRS_QueryString.setValue("");
						ConfirmPatient.show();
						ConfirmPatient.el.select("button").on("click", this.ConfirmPatientClick, this);
					}
					else {
						SelectPatient.show();
					}
				}
			}
		});
	},

	PatientModelLoadMDWS : function(query) {
        // Load the Patient Information
        var pModel = this.getModel("PatientInfoMDWS");
        var pModelParam = query;
		this.application.PatientSSN_ID = query;
		this.application.loadMask("One moment please, retrieving Patient Information for " + query + "...");

        pModel.load(pModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
// wccConsoleLog("PatientModelLoadMDWS - Load Complete");
                wccConsoleLog("Patient Info Loaded - Processing");
				this.application.unMask();
				var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
				var query = "";
				var SSN= "";
				var PatientInfo = {}, Patient_ID, Patient_Name;
				if (CPRS_QueryString) {
					query = CPRS_QueryString.getValue();
				}

				if ("" !== query) {
					var record = patientInfo.data;
					Patient_ID = record.id;
					Patient_Name = record.name;
					var data = record;
					this.application.TempPatient = record;

					// Additional code here to perform proper query in MDWS for data
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var SelectPatientSection = thisCtl.getSelectPatientSection();
					var SelectPatient = thisCtl.getSelectPatient();
					var ConfirmPatient = thisCtl.getConfirmPatient();
					SelectPatientSection.show();
					SelectPatient.hide();
					PatientInfo.Patient_Name = Patient_Name;
					PatientInfo.Patient_ID = Patient_ID;
					ConfirmPatient.update( PatientInfo );
					ConfirmPatient.show();
					ConfirmPatient.el.select("button").on("click", this.ConfirmPatientClick, this);
				}
            },
            failure : function (record, operation) {
				this.application.unMask();
	            Ext.MessageBox.alert('MDWS Error', 'Patient Info failed to load properly from MDWS.<br />' + operation.error);
                wccConsoleLog("Patient Info failed to load properly from MDWS");
            }
        });
	},



	// Get here by either clicking on the "Query CPRS for Patient" button or hitting the "Enter" key in the SSN Field.
	PatientStoreQuery : function( ) {
		// alert("PatientStoreQuery");

		var thisCtl = this.getController("NewPlan.NewPlanTab");
		thisCtl.getPatientInfo().hide();


		var CPRS_QueryString = Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0];
		var query = "";
		if (CPRS_QueryString) {
			query = CPRS_QueryString.getValue();
		}
		if ("" === query) {
			return;
		}

		Ext.ComponentQuery.query('NewPlanTab PatientSelection [name=\"from_date\"]')[0].setValue("");
		Ext.ComponentQuery.query('NewPlanTab PatientSelection [name=\"to_date\"]')[0].setValue("");

		if (UseNewQueryMethod) {
			this.PatientModelLoadMDWS( query );
		}
		else {
			this.PatientModelLoadSQL( query );
		}
	},

	// Event handler for pressing the "Enter" key in the "Enter Patient Identification" field.
	QSEnter : function( fld, e, eOpts ) {
		// alert("QSEnter");
		if (e.ENTER === e.getKey()) {
			this.PatientStoreQuery();
		}
	},

	ConfirmPatientClick : function(evt, btn) {
		var Patient_ID = btn.getAttribute("pid");
		var Patient_Name = btn.getAttribute("pn");

        var pModel = this.getModel("PatientInfo");
        var pModelParam = btn.getAttribute("pid");
		this.application.loadMask("Loading Patient Records");

// wccConsoleLog("ConfirmPatientClick- " + pModelParam);
		pModel.load(pModelParam, {
			scope : this,
			success : function( patientInfo, response ) {
// wccConsoleLog("ConfirmPatientClick - PatientInfo Model - Load Complete");
		var recs = [];
				recs[0] = { data : patientInfo.data };

		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var NewPlanTab = thisCtl.getNewPlanTab();
		var PatientSelection = thisCtl.getPatientSelectionPanel();
		PatientSelection.collapse();

		var ConfirmPatient = thisCtl.getConfirmPatient();
		ConfirmPatient.hide();

		this.PatientSelected(null, recs, null);

		// Attach event handler to the "Update" and "Show" MDWS Data buttons (styled to look like links) in "view\NewPlan\PatientInfo.js"
//		{ xtype : "container", html : "<button class=\"anchor\" name=\"UpdateMDWSData\">Update</button> Patient Info from MDWS" },
//		{ xtype : "container", html : "<button class=\"anchor\" name=\"DisplayMDWSData\">Show</button> Updated Patient Info from MDWS" },

		var Btns = Ext.ComponentQuery.query("NewPlanTab PatientInfo")[0].el.select("button.anchor");
		Btns.on("click", this.handleShowUpdateMDWSClickEvent, this);
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].show();
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].hide();
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
	},
           failure : function (record, operation) {
				this.application.unMask();
				// Ext.MessageBox.alert('MDWS Error', 'Patient Info failed to load properly from MDWS.<br />' + operation.error);
				// debugger;		// check message value of record/operation
				wccConsoleLog("Patient Info failed to load properly from MDWS");
			}
		});
	},

	handleShowUpdateMDWSClickEvent : function( evt, btn ) {
		wccConsoleLog("handleShowUpdateMDWSClickEvent - PatientInfoTable!");

		var PatientInfo = this.application.Patient;
		var btnName = btn.getAttribute("name");
		var Update = Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0];
		var Display = Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0];
		if ("UpdateMDWSData" == btnName) {
			this.application.DataLoadCount = 1;
			this.loadMDWSData();
		}
		else if ("DisplayMDWSData" == btnName) {
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].hide();
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].show();
			Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
		}
	},










	handlePatientSelectionClickEvent : function( evt, theBtn ) {
		wccConsoleLog("handlePatientSelectionClickEvent - PatientInfoTable!");

		//---------------------------------
		//
		//	This block of code is in place till we can do a reliable query for Patient Information from MDWS
		//	At that point we will have to create a COMS Service which will query MDWS and return either a single Patient Record
		//	OR a list of Patient Records to be used as the Store for the "SelectPatient" combo box.
		//	If a SINGLE record is returned then no combo box is required, just a single link/button to "Accept" and Use the returned Patient Record.
		//	
		//---------------------------------
		// alert( "User clicked - " + theBtn.name );
		if ("SelectPatientAdminRange" === theBtn.name ) {
			// Note: For some reason MS-IE 8 receives this event even though the SelectPatientAdminRange button isn't clicked.

			// alert("Select Patient Admin Range");
			// Additional code here to perform proper query in MDWS for data
			var thisCtl = this.getController("NewPlan.NewPlanTab");
			var SelectPatientSection = thisCtl.getSelectPatientSection();
			var SelectPatient = thisCtl.getSelectPatient();
			var ConfirmPatient = thisCtl.getConfirmPatient();
			// Ext.ComponentQuery.query("NewPlanTab PatientSelection [name=\"CPRS_QueryString\"]")[0].setValue("");
			SelectPatientSection.show();
			ConfirmPatient.hide();
			SelectPatient.show();
			thisCtl.getPatientInfo().hide();
		}
		else if ("QueryCPRS4Patient" === theBtn.name ) {
			// alert("Query CPRS 4 Patient");
			// Load the "Patients" Store.
			// Upon load, find the patient looked for by DFN
			this.PatientStoreQuery();
		}
	},


	loadMDWSData : function() {
		var PatientInfo = this.application.Patient;
		var URLParam = "/DFN/" + PatientInfo.DFN;
		if (this.application.PatientSSN_ID) {
			URLParam = "/SSN/" + this.application.PatientSSN_ID;
		}

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.MegaMDWS + URLParam,
			success: function( response, opts ){
// wccConsoleLog("MDWS Data - Load Complete");
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success) {
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"MDWSStatus\"]")[0].hide();
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].hide();
					Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();
					this.application.DataLoadCount--;
					this.PatientDataLoadComplete("MDWS Mega Call");
				}
				else {
					alert("loadMDWSData() - Error");
				}
			},
			failure : function( response, opts ) {
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("MDWS Mega Call");
				alert("MDWS Data Load Failed...");
			}
		});
	},


//------------------------------------------------------------------------------------------------------------------------------
//
//	Start of data loading section.
//	The 5 "Load" functions here load the various pieces of Patient Data Asynchronously. 
//	After each function finishes loading it's particular data set a call is made to the PatientDataLoadComplete() function
//	This function will execute and completion process (e.g. unmask and finish rendering data and managing event handlers)
//
//------------------------------------------------------------------------------------------------------------------------------

    loadAllergyInfo : function() {
        var liModel = this.getModel("Allergies");
        var liModelParam = this.application.Patient.id;
        liModel.load(liModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
                wccConsoleLog("Allergy Info Loaded - Processing");
// wccConsoleLog("Allergies Model - Load Complete");
                var rawData = Ext.JSON.decode(response.response.responseText);
				var tmp = "0 Records";
				this.application.Patient.Allergies = rawData.records;

					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("Allergy Info");

            },
            failure : function (err, response) {
                wccConsoleLog("Allergy Info failed to load properly");
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("Allergy Info - FAILED Loading");
            }
        });
    },


    loadLabInfo : function() {
        var liModel = this.getModel("LabInfo");
		var theStore = Ext.getStore("LabInfo");
		var prox = liModel.proxy;
		var uri = prox.url;
		theStore.proxy.url = uri + "/" + this.application.Patient.id;
		theStore.groupField = "specimen";
		theStore.load( {
            scope : this,
			callback: function(records, operation, success) {
// wccConsoleLog("LabInfo Model - Load Complete");
				var thisCtl, LaboratoryInfo, tmp, len;
				if (success) {
	                wccConsoleLog("Laboratory Info Loaded - Processing");
					this.application.Patient.History = records;

						//------------------
						//
						// Grabbing Serum Creatinine (for AUC Calculations) needed data from Labs on loading.
						//
						//


						// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
					this.application.DataLoadCount--;
					this.PatientDataLoadComplete("Lab Info");
				}
				else {
	                wccConsoleLog("Laboratory Info failed to load properly");
					this.application.DataLoadCount--;
					this.PatientDataLoadComplete("Lab Info - FAILED Loading");
				}
		    }			
		});
    },


	loadVitals : function(RetCode) {
        var pVitalsModel = this.getModel("Vitals");
        var pVitalsModelParam = this.application.Patient.id;
        pVitalsModel.load(pVitalsModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
                var rawData = Ext.JSON.decode(response.response.responseText);
				if (rawData) {
					var ih, w, t, rec, el;
					if (rawData.total >= 0) {
						for (i = 0; i < rawData.total; i++) {
							rec = rawData.records[i];
							for (el in rec) {
								if (rec.hasOwnProperty(el)) {
								if (null === rec[el]) {
									rec[el] = "";
								}
							}
							}
							h = rawData.records[i].Height;
							t = h.split(" ");
							if (t.length > 1) {
								rawData.records[i].Height = t[0];
							}
							w = rawData.records[i].Weight;
							t = w.split(" ");
							if (t.length > 1) {
								rawData.records[i].Weight = t[0];
							}
						}
						this.application.Patient.Vitals = rawData.records;
						/********* - MWB - This assumes that the most recent record has what we need.
						var RecentMeasurements = this.application.Patient.Vitals[0];

						if (RecentMeasurements) {
							this.application.Patient.BSA_Weight = RecentMeasurements.BSA_Weight;
							this.application.Patient.WeightFormula = RecentMeasurements.WeightFormula;
							this.application.Patient.BSA_Method = RecentMeasurements.BSA_Method;
							this.application.Patient.BSA = RecentMeasurements.BSA;
							this.application.Patient.Height = RecentMeasurements.Height;
			                this.application.Patient.Weight = RecentMeasurements.Weight;
						}
						************/


// MWB - 5/29/2012 - the BSA info in Vitals should not override previously established BSA Info.
// The only Vitals which should override are the current height/weight (if any)
//						this.application.Patient.BSA_Weight = "";
//						this.application.Patient.WeightFormula = "";
//						this.application.Patient.BSAFormula = "";
//						this.application.Patient.BSA_Method = "";
//						this.application.Patient.BSA = "";

						this.application.Patient.Height = "";
		                this.application.Patient.Weight = "";

						// We need to get the most recent vitals needed for BSA into the Patient Object (specifically height/weight) if available.
						var Vitals = this.application.Patient.Vitals;
						var vLen = Vitals.length;
						var i, aVital, vBSA_Weight = "", vWeightFormula = "", vBSA_Method = "", vBSA = "", vHeight = "", vWeight = "";
						var HaveAllCount = 6;
						
						for (i = 0; (i < vLen) && (HaveAllCount > 0); i++) {
							aVital = Vitals[i];
							if ("" === vBSA_Weight && "" !== aVital.BSA_Weight) {
								vBSA_Weight = aVital.BSA_Weight;
								HaveAllCount--;
							}
							if ("" === vWeightFormula && "" !== aVital.WeightFormula) {
								vWeightFormula = aVital.WeightFormula;
								HaveAllCount--;
							}
							if ("" === vBSA_Method && "" !== aVital.BSA_Method) {
								vBSA_Method = aVital.BSA_Method;
								HaveAllCount--;
							}
							if ("" === vBSA && "" !== aVital.BSA) {
								vBSA = aVital.BSA;
								HaveAllCount--;
							}
							if ("" === vHeight && "" !== aVital.Height) {
								vHeight = aVital.Height;
								HaveAllCount--;
							}
							if ("" === vWeight && "" !== aVital.Weight) {
								vWeight = aVital.Weight;
								HaveAllCount--;
							}
						}
						if (HaveAllCount > 0) {
							var errMsg = [];
							if ("" === vBSA_Weight) {
								errMsg.push("BSA Weight");
							}
							if ("" === vBSA_Method) {
								errMsg.push("BSA Method");
							}
							if ("" === vWeightFormula) {
								errMsg.push("BSA Weight Formula");
							}
							if ("" === vBSA) {
								errMsg.push("BSA");
							}
							if ("" === vHeight) {
								errMsg.push("Patient Height");
							}
							if ("" === vWeight) {
								errMsg.push("Patient Weight");
							}
							var errMsgStr = errMsg.join(", ");
							// wccConsoleLog("Missing some BSA Vital Data - " + errMsgStr);
						}

// MWB - 5/29/2012 - the BSA info in Vitals should not override previously established BSA Info.
//						this.application.Patient.BSA_Weight = vBSA_Weight;
//						this.application.Patient.WeightFormula = vWeightFormula;
//						this.application.Patient.BSA_Method = vBSA_Method;
//						this.application.Patient.BSA = vBSA;
						this.application.Patient.Height = vHeight;
		                this.application.Patient.Weight = vWeight;

					}
				}

					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete(RetCode);

            },
			failure : function (err, response) {
                wccConsoleLog("Patient Vitals can not be accessed.");
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete(RetCode + " - FAILED Loading");
            }
        });
	},


	loadTemplates : function() {
        var phModel = this.getModel("PatientTemplates");
        var phModelParam = this.application.Patient.id;
        phModel.load(phModelParam, {
            scope : this,
            success : function( patientInfo, response ) {
// wccConsoleLog("PatientTemplates Model - Load Complete");
				var rawData = Ext.JSON.decode(response.response.responseText);
                // First take all the data received and put it into a local JSON object for the TPL to process
                wccConsoleLog("Patient Templates Loaded - Processing");

				this.application.Patient.TemplateHistory = rawData.records;


					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("Templates");


            },
            failure : function (err, response) {
// wccConsoleLog("PatientTemplates Model - Load FAILED - " + response.error);
                wccConsoleLog("PatientHistory store failed to load properly - " + response.error);
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("Templates - Failed to load - " + response.error);
            }
        });
//
//	List of Templates for patient
//
	},



	loadOrderRecords : function( ) {
		var PatientID = this.application.Patient.id;
		var CTOSModel = this.getModel("OEMRecords");		// MWB 21 Feb 2012 - Loading new model for retrieving the records direct from the DB rather than generating them
		CTOSModel.load( PatientID, {
			scope: this,
			success: function (TemplateData, response) {
// wccConsoleLog("OEMRecords Model - Load Complete");
				try {
					wccConsoleLog("Template Data Loaded - Processing");
					var theData = TemplateData.data;
					theData.PatientName = this.application.Patient.name;
					theData.RegimenName = this.application.Patient.TemplateName;
					theData.RegimenDescription = this.application.Patient.TemplateDescription;
					theData.ELevelRecommendationASCO = EmesisRisk[theData.ELevelID].ASCO;
					theData.ELevelRecommendationNCCN = EmesisRisk[theData.ELevelID].NCCN;

					this.application.Patient.OEMRecords = theData;



				}
				catch (err) {
					var errMsg1 = "ERROR in parsing data for Template " + this.application.Patient.TemplateName;
					alert("ERROR in Loading Order Entry Management Record Data for Template : " + this.application.Patient.TemplateName);
					wccConsoleLog(errMsg1);
					wccConsoleLog(err.message + " @ Line# " + err.lineNo);
				}

					// MWB - 5/16/2012 - Used to make sure all data sets are loaded before continuing
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("OEM Records");


			},
			failure: function (err) {
				wccConsoleLog("Template Data failed to load properly");
				// alert("Warning - No Order Information available for Patient " + this.application.Patient.name);
				this.application.DataLoadCount--;
				this.PatientDataLoadComplete("Templates - Failed to load");
			}
		});
	},

    //-------------------------------------------------------------------------
    //
    //	Patient Selected - Phase 1 for this panel
    //	Causes Patient Info
    //	(including Patient History, Laboratory Information and CTOS Tabset) to be displayed
    //
	//	MWB 10 Feb 2012 - Made several minor changes for code cleanup and 
	//		sorted the PatientMeasurements for disply of most recent measurements first
	//
	//	MWB 22 Mar 2012 - This is the only point where the Select Event for the Combo Box is trapped.
	//		The end of this event handler fires off a "PatientSelected" event which is intercepted throughout the application
	//		When we change from a Combo Box to an Edit Field to enter Patient ID this should be the only place which needs to get changed.
	//
    PatientSelected : function(combo, recs, eOpts) {
        wccConsoleLog("NewPlanTab - Patient Selected has changed");

		
        if(null === recs){		// MWB 10 Feb 2012 - If the recs come back as null then something's wrong, exit the function
			return;
		}

		// The recs data comes from either selecting an entry in a combo box (SelectPatient), or by virtue of a query 
		// (via either the PatientModelLoadMDWS() or PatientModelLoadSQL()) into the recs array.
		var piData;
		if (recs[0].data) {
			piData = recs[0].data;
		}
		else {
			piData = recs[0];
		}


// Check value of piData before continuing.
// debugger;	// We should ALWAYS get here irrelivant of how we found a patient. As well as after a template has been applied.



		this.application.Patient = piData;

		// Get a handle to the frameset itself
        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var fs = thisCtl.getPatientInfo();

        // Update the legend (via the setTitle method) of the Frameset and expand it
        fs.setTitle("<h2>Patient Information for - " + this.application.Patient.name + "</h2>");
        fs.show();
        fs.expand();

        // Display the selected patient's info in the table via it's template
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"UpdateMDWSDataContainer\"]")[0].show();
		Ext.ComponentQuery.query("NewPlanTab PatientInfo container[name=\"DisplayMDWSDataContainer\"]")[0].hide();

			// MWB 02 Feb 2012 - Clear out the CTOS Tab when changing the patient
		var piTable = thisCtl.getPatientInfoTable();
        piTable.update("");
		piTable.collapse();

		var piTable1 = thisCtl.getPatientInfoTableInformation();
        piTable1.update("");
	
		if ("1" === SessionTemplateAuthoring) {
			var CTOSData = thisCtl.getCTOSDataDsp();
			CTOSData.update("");
			CTOSData.hide();
			this.getApplyTemplateBtn().hide();
			this.getEditTemplateBtn().hide();
		}


		this.application.PatientSelectedRecs = recs;
		this.application.PatientSelectedOpts = eOpts;
		
		this.application.loadMask("Loading Patient Records");
		this.application.DataLoadCount = 7;		// There are 6 modules to be loaded...

// wccConsoleLog("Loading Patient Records");
		this.loadMDWSData();					// module 1
		this.loadLabInfo();						// module 2
		this.loadAllergyInfo();					// module 3
		this.loadVitals("Vitals");						// module 4
		this.loadTemplates("Templates");					// module 5
		this.loadOrderRecords();				// module 6
		this.LoadSpecifiedTemplate(this.application.Patient.TemplateID);

    },
    //
    //
    //	END Patient Selected
    //
    //-------------------------------------------------------------------------




	UpdateOEMRecords : function(aRec, bRec) {
		try {
			var oemEditRec = {
				"TemplateID" : this.application.Patient.OEMRecords.id,
				"OEMRecordID" : aRec.id,
				"Order_ID" : bRec.Order_ID,
				"TherapyID" : bRec.id,
				"TherapyType" : "Therapy",		// Because we're only looking at the aRec.Therapy array (first if() of the initial for(a = 0; a < oRecLen; a++) loop above
				"Instructions" : bRec.Instructions,
				"AdminTime" : bRec.AdminTime,
				"MedID" : bRec.MedID,
				"Med" : bRec.Med,
				"Reason" : (bRec.Reason || ""),		// This variable may not be set initially
				"Dose" : bRec.Dose,
				"BSA_Dose" : bRec.BSA_Dose,
				"Units" : bRec.DoseUnits,
				"InfusionMethod" : bRec.AdminMethod,
				"FluidType" : bRec.FluidType,
				"FluidVol" : bRec.FluidVol,
				"FlowRate" : bRec.FlowRate,
				"InfusionTime" : bRec.InfusionTime,
					// These variables aren't needed for a Therapy record as there's no "optional" dosing allowed for a "Therapy", only for Pre/Post.
				"Dose2" : "",
				"BSA_Dose2" : "",
				"Units2" : "",
				"InfusionMethod2" : "",
				"FluidType2" : "",
				"FluidVol2" : "",
				"FlowRate2" : "",
				"InfusionTime2" : ""
			};

			var oemRec = Ext.create(Ext.COMSModels.Edit_OEMRecord, oemEditRec);		// Create an instance of this model with the data specified
			oemRec.save();
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
			alert("Error - Saving updated OEM Record in NewPlan Controller - " + ee.message + "\n" + errMsg );
		}
	},

	reAddHandlers : function() {
		// console.log("Re-Assigning event handlers in 30 seconds");
		Ext.Function.defer( this.AssignBtnHandlers, 30000, this );
	},

	PatientDataLoadComplete : function(Loaded) {
		wccConsoleLog("PatientDataLoadComplete");
		var DataLoadCount = this.application.DataLoadCount;
		var thisCtl = this.getController("NewPlan.NewPlanTab");
		var Patient = this.application.Patient;
		var piTableInfo;


		if ("Update BSA" === Loaded) {
			piTableInfo = thisCtl.getPatientInfoTableInformation();
			piTableInfo.update(Patient);
			// console.log("Update BSA process complete, assign button handlers in 2 sec");
			Ext.Function.defer( this.AssignBtnHandlers, 2000, this );
			return;
		}

		if ("Update Vitals" === Loaded) {

			var ND_VitalSignsHistory = Ext.ComponentQuery.query("NursingDocs_GenInfo fieldset[title=\"Vital Signs - Historical\"] VitalSignsHistory")[0];
			if (ND_VitalSignsHistory) {
				ND_VitalSignsHistory.update(Patient);
			}

			PatientHistoryVitalStats = thisCtl.getVitalSigns();
			PatientHistoryVitalStats.update(Patient);

			PatientHistory = thisCtl.getPatientHistory();

			tmp = "No Records Available";
			if (Patient.Vitals) {
			len = Patient.Vitals.length;
				if (len > 0) {
				tmp = len + " Record";
				tmp += (1 === len) ? "" : "s";
				}
			}
			PatientHistory.setTitle("Patient History <span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>");


			// MWB - 6/27/2012 - Handle the OnClick Event for the BSA Button in the Vital Signs table
			var dspVSHTemplateData, VSHTemplateDataBtns;
			dspVSHTemplateData = this.getVitalSigns();
			VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
			VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);

			dspVSHTemplateData = this.getNDGI_VitalSigns();
			if (dspVSHTemplateData && dspVSHTemplateData.rendered) {		// Make sure the Vital Signs in the ND/GenInfo tab are rendered before trying to attach.
				VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);
			}
			return;
		}

		if ("Update Templates" === Loaded) {
			var patientTemplates, TemplateData;
				// Templates - Previously applied templates
			patientTemplates = thisCtl.getPatientTemplates();
			tmp = "No Records Available";
			len = 0;
			TemplateData =  "<div class='errMsg'>No applied templates for patient " + this.application.Patient.name + "</div>";

				if ("" !== Patient.TemplateID) {
					len++;
				}

			if (Patient.TemplateHistory) {
				len += Patient.TemplateHistory.length;
			}

				if (len > 0) {
					tmp = len + " Record";
					tmp += (1 === len) ? "" : "s";
					TemplateData = Patient.TemplateHistory;
				}

			var TemplateInfo = {Historical : TemplateData};
			if ("" !== Patient.TemplateID) {
				TemplateInfo = Ext.apply(TemplateInfo, { TemplateName : Patient.TemplateDescription, TemplateID : Patient.TemplateID, ScheduledEndDate : Patient.TreatmentEnd, DateStarted : Patient.TreatmentStart });
			}

			patientTemplates.update( TemplateInfo );
			patientTemplates.setTitle("Treatment Regimens & Summaries <span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>");
//			patientTemplates.show();
			return;
		}


		wccConsoleLog("DataLoadCount - " + DataLoadCount + " - " + Loaded);
		if (DataLoadCount <= 0) {		// All remote data for this patient has been loaded
			var len, tmp;
			var piTable;
			var LaboratoryInfo;
			var PatientHistoryVitalStats, PatientHistory;

			// MWB - 5/29/2012 - If today is the day the treatment starts, then it should have a status of "Template Applied"
			// NOT "On-Going - Admin Day"
			if (Ext.Date.isEqual(new Date(Patient.TreatmentStart), new Date(new Date().toDateString()))) {
				// However, we should distingush between an Admin Day and a Rest Day
				var PostStatus = " - Rest Day";
				if (Patient.TreatmentStatus.search("Admin Day") >= 0) {
					PostStatus = " - Admin Day";
				}
				Patient.TreatmentStatus = "Template Applied" + PostStatus;
			}









			this.application.unMask();
			this.getCTOS().show();

			thisCtl.getPatientInfo().expand();		// MWB - 22 Feb 2012 TESTING

			piTable = thisCtl.getPatientInfoTable();	// MWB - 10 Feb 2012 - This is the overall container for Patient Info, it contains everything...
			piTable.show();

				// Allergies
			piTableInfo = thisCtl.getPatientInfoTableInformation();
			piTableInfo.update(Patient);

			var HTML = piTableInfo.tpl.apply(Patient);

			piTableInfo.show();

				// Lab Info - Store is loaded directly into a Grid
			LaboratoryInfo = thisCtl.getLaboratoryInfo();
			tmp = "No Records Available";
			
			/***************** THERE'S A BUG in the LAB INFO RETRIEVAL DUE TO INCONSISTENT DATA STRUCTURE IN MDWS !!! - MWB - 5/31/2012 ***/
			// LAB INFO IS SOMETIMES RETURNED AS STRAIGHT DATA, OTHER TIMES AS AN ARRAY OTHER TIMES AS AN ARRAY WITHIN AN ARRAY, ETC
			if (Patient.History) {
			len = Patient.History.length;
				if (len > 0) {
				tmp = len + " Record";
				tmp += (1 === len) ? "" : "s";
				}
			}
			LaboratoryInfo.setTitle("Laboratory Information<span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>");


				// History (e.g. Vitals)
			PatientHistoryVitalStats = thisCtl.getVitalSigns();
			PatientHistoryVitalStats.update(Patient);

			PatientHistory = thisCtl.getPatientHistory();

			tmp = "No Records Available";
			if (Patient.Vitals) {
			len = Patient.Vitals.length;
				if (len > 0) {
				tmp = len + " Record";
				tmp += (1 === len) ? "" : "s";
				}
			}
			PatientHistory.setTitle("Patient History <span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>");

			// MWB - 6/27/2012 - Handle the OnClick Event for the BSA Button in the Vital Signs table
			dspVSHTemplateData = this.getVitalSigns();
			VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
			VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);

			dspVSHTemplateData = this.getNDGI_VitalSigns();
			if (dspVSHTemplateData && dspVSHTemplateData.rendered) {		// Make sure the Vital Signs in the ND/GenInfo tab are rendered before trying to attach.
				VSHTemplateDataBtns = dspVSHTemplateData.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", this.HandleVSHCalcDoseButtons, this);
			}




			var patientTemplates, TemplateData;
				// Templates - Previously applied templates
			patientTemplates = thisCtl.getPatientTemplates();
			tmp = "No Records Available";
			len = 0;
			TemplateData =  "<div class='errMsg'>No applied templates for patient " + this.application.Patient.name + "</div>";

				if ("" !== Patient.TemplateID) {
					len++;
				}

			if (Patient.TemplateHistory) {
				len += Patient.TemplateHistory.length;
			}

				if (len > 0) {
					tmp = len + " Record";
					tmp += (1 === len) ? "" : "s";
					TemplateData = Patient.TemplateHistory;
				}

			var TemplateInfo = {Historical : TemplateData};
			if ("" !== Patient.TemplateID) {
				TemplateInfo = Ext.apply(TemplateInfo, { TemplateName : Patient.TemplateDescription, TemplateID : Patient.TemplateID, ScheduledEndDate : Patient.TreatmentEnd, DateStarted : Patient.TreatmentStart });
			}

			patientTemplates.update( TemplateInfo );
			patientTemplates.setTitle("Treatment Regimens & Summaries <span class='LabInfoTitleInfo' style='margin-left: 3em; font-size: smaller;'>(" + tmp + ")</span>");
			patientTemplates.show();










					// If BSA_Dose is empty then calculate it for each record and save that record back.
					// BUT we need to calculate the BSA value and BSA_Weight before we load the records...
					// Then walk through theData.OEMRecords;
					var a, b, c, aRec, bRec, bRecUnits, calcDose, updateRecord = false, tmpDose,
						theRecords, oRecLen, 
						tRecords, oTherapyLen;


					if (this.application.Patient && this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
						theRecords = this.application.Patient.OEMRecords.OEMRecords;
						oRecLen = theRecords.length;
						for (a = 0; a < oRecLen; a++) {
							aRec = theRecords[a];
							if (aRec.Therapy) {
								oTherapyLen = aRec.Therapy.length;
								for (b = 0; b < oTherapyLen; b++) {
									bRec = aRec.Therapy[b];
									bRecUnits = bRec.DoseUnits.toUpperCase();
									calcDose = false;

									if (bRecUnits.search("M2") > 0 || bRecUnits.search("KG") > 0 || bRecUnits.search("AUC") >= 0 ) {
										calcDose = true;
									}

									if (calcDose) {
										if ("" === bRec.BSA_Dose || "NaN mg" === bRec.BSA_Dose) {
											// wccConsoleLog("No Dose for " + bRec.Med + " - " + bRec.Dose + " " + bRec.DoseUnits);
	
											if (bRecUnits.search("M2") > 0) {
												Dose = bRec.Dose * Patient.BSA;
												Dose = Ext.GeneralRounding2Digits(Dose);
												Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
												bRec.BSA_Dose = Dose + " " + Units;
												updateRecord = true;
											}
											else if	(bRecUnits.search("KG") > 0) {
												Dose = bRec.Dose * Patient.BSA_Weight;
												Dose = Ext.GeneralRounding2Digits(Dose);
												Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
												bRec.BSA_Dose = Dose + " " + Units;
												updateRecord = true;
											}
											else if (bRecUnits.search("AUC") >= 0) {
												Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
												bRec.BSA_Dose = Dose;
												updateRecord = true;
											}
										}
										else {
											// MWB - 7/12/2012 - Fix to update Dosage Calculations every time patient info is loaded.
											// DO NOT IMPLEMENT until further notice...
											// Implement as per SIC's e-mail - 7/12/2012 08:56 AM
											/**********************************************/
											if (bRecUnits.search("M2") > 0) {
												Dose = bRec.Dose * Patient.BSA;
												Dose = Ext.GeneralRounding2Digits(Dose);
												Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
												tmpDose = Dose + " " + Units;
												if (tmpDose != bRec.BSA_Dose) {
													bRec.BSA_Dose = tmpDose;
													updateRecord = true;
												}
											}
											else if	(bRecUnits.search("KG") > 0) {
												Dose = bRec.Dose * Patient.BSA_Weight;
												Dose = Ext.GeneralRounding2Digits(Dose);
												Units = bRec.DoseUnits.substr(0, bRecUnits.search("/"));
												tmpDose = Dose + " " + Units;
												if (tmpDose != bRec.BSA_Dose) {
													bRec.BSA_Dose = tmpDose;
													updateRecord = true;
												}
											}
											else if (bRecUnits.search("AUC") >= 0) {
												Dose = Ext.CalcAUCDose(Patient, bRec.Dose);
												tmpDose = Dose;
												if (tmpDose != bRec.BSA_Dose) {
													bRec.BSA_Dose = tmpDose;
													updateRecord = true;
												}
											}
											/***********************************************/
										}
									}
									if (updateRecord) {
									this.UpdateOEMRecords(aRec, bRec);
									}
								}
							}
							else {
								oTherapyLen = aRec.Therapy.length;
								for (b = 0; b < oTherapyLen; b++) {
									bRec = aRec.Therapy[b];
									this.UpdateOEMRecords(aRec, bRec);
								}
							}
						}
					}





				// Order Entry Records - No functions at this time.
			// console.log("Assigning button handlers in 2 seconds");
			Ext.Function.defer( this.AssignBtnHandlers, 2000, this );


			// MWB - 7/1/2012 Should this process be called here or in the AssignBtnHandlers() which is where it was originally????
			// Let other controllers know that this event has occurred
			this.application.fireEvent("PatientSelected", this.application.PatientSelectedRecs, this.application.PatientSelectedOpts);	// MWB 10 Feb 2012 - Added additional parameters
		}
	},


	HandleVSHCalcDoseButtons : function( event, element ) {
	/******* Button definition in view\Common\VitalSignsHistory.js 
				return ("<button class=\"anchor dspVSHDoseCalcs\" name=\"dspVSHDoseCalcs\" title=\"Show Dosage Calculation\" " + 
					"weight=\"" + data.Weight + "\" " + 
					"height=\"" + data.Height + "\" " + 
					"weightFormula=\"" + data.WeightFormula + "\" " + 
					"bsa_Weight=\"" + data.BSA_Weight + "\" " + 
					"bsa_Method=\"" + data.BSA_Method + "\" " + 
				">" + data.BSA + "</button> m<sup>2</sup>");
	********/
		var btnTitle = element.getAttribute("title");
		if ("Show Dosage Calculation" === btnTitle) {
			var Patient = this.application.Patient;
			var params = {};
			params.Weight = element.getAttribute("weight");
			params.Height = element.getAttribute("height");
			params.WeightFormula = element.getAttribute("weightFormula");
			params.BSA_Weight = element.getAttribute("bsa_Weight");
			params.BSA_Method = element.getAttribute("bsa_Method");
			params.Gender = Patient.Gender;
			params.Amputations = Patient.Amputations;

			params.BSA = Ext.BSA_Calc(params);
		

			var PatientData = Ext.ShowBSACalcs(params, false, null, null);

			Ext.MessageBox.show({
				title : "Body Surface Area Calculations",
				msg : PatientData,
				buttons : Ext.MessageBox.OK
			});
		}
	},



























	AssignBtnHandlers : function() {
		// debugger;
		wccConsoleLog("AssignBtnHandlers...");
		try {
			var thisCtl = this.getController("NewPlan.NewPlanTab");
			var Patient = this.application.Patient;
			Ext.Patient = this.application.Patient;		// MWB - 5/30/2012 - Need this so that the Patient Info can be accessed within xTemplates

			var patientTemplates = thisCtl.getPatientTemplates();
			var piTableInfo = thisCtl.getPatientInfoTableInformation();

			var btns1 = patientTemplates.el.select("button");
			var btns2 = piTableInfo.el.select("button");

			btns1.removeAllListeners();
			btns2.removeAllListeners();

			// console.log("AssignBtnHandlers - PatientInfoTableInformation");
			btns1.on("click", this.HandleTemplateBtnClicks, this);
			btns2.on("click", this.HandleAnchorClicks, this);
		}
		catch (e) {
			wccConsoleLog("Error in AssignBtnHandlers");
			// debugger;
		}

		// MWB - 7/1/2012 Should this process be called here???? This is the original location of this call
			// Let other controllers know that this event has occurred
// ??????????		this.application.fireEvent("PatientSelected", this.application.PatientSelectedRecs, this.application.PatientSelectedOpts);	// MWB 10 Feb 2012 - Added additional parameters


			Ext.Function.defer( this.reAddHandlers, 3000, this );
	},


    //-------------------------------------------------------------------------
    //
    //	Template Source (National/Local/Personal) Selected - Phase 1 of the CTOS Tab
    //
    //
    onTemplateTypeChange : function(combo, recs, eOpts) {
        wccConsoleLog("Select Template Type");
        this.application.Patient.TemplateType = recs[0].data;
        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var obj = thisCtl.getDiseaseAndStage();
        obj.show();
        this.getResetButton().show();
    },

	//
    //
    //	END Template Source Selected
    //
    //-------------------------------------------------------------------------


    //-------------------------------------------------------------------------
    //
    //	Disease Type Selected - Phase 2 of the CTOS Tab
    //
    //
    DiseaseSelected : function(combo, recs, eOpts) {
        wccConsoleLog("Disease Type has been selected");

        if(this.application.Patient.Disease != recs[0].data){
            this.application.ResetClicked=false;
        }

        this.application.Patient.Disease = recs[0].data;

        var obj = this.getTemplate();	// MWB 19 Jan 2012 - Added per customer request to not require selecting Disease Stage before displaying list of templates
        obj.show();
        // this.getResetButton().show();

    },
    //-------------------------------------------------------------------------
    //
    //	Disease Stage Selected - Phase 2 of the CTOS Tab
    //
    //
    onDiseaseStageChange : function(combo, recs, eOpts) {
        wccConsoleLog("Disease Type and Stage has been selected");

        this.application.Patient.DiseaseStage = recs[0].data;

        combo.hiddenValue = recs[0].data.name;

        var thisCtl = this.getController("NewPlan.NewPlanTab");
        var obj = thisCtl.getTemplate();
        obj.show();
        // this.getResetButton().show();
    },



	/**************************************************
	 *
	 *	MWB 30 Jan 2012 - Modified to break out the Loading of the Template from the Select Tag
	 *	This was done to make use of the loading function by the "HandleClickEvents" function above
	 *
	 **************************************************/
// Load the selected template - Called when user clicks on the "Show Template" in the Patient Info Table via the "HandleAnchorClicks - PatientInfoTable!" function above.
// This template is one which is currently applied to the patient.
	CTOS_DataLoad2 : function(TemplateID) {
	        this.application.loadMask("CTOS DataLoad2"); // MWB 19 Jan 2012 - Mask the screen
			var CTOSModel = this.getModel("CTOS");
			var CTOSModelParam = TemplateID;

			wccConsoleLog("Template Params = " + CTOSModelParam);

			this.clearCTOS();


	        CTOSModel.load(CTOSModelParam, {
				scope: this,
				success: function (CTOSTemplateData, response) {
					wccConsoleLog("CTOS Loaded - Processing");
					this.application.Patient.AppliedTemplateID = TemplateID;

					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var CTOSData = thisCtl.getCTOSDataDsp();

// MEB - 6/7/2012 - Need to add Template Timing info to the data object

					CTOSData.update(CTOSTemplateData.data);
					this.getDisease().setValue(CTOSTemplateData.data.Disease);
					this.loadCombo(this.getDiseaseStage(),CTOSTemplateData.data.Disease);

					if(this.getDiseaseStage().getStore().count()==0){
						this.loadCombo(this.getDiseaseStage(),this.getDisease().getValue());
					}

					this.getDiseaseStage().setValue(CTOSTemplateData.data.DiseaseStage[0].name);
                                
					CTOSData.show();
			if ("1" === SessionTemplateAuthoring) {
					this.getApplyTemplateBtn().disable();	// Template is already applied to patient
					this.getApplyTemplateBtn().hide();	// so no need to have it available.
					this.getEditTemplateBtn().show();
			}
					this.application.CurrentTemplate = CTOSData;	// MWB - 5/21/2012 - Hang onto the current template data for use in calculating the proper end date when applying the template.
					this.application.unMask(); // MWB 19 Jan 2012 - Unmask the screen

					wccConsoleLog("CTOS Loaded - Rendering complete");
				},
				failure: function (err) {
					wccConsoleLog("CTOS Data failed to load properly");
					var thisCtl = this.getController("NewPlan.NewPlanTab");
					var CTOSData = thisCtl.getCTOSDataDsp();
					CTOSData.update("<h2 class='errMsg'>No information available for Template " + this.application.Patient.Template.name + "</h2>");

					this.application.unMask();	// MWB 19 Jan 2012 - Unmask the screen
				}
	        });
	},




// Load the selected template - This is done by browsing through the available templates and selecting one from the drop down.
	CTOS_DataLoad : function(TemplateID) {
        this.application.loadMask("Loading Selected Template");	// MWB 19 Jan 2012 - Mask the screen

        var CTOSModel = this.getModel("CTOS");
        var CTOSModelParam = TemplateID;
        wccConsoleLog("Template Params = " + CTOSModelParam );

        CTOSModel.load(CTOSModelParam, {
            scope : this,
            success : function( CTOSTemplateData, response ) {
                wccConsoleLog("CTOS Loaded - Processing");

                var thisCtl = this.getController("NewPlan.NewPlanTab");
                var CTOSData = thisCtl.getCTOSDataDsp();
                CTOSData.update( CTOSTemplateData.data );

                this.getDisease().setValue(CTOSTemplateData.data.Disease);
                
                if(Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()){
                    this.loadCombo(this.getDiseaseStage(),CTOSTemplateData.data.Disease);
                }

                if(this.getDiseaseStage().getStore().count()==0){
                    this.loadCombo(this.getDiseaseStage(),this.getDisease().getValue());
                }

                this.getDiseaseStage().setValue(CTOSTemplateData.data.DiseaseStage[0].name);
                if(CTOSData.hidden==true){
                    CTOSData.show();
                }

                var patientAppliedTemplates = Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0];

				if ("1" === SessionTemplateAuthoring) {	
	                if(patientAppliedTemplates.getValue()){
						this.getApplyTemplateBtn().disable();
	                }else{
						this.getApplyTemplateBtn().enable();
					}
					this.getApplyTemplateBtn().show();
					this.getEditTemplateBtn().show();
                }
				this.application.CurrentTemplate = CTOSData;	// MWB - 5/21/2012 - Hang onto the current template data for use in calculating the proper end date when applying the template.
				this.application.unMask();	// MWB 19 Jan 2012 - Unmask the screen

            },
            failure : function (err, response) {
                wccConsoleLog("Laboratory Info failed to load properly");
                var thisCtl = this.getController("NewPlan.NewPlanTab");
                var CTOSData = thisCtl.getCTOSDataDsp();
                CTOSData.update( "<h2 class='errMsg'>No information available for Template " + this.application.Patient.Template.name + "</h2>" );
				this.application.unMask();	// MWB 19 Jan 2012 - Unmask the screen
            }
        });
	},



	LoadSpecifiedTemplate : function(TemplateID) {
			var CTOSModel = this.getModel("CTOS");
			var CTOSModelParam = TemplateID;
			this.clearCTOS();
	        CTOSModel.load(CTOSModelParam, {
				scope: this,
				success: function (CTOSTemplateData, response) {
					this.application.Patient.AppliedTemplateID = TemplateID;
					this.application.Patient.AppliedTemplate = CTOSTemplateData.data;
					this.application.DataLoadCount--;
					this.PatientDataLoadComplete("Current Applied Template Loaded");

				},
	            failure : function (err, response) {
					this.application.DataLoadCount--;
					this.PatientDataLoadComplete("Current Applied Template - Failed to load - " + response.error);
					// debugger;
				}
	        });
	},

	selTemplateChange : function(combo, recs, eOpts) {
		wccConsoleLog("Template has been selected");

		this.application.Patient.Template = recs[0].data;
		combo.hiddenValue = this.application.Patient.Template.description;
		this.CTOS_DataLoad(this.application.Patient.Template.id);

	},


	SaveBSAInfo : function() {	// Used to update the BSA if it's recalculated
		var Patient = this.application.Patient;
		var ThisAdminDay = this.application.Patient.ThisAdminDay;		// This is the OEM Record for a specific Admin Day - 
		// { id, AdminDate, Cycle, Day, PostTherapy, PostTherapyInstr, PreTherapy, PreTherapyInstr, Therapy, TherapyInstr }

		var dt = new Date();
		var record = {};
		if (ThisAdminDay) {
			record.Cycle = ThisAdminDay.Cycle;
			record.Day = ThisAdminDay.Day;
		}
		else {	// This is NOT an AdminDay for this Regimen
			record.Cycle = "";
			record.Day = "";
		}
		record.patientId = Patient.id;
		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");
		record.Height = String(Patient.Height);
		record.Weight = String(Patient.Weight);
		record.BSA = String(Patient.BSA);
		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;


		record.BP = "";
		record.Systolic = "";
		record.Diastolic = "";
		record.Temperature = "";
		record.Pulse = "";
		record.Respiration = "";
		record.Pain = 0;
		record.SPO2 = "";


		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");

		record.Height = String(Patient.Height);
		record.Weight = String(Patient.Weight);
		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;
		record.BSA = String(Patient.BSA);

		record.BP = "";
		record.Diastolic = 0;
		record.Systolic = 0;

		record.Cycle = "";
		record.Day = "";
		record.Pain = null;
		record.Pulse = 0;
		record.Respiration = "";
		record.SPO2 = "";
		record.Temperature = "";
		record.patientId = Patient.id;

















		var params = Ext.encode(record);

		Ext.Ajax.request({
			url: Ext.URLs.AddVitals,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );

				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + resp.msg );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + e.message + "<br />" + resp.msg );
			}
		});
		return (true);
	}


	/**************************************************
	 *
	 *	MWB 30 Jan 2012 - End of changes
	 *
	 **************************************************/

});


/*jslint devel: true, undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// var tmpRecord; MWB - 28 Dec 2011; Eliminated need for global variable by using the "getSelectedRecord()" function below
// Also cleaned up code below to not require the tmpRecord variable
//test
Ext.apply(Ext.data.validations, {
	regimenVal: function (config, value) {
		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();

		if (0 == drugstore.count()) {
			return false;
		}
		return true;
	}
});

Ext.define('COMS.controller.Authoring.AuthoringTab', {
	extend: 'Ext.app.Controller',
	stores: [
		'TotalCoursesMax'
		, 'CycleLengthMax'
		, 'TimeFrameUnit'
		, 'EmotegenicLevel'
		, 'FebrileNeutropeniaRisk'
		, 'ReferencesStore'
		, 'LUReferences'
		, 'HydrationStore'
		, 'DrugStore'
		, 'DrugUnitsStore'
		, 'InfusionStore'
		, 'CTOS'
		],
	views: [
		'Authoring.References'
		, 'Authoring.Hydration'
		, 'Authoring.DrugRegimen'
		, 'Authoring.AddReference'
		, 'Authoring.CreateNewTemplate'
		, 'Authoring.CycleLength'

		, 'Common.Search4Template'
		, "Common.selCTOSTemplate"
		, "Common.selTemplateType"
		, "Common.selDiseaseAndStage"
		, "Common.selDisease"
		, "Common.selDiseaseStage"
		, "Common.selTemplate"
		, "Common.selSequence"

		],


	refs: [
		{
		ref: "NewTemplate",
		selector: "AuthoringTab CreateNewTemplate"
	},

		{
		ref: "ExistingTemplate",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"]"
	},


		{
		ref: "TemplateDiseaseAndStage",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage"
	},

		{
		ref: "NewTemplateDiseaseAndStage",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"]"
	},


		{
		ref: "DiseaseStage",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"] selDiseaseStage"
	},

		{
		ref: "Disease",
		selector: "AuthoringTab selDiseaseAndStage[name=\"4CreateNewTemplate\"] selDisease"
	},


		{
		ref: "ExistingDiseaseStage",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage selDiseaseStage"
	},

		{
		ref: "ExistingDisease",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selDiseaseAndStage selDisease"
	},


		{
		ref: "TemplateSource",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selTemplateType"
	},


		{
		ref: "Template",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] selTemplate"
	},

		{
		ref: "ResetButton",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] button[title=\"ResetFilter\"]"
	},

		{
		ref: 'NewPlanTemplate',
		selector: 'NewPlanTab PatientInfo CTOS selCTOSTemplate selTemplate'
	},

		{
		ref: "PatientNameField",
		selector: "AuthoringTab container[name=\"selCTOSTemplate\"] textfield[name=\"PatientName\"]"
	},


		{
		ref: "ExistingCourseInfo",
		selector: "AuthoringTab container[name=\"courseInfo\"]"
	},


		// Reference Buttons
	{
		ref: "RemoveReference",
		selector: "AuthoringTab TemplateReferences button[title=\"RemoveReference\"]"
	}, {
		ref: 'EditReference',
		selector: 'AuthoringTab TemplateReferences button[title="EditReference"]'
	},


		// Reference Fields
	{
		ref: 'ReferenceName',
		selector: 'AddReference textfield[name="Reference"]'
	}, {
		ref: 'ReferenceLink',
		selector: 'AddReference textfield[name="ReferenceLink"]'
	}, {
		ref: 'ReferenceCombo',
		selector: 'AddReference combo[name="SelReference"]'
	},
		{
		ref: "CourseNum",
		selector: "AuthoringTab textfield[name=\"CourseNum\"]"
	},
		{
		ref: "CourseNumMax",
		selector: "AuthoringTab textfield[name=\"CourseNumMax\"]"
	},

		// Basic Fields (CycleLength, Regimen Name, Emotegenic Level, Febrile Neutropenia Risk)
	{
		ref: "CycleLength",
		selector: "AuthoringTab combo[name=\"CycleLength\"]"
	},
		{
		ref: "CycleLengthUnit",
		selector: "AuthoringTab combo[name=\"CycleLengthUnits\"]"
	},
		{
		ref: "RegimenName",
		selector: "AuthoringTab textfield[name=\"RegimenName\"]"
	},
		{
		ref: "TemplateAlias",
		selector: "AuthoringTab textfield[name=\"TemplateAlias\"]"
	},
		{
		ref: "EmotegenicLevel",
		selector: "AuthoringTab combo[name=\"EmotegenicLevel\"]"
	},
		{
		ref: "FebrileNeutropeniaRisk",
		selector: "AuthoringTab textfield[name=\"FebrileNeutropeniaRisk\"]"
	},
		{
		ref: "PreHydrationInstructions",
		selector: "TemplateHydration[title=\"Pre Therapy\"] textfield[name=\"HydrationInstructions\"]"
	},
		{
		ref: "PreHydrationGrid",
		selector: "TemplateHydration[title=\"Pre Therapy\"] grid"
	},

		{
		ref: "PostHydrationInstructions",
		selector: "TemplateHydration[title=\"Post Therapy\"] textfield[name=\"HydrationInstructions\"]"
	},
		{
		ref: "PostHydrationGrid",
		selector: "TemplateHydration[title=\"Post Therapy\"] grid"
	},
		{
		ref: "RegimenGrid",
		selector: "TemplateDrugRegimen grid"
	},
		{
		ref: "RegimenInstruction",
		selector: "TemplateDrugRegimen textfield[name=\"RegimenInstructions\"]"
	},
		{
		ref: "ReferencesGrid",
		selector: "TemplateReferences"
	}


	],

	// Ext.ComponentQuery.query("AddReference combo[name=\"CycleLength\"]")[0].el.dom
	init: function () {
		wccConsoleLog('Initialized Authoring Tab Panel Navigation Controller!');
		this.control({

			// Handlers for the contents within the tab panel itself
			"AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]": {
				change: this.AuthorTypeSelected
			},

			'AuthoringTab TemplateReferences': { // The References Grid Control
				itemclick: this.clickUpdateReference
			},
			'AuthoringTab TemplateReferences [title="AddReference"]': { // The "Add Reference" button on the grid control
				click: this.clickAddReference
			},
			'AuthoringTab TemplateReferences button[title="RemoveReference"]': {
				click: this.removeReference
			},
			'AuthoringTab TemplateReferences button[title="EditReference"]': {
				click: this.editReference
			},


			// Handlers for the "Reference" pop-up window
			'AddReference combobox': { // Pop-up window
				select: this.ReferenceSelected
			},
			'AddReference button[action="save"]': {
				click: this.clickSaveReference
			},
			'AddReference button[action="cancel"]': {
				click: this.clickCancelReference
			},
			'AuthoringTab CreateNewTemplate button[action="save"]': {
				click: this.saveTemplate
			},
			'AuthoringTab CreateNewTemplate button[action="clear"]': {
				click: this.clearTemplate
			},
			"AuthoringTab selTemplateType": {
				select: this.onTemplateTypeChange
			},
			"AuthoringTab selDisease": {
				select: this.DiseaseSelected,
                                collapse: this.collapseCombo,
                                expand: this.loadCombo
			},
			//KD - 01/23/2012 - Added collapse and expand handlers for disease stage combo
			//This was done to handle the loading issues when going back and forth between
			//CTOS and Template Authoring and random Loading issues.
			"AuthoringTab selDiseaseStage": {
				select: this.onDiseaseStageChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo

			},
			"AuthoringTab selTemplate": {
				select: this.selTemplateChange,
				collapse: this.collapseCombo,
				expand: this.loadCombo
			},
			"AuthoringTab container[name=\"selCTOSTemplate\"] button[title=\"ResetFilter\"]": {
				click: this.resetTemplateFilter
			}
		});
	},

	//KD - 01/23/2012 - This is shared function between Disease stage combo and Select Templates combo    
	loadCombo: function (picker, eOpts) {

		var originalHiddenVal = null;
		picker.hiddenValue = picker.getRawValue();
		picker.clearValue();

		var URI, id;

		if (picker.name == "FilteredTemplates") {
			if (this.application.ResetClicked) {
				URI = Ext.URLs.Templates;
				id = null;
				originalHiddenVal = picker.hiddenValue;
			} else {
				URI = Ext.URLs.Templates + "/Cancer/";
				id = this.application.Cancer.id;
			}

		} else if (picker.name == "Select Disease Stage Control") {
			URI = Ext.URLs.DiseaseStage + "/";
			id = this.application.Cancer.id;
		} else if (picker.name == "Select Disease Control"){
                    if(null != this.application.TemplateType && null != this.application.TemplateType.id){
			URI = Ext.URLs.DiseaseType + "/Source/";
			id = this.application.TemplateType.id;
                        this.application.TemplateType.id = null;
                    }else{
                        URI = Ext.URLs.DiseaseType;
                        id = '';
                    }
                    
                    /*
                    if(eOpts.length && "Refresh" === eOpts){
                        URI = Ext.URLs.DiseaseType;
                        this.application.TemplateType.id = null;
                        id = '';
                    }else if(null != this.application.TemplateType && null != this.application.TemplateType.id){
			URI = Ext.URLs.DiseaseType + "/Source/";
			id = this.application.TemplateType.id;
                    }*/
                }

		picker.getStore().load({
			params: {
				URL: URI,
				ID: id
			},
			callback: function (records, operation, success) {
				if (success) {
					if (null != originalHiddenVal) {
						picker.setRawValue(originalHiddenVal);
					}
				}
			}
		});

	},

	collapseCombo: function (picker, eOpts) {

		if (picker.getValue() == null && picker.hiddenValue != null) {
			picker.setRawValue(picker.hiddenValue);
		}

	},


	resetTemplateFilter: function (button) {

		if (null != this.application.Template) {
			this.getTemplate().setRawValue(this.application.Template.description);
		}

		this.application.ResetClicked = true;
		this.loadCombo(this.getTemplate());
                //this.loadCombo(this.getDisease(),"Refresh");
                this.loadCombo(this.getDisease());

		Ext.MessageBox.alert('Success', 'Template filters have been removed. All available Templates and Cancer Types will be displayed. ');

	},

	saveTemplate: function (button) {

		this.application.loadMask("Please wait; Saving Template");

		var diseaseId = null;
		var diseaseStageId = null;

		if (null == this.application.Cancer) {
			diseaseId = '';
			diseaseStageId = '';
		} else {
			diseaseId = this.application.Cancer.id;
			if (null == this.application.Cancer.Stage) {
				diseaseStageId = '';
			} else {
				diseaseStageId = this.application.Cancer.Stage.id;
			}

		}
		
		var Order_IDR = '00000000-0000-0000-0000-000000000000';

		var courseNum = this.getCourseNum().getValue();
		var courseNumMax = this.getCourseNumMax().getValue();

		var cycleLength = this.getCycleLength().getValue();
		var cycleLengthUnit = this.getCycleLengthUnit().getValue();

		if (null != cycleLengthUnit && null != cycleLengthUnit.id) {
			cycleLengthUnit = cycleLengthUnit.id;
		} else if (null == cycleLengthUnit) {
			cycleLengthUnit = '';
		}

		//var regimenName = this.getRegimenName().getValue();
		var templateAlias = this.getTemplateAlias().getValue();
		var emotegenicLevel = this.getEmotegenicLevel().getValue();

		if (null != emotegenicLevel && null != emotegenicLevel.id) {
			emotegenicLevel = emotegenicLevel.id;
		} else if (null == emotegenicLevel) {
			emotegenicLevel = '';
		}

		var fnRisk = this.getFebrileNeutropeniaRisk().getValue();

		var preMhInstructions = this.getPreHydrationInstructions().getValue();
		var postMhInstructions = this.getPostHydrationInstructions().getValue();
		var therapyInstructions = this.getRegimenInstruction().getValue();

		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();

		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();

		var referencesArray = [], ref, limitCount = refstore.count(), i, referenceModel;

		for (i = 0; i < refstore.count(); i++) {
			referenceModel = refstore.getAt(i);
			ref = Ext.create(Ext.COMSModels.CTOS_References, {
				RefID: referenceModel.data.id,
				Ref: referenceModel.data.Reference,
				RefURI: referenceModel.data.ReferenceLink
			});
			referencesArray.push(ref);
		}

		var drugArray = [], drug, drugModel;
		limitCount = drugstore.count();

		for (i = 0; i < limitCount; i++) {
			drugModel = drugstore.getAt(i);
			drug = Ext.create(Ext.COMSModels.Med, {
				Drug: drugModel.data.Drug,
				Amt: drugModel.data.Amt,
				Units: drugModel.data.Units,
				Route: drugModel.data.Route,
				Day: drugModel.data.Day,
				FluidVol: drugModel.data.FluidVol,
				InfusionTime: drugModel.data.InfusionTime,
				FlowRate: drugModel.data.FlowRate,
				Instructions: drugModel.data.Instructions,
				Sequence: drugModel.data.Sequence,
				AdminTime: drugModel.data.AdminTime,
				FluidType: drugModel.data.FluidType

			});

			drugArray.push(drug);
		}

		var preMHArray = [], postMHArray = [], preMhModel, postMhModel, preMH, postMH, infusionArray, infusion1, infusion2;
		limitCount = preMhStore.count();

		for (i = 0; i < limitCount; i++) {
			preMhModel = preMhStore.getAt(i);
			infusionArray = [];

			infusion1 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: preMhModel.data.Amt1,
				unit: preMhModel.data.Units1,
				type: preMhModel.data.Infusion1,
				flowRate: preMhModel.data.FlowRate1,
				fluidVol: preMhModel.data.FluidVol1,
				fluidType: preMhModel.data.FluidType1,
				infusionTime: preMhModel.data.InfusionTime1,
				instruction: preMhModel.data.Instructions
			});

			infusion2 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: preMhModel.data.Amt2,
				unit: preMhModel.data.Units2,
				type: preMhModel.data.Infusion2,
				flowRate: preMhModel.data.FlowRate2,
				fluidVol: preMhModel.data.FluidVol2,
				fluidType: preMhModel.data.FluidType2,
				infusionTime: preMhModel.data.InfusionTime2,
				instruction: preMhModel.data.Instructions
			});

			if ('' != preMhModel.data.Amt1 && '' != preMhModel.data.Units1 && '' != preMhModel.data.Infusion1) {
				infusionArray.push(infusion1);
			}
			if ('' != preMhModel.data.Amt2 && '' != preMhModel.data.Units2 && '' != preMhModel.data.Infusion2) {
				infusionArray.push(infusion2);
			}

			preMH = Ext.create(Ext.COMSModels.MHMed, {
				drugid: preMhModel.data.Drug,
				preporpost: 'Pre',
				description: preMhModel.data.Instructions,
				infusions: infusionArray,
				adminDay: preMhModel.data.Day,
				sequence: preMhModel.data.Sequence,
				adminTime: preMhModel.data.AdminTime
			});

			preMHArray.push(preMH);

		}

		limitCount = postMhStore.count();

		for (i = 0; i < limitCount; i++) {
			postMhModel = postMhStore.getAt(i);
			infusionArray = [];

			infusion1 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: postMhModel.data.Amt1,
				unit: postMhModel.data.Units1,
				type: postMhModel.data.Infusion1,
				flowRate: postMhModel.data.FlowRate1,
				fluidVol: postMhModel.data.FluidVol1,
				fluidType: postMhModel.data.FluidType1,
				infusionTime: postMhModel.data.InfusionTime1,
				instruction: postMhModel.data.Instructions
			});

			infusion2 = Ext.create(Ext.COMSModels.MHMedInfusion, {
				amt: postMhModel.data.Amt2,
				unit: postMhModel.data.Units2,
				type: postMhModel.data.Infusion2,
				flowRate: postMhModel.data.FlowRate1,
				fluidVol: postMhModel.data.FluidVol1,
				fluidType: postMhModel.data.FluidType1,
				infusionTime: postMhModel.data.InfusionTime1,
				instruction: postMhModel.data.Instructions
			});

			if ('' != postMhModel.data.Amt1 && '' != postMhModel.data.Units1 && '' != postMhModel.data.Infusion1) {
				infusionArray.push(infusion1);
			}
			if ('' != postMhModel.data.Amt2 && '' != postMhModel.data.Units2 && '' != postMhModel.data.Infusion2) {
				infusionArray.push(infusion2);
			}

			postMH = Ext.create(Ext.COMSModels.MHMed, {
				drugid: postMhModel.data.Drug,
				preporpost: 'Post',
				description: postMhModel.data.Instructions,
				infusions: infusionArray,
				adminDay: postMhModel.data.Day,
				sequence: postMhModel.data.Sequence,
				adminTime: postMhModel.data.AdminTime

			});

			postMHArray.push(postMH);

		}

		var template = Ext.create(Ext.COMSModels.CTOS, {
			Order_IDR: Order_IDR,
			CourseNum: courseNum,
			CourseNumMax: courseNumMax,
			RegimenName: templateAlias,
			CycleLength: cycleLength,
			CycleLengthUnit: cycleLengthUnit,
			ELevel: emotegenicLevel,
			FNRisk: fnRisk,
			//References: refstore.getRange(0,refstore.count()),
			References: referencesArray,
			PreMHInstructions: preMhInstructions,
			PostMHInstructions: postMhInstructions,
			RegimenInstruction: therapyInstructions,
			//PreMHMeds: preMhStore.getRange(0,preMhStore.count()),
			PreMHMeds: preMHArray,
			//PostMHMeds:  postMhStore.getRange(0,postMhStore.count()),
			PostMHMeds: postMHArray,
			//Meds: drugstore.getRange(0,drugstore.count()),
			Meds: drugArray,
			Disease: diseaseId,
			DiseaseStage: diseaseStageId
		});

		var errors = template.validate();

		if (errors.length > 0) {

			var msg = '';

			errors.each(function (error) {
				//msg += "field: " + error.field + " message: " + error.message + "<br/>";
				msg += " message: " + error.message + "<br/>";
			});

			Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);
			this.application.unMask();
			return;
		}

		template.save({
			scope: this,
			success: function (data) {
				wccConsoleLog("Saved Template ");
				this.getNewPlanTemplate().getStore().removeAll(true);
				this.getNewPlanTemplate().getStore().load();

				this.getTemplate().getStore().removeAll(true);
				this.getTemplate().getStore().load();

				this.clearTemplate(button);
				Ext.MessageBox.alert('Success', 'Template saved with name: ' + data.data.RegimenName);
				this.application.unMask();

			},
			failure: function (record, op) {
				wccConsoleLog("Save Template Failed");
				this.application.unMask();
				var ErrMsg = "Unknown Framework Error when attempting to save Template";
				if (op.request.scope.reader.jsonData["frameworkErr"]) {
					ErrMsg = op.request.scope.reader.jsonData["frameworkErr"];
				}
				Ext.MessageBox.alert('Failure', 'Template was not saved: ' + ErrMsg);
			}
		});


	},

	clearTemplate: function (button) {

		var NewTemplateObj = this.getNewTemplate();
		var ExistingTemplateObj = this.getExistingTemplate();
		var templateCombo = this.getTemplate();
		var selDiseaseAndStageObj = this.getNewTemplateDiseaseAndStage();
		var existingDiseaseAndStageObj = this.getTemplateDiseaseAndStage();
		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		var newTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[1];

		var lblReqFields = Ext.ComponentQuery.query("AuthoringTab container[name=\"lblRequiredFields\"]")[0];

		if (this.getExistingCourseInfo().hidden == false) {
			this.getExistingCourseInfo().hide();
			this.clearValue(this.getCourseNum());
			this.clearValue(this.getCourseNumMax());
		}

		if (this.getPatientNameField().hidden == false) {
			this.getPatientNameField().hide();
		}

		if (templateCombo.hidden == false) {
			this.getTemplate().hide();
		}

		if (ExistingTemplateObj.hidden == false) {
			ExistingTemplateObj.hide();
			this.getResetButton().hide();
		}
		if (NewTemplateObj.hidden == false) {
			NewTemplateObj.hide();
		}
		if (selDiseaseAndStageObj.hidden == false) {
			selDiseaseAndStageObj.hide();
		}
		if (existingDiseaseAndStageObj.hidden == false) {
			existingDiseaseAndStageObj.hide();
		}


		if (button != null && (button.action == 'save' || button.action == 'clear')) {
			existingTemplate.setValue(false);
			newTemplate.setValue(false);
			lblReqFields.hide();

			var thisCtl = this.getController("NewPlan.NewPlanTab");
			thisCtl.clearCTOS();

		}

		this.clearValue(this.getTemplate());
		this.getTemplate().hiddenValue = null;

		this.clearValue(this.getDisease());
		this.clearValue(this.getEmotegenicLevel());
		this.clearValue(this.getExistingDisease());
		this.clearValue(this.getDiseaseStage());
		this.clearValue(this.getExistingDiseaseStage());
		this.clearValue(this.getCycleLength());
		this.clearValue(this.getCycleLengthUnit());
		this.clearValue(this.getRegimenName());
		this.clearValue(this.getTemplateAlias());
		this.clearValue(this.getEmotegenicLevel());
		this.clearValue(this.getFebrileNeutropeniaRisk());
		this.clearValue(this.getPreHydrationInstructions());
		this.clearValue(this.getPostHydrationInstructions());
		this.clearValue(this.getRegimenInstruction());

		this.getTemplateSource().setValue('');

		//            this.getNewPlanDisease().setValue('');
		//            this.getNewPlanDiseaseStage().setValue('');
		//var templatesource = Ext.ComponentQuery.query('AuthoringTab selTemplateType')[0];
		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();
		refstore.removeAll(true);
		refgrid.getView().refresh(true);

		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();
		drugstore.removeAll(true);
		druggrid.getView().refresh(true);

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();
		preMhStore.removeAll(true);
		preMHgrid.getView().refresh(true);

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();
		postMhStore.removeAll(true);
		postMHgrid.getView().refresh(true);

	},

	clearValue: function (field) {
		if (field.getValue() || field.getRawValue()) {
			field.reset();
		}
	},

	// Used in both the Hydration and Refernce Grids
	getSelectedRecord: function (destroy, query) {
		var theGrid, theView, theSelModel, HasSelection = false,
			selRows, theRecord, theStore, theIndex;

		theGrid = Ext.ComponentQuery.query(query)[0];
		theView = theGrid.getView();
		theSelModel = theView.getSelectionModel();
		HasSelection = theSelModel.hasSelection();
		if (HasSelection) {
			selRows = theSelModel.getSelection();
			theRecord = selRows[0];
			theStore = theView.getStore();
			theIndex = theStore.indexOf(theRecord);
			if (destroy) {
				theStore.removeAt(theIndex);
				return {};
			}
		}
		return {
			hasRecord: HasSelection,
			record: theRecord,
			rowNum: theIndex
		};
	},


	// User has selected what they want to do...
	AuthorTypeSelected: function (rbtn, newValue, oldValue, eOpts) {
		wccConsoleLog("User has selected what to do");

		var NewTemplateObj = this.getNewTemplate();
		var ExistingTemplateObj = this.getExistingTemplate();
		var selDiseaseAndStageObj = this.getNewTemplateDiseaseAndStage();

		var lblReqFields = Ext.ComponentQuery.query("AuthoringTab container[name=\"lblRequiredFields\"]")[0];

		lblReqFields.show();
		var What2Do = rbtn.inputValue;

		if (newValue) {
			if (0 === What2Do) { // Select an Existing Template
				this.clearTemplate(rbtn);
				ExistingTemplateObj.show();
				selDiseaseAndStageObj.hide();
				NewTemplateObj.hide();
			} else { // Create a New Template
				this.application.loadMask();
				this.clearTemplate(rbtn);
                                this.loadCombo(this.getDisease());
				ExistingTemplateObj.hide();
				// MWB 5 Jan 2012
				// Note: need to add some code in here to clear out all the fields if an existing template was selected first.
				// Also need to alert the user that any unsaved data in their existing template will be lost and prompt them to save it first.
				this.getExistingCourseInfo().show();
				selDiseaseAndStageObj.show();
				NewTemplateObj.show();
				this.application.unMask();

			}
		}

	},

	//-------------------------------------------------------------------------
	//
	//	Template Source (National/Local/Personal) Selected - Phase 1 of the CTOS Tab
	//
	//
	onTemplateTypeChange: function (combo, recs, eOpts) {
		wccConsoleLog("Select Template Type");
		if (null !== recs[0]) {
		this.application.TemplateType = recs[0].data;
		}
		var obj = this.getTemplateDiseaseAndStage();
		obj.show();

		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		if (existingTemplate.getValue()) {
			this.getResetButton().show();
		}

	},
	//
	//
	//	END Template Source Selected
	//
	//-------------------------------------------------------------------------

	//-------------------------------------------------------------------------
	//
	//	Disease Type Selected - Phase 2 of the CTOS Tab
	//
	//
	DiseaseSelected: function (combo, recs, eOpts) {
		wccConsoleLog('Disease Type has been selected');
		if (this.application.Cancer != recs[0].data) {
			this.application.ResetClicked = false;
		}
		this.application.Cancer = recs[0].data;
		this.getTemplate().show();
	},



	//-------------------------------------------------------------------------
	//
	//	Disease Stage Selected - Phase 2 of the CTOS Tab
	//
	//
	onDiseaseStageChange: function (combo, recs, eOpts) {
		wccConsoleLog("Disease Type and Stage has been selected");
		var existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
		this.application.Cancer.Stage = recs[0].data;

		combo.hiddenValue = recs[0].data.name;

		this.getTemplate().show();

		if (existingTemplate.getValue()) {
			this.getResetButton().show();
		}


	},

	afterCTOSLoaded: function (template) {
		wccConsoleLog("CTOS Loaded - Processing");

		this.getExistingCourseInfo().show();
		this.getNewTemplate().show();

                var disease = this.getExistingDisease();

                var diseaseRecord = disease.getStore().getById(template.data.Disease);

                if(null === diseaseRecord){
                    var authorCtl = this.getController("Authoring.AuthoringTab");
                    disease.getStore().load({
                        params: {
                                URL: Ext.URLs.DiseaseType + "/",
                                ID: disease.getValue()
                        },
                        callback: function (records, operation, success) {
                                if (success) {
                                    var diseaseRecord = disease.getStore().getById(disease.getValue());
                                    authorCtl.afterFindDisease(template);
                                }else{
                                    Ext.MessageBox.alert('Failure', 'Cancer type could not be found for this template. ');
                                }
                        }
                    });

                }else {
                    this.afterFindDisease(template);
                }
        },
        
        afterFindDisease: function (template){

		this.getExistingDisease().setValue(template.data.Disease);

		this.getExistingDiseaseStage().setValue(template.data.DiseaseStage[0].name);

		this.getCourseNum().setValue(template.data.CourseNum);
		this.getCourseNumMax().setValue(template.data.CourseNumMax);

		this.getCycleLength().setValue(template.data.CycleLength);

		this.getCycleLengthUnit().setValue(template.data.CycleLengthUnit[0].name);

		this.getRegimenName().setValue(template.data.RegimenName);

		this.getEmotegenicLevel().setValue(template.data.ELevel[0].name);

		this.getFebrileNeutropeniaRisk().setValue(template.data.FNRisk);

		this.getPreHydrationInstructions().setValue(template.data.PreMHInstructions);

		this.getPostHydrationInstructions().setValue(template.data.PostMHInstructions);

		this.getRegimenInstruction().setValue(template.data.RegimenInstruction);


		var refgrid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0];
		var refstore = refgrid.getStore();
		refstore.removeAll();

		var druggrid = Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0];
		var drugstore = druggrid.getStore();
		drugstore.removeAll();

		var preMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Pre Therapy"] grid')[0];
		var preMhStore = preMHgrid.getStore();
		preMhStore.removeAll();

		var postMHgrid = Ext.ComponentQuery.query('AuthoringTab TemplateHydration[title="Post Therapy"] grid')[0];
		var postMhStore = postMHgrid.getStore();
		postMhStore.removeAll();

		preMhStore.add(template.data.PreMHMeds);
		refstore.add(template.data.References);
		drugstore.add(template.data.Meds);
		postMhStore.add(template.data.PostMHMeds);

		this.application.unMask();

	},

	selTemplateChange: function (combo, recs, eOpts) {
		wccConsoleLog("Template has been selected");

		var CTOSModelParam = recs[0].data.id;

		wccConsoleLog("Template Params = " + CTOSModelParam);

		//this.getTemplate().hiddenValue = recs[0].data.description;
		this.application.Template = recs[0].data;

		combo.hiddenValue = this.application.Template.description;

		this.application.loadMask();


		var mytemplate;
		var authoringCtl = this.getController("Authoring.AuthoringTab");

		//KD - 01/23/2012 - Modified the way the CTOS object gets loaded. This should help with performance.
		this.getStore('CTOS').load({
			params: {
				URL: Ext.URLs.CTOS,
				id: this.application.Template.id
			},
			callback: function (records, operation, success) {
				if (success) {
					mytemplate = this.getAt(0);
					authoringCtl.afterCTOSLoaded(mytemplate);
				} else {
					authoringCtl.application.unMask();
					Ext.MessageBox.alert('Failure', 'Load Template Failed: ' + operation.request.scope.reader.jsonData["frameworkErr"]);

				}
			}
		});

	},




	//--------------------------------------------------------------------------------
	//	Reference Grid Handlers
	//
	ReferenceSelected: function (combo, recs, eOpts) {
		wccConsoleLog('Reference Selected - ' + recs[0].data.name);
		var piData = recs[0].data;
		this.getReferenceName().setValue(piData.name);
		this.getReferenceLink().setValue(piData.description);
	},

	removeReference: function (button) {
		var ckRec = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences');
		if (ckRec.hasRecord) {
			wccConsoleLog('Remove Reference - ' + ckRec.record.get('Reference') + ' - ' + ckRec.record.get('ReferenceLink'));
			var reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: ckRec.record.get('Reference'),
				description: ckRec.record.get('ReferenceLink'),
				lookupid: ckRec.record.get('id')
			});

			reference.destroy({
				scope: this,
				success: function (data) {
					this.getSelectedRecord(true, 'AuthoringTab TemplateReferences'); // remove the selected record from the current store
					this.getRemoveReference().disable();
					this.getEditReference().disable();
				}
			});
		} else {
			Ext.MessageBox.alert('Invalid', 'Please select a Row in the References Grid.');
		}
	},

	editReference: function (grid, record) {
		var ckRec = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences');
		if (ckRec.hasRecord) {
			wccConsoleLog('Editing Reference - ' + ckRec.record.get('Reference') + ' - ' + ckRec.record.get('ReferenceLink'));
			var view = Ext.widget('AddReference'); // Creates an instance of the "Add Reference" pop-up window
			view.setTitle("Edit Reference");
			view.down('form').loadRecord(ckRec.record);
			this.getReferenceCombo().setValue(ckRec.record.get('Reference'));
		} else {
			Ext.MessageBox.alert('Invalid', 'Please select a Row in the References Grid.');
		}
	},

	clickAddReference: function (button) {
		var view = Ext.widget('AddReference'); // Creates an instance of the "Add Reference" pop-up window
		view.setTitle("Add Reference");
	},

	clickUpdateReference: function (grid, record) {
		this.getRemoveReference().enable();
		this.getEditReference().enable();
	},

	clickCancelReference: function (button) {
		var win = button.up('window');
		this.getRemoveReference().disable();
		this.getEditReference().disable();
		win.close();

	},

	clickSaveReference: function (button) {
		// var grid = Ext.widget('TemplateReferences');		// Note: this gets a new instance of a particular widget by it's xtype, NOT an existing instance
		var grid = Ext.ComponentQuery.query('AuthoringTab TemplateReferences')[0]; // Get's a specific existing instance of the widget by it's CSS style reference
		var store = grid.getStore();
		var win = button.up('window');
		var form = win.down('form');
		var values = form.getValues();

		var record = form.getRecord();
		var rowNum = store.indexOf(record);
		var reference;
		var existingRecord = null;

		if (this.getSelectedRecord(false, 'AuthoringTab TemplateReferences').hasRecord) {
			existingRecord = this.getSelectedRecord(false, 'AuthoringTab TemplateReferences').record;
		}
		//KD - 12/28/11 - Check to ensure a record is not being edited or selected from drop down
		if (!record && !existingRecord) {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: values.Reference,
				description: values.ReferenceLink,
				lookupid: ''
			});

			//KD - 12/28/11 - Check to ensure a record is not being edited but is selected from drop down
		} else if (!record && existingRecord) {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: this.getReferenceName().getValue(),
				description: this.getReferenceLink().getValue()
			});

			//KD - 12/28/11 - Record is being edited
		} else {
			reference = Ext.create('COMS.model.LookupTable', {
				id: '9',
				value: values.Reference,
				description: values.ReferenceLink,
				lookupid: record.get('id')
			});
		}

		this.application.loadMask("Please wait; Saving Reference");
		reference.save({
			scope: this,
			waitMsg: 'Saving Data...',
			success: function (data) {
				wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
				var ref = Ext.create(Ext.COMSModels.References, {
					id: data.data.lookupid,
					Reference: data.data.value,
					ReferenceLink: data.data.description
				});

				var comboReference = Ext.create(Ext.COMSModels.LUReferences, {
					id: data.data.lookupid,
					name: data.data.value,
					description: data.data.description
				});

				if (-1 === rowNum) {
					store.insert(0, ref);
				} else {
					store.removeAt(rowNum);
					store.insert(rowNum, ref);
				}

				this.getReferenceCombo().getStore().insert(0, comboReference);
				this.getRemoveReference().disable();
				this.getEditReference().disable();
				win.close();
				this.application.unMask();
			},
			failure: function (record, op) {
				var thisCtl = this.getController('Authoring.AuthoringTab');
				var comboStore = this.getReferenceCombo().getStore();

				//KD - 12/28/11 - Check to ensure the duplicate record is in the combo store
				var recordIndex = comboStore.findBy(

				function (record, id) {
					if (record.get('name') === thisCtl.getReferenceName().getValue() && record.get('description') === thisCtl.getReferenceLink().getValue()) {
						return true;
					}
					return false;
				});

				var ref;
				var existingRowNum = -1;
				if (recordIndex !== -1) {
					var comboRecord = comboStore.getAt(recordIndex);
					ref = Ext.create(Ext.COMSModels.References, {
						id: comboRecord.get('id'),
						Reference: comboRecord.get('name'),
						ReferenceLink: comboRecord.get('description')
					});
					existingRowNum = store.find('id', comboRecord.get('id'));
				} else {
					try {
						ref = Ext.create(Ext.COMSModels.References, {
							id: op.request.scope.reader.jsonData["lookupid"],
							Reference: record.data.value,
							ReferenceLink: record.data.description
						});
					}
					catch (e) {
					}
				}


				//KD - 12/28/11 - If the record does not exist in the grid store then add it to the grid
				if (-1 === existingRowNum) {
					store.insert(0, ref);
					this.getRemoveReference().disable();
					this.getEditReference().disable();
					win.close();
					this.application.unMask();
				} else {
					Ext.MessageBox.alert('Invalid', 'This reference already exists.');
				}
			}
		});
	}
});

Ext.apply(Ext.data.validations, {
    fluidVolregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    adminTimeregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    flowRateregimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    },

    fluidTyperegimen: function (config, value) {
        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var form = drugRegimen.down('form');
        var values = form.getValues();
        var route = values.Route;

        if ("IVPB" == route || "IV" == route || "IVP" == route) {
            if ('' == value) {
                return false;
            }
        }
        return true;
    }
});

Ext.define("COMS.controller.Authoring.DrugRegimen", {
    extend: "Ext.app.Controller",
    stores: ['DrugRegimenStore'
    , 'DrugStore'
    , 'DrugUnitsStore'
    , 'InfusionStore'
    ],
    views: ['Authoring.AddDrugRegimen', 'Management.EditLookup', 'Authoring.HydrationSequence'],
    refs: [
    // Drug Regimen Buttons
    {
        ref: 'RemoveDrugRegimen',
        selector: 'AuthoringTab TemplateDrugRegimen button[text="Remove Drug"]'
    }, {
        ref: 'EditDrugRegimen',
        selector: 'AuthoringTab TemplateDrugRegimen button[text="Edit Drug"]'
    },

    // Drug Regimen Fields
    {
        ref: 'DrugRegimenAdminDay',
        selector: 'AddDrugRegimen textfield[name="Day"]'
    }, {
        ref: 'DrugRegimenDrug',
        selector: 'AddDrugRegimen combo[name="Drug"]'
    }, {
        ref: 'DrugRegimenSequence',
        selector: 'AddDrugRegimen combo[name="Sequence"]'
    },
    {
        ref: 'DrugRegimenAmt',
        selector: 'AddDrugRegimen textfield[name="Amt"]'
    }, {
        ref: 'DrugRegimenUnits',
        selector: 'AddDrugRegimen combo[name="Units"]'
    }, {
        ref: 'DrugRegimenRoute',
        selector: 'AddDrugRegimen combo[name="Route"]'
    }, {
        ref: 'DrugRegimenFluidVol',
        selector: 'AddDrugRegimen textfield[name="FluidVol"]'
    }, {
        ref: 'DrugRegimenInfusionTime',
        selector: 'AddDrugRegimen textfield[name="InfusionTime"]'
    }, {
        ref: 'DrugRegimenFlowRate',
        selector: 'AddDrugRegimen textfield[name="FlowRate"]'
    }, {
        ref: 'DrugRegimenFluidType',
        selector: 'AddDrugRegimen textfield[name="FluidType"]'
    }, {
        ref: 'DrugRegimenInstructions',
        selector: 'AddDrugRegimen textfield[name="Instructions"]'
    },
    {
        ref: 'DrugRegimenGrid',
        selector: 'AuthoringTab TemplateDrugRegimen grid'
    }, {
        ref: 'FluidInfo',
        selector: 'AddDrugRegimen container[name="fluidInfo"]'
    }, {
        ref: 'DrugRegimenAdminTime',
        selector: 'AddDrugRegimen textfield[name="AdminTime"]'
    }, {
        ref: 'DoseSpacer',
        selector: 'AddDrugRegimen container[name="dosespacer"]'
    }, { 
        ref: "PatientType",
        selector: "AddDrugRegimen radiogroup[name=\"patientRadio\"]"
    }

    ],

    // Ext.ComponentQuery.query('AuthoringTab TemplateDrugRegimen grid')[0].el.dom
    init: function () {
        wccConsoleLog('Initialized Drug Regimen Controller!');
        this.control({
            // MWB 30 Dec 2011 - Added the Drug Regimen functionality...
            'AuthoringTab TemplateDrugRegimen button': {
                click: this.DrugRegimenBtns
            },
            'AuthoringTab TemplateDrugRegimen grid': {
                itemclick: this.clickDrugRegimenGrid,
                itemcontextmenu: this.onCtxHandler
            },
            'AddDrugRegimen button[text="Save"]': { // Pop-up window
                click: this.SaveDrugRegimen
            },
            'EditLookup button[action="save"]': {
                click: this.clickSaveDrug
            },
            'AdminTab EditLookup button[action="cancel"]': {
                click: this.clickCancelDrug
            },
            'HydrationSequence[title=\"Therapy Sequence\"] button[text="Save"]': {
                click: this.SaveSequence
            },
            'AddDrugRegimen combo[name="Route"]': {
                select: this.routeSelected
            },
            'AddDrugRegimen textfield[name="FlowRate"]': {
                blur: this.calcInfusionTime
            },
            'AddDrugRegimen textfield[name="FluidVol"]': {
                blur: this.calcInfusionTime
            },
            'AddDrugRegimen combo[name="Drug"]' : {
                collapse: this.collapseCombo,
                expand : this.loadCombo
            }
        });
    },
    collapseCombo : function(picker,eOpts){
        if(picker.getValue() == null && picker.hiddenValue != null){
            picker.setRawValue(picker.hiddenValue);		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        }

    },    
    loadCombo: function (picker, eOpts) {

			if (picker.getStore()) {		// MWB - 6/19/2012 - Added to remove the filter added to the store
				picker.getStore().clearFilter();
			}


            var originalHiddenVal = null;
            picker.hiddenValue = picker.getRawValue();
            picker.clearValue();

            var URI, id;
            var patientType = this.getPatientType().getValue().PatientType;

            if (picker.name == "Drug") {
                    URI = Ext.URLs.Drugs + "/";
                    id = patientType;
            }
            
            picker.getStore().load({
                    params: {
                            URL: URI,
                            ID: id
                    },
                    callback: function (records, operation, success) {
                            if (success) {
                                    if (null != originalHiddenVal) {
                                            picker.setRawValue(originalHiddenVal);
                                    }
                            }
                    }
            });

    },
    calcInfusionTime: function (field, eOpts) {
        var fluidVol = this.getDrugRegimenFluidVol().getValue();
        var flowRate = this.getDrugRegimenFlowRate().getValue();
        if ('' != flowRate && '' != fluidVol) {
            this.getDrugRegimenInfusionTime().setValue(Ext.CalcInfusionTime(fluidVol, flowRate, true));
        }

    },

    routeSelected: function (combo, recs, eOpts) {
        var route = null;

        if (null != recs) {
            route = recs[0].data.name;
        } else {
            route = combo.getValue();
        }

        if (null != route && '' != route) {
            if ("IVPB" == route || "IV" == route || "IVP" == route) {
                this.getFluidInfo().show();
                this.getDoseSpacer().hide();
                this.getDrugRegimenAdminTime().show();
                this.getStore('LookupStore').load({
                    params: {
                        URL: Ext.URLs.Lookups,
                        id: '/FluidType'
                    }
                });
            } else {
                this.getDoseSpacer().show();
                this.getDrugRegimenAdminTime().hide();
                this.getFluidInfo().hide();
            }
        }
    },

    SaveSequence: function (button) {

        var drugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];

        var win = button.up('window');
        var theForm = win.down('form');
        var values = theForm.getValues();
        var query = "AuthoringTab TemplateDrugRegimen grid";
        var theGrid = Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var hydrationForm = drugRegimen.down('form');
        var regimenValues = hydrationForm.getValues();
        var numRecords = theStore.count();

        var newRecord = this.validateRecord(regimenValues);

        if(null == newRecord){
            return;
        }
        
        if (0 == values.ApplySequence) {

            regimenValues.Sequence = numRecords + 1;
            newRecord.data.Sequence = regimenValues.Sequence;
            this.addRecord(drugRegimen,newRecord,regimenValues,theStore);
            
            win.close();
            drugRegimen.close();


        } else if (1 == values.ApplySequence) {

            var records = [];
            var index = regimenValues.Sequence - 1;
            var replacedRecord = theStore.getAt(index);
            var i, tmpModel;

            replacedRecord.data.Sequence++;
            records.push(replacedRecord);

            theStore.removeAt(index);
            theStore.insert(index++, newRecord);

            for (i = index; i <= numRecords; i++) {
                tmpModel = theStore.getAt(i);

                theStore.removeAt(i);
                theStore.insert(i, records.pop());

                if (null != tmpModel) {
                    tmpModel.data.Sequence++;
                    records.push(tmpModel);
                }
            }
            win.close();
            drugRegimen.close();
        }
    },

    onCtxHandler: function onCtxHandler(grid, record, item, index, event) {
        event.stopEvent();
        var menu = new Ext.menu.Menu({
            items: [{
                id: 'inc',
                text: 'Increase Sequence',
                handler: function () {
                    var theStore = grid.getStore();
                    var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
                    var prevRecord = theStore.getAt(index - 1);

                    var desiredSequence = prevRecord.data.Sequence;
                    var currSequence = currRecord.data.Sequence;

                    currRecord.data.Sequence = desiredSequence;
                    prevRecord.data.Sequence = currSequence;

                    theStore.removeAt(index);
                    theStore.removeAt(index - 1);

                    theStore.insert(index - 1, currRecord);
                    theStore.insert(index, prevRecord);
                }
            }, {
                id: 'dec',
                text: 'Decrease Sequence',
                handler: function () {
                    var theStore = grid.getStore();
                    var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
                    var nextRecord = theStore.getAt(index + 1);

                    var desiredSequence = nextRecord.data.Sequence;
                    var currSequence = currRecord.data.Sequence;

                    currRecord.data.Sequence = desiredSequence;
                    nextRecord.data.Sequence = currSequence;

                    theStore.removeAt(index + 1);
                    theStore.removeAt(index);

                    theStore.insert(index, nextRecord);
                    theStore.insert(index + 1, currRecord);
                }
            }]
        });


        if (0 == index) {
            menu.items.get('inc').disabled = true;
        } else if (index == grid.getStore().count() - 1) {
            menu.items.get('dec').disabled = true;
        }
        menu.showAt(event.xy);
    },


    clickSaveDrug: function (button) {
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();

        var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, {
            id: '26',
            value: values.name,
            description: values.description
        });

        lookupRecord.save({
            scope: this,
            waitMsg: 'Saving Data...',
            success: function (data) {
                wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
                win.close();
            },
            failure: function (err) {

                Ext.MessageBox.alert('Invalid', 'This Drug already exists.');

            }
        });
    },

    clickCancelDrug: function (button) {
        var win = button.up('window');
        win.close();
    },

    getSelectedRecord: function (destroy, query) {
        
        var theGrid, theView, theSelModel, HasSelection = false, selRows, theRecord, theStore, theIndex;

        theGrid = this.getDrugRegimenGrid();
        theView = theGrid.getView();
        theSelModel = theView.getSelectionModel();
        HasSelection = theSelModel.hasSelection();
        if (HasSelection) {
            selRows = theSelModel.getSelection();
            theRecord = selRows[0];
            theStore = theView.getStore();
            theIndex = theStore.indexOf(theRecord);
            if (destroy) {
                
                for(var i=theStore.count()-1;i>theIndex;i--){
                    var currRecord = theStore.getAt(i);
                    var prvRecord = theStore.getAt(i-1);
                    currRecord.data.Sequence = prvRecord.data.Sequence;
                    
                    theStore.removeAt(i);
                    theStore.insert(i,currRecord);
                    
                }
                
                theStore.removeAt(theIndex);
                return {};
            }
        }
        return {
            hasRecord: HasSelection,
            record: theRecord,
            rowNum: theIndex
        };
    },

    insertNewDrugRegimenRecord: function (win, theStore, recNum, data) {
        var newRecord;
        var dupRecord = -1;
        var dupSequence = -1;
        var existingRecord = win.recIndex;
        var addDrugRegimen = Ext.ComponentQuery.query('AddDrugRegimen')[0];
        var title = addDrugRegimen.title;

        newRecord = this.validateRecord(data);

        if (recNum > 0 && null !== newRecord) {
            /*
             * Check if there is a duplicate. 
             * If editing a record then duplicate drug should be a different sequence number
             * If adding a record then duplicate drug can be any record
             */
            dupRecord = theStore.findBy(

            function (record, id) {
                    
                    if (null == existingRecord && record.data.Drug === data.Drug) {
                        return true;
                    }else if(record.data.Drug === data.Drug && record.data.Sequence -1 != existingRecord){
                        return true;
                    }
                    
                    return false;
            });
            
            
            var isDup = false;
            /*
             * If the duplicate was found check if duplicate is on the same admin day(s).
             */
            if (-1 !== dupRecord) {
                var tmpRecord = theStore.getAt(dupRecord);
                var adminDays = tmpRecord.data.Day;
                adminDays = adminDays.split(",");
                newAdminDays = data.Day.split(",");
                
                for(day in newAdminDays){
                    if(Ext.Array.contains(adminDays, newAdminDays[day])){
                        isDup = true;
                    }
                }
                
            }
            
            if(true === isDup){
                var DrugRegimenCtl = this.getController("Authoring.DrugRegimen");
                
                var msg = 'A duplicate medication for the same administration day exists. Would you like to continue?';
                
                Ext.MessageBox.show({
                        title: 'Information',
                        msg: msg,
                        width:300,
                        buttons: Ext.MessageBox.YESNO,
                        fn: function(buttonId) {
                            if("no" === buttonId) {
                                    return;
                                    win.close();

                            }else{
                                
                                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
                                    Ext.widget('HydrationSequence', {title: 'Therapy Sequence'});
                                    return;
                                }else{
                                    DrugRegimenCtl.addRecord(existingRecord,newRecord,data,theStore);
                                    win.close();
                                }
                            }
                        }
                });
                
            }else{
                dupRecord = -1;
                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
                    Ext.widget('HydrationSequence', {title: 'Therapy Sequence'});
                    return;
                }else if(dupSequence == dupSequence){
                    dupSequence = -1;
                }
                win.close();

            }

        }else{
            win.close();
        }
        
        if ( -1 == dupRecord && -1 == dupSequence) {
            this.addRecord(existingRecord,newRecord,data,theStore);
        }

    },
    addRecord: function(existingRecord,newRecord,data,theStore){
        
        
        if((data.Sequence-1) == existingRecord){
            theStore.removeAt(existingRecord);
            theStore.insert(existingRecord, newRecord);
        }else if((data.Sequence-1) < theStore.count()){

            var desiredSequence = data.Sequence - 1;
            var currRecord = theStore.getAt(desiredSequence);
            currRecord.data.Sequence = existingRecord+1;

            theStore.removeAt(desiredSequence);
            theStore.insert(desiredSequence,newRecord);

            theStore.removeAt(existingRecord);
            theStore.insert(existingRecord,currRecord);

        }else{
            theStore.insert((data.Sequence-1), newRecord);   
        }
        
    },

    validateRecord: function(data){

        var newRecord = Ext.create(Ext.COMSModels.DrugRegimen, {
            Drug: data.Drug,
            Amt: data.Amt,
            Units: data.Units,
            Route: data.Route,
            Day: data.Day,
            FluidVol: data.FluidVol,
            InfusionTime: data.InfusionTime,
            FlowRate: data.FlowRate,
            Instructions: data.Instructions,
            Sequence: data.Sequence,
            AdminTime: data.AdminTime,
            FluidType: data.FluidType
        });

        var errors = newRecord.validate();
        if (errors.length > 0) {
            var msg = '';

            errors.each(function (error) {
                //msg += "field: " + error.field + " message: " + error.message + "<br/>";
                msg += " message: " + error.message + "<br/>";
            });

            Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);
            return null;
        }else{
            return newRecord;
        }
        
    },
	
    addToSequenceStore: function (combo, theQuery, addSequence) {
        var i, tmpModel, store;
        var theGrid = Ext.ComponentQuery.query(theQuery)[0];
        var theStore = theGrid.getStore();
        var sequenceCnt = theStore.count();

        if (sequenceCnt == 0) {
            sequenceCnt++;
            tmpModel = Ext.create(Ext.COMSModels.GenericLookup, {
                id: sequenceCnt
            });
            combo.getStore().add(tmpModel);
        } else {
            if (addSequence) {
                sequenceCnt++;
            }

            store = combo.getStore();
            for (i = 1; i <= sequenceCnt; i++) {
                tmpModel = Ext.create(Ext.COMSModels.GenericLookup, {
                    id: i
                });
                store.add(tmpModel);
            }
        }
    },

    //--------------------------------------------------------------------------------
    //	Drug Regimen Grid Handlers
    //
    DrugRegimenBtns: function (button) { // Handles the onclick event of all the buttons for the Drug Regimen grid
        var ckRec = this.getSelectedRecord(false);
        var theQuery = "AuthoringTab TemplateDrugRegimen grid";
        var exist, view, puWin;
        if ("Add Drug" === button.text) {

            //KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
            exist = Ext.ComponentQuery.query('AddDrugRegimen')[0];
            if (!exist) {
                puWin = Ext.widget('AddDrugRegimen'); // Creates an instance of the "Add Drug Regimen" pop-up window
            } else {
                puWin = exist;
            }
            //KD
            this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, true);
        } else if ("AddNonForma" === button.title) {

            //KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
            exist = Ext.ComponentQuery.query('EditLookup')[0];
            if (!exist) {
                view = Ext.widget('EditLookup');
            } else {
                view = exist;
            }
            //KD
            view.setTitle("Add Non-Formulary Drug");
        } else if ("Edit Drug" === button.text) {
            if (ckRec.hasRecord) {   
                var record = Ext.create(Ext.COMSModels.DrugRegimen, ckRec.record.data);
                wccConsoleLog("Edit Drug Regimen for - " + ckRec.record.get('Drug'));
                puWin = Ext.widget('AddDrugRegimen'); // Creates an instance of the "Add Drug Regimen" pop-up window
                puWin.setTitle("Edit Drug Regimen");

                this.addToSequenceStore(this.getDrugRegimenSequence(), theQuery, false);

                puWin.recIndex = ckRec.rowNum; // Used in dup drug check on saving
                this.getDrugRegimenSequence().setValue(record.data.Sequence);
                this.getDrugRegimenAdminDay().setValue(record.data.Day);
                this.getDrugRegimenDrug().setValue(record.data.Drug);
                this.getDrugRegimenAmt().setValue(record.data.Amt);
                this.getDrugRegimenUnits().setValue(record.data.Units);
                this.getDrugRegimenRoute().setValue(record.data.Route);
                this.getDrugRegimenFluidVol().setValue(record.data.FluidVol);
                this.getDrugRegimenInfusionTime().setValue(record.data.InfusionTime);
                this.getDrugRegimenFlowRate().setValue(record.data.FlowRate);
                this.getDrugRegimenInstructions().setValue(record.data.Instructions);
                this.getDrugRegimenAdminTime().setValue(record.data.AdminTime);
                this.getDrugRegimenFluidType().setValue(record.data.FluidType);

                this.routeSelected(this.getDrugRegimenRoute(), null, null);
            }

        } else if ("Remove Drug" === button.text) {
            wccConsoleLog("Remove Drug Regimen for - " + ckRec.record.get('Drug'));
            this.getSelectedRecord(true);
        }
        this.getRemoveDrugRegimen().disable();
        this.getEditDrugRegimen().disable();
    },

    clickDrugRegimenGrid: function (grid, record) {
        this.getRemoveDrugRegimen().enable();
        this.getEditDrugRegimen().enable();
    },

    SaveDrugRegimen: function (button) { // Called when clicking on the "Save" button in the Pop-Up Window
        var win = button.up('window');

        wccConsoleLog("Adding new Drug Regimen");

        // var query = "AuthoringTab TemplateDrugRegimen";
        var theGrid = this.getDrugRegimenGrid(); // Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var theForm = win.down('form');
        var values = theForm.getValues();
        var numRecords = theStore.count();
        this.insertNewDrugRegimenRecord(win, theStore, numRecords, values);

    }
});

Ext.apply(Ext.data.validations,{
            amt1hydration: function(config, value) {
                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == values.Amt2 && '' == value){
                    return false;
                }else if('' == value && (values.Units1 && '' != values.Units1 || values.Infusion1 && '' != values.Infusion1)){
                    return false;
                }else{
                    return true;
                }

            },
            amt2hydration: function(config, value) {

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == value && (values.Units2 && '' != values.Units2 || values.Infusion2 && '' != values.Infusion2)){
                    return false;
                }else{
                    return true;
                }
            },
            unit1hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == value && ('' != values.Amt1 || values.Infusion1 && '' != values.Infusion1)){
                    return false;
                }else{
                    return true;
                }

            },
            unit2hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == value && ('' != values.Amt2 || values.Infusion2 && '' != values.Infusion2)){
                    return false;
                }else{
                    return true;
                }

            },
            route1hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == value && ('' != values.Amt1 || values.Units1 && '' != values.Units1)){
                    return false;
                }else{
                    return true;
                }

            },
            route2hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();

                if('' == value && ('' != values.Amt2 || values.Units2 && '' != values.Units2)){
                    return false;
                }else{
                    return true;
                }

            },
            fluidVol1hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route1 = values.Infusion1;

                if("IVPB" == route1 || "IV" == route1 || "IVP" == route1){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;

            },
            fluidVol2hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route2 = values.Infusion2;

                if("IVPB" == route2 || "IV" == route2 || "IVP" == route2){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;

            },
            adminTimehydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route1 = values.Infusion1;
                var route2 = values.Infusion2;

                if("IVPB" == route1 || "IV" == route1 || "IVP" == route1 ||
                   "IVPB" == route2 || "IV" == route2 || "IVP" == route2){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;
            },
            flowRate1hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route1 = values.Infusion1;

                if("IVPB" == route1 || "IV" == route1 || "IVP" == route1){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;
            },
            flowRate2hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route2 = values.Infusion2;

                if("IVPB" == route2 || "IV" == route2 || "IVP" == route2){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;
            },
            fluidType1hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route1 = values.Infusion1;

                if("IVPB" == route1 || "IV" == route1 || "IVP" == route1){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;
            },
            fluidType2hydration: function(config, value){

                var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
                var hydrationForm = addHydrationDrug.down('form');
                var values = hydrationForm.getValues();
                var route2 = values.Infusion2;

                if("IVPB" == route2 || "IV" == route2 || "IVP" == route2){
                    if('' == value){
                        return false;
                    }
                }
                
                return true;
            }            
            
            
            
                
        });

Ext.define('COMS.controller.Authoring.Hydration', {
    extend: 'Ext.app.Controller',
    stores: [
    'TotalCoursesMax'
    ,'CycleLengthMax'
    , 'TimeFrameUnit'
    , 'EmotegenicLevel'
    , 'FebrileNeutropeniaRisk'
    , 'ReferencesStore'
    , 'LUReferences'
    , 'HydrationStore'
    , 'DrugStore'
    , 'DrugUnitsStore'
    , 'InfusionStore'
    ],
    views: [
    'Authoring.Hydration' 
    ,'Authoring.AddHydrationDrug'
    ,'Authoring.HydrationSequence'
    ],


    refs: [
    // Hydration Buttons
    {
        ref: 'RemovePreHydration',
        selector: 'AuthoringTab TemplateHydration[title="Pre Therapy"] button[text="Remove Drug"]'
    }, {
        ref: 'EditPreHydration',
        selector: 'AuthoringTab TemplateHydration[title="Pre Therapy"] button[text="Edit Drug"]'
    }, {
        ref: 'RemovePostHydration',
        selector: 'AuthoringTab TemplateHydration[title="Post Therapy"] button[text="Remove Drug"]'
    }, {
        ref: 'EditPostHydration',
        selector: 'AuthoringTab TemplateHydration[title="Post Therapy"] button[text="Edit Drug"]'
    },
		
    // Hydration Fields	
    {
        ref: 'HydrationDrugCombo',
        selector: 'AddHydrationDrug combo[name="Drug"]'
    },
    {
        ref: 'HydrationSequenceCombo',
        selector: 'AddHydrationDrug combo[name="Sequence"]'
    },
    {
        ref: 'HydrationAmt1',
        selector: 'AddHydrationDrug textfield[name="Amt1"]'
    }, {
        ref: 'HydrationUnits1',
        selector: 'AddHydrationDrug combo[name="Units1"]'
    }, {
        ref: 'HydrationInfusion1',
        selector: 'AddHydrationDrug combo[name="Infusion1"]'
    }, {
        ref: 'HydrationAmt2',
        selector: 'AddHydrationDrug textfield[name="Amt2"]'
    }, {
        ref: 'HydrationUnits2',
        selector: 'AddHydrationDrug combo[name="Units2"]'
    }, {
        ref: 'HydrationInfusion2',
        selector: 'AddHydrationDrug combo[name="Infusion2"]'
    }, {
        ref: 'HydrationInstructions',
        selector: 'AddHydrationDrug textfield[name="Instructions"]'
    },{
        ref: 'HydrationFluidVol1',
        selector: 'AddHydrationDrug textfield[name="FluidVol1"]'
    },{
        ref: 'HydrationFlowRate1',
        selector: 'AddHydrationDrug textfield[name="FlowRate1"]'
    },{
        ref: 'HydrationInfusionTime1',
        selector: 'AddHydrationDrug textfield[name="InfusionTime1"]'
    },{
        ref: 'HydrationFluidType1',
        selector: 'AddHydrationDrug textfield[name="FluidType1"]'
    },{
        ref: 'HydrationFluidVol2',
        selector: 'AddHydrationDrug textfield[name="FluidVol2"]'
    },{
        ref: 'HydrationFlowRate2',
        selector: 'AddHydrationDrug textfield[name="FlowRate2"]'
    },{
        ref: 'HydrationFluidType2',
        selector: 'AddHydrationDrug textfield[name="FluidType2"]'
    },{
        ref: 'HydrationInfusionTime2',
        selector: 'AddHydrationDrug textfield[name="InfusionTime2"]'
    },{
        ref: 'HydrationDay',
        selector: 'AddHydrationDrug textfield[name="Day"]'
    },{
        ref: 'HydrationGrid',
        selector: 'AuthoringTab TemplateHydration grid'
    },{
        ref: 'FluidInfo',
        selector: 'AddHydrationDrug container[name="fluidInfo"]'
    },{
        ref: 'FluidInfo1',
        selector: 'AddHydrationDrug container[name="fluidInfo1"]'
    },{
        ref: 'HydrationAdminTime',
        selector: 'AddHydrationDrug textfield[name="AdminTime"]'
    }, {
        ref: 'Dose1Spacer',
        selector: 'AddHydrationDrug container[name="dosespacer"]'
    }, { 
        ref: "PatientType",
        selector: "AddHydrationDrug radiogroup[name=\"patientRadio\"]"
    }
    ],


    // Ext.ComponentQuery.query('TemplatePreHydration button[text="Add Drug"]')[0].el.dom
    init: function () {
        wccConsoleLog('Initialized Authoring Tab Panel Navigation Controller!');
        this.control({
            // MWB 28 Dec 2011 - Added the Pre/Post Hydration Add Drug functionality...
            'AuthoringTab TemplateHydration button': {
                click: this.HydrationBtns
            },
            'AuthoringTab TemplateHydration grid': { // The Hydration Grid Control
                itemclick: this.clickUpdateHydration,
                itemcontextmenu: this.onCtxHandler
            },
            'AddHydrationDrug button[text="Save"]': { // Pop-up window
                click: this.SaveHydrationDrug
            },
            'HydrationSequence[name=\"Hydration Sequence\"] button[text="Save"]' : {
                click: this.SaveSequence
            },
            'AddHydrationDrug combo[name="Infusion1"]' : {
                select: this.routeSelected
            },
            'AddHydrationDrug combo[name="Infusion2"]' : {
                select: this.routeSelected
            },
            'AddHydrationDrug textfield[name="FlowRate1"]' : {
                blur: this.calcInfusionTime
            },
            'AddHydrationDrug textfield[name="FluidVol1"]' : {
                blur: this.calcInfusionTime
            },
            'AddHydrationDrug textfield[name="FlowRate2"]' : {
                blur: this.calcInfusionTime
            },
            'AddHydrationDrug textfield[name="FluidVol2"]' : {
                blur: this.calcInfusionTime
            },
            'AddHydrationDrug combo[name="Drug"]' : {
                collapse: this.collapseCombo,
                expand : this.loadCombo
            }
            
        });
        
    },
    collapseCombo : function(picker,eOpts){
        if(picker.getValue() == null && picker.hiddenValue != null){
            picker.setRawValue(picker.hiddenValue);		// MWB 15 Feb 2012 - Added missing ";" as per JSLint
        }

    },    
    loadCombo: function (picker, eOpts) {

			if (picker.getStore()) {		// MWB - 6/19/2012 - Added to remove the filter added to the store
				picker.getStore().clearFilter();
			}



            var originalHiddenVal = null;
            picker.hiddenValue = picker.getRawValue();
            picker.clearValue();

            var URI, id;
            var patientType = this.getPatientType().getValue().PatientType;

            if (picker.name == "Drug") {
                    URI = Ext.URLs.Drugs + "/";
                    id = patientType;
            }
            
            picker.getStore().load({
                    params: {
                            URL: URI,
                            ID: id
                    },
                    callback: function (records, operation, success) {
                            if (success) {
                                    if (null != originalHiddenVal) {
                                            picker.setRawValue(originalHiddenVal);
                                    }
                            }
                    }
            });

    },
    
    calcInfusionTime: function(field, eOpts){

        var index = field.name.length - 1;
        var lastChar = field.name.substring(index,field.name.length);
        var fluidVol,flowRate,infusionTime;

        if('1' == lastChar){
            fluidVol = this.getHydrationFluidVol1().getValue();
            flowRate = this.getHydrationFlowRate1().getValue();
            infusionTime = this.getHydrationInfusionTime1();
        }else if('2' == lastChar){
            fluidVol = this.getHydrationFluidVol2().getValue();
            flowRate = this.getHydrationFlowRate2().getValue();
            infusionTime = this.getHydrationInfusionTime2();
        }
		
        if('' != flowRate && '' != fluidVol){
            infusionTime.setValue(Ext.CalcInfusionTime(fluidVol,flowRate,true));
        }
        
    },
    routeSelected: function(combo, recs, eOpts){
        
        var route=null;
        
        if(null != recs){
            route = recs[0].data.name;
        }else{
            route = combo.getValue();
        }
        
        if(null != route && '' != route){
            if("IVPB" == route || "IV" == route || "IVP" == route){
                if('Infusion1' == combo.getName()){
                    this.getFluidInfo().show();
                }else if('Infusion2' == combo.getName()){
                    this.getFluidInfo1().show();
                }
                this.getDose1Spacer().hide();
                this.getHydrationAdminTime().show();
                this.getStore('LookupStore').load({
                        params: {
                        URL : Ext.URLs.Lookups,
                        id  : '/FluidType'
                    }
                });
                
            }else{
                if('Infusion1' == combo.getName()){
                    this.getFluidInfo().hide();
                }else if('Infusion2' == combo.getName()){
                    this.getFluidInfo1().hide();
                }
                
                if(this.getFluidInfo().isHidden() && this.getFluidInfo1().isHidden()){
                    this.getDose1Spacer().show();
                    this.getHydrationAdminTime().hide();
                }
                
            }
        }
        
    },
    
    SaveSequence: function(button, opts){		// MWB - 7/19/2012 - Changes...
//        var nextSequenceNumber = Ext.ComponentQuery.query('HydrationSequence form radiogroup[name=\"ApplySequence\"]');
//        var insertSequenceNumber = Ext.ComponentQuery.query('HydrationSequence radiogroup[name=\"ApplySequence\"]')[1];
//
//
//        var sequence = Ext.ComponentQuery.query('HydrationSequence form radiogroup[name=\'ApplySequence\']');
        var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];

        var win = button.up('window');
        var HydrationType = addHydrationDrug.type;
        var theForm = win.down('form');
        var values = theForm.getValues();
        var query = "AuthoringTab TemplateHydration[title=\"" + HydrationType + " Therapy\"] grid";
        var theGrid = Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var hydrationForm = addHydrationDrug.down('form');
        var hydrationValues = hydrationForm.getValues();
        var numRecords = theStore.count();

        var newRecord = this.validateRecord(hydrationValues,HydrationType);

        if(null == newRecord){
            return;
        }

        if(0==values.ApplySequence){

            hydrationValues.Sequence = numRecords + 1;
            newRecord.data.Sequence = hydrationValues.Sequence;
            //this.insertNewHydrationRecord(addHydrationDrug, theStore, HydrationType, numRecords, hydrationValues);
            this.addRecord(addHydrationDrug,newRecord,hydrationValues,theStore);
            
            
            win.close();
            addHydrationDrug.close();

        }else if(1==values.ApplySequence){

            var records = [];
            var index = hydrationValues.Sequence - 1;
            var replacedRecord = theStore.getAt(index);
            
            replacedRecord.data.Sequence++;
            records.push(replacedRecord);
            
            theStore.removeAt(index);
            theStore.insert(index++, newRecord);
            
            for(var i=index;i<=numRecords;i++){
                
                var tmpModel = theStore.getAt(i);

                theStore.removeAt(i)
                theStore.insert(i,records.pop());

                if(null!=tmpModel){
                    tmpModel.data.Sequence++;
                    records.push(tmpModel);
                }
                
                
            }

            win.close();
            addHydrationDrug.close();

        }

      
      
    },

    onCtxHandler: function onCtxHandler(grid,record,item,index,event) {
        event.stopEvent();
        var menu = new Ext.menu.Menu({
            items: [{
                id: 'inc',
                text: 'Increase Sequence',
                handler: function() {
                    
                    var theStore = grid.getStore();
                    var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
                    
                    var prevRecord = theStore.getAt(index-1);
                    
                    
                    var desiredSequence = prevRecord.data.Sequence;
                    var currSequence = currRecord.data.Sequence;
                    
                    currRecord.data.Sequence = desiredSequence;
                    prevRecord.data.Sequence = currSequence;

                    theStore.removeAt(index);
                    theStore.removeAt(index-1);
                    
                    theStore.insert(index-1,currRecord);
                    theStore.insert(index,prevRecord);
                    

                }
            }, {
                id: 'dec',
                text: 'Decrease Sequence',
                handler: function() {
                    var theStore = grid.getStore();
                    var currRecord = theStore.getAt(index); // SelectionModel might not give you one single row!
                    
                    var nextRecord = theStore.getAt(index+1);
                    
                    
                    var desiredSequence = nextRecord.data.Sequence;
                    var currSequence = currRecord.data.Sequence;
                    
                    currRecord.data.Sequence = desiredSequence;
                    nextRecord.data.Sequence = currSequence;

                    theStore.removeAt(index+1);
                    theStore.removeAt(index);
                    
                    theStore.insert(index,nextRecord);
                    theStore.insert(index+1,currRecord);
                    
                }
            }]
        });


        if(0==index){
            menu.items.get('inc').disabled = true;
        }else if(index == grid.getStore().count()-1){
            menu.items.get('dec').disabled = true;
        }
        
        menu.showAt(event.xy);
        
    },



    // Used in both the Hydration and Refernce Grids
    getSelectedRecord: function (destroy, query) {
        var theGrid, theView, theSelModel, HasSelection = false, selRows, theRecord, theStore, theIndex;

        theGrid = Ext.ComponentQuery.query(query)[0];
        theView = theGrid.getView();
        theSelModel = theView.getSelectionModel();
        HasSelection = theSelModel.hasSelection();
        if (HasSelection) {
            selRows = theSelModel.getSelection();
            theRecord = selRows[0];
            theStore = theView.getStore();
            theIndex = theStore.indexOf(theRecord);
            if (destroy) {
                
                for(var i=theStore.count()-1;i>theIndex;i--){
                    var currRecord = theStore.getAt(i);
                    var prvRecord = theStore.getAt(i-1);
                    currRecord.data.Sequence = prvRecord.data.Sequence;
                    
                    theStore.removeAt(i);
                    theStore.insert(i,currRecord);
                    
                }
                
                theStore.removeAt(theIndex);
                return {};
            }
        }
        return {
            hasRecord: HasSelection,
            record: theRecord,
            rowNum: theIndex
        };
    },


    insertNewHydrationRecord: function (win, theStore, HydrationType, recNum, data) {
        var newRecord;
        var dupRecord = -1;
        var dupSequence = -1;
        var existingRecord = win.recIndex;
        var addHydrationDrug = Ext.ComponentQuery.query('AddHydrationDrug')[0];
        var title = addHydrationDrug.title;

        newRecord = this.validateRecord(data,HydrationType);

        if (recNum > 0 && null !== newRecord) {
            /*
             * Check if there is a duplicate. 
             * If editing a record then duplicate drug should be a different sequence number
             * If adding a record then duplicate drug can be any record
             */
            dupRecord = theStore.findBy(

            function (record, id) {
                    
                    if (null == existingRecord && record.data.Drug === data.Drug) {
                        return true;
                    }else if(record.data.Drug === data.Drug && record.data.Sequence -1 != existingRecord){
                        return true;
                    }
                    
                    return false;
            });
            
            
            var isDup = false;
            /*
             * If the duplicate was found check if duplicate is on the same admin day(s).
             */
            if (-1 !== dupRecord) {
                var tmpRecord = theStore.getAt(dupRecord);
                var adminDays = tmpRecord.data.Day;
                adminDays = adminDays.split(",");
                newAdminDays = data.Day.split(",");
                
                for(day in newAdminDays){
                    if(Ext.Array.contains(adminDays, newAdminDays[day])){
                        isDup = true;
                    }
                }
                
            }
            
            if(true === isDup){
                var HyrdationCtl = this.getController("Authoring.Hydration");
                var msg = 'A duplicate medication for the same administration day exists. Would you like to continue?';
                
                Ext.MessageBox.show({
                        title: 'Information',
                        msg: msg,
                        width:300,
                        buttons: Ext.MessageBox.YESNO,
                        fn: function(buttonId, Opts) {
                            if("no" === buttonId) {
                                    return;
                                    // win.close();

                            }else{
                                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
									Ext.widget('HydrationSequence', {title: HydrationType + ' Therapy Sequence', name: 'Hydration Sequence'});
                                    return;
                                }else{
                                    HyrdationCtl.addRecord(existingRecord,newRecord,data,theStore);
                                    win.close();
                                }
                            }
                        }
                });
                
            }else{
                dupRecord = -1;                
                dupSequence = theStore.find("Sequence", data.Sequence, 0, true, false, true);
                if (-1 !== dupSequence && dupSequence !== existingRecord && title.substring(0,"Edit".length) !== "Edit") {
                    Ext.widget('HydrationSequence', {title: HydrationType +' Therapy Sequence', name: 'Hydration Sequence'});
                    return;
                }else if(dupSequence == dupSequence){
                    dupSequence = -1;
                }
                win.close();

            }
            
        }
        
        if ( -1 == dupRecord && -1 == dupSequence) {
            this.addRecord(existingRecord,newRecord,data,theStore);
        }
    },

    validateRecord: function(data,HydrationType){
        var newRecord = Ext.create(Ext.COMSModels.Hydration, {
            hydrationType: HydrationType,
            Sequence: data.Sequence,
            Drug: data.Drug,
            Amt1: data.Amt1,
            Units1: data.Units1,
            Infusion1: data.Infusion1,
            Amt2: data.Amt2,
            Units2: data.Units2,
            Infusion2: data.Infusion2,
            Instructions: data.Instructions,
            FluidVol1: data.FluidVol1,
            FlowRate1: data.FlowRate1,
            InfusionTime1: data.InfusionTime1,
            FluidType1: data.FluidType1,
            FluidVol2: data.FluidVol2,
            FlowRate2: data.FlowRate2,
            InfusionTime2: data.InfusionTime2,
            FluidType2: data.FluidType2,
            Day: data.Day,
            AdminTime: data.AdminTime
        });

        var errors = newRecord.validate();

        if(errors.length > 0){

            var msg='';

            errors.each(function(error){
                //msg += "field: " + error.field + " message: " + error.message + "<br/>";
                msg += " message: " + error.message + "<br/>";
            });

            Ext.MessageBox.alert('Invalid', 'Validation Errors:<br/>' + msg);                
            return null;
        }else{
            return newRecord;
        }
        
    },
    addRecord: function(existingRecord,newRecord,data,theStore){
        
        
        if((data.Sequence-1) == existingRecord){
            theStore.removeAt(existingRecord);
            theStore.insert(existingRecord, newRecord);
        }else if((data.Sequence-1) < theStore.count()){

            var desiredSequence = data.Sequence - 1;
            var currRecord = theStore.getAt(desiredSequence);
            currRecord.data.Sequence = existingRecord+1;

            theStore.removeAt(desiredSequence);
            theStore.insert(desiredSequence,newRecord);

            theStore.removeAt(existingRecord);
            theStore.insert(existingRecord,currRecord);

        }else{
            theStore.insert((data.Sequence-1), newRecord);   
        }
        
    },

    SaveHydrationDrug: function (button) { // Called when clicking on the "Save" button in the Hydration Drug Pop-Up Window
        var win = button.up('window');
        var HydrationType = win.type;
        wccConsoleLog("Adding new Drug to the " + HydrationType + " Drug Section");

        var query = "AuthoringTab TemplateHydration[title=\"" + HydrationType + " Therapy\"] grid";
        var theGrid = Ext.ComponentQuery.query(query)[0];
        var theStore = theGrid.getStore();
        var theForm = win.down('form');
        var values = theForm.getValues();
        var numRecords = theStore.count();
        this.insertNewHydrationRecord(win, theStore, HydrationType, numRecords, values);
		// win.close();
    },


    // MWB 28 Dec 2011 - Added the Pre/Post Hydration Add Drug functionality...
    clickUpdateHydration: function (grid, record) {
        var panel = grid.up("container").up("container");
        var type = panel.type;
        if ("Pre" === type) {
            this.getRemovePreHydration().enable();
            this.getEditPreHydration().enable();
        } else {
            this.getRemovePostHydration().enable();
            this.getEditPostHydration().enable();
        }
    },
    
    addToSequenceStore: function(combo,theQuery,addSequence){
        var theGrid = Ext.ComponentQuery.query(theQuery)[0];
        var theStore = theGrid.getStore();
        var sequenceCnt = theStore.count();
        var tmpModel;

        if(sequenceCnt==0){
            sequenceCnt++;
            tmpModel = Ext.create(Ext.COMSModels.GenericLookup,{
                id: sequenceCnt 
            });
            combo.getStore().add(tmpModel);                
        }else{
            if(addSequence){
                sequenceCnt++;
            }
            
            var store = combo.getStore();
            for(var i=1;i<=sequenceCnt;i++){
                tmpModel = Ext.create(Ext.COMSModels.GenericLookup,{
                    id: i 
                });
                store.add(tmpModel);                

            }
        }
        
    },

    HydrationBtns: function (button) { // Handles the onclick event of all the buttons for both the pre and post hydration grids
        var panel = button.up("panel").up("container");
        var theQuery = "AuthoringTab TemplateHydration[title=\"" + panel.type + " Therapy\"] grid";
        if ("Add Drug" === button.text) {
            
            //KD - 03/09/2012 - This is done to prevent multiple instances (windows) to be created everytime the "Add Drug" button is clicked
            var exist = Ext.ComponentQuery.query('AddHydrationDrug')[0];
            if(!exist){
                var view = Ext.widget('AddHydrationDrug'); // Creates an instance of the "Add Hydration Drug" pop-up window
            }else{
                view = exist;
            }
            //KD
            
            view.type = panel.type;
            view.setTitle("Add " + panel.type + " Therapy Drug");
            this.addToSequenceStore(this.getHydrationSequenceCombo(),theQuery,true);            
        } else {
            var ckRec = this.getSelectedRecord(false, theQuery);
            if (ckRec.hasRecord) {
                var record = Ext.create(Ext.COMSModels.Hydration, ckRec.record.data);
                if ("Remove Drug" === button.text) {
                    wccConsoleLog("Remove " + panel.type + " Therapy Drug - " + ckRec.record.get('Drug'));
                    
                    this.getSelectedRecord(true, theQuery);

                } else if ("Edit Drug" === button.text) {
                    wccConsoleLog("Edit " + panel.type + " Therapy Drug - " + ckRec.record.get('Drug'));
                    var hdPanel = Ext.widget('AddHydrationDrug'); // Creates an instance of the "Add Hydration Drug" pop-up window
                    hdPanel.type = panel.type;
                    hdPanel.setTitle("Edit " + panel.type + " Therapy Drug");
                    
                    this.addToSequenceStore(this.getHydrationSequenceCombo(),theQuery,false);

                    hdPanel.recIndex = ckRec.rowNum;	// Used in dup drug check on saving

                    this.getHydrationSequenceCombo().setValue(record.data.Sequence);
                    this.getHydrationDrugCombo().setValue(record.data.Drug);
                    this.getHydrationAmt1().setValue(record.data.Amt1);
                    this.getHydrationUnits1().setValue(record.data.Units1);
                    this.getHydrationInfusion1().setValue(record.data.Infusion1);
                    
                    this.routeSelected(this.getHydrationInfusion1(),null,null);
                    
                    this.getHydrationAmt2().setValue(record.data.Amt2);
                    this.getHydrationUnits2().setValue(record.data.Units2);
                    this.getHydrationInfusion2().setValue(record.data.Infusion2);
                    
                    this.routeSelected(this.getHydrationInfusion2(),null,null);
                    
                    this.getHydrationInstructions().setValue(record.data.Instructions);
                    this.getHydrationFluidVol1().setValue(record.data.FluidVol1);
                    this.getHydrationFlowRate1().setValue(record.data.FlowRate1);
                    this.getHydrationInfusionTime1().setValue(record.data.InfusionTime1);
                    this.getHydrationFluidType1().setValue(record.data.FluidType1);
                    

                    this.getHydrationFluidVol2().setValue(record.data.FluidVol2);
                    this.getHydrationFlowRate2().setValue(record.data.FlowRate2);
                    this.getHydrationInfusionTime2().setValue(record.data.InfusionTime2);
                    this.getHydrationFluidType2().setValue(record.data.FluidType2);
                    
                    this.getHydrationDay().setValue(record.data.Day);
                    this.getHydrationAdminTime().setValue(record.data.AdminTime);
                    
                }
            } else {
                Ext.MessageBox.alert('Invalid', 'Please select a Row in the Drug Regimen Grid.');
            }
        }
        if ("Pre" == panel.type) {
            this.getRemovePreHydration().disable();
            this.getEditPreHydration().disable();
        }
        else {
            this.getRemovePostHydration().disable();
            this.getEditPostHydration().disable();
        }
    }

});

/*jslint undef: true, sloppy: true, eqeq: true, stupid: true, sub: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define('COMS.controller.Management.AdminTab', {
    extend : 'Ext.app.Controller',
    stores : [ 'LookupStore', "GlobalStore", "UsersStore", "ActiveWorkflowsStore"],
    views : [ 'Management.AdminTab','Management.AddLookups','Management.SelectLookups','Management.EditLookup', 'Management.DeleteTemplate', 
		'Management.Globals', 'Management.SelectGlobals', 'Management.Users', 'Management.ActiveWorkflows', 'Management.MedsNonRounded'
	],
    models : ['LookupTable','LookupTable_Templates'],
    refs: [
    {
        ref: 'Lookup', 
        selector: 'AdminTab AddLookups'
    },
    {
        ref: 'LookupGrid', 
        selector: 'AdminTab AddLookups grid'
    },
    {
        ref: 'Globals', 
        selector: 'AdminTab Globals grid'
    },	
    {
        ref: 'MedsNonRounded', 
        selector: 'AdminTab MedsNonRounded grid'
    },	
    {
        ref: 'Users', 
        selector: 'AdminTab Users grid'
    },	
    {
        ref: 'ActiveWorkflows', 
        selector: 'AdminTab ActiveWorkflows grid'
    },	
    {
        ref: 'RemoveLookup', 
        selector: 'AdminTab AddLookups button[title=\"RemoveLookup\"]'
    }, 
    {
        ref: 'EditLookup', 
        selector: 'AdminTab AddLookups button[title=\"EditLookup\"]'
    },

    {
        ref: 'Template', 
        selector: 'AdminTab DeleteTemplate'
    },
    {
        ref: 'TemplateGrid', 
        selector: 'AdminTab DeleteTemplate grid'
    },
    {
        ref: 'RemoveTemplate', 
        selector: 'AdminTab DeleteTemplate button[title=\"RemoveTemplate\"]'
    },
    {
        ref: 'ShowAllTemplates', 
        selector: 'AdminTab DeleteTemplate button[title=\"AllTemplates"]'
    }
                
		
                
    ],
    
    init: function() {
        wccConsoleLog('Initialized Admin Tab Panel Navigation Controller!');
        this.control({
            'AddLookups SelectLookups' : {
                select : this.LookupSelected
            },
            'DeleteTemplate selDisease' : {
                select : this.TemplateSelected
            },
            'AddLookups button[action=save]' :{
                click : this.updateLookup
            },
            'AdminTab AddLookups grid' : {
                itemclick: this.enableEditLookup
            },
            'AdminTab Globals grid' : {
                itemclick: this.enableEditGlobal
            },
            'AdminTab DeleteTemplate grid' : {
                itemclick: this.enableRemoveTemplate
            },
            'AdminTab DeleteTemplate button[title=\"RemoveTemplate\"]': {
                click: this.removeTemplate
            },
            'AdminTab DeleteTemplate button[title=\"AllTemplates"]': {
                click: this.showAllTemplates
            },
            'AdminTab AddLookups button[title=\"RemoveLookup\"]': {
                click: this.removeLookup
            },
            'AdminTab AddLookups button[title=\"EditLookup\"]': {
                click: this.editLookup
            },
            'EditLookup button[action="save"]': {
                click: this.clickSaveLookup
            },
            'EditLookup button[action="cancel"]': {
                click: this.clickCancelLookup
            }
        });
    },
        
    TemplateSelected: function(combo, recs, eOpts){
        wccConsoleLog('Admin Tab, Template Selected');
        var theData = recs[0].data.id;
        var thisCtl = this.getController('Management.AdminTab');
        var theStore = thisCtl.getTemplateGrid().getStore();
        var theURL = Ext.URLs.Templates + "/Cancer/" + theData;
        theStore.load({
            url:theURL
        });
            
    },
    showAllTemplates: function(combo, recs, eOpts){
        wccConsoleLog('Admin Tab, Template Selected');
        var thisCtl = this.getController('Management.AdminTab');
        var theStore = thisCtl.getTemplateGrid().getStore();
        theStore.removeAll();
        var theURL = Ext.URLs.Templates;
        theStore.load({
            url:theURL
        });
            
    },
    clickSaveLookup: function(button){
        var grid = Ext.ComponentQuery.query('AdminTab AddLookups grid')[0]; // Get's a specific existing instance of the widget by it's CSS style reference
        var store = grid.getStore();
        var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();

        var record = form.getRecord();
        var rowNum = store.indexOf(record);
        var existingRecord = null;

        if (this.getSelectedRecord(false, 'AdminTab AddLookups grid').hasRecord) {
            existingRecord = this.getSelectedRecord(false, 'AdminTab AddLookups grid').record;
        }
                
        if(existingRecord){
                    
            var lookupRecord = Ext.create(Ext.COMSModels.LookupTable, {
                lookupid: existingRecord.get('id'),
                value: values.name,
                description: values.description
            });

            lookupRecord.save({
                scope: this,
                waitMsg: 'Saving Data...',
                success: function (data) {
                    wccConsoleLog("Saved Lookup Type ID " + data.getId() + " lookupid " + data.data.lookupid);
                    var ref = Ext.create(Ext.COMSModels.GenericLookup, {
                        id: data.data.lookupid,
                        name: data.data.value,
                        description: data.data.description
                    });
                    if (-1 === rowNum) {
                        store.insert(0, ref);
                    } else {
                        store.removeAt(rowNum);
                        store.insert(rowNum, ref);
                    }
                    this.getRemoveLookup().disable();
                    this.getEditLookup().disable();
                    win.close();
                },
                failure: function (err) {

                    this.getRemoveLookup().disable();
                    this.getEditLookup().disable();
                    win.close();
                    Ext.MessageBox.alert('Invalid', 'This lookup already exists.');
                                    
                }
            });

        }


            
    },
    clickCancelLookup: function(button){
        var win = button.up('window');
        this.getRemoveLookup().disable();
        this.getEditLookup().disable();
        win.close();
    },
    // Used in both the Hydration and Refernce Grids
    getSelectedRecord: function (destroy, query) {
        var theGrid, theView, theSelModel, HasSelection = false, selRows, theRecord, theStore, theIndex, records;

        theGrid = Ext.ComponentQuery.query(query)[0];
        theView = theGrid.getView();
        theSelModel = theView.getSelectionModel();
        HasSelection = theSelModel.hasSelection();
        if (HasSelection) {
            selRows = theSelModel.getSelection();
            theRecord = selRows[0];
            records = selRows;
            theStore = theView.getStore();
            theIndex = theStore.indexOf(theRecord);
            if (destroy) {
                theStore.removeAt(theIndex);
                return {};
            }
        }
        return {
            hasRecord: HasSelection,
            record: theRecord,
            rowNum: theIndex,
            multiRecord: records
        };
    },

        
    enableEditLookup : function(grid, record){
        this.getRemoveLookup().enable();
        this.getEditLookup().enable();
    },

    enableGlobalLookup : function(grid, record){
        this.getRemoveLookup().enable();
        this.getEditLookup().enable();
    },
	
    enableRemoveTemplate : function(grid, record){
        this.getRemoveTemplate().enable();
    },
        
    removeLookup : function(button){
        var ckRec = this.getSelectedRecord(false, 'AdminTab AddLookups grid');
        if (ckRec.hasRecord) {
            wccConsoleLog('Remove Lookup - ' + ckRec.record.get('id') + ' - ' + ckRec.record.get('name') + ' - ' + ckRec.record.get('description'));
            var reference = Ext.create(Ext.COMSModels.LookupTable, {
                value: ckRec.record.get('name'),
                description: ckRec.record.get('description'),
                lookupid: ckRec.record.get('id')
            });

            reference.destroy({
                scope: this,
                success: function (data) {
                    this.getSelectedRecord(true, 'AdminTab AddLookups grid'); // remove the selected record from the current store
                    this.getRemoveLookup().disable();
                    this.getEditLookup().disable();
                }
            });
        } else {
            Ext.MessageBox.alert('Invalid', 'Please select a Row in the References Grid.');
        }
            
    },
    removeTemplate : function(button){
        var ckRec = this.getSelectedRecord(false, 'AdminTab DeleteTemplate grid');
		var mytemplate;
        if (ckRec.hasRecord) {
            var adminCtl = this.getController("Management.AdminTab");

            if(ckRec.multiRecord.length > 1){
                wccConsoleLog('Remove Template - ' + ckRec.multiRecord[0].get('id') + ' - ' + ckRec.multiRecord[0].get('description'));
                mytemplate = Ext.create(Ext.COMSModels.Templates, {
                    id: ckRec.multiRecord[0].get('id'),
                    description: ckRec.multiRecord[0].get('description'),
                    force: 'false'
                });

                Ext.MessageBox.show({
                    title: 'Information',
                    msg: 'You are about to delete template: '+ ckRec.record.get('description') + '. Would you like to delete it and remove all references?',
                    width:300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    fn: function(buttonId){
                        if('ok'==buttonId){
                            adminCtl.deleteTemplateCall(mytemplate,ckRec);
                        }
                    }
                });
                
            }else{
                wccConsoleLog('Remove Template - ' + ckRec.record.get('id') + ' - ' + ckRec.record.get('description'));
                mytemplate = Ext.create(Ext.COMSModels.Templates, {
                    id: ckRec.record.get('id'),
                    description: ckRec.record.get('description'),
                    force: 'false'
                });
                
                Ext.MessageBox.show({
                    title: 'Information',
                    msg: 'You are about to delete template: '+ ckRec.record.get('description') + '. Would you like to delete it and remove all references?',
                    width:300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    fn: function(buttonId){
                        if('ok'==buttonId){
                            adminCtl.deleteTemplateCall(mytemplate,ckRec);
                        }
                    }
                });
                
            }
            
        } 
            
    },
    
    deleteTemplateCall: function(mytemplate,ckRec){
        mytemplate.destroy({
            scope: this,
            success: function (record, op) {
                this.getSelectedRecord(true, 'AdminTab DeleteTemplate grid'); // remove the selected record from the current store
                this.getRemoveTemplate().disable();
                var adminCtl = this.getController("Management.AdminTab");
                //Ext.MessageBox.alert('Success', 'Template ' + ckRec.record.get('description') + ' was deleted from the system.');
                Ext.MessageBox.show({
                    title: 'Success',
                    msg:  'Template ' + ckRec.record.get('description') + ' was deleted from the system.',
                    width:300,
                    buttons: Ext.MessageBox.OK,
                    fn: function(buttonId){
                        if('ok'==buttonId){
                            adminCtl.removeTemplate();
                            
                        }
                    }
                });
                
            },
            failure: function (record, op) {
                wccConsoleLog("Delete Template Failed");
                this.getRemoveTemplate().disable();
                this.application.unMask();
                var adminCtl = this.getController("Management.AdminTab");
                Ext.MessageBox.show({
                    title: 'Information',
                    msg: 'Template was not deleted: ' + op.request.scope.reader.jsonData["frameworkErr"] + '. Would you like to delete it and remove all references?',
                    width:300,
                    buttons: Ext.MessageBox.OKCANCEL,
                    fn: function(buttonId){
                        if('ok'==buttonId){
                            mytemplate.data.force = 'true';
                            adminCtl.deleteTemplateCall(mytemplate,ckRec);
                        }
                    }
                });

                //Ext.MessageBox.alert('Failure', 'Template was not deleted: ' + op.request.scope.reader.jsonData["frameworkErr"]);
            }
        });
        
    },
        
    editLookup : function(button){
        var ckRec = this.getSelectedRecord(false, 'AdminTab grid');
        if (ckRec.hasRecord) {
            wccConsoleLog('Editing Lookup - ' + ckRec.record.get('id') + ' - ' + ckRec.record.get('name') + ' - ' + ckRec.record.get('description'));
            var view = Ext.widget('EditLookup'); // Creates an instance of the "Add Reference" pop-up window
            view.down('form').loadRecord(ckRec.record);
        } else {
            Ext.MessageBox.alert('Invalid', 'Please select a Row in the Lookup Grid.');
        }
    },
    // Load the grid's store to see all the values for the selected type
    LookupSelected : function ( combo, recs, eOpts ) {
        wccConsoleLog('Admin Tab, Lookup Selected');
        var theData = recs[0].data.value;
        var thisCtl = this.getController('Management.AdminTab');
        var theStore = thisCtl.getLookupGrid().getStore();
        var theURL = Ext.URLs['BaseView'] + "/" + theData;
        theStore.load({
            url:theURL
        });
    },

    updateLookup: function(button){
        wccConsoleLog('clicked Save button');
        var grid = Ext.ComponentQuery.query('AdminTab grid')[0]; // Get's a specific existing instance of the widget by it's CSS style reference
        var store = grid.getStore();

        var form = button.up('form');
            
        var values = form.form.getValues();
            
            
        var lookupRecord = Ext.create('COMS.model.LookupTable', {
            id: values['id'],
            value: values['value'],
            description: values['description']
        });

        lookupRecord.save({
            scope : this,
            waitMsg : 'Saving Data...',
            success: function(data) {
                wccConsoleLog("Saved Lookup Type ID "+ data.getId() + " name " + data.data['value'] + " lookupid " + data.data['lookupid']);
                    
                var ref = Ext.create(Ext.COMSModels.GenericLookup, {
                    id: data.data.lookupid,
                    name: data.data.value,
                    description: data.data.description
                });

                store.insert(0, ref);
                    
                var thisCtl = this.getController('Management.AdminTab');
                var addLookups = thisCtl.getLookup();
                addLookups.form.findField('value').setValue('');
                addLookups.form.findField('id').setValue('');
                addLookups.form.findField('description').setValue('');
            },
            failure: function(err){
                Ext.MessageBox.alert('Invalid', 'This reference already exists.');
            }
        });
            
    }
});
/*jslint undef: true, sloppy: true, eqeq: true, sub: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 5/31/2012

/**************************************** MWB 17 Feb 2012 ****************************************
http://www.cancer.gov/cancertopics/pdq/supportivecare/nausea/HealthProfessional/Table3
Antiemetic Recommendations by Emetic Risk Categories

Emetic Risk Category     ASCO Guidelines     NCCN Guidelines 
High (>90%) risk -	
		ASCO Guidelines -	Three-drug combination of a 5-HT3 receptor antagonist, dexamethasone, and aprepitant recommended prechemotherapy.	

							For patients receiving cisplatin and all other agents of high emetic risk, 
							the two-drug combination of dexamethasone and aprepitant recommended for prevention of delayed emesis.	

		NCCN Guidelines -	Prechemotherapy, a 5-HT3 receptor antagonist (ondansetron, granisetron, dolasetron, or palonosetronb), 
							dexamethasone (12 mg), and aprepitant (125 mg) recommended, with or without lorazepam.

							For prevention of delayed emesis, dexamethasone (8 mg) on days 2 - 4 plus aprepitant (80 mg) on days 2 and 3 recommended, 
							with or without lorazepam on days 2 - 4.


Moderate (30%-90%) risk - 
		ASCO Guidelines -	For patients receiving an anthracycline and cyclophosphamide, 
							the three-drug combination of a 5-HT3 receptor antagonist, dexamethasone, and aprepitant recommended prechemotherapy; 
							single-agent aprepitant recommended on days 2 and 3 for prevention of delayed emesis.

							For patients receiving other chemotherapies of moderate emetic risk, the two-drug combination of a 5-HT3 receptor antagonist and 
							dexamethasone recommended prechemotherapy; 
							single-agent dexamethasone or a 5-HT3 receptor antagonist recommended on days 2 and 3 for prevention of delayed emesis.

		NCCN Guidelines -	For patients receiving an anthracycline and cyclophosphamide and selected patients receiving other chemotherapies of moderate emetic risk 
							(e.g., carboplatin, cisplatin, doxorubicin, epirubicin, ifosfamide, irinotecan, or methotrexate), a 5-HT3 receptor antagonist 
							(ondansetron, granisetron, dolasetron, or palonosetronb), dexamethasone (12 mg), and aprepitant (125 mg) recommended, with or without lorazepam, 
							prechemotherapy; for other patients, aprepitant is not recommended.

							For prevention of delayed emesis, dexamethasone (8 mg) or a 5-HT3 receptor antagonist on days 2 - 4 or, if used on day 1, 
							aprepitant (80 mg) on days 2 and 3, with or without dexamethasone (8 mg) on days 2 - 4, recommended, with or without lorazepam on days 2 - 4.



Low (10%-30%) risk	- 
		ASCO Guidelines -	Dexamethasone (8 mg) recommended; no routine preventive use of antiemetics for delayed emesis recommended.
		NCCN Guidelines -	Metoclopramide, with or without diphenhydramine; dexamethasone (12 mg); or prochlorperazine recommended, with or without lorazepam.


Minimal (<10%) risk - 
		ASCO Guidelines -	No antiemetic administered routinely pre- or postchemotherapy.
		NCCN Guidelines -	No routine prophylaxis; consider using antiemetics listed under primary prophylaxis as treatment.


**************************************** MWB 17 Feb 2012 ****************************************/

// Need to build new entries into the LookupTable for EmesisRiskRecommendationsASCO and EmesisRiskRecommendationsNCCN
// Which when queried given an EmesisRisk will return the appropriate Recommendation from below:
// EmesisLookup/ELevelID (from Lookup Table)
// Returns one of the entries below (but only need ASCO and NCCN records in the real data)
var EmesisRisk = [];

// Minimal (<10%) risk
EmesisRisk["B685F3AA-0B21-E111-BF57-000C2935B86F"] = 
{
	riskID : "B685F3AA-0B21-E111-BF57-000C2935B86F",
	level : 1, 
	ASCO : "<p>No antiemetic administered routinely pre- or postchemotherapy.</p>", 
	NCCN : "<p>No routine prophylaxis; consider using antiemetics listed under primary prophylaxis as treatment.</p>"
};

// Low (10%–30%) risk
EmesisRisk["B785F3AA-0B21-E111-BF57-000C2935B86F"] = 
{
	riskID : "B785F3AA-0B21-E111-BF57-000C2935B86F",
	level : 2, 
	ASCO : "<p>Dexamethasone (8 mg) recommended; no routine preventive use of antiemetics for delayed emesis recommended.</p>", 
	NCCN : "<p>Metoclopramide, with or without diphenhydramine; dexamethasone (12 mg); or prochlorperazine recommended, with or without lorazepam.</p>"
};

// Moderate (30%-90%) risk
EmesisRisk["B885F3AA-0B21-E111-BF57-000C2935B86F"] = 
{ 
	riskID : "B885F3AA-0B21-E111-BF57-000C2935B86F",
	level : 3, 
	ASCO :	"<p>For patients receiving an anthracycline and cyclophosphamide, the three-drug combination of a 5-HT3 receptor antagonist, dexamethasone, and aprepitant recommended prechemotherapy; single-agent aprepitant recommended on days 2 and 3 for prevention of delayed emesis.</p>" +  
			"<p>For patients receiving other chemotherapies of moderate emetic risk, the two-drug combination of a 5-HT3 receptor antagonist and dexamethasone recommended prechemotherapy; single-agent dexamethasone or a 5-HT3 receptor antagonist recommended on days 2 and 3 for prevention of delayed emesis.</p>", 
	NCCN :	"<p>For patients receiving an anthracycline and cyclophosphamide and selected patients receiving other chemotherapies of moderate emetic risk (e.g., carboplatin, cisplatin, doxorubicin, epirubicin, ifosfamide, irinotecan, or methotrexate), a 5-HT3 receptor antagonist (ondansetron, granisetron, dolasetron, or palonosetronb), dexamethasone (12 mg), and aprepitant (125 mg) recommended, with or without lorazepam, prechemotherapy; for other patients, aprepitant is not recommended.</p>" +  
			"<p>For prevention of delayed emesis, dexamethasone (8 mg) or a 5-HT3 receptor antagonist on days 2 - 4 or, if used on day 1, aprepitant (80 mg) on days 2 and 3, with or without dexamethasone (8 mg) on days 2 - 4, recommended, with or without lorazepam on days 2 - 4.</p>"
};

// High (>90%) risk
EmesisRisk["B985F3AA-0B21-E111-BF57-000C2935B86F"] = 
{
	riskID : "B985F3AA-0B21-E111-BF57-000C2935B86F",
	level : 4, 
	ASCO :	"<p>Three-drug combination of a 5-HT3 receptor antagonist, dexamethasone, and aprepitant recommended prechemotherapy.</p>" +  
			"<p>For patients receiving cisplatin and all other agents of high emetic risk, the two-drug combination of dexamethasone and aprepitant recommended for prevention of delayed emesis.</p>", 
	NCCN :	"<p>Prechemotherapy, a 5-HT3 receptor antagonist (ondansetron, granisetron, dolasetron, or palonosetronb), dexamethasone (12 mg), and aprepitant (125 mg) recommended, with or without lorazepam.</p>" +  
			"<p>For prevention of delayed emesis, dexamethasone (8 mg) on days 2 - 4 plus aprepitant (80 mg) on days 2 and 3 recommended, with or without lorazepam on days 2 - 4.</p>"
};



function getEmesisRecommendation(level) {
	return ({ "ASCO" : EmesisRisk[level-1].ASCO , "NCCN" : EmesisRisk[level-1].NCCN } );
}









/******************
var ScratchDataRecord = {
	"Cycle": 1,
	"Day": 1,
	"AdminDate": "01/25/2012",
	"PreTherapyInstr": "Dosages given two hours beofre therapy.",
	"TherapyInstr": "Pre-Therapy Required",
	"PostTherapyInstr": "Post-Therapy Instructions.",
	"PreTherapy": [
		{
			"Instr": "",
			"Med": "Aprepitant",
			"DescDose": "400",
			"DescUnits": "Units / m2",
			"Dose1": "400",
			"DoseUnits1": "Units / m2",
			"AdminMethod1": "SubQ",
			"FluidType1": "",
			"FlowRate1": "",
			"InfusionTime1": "",
			"BSA_Dose1": "736",
			"Dose2": "350",
			"DoseUnits2": "ml",
			"AdminMethod2": "IV",
			"FluidType2": "",
			"FlowRate2": "100",
			"InfusionTime2": "100",
			"BSA_Dose2": "736",
			"AdminTime": ""
		},
		{
			"Instr": "",
			"Med": "Dexamethasone",
			"DescDose": "500",
			"DescUnits": "MicroGram",
			"Dose1": "500",
			"DoseUnits1": "MicroGram",
			"AdminMethod1": "IM",
			"FluidType1": "",
			"FlowRate1": "",
			"InfusionTime1": "",
			"BSA_Dose1": "",
			"Dose2": "",
			"DoseUnits2": "",
			"AdminMethod2": "",
			"FluidType2": "",
			"FlowRate2": "",
			"InfusionTime2": "",
			"BSA_Dose2": "",
			"AdminTime": ""
		}
	],
	"Therapy": [
		{
			"Instr": "",
			"Med": "Dexamethasone",
			"DescDose": "450",
			"DescUnits": "Units / m2",
			"Dose": "450",
			"DoseUnits": "Units / m2",
			"AdminMethod": "",
			"FluidType": "",
			"FlowRate": "100",
			"InfusionTime": "1200",
			"BSA_Dose": "828",
			"AdminTime": ""
		},
		{
			"Instr": "",
			"Med": "Pemetrexed",
			"DescDose": "450",
			"DescUnits": "MicroGram",
			"Dose": "450",
			"DoseUnits": "MicroGram",
			"AdminMethod": "",
			"FluidType": "",
			"FlowRate": "100",
			"InfusionTime": "1300",
			"BSA_Dose": "",
			"AdminTime": ""
		}
	],
	"PostTherapy": [
		{
			"Instr": "",
			"Med": "Aprepitant",
			"DescDose": "150",
			"DescUnits": "mg/m2",
			"Dose1": "150",
			"DoseUnits1": "mg/m2",
			"AdminMethod1": "Oral",
			"FluidType1": "",
			"FlowRate1": "100",
			"InfusionTime1": "1300",
			"BSA_Dose1": "276",
			"Dose2": "200",
			"DoseUnits2": "ml",
			"AdminMethod2": "IV",
			"FluidType2": "",
			"FlowRate2": "100",
			"InfusionTime2": "",
			"BSA_Dose2": "",
			"AdminTime": ""
		}
	]
};
*********************/


Ext.define("COMS.controller.NewPlan.OEM", {
	extend: "Ext.app.Controller",

	stores: [
		"Templates"
	],


	views: [
		"NewPlan.OEM",
		"NewPlan.CTOS.OEMGoal",
		"NewPlan.CTOS.OEMPerformanceStatus"
	],

	refs: [
		{
			ref: "MyTemplates",
			selector: "NewPlanTab PatientInfo OEM selAppliedTemplate"
		},
		{
			ref: "dspOEMTemplateData",
			selector: "NewPlanTab PatientInfo OEM dspOEMTemplateData"
		},
		{
			ref: "OEMTab",
			selector: "NewPlanTab PatientInfo OEM"
		},
		{
			ref: "CTOS_Tabs",
			selector: "NewPlanTab CTOS"
		},
		{
			ref: "CTOSTab",
			selector: "NewPlanTab CTOS [title=\"Chemotherapy Template Order Source\"]"
		},
		{
			ref: "OEM_Help",
			selector: "NewPlanTab OEM [name=\"Help\"]"
		},

		{
			ref: "OEM_Level1",
			selector : "OEM container[name=\"OEM_Level1\"]"
		},

		{
			ref: "SelectAdminDay2View",
			selector : "OEM combo[name=\"SelectAdminDay2View\"]"
		},
	{
			ref : "GoalBtn",
			selector : "OEM OEM_Level1 [name=\"AddGoal\"]"
	}

	],


	// Ext.ComponentQuery.query("OEM container[name=\"OEM_Level1\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized OEM Tab Controller!");

		this.application.on( { TemplateSelected : this.TemplateSelected, scope : this } );
		this.application.on( { DisplayOEMData : this.displayOEM_Record_Data, scope : this } );	// Display the OEM Record Data - Pass Record Data
		this.application.on( { PatientSelected : this.PatientSelected, scope : this } );

		this.control({
			"NewPlanTab PatientInfo OEM selAppliedTemplate": {
				select: this.selTemplateChange,
				beforequery: this.selTemplateQuery
			},
			"NewPlanTab PatientInfo OEM" : {
				beforeactivate : this.BeforeTabActivated,
				afterrender : this.AssignBtnHandlers
			},
			"OEM combo[name=\"SelectAdminDay2View\"]" : {
				select : this.selAdminDayChange
			},
			"OEM dspOEMTemplateData" : {
				afterrender : this.tabRendered
			}
		});

	},


	// Determines if the date passed is an Admin Day for this Regimen
	// If the date passed is an Admin Day then the OEM Data for that day is returned
	// else returns null.
	theDate_Cycle : "",
	theDate_Dat : "",
	IsDayAnAdminDay : function( theDate ) {
		var j, theData, dataLen, thePatient, AdminDay, dayData;
		try {
			thePatient = this.application.Patient;
			if (thePatient.OEMRecords) {
				theData = thePatient.OEMRecords.OEMRecords;
				dataLen = theData.length;
				for (j = 0; j < dataLen; j++) {
					dayData = theData[j];
					AdminDay = theData[j].AdminDate;
					if (theDate === AdminDay) {
						return theData[j];
					}
				}
			}
		}
		catch (e)
		{
		}
		return null;
	},


	tabRendered : function( theTab, eOpts ) {
			// var a1 = theTab.el.select("button.EditOEM_Record");
			// a1.on("click", this.handleEditOEM_Record, this);

			// Attach event to the "Add Goal" and "Add Clinical Trial" buttons (styled to look like links)

			// var Goal_CTrialBtn = theTab.el.select("button.anchor");		<--- MWB - 6/26/2012 - No longer needed as this info is set at Apply Template Time.
/********** Debugging code to display list of all button names selected *************
 *** the data returned from the above query includes all calculated dosages as well as edit links for editing OEM Data/Admin Days
var Elements = Goal_CTrialBtn.elements;
var element;
var eLen = Elements.length;
var i, BtnName;
for (i = 0; i < eLen; i++) {
	element = Elements[i];
	BtnName = element.getAttribute("name");
	console.log(BtnName);
}
***************************************************************************************/
			// Goal_CTrialBtn.on("click", this.handleGoal_CTrial, this);		<--- MWB - 6/26/2012 - No longer needed as this info is set at Apply Template Time.

		// When rendering the tab, if today is an Admin Day then show today's OEM Records, else show all the OEM Records.
		var LinkName, Elements, theElement, theID, tmpData = this.IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		if (null !== tmpData) {
			// dspOEMTemplateData
			LinkName = "Section_Cycle_" + tmpData.Cycle + "_Day_" + tmpData.Day;
			Elements = Ext.query(".OEMRecord");
			for (i = 0; i < Elements.length; i++) {
				theElement = Elements[i];
				theID = theElement.id;
				if (theID === LinkName) {
					theElement.style.display="";
				}
				else {
					theElement.style.display="none";
				}
			}
		}
	},
/***********************************************************************************
 *
 *
 *
 *
 ***********************************************************************************/
	displayOEM_Record_Data : function( PatientInfo ) {
		var theData = PatientInfo.OEMRecords;		// MWB - 6/21/2012 - Set, this.application.Patient.OEMRecords.PerformanceStatus <=== new string and "PatientInfo" is the standard this.application.Patient
		var OEMLevel1, j, ComboStore, ComboStoreIndex = 0, Record, dspOEMTemplateData;

		if (PatientInfo.OEMDataRendered) {
			return;
		}
			// display the overall data for the template
		theData.TreatmentStart = PatientInfo.TreatmentStart;
		theData.TreatmentEnd = PatientInfo.TreatmentEnd;


		if (!theData.Patient) {		// Make sure we only add this once.
			// Some date from within the Patient object (e.g. BSA Info and some vitals) are needed for calculating dosages
			// but since the applications scope from within an xTemplate is not available this is a simple way to get the data there
			// we should be able to delete the Patient object from theData object at somepoint after the OEM Data has been rendered.
			theData.Patient = PatientInfo;		// MWB - 5/30/2012 - Does this permanently add the PatientInfo to theData record?
		}

		OEMLevel1 = this.getOEM_Level1();
		OEMLevel1.update(theData);
		OEMLevel1.show();
// console.log("OEM Data Rendered");



		AdminDay2ViewCombo = this.getSelectAdminDay2View();
		ComboStore = AdminDay2ViewCombo.getStore();
		ComboStore.removeAll();
		Record = { date : "Show All", LinkName : "Cycle_0_Day_0" };
		ComboStore.insert(ComboStoreIndex++, Record);

		if (!theData.OEMRecords) {
			// Apparently we get here when attempting to save a specific OEM Record.
			alert("OEM REcords is missing in OEM Controller...");
		}

		var DataRecords = theData.OEMRecords;
		var dRecordsLen = DataRecords.length;
		for (j = 0; j < dRecordsLen; j++) {
			Record = { date : DataRecords[j].AdminDate, LinkName : ("Cycle_" + DataRecords[j].Cycle + "_Day_" + (DataRecords[j].Day)) };
			ComboStore.insert(ComboStoreIndex++, Record);
		}
		AdminDay2ViewCombo.show();



			// display the data for each day in each cycle.
		dspOEMTemplateData = this.getDspOEMTemplateData();
		dspOEMTemplateData.update( theData );
		dspOEMTemplateData.show();

		// MWB - 5/10/2012 - Need to debug this block...
		var theTab = Ext.ComponentQuery.query("OEM dspOEMTemplateData")[0];
		if (theTab && theTab.rendered){
			var a1 = theTab.el.select("button.EditOEM_Record");
			a1.on("click", this.handleEditOEM_Record, this);

			// Attach event to the "Add Goal" and "Add Clinical Trial" buttons (styled to look like links)
			// var Goal_CTrialBtn = theTab.el.select("button.anchor");		<--- MWB - 6/26/2012 - No longer needed as this info is set at Apply Template Time.
			// Goal_CTrialBtn.on("click", this.handleGoal_CTrial, this);	<--- MWB - 6/26/2012 - No longer needed as this info is set at Apply Template Time.

		var LinkName, Elements, theElement, theID, tmpData = this.IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		if (null !== tmpData) {
			// dspOEMTemplateData
			LinkName = "Section_Cycle_" + tmpData.Cycle + "_Day_" + tmpData.Day;
			Elements = Ext.query(".OEMRecord");
			for (i = 0; i < Elements.length; i++) {
				theElement = Elements[i];
				theID = theElement.id;
				if (theID === LinkName) {
					theElement.style.display="";
				}
				else {
					theElement.style.display="none";
				}
			}
		}
		}

		this.application.Patient.OEMDataRendered = true;
	},
/***********************************************************************************
 *
 *
 *
 *
 ***********************************************************************************/

/********************** 		<--- MWB - 6/26/2012 - No longer needed as this info is set at Apply Template Time.
// Handle the action for the "Add Goal" and "Add Clinical Trial" buttons (styled to look like links) 
// See "app\view\NewPlan\CTOS\OEMClinicalTrial.js" and "app\view\NewPlan\CTOS\OEMGoal.js"
handleGoal_CTrial : function (event, element) {
	event.stopEvent( );
	var BtnName = element.getAttribute("name");
	var Widget;
	var Query;
	switch(BtnName) {
		case "AddClinicalTrial" :
			Widget = "OEMClinicalTrial";
			Query = "OEMClinicalTrial button[text=\"Save\"]";
			break;
		case "AddGoal" : 
			Widget = "OEMGoal";
			Query = "OEMGoal button[text=\"Save\"]";
			break;
	}
	var Win = Ext.widget(Widget);
	var SaveBtn = Ext.ComponentQuery.query(Query)[0];
	SaveBtn.on("click", this.SaveGoal_CTrial, this );


},

SaveGoal_CTrial  : function(button, event, eOpts) {
		var PatientInfo = this.application.Patient;
		var win = button.up("window");
		var form = win.down("form");


		form.submit({
			url : Ext.URLs.Edit_OEMRecord + "/" + PatientInfo.id,
			success: function(form, action) {

				var theData = action.result.records[0];
				alert(action.result.msg);
			},
			failure: function(form, action) {

				alert(action.result.msg);
			}
		});

		win.close();
	},

*****************************************/


/********************************************************************************
	loadOEM_Record_Data : function( PatientID ) {
		// alert("Need to make sure basic Patient data is loaded before launching this function... (controller/NewPlan/OEM.js)");
// debugger;
		var CTOSModel = this.getModel("OEMRecords");		// MWB 21 Feb 2012 - Loading new model for retrieving the records direct from the DB rather than generating them
		this.application.loadMask(); // MWB 19 Jan 2012 - Mask the screen
		try {
			this.getSelectAdminDay2View().hide();			
		}
		catch (e) {
			// The Select tag may not have been rendered yet so this is a simple fix to prevent an error in that case
		}

		CTOSModel.load( PatientID, {
			scope: this,
			success: function (TemplateData, response) {
				try {
					wccConsoleLog("Template Data Loaded - Processing");
					var theData = TemplateData.data;
					theData.PatientName = this.application.Patient.name;
					theData.RegimenName = this.application.Patient.TemplateName;
					theData.RegimenDescription = this.application.Patient.TemplateDescription;
					theData.ELevelRecommendationASCO = EmesisRisk[theData.ELevelID].ASCO;
					theData.ELevelRecommendationNCCN = EmesisRisk[theData.ELevelID].NCCN;


					// Calculate Dose for any record requireing it.
					var x1 = theData.OEMRecords;	// Array of the individual records;
					for (ii = 0; ii < x1.length; ii++) {
						var x2 = x1[ii].Therapy;	// Array of Therapy records for this Admin Day
						for (jj = 0; jj < x2.length; jj++) {
							x2[jj].BSA_Dose = Ext.DoseCalc(this.application.Patient, x2[jj].Dose, x2[jj].DoseUnits);
						}
					}



					this.application.Patient.OEMRecords = theData;
				}
				catch (err) {
					var errMsg1 = "ERROR in parsing data for Template " + this.application.Patient.TemplateName;
					alert("ERROR in Loading Order Entry Management Record Data for Template : " + this.application.Patient.TemplateName);
					wccConsoleLog(errMsg1);
					wccConsoleLog(err.message + " @ Line# " + err.lineNo);
				}

				this.application.unMask();
			},
			failure: function (err) {
				wccConsoleLog("Template Data failed to load properly");
				alert("ERROR in Loading Order Entry Management Record Data for Template<br>No information available for Template " + PatientID);
				this.application.unMask();
			}
		});
	},
********************************************************************************/



/***********************************************************************************
 *
 *	Called when the "selAdminDayChange" event is triggered from the List of Administration Days drop down 
 *	to display a particular OEM Record for a particular Administration Day
 *
 ***********************************************************************************/
	hideAllAdminDays : function() {
		var Elements = Ext.query(".OEMRecord");
		var ElLen = Elements.length;
		var i, theElement, theID;

		for (i = 0; i < ElLen; i++) {
			theElement = Elements[i];
			theElement.style.display="none";
		}
	},
	showAllAdminDays : function() {
		var Elements = Ext.query(".OEMRecord");
		var ElLen = Elements.length;
		var i, theElement, theID;

		for (i = 0; i < ElLen; i++) {
			theElement = Elements[i];
			theElement.style.display="block";
		}
	},
	selAdminDayChange : function(combo, recs, eOpts) {
		var theData = recs[0];

		var thisCtl = this.getController("NewPlan.OEM");
		var dspDate = theData.data.date;
		var LinkName = theData.data.LinkName;
		var Elements = Ext.query(".OEMRecord");
		var ElLen = Elements.length;
		var i;
		var theElement;
		var tmpName;
		var theID;

/**********
		debugger;
		var WhichOne = 1;
		if (0 === WhichOne) {
			this.showAllAdminDays();
		}
		else {
			this.hideAllAdminDays();
		}
************/

		if ("Cycle_0_Day_0" === LinkName) {
			this.showAllAdminDays();
		}
		else {
			tmpName = "Section_" + LinkName;
			this.hideAllAdminDays();
			for (i = 0; i < ElLen; i++) {
				theElement = Elements[i];
				theID = theElement.id;
				if (theID === tmpName) {
					theElement.style.display="block";
				}
			}
		}
	},


/***********************************************************************************
 *
 *	Called when the "selAdminDayChange" event is triggered from the List of Administration Days drop down 
 *	to display a particular OEM Record for a particular Administration Day
 *
 ***********************************************************************************/
	HandleOEMCalcDoseButtons : function (evt, aBtn) {
		// button attributes
		// title = "Show Dosage Calculation"
		// name = "dspOEMDoseCalcs"

		// dose = The dose being administered
		// units = The units
		// calcDose = The calculated (aka BSA/KG/AUC) Dose
		// doseunits = The Units for the dose to be administered (e.g. mg/m2)

		// class = "anchor" <- Not needed
		// id = the element id, Not needed
		var btnTitle = aBtn.getAttribute("title");
		var dose, units, calcDose, doseUnits, Patient = this.application.Patient;

		if ("Show Dosage Calculation" === btnTitle) {
			calcDose = aBtn.getAttribute("calcDose");

			var t1 = aBtn.getAttribute("doseunits");
			var t2 = t1.split("/");
			if ("m2" === t2[1]) {
				t2[1] = "m<sup>2</sup>";
			}
			dose = aBtn.getAttribute("dose") + " " + t2.join("/");
			PatientData = Ext.ShowBSACalcs(Patient, false, dose, calcDose);
			var title = "Body Surface Area Calculations";
			if (dose.search("AUC") >= 0) {
				title = "AUC Dosage Calculations";
			}

			Ext.MessageBox.show({
				title : title,
				msg : PatientData,
				buttons : Ext.MessageBox.OK
			});

		}
	},

	/**********************
	 *
	 *	Called when the user clicks on the OEM tab.
	 *	If the current patient has a template applied to them then the tab will display
	 *	And render the currently applied template.
	 *	Makes use of functionality also in the "TemplateSelected" method below.
	 *
	 **********************/
	TabActivated : false,


	deferredAssignBtnHandler : function() {
		OEMLevel1 = this.getOEM_Level1();
		var OEMLevel1Btns = OEMLevel1.el.select("button");		// MWB - 6/26/2012 - Currently only the "Edit Performance Status" button exists in this section
		OEMLevel1Btns.on("click", this.HandleOEMLevel1Buttons, this);
	},

	deferredAssignBtnHandler2 : function() {
		var dspOEMTemplateData = this.getDspOEMTemplateData();
		var OEMTemplateDataBtns = dspOEMTemplateData.el.select("button.dspOEMDoseCalcs");
		OEMTemplateDataBtns.on("click", this.HandleOEMCalcDoseButtons, this);
	},

/***********************************************************************************
 *
 *
 *
 ***********************************************************************************/
	AssignBtnHandlers : function(thePanel, eOpts) {
		var PatientInfo = this.application.Patient;
		var dspOEMTemplateData, OEMTemplateDataBtns;

		// These are the buttons to 
		//		"Add Clinical Trial" (which might no longer be necessary as it's set when applying the template)
		//		"Edit Performance Status"
		// which aren't needed to be set here at this time
		Ext.Function.defer(this.deferredAssignBtnHandler, 2000, this);
		Ext.Function.defer(this.deferredAssignBtnHandler2, 2000, this);

		// Buttons for the individual OEM records:
		//		class="anchor ChangeOEM_AdminDate"
		//		class="anchor EditOEM_Record"
		//		class="anchor dspOEMDoseCalcs"
		dspOEMTemplateData = this.getDspOEMTemplateData();


		OEMTemplateDataBtns = dspOEMTemplateData.el.select("button.ChangeOEM_AdminDate");
		OEMTemplateDataBtns.on("click", this.HandleChangeAdminDateButtons, this);


		OEMTemplateDataBtns = dspOEMTemplateData.el.select("button.EditOEM_Record");
		OEMTemplateDataBtns.on("click", this.handleEditOEM_Record, this);
	},

	HandleChangeAdminDateButtons : function( event, element ) {
		alert("Function not yet available");
	},


/***********************************************************************************
 *
 *
 ***********************************************************************************/
	HandleOEMLevel1Buttons : function (event, element) {
		event.stopEvent( );
		var BtnName = element.getAttribute("name");
		var Widget, Query, params;


        var itemsInGroup = [];	// new Array();
        var myStore = this.getStore('PerfStatStore');

        myStore.each( function(record){
            if(record.data.value == '5' ){
                return;
            }
            itemsInGroup.push({
                boxLabel : record.data.value + ' - ' + record.data.description,
                name : 'PerfStatus',
                inputValue : record.data.id,
                width : 360
            });
        });


		switch(BtnName) {
			case "EditPerformanceStatus" : 
				Widget = "OEMPerformanceStatus";
				Query = "OEMPerformanceStatus button[text=\"Save\"]";
				params = {itemsInGroup: itemsInGroup};
				break;

			case "AddClinicalTrial" :
				alert("Add Clinical Trial - Not Currently Available - (NewPlan\\OEM)");
				Widget = "OEMClinicalTrial";
				Query = "OEMClinicalTrial button[text=\"Save\"]";
				params = null;
				break;
			case "AddGoal" : 
				alert("Add Goal - Not Currently Available - (NewPlan\\OEM)");
				Widget = "OEMGoal";
				Query = "OEMGoal button[text=\"Save\"]";
				params = null;
				break;
		}

		var Win = Ext.widget(Widget, params);
		var SaveBtn = Ext.ComponentQuery.query(Query)[0];
		SaveBtn.on("click", this.SaveOEM_PS, this );
	},

/***********************************************************************************
 *
 *
 ***********************************************************************************/
	SaveOEM_PS : function(button, event, eOpts) {
		var PatientInfo = this.application.Patient;
		var win = button.up("window");
		var form = win.down("form");
		var PSID = form.getValues().PerfStatus;

		var NewPS;
		var myStore = this.getStore('PerfStatStore');
        myStore.each( function(record){
			if (PSID === record.data.id) {
				NewPS = record.data.value + ' - ' + record.data.description;
			}
        });
		this.application.NewPerformanceStatus = NewPS;
		var rec = Ext.create(Ext.COMSModels.Vitals, {
			"PatientID" : PatientInfo.id,
			"PS_ID" : PSID
		});
		rec.save(
			{ 
				scope : this, 
				callback : function(rec, oper) {
					if (oper.success) {
					    var newPlanTabCtl = this.getController("NewPlan.NewPlanTab");
						newPlanTabCtl.loadVitals("Update Vitals");
						this.application.Patient.OEMRecords.PerformanceStatus = this.application.NewPerformanceStatus;
						var thisCtl = this.getController("NewPlan.OEM");
						OEMLevel1 = thisCtl.getOEM_Level1();
						OEMLevel1.update(this.application.Patient.OEMRecords);
						Ext.Function.defer(this.AssignBtnHandlers, 2000, this);
					}
					else {
						Ext.MessageBox.alert("Saving Error", "Performance State, Save Error - " + oper.error);
					}
				}
			}
		);

		win.close();
	},


/***********************************************************************************
 *
 *
 ***********************************************************************************/
	BeforeTabActivated : function(thePanel, eOpts) {
		var PatientInfo = this.application.Patient;

		// clear out any previous data before making the tab visible.
//		this.getOEM_Level1().update("");
//		this.getOEM_Level1().hide();
//		this.getDspOEMTemplateData().update( "" );
//		this.getDspOEMTemplateData().hide();
//		this.getSelectAdminDay2View().hide();

		var retFlg = true;
		if ("" === PatientInfo.TemplateID) {
			alert("No Template has been applied to this patient\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			retFlg = false;
		} else if (!PatientInfo.BSA_Method) {
			alert("You must enter/select a Body Surface Area by clicking on the \"Calculate Body Surface Area\" link above.\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			retFlg = false;
		}
		if (retFlg) {
			var templateObj = {};
			templateObj.name = PatientInfo.TemplateName;
			templateObj.id = PatientInfo.TemplateID;
			templateObj.description = PatientInfo.TemplateDescription;
			this.TabActivated = true;
			this.getAndRenderTemplateData (templateObj);
			this.TabActivated = false;
		}
		return retFlg;
	},

	/**********************
	 *
	 *	Event called by clicking on one of the links in the List of Patient's Templates
	 *	Then activates the "OEM" Tab and renders the selected template there.
	 *
	 **********************/
	TemplateSelected : function( opts, arg2) {
		var theTab = opts.tabType;
		var templateObj = {};
		templateObj.name = opts.templateName;
		templateObj.id = opts.templateID;
		templateObj.description = "";
		var tab2Show;

		if ("OEM" === theTab) {
			var PatientInfo = this.application.Patient;
			if (!PatientInfo.BSA_Method) {
				alert("Body Surface Area is NOT available\nClick on the \"Calculate Body Surface Area\" link below to calculate the Body Surface Area to be used for Dosing");
				return;
			}
			if ("Manual Entry" === PatientInfo.BSA_Method && "" === PatientInfo.BSA) {
				alert("Body Surface Area is NOT available\nPlease enter a \"Capped BSA Value\" below to calculate the Body Surface Area to be used for Dosing");
				return;
			}
			tab2Show = this.getOEMTab();
			this.getAndRenderTemplateData (templateObj);
		}
		else if ("CTOS" === theTab) {
			tab2Show = this.getCTOSTab();
		}

		this.getCTOS_Tabs().setActiveTab( tab2Show );


	},


	/**********************
	 *
	 *	Called when the "PatientSelected" event is triggered from the top of the NewTab Panel Select Patient drop down
	 *	This adjusts the values in the "Select Applied Template" drop down based on the selected user
	 *	This will eventually be eliminated as we will not use a drop down to select the Template.
	 *	A list of applied templates links will do this process
	 *
	 **********************/
	PatientSelected: function (combo, recs, eOpts) {
		wccConsoleLog("OEM Tab - Patient Selected has changed");
		var tpl = new Ext.XTemplate("");
		var dspOEMTemplateData = this.getDspOEMTemplateData();
		try {
			var theEl = dspOEMTemplateData.getEl();
			if (theEl) {
				tpl.overwrite(theEl, {});
				var templateModel = this.getModel("LookupTable_Templates");
				templateModel.proxy.url = Ext.URLs.Templates + "/Patient/" + this.application.Patient.id;
				var TemplateSelector = this.getMyTemplates();
				TemplateSelector.getStore().removeAll(); // clear out the store for the combo
				TemplateSelector.reset();
			}

		} catch (e) {
		}


		if (this.application.Patient.TemplateID) {
			this.application.Patient.OEMDataRendered = false;
			// this.loadOEM_Record_Data(this.application.Patient.id);	MWB - 5/16/2012 - Removed from here as the OEM Records are loaded at PatientSelected time from the NewPlanTab controller
		}
	
		this.getCTOS_Tabs().setActiveTab( this.getCTOSTab() );		// Force the "CTOS" tab to be opened when changing a patient
	},


	/**********************
	 *
	 *	Called when the user selects an applied template
	 *	This will eventually be eliminated as we will not use a drop down to select the Template.
	 *	A list of applied templates links will do this process
	 *
	 **********************/
	selTemplateQuery: function (qe) {
		if ("" === qe.combo.lastValue) {
			delete qe.combo.lastQuery;
		}
		var templateModel = this.getModel("LookupTable_Templates");
		templateModel.proxy.url = Ext.URLs.Templates + "/Patient/" + this.application.Patient.id;
	},










/***********************************************************************************
 *
 *
 ***********************************************************************************/
	getAndRenderTemplateData: function(TemplateObj) {
		wccConsoleLog("Template applied to patient has been selected");
		if (!this.TabActivated) {
			return;
		}

		var PatientInfo = this.application.Patient;
		if (PatientInfo.OEMRecords) {
			this.displayOEM_Record_Data (PatientInfo);
		}
		else {
			this.application.Patient.Template = TemplateObj;
			// this.loadOEM_Record_Data (this.application.Patient.id);	MWB - 5/16/2012 - Removed from here as the OEM Records are loaded at PatientSelected time from the NewPlanTab controller

			var NewPlanTabCtl = this.getController("NewPlan.NewPlanTab");
			NewPlanTabCtl.loadOrderRecords();
		}
	},




/***********************************************************************************
 *
 * MWB 13 Feb 2012
 * Handle click of Anchor to Edit a specific drug in an OEM Record
 * Anchors rendered in the OEM.js view as part of the XTemplate
 *
 ***********************************************************************************/
handleEditOEM_Record : function (event, element) {

	event.stopEvent(  );
		var anchorName = element.getAttribute("name");
		var anchorCycle = element.getAttribute("cycle");
		var anchorDay = element.getAttribute("day");
		var anchorType = element.getAttribute("type");
		var anchorIdx = element.getAttribute("typeidx");	// The index which specifies the index into the arrays of Admin Days
		var medIdx = element.getAttribute("medidx");		// The index into the array of Meds for the specified therapy
		var Data = this.application.Patient.OEMRecords;

		// MWB 14 Feb 2012 -- In Real Code need to get the specific record from the OEM Record Data attached to the Patient object
		// But currently need to adjust the OEM Record Data stored. The "Dosing" comes in as a single string rather than the individual components needed.
		var DrugSection;
		var theCycles = Data.OEMRecords;
//		var thisDay = theCycles[anchorCycle-1];			// MWB - 3/30/2012 - Why was the line below commented out and replaced by this one???
		var thisDay = theCycles[anchorIdx-1];		// Identifies the day based on the idx into the array of Cycles [ = ((#Days/Cycle) * (Cycle#)) + (Day in Cycle))]


		var MedRecord = {};

		var title;
		switch(anchorType) {
			case "Pre" :
				title = "Edit Pre-Therapy Drug";
				DrugSection = thisDay.PreTherapy;
				MedRecord.TherapyType = "Pre";
				break;
			case "Post" : 
				title = "Edit Post-Therapy Drug";
				DrugSection = thisDay.PostTherapy;
				MedRecord.TherapyType = "Post";
				break;
			default:
				title = "Edit Therapy Drug";
				DrugSection = thisDay.Therapy;
				MedRecord.TherapyType = "Therapy";
				break;
		}
		var mr = DrugSection[medIdx-1];

		// Ideally these values should probably be stored in the DB but they're only really needed when editing a particular record
		// And to put them in the DB would entail changing the Model and back end store to little real necessity
		MedRecord.Order_ID = mr.Order_ID;
		MedRecord.CycleIdx = anchorCycle;
		MedRecord.DayIdx = anchorDay;
		MedRecord.MedIdx = medIdx;

		MedRecord.TemplateID = Data.id;
		MedRecord.OEMRecordID = thisDay.id;

		MedRecord.TherapyID = mr.id;

		MedRecord.Instructions = mr.Instructions;
		MedRecord.AdminTime = mr.AdminTime;
		MedRecord.MedID = mr.MedID;
		MedRecord.Med = mr.Med;

		if ("Therapy" === MedRecord.TherapyType) {
			MedRecord.Dose = mr.Dose;
			MedRecord.BSA_Dose = mr.BSA_Dose;
			MedRecord.Units = mr.DoseUnits;
			MedRecord.InfusionMethod = mr.AdminMethod;
			MedRecord.FluidType = mr.FluidType;
			MedRecord.InfusionTime1 = mr.InfusionTime;

			MedRecord.FluidVol = mr.FluidVol;
			MedRecord.FlowRate = mr.FlowRate;

//				// MWB Faking out the system because we don't have multiple fluid info (3/5/2012)
//			if ("IV" === mr.AdminMethod.substr(0, 2)) {
//				MedRecord.FluidType = "D5W";
//				MedRecord.FluidVol = mr.FluidVol;
//				MedRecord.FlowRate = mr.FlowRate;
//			}

		}
		else {
			MedRecord.Dose = mr.Dose1;
			MedRecord.BSA_Dose = mr.BSA_Dose1;
			MedRecord.Units = mr.DoseUnits1;
			MedRecord.InfusionMethod = mr.AdminMethod1;
			MedRecord.FluidType = mr.FluidType1;

			MedRecord.FluidVol = mr.FluidVol1;
			MedRecord.FlowRate = mr.FlowRate1;

			MedRecord.Dose2 = mr.Dose2;
			MedRecord.BSA_Dose2 = mr.BSA_Dose2;
			MedRecord.Units2 = mr.DoseUnits2;
			MedRecord.InfusionMethod2 = mr.AdminMethod2;
			MedRecord.FluidType2 = mr.FluidType2;
			MedRecord.FluidVol2 = mr.FluidVol2;
			MedRecord.FlowRate2 = mr.FlowRate2;
			MedRecord.InfusionTime1 = mr.InfusionTime1;
			MedRecord.InfusionTime2 = mr.InfusionTime2;

				// MWB Faking out the system because we don't have multiple fluid info (3/5/2012)
//			if ("IV" === mr.AdminMethod2.substr(0, 2)) {
//				MedRecord.FluidType2 = "D5W";
//				MedRecord.FluidVol2 = mr.FluidVol1;
//				MedRecord.FlowRate2 = mr.FlowRate1;
//			}
//			if ("IV" !== mr.AdminMethod1.substr(0, 2)) {
//				MedRecord.FluidType = "";
//				MedRecord.FluidVol = "";
//				MedRecord.FlowRate = "";
//			}
		}

		var EditRecordWin = Ext.widget("EditOEMRecord");
		EditRecordWin.setTitle(title);
		this.application.fireEvent("OEMEditRecord", MedRecord, anchorType);
		return false;
},



	/**********************
	 *
	 *	Called when the user selects a template.
	 *	This method makes a call to the back end service to retrieve the data for the selected template
	 *	Then parses it to make a JSON Data Object and passes it off to the XTemplate for rendering in the OEM Tab
	 *
	 **********************/
	selTemplateChange: function (combo, recs, eOpts) {
		wccConsoleLog("Template applied to patient has been selected");
		this.getAndRenderTemplateData (recs[0].data);
	}


});



/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
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
			}
		});
	},




	/*************************************************************
	 *
	 *	BSA Calculations Modules
	 *
	 *************************************************************/
	

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



/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
// MWB - JSLint run successfully on 5/31/2012

Ext.define("COMS.controller.NewPlan.OEM_Edit", {
	extend: "Ext.app.Controller",

	stores: [
            "ReasonStore"
	],


	views: [
		"NewPlan.CTOS.OEM_Edit"
	],

	refs: [
		{
			ref: "theForm",
			selector : "EditOEMRecord form"
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
			ref: "FluidVol2",
			selector : "EditOEMRecord FluidVol[name=\"FluidVol2\"]"
		},
		{
			ref: "FlowRate2",
			selector : "EditOEMRecord FlowRate[name=\"FlowRate2\"]"
		},
		{
			ref: "InfusionTime2",
			selector : "EditOEMRecord displayfield[name=\"InfusionTime2\"]"
		}
	
	
//		{
//			ref: "MyTemplates",
//			selector: "NewPlanTab PatientInfo OEM selAppliedTemplate"
//		},
//		{
//			ref: "theTable",
//			selector : "EditOEMRecord form container[name=\"DrugRecordForm\"]"
//		},
//
//		{
//			ref: "FluidInfoSpacer",
//			selector : "EditOEMRecord form container[name=\"FluidInfoSpacer\"]"
//		}
//		{
//			ref: "FluidType",
//			selector : "EditOEMRecord [name=\"FluidType\"]"
//		}
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
			}
		});

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

	SaveChanges : function(button, event, eOpts) {
		var win = button.up("window");
		var form = win.down("form");
		var record = form.getRecord();
		var values = form.getValues();
//		debugger;
		record.set(values);
		win.close();


			var PatientInfo = this.application.Patient;
			var CycleIdx = PatientInfo.MedRecord.CycleIdx;
			var DayIdx = PatientInfo.MedRecord.DayIdx;
			var MedIdx = PatientInfo.MedRecord.MedIdx;
			var TherapyType = PatientInfo.MedRecord.TherapyType;

			var AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;
			var CalcDayIndex = ((CycleIdx - 1) * AdminDaysPerCycle) + (DayIdx - 1);
			var Record2Change = PatientInfo.OEMRecords.OEMRecords[CalcDayIndex];


var MedRecord = PatientInfo.MedRecord;

// MWB - 3/15/2012 - Need to check if the dose unites is based on Surface Area then calculating BSA Dose then

MedRecord.BSA_Dose1 = "";
MedRecord.BSA_Dose2 = "";

if (values.Units.indexOf("/m2") > 0 || values.Units.indexOf("/ m2") > 0) {
	MedRecord.BSA_Dose1 = values.Dose * PatientInfo.BSA;
}
MedRecord.BSA_Dose1 = Ext.GeneralRounding2Digits(MedRecord.BSA_Dose1);

if (values.Units2.indexOf("/m2") > 0 || values.Units2.indexOf("/ m2") > 0) {
	MedRecord.BSA_Dose2 = values.Dose2 * PatientInfo.BSA;
}
MedRecord.BSA_Dose2 = Ext.GeneralRounding2Digits(MedRecord.BSA_Dose2);





MedRecord.Dose1 = values.Dose;
MedRecord.DoseUnits1 = values.Units;
MedRecord.FlowRate1 = values.FlowRate;
MedRecord.FluidType1 = values.FluidType;
MedRecord.FluidVol1 = values.FluidVol;
MedRecord.AdminMethod1 = values.InfusionMethod;

MedRecord.Dose2 = values.Dose2;
MedRecord.DoseUnits2 = values.Units2;
MedRecord.FlowRate2 = values.FlowRate2;
MedRecord.FluidType2 = values.FluidType2;
MedRecord.FluidVol2 = values.FluidVol2;
MedRecord.AdminMethod2 = values.InfusionMethod2;



var MedRecord1 = {};


MedRecord1.AdminMethod1 = MedRecord.AdminMethod1;
MedRecord1.AdminMethod2 = MedRecord.AdminMethod2;
MedRecord1.AdminTime = MedRecord.AdminTime;
MedRecord1.BSA_Dose1 = MedRecord.BSA_Dose1;
MedRecord1.BSA_Dose2 = MedRecord.BSA_Dose2;
MedRecord1.Dose1 = MedRecord.Dose1;
MedRecord1.Dose2 = MedRecord.Dose2;
MedRecord1.DoseUnits1 = MedRecord.DoseUnits1;
MedRecord1.DoseUnits2 = MedRecord.DoseUnits2;
MedRecord1.FlowRate1 = MedRecord.FlowRate1;
MedRecord1.FlowRate2 = MedRecord.FlowRate2;
MedRecord1.FluidType1 = MedRecord.FluidType1;
MedRecord1.FluidType2 = MedRecord.FluidType2;
MedRecord1.FluidVol1 = MedRecord.FluidVol1;
MedRecord1.FluidVol2 = MedRecord.FluidVol2;
MedRecord1.InfusionTime1 = MedRecord.InfusionTime1;
MedRecord1.InfusionTime2 = MedRecord.InfusionTime2;
//MedRecord1.Instructions = MedRecord.Instructions;
MedRecord1.Instructions = values.Instructions;
MedRecord1.Med = MedRecord.Med;
MedRecord1.MedID = MedRecord.MedID;
MedRecord1.id = MedRecord.id;
MedRecord1.Reason = MedRecord.Reason;

MedRecord1.CycleIdx = PatientInfo.MedRecord.CycleIdx;
MedRecord1.DayIdx = PatientInfo.MedRecord.DayIdx;
MedRecord1.MedIdx = PatientInfo.MedRecord.MedIdx;
MedRecord1.TherapyType = PatientInfo.MedRecord.TherapyType;
MedRecord1.AdminDaysPerCycle = PatientInfo.OEMRecords.AdminDaysPerCycle;





// debugger;
			if ("Pre" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PreTherapy[MedIdx - 1] = MedRecord1;
			}else if ("Post" == TherapyType) {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].PostTherapy[MedIdx - 1] = MedRecord1;
			} else {
				PatientInfo.OEMRecords.OEMRecords[CalcDayIndex].Therapy[MedIdx - 1] = MedRecord1;
			}
			this.application.Patient.OEMDataRendered = false;		// Force the tab contents to be re-calculated

		var OEMCtl = this.getController("NewPlan.OEM");
//		var nullSet = {};
//		nullSet.OEMRecords = [];
//		OEMCtl.displayOEM_Record_Data(nullSet);

// MWB - 5/31/2012 - Passing the OEMRecords in this function breaks the display rendering.
//		OEMCtl.displayOEM_Record_Data(PatientInfo.OEMRecords);

// MWB - 5/31/2012 - Let's try adding this back in instead of the above...
//			this.application.fireEvent("DisplayOEMData", PatientInfo.OEMRecords.OEMRecords);


		var saveCfg = { scope : this, callback : function( records, operation, success ) {
			var PatientInfo = this.application.Patient;
			var CycleIdx = PatientInfo.MedRecord.CycleIdx;
			var DayIdx = PatientInfo.MedRecord.DayIdx;
			var MedIdx = PatientInfo.MedRecord.MedIdx;

		}};
		record.save(saveCfg);
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

		if ("Pre" === RecordType || "Post" === RecordType) {
			ShowOptional = true;
			this.toggleOptionalDosing(true);
			if ("IV" == MedRecord.InfusionMethod2.substr(0, 2)) {
				ShowFluid2 = true;
				this.toggleFluidInfo2(true);
			}
		}

		if ("IV" == MedRecord.InfusionMethod.substr(0, 2)) {
			ShowFluid = true;
			this.toggleFluidInfo(true);
		}

		var EditRecordModel = this.getModel(Ext.COMSModels.Edit_OEMRecord);
		var aRecord = COMS.model.OEMEditRecord.create(MedRecord);
		theForm.loadRecord(aRecord);
	}


});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetTab", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
	    "NewPlan.CTOS.FlowSheet"
	],

	refs: [
	    {
		    ref: "FlowSheet",
			selector: "FlowSheet"
	    },

	    {
		    ref: "FlowSheetGrid",	// This is a container which will hold the grid once it's created.
			selector: "FlowSheet [name=\"flowsheet grid\"]"
	    },
		{
			ref: "CTOS_Tabs",
			selector: "NewPlanTab CTOS"
		},
	    {
		    ref: "FlowSheetOverview",
			selector: "FlowSheetOverview"
	    },
	    {
		    ref: "FlowSheetBody",
			selector: "FlowSheetBody"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Flow Sheet Tab Controller!");

		this.application.on( { PatientSelected : this.PatientSelected, scope : this } );

		this.control({
			"FlowSheet" : {
				beforeactivate : this.BeforeTabActivated
			},

			"FlowSheet [name=\"flowsheet grid\"]" : {
				render : this.TabRendered
			}
		});
	},


	CellEditCommit : function (editor, eObj) {
		var Patient = this.application.Patient;
		var fieldName = eObj.grid.getStore().getAt(eObj.rowIdx).get("label");
		switch (fieldName) {
		case "Weight (lbs)":
			fieldName = "Weight";
			break;
		case "Disease Response":
			fieldName = "DiseaseResponse";
			break;
		case "Toxicity Side Effects":
			fieldName = "Toxicity";
			break;
		case "Other":
			fieldName = "Other";
			break;
		}

		var Header = eObj.grid.headerCt.items.items[eObj.colIdx].text;
		var cd = Header.split(", ");		// Header is formated like "Cycle XX, Day YY", so a split on ", " gives cd = [ "Cycle XX", "Day YY"];

		var newRecord = {};
		newRecord.PAT_ID = Patient.PAT_ID;		// Treatment ID;
		newRecord.FlowsheetAdminDay = {};
		newRecord.FlowsheetAdminDay[fieldName] = eObj.value;
		newRecord.FlowsheetAdminDay["PatientID"] = Patient.id;
		newRecord.FlowsheetAdminDay["Cycle"] = cd[0].split(" ")[1];
		newRecord.FlowsheetAdminDay["Day"] = cd[1].split(" ")[1];
		newRecord.FlowsheetAdminDay["AdminDate"] = eObj.grid.getStore().getAt(0).get(eObj.column.dataIndex);

        var fsTemplate = Ext.create(Ext.COMSModels.Flowsheet, newRecord );

		fsTemplate.save({
            scope: this,
            success: function (data) {
                wccConsoleLog("Saved Template " );
			},
			failure : function ( data ) {
				alert("Flowsheet Save unsuccessful");
			}
		});
	},

	CellEdit : function (plugin, eObj, beforeEdit) {
		var theRecord = eObj.record;
		var theStore = eObj.grid.getStore();
		var DateRecord = theStore.getAt(0);	// Date row is first row in the store.
		var data = DateRecord.data;
		var AdminDate = data[eObj.column.dataIndex];
		var Today = Ext.Date.format(new Date(), "m/d/Y");

		var label = theRecord.data.label;
//		if ("Weight (lbs)" === label || "Disease Response" === label || "Toxicity Side Effects" === label || "Other" === label ) {
	// In response to e-mail from Lou (dated 26 Jun 2012 20:36:20 ) weight should not be an editable field here.
		if ("Disease Response" === label || "Toxicity Side Effects" === label || "Other" === label ) {
			if (AdminDate === Today) {
				return true;
			}
			alert("You can only edit cells where today is the current Admin Date");
			return false;
		}
		alert("You can only edit the \"Disease Response\", \"Toxicity Side Effects\" or \"Other\" cells");
		return false;
	},
	TabContentsCleared : true,

	/**********************
	 *
	 *	Called when the "PatientSelected" event is triggered from the top of the NewTab Panel Select Patient drop down
	 *	This adjusts the values in the "Select Applied Template" drop down based on the selected user
	 *
	 **********************/
	PatientSelected: function (combo, recs, eOpts) {
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");

		var theGrid = Ext.getCmp("FlowsheetGrid");
		if (theGrid && theGrid.rendered) {
			Ext.destroy(theGrid);
		}

		var Flowsheet = thisCtl.getFlowSheet();
		if (Flowsheet) {
			if (Flowsheet.rendered) {
				this.TabContentsCleared = true;
				this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Flow Sheet Tab has been rendered");
		this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
		var ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
		thisCtl.ChemoBioSectionHandler(false, ThisAdminDay);
	},

	BeforeTabActivated : function (component, eOpts ) {
		wccConsoleLog("Flow Sheet Tab has been rendered");

		var PatientInfo = this.application.Patient;
		if ("" === PatientInfo.TemplateID) {
			alert("No Template has been applied to this patient\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			var theGrid = Ext.getCmp("FlowsheetGrid");
			if (theGrid && theGrid.rendered) {
				Ext.destroy(theGrid);
			}
			return false;
		}


		if ( this.TabContentsCleared ) {
			this.TabContentsCleared = false;
		}
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var Flowsheet = thisCtl.getFlowSheet();
		if (Flowsheet) {
			if (Flowsheet.rendered) {
				this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
			}
		}
		return true;
	},


	HandleFlowsheetBtnClicks : function (event, element) {
		var btnName = element.getAttribute("name");
		var btnType = element.getAttribute("cellType");
		var btnDate = element.getAttribute("date");
		var btnRecHdr = element.getAttribute("recHdr");

		var btnData = unescape(element.getAttribute("data"));
		btnData = btnData.replace(/\n/g, '<br />');

		var Patient = this.application.Patient;
		// alert("Name - " + btnName + "\nType - " + btnType + "\nDate - " + btnDate + "\nData - " + btnData );
		if ("ViewFSData" === btnName) {
			Ext.MessageBox.show({
				title : btnType,
				msg : btnData,
				buttons : Ext.MessageBox.OK
			});
		}
		else {
			Ext.create("Ext.window.Window", {
				title: btnType,
				height : 220,
				width : 600,
				layout: "form",
				Hdr : btnRecHdr,
				AdmDate : btnDate,
				BtnType : btnType,
				items : [{
					xtype : "textareafield", grow : true, name : "Data", fieldLabel : "Enter text", margin: "10"
				}],
				buttons : [
					{ 
						text : "Save", 
						scope : this,
						handler : function(btn, evt) {
					        var win = btn.up('window');
							var initialConfig = win.getInitialConfig();
							var theField = win.down('textareafield');
					        var value = theField.getValue();
							var fieldName;
							var theGrid = Ext.getCmp("FlowsheetGrid");
							var Patient = this.application.Patient;
							var cType = win.initialConfig.BtnType;
							var Header = win.initialConfig.Hdr;
							var AdmDate = win.initialConfig.AdmDate;
							switch (cType) {
								case "Disease Response":
									fieldName = "DiseaseResponse";
									break;
								case "Toxicity Side Effects":
									fieldName = "Toxicity";
									break;
								case "Other":
									fieldName = "Other";
									break;
							}


							var cd = Header.split(", ");		// Header is formated like "Cycle XX, Day YY", so a split on ", " gives cd = [ "Cycle XX", "Day YY"];

							var newRecord = {};
							newRecord.PAT_ID = Patient.PAT_ID;		// Treatment ID;
							newRecord.FlowsheetAdminDay = {};
							newRecord.FlowsheetAdminDay[fieldName] = value;
							newRecord.FlowsheetAdminDay["PatientID"] = Patient.id;
							newRecord.FlowsheetAdminDay["Cycle"] = cd[0].split(" ")[1];
							newRecord.FlowsheetAdminDay["Day"] = cd[1].split(" ")[1];
							newRecord.FlowsheetAdminDay["AdminDate"] = AdmDate;

					        var fsTemplate = Ext.create(Ext.COMSModels.Flowsheet, newRecord );

							fsTemplate.save({
					            scope: this,
					            success: function (data) {
					                wccConsoleLog("Saved Template " );
									this.createFlowsheet(this.createFSGrid);		// Refresh so we can display the new cell. TRUE, because we want to build & Display the FS Grid after generating the store
									win.close();
								},
								failure : function ( data ) {
									alert("Flowsheet Save unsuccessful");
									win.close();
								}
							});
						}
					},
					{
						text : "Cancel",
						handler : function(btn, evt) {
							var win = btn.up('window');
							win.close();
						}
					}
				]
			}).show();
		}
	},

	// Loads the data which was entered in the Treatment Panel as well as the edited cells (e.g. "Disease Response", "Toxicity" and "Other")
	OLD_LoadFlowsheetData : function(FSModel, FSFields, FSColumns, FSData) {
		var Patient = this.application.Patient;
		var PAT_ID = Patient.PAT_ID;
		this.FSData = FSData;
		this.FSFields = FSFields;
		this.FSColumns = FSColumns;

		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PAT_ID,
			success : function( response, opts ) {
				var obj = Ext.decode(response.responseText);
				var theData, tdLen = 0;
				if (obj.records) {
					theData = obj.records;
					tdLen = theData.length;
				}
				var FSData = this.FSData;
				var FSFields = this.FSFields;
				var FSColumns = this.FSColumns;

				var aRec, bRec, i, j, k, x, y, cellFlag, recLabel, recLen, fsdLen = FSData.length;

				var CycleDay;
				var FSData1 = {};
				var today = new Date();
				today = Ext.Date.format(today, 'm/d/Y');

				for (i = 0; i < fsdLen; i++) {
					bRec = FSData[i];
					if ("Date" === bRec.label) {
						for (x in bRec) {
							if (bRec.hasOwnProperty(x) && "Type" !== x && "label" !== x) {
								var theDate = bRec[x];
								if (today == theDate) {
									CycleDay = x;
									break;
								}
							}
						}
						break;
					}
				}
				// if CycleDay is null then today is not an Admin Day
				
				
				
				// on back end we need to use "Type" for the element label. But the grid would display the word "Type" for each category
				// So we need to change the label from "Type" to something that doesn't display (e.g. "&nbsp;")
				// it's easier to create a new element and delete the old than to change the attribute name
				for (i = 0; i < tdLen; i++) {
					theData[i]["&nbsp;"] = theData[i]["Type"];
					delete theData[i]["Type"];
				}


				
				// Walk through all the data recieved and merge it into the appropriate elements in the FSData array based on matching column labels (e.g. "Cycle 1, Day 1")
				// which are not the same all the time. But are the same for any specific treatment.
				for (i = 0; i < tdLen; i++) {
					aRec = theData[i];
					if ("Disease" === aRec.label) {
						aRec.label = "Disease Response";
					}
					if ("Toxicity" === aRec.label) {
						aRec.label = "Toxicity Side Effects";
					}
					if ("Date" !== aRec.label) {
						for (j = 0; j < fsdLen; j++) {
							recLabel = aRec.label;
							switch (aRec.label) {
							case "Disease Response":
								cellFlag = "DiseaseResponse";
								break;
							case "Other":
								cellFlag = "Other";
								break;
							case "Toxicity Side Effects":
								cellFlag = "Toxicity";
								break;
							default:
								cellFlag = "";
								break;
							}

							bRec = FSData[j];
							var a = aRec["&nbsp;"], 
								b = bRec["&nbsp;"], 
								c = aRec["label"], 
								d = bRec["label"];
							if ((a === b) && (c === d)) {
								recLen = aRec.length;
								for (x in aRec) {
									if (aRec.hasOwnProperty(x) && "&nbsp;" !== x && "label" !== x) {
										y = aRec[x];
										if ("" !== cellFlag) {
											y = "<button class=\"anchor " + cellFlag + "\" name=\"ViewFSData\" cellType=\"" + recLabel + "\" date=\"" + today + "\" recHdr=\"" + x + "\" data=\"" + escape(y) + "\" >View</button>";
										}
										bRec[x] = y;
										// break;	<-- MWB - 7/20/2012 Don't break out of the loop! Need to get the rest of the elements of the aRec for the remaining days of the therapy!
									}
								}
							}
							FSData[j] = bRec;		// Moved outside of the loop as we need to get all elements into the bRec, and might as well only do this once.
						}
					}
				}


				var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
				var Flowsheet = thisCtl.getFlowSheetGrid();
				var FlowsheetEl = Flowsheet.getEl();
				this.application.Patient.FlowsheetData = FSData;	// MWB - 7/24/2012 - For use in EoTS



				var store = Ext.create('Ext.data.Store', {
				    storeId:'ChemoResults',
				    fields: FSFields,					// <-- Fields Data; GOOD

				    groupField: "&nbsp;",
				    data: { "ChemoResults" : FSData },	// <-- Data; GOOD
				    proxy: {
				        type: 'memory',
				        reader: {
				            type: 'json',
				            root: 'ChemoResults'
				        }
				    }
				});

				var thePanel, theGrid;
				thePanel = this.getFlowSheet();

				// Since we have a dynamic store and data set we need to destroy and re-create the grid everytime we open the panel up
				// to make sure that the latest data is displayed in the grid.
				theGrid = Ext.getCmp("FlowsheetGrid");
				if (theGrid && theGrid.rendered) {
					Ext.destroy(theGrid);
				}

				theGrid = Ext.create('Ext.grid.Panel', {
					id : "FlowsheetGrid",
				    renderTo: FlowsheetEl,
					autoScroll: 'y',
					columnLines: true,
					viewConfig: { stripeRows: true, forceFit: true },

					store: Ext.data.StoreManager.lookup('ChemoResults'),
				    columns: FSColumns,					// <-- Columns Data
				    features: [{ftype:'grouping'}]
				});
				theGrid.on("afterlayout", function() {
					var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
					var FlowsheetPanel = thisCtl.getFlowSheet();
					FlowsheetPanel.forceComponentLayout();	// Since the grid is added after the panel has been rendered, this function causes the panel to resize to fit the grid.

				// var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
				// var Flowsheet = thisCtl.getFlowSheetGrid();
				// var FlowsheetEl = Flowsheet.getEl();


				var btns1 = FlowsheetEl.select("button");
				btns1.removeAllListeners();
				btns1.on("click", this.HandleFlowsheetBtnClicks, this);













				}, this);
				this.application.unMask();
			},

			failure : function( response, opts ) {
				this.application.unMask();
				alert("Attempt to load latest treatment data failed.");
				// debugger;
			}
		});
	},

/****
 *
 *	Builds the store for the flowsheet from the current Template assigned to the current patient (to get the list of drugs to be administered), 
 *	and the OEM Record Data for the current patient.
 *
 *	MWB - 6/7/2012
 *	Ideally this needs to be built from the Order Sheet of drugs dispensed for administration on any given administration day.
 *
 ****/
	OLD_createFlowsheet : function() {
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var Flowsheet = thisCtl.getFlowSheetGrid();
		var FlowsheetEl = Flowsheet.getEl();
		var OEM_Data;
		var OEM_DataLen;
		var OEM_Record;
		var i, j, hdr, di;
		var FSFields = [], FSColumns = [];

		if (this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
			OEM_Data = this.application.Patient.OEMRecords.OEMRecords;
			OEM_DataLen = OEM_Data.length;
		}
		else {
			return;		// No OEM Data for this patient, probably does not currently have an active template.
		}


        this.application.loadMask("Building Flowsheet... One moment please");		

		FSFields[0] = "label";
		FSFields[1] = "&nbsp;";
		FSColumns[0] = { "header" : "", "dataIndex" : "label", "width" : 140 };

		var Patient = this.application.Patient;
		var curTemplate = Patient.AppliedTemplate;
		if (!curTemplate) {
			alert("Can't access current template applied to patient");
			// debugger;
		}
		// Arrays of Meds to be administered, PreTherapyMeds[x].Drug, TherapyMeds[x].Drug, PostTherapyMeds[x].Drug
		var TherapyMeds = curTemplate.Meds;
		var PreTherapyMeds = curTemplate.PreMHMeds;
		var PostTherapyMeds = curTemplate.PostMHMeds;

		var today = new Date();
		today = Ext.Date.format(today, 'm/d/Y');
//		today = "07/12/2012";	// TESTING!!!

		var DayIdx;
		//
		// Build Associative Array of Vitals for PS and Weight
		//
		var Vitals = this.application.Patient.Vitals;
		var vLen = Vitals.length, aVital, V;
		var assVitals = [];
		for (i = 0; i < vLen; i++) {
			aVital = Vitals[i];
			V = {};
			V.PS = aVital.PS;
			V.PSID = aVital.PSID;
			V.Weight = aVital.Weight;
			assVitals[aVital.DateTaken] = V;
		}

		var tmp, x1, x2, V_PS, V_Weight;

		var FSModel = [];
		FSModel.push("label");
		FSModel.push("&nbsp;");
		var FSPSRow = {"label" : "Performance Status", "&nbsp;" : "01 General"};
		var FSWeightRow = {"label" : "Weight (lbs)", "&nbsp;" : "01 General"};
		var FSDateRow = {"label" : "Date", "&nbsp;" : "01 General"};
		var FSDiseaseResponse = {"label" : "Disease Response", "&nbsp;" : "01 General"};
		var FSToxicity = {"label" : "Toxicity Side Effects", "&nbsp;" : "01 General"};
		var FSOther = {"label" : "Other", "&nbsp;" : "01 General"};
		var FSLabs =  {"label" : "Unknown...", "&nbsp;" : "02 Laboratory Results"};


		
		
		
		// Walk all the Data Records from the OEM data (this determines the # of and dates of Administration Days)
		// building the basic data store.
		// Some of the data here should be pulled from the previously saved Flowsheet Store data.
		// Since the data can have different # of columns and rows depending on the specific Template/OEM data a single store is not possible
		// So each column in the Store would represent a specific data Model (Flowsheet model).
		for (i = 0; i < OEM_DataLen; i++) {
			DayIdx = i+1;
			OEM_Record = OEM_Data[i];
			di = "day" + DayIdx;
			hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
			FSModel.push( hdr );
			FSFields[DayIdx+1] = hdr;

			FSColumns[DayIdx] = { "header" : hdr, "dataIndex" : hdr, "width" : 90,
				field: { xtype : "textfield" }
			};


				// Get Vitals for this Admin Date if any exist and get PS and Weight from that Vital object
			tmp = assVitals[OEM_Record.AdminDate];
			V_PS = "";
			V_Weight = "";
			if (tmp){
				V_PS = "<abbr title=\"" + tmp.PS + "\">" + tmp.PSID + "</abbr>";
				V_Weight = V.Weight;
			}
			FSPSRow[hdr] = V_PS;
			FSWeightRow[hdr] = V_Weight;
			FSDateRow[hdr] = OEM_Record.AdminDate;

			FSDiseaseResponse[hdr] = "";
			FSToxicity[hdr] = "";
			FSOther[hdr] = "";
			FSLabs[hdr] = "";

			if (today === OEM_Record.AdminDate) {
				FSDiseaseResponse[hdr] = "<button class=\"anchor DiseaseResponse\" name=\"WriteFSData\" cellType=\"Disease Response\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSToxicity[hdr] = "<button class=\"anchor Toxicity\" name=\"WriteFSData\" cellType=\"Toxicity Side Effects\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSOther[hdr] = "<button class=\"anchor Other\" name=\"WriteFSData\" cellType=\"Other\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
			}
		}


		// Arrays of Meds to be administered, PreTherapyMeds[x].Drug, TherapyMeds[x].Drug, PostTherapyMeds[x].Drug
		TherapyMeds = curTemplate.Meds;
		PreTherapyMeds = curTemplate.PreMHMeds;
		PostTherapyMeds = curTemplate.PostMHMeds;

		var FSPreMedsList = [];
		var PreMedsListLen = PreTherapyMeds.length;
		for (i = 0; i < PreMedsListLen; i++) {
			FSPreMedsList[i] = {};
			FSPreMedsList[i]["label"] = PreTherapyMeds[i].Drug;
			FSPreMedsList[i]["&nbsp;"] = "03 Pre Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPreMedsList[i][hdr] = "";
			}
		}

		var FSPostMedsList = [];
		var PostMedsListLen = PostTherapyMeds.length;
		for (i = 0; i < PostMedsListLen; i++) {
			FSPostMedsList[i] = {};
			FSPostMedsList[i]["label"] = PostTherapyMeds[i].Drug;
			FSPostMedsList[i]["&nbsp;"] = "05 Post Therapy";
			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPostMedsList[i][hdr] = "";
			}
		}

		var FSMedsList = [];
		var MedsListLen = TherapyMeds.length;
		for (i = 0; i < MedsListLen; i++) {
			FSMedsList[i] = {};
			FSMedsList[i]["label"] = TherapyMeds[i].Drug;
			FSMedsList[i]["&nbsp;"] = "04 Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSMedsList[i][hdr] = "";
			}
		}






		var FSData = [];
		FSData.push(FSDateRow);
		FSData.push(FSPSRow);
		FSData.push(FSWeightRow);
		FSData.push(FSDiseaseResponse);
		FSData.push(FSToxicity);
		FSData.push(FSOther);
		FSData.push(FSLabs);

		for (i = 0; i < PreMedsListLen; i++) {
			FSData.push(FSPreMedsList[i]);
		}
		for (i = 0; i < MedsListLen; i++) {
			FSData.push(FSMedsList[i]);
		}
		for (i = 0; i < PostMedsListLen; i++) {
			FSData.push(FSPostMedsList[i]);
		}

		this.OLD_LoadFlowsheetData(FSModel, FSFields, FSColumns, FSData);
	},



		/**************************************
		 *
		 *		NEW Code to replace above
		 *
		 **************************************/
	// Loads the data which was entered in the Treatment Panel as well as the edited cells (e.g. "Disease Response", "Toxicity" and "Other")
createFSGrid : function () {
	// console.log("Create Flowsheet Grid and assign button handlers");
				var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
				var Flowsheet = thisCtl.getFlowSheetGrid();
				var FlowsheetEl = Flowsheet.getEl();
				var FSColumns = this.application.Patient.FSColumns;

				// Since we have a dynamic store and data set we need to destroy and re-create the grid everytime we open the panel up
				// to make sure that the latest data is displayed in the grid.
				var theGrid = Ext.getCmp("FlowsheetGrid");
				if (theGrid && theGrid.rendered) {
					Ext.destroy(theGrid);
				}

				theGrid = Ext.create('Ext.grid.Panel', {
					id : "FlowsheetGrid",
				    renderTo: FlowsheetEl,
					autoScroll: 'y',
					columnLines: true,
					viewConfig: { stripeRows: true, forceFit: true },

					store: Ext.data.StoreManager.lookup('ChemoResults'),
				    columns: FSColumns,					// <-- Columns Data
				    features: [{ftype:'grouping'}]
				});

				theGrid.on("afterlayout", function() {
					var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
					var FlowsheetPanel = thisCtl.getFlowSheet();
					FlowsheetPanel.forceComponentLayout();	// Since the grid is added after the panel has been rendered, this function causes the panel to resize to fit the grid.

					var btns1 = FlowsheetEl.select("button");
					btns1.removeAllListeners();
					btns1.on("click", this.HandleFlowsheetBtnClicks, this);
				}, this);

},

// FSModel (first parameter) was apparently never used.
// buildGrid - function to build the grid upon completion of creating the store
//	For some calls to this function (as in when we're doing the EoTS) a grid is not needed.
LoadFlowsheetData : function (FSFields, FSColumns, FSData, buildGrid) {
	// console.log("Load Flowsheet Data via FS Service" );
		var Patient = this.application.Patient;
		var PAT_ID = Patient.PAT_ID;
		this.FSData = FSData;
		this.FSFields = FSFields;
		this.FSColumns = FSColumns;

		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PAT_ID,
			success : function( response /*, opts */) {
				var obj = Ext.decode(response.responseText);
				var theData, tdLen = 0;
				if (obj.records) {
					theData = obj.records;
					tdLen = theData.length;
				}
				var FSData = this.FSData;
				var FSFields = this.FSFields;
				var FSColumns = this.FSColumns;

				var aRec, bRec, i, j, x, y, cellFlag, recLabel, recLen, fsdLen = FSData.length;

				var CycleDay;
				var today = new Date();
				today = Ext.Date.format(today, 'm/d/Y');

				for (i = 0; i < fsdLen; i++) {
					bRec = FSData[i];
					if ("Date" === bRec.label) {
						for (x in bRec) {
							if (bRec.hasOwnProperty(x) && "Type" !== x && "label" !== x) {
								var theDate = bRec[x];
								if (today == theDate) {
									CycleDay = x;
									break;
								}
							}
						}
						break;
					}
				}
				// if CycleDay is null then today is not an Admin Day
				
				
				
				// on back end we need to use "Type" for the element label. But the grid would display the word "Type" for each category
				// So we need to change the label from "Type" to something that doesn't display (e.g. "&nbsp;")
				// it's easier to create a new element and delete the old than to change the attribute name
				for (i = 0; i < tdLen; i++) {
					theData[i]["&nbsp;"] = theData[i]["Type"];
					delete theData[i]["Type"];
				}


				
				// Walk through all the data recieved and merge it into the appropriate elements in the FSData array based on matching column labels (e.g. "Cycle 1, Day 1")
				// which are not the same all the time. But are the same for any specific treatment.
				for (i = 0; i < tdLen; i++) {
					aRec = theData[i];
					if ("Disease" === aRec.label) {
						aRec.label = "Disease Response";
					}
					if ("Toxicity" === aRec.label) {
						aRec.label = "Toxicity Side Effects";
					}
					if ("Date" !== aRec.label) {
						for (j = 0; j < fsdLen; j++) {
							recLabel = aRec.label;
							switch (aRec.label) {
							case "Disease Response":
								cellFlag = "DiseaseResponse";
								break;
							case "Other":
								cellFlag = "Other";
								break;
							case "Toxicity Side Effects":
								cellFlag = "Toxicity";
								break;
							default:
								cellFlag = "";
								break;
							}

							bRec = FSData[j];
							var a = aRec["&nbsp;"], 
								b = bRec["&nbsp;"], 
								c = aRec["label"], 
								d = bRec["label"];
							if ((a === b) && (c === d)) {
								recLen = aRec.length;
								for (x in aRec) {
									if (aRec.hasOwnProperty(x) && "&nbsp;" !== x && "label" !== x) {
										y = aRec[x];
										if ("" !== cellFlag) {
											y = "<button class=\"anchor " + cellFlag + "\" name=\"ViewFSData\" cellType=\"" + recLabel + "\" date=\"" + today + "\" recHdr=\"" + x + "\" data=\"" + escape(y) + "\" >View</button>";
										}
										bRec[x] = y;
										// break;	<-- MWB - 7/20/2012 Don't break out of the loop! Need to get the rest of the elements of the aRec for the remaining days of the therapy!
									}
								}
							}
							FSData[j] = bRec;		// Moved outside of the loop as we need to get all elements into the bRec, and might as well only do this once.
						}
					}
				}


				this.application.Patient.FlowsheetData = FSData;	// MWB - 7/24/2012 - For use in EoTS
				this.application.Patient.FSColumns = FSColumns;


				var store = Ext.data.StoreManager.lookup('ChemoResults');
				if (store) {
					Ext.destroy(store);
				}
				store = Ext.create('Ext.data.Store', {
				    storeId:'ChemoResults',
				    fields: FSFields,

				    groupField: "&nbsp;",
				    data: { "ChemoResults" : FSData },
				    proxy: {
				        type: 'memory',
				        reader: {
				            type: 'json',
				            root: 'ChemoResults'
				        }
				    }
				});

					/**********
					 *
					 *	Create the flowsheet grid
					 *
					 *********/
				if (buildGrid) {
					var fn = Ext.bind(buildGrid, this);
					fn();
				}

				this.application.unMask();
			},

			failure : function( /* response, opts */ ) {
				this.application.unMask();
				alert("Attempt to load latest treatment data failed.");
				// debugger;
			}
		});
},

/****
 *
 *	Builds the store for the flowsheet from the current Template assigned to the current patient (to get the list of drugs to be administered), 
 *	and the OEM Record Data for the current patient.
 *
 *	MWB - 6/7/2012
 *	Ideally this needs to be built from the Order Sheet of drugs dispensed for administration on any given administration day.
 *
 ****/
createFlowsheet : function (BuildGrid) {
	// console.log("Create Flowsheet" );
		var OEM_Data;
		var OEM_DataLen;
		var OEM_Record;
		var i, j, hdr, di;
		var FSFields = [], FSColumns = [];

		if (this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
			OEM_Data = this.application.Patient.OEMRecords.OEMRecords;
			OEM_DataLen = OEM_Data.length;
		}
		else {
			var theGrid = Ext.getCmp("FlowsheetGrid");
			if (theGrid && theGrid.rendered) {
				Ext.destroy(theGrid);
			}
			return;		// No OEM Data for this patient, probably does not currently have an active template.
		}


        this.application.loadMask("Building Flowsheet... One moment please");		


		var Patient = this.application.Patient;
		var curTemplate = Patient.AppliedTemplate;
		var TherapyMeds, PreTherapyMeds, PostTherapyMeds;
		try {
			TherapyMeds = curTemplate.Meds;
			PreTherapyMeds = curTemplate.PreMHMeds;
			PostTherapyMeds = curTemplate.PostMHMeds;
		}
		catch (e) {
			alert("Can't access Medications in Template");
		}

		var today = new Date();
		today = Ext.Date.format(today, 'm/d/Y');

		//
		// Build Associative Array of Vitals for PS and Weight
		//
		var Vitals = this.application.Patient.Vitals;
		var vLen = Vitals.length, aVital, V;
		var assVitals = [];
		for (i = 0; i < vLen; i++) {
			aVital = Vitals[i];
			V = {};
			V.PS = aVital.PS;
			V.PSID = aVital.PSID;
			V.Weight = aVital.Weight;
			assVitals[aVital.DateTaken] = V;
		}

		var tmp, V_PS, V_Weight;

		var FSPSRow = {"label" : "Performance Status", "&nbsp;" : "01 General"};
		var FSWeightRow = {"label" : "Weight (lbs)", "&nbsp;" : "01 General"};
		var FSDateRow = {"label" : "Date", "&nbsp;" : "01 General"};
		var FSDiseaseResponse = {"label" : "Disease Response", "&nbsp;" : "01 General"};
		var FSToxicity = {"label" : "Toxicity Side Effects", "&nbsp;" : "01 General"};
		var FSOther = {"label" : "Other", "&nbsp;" : "01 General"};
		var FSLabs =  {"label" : "Unknown...", "&nbsp;" : "02 Laboratory Results"};

		FSFields.push("label");
		FSFields.push("&nbsp;");
		FSColumns.push({ "header" : "", "dataIndex" : "label", "width" : 140 });

		
		// Walk all the Data Records from the OEM data (this determines the # of and dates of Administration Days)
		// building the basic data store.
		// Some of the data here should be pulled from the previously saved Flowsheet Store data.
		// Since the data can have different # of columns and rows depending on the specific Template/OEM data a single store is not possible
		// So each column in the Store would represent a specific data Model (Flowsheet model).
		for (i = 0; i < OEM_DataLen; i++) {
			OEM_Record = OEM_Data[i];
			di = "day" + (i+1);
			hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
			FSFields.push(hdr);
			FSColumns.push({ "header" : hdr, "dataIndex" : hdr, "width" : 90, field: { xtype : "textfield" }});

				// Get Vitals for this Admin Date if any exist and get PS and Weight from that Vital object
			tmp = assVitals[OEM_Record.AdminDate];
			V_PS = "";
			V_Weight = "";
			if (tmp){
				V_PS = "<abbr title=\"" + tmp.PS + "\">" + tmp.PSID + "</abbr>";
				V_Weight = V.Weight;
			}
			FSPSRow[hdr] = V_PS;
			FSWeightRow[hdr] = V_Weight;
			FSDateRow[hdr] = OEM_Record.AdminDate;

			FSDiseaseResponse[hdr] = "";
			FSToxicity[hdr] = "";
			FSOther[hdr] = "";
			FSLabs[hdr] = "";

			if (today === OEM_Record.AdminDate) {
				FSDiseaseResponse[hdr] = "<button class=\"anchor DiseaseResponse\" name=\"WriteFSData\" cellType=\"Disease Response\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSToxicity[hdr] = "<button class=\"anchor Toxicity\" name=\"WriteFSData\" cellType=\"Toxicity Side Effects\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSOther[hdr] = "<button class=\"anchor Other\" name=\"WriteFSData\" cellType=\"Other\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
			}
		}


		// build the "empty" arrays of data for each of the treatments (Pre, Therapy, Post)
		// This is done so we have all the columns preset based on the cycle/day
		PreTherapyMeds = curTemplate.PreMHMeds;
		var FSPreMedsList = [], PreMedsListLen = PreTherapyMeds.length;
		for (i = 0; i < PreMedsListLen; i++) {
			FSPreMedsList[i] = {};
			FSPreMedsList[i]["label"] = PreTherapyMeds[i].Drug;
			FSPreMedsList[i]["&nbsp;"] = "03 Pre Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPreMedsList[i][hdr] = "";
			}
		}

		TherapyMeds = curTemplate.Meds;
		var FSMedsList = [];
		var MedsListLen = TherapyMeds.length;
		for (i = 0; i < MedsListLen; i++) {
			FSMedsList[i] = {};
			FSMedsList[i]["label"] = TherapyMeds[i].Drug;
			FSMedsList[i]["&nbsp;"] = "04 Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSMedsList[i][hdr] = "";
			}
		}


		PostTherapyMeds = curTemplate.PostMHMeds;
		var FSPostMedsList = [];
		var PostMedsListLen = PostTherapyMeds.length;
		for (i = 0; i < PostMedsListLen; i++) {
			FSPostMedsList[i] = {};
			FSPostMedsList[i]["label"] = PostTherapyMeds[i].Drug;
			FSPostMedsList[i]["&nbsp;"] = "05 Post Therapy";
			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPostMedsList[i][hdr] = "";
			}
		}


		var FSData = [];
		FSData.push(FSDateRow);
		FSData.push(FSPSRow);
		FSData.push(FSWeightRow);
		FSData.push(FSDiseaseResponse);
		FSData.push(FSToxicity);
		FSData.push(FSOther);
		FSData.push(FSLabs);

		for (i = 0; i < PreMedsListLen; i++) {
			FSData.push(FSPreMedsList[i]);
		}
		for (i = 0; i < MedsListLen; i++) {
			FSData.push(FSMedsList[i]);
		}
		for (i = 0; i < PostMedsListLen; i++) {
			FSData.push(FSPostMedsList[i]);
		}

		this.LoadFlowsheetData(FSFields, FSColumns, FSData, BuildGrid);
	}

});
/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
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
		var oTpl, dTpl, nTpl;
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

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.PatientSummaryTab", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
	    "NewPlan.CTOS.PatientSummary"
	],

	refs: [
	    {
		    ref: "PatientSummary",
			selector: "PatientSummary"
	    },
//	    {
//		    ref: "PSummaryHeader",
//			selector: "PatientSummary [name=\"heading\"]"
//	    },

	    {
		    ref: "PSummaryOverview",
			selector: "PatientSummary PSummary_Overview"
	    },
	    {
		    ref: "PSummaryBody",
			selector: "PatientSummary [name=\"body\"]"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Patient Summary Tab Controller!");

		this.application.on( { PatientSelected : this.PatientSelected, scope : this } );

		this.control({
			"PatientSummary" : {
				beforeactivate : this.BeforeTabActivated,
				render : this.TabRendered
			}
		});
	},

		// Ensures 
	TabContentsCleared : true,



	createChildren : function( component, eOpts ) {
		var Patient = this.application.Patient;
		if ("" === Patient.TemplateID) {
			return;		// No Template assigned to this patient
		}
		try {

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
		var thisCtl = this.getController("NewPlan.CTOS.PatientSummaryTab");
		var PSummary = thisCtl.getPatientSummary();
		if (PSummary) {
			if (PSummary.rendered) {
				this.TabContentsCleared = true;
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Patient Summary Tab has been rendered");
	},

	BeforeTabActivated : function (component, eOpts ) {
		wccConsoleLog("Patient Summary Tab has been rendered");
		if ( this.TabContentsCleared ) {
			this.TabContentsCleared = false;
			var thisCtl = this.getController("NewPlan.CTOS.PatientSummaryTab");
			var Patient = this.application.Patient;
			var UpdateData = Patient.OEMRecords;

			UpdateData.TreatmentStart = UpdateData.OEMRecords[0].AdminDate;
			var i1 = UpdateData.OEMRecords.length - 1;
			UpdateData.TreatmentEnd = UpdateData.OEMRecords[i1].AdminDate;

//			var header = thisCtl.getPSummaryHeader();
//			header.update({PatientName : Patient.name});

			var Overview = thisCtl.getPSummaryOverview();
			Overview.update( UpdateData );

//			var Body = thisCtl.getPSummaryBody();
		}
		return true;
	}
});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.NursingDocs", {
	extend: "Ext.app.Controller",

	stores: [
		"ND_CTCAE_SOC"
		,"ND_CTCAE_Data"
	],


	views: [
		"NewPlan.CTOS.NursingDocs",
		"NewPlan.CTOS.NursingDocs.GenInfo",
		"NewPlan.CTOS.NursingDocs.Assessment",
		"NewPlan.CTOS.NursingDocs.PreTreatment",
		"NewPlan.CTOS.NursingDocs.Treatment",
		"NewPlan.CTOS.NursingDocs.React_Assess",
		"NewPlan.CTOS.NursingDocs.Education"
	],

	refs: [
	    {
		    ref: "GenInfoTab",
			selector: "NursingDocs_GenInfo"
	    },
		{
			ref: "CTOS_Tabs",
			selector: "NewPlanTab CTOS"
	    }
	],


	// Ext.ComponentQuery.query("NursingDocs")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Tab Controller!");
		this.application.on({
			PatientSelected : this.PatientSelected,
			scope : this
		});


		this.control({
			"NursingDocs" : {
				beforeactivate : this.BeforeTabActivated
			}
		});
	},


	BeforeTabActivated :  function( component, eOpts ) {
		var PatientInfo = this.application.Patient;
		if ("" === PatientInfo.TemplateID) {
			alert("No Template has been applied to this patient\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			return false;
		}
		this.application.fireEvent("PopulateNDTabs");
		return true;
	},

	PatientSelected : function(arg1, arg2, arg3) {
		// Fire an event that will force all the ND Tabs to clear out their data
		this.application.fireEvent("ClearNDTabs");
	}

});

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
			/*****************************
			 *	Patient Record Structure
			 *		id, 
			 *		name,
			 *		Gender, 
			 *		DOB, 
			 *		Age, 
			 *		Amputee, 
			 *		BSA, 
			 *		BSA_Method, 
			 *		BSA_Weight, 
			 *		WeightFormula, 
			 *		TemplateDescription, 
			 *		TemplateID, 
			 *		TemplateName, 
			 *		TreatmentEnd, 
			 *		TreatmentStart, 
			 *		Disease : [ 
			 *			Stage, 
			 *			Type, 
			 *			coms.model.patientinfo_id 
			 *		], 
			 *		Measurements : [
			 *			BP, 
			 *			BSA, 
			 *			BSA_Method, 
			 *			BSA_Weight, 
			 *			DateTaken, 
			 *			Height, 
			 *			Weight, 
			 *			WeightFormula, 
			 *			coms.model.patientinfo_id
			 *		]
			 ****************************************************/

Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.GenInfoTab", {
	extend: "Ext.app.Controller",

	stores: [
	],


	views: [
		"Common.VitalSignsHistory"
	],

	refs: [
	    {
		    ref: "CTOS",
			selector: "NewPlanTab CTOS"
	    },
		{
			ref : "NursingDocsTabSet",
			selector : "NursingDocs"
		},


		{
			ref: "ndct_GenInfoTab",
			selector: "NursingDocs_GenInfo"
		},

		{
			ref: "ndVitalSignsForm",
			selector: "NursingDocs_VitalSigns"
		},

		{
			ref: "ndVitalsTempF",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsTempF\"]"
		},
		{
			ref: "ndVitalsTempC",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsTempC\"]"
		},
		{
			ref: "ndVitalsPulse",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsPulse\"]"
		},
		{
			ref: "ndVitalsSystolic",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsSystolic\"]"
		},
		{
			ref: "ndVitalsGender",
			selector: "NursingDocs_VitalSigns [name=\"ndVitalsGender\"]"
		},
		{
			ref: "ndVitalsHeightIN",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsHeightIN\"]"
		},
		{
			ref: "ndVitalsHeightCM",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsHeightCM\"]"
		},
		{
			ref: "ndVitalsResp",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsResp\"]"
		},
		{
			ref: "ndVitalsDiastolic",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsDiastolic\"]"
		},
		{
			ref: "ndVitalsAge",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsAge\"]"
		},
		{
			ref: "ndVitalsWeightP",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]"
		},
		{
			ref: "ndVitalsWeightKG",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsWeightKG\"]"
		},
		{
			ref: "ndVitalsPain",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsPain\"]"
		},
		{
			ref: "ndVitalsO2Level",
			selector: "NursingDocs_VitalSigns textfield[name=\"ndVitalsO2Level\"]"
		},
		{
			ref: "ndVitalsBSA",
			selector: "NursingDocs_VitalSigns displayfield[name=\"ndVitalsBSA\"]"
		},
		{
			ref: "VitalSignsHistory",
	        selector: "NursingDocs_GenInfo VitalSignsHistory"
		},
		{
			ref : "ND_PT_TabLabInfo",
			selector : "NursingDocs_GenInfo [name=\"ND_PT_LabInfo\"]"
		}

	],


	// Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs General Info Tab Controller!");

		this.application.on( 
			{ 
				PopulateNDTabs : this.GenInfoRendered,	// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				scope : this 
			} 
		);
	

		this.control({
			"NursingDocs_GenInfo" : {
				afterrender : this.GenInfoRendered
			},

			"NursingDocs_VitalSigns textfield[name=\"ndVitalsTempF\"]" : {
				blur : this.ConvertTemp
			},

			"NursingDocs_VitalSigns textfield[name=\"ndVitalsHeightIN\"]" : {
				blur : this.ConvertHeight
			},

			"NursingDocs_VitalSigns textfield[name=\"ndVitalsWeightP\"]" : {
				blur : this.ConvertWeight
			},
            "NursingDocs_GenInfo button[action=\"save\"]": {
                click: this.btnSaveGenInfo
            },
			"NursingDocs_DualDosingVerification button[name=\"DDV_FirstSig\"]" : {
                click: this.btnFirstSignature
			},
			"NursingDocs_DualDosingVerification button[name=\"DDV_SecSig\"]" : {
                click: this.btnSecondSignature
			},
            "Authenticate[title=\"Signature of first verifier\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            },
            "Authenticate[title=\"Signature of second verifier\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            }



		});

	},
	AuthenticateUser : function (button) {
		var win = button.up('window');
		var SigNameField = win.SigName;
		var SigField = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigNameField + "\"]")[0];

		var SigName1Field = win.SigName1;
		var Sig1Field = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigName1Field + "\"]")[0];
		var Sig1 = Sig1Field.getValue();

		var SigName2Field = win.SigName2;
		var Sig2Field = Ext.ComponentQuery.query("NursingDocs_DualDosingVerification displayfield[name=\"" + SigName2Field + "\"]")[0];
		var Sig2 = Sig1Field.getValue();

        var values = win.down('form').getValues();
		if ("" !== values.AccessCode && "" !== values.VerifyCode) {
			if (values.AccessCode === Sig1 || values.AccessCode === Sig2) {
				alert("You can't sign this record twice. Please have another sign to verify");
			}
			else {
				Ext.Ajax.request({
					scope : this,
					url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
					success: function( response, opts ){
						var text = response.responseText;
						var resp = Ext.JSON.decode( text );
						if (resp.success) {
							win.close();
							SigField.setValue(values.AccessCode);
						}
						else {
							alert("Authentication failed! Please click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
						}
					},
					failure : function( response, opts ) {
						alert("Authentication failed! \n\nPlease click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
					}
				});
			}
		}
	},




	btnFirstSignature : function( button ) {
		var SigNameFld1 = "DDV_FirstSig1";
		var SigNameFld2 = "DDV_FirstSig4";
		var EditRecordWin = Ext.widget("Authenticate", { title : "Signature of first verifier", SigName : SigNameFld1, SigName1 : SigNameFld1, SigName2 : SigNameFld2 });
	},

	btnSecondSignature : function( button ) {
		var SigNameFld1 = "DDV_FirstSig1";
		var SigNameFld2 = "DDV_FirstSig4";
		var EditRecordWin = Ext.widget("Authenticate", { title : "Signature of second verifier", SigName : SigNameFld2, SigName1 : SigNameFld1, SigName2 : SigNameFld2 });
	},

	ConvertWeight : function( fld, eOpts ) {
		var kg = Ext.lbs2kg(fld.getValue());
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
		var NDVitalsWeightKG = thisCtl.getNdVitalsWeightKG();
		NDVitalsWeightKG.setValue("(" + kg + " kg)");
		this.ndgiUpdateBSA();
	},
	ConvertHeight : function( fld, eOpts ) {
		var cm = Ext.in2cm(fld.getValue());
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
		var NDVitalsHeightCM = thisCtl.getNdVitalsHeightCM();
		NDVitalsHeightCM.setValue("(" + cm + " cm)");
		this.ndgiUpdateBSA();
	},
	ConvertTemp : function( fld, eOpts ) {
		var c = Ext.f2C(fld.getValue());
		var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
		var NDVitalsTempC = thisCtl.getNdVitalsTempC();
		NDVitalsTempC.setValue("(" + c + " &deg;C)");
	},





	ClearTabData : function() {
		try {
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
			if (!thisCtl.getNdct_GenInfoTab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Loading Error", "ND - ClearTabData() - Error - " + e.message );
		}
		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
		thisCtl.getNdVitalsTempF().setValue("");
		thisCtl.getNdVitalsTempC().setValue("");
		thisCtl.getNdVitalsPulse().setValue("");
		thisCtl.getNdVitalsSystolic().setValue("");
		thisCtl.getNdVitalsGender().setValue("");
		thisCtl.getNdVitalsHeightIN().setValue("");
		thisCtl.getNdVitalsHeightCM().setValue("");
		thisCtl.getNdVitalsResp().setValue("");
		thisCtl.getNdVitalsDiastolic().setValue("");
		thisCtl.getNdVitalsAge().setValue("");
		thisCtl.getNdVitalsWeightP().setValue("");
		thisCtl.getNdVitalsWeightKG().setValue("");
		thisCtl.getNdVitalsPain().setValue("");
		thisCtl.getNdVitalsO2Level().setValue("");
		thisCtl.getNdVitalsBSA().setValue("");

		this.ChemoBioSectionHandler(true);
	},


	ChemoBioSectionHandler : function ( Clear, ThisAdminDay ) {		// Handles parsing and posting of data in the Chemotherapy/Biotherapy sections in ND and Flowsheet
		// if Clear is true then clear out the fields
		var ndctWarning = Ext.ComponentQuery.query("NursingDocs_Chemotherapy [name=\"ndctWarning\"]");
		var ndctRegimen = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctRegimen\"]");
		var ndctCycle = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctCycle\"]");
		var ndctDay = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDay\"]");
		var ndctDate = Ext.ComponentQuery.query("NursingDocs_Chemotherapy displayfield[name=\"ndctDate\"]");

		var Patient = this.application.Patient;
		var TempDesc = Patient.TemplateDescription;
		if ("" === TempDesc) {
			TempDesc = Patient.TemplateName;
		}

		ndctRegimen[0].setValue(TempDesc);
		ndctRegimen[1].setValue(TempDesc);

		if (Clear) {
			ndctWarning[0].setValue("");
			ndctWarning[1].setValue("");
			
			ndctWarning[0].hide();
			ndctWarning[1].hide();

			ndctCycle[0].setValue("");
			ndctCycle[1].setValue("");
			ndctDay[0].setValue("");
			ndctDay[1].setValue("");
			ndctDate[0].setValue("");
			ndctDate[1].setValue("");
		}
		else {
			if (ThisAdminDay) {
				ndctWarning[0].hide();
				ndctWarning[1].hide();
				ndctCycle[0].setValue(ThisAdminDay.Cycle);
				ndctCycle[1].setValue(ThisAdminDay.Cycle);
				ndctDay[0].setValue(ThisAdminDay.Day);
				ndctDay[1].setValue(ThisAdminDay.Day);
				ndctDate[0].setValue(ThisAdminDay.AdminDate);
				ndctDate[1].setValue(ThisAdminDay.AdminDate);
			}
			else {
				ndctWarning[0].setValue("Warning - This is not a scheduled Administration Day for this Regimen");
				ndctWarning[1].setValue("Warning - This is not a scheduled Administration Day for this Regimen");
				ndctWarning[0].show();
				ndctWarning[1].show();

				ndctCycle[0].setValue("");
				ndctCycle[1].setValue("");
				ndctDay[0].setValue("");
				ndctDay[1].setValue("");
				ndctDate[0].setValue("");
				ndctDate[1].setValue("");
			}
		}
	},





	SaveVitals : function() {
		var Patient = this.application.Patient;
		var ThisAdminDay = this.application.Patient.ThisAdminDay;		// This is the OEM Record for a specific Admin Day - 
		// { id, AdminDate, Cycle, Day, PostTherapy, PostTherapyInstr, PreTherapy, PreTherapyInstr, Therapy, TherapyInstr }

		var Temperature = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsTempF\"]")[0];
		var Pulse = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsPulse\"]")[0];
		var Systolic = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsSystolic\"]")[0];
		var Height = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsHeightIN\"]")[0];
		var Respiration = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsResp\"]")[0];
		var Diastolic = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsDiastolic\"]")[0];
		var Weight = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsWeightP\"]")[0];
		var Pain = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsPain\"]")[0];
		var SPO2 = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsO2Level\"]")[0];
		var BSA = Ext.ComponentQuery.query("NursingDocs_VitalSigns [name=\"ndVitalsBSA\"]")[0];

		var dt = new Date();
		var record = {};
		record.patientId = Patient.id;
		record.DateTaken = Ext.Date.format(dt, "m/d/Y H:i:s");
		record.Temperature = Temperature.getValue();
		record.Pulse = Pulse.getValue();
		record.Systolic = Systolic.getValue();
		record.Height = Height.getValue();
		record.Respiration = Respiration.getValue();
		record.Diastolic = Diastolic.getValue();
		record.Weight = Weight.getValue();
		record.Pain = Pain.getValue();
		record.SPO2 = SPO2.getValue();
		record.BSA = BSA.getValue();
		record.BP = Systolic.getValue() + " / " + Diastolic.getValue();

		var flg1 = "" === record.Temperature;
		var flg2 = "" === record.Pulse;
		var flg3 = "" === record.Systolic;
		var flg4 = "" === record.Height;
		var flg5 = "" === record.Respiration;
		var flg6 = "" === record.Diastolic;
		var flg7 = "" === record.Weight;
		var flg8 = null === record.Pain;
		var flg9 = "" === record.SPO2;
		var flg10 = "" === record.BSA;

		if (flg1 && flg2 && flg3 && flg4 && flg5 && flg6 && flg7 && flg8 && flg9 && flg10) {
			return (false);
		}

		Temperature.setValue("");
		Pulse.setValue("");
		Systolic.setValue("");
		Height.setValue("");
		Respiration.setValue("");
		Diastolic.setValue("");
		Weight.setValue("");
		Pain.setValue("");
		SPO2.setValue("");
		BSA.setValue("");

		if (ThisAdminDay) {
			record.Cycle = ThisAdminDay.Cycle;
			record.Day = ThisAdminDay.Day;
		}
		else {	// This is NOT an AdminDay for this Regimen
			record.Cycle = "";
			record.Day = "";
		}

		record.WeightFormula = Patient.WeightFormula;
		record.BSA_Method = Patient.BSA_Method;
		record.BSA_Weight = Patient.BSA_Weight;

		var params = Ext.encode(record);
		this.SavingVitals = true;

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.AddVitals,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.SavingVitals = false;
				if (!this.SavingVitals && !this.SavingGenInfo) {
					this.application.unMask();
				}


				if (resp.success) {
			        var newPlanTabCtl = this.getController("NewPlan.NewPlanTab");
					newPlanTabCtl.loadVitals("Update Vitals");
					Ext.MessageBox.alert("Vital Signs", "Vitals Information Section, Save complete" );		// MWB - 7/20/2012 - New alert to confirm completion of saving.
				}
				else {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + resp.msg );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - Vitals Information Section, Save Error - " + e.message + "<br />" + resp.msg );
			}
		});
		return (true);
	},
	
	SaveGenInfo : function() {
		var Patient = this.application.Patient;

		var rgPatientID = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"rgPatientID\"]")[0].getValue();
		var rgConsent = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"rgConsent\"]")[0].getValue();
		var PatientIDComment = Ext.ComponentQuery.query("NursingDocs_PatientID [name=\"PatientIDComment\"]")[0].getValue();

		var rgEduAssess = Ext.ComponentQuery.query("NursingDocs_PatientTeaching [name=\"rgEduAssess\"]")[0].getValue();
		var rgPlanReviewed = Ext.ComponentQuery.query("NursingDocs_PatientTeaching [name=\"rgPlanReviewed\"]")[0].getValue();

		var flg1 = null === rgPatientID.patientIDGood || undefined === rgPatientID.patientIDGood;
		var flg2 = null === rgConsent.consentGood || undefined === rgConsent.consentGood;
		var flg3 = null === rgEduAssess.educationGood || undefined === rgEduAssess.educationGood;
		var flg4 = null === rgPlanReviewed.planReviewed || undefined === rgPlanReviewed.planReviewed;
		var flg5 = "" === PatientIDComment;

		if (flg1 && flg2 && flg3 && flg4 && flg5) {
			return (false);
		}

		var record = {};
		record.patientId = Patient.id;

		record.patientIDGood = rgPatientID.patientIDGood || false;
		record.consentGood = rgConsent.consentGood || false;
		record.comment = PatientIDComment;

		record.educationGood = rgEduAssess.educationGood || false;
		record.planReviewed = rgPlanReviewed.planReviewed || false;
		var params = Ext.encode(record);
		this.SavingGenInfo = true;

		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.AddND_GenInfo,
			method : "POST",
			jsonData : params,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				this.SavingGenInfo = false;
				if (!this.SavingVitals && !this.SavingGenInfo) {
					this.application.unMask();
				}

				if (!resp.success) {
					Ext.MessageBox.alert("Saving Error", "ND - GenInfo - General Information Section, Save Error - " + resp.msg );
				}
				else {
					Ext.MessageBox.alert("Saving Patient Identification/Teaching", "Saving Patient Identification/Teaching Complete" );
				}
			},
			failure : function( response, opts ) {
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				Ext.MessageBox.alert("Saving Error", "ND - GenInfo - General Information Section, Save Error - " + e.message + "<br />" + resp.msg );
			}
		});
		return (true);
	},


	btnSaveGenInfo : function (button) {
		this.SavingVitals = false;
		this.SavingGenInfo = false;
		this.application.loadMask("One moment please, saving General Information...");
		var SaveGood1 = this.SaveGenInfo();
		var SaveGood2 = this.SaveVitals();
		this.application.unMask();
		if (!SaveGood1 && !SaveGood2) {
			Ext.MessageBox.alert("No Data Saved", "There was no data specified to be saved" );
		}
	},














	GenInfoRendered : function ( component, eOpts ) {
		try {
			var tempScratch, tempScratch1;
			var Patient = this.application.Patient;
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.GenInfoTab");
			if (!thisCtl.getNdct_GenInfoTab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			Ext.MessageBox.alert("Loading Error", "ND - GenInfoRendered() - Error - " + e.message );
		}

		
		
		wccConsoleLog("GenInfoTab Rendered ---- ");
		wccConsoleLog("... GenInfoRendered() Called ... ");

		this.application.Patient.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );

		try {
			var NDVitalsTempF = thisCtl.getNdVitalsTempF();
			var NDVitalsTempC = thisCtl.getNdVitalsTempC();
			var NDVitalsPulse = thisCtl.getNdVitalsPulse();
			var NDVitalsSystolic = thisCtl.getNdVitalsSystolic();
			var NDVitalsGender = thisCtl.getNdVitalsGender();
			var NDVitalsHeightIN = thisCtl.getNdVitalsHeightIN();
			var NDVitalsHeightCM = thisCtl.getNdVitalsHeightCM();
			var NDVitalsResp = thisCtl.getNdVitalsResp();
			var NDVitalsDiastolic = thisCtl.getNdVitalsDiastolic();
			var NDVitalsAge = thisCtl.getNdVitalsAge();
			var NDVitalsWeightP = thisCtl.getNdVitalsWeightP();
			var NDVitalsWeightKG = thisCtl.getNdVitalsWeightKG();
			var NDVitalsPain = thisCtl.getNdVitalsPain();
			var NDVitalsO2Level = thisCtl.getNdVitalsO2Level();
			var NDVitalsBSA = thisCtl.getNdVitalsBSA();

			var LaboratoryInfo = thisCtl.getND_PT_TabLabInfo();
			LaboratoryInfo.update( Patient.History );

			var VitalSigns = thisCtl.getVitalSignsHistory();
			VitalSigns.update( Patient );

			var ThisAdminDay = this.application.Patient.ThisAdminDay;
			this.ChemoBioSectionHandler(false, ThisAdminDay);

			NDVitalsGender.setValue((("M" === Patient.Gender) ? "Male" : "Female"));
			NDVitalsAge.setValue(Patient.Age);
			NDVitalsPain.setValue("");
			NDVitalsO2Level.setValue("");
			NDVitalsBSA.setValue("");		// Patient.BSA);

			NDVitalsTempF.setValue("");
			NDVitalsTempC.setValue("");
			NDVitalsPulse.setValue("");

			NDVitalsSystolic.setValue("");
			NDVitalsDiastolic.setValue("");
			NDVitalsResp.setValue("");
			NDVitalsHeightIN.setValue("");
			NDVitalsHeightCM.setValue("( cm)");
			NDVitalsWeightP.setValue("");
			NDVitalsWeightKG.setValue("( kg)");



// MWB - 6/28/2012 - Show Calculations button for Vital Signs Form
			var theForm = this.getNdVitalSignsForm();
			if (theForm && theForm.rendered) {
				var VSFormBtns = theForm.el.select("button.NDGIVS_BSA_Calculations");
				VSFormBtns.on("click", this.HandleVSFormShowCalcButtons, this);
			}
			else {
				alert("Vital Signs Form not yet rendered");
			}



			var VSHTemplateDataBtns;
			if (VitalSigns && VitalSigns.rendered) {		// Make sure the Vital Signs in the ND/GenInfo tab are rendered before trying to attach.
		        var newCtl = this.getController("NewPlan.NewPlanTab");
				VSHTemplateDataBtns = VitalSigns.el.select("button.dspVSHDoseCalcs");
				VSHTemplateDataBtns.on("click", newCtl.HandleVSHCalcDoseButtons, this);
			}

		}
		catch (e1) {
			Ext.MessageBox.alert("Rendering Error", "ND - GenInfoRendered() - Error - " + e1.message );
		}

	},

	HandleVSFormShowCalcButtons : function (evt, btn) {
		var Patient = this.application.Patient;
		PatientData = Ext.ShowBSACalcs(Patient, false, null, null);

		Ext.MessageBox.show({
			title : "Body Surface Area Calculations",
			msg : PatientData,
			buttons : Ext.MessageBox.OK
		});
	},

	ndgiUpdateBSA : function() {
		var Patient = this.application.Patient;
		var params = {};
		params = Ext.apply(params, Patient);
		params.Weight = this.getNdVitalsWeightP().getValue();
		params.Height = this.getNdVitalsHeightIN().getValue();
		if ("" !== params.Weight && "" !== params.Height) {
			Patient.Height = params.Height;
			Patient.Weight = params.Weight;
			params.BSA = Ext.BSA_Calc(params);
			this.getNdVitalsBSA().setValue(params.BSA);
		}
	}

});

Ext.define("COMS.controller.Messages.MessagesTab", {
	extend : "Ext.app.Controller",
	views : [ "Messages.MessagesTab" ],
// INLINE FOR TESTING: 	models : ["Messages"],
// INLINE FOR TESTING: 	stores : ["Messages"],
    init: function () {
        wccConsoleLog('Initialized Messages Tab Panel Controller!');
	}
});
/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */

// End of Treatment Summary Controller
// Requires the model: 
//		EndTreatmentSummary
//
// Requires the URL for Reading:
//		Ext.URLs.EoTS = "/EndTreatmentSummary/EoTS";
// Param = EoTS GUID;
// Returns data structure for a specific EoTS;
// Example Usage - https://devtest.dbitpro.com/EndTreatmentSummary/EoTS/28225CF5-3937-E111-9B9C-000C2935B86F

// Requires the URL for Writing/Posting EoTS to SQL:
//		Ext.URLs.AddEoTS = "/EndTreatmentSummary/EoTS";
// Expects a POST data consistent with the EndTreatmentSummary Model
//
Ext.define("COMS.controller.NewPlan.EndTreatmentSummary", {
    extend : "Ext.app.Controller",
	EoTSData : {},		// This is used for storing the EoTS Data calculated within this controller rather than passing a variable around.
						// This will be the record stored on the back end when saving the EoTS
						// 
						// EoTS Record Object {
						//	Name - Taken directly from PatientInfo
						//	Gender - Taken directly from PatientInfo
						//	Age - Taken directly from PatientInfo
						//	DOB - Taken directly from PatientInfo
						//	Amputations - Taken directly from PatientInfo
						//	EoTS_TemplateName - Taken directly from PatientInfo
						//	TemplateDescription - Taken directly from PatientInfo
						//	TreatmentStatus - Taken directly from PatientInfo (but SHOULD be "Completed" plus the "End Reason"
						//	TreatmentStart - Taken directly from PatientInfo
						//	TreatmentEnd - Taken directly from PatientInfo
						//	Vitals - getVitals()
						//	EndReason - FinishUpReason4Change()
						// }

    stores : [
    ],

	models : ["EndTreatmentSummary"],

    views : [
		"NewPlan.EndTreatmentSummary"
    ],

    refs: [
		{ ref: "PatientInfoTable", selector: "EndTreatmentSummary [name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableHeader", selector: "EndTreatmentSummary [name=\"PatientInfoTableHeader\"]"},
		{ ref: "PatientInfoTableBody", selector: "EndTreatmentSummary [name=\"PatientInfoTableBody\"]"},
		{ ref: "Reason4EOTSHead", selector: "EndTreatmentSummary [name=\"Reason4EOTSHead\"]"},

		// Radio Groups
		{ ref: "Reason4EOTSAnswer", selector: "EndTreatmentSummary [name=\"Reason4EOTSAnswer\"]"},
		{ ref: "Reason4EOTS_TCReason", selector: "EndTreatmentSummary [name=\"Reason4EOTS_TCReason\"]"},
		{ ref: "Reason4EOTS_PDReason", selector: "EndTreatmentSummary [name=\"Reason4EOTS_PDReason\"]"},

		// Radio Buttons for each group
		{ ref: "EOTS_Reason", selector: "EndTreatmentSummary [name=\"EOTS_Reason\"]"},
		{ ref: "EOTS_TChange", selector: "EndTreatmentSummary [name=\"EOTS_TChange\"]"},
		{ ref: "EOTS_PDChange", selector: "EndTreatmentSummary [name=\"EOTS_PDChange\"]"},

		// "Other" text fields for "Other" option for each group
		{ ref: "EOTS_ReasonOther", selector: "EndTreatmentSummary [name=\"EOTS_ReasonOther\"]"},
		{ ref: "EOTS_TChangeOther", selector: "EndTreatmentSummary [name=\"EOTS_TChangeOther\"]"},
		{ ref: "EOTS_PDChangeOther", selector: "EndTreatmentSummary [name=\"EOTS_PDChangeOther\"]"},

		{ ref: "ProviderReport", selector: "EndTreatmentSummary [name=\"ProviderReport\"]"},
		{ ref: "FollowUpAppointments", selector: "EndTreatmentSummary [name=\"FollowUpAppointments\"]"},


	    {
		    ref: "AdministeredMedsGrid",
			selector: "EndTreatmentSummary [name=\"AdministeredMedsGrid\"]"
	    },

	    {
		    ref: "DiseaseResponseGrid",
			selector: "EndTreatmentSummary [name=\"DiseaseResponseGrid\"]"
	    },
	    {
		    ref: "ToxicityGrid",
			selector: "EndTreatmentSummary [name=\"ToxicityGrid\"]"
	    },
	    {
		    ref: "OtherGrid",
			selector: "EndTreatmentSummary [name=\"OtherGrid\"]"
	    },
	    {
		    ref: "SaveBtn",
			selector: "EndTreatmentSummary button[action=\"save\"]"
		},
	    {
		    ref: "CancelBtn",
			selector: "EndTreatmentSummary button[action=\"cancel\"]"
		}

	],


    init: function() {
        wccConsoleLog("Initialized End of Treatment Summary Controller!");
        this.control({
            "EndTreatmentSummary button[action=\"save\"]": {
                click: this.SaveEoTS
            },
            "EndTreatmentSummary button[action=\"cancel\"]": {
                click: this.CancelEoTS
            },

            "EndTreatmentSummary" : {
				afterrender : this.AfterRenderWindow,
				close : this.CloseEoTSWin, 
				resize : this.ResizeTable
            },

				// Change Button in one of the 3 Radio Groups
			"EndTreatmentSummary [name=\"Reason4EOTSAnswer\"]" : {
				change : this.Reason4Change1
			},
			"EndTreatmentSummary [name=\"Reason4EOTS_TCReason\"]" : {
				change : this.Reason4Change2
			},
			"EndTreatmentSummary [name=\"Reason4EOTS_PDReason\"]" : {
				change : this.Reason4Change3
			},

			"EndTreatmentSummary [name=\"EOTS_ReasonOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			},
			"EndTreatmentSummary [name=\"EOTS_TChangeOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			},
			"EndTreatmentSummary [name=\"EOTS_PDChangeOther\"]" : {
				blur : this.Reason4ChangeDone,
				specialkey : this.Look4Enter
			}
        });
    },

	Look4Enter : function( theField, evt, eOpts ) {
		var theKey = evt.getKey();
		if (evt.ENTER === theKey) {
			this.Reason4ChangeDone( theField, "", "", eOpts);
		}
	},


		// Reason4EOTSAnswer btn has changed
	Reason4Change1 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},

		// Reason4EOTS_TCReason btn has changed
	Reason4Change2 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},

		// Reason4EOTS_PDReason btn has changed
	Reason4Change3 : function( theField, nValue, oValue, eOpts) {
		this.Reason4Change(theField, nValue, oValue, eOpts);
	},



	Reason4Change : function( theField, nValue, oValue, eOpts) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var Head = thisCtl.getReason4EOTSHead();
		var FieldName = theField.name;
		var ReasonMsg = "";
		var EndOfChange = false;

// Reason4EOTSAnswer is the name of the group of buttons for the top level
// EOTS_Reason is the name of the Radio Buttons for the top level.
// EOTS_ReasonOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTSAnswer = this.getReason4EOTSAnswer();
		var EOTS_Reason = this.getEOTS_Reason();
		var EOTS_ReasonOther = this.getEOTS_ReasonOther();

// Reason4EOTS_TCReason is the name of the group of buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
// EOTS_TChange is the name of the Radio Buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
// EOTS_TChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_TCReason = this.getReason4EOTS_TCReason();
		var EOTS_TChange = this.getEOTS_TChange();
		var EOTS_TChangeOther = this.getEOTS_TChangeOther();

// Reason4EOTS_PDReason is the name of the group of buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
// EOTS_PDChange is the name of the Radio Buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
// EOTS_PDChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_PDReason = this.getReason4EOTS_PDReason();
		var EOTS_PDChange = this.getEOTS_PDChange();
		var EOTS_PDChangeOther = this.getEOTS_PDChangeOther();

		Reason4EOTSAnswer.hide();
		EOTS_ReasonOther.hide();

		Reason4EOTS_TCReason.hide();
		EOTS_TChangeOther.hide();

		Reason4EOTS_PDReason.hide();
		EOTS_PDChangeOther.hide();


		// Determine which radio button was clicked and show/hide appropriate sections as needed
		if ("Reason4EOTSAnswer" === FieldName) {	// Top level radio button clicked
			ReasonMsg = nValue.EOTS_Reason;

			if ("Treatment Change" === ReasonMsg ) {	// If Treatment Change is checked then need to display secondary set of Radio Buttons
				Reason4EOTS_TCReason.show();		// Secondary set of Radio Buttons
				Reason4EOTSAnswer.show();
			}
			else if ("Patient Discontinuation" === ReasonMsg ) {	// If Patient Discontinuation is checked then need to display secondary set of Radio Buttons
				Reason4EOTS_PDReason.show();		// Secondary set of Radio Buttons
				Reason4EOTSAnswer.show();
			}
			else if ("Other" === ReasonMsg) {	// Needs to show the text field for an "Other" reason
				EOTS_ReasonOther.show();
				Reason4EOTSAnswer.show();
			}
			else {
				EndOfChange = true;
			}
		}

		// Treatment Change - Process Secondary Buttons
		else if ("Reason4EOTS_TCReason" === FieldName) {	// User has selected "Treatment Change" so this handles the secondary radio buttons
			ReasonMsg = "Treatment Change - " + nValue.EOTS_TChange;

			if ("Other" === nValue.EOTS_TChange) {	// Needs to show the text field for an "Other" reason for "Treatment Change"
				Reason4EOTS_TCReason.show();		// Secondary set of Radio Buttons
				EOTS_TChangeOther.show();
				Reason4EOTSAnswer.show();
			}
			else {
				EndOfChange = true;
			}
		}

		// Patient Discontinuation - Process Secondary Buttons
		else if ("Reason4EOTS_PDReason" === FieldName) {	// User has selected "Patient Discontinuation" so this handles the secondary radio buttons
			ReasonMsg = "Patient Discontinuation - " + nValue.EOTS_PDChange;

			if ("Other" === nValue.EOTS_PDChange) {	// Needs to show the text field for an "Other" reason for "Patient Discontinuation"
				EOTS_PDChangeOther.show();
				Reason4EOTSAnswer.show();
				Reason4EOTS_PDReason.show();
			}
			else {
				EndOfChange = true;
			}
		}




		else if ("EOTS_ReasonOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = nValue;
		}
		else if ("EOTS_TChangeOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = "Treatment Change - " + nValue;
		}
		else if ("EOTS_PDChangeOther" === FieldName) {		// Top level reason for change 
			ReasonMsg = "Patient Discontinuation - " + nValue;
		}


		var Reason = "<span style=\"font-weight: normal; font-size: 100%;\">" + ReasonMsg + "</span>";
		var ChangeBtn = "";
		
		if (EndOfChange) {
			ChangeBtn = "<button class=\"anchor\" name=\"ChangeReason\" style=\"margin-left: 1em;\">Change</button>";
			this.FinishUpReason4Change(Reason, ChangeBtn);
		}
		else {
			thisCtl.getReason4EOTSHead().el.setHTML("<h2>Reason for generating End of Treatment Summary - " + Reason + ChangeBtn + "</h2>");
		}
	},





	Reason4ChangeDone : function( theField, nValue, oValue, eOpts) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var answer1 = thisCtl.getReason4EOTSAnswer().getValue();
		var answer2 = thisCtl.getReason4EOTS_TCReason().getValue();
		var answer3 = thisCtl.getReason4EOTS_PDReason().getValue();

		var answer = "";
		if ("Treatment Change" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + answer1.EOTS_TChange + " - " + theField.value;
		}
		else if ("Patient Discontinuation" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + answer1.EOTS_PDChange + " - " + theField.value;
		}
		else if ("Other" === answer1.EOTS_Reason) {
			answer = answer1.EOTS_Reason + " - " + theField.value;
		}

		var ChangeBtn = "<button class=\"anchor\" name=\"ChangeReason\" style=\"margin-left: 1em;\">Change</button>";
		this.FinishUpReason4Change(answer, ChangeBtn);

	},

	CycleDates : [],
	PerformanceStatus : [],
	DiseaseResponse : [],
	Toxicity : [],
	Other : [],
	Drugs : [],

	EoTS_PerformanceStatus : [],
	EoTS_DiseaseResponse : [],
	EoTS_Toxicity : [],
	EoTS_Other : [],
	EoTS_Drugs : [],

	parseFSData4EoTS : function( tType, dName, tDataStore, EoTS_DataStore, data ) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");

		var i, el;
		var buf = [];
		var HasDataFlag = false;
		var tmpEoTS;
		for (i in data) {
			if (data.hasOwnProperty(i) && "&nbsp;" !== i && "label" !== i) {
				el = data[i];
				if ("" !== el) {

					if (el.indexOf("<button") >= 0) {
						if (el.indexOf("Write</button") < 0) {
							var el2=el.replace(/\<button class="anchor .*data="/,"").replace(/".*$/, "");
							el = unescape(el2);
							el = el.replace(/\n/g, "<br />");
							if ("" === el2) {
								el = "No entry recorded";
							}
						}
						else {
							el = "";
						}
					}
					if ("" !== el) {
						if ("" === tType) {
							var tmpEoTS = {};
							tmpEoTS.day = i;
							tmpEoTS.date = thisCtl.CycleDates[i];
							tmpEoTS.desc = el;
							buf.push("<tr><th style=\"width:10em;\">" + i + "</th><td style=\"width:10em;\">" + thisCtl.CycleDates[i] + "</td><td colspan=\"2\">" + el + "</td></tr>");
						}
						else {
							var tmpEoTS = {};
							tmpEoTS.day = i;
							tmpEoTS.date = thisCtl.CycleDates[i];
							tmpEoTS.dosage = el;
							buf.push("<tr><th style=\"width:10em;\">" + i + "</th><td style=\"width:10em;\">" + thisCtl.CycleDates[i] + "</td><td colspan=\"2\">" + el + "</td></tr>");
						}
						HasDataFlag = true;
					}
				}
			}
		}
		if (HasDataFlag) {
			if ("" === tType) {
				var tmp = {};
				tmp = Ext.apply({}, tmpEoTS);
			}
			else {
				var tmp = {};
				tmp.administered = [];
				tmp.administered.push(tmpEoTS);
				tmp.name = dName;
			}
			EoTS_DataStore.push(tmp);
		}
		else {
			var tmpEoTS = {};
			if ("" === tType) {
				tmpEoTS.day = "";
				tmpEoTS.date = "";
				tmpEoTS.desc = "No " + dName + ("Other" === dName? " Comments" : "") + " Recorded";
				buf.push("<tr><td colspan=\"4\">No " + dName + ("Other" === dName? " Comments" : "") + " Recorded</td></tr>");
			}
			else {
				tmpEoTS.name = dName;
				tmpEoTS.administered = [];
				buf.push("<tr><td colspan=\"4\">No " + dName + " Administered</td></tr>");
			}
			EoTS_DataStore.push(tmpEoTS);
		}
		var b1 = "<tr><th colspan=\"4\" style=\"font-weight:bold; padding-left: 2em; text-align: left;\">" + dName + "</th></tr>" + buf.join("");
		tDataStore.push(b1);
	},

	noParse : function( data ) {
	},

	parseFlowsheetData : function( ) {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var pData = this.application.Patient.FlowsheetData;
		var i, j, elLen, pdLen = pData.length, el;

		thisCtl.CycleDates = {};
		for (i = 0; i < pdLen; i++) {
			el = pData[i];
			if ("Date" === el.label) {
				thisCtl.CycleDates = Ext.apply(thisCtl.CycleDates, el);
				break;
			}
		}

		for (i = 0; i < pdLen; i++) {
			el = pData[i];

			switch(el.label) {
				case "Weight (lbs)":
					thisCtl.noParse(el);
					break;
				case "Date":
					thisCtl.noParse(el);
					break;
				case "Performance Status":

					thisCtl.parseFSData4EoTS("", el.label, thisCtl.PerformanceStatus, thisCtl.EoTS_PerformanceStatus, el);
					break;
				case "Disease Response":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.DiseaseResponse, thisCtl.EoTS_DiseaseResponse, el);
					break;
				case "Toxicity Side Effects":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.Toxicity, thisCtl.EoTS_Toxicity, el);
					break;
				case "Other":
					thisCtl.parseFSData4EoTS("", el.label, thisCtl.Other, thisCtl.EoTS_Other, el);
					break;
				case "Unknown...":
					thisCtl.noParse(el);
					break;
				default :
					thisCtl.parseFSData4EoTS(el["&nbsp;"], el.label, thisCtl.Drugs, thisCtl.EoTS_Drugs, el);
					break;
			}
		}

		var theGrid = thisCtl.getAdministeredMedsGrid();
		var theGridEl = theGrid.getEl();
		theGridEl.update("<h2 style=\"margin-top: 2em;\">Medication Administered</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.Drugs.join("") + "</table>");

		theGrid = thisCtl.getDiseaseResponseGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Patient Disease Response</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.DiseaseResponse.join("") + "</table>");

		theGrid = thisCtl.getToxicityGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Toxicity Side Effects</h2><table class=\"InformationTable\" border=\"1\" style=\"margin-bottom: 2em;\">" + thisCtl.Toxicity.join("") + "</table>");

		theGrid = thisCtl.getOtherGrid();
		theGridEl = theGrid.getEl();
		theGridEl.update("<h2>Other Comments</h2><table class=\"InformationTable\" border=\"1\">" + thisCtl.Other.join("") + "</table>");

	},



	FinishUpReason4Change : function(Reason, Btn) {
		this.EoTSData.EndReason = Reason;
		var Patient = this.application.Patient;
		this.getReason4EOTSHead().el.setHTML("<h2>Reason for generating End of Treatment Summary - " + Reason + Btn + "</h2>");
		var ChangeBtnEl = Ext.ComponentQuery.query("EndTreatmentSummary")[0].el.select("button.anchor");
		ChangeBtnEl.on("click", this.HandleChangeClicks, this);

		this.EoTSData.TreatmentOriginalEnd = "";

		var i, tHist = Patient.TemplateHistory;
		var thLen = 0;
		if (tHist) {
			thLen = tHist.length;
		}
		if (this.application.Patient.EoTS_TemplateID === Patient.TemplateID) {		// Terminating current template
			this.EoTSData.TreatmentStart = Patient.TreatmentStart;
			this.EoTSData.TreatmentOriginalEnd = Patient.TreatmentEnd;
			this.EoTSData.TreatmentEnd = Ext.Date.format(new Date(), "m/d/Y");
		}
		else {
			for (i = 0; i < thLen; i++) {
				if (tHist[i].TemplateID === this.application.Patient.EoTS_TemplateID) {
					this.EoTSData.TreatmentStart = tHist[i].DateStarted;
					this.EoTSData.TreatmentEnd = tHist[i].DateEnded;
				}
			}
		}

		this.EoTSData.Name = Patient.name;
		this.EoTSData.PatientID = Patient.id;		// MWB - 6/12/2012
		this.EoTSData.PAT_ID = Patient.PAT_ID;


		this.EoTSData.Gender = Patient.Gender;
		this.EoTSData.Age = Patient.Age;
		this.EoTSData.DOB = Patient.DOB;
		this.EoTSData.Amputations = Patient.Amputations;
		this.EoTSData.TemplateName = this.application.Patient.EoTS_TemplateName;
		this.EoTSData.TemplateID = this.application.Patient.EoTS_TemplateID;
		this.EoTSData.TemplateDescription = "";
		this.EoTSData.TreatmentStatus = "Ended";
		this.EoTSData.Disease = Patient.Disease;		// Contains an array of objects consisting of { Type : "", Stage : ""}
		this.EoTSData.Allergies = Patient.Allergies;	// Contains an array of objects consisting of { name : "", type : "", comment : "" }
		this.EoTSData.Trial = Patient.ClinicalTrial || "NOT a clinical trial";

		this.getVitals();

		var Ctl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");

		
		thisCtl.CycleDates = [];
		thisCtl.PerformanceStatus = [];
		thisCtl.DiseaseResponse = [];
		thisCtl.Toxicity = [];
		thisCtl.Other = [];
		thisCtl.Drugs = [];

		thisCtl.EoTS_PerformanceStatus = [];
		thisCtl.EoTS_DiseaseResponse = [];
		thisCtl.EoTS_Toxicity = [];
		thisCtl.EoTS_Other = [];
		thisCtl.EoTS_Drugs = [];
		
		
		var Flowsheet = Ctl.createFlowsheet(thisCtl.parseFlowsheetData);

		this.EoTSData.OriginalEnd = this.application.Patient.TreatmentEnd;
		this.EoTSData.Meds = this.EoTS_Drugs;
		this.EoTSData.DiseaseResponse = this.EoTS_DiseaseResponse;
		this.EoTSData.Toxicity = this.EoTS_Toxicity;
		this.EoTSData.Other = this.EoTS_Other;

		this.EoTSData.TreatmentReport = "";
		this.EoTSData.PatientDiseaseResponse = "";
		this.EoTSData.ToxicitySideEffects = "";
		this.EoTSData.ProviderReport = "";
		this.EoTSData.FollowUpAppointments = "";

		this.getReason4EOTSAnswer().hide();
		this.getPatientInfoTable().show();
		this.getPatientInfoTableHeader().show();
		this.getPatientInfoTableBody().show();
		this.getSaveBtn().show();
		this.getCancelBtn().show();


		var PatientInfo = this.application.Patient;
		var PITableHdr = this.getPatientInfoTableHeader();
		var PITable = this.getPatientInfoTable();

		PITableHdr.update( this.EoTSData );

		PITable.update( this.EoTSData );

		this.application.unMask();
	},


		// Function called when user clicks on the "Change" link to change the reason for generating the EoTS
	HandleChangeClicks : function() {
		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		this.getReason4EOTSAnswer().show();
		var ChangeBtnEl = Ext.ComponentQuery.query("EndTreatmentSummary")[0].el.select("button.anchor");
		ChangeBtnEl.hide();

			// Reason4EOTSAnswer is the name of the group of buttons for the top level
			// EOTS_Reason is the name of the Radio Buttons for the top level.
			// EOTS_ReasonOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTSAnswer = this.getReason4EOTSAnswer();
		var answer1 = Reason4EOTSAnswer.getValue();
		var EOTS_Reason = this.getEOTS_Reason();
		var EOTS_ReasonOther = this.getEOTS_ReasonOther();

			// Reason4EOTS_TCReason is the name of the group of buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
			// EOTS_TChange is the name of the Radio Buttons for the secondary level, IF the "Treatment Change" button was clicked at the top level
			// EOTS_TChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_TCReason = this.getReason4EOTS_TCReason();
		var answer2 = Reason4EOTS_TCReason.getValue();
		var EOTS_TChange = this.getEOTS_TChange();
		var EOTS_TChangeOther = this.getEOTS_TChangeOther();

			// Reason4EOTS_PDReason is the name of the group of buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
			// EOTS_PDChange is the name of the Radio Buttons for the secondary level, IF the "Patient Discontinuation" button was clicked at the top level
			// EOTS_PDChangeOther is the name of the Text Field for the text if the "Other" button is set
		var Reason4EOTS_PDReason = this.getReason4EOTS_PDReason();
		var answer3 = Reason4EOTS_PDReason.getValue();
		var EOTS_PDChange = this.getEOTS_PDChange();
		var EOTS_PDChangeOther = this.getEOTS_PDChangeOther();

		if ("Treatment Change" === answer1.EOTS_Reason) {
			Reason4EOTS_TCReason.show();
			if ("Other" === answer2.EOTS_TChange) {
				EOTS_TChangeOther.show();
			}
		}
		else if ("Patient Discontinuation" === answer1.EOTS_Reason) {
			Reason4EOTS_PDReason.show();
			if ("Other" === answer3.EOTS_PDChange) {
				EOTS_PDChangeOther.show();
			}
		}

		this.getPatientInfoTable().hide();
		this.getPatientInfoTableHeader().hide();
		this.getPatientInfoTableBody().hide();
		this.getSaveBtn().hide();
		this.getCancelBtn().hide();

	},


	// Resize the EoTS Window based on the browser's size via the "onWindowResize" event handler
	AfterRenderWindow : function(theWin, eOPts) {
		Ext.EventManager.onWindowResize( this.ResizeTheEoTSWin, theWin );
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * .1;
		smaller = max - smaller;
		theWin.setHeight(smaller);
		Ext.Function.defer( theWin.focus, 2000, this );
	},

	ResizeTheEoTSWin : function() {
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * .1;
		smaller = max - smaller;
		this.setHeight(smaller);
	},

	ResizeTable : function(theWin, width, height, eOpts) {
		var tBody = this.getPatientInfoTableBody();
		if (tBody) {
			var max = theWin.getHeight();
			var smaller = max - 230;
			tBody.setHeight(smaller);
		}
	},


	// Make sure to remove the "onWindowResize" event handler when the EoTS window is closed.
	CloseEoTSWin : function(theWin, eOPts) {
		Ext.EventManager.removeResizeListener( this.ResizeTheEoTSWin, theWin );
	},

	SaveEoTS : function(button) {
        var win = button.up('window');

		var ProvRep = this.getProviderReport();
		var FUA = this.getFollowUpAppointments();
		this.EoTSData.ClinicalTrial = this.application.Patient.ClinicalTrial;

		this.EoTSData.ProviderReport = ProvRep.value;
		this.EoTSData.FollowUpAppointments = FUA.value;

		var EoTSSaveRecord = Ext.apply({}, this.EoTSData);
		delete EoTSSaveRecord.LastVitals;
		delete EoTSSaveRecord.FirstVitals;

        var EoTSRecord = Ext.create(Ext.COMSModels.EoTS, EoTSSaveRecord );

		EoTSRecord.save({
            scope: this,
            success: function (data) {
                wccConsoleLog("Saved EoTS " );
		        win.close();
				// alert("Update History display with to display EoTS via ID returned in data");
				var thisCtl = this.getController("NewPlan.NewPlanTab");
				var Patient = this.application.Patient;
				thisCtl.loadTemplates("Update Templates");

// MWB - 8/2/2012 Clear out current template info...
Patient.TemplateDescription = "";
Patient.TemplateID = "";
Patient.TreatmentEnd = "";
Patient.TreatmentStart = "";


			},
			failure : function (arg0, arg1) {
				alert("End of Treatment Summary Failure to save record...");
		        win.close();
			}
		});

	},

	CancelEoTS : function(button) {
        var win = button.up('window');
        win.close();
	},









//-----------------------------
//
// Get Vitals for EoTS
// This function is intended to get the vitals for a patient at the start and at the end of the treatment cycle.
// It should be examined again and probably tweaked when we have some consistent data to work with.
//
	getVitals : function() {
		var PatientInfo = this.application.Patient;
		var allVitals = PatientInfo.Vitals;
		var i, vitals, FirstVital = null, dt, vLen = allVitals.length;
		var soTreatment = new Date(this.EoTSData.TreatmentStart);
		var eoTreatment = new Date(this.EoTSData.TreatmentEnd);

		this.EoTSData.Vitals = [];
		for (i = vLen-1; i >= 0; i--) {
			vitals = allVitals[i];
			if (vitals.DateTaken) {
				if (0 === this.EoTSData.Vitals.length) {
					this.EoTSData.Vitals[0] = vitals;
					this.EoTSData.Vitals[1] = vitals;
				}
				dt = new Date(vitals.DateTaken);
				if (dt <= soTreatment) {
					this.EoTSData.Vitals[0] = vitals;
				}
				if (dt <= eoTreatment) {										// Right now our patients have vitals all over the place
					this.EoTSData.Vitals[1] = vitals;							// This code is intended to ensure that the FirstVital is before the Last Vital
				}
			}
		}
		this.EoTSData.FirstVitals = this.EoTSData.Vitals[0];		// The xTemplate view requires First/LastVitals, but the model uses an array of Vitals.
		this.EoTSData.LastVitals = this.EoTSData.Vitals[1];
	},

	createAdministeredMedsGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "AdministeredMedsStore";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	createDiseaseResponseGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "DiseaseResponseGrid";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	createToxicityGrid : function() {
		var FSFields = [], FSColumns = [];
		var storeID = "ToxicityGrid";

		var thisCtl = this.getController("NewPlan.EndTreatmentSummary");
		var theGrid = thisCtl.getAdministeredMedsGrid();

		var theGridEl = theGrid.getEl();

		FSColumns[0] = "date";
		FSColumns[1] = "Some Data";

		this.buildEoTSGrid( theGrid, storeID, FSFields, FSColumns, "" );
	},


	buildEoTSGrid : function (theGrid, storeID, gFields, gCols, gData ) {
		var store = Ext.create('Ext.data.Store', {
		    storeId: storeID,
		    fields: gFields,
		    data: { storeID : gData },
		    proxy: {
		        type: 'memory',
		        reader: {
		            type: 'json',
		            root: storeID
		        }
		    }
		});

		var theGrid = Ext.create('Ext.grid.Panel', {
		    renderTo: theGrid.getEl(),
			autoScroll: 'y',
			columnLines: true,
			viewConfig: { stripeRows: true, forceFit: true },

		    store: Ext.data.StoreManager.lookup(storeID),
		    columns: gCols
		});

		theGrid.on("afterlayout", function() {
			theGrid.forceComponentLayout();	// Since the grid is added after the panel has been rendered, this function causes the panel to resize to fit the grid.
		}, this);
	}
});
Ext.define("COMS.controller.NewPlan.ViewEndTreatmentSummary", {
    extend : "Ext.app.Controller",
	EoTSData : {},		// This is used for storing the EoTS Data calculated within this controller rather than passing a variable around.
    views : [
		"NewPlan.ViewEndTreatmentSummary"
    ],

    refs: [
		{ ref: "PatientInfoTable", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTable\"]"},
		{ ref: "PatientInfoTableHeader", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTableHeader\"]"},
		{ ref: "PatientInfoTableBody", selector: "ViewEndTreatmentSummary [name=\"PatientInfoTableBody\"]"},
		{ ref: "Reason4EOTSHead", selector: "ViewEndTreatmentSummary [name=\"Reason4EOTSHead\"]"}
	],
    init: function() {
        wccConsoleLog("Initialized End of Treatment Summary Controller!");
        this.control({
            "ViewEndTreatmentSummary button[action=\"cancel\"]": {
                click: this.CancelEoTS
            },

            "ViewEndTreatmentSummary" : {
				afterrender : this.AfterRenderWindow,
				close : this.CloseEoTSWin, 
				resize : this.ResizeTable
            }

        });
    },

	CancelEoTS : function(button) {
        var win = button.up('window');
        win.close();
	},

	// Resize the EoTS Window based on the browser's size via the "onWindowResize" event handler
	AfterRenderWindow : function(theWin, eOPts) {
		Ext.EventManager.onWindowResize( this.ResizeTheEoTSWin, theWin );
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * .1;
		smaller = max - smaller;
		theWin.setHeight(smaller);
		Ext.Function.defer( theWin.focus, 2000, this );
		var theTpl = this.getPatientInfoTableHeader();
		var EoTSData;
		EoTSData = Ext.apply({}, this.application.Patient);


var SampleData = {
	"Amputations": [
		{
			"description": "Left Hand and Fingers"
		},
		{
			"description": "Left Foot"
		}
	],

	"Vitals": [
		{
			"Height": "70",
			"Weight": "172",
			"BP": "146/84",
			"WeightFormula": "Actual Weight",
			"BSA_Method": "DuBois",
			"BSA": "",
			"BSA_Weight": 78,
			"DateTaken": "07/16/2012",
			"Temperature": "98.4",
			"Pulse": "76",
			"Respiration": "12",
			"Pain": "4",
			"SPO2": "",
			"Cycle": "",
			"Day": "",
			"PS": "Fully active, able to carry on all pre-disease performance without restriction",
			"PSID": "0",
			"Age": 77,
			"Gender": "M",
			"Amputations": [
				{
					"description": "Left Hand and Fingers"
				},
				{
					"description": "Left Foot"
				}
			]
		},
		{
			"Height": "70",
			"Weight": "172",
			"BP": "146/84",
			"WeightFormula": "Actual Weight",
			"BSA_Method": "DuBois",
			"BSA": 1.84,
			"BSA_Weight": 78,
			"DateTaken": "07/30/2012",
			"Temperature": "98.4",
			"Pulse": "76",
			"Respiration": "12",
			"Pain": "4",
			"SPO2": "",
			"Cycle": "",
			"Day": "",
			"PS": "Fully active, able to carry on all pre-disease performance without restriction",
			"PSID": "0",
			"Age": 77,
			"Gender": "M",
			"Amputations": [
				{ "description": "Left Hand and Fingers" },
				{ "description": "Left Foot" }
			]
		}
	],

	"ProviderReport": "Provider Report<br>",
	"FollowUpAppointments": "Follow-Up Appointments<br>",

	"Meds" : [
		{ "name" : "Saline", "administered" : [
			{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "dosage" : "8 mg" }
		]},
		{ "name" : "Dexamathasone", "administered" : [ ] }
	],
	"DiseaseResponse" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "Minimal response noted" }
	],
	"Toxicity" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "None at this time" }
	],
	"Other" : [
		{ "day" : "Cycle 1, Day 1", "date" : "7/13/2012", "desc" : "Minimal response noted" }
	],
	"id": null
};

//		EoTSData.Amputations = Ext.apply({}, SampleData.Amputations);
//		EoTSData.EoTS.FirstVitals = Ext.apply({}, SampleData.Vitals[0]);
//		EoTSData.EoTS.LastVitals = Ext.apply({}, SampleData.Vitals[1]);
//		EoTSData.EoTS.ProviderReport = Ext.apply({}, SampleData.ProviderReport);
//		EoTSData.EoTS.FollowUpAppointments = Ext.apply({}, SampleData.FollowUpAppointments);
//		EoTSData.EoTS.Meds = Ext.apply({}, SampleData.Meds);

//		EoTSData.EoTS.DiseaseResponse = Ext.apply({}, SampleData.DiseaseResponse);
//		EoTSData.EoTS.Toxicity = Ext.apply({}, SampleData.Toxicity);
//		EoTSData.EoTS.Other = Ext.apply({}, SampleData.Other);


if (0 === EoTSData.EoTS.Vitals.length) {
	EoTSData.EoTS.FirstVitals = {};
	EoTSData.EoTS.LastVitals = {};
}
else {
	EoTSData.EoTS.FirstVitals = EoTSData.EoTS.Vitals[0];
	EoTSData.EoTS.LastVitals = EoTSData.EoTS.Vitals[1];
}


		EoTSData.Disease = [];
		theTpl.update(EoTSData);
	},

	ResizeTheEoTSWin : function() {
		var max = Ext.getBody().getViewSize().height;
		var smaller = max * .1;
		smaller = max - smaller;
		this.setHeight(smaller);
	},

	ResizeTable : function(theWin, width, height, eOpts) {
		var tBody = this.getPatientInfoTableBody();
		if (tBody) {
			var max = theWin.getHeight();
			var smaller = max - 230;
			tBody.setHeight(smaller);
		}
	},


	// Make sure to remove the "onWindowResize" event handler when the EoTS window is closed.
	CloseEoTSWin : function(theWin, eOPts) {
		Ext.EventManager.removeResizeListener( this.ResizeTheEoTSWin, theWin );
	}
});

// create reusable renderer
Ext.util.Format.comboRenderer = function(combo){
    return function(value){
        var record = combo.findRecord(combo.valueField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
}

// create the combo instance
var combo = new Ext.form.ComboBox({
    typeAhead: true,
    triggerAction: 'all',
    lazyRender:true,
    queryMode: 'local',
    store: {
        fields: [{
                name: "orderstatus"
        }],
        data: [
            { orderstatus: "Ordered" },
            { orderstatus: "In-Coordination" },
            { orderstatus: "Cleared" },
            { orderstatus: "Finalized" },
            { orderstatus: "Dispensed" },
            { orderstatus: "Administered" },
			{ orderstatus: "Cancelled" }

        ]
    },
    displayField: 'orderstatus'
});


Ext.define('COMS.view.Orders.OrdersTab', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.OrdersTab',		// Any references to this view should be for an xtype : "OrdersTab"
        requires: ['Ext.ux.grid.column.ActionButtonColumn'],
	name : 'Orders Tab',
	//title : 'All Orders',
	margin: '0 10 10 10',
	    autoScroll: 'y',
        columnLines: true,
        width: 970,				// Not used
        viewConfig: {
                stripeRows: true,
                height: 655,
                forceFit: true
        },
	store : "OrdersStore",		// Since this is now a Grid, we need to get the name of our store

        plugins : [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],

        selType: 'cellmodel',
		
	features: [ Ext.create('Ext.grid.feature.Grouping')],
	//, { groupHeaderTpl: 'Group: {Patient} ({rows.length})'})	
	
	
        columns: [
                    {
                        header: 'Name',
                        dataIndex: 'Last_Name',
                        width: 180,
                        sortable: true,
                        align: 'center'
                    }
					,{
                        header: 'Patient',
                        dataIndex: 'patientID',
                        width: 60,
                        sortable: true,
                        align: 'center',
						hidden: true
                    },
                    {
                        header: 'Template',
                        dataIndex: 'templateID',
                        width: 80,
                        sortable: false,
                        align: 'center',
						editor   : new Ext.form.TextField(),
						hidden: true
                    },
					{
                        header: 'OrderID',
                        dataIndex: 'orderid',
                        width: 80,
                        sortable: false,
                        align: 'center',
						editor   : new Ext.form.TextField(),
						hidden: true
                    },
                    {
                        header: 'Admin<br/>Day',
                        dataIndex: 'adminDay',
                        width: 40,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        header: 'Admin Date',
                        dataIndex: 'adminDate',
                        width: 70,
                        sortable: true,
                        align: 'center',
						hidden: true
                    },
                    {
                        header: 'Type',
                        dataIndex: 'type',
                        width: 75,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Drug',
                        dataIndex: 'drug',
                        width: 100,
                        sortable: true,
                        align: 'center'
                    },
                    {
                        header: 'Dosage',
                        dataIndex: 'dose',
                        width: 50,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Units',
                        dataIndex: 'unit',
                        width: 50,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Route',
                        dataIndex: 'route',
                        width: 50,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Fluid/<br/>Volume',
                        dataIndex: 'fluidVol',
                        width: 50,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Flow<br/>Rate',
                        dataIndex: 'flowRate',
                        width: 40,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Instructions',
                        dataIndex: 'instructions',
                        width: 120,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        header: 'Order Status',
                        dataIndex: 'orderstatus',
                        width: 90,
                        sortable: true,
                        align: 'center',
                        editor: combo//,
                        //renderer: Ext.util.Format.comboRenderer(combo) 
                            
                    },
                    {
                        xtype:'actionbuttoncolumn',
                        width: 70,
                        header: 'Set Status',
                        align: 'center',
                        items: [{
                            disabled: true,
                            text: 'Update',
                            handler: function(grid, rowIndex, colIndex) {
                                //var addHydrationDrug = Ext.ComponentQuery.query('OrdersTab')[0];
                                var rec = grid.getStore().getAt(rowIndex);
                                var order = Ext.create('COMS.model.OrdersTable', {
                                        orderstatus: combo.getValue(),
                                        templateID: rec.get('templateID'),
                                        drug: rec.get('drug'),
										patientID: rec.get('patientID'),
										type: rec.get('type'),
										route: rec.get('route'),
										orderid: rec.get('orderid'),
										Last_Name: rec.get('Last_Name')
                                });
                                
                                if(null == combo.getValue() || '' == combo.getValue()){
                                    Ext.MessageBox.alert('Information', 'Please select an Order Status');
                                    return;
                                }
                                
                                order.save({
                                        scope: this,
                                        success: function (data) {
                                            //Ext.MessageBox.alert('Success', 'The Order Status has been updated.');
                                        },
                                        failure: function (record, op) {
                                            //Ext.MessageBox.alert('Invalid', 'The Order Status was not updated');
                                        }
                                });
								
                            }

                        }]
                    }
                ],
        buttons: [
                    {
                        text    : 'Refresh'
                    },
                    {
                        text: 'Edit',
                        disabled: true
                    }
        ],
        buttonAlign: 'left'
});


/*jslint undef: true, sloppy: true, eqeq: true, stupid: true, sub: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define('COMS.controller.Orders.OrdersTab', {
    extend : 'Ext.app.Controller',
    stores : ['OrdersStore'],
    views : ['Orders.OrdersTab'],
    models : ['OrdersTable'],

	refs: [
	{ ref : "Orders", selector : "OrdersTab" }	// BUT, if we did want to get a handle to the grid control at some point this would allow us to use "this.getOrders()" to get the grid panel.

    ],


    init: function() {
        wccConsoleLog('Initialized Orders Tab Panel Navigation Controller!');
        this.control({
            'OrdersTab':{
                collapse: this.collapseCombo
            },
			"OrdersTab button[text=\"Refresh\"]" : {
				click : this.HandleRefresh
			}
        });
    },

	HandleRefresh : function( button, evt, eOpts ) {
		var theStore = Ext.getStore("OrdersStore");
		theStore.removeAll(true);
		theStore.load();
	},

    collapseCombo: function(picker, eOpts){
        alert(picker.getValue());
    },
	LoadStore : function() {
		var theStore = Ext.getStore("OrdersStore");
		theStore.groupField = "Patient_ID";
		theStore.load();
	},
	

SaveChanges : function(button, event, eOpts) {
		var win = button.up("window");
		var form = win.down("form");
		var record = form.getRecord();
		var values = form.getValues();
		record.set(values);
		win.close();
                alert("here");
		
			var Template_ID = this.application.templateID().getValue();;
			var Order_Status = this.application.orderstatus().getValue();;
			var Drug_Name = this.application.drug().getValue();;
			var Patient_ID = this.application.patientID().getValue();;
			var type = this.application.type().getValue();;
			var route = this.application.route().getValue();;
			var orderid = this.application.orderid().getValue();;
			var Last_Name = this.application.Last_Name().getValue();;

		var saveCfg = { scope : this, callback : function( records, operation, success ) {
			
			var Template_ID = this.application.templateID().getValue();;
			var Order_Status = this.application.orderstatus().getValue();;
			var Drug_Name = this.application.drug().getValue();;
			var Patient_ID = this.application.patientID().getValue();;
			var type = this.application.type().getValue();;
			var route = this.application.route().getValue();;
			var orderid = this.application.orderid().getValue();;
			var Last_Name = this.application.Last_Name().getValue();;

		}};
		record.save(saveCfg);
	}
	
 });

Ext.define('COMS.store.ND_Treatment', {
	extend : 'Ext.data.Store',
	model : Ext.COMSModels.ND_Treatment,
	groupField : "typeOrder"
});
// Loading Error - NursingDocs_TreatmentTab - Error - TreatmentTab.js - 89Patient is undefined
//	init: function () {
//	AuthenticateUser : function (button)
//	abSignHandler : function(grid, rowIndex, colIndex)
//	CellEditCommit : function (editor, eObj)
//	CellEdit : function (plugin, eObj, beforeEdit)
//	LoadPreviousTreatmentData : function()
//	ClearTabData : function( )
//	TabRendered : function ( component, eOpts )
//	BtnClicked : function (button)

/*jslint undef: true, debug: true, sloppy: true, vars: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
Ext.define("COMS.controller.NewPlan.CTOS.NursingDocs.TreatmentTab", {
	extend: "Ext.app.Controller",

	stores: [
		"ND_Treatment"
	],
	views : [
		"NewPlan.CTOS.NursingDocs.Authenticate"
	],

	refs: [
	    { ref: "CTOS", selector: "NewPlanTab CTOS" },
		{ ref : "NursingDocsTabSet", selector : "NursingDocs" },
		{ ref : "ND_T_Tab", selector : "NursingDocs_Treatment" },
		{ ref : "ND_T_T_Warning", selector : "NursingDocs_Treatment [name=\"ND_T_T_Warning\"]" },
		{ ref : "ND_T_T_Regimen", selector : "NursingDocs_Treatment [name=\"ND_T_T_Regimen\"]" },
		{ ref : "ND_T_T_Cycle", selector : "NursingDocs_Treatment [name=\"ND_T_T_Cycle\"]" },
		{ ref : "ND_T_T_Day", selector : "NursingDocs_Treatment [name=\"ND_T_T_Day\"]" },
		{ ref : "ND_T_T_Date", selector : "NursingDocs_Treatment [name=\"ND_T_T_Date\"]" },
		{ ref : "ND_T_Meds", selector : "NursingDocs_Treatment [name=\"ND_T_Meds\"]" },
		{ ref : "NursingDocs_Treatment_Meds", selector : "NursingDocs_Treatment_Meds" },		// Meds Grid in Treatment
		{ ref : "NursingDocs_Treatment_MedsView", selector : "NursingDocs_Treatment_Meds > tableview" },		// Meds Grid in Treatment
		{ ref : "TreatmentCompleteBtn", selector : "NursingDocs_Treatment button[text=\"Treatment Complete\"]"}
	],


	// Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Treatment Complete\"]")[0].el.dom
	init: function () {
		wccConsoleLog("Initialized Nursing Docs Treatment Tab Controller!");
		this.application.on({ 
				PopulateNDTabs : this.TabRendered,		// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				// SignTreatment : this.abSignHandler,		// Event is fired off from the Treatment Tab "Sign" action button.
				scope : this 
		});

		this.control({
			"NursingDocs_Treatment" : { afterrender : this.TabRendered },

			"NursingDocs_Treatment_Meds" : { // Handles the Cell Edit (both start and end of edit cycle.
				cellclick : this.AssignVerify2SignHandler6,
				beforeedit : this.CellEdit,	// Start Cell Editing
				edit : this.CellEditCommit,	// Cell Editing finished
				scope : this
			},
			"NursingDocs_Treatment button[name=\"btnPreMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPOMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnIVMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnPostMed\"]" : { click : this.BtnClicked },
			"NursingDocs_Treatment button[name=\"btnHydration\"]" : { click : this.BtnClicked },

            "Authenticate[title=\"Authenticate\"] button[action=\"save\"]": {
                click: this.AuthenticateUser
            },
			"NursingDocs_Treatment button[text=\"Treatment Complete\"]" : { click : this.TreatmentCompleteClicked }


		});
	},


	TreatmentStore : null,
	TreatmentRecords : [],
	curTreatmentRecord : null,



	AssignVerify2SignHandler6 : function(tableView, cellElement, cellIdx, record, rowElement, rowIndex, evt, opts) {		// 		<-- MWB - 7/4/2012 - Assignment is done as part of the renderer for the grid
		if (cellElement.innerHTML.search("Sign to Verify") > 0) {
			var StartTime = record.get("StartTime");
			if ("" === StartTime) {
				alert("You MUST specify at least a \"Start Time\" for this treatment");
			}
			else {
				this.curTreatmentRecord = record;
				record.set("Treatment_User", "In Process...");
					// Prompt user and issue AJAX call to verify their credentials and save this record if credentials verified.
				var EditRecordWin = Ext.widget("Authenticate");
			}
		}
	},


	AuthenticateUser : function (button) {
		this.SignRecordBtn = button;
		button.hide();
        this.application.loadMask("Authenticating digital signature");
		var win = button.up('window');
        var form = win.down('form');
        var values = form.getValues();
		var SignData = window.SessionUser + " - " + Ext.Date.format(new Date(), "m/d/Y - g:i a");

		this.curTreatmentRecord.set("AccessCode", values.AccessCode);
		this.curTreatmentRecord.set("User", values.AccessCode);
		this.curTreatmentRecord.set("VerifyCode", values.VerifyCode);
		this.curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);

		Ext.Ajax.request({
			scope : this,
			url: "/Session/Authenticate?Access=" + values.AccessCode + "&Verify=" + values.VerifyCode,
			success: function( response, opts ){
				this.application.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success && "Not a Valid Access Code" !== response.records) {
					this.curTreatmentRecord.set("Treatment_User", this.curTreatmentRecord.get("AccessCode"));
					this.curTreatmentRecord.set("Treatment_Date", Ext.Date.format(new Date(), "m/d/Y - g:i a"));

					win.close();
			        this.application.loadMask("Saving record of changes");
					// POST Changed data row back to server then upon successful posting of the data...
					this.curTreatmentRecord.save({
						scope : this,
						callback : function(record, operation) {
							this.application.unMask();
							if (operation.success) {
							}
							else {
								alert("Treatment Record Save failed... unknown reason");
							}
						}
					});
					this.curTreatmentRecord = null;
				}
				else {
					alert("Authentication failed! Please click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
					this.SignRecordBtn.show();
				}
			},
			failure : function( response, opts ) {
				this.application.unMask();
				alert("Authentication failed! \n\nPlease click the \"Sign to Verify\" button again and enter your proper Access and Verify Codes");
				this.SignRecordBtn.show();
			}
		});
	},

	CellEditCommit : function (editor, eObj) {
		var theRecord = eObj.record;
		var theStore = eObj.grid.getStore();
		var newValue = eObj.value;
		var oldValue = eObj.originalValue;
		var rowIndex = eObj.rowIdx;
		var Cycle = eObj.record.get("CourseNum");

		if (null === this.curTreatmentRecord) {
			this.TreatmentStore = eObj.grid.getStore();
			this.curTreatmentRecord = eObj.record;		// this.TreatmentStore.getAt(rowIndex);
			this.curTreatmentRecord.set("TreatmentID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("PAT_ID", this.application.Patient.PAT_ID);
			this.curTreatmentRecord.set("rowIdx", rowIndex);
		}

		if ("StartTime" === eObj.field || "EndTime" === eObj.field) {
			var eObjValue1 = Ext.Date.format( eObj.value, "h:i A");
			eObj.value = Ext.Date.format( eObj.value, "h:i A");
		}

		this.curTreatmentRecord.set(eObj.field + "_originalValue", eObj.originalValue);
		this.curTreatmentRecord.set(eObj.field, eObj.value);
		this.curTreatmentRecord.set("Cycle", Cycle);		// MWB - 6/17/2012 - Carry over from CourseNum from Orders data
		return true;
	},


	CellEdit : function (plugin, eObj, beforeEdit) {
		if ("" === eObj.record.get("Treatment_User")) {
			return true;		// This record hasn't been signed so it is editable
		}
		return false;	// Can't edit record that's been signed.
/****
		if ("" !== eObj.record.get("StartTime")) {		// if we have a start time then this record has been edited and saved, so it can't be edited again
			return false;
		};
		return true;
 ****/
	},

	LoadPreviousTreatmentData : function() {
		var Patient = this.application.Patient;
		var PAT_ID = Patient.PAT_ID;
		
		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.ReadND_Treatment + "/" + PAT_ID,
			success: function( response, opts ){
				var obj = Ext.decode(response.responseText);
				var TreatmentHistoryRecords = obj.records;
				this.application.Patient.TreatmentHistory = TreatmentHistoryRecords;			// Treatment History (all days)
				// Note: record.Treatment_User === The person who signed the treatment record.

				var treatmentStore = this.application.Patient.TreatmentStore;

				// Now that we have the store of todays records (treatmentStore)
				// We need to compare each store record with each of the TreatmentHistory records (TreatmentHistoryRecords)
				// to find matches and then ensure that the treatmentStore records are updated with the TreatmentHistory records

				var MatchingRecord, i, aRec, len = TreatmentHistoryRecords.length;
				for (i = 0; i < len; i++) {
					aRec = TreatmentHistoryRecords[i];
					this.Record2Find = aRec;
					MatchingRecord = treatmentStore.findBy(function (record, id) {
							var cmpRecord = this.Record2Find;
							var cAdminDate = cmpRecord.AdminDate;
							var cDrug = cmpRecord.Drug;
							var cType = cmpRecord.Type;

							var adminDate = record.get("adminDate");
							var drug = record.get("drug");
							var type = record.get("type");

							if (cAdminDate == adminDate && cDrug == drug && cType == type) {
								return true;
							}
							return false;
						},
						this
					);
					if (MatchingRecord >= 0) {
						var tsRecord = treatmentStore.getAt(MatchingRecord);
						tsRecord.set("StartTime", aRec.StartTime);
						tsRecord.set("PAT_ID", aRec.PAT_ID);
						tsRecord.set("Treatment_User", aRec.Treatment_User);
						tsRecord.set("Treatment_Date", aRec.Treatment_Date);
					}
				}
			},
			failure : function( response, opts ) {
				alert("Treatment Information failed to load");
			}
		});
	},

	LoadTreatmentStore : function() {
		var Patient = this.application.Patient;
		var theStore = Ext.getStore("ND_Treatment");

		var re = new RegExp(Patient.id);
		var today = Ext.Date.format( new Date(), "m/d/Y");
		var reDate = new RegExp(today);
		var reDispensed = new RegExp("Dispensed");

		theStore.clearFilter(true);
		theStore.filter([
			{property: "patientID", value: re}
			,{property: "adminDate", value: reDate}
			,{property: "orderstatus", value: reDispensed}
		]);

        this.application.loadMask("Loading Treatment Information");
		theStore.load({
			scope : this,
			callback: function(records,operation,success){
				this.application.unMask();
				if(success){
					var theStore = Ext.getStore("ND_Treatment");
					// alert(theStore.data.items.length);

					this.application.Patient.TreatmentStore = theStore;	// The store containing all the records for today's treatment
					this.LoadPreviousTreatmentData();
				}
				else {
					alert("Treatment Grid store failed to load");
				}
			}
		});
	},


	ClearTabData : function( ) {
		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
		try {
			var thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			if (!thisCtl.getND_T_Tab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}

			var theTreatmentGrid = Ext.ComponentQuery.query("NursingDocs_Treatment [name=\"AdministeredMedsGrid\"]")[0];
			var Patient = this.application.Patient;
			if (theTreatmentGrid && theTreatmentGrid.rendered && "" !== Patient.PAT_ID) {
				this.LoadTreatmentStore();
			}
		}
		catch (e) {
			alert("Loading Error - NursingDocs_TreatmentTab - Error - TreatmentTab.js - ClearTabData() " + e.message );
		}
	},


	TabRendered : function ( component, eOpts ) {
		wccConsoleLog("Nursing Docs Treatment Tab Rendered");
		var Patient = this.application.Patient;
		var thisCtl;
		try {
			thisCtl = this.getController("NewPlan.CTOS.NursingDocs.TreatmentTab");
			if (!thisCtl.getND_T_Tab().rendered) {
				return;		// Traps possible call from the PopulateNDTabs event
			}
		}
		catch (e) {
			alert("Loading Error - Nursing Docs Treatment Tab Render() - Error - " + e.message );
			return;
		}

		this.ThisAdminDay = this.getController("NewPlan.OEM").IsDayAnAdminDay( Ext.Date.format( new Date(), "m/d/Y") );
		var ThisAdminDay = this.ThisAdminDay;
		var theMeds, MedsLen, newMeds, i, aMed, Dose, Dose1, Dose2, am1, am2;


		var tcBtns = Ext.ComponentQuery.query("NursingDocs_Treatment button[text=\"Treatment Complete\"]");
		if (ThisAdminDay) {
			tcBtns[0].show();
			tcBtns[1].show();
		}
		else {
			tcBtns[0].hide();
			tcBtns[1].hide();
		}

		var theTreatmentGrid = Ext.ComponentQuery.query("NursingDocs_Treatment [name=\"AdministeredMedsGrid\"]")[0];
		if (theTreatmentGrid && theTreatmentGrid.rendered) {
			// Never gets to this point...
			this.ClearTabData();
		}
	},

	BtnClicked : function (button) {
		var PatientInfo = this.application.Patient;
		var ThisAdminDay = this.ThisAdminDay;
		
		var EditRecordWin = Ext.widget("EditNursingDocs_Treatment");

		var title, theMedList, ComboStore, theMeds, MedsLen, Records, ComboStoreIndex = 0;

		switch( button.name ) {
			case "btnPreMed":
				title = "Edit Pre Medication";
				theMeds = ThisAdminDay.PreTherapy;
			break;
			case "btnPOMed":
				title = "Edit PO Medication";
			break;
			case "btnIVMed":
				title = "Edit IV/SQ/IM Medication";
				theMeds = ThisAdminDay.Therapy;
			break;
			case "btnPostMed":
				title = "Edit Post Medication";
				theMeds = ThisAdminDay.PostTherapy;
			break;
			case "btnHydration":
				title = "Edit Hydration Meds";
			break;
			default : 
				title = "Unknown Button Clicked";
			break;
		}

		EditRecordWin.setTitle(title);

		theMedList = Ext.ComponentQuery.query("EditNursingDocs_Treatment form combobox[name=\"Med\"]")[0];
		ComboStore = theMedList.getStore();
		ComboStore.removeAll();
		ComboStore.add(theMeds);

	},

	TreatmentCompleteClicked : function (button) {
		Ext.Msg.show({
			title:"Treatment Complete?",
			msg: "Are you finished documenting administration of medications for this patient?",
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			callback: function(btn, text){
				if ("yes" === btn) {
					alert("Treatment is complete");
				}
				else {
					alert("Treatment is NOT complete");
				}
			}
		});
	}
});



// Don't include a controller here until it's included in the "controllers" array in the Ext.application() below.
// Controllers must be included here if a store is used in the view managed by the controller
Ext.require([
	// Require loading of all models to prevent the occasional "me.model is null" error
	Ext.COMSModels.Allergies,
	Ext.COMSModels.GenericLookup,
	Ext.COMSModels.CycleLengthMax,
	Ext.COMSModels.Template,
	Ext.COMSModels.Templates,
	Ext.COMSModels.TemplateSources,
	Ext.COMSModels.CycleLengthStore,
	Ext.COMSModels.DiseaseType,
	Ext.COMSModels.DiseaseStage,
	Ext.COMSModels.TimeFrameUnit,
	Ext.COMSModels.TotalCoursesMax,
	Ext.COMSModels.EmotegenicLevel,
	Ext.COMSModels.FebrileNeutropeniaRisk,
	Ext.COMSModels.References,
	Ext.COMSModels.LUReferences,
	Ext.COMSModels.LookupTable,
	Ext.COMSModels.Hydration,
	Ext.COMSModels.Drugs,
	Ext.COMSModels.DrugUnits,
	Ext.COMSModels.DrugRegimen,
	Ext.COMSModels.Infusion,
	Ext.COMSModels.CTOS_References,
	Ext.COMSModels.Med,
	Ext.COMSModels.MHMedInfusion,
	Ext.COMSModels.MHMed,
	Ext.COMSModels.PatientTemplates,
	Ext.COMSModels.CTOS,
	Ext.COMSModels.OEMRecords,		// MWB - 21 Feb 2012 - OEM Records Model
	Ext.COMSModels.Edit_OEMRecord,	// MWB - 05 Mar 2012
	Ext.COMSModels.ChemoHistory,
	Ext.COMSModels.LabInfo,
	Ext.COMSModels.PatientHistory,
	Ext.COMSModels.PatientInfo,
	Ext.COMSModels.PatientInfoMDWS,
	Ext.COMSModels.RadiationHistory,
	Ext.COMSModels.ND_Assessment,		// MWB - 22 Feb 2012
	Ext.COMSModels.ND_GenInfo,			// MWB - 22 Feb 2012
	Ext.COMSModels.ND_CTCAE_SOC,			// MWB - 27 Feb 2012
	Ext.COMSModels.ND_CTCAE_Data,			// MWB - 27 Feb 2012
	Ext.COMSModels.MDWs,
	Ext.COMSModels.Vitals,
	Ext.COMSModels.GlobalsTable,
	Ext.COMSModels.GlobalLookupModel,
	Ext.COMSModels.UsersTable,
	Ext.COMSModels.ActiveWorkflowsTable,
	Ext.COMSModels.MedsNonRoundedTable,
	Ext.COMSModels.OrdersTable,
	Ext.COMSModels.Flowsheet,
		// INLINE FOR TESTING: Ext.COMSModels.Messages,

	"COMS.controller.Navigation",
	"COMS.controller.NewPlan.NewPlanTab",
	"COMS.controller.Orders.OrdersTab",
	"COMS.controller.Authoring.AuthoringTab",
	"COMS.controller.Authoring.DrugRegimen",
	"COMS.controller.Authoring.Hydration",
	"COMS.controller.Management.AdminTab",
	"COMS.controller.NewPlan.OEM",
	"COMS.controller.NewPlan.PatientInfoTable",
	"COMS.controller.NewPlan.OEM_Edit",
	"COMS.controller.NewPlan.CTOS.FlowSheetTab",
	"COMS.controller.NewPlan.CTOS.ChronologyTab",
	"COMS.controller.NewPlan.CTOS.PatientSummaryTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.NursingDocs",
	"COMS.controller.NewPlan.CTOS.NursingDocs.GenInfoTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.AssessmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.PreTreatmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.TreatmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.React_AssessTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.EducationTab",
	"COMS.controller.Messages.MessagesTab",
	"COMS.controller.NewPlan.EndTreatmentSummary",
	"COMS.controller.NewPlan.ViewEndTreatmentSummary"


]);

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
	Ext.Amputations["Upper Left Arm"] = { BSA : 6 };
	Ext.Amputations["Upper Right Arm"] = { BSA : 6 };

	Ext.Amputations["Lower Left Arm"] = { BSA : 4 };
	Ext.Amputations["Lower Right Arm"] = { BSA : 4 };

	Ext.Amputations["Left Hand and Fingers"] = { BSA : 3 };
	Ext.Amputations["Right Hand and Fingers"] = { BSA : 3 };

	Ext.Amputations["Left Thigh"] = { BSA : 12 };
	Ext.Amputations["Right Thigh"] = { BSA : 12 };

	Ext.Amputations["Lower Left Leg"] = { BSA : 6 };
	Ext.Amputations["Lower Right Leg"] = { BSA : 6 };

	Ext.Amputations["Left Foot"] = { BSA : 3 };
	Ext.Amputations["Right Foot"] = { BSA : 3 };


	Ext.PostTemplateProcessing = function(mod, values, parent) {
		// console.log("Post Template Processing - " + mod);
//		debugger;
	};


	Ext.GeneralRounding2Digits = function(n) {
		return Math.round(n * 100) / 100;
	};

	Ext.In2Meters = function(h) {
		return Math.round((0.0254 * h) * 100) / 100;
	};

	Ext.In2CM = function(h) {
		return Math.round((2.54 * h) * 100) / 100;
	};

	Ext.Pounds2Kilos = function(w) {
		return Math.round((0.45359237 * w) * 100) / 100;
	};

	Ext.HeightSquared = function(h) {
		return Math.pow(h, 2);
	};

	Ext.WeightSquared = function(w) {
		// WeightInKilos = Math.round((0.45359237 * w) * 100) / 100;
		return Math.pow(w, 2);
	};

	Ext.IdealWeight = function(h, g) {	// Height in Inches
		if (h < 60) {
			h = 60;
		}
		var IdealWeight = ((h - 60) * 2.3) + 45.5;	// in KG
		if ("M" === g) {
			IdealWeight = ((h - 60) * 2.3) + 50;
		}
		return (IdealWeight);
	};

	Ext.AdjustedWeight = function(w, h, g) {	// Height in Inches, weight in pounds
		var WeightInKilos = Ext.Pounds2Kilos(w);
		var IdealWeight = Ext.IdealWeight(h, g);
		return ((WeightInKilos - IdealWeight) * 0.4) + IdealWeight;
	};

	Ext.LeanWeight = function(w, h, g) {	// Height in Inches, weight in pounds
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
		LeanWeight = Math.round(LeanWeight * 100) / 100;
		return LeanWeight;
	};



















	Ext.ShowAUCCalcs = function(PatientInfo, saveCalc, Dose, calcDose) {
			var temp = Ext.apply(PatientInfo, {dose : Dose, calcDose : calcDose});

			var html = new Ext.XTemplate(
			"<table class=\"InformationTable\" border=\"1\">",
			"<tr><th>Age:</th><td>{Age}</td></tr>",
			"<tr><th>Weight</th><td>{Weight} lbs{[this.WeightInKG(values)]}</td></tr>",
			"<tr><th>Gender</th><td>{Gender}</td></tr>",
			"<tr><th>Serum&nbsp;Creatinine</th><td>{[this.Serum(values)]}</td></tr>",
			"<tr><th>AUC</th><td>{[this.AUC(values)]}</td></tr>",
			"{[this.calcGFR(values)]}",
			"</table>",
			{
				// XTemplate Configuration
				disableFormats: true,
				HeightInCM : function (x) {
					if ("" === x.Height) {
						return("");
					}
					var x1 = Ext.In2CM(x.Height);
					return (" = " + x1 + " cm");
				},

				WeightInKG : function(x) {
					if ("" === x.Weight) {
						return("");
					}
					var x1 = Ext.Pounds2Kilos(x.Weight);
					return (" = " + x1 + " kg");
				},

				Serum : function(x) {
					var sc = x.SerumCreatinine || 1;
					return sc;
				},
				AUC : function(x) {
					var auc = x.dose.split(" ")[0];
					return auc;
				},



				calcGFR : function (x) {
					var gender = x.Gender;
					var kg = Ext.Pounds2Kilos(x.Weight);
					var dose = x.dose.split(" ")[0];
					var sc = x.SerumCreatinine || 1;
					var AUC = x.dose.split(" ")[0];
					var age = x.Age;
					var GFR = (140 - age) * kg;
					if ("F" === gender) {
						GFR = GFR * 0.85;
					}
					GFR = Ext.GeneralRounding2Digits(GFR / (72 * sc));
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
									"<td style='text-align: left;'>" +  GFR + "</td>" +
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

		var newFormula = html.applyTemplate( temp );
		return newFormula;
	};

	Ext.ShowBSACalcs = function(PatientInfo, saveCalc, Dose, calcDose) {
		// Dose is the original dosage (e.g. 15 mg/m2)
		// calcDose is the calculated dosage based on Dosage Units and various formula (e.g. 15mg, if the BSA is 1 in the above example)
		// Dose, calcDose and calcDoseUnits are passed by the HandleOEMCalcDoseButtons() in the OEM.js controller
		var temp = PatientInfo;


		if (Dose && Dose.search("AUC") >= 0) {
			return Ext.ShowAUCCalcs(PatientInfo, saveCalc, Dose, calcDose);
		}

		if ("" === temp.BSA_Method) {
			temp.Formula = "";
			temp.PatientInfo_BSA = "";
		}
		else {
			temp.Formula = Ext.BSA_Formulas[PatientInfo.BSA_Method];
			PatientInfo.BSA_Weight = Ext.BSAWeight(PatientInfo);
			temp.PatientInfo_BSA = PatientInfo.BSA;
		}

		delete temp.Dose;
		delete temp.calcDose;
		if (calcDose && Dose) {
			temp.Dose = Dose;
			temp.calcDose = calcDose;
		}

		switch(PatientInfo.BSA_Method) {
			case "Capped" :
				break;

			case "DuBois" :
				temp.PatientInfo_BSA = Ext.BSA_DuBois(PatientInfo.Height, PatientInfo.BSA_Weight);
				break;

			case "Mosteller" :
				temp.PatientInfo_BSA = Ext.BSA_Mosteller(PatientInfo.Height, PatientInfo.BSA_Weight);
				break;

			case "Haycock" :
				temp.PatientInfo_BSA = Ext.BSA_Haycock(PatientInfo.Height, PatientInfo.BSA_Weight);
				break;

			case "Gehan and George" :
				temp.Formula = Ext.BSA_Formulas.Gehan_George;
				temp.PatientInfo_BSA = Ext.BSA_Gehan_George(PatientInfo.Height, PatientInfo.BSA_Weight);
				break;

			case "Boyd" :
				temp.PatientInfo_BSA = Ext.BSA_Boyd(PatientInfo.Height, PatientInfo.BSA_Weight);
				break;
		}

		switch(PatientInfo.WeightFormula) {
			case "Ideal Weight" :
				if ("M" === PatientInfo.Gender) {
					temp.WF = Ext.BSA_Formulas.IdealWeightM;
				}
				else {
					temp.WF = Ext.BSA_Formulas.IdealWeightF;
				}
				break;
			case "Adjusted Weight" :
				temp.WF = Ext.BSA_Formulas.AdjustedWeight;
				break;
			case "Lean Weight" :
				if ("M" === PatientInfo.Gender) {
					temp.WF = Ext.BSA_Formulas.LeanWeightM;
				}
				else {
					temp.WF = Ext.BSA_Formulas.LeanWeightF;
				}
				break;
			default :
				temp.WF = "Weight in KG";
				break;
		}


		var html = new Ext.XTemplate(
			"<table class=\"InformationTable\" border=\"1\">",
			"<tr><th>Height:</th><td>{Height} in{[this.HeightInCM(values)]}</td></tr>",
			"<tr><th>Weight</th><td>{Weight} lbs{[this.WeightInKG(values)]}</td></tr>",
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
				"<tr><th>Dose</th><td>{[this.finalBSA(values)]} * {Dose} = {calcDose}</td></tr>",
			"</tpl>",
			"</table>",
			{
				// XTemplate Configuration
				disableFormats: true,
				// locPatient : "",
				HeightInCM : function (x) {
					if ("" === x.Height) {
						return("");
					}
					var x1 = Ext.In2CM(x.Height);
					return (" = " + x1 + " cm");
				},

				WeightInKG : function(x) {
					if ("" === x.Weight) {
						return("");
					}
					var x1 = Ext.Pounds2Kilos(x.Weight);
					return (" = " + x1 + " kg");
				},
				HasAmputations : function(x) {
					if (0 === x.Amputations.length) {
						return false;
					}
					return true;
				},

				NoAmputations : function(x) {
					if (0 === x.Amputations.length) {
						return true;
					}
					return false;
				},
				BSAReduction : function(values, parent) {
					if ("" !== values.description) {
						var y = values.description;
						var x = Ext.Amputations;
						var z = x[y];
						if (parent.BSA_Reduction) {
							parent.BSA_Reduction += z.BSA;
						}
						else {
							parent.BSA_Reduction = z.BSA;
						}

						return " - Reduce BSA by " + z.BSA + " %";
					}
					return "None Identified";
				},
				dspWeightFormula : function(x) {
					var tmp = "";
					if ("" === x.WeightFormula) {
						return("&nbsp;");
					}
					var x1, WeightInKilos, HeightInMeters, tmp1;
					x1 = Ext.Pounds2Kilos(x.Weight);
					WeightInKilos = Ext.Pounds2Kilos(x.Weight);
					HeightInMeters = Ext.In2Meters(x.Height);

					tmp1 = x1 + " kg";
					var xtramsg = ((x.Height < 60)? (" Min Ideal Weight = " + (("M" === x.Gender)? "50" : "45.5")) : "");
					switch(x.WeightFormula) {
						case "Ideal Weight" :
							x1 = Ext.IdealWeight(x.Height, x.Gender);
							tmp1 = ("((" + x.Height + " - 60) * 2.3) + " + ("M" === x.Gender? "50" : "45.5"));
							tmp1 += " = " + x1 + " kg";
							// console.log("Calculating " + x.WeightFormula + " - " + x1);
							break;
						case "Adjusted Weight" :
							x1 = Ext.AdjustedWeight(x.Weight, x.Height, x.Gender);
							tmp1 = ("((" + x.Weight + " - " + Ext.IdealWeight(x.Height, x.Gender) + ") * 0.4) + " + Ext.IdealWeight(x.Height, x.Gender));
							tmp1 += " = " + x1 + " kg";
							//console.log("Calculating " + x.WeightFormula + " - " + x1);
							break;
						case "Lean Weight" :
							x1 = Ext.LeanWeight(x.Weight, x.Height, x.Gender);
							tmp1 = ("(" + ("M" === x.Gender? "1.1" : "1.07") + " * " + WeightInKilos + ") - " + ("M" === x.Gender? "128" : "148") + " * (" + WeightInKilos + "<sup>2</sup> / 100 * " + (2.54 * HeightInMeters) + "<sup>2</sup>))");
							tmp1 += " = " + x1 + " kg";
							//console.log("Calculating " + x.WeightFormula + " - " + x1);
							break;
					}

					tmp += x.WeightFormula + "</td></tr>";				// The name of the Weight Method used (e.g. Actual, Ideal, Adjusted, etc).
					tmp += "<tr><th>&nbsp;</th><td>= " + x.WF + " = " + x1 + " kg</td></tr>";		// The string for calculating the weight as well as the result of the calculation
					tmp += "<tr><th>&nbsp;</th><td>= " + tmp1 + xtramsg;		// The details of the calculation as well as the result.
					//console.log("BSA_Weight - " + x1);
					x.BSA_Weight = x1;
//					this.locPatient.BSA_Weight = x.BSA_Weight;	//??????????????????????
					return ("= " + tmp);
				},



				showBSACalc : function(x) {
					var strFormula, BSA_Value;
					if ("" === x.BSA_Method) {
						return "";
					}

					var HInMeters = Ext.In2Meters(x.Height);
					var WInKg = Ext.Pounds2Kilos(x.Weight);
					BSA_Value = x.BSA;
					x.BSA_NoReduction = "";		// Original Calculated BSA w/o reduction due to amputations;
					switch(x.BSA_Method) {
						case "DuBois" :
							strFormula = ("= 0.20247 * " + HInMeters + "<sup>0.725</sup> * " + x.BSA_Weight + "<sup>0.425</sup>");
							BSA_Value = Ext.BSA_DuBois(HInMeters, x.BSA_Weight);
							break;

						case "Mosteller" :
							strFormula = ("= <span style=\"white-space: nowrap; font-size:larger\">&radic;<span style=\"text-decoration:overline;\">&nbsp;(" + Ext.In2CM(x.Height) + " * " + x.BSA_Weight + ")/3600 &nbsp;</span></span>");
							BSA_Value = Ext.BSA_Mosteller(HInMeters, x.BSA_Weight);
							break;

						case "Haycock" :
							strFormula = ("= 0.024265 * " + Ext.In2CM(x.Height) + "<sup>0.3964</sup> * " + x.BSA_Weight + "<sup>0.5378</sup>");
							BSA_Value = Ext.BSA_Haycock(HInMeters, x.BSA_Weight);
							break;

						case "Gehan and George" :
							strFormula = ("= 0.0235 * " + Ext.In2CM(x.Height) + "<sup>0.42246</sup> * " + x.BSA_Weight + "<sup>0.51456</sup>");
							BSA_Value = Ext.BSA_Gehan_George(HInMeters, x.BSA_Weight);
							break;

						case "Boyd" :
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
		var y, z;
		for (i = 0; i < pAmpu.length; i++) {
			y = pAmpu[i].description;
			z = AmpuList[y];
			if (0 !== Reduction) {
				Reduction += z.BSA;
			}
			else {
				Reduction = z.BSA;
			}
		}


		var tmp2 = ((BSA_Value * Reduction) / 100);
		tmp2 = Math.round(tmp2 * 100) / 100;
		var Final = (BSA_Value - tmp2);
		Final = Math.round(Final * 100) / 100;
		AmpuReduction = " - " + Reduction + "% (due to Amputations) = " + Final;
	}



















					x.BSA_NoReduction = BSA_Value;		// Original Calculated BSA w/o reduction due to amputations;
					var buf = "<tr><th>&nbsp;</th><td>" + strFormula + " = " + BSA_Value + AmpuReduction + " m<sup>2</sup></td></tr>";
					return (buf);
				},


				finalBSA : function(v) {
					return ("= " + Ext.BSA_Calc(v) + " m<sup>2</sup>");
				}
			}
		);

		var newFormula = html.applyTemplate( temp );

		if (saveCalc) {
			PatientInfo.BSA = temp.BSA;
			PatientInfo.BSA_Weight = temp.BSA_Weight;
		}

		return newFormula;
	};


















	Ext.BSAWeight = function(PatientInfo) {	// Returns weight in Kilos
		// var h = Ext.In2Meters(PatientInfo.Height);	// Height (in Metres)
		var h = PatientInfo.Height;	// Height (in Inches)
		var w = PatientInfo.Weight;		// Ext.Pounds2Kilos(PatientInfo.Weight);
		var t = PatientInfo.BSA_Method;				// BSA Method (string)
		var g = PatientInfo.Gender;					// Gender (M/F)
		var	CalcWeight = w;

		switch(PatientInfo.WeightFormula) {
			case "Actual Weight" :
				CalcWeight = Ext.Pounds2Kilos(w);
				break;

			case "Ideal Weight" :
				CalcWeight = Ext.IdealWeight(h, g);		// Height in Inches
				break;

			case "Adjusted Weight" :
				CalcWeight = Ext.AdjustedWeight(w, h, g);	// Weight in pounds, Height in Inches
				break;

			case "Lean Weight" :
				CalcWeight = Ext.LeanWeight(w, h, g);	// Weight in pounds, Height in Inches
				break;
		}
		CalcWeight = Math.round((CalcWeight * 100) / 100);
		PatientInfo.BSA_Weight = CalcWeight;
		return CalcWeight;
	};

Ext.BSA_Calc = function(PatientInfo) {

	var h = Ext.In2Meters(PatientInfo.Height);	// Height (in Metres)
	var w = Ext.BSAWeight(PatientInfo);

		// PatientInfo.BSA_Weight;				// BSA_Weight (in Kilos)
	var t = PatientInfo.BSA_Method;				// BSA Method (string)
	var g = PatientInfo.Gender;					// Gender (M/F)
	var BaseBSA = "";


	if (0 === h || 0 === w) {
		return ("");
	}

	switch(t) {
		case "Capped" :
			break;

		case "DuBois" :
			BaseBSA = Ext.BSA_DuBois(h, w);
			break;

		case "Mosteller" :
			BaseBSA = Ext.BSA_Mosteller(h, w);
			break;

		case "Haycock" :
			BaseBSA = Ext.BSA_Haycock(h, w);
			break;

		case "Gehan and George" :
			BaseBSA = Ext.BSA_Gehan_George(h, w);
			break;

		case "Boyd" :
			BaseBSA = Ext.BSA_Boyd(h, w);
			break;
	}



	var pAmpu = PatientInfo.Amputations;
	var Final = BaseBSA;
	if ( pAmpu && pAmpu.length > 0) {
		var Reduction = 0;
		var x = Ext.Amputations;
		var y, z;
		for (i = 0; i < pAmpu.length; i++) {
			y = pAmpu[i].description;
			z = x[y];
			if (0 !== Reduction) {
				Reduction += z.BSA;
			}
			else {
				Reduction = z.BSA;
			}
		}

		var tmp = ((BaseBSA * Reduction) / 100);
		var tmp1 = Math.round(tmp * 100) / 100;

		Final = (Final - tmp1);
		Final = Math.round(Final * 100) / 100;
	}

//	PatientInfo.BSA = Final;
	return (Final);		// MWB - 6/27/2012 -
};

Ext.DoseCalc = function(Patient, d, du) {
	// MWB - 7/6/2012 - Note this function is never called as of this date
	// h == Height in inches
	// w == Weight in pounds
	// t == BSA Method (string)
	// g == Gender (M/F)
	// d == Dose
	// du = Dose Units

	var PatientHeight = Patient.Height;
	var PatientWeight = Patient.Weight; // BSA_Weight???
	var PatientBSA_Method = Patient.BSA_Method;
	var PatientBSA = Patient.BSA;
	var PatientGender = Patient.Gender;

// console.log("Return Dose = " + d + " - " + du );

	var ReturnDose = Ext.GeneralRounding2Digits(d) + " " + du;
	if ("AUC" === du.toUpperCase()) {
		// Use Calvert Formula
		// alert("AUC Dosing requires Calvert Formula, Not Yet Available");
		consle.log("AUC Dosing requires Calvert Formula, Not Yet Available - " + d + " = " + du);
	}
	else {
		var x = du.split("/");
		if (x.length > 0) {
			if ("M2" === x[1].toUpperCase()) {	// Use BSA Calculation
				ReturnDose = Ext.GeneralRounding2Digits(d * PatientBSA) + " " + x[0];
			}
			else if ("KG" === x[1].toUpperCase()) {
				ReturnDose = Ext.GeneralRounding2Digits(d * w) + " " + x[0];
			}
			else {
				alert("Unknown Dosage Calculation required - " + du);
			}
		}
	}
	return ReturnDose;
};


Ext.CalcAUCDose = function(Patient, AUC) {
	var age = Patient.Age;
	var gender = Patient.Gender;
	var wt = Patient.Weight;		// in pounds
	var kg = Ext.Pounds2Kilos(wt);
	var sc = Patient.SerumCreatinine || 1;		// fail safe if no SC is available from Lab Results
	AUC = AUC || 1;	// fail safe if no AUC is passed;

	var GFR = (140 - age) * kg;
	if ("F" === gender) {
		GFR = GFR * 0.85;
	}
	GFR = GFR / (72 * sc);
	var Dose = (GFR + 25) * AUC;
	Dose = Ext.GeneralRounding2Digits(Dose);
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

Ext.generic_BSA_Calc = function(h, w, hMultiplier, hPower, wMultiplier, wPower) {
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

		var rBSA = Math.round(BSA * 100) / 100;
		return (rBSA);
	};

Ext.BSA_Mosteller = function (h, w) {	// Height in Meters, Weight in Kg
		if (w <= 0) {	// MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
			w = 1;
		}
		if (h <= 0) {
			h = 1;
		}
		var BSA = Math.sqrt((h * 100 * w) / 3600);
		var rBSA = Math.round(BSA * 100) / 100;
		return (rBSA);
	};

Ext.BSA_DuBois = function (h, w) {	// Height in Meters, Weight in Kg
		if (w <= 0) {	// MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
			w = 1;
		}
		if (h <= 0) {
			h = 1;
		}
		return (this.generic_BSA_Calc(h, w, 0.20247, 0.725, 1, 0.425));
	};

Ext.BSA_Haycock = function (h, w) {	// Height in Meters, Weight in Kg
		if (w <= 0) {	// MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
			w = 1;
		}
		if (h <= 0) {
			h = 1;
		}
		return (this.generic_BSA_Calc(h*100, w, 0.024265, 0.3964, 1, 0.5378));
	};
Ext.BSA_Gehan_George = function (h, w) {	// Height in Meters, Weight in Kg
		if (w <= 0) {	// MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
			w = 1;
		}
		if (h <= 0) {
			h = 1;
		}
		return (this.generic_BSA_Calc(h*100, w, 0.0235, 0.42246, 1, 0.51456));
	};
Ext.BSA_Boyd = function (h, w) {	// Height in Meters, Weight in Kg
		if (w <= 0) {	// MWB - 5/15/2012 - Sanity check if the weight is too low. This could be due to user input error or entering a user who's too short when using ideal weight
			w = 1;
		}
		if (h <= 0) {
			h = 1;
		}
		var BSA = 0.0003207 * Math.pow(h*100,0.3) * Math.pow(w*1000,( 0.7285 - 0.0188 * Math.log(w*1000)/Math.LN10));
		var rBSA = Math.round(BSA * 100) / 100;
		return (rBSA);
	};
	/*************************************************************
	 *
	 *	END BSA Calculations Modules
	 *
	 *************************************************************/

Ext.application({
	name: "COMS",

	controllers: [
		// Include all controllers used in this app here
			        // Each controller must include all the views used by that controller
			        // as part of that controller definition
			        // Controllers must be included here if a store is used in the view managed by the controller
		"Navigation"
		,"NewPlan.NewPlanTab"
		,"Orders.OrdersTab"
		,"Authoring.AuthoringTab"
		,"Authoring.DrugRegimen"
		,"Authoring.Hydration"
		,"Management.AdminTab"	//KD - 12/20/11 - new URI associated with adding data to the lookup table
		,"NewPlan.OEM"		// MWB Added new controller for the OEM Tab
		,"NewPlan.PatientInfoTable" // MWB 31 Jan 2012 - Added new controller for the Patient Information Table
		,"NewPlan.OEM_Edit"			// MWB 09 Feb 2012 - Added for editing an OEM Record
		,"NewPlan.CTOS.FlowSheetTab"
		,"NewPlan.CTOS.ChronologyTab"
		,"NewPlan.CTOS.PatientSummaryTab"
		,"NewPlan.CTOS.NursingDocs.NursingDocs"	// MWB 14 Feb 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.GenInfoTab"	// MWB 14 Feb 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.AssessmentTab"	// MWB 14 Feb 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.PreTreatmentTab"	// MWB 28 Feb 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.TreatmentTab"	// MWB 01 Mar 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.React_AssessTab"	// MWB 01 Mar 2012 - Added for Nursing Documentation Tab
		,"NewPlan.CTOS.NursingDocs.EducationTab"	// MWB 01 Mar 2012 - Added for Nursing Documentation Tab
		,"Messages.MessagesTab"
		,"NewPlan.EndTreatmentSummary"
		,"NewPlan.ViewEndTreatmentSummary"


		// Controllers are not needed to be declared here unless they do something special???
	        //		, "ExistingPlan.ExistingPlanTab"
		//		, "KnowledgeBase.KnowledgeBaseTab"
		//		, "Management.ManagementTab"
	],

	launch: function () {
		wccConsoleLog("Launching Application Base");

		Ext.QuickTips.init();
		Ext.create("Ext.container.Container", {
			id: "AppContainer",
			renderTo: "MainContent",
			layout: "fit",
			items: [
				{
					xtype: "NavigationTabs"
				},
				{
					xtype: "container",
					contentEl: "EndControls"
				}
			]
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
			roundNumber : function (number, decimals) { // Arguments: number to round, number of decimal places
				var n1 = parseFloat(number);
				var n2 = n1.toFixed(parseInt(decimals, 10));
				return (n2);
			},

			in2cm : function( height ) {	// Inches to Centimeters; rounded to 2 decimal places
				return (Ext.roundNumber((height * 2.54), 2));
			},

			lbs2kg : function( weight ) {	// Pounds to Kilograms; rounded to 2 decimal places
				var n1 = weight / 2.2;
				var n2 = Ext.roundNumber(n1, 2);
				return (n2);
			},
			f2C : function( f ) {	// Degrees Farenheight to Celcius; rounded to 1 decimal place
				return (Ext.roundNumber(((5 * (f-32))/9), 1));
			},

			CalcInfusionTime : function (vol, rate, label) {		// Calculate Infusion time in Hrs/Min given Volume and Rate.
				var infTime = vol / rate;
				var Hrs = infTime.toFixed(3);
				var tmp = Hrs.split(".");
				var frac;
				if (tmp.length > 1) {
					Hrs = tmp[0];
					Frac = tmp[1];
				}
				var Min;
				if (infTime > 1) {
					Min = ((infTime - Hrs)*60).toFixed(0);
				}
				else {
					Min = (infTime*60).toFixed(0);
				}
				if (Min > 50) {		// Handle rounding of weird flow rates, should never happen in Real World but does in testing.
					Hrs = 1 + parseInt(Hrs, 10);
					Min = 0;
				}

				var retbuf = Hrs + " / " + Min;
				if (label) {
					retbuf = (Hrs + " hrs / " + Min + " min");
				}
				return (retbuf);
			}
		});
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

