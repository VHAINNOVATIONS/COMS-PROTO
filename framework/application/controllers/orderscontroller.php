<?php

class OrdersController extends Controller {

    function checkForErrors($errorMsg, $retVal) {

        if (null != $retVal && array_key_exists('error', $retVal)) {

            if (DB_TYPE == 'sqlsrv') {
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
                }
            } else if (DB_TYPE == 'mysql') {
                $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

            return true;
        }

        return false;
    }


   function grabOrders() {

        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        
        if ($form_data != NULL) {

            $this->Orders->beginTransaction();

            $returnVal = $this->Orders->updateOrderStatus($form_data);

            if ($this->checkForErrors('Update Order Status Values Failed. ', $returnVal)) {
                $this->Orders->rollbackTransaction();
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            $this->Orders->endTransaction();

            $jsonRecord['success'] = 'true';
            $jsonRecord['msg'] = 'Order Status Updated Succesfully';
            $this->set('jsonRecord', $jsonRecord);
            
        } else {
            $finalOrders = array();
            $patientTemplates = $this->Orders->getPatientsWithActiveTemplates();

            if ($this->checkForErrors('Get Patient Templates Failed. ', $patientTemplates)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }


            /*
             * The following is how to instantiate the PatientController class. Doing this allows access
             * to the functions in the PatientController. The downside is the framework in place expects
             * that every call to a controller function should map to a view. So what you get is the echo
             * in /views/patient/OEM.php rendered on the browser rather than returned to the caller. 
             * I guess this is the whole point of using an MVC framework. I don't think controller's should
             * be talking directly to each other. The controller is used to consolidate business logic and 
             * send the results back to be displayed. 
             *
             * $controller = 'PatientController';
             * $patientController = new $controller('Patient', 'patient', 'OEM');
             * $oemrecords = $patientController->OEM($patient['patientID']);
             * 
             */

            $controller = 'PatientController';
            $patientController = new $controller('Patient', 'patient', null);
            $patientModel = new Patient();
            $modOemRecords = array();


            foreach ($patientTemplates as $patient) {
                //$oemrecords = $patientModel->getTopLevelOEMRecords($patient['patientID'],$patient['templateID']);
                $oemrecords = $patientModel->getTopLevelOEMRecordsNextThreeDays($patient['patientID'], $patient['templateID']);
				

                if ($this->checkForErrors('Get Top Level OEM Data Failed. ', $oemrecords)) {
                    $jsonRecord['success'] = 'false';
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                    return;
                }
				
				$Last_Name = $this->Orders->LookupPatientName($patient['patientID']);
						if(!empty($Last_Name) && count($Last_Name) > 0){
                            //$patient['Last_Name'] = $Last_Name['Last_Name'];
                            $patient['Last_Name'] = $Last_Name;
							//var_dump($Last_Name);
                        }else{
                            $patient['Last_Name'] = '';
                        }
						
                foreach ($oemrecords as $oemrecord) {

                    /*
                     * I am accessing functions within the patientcontroller that are helper functions.
                     * We really should move these shared functions out of this controller. Maybe 
                     * a shared controller. Or a library class with the shared functions.
                     *  
                     */
                    $retVal = $patientController->Hydrations('pre', $oemrecord['TemplateID']);

                    if ($this->checkForErrors('Get Pre Therapy Failed. ', $retVal)) {
                        $jsonRecord['success'] = 'false';
                        $jsonRecord['msg'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        return;
                    }

                    $preTherapys = $patientController->get('prehydrations');
                    $preTherapyDoseDetailsMap = $patientController->get('preorigInfusions');

                    $preTherapyCount = count($preTherapys);
                    $type = 'Pre Therapy';
					$typeOrder = 1;

                    $tmpOemRecord = $this->analyzeTherapys($preTherapyCount, $preTherapys, $type, $typeOrder, $patient, $oemrecord, $preTherapyDoseDetailsMap);

                    $modOemRecords = array_merge($modOemRecords, $tmpOemRecord);

                    $retVal = $patientController->Hydrations('post', $oemrecord['TemplateID']);

                    if ($this->checkForErrors('Get Post Therapy Failed. ', $retVal)) {
                        $jsonRecord['success'] = 'false';
                        $jsonRecord['msg'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        return;
                    }

                    $postTherapys = $patientController->get('posthydrations');
                    $postTherapyDoseDetailsMap = $patientController->get('postorigInfusions');
                    $postTherapyCount = count($postTherapys);
                    $type = 'Post Therapy';
					$typeOrder = 3;

                    $tmpOemRecord = $this->analyzeTherapys($postTherapyCount, $postTherapys, $type, $typeOrder, $patient, $oemrecord, $postTherapyDoseDetailsMap);
                    $modOemRecords = array_merge($modOemRecords, $tmpOemRecord);

                    $retVal = $patientController->Regimens($oemrecord['TemplateID']);

                    if ($this->checkForErrors('Get Therapy Failed. ', $retVal)) {
                        $jsonRecord['success'] = 'false';
                        $jsonRecord['msg'] = $this->get('frameworkErr');
                        $this->set('jsonRecord', $jsonRecord);
                        return;
                    }

                    $regimens = $patientController->get('regimens');
                    $regimenCount = count($regimens);
                    $type = 'Therapy';
					$typeOrder = 2;

                    $tmpOemRecord = $this->analyzeTherapys($regimenCount, $regimens, $type, $typeOrder, $patient, $oemrecord);

                    $modOemRecords = array_merge($modOemRecords, $tmpOemRecord);

                    
                    $finalOrders = array(); // This should not be redefined here - it is throwing out the work of the previous iteration
                    
                    foreach ($modOemRecords as $orderRecord) {
                        $templateId = $orderRecord['templateID'];
                        $drug =  $orderRecord['drug'];
						$PID = $patient['patientID'];
						$Order_ID = $orderRecord['Order_ID'];
						
						//var_dump($orderRecord);

                        $orderStatus = $this->Orders->getOrderStatus($Order_ID);
						//var_dump($orderStatus);
						$orderid = $this->Orders->getOrderStatus($Order_ID);
                        if(!empty($orderStatus) && count($orderStatus) > 0){
                            $orderRecord['orderstatus'] = $orderStatus[0]['orderStatus'];
                            $orderRecord['orderid'] = $orderid[0]['orderid'];
                        }else{
                            $orderRecord['orderstatus'] = 'Not Set';
                            $orderRecord['orderid'] = '';
                        }
                        //var_dump($orderRecord);
                        array_push($finalOrders, $orderRecord);

                    }
                }
            }

            $jsonRecord['success'] = true;
            $jsonRecord['total'] = count($finalOrders);
            $jsonRecord['records'] = $finalOrders;
            $this->set('jsonRecord', $jsonRecord);
        }
   }
   
   function Orders() {
	   $this->grabOrders();
    }

   function OrdersHold($TID,$Drug_Name, $Order_Type, $PID) {
	   $this->updateOrderStatusHold($TID,$Drug_Name, $Order_Type, $PID);
    }	
	
   function OrdersCancelled($TID,$Drug_Name, $Order_Type, $PID) {
	   $this->updateOrderStatusCancelled($TID,$Drug_Name, $Order_Type, $PID);
    }		
	
    private function analyzeTherapys($therapyCount, $therapys, $type, $typeOrder, $patient, $oemrecord, $therapyDoseDetailsMap = null) {

        $modtmpOemRecord = array();

        if ($therapyCount) {

            foreach ($therapys as $therapy) {

                if ('Therapy' === $type) {	

                    $tmpOemRecord = $this->createTherapyRow($patient, $oemrecord, $therapy, $type, $typeOrder);
                    array_push($modtmpOemRecord, $tmpOemRecord);
                } else {
                    $preThrapyDetails = $therapyDoseDetailsMap[$therapy['id']];
                    $detailsCount = count($preThrapyDetails);

                    if ($detailsCount) {
                        foreach ($preThrapyDetails as $detail) {
                            $tmpOemRecord = $this->createPrePostTherapyRow($patient, $oemrecord, $therapy, $type, $typeOrder, $detail);
                            array_push($modtmpOemRecord, $tmpOemRecord);
                        }
                    } else {
                        //$tmpOemRecord = $this->createBlankRow($patient, $oemrecord, $type);
                        //array_push($modtmpOemRecord, $tmpOemRecord);
                    }
                }
            }
        } else {
            //$tmpOemRecord = $this->createBlankRow($patient, $oemrecord, $type);
            //array_push($modtmpOemRecord, $tmpOemRecord);
        }


        return $modtmpOemRecord;
    }

    private function createTherapyRow($patient, $oemrecord, $therapy, $type, $typeOrder) {

        if (!empty($therapy['bsaDose'])) {
            list($bsaDose, $bsaUnit) = explode(' ', $therapy['bsaDose'], 2);
            $bsaUnit = str_replace(' ', null, $bsaUnit);
        } else {
            list($bsaDose, $bsaUnit) = array(null, null);
        }
	
        $tmpOemRecord = array();

        $tmpOemRecord['patientID'] = $patient['patientID'];
        $tmpOemRecord['Last_Name'] = $patient['Last_Name'];
        $tmpOemRecord['CourseNum'] = $oemrecord['CourseNum'];
        $tmpOemRecord['templateID'] = $patient['templateID'];
        $tmpOemRecord['adminDay'] = $oemrecord['Day'];
        $tmpOemRecord['adminDate'] = $oemrecord['AdminDate'];
        $tmpOemRecord['drug'] = $therapy['drug'];
        $tmpOemRecord['type'] = $type;
        $tmpOemRecord['typeOrder'] = $typeOrder;
        $tmpOemRecord['dose'] = (empty($bsaDose)) ? $therapy['regdose'] : $bsaDose;
        $tmpOemRecord['unit'] = (empty($bsaUnit)) ? $therapy['regdoseunit'] : $bsaUnit;
        $tmpOemRecord['route'] = $therapy['route'];
        $tmpOemRecord['fluidVol'] = $therapy['flvol'];
        $tmpOemRecord['flowRate'] = $therapy['flowRate'];
        $tmpOemRecord['instructions'] = $therapy['instructions'];
        $tmpOemRecord['Order_ID'] = $therapy['Order_ID'];

        return $tmpOemRecord;
    }

    private function createPrePostTherapyRow($patient, $oemrecord, $therapy, $type, $typeOrder, $detail) {

        $tmpOemRecord = array();

        $tmpOemRecord['patientID'] = $patient['patientID'];
        $tmpOemRecord['Last_Name'] = $patient['Last_Name'];
        $tmpOemRecord['CourseNum'] = $oemrecord['CourseNum'];
        $tmpOemRecord['templateID'] = $patient['templateID'];
        $tmpOemRecord['adminDay'] = $oemrecord['Day'];
        $tmpOemRecord['adminDate'] = $oemrecord['AdminDate'];
        $tmpOemRecord['drug'] = $therapy['drug'];
        $tmpOemRecord['type'] = $type;
        $tmpOemRecord['typeOrder'] = $typeOrder;
        $tmpOemRecord['dose'] = $detail['amt'];
        $tmpOemRecord['unit'] = $detail['unit'];
        $tmpOemRecord['route'] = $detail['type'];
        $tmpOemRecord['fluidVol'] = $detail['fluidVol'];
        $tmpOemRecord['flowRate'] = $detail['flowRate'];
        $tmpOemRecord['instructions'] = $therapy['description'];
        $tmpOemRecord['Order_ID'] = $therapy['Order_ID'];

        return $tmpOemRecord;
    }

    private function createBlankRow($patient, $oemrecord, $type, $typeOrder) {

        $tmpOemRecord = array();

        $tmpOemRecord['patientID'] = $patient['patientID'];
        $tmpOemRecord['Last_Name'] = $patient['Last_Name'];
        $tmpOemRecord['CourseNum'] = $oemrecord['CourseNum'];
        $tmpOemRecord['templateID'] = $patient['templateID'];
        $tmpOemRecord['adminDay'] = $oemrecord['Day'];
        $tmpOemRecord['adminDate'] = $oemrecord['AdminDate'];
        $tmpOemRecord['drug'] = '';
        $tmpOemRecord['type'] = $type;
        $tmpOemRecord['typeOrder'] = $typeOrder;
        $tmpOemRecord['dose'] = '';
        $tmpOemRecord['unit'] = '';
        $tmpOemRecord['route'] = '';
        $tmpOemRecord['fluidVol'] = '';
        $tmpOemRecord['flowRate'] = '';
        $tmpOemRecord['instructions'] = '';
		$tmpOemRecord['Order_ID'] = $oemrecord['Order_ID'];

        return $tmpOemRecord;
    }

    function Drugs() {

        $jsonRecord = array();

        $records = $this->Orders->getDrugs();

        if ($this->checkForErrors('Get Drugs Failed. ', $records)) {
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

}

?>
