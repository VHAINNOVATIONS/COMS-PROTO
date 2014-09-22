<?php

/**
 * 
 * @property Mymdws $Mymdws
 * @property MdwsBase $mdwsBase
 */
class MymdwsController extends Controller 
{

    private $_dfn;
    private $mdwsBase=null;
	private $NoVitalsMsg = "No Vitals available for this Patient";
	private $NoLabResultsMsg = "No Lab Results available for this Patient";
	private $NoAllergiesMsg = "No Allergies available for this Patient";	
	private $_noMedsMsg = "No Meds available for this Patient";	


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

	/**
	 * 
	 * @param array $detail
	 * @return array
	 * 
	 * @todo combine this with the TreatmentStatus method in Patient Controller - avoid duplication
	 */
	function TreatmentStatus($detail) {

		$startDate = new DateTime($detail['TreatmentStart']);
		$endDate = new DateTime($detail['TreatmentEnd']);
		$actualEndDate = (!empty($detail['TreatmentEndActual'])) ? new DateTime($detail['TreatmentEndActual']) : null;
		$today = new DateTime("now");

		if ((!empty($actualEndDate) && $today > $actualEndDate) || $today > $endDate) {
		    $status = "Ended";
		} else if($today < $startDate){
			$status = "Applied";
		} else {
                        $comsPatient = new Patient();
                        $admindate = $comsPatient->isAdminDate($detail['TemplateID'],$today->format('Y-m-d'));
                        
			if(count($admindate)>0){
				$status = "On-Going - Admin Day";
			}else{
				$status = "On-Going - Rest Day";
			}
		} 
		$detail['TreatmentStatus'] = $status;
		return $detail;
	}

    
    function Match($lastFour){
        $jsonRecord = array();

		$client = $this->MdwsSetup(true, $lastFour);	// MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
//		$client = $this->MdwsSetup($lastFour);



        if(null != $client && !is_array($client)){
            $comspatientModel = new Patient();
            $patient = $comspatientModel->getPatientIdByDFN($this->_dfn);
            if($this->checkForErrors('Get Patient Record by DFN Failed. ', $patient)){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
		        return $jsonRecord;
            }

            $patient = $comspatientModel->selectByPatientId($patient[0]['id']);
            
            if($this->checkForErrors('Get Patient Info Failed. ', $patient)){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
		        return $jsonRecord;
            }

            $patientTemplate = $comspatientModel->getTemplateIdByPatientID($patient[0]['id']);

            if($this->checkForErrors('Get Patient Template Failed. ', $patientTemplate)){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
		        return $jsonRecord;

            }else if(!empty($patientTemplate)){
                $details = $comspatientModel->getPatientDetailInfo($patient[0]['id']);
                if($this->checkForErrors('Get Patient Details Failed. ', $details)){
                    $jsonRecord['success'] = false;
                    $jsonRecord['message'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
			        return $jsonRecord;

                }

            }else{
				$details = array();
                $details[0]['TemplateID'] = '';
                $details[0]['TemplateName'] = '';
				$details[0]['TemplateDescription'] = '';
                $details[0]['TreatmentStart'] = '';
                $details[0]['TreatmentEnd'] = '';
                $details[0]['TreatmentStatus'] = ''; // Added from viewall; MWB 5/3/2012
                $details[0]['Goal'] = '';
                $details[0]['ClinicalTrial'] = '';
                $details[0]['WeightFormula'] = '';
                $details[0]['BSAFormula'] = '';
                $details[0]['PerformanceStatus'] = '';

            }

// MWB - 4/27/2012; The array_merge adds the details array as an object to the patient object
// Historical code on the front end requires the details data as elements of the patient object not a sub object.
//            $patient = array_merge($patient[0], $details);


            if ('' === $details[0]['TemplateID']) {
                $detail = $details[0];
            } else {
                $detail = $this->TreatmentStatus($details[0]);
                if ($detail['TreatmentStatus'] == "Ended") {
                    $detail = array();
                    $detail['TemplateID'] = '';
                    $detail['TemplateName'] = '';
                    $detail['TemplateDescription'] = '';
                    $detail['TreatmentStart'] = '';
                    $detail['TreatmentEnd'] = '';
                    $detail['TreatmentStatus'] = ''; // Added from viewall; MWB 5/3/2012
                    $detail['Goal'] = '';
                    $detail['ClinicalTrial'] = '';
                    $detail['WeightFormula'] = '';
                    $detail['BSAFormula'] = '';
                    $detail['PerformanceStatus'] = '';
                }
            }
            
            /*
             * KD - 5/7/12 - The array_merge was not working correctly in the previous incarnation because
             * the results array was being merged with the patients[0]. This was producing another array 
             * inside patients[0]. Correct solution is to merge details[0] with patients[0].
             */
            
            $patient[0] = array_merge($patient[0], $detail);
			
            $lookup = new LookUp();
            $amputations = $lookup->getLookupDescByNameAndType($patient[0]['id'], '30');
            if($this->checkForErrors('Get Patient Amputations Failed. ', $amputations)){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            $tmpAmputations = array();            
            foreach($amputations as $amputation){
                array_push($tmpAmputations,$amputation);
            }

            $patient[0]['Amputations'] = $tmpAmputations;
			

            /*
             * KD - 5/9/12 - New fields were added since the previous version referenced below
             *               $details[0]['Goal'] = '';
             *               $details[0]['ClinicalTrial'] = '';
             *               $details[0]['WeightFormula'] = '';
             *               $details[0]['BSAFormula'] = '';
             *               $details[0]['PerformanceStatus'] = '';
             *
             * 
             */
            
/************** MWB - My previous version of the code
				$details[0]['TreatmentStatus'] = $detail['TreatmentStatus'];
				$patient[0]['TemplateID'] = $details[0]['TemplateID'];
				$patient[0]['TemplateName'] = $details[0]['TemplateName'];
				$patient[0]['TemplateDescription'] = $details[0]['TemplateDescription'];
				$patient[0]['TreatmentStart'] = $details[0]['TreatmentStart'];
				$patient[0]['TreatmentEnd'] = $details[0]['TreatmentEnd'];
				$patient[0]['TreatmentStatus'] = $details[0]['TreatmentStatus'];

				// $patient[0]['DateTaken'] = $details[0]['DateTaken'];	<-- Not used in viewall, so not needed; MWB 5/3/2012
				$patient[0]['Amputee'] = false;	// MWB - 4/27/2012 This needs to be pulled from somewhere...


 ***********************/
/***			
				$patient[0]['TemplateID'] = 'TemplateID';
				$patient[0]['TemplateDescription'] = 'TemplateDescription';
				$patient[0]['TemplateName'] = 'TemplateName';
				$patient[0]['TreatmentStart'] = 'TreatmentStart';
				$patient[0]['DateTaken'] = 'DateTaken';
				$patient[0]['TreatmentEnd'] = 'TreatmentEnd';
				$patient[0]['Amputee'] = false;	// MWB - 4/27/2012 This needs to be pulled from somewhere...
****/

//echo "Merged Patient<br>";
//var_dump($patient);
//echo "<br>";

            $jsonRecord['success'] = true;
            $jsonRecord['total'] = '1';
            $jsonRecord['records'] = $patient;
        }else{
            $jsonRecord = $client;
        }

        $this->set('jsonRecord', $jsonRecord);

        return $jsonRecord;        
    }
    
    function Mega($type = null,$value = null){
        
        $jsonRecord = array();

        if (null != $type && null != $value) {

            /*
             * KD - 5/7/12 - Added conditional block so that a boolean is being passed into MdwsSetup instead of a string.
             */
            if ('DFN' === strtoupper($type)) {
                $client = $this->MdwsSetup(false, $value);
            } else if('SSN' === strtoupper($type)){
                $client = $this->MdwsSetup(true, $value);
            } else {
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = 'Incorrect Type specified. Please use /Mymdws/Mega/DFN/{DFN Number} or /Mymdws/Mega/SSN/{SSN Number}';
                $this->set('jsonRecord', $jsonRecord);
                $this->mdwsBase->MDWS_Disconnect($client);		// MWB - 10/31/2013 - Should always disconnect before returning
                return;
            }
            
            if (null != $client && !is_array($client)) {
				if ($_SESSION['COMSchk'] === 1){
				$username = get_current_user();
				$roles = $this->Mymdws->getRoleInfo($username);
				$client = $this->mdwsBase->MDWS_Setup($roles);
				}

				$allergiesJson = $this->Allergies($value,$client);
				$vitalsJson = $this->AllVitals($value,$client);
				$LabInfoJson = $this->LabInfoResults($value,$client);

				$GoodMsg = 'Mega call completed succesfully with: ';
				$GoodMsg .= $allergiesJson['message'] . '; ';
				$GoodMsg .= $vitalsJson['message'] . '; ';
				$GoodMsg .= $LabInfoJson['message'] . '; ';

				$jsonRecord = array();

				if(false === $allergiesJson['success']){
					$jsonRecord = $allergiesJson;
				}else if(false === $vitalsJson['success']){
					$jsonRecord = $vitalsJson;
				}else if(false === $LabInfoJson['success']){
					$jsonRecord = $LabInfoJson;
				}else {
					$jsonRecord['success'] = true;
					$jsonRecord['message'] = $GoodMsg;
					$jsonRecord['records'] = '';
				}

                $this->mdwsBase->MDWS_Disconnect($client);

            }else if(null != $client){
                $jsonRecord = $client;
            }
        }else{
            $jsonRecord['success'] = false;
            $jsonRecord['message'] = 'Incorrect URI specified. Please use /Mymdws/Mega/DFN/{DFN Number} or /Mymdws/Mega/SSN/{SSN Number}';
            $this->set('jsonRecord', $jsonRecord);
            return;
            //return $jsonRecord;
        }
        
        // var_dump($jsonRecord);
		// No Patients found with SSN matching s0000
		// MWB - 5/8/2012 - The fact that no Vitals/Labs/Allergies/Etc was found for a particular patient is not really an error, so return success : true and the status message.
		if (false === $jsonRecord['success']) {
			$m1 = "MDWS Msg: " . $this->NoVitalsMsg . "; ";
			$m2 = "MDWS Msg: " . $this->NoLabResultsMsg . "; ";
			$m3 = "MDWS Msg: " . $this->NoAllergiesMsg . "; ";
			if ( $m1 === $jsonRecord['message'] || $m2 === $jsonRecord['message'] || $m3 === $jsonRecord['message'] ) {
				$jsonRecord['success'] = true;
			}
		}
        $this->set('jsonRecord',$jsonRecord);
        
    }
    
    function MdwsSetup($isSSN,$value){
        $username = get_current_user();
        $jsonRecord = array();
        $roles = $this->Mymdws->getRoleInfo($username);

        if($this->checkForErrors('Get Role Info Failed. ', $roles)){
            $jsonRecord['success'] = false;
            $jsonRecord['message'] = $this->get('frameworkErr');
            return $jsonRecord;
        }
        
        if(null == $this->mdwsBase){
            $this->mdwsBase = new MdwsBase();
        }
        
        if(true === $isSSN){
		$records = $this->Mymdws->checkPatientCOMS($value);
		
		foreach ($records as $record) {
		$Match = $record['Match'];
		$name = "".$record['First_Name']." ".$record['Last_Name']."";
		$DFNcoms = $record['DFN'];
		$_SESSION['COMSchk'] = 1;
		}		
		
		if (trim($Match) === $value){
		$this->_dfn = $DFNcoms;
		
		return ($name);        
		
		}else{
			$client = $this->mdwsBase->MDWS_Setup($roles);

			if (null === $client) {
				$jsonRecord['success'] = false;
				$jsonRecord['message'] = $this->mdwsBase->MDWSCrashed(true);
				return $jsonRecord;
			}
            $mdwspatients = $this->MDWSMatchPatient($client, $value);
			///var_dump($mdwspatients);
		}
 
            if(null != $mdwspatients && 1 < $mdwspatients->count){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = 'More than 1 Patient with SSN matching '.$value;
                return $jsonRecord;
            }else if(null == $mdwspatients || 0 == $mdwspatients->count){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = 'No Patients found with SSN matching '.$value;
                return $jsonRecord;
            }

            $mdwspatient = $mdwspatients->patients->PatientTO;
            $this->_dfn = $mdwspatient->localPid;
        }

        $mdwspatient = $this->MDWSSelectPatientByDFN($client,$this->_dfn);            
        
        if(null === $mdwspatient){
            $jsonRecord['success'] = false;
            $jsonRecord['message'] = 'No Patients found with SSN matching '.$value;
            return $jsonRecord;
        }
        
        $comspatientModel = new Patient();
        
        $patient = $comspatientModel->getPatientIdByDFN($this->_dfn);
        
        if(null == $patient || empty($patient)){
            
            $this->Mymdws->beginTransaction();
            
			$query = "SELECT NEWID()";
			$GUID = $this->Mymdws->query($query);
			$GUID = $GUID[0][""];
			
            $retVal = $comspatientModel->addNewPatient($mdwspatient,$value,$GUID);

            if($this->checkForErrors('Add New Patient from MDWS Failed. ', $retVal)){
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->get('frameworkErr');
                $this->Mymdws->rollbackTransaction();
                
                return $jsonRecord;
            }
            
            $this->Mymdws->endTransaction();
        }
       
        return $client;
    }

    function LabInfoResults($lastFour,$existingClient=null){
        $jsonRecord = array();
        
        if(empty($existingClient)){
            $client = $this->MdwsSetup(true, $lastFour);	// MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
        }else{
            $client = $existingClient;
        }
        
	if (null != $client && !is_array($client)) {
            $startDate = '20000101';
            $endDate = new DateTime("now");
            
            $ChemHemRpts = $this->MDWSLabInfo($client, $startDate, $endDate->format('Ymd'));
            
            if (null !== $ChemHemRpts) {
                $patient = new Patient();
                $patientId = $patient->getPatientIdByDFN($this->_dfn);

                if($this->checkForErrors('Get Patient By DFN Failed. ', $patientId)){
                    $jsonRecord['success'] = false;
                    $jsonRecord['message'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
			        return $jsonRecord;
                }
                
                foreach ($ChemHemRpts as $rpt) {
                    
                    $LabInfo = new LabInfo($rpt);
                    
                    $results = $rpt->results;
                    
                    foreach($results as $result){
                        $LabInfo->AddEntry($result);
                    }

                    $this->Mymdws->beginTransaction();

                    $saveLabInfo = $patient->saveLabInfo($LabInfo,$patientId[0]['id']);
                    if($this->checkForErrors('Save Patient Lab Info Results Failed. ', $saveLabInfo)){
                        $jsonRecord['success'] = false;
                        $jsonRecord['message'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        $this->Mymdws->rollbackTransaction();
		                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
				        return $jsonRecord;

                    }

                    $this->Mymdws->endTransaction();                
                    
                }

                $jsonRecord['success'] = true;
                $jsonRecord['message'] = count($ChemHemRpts) . ' Lab Info Records Saved';		// MWB - 5/7/2012 - Added additional information to outgoing message
                $jsonRecord['records'] = '';

                //$mdwsBase->MDWs_ShowData( $dfn, $AllergiesArray->AllAllergies(), $patientId[0]['id']  );
            }	
            else {
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->mdwsBase->MDWSCrashed(true);
            }
                
        }else if(null != $client){
            $jsonRecord = $client;
        }
        
        $this->set('jsonRecord', $jsonRecord);

        if(empty($existingClient) && null != $client && !is_array($client)){
            $this->mdwsBase->MDWS_Disconnect($client);
        }
        
        return $jsonRecord;
        
    }
    
    function Allergies($lastFour,$existingClient=null){
        
        $jsonRecord = array();
        
        if(empty($existingClient)){
            $client = $this->MdwsSetup(true, $lastFour);	// MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
        }else{
            $client = $existingClient;
        }
        
        if (null != $client && !is_array($client)) {

            $Allergies = $this->MDWSAllergies($client);
            if (null !== $Allergies) {

					// MWB - 5/4/2012 - Added this check to return a valid JSON object if there are no allergies to store
				$flag = false;
				foreach ($Allergies as &$Allergy) {
					if ("Not Assessed" === $Allergy->{'allergenName'} || !isset($Allergy->{'allergenId'})) {
						$flag = true;
						$jsonRecord['success'] = true;
				        $jsonRecord['message'] = 'Allergies Not Assessed';
				        $jsonRecord['records'] = '';
						return $jsonRecord;
					}
				}


				
				
				$AllergiesArray = new AllergiesList();

                $patient = new Patient();
                $patientId = $patient->getPatientIdByDFN($this->_dfn);

                if($this->checkForErrors('Get Patient By DFN Failed. ', $patientId)){
                    $jsonRecord['success'] = false;
                    $jsonRecord['message'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
			        return $jsonRecord;
                }



                foreach ($Allergies as &$Allergy) {
                    $AllergiesArray->AddEntry($Allergy);

                    $this->Mymdws->beginTransaction();
                    $saveAllergies = $patient->saveAllergy($Allergy,$patientId[0]['id']);
                    if($this->checkForErrors('Save Patient Allergies Failed. ', $saveAllergies)){
                        $jsonRecord['success'] = false;
                        $jsonRecord['message'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        $this->Mymdws->rollbackTransaction();
                        // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
				        return $jsonRecord;
                    }
                    $this->Mymdws->endTransaction();                

                }

                $jsonRecord['success'] = true;
                $jsonRecord['message'] = count($Allergies) . ' Allergy Records Saved';		// MWB - 5/7/2012 - Added additional information to outgoing message
                $jsonRecord['records'] = '';

                //$mdwsBase->MDWs_ShowData( $dfn, $AllergiesArray->AllAllergies(), $patientId[0]['id']  );
            }	
            else {
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->mdwsBase->MDWSCrashed(true);
            }
                
        }else if(null != $client){
            $jsonRecord = $client;
        }
        
        $this->set('jsonRecord', $jsonRecord);

        if(empty($existingClient) && null != $client && !is_array($client)){
            $this->mdwsBase->MDWS_Disconnect($client);
        }
        
        return $jsonRecord;
    }
    
    function AllVitals($lastFour,$existingClient = null){
	
        $jsonRecord = array();
        
        if(empty($existingClient)){
            $client = $this->MdwsSetup(true, $lastFour);	// MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
        }else{
            $client = $existingClient;
        }
        
		if (null != $client && !is_array($client)) {
            $AllVitals = $this->MDWSAllVitals($client);
            if (null !== $AllVitals) {


/************* MWB - 10/31/2013 - Why are we saving data when all we're using this function for is to see if there IS any data??? **
                $COMSVitalsArray = array();
                $dspCOMS_Vitals = array();

                $index = 0;
                foreach ($AllVitals as &$Vital) {
                    $COMSVital = new COMS_Vital($Vital->timestamp);
                    foreach ($Vital->vitalSigns as &$aVital) {
                        foreach ($aVital as &$bVital) {
                            $COMSVital->AddEntry($bVital);
                        }
                    }
                    $COMSVitalsArray[] = $COMSVital;
                    $dspCOMS_Vitals[] = $COMSVital->getVitals();

                    $this->Mymdws->beginTransaction();

                    $patient = new Patient();
                    $patientId = $patient->getPatientIdByDFN($this->_dfn);

                    if ($this->checkForErrors('Get Patient By DFN Failed. ', $patientId)) {
                        $jsonRecord['success'] = false;
                        $jsonRecord['message'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
		                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
				        return $jsonRecord;

                    }

                    $saveVitals = $patient->saveVitals($dspCOMS_Vitals[$index], $patientId[0]['id']);
                    if ($this->checkForErrors('Save Patient Vitals Failed. ', $saveVitals)) {
                        $jsonRecord['success'] = false;
                        $jsonRecord['message'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        $this->Mymdws->rollbackTransaction();
		                // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
				        return $jsonRecord;
                    }

                    $this->Mymdws->endTransaction();

                    $index++;
                }
*****************/
                $jsonRecord['success'] = true;
//                $jsonRecord['message'] = count($AllVitals) . ' Vital Records Saved';		// MWB - 5/7/2012 - Added additional information to outgoing message
                $jsonRecord['message'] = count($AllVitals) . ' Vital Records Exist';		// MWB - 5/7/2012 - Added additional information to outgoing message
                $jsonRecord['records'] = '';

            } else {
                $jsonRecord['success'] = false;
                $jsonRecord['message'] = $this->mdwsBase->MDWSCrashed(true);
                $jsonRecord['records'] = '';
            }
        }else if(null != $client){
            $jsonRecord = $client;
        }


        $this->set('jsonRecord', $jsonRecord);
        
        if(empty($existingClient) && null != $client && !is_array($client)){
            $this->mdwsBase->MDWS_Disconnect($client);
        }
        
        return $jsonRecord;
    }
    
    function MDWSAllVitals($client) {
        
        if (null === $client) {
                return "";
        }
        $result = $client->getVitalSigns();
        $result = $this->mdwsBase->MDWsCrashReport($result->getVitalSignsResult, "getVitalSigns", false);
        if (null === $result) {
                return (null);
        }

        $count = $result->arrays->TaggedVitalSignSetArray->count;
        
        if($count>0){
            $tmpResult = $result->arrays->TaggedVitalSignSetArray->sets;

            if(isset($tmpResult->VitalSignSetTO) && !is_array($tmpResult->VitalSignSetTO)){
                return array('vitals'=>$tmpResult->VitalSignSetTO);
            }else if(isset($tmpResult->VitalSignSetTO)) {
                return $tmpResult->VitalSignSetTO;
            }
        }
        $_SESSION['MDWS_Msg'] = $this->NoVitalsMsg;
        return null;
        
    }
    
    function MDWSLabInfo($client,$startDate,$endDate){
        
	if (null === $client) {
		return "";
	}
	$result = $client->getChemHemReports(array('fromDate'=>$startDate,'toDate'=>$endDate,'nrpts'=>0));
        
	$result = $this->mdwsBase->MDWsCrashReport($result->getChemHemReportsResult, "getChemHemReports", false);
        
	if (null === $result) {
		return (null);
	}
        
        $count = $result->arrays->TaggedChemHemRptArray->count;
        
        if($count>0){
            $tmpResult = $result->arrays->TaggedChemHemRptArray->rpts;

            if(isset($tmpResult->ChemHemRpt) && !is_array($tmpResult->ChemHemRpt)){
                return array('rpts'=>$tmpResult->ChemHemRpt);
            }else if(isset($tmpResult->ChemHemRpt)) {
                return $tmpResult->ChemHemRpt;
            }
        }
        $_SESSION['MDWS_Msg'] = $this->NoLabResultsMsg;
        return null;
        
    }
    
    function MDWSAllergies($client){
        
		if (null === $client) {
			return "";
		}
		//sic
		//var_dump($client);	
		//$client = $this->mdwsBase->MDWS_Setup($roles);
		
		$result = $client->getAllergies();
		$result = $this->mdwsBase->MDWsCrashReport($result->getAllergiesResult, "getAllergies", false);
		if (null === $result) {
			return (null);
		}
        
        $count = $result->arrays->TaggedAllergyArray->count;
        if($count>0){
            
            $tmpResult = $result->arrays->TaggedAllergyArray->allergies;

            if(isset($tmpResult->AllergyTO) && !is_array($tmpResult->AllergyTO)){
                return array('allergies'=>$tmpResult->AllergyTO);
            }else if(isset($tmpResult->AllergyTO)) {
                return $tmpResult->AllergyTO;
            }
        }
        $_SESSION['MDWS_Msg'] = $this->NoAllergiesMsg;
        return null;
        
    }

    
    /**
     * 
     * @param SoapClient $client
     * @return array
     */
    private function _mdwsMeds($client)
    {
    
        if (empty($client)) {
            return null;
        }
        
        $result = $client->getAllMeds();
        $result = $this->mdwsBase->MDWsCrashReport($result->getAllMedsResult, "getAllMeds", false);
        if (empty($result)) {
            return null;
        }
    
        $count = $result->arrays->TaggedMedicationArray->count;
        if ($count > 0) {
    
            $meds = (!empty($result->arrays->TaggedMedicationArray->meds)) ? $result->arrays->TaggedMedicationArray->meds : array();
    
            return $meds;
        }
        $_SESSION['MDWS_Msg'] = $this->_noMedsMsg;
        return null;
    
    }
    
    function MDWSMatchPatient($client,$lastFour){

		if (null === $client) {
			return "";
		}
        
		// echo "Calling MATCH - <br>";
		// var_dump(array('target'=>$lastFour));
		// echo "<br>";
        
		///$records = $this->Mymdws->checkPatientCOMS($lastFour);
		///if ($records = $lastFour){
		
		///	$result = $records;
		///
		///		if (null === $result) {
		///			return (null);
		///		}
		
			//echo "result:".var_dump(array('target'=>$result))."<br>";	
			
		///	return ($records);
		///	echo "sql";
		///}else{
			
			$result = $client->match(array('target'=>$lastFour));
		
			///var_dump($result);
			// echo "<br>Returning from MATCH<br>";

			$result = $this->mdwsBase->MDWsCrashReport($result->matchResult,"match",false);
			
			if (null === $result) {
			return (null);
			}
			
			//echo "result:".var_dump(array('target'=>$result))."<br>";	
			return ($result->arrays->TaggedPatientArray);        
			///echo "mdws";
			///}   
    }
    
    function MDWSSelectPatientByDFN($client,$dfn){
        
		if (null === $client) {
			return "";
		}
        
        $result = $client->select(array('DFN'=>$dfn));
        $result = $this->mdwsBase->MDWsCrashReport($result->selectResult,"Select",false);
            
		if (null === $result) {
				return (null);
		}
			
		return $result;
        
    }
    
    
}