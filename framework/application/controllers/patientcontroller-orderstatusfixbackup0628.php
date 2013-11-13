<?php

class PatientController extends Controller {

//	function view($id = null,$name = null) {
//	
//		$this->set('title',$name.' - My JSON Lookup Results');
//		$this->set('coms',$this->LookUp->select($id));
//
//	}
    
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
    
        
    function LabInfoResults($patientId = NULL){
        
        $jsonRecord = array();
        
        if($patientId != NULL){
            
            $records = $this->Patient->getLabInfoForPatient($patientId);

            if($this->checkForErrors('Get Patient Lab Info Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord['success'] = 'true';            
            $jsonRecord['total'] = count($records);
            
            $labInfoResults = array();
            
            foreach($records as $record){
                
                $results = $this->Patient->getLabInfoResults($record['ID']);
                $modResults = array();
                

// MWB - 5/14/2012 - There's only ever one element in the results array returned from MDWS (why make it an array then???)
				$result = $results[0];

				if('0' == $result['outOfRange']){
					$result['outOfRange'] = false;
				}else {
					$result['outOfRange'] = true;
				}

				$record['ResultID'] = $result['ID'];
				$record['name'] = $result['name'];
				$record['units'] = $result['units'];
				$record['result'] = $result['result'];
				$record['mdwsId'] = $result['mdwsId'];
				$record['acceptRange'] = $result['acceptRange'];
				$record['site'] = $result['site'];
				$record['outOfRange'] = $result['outOfRange'];

/********** - MWB - 5/14/2012 Original code
                foreach($results as $result){
                    if('0' == $result['outOfRange']){
                        $result['outOfRange'] = false;
                    }else {
                        $result['outOfRange'] = true;
                    }
                }
                
                array_push($modResults, $result);
                $record['results'] = $modResults;
****************/

                array_push($labInfoResults, $record);
                
            }
            
            $jsonRecord['records'] = $labInfoResults;
            
            $this->set('jsonRecord', $jsonRecord);
            
        }else{
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }        
        
    }
    
    function History($id = NULL){
        if($id != NULL){
            $this->set('history', $this->Patient->selectHistory($id));
            $this->set('frameworkErr','Removed several columns from Patient History so the query has been removed.');
        }else{
            $this->set('history', null);
            $this->set('frameworkErr','No Patient ID provided.');
        }
    }

    function Template($id = NULL){
        
        if($id != NULL){
            $patientTemplate = $this->Patient->getPriorPatientTemplates($id);
            
            if($this->checkForErrors('Get Patient Template Failed. ', $patientTemplate)){
                return;
            }
            
            $this->set('patientTemplate',$patientTemplate);
            $this->set('frameworkErr',null);
            
        }else{
            $this->set('frameworkErr','No Patient ID provided.');
        }
        
        
    }
    function savePatientTemplate(){

        $form_data = json_decode(file_get_contents('php://input'));
        
        $this->Patient->beginTransaction();
        
//        $templateId = $form_data->{'TemplateId'};
//
//        $lookup = new LookUp();
//        $template = $lookup->getTopLevelTemplateDataById($templateId);
//        
//        $newTemplateid = $this->insertTemplate($template,null,null,0,false);
//        
//        $form_data->{'TemplateId'} = $newTemplateid;

        $returnVal = $this->Patient->savePatientTemplate($form_data);
        
        if($this->checkForErrors('Apply Patient Template Failed. ', $returnVal)){
            $this->set('patientTemplateId',null);
            $this->Patient->rollbackTransaction();            
            return;
        }

        $this->createOEMRecords($form_data);
 
        $this->set('patientTemplateId',$returnVal);
        $this->set('frameworkErr',null);
        
        $this->Patient->endTransaction();                
        //echo $patientId . ' ' . $templateId . ' ' . $dateApplied . ' ' . $dateStarted . ' ' . $dateEnded;

        
        //$lookup = new LookUp();
        //$testvar = $lookup->getTemplates();
        
        //echo $testvar;
        
    }
    
	// MWB - 5/3/2012
	// Need to generate a Treatment Status for the Match Call as well as for the viewAll call
	// So extracted code from viewall below and made it into a function to be used in match as well.
	function TreatmentStatus($detail) {
		$startDate = new DateTime($detail['TreatmentStart']);
		$endDate = new DateTime($detail['TreatmentEnd']);
		$today = new DateTime("now");

		if($today < $startDate){
			$detail['TreatmentStatus'] = "Applied";
		} else if ($today >= $startDate && $today <= $endDate){
			$admindate = $this->Patient->isAdminDate($detail['TemplateID'],$today->format('m/d/Y'));
			if(count($admindate)>0){
				$detail['TreatmentStatus'] = "On-Going - Admin Day";
			}else{
				$detail['TreatmentStatus'] = "On-Going - Rest Day";
			}
		} else {
			$detail['TreatmentStatus'] = "Ended";
		}
		return $detail;
	}















    function savePatient(){
        
        $form_data = json_decode(file_get_contents('php://input'));
        
        $this->Patient->beginTransaction();
        
        $retVal = $this->Patient->savePatient($form_data);

        if($this->checkForErrors('Insert into Patient_History failed.', $retVal)){
            $this->Patient->rollbackTransaction();            
            return;
        }
        
        $this->set('patientId', $retVal);
        $this->set('frameworkErr', null);

        $this->Patient->endTransaction();        
        
    }
    
    function viewall($id = NULL) {
//        if($id == NULL){
            $retVal = $this->Patient->selectAll();
            if($this->checkForErrors('Get Patients Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            
            $patients = $retVal;
            $patientDetailMap = array();
            $measurements = array();
            $modPatients = array();
            
            foreach ($patients as $patient) {
				if ((NULL === $id) || (NULL !== $id && $patient['ID'] == $id)) {
                $lookup = new LookUp();
                $amputations = $lookup->getLookupDescByNameAndType($patient['ID'], '30');
                if($this->checkForErrors('Get Patient Amputations Failed. ', $amputations)){
                    $this->set('templatedata', null);
                    return;
                }
                
                $tmpAmputations = array();            
                foreach($amputations as $amputation){
                    array_push($tmpAmputations,$amputation);
                }
                
                $patient['amputations'] = $tmpAmputations;
                array_push($modPatients, $patient);
                
                $retVal = $this->Patient->getPatientDetailInfo($patient['ID']);

                if($this->checkForErrors('Get Patient Details Failed. ', $retVal)){
                    $this->set('templatedata', null);
                    return;
                }
                
                $details = $retVal;
                if(count($details)>0){
                    $detail = $details[0];
					$detail = $this->TreatmentStatus($detail);
                    $patientDetailMap[$patient['ID']] = $detail;
                }else{
                    $patientDetailMap[$patient['ID']] = $details;
                }
				}
            }

            $this->set('patients', $modPatients);
            $this->set('templatedetails', $patientDetailMap);
            
            
//        }else {
  //          $this->set('patients',null);
    //        $this->set('frameworkErr', 'Unrecognized Parameter passed.');
      //  }
        
       
    }
    
    function adminDaysArray($therapies, $infusionMap, $dateStarted, $template, $cycle, $patientId, $Order_IDR){

        foreach($therapies as $therapy){
            
            $adminDays = $therapy["adminDay"];

            $dashPos = strpos($adminDays, '-');
            $commaPos = strpos($adminDays, ',');

            $commaValArray = array();
            $dashValArray = array();
            $finalCommaValArray = array();
            $finalDashValArray = array();
            $daysArray = array();

            if(false !== $dashPos && false !== $commaPos){

                $commaValArray = explode(',', $adminDays);
                for ($index = 0; $index<count($commaValArray); $index++){

                    $tmpArray = explode('-', $commaValArray[$index]);

                    if(count($tmpArray)>1){
                        $pos = count($daysArray);
                        $daysArray[$pos] = $index;

                        $actualNextVal = (int)$tmpArray[1];
                        $currentVal = (int)$tmpArray[0];

                        while($currentVal <= $actualNextVal){
                            $pos = count($finalDashValArray);
                            $finalDashValArray[$pos] = $currentVal;
                            $currentVal++;
                        }
                    }
                }

                foreach ($daysArray as $day){
                    unset($commaValArray[$day]);
                }

                $finalCommaValArray = $commaValArray;

            }else if(false === $dashPos && false !== $commaPos){

                $commaValArray = explode(',', $adminDays);
                $finalCommaValArray = $commaValArray;

            }else if(false !== $dashPos && false === $commaPos){

                $dashValArray = explode('-', $adminDays);
                
                $actualNextVal = (int)$dashValArray[1];
                $currentVal = (int)$dashValArray[0];

                while($currentVal <= $actualNextVal){
                    $pos = count($finalDashValArray);
                    $finalDashValArray[$pos] = $currentVal;
                    $currentVal++;
                }

            }else{
                $finalCommaValArray[0] = $adminDays;
            }


            if(count($finalCommaValArray) > 0 || count($finalDashValArray) > 0){

                $daysArray = array_merge($finalCommaValArray, $finalDashValArray);
                $daysArray = array_unique($daysArray);
                sort($daysArray);

                $startDate = new DateTime($dateStarted);
                
                for ($index = 0; $index < count($daysArray); $index++) {

                    $daysDiff = 0;
                    
                    if($index>0){
                        
                        $daysDiff = ($daysArray[$index] - $daysArray[$index-1]);

                    }else if($daysArray[$index]>1){
                        
                        $daysDiff = ($daysArray[$index])-1;
                        
                    }

                    date_add($startDate, new DateInterval('P'.$daysDiff.'D'));
                    
//                    echo 'Cycle: '. $cycle. 'Day: ' . $daysArray[$index] . ' ' .$startDate->format('m/d/Y') . ' daysdiff '.$daysDiff . ' startDate.' .$startDate->format('Y-m-d');
//                    echo '<br/>';
                    //$templateid = $this->insertTemplate($template,$daysArray[$index],$startDate->format('m/d/Y'),$cycle);
                    $templateid = $this->insertTemplate($template,$daysArray[$index],$startDate->format('Y-m-d'),$cycle,$patientId);
                    
                    if(!$templateid){
                    
						return;
						
                    }
                    if(null != $infusionMap){
                        $this->insertHydrations($therapy, $infusionMap, $templateid[0]['lookupid'], $Order_IDR);
					
                    }else{
                        $this->insertRegimens($therapy, $templateid[0]['lookupid'], $Order_IDR);
					
                    }
                    
                }
//                echo '*************';
                
            }
        }
        
    }
    
    function insertRegimens($regimen,$templateid, $Order_IDR){
        
        $myregimen->{'drugid'} = $regimen["drugid"];
        $myregimen->{'Amt'} = $regimen["regdose"];
        $myregimen->{'Units'} = $regimen["regdoseunit"];
        $myregimen->{'Route'} = $regimen["route"];
        $myregimen->{'Day'} = $regimen["adminDay"];
        $myregimen->{'InfusionTime'} = $regimen["infusion"];
        $myregimen->{'FluidVol'} = $regimen["flvol"];
        $myregimen->{'FlowRate'} = $regimen["flowRate"];
        $myregimen->{'Instructions'} = $regimen["instructions"];
        $myregimen->{'Sequence'} = $regimen["sequence"];
        $myregimen->{'AdminTime'} = $regimen["adminTime"];
        $myregimen->{'FluidType'} = $regimen["fluidType"];
		$myregimen->{'Order_IDR'} = $Order_IDR;
        
        $regimens = array();
        $regimens[0]->{'data'} = $myregimen;
        
        $lookup = new LookUp();
        $retVal = $lookup->saveRegimen($regimens, $templateid, $Order_IDR);
        
        if($this->checkForErrors('Insert Template Regimens Failed. ', $retVal)){
            $this->Patient->rollbackTransaction();
            return;
        }
        
    }
    
    
    function insertHydrations($hydration,$infusionMap,$templateid, $Order_IDR){

        $myhydration->{'drugid'} = $hydration["drug"];
        $myhydration->{'description'} = $hydration["description"];
        $myhydration->{'fluidVol'} = $hydration["fluidVol"];
        $myhydration->{'flowRate'} = $hydration["flowRate"];
        $myhydration->{'infusionTime'} = $hydration["infusionTime"];
        $myhydration->{'adminDay'} = $hydration["adminDay"];
        $myhydration->{'sequence'} = $hydration["Sequence"];
        $myhydration->{'adminTime'} = $hydration["adminTime"];
        $myhydration->{'Order_IDR'} = $Order_IDR;
        
        $myhydration->{'infusions'} = $infusionMap[$hydration['id']];
        
        $hydrations = array();
        $hydrations[0]->{'data'} = $myhydration;
        

        $lookup = new LookUp();
        $retVal = $lookup->saveHydrations($hydrations, $hydration["type"], $templateid, $Order_IDR);
        
        if($this->checkForErrors('Insert '.$hydration["type"].' Therapy Failed. ', $retVal)){
            $this->Patient->rollbackTransaction();
            return;
        }

    }
    
    function insertTemplate($template,$adminDay,$adminDate,$cycle,$patientId){
        
        $form_data->{'Disease'} = $template[0]['Disease'];
        $form_data->{'DiseaseStage'} = $template[0]['DiseaseStage'];
        $form_data->{'CycleLength'} = $template[0]['length'];
        $form_data->{'CycleLengthUnit'} = $template[0]['CycleLengthUnitID'];
        $form_data->{'ELevel'} = $template[0]['emoID'];
        $form_data->{'FNRisk'} = $template[0]['fnRisk'];
        $form_data->{'PostMHInstructions'} = $template[0]['postMHInstruct'];
        $form_data->{'PreMHInstructions'} = $template[0]['preMHInstruct'];
        $form_data->{'RegimenInstruction'} = $template[0]['regimenInstruction'];
        $form_data->{'CourseNumMax'} = $template[0]['CourseNumMax'];
        
        $form_data->{'AdminDay'} = $adminDay;
        $form_data->{'AdminDate'} = $adminDate;
        $form_data->{'Cycle'} = $cycle;
        $form_data->{'PatientID'} = $patientId;
        
        $lookup = new LookUp();
        $templateid = $lookup->saveTemplate($form_data, $template[0]['RegimenId']);

        if($this->checkForErrors('Insert Master Template Failed. ', $templateid)){
            $this->Patient->rollbackTransaction();
            return;
        }
        
//        if (is_array($templateid) && array_key_exists('error', $templateid)) {
//
//            $errorMsg = 'Insert Master Template Failed. ';
//            
//            if(DB_TYPE == 'sqlsrv'){		
//                foreach ($templateid['error'] as $error) {
//                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
//                }
//            }else if(DB_TYPE == 'mysql'){
//                    $errorMsg .= $templateid['error'];
//            }
//
//            $this->set('frameworkErr', $errorMsg);
//
//            $this->Patient->rollbackTransaction();
//
//            return;
//        }
        
        return $templateid;
        
        
    }
    
    function createOEMRecords($form_data){
        
        $templateId = $form_data->{'TemplateId'};
        $dateStarted = $form_data->{'DateStarted'};
        $patientId = $form_data->{'PatientId'};
        
        $lookup = new LookUp();
        $template = $lookup->getTopLevelTemplateDataById($templateId);
        
        $totalCourses = $template[0]['CourseNumMax'];

        $this->Hydrations('pre', $templateId);

        $preHydrations = $this->get('prehydrations');
        $preinfusionMap = $this->get('preinfusions');

        $this->Hydrations('post', $templateId);

        $postHydrations = $this->get('posthydrations');
        $postinfusionMap = $this->get('postinfusions');
        
        $this->Regimens($templateId);
                
        $regimens = $this->get('regimens');
        
        for ($index = 1; $index <= $totalCourses; $index++) {

            
            if(!is_null($preHydrations)){

                //$this->adminDaysArray($preHydrations, $preinfusionMap, $dateStarted, $template,$index,$patientId);
                
				//var_dump($form_data);
				//var_dump($preHydrations);
                //var_dump($preinfusionMap);
                //var_dump($dateStarted);
                //var_dump($template);
                //var_dump($index);
                
				$Order_IDR = $this->Patient->CreateOrderStatus($form_data,$preHydrations);
				$this->adminDaysArray($preHydrations, $preinfusionMap, $dateStarted, $template,$index,$patientId,$Order_IDR);
				$this->Patient->CreateOrderStatus($form_data,$preHydrations);
            }
            
            if(!is_null($postHydrations)){
                //not sure if needed to set pre and post order status
				$Order_IDR = $this->Patient->CreateOrderStatus($form_data,$postHydrations);
                $this->adminDaysArray($postHydrations, $postinfusionMap, $dateStarted, $template,$index,$patientId,$Order_IDR);
				$this->Patient->CreateOrderStatus($form_data,$postHydrations);
            }
            
            if(!is_null($regimens)){
			
				//not sure if needed to set pre and post order status
				$Order_IDR = $this->Patient->CreateOrderStatus($form_data,$regimens);
                $this->adminDaysArray($regimens, null, $dateStarted, $template,$index,$patientId,$Order_IDR);
				$this->Patient->CreateOrderStatus($form_data,$regimens);
            }
            
            
            $startDate = new DateTime($dateStarted);
            $timeFrameUnit = $template[0]["CycleLengthUnit"];


            $daysDiff = $template[0]["length"];

            if('Days' === $timeFrameUnit){
                date_add($startDate, new DateInterval('P'.$daysDiff.'D'));
            }else if('Weeks' === $timeFrameUnit){
                $daysDiff *= 7;
                date_add($startDate, new DateInterval('P'.$daysDiff.'D'));
            }else if('Months' === $timeFrameUnit){
                date_add($startDate, new DateInterval('P'.$daysDiff.'M'));
            }else if('Years' === $timeFrameUnit){
                date_add($startDate, new DateInterval('P'.$daysDiff.'Y'));
            }

            
            $dateStarted = $startDate->format('Y-m-d');

            
        }
        
        
        
    }
    
    function OEM($id = null){
        
        $form_data = json_decode(file_get_contents('php://input'));            
        
        if($id != NULL){
        
            $lookup = new LookUp();
            
            $templateId = $this->Patient->getTemplateIdByPatientID($id);
            
            if($this->checkForErrors('Template ID not available in Patient_Assigned_Templates. ',$templateId)){
                $this->set('masterRecord', null);
                return;
            }

            if(0 == count($templateId)){
                $this->set('oemsaved', null);
                $this->set('oemrecords', null);
                $this->set('masterRecord', null);
                $this->set('frameworkErr', null);
                return;
            }
            
            $masterRecord = $this->Patient->getTopLevelPatientTemplateDataById($id,$templateId[0]['id']);

            if($this->checkForErrors('Get Top Level Template Data Failed. ', $masterRecord)){
                $this->set('masterRecord', null);
                return;
            }
			

            $this->set('masterRecord', $masterRecord);
            
            $oemrecords = $this->Patient->getTopLevelOEMRecords($id,$templateId[0]['id']);

            if($this->checkForErrors('Get Top Level OEM Data Failed. ', $oemrecords)){
                $this->set('oemrecords', null);
                return;
            }
            
            $this->set('oemrecords', $oemrecords);
            
            $oemMap = array();
            
            foreach ($oemrecords as $oemrecord) {
                
                $oemDetails = array();
                
                $retVal = $this->Hydrations('pre',$oemrecord['TemplateID']);

                if($this->checkForErrors('Get Pre Therapy Failed. ', $retVal)){
                    $this->set('oemrecords', null);
                    return;
                }
                
                $oemDetails['PreTherapy'] = $this->get('prehydrations');
                $oemDetails['PreTherapyInfusions'] = $this->get('preorigInfusions');
                
                $retVal = $this->Hydrations('post',$oemrecord['TemplateID']);

                if($this->checkForErrors('Get Post Therapy Failed. ', $retVal)){
                    $this->set('oemrecords', null);
                    return;
                }
                
                $oemDetails['PostTherapy'] = $this->get('posthydrations');
                $oemDetails['PostTherapyInfusions'] = $this->get('postorigInfusions');

                $retVal = $this->Regimens($oemrecord['TemplateID']);

                if($this->checkForErrors('Get Therapy Failed. ', $retVal)){
                    $this->set('oemrecords', null);
                    return;
                }
                
                $oemDetails['Therapy'] = $this->get('regimens');
                $oemMap[$oemrecord['TemplateID']] = $oemDetails;
            }
            
            $this->set('oemMap',$oemMap);
            $this->set('oemsaved', null);
            $this->set('frameworkErr', null);

        }else if($form_data){
            
            $this->Patient->beginTransaction();
            
            $retVal = $this->Patient->updateOEMRecord($form_data);
			//this works
			//$this->Patient->CreateOrderStatus($form_data);
			//$this->Patient->OEMupdateOrderStatus($form_data);
			
            $this->set('oemrecords', null);
            
            if(null != $retVal && array_key_exists('apperror', $retVal)){
                $errorMsg = $retVal['apperror'];
                $this->set('frameworkErr', $errorMsg);
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                return;
            
            }

            if($this->checkForErrors('Update OEM Record Failed. ', $retVal)){
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            /*
             * Moved the call to OEMeditWorkflow into the controler because from here it can be easily determined if 
             * the update oem record failed. In which case this function will not be called.
             */
            //Call Workflow 
			//need to capture if there is a reason, if no reason, then the workflow shouldn't run - sic -6/4/2012
			$reason = $form_data->Reason;
			
			//need patient id and template id to update Order_status table with In-Coordination
			$templateId = $form_data->TemplateID;
			$patientId = $id;
			//echo "pid: ".$patientId."";
			//var_dump($id);
			//var_dump($form_data);
			if ($reason != ''){
            
			$workflow = new Workflow();
            $workflow->OEMeditWorkflow($form_data);
			///$Orders->updateWorkFlowOrderStatus($patientId,$templateId);
			$this->Patient->updateWorkFlowOrderStatus($templateId);
			
			}
            
            $this->Patient->endTransaction();

            $this->set('oemsaved', '');
            $this->set('frameworkErr', null);
            
        }else {
            $this->set('frameworkErr','No Template ID provided.');
        }

        
    }
    
    function Regimens($id = null) {

        $lookup = new LookUp();

        $regimens = $lookup->getRegimens($id);
        if (null != $regimens && array_key_exists('error', $regimens)) {
            return $regimens;
        }
        
        $this->set('regimens', $lookup->getRegimens($id));
        
    }
    
    function Vitals($id = null,$dateTaken = null){
        
        $form_data = json_decode(file_get_contents('php://input'));            
        
        if($id != NULL){
            
            $records = $this->Patient->getMeasurements_v1($id,$dateTaken);

            if($this->checkForErrors('Get Patient Vitals Failed. ', $records)){
                $this->set('jsonRecord', null);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            
        }else if($form_data){
            
            $this->Patient->beginTransaction();
            
            $saveVitals = $this->Patient->saveVitals($form_data,null);
            
            if(null != $saveVitals && array_key_exists('apperror', $saveVitals)){
                $errorMsg = $saveVitals['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            if ($this->checkForErrors('Save Patient Vitals Failed. ', $saveVitals)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'Vitals Record Saved';
            
            $jsonRecord['records'] = '';
            //$jsonRecord['records'] = $form_data->{'total'};
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            $this->Patient->endTransaction();
            
        }else {
            $this->set('frameworkErr','No Patient ID provided.');
        }

    }
    
    function Allergies($patientId = null){
        
        //$form_data = json_decode(file_get_contents('php://input'));            

        $jsonRecord = array();
        
        if($patientId != NULL){
            
            $records = $this->Patient->getAllergies($patientId);

            if($this->checkForErrors('Get Patient Allergies Failed. ', $records)){
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord['success'] = 'true';            
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);
            
        }        
        
    }
	
    function Hydrations($type = null, $id = null) {

		
        $lookup = new LookUp();
        
        $hydrations = $lookup->getHydrations($id, $type);

        if (null != $hydrations && array_key_exists('error', $hydrations)) {
            return $hydrations;
        }
        
        $infusionMap = array();
        $origInfusionMap = array();
        
        foreach ($hydrations as $hydration) {

            $infusions = $lookup->getMHInfusions($hydration['id']);
            if (null != $infusions && array_key_exists('error', $infusions)) {
                return $infusions;
            }
            
            $myinfusions = array();

            $origInfusionMap[$hydration['id']] = $infusions;

            for ($i = 0; $i < count($infusions); $i++) {
            	$myinfusion = array();
                $myinfusion['amt'] = $infusions[$i]['amt'];
                $myinfusion['unit'] = $infusions[$i]['unit'];
                $myinfusion['type'] = $infusions[$i]['type'];
                $myinfusion['flowRate'] = $infusions[$i]['flowRate'];
                $myinfusion['fluidVol'] = $infusions[$i]['fluidVol'];
                $myinfusion['fluidType'] = $infusions[$i]['fluidType'];
                $myinfusion['infusionTime'] = $infusions[$i]['infusionTime'];
                $myinfusion['Order_ID'] = $infusions[$i]['Order_ID'];
                $myinfusions[$i]->{'data'} = $myinfusion;
            }
            
            $infusionMap[$hydration['id']] = $myinfusions;
            
            
        }
        
        $this->set($type.'hydrations', $hydrations);
        $this->set($type.'infusions', $infusionMap);
        $this->set($type.'origInfusions', $origInfusionMap);
    }

///sic's Code
    function OEM_AllOrdersToday(){
        
        $jsonRecord = array();
        
        $records = $this->Patient->getOEMrecordsToday();
        
        if ($this->checkForErrors('Get OEM Records Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
		
        //$templateIds = $this->Patient->getTemplateIds();
        
    }
	
	   function OEM_PatientOrdersToday(){
        
        $jsonRecord = array();
        
        $records = $this->Patient->getOEMPatientOrdersToday($matchvalue);
        
        if ($this->checkForErrors('Get OEM Patient Records for Today Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
		
        //$templateIds = $this->Patient->getTemplateIds();
        
    }	

	function sendCPRSOrder(){
        
        $jsonRecord = array();
        
		$TID = '2C987ADB-F6A0-E111-903E-000C2935B86F';
        $records = $this->Patient->sendCPRSOrder($TID);
        
        if ($this->checkForErrors('Place CPRS Order Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
		
        //$templateIds = $this->Patient->getTemplateIds();
        
    }	
	

}
