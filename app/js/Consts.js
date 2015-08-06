/**
 *
 * CONSTANTS FILE
 *
 **/
// Note: ExtJS bombs when strict mode is applied
// Useful functions within the application
/*********** Search for - LIST OF CONTROLLERS 
 **** Controllers ~ 611 & 1751
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
var LockedInfo = null;

Ext.override(Ext.data.proxy.Ajax, {
	timeout: MaxTimeoutMS
});
Ext.override(Ext.data.Connection, {
	timeout: MaxTimeoutMS
});
Ext.override(Ext.form.action.Action, {
	timeout: MaxTimeoutSec
});
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
		// "COMS": theJSPath,
		"Ext.ux": "/libs/ExtJS_4.1.0/examples/ux"
		//		"Ext.ux" : theJSPath + "/ux"	// <--- Comment out line above and UNcomment this line to build deployment version
	}
});



Ext.URLs.Inventory               = "/Reports/Inventory";
Ext.URLs.Lockout                 = "/Patient/Lock";
Ext.URLs.LoadVPR                 = "/Patient/VPR";
Ext.URLs.MedReminders            = "/Patient/MedReminders";
Ext.URLs.PatientDischarge        = "/Patient/DischargeInstructions";
Ext.URLs.DiseaseStaging          = "/LookUp/DiseaseStaging";

Ext.URLs.ClinicInfo              = "/LookUp/ClinicInfo";
Ext.URLs.DischargeInstruction    = "/LookUp/DischargeInstruction";
Ext.URLs.ToxicityInstruction     = "/LookUp/ToxicityInstruction";
Ext.URLs.CumulativeDosingMeds    = "/LookUp/CumulativeDoseMeds";
Ext.URLs.MedRisks                = "/LookUp/MedRisks";
Ext.URLs.TemplateLocation        = "/LookUp/TemplateLocation/";
Ext.URLs.MedDoc                  = "/LookUp/MedDocs";
Ext.URLs.TemplateMedDocs         = "/LookUp/TemplateMedDocs";
Ext.URLs.MedHold                 = "/LookUp/MedHold";
Ext.URLs.RoundingRule            = "/LookUp/RoundingRule";
Ext.URLs.SiteConfig              = "/LookUp/SiteConfig";
Ext.URLs.LookupIVFluidType4Med   = "/LookUp/IVFluidType4Med/";
Ext.URLs.DiseaseType             = "/LookUp/view/DiseaseType";
Ext.URLs.DrugInfo                = "/LookUp/DrugInfo";
// No Params,
// Returns list of all Diseases, used in "Select Disease Type" combobox
// Example Usage - https://devtest.dbitpro.com/LookUp/view/DiseaseType


Ext.URLs.IntelligentDataEntry    = "/LookUp/IDEntry";
Ext.URLs.NOT_USED_IDEntry        = "/LookUp/IDEntry";

Ext.URLs.TemplateAlias           = "/LookUp/view/TemplateAlias";
// No Params,
// Returns list of all Template Aliases (e.g. User Defined Template Name)
// Used to determine duplicate Template by User Name

Ext.URLs.Templates               = "/LookUp/Templates";
// No Param - Returns list of templates available

Ext.URLs.TemplateList            = "/LookUp/Templates";

Ext.URLs.TemplateListByLocation  = "/LookUp/Templates/Location"; // Requires LocationID as the last parameter

Ext.URLs.FlagTemplateInactive    = "/LookUp/flagTemplateInactive";

Ext.URLs.BaseView                = "/LookUp/view";
Ext.URLs.TimeFrameUnit           = "/LookUp/view/TimeFrameUnit";
Ext.URLs.TempLoc                 = "/LookUp/view/TempLoc";
Ext.URLs.DelivMech               = "/LookUp/view/DelivMech";

Ext.URLs.EmetogenicLevel_ASCO    = "/LookUp/view/Erisk_ASCO";
Ext.URLs.EmetogenicLevel_NCCN    = "/LookUp/view/Erisk_NCCN";
Ext.URLs.EmetogenicLevel         = "/LookUp/view/Emetogenic";
Ext.URLs.EmeticMeds              = "/LookUp/EmeticMeds";

Ext.URLs.TemplateSources         = "/LookUp/view/TemplateSource";

Ext.URLs.DiseaseStage            = "/LookUp/DiseaseStage";
// Param = DiseaseType ID,
// Returns list of all Stages for the specified Disease Type, used in "Select Disease Stage" combobox
// Example Usage - https://devtest.dbitpro.com/LookUp/DiseaseStage/C884F3AA-0B21-E111-BF57-000C2935B86F

Ext.URLs.Lookups                 = "/LookUp/viewall";
Ext.URLs.AddLookup               = "/LookUp/save"; //KD - 12/20/11 - new URI associated with adding data to the lookup table
Ext.URLs.DeleteLookup            = "/LookUp/save"; // "/LookUp/delete"; //KD - 12/23/11 - new URI associated with deleting data from the lookup table

Ext.URLs.References              = "/LookUp/view/References"; // MWB - 12/27/2011 - Moved from local to SQL Data Store
Ext.URLs.HydrationDrug           = "/LookUp/Hydration"; // MWB - 12/28/2011 - Added Hydration drug listing
Ext.URLs.NOT_USED_Drugs          = "/LookUp/view/Drug/NonFormaDrug"; // MWB - 12/29/2011 - Added drug listing //KD - 1/13/11 - To support Non-Formulary Drugs
Ext.URLs.Drugs = "/LookUp/view/Drug"; //KD - 05/17/12 - Will Append 'InPatient' or 'OutPatient' in Controller
Ext.URLs.DrugsInPatient = "/LookUp/view/DrugsInPatient";
Ext.URLs.DrugsOutPatient = "/LookUp/view/DrugsOutPatient";
Ext.URLs.DrugUnits = "/LookUp/view/Unit/Drug"; // MWB - 12/29/2011 - Added drug units listing
Ext.URLs.Units = "/LookUp/view/Unit"; // MWB - 12/29/2011 - Added drug units listing
Ext.URLs.DrugRegimen = "/LookUp/DrugRegimen"; // MWB - 12/30/2011 - Added drug Regimen
Ext.URLs.Infusion = "/LookUp/view/Route"; // MWB - 12/30/2011 - Added Infusion
Ext.URLs.CTOS = "/LookUp/TemplateData/"; // MWB - 1/2/2012 - Added TemplateData/CTOS
Ext.URLs.AddCTOS = "/LookUp/saveTemplate/";
Ext.URLs.UpdateCTOS = "/LookUp/updateTemplate/";
Ext.URLs.DeleteTemplate = "/LookUp/deleteTemplate"; //KD 1/26/12 - To delete Templates.

Ext.URLs.IVFluidType = "/LookUp/IVFluidType/";
Ext.URLs.FluidType = "/LookUp/view/FluidType"; //KD 3/7/2012 - Retrieve Fluid Types

Ext.URLs.PrintTemplate = "/LookUp/PrintTemplate";
// Param = Template GUID
// Opens a new window showing the specified template as a stand alone page for printing.
// Example Usage - https://mwb.dbitpro.com/LookUp/PrintTemplate/D7356037-A3B5-E111-A560-000C2935B86F










Ext.URLs.PatientCumulativeDosing = "/Patient/CumulativeDoseTracking";


Ext.URLs.Amputations = "/Patient/Amputations";
Ext.URLs.CancerType = "/Patient/Cancer";



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

Ext.URLs.OEMRecords = "/Patient/OEM"; // MWB 02/17/2012 - Added OEM Record URI
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of OEM Records for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/OEM/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.Edit_OEMRecord = "/Patient/OEM"; // MWB 3/5/2012 - Added Edit/Save OEM Record URI - Pending Kevin's specific URI from the framework


Ext.URLs.Vitals = "/Patient/Vitals";
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns list of Vitals for specified patient
// Example Usage - https://devtest.dbitpro.com/Patient/Vitals/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddVitals = "/Patient/Vitals";


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
Ext.URLs.ReadND_Treatment = "/NursingDoc/Treatment"; // Param = PAT_ID to obtain all treatments for the current ID. Used mostly in Flowsheet
Ext.URLs.ND_Treatment = "/Orders/Orders"; // This URI is called to obtain the initial Treatment Record from the Orders generated.
Ext.URLs.ND_TreatmentDispensed = "/Orders/Dispensed/"; // This URI is called to obtain the initial Treatment Record from the Orders generated.
Ext.URLs.AddND_Treatment = "/Orders/Orders";
// Param = none
// Returns all the orders for all patients for the next 3 days.
// The ND_Treatment store has a filter to grab ONLY the orders for the current patient for the current day.
// (see app\controller\NewPlan\CTOS\NursingDocs\TreatmentTab.js)



Ext.URLs.ChangeAdminDate = "";

Ext.URLs.FlowSheetRecords = "/Flowsheet/FS2"; // "Flowsheet/Data";		// Used in Flowsheet Model
Ext.URLs.AddFlowSheetRecords = "/Flowsheet/FS2"; // "Flowsheet/Data";		// Used in Flowsheet Model
Ext.URLs.FlowSheetOptionalInfo = "/Flowsheet/Optional"; // "Flowsheet Optional questions

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




Ext.URLs.AddND_React_Assess = "/NursingDoc/ReactAssess/";


Ext.URLs.ND_Assessment = "/NursingDoc/Assessment/"; // MWB - 22 Feb 2012
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/Assessment/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_Assessment = "/NursingDoc/Assessment/"; // MWB - 22 Feb 2012
// JSON -
//	{
//		"patientId":"2A225CF5-3937-E111-9B9C-000C2935B86F",
//		"assessmentDetails":[
//			{"sequence":4,"fieldLabel":"Sleep","choice":false,"comments":"Lots of comments","levelChosen":5},
//			{"sequence":2,"fieldLabel":"Jog","choice":true,"comments":"Lots of comments","levelChosen":3}
//		]
//	}
// Note: sequence and levelChosen must be integers.

Ext.URLs.ND_GenInfo = "/NursingDoc/GenInfo/"; // MWB - 22 Feb 2012
// Param = Patient ID (e.g. 28225CF5-3937-E111-9B9C-000C2935B86F)
// Returns $$$$$$$$$$$$$$$ for specified patient
// Example Usage - https://devtest.dbitpro.com/NursingDoc/GenInfo/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddND_GenInfo = "/NursingDoc/GenInfo/"; // MWB - 22 Feb 2012

// Ext.URLs.CTCAE_SOC = "/js/MWB_OEM1/app/data1/NursingDocs/CTCAE_SOC.js";
Ext.URLs.CTCAE_SOC = "/NursingDoc/CTCAE_SOC";
// Ext.URLs.CTCAE_Data = "/js/MWB_OEM1/app/data1/NursingDocs/CTCAE_Data";
Ext.URLs.CTCAE_Data = "/NursingDoc/CTCAE_Data";

Ext.URLs.AdverseEventsHistory = "/NursingDoc/AdverseEventsHistory";



Ext.URLs.EoTS = "/EndTreatmentSummary/EoTS";
// Param = EoTS GUID;
// Returns data structure for a specific EoTS;
// Example Usage - https://devtest.dbitpro.com/EndTreatmentSummary/EoTS/28225CF5-3937-E111-9B9C-000C2935B86F

Ext.URLs.AddEoTS = "/EndTreatmentSummary/EoTS";



Ext.URLs.ChemoHistory = theJSPath + "/data1/ChemoHistory.js";
// Used in the ChemoHistory Model.

Ext.URLs.RadiationHistory = theJSPath + "/data1/RadiationHistory.js";
// Used in the RadiationHistory Model.

Ext.URLs.CycleLengthMax = theJSPath + "/data1/CycleLengthMax.js";
// Used in the LookupTable_CycleLengthMax model.

// INLINE FOR TESTING: Ext.URLs.Messages = "app/data1/Messages/Filtered/RID/16.js";
// Param = Role ID,
// Returns list of all Messages for the specified Role ID, used in "MessagesTab" Grid Control
// Example Usage - https://devtest.dbitpro.com/Messages/1



Ext.URLs.ToxGrid = "/NursingDoc/ToxicityDetail";









Ext.COMSModels.EmeticMeds = "COMS.model.EmeticMeds";

Ext.COMSModels.DiseaseStaging = "COMS.model.DiseaseStaging";
Ext.COMSModels.MedRisks = "COMS.model.MedRisks";
Ext.COMSModels.DischargeInstruction = "COMS.model.DischargeInstruction";
Ext.COMSModels.ClinicInfo = "COMS.model.ClinicInfo";
Ext.COMSModels.IVFluidType = "COMS.model.IVFluidType";
Ext.COMSModels.Allergies = "COMS.model.Allergies";
Ext.COMSModels.ChemoHistory = "COMS.model.ChemoHistory";
Ext.COMSModels.CTOS = "COMS.model.CTOS";
Ext.COMSModels.CTOS_References = "COMS.model.CTOS_References";
Ext.COMSModels.CumulativeDoseMedsInRegimen = "COMS.model.CumulativeDoseMedsInRegimen";
Ext.COMSModels.CycleLengthMax = "COMS.model.LookupTable_CycleLengthMax";
Ext.COMSModels.CycleLengthStore = "COMS.model.LookupTable_CycleLengthStore";
Ext.COMSModels.DiseaseType = "COMS.model.LookupTable_DiseaseType";
Ext.COMSModels.DiseaseStage = "COMS.model.DiseaseStage";
Ext.COMSModels.Drugs = "COMS.model.Drugs"; // MWB - 12/29/2011 - Added drug listing
Ext.COMSModels.DrugUnits = "COMS.model.DrugUnits"; // MWB - 12/29/2011 - Added drug units listing
Ext.COMSModels.DrugRegimen = "COMS.model.DrugRegimen"; // MWB - 12/30/2011 - Added Drug Regimen
Ext.COMSModels.EmetogenicLevel = "COMS.model.LookupTable_EmetogenicLevel";
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
// Ext.COMSModels.PatientList = "COMS.model.PatientList";
Ext.COMSModels.TemplateList = "COMS.model.TemplateList";
Ext.COMSModels.TemperatureLocation = "COMS.model.TemperatureLocation";
Ext.COMSModels.DeliveryMechanism = "COMS.model.DeliveryMechanism";

Ext.COMSModels.GlobalsTable = "COMS.model.GlobalsTable";
Ext.COMSModels.GlobalLookupModel = "COMS.model.GlobalLookupModel";
Ext.COMSModels.UsersTable = "COMS.model.UsersTable";
Ext.COMSModels.ActiveWorkflowsTable = "COMS.model.ActiveWorkflowsTable";
Ext.COMSModels.MedsNonRoundedTable = "COMS.model.MedsNonRoundedTable";
Ext.COMSModels.MedDocs = "COMS.model.MedDocs";
Ext.COMSModels.OrdersTable = "COMS.model.OrdersTable";

Ext.COMSModels.PatientTemplates = "COMS.model.PatientTemplates";
Ext.COMSModels.References = "COMS.model.References";
Ext.COMSModels.RadiationHistory = "COMS.model.RadiationHistory";
Ext.COMSModels.Template = "COMS.model.LookupTable_Template";
Ext.COMSModels.Templates = "COMS.model.LookupTable_Templates";
Ext.COMSModels.TemplateSources = "COMS.model.LookupTable_TemplateSources";
Ext.COMSModels.TimeFrameUnit = "COMS.model.LookupTable_TimeFrameUnit";
Ext.COMSModels.TotalCoursesMax = "COMS.model.LookupTable_TotalCoursesMax";
Ext.COMSModels.OEMRecords = "COMS.model.OEMRecords"; // MWB - 02/17/2012 - OEM Record Model
Ext.COMSModels.MDWs = "COMS.model.MDWs"; // MWB - 3/15/2012 - MDWs Data Model
Ext.COMSModels.Edit_OEMRecord = "COMS.model.OEMEditRecord"; // MWB 03/5/2012 - Added Edit/Save OEM Record Model
Ext.COMSModels.Vitals = "COMS.model.Vitals";
Ext.COMSModels.ND_Assessment = "COMS.model.ND_Assessment"; // MWB - 22 Feb 2012
Ext.COMSModels.ND_GenInfo = "COMS.model.ND_GenInfo"; // MWB - 22 Feb 2012
Ext.COMSModels.ND_CTCAE_SOC = "COMS.model.ND_CTCAE_SOC"; // MWB - 27 Feb 2012
Ext.COMSModels.ND_CTCAE_Data = "COMS.model.ND_CTCAE_Data"; // MWB - 27 Feb 2012
// INLINE FOR TESTING: Ext.COMSModels.Messages = "COMS.model.Messages";


Ext.COMSModels.EoTS = "COMS.model.EndTreatmentSummary";
Ext.COMSModels.ND_Treatment = "COMS.model.ND_Treatment";
Ext.COMSModels.Flowsheet = "COMS.model.Flowsheet";
Ext.COMSModels.IDEntry = "COMS.model.IDEntry";
Ext.COMSModels.Toxicity = "COMS.model.Toxicity";
Ext.COMSModels.CumulativeDosingMeds = "COMS.model.CumulativeDosingMeds";
Ext.COMSModels.PatientCumulativeDosing = "COMS.model.PatientCumulativeDosing";
Ext.COMSModels.MedReminder = "COMS.model.MedReminder";
Ext.COMSModels.ToxGridModel = "COMS.model.ToxGridModel";
