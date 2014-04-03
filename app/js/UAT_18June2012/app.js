// Note: ExtJS bombs when strict mode is applied
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

var MaxTimeoutMinutes = 5;
var MaxTimeoutSec = MaxTimeoutMinutes * 60;
var MaxTimeoutMS = MaxTimeoutSec * 1000;
Ext.override(Ext.data.proxy.Ajax, { timeout:MaxTimeoutMS });
Ext.override(Ext.data.Connection, { timeout: MaxTimeoutMS });
Ext.override(Ext.form.action.Action, { timeout: MaxTimeoutSec });
Ext.Ajax.timeout = MaxTimeoutMS;


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


Ext.URLs.MedHold = "/LookUp/MedHold";
Ext.URLs.RoundingRule = "/LookUp/RoundingRule";
Ext.URLs.SiteConfig = "/LookUp/SiteConfig";


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


Ext.URLs.HoldCancel = "/Patient/HoldCancel";
Ext.URLs.OrderHoldCancel = "/Orders/HoldCancel";
Ext.URLs.OrderStatus = "/Orders/OrderStatus";

Ext.URLs.DiseaseType = "/LookUp/view/DiseaseType";
// No Params,
// Returns list of all Diseases, used in "Select Disease Type" combobox
// Example Usage - https://devtest.dbitpro.com/LookUp/view/DiseaseType

Ext.URLs.TemplateAlias = "/LookUp/view/TemplateAlias";
// No Params,
// Returns list of all Template Aliases (e.g. User Defined Template Name)
// Used to determine duplicate Template by User Name

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



Ext.URLs.PatientTemplates = "/Patient/Templates/";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of all templates which have been applied to a given patient as 2 arrays (current and historical)
// Example Usage (for Patient f0400) - https://mwb.dbitpro.com/Patient/Templates/6855D2FD-27A1-E111-903E-000C2935B86F

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

Ext.URLs.PrintTemplate = "/LookUp/PrintTemplate";
// Param = Template GUID
// Opens a new window showing the specified template as a stand alone page for printing.
// Example Usage - https://mwb.dbitpro.com/LookUp/PrintTemplate/D7356037-A3B5-E111-A560-000C2935B86F


Ext.URLs.Templates = "/LookUp/Templates";
// No Param - Returns list of templates available

Ext.URLs.TemplateList = "/LookUp/Templates";

Ext.URLs.TemplateListByLocation = "/LookUp/Templates/Location";     // Requires LocationID as the last parameter

Ext.URLs.FlagTemplateInactive = "/LookUp/flagTemplateInactive";

Ext.URLs.BaseView = "/LookUp/view";
Ext.URLs.TimeFrameUnit = "/LookUp/view/TimeFrameUnit";
Ext.URLs.TempLoc = "/LookUp/view/TempLoc";
Ext.URLs.DelivMech = "/LookUp/view/DelivMech";


Ext.URLs.EmotegenicLevel_ASCO = "/LookUp/view/Erisk_ASCO";
Ext.URLs.EmotegenicLevel_NCCN = "/LookUp/view/Erisk_NCCN";
Ext.URLs.EmotegenicLevel = "/LookUp/Erisk";




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
Ext.URLs.UpdateCTOS = "/LookUp/updateTemplate/";
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
Ext.COMSModels.FluidType = "COMS.model.LookupTable_FluidType";
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
Ext.COMSModels.TemplateList = "COMS.model.TemplateList";
Ext.COMSModels.TemperatureLocation = "COMS.model.TemperatureLocation";
Ext.COMSModels.DeliveryMechanism = "COMS.model.DeliveryMechanism";

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
	Ext.COMSModels.FluidType,
		// INLINE FOR TESTING: Ext.COMSModels.Messages,

	"COMS.controller.Navigation",
	"COMS.controller.Common.selTemplateByStages",
	"COMS.controller.NewPlan.NewPlanTab",
	"COMS.controller.Orders.OrdersTab",
	"COMS.controller.Authoring.AuthoringTab",
	"COMS.controller.TemplateList.TemplateListTab",
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
//    "COMS.controller.NewPlan.AskQues2ApplyTemplate",
	"COMS.controller.NewPlan.ViewEndTreatmentSummary",
	"COMS.controller.NewPlan.TreatmentDetails"
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
		return +(Math.round(n + "e+" + 1)  + "e-" + 1);
	};

	Ext.In2Meters = function(h) {
		return +(Math.round((0.0254 * h) + "e+" + 1)  + "e-" + 1);
	};

	Ext.In2CM = function(h) {
		return +(Math.round((2.54 * h) + "e+" + 1)  + "e-" + 1);
	};

	Ext.Pounds2Kilos = function(w) {
		return +(Math.round((0.45359237 * w) + "e+" + 1)  + "e-" + 1);
	};

	Ext.HeightSquared = function(h) {
		return Math.pow(h, 2);
	};

	Ext.WeightSquared = function(w) {
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
		LeanWeight = +(Math.round(LeanWeight + "e+" + 1)  + "e-" + 1);
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
		var i, y, z;
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
		tmp2 = +(Math.round(tmp2 + "e+" + 1)  + "e-" + 1);
		var Final = (BSA_Value - tmp2);
		Final = +(Math.round(Final + "e+" + 1)  + "e-" + 1);
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
		CalcWeight = +(Math.round(CalcWeight + "e+" + 1)  + "e-" + 1);
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
		var i, y, z;
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
		var tmp1 = +(Math.round(tmp + "e+" + 1)  + "e-" + 1);

		Final = (Final - tmp1);
		Final = +(Math.round(Final + "e+" + 1)  + "e-" + 1);
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
	if ("AUC" !== du.toUpperCase()) {
		var x = du.split("/");
		if (x.length > 0) {
			if ("M2" === x[1].toUpperCase()) {	// Use BSA Calculation
				ReturnDose = Ext.GeneralRounding2Digits(d * PatientBSA) + " " + x[0];
			}
			else if ("KG" === x[1].toUpperCase()) {
				ReturnDose = Ext.GeneralRounding2Digits(d * PatientWeight) + " " + x[0];
			}
			else {
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

		var rBSA = +(Math.round(BSA + "e+" + 1)  + "e-" + 1);
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
		var rBSA = +(Math.round(BSA + "e+" + 1)  + "e-" + 1);
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
		var rBSA = +(Math.round(BSA + "e+" + 1)  + "e-" + 1);
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
		,"Common.selTemplateByStages"
		,"NewPlan.NewPlanTab"
		,"Orders.OrdersTab"
		,"Authoring.AuthoringTab"
		,"TemplateList.TemplateListTab"
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
//		,"NewPlan.AskQues2ApplyTemplate"
		,"NewPlan.ViewEndTreatmentSummary"
		,"NewPlan.TreatmentDetails"


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
				var Frac;
				if (tmp.length > 1) {
					Hrs = tmp[0];
					Frac = tmp[1];
				}
				var Min = 0;
				if (infTime > 1) {
					Min = ((infTime - Hrs)*60).toFixed(0);
				}
				else if (infTime < 1) {
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

    loadText: "",
    showLoadingMask: function (loadingMessage) {
        if (Ext.isEmpty(loadingMessage)) {
            this.loadText = 'Loading... Please wait';
        }
        //Use the mask function on the Ext.getBody() element to mask the body element during Ajax calls
        Ext.Ajax.on('beforerequest', function(){
//            console.log("Loading"); 
            Ext.getBody().mask(this.loadText, 'loading') ;
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



Ext.define('COMS.Ajax', {
    extend: 'Ext.data.Connection',
    singleton: true,
    onComplete : function(request) {
        var me = this;
        var options = request.options;
        var result = (!request.timedout && request.xhr.status) ? me.parseStatus(request.xhr.status) : null;
        var success = (!request.timedout) ? result.success : null;
        var response;
        if (success) {
            response = me.createResponse(request);
            me.fireEvent('requestcomplete', me, response, options);
            Ext.callback(options.success, options.scope, [response, options]);
        } 
        else {
            if (!result || result.isException || request.aborted || request.timedout) {
                response = me.createException(request);
            }
            else {
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