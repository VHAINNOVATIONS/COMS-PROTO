USE [COMS_TEST_2]

CREATE TABLE [dbo].[DiseaseStaging](
    [ID] [uniqueidentifier] NOT NULL,
    [DiseaseID] [uniqueidentifier] NOT NULL,
    [Stage] [varchar](255) NOT NULL
    CONSTRAINT uc_DiseaseStageID UNIQUE (DiseaseID,Stage)
) ON [PRIMARY]

ALTER TABLE [dbo].[DiseaseStaging] ADD  DEFAULT (newsequentialid()) FOR [ID]