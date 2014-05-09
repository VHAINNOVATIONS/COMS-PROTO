DOME!
alter table [COMS_MWB_TEST].[dbo].[Patient_History] add [TemperatureLocation] varchar(40)


/****** Changes to be made to Table data
   
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Lookup_Type_ID],[Name],[Description])     VALUES (0,32,'Med Listing','Programatically Unknown Medications Listing')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Lookup_Type_ID],[Name],[Description])     VALUES (0,40,'Temperature Location','List of Locations where patients temperature can be taken from')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Lookup_Type_ID],[Name],[Description])     VALUES (0,41,'E-Risk ASCO Recommendation','ASCO Recommendations for Emesis Risk')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Lookup_Type_ID],[Name],[Description])     VALUES (0,42,'E-Risk NCCN Recommendation','NCCN Recommendations for Emesis Risk')

INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Name],[Description])VALUES (40,'Oral','01 Orally')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Name],[Description])VALUES (40,'Tympanic','02 Ear Canal')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Name],[Description])VALUES (40,'Temporal','03 Temple')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Name],[Description])VALUES (40,'Axillary','04 Under Armpit')
INSERT INTO [XXX].[dbo].[LookUp] ([Lookup_Type],[Name],[Description])VALUES (40,'Rectal','05 Rectally')
  
SELECT *  FROM [XXX].[dbo].[LookUp] where Lookup_Type = 0 order by Lookup_Type_ID

SELECT *  FROM [COMS].[dbo].[LookUp] where Lookup_Type = 40 order by Lookup_Type_ID  
  

******/