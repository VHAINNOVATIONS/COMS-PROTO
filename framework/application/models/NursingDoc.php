<?php

class NursingDoc extends Model {
    
    private $_treatmentId = null;
    private $_dischargeInstructionId = null;
    
    /**
     *
     * @param stdClass $data
     * @param string $id
     * @return array
     */
    public function saveDischargeInstruction($data, $id = null)
    {

        if (!empty($id)) {
            $this->_dischargeInstructionId = $id;
            $dischargeInstruction = $this->query("SELECT * FROM Discharge_Instruction WHERE id = '$id'");
            if (!empty($dischargeInstruction)) {
                return $this->_updateDischargeInstruction($data);
            }
        } else {
            $this->_dischargeInstructionId = trim(com_create_guid(), '{}');
        }
        
        return $this->_insertDischargeInstruction($data);
        
    }
    
    private function _insertDischargeInstruction($data)
    {
        $pat_id = $data->pat_id;
        $title = $data->title;
        $instruction = $data->instruction;
        $active = $data->active;
        
        $query = "
            INSERT INTO Discharge_Instruction (
                id,
                pat_id,
                title,
                instruction,
                active
            ) VALUES (
                '{$this->_dischargeInstructionId}',
                '$pat_id',
                '$title',
                '$instruction',
                $active
            )
        ";
        
        $result = $this->query($query);
        if (!empty($result['error'])) {
            return $result;
        }
    }
        
    private function _updateDischargeInstruction($data)
    {
        $fields[] = (!empty($data->pat_id)) ? "pat_id = '{$data->pat_id}'" : null;
        $fields[] = (!empty($data->title)) ? "title = '{$data->title}'" : null;
        $fields[] = (!empty($data->instruction)) ? "instruction = '{$data->instruction}'" : null;
        $fields[] = (!empty($data->active) || $data->active === '0') ? "active = {$data->active}" : null;
        
        $updateFields = null;
        foreach ($fields as $field) {
            if (!empty($field)) {
                $updateFields .= $field . ', ';
            }
        }
        
        if (!empty($updateFields)) {
            $updateFields = trim($updateFields, ', ');
            $query = "
                UPDATE Discharge_Instruction SET 
                $updateFields
                WHERE id = '{$this->_dischargeInstructionId}'
            ";
            $result = $this->query($query);
            if (!empty($result['error'])) {
                return $result;
            }
        }
                
    }
    
    public function getDischargeInstructionId()
    {
        return $this->_dischargeInstructionId;
    }
    
    public function getActiveDischargeInstructions()
    {
        $query = "
            SELECT *
            FROM Discharge_Instruction
            WHERE active = 1
        ";
        
        return $this->query($query);
    }
    
    public function getTreatments($id) 
    {
        $query = "
            SELECT * 
            FROM ND_Treatment
            WHERE PAT_ID = '$id'
        ";
        
        return $this->query($query);
    }

    /**
     * 
     * @param stdClass $data
     * @return array
     */
    public function updateTreatment($data)
    {
        $query = "SELECT NEWID()";
        $GUID = $this->query($query);
        $GUID = $GUID[0][""];
		
		//var_dump($data);

        $this->_treatmentId = trim($GUID, '{}');
        $Patient_ID = $data->patientID;
        $Template_ID = $data->templateID;
        $PAT_ID = $data->PAT_ID;
        $Cycle = $data->Cycle;
        $AdminDay = $data->adminDay;
        $AdminDate = $data->adminDate;
        $Type = $data->type;  
        $Drug = $data->drug;
        $Dose = $data->dose;
        $Unit = $data->unit;
        $Route = $data->route;
        $StartTime = $data->StartTime;
        $EndTime = $data->EndTime;
        $Comments = $data->Comments;
        $Treatment_User = $data->Treatment_User;
        $Treatment_Date = $data->Treatment_Date;
        $Drug_OriginalValue = $data->drug_originalValue;
        $Dose_OriginalValue = $data->dose_originalValue;
        $Unit_OriginalValue = $data->unit_originalValue;
        $Route_OriginalValue = $data->route_originalValue;
        
        $query = 
            "INSERT INTO ND_Treatment (
                Treatment_ID,
                Patient_ID,
                Template_ID,
                PAT_ID,
                Cycle,
                AdminDay,
                AdminDate,
                Type,
                Drug,
                Dose,
                Unit,
                Route,
                StartTime,
                EndTime,
                Comments,
                Treatment_User,
                Treatment_Date,
                Drug_OriginalValue,
                Dose_OriginalValue,
                Unit_OriginalValue,
                Route_OriginalValue
            ) VALUES (
                '{$this->_treatmentId}',
                '$Patient_ID',
                '$Template_ID',
                '$PAT_ID',
                '$Cycle',
                '$AdminDay',
                '$AdminDate',
                '$Type',
                '$Drug',
                '$Dose',
                '$Unit',
                '$Route',
                '$StartTime',
                '$EndTime',
                '$Comments',
                '$Treatment_User',
                '$Treatment_Date',
                '$Drug_OriginalValue',
                '$Dose_OriginalValue',
                '$Unit_OriginalValue',
                '$Route_OriginalValue'
            ) ";
            
        $result = $this->query($query);
        
        if (!empty($result['error'])) {
            return $result;
        }
    }        
    
    public function getTreatmentId()
    {
        return $this->_treatmentId;
    }
    
    function getGenInfoForPatient($patientId) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select GenInfo_ID as id, CONVERT(VARCHAR(30), Date_Assessment, 100) as date, Author as author, Goal as goal, ".
                    "case when (PatientIDGood = 1) then 'true' else 'false' end as patientIDGood, " .
                    "case when (ConsentGood = 1) then 'true' else 'false' end as consentGood, Comment as comment, ".
                    "case when (EducationGood = 1) then 'true' else 'false' end as educationGood, " .
                    "case when (PlanReviewed =1) then 'true' else 'false' end as planReviewed ".
                    /*, '' as allergies, " .
                    "ClinicalTrial as clinicalTrial, ClinicalTrialType as clinicalTrialType " .*/
                    "from ND_GenInfo " .
                    "where Patient_ID = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            $query = "select GenInfo_ID as id, Date_Assessment as date, Author as author, Goal as goal, (SELECT IF(PatientIDGood, 'true', 'false')) as patientIDGood, " .
                    "(SELECT IF(ConsentGood, 'true', 'false')) as consentGood, Comment as comment, (SELECT IF(EducationGood, 'true', 'false')) as educationGood, " .
                    "(SELECT IF(PlanReviewed, 'true', 'false')) as planReviewed, '' as allergies, " .
                    "(SELECT IF(ClinicalTrial, 'true', 'false')) as clinicalTrial, ClinicalTrialType as clinicalTrialType " .
                    "from ND_GenInfo " .
                    "where Patient_ID = '" . $patientId . "'";
        }

        return $this->query($query);
    }

    function getTopLevelAssessment($patiendId){
        $query = "select Asmnt_ID as id, CONVERT(VARCHAR(10), Date_Assessment, 101) as date, Author as author from ND_Assessment where Patient_ID = '" .$patiendId."'";
        return $this->query($query);
    }
    
    function getAssessmentDetail($asmntId){
        $query = "select Sequence as sequence, Field_Label as fieldLabel, Comments as comments, Level_Chosen as levelChosen, ".
                    "case when (Choice = 1) then 'true' else 'false' end as choice " .
                    "from ND_Assessment_Details where Asmnt_ID = '".$asmntId."'";
        return $this->query($query);
    }
    
    function getCTCAESoc() {

        $query = "select * from CTCAE_SOC";

        return $this->query($query);
    }

    function getCTCAEData($catId) {

        $query = "select * from CTCAE_Data where cat = '" . $catId . "'";

        return $this->query($query);
    }
    
    function saveGenInfo($form_data){

        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }
        
        $author = get_current_user();
        $patiendIdGood = $form_data->{'patientIDGood'};
        $consentGood = $form_data->{'consentGood'};
        $comment = $form_data->{'comment'};
        $educationGood = $form_data->{'educationGood'};
        $planReviewed = $form_data->{'planReviewed'};
        
        $currDate = $this->getCurrentDate();
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            
            $query = "INSERT INTO ND_GenInfo (Patient_ID,Date_Assessment,Author,PatientIDGood,ConsentGood,Comment,EducationGood,PlanReviewed) values(".
                     "'".$patientId."','".$currDate."','".$author."','".$patiendIdGood."','".$consentGood."','".$comment."','".$educationGood."','".$planReviewed."')";
        } else if (DB_TYPE == 'mysql') {
            $query = "INSERT INTO ND_GenInfo (Patient_ID,Date_Assessment,Author,PatientIDGood,ConsentGood,Comment,EducationGood,PlanReviewed) values(".
                     "'".$patientId."','".$currDate."','".$author."',".$patiendIdGood.",".$consentGood.",'".$comment."',".$educationGood.",".$planReviewed.")";
        }
        
        return $this->query($query);
        
    }
    
    function saveIVSite($form_data){
        
        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }
        
        $currDate = $this->getCurrentDate();
        $deviceId = $form_data->{'DeviceID'};
        $deviceName = $form_data->{'DeviceName'};
        $gaugeId = $form_data->{'GaugeID'};
        $gaugeName = $form_data->{'GaugeName'};
        $locationId = $form_data->{'LocationID'};
        $locationName = $form_data->{'LocationName'};
        $accessComments = $form_data->{'AccessComments'};
        $noSymptoms = $form_data->{'NoSymptoms'};
        $pain = $form_data->{'Pain'};
        $swelling = $form_data->{'Swelling'};
        $erythema = $form_data->{'Erythema'};
        $disconnected = $form_data->{'Disconnected'};
        $appearanceComments = $form_data->{'AppearanceComments'};
        $preTreatment = $form_data->{'PreTreatment'};
        $postTreatment = $form_data->{'PostTreatment'};
        $duringTreatment = $form_data->{'DuringTreatment'};
        $bbrvComments = $form_data->{'BBRVComments'};
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            
            $query = "INSERT INTO ND_IVSite (PatientID,DeviceID,DeviceName,GaugeID,GaugeName,LocationID,LocationName,AccessComments,NoSymptoms,Pain,Swelling,".
                     "Erythema,Disconnected,AppearanceComments,PreTreatment,DuringTreatment,PostTreatment,BBRVComments,DateAccessed) values(".
                     "'".$patientId."',".$deviceId.",'".$deviceName."',".$gaugeId.",'".$gaugeName."',".$locationId.",'".$locationName."','".$accessComments."','".
                     $noSymptoms."','".$pain."','".$swelling."','".$erythema."','".$disconnected."','".$appearanceComments."','".$preTreatment."','".$duringTreatment."','".
                     $postTreatment."','".$bbrvComments."','".$currDate."')";
        } else if (DB_TYPE == 'mysql') {
            $query = "INSERT INTO ND_IVSite (PatientID,DeviceID,DeviceName,GaugeID,GaugeName,LocationID,LocationName,AccessComments,NoSymptoms,Pain,Swelling,".
                     "Erythema,Disconnected,AppearanceComments,PreTreatment,DuringTreatment,PostTreatment,BBRVComments,DateAccessed) values(".
                     "'".$patientId."',".$deviceId.",'".$deviceName."',".$gaugeId.",'".$gaugeName."',".$locationId.",'".$locationName."','".$accessComments."',".
                     $noSymptoms.",".$pain.",".$swelling.",".$erythema.",".$disconnected.",'".$appearanceComments."',".$preTreatment.",".$duringTreatment.",".
                     $postTreatment.",'".$bbrvComments."','".$currDate."')";
        }
        
        return $this->query($query);
        
    }

    function getIVSiteForPatient($patientId){
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select IVSite_ID as id, CONVERT(VARCHAR(30), DateAccessed, 100) as DateAccessed,DeviceID,DeviceName,GaugeID,GaugeName,LocationID, ".
                    "LocationName,AccessComments,AppearanceComments,BBRVComments, ".
                    "case when (NoSymptoms = 1) then 'true' else 'false' end as NoSymptoms, " .
                    "case when (Pain = 1) then 'true' else 'false' end as Pain, ".
                    "case when (Swelling = 1) then 'true' else 'false' end as Swelling, " .
                    "case when (Erythema =1) then 'true' else 'false' end as Erythema, ".
                    "case when (Disconnected =1) then 'true' else 'false' end as Disconnected, ".                    
                    "case when (PreTreatment =1) then 'true' else 'false' end as PreTreatment, ".                                        
                    "case when (PostTreatment =1) then 'true' else 'false' end as PostTreatment, ".                                                            
                    "case when (DuringTreatment =1) then 'true' else 'false' end as DuringTreatment ".                                                                                
                    "from ND_IVSite " .
                    "where PatientID = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            
        }

        return $this->query($query);
        
    }
    
    function getReactAssessForPatient($patientId){
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select ID as id, CONVERT(VARCHAR(30), DateTaken, 100) as DateTaken,Comments, ".
                    "case when (NoSymptoms = 1) then 'true' else 'false' end as NoSymptoms, " .
                    "case when (Adverse = 1) then 'true' else 'false' end as Adverse ".
                    "from ND_ReactAssess " .
                    "where patientId = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            
        }

        return $this->query($query);
        
    }

    function getReactAssessXtravForPatient($patientId){
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select * from ND_ReactAssessXtrav where patientId = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            
        }

        return $this->query($query);
        
    }
    
    function getReactAssessCRSForPatient($patientId){

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select * from ND_ReactAssessCRSyndrome where patientId = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            
        }

        return $this->query($query);
        
    }
    
    function getReactAssessHorA($patientId){
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "select * from ND_ReactAssessHorA where patientId = '" . $patientId . "'";
        } else if (DB_TYPE == 'mysql') {
            
        }

        return $this->query($query);
        
    }
    
    function saveReactAssessHorA($form_data){
        
        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }

        $currDate = $this->getCurrentDate();
        $ND_RA_HorA_Agitation = $form_data->ND_RA_HorA_Agitation;
        $ND_RA_HorA_ChestTight = $form_data->ND_RA_HorA_ChestTight;
        $ND_RA_HorA_Hypotension = $form_data->ND_RA_HorA_Hypotension;
        $ND_RA_HorA_BP = $form_data->ND_RA_HorA_BP;
        $ND_RA_HorA_Dyspnea = $form_data->ND_RA_HorA_Dyspnea;
        $ND_RA_HorA_Wheezing = $form_data->ND_RA_HorA_Wheezing;
        $ND_RA_HorA_Urticaria = $form_data->ND_RA_HorA_Urticaria;
        $ND_RA_HorA_PeriorbitalEdema = $form_data->ND_RA_HorA_PeriorbitalEdema;
        $ND_RA_HorA_AbdominalCramping = $form_data->ND_RA_HorA_AbdominalCramping;
        $ND_RA_HorA_Diarrhea = $form_data->ND_RA_HorA_Diarrhea;
        $ND_RA_HorA_Nausea = $form_data->ND_RA_HorA_Nausea;
        
        $query = "INSERT INTO ND_ReactAssessHorA (patientId,DateTaken,ND_RA_HorA_Agitation,ND_RA_HorA_ChestTight,ND_RA_HorA_Hypotension,ND_RA_HorA_BP, ".
                 "ND_RA_HorA_Dyspnea,ND_RA_HorA_Wheezing,ND_RA_HorA_Urticaria,ND_RA_HorA_PeriorbitalEdema,ND_RA_HorA_AbdominalCramping, ".
                 "ND_RA_HorA_Diarrhea,ND_RA_HorA_Nausea) values(".
                "'".$patientId."','".$currDate."','".$ND_RA_HorA_Agitation."','".$ND_RA_HorA_ChestTight."','".$ND_RA_HorA_Hypotension."','".$ND_RA_HorA_BP.
                "'".$ND_RA_HorA_Dyspnea."','".$ND_RA_HorA_Wheezing."','".$ND_RA_HorA_Urticaria."','".$ND_RA_HorA_PeriorbitalEdema.
                "'".$ND_RA_HorA_AbdominalCramping."','".$ND_RA_HorA_Diarrhea."','".$ND_RA_HorA_Nausea."')";

        return $this->query($query);
        
    }
    
    function saveReactAssessCRS($form_data){
        
        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }

        $currDate = $this->getCurrentDate();
        $ND_RA_CRS_Fever = $form_data->ND_RA_CRS_Fever;
        $ND_RA_CRS_Temperature = $form_data->ND_RA_CRS_Temperature;
        $ND_RA_CRS_Chills = $form_data->ND_RA_CRS_Chills;
        $ND_RA_CRS_Rigors = $form_data->ND_RA_CRS_Rigors;
        $ND_RA_CRS_Nausea = $form_data->ND_RA_CRS_Nausea;
        $ND_RA_CRS_Hypotension = $form_data->ND_RA_CRS_Hypotension;
        $ND_RA_CRS_BP = $form_data->ND_RA_CRS_BP;
        $ND_RA_CRS_Tachycardia = $form_data->ND_RA_CRS_Tachycardia;
        $ND_RA_CRS_Pulse = $form_data->ND_RA_CRS_Pulse;
        $ND_RA_CRS_Asthenia = $form_data->ND_RA_CRS_Asthenia;
        $ND_RA_CRS_Headache = $form_data->ND_RA_CRS_Headache;
        $ND_RA_CRS_Rash = $form_data->ND_RA_CRS_Rash;
        $ND_RA_CRS_RashDesc = $form_data->ND_RA_CRS_RashDesc;
        $ND_RA_CRS_TongueEdema = $form_data->ND_RA_CRS_TongueEdema;
        $ND_RA_CRS_Dyspnea = $form_data->ND_RA_CRS_Dyspnea;
        
        $query = "INSERT INTO ND_ReactAssessCRSyndrome (patientId,DateTaken,ND_RA_CRS_Fever,ND_RA_CRS_Temperature,ND_RA_CRS_Chills,ND_RA_CRS_Rigors, ".
                 "ND_RA_CRS_Nausea,ND_RA_CRS_Hypotension,ND_RA_CRS_BP,ND_RA_CRS_Tachycardia,ND_RA_CRS_Pulse, ".
                 "ND_RA_CRS_Asthenia,ND_RA_CRS_Headache,ND_RA_CRS_Rash,ND_RA_CRS_RashDesc,ND_RA_CRS_TongueEdema,ND_RA_CRS_Dyspnea) values(".
                "'".$patientId."','".$currDate."','".$ND_RA_CRS_Fever."','".$ND_RA_CRS_Temperature."','".$ND_RA_CRS_Chills."','".$ND_RA_CRS_Rigors.
                "'".$ND_RA_CRS_Nausea."','".$ND_RA_CRS_Hypotension."','".$ND_RA_CRS_BP."','".$ND_RA_CRS_Tachycardia.
                "'".$ND_RA_CRS_Pulse."','".$ND_RA_CRS_Asthenia."','".$ND_RA_CRS_Headache."','".$ND_RA_CRS_Rash."','".$ND_RA_CRS_RashDesc.
                "'".$ND_RA_CRS_TongueEdema."','".$ND_RA_CRS_Dyspnea."')";

        return $this->query($query);
        
        
    }
    function saveReactAssessXtrav($form_data){
        
        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }

        $currDate = $this->getCurrentDate();
        $ND_RA_Xtrav_Heating = $form_data->ND_RA_Xtrav_Heating;
        $ND_RA_Xtrav_HeatFreq = $form_data->ND_RA_Xtrav_HeatFreq;
        $ND_RA_Xtrav_Cooling = $form_data->ND_RA_Xtrav_Cooling;
        $ND_RA_Xtrav_CoolFreq = $form_data->ND_RA_Xtrav_CoolFreq;
        $ND_RA_Xtrav_Interventions = $form_data->ND_RA_Xtrav_Interventions;
        $ND_RA_Xtrav_InterventionsGiven = $form_data->ND_RA_Xtrav_InterventionsGiven;
        $ND_RA_Xtrav_Antidote = $form_data->ND_RA_Xtrav_Antidote;
        $ND_RA_Xtrav_AntidotesGiven = $form_data->ND_RA_Xtrav_AntidotesGiven;
        $ND_RA_Xtrav_MeasurementsTaken = $form_data->ND_RA_Xtrav_MeasurementsTaken;
        $ND_RA_Xtrav_Edema = $form_data->ND_RA_Xtrav_Edema;
        $ND_RA_Xtrav_Erythema = $form_data->ND_RA_Xtrav_Erythema;
        $ND_RA_Xtrav_Discomfort = $form_data->ND_RA_Xtrav_Discomfort;
        $ND_RA_Xtrav_DiscomfortDesc = $form_data->ND_RA_Xtrav_DiscomfortDesc;
        
        $query = "INSERT INTO ND_ReactAssessXtrav (patientId,DateTaken,ND_RA_Xtrav_Heating,ND_RA_Xtrav_HeatFreq,ND_RA_Xtrav_Cooling,ND_RA_Xtrav_CoolFreq, ".
                 "ND_RA_Xtrav_Interventions,ND_RA_Xtrav_InterventionsGiven,ND_RA_Xtrav_Antidote,ND_RA_Xtrav_AntidotesGiven,ND_RA_Xtrav_Measurements, ".
                 "ND_RA_Xtrav_MeasurementsTaken,ND_RA_Xtrav_Edema,ND_RA_Xtrav_Erythema,ND_RA_Xtrav_Discomfort,ND_RA_Xtrav_DiscomfortDesc) values(".
            "'".$patientId."','".$currDate."','".$ND_RA_Xtrav_Heating."','".$ND_RA_Xtrav_HeatFreq."','".$ND_RA_Xtrav_Cooling."','".$ND_RA_Xtrav_CoolFreq.
            "'".$ND_RA_Xtrav_Interventions."','".$ND_RA_Xtrav_InterventionsGiven."','".$ND_RA_Xtrav_Antidote."','".$ND_RA_Xtrav_AntidotesGiven.
            "'".$ND_RA_Xtrav_Measurements."','".$ND_RA_Xtrav_MeasurementsTaken."','".$ND_RA_Xtrav_Edema."','".$ND_RA_Xtrav_Erythema."','".$ND_RA_Xtrav_Discomfort.
            "'".$ND_RA_Xtrav_DiscomfortDesc."')";

        return $this->query($query);
        
    }
    function saveReactAssess($form_data){
        
        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }

        $currDate = $this->getCurrentDate();
        $adverse = $form_data->Adverse;
        $comments = $form_data->Comments;
        
        $query = "INSERT INTO ND_ReactAssess (patientId,DateTaken,Adverse,Comments) values(".
            "'".$patientId."','".$currDate."','".$adverse."','".$comments."')";

        return $this->query($query);

    }
    
    function saveAssesment($form_data){

        if(isset($form_data->{'patientId'})){
            $patientId = $form_data->{'patientId'};
        }else{
            $retVal = array();            
            $retVal['apperror'] = "Field name ---patientId--- not provided.";    
            return $retVal;
        }
        
        $currDate = $this->getCurrentDate();
        $author = get_current_user();
        $assementDetails = $form_data->{'assessmentDetails'};

        $query = "INSERT INTO ND_Assessment (Patient_ID,Date_Assessment,Author) values(".
                    "'".$patientId."','".$currDate."','".$author."')";

        $retVal = $this->query($query);

        if (null != $retVal && isset($retVal['error'])) {
            return $retVal;
        }            

        $query = "SELECT Asmnt_ID as id FROM ND_Assessment where Patient_ID = '".$patientId."' AND Date_Assessment = '".$currDate."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && isset($retVal['error'])) {
            return $retVal;
        }            
        
        $asmntId = $retVal[0]['id'];
        
        foreach ($assementDetails as $detail) {
            
            $sequence = $detail->{'sequence'};
            $fieldLabel = $detail->{'fieldLabel'};
            $choice = $detail->{'choice'};
            $levelChosen = $detail->{'levelChosen'};
            $comments = $detail->{'comments'};
            
            if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {         
                ('true' == $choice) ? $choice = 1 : $choice = 0;
            }

            $query = "INSERT INTO ND_Assessment_Details (Asmnt_ID,Sequence,Field_Label,Choice,Comments,Level_Chosen) values(".
                        "'".$asmntId."',".$sequence.",'".$fieldLabel."',".$choice.",'".$comments."',".$levelChosen.")";
            
            $retVal = $this->query($query);
            
            if (null != $retVal && isset($retVal['error'])) {
                return $retVal;
            }            
            
        }
        
    }
function UpdateOrder($patientID,$drug,$adminDate) {
		
		$query = "UPDATE Order_Status SET Order_Status = 'Administered' WHERE Patient_ID = '$patientID' AND Drug_Name = '$drug' AND Admin_date = '$adminDate'";
		$result = $this->query($query);
		echo $query;
		return $result;
		
	}
}
