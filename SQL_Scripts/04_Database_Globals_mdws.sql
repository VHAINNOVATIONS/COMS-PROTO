USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[Globals]    Script Date: 04/26/2014 21:34:02 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Globals]') AND type in (N'U'))
DROP TABLE [dbo].[Globals]
GO

USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[Globals]    Script Date: 04/26/2014 21:34:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Globals](
	[domain] [nvarchar](max) NULL,
	[sitelist] [nvarchar](50) NULL,
	[mdws] [nvarchar](max) NULL
) ON [PRIMARY]

GO


