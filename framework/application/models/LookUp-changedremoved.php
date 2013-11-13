<?php

class LookUp extends Model {

    function save($id, $name, $description) {

        $name = str_replace("'","''",$name);
        $description = str_replace("'","''",$description);

        $query = "Select Lookup_ID as lookupid from LookUp where Lookup_Type = '" . $id . "' and Name ='" . $name . "' and Description ='" . $description . "'";
        $exists = $this->query($query);

        if ($exists) {
            $query = "Select null as lookupid, Lookup_ID as actualLookupId from LookUp where Lookup_Type = '" . $id . "' and Name ='" . $name . "' and Description ='" . $description . "'";
            return $this->query($query);
        }

        $query = "INSERT into LookUp (Lookup_Type, Name, Description) values (" . $id . ",'" . $name . "','" . $description . "')";
        $this->query($query);

        $query = "Select Lookup_ID as lookupid from LookUp where Lookup_Type = '" . $id . "' and Name ='" . $name . "' and Description ='" . $description . "'";

        return $this->query($query);
    }

    function deleteTemplate($id,$force){
        
        $query = "SELECT Regimen_ID as regid from Master_Template where Template_ID = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        }
        
        $regid = $retVal[0]['regid'];

        $query = "select Template_ID as id from Master_Template where Regimen_ID = '".$regid."'";

        $templateid = $this->query($query);

        if('true' == $force){
            for ($index = 0; $index < count($templateid); $index++) {
                $retVal = $this->innerDeleteTemplate($templateid[$index]['id'], $force,$regid);
            }
        }else{
            $retVal = $this->innerDeleteTemplate($id, $force,$regid);
        }
        
        if(('false' == $force && !isset($retVal['apperror']) && count($retVal) == 1) || 'true' == $force){
            $query = "delete from LookUp where Lookup_Type = 4 and Lookup_ID = '" .$regid."'";

            $retVal = $this->query($query);

            if (null != $retVal && array_key_exists('error', $retVal)) {
                $retVal['tablename'] = 'LookUp for Lookup_Type = 4';            
                return $retVal;
            }
            
        }

        return $retVal;
        
    }
    
    
    function innerDeleteTemplate($id,$force,$regid){
        
        
        if('false' == $force){
        
            $query = "SELECT Patient_ID as patientid from Patient_Assigned_Templates where Template_ID = '" .$id."'";

            $retVal = $this->query($query);

            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }else if(null != $retVal && $retVal[0]['patientid']){
                $retVal['apperror'] = "This template is currently applied to a patient.";
                return $retVal;
            }
            
        }else{
            
            $query = "Delete from Patient_Assigned_Templates where Template_ID = '" .$id."'";
            $retVal = $this->query($query);

            if (null != $retVal && array_key_exists('error', $retVal)) {
                $retVal['tablename'] = 'Patient_Assigned_Templates';
                return $retVal;
            }
            
        }
        
        $query = "DELETE from Template_Regimen where Template_ID = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'Template_Regimen';
            return $retVal;
        }
        
        $query = "SELECT MH_ID as mhid from Medication_Hydration where Template_ID = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        }
        
        foreach ($retVal as $value) {
            $mhid = $value['mhid'];
            
            $query = "DELETE from MH_Infusion where MH_ID = '" .$mhid."'";

            $retVal = $this->query($query);

            if (null != $retVal && array_key_exists('error', $retVal)) {
                $retVal['tablename'] = 'MH_Infusion';
                return $retVal;
            }
            
        }
        
        $query = "DELETE from Medication_Hydration where Template_ID = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'Medication_Hydration';
            return $retVal;
        }

        $query = "DELETE from LookUp where Lookup_Type = 25 and Name = '".$regid."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'LookUp for Lookup_Type = 25';
            return $retVal;
        }

        $query = "DELETE from LookUp where Lookup_Type = 21 and Name = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'LookUp for Lookup_Type = 21';
            return $retVal;
        }
        
        $query = "SELECT Name from LookUp l1 where l1.Lookup_Type = 4 and l1.Lookup_ID = '".$regid."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        }
        
        $regname = $retVal[0]['Name'];
        

        $query = "DELETE from LookUp where Lookup_Type = 19 and Name = '".$regname."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'LookUp for Lookup_Type = 19';
            return $retVal;
        }
        

        $query = "DELETE from Master_Template where Template_ID = '" .$id."'";
        
        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'Master_Template';
            return $retVal;
        }
        
        $query = "select * from LookUp where Lookup_Type = 4 and Lookup_ID = '" .$regid."'";

        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            $retVal['tablename'] = 'LookUp for Lookup_Type = 4';            
            return $retVal;
        }
        
        return $retVal;
    }
    
    
    
    function saveTemplate($form_data, $regimenid) {

        $cancerId = $form_data->{'Disease'};
        $diseaseStage = $form_data->{'DiseaseStage'};
        $cyclelength = $form_data->{'CycleLength'};
        $cyclelengthUnit = $form_data->{'CycleLengthUnit'};
//        $cyclelengthUnit = $cyclelengthUnit->{'id'};
        $emotegnicLevel = $form_data->{'ELevel'};
//        $emotegnicLevel = $emotegnicLevel->{'id'};
        $fibroneutrorisk = $form_data->{'FNRisk'};
        $postMHInstructions = $form_data->{'PostMHInstructions'};
        $preMHInstructions = $form_data->{'PreMHInstructions'};
        $regimenInstruction = $form_data->{'RegimenInstruction'};
        //$courseNum = $form_data->{'CourseNum'};
        $courseNumMax = $form_data->{'CourseNumMax'};
        
        $preMHInstructions = str_replace("'","''",$preMHInstructions);
        $postMHInstructions = str_replace("'","''",$postMHInstructions);
        $regimenInstruction = str_replace("'","''",$regimenInstruction);

        $cycle = null;

        if(isset($form_data->{'Cycle'})){
            $cycle = $form_data->{'Cycle'};
        }

        $locationId = $this->getLookupIdByNameAndType('My Templates', 22);
        if ($locationId) {
            $locationId = $locationId[0]["id"];
        } else {
            $locationId = "###";
        }
//        $emotegenicId = $this->getLookupIdByNameAndType($emotegnicLevel,13);
//        if($emotegenicId){
//            $emotegenicId = $emotegenicId[0]["id"];
//        }else{
//            $emotegenicId = "###";
//        }
        
		$userId = $_SESSION['Role_ID'];
		
		//$userId = $this->getLookupIdByNameAndType('Kevin', 24);
        //if ($userId) {
        //    $userId = $userId[0]["id"];
        //} else {
        //    $userId = "###";
        //}
		
		
        //$cyclelengthUnit = $this->getLookupIdByNameAndType($name, $type)
		
    	if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "Select CONVERT(VARCHAR,GETDATE(),121) as currdate";
    	} else if (DB_TYPE == 'mysql') {
            $query = "Select NOW() as currdate";    	
    	}

        $currDate = $this->query($query);
        $currDate = $currDate[0]['currdate'];
        
        if($cycle){
            $adminDay = $form_data->{'AdminDay'};
            $adminDate = $form_data->{'AdminDate'};
            $patientId = $form_data->{'PatientID'};
            
	    $query = "SELECT Template_ID as lookupid from Master_Template mt where mt.Regimen_ID = '" . $regimenid . 
                     "' and Course_Number = '".$cycle."' and Admin_Day = '".$adminDay."' and Admin_Date = '" .$adminDate."' ".
                     "and Patient_ID = '".$patientId."'";
            
            $retVal = $this->query($query);
            
            if($retVal){
                return $retVal;
            }
            
        }
        

        if($diseaseStage){
            if(DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql'){            
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Disease_Stage_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction,Date_Created) values " .
                        "('" . $regimenid . "','" . $cancerId . "','" . $diseaseStage . "','" . $locationId . "',1,1,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$currDate."')";
						
            }else if(DB_TYPE == 'mysql'){
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Disease_Stage_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction,Date_Created) values " .
                        "('" . $regimenid . "','" . $cancerId . "','" . $diseaseStage . "','" . $locationId . "',1,true,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$currDate."')";
						
            }
        } else if($cycle) {
            $adminDay = $form_data->{'AdminDay'};
            $adminDate = $form_data->{'AdminDate'};
            $patientId = $form_data->{'PatientID'};

            if(DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql'){            
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction, Admin_Day, Admin_Date, Course_Number,Date_Created,Patient_ID) values " .
                        "('" . $regimenid . "','" . $cancerId . "','". $locationId . "',1,0,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$adminDay."','".$adminDate."','".$cycle."','".$currDate."','".$patientId."')";
						
            }else if(DB_TYPE == 'mysql'){
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction, Admin_Day, Admin_Date, Course_Number,Date_Created,Patient_ID) values " .
                        "('" . $regimenid . "','" . $cancerId . "','". $locationId . "',1,false,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$adminDay."','".$adminDate."','".$cycle."','".$currDate."','".$patientId."')";
            }
        } else {
            
            if(DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql'){            
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction,Date_Created) values " .
                        "('" . $regimenid . "','" . $cancerId . "','". $locationId . "',1,1,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$currDate."')";
            }else if(DB_TYPE == 'mysql'){
                $query = "INSERT into Master_Template(Regimen_ID, Cancer_ID, Location_ID, Version, Is_Active, Cycle_Length, " .
                        "Cycle_Time_Frame_ID, Emotegenic_ID, Febrile_Neutropenia_Risk, Pre_MH_Instructions, Post_MH_Instructions, Created_By, " .
                        "Total_Courses, Regimen_Instruction,Date_Created) values " .
                        "('" . $regimenid . "','" . $cancerId . "','". $locationId . "',1,true,'" . $cyclelength . "','" . $cyclelengthUnit . "'," .
                        "'" . $emotegnicLevel . "','" . $fibroneutrorisk . "','" . $preMHInstructions . "','" . $postMHInstructions . "','" . $userId .
                        "'," . $courseNumMax . ",'" . $regimenInstruction . "','".$currDate."')";
						
            }
        }

		

        $retVal = $this->query($query);

        if (null != $retVal && array_key_exists('error', $retVal)) {
            return $retVal;
        }

        if($cycle){
	    $query = "SELECT Template_ID as lookupid from Master_Template mt where mt.Regimen_ID = '" . $regimenid . "' and Date_Created = '".$currDate."'";
        }else{
            $query = "SELECT Template_ID as lookupid from Master_Template mt where mt.Regimen_ID = '" . $regimenid . "' and Version = 1 ".
                     "and Course_Number = 0";
        }
        
        return $this->query($query);
		
		
    }

    function saveTemplateReferences($references, $templateid) {

        for ($index = 0; $index < count($references); $index++) {

            $referencedata = $references[$index]->{'data'};

            $this->save(21, $templateid, $referencedata->{'RefID'});
        }
    }

    //function saveRegimen($drugregimen, $templateid, $Order_IDR) {
    function saveRegimen($drugregimen, $templateid) {

        for ($index = 0; $index < count($drugregimen); $index++) {

            $regimen = $drugregimen[$index]->{'data'};

            $drugid = null;
            
            if(isset($regimen->{'drugid'})){
                $drugid = $regimen->{'drugid'};
            }
            
            if(!$drugid){
                
                $drugName = $regimen->{'Drug'};
                
                $tmpDrug = $this->getLookupIdByNameAndType($drugName, 2);
                
                if ($tmpDrug) {
                    $drugid = $tmpDrug[0]["id"];
                } else {
                    $drugid = null;
                }
                if (null == $drugid) {
                    
                    $drugid = $this->getLookupIdByNameAndType($drugName, 26);

                    if ($drugid) {
                        $drugid = $drugid[0]["id"];
                    }
                }
            }
       
            if(null == $drugid){
                $retVal = array(); 
                $retVal['error'] = "The drug id could not be determined.";
                return $retVal;

            }
            
            $regimenDose = $regimen->{'Amt'};

            $doseUnit = $regimen->{'Units'};
            $unitid = $this->getLookupIdByNameAndType($doseUnit, 11);
            if ($unitid) {
                $unitid = $unitid[0]["id"];
            } else {
                $unitid = null;
            }
            
            if(null == $unitid){
                $retVal = array(); 
                $retVal['error'] = "The unit id could not be determined.";
                return $retVal;

            }

            $route = $regimen->{'Route'};
            $routeId = $this->getLookupIdByNameAndType($route, 12);
            if ($routeId) {
                $routeId = $routeId[0]["id"];
            } else {
                $routeId = null;
            }

            if(null == $routeId){
                $retVal = array(); 
                $retVal['error'] = "The Route id could not be determined.";
                return $retVal;

            }
            
            $adminday = $regimen->{'Day'};
            $infusiontime = $regimen->{'InfusionTime'};
            $fluidVol = $regimen->{'FluidVol'};
            $flowRate = $regimen->{'FlowRate'};
            $instruction = $regimen->{'Instructions'};
            $sequence = $regimen->{'Sequence'};
            $adminTime = $regimen->{'AdminTime'};
            $fluidType = $regimen->{'FluidType'};
			
			//precommentout - need
			//if ($Order_IDR === ''){
			//$Order_IDR = '00000000-0000-0000-0000-000000000000';
			//}
			
			
			//leavecommented unless
			//var_dump($Order_IDR);
			//if ($Order_IDR === null){
			//if ($Order_IDR = ''){
			//$Order_IDR = '00000000-0000-0000-0000-000000000000';
			//}
            
            $instruction = str_replace("'","''",$instruction);

            $query = "INSERT into Template_Regimen (Template_ID, Drug_ID, Regimen_Dose, Regimen_Dose_Unit_ID, Route_ID, " .
                    //"Admin_Day, Infusion_Time, Fluid_Vol, Flow_Rate, Instructions, Sequence_Number, Admin_Time, Fluid_Type, Order_ID) values " .
                    "Admin_Day, Infusion_Time, Fluid_Vol, Flow_Rate, Instructions, Sequence_Number, Admin_Time, Fluid_Type) values " .
                    "('" . $templateid . "','" . $drugid . "'," . $regimenDose . ",'" . $unitid . "','" . $routeId . "','" . $adminday . "','" . $infusiontime . "','" . $fluidVol .
                    //"','" . $flowRate . "','" . $instruction . "',".$sequence.",'".$adminTime."','" .$fluidType . "','".$Order_IDR."')";
                    "','" . $flowRate . "','" . $instruction . "',".$sequence.",'".$adminTime."','" .$fluidType . "')";

            $retVal = $this->query($query);

			

            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }
			
			
        }

		

        return null;
    }

    function saveExtraFields($regimenname, $cyclelength) {

        if ($cyclelength) {
            $query = "INSERT into LookUp(Lookup_Type, Name, Description) values " .
                    "(20,'" . $regimenname . "'," . $cyclelength . ")";
        } else {

            $query = "select l.Description as description from LookUp l where l.Lookup_Type_ID = 20";

            $description = $this->query($query);

            $query = "INSERT into LookUp(Lookup_Type, Name, Description) values " .
                    "(20,'" . $regimenname . "','" . $description[0]["description"] . "')";
        }

        $this->query($query);

        $query = "select l.Description as description from LookUp l where l.Lookup_Type_ID = 19";

        $description = $this->query($query);

        $query = "INSERT into LookUp(Lookup_Type, Name, Description) values " .
                "(19,'" . $regimenname . "','" . $description[0]["description"] . "')";

        $this->query($query);
    }

    function saveHydrations($hydrations, $type, $templateid) {

        for ($index = 0; $index < count($hydrations); $index++) {

            $hydration = $hydrations[$index]->{'data'};

            if(isset($hydration->{'drugid'})){
                $drugid = $hydration->{'drugid'};
            }
            
            if($drugid){
                $drugName = $drugid;
                $tmpDrug = $this->getLookupIdByNameAndType($drugName, 2);
                
                if ($tmpDrug) {
                    $drugid = $tmpDrug[0]["id"];
                } else {
                    $drugid = null;
                }
                
                if (null == $drugid) {
                    $drugid = $this->getLookupIdByNameAndType($drugName, 26);

                    if ($drugid) {
                        $drugid = $drugid[0]["id"];
                    }
                }
            }
            
            if(null == $drugid){
                $retVal = array(); 
                $retVal['error'] = "Insert into Medication_Hydration for " .$type." Therapy failed. The drug id could not be determined.";
                return $retVal;

            }
            
            $description = $hydration->{'description'};

//            $fluidVol = $hydration->{'fluidVol'};
//            $flowRate = $hydration->{'flowRate'};
//            $infusionTime = $hydration->{'infusionTime'};
            $adminDay = $hydration->{'adminDay'};
            $sequenceNumber = $hydration->{'sequence'};
            $adminTime = $hydration->{'adminTime'};
			
			///Bug not being set, sic, 6/14
            //$Order_IDR = $hydration->{'Order_IDR'};
			
			//keepuncommented pre
			//if ($Order_IDR === NULL){
			//$Order_IDR = '00000000-0000-0000-0000-000000000000';
			//}
            
            
            $description = str_replace("'","''",$description);

//            $query = "INSERT into Medication_Hydration(Drug_ID, Template_ID, Pre_Or_Post, Description, Fluid_Vol, Flow_Rate, " .
//                    "Admin_Day, Infusion_Time, Sequence_Number, Admin_Time) values " .
//                    "('" . $drugid . "','" . $templateid . "','" . $type . "','" . $description . "','" . $fluidVol . "','" . $flowRate . "','" . $adminDay .
//                    "','" . $infusionTime . "'," . $sequenceNumber . ",'".$adminTime."')";

            $query = "INSERT into Medication_Hydration(Drug_ID, Template_ID, Pre_Or_Post, Description, " .
                    //"Admin_Day, Sequence_Number, Admin_Time, Order_ID) values " .
                    "Admin_Day, Sequence_Number, Admin_Time) values " .
                    "('" . $drugid . "','" . $templateid . "','" . $type . "','" . $description . "','" . $adminDay .
                    //"'," . $sequenceNumber . ",'".$adminTime."','".$Order_IDR."')";
                    "'," . $sequenceNumber . ",'".$adminTime."')";
            
            $retVal = $this->query($query);

            if (null != $retVal && array_key_exists('error', $retVal)) {
                return $retVal;
            }

            $query = "Select MH_ID as mhid from Medication_Hydration where Drug_ID = '" . $drugid . "' and Template_ID = '" . $templateid . "' " .
                    "and Pre_Or_Post = '" . $type . "' and Description = '" . $description . "' and Sequence_Number = '".$sequenceNumber."'";

            $mhid = $this->query($query);

            if (count($mhid) > 0) {

                $mhid = $mhid[0]["mhid"];

                $infusions = $hydration->{'infusions'};

                for ($i = 0; $i < count($infusions); $i++) {

                    $infusionData = $infusions[$i]->{'data'};

                    if(count($infusionData)>1){
                        $unit = $infusionData['unit'];
                    }else{
                        $unit = $infusionData->{'unit'};
                    }

                    $unitid = $this->getLookupIdByNameAndType($unit, 11);

                    if ($unitid) {
                        $unitid = $unitid[0]["id"];
                    } else {
                        $unitid = null;
                    }

                    if(null == $unitid){
                        $retVal = array(); 
                        $retVal['error'] = "Insert int MH_ID for " .$type." Therapy failed. The unit id could not be determined.";
                        return $retVal;

                    }
                    
                    if(count($infusionData)>1){
                        $unitType = $infusionData['type'];
                    }else{
                        $unitType = $infusionData->{'type'};
                    }

                    $unitTypeid = $this->getLookupIdByNameAndType($unitType, 12);

                    if ($unitTypeid) {
                        $unitTypeid = $unitTypeid[0]["id"];
                    } else {
                        $unitTypeid = null;
                    }

                    if(null == $unitTypeid){
                        $retVal = array(); 
                        $retVal['error'] = "Insert int MH_ID for " .$type." Therapy failed. The Route could not be determined.";
                        return $retVal;

                    }
                    
                    if(count($infusionData)>1){
                        $amt = $infusionData['amt'];
                        $fluidVol = $infusionData['fluidVol'];
                        $flowRate = $infusionData['flowRate'];
                        $fluidType = $infusionData['fluidType'];
                        $infusionTime = $infusionData['infusionTime'];
                    }else{
                        $amt = $infusionData->{'amt'};
                        $fluidVol = $infusionData->{'fluidVol'};
                        $flowRate = $infusionData->{'flowRate'};
                        $fluidType = $infusionData->{'fluidType'};
                        $infusionTime = $infusionData->{'infusionTime'};
                    }

                    
                    $query = "INSERT into MH_Infusion(MH_ID, Infusion_Unit_ID, Infusion_Type_ID, Infusion_Amt, Fluid_Vol, Flow_Rate, Infusion_Time, Fluid_Type, Order_ID) values " .
                            //"('" . $mhid . "','" . $unitid . "','" . $unitTypeid . "','" . $amt . "','" . $fluidVol . "','" . $flowRate . "','" .$infusionTime ."','".$fluidType."','".$Order_IDR."')";
                            "('" . $mhid . "','" . $unitid . "','" . $unitTypeid . "','" . $amt . "','" . $fluidVol . "','" . $flowRate . "','" .$infusionTime ."','".$fluidType."')";

                    $retVal = $this->query($query);

                    if (null != $retVal && array_key_exists('error', $retVal)) {
                        return $retVal;
                    }
                }
            }
        }

        return null;
    }

    function update($id, $lookupid, $name, $description) {

        $query = "Select Lookup_ID as lookupid from LookUp where Lookup_Type = '" . $id . "' and Name ='" . $name . "' and Description ='" . $description . "'";
        $exists = $this->query($query);

        if ($exists) {
            $query = "Select null as lookupid from LookUp where Lookup_Type = '" . $id . "' and Name ='" . $name . "' and Description ='" . $description . "'";
            return $this->query($query);
        }

        $query = "UPDATE LookUp SET Name ='" . $name . "', Description = '" . $description . "' " .
                "WHERE Lookup_ID = '" . $lookupid . "'";
        $this->query($query);

        $query = "Select Lookup_ID as lookupid from LookUp where Lookup_ID = '" . $lookupid . "'";

        return $this->query($query);
    }

    function delete($lookupid, $name, $description) {

        $query = "DELETE FROM LookUp where Lookup_ID = '" . $lookupid . "'";

        return $this->query($query);
    }

    function getTopLevelTemplateDataById($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select mt.Template_ID as id, lu.Description as name, mt.Cycle_Length as length, mt.Emotegenic_ID as emoID, l2.Name as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk, " .
                    "mt.Pre_MH_Instructions preMHInstruct, mt.Post_MH_Instructions postMHInstruct, mt.Cycle_Time_Frame_ID as CycleLengthUnitID, l1.Name as CycleLengthUnit, " .
                    "mt.Cancer_ID as Disease, mt.Disease_Stage_ID as DiseaseStage, mt.Regimen_ID RegimenId, mt.Version as version, ".
                    "case when l3.Name is not null then l3.Name else '' end as DiseaseStageName, mt.Course_Number as CourseNum, mt.Total_Courses as CourseNumMax, mt.Regimen_Instruction as regimenInstruction " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID ".
                    "LEFT OUTER JOIN LookUp l3 ON l3.Lookup_ID = mt.Disease_Stage_ID " .
                    "where mt.Template_ID = '" . $id . "'";
        } else if (DB_TYPE == 'mysql') {

            $query = "select mt.Template_ID as id, lu.Description as name, mt.Cycle_Length as length, mt.Emotegenic_ID as emoID, l2.`Name` as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk, " .
                    "mt.Pre_MH_Instructions preMHInstruct, mt.Post_MH_Instructions postMHInstruct, mt.Cycle_Time_Frame_ID as CycleLengthUnitID, l1.`Name` as CycleLengthUnit, " .
                    "mt.Cancer_ID as Disease, mt.Disease_Stage_ID as DiseaseStage, mt.Regimen_ID as RegimenId, mt.Version as version, ".
                    "case when l3.`Name` is not null then l3.`Name` else '' end as DiseaseStageName, mt.Course_Number as CourseNum, mt.Total_Courses as CourseNumMax, mt.Regimen_Instruction as regimenInstruction " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID ".
                    "LEFT OUTER JOIN LookUp l3 ON l3.Lookup_ID = mt.Disease_Stage_ID " .
                    "where mt.Template_ID = '" . $id . "'";
        }

        return $this->query($query);
    }

    function selectAll() {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT ID=Lookup_Type_ID, Name, type=Lookup_Type, description=Description FROM " . $this->_table . " WHERE Lookup_Type = 0";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT Lookup_Type_ID as ID, Name, Lookup_Type as type, Description as description FROM " . $this->_table . " WHERE Lookup_Type = 0";
        }
        return $this->query($query);
    }

    function selectByName($name) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT ID=Lookup_ID, Name, type=Lookup_Type, description=Description FROM LookUp WHERE Lookup_Type = ( 
                        SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT Lookup_ID as ID, Name, Lookup_Type as type, Description as description FROM LookUp WHERE Lookup_Type = ( 
                        SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')";
        }


        return $this->query($query);
    }

    function getDataForJson($name) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT id=Lookup_ID, type=Lookup_Type, Name, Description FROM LookUp WHERE Lookup_Type = ( 
                        SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "') ".
                     "ORDER BY Description";
        } else if (DB_TYPE == 'mysql') {
            $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description FROM LookUp WHERE Lookup_Type = ( 
                        SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')";
        }

        return $this->query($query);
    }

    function getTemplates($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select lu.Name as name, mt.Template_ID as id, mt.Regimen_ID as regimenId, lu.Lookup_Type as type, " .
                    "case when l3.Name is not null then l3.Description else lu.Description end as description, " .
                    "mt.Cycle_Length as length, l1.Name as unit, mt.Total_Courses as totnum, mt.Course_Number as coursenum, mt.Version as version, " .
                    "l2.Name as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID " .
                    "LEFT OUTER JOIN LookUp l3 ON l3.Name = convert(nvarchar(max),mt.Regimen_ID)";
            
            if (NULL != $id) {

                $query .= " WHERE mt.Template_ID = '" . $id . "' and Is_Active = 1";

            }else{

                $query .= " WHERE Is_Active = 1";
            }
        } else if (DB_TYPE == 'mysql') {

            $query = "select lu.`Name` as name, mt.Template_ID as id, mt.Regimen_ID as regimenId, lu.Lookup_Type as type, " .
                    "case when l3.`Name` is not null then l3.Description else lu.Description end as description, " .
                    "mt.Cycle_Length as length, l1.`Name` as unit, mt.Total_Courses as totnum, mt.Course_Number as coursenum, mt.Version as version, " .
                    "l2.`Name` as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID " .
                    "LEFT OUTER JOIN LookUp l3 ON l3.Name = mt.Regimen_ID";
            
            if (NULL != $id) {

                $query .= " WHERE mt.Template_ID = '" . $id . "' and Is_Active = true";

            }else{

                $query .= " WHERE Is_Active = true";
            }
        }

        return $this->query($query);
    }

    function getTemplatesByType($field, $id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select lu.Name as name, mt.Template_ID as id, mt.Regimen_ID as regimenId, lu.Lookup_Type as type, " .
                    "case when l3.Name is not null then l3.Description else lu.Description end as description, " .
                    "mt.Cycle_Length as length, l1.Name as unit, mt.Total_Courses as totnum, mt.Course_Number as coursenum, mt.Version as version, " .
                    "l2.Name as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID " .
                    "LEFT OUTER JOIN LookUp l3 ON l3.Name = convert(nvarchar(max),mt.Regimen_ID)";

            if ($field != NULL && strtoupper($field) == 'CANCER') {
                $query .= "WHERE mt.Cancer_ID = '" . $id . "' and Is_Active = 1";
            } else if ($field != NULL && strtoupper($field) == 'PATIENT') {
                $query .= "INNER JOIN Patient_Assigned_Templates pat ON pat.Template_ID = mt.Template_ID " .
                        "WHERE pat.Patient_ID = '" . $id . "' and pat.Is_Active = 1";
            }else{
                $query .= "WHERE Is_Active = 1";
            }
        } else if (DB_TYPE == 'mysql') {

            $query = "select lu.`Name` as name, mt.Template_ID as id, mt.Regimen_ID as regimenId, lu.Lookup_Type as type, " .
                    "case when l3.`Name` is not null then l3.Description else lu.Description end as description, " .
                    "mt.Cycle_Length as length, l1.`Name` as unit, mt.Total_Courses as totnum, mt.Course_Number as coursenum, mt.Version as version, " .
                    "l2.`Name` as emoLevel, mt.Febrile_Neutropenia_Risk as fnRisk " .
                    "from Master_Template mt " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID " .
                    "LEFT OUTER JOIN LookUp l3 ON l3.Name = mt.Regimen_ID ";

            if ($field != NULL && strtoupper($field) == 'CANCER') {
                $query .= "WHERE mt.Cancer_ID = '" . $id . "' and Is_Active = true";
            } else if ($field != NULL && strtoupper($field) == 'PATIENT') {

                $query .= "INNER JOIN Patient_Assigned_Templates pat ON pat.Template_ID = mt.Template_ID " .
                        "WHERE pat.Patient_ID = '" . $id . "' And pat.Is_Active = true";
            }else{
               $query .= "WHERE Is_Active = true";
            }
        }

        return $this->query($query);
    }

    function getTemplateReferences($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select lu.Name as name, lu.Description as description, lu.Lookup_ID as id " .
                    "FROM LookUp lu where lu.Lookup_ID in (" .
                    "select l1.Description from LookUp l1 where l1.Name = '" . $id . "')";
        } else if (DB_TYPE == 'mysql') {


            $query = "select lu.`Name` as name, lu.`Description` as description, lu.`Lookup_ID` as id " .
                    "FROM LookUp lu where lu.`Lookup_ID` in (" .
                    "select l1.`Description` from LookUp l1 where l1.`Name` = '" . $id . "')";
        }

        return $this->query($query);
    }

    function getDiseaseStages($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select Lookup_ID as ID, Name as value " .
                    "FROM LookUp where Description = '" . $id . "' and Lookup_Type = 23";
        } else if (DB_TYPE == 'mysql') {

            $query = "select Lookup_ID as ID, `Name` as value " .
                    "FROM LookUp where Description = '" . $id . "' and Lookup_Type = 23";
        }

        return $this->query($query);
    }

    function getRegimens($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select tr.Patient_Regimen_ID as id, tr.Regimen_Number as regnumber, l.Name as drug, tr.Regimen_Dose as regdose, " .
                    "l1.Name as regdoseunit, tr.Regimen_Dose_Pct as regdosepct, tr.Regimen_Reason as regreason, tr.Patient_Dose as patientdose, " .
                    "l2.Name as patientdoseunit, l3.Name as route, tr.Admin_Day as adminDay, tr.Fluid_Vol as flvol, " .
                    "l4.Name as flunit, tr.Infusion_Time as infusion, tr.Flow_rate as flowRate, tr.Instructions as instructions, " .
                    "tr.Sequence_Number as sequence, tr.Admin_Time as adminTime, tr.Drug_ID as drugid, ".
                    "tr.BSA_Dose as bsaDose, tr.Fluid_Type as fluidType, tr.T_Type as type, tr.Order_ID as Order_ID ".                    
                    "from Template_Regimen tr " .
                    "LEFT JOIN LookUp l ON tr.Drug_ID = l.Lookup_ID " .
                    "LEFT JOIN LookUp l1 ON tr.Regimen_Dose_Unit_ID = l1.Lookup_ID " .
                    "LEFT JOIN LookUp l2 ON tr.Patient_Dose_Unit_ID = l2.Lookup_ID " .
                    "LEFT JOIN LookUp l3 ON tr.Route_ID = l3.Lookup_ID " .
                    "LEFT JOIN LookUp l4 ON tr.Fl_Vol_Unit_ID = l4.Lookup_ID " .
                    "where tr.Template_ID = '" . $id . "' order by Sequence_Number";
        } else if (DB_TYPE == 'mysql') {

            $query = "select tr.Patient_Regimen_ID as id, tr.Regimen_Number as regnumber, l.`Name` as drug, tr.Regimen_Dose as regdose, " .
                    "l1.`Name` as regdoseunit, tr.Regimen_Dose_Pct as regdosepct, tr.Regimen_Reason as regreason, tr.Patient_Dose as patientdose, " .
                    "l2.`Name` as patientdoseunit, l3.`Name` as route, tr.Admin_Day as adminDay, tr.Fluid_Vol as flvol, " .
                    "l4.`Name` as flunit, tr.Infusion_Time as infusion, tr.Flow_rate as flowRate, tr.Instructions as instructions, " .
                    "tr.Sequence_Number as sequence, tr.Admin_Time as adminTime, tr.Drug_ID as drugid, ".
                    "tr.BSA_Dose as bsaDose, tr.Fluid_Type as fluidType, tr.T_Type as type, tr.Order_ID as Order_ID ".
                    "from Template_Regimen tr " .
                    "LEFT JOIN LookUp l ON tr.Drug_ID = l.Lookup_ID " .
                    "LEFT JOIN LookUp l1 ON tr.Regimen_Dose_Unit_ID = l1.Lookup_ID " .
                    "LEFT JOIN LookUp l2 ON tr.Patient_Dose_Unit_ID = l2.Lookup_ID " .
                    "LEFT JOIN LookUp l3 ON tr.Route_ID = l3.Lookup_ID " .
                    "LEFT JOIN LookUp l4 ON tr.Fl_Vol_Unit_ID = l4.Lookup_ID " .
                    "where tr.Template_ID = '" . $id . "' order by Sequence_Number";
        }

        return $this->query($query);
    }

    function getHydrations($id, $type) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select mh.MH_ID as id, lu.Name as drug, mh.Description as description, mh.Fluid_Vol as fluidVol, " .
                    "mh.Flow_Rate as flowRate, mh.Admin_Day as adminDay, mh.Infusion_Time as infusionTime, " .
                    "mh.Sequence_Number as Sequence, mh.Admin_Time as adminTime, mh.Drug_ID as drugid, mh.Pre_Or_Post as type, mh.Order_ID as Order_ID " .
                    "from Medication_Hydration mh " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mh.Drug_ID " .
                    "where mh.Template_ID = '" . $id . "' and upper(Pre_Or_Post) ='" . strtoupper($type) . "'  order by Sequence_Number";
//            $query = "select mh.MH_ID as id, lu.Name as drug, mh.Description as description, " .
//                    "mh.Admin_Day as adminDay, " .
//                    "mh.Sequence_Number as Sequence, mh.Admin_Time as adminTime, mh.Drug_ID as drugid, mh.Pre_Or_Post as type " .
//                    "from Medication_Hydration mh " .
//                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mh.Drug_ID " .
//                    "where mh.Template_ID = '" . $id . "' and upper(Pre_Or_Post) ='" . strtoupper($type) . "'";
            
        } else if (DB_TYPE == 'mysql') {

            $query = "select mh.MH_ID as id, lu.`Name` as drug, mh.Description as description, mh.Fluid_Vol as fluidVol, " .
                    "mh.Flow_Rate as flowRate, mh.Admin_Day as adminDay, mh.Infusion_Time as infusionTime, " .
                    "mh.Sequence_Number as Sequence, mh.Admin_Time as adminTime, mh.Drug_ID as drugid, mh.Pre_Or_Post as type, mh.Order_ID as Order_ID " .
                    "from Medication_Hydration mh " .
                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mh.Drug_ID " .
                    "where mh.Template_ID = '" . $id . "' and upper(Pre_Or_Post) ='" . strtoupper($type) . "' order by Sequence_Number";
//            $query = "select mh.MH_ID as id, lu.`Name` as drug, mh.Description as description, " .
//                    "mh.Admin_Day as adminDay, " .
//                    "mh.Sequence_Number as Sequence, mh.Admin_Time as adminTime, mh.Drug_ID as drugid, mh.Pre_Or_Post as type " .
//                    "from Medication_Hydration mh " .
//                    "INNER JOIN LookUp lu ON lu.Lookup_ID = mh.Drug_ID " .
//                    "where mh.Template_ID = '" . $id . "' and upper(Pre_Or_Post) ='" . strtoupper($type) . "'";
            
        }

        return $this->query($query);
    }

    function getMHInfusions($id) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {

            $query = "select mhi.Infusion_ID as id, mhi.Infusion_Amt as amt, l1.Name as unit, l2.Name as type, mhi.BSA_Dose as bsaDose, " .
                    "mhi.Fluid_Type as fluidType, mhi.Fluid_Vol as fluidVol, mhi.Flow_Rate as flowRate, mhi.Infusion_Time as infusionTime, mhi.Order_ID as Order_ID ".
                    "from MH_Infusion mhi " .
                    "INNER JOIN LookUp l1 ON l1.Lookup_ID = mhi.Infusion_Unit_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mhi.Infusion_Type_ID " .
                    "where mhi.MH_ID = '" . $id . "'";
        } else if (DB_TYPE == 'mysql') {

            $query = "select mhi.Infusion_ID as id, mhi.Infusion_Amt as amt, l1.`Name` as unit, l2.`Name` as type, mhi.BSA_Dose as bsaDose, " .
                    "mhi.Fluid_Type as fluidType, mhi.Fluid_Vol as fluidVol, mhi.Flow_Rate as flowRate, mhi.Infusion_Time as infusionTime, mhi.Order_ID as Order_ID ".
                    "from MH_Infusion mhi " .
                    "INNER JOIN LookUp l1 ON l1.Lookup_ID = mhi.Infusion_Unit_ID " .
                    "INNER JOIN LookUp l2 ON l2.Lookup_ID = mhi.Infusion_Type_ID " .
                    "where mhi.MH_ID = '" . $id . "'";
        }

        return $this->query($query);
    }

    function getTemplateDetailByNameAndField($name, $field) {

        $query = "select Lookup_ID as ID, Description as value from LookUp " .
                "where replace(upper(Name), ' ', '') = '" . strtoupper($name) . "' " .
                "AND Lookup_Type = ( " .
                "    select l.Lookup_Type_ID From LookUp l where l.Lookup_Type = 0 and upper(l.Name) = '" . strtoupper($field) . "')";

        return $this->query($query);
    }

    function getTemplateDetailByName($name) {

        $query = "select Lookup_ID as ID, l.Description as value From LookUp l where l.Lookup_Type = 0 and upper(l.Name) = '" . strtoupper($name) . "'";

        return $this->query($query);
    }

    function selectByNameDescId($id){

        $source = null;
        
        if(null != $id){
            $query = "SELECT Name FROM LookUp WHERE Lookup_ID = '".$id."'";
            $source = $this->query($query);
            
            if (null != $source && array_key_exists('error', $source)) {
                return $source;
            }
            
            $source = $source[0];

        }
        
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            
            $query = "SELECT lu.Lookup_ID as id, lu.Lookup_Type as type, lu.Name, lu.Description ".
                     "FROM Template_Availability ta ".
                     "INNER JOIN Master_Template mt ON mt.Template_ID = ta.TemplateID ".
                     "INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Cancer_ID ";
                    
            if (null != $source && 'National Templates' === $source['Name']){
                $query .= "WHERE ta.NationalLevel = 'Yes'";
            }else if(null != $source && 'Local Templates' === $source['Name']){
                $query .= "WHERE ta.NationalLevel = 'No'";
            }else if(null != $source && 'My Templates' === $source['Name']){
                $username = get_current_user();
                //$username = 'kevin.dean';
                
                $mdws = new Mymdws();
                $roles = $mdws->getRoleInfo($username);
				$rid = $_SESSION['rid'];
                
                $query .= "WHERE ta.TemplateOwner = '".$rid."'";
            }

            
        } else if (DB_TYPE == 'mysql') {
            
            
        }
        
        return $this->query($query);
    }
    
    function selectByNameAndDesc($name, $description) {

        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            if (strtoupper($description) == 'NONFORMADRUG') {
                $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description FROM LookUp WHERE Lookup_Type IN " .
                        "(SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND (upper(Name) = '" . strtoupper($name) . "' " .
                        "OR upper(Name) = '" . strtoupper($description) . "'))";
            } else if ('DRUG' == strtoupper($description)) {
                $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description FROM LookUp WHERE Lookup_Type IN " .
                        "(SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = 'UNIT' ) " .
                        "AND Description NOT IN ('foot','pounds','killograms','centimeters','inches')";
            } else if ('DRUG' == strtoupper($name)){
                $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description ".
                         "FROM LookUp ".
                         "WHERE Lookup_Type = 2 AND Description = '".$description."' ".
                         "UNION ".
                         "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description ".
                         "FROM LookUp ".
                         "WHERE Lookup_Type = 26";
            } else {
//                $query = "SELECT ID=Lookup_Type, Name, type=Lookup_Type, description=Description FROM LookUp WHERE upper(Name) like '" . strtoupper($description) . "%' AND Lookup_Type = ( 
//                           SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')";
                return $this->getLookupInfoById($description);
            }
        } else if (DB_TYPE == 'mysql') {
            if (strtoupper($description) == 'NONFORMADRUG') {
                $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description FROM LookUp WHERE Lookup_Type IN " .
                        "(SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND (upper(Name) = '" . strtoupper($name) . "' " .
                        "OR upper(Name) = '" . strtoupper($description) . "'))";
            } else if ('DRUG' == strtoupper($description)) {
                $query = "SELECT Lookup_ID as id, Lookup_Type as type, Name, Description FROM LookUp WHERE Lookup_Type IN " .
                        "(SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = 'UNIT' ) " .
                        "AND Description NOT IN ('foot','pounds','killograms','centimeters','inches')";
            } else {
//                $query = "SELECT Lookup_Type as ID, Name, Lookup_Type as type, Description as description FROM LookUp WHERE upper(Name) like '" . strtoupper($description) . "%' AND Lookup_Type = ( 
//                            SELECT l.Lookup_Type_ID FROM LookUp l WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')";
                return $this->getLookupInfoById($description);
            }
        }


        return $this->query($query);
    }

    function getLookupInfoById($id) {

        $query = "select Lookup_ID as id, Lookup_Type as type, Name, Description " .
                "from LookUp where Lookup_ID = '" . $id . "'";

        return $this->query($query);
    }

    function getLookupIdByNameAndType($name, $type) {

        $query = "select Lookup_ID as id  " .
                "from LookUp where Name = '" . $name . "' and Lookup_Type = " . $type;

        return $this->query($query);
    }

    function getLookupDescByNameAndType($name, $type) {

        $query = "select Description as description " .
                "from LookUp where Name = '" . $name . "' and Lookup_Type = " . $type;

        return $this->query($query);
    }
    
    function TemplateLevel($templateid, $Location, $NationalLevel, $TemplateOwner) {

        //Insert into Template Availability
        $query = "INSERT INTO Template_Availability (TemplateID,Location,NationalLevel,TemplateOwner) VALUES (".
                 "'$templateid',$Location,'$NationalLevel',$TemplateOwner)";
        
        return $this->query($query);
        
    }

}
