EXEC sp_RENAME 'EditLockout.User' , 'UserName', 'COLUMN'
ALTER TABLE Globals ADD mdws nvarchar(max) NULL,sshusr nvarchar(max) NULL,sshpwd nvarchar(max) NULL,sshusr2 nvarchar(max) NULL;

ALTER TABLE Patient DROP COLUMN Order_Sheet_ID;
ALTER TABLE Patient DROP COLUMN Last_Name;
ALTER TABLE Patient DROP COLUMN First_Name;
ALTER TABLE Patient DROP COLUMN Middle_Name;
ALTER TABLE Patient DROP COLUMN Prefix;
ALTER TABLE Patient DROP COLUMN Suffix;
ALTER TABLE Patient DROP COLUMN Phone_Number;
ALTER TABLE Patient DROP COLUMN Email_Address;
ALTER TABLE Patient DROP COLUMN Street_Address;
ALTER TABLE Patient DROP COLUMN City;
ALTER TABLE Patient DROP COLUMN State;
ALTER TABLE Patient DROP COLUMN Zip;
ALTER TABLE Patient DROP COLUMN Height;
ALTER TABLE Patient DROP COLUMN Height_Unit_ID;
ALTER TABLE Patient DROP COLUMN Weight;
ALTER TABLE Patient DROP COLUMN Weight_Unit_ID;
ALTER TABLE Patient DROP COLUMN DOB;
ALTER TABLE Patient DROP COLUMN Gender;
ALTER TABLE Patient DROP COLUMN Created_By;
ALTER TABLE Patient DROP COLUMN Date_Modified;
ALTER TABLE Patient DROP COLUMN Modified_By;
ALTER TABLE Patient DROP COLUMN Match;
