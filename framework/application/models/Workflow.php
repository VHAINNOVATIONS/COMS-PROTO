<?php

class Workflow extends Model {
    
    const REASON_CANCELLED = 14;
    
    /**
     * 
     * @param string $reasonNo
     * @return array
     */
    public function getWorkflowsByReasonNo($reasonNo)
    {
		if (is_int ( $reasonNo )) {
			$query = "SELECT * FROM Workflows WHERE ReasonNo = '$reasonNo'";
		}
		else {
			$query = "SELECT * FROM Workflows WHERE WorkFlowName = '$reasonNo'";
		}
        return $this->query($query);
    }
    
    function getReasons() {
        
        $query = "SELECT ReasonNo as id,WorkFlowName as value,Reason as description FROM Workflows where ReasonNo > 3 Order By WorkFlowName";
        
        return $this->query($query);
        
    }
    
    
/////////////////////////
/////Begin - Get Last Issued Workflow ID
/////////////////////////
    function GetLastWFID() {

		//Get Last Workflow ID
        $wfid = "SELECT LastIssuedWorkflowID FROM WorkflowIDsLastIssued";
        $result = $this->query($wfid);
        foreach($result as $row){
            $owid = $row['LastIssuedWorkflowID'];
            $nwid = $row['LastIssuedWorkflowID'] + 1;
        }
        $uwfid = "Update WorkflowIDsLastIssued set LastIssuedWorkflowID = $nwid where LastIssuedWorkflowID = '" . $owid . "'";
        $updateWorkflowID = $this->query($uwfid);

        return $nwid;
    }

/////////////////////////
/////End - Get Last Issued Workflow ID
/////////////////////////
/////////////////////////
/////Begin - Get Current Step of Workflow ID
/////////////////////////
    function GetCurrentStepWFID($wid) {

		//Get Current Step for WID
        $wfidcs = "SELECT CurrentStep FROM WorkflowHistory WHERE wid = $wid";
        $wfidcsl = $this->query($wfidcs);
        foreach($wfidcsl as $row){
            $CurrentStep = $row['CurrentStep'];
        }

		//$uwfid = "Update WorkflowIDsLastIssued set LastIssuedWorkflowID = $nwid where LastIssuedWorkflowID = '" .$owid."'";
		//$updateWorkflowID = sqlsrv_query($conn, $uwfid);

        return $CurrentStep;
    }

/////////////////////////
/////End - Get Current Step of Workflow ID
/////////////////////////
/////////////////////////
/////Begin - Notify of Orders to Pharmacy
/////////////////////////
    function OrdersNotify($patientId, $templateId, $dateApplied, $dateStarted, $dateEnded, $goal, $clinicalTrial, $performanceStatus) {

        $ReasonNo = 3;

        $wid = GetLastWFID();

		//Get Number of Steps for Workflow
        $wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
        $nosteps = $this->query($wfinfo);
        foreach($nosteps as $row){
            $NoSteps = $row['NoSteps'];
            $Reason = $row['Reason'];
			$Body = $row['Body'];
        }

		//Get Patient's Name from Patient Table
        $pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$Patient_ID'";
		$piname = $this->query($pname);
		foreach($piname as $row){
            $FirstName = $row['First_Name'];
            $LastName = $row['Last_Name'];
        }

		//Get Pharmacist's Email Addresses from Roles Table
        $tsql = "SELECT * FROM Roles WHERE role = 'Pharmacist'";
        $getemail = $this->query($tsql);
        foreach ($getemail as $row){
            $PharmEmail = $row['Email'];

			//Write Message
            $To = $PharmEmail;
            $CC = $_SESSION['Email'];
            $senderEmail = $_SESSION['Email'];
            $MFrom = $senderEmail;
            //$Subject = "Order Notification to Pharmacist for patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
			$Subject = "Info: Order Notification to Pharmacist for patient ".$FirstName." ".$LastName."";
            $headers = "From: <do_not_reply@dbitpro.com>\r\n";
            $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

            $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "?ReasonNo=".$ReasonNo."";
			//send message
            //$message = "<html><body>Order Notification to Pharmacist (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a> <br>Patient ID: " . $patientId . "<br>Template ID: " . $templateId . "<br>dateApplied: " . $dateApplied . "<br> dateStarted : " . $dateStarted . "<br>dateEnded Id: " . $dateEnded . "<br>Goal: " . $goal . "<br>clinicalTrial: " . $clinicalTrial . "<br>performanceStatus: " . $performanceStatus . "</body></html>";
			//$message = "<html><body>Update Workflow Status: <a href=".$Link.">Respond</a><br><br>".$Body."</body></html>";
			$message = "<html><body><br>".$Body."<br>Patient ID: " . $patientId . "<br>Template ID: " . $templateId . "<br>dateApplied: " . $dateApplied . "<br> dateStarted : " . $dateStarted . "<br>dateEnded Id: " . $dateEnded . "<br>Goal: " . $goal . "<br>clinicalTrial: " . $clinicalTrial . "<br>performanceStatus: " . $performanceStatus . "</body></html>";
            mail($To, $Subject, $message, $headers);

			//Store Message
            StoreMessage($To, $CC, $Subject, $message, $MFrom, $wid);
        }
        $WFStatus = "Start";
        $Response = "Sent";
		
		//Write Workflow History
        WFHistory($wid, $ReasonNo, $WFStatus, $Response);
    }

/////////////////////////
/////End - Notify of Orders to Pharmacy
/////////////////////////
/////////////////////////
/////Begin - OEM Edit Workflow
/////////////////////////
    function OEMeditWorkflow($form_data){
error_log("Workflow.Model.OEMeditWorkflow - Entry Point");
error_log(json_encode($form_data));

    //function OEMeditWorkflow($templateid, $oemrecordid, $therapyid, $therapytype, $instructions, $admintime, $medid, $med, $dose, $bsadose, $units, $infusionmethod, $fluidtype, $fluidvol, $flowrate, $infusiontime, $dose2, $bsadose2, $units2, $infusionmethod2, $fluidtype2, $fluidvol2, $flowrate2, $infusiontime2) {
        $templateid = $form_data->TemplateID;
        $oemrecordid = $form_data->OEMRecordID;
        $therapyid = $form_data->TherapyID;
        $therapytype = $form_data->TherapyType;
        $instructions = $form_data->Instructions;
        $admintime = $form_data->AdminTime;
        $medid = $form_data->MedID;
        $med = $form_data->Med;
        $dose = $form_data->Dose;
        $bsadose = $form_data->BSA_Dose;
        $units = $form_data->Units;
        $infusionmethod = $form_data->InfusionMethod;
        $fluidtype = $form_data->FluidType;
        $fluidvol = $form_data->FluidVol;
        $flowrate = $form_data->FlowRate;
		//$infusiontime = $form_data->{'InfusionTime1'};
        $infusiontime = $form_data->InfusionTime;		// MWB - 3/14/2012 - Changed as we don't use InfusionTime1
        $dose2 = $form_data->Dose2;

        $bsadose2 = $form_data->BSA_Dose2;
        $units2 = $form_data->Units2;
        $infusionmethod2 = $form_data->InfusionMethod2;
        $fluidtype2 = $form_data->FluidType2;
        $fluidvol2 = $form_data->FluidVol2;
        $flowrate2 = $form_data->FlowRate2;
        $infusiontime2 = $form_data->InfusionTime2;
        $reason = $form_data->Reason;

        $Template_ID = $templateid;

		//Get Patient ID
        $psql = "SELECT Patient_ID from Master_Template where Template_ID = '".$oemrecordid."'";
		$pid = $this->query($psql);
		foreach($pid as $id){
			$Patient_ID = $id['Patient_ID'];
		}
		
		//Get Patient's Name from Patient Table
        $pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$Patient_ID'";
		$piname = $this->query($pname);
		foreach($piname as $row){
            $FirstName = $row['First_Name'];
            $LastName = $row['Last_Name'];
        }

		
		//Get Owner of Template's ID
        $gsql = "SELECT * FROM Patient_Assigned_Templates WHERE Patient_ID = '$Patient_ID' AND Template_ID = '$Template_ID'";
        $getassignor = $this->query($gsql);
        foreach($getassignor as $row){
            $AssignedByRoleID = $row['AssignedByRoleID'];
        }
		//echo "Role ID: ".$AssignedByRoleID."";
		
        $srid = $_SESSION['rid'];
        $senderEmail = $_SESSION['Email'];

		//Get Owner's Email Address from Roles Table
        $tsql = "SELECT * FROM Roles WHERE rid = '$AssignedByRoleID'";
		$getemail = $this->query($tsql);
		foreach($getemail as $row){
            $PhysicianEmail = $row['Email'];
        }

		//For Testing, we set the Reason No, later, this will be set when the user makes a change and selects a Reason, will then pass the ReasonNo which decides the message
        $ReasonNo = $reason;
		//echo $ReasonNo;

        $WFStatus = "Nothing";
		//if (empty($WFStatus)) {
        if ($WFStatus == "Update") {
		//update workflow
        } 
		else {
            $wid = $this->GetLastWFID();

			/////
			//Reason 4
			////
            if ($ReasonNo == 4) {

			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
				
				//Set Link
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 5
			////
			elseif ($ReasonNo == 5) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                $Subject = "".$SubjectPreHeader."Drug Shortage - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$Subject = "".$SubjectPreHeader."Drug Shortage - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                //$message = "<html><body>Drug Shortage - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			/////
			//Reason 6
			////
			elseif ($ReasonNo == 6) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
			
				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Policy/Protocol - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Policy/Protocol - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Policy/Protocol - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 7
			////
			elseif ($ReasonNo == 7) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Change in Patient-specific Parameters - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Change in Patient-specific Parameters - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Change in Patient-specific Parameters - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 8
			////			
			elseif ($ReasonNo == 8) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}

				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Non-formulary - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Non-formulary - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Non-formulary - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 

			/////
			//Reason 9
			////			
			elseif ($ReasonNo == 9) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}

				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Change Route of Administration - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Change Route of Administration - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Change Route of Administration - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";
				
                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 10
			////			
			elseif ($ReasonNo == 10) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
			
				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Change Administration Time - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Change Administration Time - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Change Administration Time - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body>Link: <a href=".$Link.">Link</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 11
			////			
			elseif ($ReasonNo == 11) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}

				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                $Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Change Sequencing - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Change Sequencing - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Change Sequencing - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><a href=".$Link.">Respond to this request.</a><br><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			/////
			//Reason 12
			////			
			elseif ($ReasonNo == 12) {
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
			
				//Set Link
				//$Link = "https://".$_SESSION['domain']."?patient=".$Patient_ID."&Section=OEM";
				//$Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";
				
				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Dose rounding - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Dose rounding - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Dose rounding - Order Edit Notification (Workflow ID: " . $wid . ")<br><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				//$message = "<html><body>Link: <a href=".$Link.">Link</a><br><br>".$Body."</body></html>";
				$message = "<html><body>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 13
			////			
			elseif ($ReasonNo == 13) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}
			
				//Set Link
				//$Link = "https://".$_SESSION['domain']."?patient=".$Patient_ID."&Section=OEM";
				//$Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=".$wid."&ReasonNo=".$ReasonNo."&oemrecordid=".$oemrecordid."&Response=Received&srid=".$srid."";
				
				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Fluid/Volume Change - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Fluid/Volume Change - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Fluid/Volume Change - Order Edit Notification (Workflow ID: " . $wid . ")<br><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			/////
			//Reason 14
			////			
			elseif ($ReasonNo == 14) {
			
			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}

			//Set Subject Pre Header
			if ($NoSteps === 1){
			$SubjectPreHeader = "Info: ";
			}
			else{
			$SubjectPreHeader = "Resign Required: ";
			}

				//Set Link
				//$Link = "https://sictest.dbitpro.com?patient=".$Patient_ID."&Section=OEM";
                //$Link = "https://".$_SESSION['domain']."/WorkflowUpdate.php?wid=" . $wid . "&ReasonNo=" . $ReasonNo . "&oemrecordid=" . $oemrecordid . "&Response=Received&srid=" . $srid . "";

				//Write Message
                $To = $PhysicianEmail;
                $CC = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "".$SubjectPreHeader."Non-formulary - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "".$SubjectPreHeader."Order Cancelled - Order Edit Notification to Provider for Patient " . $FirstName . " " . $LastName . "";
                //$message = "<html><body>Non-formulary - Order Edit Notification (Workflow ID: " . $wid . ")<br><br>Link: <a href=" . $Link . ">Link</a><br> The OEM Record ID: " . $oemrecordid . "<br>Patient ID: " . $Patient_ID . "<br>Template ID: " . $Template_ID . "<br>Instructions: " . $instructions . "<br> Admin Time: " . $admintime . "<br>Med Id: " . $medid . "<br>Med: " . $med . "<br>Does: " . $dose . "<br>BSA Dose: " . $bsadose . "<br>Units: " . $units . "<br>Infusion Method: " . $infusionmethod . "<br>Fluid Type: " . $fluidtype . "<br>Fluid Volume: " . $fluidvol . "<br>Flow Rate: " . $flowrate . "<br>Infusion Time: " . $infusiontime . "<br><br>Or<br><br>Dose: " . $dose2 . "<br>BSA Does:" . $bsadose2 . "<br>Units: " . $units2 . "<br>Infusion Method: " . $infusionmethod2 . "<br>Fluid Type: " . $fluidtype2 . "<br>Fluid Volume: " . $fluidvol2 . "<br>Flow Rate: " . $flowrate2 . "<br>Infusion Time: " . $infusiontime2 . "</body></html>";
				$message = "<html><body><br>".$Body."</body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);
            } 
			
			else {
                echo "No Reason";
            }

			//Set Workflow Status and Response
            $WFStatus = "Start";
            $Response = "Sent";
        }

		//Store Message
        $this->StoreMessage($To, $CC, $Subject, $message, $MFrom, $wid);
		
		//Write Workflow History
        $this->WFHistory($wid, $ReasonNo, $WFStatus, $Response);

error_log("Workflow.Model.OEMeditWorkflow - EXIT Point");

    }

/////////////////////////
/////End - OEM Edit Workflow
/////////////////////////
/////////////////////////
/////Begin - OEM Edit Update Workflow
/////////////////////////
    function OEMeditUpdateWorkflow($WFStatus, $Response, $wid, $oemrecordid, $ReasonNo, $srid) {

			//Get body for Message and workflow NoSteps
			$wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
			$wfi = $this->query($wfinfo);
			foreach($wfi as $row){
			$Body = $row['Body'];
			$NoSteps = $row['NoSteps'];
			}
	
		//Get Patient ID
        $psql = "SELECT Patient_ID from Master_Template where Template_ID = '$oemrecordid'";
		$pid = $this->query($psql);
		foreach($pid as $row){
            $Patient_ID = $row['Patient_ID'];
        }

		//Get Patient's Name from Patient Table
        $pname = "SELECT First_Name,Last_Name FROM Patient WHERE Patient_ID = '$Patient_ID'";
		$piname = $this->query($pname);
		foreach($piname as $row){
            $FirstName = $row['First_Name'];
            $LastName = $row['Last_Name'];
        }

		//Get Sender of Change Email Address from Roles Table
        $tsql = "SELECT * FROM Roles WHERE rid = '$srid'";
		$getemail = $this->query($tsql);
		foreach($getemail as $row){
            $PharmEmail = $row['Email'];
        }

        if ($WFStatus == "Update") {
            if ($Response == "Approved") {
				
				//Write Message
                $To = $PharmEmail;
				//$To = "dbitpro@gmail.com";
                $CC = $_SESSION['Email'];
                $senderEmail = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "Order Change Approved for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "Order Change Approved for Patient " . $FirstName . " " . $LastName . "";
                $message = "<html><body>Order Change Approved (Workflow ID: " . $wid . ")<br><br> </body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
				//$headers .= "Reply-To: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
				//$headers .= "CC: sean.cassidy@dbitmail.com\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);

				//Store Message
                StoreMessage($To, $CC, $Subject, $message, $MFrom, $wid);
				
				//Write Workflow History
                WFHistory($wid, $ReasonNo, $WFStatus, $Response);
            } 
			
			elseif ($Response == "NotApproved") {

				//Write Message
                $To = $PharmEmail;
				//$To = "dbitpro@gmail.com";
                $CC = $_SESSION['Email'];
                $senderEmail = $_SESSION['Email'];
                $MFrom = $senderEmail;
                //$Subject = "Order Change Not Approved for Patient " . $FirstName . " " . $LastName . ", Workflow ID: " . $wid . "";
                $Subject = "Order Change Not Approved for Patient " . $FirstName . " " . $LastName . "";
                $message = "<html><body>Order Change Not Approved (Workflow ID: " . $wid . ")<br><br> </body></html>";

                $headers = "From: <do_not_reply@dbitpro.com>\r\n";
				//$headers .= "Reply-To: <do_not_reply@dbitpro.com>\r\n";
                $headers .= "Reply-To: " . strip_tags($MFrom) . "\r\n";
				//$headers .= "CC: sean.cassidy@dbitmail.com\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                mail($To, $Subject, $message, $headers);

				//Store Message
                StoreMessage($To, $CC, $Subject, $message, $MFrom, $wid);
				
				//Write Workflow History
                WFHistory($wid, $ReasonNo, $WFStatus, $Response);
            }
        }
    }

/////////////////////////
/////End - OEM Edit Update Workflow
/////////////////////////
/////////////////////////
/////Begin - Write Message to Database
/////////////////////////
    function StoreMessage($To, $CC, $Subject, $message, $MFrom, $wid) {

        $midq = "SELECT mid FROM Messages ORDER BY mid";
		$wfhist = $this->query($midq);
		foreach($wfhist as $row){
            $mid = $row['mid'] + 1;
        }

        $rid = $_SESSION['rid'];
		$dateSent = date('F j, Y');
		$timeSent = date('Hi');
		$timeZone = date('e');
		$MStatus = "Unread";
		$OpenLinkSrc = "https://".$_SESSION['domain']."/showMessage.php?mid=".$mid."";

        $newmessage = htmlentities($message);
        $newsubject = htmlentities($Subject);
		//echo "New Message: ".$newmessage."";
		//Insert into Messages
        $messageq = "INSERT INTO Messages (mid,MTo,CC,Subject,Message,MFrom,rid,wid,dateSent,timeSent,timeZone,MStatus,OpenLink) VALUES ($mid,'$To','$CC','$newsubject','$newmessage','$MFrom','$rid','$wid','$dateSent','$timeSent','$timeZone','$MStatus','$OpenLinkSrc')";
		//$messageq = "INSERT INTO Messages (mid,MTo,CC,Subject,Message,MFrom,rid,wid) VALUES ($mid,'$To','$CC','$newsubject','$newmessage','$MFrom','$rid','$wid')";
        $InsertMessageHistory = $this->query($messageq);
		//$InsertMessageHistory = sqlsrv_query($conn, $messageq);
    }

/////////////////////////
/////End - Write Message to Database
/////////////////////////
/////////////////////////
/////Begin - WFHistory Function
/////////////////////////
    function WFHistory($wid, $ReasonNo, $WFStatus, $Response) {

        $rid = $_SESSION['rid'];

        $CurrentStep = 0;
        $wfhis = "SELECT CurrentStep,Status FROM WorkflowHistory WHERE wid = '$wid' ORDER BY CurrentStep";
        //$wfhist = sqlsrv_query($conn, $wfhis);
		$wfhist = $this->query($wfhis);
        //while ($row = sqlsrv_fetch_array($wfhist, SQLSRV_FETCH_ASSOC)) {
		foreach($wfhist as $row){
            $CurrentStep = $row['CurrentStep'];
            $CurrentStatus = $row['Status'];
        }

        if ($CurrentStep == 0) {
            $CurrentStep = 1;
        }

		//Get Number of Steps for Workflow, Get Last Workflow ID
        $wfinfo = "SELECT * FROM Workflows WHERE ReasonNo = '$ReasonNo'";
        //$nosteps = sqlsrv_query($conn, $wfinfo);
		$nosteps = $this->query($wfinfo);
		foreach ($nosteps as $row){
            $id = $row['ID'];
            $NoSteps = $row['NoSteps'];
            $Reason = $row['Reason'];
        }

        if ($CurrentStep <= $NoSteps) {

            //Update Last Issued
            $tsql = "Update Workflows set LastIssued = $wid where ID = '" . $id . "'";
            $updateWorkflow = $this->query($tsql);
            $NextStep = $CurrentStep + 1;

            if ($NoSteps == $CurrentStep) {
                $Status = "Complete";
            } else {
                $Status = "Not Complete";
            }
        }

        if ($WFStatus == "Update") {
            if ($NoSteps == $NextStep) {
                $Status = "Complete";
            } else {
                $Status = "Not Complete";
            }
            if ($CurrentStatus == "Complete") {
			//Do Nothing
            } else {
                $tsql3 = "INSERT INTO WorkflowHistory (wid,CurrentStep,NumOfSteps,Status,Response,rid,ReasonNo) VALUES ($wid,$NextStep,$NoSteps,'$Status','$Response',$rid,$ReasonNo)";
                $updateWorkflowHistory = $this->query($tsql3);
            }
        }
		//elseif ($CurrentStep == 1){
        elseif ($WFStatus == "Start") {
			//Insert into WorkflowHistory
            $tsql4 = "INSERT INTO WorkflowHistory (wid,CurrentStep,NumOfSteps,Status,Response,rid,ReasonNo) VALUES ($wid,$CurrentStep,$NoSteps,'$Status','$Response',$rid,$ReasonNo)";
            //$updateWorkflowHistory = sqlsrv_query($conn, $tsql3);
			$updateWorkflowHistory = $this->query($tsql4);
        }
    }

/////////////////////////
/////End - WFHistory Function
/////////////////////////
/////////////////////////
/////Begin - Decode HTML Message in Database Function
/////////////////////////
    function DecodeMessage($mid) {

		//Select Message to Decode
        $msgq = "SELECT Message FROM Messages WHERE mid = $mid";
        $msgqu = $this->query($msgq);
        //while ($row = sqlsrv_fetch_array($msgqu, SQLSRV_FETCH_ASSOC)) {
		foreach ($msgqu as $row){
            $Message = $row['Message'];
        }

		//Decode the HTML
        $dmsg = html_entity_decode($Message);

		//Echo the Message
        echo "<br>Decoded Message:<br> " . $dmsg . "";
    }

/////////////////////////
/////End - Decode HTML Message in Database Function
/////////////////////////
/////////////////////////
/////Begin - Set Workflow Steps
/////////////////////////
    function UpdateWorkflowSteps($ReasonNo, $NoSteps) {

		//Update Workflow
        $wfu = "Update Workflows set NoSteps = $NoSteps where ReasonNo = '" . $ReasonNo . "'";
        //$updateWorkflowq = sqlsrv_query($conn, $wfu);
		$updateWorkflowq = $this->query($wfu);

        echo "Updated";
    }

/////////////////////////
/////End - Set Workflow Steps
/////////////////////////
}

?>
