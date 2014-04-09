<?php

class NursingDocController extends Controller {

    public function DischargeInstruction($id = null)
    {
        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
    
        if ($form_data != null) {
    
            $this->NursingDoc->beginTransaction();
    
            $returnVal = $this->NursingDoc->saveDischargeInstruction($form_data, $id);
    
            if ($this->checkForErrors('Save Discharge Instruction Values Failed. ', $returnVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
    
            $this->NursingDoc->endTransaction();
             
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = 1;
            $jsonRecord['records'] = array('DischargeInstruction_ID' => $this->NursingDoc->getDischargeInstructionId());
            $this->set('jsonRecord', $jsonRecord);
    
        } else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No discharge instruction data found in the request body';
            $this->set('jsonRecord', $jsonRecord);
        }
    }



























    function Flowsheet ($PatientID) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;

        $FSFields = array();
        $FSColumns = array();
        $FSData = array();

        if ("GET" !== $_SERVER['REQUEST_METHOD']) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Invalid COMMAND - " . $_SERVER['REQUEST_METHOD'] . " expected a GET";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        if (!$PatientID) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Missing Patient ID";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $patient = new Patient();
        $controller = 'PatientController';
        $patientController = new $controller('Patient', 'patient', null);
        $patientModel = new Patient();

        // Get All OEM Records to build individual Date columns
        $returnVal = $patientController->getVitals($PatientID);
        $Vitals = null;
        $assVitals = array();
        if (isset($returnVal)) {
            if ("true" == $returnVal["success"]) {
                $Vitals = $returnVal["records"];
                foreach($Vitals as $VitalEntry) {
                    $V = array();
                    $idx = $VitalEntry["DateTaken"];
                    $V["PS"] = $VitalEntry["PS"];
                    $V["PSID"] = $VitalEntry["PSID"];
                    $V["Weight"] = $VitalEntry["Weight"];
                    $assVitals[] = $V;
                }
            }
        }

        $FSPSRow = array("label" => "Performance Status", "&nbsp" => "01 General");
        $FSWeightRow = array("label" => "Weight (lbs/kg)", "&nbsp" => "01 General");
        $FSDateRow = array("label" => "Date", "&nbsp" => "01 General");
        $FSDiseaseResponse = array("label" => "Disease Response", "&nbsp" => "01 General");
        $FSToxicity = array("label" => "Toxicity Side Effects", "&nbsp" => "01 General");
        $FSOther = array("label" => "Other", "&nbsp" => "01 General");
        $FSLabs = array("label" => "Unknown...", "&nbsp" => "02 Laboratory Results");

        $FSFields = array("label", "&nbsp");
        $FSColumns = array();
        $FSColumns[] = array("header" => "&nbsp;", "dataIndex" => "label", "width" => 140);
        // $FSColumns[] = array("header" => "&nbsp;", "dataIndex" => "&nbsp", "width" => 140);
        // $FSColumns = array();




/**********************************************************************************************/





        // Get All OEM Records to build individual Date columns
        $returnVal = $patientController->getOEMData($PatientID);
        if (isset($returnVal)) {
            if ($returnVal["success"]) {
                $today = date('m/d/Y');
                $OEM = $returnVal["records"][0];
                $records = $OEM["OEMRecords"];
                foreach($records as $record) {
                    $FlowsheetGrid = array();
                    $hdr = "Cycle " . $record["Cycle"] . ", Day " . $record["Day"];
                    $FSFields[] = $hdr;
                    // $FSColumns[] = array( "header" => $hdr, "dataIndex" => $hdr, "width" => 90, "field" => array( "xtype" => "textfield" ));
                    $FSColumns[] = array( "header" => $hdr, "dataIndex" => $hdr, "width" => 90);
                    $idx = $record["AdminDate"];
                    $V_PS = "";
                    $V_Weight = "";

                    if (isset($assVitals[$idx])) {
                        $tmp = $assVitals[$idx];
                        $V_PS = "<abbr title=\"" + $tmp.PS + "\">" + $tmp.PSID + "</abbr>";
                        $V_Weight = $tmp.Weight;
                    }

                    $FSPSRow[$hdr] = $V_PS;
                    $FSWeightRow[$hdr] = $V_Weight;
                    $FSDateRow[$hdr] = $record["AdminDate"];
                    $FSDiseaseResponse[$hdr] = "";
                    $FSToxicity[$hdr] = "";
                    $FSOther[$hdr] = "";
                    $FSLabs[$hdr] = "";

                    if ($today === $record["AdminDate"]) {
                        $FSDiseaseResponse[$hdr] = "<button class=\"anchor DiseaseResponse\" name=\"WriteFSData\" cellType=\"Disease Response\" recHdr=\"$hdr\" date=\"$today\">Write</button>";
                        $FSToxicity[$hdr] = "<button class=\"anchor Toxicity\" name=\"WriteFSData\" cellType=\"Toxicity Side Effects\" recHdr=\"$hdr\" date=\"$today\">Write</button>";
                        $FSOther[$hdr] = "<button class=\"anchor Other\" name=\"WriteFSData\" cellType=\"Other\" recHdr=\"$hdr\" date=\"$today\">Write</button>";
                    }
                }
            }
        }

        if (!isset($returnVal)) {
            $this->set('frameworkErr', null);
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "No OEM Data Available - $PatientID";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }


        $FSData = array( $FSDateRow, $FSPSRow, $FSWeightRow, $FSDiseaseResponse, $FSToxicity, $FSOther, $FSLabs);

        $jsonRecord = array( "status" => true, "msg" => "Breakpoint 1", "records" => array("Fields" => $FSFields, "Columns" => $FSColumns, "Data" => $FSData));
        $this->set('jsonRecord', $jsonRecord);
    }

    function FlowsheetFields ($PatientID) {
        $this->Flowsheet($PatientID);
        $Info = $this->get('jsonRecord');
        $jsonRecord = array("success" => true, "records" => array("Fields" => $Info["records"]["Fields"], "Columns" => $Info["records"]["Columns"] ));
        $this->set('jsonRecord', $jsonRecord);
    }

    function FlowsheetColumns ($PatientID) {
        $this->Flowsheet($PatientID);
        $Info = $this->get('jsonRecord');
        $jsonRecord = array("success" => true, "records" => $Info["records"]["Columns"]);
        $this->set('jsonRecord', $jsonRecord);
    }
    function FlowsheetData ($PatientID) {
        $this->Flowsheet($PatientID);
        $Info = $this->get('jsonRecord');
        $jsonRecord = array("success" => true, "records" => $Info["records"]["Data"]);
        $this->set('jsonRecord', $jsonRecord);
    }




/********************** END FLOWSHEET ***********************/



























    
    public function ActiveDischargeInstructions()
    {
        $records = $this->NursingDoc->getActiveDischargeInstructions();
        
        if ($this->checkForErrors('Get Active Discharge Instructions Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        
        $jsonRecord['success'] = true;
        $jsonRecord['total'] = count($records);
        $jsonRecord['records'] = $records;
        $this->set('jsonRecord', $jsonRecord);
    }
    
    public function Treatment($id = null) 
    {
        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();

        if ($form_data != null) {
        
            $this->NursingDoc->beginTransaction();

            $returnVal = $this->NursingDoc->updateTreatment($form_data);
            
            if ($this->checkForErrors('Update Nursing Doc Treatment Values Failed. ', $returnVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            $this->NursingDoc->endTransaction();

            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = 1;
            $jsonRecord['records'] = array_merge(array('Treatment_ID' => $this->NursingDoc->getTreatmentId()), get_object_vars($form_data));
            $this->set('jsonRecord', $jsonRecord);
        
        } else {
	
            $records = $this->NursingDoc->getTreatments($id);
        
            if ($this->checkForErrors('Get Nursing Doc Treatments Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
            
            $jsonRecord['success'] = true;            
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
            $this->set('jsonRecord', $jsonRecord);
        }
    }
    
    function GenInfo($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        
        if($id != NULL){
        
            //$lookup = new LookUp();
            
            $genInfoRecords = $this->NursingDoc->getGenInfoForPatient($id);

            if($this->checkForErrors('Get GenInfo Records Failed. ', $genInfoRecords)){
                $this->set('jsonRecord', null);
                return;
            }
            
            $patient = new Patient();
            
            /*
            $allergies = $patient->getAllergies($id);

            if($this->checkForErrors('Get Allergies Failed. ', $allergies)){
                $this->set('jsonRecord', null);
                return;
            }

            $tmpAllergy = array();            
            foreach($allergies as $allergy){
                $tmp['Description'] = $allergy['name'];
                array_push($tmpAllergy,$tmp);
            }
             * 
             */

            $jsonRecord = array();
            $modGenInfoRecords = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($genInfoRecords);
            
            /*
            foreach ($genInfoRecords as $genInfoRecord) {
                $genInfoRecord['allergies'] = $tmpAllergy;
                array_push($modGenInfoRecords, $genInfoRecord);
                
            }
            
            $jsonRecord['records'] = $modGenInfoRecords;
             * 
             */
            
            $jsonRecord['records'] = $genInfoRecords;
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
        }else if($form_data){

            $jsonRecord = array();
            
            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveGenInfo($form_data);
            $this->set('frameworkErr', null);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save GenInfo Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'Gen Info Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $this->set('frameworkErr','No Patient ID provided.');
        }
        
    }

    function Assessment($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        
        if($id != NULL){
        
            $assessments = $this->NursingDoc->getTopLevelAssessment($id);
            
            if($this->checkForErrors('Get ND_Assessment Records Failed. ', $assessments)){
                $this->set('jsonRecord', null);
                return;
            }
            
            $jsonRecord = array();
            $modAssessmentRecords = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($assessments);
            
            
            foreach ($assessments as $assesment) {
                
                $details = $this->NursingDoc->getAssessmentDetail($assesment['id']);

				// MWB - 4/25/2012 - Added below code to convert choice param to a boolean rather than a string
				$detailsLen = count($details);
				for ($i = 0; $i < $detailsLen; $i++ ) {
					if ("true" === $details[$i]["choice"]) {
						$details[$i]["choice"] = true;
					}
					else {
						$details[$i]["choice"] = false;
					}
				}

                $assesment['assessmentDetails'] = $details;
                array_push($modAssessmentRecords, $assesment);
                
            }
            
            $jsonRecord['records'] = $modAssessmentRecords;
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);

        }else if($form_data){

            $jsonRecord = array();
            
            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveAssesment($form_data);
            $this->set('frameworkErr', null);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save Assessments Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'Assesment Info Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $this->set('frameworkErr','No Patient ID provided.');
        }
        
    }

    function IVSite($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        $jsonRecord = array();
        
        if($id != NULL){
        
            $ivSites = $this->NursingDoc->getIVSiteForPatient($id);
            
            if($this->checkForErrors('Get ND_IVSite Records Failed. ', $ivSites)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($ivSites);
            
            $jsonRecord['records'] = $ivSites;
            
            $this->set('jsonRecord', $jsonRecord);

        }else if($form_data){

            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveIVSite($form_data);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save IVSite Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'IVSite Info Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
        
    }
    
    function ReactAssess($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        $jsonRecord = array();
        
        if($id != NULL){
        
            $records = $this->NursingDoc->getReactAssessForPatient($id);
            
            if($this->checkForErrors('Get ND_ReactAssess Records Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);

        }else if($form_data){

            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveReactAssess($form_data);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save ReactAssess Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'React Assess Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
        
    }

    function ReactAssessXtrav($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        $jsonRecord = array();
        
        if($id != NULL){
        
            $records = $this->NursingDoc->getReactAssessXtravForPatient($id);
            
            if($this->checkForErrors('Get ND_ReactAssessXtrav Records Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);

        }else if($form_data){

            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveReactAssessXtrav($form_data);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save ReactAssessXtrav Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'ReactAssessXtrav Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
        
    }

    function ReactAssessCRS($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        $jsonRecord = array();
        
        if($id != NULL){
        
            $records = $this->NursingDoc->getReactAssessCRSForPatient($id);
            
            if($this->checkForErrors('Get ND_ReactAssessCRS Records Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);

        }else if($form_data){

            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveReactAssessCRS($form_data);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save ReactAssessCRS Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'ReactAssessCRS Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
        
    }

    function ReactAssessHorA($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));         
        $jsonRecord = array();
        
        if($id != NULL){
        
            $records = $this->NursingDoc->getReactAssessHorA($id);
            
            if($this->checkForErrors('Get ND_ReactAssessHorA Records Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);

        }else if($form_data){

            $this->NursingDoc->beginTransaction();
            
            $retVal = $this->NursingDoc->saveReactAssessHorA($form_data);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
            
                $errorMsg = $retVal['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            
            }

            if ($this->checkForErrors('Save ReactAssessHorA Failed. ', $retVal)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->NursingDoc->rollbackTransaction();
                return;
            }
            

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'ReactAssessHorA Save Successful';
            $this->set('jsonRecord', $jsonRecord);
            $this->NursingDoc->endTransaction();
            
        }else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
        
    }
    
    function CTCAE_Data($id = null){
        
        if($id != NULL){
        
            $records = $this->NursingDoc->getCTCAEData($id);

            if($this->checkForErrors('Get CTCAE_Data Records Failed. ', $records)){
                $this->set('jsonRecord', null);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);

        }else{
            $this->set('frameworkErr','No Patient ID provided.');
        }

        
    }
    
    function CTCAE_SOC(){
    
    	$records = $this->NursingDoc->getCTCAESoc();

    	if($this->checkForErrors('Get CTCAE_SCOC Records Failed. ', $records)){
        	$this->set('jsonRecord', null);
        	return;
        }

        $jsonRecord = array();
            
        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
    
    }
    
    function checkForErrors($errorMsg,$retVal){
        
        if (null != $retVal && array_key_exists('error', $retVal)) {

            if(DB_TYPE == 'sqlsrv'){		
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
                }
            }else if(DB_TYPE == 'mysql'){
                    $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

            return true;
        }
        
        return false;
        
    }

}
