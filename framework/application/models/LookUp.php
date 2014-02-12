<?php
/**
 * Lookup Model
 *
 * PHP Version 5
 *
 */
class LookUp extends Model {

    const TYPE_TIMEFRAMEUNIT = 18;
    const TYPE_ELEVEL = 13;
    
    /**
     * This function needs some work. 
     * The function name is "save" but if given an ID which currently exists in the table, 
     * it merely returns the record(s) from the lookup table which match that ID.
     * It doesn't (appear) to have the ability to "update" an existing record (based on the ID)
     * with (potentially) modified data
     *
     * @param string id - 
     * @param string name - 
     * @param string description -
     */
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

    /**
     * deleteTemplate -It looks like if force is true this function assumes potentially multiple records
     *                 but if force is false it assumes only a single record. Shouldn't the check for multiple
     *                 records always be done?
     *
     * @param string id - Template_ID of the template in the Master_Template table
     * @param bool   force, true forces the delete for all templates with a given Regimen_ID whether or not they're applied to a patient
     *                      false prompts the user to configm the delete if the template is applied to a patient
     *
     */
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

    /**
     * innerDeleteTemplate - Actual Template Delete function. Checks to see if a template is currently applied to a patient before deleting
     *
     * @param string id - Template_ID of the template in the Master_Template table
     * @param bool   force - true forces the delete for all templates with a given Regimen_ID whether or not they're applied to a patient
     *                      false prompts the user to configm the delete if the template is applied to a patient
     *
     */
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



    function flagTemplateInactive($id){
        $query = "UPDATE Master_Template SET Is_Active = 0 WHERE Regimen_ID = '" .$id."'";
        $retVal = $this->query($query);
        return $retVal;
    }

    /**
     * 
     * @param stdClass $formData
     * @param string $regimenId
     * @return array
     */
    public function saveTemplate($formData, $regimenId)
    {
        ChromePhp::log("save Template - $regimenId");
        ChromePhp::log("st - Form Data - " . json_encode($formData));


        $cancerId = $formData->Disease;
        $diseaseStage = $formData->DiseaseStage;
        $cycleLength = $formData->CycleLength;
        $cycleLengthUnit = $formData->CycleLengthUnit;
        $emotegnicLevel = $formData->ELevel;
        $fibroNeutroRisk = $formData->FNRisk;
        $courseNumMax = $formData->CourseNumMax;
        $keepActive = (empty($formData->KeepAlive)) ? true : $formData->KeepAlive;
        
        $preMHInstructions = str_replace("'", "''", $formData->PreMHInstructions);
        $postMHInstructions = str_replace("'", "''", $formData->PostMHInstructions);
        $regimenInstruction = str_replace("'", "''", $formData->RegimenInstruction);
        
        $cycle = (empty($formData->Cycle)) ? null : $formData->Cycle;
        $adminDay = (empty($formData->AdminDay)) ? null : $formData->AdminDay;
        $adminDate = (empty($formData->AdminDate)) ? null : $formData->AdminDate;
        $patientId = (empty($formData->PatientID)) ? null : $formData->PatientID;
        
        $locationIdResult = $this->getLookupIdByNameAndType('My Templates', 22);
        if (!empty($locationIdResult)) {
            $locationId = $locationIdResult[0]["id"];
        } else {
            $locationId = "###";
        }
        
		$userId = $_SESSION['Role_ID'];
		
    	if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT CONVERT(VARCHAR,GETDATE(),121) AS currdate";
    	} else if (DB_TYPE == 'mysql') {
            $query = "SELECT NOW() AS currdate";
    	}
        $currDateResult = $this->query($query);
        $currDate = $currDateResult[0]['currdate'];
        
        if($cycle){
            $query = "
                SELECT Template_ID AS lookupid 
                FROM Master_Template 
                WHERE Regimen_ID = '$regimenId' 
                    AND Course_Number = '$cycle' 
                    AND Admin_Day = '$adminDay' 
                    AND Admin_Date = '$adminDate'
                    AND Patient_ID = '$patientId'
            ";
            
            $retVal = $this->query($query);
            
            if($retVal){
                return $retVal;
            }
        }

        if($diseaseStage){
            $query = "
                INSERT INTO Master_Template (
                    Regimen_ID, 
                    Cancer_ID, 
                    Disease_Stage_ID, 
                    Location_ID, 
                    Version, 
                    Is_Active, 
                    Cycle_Length, 
                    Cycle_Time_Frame_ID, 
                    Emotegenic_ID, 
                    Febrile_Neutropenia_Risk, 
                    Pre_MH_Instructions, 
                    Post_MH_Instructions, 
                    Created_By, 
                    Total_Courses, 
                    Regimen_Instruction,
                    Date_Created
                ) VALUES (
                    '$regimenId',
                    '$cancerId',
                    '$diseaseStage',
                    '$locationId',
                    1,
                    1,
                    '$cycleLength',
                    '$cycleLengthUnit',
                    '$emotegnicLevel',
                    '$fibroNeutroRisk',
                    '$preMHInstructions',
                    '$postMHInstructions',
                    '$userId',
                    $courseNumMax,
                    '$regimenInstruction',
                    '$currDate'
                )
            ";
            
        } else if($cycle) {
            $query = "
                INSERT INTO Master_Template (
                    Regimen_ID, 
                    Cancer_ID, 
                    Location_ID, 
                    Version, 
                    Is_Active, 
                    Cycle_Length, 
                    Cycle_Time_Frame_ID, 
                    Emotegenic_ID, 
                    Febrile_Neutropenia_Risk, 
                    Pre_MH_Instructions, 
                    Post_MH_Instructions, 
                    Created_By, 
                    Total_Courses, 
                    Regimen_Instruction, 
                    Admin_Day, 
                    Admin_Date, 
                    Course_Number,
                    Date_Created,
                    Patient_ID
                ) VALUES (
                    '$regimenId',
                    '$cancerId',
                    '$locationId',
                    1,
                    1,
                    '$cycleLength',
                    '$cycleLengthUnit',
                    '$emotegnicLevel',
                    '$fibroNeutroRisk',
                    '$preMHInstructions',
                    '$postMHInstructions',
                    '$userId',
                    $courseNumMax,
                    '$regimenInstruction',
                    '$adminDay',
                    '$adminDate',
                    '$cycle',
                    '$currDate',
                    '$patientId'
                )
            ";
        } else {
            $query = "
                INSERT INTO Master_Template (
                    Regimen_ID, 
                    Cancer_ID, 
                    Location_ID, 
                    Version, 
                    Is_Active, 
                    Cycle_Length, 
                    Cycle_Time_Frame_ID, 
                    Emotegenic_ID, 
                    Febrile_Neutropenia_Risk, 
                    Pre_MH_Instructions, 
                    Post_MH_Instructions, 
                    Created_By, 
                    Total_Courses, 
                    Regimen_Instruction,
                    Date_Created
                ) VALUES (
                    '$regimenId',
                    '$cancerId',
                    '$locationId',
                    1,
                    1,
                    '$cycleLength',
                    '$cycleLengthUnit',
                    '$emotegnicLevel',
                    '$fibroNeutroRisk',
                    '$preMHInstructions',
                    '$postMHInstructions',
                    '$userId',
                    $courseNumMax,
                    '$regimenInstruction',
                    '$currDate'
                )
            ";
        }
		
		
        $retVal = $this->query($query);

        if (!empty($retVal['error'])) {
            return $retVal;
        }

        if($cycle){
            $query = "
                SELECT Template_ID AS lookupid 
                FROM Master_Template 
                WHERE Regimen_ID = '$regimenId' 
                    AND Date_Created = '$currDate'
            ";
        }else{
            $query = "
                SELECT Template_ID AS lookupid 
                FROM Master_Template 
                WHERE Regimen_ID = '$regimenId' 
                    AND Date_Created = '$currDate'
                    AND Version = 1 
                    AND Course_Number = 0
            ";
        }
        
        return $this->query($query);
    }

    function saveTemplateReferences($references, $templateid) {

        for ($index = 0; $index < count($references); $index++) {

            $referencedata = $references[$index]->{'data'};

            $this->save(21, $templateid, $referencedata->{'RefID'});
        }
    }

    /**
     * 
     * @param array $regimens
     * @param string $templateId
     * @param string $orderId
     * @return array
     */
    public function saveRegimen($regimens, $templateId, $orderId)
    {
		ChromePhp::log("saveRegimen - $orderId\n");
        foreach ($regimens as $regimenObject) {
            ChromePhp::log("saveRegimen - Object");

            $regimen = $regimenObject->data;
            
            $drugId = (empty($regimen->drugid)) ? null : $regimen->drugid;
            
            if (empty($drugId)) {
                
                $drugName = $regimen->Drug;
                
                $drug = $this->getLookupIdByNameAndType($drugName, 2);
                
                if ($drug) {
                    $drugId = $drug[0]["id"];
                } else {
                    $drugId = null;
                }
                
                if (empty($drugId)) {
                    
                    $drug = $this->getLookupIdByNameAndType($drugName, 26);
                    
                    if ($drug) {
                        $drugId = $drug[0]["id"];
                    }
                }
            }
            
            if (null == $drugId) {
                $retVal = array(); 
                $retVal['error'] = "The drug id could not be determined.";
                return $retVal;
            }
            
            $regimenDose = $regimen->Amt;
            $doseUnit = $regimen->Units;

            $unitLookup = $this->getLookupIdByNameAndType($doseUnit, 11);
            if ($unitLookup) {
                $unitId = $unitLookup[0]["id"];
            } else {
                $unitId = null;
            }
            
            if (null == $unitId) {
                $retVal = array(); 
                $retVal['error'] = "The unit id could not be determined.";
                return $retVal;
            }

            $route = $regimen->Route;
            $routeLookup = $this->getLookupIdByNameAndType($route, 12);
            if ($routeLookup) {
                $routeId = $routeLookup[0]["id"];
            } else {
                $routeId = null;
            }

            if(null == $routeId){
                $retVal = array(); 
                $retVal['error'] = "The Route id could not be determined.";
                return $retVal;
            }
            
            $adminDay = $regimen->Day;
            $infusionTime = $regimen->InfusionTime;
            $fluidVol = $regimen->FluidVol;
            $flowRate = $regimen->FlowRate;
            $sequence = $regimen->Sequence;
            $adminTime = $regimen->AdminTime;
            $fluidType = $regimen->FluidType;
            $instruction = str_replace("'", "''", $regimen->Instructions);
            
            $query = "
                INSERT INTO Template_Regimen (
                    Template_ID, 
                    Drug_ID, 
                    Regimen_Dose, 
                    Regimen_Dose_Unit_ID, 
                    Route_ID, 
                    Admin_Day, 
                    Infusion_Time, 
                    Fluid_Vol, 
                    Flow_Rate, 
                    Instructions, 
                    Sequence_Number, 
                    Admin_Time, 
                    Fluid_Type, 
                    Order_ID
                ) VALUES (
                    '$templateId',
                    '$drugId',
                    $regimenDose,
                    '$unitId',
                    '$routeId',
                    '$adminDay',
                    '$infusionTime',
                    '$fluidVol',
                    '$flowRate',
                    '$instruction',
                    $sequence,
                    '$adminTime',
                    '$fluidType',
                    '$orderId'
                )
            ";

            $retVal = $this->query($query);

            if (!empty($retVal['error'])) {
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

    /**
     * 
     * @param array $hydrations
     * @param string $type
     * @param string $templateId
     * @param string $orderId
     * @return array
     */
    public function saveHydrations($hydrations, $type, $templateId, $orderId)
    {
        foreach ($hydrations as $hydrationObject) {
            
            $hydration = $hydrationObject->data;
            
            $drugName = (empty($hydration->drugid)) ? null : $hydration->drugid;
            
            if ($drugName) {
                $drug = $this->getLookupIdByNameAndType($drugName, 2);
                
                if ($drug) {
                    $drugId = $drug[0]["id"];
                } else {
                    $drugId = null;
                }
                
                if (null == $drugId) {
                    $drug = $this->getLookupIdByNameAndType($drugName, 26);
                    
                    if ($drug) {
                        $drugId = $drug[0]["id"];
                    }
                }
            }
            
            if (null == $drugId) {
                $retVal = array(); 
                $retVal['error'] = "Insert into Medication_Hydration for " . $type .
                     " Therapy failed. The drug id could not be determined.";
                return $retVal;
            }
            
            $adminDay = $hydration->adminDay;
            $sequenceNumber = $hydration->sequence;
            $adminTime = $hydration->adminTime;
            $description = str_replace("'", "''", $hydration->description);
            
            $query = "
                INSERT INTO Medication_Hydration (
                    Drug_ID, 
                    Template_ID, 
                    Pre_Or_Post, 
                    Description, 
                    Admin_Day, 
                    Sequence_Number, 
                    Admin_Time, 
                    Order_ID
                ) VALUES (
                    '$drugId',
                    '$templateId',
                    '$type',
                    '$description',
                    '$adminDay',
                    $sequenceNumber,
                    '$adminTime',
                    '$orderId'
                )
            ";
            
            $retVal = $this->query($query);

            
            if (!empty($retVal['error'])) {
                return $retVal;
            }

            $query = "
                SELECT MH_ID AS mhid 
                FROM Medication_Hydration 
                WHERE Drug_ID = '$drugId' 
                    AND Template_ID = '$templateId'
                    AND Pre_Or_Post = '$type' 
                    AND Description = '$description' 
                    AND Sequence_Number = '$sequenceNumber'
            ";
            
            $result = $this->query($query);
            
            if (!empty($result[0])) {
                
                $mhId = $result[0]["mhid"];
                
                $infusions = $hydration->infusions;
                
                foreach ($infusions as $infusion) { 
                    
                    $infusionData = $infusion->data;

                    if(count($infusionData)>1){
                        $unit = $infusionData['unit'];
                    }else{
                        $unit = $infusionData->unit;
                    }

                    $unitLookup = $this->getLookupIdByNameAndType($unit, 11);

                    if ($unitLookup) {
                        $unitId = $unitLookup[0]["id"];
                    } else {
                        $unitId = null;
                    }

                    if (null == $unitId) {
                        $retVal = array(); 
                        $retVal['error'] = "Insert int MH_ID for " . $type .
                             " Therapy failed. The unit id could not be determined.";
                        return $retVal;
                    }
                    
                    if(count($infusionData)>1){
                        $unitType = $infusionData['type'];
                    }else{
                        $unitType = $infusionData->type;
                    }

                    $unitTypeLookup = $this->getLookupIdByNameAndType($unitType, 12);

                    if ($unitTypeLookup) {
                        $unitTypeId = $unitTypeLookup[0]["id"];
                    } else {
                        $unitTypeId = null;
                    }

                    if (null == $unitTypeId) {
                        $retVal = array(); 
                        $retVal['error'] = "Insert int MH_ID for " . $type .
                             " Therapy failed. The Route could not be determined.";
                        return $retVal;
                    }
                    
                    if(count($infusionData)>1){
                        $amt = $infusionData['amt'];
                        $fluidVol = $infusionData['fluidVol'];
                        $flowRate = $infusionData['flowRate'];
                        $fluidType = $infusionData['fluidType'];
                        $infusionTime = $infusionData['infusionTime'];
                    }else{
                        $amt = $infusionData->amt;
                        $fluidVol = $infusionData->fluidVol;
                        $flowRate = $infusionData->flowRate;
                        $fluidType = $infusionData->fluidType;
                        $infusionTime = $infusionData->infusionTime;
                    }

                    $query = "
                        INSERT INTO MH_Infusion (
                            MH_ID, 
                            Infusion_Unit_ID, 
                            Infusion_Type_ID, 
                            Infusion_Amt, 
                            Fluid_Vol, 
                            Flow_Rate, 
                            Infusion_Time, 
                            Fluid_Type,
                            Order_ID
                        ) VALUES (
                            '$mhId',
                            '$unitId',
                            '$unitTypeId',
                            '$amt',
                            '$fluidVol',
                            '$flowRate',
                            '$infusionTime',
                            '$fluidType',
                            '$orderId'
                        )
                    ";

                    $retVal = $this->query($query);

                    if (!empty($retVal['error'])) {
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




    /**
     * 
     * @param string $id
     * @return array
     */
    public function getTopLevelTemplateDescriptionById($id) {
        $query = "
            SELECT 
                mt.Template_ID AS id, 
                mt.Regimen_ID As Regimen_ID
            FROM Master_Template mt
            WHERE mt.Template_ID = '$id'
        ";
        $FirstPass = $this->query($query);
        return $FirstPass;
    }


    /**
     * 
     * @param string $id
     * @return array
     */
    public function getTopLevelTemplateDataById($id, $Regimen_ID)
    {
        /* Check to see if the template has a user supplied description */
        $query = "select Description from LookUp where Name = '$Regimen_ID'";
        $NoDescription = false;
        if ($this->query($query) == null) {
            /* No short description available */
            $NoDescription = true;
            $query = "
                SELECT 
                    mt.Template_ID AS id, 
                    mt.Regimen_ID As Regimen_ID,
                    lu.Description AS name,
                    mt.Cycle_Length AS length, 
                    mt.Emotegenic_ID AS emoID, 
                    l2.Name AS emoLevel, 
                    mt.Febrile_Neutropenia_Risk AS fnRisk, 
                    mt.Pre_MH_Instructions preMHInstruct, 
                    mt.Post_MH_Instructions postMHInstruct, 
                    mt.Cycle_Time_Frame_ID AS CycleLengthUnitID, 
                    l1.Name AS CycleLengthUnit, 
                    mt.Cancer_ID AS Disease, 
                    mt.Disease_Stage_ID AS DiseaseStage, 
                    mt.Regimen_ID RegimenId, 
                    mt.Version AS version, 
                    CASE WHEN l3.Name IS NOT NULL THEN l3.Name ELSE '' END AS DiseaseStageName, 
                    CASE WHEN l4.Name IS NOT NULL THEN l4.Name ELSE '' END AS DiseaseName, 
                    mt.Course_Number AS CourseNum, 
                    mt.Total_Courses AS CourseNumMax, 
                    mt.Regimen_Instruction AS regimenInstruction 
                FROM Master_Template mt
                    JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID 
                    JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID 
                    JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID 
                    JOIN LookUp l4 ON l4.Lookup_ID = mt.Cancer_ID
                    LEFT JOIN LookUp l3 ON l3.Lookup_ID = mt.Disease_Stage_ID 
                WHERE mt.Template_ID = '$id'
            ";
        }
        else {
            $query = "
                SELECT 
                    mt.Template_ID AS id, 
                    mt.Regimen_ID As Regimen_ID,
                    lu.Description AS name,
                    l5.Description AS description,
                    mt.Cycle_Length AS length, 
                    mt.Emotegenic_ID AS emoID, 
                    l2.Name AS emoLevel, 
                    mt.Febrile_Neutropenia_Risk AS fnRisk, 
                    mt.Pre_MH_Instructions preMHInstruct, 
                    mt.Post_MH_Instructions postMHInstruct, 
                    mt.Cycle_Time_Frame_ID AS CycleLengthUnitID, 
                    l1.Name AS CycleLengthUnit, 
                    mt.Cancer_ID AS Disease, 
                    mt.Disease_Stage_ID AS DiseaseStage, 
                    mt.Regimen_ID RegimenId, 
                    mt.Version AS version, 
                    CASE WHEN l3.Name IS NOT NULL THEN l3.Name ELSE '' END AS DiseaseStageName, 
                    CASE WHEN l4.Name IS NOT NULL THEN l4.Name ELSE '' END AS DiseaseName, 
                    mt.Course_Number AS CourseNum, 
                    mt.Total_Courses AS CourseNumMax, 
                    mt.Regimen_Instruction AS regimenInstruction 
                FROM Master_Template mt
                    JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID 
                    JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID 
                    JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID 
                    JOIN LookUp l4 ON l4.Lookup_ID = mt.Cancer_ID
                    JOIN LookUp l5 ON l5.Name = '$Regimen_ID'
                    LEFT JOIN LookUp l3 ON l3.Lookup_ID = mt.Disease_Stage_ID 
                WHERE mt.Template_ID = '$id'
            ";
        }
        $retVal = $this->query($query);
        if ($NoDescription) {
            if (isset($retVal[0])) {
                for($i = 0; $i < count($retVal); $i++) {
                    $retVal[$i]["description"] = 'N/A';
                }
            }
        }
        return $retVal;
    }

    function selectAll() {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            $query = "SELECT ID=Lookup_Type_ID, Name, type=Lookup_Type, description=Description FROM " . $this->_table . " WHERE Lookup_Type = 0 order by 'Name'";
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

        if ($name == 'DiseaseType') {
            $orderBy = 'Name';
        } else {
            $orderBy = 'Description';
        }

        switch (strtoupper($name)) {
            case "TEMPLOC":
                $name = 'Temperature Location';
                break;
        }
        $query = "
            SELECT id=Lookup_ID, 
                type=Lookup_Type, 
                Name, 
                Description 
                FROM LookUp 
                WHERE Lookup_Type = ( 
                    SELECT 
                        l.Lookup_Type_ID 
                        FROM LookUp l 
                        WHERE l.Lookup_Type = 0 AND upper(Name) = '" . strtoupper($name) . "')
                ORDER BY $orderBy
        ";
        return $this->query($query);
    }



    function getLabResults($patientID) {

        $query = "SELECT labs.ID as id
            , labs.Patient_ID
            , pat.First_Name
            , pat.Last_Name
            , lab_rslts.Lab_Test_Name
            , labs.Release_Date
            , labs.Author
            , labs.Specimen
            , labs.Specimen_Info
            , labs.Spec_Col_Date
            , labs.Comment
            , labs.Date_Created
            , labs.Date_Modified
            , lab_rslts.Lab_Info_ID
            , lab_rslts.Lab_Test_Units
            , lab_rslts.Lab_Test_Result
            , lab_rslts.MDWS_Lab_Result_ID
            , lab_rslts.Accept_Range_Low
            , lab_rslts.Accept_Range_High
            , lab_rslts.Site_ID
            , lab_rslts.Out_Of_Range
            , lab_rslts.Date_Created
            , lab_rslts.Date_Modified
        FROM Lab_Info labs
        INNER JOIN Lab_Info_Results lab_rslts ON labs.ID = lab_rslts.Lab_Info_ID
        INNER JOIN Patient pat on pat.Patient_ID = labs.Patient_ID";
        if (null !== $patientID) {
            $query .= " WHERE labs.Patient_ID = '$patientID'";
        }
        $query .= " ORDER BY pat.Patient_ID, lab_rslts.Lab_Test_Name";
        return $this->query($query);
    }







    function getTemplates($id) {
            $query = "select 
                    lu.Name as name
                    ,mt.Template_ID as id
                    ,mt.Regimen_ID as regimenId
                    ,lu.Lookup_Type as type
                    ,case when l3.Name is not null then l3.Description else lu.Description end as description
                    ,mt.Cycle_Length as length
                    ,l1.Name as unit
                    ,mt.Total_Courses as totnum
                    ,mt.Course_Number as coursenum
                    ,mt.Version as version
                    ,l2.Name as emoLevel
                    ,mt.Febrile_Neutropenia_Risk as fnRisk
                    ,l4.Name as DiseaseName
                    ,mt.Disease_Stage_ID 
                    ,CASE WHEN l5.Name IS NOT NULL THEN l5.Name ELSE '' END AS  DiseaseStageName
                    from Master_Template mt
                    INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID
                    INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID
                    INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID
                    INNER JOIN LookUp l4 ON l4.Lookup_ID = mt.Cancer_ID 
                    LEFT JOIN LookUp l5 ON l5.Lookup_ID = mt.Disease_Stage_ID
                    LEFT OUTER JOIN LookUp l3 ON l3.Name = convert(nvarchar(max),mt.Regimen_ID)";
            if (NULL != $id) {
                $query .= " WHERE mt.Template_ID = '" . $id . "' and Is_Active = 1";
            }else{
                $query .= " WHERE Is_Active = 1";
            }
            $query .= " Order By 'description'";
        return $this->query($query);
    }

    function getTemplatesByType($field, $id) {
            $query = "select 
                lu.Name as name
                , mt.Template_ID as id
                , mt.Regimen_ID as regimenId
                , lu.Lookup_Type as type
                , case when l3.Name is not null then l3.Description else lu.Description end as description
                , mt.Cycle_Length as length
                , l1.Name as unit
                , mt.Total_Courses as totnum
                , mt.Course_Number as coursenum
                , mt.Version as version
                , l2.Name as emoLevel
                , mt.Febrile_Neutropenia_Risk as fnRisk 
                from Master_Template mt 
                INNER JOIN LookUp lu ON lu.Lookup_ID = mt.Regimen_ID 
                INNER JOIN LookUp l1 ON l1.Lookup_ID = mt.Cycle_Time_Frame_ID 
                INNER JOIN LookUp l2 ON l2.Lookup_ID = mt.Emotegenic_ID 
                LEFT OUTER JOIN LookUp l3 ON l3.Name = convert(nvarchar(max),mt.Regimen_ID) ";
            if ($field != NULL && strtoupper($field) == 'CANCER') {
                $query .= "WHERE mt.Cancer_ID = '" . $id . "' and Is_Active = 1";
            } else if ($field != NULL && strtoupper($field) == 'PATIENT') {
                $query .= "INNER JOIN Patient_Assigned_Templates pat ON pat.Template_ID = mt.Template_ID " .
                        "WHERE pat.Patient_ID = '" . $id . "' and pat.Is_Active = 1";
            }else{
                $query .= "WHERE Is_Active = 1";
            }
            $query .= " Order By description";
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

    /**
     * 
     * @param string $id
     * @return array
     */
    public function getRegimens($id)
    {
        $query = "
            SELECT 
                tr.Patient_Regimen_ID AS id, 
                tr.Regimen_Number AS regnumber, 
                l.Name AS drug, 
                tr.Regimen_Dose AS regdose, 
                l1.Name AS regdoseunit, 
                tr.Regimen_Dose_Pct AS regdosepct, 
                tr.Regimen_Reason AS regreason, 
                tr.Patient_Dose AS patientdose, 
                l2.Name AS patientdoseunit, 
                l3.Name AS route, 
                tr.Admin_Day AS adminDay, 
                tr.Fluid_Vol AS flvol,  
                l4.Name AS flunit, 
                tr.Infusion_Time AS infusion, 
                tr.Flow_rate AS flowRate, 
                tr.Instructions AS instructions,  
                tr.Sequence_Number AS sequence, 
                tr.Admin_Time AS adminTime, 
                tr.Drug_ID AS drugid, 
                tr.BSA_Dose AS bsaDose, 
                tr.Fluid_Type AS fluidType, 
                tr.T_Type AS type, 
                tr.Order_ID AS Order_ID  
             FROM Template_Regimen tr
                 LEFT JOIN LookUp l ON tr.Drug_ID = l.Lookup_ID  
                 LEFT JOIN LookUp l1 ON tr.Regimen_Dose_Unit_ID = l1.Lookup_ID  
                 LEFT JOIN LookUp l2 ON tr.Patient_Dose_Unit_ID = l2.Lookup_ID 
                 LEFT JOIN LookUp l3 ON tr.Route_ID = l3.Lookup_ID  
                 LEFT JOIN LookUp l4 ON tr.Fl_Vol_Unit_ID = l4.Lookup_ID   
             WHERE tr.Template_ID = '$id' 
             ORDER BY Sequence_Number
        ";

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

    /**
     * 
     * @param string $id
     * @return array
     */
    public function getMHInfusions($id)
    {
        $query = "
            SELECT 
                mhi.Infusion_ID AS id, 
                mhi.Infusion_Amt AS amt, 
                l1.Name AS unit, 
                l2.Name AS type, 
                mhi.BSA_Dose AS bsaDose, 
                mhi.Fluid_Type AS fluidType,
                mhi.Fluid_Vol AS fluidVol, 
                mhi.Flow_Rate AS flowRate, 
                mhi.Infusion_Time AS infusionTime, 
                mhi.Order_ID AS Order_ID 
            FROM MH_Infusion mhi 
                JOIN LookUp l1 ON l1.Lookup_ID = mhi.Infusion_Unit_ID
                JOIN LookUp l2 ON l2.Lookup_ID = mhi.Infusion_Type_ID
            WHERE mhi.MH_ID = '$id'
        ";

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
    
    function saveTemplateLevel($templateid, $Location, $NationalLevel, $TemplateOwner) {

        //Insert into Template Availability
        $query = "INSERT INTO Template_Availability (TemplateID,Location,NationalLevel,TemplateOwner) VALUES (".
                 "'$templateid',$Location,'$NationalLevel',$TemplateOwner)";
        
        return $this->query($query);
        
    }
    
    /**
     * 
     * @param string $name
     * @param int $type
     * @return string
     */
    public function getIdByNameAndType($name, $type)
    {
        $result = $this->query("
            SELECT Lookup_ID as id 
            FROM LookUp
            WHERE Lookup_Type = $type
                AND Name = '$name'
        ");
        if (!empty($result[0]['id'])) {
            return $result[0]['id'];
        }
    }


    public function ck4DuplicateTemplateByUserName($name) {
        $query = "SELECT Lookup_ID as id  FROM LookUp WHERE Lookup_Type = 25 and Description = $name";
        return $this->query($query);
    }

}
