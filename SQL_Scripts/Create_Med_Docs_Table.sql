USE [COMS_MWB_TEST]

CREATE TABLE [dbo].[Med_Docs](
	[ID] [uniqueidentifier] NOT NULL,
	[Med_ID] [uniqueidentifier] NOT NULL,
	[Documentation] [text]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Med_Docs] ADD  DEFAULT (newsequentialid()) FOR [ID]
GO

