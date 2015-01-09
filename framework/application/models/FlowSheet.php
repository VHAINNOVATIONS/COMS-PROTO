<?php

/**
 * Flowsheet model
 */
class Flowsheet extends Model
{

    private $_flowsheetId = null;
    
    public function getFlowsheetId() {
        return $this->_flowsheetId;
    }
    
    /**
     * Saves a flowsheet record with the given data
     *
     * {
     *     "PAT_ID": "2B4D1345-22B6-E111-A560-000C2935B86F",
     *     "FlowsheetAdminDay": {
     *         "Weight": "250",
     *         "PatientID": "B521F525-6099-E111-8812-000C2935B86F",
     *         "Cycle": "1",
     *         "Day": "1",
     *         "AdminDate": "06/14/2012"
     *     },
     *     "id": null
     * }
     */
    public function saveFlowsheet($data)
    {
        $PAT_ID = $data->PAT_ID;
        $flowsheetAdminDay = $data->FlowsheetAdminDay;
        $cycle = $flowsheetAdminDay->Cycle;
        $day = $flowsheetAdminDay->Day;
        $adminDate = $flowsheetAdminDay->AdminDate;
        $weight = (!empty($flowsheetAdminDay->Weight)) ? $flowsheetAdminDay->Weight : 'null';
        $diseaseResponse = (!empty($flowsheetAdminDay->DiseaseResponse)) ? $this->escapeString($flowsheetAdminDay->DiseaseResponse) : null;
        $toxicity = (!empty($flowsheetAdminDay->Toxicity)) ? $this->escapeString($flowsheetAdminDay->Toxicity) : null;
        $ToxicityLU_ID = (!empty($flowsheetAdminDay->ToxicityLU_ID)) ? $this->escapeString($flowsheetAdminDay->ToxicityLU_ID) : null;
        $other = (!empty($flowsheetAdminDay->Other)) ? $this->escapeString($flowsheetAdminDay->Other) : null;
        
        $result = $this->query("
            SELECT FS_ID, Weight, Disease_Response, Toxicity, Other
            FROM Flowsheet_ProviderNotes
            WHERE PAT_ID = '$PAT_ID'
                AND Cycle = '$cycle'
                AND Day = '$day'
                AND AdminDate = '$adminDate'
        ");
        
        if (empty($result)) {
            $this->_flowsheetId = $this->newGUID(); // trim(com_create_guid(), '{}');
            
            $query = 
                "INSERT INTO Flowsheet_ProviderNotes (
                     FS_ID,
                     Weight,
                     Disease_Response,
                     Toxicity,
                     ToxicityLU_ID,
                     Other,
                     PAT_ID,
                     Cycle,
                     Day,
                     AdminDate
                 ) VALUES (
                     '{$this->_flowsheetId}',
                     $weight,
                     '$diseaseResponse',
                     '$toxicity',
                     '$ToxicityLU_ID',
                     '$other',
                     '$PAT_ID',
                     '$cycle',
                     '$day',
                     '$adminDate'
                ) ";
            
        
        } else {
            $this->_flowsheetId = $result[0]['FS_ID'];
            $weight = (empty($weight) || $weight === 'null') ? $result[0]['Weight'] : $weight;
            $weight = (empty($weight)) ? 'null' : $weight; // we actually need a second statement to assign the value for 'weight' to make sure the query still works with a null value
            $diseaseResponse = (empty($diseaseResponse)) ? $this->escapeString($result[0]['Disease_Response']) : $diseaseResponse;
            $toxicity = (empty($toxicity)) ? $this->escapeString($result[0]['Toxicity']) : $toxicity;
            $ToxicityLU_ID = (empty($ToxicityLU_ID)) ? $this->escapeString($result[0]['ToxicityLU_ID']) : $ToxicityLU_ID;
            $other = (empty($other)) ? $this->escapeString($result[0]['Other']) : $other;
            $query = 
                "UPDATE Flowsheet_ProviderNotes SET
                     Weight = $weight,
                     Disease_Response = '$diseaseResponse',
                     Toxicity = '$toxicity',
                     ToxicityLU_ID = '$ToxicityLU_ID',
                     Other = '$other'
                 WHERE PAT_ID = '$PAT_ID'
                   AND Cycle = '$cycle'
                   AND Day = '$day'
                   AND AdminDate = '$adminDate'
                 ";
        }
        return $this->query($query);
    }

    /**
     * Retrieves flowsheets.
     */
    public function getFlowsheet($id)
    {
        $query1 = "
            SELECT 
                ndt.PAT_ID AS patId, 
                ndt.Cycle AS cycle, 
                ndt.AdminDay AS adminDay, 
                ndt.AdminDate AS adminDate, 
                ndt.Type AS type, 
                ndt.Drug AS drug, 
                ndt.Dose AS dose, 
                ndt.Unit AS unit,
                fs.Weight AS weight, 
                fs.Disease_Response AS disease, 
                fs.ToxicityLU_ID AS ToxicityLU_ID, 
                fs.Toxicity AS toxicity, 
                fs.Other AS other
            FROM ND_Treatment ndt 
            LEFT JOIN Flowsheet_ProviderNotes fs ON (
                ndt.PAT_ID = fs.PAT_ID AND ndt.AdminDate = fs.AdminDate
            )
            WHERE ndt.PAT_ID = '$id' 
            UNION
            SELECT 
                fs.PAT_ID AS patId, 
                fs.Cycle AS cycle, 
                fs.Day AS adminDay, 
                fs.AdminDate AS adminDate, 
                ndt.Type AS type, 
                ndt.Drug AS drug, 
                ndt.Dose AS dose, 
                ndt.Unit AS unit,
                fs.Weight AS weight, 
                fs.Disease_Response AS disease, 
                fs.ToxicityLU_ID AS ToxicityLU_ID, 
                fs.Toxicity AS toxicity, 
                fs.Other AS other
            FROM Flowsheet_ProviderNotes fs 
            LEFT JOIN ND_Treatment ndt ON (
                ndt.PAT_ID = fs.PAT_ID AND ndt.AdminDate = fs.AdminDate
            )
            WHERE fs.PAT_ID = '$id'
        ";

	$results1 = $this->query($query1);

        $query2 = "
            SELECT 
                ndt.PAT_ID AS patId, 
                ndt.Cycle AS cycle, 
                ndt.AdminDay AS adminDay, 
                ndt.AdminDate AS adminDate, 
                ndt.Type AS type, 
                ndt.Drug AS drug, 
                ndt.Dose AS dose, 
                ndt.Unit AS unit,
                fs.Weight AS weight, 
                fs.Disease_Response AS disease, 
                fs.ToxicityLU_ID AS ToxicityLU_ID, 
                convert(varchar(MAX), sci.details) as toxDetails,
                sci.label as ToxInstr,
                fs.Toxicity AS toxicity, 
                fs.Other AS other
            FROM ND_Treatment ndt 
            LEFT JOIN Flowsheet_ProviderNotes fs ON (
                ndt.PAT_ID = fs.PAT_ID AND ndt.AdminDate = fs.AdminDate
            )
            join SiteCommonInformation sci on sci.ID = fs.ToxicityLU_ID
            WHERE ndt.PAT_ID = '$id' 
            UNION
            SELECT 
                fs.PAT_ID AS patId, 
                fs.Cycle AS cycle, 
                fs.Day AS adminDay, 
                fs.AdminDate AS adminDate, 
                ndt.Type AS type, 
                ndt.Drug AS drug, 
                ndt.Dose AS dose, 
                ndt.Unit AS unit,
                fs.Weight AS weight, 
                fs.Disease_Response AS disease, 
                fs.ToxicityLU_ID AS ToxicityLU_ID, 
                convert(varchar(MAX), sci.details) as toxDetails,
                sci.label as ToxInstr,
                fs.Toxicity AS toxicity, 
                fs.Other AS other
            FROM Flowsheet_ProviderNotes fs 
            LEFT JOIN ND_Treatment ndt ON (
                ndt.PAT_ID = fs.PAT_ID AND ndt.AdminDate = fs.AdminDate
            )
            join SiteCommonInformation sci on sci.ID = fs.ToxicityLU_ID
            WHERE fs.PAT_ID = '$id'
            ";

        $results2 = $this->query($query2);

		$results = array_merge ((array)$results1,(array)$results2);

		foreach ($results as $result) {
            if (empty($result['cycle']) || empty($result['adminDay'])) {
                continue;
            }
                
            $index = "Cycle " . $result['cycle'] . ", Day " . $result['adminDay'];
            $date = $result['adminDate'];
            
            $flowsheetRow["01 General"]["Date"][$index] = $date;
            
            if (!empty($result['type'])) {
                $type = $result['type'];
                switch ($type) {
                    case 'Pre Therapy':
                        $typeOrderId = '03';
                        break;
                    case 'Therapy':
                        $typeOrderId = '04';
                        break;
                    case 'Post Therapy':
                        $typeOrderId = '05';
                        break;
                }
                $label = $result['drug'];
                $value = $result['dose'] . ' ' . $result['unit'];
                
                $flowsheetRow["$typeOrderId $type"][$label][$index] = $value;
            }
            
            
            if (!empty($result['weight'])) {
                $flowsheetRow["01 General"]["Weight"][$index] = $result['weight'];
            }
            if (!empty($result['disease'])) {
                $flowsheetRow["01 General"]["Disease"][$index] = $result['disease'];
            }
            if (!empty($result['toxicity'])) {
                $tox = array();
                $tox["Instr"] = $result['ToxInstr'];
                $tox["Details"] = $result['toxDetails'];
                $tox["Comments"] = $result['toxicity'];

                $flowsheetRow["01 General"]["Toxicity"][$index] = json_encode($tox);
            }
            if (!empty($result['other'])) {
                $flowsheetRow["01 General"]["Other"][$index] = $result['other'];
            }
        }
        
        if (! empty($flowsheetRow['01 General']['Date'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'Date'
            ), $flowsheetRow['01 General']['Date']);
        }
        
        if (! empty($flowsheetRow['01 General']['Weight'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'Weight'
            ), $flowsheetRow['01 General']['Weight']);
        }
        
        if (! empty($flowsheetRow['01 General']['Disease'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'Disease'
            ), $flowsheetRow['01 General']['Disease']);
        }
        
        if (! empty($flowsheetRow['01 General']['Toxicity'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'Toxicity'
            ), $flowsheetRow['01 General']['Toxicity']);
        }
        if (! empty($flowsheetRow['01 General']['ToxicityLU_ID'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'ToxicityLU_ID'
            ), $flowsheetRow['01 General']['ToxicityLU_ID']);
        }
        
        if (! empty($flowsheetRow['01 General']['Other'])) {
            $flowsheet[] = array_merge(array(
                'Type' => '01 General',
                'label' => 'Other'
            ), $flowsheetRow['01 General']['Other']);
        }
        
        if (!empty($flowsheetRow['03 Pre Therapy'])) {
            foreach ($flowsheetRow['03 Pre Therapy'] as $label => $therapy) {
                $flowsheet[] = array_merge(array(
                    'Type' => '03 Pre Therapy',
                    'label' => $label
                ), $therapy);
            }
        }

        if (!empty($flowsheetRow['04 Therapy'])) {
            foreach ($flowsheetRow['04 Therapy'] as $label => $therapy) {
                $flowsheet[] = array_merge(array(
                    'Type' => '04 Therapy',
                    'label' => $label
                ), $therapy);
            }
        }
        
        if (!empty($flowsheetRow['05 Post Therapy'])) {
            foreach ($flowsheetRow['05 Post Therapy'] as $label => $therapy) {
                $flowsheet[] = array_merge(array(
                    'Type' => '05 Post Therapy',
                    'label' => $label
                ), $therapy);
            }
        }
        
        if (! empty($flowsheet)) {
            return $flowsheet;
        }
    }

    function getTemplateID($PAT_ID = null) {
        $retVal = null;
        if ($PAT_ID) {
            $query = "select Template_ID from Patient_Assigned_Templates where PAT_ID = '$PAT_ID'";
            $ret = $this->query($query);
            if (!empty($ret['error'])) {
                foreach ($ret['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
                }
                $this->set('frameworkErr', $errorMsg);

            }

            $retVal = $ret[0]["Template_ID"];
        }
        return $retVal;
    }

///newfunction
function FS($PatientID, $TemplateID){
        
	$query = "SELECT Order_Status
      ,Drug_Name
      ,Order_Type
      ,Template_ID
      ,Template_IDMT
      ,Patient_ID
      ,Order_ID
      ,Drug_ID
      ,Date_Modified
      ,CONVERT(VARCHAR(10), Date_Entered, 101) as Date_Entered
      ,Notes
      ,FluidType
      ,FluidVol
      ,FlowRate
      ,AdminDay
      ,InfusionTime
      ,AdminTime
      ,Sequence
      ,Amt
      ,iAmt
      ,Unit
      ,Type
      ,RegNum
      ,RegDose
      ,RegDoseUnit
      ,RegDosePct
      ,RegReason
      ,PatientDose
      ,PatientDoseUnit
      ,Route
      ,flvol
      ,flunit
      ,infusion
      ,bsaDose
      ,Reason
      ,CONVERT(VARCHAR(10), Admin_Date, 101) as Admin_Date
      ,DateApplied
      ,DateEndedActual
      ,DateEnded
      ,Goal
      ,ClinicalTrial
      ,PerformanceStatus
      ,WeightFormula
      ,BSAFormula
  FROM Order_Status
  WHERE Patient_ID = '$PatientID'";



$query = "SELECT 
      os.Order_Status
      ,os.Drug_Name
      ,os.Order_Type
      ,os.Template_ID
      ,os.Template_IDMT
      ,os.Patient_ID
      ,os.Order_ID
      ,os.Drug_ID
      ,os.Date_Modified
      ,CONVERT(VARCHAR(10), os.Date_Entered, 101) as Date_Entered
      ,os.Notes
      ,os.FluidType
      ,os.FluidVol
      ,os.FlowRate
      ,os.AdminDay
      ,os.InfusionTime
      ,os.AdminTime
      ,os.Sequence
      ,os.Amt
      ,os.iAmt
      ,os.Unit
      ,os.Type
      ,os.RegNum
      ,os.RegDose
      ,os.RegDoseUnit
      ,os.RegDosePct
      ,os.RegReason
      ,os.PatientDose
      ,os.PatientDoseUnit
      ,os.Route
      ,os.flvol
      ,os.flunit
      ,os.infusion
      ,os.bsaDose
      ,os.Reason
      ,CONVERT(VARCHAR(10), os.Admin_Date, 101) as Admin_Date
      ,os.DateApplied
      ,os.DateStarted
      ,os.DateEnded
      ,os.DateEndedActual
      ,os.Goal
      ,os.ClinicalTrial
      ,os.PerformanceStatus
      ,os.WeightFormula
      ,os.BSAFormula
      ,ndt.Treatment_ID
      ,ndt.Patient_ID
      ,ndt.Template_ID
      ,ndt.PAT_ID
      ,ndt.Cycle
      ,ndt.AdminDay
      ,CONVERT(VARCHAR(10), ndt.AdminDate, 101) as AdminDate
      ,ndt.Type
      ,ndt.Drug
      ,ndt.Dose
      ,ndt.Unit
      ,ndt.Route
      ,substring(ndt.StartTime, 12, 30) as StartTime
      ,substring(ndt.EndTime, 12, 30) as EndTime
      ,ndt.Comments
      ,ndt.Treatment_User
      ,ndt.Treatment_Date
      ,ndt.Drug_OriginalValue
      ,ndt.Dose_OriginalValue
      ,ndt.Unit_OriginalValue
      ,ndt.Route_OriginalValue
  FROM Order_Status os
  join ND_Treatment ndt on ndt.AdminDate = os.Admin_Date and ndt.Patient_ID = os.Patient_ID and os.Drug_Name = ndt.Drug
  where ndt.Patient_ID = '$PatientID' and os.Order_Status = 'Administered' or os.Order_Status = 'Hold' and os.Template_ID = '$TemplateID'";





$query = "SELECT 
      os.Order_Status
      ,os.Drug_Name
      ,os.Order_Type
      ,os.Template_ID
      ,os.Template_IDMT
      ,os.Patient_ID
      ,os.Order_ID
      ,os.Drug_ID
      ,os.Date_Modified
      ,CONVERT(VARCHAR(10), os.Date_Entered, 101) as Date_Entered
      ,os.Notes
      ,os.FluidType
      ,os.FluidVol
      ,os.FlowRate
      ,os.AdminDay
      ,os.InfusionTime
      ,os.AdminTime
      ,os.Sequence
      ,os.Amt
      ,os.iAmt
      ,os.Unit
      ,os.Type
      ,os.RegNum
      ,os.RegDose
      ,os.RegDoseUnit
      ,os.RegDosePct
      ,os.RegReason
      ,os.PatientDose
      ,os.PatientDoseUnit
      ,os.Route
      ,os.flvol
      ,os.flunit
      ,os.infusion
      ,os.bsaDose
      ,os.Reason
      ,CONVERT(VARCHAR(10), os.Admin_Date, 101) as Admin_Date
      ,os.DateApplied
      ,os.DateStarted
      ,os.DateEnded
      ,os.DateEndedActual
      ,os.Goal
      ,os.ClinicalTrial
      ,os.PerformanceStatus
      ,os.WeightFormula
      ,os.BSAFormula
      ,ndt.Treatment_ID
      ,ndt.Patient_ID
      ,ndt.Template_ID
      ,ndt.PAT_ID
      ,ndt.Cycle
      ,ndt.AdminDay
      ,CONVERT(VARCHAR(10), ndt.AdminDate, 101) as AdminDate
      ,ndt.Type
      ,ndt.Drug
      ,ndt.Dose
      ,ndt.Unit
      ,ndt.Route
      ,StartTime
      ,EndTime
      ,ndt.Comments
      ,ndt.Treatment_User
      ,ndt.Treatment_Date
      ,ndt.Drug_OriginalValue
      ,ndt.Dose_OriginalValue
      ,ndt.Unit_OriginalValue
      ,ndt.Route_OriginalValue
  FROM Order_Status os
  join ND_Treatment ndt on ndt.AdminDate = os.Admin_Date and ndt.Patient_ID = os.Patient_ID and os.Order_ID = ndt.Order_ID
  where ndt.Patient_ID = '$PatientID' and os.Order_Status = 'Administered' or os.Order_Status = 'Hold' and os.Template_ID = '$TemplateID'";
error_log("FS Query - ");
error_log($query);

// echo "======================================================<br>$query ================================================================<br><br><br>";
		$result = $this->query($query);
		//var_dump($result);
		//$arr = array_merge ((array)$result,(array)$result2,(array)$result3);
        return ($result);
    }
}