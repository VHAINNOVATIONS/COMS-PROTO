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
When deleting all templates run the following scripts:
/*  4 = Template Selector Values with Template Name in Description */
/* 21 = Cross Reference from Master Template to References Lookups */
/* 25 = Alias for template name */

select * from LookUp where Lookup_Type_ID = 25 or Lookup_Type_ID = 21 or Lookup_Type_ID = 4

select * from dbo.Medication_Hydration
select * from dbo.MH_Infusion
select * from dbo.Template_Regimen

select * from dbo.Master_Template
select * from dbo.Template_Availability
select * from dbo.TemplateSupportCare
select * from dbo.Patient_Assigned_Templates
select * from dbo.Order_Status


Also...
delete from Order_Status