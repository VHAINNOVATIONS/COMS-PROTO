USE [COMS_Tracking]
CREATE TABLE [dbo].[COMS_Action_Track](
	[id] [int] NOT NULL,
	[ip] [varchar](255) NULL,
	[date] [varchar](255) NULL,
	[timestamp] [varchar](255) NULL,
	[access] [varchar](255) NULL,
	[verify] [varchar](255) NULL,
	[action] [varchar](255) NULL,
	[ref] [text] NULL,
    CONSTRAINT [PK_COMS_Action_Track] PRIMARY KEY CLUSTERED ([id] ASC)
)