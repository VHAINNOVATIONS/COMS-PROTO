use COMS_TEST_1
ALTER TABLE ND_Assessment_Details
ADD Details nvarchar(max)

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'dbo.ND_ToxicityGrid') AND type in (N'U'))
DROP TABLE ND_ToxicityGrid

CREATE TABLE ND_ToxicityGrid(
	ID uniqueidentifier DEFAULT NEWSEQUENTIALID(),
	PAT_ID uniqueidentifier NOT NULL,
	Label nvarchar(50) NOT NULL,
	Grade_Level nvarchar(100) NOT NULL,
	Details nvarchar(max) NOT NULL,
	Comments nvarchar(max) NULL,
	tDate nvarchar(50) NOT NULL,
	Alert bit NULL
)