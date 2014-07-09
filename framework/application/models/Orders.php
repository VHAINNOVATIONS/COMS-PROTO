<?php

class Orders extends Model {

    const STATUS_CANCELLED = 'Cancelled';
    const STATUS_INCOORDINATION = 'In-Coordination';
    
    function getPatientsWithActiveTemplates() {
        $query = "select Patient_ID as patientID,Template_ID as templateID from Patient_Assigned_Templates WHERE Date_Ended_Actual is NULL";

        return $this->query($query);
    }

    function getOrders() {

        $query = "SELECT pat.Template_ID as id, pat.Patient_ID as Patient_ID, pat.Date_Started as Date_Started, tr.Drug_ID as Drug_ID, " .
                "tr.Regimen_Dose as Regimen_Dose, tr.Regimen_Dose_Unit_ID as Regimen_Dose_Unit_ID, tr.Route_ID as Route_ID, " .
                "tr.Admin_Day as Admin_Day, tr.Infusion_Time as Infusion_Time, tr.Flow_Rate as Flow_Rate, tr.Instructions as Instructions, mh.MH_ID as MH_ID, " .
                "mh.Drug_ID as MH_Drug_ID, mh.Pre_or_Post as MH_Pre_or_Post, mh.Description as MH_Description, mh.Flow_Rate as MH_Flow_Rate, " .
                "mh.Admin_Day as MH_Admin_Day, mh.Infusion_Time as MH_Infusion_Time, mh.Fluid_Vol as MH_Fluid_Vol, mh.Admin_Time as MH_Admin_Time, mhi.Infusion_Unit_ID as MHI_Infusion_Unit_ID " .
                "FROM Patient_Assigned_Templates pat " .
                "LEFT OUTER JOIN Template_Regimen tr ON tr.Template_ID = pat.Template_ID " .
                "LEFT OUTER JOIN Medication_Hydration mh ON mh.Template_ID = pat.Template_ID " .
                "LEFT OUTER JOIN MH_Infusion mhi ON mhi.MH_ID = mh.MH_ID " .
                "WHERE pat.Date_Ended_Actual is not NULL";

        return $this->query($query);
    }

    function getDrugs() {
        $query = "select Patient_ID as Patient_ID,Template_ID as Template_ID,Date_Started as Date_Started,Goal as Goal from Patient_Assigned_Templates WHERE Date_Ended_Actual is not NULL";
//        $query = "select Patient_ID as Patient_ID,Template_ID as Template_ID,Date_Started as Date_Started,Goal as Goal from Patient_Assigned_Templates WHERE Is_Active = 1";
        $queryPAT = $this->query($query);
        foreach ($queryPAT as $row) {
            $Template_ID = $row['Template_ID'];
            $Patient_ID = $row['Patient_ID'];
            $Date_Started = $row['Date_Started'];
            $Goal = $row['Goal'];
            echo "<br><br>****START NEW TEMPLATE****<br>";
            echo "<br>TemplateID:" . $Template_ID . "<br>";

            //Pull From Template_Regimen
            //echo "<br><br>****Template Regimen Drugs**** for ".$Template_ID."<br><br>";
            $queryTRq = "select Drug_ID as Drug_ID, Regimen_Dose as Regimen_Dose, Regimen_Dose_Unit_ID as Regimen_Dose_Unit_ID,Template_ID as Template_ID,Route_ID as Route_ID," .
                    "Admin_Day as Admin_Day,Infusion_Time as Infusion_Time,Flow_Rate as Flow_Rate, Instructions as Instructions from Template_Regimen WHERE Template_ID = '$Template_ID'";
            $queryTR = $this->query($queryTRq);
            foreach ($queryTR as $row) {
                $Drug_ID = $row['Drug_ID'];
                $Regimen_Dose = $row['Regimen_Dose'];
                $Regimen_Dose_Unit_ID = $row['Regimen_Dose_Unit_ID'];
                $Template_ID = $row['Template_ID'];
                $Route_ID = $row['Route_ID'];
                $Admin_Day = $row['Admin_Day'];
                $Infusion_Time = $row['Infusion_Time'];
                $Flow_Rate = $row['Flow_Rate'];
                $Instructions = $row['Instructions'];


                echo "Drug_ID: " . $Drug_ID . "<br>";
                echo "Regimen_Dose: " . $Regimen_Dose . ",";
                echo " Regimen_Dose_Unit_ID" . $Regimen_Dose_Unit_ID . ",";
                echo " Template_ID" . $Template_ID . ",";
                echo "Route_ID " . $Route_ID . ",";
                echo "Admin_Day " . $Admin_Day . ",";
                echo "Infusion_Time " . $Infusion_Time . "<br>";
                echo "Flow_Rate: " . $Flow_Rate . "<br>";
                echo "Instructions " . $Instructions . "<br><br>";
            }

            $queryMHq = "select MH_ID as MH_ID, Drug_ID as Drug_ID, Template_ID as Template_ID,Pre_or_Post as Pre_or_Post,Description as Description,Flow_Rate as Flow_Rate,Admin_Day as Admin_Day,Infusion_Time as Infusion_Time, Fluid_Vol as Fluid_Vol, Admin_Time as Admin_Time from Medication_Hydration WHERE Template_ID = '$Template_ID'";
            $queryMH = $this->query($queryMHq);
            foreach ($queryMH as $row) {
                $MH_ID = $row['MH_ID'];
                $Drug_ID = $row['Drug_ID'];
                $Template_ID = $row['Template_ID'];
                $Pre_or_Post = $row['Pre_or_Post'];
                $Description = $row['Description'];
                $Flow_Rate = $row['Flow_Rate'];
                $Admin_Day = $row['Admin_Day'];
                $Infusion_Time = $row['Infusion_Time'];
                $Fluid_Vol = $row['Fluid_Vol'];
                $Admin_Time = $row['Admin_Time'];
                $queryD = "select Name as Name from Lookup WHERE Lookup_ID = '$Drug_ID'";
                $queryDr = $this->query($queryD);
                foreach ($queryDr as $row) {
                    $MHDrugName = $row['Name'];
                }

                echo "<br>****MH**** for " . $Template_ID . "<br><br>";
                echo "MH_ID: " . $MH_ID . "<br>";
                echo "Drug ID: " . $Drug_ID . "<br>";
                echo "Name: " . $MHDrugName . "<br>";
                echo "Regimen_Dose: " . $Pre_or_Post . "<br>";
                echo "Description: " . $Description . "<br>";
                echo "Template_ID: " . $Flow_Rate . "<br>";
                echo "Admin_Day: " . $Admin_Day . "<br>";
                echo "Infusion_Time: " . $Infusion_Time . "<br>";
                echo "Fluid_Vol: " . $Fluid_Vol . "<br>";
                echo "Admin_Time: " . $Admin_Time . "<br><br>";

                //Pull from MH_Infusion
                //echo "<br>****MHI**** for ".$Template_ID."<br><br>";
                //echo $MH_ID;
                //echo "<br><br>";
                $queryMHIq = "select Infusion_Unit_ID as Infusion_Unit_ID, Infusion_Type_ID as Infusion_Type_ID,Infusion_Amt as Infusion_Amt,Fluid_Type as Fluid_Type,BSA_Dose as BSA_Dose,Fluid_Vol as Fluid_Vol,Flow_Rate as Flow_Rate, Infusion_Time as Infusion_Time from MH_Infusion WHERE MH_ID = '$MH_ID'";
                $queryMHI = $this->query($queryMHIq);
                foreach ($queryMHI as $row) {
                    $MHI_Infusion_Unit_ID = $row['Infusion_Unit_ID'];
                    $MHI_Infusion_Type_ID = $row['Infusion_Type_ID'];
                    $MHI_Infusion_Amt = $row['Infusion_Amt'];
                    $MHI_Fluid_Type = $row['Fluid_Type'];
                    $MHI_BSA_Dose = $row['BSA_Dose'];
                    $MHI_Fluid_Vol = $row['Fluid_Vol'];
                    $MHI_Flow_Rate = $row['Flow_Rate'];
                    $MHI_Infusion_Time = $row['Infusion_Time'];


                    echo "MHI_Infusion_Unit_ID: " . $MHI_Infusion_Unit_ID . "<br>";
                    echo "MHI_Infusion_Type_ID: " . $MHI_Infusion_Type_ID . "<br>";
                    echo "MHI_Infusion_Amt: " . $MHI_Infusion_Amt . "<br>";
                    echo "MHI_Fluid_Type: " . $MHI_Fluid_Type . "<br>";
                    echo "MHI_BSA_Dose: " . $MHI_BSA_Dose . "<br>";
                    echo "MHI_Fluid_Vol: " . $MHI_Fluid_Vol . "<br>";
                    echo "MHI_Infusion_Time: " . $MHI_Infusion_Time . "<br><br>";
                }
            }
        }


        return $this->query($query);
    }

    function setOrders($modOemRecords) {

        $modOemRecords = array();

        $modOemRecords['patientID'] = $patient['patientID'];
        $modOemRecords['templateID'] = $patient['templateID'];
        $modOemRecords['adminDay'] = $oemrecord['Day'];
        $modOemRecords['adminDate'] = $oemrecord['AdminDate'];
        $modOemRecords['drug'] = $therapy['drug'];
        $modOemRecords['type'] = $type;
        $modOemRecords['dose'] = $therapy['regdose'];
        $modOemRecords['unit'] = $therapy['regdoseunit'];
        $modOemRecords['route'] = $therapy['route'];
        $modOemRecords['fluidVol'] = $therapy['flvol'];
        $modOemRecords['flowRate'] = $therapy['flowRate'];
        $modOemRecords['instructions'] = $therapy['instructions'];

        $query = "INSERT INTO Orders_History (Patient_ID,Template_ID,Admin_Day,Admin_Time,Type,Drug,Dosage,Units,Route,Fluid_Volume,Flow_Rate,Instructions) " .
                "VALUES ('" . $modOemRecords['patientID'] . "','" . $modOemRecords['templateID'] . "','" . $modOemRecords['adminDay'] . "','" . $modOemRecords['adminDate'] . "'" .
                ",'" . $modOemRecords['drug'] . "','" . $modOemRecords['type'] . "','" . $modOemRecords['dose'] . "','" . $modOemRecords['unit'] . "'" .
                ",'" . $modOemRecords['route'] . "','" . $modOemRecords['fluidVol'] . "','" . $modOemRecords['flowRate'] . "','" . $modOemRecords['instructions'] . "')";
        return $this->query($query);
    }

    function updateOrderStatus($form_data) {
	
        //$Template_ID = $form_data->{'Template_ID'};
        $Template_IDF = $form_data->{'templateID'};
        $OrderStatusF = $form_data->{'orderstatus'};
        $Drug_NameF = $form_data->{'drug'};
        $OrderIDF = $form_data->{'orderid'};
        //$Drug_NameFT = trim($Drug_NameF);
		$PIDF = $form_data->{'patientID'};
		$typeF = $form_data->{'type'};
		$routeF = $form_data->{'route'};

        $query = "SELECT Template_ID as Template_ID_CHK, Order_Status as Order_StatusCHK " .
                "FROM Order_Status " .
				"WHERE Order_ID = '" . $OrderIDF . "' ";
				
        
        $queryq = $this->query($query);
		error_log("orders model 1 - $queryq");

        if (count($queryq) > 0) {

            $query = "Update Order_Status set Order_Status = '".$OrderStatusF."',Drug_Name = '".$Drug_NameF."' " .
                    //"where Template_ID = '" . $Template_IDF . "' AND Drug_Name = '".$Drug_NameF."'";
                    "where Order_ID = '" . $OrderIDF . "' ";
					
        } else {
		$Notes = "Line 184, Order.php";

            $query = "INSERT INTO Order_Status(Template_ID, Order_Status, Order_Type, Drug_Name, Patient_ID,Notes)" .
			"VALUES ('".$Template_IDF."','".$OrderStatusF."','Inserted Order','".$Drug_NameF."','".$PIDF."','".$Notes."')";
           
        }
		//var_dump($OrderStatusF);


		if ($OrderStatusF === "Finalized"){
		//echo $Template_IDF;

		$this->sendCPRSOrderIn($Template_IDF,$PIDF,$typeF,$routeF);
		
		}
		elseif ($OrderStatusF === "Hold"){
		$this->updateOrderStatusHold($Template_IDF,$PIDF,$typeF,$routeF);
		}
		elseif ($OrderStatusF === "Dispensed"){
		echo "Dispensed!";
		}
		//echo $query;
        error_log("orders model 2 - $query");
        return $this->query($query);
    }
    
	
    //function getOrderStatus($templateId,$drugName,$PID,$Order_ID){
    function getOrderStatus($Order_ID){
        
		
		$query = "SELECT Order_Status as orderStatus, Order_ID as orderid " .
		"FROM Order_Status " .
		"WHERE Order_ID = '".$Order_ID."' ";		
        //echo $query;
        return $this->query($query);
        

        
    }	

    function updateOrderStatusIn($TID,$Drug_Name,$Order_Type,$PID,$Notes){
        	
		$Template_IDchk = NULL;
		$Drug_Namechk = NULL;
		//$Notes = NULL;
		
		$query = "SELECT Template_ID as Template_ID_CHK, Drug_Name as Drug_Name_CHK, Order_Type as Order_Typechk, Order_Status as Order_Statuschk " .
		"FROM Order_Status " .
		"WHERE Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."'";
		
			
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$Template_IDchk =  $row['Template_ID_CHK'];
		$Drug_Namechk =  $row['Drug_Name_CHK'];
		$Order_Statuschk =  $row['Order_Statuschk'];


		}
		if ($Template_IDchk === NULL){
		//echo "empty sring";
		$Notes = "Line 244, order.php";
		$query = "INSERT INTO Order_Status(Template_ID, Order_Status, Drug_Name, Order_Type, Patient_ID, Notes) VALUES ('$TID','Ordered in VistA','$Drug_Name','$Order_Type','$PID','$Notes') ";
		}
		elseif ($Order_Statuschk = 'Finalized'){
		//update Order to Dispensed until VistA Order Reading is in place.
		$Notes = 'Line 249';
		$query = "Update Order_Status set Order_Status = 'Dispensed', Notes = '$Notes' " .
		"where Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."' ".
		"AND Patient_ID = '".$PID."'";	
		}
		else{
		$Notes = 'Line 256';
		$query = "Update Order_Status set Order_Status = 'Dispensed', Notes = '$Notes' " .
		"where Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."' ".
		"AND Patient_ID = '".$PID."'";	
		
		}
        $this->query($query);
    }

    function updateOrderStatusCancelled($TID,$Drug_Name,$Order_Type,$PID){
        
		$Template_IDchk = NULL;
		$Drug_Namechk = NULL;
		
		$query = "SELECT Template_ID as Template_ID_CHK, Drug_Name as Drug_Name_CHK, Order_Type as Order_Typechk, Order_Status as Order_Statuschk " .
		"FROM Order_Status " .
		"WHERE Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."'";
		
			
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$Template_IDchk =  $row['Template_ID_CHK'];
		$Drug_Namechk =  $row['Drug_Name_CHK'];
		$Order_Statuschk =  $row['Order_Statuschk'];


		}
		if ($Template_IDchk === NULL){
		//echo "empty sring";
		$Notes = "Line 277, Orders.php"; 
		$query = "INSERT INTO Order_Status(Template_ID, Order_Status, Drug_Name, Order_Type, Patient_ID, Notes) VALUES ('$TID','Ordered in VistA','$Drug_Name','$Order_Type','$PID','$Notes')";
		}
		else{
		$query = "Update Order_Status set Order_Status = 'Cancelled' " .
		"where Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."' ".
		"AND Patient_ID = '".$PID."'";
		
		}
		
        $this->query($query);
    }

function updateOrderStatusHold($TID,$Drug_Name,$Order_Type,$PID){
        
		$Template_IDchk = NULL;
		$Drug_Namechk = NULL;
		
		$query = "SELECT Template_ID as Template_ID_CHK, Drug_Name as Drug_Name_CHK, Order_Type as Order_Typechk, Order_Status as Order_Statuschk " .
		"FROM Order_Status " .
		"WHERE Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."'";
		
			
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$Template_IDchk =  $row['Template_ID_CHK'];
		$Drug_Namechk =  $row['Drug_Name_CHK'];
		$Order_Statuschk =  $row['Order_Statuschk'];


		}
		if ($Template_IDchk === NULL){
		//echo "empty sring";
		$Notes = "Line 312, orders.php";
		$query = "INSERT INTO Order_Status(Template_ID, Order_Status, Drug_Name, Order_Type, Patient_ID, Notes) VALUES ('$TID','Ordered in VistA','$Drug_Name','$Order_Type','$PID','$Notes')";
		}
		else{
		$query = "Update Order_Status set Order_Status = 'Hold' " .
		"where Template_ID = '".$TID."' " .
		"AND Drug_Name = '".$Drug_Name."' ".
		"AND Patient_ID = '".$PID."'";
		
		}
		
        $this->query($query);
    }	
	
    function LookupNameIn($LID){
        
        $query = "SELECT Name as LK_Name FROM LookUp WHERE Lookup_ID = '".$LID."'";
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$LK_Name =  $row['LK_Name'];
		}
		return $LK_Name;
        
    }	

    function LookupPatientName($PID){
        
        $query = "SELECT Last_Name as LK_Last_Name, First_Name as LK_First_Name, Match as LK_Match FROM Patient WHERE Patient_ID = '".$PID."'";
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$LK_Last_Name =  $row['LK_Last_Name'];
		$LK_First_Name =  $row['LK_First_Name'];
		$LK_Match =  $row['LK_Match'];
		}		
		
		$WName = $LK_Last_Name ." ". $LK_First_Name;
		
		return $WName;
		//return $this->query($query);
        
    }	

    function LookupDescriptionIn($LID){
        
        $query = "SELECT Description as LK_Description FROM LookUp WHERE Lookup_ID = '".$LID."'";
		$queryq = $this->query($query);
		foreach($queryq as $row){
		$LK_Description =  $row['LK_Description'];
		}
		return $LK_Description;
        
    }	

	
function sendCPRSOrderIn($TID,$PID,$typeF, $routeF){

$queryPIq = "select Match as Match from Patient WHERE Patient_ID ='$PID'";
				$queryPI = $this->query($queryPIq);
				foreach($queryPI as $row){
					$match =  $row['Match'];
					}


	if ($routeF === 'Oral'){
	
	if ($typeF === 'Therapy'){
		
	
	$queryMTTRq = "select mt.Template_ID as TR_Template_ID, tr.Drug_ID as TR_Drug_ID, tr.Regimen_Dose as TR_Regimen_Dose, " .
	"tr.Regimen_Dose_Unit_ID as TR_Regimen_Dose_Unit_ID, tr.Route_ID as TR_Route_ID, mt.Regimen_ID as MT_Regimen_ID, mt.Cancer_ID as MT_Cancer_ID, " .
	"mt.Disease_Stage_ID as MT_Disease_Stage_ID, mt.Course_Number as MT_Course_Number, mt.Cycle_Length as MT_Cycle_Length, " .
	"mt.Cycle_Time_Frame_ID as MT_Cycle_Time_Framer_ID, mt.Total_Courses as MT_Total_Courses, mt.Admin_Day as TR_Admin_Day, " .
	"mt.Admin_Date as MT_Admin_Date, tr.Infusion_Time as TR_Infusion_Time, tr.Fl_Vol_Unit_ID as TR_Fl_Vol_Unit_ID, tr.Fl_Vol_Description as TR_Fl_Vol_Description, " .
	"tr.Flow_Rate as TR_Flow_Rate, tr.Instructions as TR_Instructions, tr.Fluid_Vol as TR_Fluid_Vol, tr.Admin_Time as TR_Admin_Time, " .
	"tr.BSA_Dose as TR_BSA_Dose, tr.Fluid_Type as TR_Fluid_Type " .
	"FROM Master_Template as mt " .
	"INNER JOIN Template_Regimen tr ON tr.Template_ID = mt.Template_ID " .
	"WHERE Patient_ID = '$PID' ";

	$queryMTTR = $this->query($queryMTTRq);
	
	$recct = 0;
	$DDrecct = 0;

				foreach($queryMTTR as $row){
					
					$recct = $recct + 1;
					
					$TR_Template_ID = $row['TR_Template_ID'];
					$TR_Drug_ID =  $row['TR_Drug_ID'];	
					$dose = $row['TR_Regimen_Dose'];
					$TR_Regimen_Dose = $row['TR_Regimen_Dose'];
					$TR_Regimen_Dose_Unit_ID = $row['TR_Regimen_Dose_Unit_ID'];
					$TR_Route_ID = $row['TR_Route_ID'];
					$TR_Admin_Day = $row['TR_Admin_Day'];
					$TR_Infusion_Time = $row['TR_Infusion_Time'];
					$TR_Fl_Vol_Unit_ID = $row['TR_Fl_Vol_Unit_ID'];
					$TR_Fl_Vol_Description = $row['TR_Fl_Vol_Description'];
					$TR_Flow_Rate = $row['TR_Flow_Rate'];
					$TR_Instructions = $row['TR_Instructions'];
					$TR_Fluid_Vol = $row['TR_Fluid_Vol'];
					$TR_Admin_Time = $row['TR_Admin_Time'];
					$TR_BSA_Dose = $row['TR_BSA_Dose'];
					$TR_Fluid_Type = $row['TR_Fluid_Type'];
						$TR_Drug_ID_Name = $this->LookupNameIn($TR_Drug_ID);
						$TR_Description = $this->LookupDescriptionIn($TR_Drug_ID);
							$Regimen_Dose_Unit = $this->LookupNameIn($TR_Regimen_Dose_Unit_ID);
							$TR_Route_ID_Name = $this->LookupNameIn($TR_Route_ID);
							//echo " || ".$TR_Drug_ID_Name." || ";
							//echo "TR_Drug_ID: || ".$TR_Drug_ID." || ";
							//echo " || ".$TR_Route_ID_Name." || ";
							//yes, this one
							//NewOrderPatient($TR_Drug_ID_Name,$TR_Regimen_Dose,$Regimen_Dose_Unit,$TR_Description,$match);
							$this->updateOrderStatusIn($TID,$TR_Drug_ID_Name,'TH CprsOrdered',$PID,'Line 435');
							/////trytihs							
							//$this->updateOrderStatus($TID,$TR_Drug_ID_Name,'TR',$PID);
							$this->valuecheck("".$match."End and Done");

					}
					//echo "Final RECT: ".$recct."";
					echo "Total Therapy Records".$recct." *** ";
				
			$queryDDnameq = "select DISTINCT tr.Drug_ID as TR_Drug_ID " .
			"FROM Master_Template as mt " .
			"INNER JOIN Template_Regimen tr ON tr.Template_ID = mt.Template_ID " .
			"WHERE Patient_ID = '$PID'";
			$queryDDname = $this->query($queryDDnameq);
			foreach($queryDDname as $row){
					
					$DDrecct = $DDrecct + 1;
					
					$TR_Drug_ID =  $row['TR_Drug_ID'];	
					$TR_Drug_ID_Name = $this->LookupNameIn($TR_Drug_ID);
					echo $TR_Drug_ID_Name;
					
					$queryCTDq = "select tr.Drug_ID as TR_Drug_ID " .
					"FROM Master_Template as mt " .
					"INNER JOIN Template_Regimen tr ON tr.Template_ID = mt.Template_ID " .
					"WHERE Patient_ID = '$PID' " .
					"AND Drug_ID = '$TR_Drug_ID' ";
					$queryCTD = $this->query($queryCTDq);
					$NumberofDoses = 0;
					foreach($queryCTD as $row){
					$NumberofDoses = $NumberofDoses + 1;
					}
				echo "NumberofDoses: ".$NumberofDoses."  |||| ";
				//yes, this one
					//NewOrderPatient($TR_Drug_ID_Name,$TR_Regimen_Dose,$Regimen_Dose_Unit,$TR_Description,$match,$NumberofDoses);
   
					}
			echo "DDrecct: ".$DDrecct."";
			
			
			
			//therapy if
			}
			elseif ($typeF === 'Pre Therapy' OR $typeF === 'Post Therapy'){
			$recct = 0;
			$DDrecct = 0;

			//org
			//$queryTIDsq = "select Template_ID as Template_ID, Patient_ID as Patient_ID, Regimen_ID as Regimen_ID from Master_Template WHERE Template_ID = '$TID'";
			
			$queryTIDsq = "select mt.Template_ID as TR_Template_ID, mt.Regimen_ID as MT_Regimen_ID, mt.Cancer_ID as MT_Cancer_ID, " .
			"mhi.Infusion_Amt as MHI_Infusion_Amt, mhi.Infusion_Type_ID as MHI_Infusion_Type_ID, mhi.Infusion_Unit_ID as MHI_Infusion_Unit_ID, " .
			"mhi.Fluid_Vol as MHI_Fluid_Vol, mhi.Flow_Rate as MHI_Flow_Rate, mt.Course_Number as MT_Course_Number, mt.Cycle_Length as MT_Cycle_Length, " .
			"mt.Cycle_Time_Frame_ID as MT_Cycle_Time_Framer_ID, mt.Total_Courses as MT_Total_Courses, mt.Admin_Day as TR_Admin_Day, " .
			"mt.Admin_Date as MT_Admin_Date, mh.Drug_ID as MH_Drug_ID, mh.Pre_Or_Post as MH_Pre_Or_Post, mh.Description as MH_Description, " .
			"mh.Admin_Day as MH_Admin_Day, mh.Admin_Time as MH_Admin_Time, mh.MH_ID as MH_ID, mhi.Infusion_Time as MHI_Infusion_Time, " .
			"mh.Sequence_Number as MH_Sequence_Number " .
			"FROM Master_Template as mt " .
			"INNER JOIN Medication_Hydration mh ON mh.Template_ID = mt.Template_ID " .
			"INNER JOIN MH_Infusion mhi ON mhi.MH_ID = mh.MH_ID " .
			"WHERE Patient_ID = '$PID' ";
			$queryTIDs = $this->query($queryTIDsq);
			//var_dump($queryTIDs);
			foreach($queryTIDs as $row){
			$recct = $recct + 1;
			$TID = $row['TR_Template_ID'];
			$RID = $row['MT_Regimen_ID'];
			
			//echo "Pre Therapy";
			//echo "PID".$PID." || ";
			//echo "TID".$TID." || ";
			//echo "RID".$RID." || ";


				
					$MH_Drug_ID =  $row['MH_Drug_ID'];
					$MH_ID = $row['MH_ID'];
					$MH_Pre_Or_Post = $row['MH_Pre_Or_Post'];
					$MH_Description = $row['MH_Description'];
					$MH_Flow_Rate = $row['MHI_Flow_Rate'];
					$MH_Admin_Day = $row['MH_Admin_Day'];
					$MH_Infusion_Time = $row['MHI_Infusion_Time'];
					$MH_Sequence_Number = $row['MH_Sequence_Number'];
					$MH_Fluid_Vol = $row['MHI_Fluid_Vol'];
					$MH_Admin_Time = $row['MH_Admin_Time'];
					$MHI_Infusion_Amt = $row['MHI_Infusion_Amt'];
					$MHI_Infusion_Type_ID = $row['MHI_Infusion_Type_ID'];
					$MHI_Infusion_Unit_ID = $row['MHI_Infusion_Unit_ID'];
					$MH_Drug_ID_Name = $this->LookupNameIn($MH_Drug_ID);
					$MHI_Infusion_Type_ID = $this->LookupNameIn($MHI_Infusion_Type_ID);
					$MHI_Infusion_Unit_ID_Name = $this->LookupNameIn($MHI_Infusion_Unit_ID);
					$MH_Description = $this->LookupDescriptionIn($MH_Drug_ID);
					
					
						$queryMHILKMHq = "select Infusion_Amt as MHICHK_Infusion_Amt " .
						"from MH_Infusion WHERE MH_ID ='$MH_ID'";
						$queryMHILKMH = $this->query($queryMHILKMHq);
						foreach($queryMHILKMH as $row){
							$MHI_MH_Dose = $row['MHICHK_Infusion_Amt'];
							}
					$OrderType = "MH ".$MH_Pre_Or_Post."";
					//yes, this one
							//NewOrderPatient($MH_Drug_ID_Name,$MHI_MH_Dose,$Regimen_Dose_Unit,$MH_Description,$match);
					$this->writeOrderDebug($match,$MH_Drug_ID_Name,$MH_ID,$MH_Pre_Or_Post,$MH_Description,$MH_Flow_Rate,$MH_Admin_Day,$MH_Infusion_Time,$MH_Sequence_Number,$MH_Fluid_Vol,$MH_Admin_Time);
					$this->updateOrderStatusIn($TID,$MH_Drug_ID_Name,$OrderType,$PID,'Line 539');
					$this->valuecheck("".$match."End and Done");
				
					
			}
			echo "Total Therapy Records".$recct." *** ";

			$queryDDnameq = "select DISTINCT mh.Drug_ID as MH_Drug_ID " .
			"FROM Master_Template as mt " .
			"INNER JOIN Medication_Hydration mh ON mh.Template_ID = mt.Template_ID " .
			"WHERE Patient_ID = '$PID'";
			$queryDDname = $this->query($queryDDnameq);
			foreach($queryDDname as $row){
					
					$DDrecct = $DDrecct + 1;
					
					$MH_Drug_ID =  $row['MH_Drug_ID'];	
					$MH_Drug_ID_Name = $this->LookupNameIn($MH_Drug_ID);
					echo $MH_Drug_ID_Name;
					
					$queryCTDq = "select mh.Drug_ID as MH_Drug_ID " .
					"FROM Master_Template as mt " .
					"INNER JOIN Medication_Hydration mh ON mh.Template_ID = mt.Template_ID " .
					"WHERE Patient_ID = '$PID' " .
					"AND Drug_ID = '$MH_Drug_ID' ";
					$queryCTD = $this->query($queryCTDq);
					$NumberofDoses = 0;
					foreach($queryCTD as $row){
					$NumberofDoses = $NumberofDoses + 1;
					}
				echo "NumberofDoses: ".$NumberofDoses."  |||| ";
				//yes, this one
							//NewOrderPatient($MH_Drug_ID_Name,$MHI_Infusion_Amt,$MHI_Infusion_Unit_ID_Name,$MH_Description,$match,$NumberofDoses);
   
					}
			echo "DDrecct: ".$DDrecct."";
			
			
			}
			////////end if and then else
			
			
			
			else{
			echo "nothing";
			}

	///////			
	//else of oral if			
	}else{
	//////
	//////////////////////
	/////Non Oral Begin
	/////////////////////
	if ($typeF === 'Therapy'){
		
	//echo "Non-Oral Therapy";	
		
	
	$queryTIDsq = "select Template_ID as Template_ID, Patient_ID as Patient_ID, Regimen_ID as Regimen_ID from Master_Template WHERE Template_ID = '$TID'";
	$queryTIDs = $this->query($queryTIDsq);
		foreach($queryTIDs as $row){
			$TID = $row['Template_ID'];
			$RID = $row['Regimen_ID'];
				$queryPIq = "select Match as Match from Patient WHERE Patient_ID ='$PID'";
				$queryPI = $this->query($queryPIq);
				foreach($queryPI as $row){
					$match =  $row['Match'];
					}
				if ($match != ''){
				$queryTRq = "select Patient_Regimen_ID as TR_Patient_Regimen_ID, Template_ID as TR_Template_ID, Drug_ID as TR_Drug_ID, Regimen_Number as TR_Regimen_Number, " .
				"Regimen_Dose as TR_Regimen_Dose, Regimen_Dose_Unit_ID as TR_Regimen_Dose_Unit_ID, Regimen_Dose_Pct as TR_Regimen_Dose_Pct, Regimen_Reason as TR_Regimen_Reason, " .
				"Patient_Dose as TR_Patient_Dose, Patient_Dose_Unit_ID as TR_Patient_Dose_Unit_ID, Route_ID as TR_Route_ID, Admin_Day as TR_Admin_Day, Infusion_Time as TR_Infusion_Time, " .
				"Fl_Vol_Unit_ID as TR_Fl_Vol_Unit_ID, Fl_Vol_Description as TR_Fl_Vol_Description, Date_Created as TR_Date_Created, Created_By as TR_Created_By, Flow_Rate as TR_Flow_Rate, " .
				"Instructions as TR_Instructions, Fluid_Vol as TR_Fluid_Vol, Sequence_Number as TR_Sequence_Number, Admin_Time as TR_Admin_Time, BSA_Dose as TR_BSA_Dose, " .
				"Fluid_Type as TR_Fluid_Type " .
				"from Template_Regimen " .
				"WHERE Template_ID ='$TID'";
				$queryTR = $this->query($queryTRq);
				foreach($queryTR as $row){
					$TR_Drug_ID =  $row['TR_Drug_ID'];
					$dose = $row['TR_Regimen_Dose'];
					$TR_Patient_Regimen_ID = $row['TR_Patient_Regimen_ID'];
					$TR_Template_ID = $row['TR_Template_ID'];
					$TR_Drug_ID = $row['TR_Drug_ID'];
					$TR_Regimen_Number = $row['TR_Regimen_Number'];
					$TR_Regimen_Dose = $row['TR_Regimen_Dose'];
					$TR_Regimen_Dose_Unit_ID = $row['TR_Regimen_Dose_Unit_ID'];
					$TR_Regimen_Dose_Pct = $row['TR_Regimen_Dose_Pct'];
					$TR_Regimen_Reason = $row['TR_Regimen_Reason'];
					$TR_Patient_Dose = $row['TR_Patient_Dose'];
					$TR_Patient_Dose_Unit_ID = $row['TR_Patient_Dose_Unit_ID'];
					$TR_Route_ID = $row['TR_Route_ID'];
					$TR_Admin_Day = $row['TR_Admin_Day'];
					$TR_Infusion_Time = $row['TR_Infusion_Time'];
					$TR_Fl_Vol_Unit_ID = $row['TR_Fl_Vol_Unit_ID'];
					$TR_Fl_Vol_Description = $row['TR_Fl_Vol_Description'];
					$TR_Date_Created = $row['TR_Date_Created'];
					$TR_Created_By = $row['TR_Created_By'];
					$TR_Flow_Rate = $row['TR_Flow_Rate'];
					$TR_Instructions = $row['TR_Instructions'];
					$TR_Created_By = $row['TR_Created_By'];
					$TR_Fluid_Vol = $row['TR_Fluid_Vol'];
					$TR_Sequence_Number = $row['TR_Sequence_Number'];
					$TR_Admin_Time = $row['TR_Admin_Time'];
					$TR_BSA_Dose = $row['TR_BSA_Dose'];
					$TR_Fluid_Type = $row['TR_Fluid_Type'];
						$TR_Drug_ID_Name = $this->LookupNameIn($TR_Drug_ID);
						$TR_Description = $this->LookupDescriptionIn($TR_Drug_ID);
							$Regimen_Dose_Unit = $this->LookupNameIn($TR_Regimen_Dose_Unit_ID);
							$TR_Route_ID_Name = $this->LookupNameIn($TR_Route_ID);
							//yes, this one
							//NewOrderPatient($TR_Drug_ID_Name,$TR_Regimen_Dose,$Regimen_Dose_Unit,$TR_Description,$match);
							$this->updateOrderStatusIn($TID,$TR_Drug_ID_Name,'TR',$PID,'Line 652');
							$this->valuecheck("".$match."End and Done");

					}
				//Medication_Hydration
				$queryMHq = "select Drug_ID as MH_Drug_ID, MH_ID as MH_ID, Pre_Or_Post as MH_Pre_Or_Post, Description as MH_Description, " .
				"Flow_Rate as MH_Flow_Rate, Admin_Day as MH_Admin_Day, Infusion_Time as MH_Infusion_Time, Sequence_Number as MH_Sequence_Number, " .
				"Fluid_Vol as MH_Fluid_Vol, Admin_Time as MH_Admin_Time ".
				"from Medication_Hydration WHERE Template_ID ='$TID'";
				$queryMH = $this->query($queryMHq);
				foreach($queryMH as $row){
					$MH_Drug_ID =  $row['MH_Drug_ID'];
					$MH_ID = $row['MH_ID'];
					$MH_Pre_Or_Post = $row['MH_Pre_Or_Post'];
					$MH_Description = $row['MH_Description'];
					$MH_Flow_Rate = $row['MH_Flow_Rate'];
					$MH_Admin_Day = $row['MH_Admin_Day'];
					$MH_Infusion_Time = $row['MH_Infusion_Time'];
					$MH_Sequence_Number = $row['MH_Sequence_Number'];
					$MH_Fluid_Vol = $row['MH_Fluid_Vol'];
					$MH_Admin_Time = $row['MH_Admin_Time'];
					$MH_Drug_ID_Name = $this->LookupNameIn($MH_Drug_ID);
					$MH_Description = $this->LookupDescriptionIn($MH_Drug_ID);
					
						$queryMHILKMHq = "select Infusion_Amt as MHICHK_Infusion_Amt " .
						"from MH_Infusion WHERE MH_ID ='$MH_ID'";
						$queryMHILKMH = $this->query($queryMHILKMHq);
						foreach($queryMHILKMH as $row){
							$MHI_MH_Dose = $row['MHICHK_Infusion_Amt'];
							}
					$OrderType = "MH ".$MH_Pre_Or_Post."";
					//yes, this one
							//NewOrderPatient($MH_Drug_ID_Name,$MHI_MH_Dose,$Regimen_Dose_Unit,$MH_Description,$match);
					$this->writeOrderDebug($match,$MH_Drug_ID_Name,$MH_ID,$MH_Pre_Or_Post,$MH_Description,$MH_Flow_Rate,$MH_Admin_Day,$MH_Infusion_Time,$MH_Sequence_Number,$MH_Fluid_Vol,$MH_Admin_Time);
					$this->updateOrderStatusIn($TID,$MH_Drug_ID_Name,$OrderType,$PID,'Line 686');
				
					
			}
			
			}else{
			
			echo "missing match";
			
			}
			
			}
			
			//therapy if
			}
			elseif ($typeF === 'Pre Therapy'){
			
			$queryTIDsq = "select Template_ID as Template_ID, Patient_ID as Patient_ID, Regimen_ID as Regimen_ID from Master_Template WHERE Template_ID = '$TID'";
			$queryTIDs = $this->query($queryTIDsq);
			foreach($queryTIDs as $row){
			$TID = $row['Template_ID'];
			$RID = $row['Regimen_ID'];
			
			//echo "Non Oral - Pre Therapy";
			//echo "PID".$PID." || ";
			//echo "TID".$TID." || ";
			//echo "RID".$RID." || ";
				$queryPIq = "select Match as Match from Patient WHERE Patient_ID ='$PID'";
				$queryPI = $this->query($queryPIq);
				foreach($queryPI as $row){
					$match =  $row['Match'];
					//echo "match: ".$match."";
					}
				if ($match != ''){
				
				//Medication_Hydration
				$queryMHq = "select Drug_ID as MH_Drug_ID, MH_ID as MH_ID, Pre_Or_Post as MH_Pre_Or_Post, Description as MH_Description, " .
				"Flow_Rate as MH_Flow_Rate, Admin_Day as MH_Admin_Day, Infusion_Time as MH_Infusion_Time, Sequence_Number as MH_Sequence_Number, " .
				"Fluid_Vol as MH_Fluid_Vol, Admin_Time as MH_Admin_Time ".
				"from Medication_Hydration WHERE Template_ID ='$TID'";
				$queryMH = $this->query($queryMHq);
				foreach($queryMH as $row){
					$MH_Drug_ID =  $row['MH_Drug_ID'];
					$MH_ID = $row['MH_ID'];
					$MH_Pre_Or_Post = $row['MH_Pre_Or_Post'];
					$MH_Description = $row['MH_Description'];
					$MH_Flow_Rate = $row['MH_Flow_Rate'];
					$MH_Admin_Day = $row['MH_Admin_Day'];
					$MH_Infusion_Time = $row['MH_Infusion_Time'];
					$MH_Sequence_Number = $row['MH_Sequence_Number'];
					$MH_Fluid_Vol = $row['MH_Fluid_Vol'];
					$MH_Admin_Time = $row['MH_Admin_Time'];
					$MH_Drug_ID_Name = $this->LookupNameIn($MH_Drug_ID);
					$MH_Description = $this->LookupDescriptionIn($MH_Drug_ID);
					
					
						$queryMHILKMHq = "select Infusion_Amt as MHICHK_Infusion_Amt " .
						"from MH_Infusion WHERE MH_ID ='$MH_ID'";
						$queryMHILKMH = $this->query($queryMHILKMHq);
						foreach($queryMHILKMH as $row){
							$MHI_MH_Dose = $row['MHICHK_Infusion_Amt'];
							}
					$OrderType = "MH ".$MH_Pre_Or_Post."";
					//NewOrderPatient($MH_Drug_ID_Name,$MHI_MH_Dose,$Regimen_Dose_Unit,$MH_Description,$match);
					$this->writeOrderDebug($match,$MH_Drug_ID_Name,$MH_ID,$MH_Pre_Or_Post,$MH_Description,$MH_Flow_Rate,$MH_Admin_Day,$MH_Infusion_Time,$MH_Sequence_Number,$MH_Fluid_Vol,$MH_Admin_Time);
					$this->updateOrderStatusIn($TID,$MH_Drug_ID_Name,$OrderType,$PID,'Line 751');
					$this->valuecheck("".$match."End and Done");
				
					
			}}
			
		else{
			
			echo "missing match";
			
			}
			
			}
			
			}elseif ($typeF === 'Post Therapy'){
			

			
			$queryTIDsq = "select Template_ID as Template_ID, Patient_ID as Patient_ID, Regimen_ID as Regimen_ID from Master_Template WHERE Template_ID = '$TID'";
			$queryTIDs = $this->query($queryTIDsq);
			foreach($queryTIDs as $row){
			$TID = $row['Template_ID'];
			$RID = $row['Regimen_ID'];
			
			//echo "NonOral - POST THERPY";
			//echo "PID".$PID." || ";
			//echo "TID".$TID." || ";
			//echo "RID".$RID." || ";
				$queryPIq = "select Match as Match from Patient WHERE Patient_ID ='$PID'";
				$queryPI = $this->query($queryPIq);
				foreach($queryPI as $row){
					$match =  $row['Match'];
					//echo "match: ".$match."";
					}
				if ($match != ''){
				
				//Medication_Hydration
				$queryMHq = "select Drug_ID as MH_Drug_ID, MH_ID as MH_ID, Pre_Or_Post as MH_Pre_Or_Post, Description as MH_Description, " .
				"Flow_Rate as MH_Flow_Rate, Admin_Day as MH_Admin_Day, Infusion_Time as MH_Infusion_Time, Sequence_Number as MH_Sequence_Number, " .
				"Fluid_Vol as MH_Fluid_Vol, Admin_Time as MH_Admin_Time ".
				"from Medication_Hydration WHERE Template_ID ='$TID'";
				$queryMH = $this->query($queryMHq);
				foreach($queryMH as $row){
					$MH_Drug_ID =  $row['MH_Drug_ID'];
					$MH_ID = $row['MH_ID'];
					$MH_Pre_Or_Post = $row['MH_Pre_Or_Post'];
					$MH_Description = $row['MH_Description'];
					$MH_Flow_Rate = $row['MH_Flow_Rate'];
					$MH_Admin_Day = $row['MH_Admin_Day'];
					$MH_Infusion_Time = $row['MH_Infusion_Time'];
					$MH_Sequence_Number = $row['MH_Sequence_Number'];
					$MH_Fluid_Vol = $row['MH_Fluid_Vol'];
					$MH_Admin_Time = $row['MH_Admin_Time'];
					$MH_Drug_ID_Name = $this->LookupNameIn($MH_Drug_ID);
					$MH_Description = $this->LookupDescriptionIn($MH_Drug_ID);
					
					
						$queryMHILKMHq = "select Infusion_Amt as MHICHK_Infusion_Amt " .
						"from MH_Infusion WHERE MH_ID ='$MH_ID'";
						$queryMHILKMH = $this->query($queryMHILKMHq);
						foreach($queryMHILKMH as $row){
							$MHI_MH_Dose = $row['MHICHK_Infusion_Amt'];
							}
					$OrderType = "MH ".$MH_Pre_Or_Post."";
					//yes, this one
							//NewOrderPatient($MH_Drug_ID_Name,$MHI_MH_Dose,$Regimen_Dose_Unit,$MH_Description,$match);
					$this->writeOrderDebug($match,$MH_Drug_ID_Name,$MH_ID,$MH_Pre_Or_Post,$MH_Description,$MH_Flow_Rate,$MH_Admin_Day,$MH_Infusion_Time,$MH_Sequence_Number,$MH_Fluid_Vol,$MH_Admin_Time);
					$this->updateOrderStatusIn($TID,$MH_Drug_ID_Name,$OrderType,$PID,'Line 818');
					$this->valuecheck("".$match."End and Done");
				
					
			}}
			
		else{
			
			echo "missing match";
			
			}
			
		}
			
	}
			////////end if and then else
			
			
			
			else{
			echo "nothing";
			}


////
	}
			
}


	



	

	
	function writeOrderDebug($match,$MH_Drug_ID,$MH_ID,$MH_Pre_Or_Post,$MH_Description,$MH_Flow_Rate,$MH_Admin_Day,$MH_Infusion_Time,$MH_Sequence_Number,$MH_Fluid_Vol,$MH_Admin_Time){
	//$timeset = date(His);
	$tmatch = trim($match);
	//$myFile = "SSHDebug\writeOrderDebug+".$tmatch."+".$MH_Drug_ID."+".$MH_ID."+".$timeset.".txt";
	$myFile = "SSHDebug\writeOrderDebug+".$tmatch."+".$MH_Drug_ID."+".$MH_ID.".txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, " ".$MH_Drug_ID." ||| ");
	fwrite($fh, " ".$MH_ID." ||| ");
	fwrite($fh, " ".$MH_Pre_Or_Post." ||| ");
	fwrite($fh, " ".$MH_Description." ||| ");
	fwrite($fh, " ".$MH_Flow_Rate." ||| ");
	fwrite($fh, " ".$MH_Admin_Day." ||| ");
	fwrite($fh, " ".$MH_Infusion_Time." ||| ");
	fwrite($fh, " ".$MH_Sequence_Number." ||| ");
	fwrite($fh, " ".$MH_Fluid_Vol." ||| ");
	fclose($fh);
	}
	
	function valuecheck($value){
	$myFile = "SSHDebug\SSHDebug+".$value.".txt";
	$fh = fopen($myFile, 'w') or die("can't open file");
	fwrite($fh, "Value:  ".$value."  ");
	fclose($fh);
	}
}

?>
