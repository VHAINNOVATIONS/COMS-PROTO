USE COMS_TEST_2
GO
/****** Object:  Table [dbo].[Workflows]    Script Date: 05/14/2014 22:52:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workflows](
	[ID] [int] NULL,
	[WorkFlowID] [int] NULL,
	[WorkFlowName] [nvarchar](max) NULL,
	[Active] [int] NULL,
	[Reason] [nvarchar](max) NULL,
	[NoSteps] [int] NULL,
	[ReasonNo] [int] NULL,
	[LastIssued] [int] NULL,
	[Body] [nvarchar](max) NULL
) ON [PRIMARY]
GO
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (3, 3, N'Order Change Notification', 1, N'Approval of Change', 3, 4, 18, N'The Order that was placed for this patient has been changed. Please review those changes using the Orders tab and Order Entry Management tab for this patient.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (4, 4, N'Drug Shortage', 1, N'Approval of Change', 3, 5, 15, N'Currently there is a drug shortage for this medication. Please choose another medication for this patient.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (5, 5, N'Policy/Protocol', 1, N'Approval of Change', 3, 6, 49, N'Based on local Policy and/or Protocol, this medication has been changed for this patient.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (6, 6, N'Change in Patient-specific Parameters', 1, N'Approval of Change', 3, 7, 7, N'Changes in Patient-specific Parameters has prompted this order to be changed. Please review the Order Entry Management tab for more information.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (7, 7, N'Non-formulary', 1, N'Approval of Change', 3, 8, 8, N'This is a Non-Formulary medication that will be used for this order. Please review the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (8, 8, N'Change Route of Administration', 1, N'Approval of Change', 3, 9, 9, N'The route for this medication has been changed for this patient. Please review the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (9, 9, N'Change Administration Time', 1, N'Approval of Change', 3, 10, 10, N'The administration time for this medication has been changed for this patient. Please review the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (10, 10, N'Change Sequencing', 1, N'Approval of Change', 3, 11, 11, N'The sequencing for this medication has been changed for this patient. Please review the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (11, 11, N'Dose rounding', 1, N'Communication', 1, 12, 12, N'The dose for this medication has been rounded for this patient. Please review the Orders tab or the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (12, 12, N'Fluid/Volume Change', 1, N'Communication', 1, 13, 13, N'The Fluid and/or Volume has been changed for this patient’s medication. Please review the Orders tab or the Order Entry Management tab for details.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (1, 1, N'Test - Approval', 0, N'Approval of Change', 3, 2, 2, N'Test Message')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (2, 2, N'Orders Generated, Ready for Finalization', 1, N'Notification', 1, 3, 53, N'This message is notify you that the patient in this subject will be receiving chemotherapy treatment and the initial orders have been initiated in COMS.')
INSERT [dbo].[Workflows] ([ID], [WorkFlowID], [WorkFlowName], [Active], [Reason], [NoSteps], [ReasonNo], [LastIssued], [Body]) VALUES (0, 0, N'Test - Communication', 0, N'Communication', 1, 1, 1, N'Test Message')
