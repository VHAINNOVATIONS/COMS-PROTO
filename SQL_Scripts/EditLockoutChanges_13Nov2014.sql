
CREATE TABLE [dbo].[EditLockout](
 [id] [uniqueidentifier] DEFAULT NEWSEQUENTIALID(),
 [Patient_ID] [uniqueidentifier] NOT NULL,
 [Section] [nvarchar](max) NULL,
 [UserName] [nvarchar](max) NULL,
 [dtLocked] [datetime] NULL,
 [dtUnLocked] [datetime] NULL
)


CREATE TABLE [dbo].[EmeticMeds](
	[id] [uniqueidentifier] DEFAULT NEWSEQUENTIALID(),
	[EmoLevel] [int] NOT NULL,
	[MedName] [nvarchar](max) NOT NULL,
	[MedID] [uniqueidentifier] NOT NULL,
	[MedType] [nvarchar](15) NOT NULL
) ON [PRIMARY]



UPDATE [dbo].[LookUp] SET [Name] = 'Minimal Emetic Risk' where Lookup_ID='B685F3AA-0B21-E111-BF57-000C2935B86F'
UPDATE [dbo].[LookUp] SET [Name] = 'Low Emetic Risk' where Lookup_ID='B785F3AA-0B21-E111-BF57-000C2935B86F'
UPDATE [dbo].[LookUp] SET [Name] = 'Moderate Emetic Risk' where Lookup_ID='B885F3AA-0B21-E111-BF57-000C2935B86F'
UPDATE [dbo].[LookUp] SET [Name] = 'High Emetic Risk' where Lookup_ID='B985F3AA-0B21-E111-BF57-000C2935B86F'