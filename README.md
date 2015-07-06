COMS
====
COMS Pilot Program Code
The proof of concept Chemotherapy Ordering Management System (COMS) was developed with funding from the VA Center for Innovation (VACI) in the 2010 employee Innovations competition. The COMS application supports oncology healthcare teams in ordering, preparing, and documenting the administration throught five (5) clinical modules and read/write interoperability with Veterans Health Information Systems and Technology Architecture (VistA).
The COMS application satisfies the unique needs of chemotherapy ordering and standardizes capabilities to meet direct entry of chemotherapy order consistent with oncology practice. COMS interfaces and interacts with existing applicable Veterans Health Administration (VHA) health care systems, modules, and processes with Computerized Patient Record System (CPRS) and VistA databases. As an open source, systems agnostic solution, COMS is a user-facing, patient-centric solution not restrained by Commercial-off-the-Shelf (COTS) product limitations. It is a Web-based application consisting of Hypertext Precursor (PHP), Java Script, Simple Object Access Protocol (SOAP), and Representational state transfer (RESTful) Web services.
This project will build upon the innovation success by enhancing the proof of concept COMS application; deploying the prototype COMS to two (2) pilot sites staffed with seasonal VA oncology leaders and innovation champions; and providing technical input for security documentation. 

More information is here: http://vacloud.us/groups/20355/


Authentication/Verification Codes for demos.
Programmer	Provider	Nurse	Pharmacist
CPRS1234	1radiologist	1nurse	1pharmacist
CPRS4321$	radiologist1	nurse1	pharmacist1

Note:
/*  4 = Template Selector Values with Template Name in Description */
/* 21 = Cross Reference from Master Template to References Lookups */
/* 25 = Alias for template name */





Apply Template to Patient...
Patient Controller - savePatientTemplate
calls
Patient Controller - createOEMRecords
To create all the Records in the Master_Template, Template_Regimen, Medication_Hydration and MH_Infusion tables...
-------------------



Finding Template Information
This should list all basic template definitions
select * from dbo.Master_Template where Patient_ID is null <-- Master Template Definition Records

This should specify the Pre/Post/Therapy meds that are part of a template
select * from dbo.Medication_Hydration where Order_ID = '00000000-0000-0000-0000-000000000000' <-- Template Authored Records
select * from dbo.MH_Infusion where Order_ID = '00000000-0000-0000-0000-000000000000' <-- Template Authored Records
select * from dbo.Template_Regimen where Order_ID = '00000000-0000-0000-0000-000000000000' <-- Template Authored Records

select * from dbo.Template_Availability <-- Defines the location that the Template (TemplateID which matches the Master_Template Template_ID from above) is assigned to (My/Local/National)

select * from dbo.TemplateSupportCare <-- No idea...


select * from dbo.Patient_Assigned_Templates <-- Specifies the unique Instance (via PAT_ID) that a particular template (from by Template_ID from Master Template above) is currently being used to treate a patient (via Date_Ended_Actual !== NULL; Is_Active tells if the template being used is currently active or has been supersceeded by a new version)

select * from dbo.Order_Status <-- Specifies the individual orders (for a given drug on a given day) via the Template_ID (from by Template_ID from Master Template above), PAT_ID (from Patient_Assigned_Templates above), Patient_ID



To clear out Templates assigned, but keeping the template definitions ...
delete from Master_Template where Patient_ID is NOT null
delete from Medication_Hydration where Order_ID != '00000000-0000-0000-0000-000000000000'
delete from MH_Infusion where Order_ID != '00000000-0000-0000-0000-000000000000'
delete from Template_Regimen where Order_ID != '00000000-0000-0000-0000-000000000000'
delete from Patient_Assigned_Templates
delete from Order_Status where Order_ID != '00000000-0000-0000-0000-000000000000'

to Delete the actual Template Definitions:

First remove the Template Name, Alias and Cross Reference from the Lookup Table (Note the Cross Reference doesn't appear to be used)
delete from Lookup where Lookup_Type = 4 or Lookup_Type = 21 or Lookup_Type = 25

Remove all template definitions (both the definition, eg Patient_ID is NULL, and the individual records for a template (Patient_ID is NOT Null but the Template_ID matches the Template_ID of the Patient_ID is NULL record)
delete from Master_Template

Remove the reference to the template for the location it's assigned to
delete from dbo.Template_Availability

Remove the individual Medication Definitions for the Template
Pre/Post
delete from Medication_Hydration
delete from MH_Infusion

Therapy
delete from Template_Regimen

Then the information that links patients to a specific instance of a template
delete from dbo.Patient_Assigned_Templates

Clean out any Orders (note this is the ONLY place we need to keep that "null" record)
delete from Order_Status where Order_ID != '00000000-0000-0000-0000-000000000000'




So in a nutshell run the following script:
delete from Lookup where Lookup_Type = 4 or Lookup_Type = 21 or Lookup_Type = 25
delete from dbo.Master_Template
delete from dbo.Template_Availability
delete from dbo.Medication_Hydration
delete from dbo.MH_Infusion
delete from dbo.Template_Regimen
delete from dbo.Patient_Assigned_Templates 
delete from Order_Status where Order_ID != '00000000-0000-0000-0000-000000000000'

--------------------------------------------------------------------------------------------------------------------------------------------
Notes on Treatment Documentation Tab

Patient F0500 = DFN = 100499 = Patient ID = 310E712D-E304-48E9-9835-94F31DA5595C
PAT_ID = 820753A1-4706-E511-9B8C-000C2935B86F	Patient_ID = 310E712D-E304-48E9-9835-94F31DA5595C = Template_ID = 48CD4FD7-9F87-4F31-B284-D872C0E9384C

select * from Patient_Assigned_Templates

/LookUp/TemplateData/<Template_ID>
/LookUp/TemplateMedDocs/<Template_ID>
/Patient/Vitals/<Patient_ID>
/Patient/Template/<Patient_ID>
/Patient/Templates/<Patient_ID>
/Patient/CumulativeDoseTracking/<Patient_ID>
/Patient/OEM/<Patient_ID>

/NursingDoc/AdverseEventsHistory/<PAT_ID>
/Patient/DischargeInstructions/<PAT_ID>


General Information Tab
saved via the "Save" button below the Vital Signs Edit group.
Note, this save performs 2 service calls:
Save General Information - /NursingDoc/GenInfo/
POST Data
comment: "Test Comment..."
consentGood: false
educationGood: false
patientIDGood: true
patientId: "310E712D-E304-48E9-9835-94F31DA5595C"
planReviewed: false
---------------
/NursingDoc/GenInfo/<PAT_ID>






Save Vital Signs - /Patient/Vitals
POST Data
BP: " / "
BSA: ""
BSA_Method: "Mosteller"
BSA_Weight: "101.6"
Cycle: ""
DFN: "100499"
DateTaken: "06/29/2015"
Day: ""
Diastolic: ""
Height: ""
Pain: null
Pulse: ""
Respiration: ""
SPO2: null
Systolic: ""
Temperature: ""
TemperatureLocation: ""
Weight: ""
WeightFormula: "Actual Weight"
patientId: "310E712D-E304-48E9-9835-94F31DA5595C"


Assessment

IV Site - No Save, but gives a "Save Complete" dialog.


Infusion Reaction - Save via 
/NursingDoc/ReactAssess/820753A1-4706-E511-9B8C-000C2935B86F/2C3DC7E8-C4C4-4213-A0FB-1F9E52150359
                        ^^^^^^^^^^^^ PAT_ID ^^^^^^^^^^^^^^^   ^^^^ InfuseReactionRecordID ^^^^
The InfuseReactionRecordID is passed only if this is an update of an existing record (via PUT)

Discharge Instructions

Load specific
/Patient/DischargeInstructions/820753A1-4706-E511-9B8C-000C2935B86F/4B65F07A-8A75-4881-BAAF-908AB7AC8F09
                               ^^^^^^^^^^^^ PAT_ID ^^^^^^^^^^^^^^^   ^^^^^^^ dischargeRecordID ^^^^^^^



