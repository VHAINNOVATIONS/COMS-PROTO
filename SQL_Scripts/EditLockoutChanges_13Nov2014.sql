
CREATE TABLE [dbo].[EditLockout](
 [id] [uniqueidentifier] DEFAULT NEWSEQUENTIALID(),
 [Patient_ID] [uniqueidentifier] NOT NULL,
 [Section] [nvarchar](max) NULL,
 [User] [nvarchar](max) NULL,
 [dtLocked] [datetime] NULL,
 [dtUnLocked] [datetime] NULL
)