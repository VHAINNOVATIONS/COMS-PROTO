<?php

class NursingDocController extends Controller {

// This function has apparently been moved to the Patient Controller - MWB - 8/5/2014
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
//error_log("GenOEMData - Records");
//error_log(json_encode($returnVal));
//error_log("----------------------------");
                $OEM = $returnVal["records"][0];
                $records = $OEM["OEMRecords"];
//error_log(json_encode($records));
//error_log("----------------------------");


                $colIdx = 0;
                $LastAdminDate = "";
                $MoreAdminDates2Check = true;

$medRows = $this->getAllMeds2Administer($records);







$PreTherapy = $medRows["preMeds"];
//error_log("---------- PRE THERAPY ------------------");
//error_log(json_encode($PreTherapy));
//error_log("----------------------------");
//foreach ($PreTherapy as $Med) {
//error_log(json_encode($Med));
//    $Med["label"] = "Pre Therapy Med";
//    $Med["-"] = "03 Pre Therapy Meds";
//error_log(json_encode($Med));
//}
//error_log("--------- END PRE THERAPY ---------------");









$Therapy = $medRows["therapyMeds"];
foreach ($Therapy as $Med) {
    $Med = array("label" => "Therapy Med", "-" => "04 Therapy Meds");
}

$PostTherapy = $medRows["postMeds"];
foreach ($PostTherapy as $Med) {
    $Med = array("label" => "Post Therapy Med", "-" => "05 Post Therapy Meds");
}
//error_log("All PreTherapy Info");
//error_log(json_encode($PreTherapy));
//error_log("----------------------------");



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
//    error_log("Walking Records - " . $Med["Med"] . $Med["Dose1"] . " " . $Med["DoseUnits1"]);
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



























// This function has apparently been moved to the Patient Controller - MWB - 8/5/2014
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
            $patientID = $form_data->patientID;
            $drug = $form_data->drug;
            $adminDate = $form_data->adminDate;
            $this->NursingDoc->UpdateOrder($patientID,$drug,$adminDate);

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
/**

use COMS_TEST_2
ALTER TABLE ND_Assessment_Details
ALTER COLUMN Level_Chosen [varchar](255)
**/

/*** NOT NEEDED
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 45, 'Anorexia', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 46, 'Nausea', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 47, 'Vomiting', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 48, 'Rash', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 49, 'Insomnia', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 50, 'Distress', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 51, 'Diarrhea', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 52, 'Dyspnea', 'Assessment Types' )
insert into LookUp ( Lookup_Type, Lookup_Type_ID, Name, Description ) VALUES ( 0, 53, 'Neuropathy', 'Assessment Types' )

insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 45, '1', '1. Loss of appetite without alteration in eating habits' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 45, '2', '2. Oral intake altered without significant weight loss or malnutrition; oral nutritional supplements indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 45, '3', '3. Associated with significant weight loss or malnutrition (e.g., inadequate oral caloric and/or fluid intake); tube feeding or TPN indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 45, '4', '4. Life-threatening consequences; urgent intervention indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 46, '1', '1. Loss of appetite without alteration in eating habits' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 46, '2', '2. Oral intake decreased without significant weight loss, dehydration or malnutrition' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 46, '3', '3. Inadequate oral caloric or fluid intake; tube feeding, TPN, or hospitalization indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 47, '1', '1. 1 - 2 episodes (separated by 5 minutes) in 24 hrs' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 47, '2', '2. 3 - 5 episodes (separated by 5 minutes) in 24 hrs' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 47, '3', '3. >=6 episodes (separated by 5 minutes) in 24 hrs; tube feeding, TPN or hospitalization indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 47, '4', '4. Life-threatening consequences; urgent intervention indicated' )
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 48, '1', '1. Macules/papules covering <10% BSA with or without symptoms (e.g., pruritus, burning, tightness)')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 48, '2', '2. Macules/papules covering 10 - 30% BSA with or without symptoms (e.g., pruritus, burning, tightness); limiting instrumental ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 48, '3', '3. Macules/papules covering >30% BSA with or without associated symptoms; limiting self care ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 49, '1', '1. Mild difficulty falling asleep, staying asleep or waking up early')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 49, '2', '2. Moderate difficulty falling asleep, staying asleep or waking up early')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 49, '3', '3. Severe difficulty in falling asleep, staying asleep or waking up early')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 50, '1', '1. Mild pain')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 50, '2', '2. Moderate pain; limiting instrumental ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 50, '3', '3. Severe pain; limiting self care ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 51, '1', '1. Increase of <4 stools per day over baseline; mild increase in ostomy output compared to baseline')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 51, '2', '2. Increase of 4 - 6 stools per day over baseline; moderate increase in ostomy output compared to baseline')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 51, '3', '3. Increase of >=7 stools per day over baseline; incontinence; hospitalization indicated; severe increase in ostomy output compared to baseline; limiting self care Activity of Daily Living')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 51, '4', '4. Life-threatening consequences; urgent intervention indicated')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 52, '1', '1. Shortness of breath with moderate exertion')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 52, '2', '2. Shortness of breath with minimal exertion; limiting instrumental ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 52, '3', '3. Shortness of breath at rest; limiting self care ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 52, '4', '4. Life-threatening consequences; urgent intervention indicated')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 52, '5', '5. Death')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 53, '1', '1. Asymptomatic; clinical or diagnostic observations only; intervention not indicated')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 53, '2', '2. Moderate symptoms; limiting instrumental ADL')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 53, '3', '3. Severe symptoms; limiting self care ADL; assistive device indicated')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 53, '4', '4. Life-threatening consequences; urgent intervention indicated')
insert into LookUp ( Lookup_Type, Name, Description ) VALUES ( 53, '5', '5. Death')


 **/
    function _getAssessmentLink($PAT_ID, $assessmentRecordID) {
            $query = "select 
                Asmnt_ID as id, 
                CONVERT(VARCHAR(10), Date_Assessment, 101) as date, 
                Author as author 
                from ND_Assessment 
                where Patient_ID = '$PAT_ID'
                order by Date_Assessment DESC";

            if ($assessmentRecordID) {
                $query .= " AND Assmnt_ID = '$assessmentRecordID'";
            }
            // error_log("_getAssessmentLink Query - $query");
            return $this->NursingDoc->query($query);
    }
    function _getAssessmentDetails($assessmentRecordID) {
        $query = "select
            Sequence as sequence, 
            Field_Label as fieldLabel, 
            Comments as comments, 
            Level_Chosen as levelChosen, 
            case when (Choice = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as choice,
            case when (alertEvent = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as alertEvent
            from ND_Assessment_Details where Asmnt_ID = '$assessmentRecordID'";
            // error_log("_getAssessmentDetails Query - $query");
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
            // error_log("_InsertAssessmentLink Query - $query");
            $retVal = $this->NursingDoc->query($query);
            return $retVal;
    }

    function _InsertAssessmentDetail($asmntId, $detail) {
        $sequence = $detail->{'sequence'};
        $fieldLabel = $detail->{'fieldLabel'};
        $choice = $detail->{'choice'};
        $levelChosen = $this->escapeString($detail->{'levelChosen'});
        $alertEvent = $detail->{'alertEvent'};
        $comments = $this->escapeString($detail->{'comments'});
        $query = "INSERT INTO ND_Assessment_Details 
            (
                Asmnt_ID,
                Sequence,
                Field_Label,
                alertEvent,
                Choice,
                Comments,
                Level_Chosen
            ) values(
                '$asmntId', 
                $sequence,
                '$fieldLabel',
                '$alertEvent',
                $choice,
                '$comments',
                '$levelChosen'
            )";
        // error_log("_InsertAssessmentDetail Query - $query");
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


// error_log("Assessment - $PAT_ID");


        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $AssessmentRecords = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Retrieving Assessment Records";

        $GUID = $this->NursingDoc->newGUID();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            // error_log("Get New GUID - $GUID");
            if ($PAT_ID) {
                $assessmentID = $this->_getAssessmentLink($PAT_ID, $assessmentRecordID);
                if($this->checkForErrors('Get ND_Assessment Link Records Failed. ', $assessmentID)){
                    $this->set('jsonRecord', null);
                    return;
                }
                foreach ($assessmentID as $assessmentLink) {
                    $assessmentDetails = $this->_getAssessmentDetails($assessmentLink['id']);
                    if($this->checkForErrors('Get ND_Assessment Details Records Failed. ', $assessmentLink)){
                        $this->set('jsonRecord', null);
                        return;
                    }
                    
                    $assessment['assessmentLink'] = $assessmentLink;
                    $assessment['assessmentLink']['Details'] = $assessmentDetails;
                    array_push($AssessmentRecords, $assessment);
                }
                $jsonRecord['total'] = count($AssessmentRecords);
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
            $assementDetails = $form_data->{'Details'};
            // error_log("Inserting Details - " . $this->varDumpToString($assementDetails));

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
            if ($assessmentRecordID) {
                $this->_DeleteAssessmentDetail($assessmentRecordID);
                $assementDetails = $form_data->{'Details'};
                $this->NursingDoc->beginTransaction();
                foreach ($assementDetails as $detail) {
    // error_log("Inserting Details - " . $this->varDumpToString($detail));
                    $retVal = $this->_InsertAssessmentDetail($assessmentRecordID, $detail);
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
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'] . ")";
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
	[sectionTitle] [varchar](90) NULL
) ON [PRIMARY]

 **/
/*******************************************************************************************/
    function _getInfuseReactLink($PAT_ID, $InfuseReactRecordID) {
            $query = "select 
                IReact_ID as id, 
                CONVERT(VARCHAR(10), Date_Assessment, 101) as date, 
                Author as author 
                from ND_InfuseReactions 
                where Patient_ID = '$PAT_ID'
                order by Date_Assessment DESC";

            if ($InfuseReactRecordID) {
                $query .= " AND IReact_ID = '$InfuseReactRecordID'";
            }
            // error_log("_getInfuseReactLink Query - $query");
            return $this->NursingDoc->query($query);
    }
    function _getInfuseReactDetails($InfuseReactRecordID) {
        $query = "select
            Sequence as sequence, 
            Field_Label as fieldLabel, 
            case when (Choice = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as choice,
            case when (alertEvent = 1) then CAST(1 AS BIT) else CAST(0 AS BIT) end as alertEvent,
            Comments as comments, 
            sectionTitle
            from ND_InfuseReactions_Details where IReact_ID = '$InfuseReactRecordID'
            order by Sequence";

            // error_log("_getInfuseReactDetails Query - $query");
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
            // error_log("_InsertInfuseReactLink Query - $query");
            $retVal = $this->NursingDoc->query($query);
            return $retVal;
    }

    function _InsertInfuseReactDetail($InfuseReactRecordID, $detail) {
        $sequence = $detail->{'sequence'};
        $fieldLabel = $detail->{'fieldLabel'};
        $choice = $detail->{'choice'};
        $sectionTitle = $detail->{'sectionTitle'};
        $alertEvent = $detail->{'alertEvent'};
        $comments = $this->escapeString($detail->{'comments'});
        $query = "INSERT INTO ND_InfuseReactions_Details 
            (
                IReact_ID,
                Sequence,
                alertEvent,
                Field_Label,
                Choice,
                Comments,
                sectionTitle
            ) values(
                '$InfuseReactRecordID', 
                $sequence,
                '$alertEvent',
                '$fieldLabel',
                $choice,
                '$comments',
                '$sectionTitle'
            )";
        // error_log("_InsertInfuseReactDetail Query - $query");
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }

    function _DeleteInfuseReactDetail($InfuseReactRecordID) {
        $query = "delete from ND_InfuseReactions_Details where IReact_ID = '$InfuseReactRecordID'";
        $retVal = $this->NursingDoc->query($query);
        return $retVal;
    }

    function ReactAssessList($PAT_ID = null ) {
        // error_log("PAT_ID = $PAT_ID; Infusion Reaction Record ID = ''");
        // error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($PAT_ID) {
                $InfuseReactLinkID = $this->_getInfuseReactLink($PAT_ID, $InfuseReactRecordID);
                if($this->checkForErrors('Get ND_ReactAssess Link Records Failed. ', $InfuseReactLinkID)){
                    $this->set('jsonRecord', null);
                    return;
                }

                $jsonRecord['total'] = count($InfuseReactLinkID);
                $jsonRecord['records'] = $InfuseReactLinkID;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                return;
            }
            else {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "No Patient ID Passed";
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'] . ")";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "Infusion Reactions records Process successful!";
        $jsonRecord['InfuseReactionsID'] = $GUID;
        
        $this->set('jsonRecord', $jsonRecord);
        
        $this->set('frameworkErr', null);
        return;

    }



    function ReactAssess($PAT_ID = null, $InfuseReactRecordID=null ) {
        // error_log("PAT_ID = $PAT_ID; Infusion Reaction Record ID = ''");
        // error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";


        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $ReactAssessRecords = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Infusion Reaction Records";

        $GUID = $this->NursingDoc->newGUID();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {


            if("ireact_id" == strtolower($PAT_ID)) {
                // error_log("Get Records by Infusion Reaction Link ID - $InfuseReactRecordID");
                $InfuseReactDetails = $this->_getInfuseReactDetails($InfuseReactRecordID);
                if($this->checkForErrors('Get ND_ReactAssess Details Records Failed. ', $InfuseReactLink)){
                    // error_log("ReactAssess Details - ERROR");
                    $this->set('jsonRecord', null);
                    return;
                }
                $InfuseReact['InfuseReactLink'] = $InfuseReactLink;
                $InfuseReact['InfuseReactLink']['Details'] = $InfuseReactDetails;
                array_push($ReactAssessRecords, $InfuseReact);
                $jsonRecord['total'] = count($ReactAssessRecords);
                $jsonRecord['records'] = $ReactAssessRecords;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                return;
            }





            // error_log("Get New GUID - $GUID");

            if ($PAT_ID) {
                $InfuseReactLinkID = $this->_getInfuseReactLink($PAT_ID, $InfuseReactRecordID);
                if($this->checkForErrors('Get ND_ReactAssess Link Records Failed. ', $InfuseReactLinkID)){
                    // error_log("ReactAssess - ERROR");
                    $this->set('jsonRecord', null);
                    return;
                }
                foreach ($InfuseReactLinkID as $InfuseReactLink) {
                    $InfuseReactDetails = $this->_getInfuseReactDetails($InfuseReactLink['id']);
                    if($this->checkForErrors('Get ND_ReactAssess Details Records Failed. ', $InfuseReactLink)){
                        // error_log("ReactAssess Details - ERROR");
                        $this->set('jsonRecord', null);
                        return;
                    }
                    $InfuseReact['InfuseReactLink'] = $InfuseReactLink;
                    $InfuseReact['InfuseReactLink']['Details'] = $InfuseReactDetails;
                    array_push($ReactAssessRecords, $InfuseReact);
                }
                $jsonRecord['total'] = count($ReactAssessRecords);
                $jsonRecord['records'] = $ReactAssessRecords;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                return;
            }
            $jsonRecord['msg'] = "No Infusion Reaction records to find";
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            return;
        }



        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $Details = $form_data->{'Details'};
            // error_log("POST - Inserting Details - " . $this->varDumpToString($Details));
            // error_log("------------------------- Creating Link to Records -------------------------------------------");
            $this->NursingDoc->beginTransaction();
            $retVal = $this->_InsertInfuseReactLink($GUID, $PAT_ID);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            // error_log("-------------------------- Creating individual Records ------------------------------------------");

            foreach ($Details as $detail) {
                $retVal = $this->_InsertInfuseReactDetail($GUID, $detail);
                // error_log("------------------------ Saved --------------------------------------------");

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
            $assementDetails = $form_data->{'Details'};
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
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'] . ")";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "Infusion Reactions records Process successful!";
        $jsonRecord['InfuseReactionsID'] = $GUID;
        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
        return;
    }





    function AdverseEventsHistory($PAT_ID = null) {
       //  error_log("PAT_ID = $PAT_ID;");
        // error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $AssessmentRecords = array();
        $ReactAssessRecords = array();
        $AEHREcords = array();

        $jsonRecord['success'] = 'true';
        $ErrMsg = "Adverse Events History";
        if ($PAT_ID == null) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Invalid PAT_ID passed";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        $AEHCounter = 0;

        $assessmentID = $this->_getAssessmentLink($PAT_ID, null);
        if($this->checkForErrors('Get ND_Assessment Link Records Failed. ', $assessmentID)){
            $this->set('jsonRecord', null);
            return;
        }
        foreach ($assessmentID as $assessmentLink) {
            $assessmentDetails = $this->_getAssessmentDetails($assessmentLink['id']);
            if($this->checkForErrors('Get ND_Assessment Details Records Failed. ', $assessmentLink)){
                $this->set('jsonRecord', null);
                return;
            }
            $assessment['assessmentLink'] = $assessmentLink;
            $assessment['assessmentLink']['Details'] = $assessmentDetails;
            $AEHCounter += count($assessmentDetails);
            array_push($AssessmentRecords, $assessment);
        }

        $InfuseReactLinkID = $this->_getInfuseReactLink($PAT_ID, null);
        if($this->checkForErrors('Get ND_ReactAssess Link Records Failed. ', $InfuseReactLinkID)){
            $this->set('jsonRecord', null);
            return;
        }
        foreach ($InfuseReactLinkID as $InfuseReactLink) {
            $InfuseReactDetails = $this->_getInfuseReactDetails($InfuseReactLink['id']);
            if($this->checkForErrors('Get ND_ReactAssess Details Records Failed. ', $InfuseReactLink)){
                $this->set('jsonRecord', null);
                return;
            }
            $InfuseReact['InfuseReactLink'] = $InfuseReactLink;
            $InfuseReact['InfuseReactLink']['Details'] = $InfuseReactDetails;
            $AEHCounter += count($InfuseReactDetails);
            array_push($ReactAssessRecords, $InfuseReact);
        }
        $AEHREcords['Assessments'] = $AssessmentRecords;
        $AEHREcords['ReactAssessments'] = $ReactAssessRecords;
        $jsonRecord['totalEvents'] = $AEHCounter;
        $jsonRecord['total'] = count($AEHREcords);
        $jsonRecord['records'] = $AEHREcords;

        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
    }

    function ReactAssessXtrav($id = null){
        // error_log("ReactAssessXtrav - Service Call Entry Point - ID = $id");
        
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
        // error_log("ReactAssessCRS - Service Call Entry Point - ID = $id");

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
        // error_log("ReactAssessHorA - Service Call Entry Point - ID = $id");

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



/***
USE [COMS_TEST_2]
CREATE TABLE [dbo].[AdverseEventsAlertsLink](
	[AEA_ID] [uniqueidentifier] DEFAULT (newsequentialid()),
	[AlertList_ID] [uniqueidentifier] NOT NULL,
	[Patient_ID] [uniqueidentifier] NOT NULL
) ON [PRIMARY]



CREATE TABLE [dbo].[AdverseEventsAlertsList](
	[AEA_ID] [uniqueidentifier] NOT NULL,
	[AlertList_ID] [uniqueidentifier] DEFAULT (newsequentialid()),
	[Sequence] [int] NULL,
	[Field_Label] [varchar](30) NULL,
	[Choice] [bit] NULL,
	[Comments] [nvarchar](max) NULL,
	[sectionTitle] [varchar](90) NULL
) ON [PRIMARY]
 ***/
    function AdverseEventsAlert($PAT_ID = null, $RecID = null) {
        // error_log("PAT_ID = $PAT_ID; Record ID = $RecID");
        // error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $jsonRecord['AdverseEventsAlertID'] = null;
        $query = "";

        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $Records = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Adverse Events Alert";

        if ("GET" == $_SERVER['REQUEST_METHOD']) {

            $jsonRecord['msg'] = "No Infusion Reaction records to find";
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            return;
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $GUID = $this->NursingDoc->newGUID();

            $Details = $form_data->{'Details'};
            $this->NursingDoc->beginTransaction();

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
            // error_log("_InsertAdverseEventsAlertLink Query - $query");
            $retVal = $this->NursingDoc->query($query);

            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->NursingDoc->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            // error_log("-------------------------- Creating individual Records ------------------------------------------");

            foreach ($Details as $detail) {
                $retVal = $this->_InsertInfuseReactDetail($GUID, $detail);
                // error_log("------------------------ Saved --------------------------------------------");

                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->NursingDoc->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }


            $this->NursingDoc->endTransaction();
            $jsonRecord['AdverseEventsAlertID'] = $GUID;
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $ErrMsg Service (expected a GET/POST/PUT got a " . $_SERVER['REQUEST_METHOD'] . ")";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "$ErrMsg records Process successful!";
        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
        return;
    }

    /** Boilerplate **
    function ReactAssess($PAT_ID = null, $InfuseReactRecordID=null ) {
        // error_log("PAT_ID = $PAT_ID; Infusion Reaction Record ID = ''");
        // error_log("Server Request = " . $_SERVER['REQUEST_METHOD']);

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";


        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        $ReactAssessRecords = array();
        $jsonRecord['success'] = 'true';
        $ErrMsg = "Infusion Reaction Records";

        $GUID = $this->NursingDoc->newGUID();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {

            $jsonRecord['msg'] = "No Infusion Reaction records to find";
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            return;
        }



        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $Details = $form_data->{'Details'};
            $this->NursingDoc->beginTransaction();



            $this->NursingDoc->endTransaction();
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Assessment Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'] . ")";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $jsonRecord['msg'] = "Infusion Reactions records Process successful!";
        $jsonRecord['InfuseReactionsID'] = $GUID;
        $this->set('jsonRecord', $jsonRecord);
        $this->set('frameworkErr', null);
        return;
    }


     *****************/

}
