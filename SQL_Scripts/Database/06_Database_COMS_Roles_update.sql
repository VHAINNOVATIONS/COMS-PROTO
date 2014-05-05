USE [COMS_TEST_1]
GO

IF  EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[Role_ID]') AND type = 'D')
BEGIN
ALTER TABLE [dbo].[Roles] DROP CONSTRAINT [Role_ID]
END

GO

USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[Roles]    Script Date: 04/30/2014 17:17:19 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Roles]') AND type in (N'U'))
DROP TABLE [dbo].[Roles]
GO

USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[Roles]    Script Date: 04/30/2014 17:17:19 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Roles](
	[rid] [int] NOT NULL,
	[username] [nvarchar](50) NULL,
	[role] [nvarchar](50) NULL,
	[lastlogin] [datetime] NULL,
	[DisplayName] [nvarchar](50) NULL,
	[Email] [nvarchar](max) NULL,
	[TemplateAuthoring] [int] NULL,
	[Role_ID] [uniqueidentifier] NULL,
	[Last_SessionID] [nvarchar](max) NULL
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Roles] ADD  CONSTRAINT [Role_ID]  DEFAULT (newsequentialid()) FOR [Role_ID]
GO
INSERT [dbo].[Roles] ([rid], [username], [role], [lastlogin], [DisplayName], [Email], [TemplateAuthoring], [Role_ID]) VALUES (0, N'1programmer', N'All Roles', NULL, N'Programmer', N'programmer@dbitmail.com', 1, N'4cd32b11-91cc-e311-baf8-001d09d7525d')

