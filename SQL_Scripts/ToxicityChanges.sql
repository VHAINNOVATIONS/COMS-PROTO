ALTER TABLE [COMS_TEST_4].[dbo].[SiteCommonInformation]
ADD Grade_Level nvarchar(max)


ALTER TABLE [COMS_TEST_4].[dbo].[ND_Assessment_Details]
ADD Details nvarchar(max)






/****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [COMS_TEST_4].[dbo].[ND_Assessment]
SELECT * FROM [COMS_TEST_4].[dbo].[ND_Assessment_Details]
SELECT * FROM [COMS_TEST_4].[dbo].[ND_ToxicityGrid]

ALTER TABLE [COMS_TEST_4].[dbo].[ND_Assessment_Details]
ADD Details nvarchar(max)

UPDATE [COMS_TEST_4].[dbo].[ND_ToxicityGrid] SET Label = 'Diarrhea',
                Grade_Level = 'Level 2 - Moderate',
                Details = '<p class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-size: 9pt; font-family: Tahoma, sans-serif; background-image: initial; background-attachment: initial; background-size: initial; background-origin: initial; background-clip: initial; background-position: initial; background-repeat: initial;">Level 2: Increase of 4 – 6 stools per day over
baseline; moderate increase in ostomy output compared to baseline<o:p></o:p></span></p>',
                Comments = 'lkjh lkjh lkjh ',
                tDate = '10/20/2014',
                Alert = 0
                WHERE id = '01426F83-7FFC-4408-8593-DFA853C7E492'

delete from [COMS_TEST_4].[dbo].[ND_ToxicityGrid] where Label = 'Tox Label'