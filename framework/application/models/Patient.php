<?php

class Patient extends Model
{

    /* Retrieve all patient information for all patients from the "Patient" table */
    /* $this->table = "Patient" */
    function selectAll ($patientId = NULL) {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT ID = Patient_ID, Name = (First_Name + ' ' + ISNULL(Middle_Name,'') + ' ' + Last_Name), " .
                     "Age = DATEDIFF(YY, DOB, GETDATE()) - CASE WHEN( (MONTH(DOB)*100 + DAY(DOB)) > (MONTH(GETDATE())*100 + DAY(GETDATE())) ) THEN 1 ELSE 0 END, " .
                     "DOB = CONVERT(VARCHAR(10), DOB, 101), Gender, Last_Name as lname, First_Name as fname, p.DFN as dfn " .
                     "FROM " . $this->_table . " p";
            if ($patientId != NULL) {
                $query .= " where p.Patient_ID = '$patientId'";
            }
        }
        return $this->query($query);
    }

    function selectByPatientId ($patientId)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            
            $query = "SELECT id = Patient_ID, name = (First_Name + ' ' + ISNULL(Middle_Name,'') + ' ' + Last_Name), " .
                     "Age = DATEDIFF(YY, DOB, GETDATE()) - CASE WHEN( (MONTH(DOB)*100 + DAY(DOB)) > (MONTH(GETDATE())*100 + DAY(GETDATE())) ) THEN 1 ELSE 0 END, " .
                     "DOB = CONVERT(VARCHAR(10), DOB, 101), Gender, Last_Name as lname, First_Name as fname, p.DFN as DFN " .
                     "FROM " . $this->_table . " p " . "WHERE p.Patient_ID = '" .
                     $patientId . "'";
        }        
        return $this->query($query);
    }

    function selectHistory ($patiendId)
    {
        /*
         * if(DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql'){ $query = "select
         * l.Description as DiseaseType, l1.Name as DiseaseCat, Chemo_ID as
         * Chemo, Radiation_ID as Radiation, ". "PerfStat = l2.Description + '-'
         * + l2.Name, l3.Name as TreatIndic, l4.Name as Protocol ". "from
         * Patient_History ph, LookUp l, LookUp l1, LookUp l2, LookUp l3, LookUp
         * l4 ". "where ph.Patient_ID = '". $patiendId . "' and
         * ph.Disease_Type_ID = l.Lookup_ID and ph.Disease_Cat_ID = l1.Lookup_ID
         * " . "and ph.Performance_ID = l2.Lookup_ID and
         * ph.Treatment_Indicator_ID = l3.Lookup_ID and ph.Protocol_ID =
         * l4.Lookup_ID"; } else if(DB_TYPE == 'mysql'){ $query = "select
         * l.Description as DiseaseType, l1.`Name` as DiseaseCat, Chemo_ID as
         * Chemo, Radiation_ID as Radiation, ". "concat_ws('-',
         * l2.`Description`,l2.`Name`) as PerfStat, l3.`Name` as TreatIndic,
         * l4.`Name` as Protocol ". "from Patient_History ph, LookUp l, LookUp
         * l1, LookUp l2, LookUp l3, LookUp l4 ". "where ph.Patient_ID = '".
         * $patiendId . "' and ph.Disease_Type_ID = l.Lookup_ID and
         * ph.Disease_Cat_ID = l1.Lookup_ID " . "and ph.Performance_ID =
         * l2.Lookup_ID and ph.Treatment_Indicator_ID = l3.Lookup_ID and
         * ph.Protocol_ID = l4.Lookup_ID"; } return $this->query($query);
         */
    }

    /**
     *
     * @param stdClass $formData            
     * @return array
     */
    public function savePatientTemplate($formData)
    {
        $patientId = $formData->PatientID;
        $templateId = $formData->TemplateID;
        $dateApplied = $formData->DateApplied;
        $dateStarted = $formData->DateStarted;
        $dateEnded = $formData->DateEnded;
        $goal = $formData->Goal;
        $performanceStatus = $formData->PerformanceStatus;
        $weightFormula = $formData->WeightFormula;
        $bsaFormula = $formData->BSAFormula;
        $clinicalTrial = $formData->ClinicalTrial;
        
        $isActive = '1';
        
        $query = "
            SELECT PAT_ID AS id, Template_ID AS Template_ID 
            FROM Patient_Assigned_Templates 
            WHERE Date_Ended_Actual is null and Patient_ID = '$patientId'
        ";
        $results = $this->query($query);

        if ($results) {
            foreach ($results as $result) {
                $id = $result['id'];
                $dateEndedValue = 'CONVERT(VARCHAR,GETDATE(),121)';
                $query = "
                    UPDATE Patient_Assigned_Templates SET 
                        Date_Ended = $dateEndedValue, 
                        Date_Ended_Actual = $dateEndedValue
                    WHERE PAT_ID = '$id'
                ";
                
                $this->query($query);
                
                /**
                 *
                 * @todo This should be handled by the controller or some
                 *       "Order" model
                 */
                $query = "
                    UPDATE Order_Status SET 
                        Order_Status = 'Cancelled'
                    WHERE Patient_ID = '$patientId' 
                        AND Template_ID = '$templateId'
                ";
                $this->query($query);
            }
        }
        
        if (empty($clinicalTrial)) {
            $clinicalTrialColumn = null;
            $clinicalTrialValue = null;
        } else {
            $clinicalTrialColumn = ', Clinical_Trial';
            $clinicalTrialValue = ", '$clinicalTrial'";
        }
        $query = "
            INSERT INTO Patient_Assigned_Templates (
                Patient_ID,
                Template_ID,
                Date_Applied,
                Date_Started,
                Date_Ended,
                Is_Active,
                Goal,
                Status,
                Perf_Status_ID,
                Weight_Formula,
                BSA_Method
                $clinicalTrialColumn
            ) values (
                '$patientId',
                '$templateId',
                '$dateApplied',
                '$dateStarted',
                '$dateEnded',
                1,
                '$goal',
                'Ordered',
                '$performanceStatus',
                '$weightFormula',
                '$bsaFormula'
                $clinicalTrialValue
            )";
        
        $retValue = $this->query($query);

        /**
         * OrdersNotify in app/workflow.php
         *
         * @todo This should be handled by the controller not the model
         */
        OrdersNotify($patientId, $templateId, $dateApplied, $dateStarted, 
                $dateEnded, $goal, $clinicalTrial, $performanceStatus);
        
        $lookup = new LookUp();
        foreach ($formData->Amputations as $amputation) {
            $lookup->save(30, $patientId, $amputation);
        }
        
        /*
         * Should the most recent record in Patient History be updated with the
         * new Performance Status an BSA Info? $query = "SELECT
         * Patient_History_ID as historyId, Performance_ID as perfId from
         * Patient_History where Patient_ID = '" .$patientId."' order by
         * Date_Taken desc"; $historyRecord = $this->query($query); $query =
         * "UPDATE Patient_History set Performance_ID =
         * '".$performanceStatus."',Weight_Formula =
         * '".$weightFormula."',BSA_Method ='".$bsaFormula."' ". "where
         * Patient_History_ID = '".$historyRecord[0]['historyId']."'"; $retVal =
         * $this->query($query); if (null != $retVal &&
         * array_key_exists('error', $retVal)) { return $retVal; }
         */
        $query = "
            SELECT PAT_ID AS id 
            FROM Patient_Assigned_Templates 
            WHERE Patient_ID = '$patientId' 
                AND Template_ID ='$templateId' 
                AND Date_Ended_Actual is NULL
        ";

        $result = $this->query($query);
        
        return $result;
    }







    function getCurrentAndHistoricalPatientTemplates( $patientID ) {
        $query = "
            SELECT 
            case when pat.PAT_ID is not null then pat.PAT_ID else '' end as id
            ,pat.Patient_ID as PatientID
            ,case when pat.Date_Applied is not null then CONVERT(VARCHAR(10), pat.Date_Applied, 101) else '' end as DateApplied
            ,case when pat.Date_Started is not null then CONVERT(VARCHAR(10), pat.Date_Started, 101) else '' end as DateStarted
            ,case when pat.Date_Ended is not null then CONVERT(VARCHAR(10), pat.Date_Ended, 101) else '' end as DateEnded
            ,case when pat.Date_Ended_Actual is not null then CONVERT(VARCHAR(10), pat.Date_Ended_Actual, 101) else '' end as DateEndedActual
            ,case when mt.Template_ID is not null then mt.Template_ID else '' end as TemplateID
            ,case when l1.Description is not null then l1.Description else '' end as TemplateName
            ,case when l2.Description is not null then l2.Description else '' end as TemplateDescription
            ,EoTS_ID as EotsID
            FROM Patient_Assigned_Templates pat
            INNER JOIN Master_Template mt ON mt.Template_ID = pat.Template_ID
            INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Regimen_ID
            left outer JOIN LookUp l2 ON l2.Name = convert(nvarchar(max),mt.Regimen_ID)
            LEFT JOIN EoTS eots on EoTS.PAT_ID = pat.PAT_ID
            WHERE pat.Patient_ID = '$patientID'
            Order By DateEndedActual Desc, DateEnded Desc, DateStarted Desc
        ";

        return $this->query($query);
    }


    function getPriorPatientTemplates ($id)
    {
            $query = "SELECT mt.Template_ID as templateId, 
                pat.PAT_ID as ID, 
                case when l2.Name is not null then l2.Description else l1.Description end as templatename, 
                case when pat.Date_Ended_Actual is not null then 
                    CONVERT(datetime, pat.Date_Ended_Actual, 104) else 
                    CONVERT(datetime, pat.Date_Ended, 104) end as LastDate,
                CONVERT(VARCHAR(10), pat.Date_Started, 101) as started, 
                CONVERT(VARCHAR(10), pat.Date_Ended, 101) as ended, 
                CONVERT(VARCHAR(10), pat.Date_Applied, 101) as applied, 
                eots.EoTS_ID as EOTS_ID, 
                CONVERT(VARCHAR(10), pat.Date_Ended_Actual, 101) as ended_actual 
                FROM Patient_Assigned_Templates pat 
                INNER JOIN Master_Template mt ON mt.Template_ID = pat.Template_ID
                INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Regimen_ID
                LEFT OUTER JOIN LookUp l2 ON l2.Name = convert(nvarchar(max),mt.Regimen_ID)
                LEFT JOIN EoTS eots ON eots.PAT_ID = pat.PAT_ID
                WHERE pat.Patient_ID = '$id' 
                ORDER BY CONVERT(datetime, pat.Date_Started, 104) Desc, LastDate Desc;";

        return $this->query($query);
    }

    function getAdminDatesForTemplate ($templateId)
    {
        $query = "SELECT Admin_Date FROM Master_Template " .
                 "WHERE Regimen_ID = (SELECT Regimen_ID FROM Master_Template where Template_ID = '" .
                 $templateId . "') " . "AND Admin_Date IS NOT NULL";
        
        return $this->query($query);
    }

    function isAdminDate ($templateId, $currDate)
    {
        $query = "SELECT Admin_Date FROM Master_Template " .
                 "WHERE Regimen_ID = (SELECT Regimen_ID FROM Master_Template where Template_ID = '" .
                 $templateId . "') " . "AND Admin_Date ='" . $currDate . "'";
        
        return $this->query($query);
    }

    function getPatientDetailInfo ($id)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT case when mt.Template_ID is not null then mt.Template_ID else '' end as TemplateID," .
                     "case when l2.Description is not null then l2.Description else '' end as TemplateDescription," .
                     "case when l1.Description is not null then l1.Description else '' end as TemplateName," .
                     "case when pat.Date_Started is not null then CONVERT(VARCHAR(10), pat.Date_Started, 101) else '' end as TreatmentStart," .
                    // "case when pat.Date_Applied is not null then
                    // CONVERT(VARCHAR(10), pat.Date_Applied, 101) else '' end
                    // as DateTaken,".
                    "case when pat.Date_Ended is not null then CONVERT(VARCHAR(10), pat.Date_Ended, 101) else '' end as TreatmentEnd, " .
                    "case when pat.Date_Ended_Actual is not null then CONVERT(VARCHAR(10), pat.Date_Ended_Actual, 101) else '' end as TreatmentEndActual, " .
                     "case when pat.Goal is not null then pat.Goal else '' end as Goal," .
                     "case when pat.Clinical_Trial is not null then pat.Clinical_Trial else '' end as ClinicalTrial," .
                     "case when pat.Weight_Formula is not null then pat.Weight_Formula else '' end as WeightFormula," .
                     "case when pat.BSA_Method is not null then pat.BSA_Method else '' end as BSAFormula," .
                     "case when l3.Name is not null then l3.Name else '' end as PerformanceStatus, " .
                     "case when pat.PAT_ID is not null then pat.PAT_ID else '' end as PAT_ID " .
                     "FROM Patient_Assigned_Templates pat " .
                     "INNER JOIN Master_Template mt ON mt.Template_ID = pat.Template_ID " .
                     "INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Regimen_ID " .
                     "INNER JOIN LookUp l3 ON l3.Lookup_ID = pat.Perf_Status_ID " .
                     "LEFT OUTER JOIN LookUp l2 ON l2.Name = convert(nvarchar(max),mt.Regimen_ID) " .
                     "WHERE pat.Patient_ID = '" . $id . "' ";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT mt.Template_ID as templateId, l2.Description as templatedescription, l1.Description as templatename, " .
                     "date_format(pat.Date_Started, '%m/%d/%Y') as started, date_format(pat.Date_Applied, '%m/%d/%Y') as datetaken, " .
                     "date_format(pat.Date_Ended, '%m/%d/%Y') as ended " .
                     "FROM Patient_Assigned_Templates pat " .
                     "INNER JOIN Master_Template mt ON mt.Template_ID = pat.Template_ID " .
                     "INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Regimen_ID " .
                     "LEFT OUTER JOIN LookUp l2 ON l2.Name = mt.Regimen_ID " .
                     "WHERE pat.Patient_ID = '" . $id . "' ";
        }
        
        return $this->query($query);
    }





    function getMeasurements ($id)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT Height as height, Weight as weight,Blood_Pressure as bp,Weight_Formula as weightFormula, " .
                     "BSA_Method as bsaMethod, BSA as bsa,BSA_Weight as bsaWeight,CONVERT(VARCHAR(10), Date_Taken, 101) as dateTaken, " .
                     "Temperature, Pulse, Respiration, Pain, OxygenationLevel as spo2level " .
                     "FROM Patient_History ph " . "WHERE ph.Patient_ID = '" . $id .
                     "' " . "ORDER BY Date_Taken DESC";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT Height as height,Weight as weight,Blood_Pressure as bp,Weight_Formula as weightFormula, " .
                     "BSA_Method as bsaMethod, BSA as bsa,BSA_Weight as bsaWeight,date_format(Date_Taken, '%m/%d/%Y')  as dateTaken, " .
                     "Temperature, Pulse, Respiration, Pain, OxygenationLevel as spo2level " .
                     "FROM Patient_History ph " . "WHERE ph.Patient_ID = '" . $id .
                     "' " . "ORDER BY Date_Taken DESC";
        }
        
        return $this->query($query);
    }

    function getMeasurements_v1 ($id, $dateTaken)
    {
        $query = "SELECT Patient_ID as id from Patient where DFN = '" . $id . "'";
        $patientId = $this->query($query);
        
        if (null != $patientId && ! array_key_exists('error', $patientId)) {
            $id = $patientId[0]['id'];
        }
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            if (null == $dateTaken) {
                $query = "SELECT ph.Height as Height,ph.Weight as Weight,BP = CAST(Systolic as varchar(5)) + '/' + CAST(Diastolic as varchar(5)), Weight_Formula as WeightFormula, " .
                         "BSA_Method as BSA_Method, BSA,BSA_Weight,CONVERT(VARCHAR(10), Date_Taken, 101) as DateTaken, " .
                         "Temperature, TemperatureLocation, Pulse, Respiration, Pain, OxygenationLevel as SPO2, Cycle, Admin_Day as Day, l4.Description as PS, l4.Name as PSID, " .
                         "Age = DATEDIFF(YY, p.DOB, GETDATE()) - CASE WHEN( (MONTH(p.DOB)*100 + DAY(DOB)) > (MONTH(GETDATE())*100 + DAY(GETDATE())) ) THEN 1 ELSE 0 END, " .
                         "p.Gender as Gender " . "FROM Patient_History ph " .
                         "INNER JOIN Patient p ON p.Patient_ID = ph.Patient_ID " .
                         "LEFT JOIN LookUp l4 ON l4.Lookup_ID = ph.Performance_ID " .
                         "WHERE ph.Patient_ID = '" . $id . "' " .
                         "ORDER BY Date_Taken DESC";
            } else {
                $query = "SELECT ph.Height as Height,ph.Weight as Weight,BP = CAST(Systolic as varchar(5)) + '/' + CAST(Diastolic as varchar(5)), Weight_Formula as WeightFormula, " .
                         "BSA_Method as BSA_Method, BSA,BSA_Weight,CONVERT(VARCHAR(10), Date_Taken, 101) as DateTaken, " .
                         "Temperature, TemperatureLocation, Pulse, Respiration, Pain, OxygenationLevel as SPO2, Cycle, Admin_Day as Day, l4.Description as PS, l4.Name as PSID, " .
                         "Age = DATEDIFF(YY, p.DOB, GETDATE()) - CASE WHEN( (MONTH(p.DOB)*100 + DAY(DOB)) > (MONTH(GETDATE())*100 + DAY(GETDATE())) ) THEN 1 ELSE 0 END, " .
                         "p.Gender as Gender " . "FROM Patient_History ph " .
                         "INNER JOIN Patient p ON p.Patient_ID = ph.Patient_ID " .
                         "LEFT JOIN LookUp l4 ON l4.Lookup_ID = ph.Performance_ID " .
                         "WHERE ph.Patient_ID = '" . $id . "' " .
                         "AND CONVERT(VARCHAR(10), Date_Taken, 105) = '" .
                         $dateTaken . "' " . "ORDER BY Date_Taken DESC";
            }
        }
        
        return $this->query($query);
    }

    function saveVitals ($form_data, $patientId)
    {
        if (empty($patientId)) {
            
            if (isset($form_data->{'patientId'})) {
                $patientId = $form_data->{'patientId'};
            } else if (isset($form_data->{'PatientID'})) { // MWB - 6/21/2012
                                                    // The JS Model
                                                    // calls for the
                                                    // field name to be
                                                    // 'PatientID' not
                                                    // 'patientId',
                $patientId = $form_data->{'PatientID'}; // but not sure how
                                                            // the 'patientId'
                                                            // field gets set so
                                                            // making sure to
                                                            // check both...
            } else {
                $retVal = array();
                $retVal['apperror'] = "Field name ---patientId--- not provided.";
                return $retVal;
            }
        }
        
        /*
         * sic removed, was not setting dateTaken
         * if(isset($form_data->{'DateTaken'})){ $dateTaken =
         * $form_data->{'DateTaken'}; } else { $dateTaken =
         * $this->getCurrentDate(); }
         */
        
        if (empty($dateTaken)) {
            $dateTaken = $this->getCurrentDate();
        }
        
        $query = "SELECT count(*) as count FROM Patient_History where Patient_ID = '" .
                 $patientId . "' AND Date_Taken = '" . $dateTaken . "'";
        $existingHistory = $this->query($query);
        
        if ($existingHistory[0]['count'] > 0) {
            $existingHistory['apperror'] = "Vitals data already exists for this Patient on this date.";
            return $existingHistory;
        }
        
        if (isset($form_data->{'OEMRecordID'})) {
            $oemRecordId = $form_data->{'OEMRecordID'};
        } else {
            $oemRecordId = null;
        }
        
        $systolic = $form_data->{'Systolic'};
        $diastolic = $form_data->{'Diastolic'};
        
        if (empty($form_data->{'BP'})) {
            $bp = $systolic . "/" . $diastolic;
        } else {
            $bp = $form_data->{'BP'};
        }
        
        $height = $form_data->{'Height'};
        $weight = $form_data->{'Weight'};
        
        $temp = $form_data->{'Temperature'};
        $tempLoc = $form_data->{'TemperatureLocation'};
        $pulse = $form_data->{'Pulse'};
        $resp = $form_data->{'Respiration'};
        $pain = $form_data->{'Pain'};
        $spo2 = $form_data->{'SPO2'};
        
        $bsa = $form_data->{'BSA'};
        $bsaMethod = $form_data->{'BSA_Method'};
        $weightFormula = $form_data->{'WeightFormula'};
        $bsaWeight = $form_data->{'BSA_Weight'};
        
        $templateId = $this->getTemplateIdByPatientID($patientId);
        if (null != $templateId && array_key_exists('error', $templateId)) {
            return $templateId;
        } else if (! empty($templateId)) {
            $templateId = $templateId[0]['id'];
        } else {
            $templateId = null;
        }
        
        // MWB Added...
        $PS_ID = null;
        if (isset($form_data->{'PS_ID'})) {
            $PS_ID = $form_data->{'PS_ID'};
        }
        
        /*
         * Not sure if Performance ID is important when saving Vitals. Seems to
         * make sense to save Performance Status if it was set before the Vitals
         * were taken. In other words the template was applied and the
         * Performance Status was set before the vitals were taken. Also use BSA
         * values for WeightFormula and BSA Method if the Start Date of the
         * Template is after the Date Taken
         */
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT Perf_Status_ID as id,BSA_Method as bsaMethod,Weight_Formula as weightFormula " .
                     "FROM Patient_Assigned_Templates where Is_Active = 1 and Patient_ID = '" .
                     $patientId . "' " . "AND Date_Started <= '" . $dateTaken .
                     "'";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT Perf_Status_ID as id,BSA_Method as bsaMethod,Weight_Formula as weightFormula " .
                     "FROM Patient_Assigned_Templates where Is_Active = true and Patient_ID = '" .
                     $patientId . "' " . "AND Date_Started <= '" . $dateTaken .
                     "'";
        }
        
        $record = $this->query($query);
        if (null != $record && array_key_exists('error', $record)) {
            return $record;
        } else if (count($record) > 0) {
            if (null === $PS_ID) { // MWB - 6/21/2012 - Modified this code
                                   // to use currently set PS_ID or to
                                   // retrieve one if it wasn't submitted in
                                   // the form.
                $performanceId = $record[0]['id'];
            } else {
                $performanceId = $PS_ID;
            } // MWB - 6/21/2012 - End of patch.
            
            $bsaMethod = $record[0]['bsaMethod'];
            $weightFormula = $record[0]['weightFormula'];
        }
        
        if (null == $oemRecordId) {
            if (! empty($templateId)) {
                $query = "INSERT INTO Patient_History(Patient_ID,Height,Weight,Blood_Pressure,Systolic,Diastolic,BSA,Temperature,TemperatureLocation,Date_Taken, " .
                         "Template_ID, Pulse, Respiration, Pain, OxygenationLevel,BSA_Method,Weight_Formula,BSA_Weight,Performance_ID) values(" .
                         "'" . $patientId . "','" . $height . "','" . $weight .
                         "','" . $bp . "','" . $systolic . "','" . $diastolic .
                         "','" . $bsa . "','$temp','$tempLoc','" . $dateTaken . "'," .
                         "'" . $templateId . "','" . $pulse . "','" . $resp .
                         "','" . $pain . "','" . $spo2 . "'," . "'" . $bsaMethod .
                         "','" . $weightFormula . "','" . $bsaWeight . "',";
            } else {
                $query = "INSERT INTO Patient_History(Patient_ID,Height,Weight,Blood_Pressure,Systolic,Diastolic,BSA,Temperature,TemperatureLocation,Date_Taken, " .
                         "Pulse, Respiration, Pain, OxygenationLevel,BSA_Method,Weight_Formula,BSA_Weight,Performance_ID) values(" .
                         "'" . $patientId . "','" . $height . "','" . $weight .
                         "','" . $bp . "','" . $systolic . "','" . $diastolic .
                         "','" . $bsa . "','$temp','$tempLoc','" . $dateTaken . "'," .
                         "'" . $pulse . "','" . $resp . "','" . $pain . "','" .
                         $spo2 . "'," . "'" . $bsaMethod . "','" . $weightFormula .
                         "','" . $bsaWeight . "',";
            }
        } else {
            if (! empty($templateId)) {
                $query = "INSERT INTO Patient_History(Patient_ID,Height,Weight,Blood_Pressure,Systolic,Diastolic,BSA,Temperature,TemperatureLocation,Date_Taken, " .
                         "Template_ID, OEM_ID, Pulse, Respiration, Pain, OxygenationLevel,BSA_Method,Weight_Formula,BSA_Weight,Performance_ID) values(" .
                         "'" . $patientId . "','" . $height . "','" . $weight .
                         "','" . $bp . "','" . $systolic . "','" . $diastolic .
                         "','" . $bsa . "','$temp','$tempLoc','" . $dateTaken . "'," .
                         "'" . $templateId . "','" . $oemRecordId . "','" .
                         $pulse . "','" . $resp . "','" . $pain . "','" . $spo2 .
                         "'," . "'" . $bsaMethod . "','" . $weightFormula . "','" .
                         $bsaWeight . "',";
            } else {
                $query = "INSERT INTO Patient_History(Patient_ID,Height,Weight,Blood_Pressure,Systolic,Diastolic,BSA,Temperature,Date_Taken, " .
                         "Pulse, Respiration, Pain, OxygenationLevel,BSA_Method,Weight_Formula,BSA_Weight,Performance_ID) values(" .
                         "'" . $patientId . "','" . $height . "','" . $weight .
                         "','" . $bp . "','" . $systolic . "','" . $diastolic .
                         "','" . $bsa . "','$temp','$tempLoc','" . $dateTaken . "'," .
                         "'" . $pulse . "','" . $resp . "','" . $pain . "','" .
                         $spo2 . "'," . "'" . $bsaMethod . "','" . $weightFormula .
                         "','" . $bsaWeight . "',";
            }
        }
        
        (empty($performanceId)) ? $query .= "null)" : $query .= "'" .
                 $performanceId . "')";
        
        // echo $query;
        
        $result = $this->query($query);
        
        if ($result) {
            return $result;
        }
        
        if (! empty($performanceId)) {
            $query = "
                UPDATE Patient_Assigned_Templates SET
                    Perf_Status_ID = '$performanceId'
                WHERE Patient_ID = '$patientId'
                    AND Is_Active = 1
            ";
            
            return $this->query($query);
        }
    }

    function updateOEMRecord ($form_data)
    {
        $templateid = $form_data->{'TemplateID'};
        $oemrecordid = $form_data->{'OEMRecordID'};
        $therapyid = $form_data->{'TherapyID'};
        $therapytype = $form_data->{'TherapyType'};
        $instructions = $form_data->{'Instructions'};
        $Status = $form_data->{'Status'};
        $admintime = $form_data->{'AdminTime'};
        $medid = $form_data->{'MedID'};
        $med = $form_data->{'Med'};
        $dose = $form_data->{'Dose'};
        $bsadose = $form_data->{'BSA_Dose'};
        
        $units = $form_data->{'Units'};
        $infusionmethod = $form_data->{'InfusionMethod'};
        $fluidtype = $form_data->{'FluidType'};
        $fluidvol = $form_data->{'FluidVol'};
        $flowrate = $form_data->{'FlowRate'};
        $infusiontime = $form_data->{'InfusionTime'}; 
        $dose2 = $form_data->{'Dose2'};
        
        $bsadose2 = $form_data->{'BSA_Dose2'};
        $units2 = $form_data->{'Units2'};
        $infusionmethod2 = $form_data->{'InfusionMethod2'};
        $fluidtype2 = $form_data->{'FluidType2'};
        $fluidvol2 = $form_data->{'FluidVol2'};
        $flowrate2 = $form_data->{'FlowRate2'};
        $infusiontime2 = $form_data->{'InfusionTime2'};
        
        $retVal = array();
        
        if (empty($therapytype)) {
            $retVal['apperror'] = "Therapy Type not provided.";
            return $retVal;
        }
        
        if (empty($therapyid)) {
            $retVal['apperror'] = "Therapy ID not provided.";
            return $retVal;
        }
        
        if (empty($oemrecordid)) {
            $retVal['apperror'] = "OEM Record ID not provided.";
            return $retVal;
        }
        
        if (empty($templateid)) {
            $retVal['apperror'] = "Template ID not provided.";
            return $retVal;
        }
        
        if (empty($med)) {
            $retVal['apperror'] = "Med not provided.";
            return $retVal;
        }
        
        if (empty($admintime)) {
            $admintime = '00:00:00';
        }
        $lookup = new LookUp();
        

        $info = $lookup->getLookupInfoById($medid);
        if (null != $info && array_key_exists('error', $info)) {
            return $info;
        }
        
        if ($med != $info[0]['Name']) {
            $record = $lookup->getLookupIdByNameAndType($med, 2);
            $medid = $record[0]['id'];
        }
        
        if ('Therapy' === $therapytype) {
            $infusionTypeid = $lookup->getLookupIdByNameAndType($infusionmethod, 12);
            $unitid = $lookup->getLookupIdByNameAndType($units, 11);
            
            if ($infusionTypeid) {
                $infusionTypeid = $infusionTypeid[0]["id"];
            } else {
                $infusionTypeid = null;
            }
            
            if (null == $infusionTypeid) {
                $retVal = array();
                $retVal['error'] = "Insert int MH_ID for $type Therapy failed. The Route could not be determined.";
                return $retVal;
            }
            
            if ($unitid) {
                $unitid = $unitid[0]["id"];
            } else {
                $unitid = null;
            }
            
            if (null == $unitid) {
                $retVal = array();
                $retVal['error'] = "Insert int MH_ID for $type Therapy failed. The unit id could not be determined.";
                return $retVal;
            }
            
            $query = "Update Template_Regimen 
            set Drug_ID = '$medid',
            Admin_Time ='$admintime', 
            Instructions ='$instructions', 
            Status = '$Status',
            Route_ID ='$infusionTypeid', 
            Regimen_Dose_Unit_ID ='$unitid', 
            Regimen_Dose ='$dose', 
            Flow_Rate ='$flowrate', 
            Fluid_Type ='$fluidtype', 
            Fluid_Vol ='$fluidvol', 
            BSA_Dose = '$bsadose', 
            Infusion_Time = '$infusiontime' 
            where Patient_Regimen_ID = '$therapyid'";
            $retVal = $this->query($query);
            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }
        } 
        else if ('Pre' === $therapytype || 'Post' === $therapytype) {
            $query = "select * from MH_Infusion where MH_ID = '$therapyid'";
            $infusionRecord = $this->query($query);
            if (null != $infusionRecord && array_key_exists('error', $infusionRecord)) {
                return $infusionRecord;
            }
            
            $query = "Update 
                Medication_Hydration set Drug_ID = '$medid',
                Admin_Time ='$admintime', 
                Description ='$instructions' 
                where MH_ID = '$therapyid'";

            $retVal = $this->query($query);
            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }
            
            for ($index = 0; $index < count($infusionRecord); $index ++) {
                if (1 == $index) {
                    $infusionmethod = $infusionmethod2;
                    $units = $units2;
                    $dose = $dose2;
                    $bsadose = $bsadose2;
                    $fluidtype = $fluidtype2;
                    $flowrate = $flowrate2;
                    $fluidvol = $fluidvol2;
                    $infusiontime = $infusiontime2;
                }
                $infusionTypeid = $lookup->getLookupIdByNameAndType($infusionmethod, 12);
                $unitid = $lookup->getLookupIdByNameAndType($units, 11);
                
                if ($infusionTypeid) {
                    $infusionTypeid = $infusionTypeid[0]["id"];
                } else {
                    $infusionTypeid = null;
                }
                
                if (null == $infusionTypeid) {
                    $retVal = array();
                    $retVal['error'] = "Insert int MH_ID for $type Therapy failed. The Route could not be determined.";
                    return $retVal;
                }
                
                if ($unitid) {
                    $unitid = $unitid[0]["id"];
                } else {
                    $unitid = null;
                }
                
                if (null == $unitid) {
                    $retVal = array();
                    $retVal['error'] = "Insert int MH_ID for $type Therapy failed. The unit id could not be determined.";
                    return $retVal;
                }
                
                $query = "Update MH_Infusion 
                set Infusion_Amt = '$dose',
                BSA_DOSE ='$bsadose',
                Infusion_Unit_ID='$unitid',
                Infusion_Type_ID='$infusionTypeid',
                Fluid_Type='$fluidtype',
                Flow_Rate='$flowrate',
                Fluid_Vol='$fluidvol',
                Infusion_Time='$infusiontime'
                where Infusion_ID ='" .$infusionRecord[$index]['Infusion_ID'] . "'";
                
                $retVal = $this->query($query);
                if (null != $retVal && array_key_exists('error', $retVal)) {
                    return $retVal;
                }
            }
        }
    }

    function addNewPatient ($patient, $value)
    {
        $fullName = explode(',', $patient->name);
        $gender = $patient->gender;
        $dob = $patient->dob;
        $dfn = $patient->localPid;
        
        $lastName = $fullName[0];
        $firstName = $fullName[1];
        
        if (count($fullName) > 2) {
            $middleName = $fullName[2];
        }
        
        $year = substr($dob, 0, 4);
        $month = substr($dob, 4, 2);
        $day = substr($dob, 6, 2);
        
        $sqlDob = $month . "/" . $day . "/" . $year;
        
        $query = "INSERT INTO Patient (Last_Name,First_Name,DOB,Gender,Date_Created,DFN,Match,Middle_Name) values(" .
                 "'" . $lastName . "','" . $firstName . "','" . $sqlDob . "','" .
                 $gender . "','" . $this->getCurrentDate() . "','" . $dfn . "','" .
                 $value . "',";
        
        (empty($middleName)) ? $query .= "null)" : $query .= "'" . $middleName .
                 "')";
        
        return $this->query($query);
    }

    function savePatient ($form_data)
    {
        $measurements = $form_data->{'Measurements'};
        
        $patientId = $form_data->{'id'};
        
        for ($index = 0; $index < count($measurements); $index ++) {
            
            $measurementData = $measurements[$index]->{'data'};
            
            $height = $measurementData->{'Height'};
            $weight = $measurementData->{'Weight'};
            $bp = $measurementData->{'BP'};
            $weightFormula = $measurementData->{'WeightFormula'};
            $bsaMethod = $measurementData->{'BSA_Method'};
            $bsa = $measurementData->{'BSA'};
            $dateTaken = $measurementData->{'DateTaken'};
            $bsaWeight = $measurementData->{'BSA_Weight'};
        }
        
        $query = "Select Patient_History_ID as id from Patient_History where Patient_ID = '" .
                 $patientId . "' and Date_Taken = '" . $dateTaken . "'";
        
        $retVal = $this->query($query);
        
        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        } else if ($retVal) {
            $query = "Update Patient_History set Height = '" . $height .
                     "', Weight = '" . $weight . "', Blood_Pressure='" . $bp .
                     "', Weight_Formula ='" . $weightFormula .
                     "', BSA_Method = '" . $bsaMethod . "', BSA_Weight = '" .
                     $bsaWeight . "',BSA = '" . $bsa . "' " .
                     "where Date_Taken = '" . $dateTaken . "' and Patient_ID = '" .
                     $patientId . "'";
        } else {
            
            $lookup = new LookUp();
            
            if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
                $query = "select Perf_Status_ID as id from Patient_Assigned_Templates where Is_Active = 1 and Patient_ID = '" .
                         $patientId . "'";
            } else if (DB_TYPE == 'mysql') {
                $query = "select Perf_Status_ID as id from Patient_Assigned_Templates where Is_Active = true and Patient_ID = '" .
                         $patientId . "'";
            }
            
            $performanceId = $this->query($query);
            if (null != $performanceId &&
                     array_key_exists('error', $performanceId)) {
                return $performanceId;
            }
            
            $query = "INSERT INTO Patient_History(Patient_ID,Height,Weight,Blood_Pressure,Weight_Formula,BSA_Method,BSA,BSA_Weight,Date_Taken, " .
                     "Performance_ID) values(" . "'" . $patientId . "','" .
                     $height . "','" . $weight . "','" . $bp . "','" .
                     $weightFormula . "','" . $bsaMethod . "','" . $bsa . "','" .
                     $bsaWeight . "','" . $dateTaken . "'," . "'" .
                     $performanceId[0]['id'] . "')";
        }
        
        $retVal = $this->query($query);
        
        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        }
        
        $query = "Select Patient_History_ID as id from Patient_History where Patient_ID = '$patientId' and Date_Taken = '$dateTaken'";
        
        return $this->query($query);
    }

    function getTopLevelOEMRecords ($patientId, $id)
    {
        $query = "Select Regimen_ID as RegimenID from Master_Template where Template_ID = '$id'";
        
        $regimenId = $this->query($query);
        
        if (null != $regimenId && array_key_exists('error', $regimenId)) {
            return $regimenId;
        }
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select Course_Number as CourseNum, Admin_Day as Day, CONVERT(VARCHAR(10), Admin_Date, 101) as AdminDate, Pre_MH_Instructions as PreTherapyInstr, " .
                     "Regimen_Instruction as TherapyInstr, Post_MH_Instructions as PostTherapyInstr, Template_ID as TemplateID " .
                     "from Master_Template " . "where Course_Number != 0 " .
                     "and Regimen_ID = '" . $regimenId[0]['RegimenID'] . "' " .
                     "and Patient_ID = '" . $patientId . "' " .
                     "order by Admin_Date";
        } else if (DB_TYPE == 'mysql') {
            $query = "select Course_Number as CourseNum, Admin_Day as Day, date_format(Admin_Date, '%m/%d/%Y') as AdminDate, Pre_MH_Instructions as PreTherapyInstr, " .
                     "Regimen_Instruction as TherapyInstr, Post_MH_Instructions as PostTherapyInstr, Template_ID as TemplateID " .
                     "from Master_Template " . "where Course_Number != 0 " .
                     "and Regimen_ID = '" . $regimenId[0]['RegimenID'] . "' " .
                     "and Patient_ID = '" . $patientId . "' " .
                     "order by Admin_Date";
        }
        error_log("Patient Model - getTopLevelOEMRecords()");
        error_log("$query");

        return $this->query($query);
    }

    function getTopLevelOEMRecordsNextThreeDays ($patientId, $id)
    {
        $today = date('m/d/Y');
        $EndDate = mktime(0, 0, 0, date("m"), date("d") + 3, date("Y"));
        // $EndDate = mktime(0,0,0,date("m"),date("d")+2,date("Y"));
        $EndDateSearch = date("m/d/Y", $EndDate);
        
        $query = "Select Regimen_ID as RegimenID from Master_Template where Template_ID = '" .
                 $id . "'";
        
        $regimenId = $this->query($query);
        
        if (null != $regimenId && array_key_exists('error', $regimenId)) {
            return $regimenId;
        }
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "
            select 
                Course_Number as CourseNum, 
                Admin_Day as Day, 
                CONVERT(VARCHAR(10), Admin_Date, 101) as AdminDate, 
                Pre_MH_Instructions as PreTherapyInstr,
                Regimen_Instruction as TherapyInstr, 
                Post_MH_Instructions as PostTherapyInstr, 
                Template_ID as TemplateID
                from Master_Template 
                where Course_Number != 0 and
                Admin_Date >='" . $today . "' and 
                Admin_Date < '" . $EndDateSearch . "'" . "and 
                Regimen_ID = '" . $regimenId[0]['RegimenID'] . "' " . "and 
                Patient_ID = '" . $patientId . "' " . "
                order by Admin_Date
            ";
        } else if (DB_TYPE == 'mysql') {
            $query = "select Course_Number as CourseNum, Admin_Day as Day, date_format(Admin_Date, '%m/%d/%Y') as AdminDate, Pre_MH_Instructions as PreTherapyInstr, " .
                     "Regimen_Instruction as TherapyInstr, Post_MH_Instructions as PostTherapyInstr, Template_ID as TemplateID " .
                     "from Master_Template " . "where Course_Number != 0 " .
                     "and Regimen_ID = '" . $regimenId[0]['RegimenID'] . "' " .
                     "and Patient_ID = '" . $patientId . "' " .
                     "order by Admin_Date";
        }
        
        return $this->query($query);
    }

    function getTemplateIdByPatientID ($id)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select Template_ID as id from Patient_Assigned_Templates where Patient_ID = '" .
                     $id . "' and Is_Active = 1";
        } else if (DB_TYPE == 'mysql') {
            $query = "select Template_ID as id from Patient_Assigned_Templates where Patient_ID = '" .
                     $id . "' and Is_Active = true";
        }
        
        return $this->query($query);
    }

    function getTopLevelPatientTemplateDataById ($patientId, $id)
    {
            $query = "select 
            mt.Template_ID as id, 
            lu.Description as name, 
            mt.Cycle_Length as length, 
            mt.Emotegenic_ID as emoID, 
            l2.Name as emoLevel, 
            mt.Febrile_Neutropenia_Risk as fnRisk, 
            mt.Pre_MH_Instructions preMHInstruct, 
            mt.Post_MH_Instructions postMHInstruct, 
            mt.Cycle_Time_Frame_ID as CycleLengthUnitID, 
            l1.Name as CycleLengthUnit, 
            mt.Cancer_ID as Disease, 
            mt.Disease_Stage_ID as DiseaseStage, 
            mt.Regimen_ID RegimenId, 
            mt.Version as version, 
            case when l3.Name is not null then l3.Name else '' end as DiseaseStageName, 
            mt.Course_Number as CourseNum, 
            mt.Total_Courses as CourseNumMax, 
            mt.Regimen_Instruction as regimenInstruction, 
            Goal, 
            case when pt.Clinical_Trial is not null then pt.Clinical_Trial else '' end as ClinicalTrial, 
            Status, 
            l4.Name + '-' + l4.Description as PerfStatus 
            from Master_Template mt 
            INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID 
            INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID 
            INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID 
            INNER JOIN Patient_Assigned_Templates pt ON pt.Template_ID = mt.Template_ID 
            LEFT JOIN LookUp l4 ON l4.Lookup_ID = pt.Perf_Status_ID 
            LEFT OUTER JOIN LookUp l3 ON l3.Lookup_ID = mt.Disease_Stage_ID 
            where mt.Template_ID = '$id' and pt.Patient_ID = '$patientId' and pt.Is_Active = 1";
        error_log("Patient model - getTopLevelPatientTemplateDataById()");
        error_log($query);
        return $this->query($query);
    }

    function getPatientIdByDFN ($dfn)
    {
        $query = "SELECT Patient_ID as id from Patient where DFN = '" . $dfn . "'";
        return $this->query($query);
    }

    function saveAllergy ($form_data, $patientId)
    {
        if (empty($patientId)) {
            $patientId = $form_data->{'id'};
        }
        
        // MWB - 5/4/2012 Added checks for parameters below via "isset()".
        // Testing of new patients from MDWS indicated that data is NOT always
        // returned (e.d. AllergenName === "Not Assessed" doesn't return an ID
        // or Type)
        // Not sure if there are other cases where data isn't returned
        // completely, so checked all parameters
        if (isset($form_data->{'allergenId'}, $form_data->{'allergenName'}, 
                $form_data->{'allergenType'})) {
            $allergen = $form_data->{'allergenName'};
            $type = $form_data->{'allergenType'};
            $vaId = $form_data->{'allergenId'};
            if (isset($form_data->{'comment'})) {
                $comment = $form_data->{'comment'};
            } else {
                $comment = '';
            }
        } else {
            // echo "Allergy - " . $form_data->{'allergenName'} . "<br>";
            $retVal = array();
            $a = array();
            if (DB_TYPE == 'sqlsrv') {
                $x = array();
                $x['SQLSTATE'] = "None";
                $x['code'] = "None";
                $x['message'] = "Allergies Not Assessed for this patient";
                $a[0] = $x;
                $retVal['error'] = $a;
            } else if (DB_TYPE == 'mysql') {
                $retVal['error'] = "Allergies Not Assessed for this patient";
            }
            
            // echo "saveAllergy() - Returning error condition<br>";
            return $retVal;
        }
        
        /*
         * This is the allergen id used in MDWS. We may want to store this at
         * some point. $allergenId = $form_data->{'allergenId'};
         */
        
        $lookup = new LookUp();
        
        $lookupId = $lookup->getLookupIdByNameAndType($allergen, 29);
        
        if (! empty($lookupId[0])) {
            $lookupId = $lookupId[0]['id'];
        } else {
            $lookupId = $lookup->save(29, $allergen, $type);
            $lookupId = $lookupId[0]['lookupid'];
        }
        
        $query = "SELECT count(*) as count FROM Patient_Allergies where COMS_Allergen_ID = '" .
                 $lookupId . "' AND Patient_ID = '" . $patientId . "'";
        
        $allergyCount = $this->query($query);
        
        if ($allergyCount[0]['count'] > 0) {
            $allergyCount['apperror'] = "This allergen already exists for this patient.";
            return $allergyCount;
        }
        
        $query = "INSERT INTO Patient_Allergies(Patient_ID,VA_Allergen_ID,COMS_Allergen_ID,Comment) values(" .
                 "'" . $patientId . "'," . $vaId . ",'" . $lookupId . "','" .
                 $comment . "')";
        
        $savedRecord = $this->query($query);
        
        return $savedRecord;
    }

    function getAllergies ($patientId)
    {
        $allergies = "SELECT VA_Allergen_ID as id,l.Name as name,l.Description as type,Comment as comment " .
                 "FROM Patient_Allergies pa " .
                 "INNER JOIN LookUp l ON l.Lookup_ID = pa.COMS_Allergen_ID " .
                 "WHERE pa.Patient_ID = '" . $patientId . "'";
        
        return $this->query($allergies);
    }

    function saveLabInfo ($labInfo, $patientId)
    {
        if (empty($patientId)) {
            $patientId = $labInfo->id;
        }
        
        $releaseDate = new DateTime($labInfo->releaseDate);
        $author = $labInfo->author;
        $specimen = $labInfo->specimen;
        $specInfo = $labInfo->specInfo;
        $specColDate = new DateTime($labInfo->specColDate);
        $results = $labInfo->Results;
        $comment = $labInfo->comment;
        
        $query = "SELECT CONVERT(VARCHAR,Date_Created,121) as Date_Created FROM Lab_Info where Patient_ID = '" .
                 $patientId . "' " . "AND Release_Date = '" .
                 $releaseDate->format('Y-m-d') . "' " . "AND Author = '" .
                 $author . "' AND Specimen = '" . $specimen .
                 "' AND Specimen_Info = '" . $specInfo . "' " .
                 "AND Spec_Col_Date ='" . $specColDate->format('Y-m-d') .
                 "' AND Comment = '" . $comment . "'";
        
        $exist = $this->query($query);
        
        $labInfoId = null;
        
        if (! empty($exist) && count($exist) > 0) {
            $query = "SELECT ID FROM Lab_Info where Patient_ID = '" . $patientId .
                     "' AND Date_Created = '" . $exist[0]['Date_Created'] . "'";
            
            $retVal = $this->query($query);
            
            $labInfoId = $retVal[0]['ID'];
        } else {
            $currDate = $this->getCurrentDate();
            
            $query = "INSERT INTO Lab_Info (Patient_ID,Release_Date,Author,Specimen,Specimen_Info,Spec_Col_Date,Comment,Date_Created) values(" .
                     "'" . $patientId . "','" . $releaseDate->format('Y-m-d') .
                     "','" . $author . "','" . $specimen . "','" . $specInfo .
                     "','" . $specColDate->format('Y-m-d') . "'," . "'" .
                     $comment . "','" . $currDate . "')";
            
            $retVal = $this->query($query);
            
            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }
            
            $query = "SELECT ID FROM Lab_Info where Patient_ID = '" . $patientId .
                     "' AND Date_Created = '" . $currDate . "'";
            
            $retVal = $this->query($query);
            
            $labInfoId = $retVal[0]['ID'];
        }
        
        foreach ($results as $result) {
            
            $mdwsid = $result->mdwsid;
            $name = $result->name;
            $units = htmlentities($result->units);
            $testResult = $result->result;
            $refRange = explode('-', $result->refRange);
            $siteId = $result->siteId;
            
            $currDate = $this->getCurrentDate();
            
            if (isset($result->boundaryStatus) && ! empty(
                    $result->boundaryStatus)) {
                $boundaryStatus = true;
            } else {
                $boundaryStatus = false;
            }
            
            $query = "SELECT count(*) as count FROM Lab_Info_Results " .
                     "WHERE Lab_Info_ID = '" . $labInfoId .
                     "' AND Lab_Test_Name = '" . $name .
                     "' AND Lab_Test_Units = '" . $units . "' " .
                     "AND Lab_Test_Result = '" . $testResult .
                     "' AND MDWS_Lab_Result_ID = " . $mdwsid .
                     " AND Accept_Range_Low = '" . $refRange[0] . "' " .
                     "AND Accept_Range_High = '" . $refRange[1] .
                     "' AND Site_ID = " . $siteId . " AND Out_Of_Range = '" .
                     $boundaryStatus . "'";
            
            $labInfoCount = $this->query($query);
            
            if ($labInfoCount[0]['count'] > 0) {
                $labInfoCount['apperror'] = "This Lab Info Result already exists for this patient.";
                return $labInfoCount;
            }
            
            $query = "INSERT INTO Lab_Info_Results (Lab_Info_ID,Lab_Test_Name,Lab_Test_Units,Lab_Test_Result,MDWS_Lab_Result_ID,Accept_Range_Low," .
                     "Accept_Range_High,Site_ID,Out_Of_Range,Date_Created) values(" .
                     "'" . $labInfoId . "','" . $name . "','" . $units . "','" .
                     $testResult . "'," . $mdwsid . ",'" . $refRange[0] . "','" .
                     $refRange[1] . "'," . $siteId . "," . "'" . $boundaryStatus .
                     "','" . $currDate . "')";
            
            $retVal = $this->query($query);
            
            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }
        }
    }

    function getLabInfoForPatient ($patientId)
    {
        $query = "SELECT ID,CONVERT(VARCHAR(10),Release_Date, 101) as relDate,Author as author,Specimen as specimen,Specimen_Info as specInfo," .
                 "CONVERT(VARCHAR(10),Spec_Col_Date, 101) as specColDate,Comment as comment " .
                 "FROM Lab_Info where Patient_ID = '" . $patientId . "'";
        
        return $this->query($query);
    }

    function getLabInfoResults ($labInfoId)
    {
        $query = "SELECT ID,Lab_Test_Name as name,Lab_Test_Units as units,Lab_Test_Result as result,MDWS_Lab_Result_ID as mdwsId, " .
                 "Accept_Range_Low + ' - ' + Accept_Range_High as acceptRange,Site_ID as site,Out_Of_Range as outOfRange " .
                 "FROM Lab_Info_Results where Lab_Info_ID = '" . $labInfoId . "'";
        
        return $this->query($query);
    }

    /**
     *
     * @param string $orderId            
     * @param string $orderStatus            
     * @return array
     */
    public function updateOrderStatus ($orderId, $orderStatus)
    {
        $query = "
    	    UPDATE Order_Status SET 
    	        Order_Status = '$orderStatus' 
    	    WHERE Order_ID = '$orderId'
    	";
        
        return $this->query($query);
    }

    /**
     *
     * @param string $patientId            
     * @param string $drug            
     * @param string $orderStatus            
     */
    public function updateOrderStatusByPatientIdAndDrugName ($patientId, 
            $drugName, $orderStatus)
    {
        $query = "
	        UPDATE Order_Status SET
	            Order_Status = '$orderStatus'
	        WHERE Patient_ID = '$patientId'
	            AND Drug_Name = '$drugName'
	    ";
        
        return $this->query($query);
    }

    /**
     *
     * @param string $orderId            
     * @return array
     */
    public function getPatientIdByOrderId ($orderId)
    {
        $query = "
	        SELECT Patient_ID
	        FROM Order_Status
	        WHERE Order_ID = '$orderId'
	    ";
        
        return $this->query($query);
    }

    function updateOrderStatusTable ($TID, $Drug_Name, $Order_Type, $PID, 
            $Order_ID, $Order_Status)
    {
        if ($Order_ID === '') {
            $Order_Status = "First Entry";
            $query = "INSERT INTO Order_Status(Template_ID, Order_Status, Drug_Name, Patient_ID) VALUES ('" .
                     $TID . "','" . $Order_Status . "','" . $Drug_Name . "','" .
                     $PID . "'')";
        } else {
            $Order_Status = "Else";
            $query = "Update Order_Status set Order_Status = '" . $Order_Status .
                     "',Drug_Name = '" . $Drug_Name . "' " .
                     "where Template_ID = '" . $Template_ID .
                     "' AND Drug_Name = '" . $Drug_Name . "' AND Patient_ID = '" .
                     $PID . "'";
        }
        
        $this->query($query);
    }

    function updateOrderStatusIn ($TID, $Drug_Name, $Order_Type, $PID)
    {
        $Template_IDchk = NULL;
        $Drug_Namechk = NULL;
        
        $query = "SELECT Template_ID as Template_ID_CHK, Drug_Name as Drug_Name_CHK, Order_Type as Order_Type " .
                 "FROM Order_Status " . "WHERE Template_ID = '" . $TID . "' " .
                 "AND Drug_Name = '" . $Drug_Name . "'";
        $queryq = $this->query($query);
        foreach ($queryq as $row) {
            $Template_IDchk = $row['Template_ID_CHK'];
            $Drug_Namechk = $row['Drug_Name_CHK'];
            // echo "Template_IDchk: ".$Template_IDchk."<br>";
            // echo "Drug_Namechk: ".$Drug_Namechk."<br>";
        }
        if ($Template_IDchk === NULL) {
            // echo "empty sring";
            $query = "INSERT INTO Order_Status(Template_ID, Order_Status, Drug_Name, Order_Type, Patient_ID) VALUES ('$TID','Finalized','$Drug_Name','$Order_Type','$PID')";
        } else {
            $query = "Update Order_Status set Order_Status = 'Finalized' " .
                     "where Template_ID = '" . $TID . "' " . "AND Drug_Name = '" .
                     $Drug_Name . "' " . "AND Patient_ID = '" . $PID . "'";
            // "AND Order_Type = '".$Order_Type."'";
        }
        
        $this->query($query);
    }

    function LookupNameIn ($LID)
    {
        $query = "SELECT Name as LK_Name FROM LookUp WHERE Lookup_ID = '" . $LID .
                 "'";
        $queryq = $this->query($query);
        foreach ($queryq as $row) {
            $LK_Name = $row['LK_Name'];
        }
        return $LK_Name;
    }

    function LookupPatientID ($oemrecordid)
    {
        $query = "SELECT Patient_ID as LK_Patient_ID FROM Master_Template WHERE Template_ID = '" .
                 $oemrecordid . "'";
        
        // var_dump($query);
        $queryq = $this->query($query);
        foreach ($queryq as $row) {
            $patientid = $row['LK_Patient_ID'];
        }
        // echo $patientid;
        return $patientid;
    }

    function OEMupdateOrderStatus ($form_data)
    {
        var_dump($form_data);
        // var_dump($preHydrations);
        
        $TID = $form_data->{'TemplateID'};
        // $patientid = $form_data->{'PatientId'};
        // $patientid = $this->LookupPatientID($OEMRecordID);
        // foreach ($preHydrations as $preorderRecord) {
        
        // prehydration
        // $Drug_Name = $preorderRecord['drug'];
        // $DrugID = $preorderRecord['id'];
        // $Order_Type = $preorderRecord['type'];
        
        $Order_Status = "In-Coordination";
        
        $query = "Update Order_Status set Order_Status = '" . $OrderStatusF .
                 "',Drug_Name = '" . $Drug_NameF . "' " . "where Order_ID = '" .
                 $OrderIDF . "' ";
        
        $this->query($query);
        // }
    }

    function LookupName ($LID)
    {
        $query = "SELECT Name as LK_Name FROM LookUp WHERE Lookup_ID = '" . $LID .
                 "'";
        $queryq = $this->query($query);
        foreach ($queryq as $row) {
            $LK_Name = $row['LK_Name'];
        }
        return $LK_Name;
    }

    function LookupDescription ($LID)
    {
        $query = "SELECT Description as LK_Description FROM LookUp WHERE Lookup_ID = '" .
                 $LID . "'";
        $queryq = $this->query($query);
        foreach ($queryq as $row) {
            $LK_Description = $row['LK_Description'];
        }
        return $LK_Description;
    }
    
    // order check end of else
    // }
}
