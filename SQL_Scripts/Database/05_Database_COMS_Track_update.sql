/****** Object:  Table [dbo].[COMS_Track]    Script Date: 04/25/2014 11:53:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[COMS_Track](
	[id] [int] NOT NULL,
	[ip] [varchar](255) NULL,
	[date] [datetime] NULL,
	[timestamp] [timestamp] NOT NULL,
	[compname] [varchar](255) NULL,
	[ref] [text] NULL,
	[username] [varchar](255) NULL,
	[winauth] [varchar](255) NULL,
	[point] [nvarchar](max) NULL,
	[pointno] [int] NULL,
	[time] [nvarchar](max) NULL,
	[date2] [nvarchar](max) NULL,
	[sessionid] [nvarchar](max) NULL,
	[page] [nvarchar](max) NULL,
	[text] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[COMS_Track] ([id], [ip], [date], [compname], [ref], [username], [winauth], [point], [pointno], [time], [date2], [sessionid], [page]) VALUES (0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)