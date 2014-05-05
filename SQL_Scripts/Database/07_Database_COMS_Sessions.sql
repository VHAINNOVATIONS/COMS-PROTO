USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[COMS_Sessions]    Script Date: 05/01/2014 11:32:53 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[COMS_Sessions]') AND type in (N'U'))
DROP TABLE [dbo].[COMS_Sessions]
GO

USE [COMS_TEST_1]
GO

/****** Object:  Table [dbo].[COMS_Sessions]    Script Date: 05/01/2014 11:32:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[COMS_Sessions](
	[sessionid] [nvarchar](max) NULL,
	[timestamp] [timestamp] NOT NULL,
	[compname] [varchar](255) NULL,
	[ref] [text] NULL,
	[username] [varchar](255) NULL,
	[winauth] [varchar](255) NULL,
	[point] [nvarchar](max) NULL,
	[pointno] [int] NULL,
	[time] [nvarchar](max) NULL,
	[date2] [nvarchar](max) NULL,
	[page] [nvarchar](max) NULL,
	[text] [text] NULL,
	[chkTrack] [nvarchar](max) NULL,
	[dname] [nvarchar](max) NULL,
	[role] [nvarchar](max) NULL,
	[rid] [nvarchar](max) NULL,
	[sitelist] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Domain] [nvarchar](max) NULL,
	[sessionStatus] [nvarchar](max) NULL,
	[TemplateAuthoring] [nvarchar](max) NULL,
	[Role_ID] [nvarchar](max) NULL,
	[ip_vistor] [nvarchar](max) NULL,
	[ip] [nvarchar](max) NULL,
	[ruser] [nvarchar](max) NULL,
	[NWLoginR] [nvarchar](max) NULL,
	[COMSLogin] [nvarchar](max) NULL,
	[mdws] [nvarchar](max) NULL,
	[AC] [nvarchar](max) NULL,
	[VC] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


