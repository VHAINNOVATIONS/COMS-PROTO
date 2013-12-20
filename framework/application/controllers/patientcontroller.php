<?php
require_once "/ChromePhp.php";
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
                $modResults = array();
                
                // MWB - 5/14/2012 - There's only ever one element in the
                // results array returned from MDWS (why make it an array
                // then???)
                $result = $results[0];
                
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





	function PrintOrders($id) {
		$hasErrors = false;

		if ($id != NULL) {
			// Call the "selectByPatientId" function of the Patient model to retrieve all the basic Patient Info
			$patientData = $this->Patient->selectByPatientId($id);
			if ($this->checkForErrors('Get Patient Details Failed. ', $patientData)) {
				$this->set('templatedata', null);
				$hasErrors = true;
				return;
			}
			$this->set('PatientInfo', $patientData[0]);
			ChromePhp::log("PatientInfo");
			$temp = json_encode($patientData);
			ChromePhp::log($temp);



			$patientTemplate = $this->Patient->getPriorPatientTemplates($id);
			if ($this->checkForErrors('Get Patient Template Failed. ', $patientTemplate)) {
				return;
			}

			$this->set('patientTemplate', $patientTemplate);
			$this->set('frameworkErr', null);

			ChromePhp::log("patientTemplate");
			$temp = json_encode($patientTemplate);
			ChromePhp::log($temp);




			// Function is also used by the OEM controller function to retrieve all the current OEM Data
			$this->genOEMData($id);
/**
			$temp = json_encode($oemMap);
			ChromePhp::log("oemMap");
			ChromePhp::log($temp);

			$temp = json_encode($oemrecords);
			ChromePhp::log("oemrecords");
			ChromePhp::log($temp);
**/
			$PatientDetails = $this->Patient->getPatientDetailInfo($id);
			if ($this->checkForErrors('Get Patient Details Failed. ', $PatientDetails)) {
				$this->set('templatedata', null);
				$hasErrors = true;
				ChromePhp::log("Get Patient Details FAILED");
				return;
			}

			if (!empty($PatientDetails[0])) {
				$detail = $this->TreatmentStatus($PatientDetails[0]);
				if ($detail["TreatmentStatus"] == 'Ended') {
					$detail = null;
				}
				$patientDetailMap[$id] = $detail;
			} 
			else {
				$patientDetailMap[$id] = $PatientDetails;
			}
			$this->set('PatientDetailMap', $patientDetailMap);
			$temp = json_encode($patientDetailMap);
			ChromePhp::log("PatientDetailMap");
			ChromePhp::log($temp);
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
        // if($id == NULL){
        $retVal = $this->Patient->selectAll();
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
                $amputations = $lookup->getLookupDescByNameAndType(
                        $patient['ID'], '30');
                if ($this->checkForErrors('Get Patient Amputations Failed. ', 
                        $amputations)) {
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
                
                if ($this->checkForErrors('Get Patient Details Failed. ', 
                        $retVal)) {
                    $this->set('templatedata', null);
                    return;
                }
                
                $details = $retVal;
                if (!empty($details[0])) {
                    $detail = $this->TreatmentStatus($details[0]);
                    if ($detail["TreatmentStatus"] == 'Ended') {
                        $detail = null;
                    }
                    $patientDetailMap[$patient['ID']] = $detail;
                } else {
                    $patientDetailMap[$patient['ID']] = $details;
                }
            }
        }
        
        $this->set('patients', $modPatients);
        $this->set('templatedetails', $patientDetailMap);
        
        // }else {
        // $this->set('patients',null);
        // $this->set('frameworkErr', 'Unrecognized Parameter passed.');
        // }
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
        $templateId = $formData->TemplateId;
        $patientid = $formData->PatientId;
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
    private function _insertTemplate($template, $adminDay, $adminDate, $cycle, 
            $patientId)
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
        
        if ($this->checkForErrors('Insert Master Template Failed. ', 
                $templateId)) {
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
        $templateId = $formData->TemplateId;
        $lookup = new LookUp();
        $templates = $lookup->getTopLevelTemplateDataById($templateId);
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
        $patientId = $formData->PatientId;
        
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
 * $id = Patient GUID
 **/
	private function genOEMData($id) {
		$lookup = new LookUp();
		$templateId = $this->Patient->getTemplateIdByPatientID($id);
		if ($this->checkForErrors('Template ID not available in Patient_Assigned_Templates. ', $templateId)) {
			$this->set('masterRecord', null);
			ChromePhp::log("genOEMData() - Template ID not available for Patient.");
			return;
		}

		$temp = json_encode($templateId);
		ChromePhp::log("Template ID " . $temp);

		if (0 == count($templateId)) {
			$this->set('oemsaved', null);
			$this->set('oemrecords', null);
			$this->set('masterRecord', null);
			$this->set('frameworkErr', null);
			ChromePhp::log("No Records in Template");
			return;
		}

		$masterRecord = $this->Patient->getTopLevelPatientTemplateDataById($id, $templateId[0]['id']);
		if ($this->checkForErrors('Get Top Level Template Data Failed. ', $masterRecord)) {
			$this->set('masterRecord', null);
			ChromePhp::log("Master Record not set");
			return;
		}
		$this->set('masterRecord', $masterRecord);


		$oemrecords = $this->Patient->getTopLevelOEMRecords($id, $templateId[0]['id']);
		if ($this->checkForErrors('Get Top Level OEM Data Failed. ', $oemrecords)) {
			$this->set('oemrecords', null);
			return;
		}
		$this->set('oemrecords', $oemrecords);

//		$temp = json_encode($oemrecords);
//		ChromePhp::log("OEM Records (during generation) ");
//		ChromePhp::log($temp);

		$oemMap = array();
		foreach ($oemrecords as $oemrecord) {
			$oemDetails = array();
			$retVal = $this->Hydrations('pre', $oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Pre Therapy Failed. ', $retVal)) {
				ChromePhp::log('Get Pre Therapy Failed. ');
				$this->set('oemrecords', null);
				return;
			}
			$oemDetails['PreTherapy'] = $this->get('prehydrations');
			$oemDetails['PreTherapyInfusions'] = $this->get('preorigInfusions');
			$retVal = $this->Hydrations('post', $oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Post Therapy Failed. ', $retVal)) {
				ChromePhp::log('Get Post Therapy Failed. ');
				$this->set('oemrecords', null);
				return;
			}
			$oemDetails['PostTherapy'] = $this->get('posthydrations');
			$oemDetails['PostTherapyInfusions'] = $this->get('postorigInfusions');
			$retVal = $this->Regimens($oemrecord['TemplateID']);
			if ($this->checkForErrors('Get Therapy Failed. ', $retVal)) {
				ChromePhp::log('Get Therapy Failed. ');
				$this->set('oemrecords', null);
				return;
			}
			$oemDetails['Therapy'] = $this->get('regimens');
			$oemMap[$oemrecord['TemplateID']] = $oemDetails;
		}

		$this->set('oemMap', $oemMap);
		$this->set('oemsaved', null);
		$this->set('frameworkErr', null);
	}


    function OEM($id = null)
    {
        $form_data = json_decode(file_get_contents('php://input'));
        
        if ($id != NULL) {
			$this->genOEMData($id);
        }
		else if ($form_data) {
            
            $this->Patient->beginTransaction();
            
            $retVal = $this->Patient->updateOEMRecord($form_data);
            // this works
            // $this->Patient->CreateOrderStatus($form_data);
            // $this->Patient->OEMupdateOrderStatus($form_data);
            
            $this->set('oemrecords', null);
            
            if (null != $retVal && array_key_exists('apperror', $retVal)) {
                $errorMsg = $retVal['apperror'];
                $this->set('frameworkErr', $errorMsg);
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            if ($this->checkForErrors('Update OEM Record Failed. ', $retVal)) {
                $this->set('oemsaved', null);
                $this->Patient->rollbackTransaction();
                return;
            }
            
            if (! empty($form_data->Reason) && ! empty($form_data->Order_ID)) {
                
                if ($form_data->Reason == Workflow::REASON_CANCELLED) {
                    $this->Patient->updateOrderStatus($form_data->Order_ID, 
                            Orders::STATUS_CANCELLED);
                } else {
                    
                    $workflow = new Workflow();
                    $workflow->OEMeditWorkflow($form_data);
                    
                    // Update order status of this order if number of steps for
                    // the given reason is greater than 1
                    $workflows = $workflow->getWorkflowsByReasonNo(
                            $form_data->Reason);
                    if (! empty($workflows[0]['NoSteps']) &&
                             $workflows[0]['NoSteps'] > 1) {
                        $this->Patient->updateOrderStatus($form_data->Order_ID, 
                                Orders::STATUS_INCOORDINATION);
                    }
                    
                    // Update order status for all instances of this drug for
                    // this patient if route is 'Oral'
                    $patientIds = $this->Patient->getPatientIdByOrderId(
                            $form_data->Order_ID);
                    if (! empty($form_data->InfusionMethod) &&
                             ! empty($patientIds[0]['Patient_ID']) &&
                             $form_data->InfusionMethod == 'Oral') {
                        $this->Patient->updateOrderStatusByPatientIdAndDrugName(
                                $patientIds[0]['Patient_ID'], $form_data->Med, 
                                Orders::STATUS_INCOORDINATION);
                    }
                }
            }
            
            $this->Patient->endTransaction();
            
            $this->set('oemsaved', '');
            $this->set('frameworkErr', null);
        } else {
            $this->set('frameworkErr', 'No Template ID provided.');
        }
    }

    function Regimens($id = null)
    {
        $lookup = new LookUp();
        
        $regimens = $lookup->getRegimens($id);
        if (null != $regimens && array_key_exists('error', $regimens)) {
            return $regimens;
        }
        
        $this->set('regimens', $lookup->getRegimens($id));
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
}
