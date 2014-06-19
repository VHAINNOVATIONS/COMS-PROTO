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


















function getAllMeds2Administer($records) {
    $PreMeds4Sheet = array();
    $PreMeds = array();

    $therapyMeds = array();
    $postMeds = array();
    foreach($records as $record) {
        $PreTherapy = $record["PreTherapy"];
        foreach ($PreTherapy as $med) {
            if (!isset($PreMeds[$med["MedID"]])) {
                $PreMeds[$med["MedID"]] = $med["Med"];
                $PreMeds4Sheet[] = array("label" => $med["Med"], "-" => "03 Pre Therapy Meds");
            }
        }


        $Therapy = $record["Therapy"];
        foreach ($Therapy as $med) {
//error_log("Therapy Med - " . $med["MedID"] . " --- " . $med["Med"]);
            if (!isset($therapyMeds[$med["MedID"]])) {
                $therapyMeds[$med["MedID"]] = $med["Med"];
                $PreMeds[] = array("label" => $med["Med"], "-" => "03 Pre Therapy Meds", "medID" => $med["MedID"] );

            }
        }
        $PostTherapy = $record["PostTherapy"];
//error_log("PostTherapy Med - " . $med["MedID"] . " --- " . $med["Med"]);
        foreach ($PostTherapy as $med) {
            if (!isset($postMeds[$med["MedID"]])) {
                $postMeds[$med["MedID"]] = $med["Med"];
            }
        }
    }
    $medRows = array();
    $medRows["preMeds"] = $PreMeds4Sheet;
    $medRows["therapyMeds"] = $therapyMeds;
    $medRows["postMeds"] = $postMeds;
    return $medRows;
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

        $FSPSRow = array("label" => "Performance Status", "-" => "01 General");
        $FSWeightRow = array("label" => "Weight (lbs/kg)", "-" => "01 General");
        $FSDateRow = array("label" => "Date", "-" => "01 General");
        $FSDiseaseResponse = array("label" => "Disease Response", "-" => "01 General");
        $FSToxicity = array("label" => "Toxicity Side Effects", "-" => "01 General");
        $FSOther = array("label" => "Other", "-" => "01 General");
        $FSLabs = array("label" => "Unknown...", "-" => "02 Laboratory Results");

        $FSPreMeds = array("label" => "Pre Therapy Med", "-" => "03 Pre Therapy Meds");
        $FSTherapyMeds = array("label" => "Therapy Med", "-" => "04 Therapy Meds");
        $FSPostMeds = array("label" => "Post Therapy Med", "-" => "05 Post Therapy Meds");

        $FSFields = array("label", "-");
        $FSColumns = array();
        $FSColumns[] = array("header" => " ", "dataIndex" => "label", "width" => 140);
        $FSColumns[] = array("header" => " ", "dataIndex" => "-", "width" => 140);
        // $FSColumns[] = array("header" => "-", "dataIndex" => "-", "width" => 140);
        // $FSColumns = array();




/**********************************************************************************************/





        // Get All OEM Records to build individual Date columns
        $returnVal = $patientController->getOEMData($PatientID);
        if (isset($returnVal)) {
            if ($returnVal["success"]) {
                $today = date('m/d/Y');
error_log("GenOEMData - Records");
error_log(json_encode($returnVal));
error_log("----------------------------");
                $OEM = $returnVal["records"][0];
                $records = $OEM["OEMRecords"];
error_log(json_encode($records));
error_log("----------------------------");


                $colIdx = 0;
                $LastAdminDate = "";
                $MoreAdminDates2Check = true;

$medRows = $this->getAllMeds2Administer($records);







$PreTherapy = $medRows["preMeds"];
error_log("---------- PRE THERAPY ------------------");
error_log(json_encode($PreTherapy));
//error_log("----------------------------");
//foreach ($PreTherapy as $Med) {
//error_log(json_encode($Med));
//    $Med["label"] = "Pre Therapy Med";
//    $Med["-"] = "03 Pre Therapy Meds";
//error_log(json_encode($Med));
//}
error_log("--------- END PRE THERAPY ---------------");









$Therapy = $medRows["therapyMeds"];
foreach ($Therapy as $Med) {
    $Med = array("label" => "Therapy Med", "-" => "04 Therapy Meds");
}

$PostTherapy = $medRows["postMeds"];
foreach ($PostTherapy as $Med) {
    $Med = array("label" => "Post Therapy Med", "-" => "05 Post Therapy Meds");
}
error_log("All PreTherapy Info");
error_log(json_encode($PreTherapy));
error_log("----------------------------");



                foreach($records as $record) {
//                    $PreTherapy = $record["PreTherapy"];
//                    $Therapy = $record["Therapy"];
//                    $PostTherapy = $record["PostTherapy"];

                    
                    $colIdx++;
                    $FlowsheetGrid = array();
                    $hdr = "Cycle " . $record["Cycle"] . ", Day " . $record["Day"];
                    $FSFields[] = $hdr;
                    // $FSColumns[] = array( "header" => $hdr, "dataIndex" => $hdr, "width" => 90, "field" => array( "xtype" => "textfield" ));
                    if ($MoreAdminDates2Check) {    // Find most recent past admin date
                        $LastAdminDate = $record["AdminDate"];
                        $dfltPos = array( "row" => 1, "column" => $colIdx );
                    }

                    if ($today === $record["AdminDate"]) {
                        $FSColumns[] = array( "header" => $hdr, "dataIndex" => $hdr, "width" => 120, "tdCls" => "fSheet-editCell", "editor" => array( "xtype" => "textfield", "allowBlank" => "false" ));
                        $colIdx--;
                        $dfltPos = array( "row" => 1, "column" => $colIdx );
                    }
                    else {
                        if(new DateTime() < new DateTime($record["AdminDate"])) {
                            $MoreAdminDates2Check = false;
                        }
                        $FSColumns[] = array( "header" => $hdr, "dataIndex" => $hdr, "width" => 90);
                    }
                    $this->set("dfltPos", $dfltPos);

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

$Meds = $record["PreTherapy"];
foreach ($Meds as $Med) {
    error_log("Walking Records - " . $Med["Med"] . $Med["Dose1"] . " " . $Med["DoseUnits1"]);
    $PreTherapy[$Med["Med"]][$hdr] = $Med["Dose1"] . " " . $Med["DoseUnits1"];
}















$Meds = $record["Therapy"];
foreach ($Meds as $Med) {
    $Therapy[$Med["Med"]][$hdr] = $Med["Dose1"] . " " . $Med["DoseUnits1"];
}
$Meds = $record["PostTherapy"];
foreach ($Meds as $Med) {
    $PostTherapy[$Med["Med"]][$hdr] = $Med["Dose1"] . " " . $Med["DoseUnits1"];
}


                    $FSPreMeds[$hdr] = "Med 1 - $idx";
                    $FSTherapyMeds[$hdr] = "Med 2 - $idx";
                    $FSPostMeds[$hdr] = "Med 3 - $idx";


                }
                $FSColumns[$dfltPos["column"]]["tdCls"] = "fSheet-editCell";
            }
        }

        if (!isset($returnVal)) {
            $this->set('frameworkErr', null);
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "No OEM Data Available - $PatientID";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }


        $FSData = array( $FSDateRow, $FSPSRow, $FSWeightRow, $FSDiseaseResponse, $FSToxicity, $FSOther, $FSLabs, $FSPreMeds, $FSTherapyMeds, $FSPostMeds);

        $jsonRecord = array( "status" => true, "msg" => "Breakpoint 1", "records" => array("Fields" => $FSFields, "Columns" => $FSColumns, "Data" => $FSData));
        $this->set('jsonRecord', $jsonRecord);
    }

    function FlowsheetFields ($PatientID) {
        $this->Flowsheet($PatientID);
        $Info = $this->get("jsonRecord");
        $DfltPos = $this->get("dfltPos");
        $jsonRecord = array("success" => true, "records" => array(
            "dfltPos" => $DfltPos,
            "Fields" => $Info["records"]["Fields"], 
            "Columns" => $Info["records"]["Columns"] 
        ));
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



/*******************************************************************************************/
    function _getAssessmentLink($PAT_ID, $assessmentRecordID) {
            $query = "select 
                Asmnt_ID as id, 
                CONVERT(VARCHAR(10), Date_Assessment, 101) as date, 
                Author as author 
                from ND_Assessment 
                where Patient_ID = '$PAT_ID'";

            if ($assessmentRecordID) {
                $query .= " AND Assmnt_ID = '$assessmentRecordID'";
            }
            error_log("_getAssessmentLink Query - $query");
            return $this->NursingDoc->query($query);
    }
    function _getAssessmentDetails($assessmentRecordID) {
        $query = "select
            Sequence as sequence, 
            Field_Label as fieldLabel, 
            Comments as comments, 
            Level_Chosen as levelChosen, 
            case when (Choice = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as choice
            from ND_Assessment_Details where Asmnt_ID = '$assessmentRecordID'";
            error_log("_getAssessmentDetails Query - $query");
            $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }


    function _InsertAssessmentLink($GUID, $PAT_ID) {
            $currDate = $this->NursingDoc->getCurrentDate();
            $author = get_current_user();
            $query = "
            INSERT INTO ND_Assessment (
                Asmnt_ID,
                Patient_ID,
                Date_Assessment,
                Author
            ) VALUES (
                '$GUID',
                '$PAT_ID',
                '$currDate',
                'author'
            )";
            error_log("_InsertAssessmentLink Query - $query");
            $retVal = $this->NursingDoc->query($query);
            return $retVal;
    }

    function _InsertAssessmentDetail($asmntId, $detail) {
        $sequence = $detail->{'sequence'};
        $fieldLabel = $detail->{'fieldLabel'};
        $choice = $detail->{'choice'};
        $levelChosen = $detail->{'levelChosen'};
        $comments = $this->escapeString($detail->{'comments'});
        $query = "INSERT INTO ND_Assessment_Details 
            (
                Asmnt_ID,
                Sequence,
                Field_Label,
                Choice,
                Comments,
                Level_Chosen
            ) values(
                '$asmntId', 
                $sequence,
                '$fieldLabel',
                $choice,
                '$comments',
                $levelChosen
            )";
        error_log("_InsertAssessmentDetail Query - $query");
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }

    function _DeleteAssessmentDetail($asmntId) {
        $query = "delete from ND_Assessment_Details where Asmnt_ID = '$asmntId'";
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }

/*******
http://coms-mwb.dbitpro.com:355/NursingDoc/Assessment/B9C0E369-0BCF-E311-A4B9-000C2935B86F
Content-Type:application/json
{"patientId":"B9C0E369-0BCF-E311-A4B9-000C2935B86F","assessmentDetails":[{"sequence":0,"fieldLabel":"Fatigue","choice":true,"comments":"","levelChosen":"1"},{"sequence":1,"fieldLabel":"Anorexia","choice":true,"comments":"","levelChosen":"1"},{"sequence":7,"fieldLabel":"Diarrhea","choice":true,"comments":"","levelChosen":"4"},{"sequence":10,"fieldLabel":"Other","choice":true,"comments":"Life is totally messed up!","levelChosen":0}]}
 *******/
    function Assessment($PAT_ID = null, $assessmentRecordID=null ) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";


        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $AssessmentRecords = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Retrieving Assessment Records";

        $GUID = $this->NursingDoc->newGUID();
        $PAT_ID = $this->NursingDoc->newGUID();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            error_log("Get New GUID - $GUID");
            if ($PAT_ID) {
                $assessmentID = $this->_getAssessmentLink($PAT_ID, $assessmentRecordID);
                if($this->checkForErrors('Get ND_Assessment Link Records Failed. ', $assessmentID)){
                    $this->set('jsonRecord', null);
                    return;
                }
                foreach ($assessmentID as $assesmentLink) {
                    $assessmentDetails = $this->_getAssessmentDetails($assesmentLink['id']);
                    if($this->checkForErrors('Get ND_Assessment Details Records Failed. ', $assesmentLink)){
                        $this->set('jsonRecord', null);
                        return;
                    }
                    $assesment['assesmentLink'] = $assesmentLink;
                    $assesment['assesmentLink']['Details'] = $assessmentDetails;
                    array_push($AssessmentRecords, $assesment);
                }
                $jsonRecord['records'] = $AssessmentRecords;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                return;
            }
            $jsonRecord['msg'] = "No Assessment records to find";
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            return;
        }



        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $assementDetails = $form_data->{'assessmentDetails'};
            error_log("Inserting Details - " . $this->varDumpToString($assementDetails));

            $this->NursingDoc->beginTransaction();
            $retVal = $this->_InsertAssessmentLink($GUID, $PAT_ID);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            foreach ($assementDetails as $detail) {
                $retVal = $this->_InsertAssessmentDetail($GUID, $detail);
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->NursingDoc->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }
            $this->NursingDoc->endTransaction();
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            // Delete all Detail records for the current ID then save the new data.
            $this->_DeleteAssessmentDetail($assessmentRecordID);
            $assementDetails = $form_data->{'assessmentDetails'};
error_log("Inserting Details - " . $this->varDumpToString($assementDetails));
/**
            $this->NursingDoc->beginTransaction();
            foreach ($assementDetails as $detail) {
                $retVal = $this->_InsertAssessmentDetail($GUID, $detail);
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->NursingDoc->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }
            $this->NursingDoc->endTransaction();
**/
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
            $this->Patient->rollbackTransaction();
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "Assessment records Process successful!";
        $jsonRecord['AssessmentID'] = $GUID;
        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
        return;
    }

    function _OLDAssessment($id = null){
        
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
    


/**

USE [COMS_TEST_2]
CREATE TABLE [dbo].[ND_InfuseReactions](
	[IReact_ID] [uniqueidentifier] DEFAULT (newsequentialid()),
	[Patient_ID] [uniqueidentifier] NOT NULL,
	[Date_Assessment] [datetime] NULL,
	[Author] [varchar](30) NULL
) ON [PRIMARY]



CREATE TABLE [dbo].[ND_InfuseReactions_Details](
	[IReact_Detail_ID] [uniqueidentifier] DEFAULT (newsequentialid()),
	[IReact_ID] [uniqueidentifier] NOT NULL,
	[Sequence] [int] NULL,
	[Field_Label] [varchar](30) NULL,
	[Choice] [bit] NULL,
	[Comments] [nvarchar](max) NULL,
	[Level_Chosen] [int] NULL,
	[sectionTitle] [varchar](30) NULL
) ON [PRIMARY]+

 **/
/*******************************************************************************************/
    function _getInfuseReactLink($PAT_ID, $InfuseReactRecordID) {
            $query = "select 
                IReact_ID as id, 
                CONVERT(VARCHAR(10), Date_Assessment, 101) as date, 
                Author as author 
                from ND_InfuseReactions 
                where Patient_ID = '$PAT_ID'";

            if ($InfuseReactRecordID) {
                $query .= " AND IReact_ID = '$InfuseReactRecordID'";
            }
            error_log("_getInfuseReactLink Query - $query");
            return $this->NursingDoc->query($query);
    }
    function _getInfuseReactDetails($InfuseReactRecordID) {
        $query = "select
            Sequence as sequence, 
            Field_Label as fieldLabel, 
            Comments as comments, 
            Level_Chosen as levelChosen, 
            case when (Choice = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as choice
            from ND_InfuseReactions_Details where IReact_ID = '$InfuseReactRecordID'";

            error_log("_getInfuseReactDetails Query - $query");
            $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }


    function _InsertInfuseReactLink($GUID, $PAT_ID) {
            $currDate = $this->NursingDoc->getCurrentDate();
            $author = get_current_user();
            $query = "
            INSERT INTO ND_InfuseReactions (
                IReact_ID,
                Patient_ID,
                Date_Assessment,
                Author
            ) VALUES (
                '$GUID',
                '$PAT_ID',
                '$currDate',
                'author'
            )";
            error_log("_InsertInfuseReactLink Query - $query");
            $retVal = $this->NursingDoc->query($query);
            return $retVal;
    }

    function _InsertInfuseReactDetail($InfuseReactRecordID, $detail) {
        $sequence = $detail->{'sequence'};
        $fieldLabel = $detail->{'fieldLabel'};
        $choice = $detail->{'choice'};
        $levelChosen = $detail->{'levelChosen'};
        $comments = $this->escapeString($detail->{'comments'});

        $query = "INSERT INTO ND_InfuseReactions_Details 
            (
                IReact_ID,
                Sequence,
                Field_Label,
                Choice,
                Comments,
                Level_Chosen,
                sectionTitle
            ) values(
                '$InfuseReactRecordID', 
                $sequence,
                '$fieldLabel',
                $choice,
                '$comments',
                $levelChosen,
                '$sectionTitle'
            )";
        error_log("_InsertInfuseReactDetail Query - $query");
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }

    function _DeleteInfuseReactDetail($InfuseReactRecordID) {
        $query = "delete from ND_InfuseReactions_Details where IReact_ID = '$InfuseReactRecordID'";
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }


    function ReactAssess($PAT_ID = null, $InfuseReactRecordID=null ) {
        error_log("PAT_ID = $PAT_ID; Infusion Reaction Record ID = ''");
        error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";


        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $AssessmentRecords = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Infusion Reaction Records";

        $GUID = $this->NursingDoc->newGUID();
        $PAT_ID = $this->NursingDoc->newGUID();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            error_log("Get New GUID - $GUID");
/**
            if ($PAT_ID) {
                $assessmentID = $this->_getAssessmentLink($PAT_ID, $assessmentRecordID);
                if($this->checkForErrors('Get ND_Assessment Link Records Failed. ', $assessmentID)){
                    $this->set('jsonRecord', null);
                    return;
                }
                foreach ($assessmentID as $assesmentLink) {
                    $assessmentDetails = $this->_getAssessmentDetails($assesmentLink['id']);
                    if($this->checkForErrors('Get ND_Assessment Details Records Failed. ', $assesmentLink)){
                        $this->set('jsonRecord', null);
                        return;
                    }
                    $assesment['assesmentLink'] = $assesmentLink;
                    $assesment['assesmentLink']['Details'] = $assessmentDetails;
                    array_push($AssessmentRecords, $assesment);
                }
                $jsonRecord['records'] = $AssessmentRecords;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                return;
            }
**/
            $jsonRecord['msg'] = "No Assessment records to find";
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            return;
        }



        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $Details = $form_data->{'Details'};
            error_log("Inserting Details - " . $this->varDumpToString($Details));
            $this->NursingDoc->beginTransaction();
            $retVal = $this->_InsertInfuseReactLink($GUID, $PAT_ID);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            foreach ($Details as $detail) {
                $retVal = $this->_InsertInfuseReactDetail($GUID, $detail);
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->NursingDoc->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }
            $this->NursingDoc->endTransaction();
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            // Delete all Detail records for the current ID then save the new data.
/**
            $this->_DeleteAssessmentDetail($assessmentRecordID);
            $assementDetails = $form_data->{'assessmentDetails'};
error_log("Inserting Details - " . $this->varDumpToString($assementDetails));
**/
/**
            $this->NursingDoc->beginTransaction();
            foreach ($assementDetails as $detail) {
                $retVal = $this->_InsertAssessmentDetail($GUID, $detail);
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->NursingDoc->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }
            $this->NursingDoc->endTransaction();
**/
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "Infusion Reactions records Process successful!";
        $jsonRecord['InfuseReactionsID'] = $GUID;
        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
        return;
    }


    function _OLD_ReactAssess($id = null){
        
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
        error_log("ReactAssessXtrav - Service Call Entry Point - ID = $id");
        
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
        error_log("ReactAssessCRS - Service Call Entry Point - ID = $id");

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
        error_log("ReactAssessHorA - Service Call Entry Point - ID = $id");

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
