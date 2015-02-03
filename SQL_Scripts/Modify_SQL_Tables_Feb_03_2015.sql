use COMS_TEST_6

/* Add needed primary keys to other tables */
/* Note: If error occurs during the Add Primary Key Constraint process */
/* Get a list of any existing Primary Keys to see if there's a conflict */
/**
 *
 *	use COMS_TEST_6
 *	SELECT OBJECT_NAME(OBJECT_ID) AS Name_of_Constraint,
 *	OBJECT_NAME(parent_object_id) AS Table_Name,
 *	type_desc AS Constraint_Type
 *	FROM sys.objects
 *	WHERE type_desc LIKE '%CONSTRAINT'
 *
 *	OR
 *
 *	use COMS_TEST_7
 *	SELECT OBJECT_NAME(OBJECT_ID) AS Name_of_Constraint,
 *	OBJECT_NAME(parent_object_id) AS Table_Name,
 *	type_desc AS Constraint_Type
 *	FROM sys.objects
 *	WHERE type_desc LIKE '%CONSTRAINT' and
 *	type_desc = 'PRIMARY_KEY_CONSTRAINT' OR 
 *	type_desc = 'FOREIGN_KEY_CONSTRAINT' 
 *	order by Name_of_Constraint desc
 **/
alter table Patient
add constraint PK_Patient_ID Primary key(Patient_ID)
GO

alter table LookUp
add constraint PK_Lookup_ID Primary key(Lookup_ID)
GO

alter table DiseaseStaging
add constraint PK_ID Primary key(ID)
GO

/* Create the new table */
CREATE TABLE PatientDiseaseHistory(
    PDH_ID uniqueidentifier not null default newsequentialid() constraint PK_PDH_ID PRIMARY KEY,
    Patient_ID uniqueidentifier NOT NULL constraint FK_Patient_ID REFERENCES Patient (Patient_ID),
    Date_Assessment datetime NULL,
    Author varchar(30) NULL,
    Lookup_ID uniqueidentifier NOT NULL constraint FK_Lookup_ID REFERENCES LookUp(Lookup_ID),
    DiseaseStage_ID uniqueidentifier NOT NULL constraint FK_ID REFERENCES DiseaseStaging (ID)
)


