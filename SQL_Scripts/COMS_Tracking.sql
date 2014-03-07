USE [COMS_UAT_VA_TEST_MWB]
CREATE TABLE [dbo].[COMS_Track](
	[id] [int] NOT NULL,
	[ip] [varchar](255) NULL,
	[date] [date] NULL,
	[timestamp] [timestamp] NULL,
	[compname] [varchar](255) NULL,
	[ref] [text] NULL,
	[username] [varchar](255) NULL,
	[winauth] [varchar](255) NULL,
	[point] [nvarchar](max) NULL,
	[pointno] [int] NULL,
	[time] [nvarchar](max) NULL,
	[date2] [nvarchar](max) NULL,
 CONSTRAINT [PK_COMS_Track] PRIMARY KEY CLUSTERED ([id] ASC)
 WITH (
	PAD_INDEX  = OFF, 
	STATISTICS_NORECOMPUTE  = OFF, 
	IGNORE_DUP_KEY = OFF, 
	ALLOW_ROW_LOCKS  = ON, 
	ALLOW_PAGE_LOCKS  = ON
)
ON [PRIMARY]
ON [PRIMARY] TEXTIMAGE_ON [PRIMARY];
)
ALTER TABLE [dbo].[COMS_Track] ADD  CONSTRAINT [DF_COMS_Track_date]  DEFAULT (getdate()) FOR [date];
