IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Med_Reminders]') AND type in (N'U'))
DROP TABLE [dbo].[Med_Reminders]


CREATE TABLE [dbo].[Med_Reminders](
	[MR_ID] [uniqueidentifier] DEFAULT NEWSEQUENTIALID(),
	[TemplateID] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[ReminderWhenCycle] [nvarchar](10) NOT NULL,
	[ReminderWhenPeriod] [nvarchar](20) NOT NULL
)
INSERT INTO [Med_Reminders]([TemplateID],[Title],[Description],[ReminderWhenCycle], [ReminderWhenPeriod])VALUES('00000000-0000-0000-0000-000000000000','Test Case','Test data.','Before', 'Cycle')
INSERT INTO [Med_Reminders]([TemplateID],[Title],[Description],[ReminderWhenCycle], [ReminderWhenPeriod])VALUES('3853AE7C-9756-4080-B6B3-3A4C2288FAC2','Test Case1','Test data.','After', 'Cycle')

