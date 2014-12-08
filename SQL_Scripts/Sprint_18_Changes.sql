/* Database Changes for Sprint #18 - 5 Dec 2014 */

/* This bit is set when the row in the ND_Treatment table has been added to the current inventory report */
/* To re-inventory this drug administration, clear the column (e.g. set to null) */
/* ALTER TABLE ND_Treatment ADD Inventoried bit NULL <-- CANCEL THIS CHANGE */
ALTER TABLE Order_Status ADD Inventoried bit NULL


CREATE TABLE InventoryReportsLinks(
	ID uniqueidentifier DEFAULT NEWSEQUENTIALID() NOT NULL PRIMARY KEY,
	Date datetime default SYSDATETIMEOFFSET(),
	StartDate datetime NOT NULL
)


CREATE TABLE InventoryReports(
	ID uniqueidentifier DEFAULT NEWSEQUENTIALID() NOT NULL PRIMARY KEY,
	iReport_ID uniqueidentifier FOREIGN KEY REFERENCES InventoryReportsLinks(ID),
	Drug nvarchar(max) NULL,
	Total nvarchar(max) NULL,
	Unit nvarchar(max) NULL
)


/* required to link the Treatment Table with the Order_Status table */
ALTER TABLE ND_Treatment ADD Order_ID uniqueidentifier NULL





CREATE TABLE ND_TreatmentAmmend (
	Order_ID uniqueidentifier NULL,
	Sequence smallint NULL,
	Drug_Name nvarchar(MAX) NULL,
	AdminDate nvarchar(MAX) NULL,
	ChangeDate nvarchar(MAX) NULL,
	Type nvarchar(MAX) NULL,
	Drug nvarchar(MAX) NULL,
	Dose nvarchar(MAX) NULL,
	Unit nvarchar(MAX) NULL,
	Route nvarchar(MAX) NULL,
	StartTime nvarchar(MAX) NULL,
	EndTime nvarchar(MAX) NULL,
	Comments nvarchar(MAX) NULL,
	Treatment_User nvarchar(MAX) NULL,
	Treatment_Date nvarchar(MAX) NULL
)