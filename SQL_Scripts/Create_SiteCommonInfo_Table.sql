use [COMS_TEST_2]
CREATE TABLE [dbo].[SiteCommonInformation](
	[ID] [uniqueidentifier] NOT NULL,
	[Label] [varchar](255) NOT NULL,
	[DataType] [varchar](50) NOT NULL,
	[Details] [text]
) ON [PRIMARY];

ALTER TABLE [dbo].[SiteCommonInformation] ADD  DEFAULT (newsequentialid()) FOR [ID]