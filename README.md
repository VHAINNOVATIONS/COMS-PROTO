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

