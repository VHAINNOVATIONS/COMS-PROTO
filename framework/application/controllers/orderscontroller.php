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




   function grabOrders($patientID, $AdminDate, $Dispensed = null) {

        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();
        
        if ($form_data != NULL) {

            $this->Orders->beginTransaction();
error_log("OrdersController.grabOrders.HasFormData - ");
error_log(json_encode($form_data));

            $returnVal = $this->Orders->updateOrderStatus($form_data);

            if ($this->checkForErrors('Update Order Status Values Failed. ', $returnVal)) {
                error_log("orders 1 - " . json_encode($returnVal));
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
            if ($patientID && $AdminDate) {

/***
                $query = "SELECT
       os.Order_Status as orderstatus
      ,os.Drug_Name as drug
      ,os.Order_Type as type
      ,os.Patient_ID as patientID
      ,os.Order_ID
      ,os.Drug_ID
      ,os.FlowRate
      ,os.Sequence
      ,CASE
          WHEN os.Amt = FLOOR(os.Amt ) THEN 
              CONVERT(nvarchar(max), CONVERT(decimal(10,0), os.Amt ))
          ELSE 
              CONVERT(nvarchar(max), CONVERT(decimal(10,1), os.Amt ))
      END as dose
      ,os.Unit as unit
      ,os.Route as route
      ,os.flvol
      ,os.infusion
      ,ndt.Order_ID as ndtOrder_ID
      ,CONVERT(varchar(10), os.Admin_Date, 101) as adminDate
      FROM Order_Status os 
      join ND_Treatment ndt on ndt.Order_ID = os.Order_ID
      where Patient_ID = '$patientID' and Admin_Date='$AdminDate'";
 ***/
      $query = "SELECT
       os.Order_Status as orderstatus
      ,os.Drug_Name as drug
      ,os.Order_Type as type
      ,os.Patient_ID as patientID
      ,os.Order_ID
      ,os.Drug_ID
      ,os.FlowRate
      ,os.Sequence
      ,CASE
          WHEN os.Amt = FLOOR(os.Amt ) THEN 
              CONVERT(nvarchar(max), CONVERT(decimal(10,0), os.Amt ))
          ELSE 
              CONVERT(nvarchar(max), CONVERT(decimal(10,1), os.Amt ))
      END as dose
      ,os.Unit as unit
      ,os.Route as route
      ,os.flvol
      ,os.FluidType
      ,os.infusion
      ,ISNULL(CONVERT(varchar(50),ndt.StartTime),'') as StartTime
      ,ISNULL(CONVERT(varchar(50),ndt.EndTime),'') as EndTime
      ,ISNULL(CONVERT(varchar(50),ndt.Comments),'') as Comments
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_User),'') as Treatment_User
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_Date),'') as Treatment_Date
      ,ISNULL(CONVERT(varchar(50),ndt.Dose),'') as ndDose
      ,CONVERT(varchar(10), os.Admin_Date, 101) as adminDate
      FROM Order_Status os 
      left join ND_Treatment ndt on ndt.Order_ID = os.Order_ID
      where os.Patient_ID = '$patientID' and os.Admin_Date='$AdminDate'";

                if ($Dispensed) {
                    $query = "
SELECT
CASE 
when os.Order_Status = 'Cancelled' or os.Order_Status = 'Administered' or os.Order_Status = 'Dispensed' THEN
os.Order_Status
Else
'Not Dispensed'
End as orderstatus
      ,os.Order_Status as ActualOrderStatus
      ,os.Drug_Name as drug
      ,os.Order_Type as type
      ,os.Patient_ID as patientID
      ,os.Order_ID
      ,os.Drug_ID
      ,os.FlowRate
      ,os.Sequence
      ,CASE
          WHEN os.Amt = FLOOR(os.Amt ) THEN 
              CONVERT(nvarchar(max), CONVERT(decimal(10,0), os.Amt ))
          ELSE 
              CONVERT(nvarchar(max), CONVERT(decimal(10,1), os.Amt ))
      END as dose
      ,os.Unit as unit
      ,os.Route as route
      ,os.flvol
      ,os.FluidType
      ,os.infusion
      ,ISNULL(CONVERT(varchar(50),ndt.StartTime),'') as StartTime
      ,ISNULL(CONVERT(varchar(50),ndt.EndTime),'') as EndTime
      ,ISNULL(CONVERT(varchar(50),ndt.Comments),'') as Comments
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_User),'') as Treatment_User
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_Date),'') as Treatment_Date
      ,ISNULL(CONVERT(varchar(50),ndt.Dose),'') as ndDose
      ,CONVERT(varchar(10), os.Admin_Date, 101) as adminDate
      FROM Order_Status os 
      left join ND_Treatment ndt on ndt.Order_ID = os.Order_ID
      where os.Patient_ID = '$patientID' and os.Admin_Date='$AdminDate'";

                }
error_log("Orders - $query");
                $TreatmentData = $this->Orders->query($query);
                if ($this->checkForErrors('Get Patient Templates Failed. ', $TreatmentData)) {
                    $jsonRecord['success'] = 'false';
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                    $this->set('jsonRecord', $jsonRecord);
                }
                else {
                    $retData = array();
                    foreach ($TreatmentData as $rec) {
                        $type = $rec["type"];
                        if ("Therapy" != $type) {
                            $type .= " Therapy";
                        }
                        $pid = $rec["patientID"];
                        $aDate = $rec["adminDate"];
                        $DrugName = $rec["drug"];
                        $query= "SELECT
       Drug
      ,Dose
      ,Unit
      ,Route
      ,StartTime
      ,EndTime
      ,Comments
      ,Treatment_User
      ,Treatment_Date
      ,Dose_OriginalValue
      ,PAT_ID
      ,Template_ID as templateID
      ,Patient_ID as patientID
      ,Drug_OriginalValue as drug_originalValue
      ,Unit_OriginalValue as unit_originalValue
      ,Route_OriginalValue as route_originalValue
      from ND_Treatment
      where Patient_ID = '$pid' and
      AdminDate = '$aDate' and
      Drug = '$DrugName' and
      Type = '$type'";
                        $tData = $this->Orders->query($query);
                        if ($this->checkForErrors('Get Patient Templates Failed. ', $tData)) {
                            $jsonRecord['success'] = 'false';
                            $jsonRecord['msg'] = $this->get('frameworkErr');
                            $this->set('jsonRecord', $jsonRecord);
                        }
                        else {
                            if (count($tData) > 0) {
                                $rec["StartTime"] = $this->SelectedTimeConvert($tData[0]["StartTime"]);
                                $rec["EndTime"] = $this->SelectedTimeConvert($tData[0]["EndTime"]);
                                $rec["Comments"] = $tData[0]["Comments"];
                                $rec["Treatment_User"] = $tData[0]["Treatment_User"];
                                $rec["Treatment_Date"] = $tData[0]["Treatment_Date"];
                                $rec["Dose_OriginalValue"] = $tData[0]["Dose_OriginalValue"];
                                $rec["PAT_ID"] = $tData[0]["PAT_ID"];
                                $rec["Template_ID"] = $tData[0]["Template_ID"];
                                $rec["Patient_ID"] = $tData[0]["Patient_ID"];
                                $rec["Drug_OriginalValue"] = $tData[0]["Drug_OriginalValue"];
                                $rec["Unit_OriginalValue"] = $tData[0]["Unit_OriginalValue"];
                                $rec["Route_OriginalValue"] = $tData[0]["Route_OriginalValue"];
                            }
                        }
                        $rec["dose"] = $this->numberFormater($rec["dose"]);
                        $rec["drug"] = $rec["Sequence"] . ". " . $rec["drug"];
                        $rec["typeOrder"] = 3;
                        if ($type == "Pre Therapy") {
                            $rec["typeOrder"] = 1;
                        } else if ($type == "Therapy") {
                            $rec["typeOrder"] = 2;
                        }
                        $retData[] = $rec;
                        // echo json_encode($rec) . "<br>";
                    }
                }
                $jsonRecord['success'] = 'true';
                $jsonRecord['msg'] = "";
                $this->set('jsonRecord', $retData);
                return;
            }


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
				//var_dump($oemrecords);
				

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
					//var_dump($preTherapys);

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

                    //var_dump($modOemRecords);
					
                    $finalOrders = array(); // This should not be redefined here - it is throwing out the work of the previous iteration
                    
					//var_dump($finalOrders);
					
                    foreach ($modOemRecords as $orderRecord) {
                        $templateId = $orderRecord['templateID'];
                        $drug =  $orderRecord['drug'];
						$PID = $patient['patientID'];
						$Order_ID = $orderRecord['Order_ID'];
						
						//var_dump($orderRecord);
						//var_dump($modOemRecords);

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
   
   function Orders($patientID = null, $AdminDate = null) {
	   $this->grabOrders($patientID, $AdminDate);
    }

   function OrdersHold($TID,$Drug_Name, $Order_Type, $PID) {
	   $this->updateOrderStatusHold($TID,$Drug_Name, $Order_Type, $PID);
    }	
	
   function OrdersCancelled($TID,$Drug_Name, $Order_Type, $PID) {
	   $this->updateOrderStatusCancelled($TID,$Drug_Name, $Order_Type, $PID);
    }


/**
 * $id = Record ID in specific table
 * $type = Determines which table to update ("Pre", "Post", "Therapy")
 *         Pre uses Medication_Hydration Table and ID maps to 'MH_ID'
 *         Post uses Medication_Hydration Table and ID maps to 'MH_ID'
 *         Therapy uses Template_Regimen Table and ID maps to 'Patient_Regimen_ID'
 * $status = Status to set - "Hold", "Cancel", "Clear"
 **/
    function HoldCancel($patient_id = null, $template_id = null, $type = null, $status = null) {
		// error_log("HoldCancel - $template_id, $type, $status");
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        
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

                    $query = "select * from $table where $key = '$template_id'";
// error_log($query);
                    $TreatmentData = $this->Orders->query($query);
// error_log("Treatment Data - " . json_encode($TreatmentData[0]));


$lookup = new LookUp();
$Order_Type = $type;
$TID = $TreatmentData[0]["Template_ID"];
$Drug_ID = $TreatmentData[0]["Drug_ID"];
$Drug_Name = $lookup->getLookupNameByIdAndType($Drug_ID, 2);
$PID = $patient_id;


// error_log("Status = $status");
// error_log("Order_Type = $Order_Type");
// error_log("TID = $TID");
// error_log("Drug_ID = $Drug_ID");
// error_log("Drug_Name = $Drug_Name");
// error_log("Drug_Name = " . $Drug_Name[0]["Name"]);




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

if ("Hold" === $status) {
	   $this->Orders->updateOrderStatusHold($TID,$Drug_Name, $Order_Type, $PID);
}
else if ("Cancel" === $status) {
	   $this->Orders->updateOrderStatusCancelled($TID,$Drug_Name, $Order_Type, $PID);
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



/**
 * Return the Order Status for a specified Order_ID
 * Use Simple Rest Client to test/demo
 * - https://mwb.dbitpro.com/Orders/OrderStatus/2567257F-D35D-E311-A204-000C2935B86F
 * Only responds to GET, other commands return errors
 **/
    function OrderStatus($order_id = null) {
        // error_log("OrderStatus - $order_id");
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $table = "Order_Status";
            $query = "select Order_Status from $table where Order_ID = '$order_id'";
            $retVal = $this->Orders->query($query);
            // error_log( $query);
            // error_log( json_encode($retVal));
            if(0 == count($retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "No Record Matches $id";
            }
            else {
                if ($this->checkForErrors('Get Order Status FAILED ', $retVal)) {
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $frameworkErr;
                    $this->set('frameworkErr', null);
                }
                else {
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
            }
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Invalid COMMAND - " . $_SERVER['REQUEST_METHOD'] . " expected a GET";
        }
        $this->set('jsonRecord', $jsonRecord);
    }


    function getPAT_ID($PatientID, $TemplateID) {
        $query = "select PAT_ID from Patient_Assigned_Templates where Patient_ID = '$PatientID' and Template_ID = '$TemplateID' and Is_Active=1";
        $retVal = $this->Orders->query($query);
        return $retVal[0]["PAT_ID"];
    }

    function Dispensed($patientID = null, $AdminDate = null) {
        $this->grabOrders($patientID, $AdminDate, true);
    }
}

?>
