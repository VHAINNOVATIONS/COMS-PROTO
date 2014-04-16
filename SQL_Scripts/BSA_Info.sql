USE [COMS_MWB_TEST]
CREATE TABLE [dbo].[Patient_BSA](
	[ID] [uniqueidentifier] NOT NULL,
	[Patient_ID] [uniqueidentifier] NOT NULL,
	[WeightFormula] [varchar](30) NOT NULL,
	[BSAFormula] [varchar](30) NOT NULL,
	[Active] [bit] NOT NULL,
	[Date_Assigned] [datetime] NOT NULL,
	[Date_Changed] [datetime] NOT NULL,
	[UserName] [varchar](30) NOT NULL
)

ALTER TABLE [dbo].[Patient_BSA] ADD  DEFAULT (newsequentialid()) FOR [ID]
