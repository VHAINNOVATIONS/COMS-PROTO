USE [COMS_OLDMDWS]

CREATE TABLE [dbo].[DischargeInstructionsLink](
    [DischargeID] [uniqueidentifier] NOT NULL,
    [PatientID] [uniqueidentifier] NOT NULL,
    [date] [date]  NOT NULL,
) ON [PRIMARY]
CREATE TABLE [dbo].[DischargeInstructions](
    [DischargeID] [uniqueidentifier] NOT NULL,
    [fieldName] [varchar](255) NOT NULL,
    [value] [varchar](255)
) ON [PRIMARY]
