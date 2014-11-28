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
