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

                    $details = $retVal;
                    foreach($details as $d) {
                        $detail = $this->TreatmentStatus($d);
                        if ($detail["TreatmentStatus"] != 'Ended') {
                            $patientDetailMap[$patient['ID']] = $detail;
                        }
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
    private function _insertOrderStatus($formData, $preHydrationRecord)
    {
        $templateId = $formData->TemplateID;
        $patientid = $formData->PatientID;
        $drugName = $preHydrationRecord['drug'];
        $orderType = (empty($preHydrationRecord['type'])) ? 'Therapy' : $preHydrationRecord['type'];
        $orderStatus = "Ordered";
        
        $query = "
            INSERT INTO Order_Status (
                Template_ID, 
                Order_Status, 
                Drug_Name, 
                Order_Type, 
                Patient_ID
            ) VALUES (
                '$templateId',
                '$orderStatus',
                '$drugName',
                '$orderType',
                '$patientid'
            )
        ";
        $this->Patient->query($query);
        
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
        }
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
                    
                    $orderId = $this->_insertOrderStatus($formData, $therapy);
                    
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
                $myinfusion['Order_Status'] = $infusions[$i]['Order_Status'];
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
            error_log("Deleting old records");
            error_log($query);
            error_log(json_encode($TreatmentData));

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
}
