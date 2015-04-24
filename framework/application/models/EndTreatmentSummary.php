<?php

class EndTreatmentSummary extends Model 
{
    
    private $_lastId = null;
    
    public function getEoTS($id) 
    {
        $query = "
            SELECT *
            FROM EoTS 
            WHERE EoTS_ID = '$id'
        ";
        
        $result = $this->query($query);
        if (!empty($result[0])) {
            $eots = $result[0];
            $model = array(
                'Name' => $eots['Name'],
                'PatientID' => $eots['Patient_ID'],
                'PAT_ID' => $eots['PAT_ID'],
                'Gender' => $eots['Gender'],
                'Age' => $eots['Age'],
                'DOB' => $eots['DOB'],
                'TemplateName' => $eots['TemplateName'],
                'TemplateID' => $eots['Template_ID'],
                'TemplateDescription' => $eots['TemplateDescription'],
                'TreatmentStatus' => $eots['TreatmentStatus'],
                'TreatmentStart' => $eots['TreatmentStart'],
                'TreatmentEnd' => $eots['TreatmentEnd'],
                'EndReason' => $eots['EndReason'],
                'ProviderReport' => $eots['ProviderReport'],
                'FollowUpAppointments' => $eots['FollowUpAppointments'],
                'ClinicalTrial' => $eots['ClinicalTrial'],
            );
        } else {
            return;
        }
        
        $query = "SELECT * FROM EoTS_Allergies WHERE EoTS_ID = '$id'";
        $allergies = $this->query($query);
        $model['Allergies'] = array();
        foreach ($allergies as $allergy) {
            $model['Allergies'][] = array(
                'name' => $allergy['name'],
                'type' => $allergy['type'],
                'comment' => $allergy['comment'],
            );
        }   

        $query = "SELECT * FROM EoTS_Amputations WHERE EoTS_ID = '$id'";
        $amputations = $this->query($query);
        $model['Amputations'] = array();
        foreach ($amputations as $amputation) {
            $model['Amputations'][] = array(
                'description' => $amputation['description'],
            );
        }
        
        $query = "SELECT * FROM EoTS_DiseaseResponse WHERE EoTS_ID = '$id'";
        $diseaseResponses = $this->query($query);
        $model['DiseaseResponse'] = array();
        foreach ($diseaseResponses as $response) {
            $model['DiseaseResponse'][] = array(
                'day' => $response['Day'],
                'date' => $response['Date'],
                'desc' => $response['Description'],
            );
        }
        
        $query = "SELECT * FROM EoTS_Meds WHERE EoTS_ID = '$id'";
        $meds = $this->query($query);
        $model['Meds'] = array();
        foreach ($meds as $med) {
            
            $name = $med['Name'];
            $medsAdministered = $this->query("
                SELECT * FROM EoTS_Meds_Administered 
                WHERE EoTS_ID = '$id' AND EoTS_Meds_Name = '$name'
            ");
            $administered = array();
            foreach ($medsAdministered as $medAdministered) {
                $administered[] = array(
                    'day' => $medAdministered['Day'],
                    'date' => $medAdministered['Date'],
                    'dosage' => $medAdministered['Dosage'],
                );
            }
            $model['Meds'][] = array(
                'name' => $med['Name'],
                'administered' => $administered,
            );
            
        }
        
        $query = "SELECT * FROM EoTS_Other WHERE EoTS_ID = '$id'";
        $others = $this->query($query);
        $model['Other'] = array();
        foreach ($others as $other) {
            $model['Other'][] = array(
                'day' => $other['Day'],
                'date' => $other['Date'],
                'desc' => $other['Description'],
            );
        }
        
        $query = "SELECT * FROM EoTS_Toxicity WHERE EoTS_ID = '$id'";
        $toxicities = $this->query($query);
        $model['Toxicity'] = array();
        foreach ($toxicities as $toxicity) {
            $model['Toxicity'][] = array(
                'day' => $toxicity['Day'],
                'date' => $toxicity['Date'],
                'desc' => $toxicity['Description'],
            );
        }
        
        $query = "SELECT * FROM EoTS_Vitals WHERE EoTS_ID = '$id'";
        $vitals = $this->query($query);
        $model['Vitals'] = array();
        foreach ($vitals as $vital) {
            
            $vitalId = $vital['Id'];
            $vitalAmputations = $this->query("
                SELECT * FROM EoTS_Vitals_Amputations
                WHERE EoTS_Vitals_Id = '$vitalId'
            ");
            $amputations = array();
            foreach ($vitalAmputations as $vitalAmputation) {
                $amputations[] = array(
                    'description' => $vitalAmputation['Description'],
                );
            }
            
            $model['Vitals'][] = array(
                "Height" => $vital['Height'],
                "Weight" => $vital['Weight'],
                "BP" => $vital['BP'],
                "WeightFormula" => $vital['WeightFormula'],
                "BSA_Method" => $vital['BSA_Method'],
                "BSA" => $vital['BSA'],
                "BSA_Weight" => $vital['BSA_Weight'],
                "DateTaken" => $vital['DateTaken'],
                "Temperature" => $vital['Temperature'],
                "Pulse" => $vital['Pulse'],
                "Respiration" => $vital['Respiration'],
                "Pain" => $vital['Pain'],
                "SPO2" => $vital['SPO2'],
                "Cycle" => $vital['Cycle'],
                "Day" => $vital['Day'],
                "PS" => $vital['PS'],
                "PSID" => $vital['PSID'],
                "Age" => $vital['Age'],
                "Gender" => $vital['Gender'],
                "Amputations" => $amputations,
            );
        }
        
        return array($model);
    }

    public function saveEoTS($form_data)
    {
		$newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
		
        $Name = $form_data->Name;
        $Patient_ID = $form_data->PatientID;
        $Gender = $form_data->Gender;
        $Age = $form_data->Age;
        $DOB = $form_data->DOB;
        $TemplateName = $form_data->TemplateName;
        $Template_ID = $form_data->TemplateID;
        $TemplateDescription = $form_data->TemplateDescription;
        $TreatmentStatus = $form_data->TreatmentStatus;
        $TreatmentStart = $form_data->TreatmentStart;
        $TreatmentEnd = $form_data->TreatmentEnd;
        $EndReason = $form_data->EndReason;
        $ProviderReport = $form_data->ProviderReport;
        $FollowUpAppointments = $form_data->FollowUpAppointments;
        $patId = (!empty($form_data->PAT_ID)) ? $form_data->PAT_ID : null;
        if (!$patId) {
            $query = "select PAT_ID from Patient_Assigned_Templates where Patient_ID = '$Patient_ID'";
            $retVal = $this->query($query);
            error_log("Get PAT_ID = " . json_encode($retVal[0]));
            $patId = $retVal[0]["PAT_ID"];
        }
        $ClinicalTrial = $form_data->ClinicalTrial;


        $query = 
            "INSERT INTO EoTS (
                EoTS_ID,
                Name, 
                Patient_ID, 
                Gender, 
                Age, 
                DOB, 
                TemplateName, 
                Template_ID, 
                TemplateDescription, 
                TreatmentStatus, 
                TreatmentStart, 
                TreatmentEnd,
                EndReason,
                ProviderReport,
                FollowUpAppointments,
                PAT_ID,
                ClinicalTrial
            ) VALUES (
                '$GUID',
                '$Name', 
                '$Patient_ID', 
                '$Gender', 
                $Age, 
                '$DOB', 
                '$TemplateName', 
                '$Template_ID', 
                '$TemplateDescription', 
                '$TreatmentStatus', 
                '$TreatmentStart', 
                '$TreatmentEnd',
                '$EndReason',
                '$ProviderReport',
                '$FollowUpAppointments',
                '$patId',
                '$ClinicalTrial'
            ) ";
        // error_log($query);
        // echo ($query);

        $result = $this->query($query);
        
        if (!empty($result['error'])) {
            return $result;
        }
        
        // Probably do NOT need Is_Active to be set any longer
        // Is_Active is now only used to indicate that the template is not "archived" version of a newer/modified version of a template
        $query = "
            UPDATE Patient_Assigned_Templates SET
                Date_Ended_Actual = '$TreatmentEnd',
                Is_Active = 1
            WHERE PAT_ID = '$patId'
        ";
        $this->query($query);
        
		$newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
		
        if (is_array($form_data->Meds)) {
            $result = $this->_saveMeds($GUID, $form_data->Meds);
            if (!empty($result['error'])) {
                return $result;
            }
        }
            
        if (is_array($form_data->DiseaseResponse)) {
            $newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
            $result = $this->_saveDiseaseResponse($GUID, $form_data->DiseaseResponse);
            if (!empty($result['error'])) {
                return $result;
            }
        }
        
        if (is_array($form_data->Toxicity)) {
		$newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
            //$result = $this->_saveToxicity($this->_lastId, $form_data->Toxicity);
            $result = $this->_saveToxicity($GUID, $form_data->Toxicity);
            if (!empty($result['error'])) {
                return $result;
            }
        }
        
        if (is_array($form_data->Other)) {
		$newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
            $result = $this->_saveOther($GUID, $form_data->Other);
            if (!empty($result['error'])) {
                return $result;
            }
        }
        
        if (is_array($form_data->Allergies)) {
            foreach ($form_data->Allergies as $allergy) {
				$newidquery = "SELECT NEWID()";
			$GUID = $this->query($newidquery);
			$GUID = $GUID[0][""];
                $query = "
                    INSERT INTO EoTS_Allergies (
                        EoTS_ID,
                        name,
                        type,
                        comment
                    ) VALUES (
                        '$GUID',
                        '{$allergy->name}',
                        '{$allergy->type}',
                        '{$allergy->comment}'
                    )";
                $result = $this->query($query);
                if (!empty($result['error'])) {
                    return $result;
                }
            }
        }
        
        if (is_array($form_data->Amputations)) {
            foreach ($form_data->Amputations as $amputation) {
				$newidquery = "SELECT NEWID()";
				$GUID = $this->query($newidquery);
				$GUID = $GUID[0][""];
                $query = "
                    INSERT INTO EoTS_Amputations (
                        EoTS_ID,
                        description
                    ) VALUES (
                        '$GUID',
                        '{$amputation->description}'
                    )";
                $result = $this->query($query);
                if (!empty($result['error'])) {
                    return $result;
                }
            }
        }
        
        if (is_array($form_data->Vitals)) {
				$newidquery = "SELECT NEWID()";
				$GUID = $this->query($newidquery);
				$GUID = $GUID[0][""];
            $result = $this->_saveVitals($GUID, $form_data->Vitals);
            if (!empty($result['error'])) {
                return $result;
            }
        }
    }    
    
    public function getLastId()
    {
		$newidquery = "SELECT NEWID()";
		$GUID = $this->query($newidquery);
		$GUID = $GUID[0][""];
        return $GUID;
        //return $this->_lastId;
    }
    
    private function _saveVitals($id, $vitals)
    {
        foreach ($vitals as $vital) {
				$newidquery = "SELECT NEWID()";
				$GUID = $this->query($newidquery);
				$GUID = $GUID[0][""];
        
        //    $vitalId = trim(com_create_guid(),'{}');
            $query = "
                INSERT INTO EoTS_Vitals (
                    EoTS_ID,
                    DateTaken,
                    Height,
                    Weight,
                    BP,
                    Temperature,
                    Pain,
                    Pulse,
                    SPO2,
                    WeightFormula,
                    BSA_Weight,
                    BSA_Method,
                    BSA,
                    PSID,
                    PS,
                    Age,
                    Gender,
                    Id,
                    Respiration,
                    Cycle,
                    Day
                ) VALUES (
                    '$id',
                    '{$vital->DateTaken}',
                    '{$vital->Height}',
                    '{$vital->Weight}',
                    '{$vital->BP}',
                    '{$vital->Temperature}',
                    '{$vital->Pain}',
                    '{$vital->Pulse}',
                    '{$vital->SPO2}',
                    '{$vital->WeightFormula}',
                    '{$vital->BSA_Weight}',
                    '{$vital->BSA_Method}',
                    '{$vital->BSA}',
                    '{$vital->PSID}',
                    '{$vital->PS}',
                    '{$vital->Age}',
                    '{$vital->Gender}',
                    '$GUID',
                    '{$vital->Respiration}',
                    '{$vital->Cycle}',
                    '{$vital->Day}'
                )
            ";
            $result = $this->query($query);
            if (!empty($result['error'])) {
                return $result;
            }
            
            foreach ($vital->Amputations as $amputation) {
                $query = "
                    INSERT INTO EoTS_Vitals_Amputations (
                        EoTS_Vitals_Id,
                        Description
                    ) VALUES (
                        '$GUID',
                        '{$amputation->description}'
                    )
                ";
                
                $result = $this->query($query);
                if (! empty($result['error'])) {
                    return $result;
                }
            }
        }
        
    }
    
    private function _saveMeds($id, $meds)
    {
        foreach ($meds as $med) {
            $query = "
                INSERT INTO EoTS_Meds (
                    EoTS_ID,
                    Name
                ) VALUES (
                    '$id',
                    '{$med->name}'
                )
            ";
            $result = $this->query($query);
            if (! empty($result['error'])) {
                return $result;
            }
            
            foreach ($med->administered as $administered) {
                $query = "
                    INSERT INTO EoTS_Meds_Administered (
                        EoTS_ID,
                        EoTS_Meds_Name,
                        Day,
                        Date,
                        Dosage
                    ) VALUES (
                        '$id',
                        '{$med->name}',
                        '{$administered->day}',
                        '{$administered->date}',
                        '{$administered->dosage}'
                    )
                ";
                $result = $this->query($query);
                if (! empty($result['error'])) {
                    return $result;
                }
            }
        }
    }
    
    private function _saveDiseaseResponse($id, $diseaseResponses)
    {
        foreach ($diseaseResponses as $diseaseResponse) {
            $query = "
                INSERT INTO EoTS_DiseaseResponse (
                    EoTS_ID,
                    Day,
                    Date,
                    Description
                ) VALUES (
                    '$id',
                    '{$diseaseResponse->day}',
                    '{$diseaseResponse->date}',
                    '{$diseaseResponse->desc}'
                )
            ";
            $result = $this->query($query);
            if (!empty($result['error'])) {
                return $result;
            }
        }
    }

    private function _saveToxicity($id, $toxicities)
    {
        foreach ($toxicities as $toxicity) {
            $query = "
                INSERT INTO EoTS_Toxicity (
                    EoTS_ID,
                    Day,
                    Date,
                    Description
                ) VALUES (
                    '$id',
                    '{$toxicity->day}',
                    '{$toxicity->date}',
                    '{$toxicity->desc}'
                )
            ";
            $result = $this->query($query);
            if (! empty($result['error'])) {
                return $result;
            }
        }
    }

    private function _saveOther($id, $others)
    {
        foreach ($others as $other) {
            $query = "
                INSERT INTO EoTS_Other (
                    EoTS_ID,
                    Day,
                    Date,
                    Description
                ) VALUES (
                    '$id',
                    '{$other->day}',
                    '{$other->date}',
                    '{$other->desc}'
                )
            ";
            $result = $this->query($query);
            if (! empty($result['error'])) {
                return $result;
            }
        }
    }
    
}