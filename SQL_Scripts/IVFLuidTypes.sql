USE [COMS_MWB_TEST]
CREATE TABLE [dbo].[IVFluidTypes](
	[ID] [uniqueidentifier] NOT NULL,
	[Med_ID] [uniqueidentifier] NOT NULL,
	[FluidType_ID] [uniqueidentifier] NOT NULL
)

ALTER TABLE [dbo].[IVFluidTypes] ADD  DEFAULT (newsequentialid()) FOR [ID]
