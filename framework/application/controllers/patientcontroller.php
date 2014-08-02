<?php
/**
 * @property Patient $Patient
 *
 */
class PatientController extends Controller
{

    function checkForErrors($errorMsg, $retVal)
    {
        if (null != $retVal && array_key_exists('error', $retVal)) {
            
            if (DB_TYPE == 'sqlsrv') {
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " .
                             $error['code'] . " message: " . $error['message'];
                }
            } else if (DB_TYPE == 'mysql') {
                $errorMsg .= $retVal['error'];
            }
            
            $this->set('frameworkErr', $errorMsg);
            
            return true;
        }
        
        return false;
    }

<<<<<<< HEAD
=======
    public function escapeString($string) {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            return str_replace("'", "''", $string);
        } else if (DB_TYPE == 'mysql') {
            return mysql_real_escape_string($string);  	
        }
        return $string;
    }

>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
    function MedicationSanityCheck () {
        // Get all templates from the Master Template
        $query = "select * from Master_Template";
        // Template_ID - should exist in all tables
        // Regimen_ID
        // Cancer_ID
        // Location_ID
        // Cycle_Time_Frame_ID
        // Emotegenic_ID
        // Created_By
        // Patient_ID


        // for each template walk through all the therapies and look into the Regimen and Medication_Hydration and MH_Infusion tables for squirly data
        // When found produce a list
    }



    function LabInfoResults($patientId = NULL)
    {
        $jsonRecord = array();
        
        if ($patientId != NULL) {
            
            $records = $this->Patient->getLabInfoForPatient($patientId);
            
            if ($this->checkForErrors('Get Patient Lab Info Failed. ', $records)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $labInfoResults = array();
            
            foreach ($records as $record) {
                
                $results = $this->Patient->getLabInfoResults($record['ID']);
                // $modResults = array();
                
                // MWB - 5/14/2012 - There's only ever one element in the
                // results array returned from MDWS (why make it an array
                // then???)
                if( isset($results[0]) ) {
                    $result = $results[0];
                }
                else {
                    $result = $results;
                }
                if ('0' == $result['outOfRange']) {
                    $result['outOfRange'] = false;
                } else {
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
                
                /**
                 * ******** - MWB - 5/14/2012 Original code
                 * foreach($results as $result){
                 * if('0' == $result['outOfRange']){
                 * $result['outOfRange'] = false;
                 * }else {
                 * $result['outOfRange'] = true;
                 * }
                 * }
                 *
                 * array_push($modResults, $result);
                 * $record['results'] = $modResults;
                 * **************
                 */
                
                array_push($labInfoResults, $record);
            }
            
            $jsonRecord['records'] = $labInfoResults;
            
            $this->set('jsonRecord', $jsonRecord);
        } else {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
        }
    }

    function History($id = NULL)
    {
        if ($id != NULL) {
            $this->set('history', $this->Patient->selectHistory($id));
            $this->set('frameworkErr', 
                    'Removed several columns from Patient History so the query has been removed.');
        } else {
            $this->set('history', null);
            $this->set('frameworkErr', 'No Patient ID provided. - 123');
        }
    }

    function Template($id = NULL)
    {
        if ($id != NULL) {
            $patientTemplate = $this->Patient->getPriorPatientTemplates($id);
            
            if ($this->checkForErrors('Get Patient Template Failed. ', $patientTemplate)) {
                return;
            }
            
            $this->set('patientTemplate', $patientTemplate);
            $this->set('frameworkErr', null);
        } else {
            $this->set('frameworkErr', 'No Patient ID provided.');
        }
    }

    /* Get all templates assigned to a patient (past and current) */
    function Templates($Patient_ID = NULL)
    {
        $jsonRecord = array();

        if (NULL === $Patient_ID) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Patient ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        $details = $this->Patient->getCurrentAndHistoricalPatientTemplates($Patient_ID);
        if ($this->checkForErrors('Get Patient Details Failed. ', $details )) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'Get Patient Details Failed.';
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        $currentTemplate = array();
        $historicalTemplates = array();
        foreach ($details as $detail) {
            $current = strtotime($detail["DateEnded"]) > strtotime(date("m/d/Y"));
            if ("" === $detail["DateEndedActual"] && $current) {
                $currentTemplate[] = $detail;
            }
            else {
                $historicalTemplates[] = $detail;
            }
        }
        $records = array();
        $records['current'] = $currentTemplate;
        $records['historical'] = $historicalTemplates;
      

        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($details);
        $jsonRecord['records'] = $records;
        $this->set('jsonRecord', $jsonRecord);
    }






	function PrintOrders($patientID) {
		$hasErrors = false;

		if ($patientID != NULL) {
			// Call the "selectByPatientId" function of the Patient model to retrieve all the basic Patient Info
			$patientData = $this->Patient->selectByPatientId($patientID);
			if ($this->checkForErrors('Get Patient Details Failed. ', $patientData)) {
				$this->set('templatedata', null);
				$hasErrors = true;
				return;
			}
			$this->set('PatientInfo', $patientData[0]);

			$patientAllergies = $this->Allergies($patientID);
			if ($this->checkForErrors('Get Patient Allergies Failed. ', $patientAllergies)) {
				return;
			}

			$this->set('patientAllergies', $patientAllergies);
			$this->set('frameworkErr', null);


			$patientTemplate = $this->Patient->getPriorPatientTemplates($patientID);
			if ($this->checkForErrors('Get Patient Template Failed. ', $patientTemplate)) {
				return;
			}

			$this->set('patientTemplate', $patientTemplate);
			$this->set('frameworkErr', null);

			// Function is also used by the OEM controller function to retrieve all the current OEM Data
			$this->genOEMData($patientID);
			$PatientDetails = $this->Patient->getPatientDetailInfo($patientID);
			if ($this->checkForErrors('Get Patient Details Failed. ', $PatientDetails)) {
				$this->set('templatedata', null);
				$hasErrors = true;
				return;
			}

			if (!empty($PatientDetails[0])) {
				$detail = $this->TreatmentStatus($PatientDetails[0]);
				if ($detail["TreatmentStatus"] == 'Ended') {
					$detail = null;
				}
				$patientDetailMap[$patientID] = $detail;
			} 
			else {
				$patientDetailMap[$patientID] = $PatientDetails;
			}
			$this->set('PatientDetailMap', $patientDetailMap);

/**
			$lookup = new LookUp();
			$Disease = $lookup->selectByNameAndDesc('DiseaseType', $this->masterRecord[0]['Disease']);
			if ($this->checkForErrors('Get Disease Info Failed. ',  $Disease)) {
				$this->set('templatedata', null);
				return;
			}
			$this->masterRecord[0]['DiseaseRecord'] = $Disease;
**/

		}
		else {
			$this->set('frameworkErr', 'No Patient ID provided.');
		}
	}



    /**
     * savePatientTemplate action
     */
    public function savePatientTemplate()
    {
        $formData = json_decode(file_get_contents('php://input'));
        
        $this->Patient->beginTransaction();
        
        $returnVal = $this->Patient->savePatientTemplate($formData);

        if ($this->checkForErrors('Apply Patient Template Failed. ', $returnVal)) {
            $this->set('patientTemplateId', null);
            $this->Patient->rollbackTransaction();
            return;
        }
        
        $this->createOEMRecords($formData);
        
        $this->set('patientTemplateId', $returnVal[0]['id']);
        $this->set('frameworkErr', null);
        
        $this->Patient->endTransaction();
    }
    
    /**
     * 
     * @param array $detail
     * @return array
     */
    public function TreatmentStatus($detail)
    {
        $startDate = new DateTime($detail['TreatmentStart']);
        $endDate = new DateTime($detail['TreatmentEnd']);
        $actualEndDate = (!empty($detail['TreatmentEndActual'])) ? new DateTime($detail['TreatmentEndActual']) : null;
        $today = new DateTime("now");
        
        if ((!empty($actualEndDate) && $today > $actualEndDate) || $today > $endDate) {
            $status = "Ended";
        } else if ($today < $startDate) {
            $status = "Applied";
        } else {
            $admindate = $this->Patient->isAdminDate($detail['TemplateID'], 
                    $today->format('m/d/Y'));
            if (count($admindate) > 0) {
                $status = "On-Going - Admin Day";
            } else {
                $status = "On-Going - Rest Day";
            }
        } 
        $detail["TreatmentStatus"] = $status;
        return $detail;
    }

    function savePatient()
    {
        $form_data = json_decode(file_get_contents('php://input'));
        
        $this->Patient->beginTransaction();
        
        $retVal = $this->Patient->savePatient($form_data);
        
        if ($this->checkForErrors('Insert into Patient_History failed.', 
                $retVal)) {
            $this->Patient->rollbackTransaction();
            return;
        }
        
        $this->set('patientId', $retVal);
        $this->set('frameworkErr', null);
        
        $this->Patient->endTransaction();
    }




    function viewall($id = NULL)
    {
// error_log("viewall Entry Point");
        if($id == NULL){
            $retVal = $this->Patient->selectAll();
        }
        else {
            $retVal = $this->Patient->selectAll($id);
        }
        if ($this->checkForErrors('Get Patients Failed. ', $retVal)) {
            $this->set('templatedata', null);
            return;
        }

        $patients = $retVal;
        $patientDetailMap = array();
        $measurements = array();
        $modPatients = array();
// error_log("Patients Count - " . count($patients));
            foreach ($patients as $patient) {
                if ((NULL === $id) || (NULL !== $id && $patient['ID'] == $id)) {
                    $lookup = new LookUp();


                    $amputations = $lookup->getLookupDescByNameAndType( $patient['ID'], '30');
                    if ($this->checkForErrors('Get Patient Amputations Failed. ',  $amputations)) {
                        $this->set('templatedata', null);
                        return;
                    }
                    $tmpAmputations = array();
                    foreach ($amputations as $amputation) {
                        array_push($tmpAmputations, $amputation);
                    }
                    $patient['amputations'] = $tmpAmputations;
                    array_push($modPatients, $patient);


                    $retVal = $this->Patient->getPatientDetailInfo($patient['ID']);
                    
                    if ($this->checkForErrors('Get Patient Details Failed. ', $retVal)) {
                        $this->set('templatedata', null);
                        return;
                    }
                    $patientBSA = $this->_getBSA($patient['ID']);

                    $details = $retVal;
// error_log("Details Count - " . count($details));
// error_log("Why are there so many detail records for a single patient?");
                    if (count($details) > 0) {
                    foreach($details as $d) {
                        $detail = $this->TreatmentStatus($d);

//                        error_log("BSA");
//                        error_log(json_encode($patientBSA));
                        if (isset($patientBSA) && count($patientBSA) > 0) {
//                            error_log("Got BSA Data from BSA_Info Table");
                            $a = $patientBSA[0]["WeightFormula"];
                            $b = $patientBSA[0]["BSAFormula"];
                            $detail["WeightFormula"] = $a;
                            $detail["BSAFormula"] = $b;
                        }


                        if ($detail["TreatmentStatus"] != 'Ended') {
                            $patientDetailMap[$patient['ID']] = $detail;
                        }
                    }
                }
                    else {
// error_log("No Details, so build one");
                            $detail = array();
                            $detail["TemplateName"] = "";
                            $detail["TemplateDescription"] = "";
                            $detail["TemplateID"] = "";
                            $detail["TreatmentStart"] = "";
                            $detail["TreatmentEnd"] = "";
                            $detail["TreatmentStatus"] = "";
                            $detail["Goal"] = "";
                            $detail["ClinicalTrial"] = "";
                            $detail["PAT_ID"] = "";
                            $detail["PerformanceStatus"] = "";

                            if (isset($patientBSA) && count($patientBSA) > 0) {
                                // error_log("Got BSA Data from BSA_Info Table");
                                $a = $patientBSA[0]["WeightFormula"];
                                $b = $patientBSA[0]["BSAFormula"];
                                $detail["WeightFormula"] = $a;
                                $detail["BSAFormula"] = $b;
                            }
                            $patientDetailMap[$patient['ID']] = $detail;
                    }
                }
            }
        
        $this->set('patients', $modPatients);
        $this->set('templatedetails', $patientDetailMap);
    }

    /**
     *
     * @param array $formData            
     * @param array $preHydrationRecord            
     * @return string
     *
     * @todo Move this into a model
     */
    private function _insertOrderStatus($formData, $preHydrationRecord, $GUID, $infusionMap)
    {
<<<<<<< HEAD
	//echo "|||preHydrationRecord||| ";
	//var_dump($preHydrationRecord);
	//echo "|||infusionMap||| ";
	//var_dump($infusionMap);
	
	//$amt = $infusionMap['amt'];
	/*if (empty($infusionMap['type'])){
	$route = $preHydrationRecord['route'];
	}
	else{
	$route = $infusionMap['type'];
	}
	
	if (empty($infusionMap['amt'])){
	$amt = 1;
	}
	else{
	$amt = $infusionMap['amt'];
	}
*/
=======
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
        $templateId = $formData->TemplateID;
        $patientid = $formData->PatientID;
        $drugName = $preHydrationRecord['drug'];
        $AdminDay = $preHydrationRecord['AdminDay'];
        $DrugID = $preHydrationRecord['id'];
        $orderType = (empty($preHydrationRecord['type'])) ? 'Therapy' : $preHydrationRecord['type'];
        $orderStatus = "Ordered";
		$Notes = "Line 467, PatientController";
        
        $query = "
            INSERT INTO Order_Status (
                Template_ID, 
                Order_Status,
				Order_ID,				
                Drug_Name,
				Drug_ID,
                Order_Type, 
                Patient_ID,
<<<<<<< HEAD
				Notes,
				Amt,
				Route,
				AdminDay
=======
				Notes
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
            ) VALUES (
                '$templateId',
                '$orderStatus',
                '$GUID',
                '$drugName',
                '$DrugID',
                '$orderType',
                '$patientid',
<<<<<<< HEAD
                '$Notes',
                '$amt',
                '$route',
                '$AdminDay'
=======
                '$Notes'
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
            )
        ";
        $this->Patient->query($query);
        /*removed for Order ID Bug
        $mssqlLimit = null;
        $mysqlLimit = null;
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $mssqlLimit = 'TOP (1)';
        } else if (DB_TYPE == 'mysql') {
            $mysqlLimit = 'LIMIT 1';
        }
        
		$queryOrderId = "SELECT $mssqlLimit Order_ID, Date_Modified FROM Order_Status ORDER BY Date_Modified DESC $mysqlLimit";
        $result = $this->Patient->query($queryOrderId);
        if (! empty($result[0]['Order_ID'])) {
            return $result[0]['Order_ID'];
			
        } else {
            return null;
        }*/
		return $GUID;
    }

    /**
     *
     * @param unknown_type $therapies            
     * @param unknown_type $infusionMap            
     * @param unknown_type $dateStarted            
     * @param unknown_type $template            
     * @param unknown_type $cycle            
     * @param unknown_type $patientId            
     * @param stdClass $formData            
     *
     * @todo Move this into a model
     */
    private function _insertTherapyOrders($therapies, $infusionMap, $dateStarted, 
            $template, $cycle, $patientId, $formData)
    {
	//var_dump($therapies);
	//echo "|||Therapies||";
	//var_dump($infusionMap);
	//echo "|||Infusion Map||";
	//var_dump($formData);
	//echo "|||FormData||";
        foreach ($therapies as $therapy) {
            
            $adminDays = $therapy["adminDay"];
            
            $dashPos = strpos($adminDays, '-');
            $commaPos = strpos($adminDays, ',');
            
            $commaValArray = array();
            $dashValArray = array();
            $finalCommaValArray = array();
            $finalDashValArray = array();
            $daysArray = array();
            
            if (false !== $dashPos && false !== $commaPos) {
                
                $commaValArray = explode(',', $adminDays);
                for ($index = 0; $index < count($commaValArray); $index ++) {
                    
                    $tmpArray = explode('-', $commaValArray[$index]);
                    
                    if (count($tmpArray) > 1) {
                        $pos = count($daysArray);
                        $daysArray[$pos] = $index;
                        
                        $actualNextVal = (int) $tmpArray[1];
                        $currentVal = (int) $tmpArray[0];
                        
                        while ($currentVal <= $actualNextVal) {
                            $pos = count($finalDashValArray);
                            $finalDashValArray[$pos] = $currentVal;
                            $currentVal ++;
                        }
                    }
                }
                
                foreach ($daysArray as $day) {
                    unset($commaValArray[$day]);
                }
                
                $finalCommaValArray = $commaValArray;
            } else if (false === $dashPos && false !== $commaPos) {
                
                $commaValArray = explode(',', $adminDays);
                $finalCommaValArray = $commaValArray;
            } else if (false !== $dashPos && false === $commaPos) {
                
                $dashValArray = explode('-', $adminDays);
                
                $actualNextVal = (int) $dashValArray[1];
                $currentVal = (int) $dashValArray[0];
                
                while ($currentVal <= $actualNextVal) {
                    $pos = count($finalDashValArray);
                    $finalDashValArray[$pos] = $currentVal;
                    $currentVal ++;
                }
            } else {
                $finalCommaValArray[0] = $adminDays;
            }
            
            if (count($finalCommaValArray) > 0 || count($finalDashValArray) > 0) {
                
                $daysArray = array_merge($finalCommaValArray, 
                        $finalDashValArray);
                $daysArray = array_unique($daysArray);
                sort($daysArray);
                
                $startDate = new DateTime($dateStarted);
                
                for ($index = 0; $index < count($daysArray); $index ++) {
                    
                    $daysDiff = 0;
                    
                    if ($index > 0) {
                        $daysDiff = ($daysArray[$index] - $daysArray[$index - 1]);
                    } else if ($daysArray[$index] > 1) {
                        $daysDiff = ($daysArray[$index]) - 1;
                    }
                    
                    date_add($startDate, new DateInterval('P' . $daysDiff . 'D'));
                    
                    $templateId = $this->_insertTemplate($template, 
                            $daysArray[$index], $startDate->format('Y-m-d'), 
                            $cycle, $patientId);
                    
                    if (empty($templateId)) {
                        return;
                    }
                    $query = "SELECT NEWID()";
					$GUID = $this->Patient->query($query);
					$GUID = $GUID[0][""];
                    $orderId = $this->_insertOrderStatus($formData, $therapy, $GUID, $infusionMap);
                    
                    if (! empty($infusionMap)) {
                        $this->_insertHydrations($therapy, $infusionMap, 
                                $templateId[0]['lookupid'], $orderId);
                    } else {
                        $this->_insertRegimens($therapy, 
                                $templateId[0]['lookupid'], $orderId);
                    }
                }
            }
        }
    }

    /**
     *
     * @param array $regimen            
     * @param string $templateId            
     * @param string $orderId            
     *
     * @todo Move into a model
     */
    private function _insertRegimens($regimen, $templateId, $orderId)
    {
        $data = new stdClass();
        $data->drugid = $regimen["drugid"];
        $data->Amt = $regimen["regdose"];
        $data->Units = $regimen["regdoseunit"];
        $data->Route = $regimen["route"];
        $data->Day = $regimen["adminDay"];
        $data->InfusionTime = $regimen["infusion"];
        $data->FluidVol = $regimen["flvol"];
        $data->FlowRate = $regimen["flowRate"];
        $data->Instructions = $regimen["instructions"];
        $data->Status = $regimen["Status"];
        $data->Sequence = $regimen["sequence"];
        $data->AdminTime = $regimen["adminTime"];
        $data->FluidType = $regimen["fluidType"];
        
        $regimens = array();
        $regimens[0] = new stdClass();
        $regimens[0]->data = $data;
        
        $lookup = new LookUp();
        $retVal = $lookup->saveRegimen($regimens, $templateId, $orderId);
        
        if ($this->checkForErrors('Insert Template Regimens Failed. ', $retVal)) {
            $this->Patient->rollbackTransaction();
            return;
        }
    }

    /**
     *
     * @param array $hydration            
     * @param array $infusionMap            
     * @param string $templateId            
     * @param string $orderId            
     *
     * @todo Move into a model
     */
    private function _insertHydrations($hydration, $infusionMap, $templateId, 
            $orderId)
    {
        $data = new stdClass();
        $data->drugid = $hydration["drug"];
        $data->description = $hydration["description"];
        $data->fluidVol = $hydration["fluidVol"];
        $data->flowRate = $hydration["flowRate"];
        $data->infusionTime = $hydration["infusionTime"];
        $data->adminDay = $hydration["adminDay"];
        $data->sequence = $hydration["Sequence"];
        $data->adminTime = $hydration["adminTime"];
        $data->infusions = $infusionMap[$hydration['id']];
        
        $hydrations = array();
        $hydrations[0] = new stdClass();
        $hydrations[0]->data = $data;
        
        $lookup = new LookUp();
        $retVal = $lookup->saveHydrations($hydrations, $hydration["type"], 
                $templateId, $orderId);
        
        if ($this->checkForErrors(
                'Insert ' . $hydration["type"] . ' Therapy Failed. ', $retVal)) {
            $this->Patient->rollbackTransaction();
            return;
        }
    }

    /**
     *
     * @param unknown_type $template            
     * @param unknown_type $adminDay            
     * @param unknown_type $adminDate            
     * @param unknown_type $cycle            
     * @param unknown_type $patientId            
     * @return void Ambigous multitype:string >
     */
    private function _insertTemplate($template, $adminDay, $adminDate, $cycle, $patientId)
    {
        $data = new stdClass();
        $data->Disease = $template['Disease'];
        $data->DiseaseStage = $template['DiseaseStage'];
        $data->CycleLength = $template['length'];
        $data->CycleLengthUnit = $template['CycleLengthUnitID'];
        $data->ELevel = $template['emoID'];
        $data->FNRisk = $template['fnRisk'];
        $data->PostMHInstructions = $template['postMHInstruct'];
        $data->PreMHInstructions = $template['preMHInstruct'];
        $data->RegimenInstruction = $template['regimenInstruction'];
        $data->CourseNumMax = $template['CourseNumMax'];
        $data->AdminDay = $adminDay;
        $data->AdminDate = $adminDate;
        $data->Cycle = $cycle;
        $data->PatientID = $patientId;
        
        $lookup = new LookUp();
        $templateId = $lookup->saveTemplate($data, $template['RegimenId']);
        
        if ($this->checkForErrors("Insert Master Template (in Patient Controller) Failed. (id=$templateId)", $templateId)){
            $this->Patient->rollbackTransaction();
            return;
        }
        
        return $templateId;
    }

    /**
     *
     * @param stdClass $formData            
     *
     * @todo Seems this method should really be inside a model
     * @todo Get Hydrations, Infusions, Regimens, etc, from a model not a view
     */
    private function createOEMRecords($formData)
    {
        $templateId = $formData->TemplateID;
        $lookup = new LookUp();
        $templates = $lookup->getTopLevelTemplateDataById($templateId, '');
        $template = $templates[0];
        
        $this->Hydrations('pre', $templateId);
        
        $preHydrations = $this->get('prehydrations');
        $preInfusionMap = $this->get('preinfusions');
        
        $this->Hydrations('post', $templateId);
        
        $postHydrations = $this->get('posthydrations');
        $postInfusionMap = $this->get('postinfusions');
        
        $this->Regimens($templateId);
        
        $regimens = $this->get('regimens');
        
        $dateStarted = $formData->DateStarted;
        $patientId = $formData->PatientID;
        
        for ($cycle = 1; $cycle <= $template['CourseNumMax']; $cycle ++) {
            
            if (! $this->checkForErrors('Failed to get prehydrations', 
                    $preHydrations) && ! empty($preHydrations)) {
                $this->_insertTherapyOrders($preHydrations, $preInfusionMap, 
                        $dateStarted, $template, $cycle, $patientId, $formData);
            }
            
            if (! $this->checkForErrors('Failed to get posthydrations', 
                    $postHydrations) && ! empty($postHydrations)) {
                $this->_insertTherapyOrders($postHydrations, $postInfusionMap, 
                        $dateStarted, $template, $cycle, $patientId, $formData);
            }
            
            if (! $this->checkForErrors('Failed to get regimens', $regimens) &&
                     ! empty($regimens)) {
                $this->_insertTherapyOrders($regimens, null, $dateStarted, 
                        $template, $cycle, $patientId, $formData);
            }
            
            $dateStarted = $this->_formatDate($dateStarted, 
                    $template["CycleLengthUnit"], $template["length"]);
        }
    }

    /**
     * Formats a date according to the given time frame
     *
     * @param string $date            
     * @param string $timeFrameUnit            
     * @param string $daysDiff            
     * @return string
     */
    private function _formatDate($date, $timeFrameUnit, $daysDiff)
    {
        $startDate = new DateTime($date);
        
        if ('Days' === $timeFrameUnit) {
            date_add($startDate, new DateInterval('P' . $daysDiff . 'D'));
        } else if ('Weeks' === $timeFrameUnit) {
            $daysDiff *= 7;
            date_add($startDate, new DateInterval('P' . $daysDiff . 'D'));
        } else if ('Months' === $timeFrameUnit) {
            date_add($startDate, new DateInterval('P' . $daysDiff . 'M'));
        } else if ('Years' === $timeFrameUnit) {
            date_add($startDate, new DateInterval('P' . $daysDiff . 'Y'));
        }
        return $startDate->format('Y-m-d');
    }

/**
 * $id = Patient GUID used in the Patient Assigned Templates Table
 *
 *  Get Template currently assigned to this patient
 *  Get the disease this patient has
 *  
 **/
	private function genOEMData($id) {
		$lookup = new LookUp();
		$templateId = $this->Patient->getTemplateIdByPatientID($id);
		if ($this->checkForErrors('Template ID not available in Patient_Assigned_Templates. ', $templateId)) {
			$this->set('masterRecord', null);
            // error_log("Template ID not available in Patient_Assigned_Templates - $templateId");
			return;
		}

		if (0 == count($templateId)) {
			$this->set('oemsaved', null);
			$this->set('oemrecords', null);
			$this->set('masterRecord', null);
			$this->set('frameworkErr', null);
            // error_log("No Records for  - $id");
            // error_log(json_encode($templateId));
			return;
		}

		$masterRecord = $this->Patient->getTopLevelPatientTemplateDataById($id, $templateId[0]['id']);
		if ($this->checkForErrors('Get Top Level Template Data Failed. ', $masterRecord)) {
			$this->set('masterRecord', null);
            // error_log("Get Top Level Template Data Failed. $masterRecord");
			return;
		}

		// Add Disease Info record for use in PrintOrders - MWB - 12/23/2013
		$lookup = new LookUp();
		$Disease = $lookup->selectByNameAndDesc('DiseaseType', $masterRecord[0]['Disease']);
		if ($this->checkForErrors('Get Disease Info Failed. ',  $Disease)) {
			$this->set('templatedata', null);
            // error_log("Get Disease Info Failed. $Disease");
			return;
		}
		$masterRecord[0]['DiseaseRecord'] = $Disease;
		$this->set('masterRecord', $masterRecord);




		$oemrecords = $this->Patient->getTopLevelOEMRecords($id, $templateId[0]['id']);
		if ($this->checkForErrors('Get Top Level OEM Data Failed. ', $oemrecords)) {
			$this->set('oemrecords', null);
            // error_log("Get Top Level OEM Data Failed. $oemrecords");
			return;
		}
		$this->set('oemrecords', $oemrecords);

		$oemMap = array();
		foreach ($oemrecords as $oemrecord) {
			$oemDetails = array();
            $oemRecordTemplateID = $oemrecord['TemplateID'];

            $retVal = $this->Hydrations('pre', $oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Pre Therapy Failed. ', $retVal)) {
				$this->set('oemrecords', null);
                // error_log("Get Pre Therapy Failed. - $retVal");
				return;
			}
			$oemDetails['PreTherapy'] = $this->get('prehydrations');
			$oemDetails['PreTherapyInfusions'] = $this->get('preorigInfusions');


			$retVal = $this->Hydrations('post', $oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Post Therapy Failed. ', $retVal)) {
				$this->set('oemrecords', null);
                // error_log("Get Post Therapy Failed. - $retVal");
				return;
			}
			$oemDetails['PostTherapy'] = $this->get('posthydrations');
			$oemDetails['PostTherapyInfusions'] = $this->get('postorigInfusions');

            $retVal = $this->Regimens($oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Therapy Failed. ', $retVal)) {
				$this->set('oemrecords', null);
                // error_log("Get Therapy Failed. - $retVal");
				return;
			}
			$oemDetails['Therapy'] = $this->get('regimens');
			$oemMap[$oemrecord['TemplateID']] = $oemDetails;
		}

		$this->set('oemMap', $oemMap);
		$this->set('oemsaved', null);
		$this->set('frameworkErr', null);
	}


    function getOEMData($PatientID) {
        $this->genOEMData($PatientID);
        $this->buildJsonObj4Output();
        return $this->get('jsonRecord');
    }


/*********************************************************/
function Therapy($regimens) {
    $Therapy = array();
    foreach ($regimens as $regimen) {
        $TherapyRecord = array();
        $status = $regimen["Status"] ? $regimen["Status"] : "";
        $reason = ("Test - Communication" !== $regimen["Reason"]) ? $regimen["Reason"] : "";
        $TherapyRecord["id"] = $regimen["id"];
        $TherapyRecord["Order_ID"] = $regimen["Order_ID"];
        $TherapyRecord["Order_Status"] = $regimen["Order_Status"];
        $TherapyRecord["Med"] = $regimen["drug"];
        $TherapyRecord["Dose"] = $regimen["regdose"];
        $TherapyRecord["MedID"] = $regimen["drugid"];
        $TherapyRecord["DoseUnits"] = $regimen["regdoseunit"];
        $TherapyRecord["AdminMethod"] = $regimen["route"];
        $TherapyRecord["FluidType"] = $regimen["fluidType"];
        $TherapyRecord["BSA_Dose"] = $regimen["bsaDose"];
        $TherapyRecord["FluidVol"] = $regimen["flvol"];
        $TherapyRecord["FlowRate"] = $regimen["flowRate"];
        $TherapyRecord["Instructions"] = $regimen["instructions"];
        $TherapyRecord["Status"] = $status;
        $TherapyRecord["Reason"] = $reason;
        $TherapyRecord["AdminTime"] = $regimen["adminTime"];
        $TherapyRecord["InfusionTime"] = $regimen["infusion"];
        $Therapy[] = $TherapyRecord;
    }
    return $Therapy;
}

function PrePostTherapy($hydrations, $infusions) {
	$HydrationArray = array();
    foreach ($hydrations as $hydration) {
        $HydrationRecord = array();
        $status = $hydration["Status"] ? $hydration["Status"] : "";

        $reason = "";
        if (isset($hydration["Reason"])) {
            $reason = ("Test - Communication" !== $hydration["Reason"]) ? $hydration["Reason"] : "";
        }

        $HydrationRecord["id"] = $hydration["id"];
        $HydrationRecord["Order_ID"] = $hydration["Order_ID"];
        $HydrationRecord["Order_Status"] = isset($hydration["Order_Status"]) ? $hydration["Order_Status"] : "";
        $HydrationRecord["Instructions"] = $hydration["description"];
        $HydrationRecord["Status"] = $status;
        $HydrationRecord["Reason"] = $reason;
        $HydrationRecord["Med"] = $hydration["drug"];
        $HydrationRecord["MedID"] = $hydration["drugid"];
        $HydrationRecord["AdminTime"] = $hydration["adminTime"];

        $myinfusions = $infusions[$hydration['id']];
        $numInfusions = count($myinfusions);

        if($numInfusions == 0){
            $HydrationRecord["Dose1"] = "";
            $HydrationRecord["DoseUnits1"] = "";
            $HydrationRecord["AdminMethod1"] = "";
            $HydrationRecord["BSA_Dose1"] = "";
            $HydrationRecord["FluidType1"] = "";
            $HydrationRecord["FluidVol1"] = "";
            $HydrationRecord["FlowRate1"] = "";
            $HydrationRecord["InfusionTime1"] = "";
            $HydrationRecord["Dose2"] = "";
            $HydrationRecord["DoseUnits2"] = "";
            $HydrationRecord["AdminMethod2"] = "";
            $HydrationRecord["BSA_Dose2"] = "";
            $HydrationRecord["FluidType2"] = "";
            $HydrationRecord["FluidVol2"] = "";
            $HydrationRecord["FlowRate2"] = "";
            $HydrationRecord["InfusionTime2"] = "";
        } else if ($numInfusions == 1) {
            $bsa_dose = null == $myinfusions[0]["bsaDose"] ? "" : $myinfusions[0]["bsaDose"];
            $HydrationRecord["Dose1"] = $myinfusions[0]["amt"];
            $HydrationRecord["DoseUnits1"] = $myinfusions[0]["unit"];
            $HydrationRecord["AdminMethod1"] = $myinfusions[0]["type"];
            $HydrationRecord["BSA_Dose1"] = $bsa_dose;
            $HydrationRecord["FluidType1"] = $myinfusions[0]["fluidType"];
            $HydrationRecord["FluidVol1"] = $myinfusions[0]["fluidVol"];
            $HydrationRecord["FlowRate1"] = $myinfusions[0]["flowRate"];
            $HydrationRecord["InfusionTime1"] = $myinfusions[0]["infusionTime"];
            $HydrationRecord["Dose2"] = "";
            $HydrationRecord["DoseUnits2"] = "";
            $HydrationRecord["AdminMethod2"] = "";
            $HydrationRecord["BSA_Dose2"] = "";
            $HydrationRecord["FluidType2"] = "";
            $HydrationRecord["FluidVol2"] = "";
            $HydrationRecord["FlowRate2"] = "";
            $HydrationRecord["InfusionTime2"] = "";
        } else {
            $infusionCount = 1;
            foreach ($myinfusions as $infusion) {
                $bsa_dose = null == $infusion["bsaDose"] ? "" : $infusion["bsaDose"];
                $HydrationRecord["Dose$infusionCount"] = $infusion["amt"];
                $HydrationRecord["DoseUnits$infusionCount"] = $infusion["unit"];
                $HydrationRecord["AdminMethod$infusionCount"] = $infusion["type"];
                $HydrationRecord["BSA_Dose$infusionCount"] = $bsa_dose;
                $HydrationRecord["FluidType$infusionCount"] = $infusion["fluidType"];
                $HydrationRecord["FluidVol$infusionCount"] = $infusion["fluidVol"];
                $HydrationRecord["FlowRate$infusionCount"] = $infusion["flowRate"];
                $HydrationRecord["InfusionTime$infusionCount"] = $infusion["infusionTime"];
                $infusionCount++;
            }
        }
        $HydrationArray[] = $HydrationRecord;
    }
    return $HydrationArray;
}


function CountAdminDaysPerCycle ($oemRecords) {
    // Perform REAL calculation of the # of Admin Days in a Given cycle.
    // Previously incorrect data pulled in the echo below:
    //    "\"AdminDaysPerCycle\":\"".$masterRecord[0]['length']."\", \"OEMRecords\":[";
    // the "length" is the # of <units> per cycle (where units is days, weeks, etc)
    // What's needed is the # of Admin Days per cycle (which can be anything from 1 up to the # of days in a cycle
    $AdminDaysPerCycle = 0;
    foreach ($oemRecords as $oemrecord) {
        if (1 == $oemrecord["CourseNum"]) {
            $AdminDaysPerCycle++;
        }
        else {
            break;
        }
    }
    return $AdminDaysPerCycle;
}

function buildJsonObj4Output() {
    $oemrecords = $this->get('oemrecords');
    $oemsaved = $this->get('oemsaved');
    $masterRecord = $this->get('masterRecord');
    $oemMap = $this->get('oemMap');

    $jsonRecord = array();
    if (!is_null($oemrecords) && is_null($oemsaved)) {
        $numeoemrecords = count($oemrecords);
        $numtemplates = count($masterRecord);
        
        if ($numeoemrecords) {
            $AdminDaysPerCycle = $this->CountAdminDaysPerCycle($oemrecords);
            $jsonRecord["success"] = true;
            $jsonRecord["total"] = $numtemplates;

            $preRecord = array();
            $preRecord["id"] = $masterRecord[0]["id"];
            $preRecord["FNRisk"] = $masterRecord[0]["fnRisk"];
            $preRecord["NeutropeniaRecommendation"] = "XX";
            $preRecord["ELevelID"] = $masterRecord[0]["emoID"];
            $preRecord["ELevelName"] = $masterRecord[0]["emoLevel"];
            $preRecord["ELevelRecommendationASCO"] = "XX";
            $preRecord["ELevelRecommendationNCCN"] = "XX";
            $preRecord["numCycles"] = $masterRecord[0]["CourseNumMax"];
            $preRecord["Goal"] = $masterRecord[0]["Goal"];
            $preRecord["ClinicalTrial"] = $masterRecord[0]["ClinicalTrial"];
            $preRecord["Status"] = $masterRecord[0]["Status"];
            $preRecord["PerformanceStatus"] = $masterRecord[0]["PerfStatus"];
            $preRecord["AdminDaysPerCycle"] = $AdminDaysPerCycle;

            $allRecords = array();
            foreach ($oemrecords as $oemrecord) {
                $oemDetails = $oemMap[$oemrecord['TemplateID']];
                $OneRecord = array();
                $OneRecord["id"] = $oemrecord["TemplateID"];
                $OneRecord["Cycle"] = $oemrecord["CourseNum"];
                $OneRecord["Day"] = $oemrecord["Day"];
                $OneRecord["AdminDate"] = $oemrecord["AdminDate"];
                $OneRecord["PreTherapyInstr"] = $oemrecord["PreTherapyInstr"];
                $OneRecord["TherapyInstr"] = $oemrecord["TherapyInstr"];
                $OneRecord["PostTherapyInstr"] = $oemrecord["PostTherapyInstr"];
                $OneRecord["PreTherapy"] = $this->PrePostTherapy($oemDetails["PreTherapy"], $oemDetails["PreTherapyInfusions"]);
                $OneRecord["Therapy"] = $this->Therapy($oemDetails["Therapy"]);
                $OneRecord["PostTherapy"] = $this->PrePostTherapy($oemDetails["PostTherapy"], $oemDetails["PostTherapyInfusions"]);
                $allRecords[] = $OneRecord;
            }
            $preRecord["OEMRecords"] = $allRecords;
            $jsonRecord["records"] = array($preRecord);
        } else {
            $jsonRecord["success"] = false;
            $jsonRecord["msg"] = "No records found.";
        }
    } else if(!is_null($oemsaved)){
            $jsonRecord["success"] = true;
            $jsonRecord["msg"] = "OEM Record updated.";
            $jsonRecord["records"] = array();
    } else {
            $jsonRecord["success"] = false;
            $jsonRecord["msg"] = "No records found.";
            $jsonRecord["frameworkErr"] = $frameworkErr;
    }
    $this->set('jsonRecord', $jsonRecord);
}
/********************************************************/




































    function OEM($id = null) {
        $form_data = json_decode(file_get_contents('php://input'));
        
        if ($id != NULL) {  // This assumes command is a GET, ignores PUT/DELETE
            if ("GET" == $_SERVER['REQUEST_METHOD']) {
                $this->genOEMData($id);
            }
        }
        else if ($form_data) {
            $this->Patient->beginTransaction();
            $this->set('oemrecords', null);

            $retVal = $this->Patient->updateOEMRecord($form_data);
            if (null != $retVal && array_key_exists('apperror', $retVal)) {
                $errorMsg = $retVal['apperror'];
                $this->set('frameworkErr', $errorMsg);
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                $jsonRecord = array();
                $jsonRecord["success"] = false;
                $jsonRecord["msg"] = "No records found.";
                $jsonRecord["frameworkErr"] = $frameworkErr;
                return;
            }
            if ($this->checkForErrors('Update OEM Record Failed. ', $retVal)) {
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                $jsonRecord = array();
                $jsonRecord["success"] = false;
                $jsonRecord["msg"] = "No records found.";
                $jsonRecord["frameworkErr"] = $frameworkErr;
                return;
            }
            
            if (! empty($form_data->Reason) && ! empty($form_data->Order_ID)) {
                if ($form_data->Reason == Workflow::REASON_CANCELLED) {
                    $this->Patient->updateOrderStatus($form_data->Order_ID, Orders::STATUS_CANCELLED);
                } else {
                    $workflow = new Workflow();
                    $workflow->OEMeditWorkflow($form_data);

                    // Update order status of this order if number of steps for
                    // the given reason is greater than 1
                    $workflows = $workflow->getWorkflowsByReasonNo($form_data->Reason);
                    if (! empty($workflows[0]['NoSteps']) && $workflows[0]['NoSteps'] > 1) {
                        $this->Patient->updateOrderStatus($form_data->Order_ID, Orders::STATUS_INCOORDINATION);
                    }

                    // Update order status for all instances of this drug for
                    // this patient if route is 'Oral'
                    $patientIds = $this->Patient->getPatientIdByOrderId($form_data->Order_ID);
                    if (! empty($form_data->InfusionMethod) && !empty($patientIds[0]['Patient_ID']) && $form_data->InfusionMethod == 'Oral') {
                        $this->Patient->updateOrderStatusByPatientIdAndDrugName($patientIds[0]['Patient_ID'], $form_data->Med, Orders::STATUS_INCOORDINATION);
                    }
                }
            }

            $this->Patient->endTransaction();
            
            $this->set('oemsaved', '');
            $this->set('frameworkErr', null);
        } else {
            $this->set('frameworkErr', 'No Template ID provided.');
        }

        $this->buildJsonObj4Output();
    }

    function Regimens($id = null)
    {
        $lookup = new LookUp();
        $regimens = $lookup->getRegimens($id);
        if (null != $regimens && array_key_exists('error', $regimens)) {
            return $regimens;
        }

        $this->set('regimens', $regimens);
    }

    function Vitals($id = null, $dateTaken = null)
    {
        $form_data = json_decode(file_get_contents('php://input'));
        
        if ($id != NULL) {
            
            $records = $this->Patient->getMeasurements_v1($id, $dateTaken);
            
            if ($this->checkForErrors('Get Patient Vitals Failed. ', $records)) {
                $this->set('jsonRecord', null);
                return;
            }
            
            $jsonRecord = array();
            
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
        } else if ($form_data) {
            
            $this->Patient->beginTransaction();
            
            $saveVitals = $this->Patient->saveVitals($form_data, null);
            
            if (null != $saveVitals && array_key_exists('apperror', $saveVitals)) {
                $errorMsg = $saveVitals['apperror'];
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $errorMsg;
                $this->set('jsonRecord', $jsonRecord);
                $this->set('frameworkErr', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            if ($this->checkForErrors('Save Patient Vitals Failed. ', 
                    $saveVitals)) {
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
            // $jsonRecord['records'] = $form_data->{'total'};
            
            $this->set('jsonRecord', $jsonRecord);
            $this->set('frameworkErr', null);
            $this->Patient->endTransaction();
        } else {
            $this->set('frameworkErr', 'No Patient ID provided.');
        }
    }


    function getVitals($PatientID = null, $dateTaken = null) {
        $this->Vitals($PatientID);
        // error_log("getVitals - ");
        // error_log(json_encode( $this->get('jsonRecord') ));
        return $this->get('jsonRecord');
    }

    function Allergies($patientId = null)
    {
        
        // $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        
        if ($patientId != NULL) {
            
            $records = $this->Patient->getAllergies($patientId);
            
            if ($this->checkForErrors('Get Patient Allergies Failed. ', 
                    $records)) {
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

    function Hydrations($type = null, $id = null)
    {
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
            
            for ($i = 0; $i < count($infusions); $i ++) {
                $myinfusion = array();
                $myinfusion['amt'] = $infusions[$i]['amt'];
                $myinfusion['unit'] = $infusions[$i]['unit'];
                $myinfusion['type'] = $infusions[$i]['type'];
                $myinfusion['flowRate'] = $infusions[$i]['flowRate'];
                $myinfusion['fluidVol'] = $infusions[$i]['fluidVol'];
                $myinfusion['fluidType'] = $infusions[$i]['fluidType'];
                $myinfusion['infusionTime'] = $infusions[$i]['infusionTime'];
                $myinfusion['Order_ID'] = $infusions[$i]['Order_ID'];
                if (isset($infusions[$i]['Order_Status'])) {
                    $myinfusion['Order_Status'] = $infusions[$i]['Order_Status'];
                }
                else {
                    $myinfusion['Order_Status'] = "";
                }
                $myinfusions[$i]->{'data'} = $myinfusion;
            }
            
            $infusionMap[$hydration['id']] = $myinfusions;
        }
        
        $this->set($type . 'hydrations', $hydrations);
        $this->set($type . 'infusions', $infusionMap);
        $this->set($type . 'origInfusions', $origInfusionMap);
    }
    
    // /sic's Code
    function OEM_AllOrdersToday()
    {
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
        
        // $templateIds = $this->Patient->getTemplateIds();
    }

    function OEM_PatientOrdersToday()
    {
        $jsonRecord = array();
        
        $records = $this->Patient->getOEMPatientOrdersToday($matchvalue);
        
        if ($this->checkForErrors('Get OEM Patient Records for Today Failed. ', 
                $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        
        $jsonRecord['success'] = true;
        $jsonRecord['total'] = count($records);
        
        $jsonRecord['records'] = $records;
        
        $this->set('jsonRecord', $jsonRecord);
        
        // $templateIds = $this->Patient->getTemplateIds();
    }

    function sendCPRSOrder()
    {
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
        
        // $templateIds = $this->Patient->getTemplateIds();
    }


/**
 * $id = Record ID in specific table
 * $type = Determines which table to update ("Pre", "Post", "Therapy")
 *         Pre uses Medication_Hydration Table and ID maps to 'MH_ID'
 *         Post uses Medication_Hydration Table and ID maps to 'MH_ID'
 *         Therapy uses Template_Regimen Table and ID maps to 'Patient_Regimen_ID'
 * $status = Status to set - "Hold", "Cancel", "Clear"
 **/
    function HoldCancel($id = null, $type = null, $status = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        if (!$id) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Missing Record ID for Hold";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        if ("Pre" === $type || "Post" === $type || "Therapy" === $type) {
            if ("Hold" === $status || "Cancel" === $status || "Clear" === $status || null === $status) {
                if (null === $status || "Clear" === $status) {
                    $status = "";
                }
                if ("PUT" == $_SERVER['REQUEST_METHOD']) {
                    $table = "Medication_Hydration";
                    $key = "MH_ID";
                    if ("Therapy" == $type) {
                        $table = "Template_Regimen";
                        $key = "Patient_Regimen_ID";
                    }
                    $query = "select * from $table where $key = '$id'";
                    $TreatmentData = $this->Patient->query($query);
                    $lookup = new LookUp();
                    $Order_Type = $type;
                    $TID = $TreatmentData[0]["Template_ID"];
                    $Drug_ID = $TreatmentData[0]["Drug_ID"];
                    $Drug_Name = $lookup->getLookupNameByIdAndType($Drug_ID, 2);
                    if(0 == count($TreatmentData)) {
                            $jsonRecord['success'] = 'false';
                            $jsonRecord['msg'] = "No Record Matches $id";
                    }
                    else {
                        if ($this->checkForErrors('Set Hold/Cancel Status FAILED ', $TreatmentData)) {
                            $jsonRecord['success'] = 'false';
                            $jsonRecord['msg'] = $frameworkErr;
                            $this->set('frameworkErr', null);
                        }
                        else {
                            $query = "update $table set Status = '$status' where $key = '$id'";
                            $retVal = $this->Patient->query($query);
                            if ($this->checkForErrors('Set Hold/Cancel Status FAILED ', $retVal)) {
                                $jsonRecord['success'] = 'false';
                                $jsonRecord['msg'] = $frameworkErr;
                                $this->set('frameworkErr', null);
                            }
                        }
                    }
                }
                else {
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = "Invalid COMMAND - " . $_SERVER['REQUEST_METHOD'] . " expected a PUT";
                }
            }
            else {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Invalid COMMAND - $status, expected a Hold/Cancel or Clear";
            }
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Invalid Therapy Type = $type expected Pre/Post/Therapy";
        }
        $this->set('jsonRecord', $jsonRecord);
    }

    function Amputations($patientID = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        if (!$patientID) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Missing Patient ID for saving Amputations";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }
        $data = file_get_contents('php://input');
        $form_data = json_decode($data);
        if (!$form_data) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "No information available to save Amputations";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $query = "delete from LookUp where Lookup_Type = 30 and Name = '$patientID'";
            $TreatmentData = $this->Patient->query($query);
            // error_log("Deleting old records");
            // error_log($query);
            // error_log(json_encode($TreatmentData));

            $Amputations = $form_data->Amputations;
            $this->Patient->beginTransaction();
            foreach ($Amputations As $Amputation) {
                $query = "insert into LookUp (Lookup_Type, Name, Description) values (30, '$patientID', '$Amputation')";
                $retVal = $this->Patient->query($query);
                if ($this->checkForErrors('Saving Amputation Record Failed. ', $retVal)) {
                    $jsonRecord['success'] = 'false';
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
            }
            $this->Patient->endTransaction();
            $jsonRecord['msg'] = count($Amputations) . " Amputation records saved";
            $this->set('jsonRecord', $jsonRecord);
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method for saving Amputations (expected a POST got a " . $_SERVER['REQUEST_METHOD'];
            $this->set('jsonRecord', $jsonRecord);
        }
    }
























/**
 * BSA Information
 * Can be a GET request passing a PatientID
 * or a POST request passing a PatientID and a form containing the following:
 *      { "WeightFormula" : "Something", "BSAFormula": "Method of", "UserName" : "Mike Barlow" }
 *
 *  Any existing BSA info for the patentID given will be set to inactive and the date of the change
 *  This allows us to track who changes the BSA info and when it is changed.
 *  Note that if doing a post any previously active BSA info is marked as inactive based on PatientID
 *  Uses "Patient_BSA" table
 *
 *  Sample Patient ID = 'FC7C048A-19C2-E111-A7F5-000C2935B86F'
 **/
    private function _getBSA($patientID) {
        $query = "select * from Patient_BSA where Patient_ID = '$patientID' AND Active = 1";
        return $this->Patient->query($query);
    }

    function BSA($patientID = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        if (!$patientID) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Missing Patient ID for getting/saving BSA Info";
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        $records = $this->_getBSA($patientID);
        if ($this->checkForErrors("Retrieving Patient BSA Info", $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $jsonRecord['success'] = true;
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $data = file_get_contents('php://input');
            $form_data = json_decode($data);
            if (!$form_data) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "No information available to save BSA Info";
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            $wt = $form_data->WeightFormula;
            $meth = $form_data->BSAFormula;
            $usr = $form_data->UserName;

            $this->Patient->beginTransaction();
            $query = "update Patient_BSA
                Set 
                Active = 0,
                Date_Changed = GETDATE(),
                UserName = '$usr'
                where Patient_ID = '$patientID' and Active = 1";
            $records = $this->Patient->query($query);
            if ($this->checkForErrors("Update Patient BSA Info", $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            $query = "INSERT INTO Patient_BSA
              (Patient_ID,WeightFormula,BSAFormula,Active,Date_Assigned,Date_Changed,UserName)
              VALUES ('$patientID', '$wt', '$meth', 1, GETDATE(), GETDATE(), '$usr')";
            $records = $this->Patient->query($query);
            if ($this->checkForErrors("Update Patient BSA Info", $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            $this->Patient->endTransaction();
            $this->set('jsonRecord', $jsonRecord);
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method for saving BSA Info (expected a POST got a " . $_SERVER['REQUEST_METHOD'];
            $this->set('jsonRecord', $jsonRecord);
        }
    }



/**
 * DischargeInstructions - This service call manages the Patient Discharge Instruction records
 * Each time a set of Discharge Instructions are generated for a particular patient a record is maintained consisting of the following:
 *  A Lookup Table (DischargeInfoLookup) containing
 *      Patient ID
 *      Template ID
 *      Date Discharge Instructions were generated.
 *      A Unique ID for this record which is used as a link into the DischargeInformation table which contains a separate record for each instruction saved in a single Discharge Instruction Form
 *
 * It makes use of the Patient Discharge Instructions Lookup to retrieve the Record ID, 
 * GET Call
 *
 * POST Call
 *
 * PUT Call
 *
 * DELETE Call
 *
 * Table Definition
 *
 *    
 *    USE [COMS_TEST_2]
 *    GO
 *    CREATE TABLE [dbo].[DischargeInstructionsLink](
 *        [DischargeID] [uniqueidentifier] NOT NULL,
 *        [PatientID] [uniqueidentifier] NOT NULL,
 *        [date] [date]  NOT NULL,
 *    ) ON [PRIMARY]
 *    GO
 *
 *
 *    USE [COMS_TEST_2]
 *    GO
 *    CREATE TABLE [dbo].[DischargeInstructions](
 *        [DischargeID] [uniqueidentifier] NOT NULL,
 *        [fieldName] [varchar](255) NOT NULL,
 *        [value] [varchar](255)
 *    ) ON [PRIMARY]
 *    GO
 *
 **/
 
    function DischargeInstructions($PatientID = null, $dischargeRecordID=null ) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $DischargeLinkTable = "DischargeInstructionsLink";
        $DischargeInfoTable = "DischargeInstructions";
        $GUID = "";
        $this->Patient->beginTransaction();
        $Date2 = date("F j, Y");

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($PatientID) {
                if ($dischargeRecordID) {
                    $query = "select 
                        di.fieldName as fieldName,
                        di.value as value,
                        CONVERT(varchar,dil.date,101) as date
                        from $DischargeInfoTable di
                        join $DischargeLinkTable dil on dil.DischargeID = di.DischargeID
                        where di.dischargeID = '$dischargeRecordID'";
                }
                else {
                    $query = "
                        SELECT DischargeID, PatientID, 
                        CONVERT(varchar,date,101) as date
<<<<<<< HEAD
                        FROM $DischargeLinkTable where PatientID = '$PatientID' order by date desc";
=======
                        FROM $DischargeLinkTable where PatientID = '$PatientID' order by date";
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
                }
            }
            error_log("DischargeInstructions Query - $query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $query = "SELECT NEWID()";
            $GUID = $this->Patient->query($query);
            $GUID = $GUID[0][""];

            $query = "
            INSERT INTO $DischargeLinkTable (
                DischargeID,
                PatientID, 
                Date
            ) VALUES (
                '$GUID',
                '$PatientID',
                '$Date2'
            )";
            $retVal = $this->Patient->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->Patient->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            else {
                foreach($_POST as $key => $value) {
                    if ("" !== $value) {
                        $value = $this->escapeString($value);
                        $query = "INSERT INTO $DischargeInfoTable (
                            DischargeID,
                            fieldName,
                            value
                        ) VALUES (
                            '$GUID',
                            '$key',
                            '$value'
                        )";
                        $retVal = $this->Patient->query($query);
                        if ($this->checkForErrors($ErrMsg, $retVal)) {
                            $this->Patient->rollbackTransaction();
                            $jsonRecord['success'] = false;
                            $jsonRecord['msg'] = $this->get('frameworkErr');
                            $this->set('jsonRecord', $jsonRecord);
                            return;
                        }
                    }
                }
            }
            $query = "";    /* Reset query so we don't run it again in the final step */
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $GUID = $dischargeRecordID;
            $query = "delete from $DischargeLinkTable WHERE DischargeID = '$dischargeRecordID'";
            $retVal = $this->Patient->query($query);
            $query = "
            INSERT INTO $DischargeLinkTable (
                DischargeID,
                PatientID, 
                Date
            ) VALUES (
                '$dischargeRecordID',
                '$PatientID',
                '$Date2'
            )";
            $retVal = $this->Patient->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->Patient->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            else {
                $query = "delete from $DischargeInfoTable where DischargeID = '$dischargeRecordID'";
                $retVal = $this->Patient->query($query);
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $this->Patient->rollbackTransaction();
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
                else {
                    parse_str(file_get_contents("php://input"),$post_vars);
                    foreach($post_vars as $key => $value) {
                        if ("" !== $value) {
                            $value = $this->escapeString($value);
                            $query = "INSERT INTO $DischargeInfoTable (
                                DischargeID,
                                fieldName,
                                value
                            ) VALUES (
                                '$GUID',
                                '$key',
                                '$value'
                            )";
                            $retVal = $this->Patient->query($query);
                            if ($this->checkForErrors($ErrMsg, $retVal)) {
                                $this->Patient->rollbackTransaction();
                                $jsonRecord['success'] = false;
                                $jsonRecord['msg'] = $this->get('frameworkErr');
                                $this->set('jsonRecord', $jsonRecord);
                                return;
                            }
                        }
                    }
                }
            }
            $query = "";    /* Reset query so we don't run it again in the final step */
            /* For the current DischargeInfoID delete all records in the DischargeInfoTable with that ID then add anew... */
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "";    /* Reset query so we don't run it again in the final step */
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for DischargeInstructions Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
            $this->Patient->rollbackTransaction();
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        if ("" !== $query) {
            $retVal = $this->Patient->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->Patient->rollbackTransaction();
            }
            else {
                $jsonRecord['success'] = 'true';

                if ("GET" == $_SERVER['REQUEST_METHOD'] && $dischargeRecordID) {
                    /* Get Patient Name for display on PrintOut */
                    $patInfoQuery = "SELECT 
                        PAT.PAT_ID, 
                        PAT.Patient_ID, 
                        lu1.Last_Name, 
                        lu1.First_Name
                        FROM Patient_Assigned_Templates PAT
                        JOIN Patient lu1 ON lu1.Patient_ID = PAT.Patient_ID
                        WHERE PAT.PAT_ID = '$PatientID'";

                    $patInfo = $this->Patient->query($patInfoQuery);
                    if ($this->checkForErrors($ErrMsg, $patInfo)) {
                        $jsonRecord['success'] = false;
                        $jsonRecord['msg'] = "Patient Information Unavailable - " . $this->get('frameworkErr');
                    }
                    else {
                        error_log("$patInfoQuery");
                        error_log("Patient Info - " . json_encode( $patInfo[0]["First_Name"] . " " . $patInfo[0]["Last_Name"] ));
                        /* Parse data into Proper Form Input structure */
                        if (count($retVal) > 0) {
                            $data = array();
                            $data["PatientName"] = $patInfo[0]["First_Name"] . " " . $patInfo[0]["Last_Name"];
                            $data["date"] = "";
                            foreach($retVal as $record) {
                                if ("" === $data["date"]) {
                                    $data["date"] = $record["date"];
                                }
                                $data[$record["fieldName"]] = $record["value"];
                            }
                             $jsonRecord["data"] = $data;
                             unset($jsonRecord['msg']);
                             $GUID = "";
                        }
                        else {
                            $jsonRecord['success'] = 'false';
                            $jsonRecord['errorMessage'] = 'No Records found';
                        }
                    }
                }
                else {
                    if (count($retVal) > 0) {
                        unset($jsonRecord['msg']);
                        $jsonRecord['total'] = count($retVal);
                        $jsonRecord['records'] = $retVal;
                    }
                }
            }
        }

        $this->Patient->endTransaction();
        if ("" !== $GUID) {
            $jsonRecord['dischargeInfoID'] = "$GUID";
        }
        $this->set('jsonRecord', $jsonRecord);
        return;
    }

<<<<<<< HEAD
/*********************** SEANS CODE ****************************
    function CumulativeDoseTracking($pid,$CDHID){
        
        $jsonRecord = array();
        
		if ($CDHID === NULL){
        $records = $this->Patient->selectCDH($pid);
        }else{
		$records = $this->Patient->selectCDHR($pid,$CDHID);
		}
		
        if ($this->checkForErrors('Get Patient CDH Failed. ', $records)) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

    function CumulativeDoseTrackingInsert($pid,$MedID,$CDAmts,$CDUnits){
        
        $jsonRecord = array();
        
        $records = $this->Patient->insertCDHR($pid,$MedID,$CDAmts,$CDUnits);
        
        if ($this->checkForErrors('Insert Patient CDH Failed. ', $records)) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }
    function CumulativeDoseTrackingUpdate($CDHID,$CDAmts,$CDUnits){
        
        $jsonRecord = array();
        
        $records = $this->Patient->updateCDHR($CDHID,$CDAmts,$CDUnits);
        
        if ($this->checkForErrors('Update Patient CDH Failed. ', $records)) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }
************************************/
/**
 * Cumulative Dose Tracking - This service call manages the Patient Cumulative Dose History records
 * Each time a Patient Cumulative Dose History ("cdhRecord") record is generated for a particular patient a record is maintained consisting of the following:
 * ...
 *
 * GET Call
 *
 * POST Call
 *
 * PUT Call
 *
 * DELETE Call
 *
 * Table Definition
 *
Initialize Lookup Table for Cumulative Dose Medications
Cumulative Dose Medications are stored in the Lookup Table with a Lookup_Type_ID = 60.
Note that Lookup_Types between 40 and 60 are used for other purposes than standard lookups.

INSERT INTO [COMS_TEST_2].[dbo].[LookUp]
           ([Lookup_Type],[Lookup_Type_ID],[Name],[Description])
     VALUES
           (0, 60, 'Cumulative Dosing Meds', 'Medication ID')


// 7/1/2014 - MWB - Cumulative Dose Tracking SQL Table
USE [COMS_TEST_2]
CREATE TABLE [dbo].[Patient_CumulativeDoseHistory](
      [ID] [uniqueidentifier] NOT NULL,
      [Patient_ID] [uniqueidentifier] NOT NULL,
      [MedID] [uniqueidentifier] NOT NULL,
      [CumulativeDoseAmt] [varchar](30) NOT NULL,
      [CumulativeDoseUnits] [varchar](30) NOT NULL,
      [Date_Changed] [datetime] DEFAULT (getdate()),
      [Author] [varchar](30) NULL
) ON [PRIMARY]



 INSERT INTO [COMS_TEST_2].[dbo].[Patient_CumulativeDoseHistory]
           (ID, Patient_ID, MedID, CumulativeDoseAmt, CumulativeDoseUnits, Author)
     VALUES
           ('B9D985FA-C493-46AC-A388-E42997AA2629', 'C4A968D0-06F3-E311-AC08-000C2935B86F', '7D95474E-A99F-E111-903E-000C2935B86F', 300, 'ml', 'Mike Barlow')


SAMPLE GET for testing
All records for patient:
http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking/C4A968D0-06F3-E311-AC08-000C2935B86F
Specific record for patient:
http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking/C4A968D0-06F3-E311-AC08-000C2935B86F/B9D985FA-C493-46AC-A388-E42997AA2629


SAMPLE POST for testing (Note: MedID is for 'ACYCLOVIR INJ'
URL: 
http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking/C4A968D0-06F3-E311-AC08-000C2935B86F
http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking
Content-Type:application/x-www-form-urlencoded; charset=UTF-8

Data:
    Medication=7D95474E-A99F-E111-903E-000C2935B86F

SAMPLE PUT for testing
URL: http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking/C4A968D0-06F3-E311-AC08-000C2935B86F/C4A968D0-06F3-E311-AC08-000C2935B86F
Content-Type:application/json
Data:
{
    "MedID":"C4A968D0-06F3-E311-AC08-000C2935B86F",
    "CumulativeDoseAmt" : "399",
    "CumulativeDoseUnits" : "MiliRoentgens",
    "Author" : "Someone"
}
 *
 **/
 
    function CumulativeDoseTracking($PatientID = null, $cdhRecordID=null ) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";

        $DataTable = "Patient_CumulativeDoseHistory";
        $GUID = "";
        $this->Patient->beginTransaction();
        $Date2 = date("F j, Y");
        parse_str(file_get_contents("php://input"),$post_vars);
        if (isset($post_vars["value"])) {
            $MedID = $post_vars["value"];
        }
        if (isset($post_vars["LifetimeDose"])) {
            $CumulativeDoseAmt = $post_vars["LifetimeDose"];
        }
        if (isset($post_vars["Units"])) {
            $CumulativeDoseUnits = $post_vars["Units"];
        }
        if (isset($post_vars["Source"])) {
            $Source = $post_vars["Source"];
        }

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
error_log("CumulativeDoseTracking - GET");
            if ($PatientID) {
                $partialQuery = "SELECT 
                   dt.CumulativeDoseAmt, 
                   dt.CumulativeDoseUnits, 
                   dt.Source,
                   dt.MedID,
                   dt.Author,
                   lu1.Name as MedName,
                   lu2.Name as Units,
                   CONVERT(varchar,dt.Date_Changed,101) as Date_Changed
                   from Patient_CumulativeDoseHistory dt
                   join LookUp lu1 on lu1.Lookup_ID = dt.MedID
                   join LookUp lu2 on lu2.Lookup_ID = dt.CumulativeDoseUnits
                   where Patient_ID = '$PatientID'";
                if ($cdhRecordID) {
                    $query = $partialQuery . " and dt.ID = '$cdhRecordID' order by Name asc";
                }
                else {
                    $query =  $partialQuery;
                }
            }
            error_log("CumulativeDoseTracking Query - $query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
error_log("CumulativeDoseTracking - POST");
/*********************************************************************************
            Sample POST
            URL: http://coms-mwb.dbitpro.com:355/Patient/CumulativeDoseTracking/C4A968D0-06F3-E311-AC08-000C2935B86F
            MEthod: POST
            Headers: Content-Type:application/x-www-form-urlencoded; charset=UTF-8
            Data: value=7A95474E-A99F-E111-903E-000C2935B86F&LifetimeDose=500&Units=32FC87C5-9C38-E111-9B9C-000C2935B86F&Source=Something

            Data Collection Method: parse_str(file_get_contents("php://input"),$post_vars);
            Field Access Method: $MedID = $post_vars["value"];
 *********************************************************************************/
            $GUID =  $this->Patient->newGUID();

            $query = "INSERT INTO $DataTable (ID, Patient_ID, MedID, CumulativeDoseAmt, CumulativeDoseUnits, Source)
            VALUES (
                '$GUID',
                '$PatientID',
                '$MedID',
                '$CumulativeDoseAmt',
                '$CumulativeDoseUnits',
                '$Source'
            )";

error_log($query);
            $retVal = $this->Patient->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->Patient->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            $query = "";    /* Reset query so we don't run it again in the final step */
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            /* Update table record */
            $query = "
                UPDATE $DataTable
                   SET 
                    MedID = '$MedID', 
                    CumulativeDoseAmt = '$CumulativeDoseAmt', 
                    CumulativeDoseUnits = '$CumulativeDoseUnits'
            ";
            if (isset($Source)) {
                $query .= ",Source = '$Source'";
            }
            $query .= " WHERE ID = '$cdhRecordID'";

            $retVal = $this->Patient->query($query);

            /* Check for errors */
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->Patient->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            $query = "";    /* Reset query so we don't run it again in the final step */
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from $DataTable WHERE ID = '$cdhRecordID'";
            $retVal = $this->Patient->query($query);

            /* Check for errors */
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $this->Patient->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            $query = "";    /* Reset query so we don't run it again in the final step */
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for CumulativeDoseTracking Service (expected a GET/POST/PUS/DELETE got a " . $_SERVER['REQUEST_METHOD'];
            $this->Patient->rollbackTransaction();
            $this->set('jsonRecord', $jsonRecord);
            return;
        }

        if ("" !== $query) {
            $retVal = $this->Patient->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->Patient->rollbackTransaction();
            }
            else {
                $jsonRecord['success'] = 'true';
                if (count($retVal) > 0) {
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
            }
        }
        $this->Patient->endTransaction();
        $this->set('jsonRecord', $jsonRecord);
        return;
    }
=======

>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
}
