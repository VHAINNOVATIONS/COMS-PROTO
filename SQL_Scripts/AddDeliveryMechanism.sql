INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type] ,[Lookup_Type_ID] ,[Name] ,[Description]) VALUES (0, 43,'Delivery Mechanism','Delivery Mechanism')

/*** Create the new entry in the Lookup Table for the new Delivery Mechanism Data Type ***/
INSERT INTO [COMS_UAT_VA].[dbo].[LookUp] ([Lookup_Type] ,[Lookup_Type_ID] ,[Name] ,[Description]) VALUES (0, 43,'Delivery Mechanism','Delivery Mechanism')
/*** Then add the default data ***/
INSERT INTO [COMS_UAT_VA].[dbo].[LookUp] ([Lookup_Type] ,[Name] ,[Description]) VALUES (43,'Pumps','Pumps')
INSERT INTO [COMS_UAT_VA].[dbo].[LookUp] ([Lookup_Type] ,[Name] ,[Description]) VALUES (43,'Infusion Devices','Infusion Devices')
INSERT INTO [COMS_UAT_VA].[dbo].[LookUp] ([Lookup_Type] ,[Name] ,[Description]) VALUES (43,'Ambulatory Pumps','Ambulatory Pumps')