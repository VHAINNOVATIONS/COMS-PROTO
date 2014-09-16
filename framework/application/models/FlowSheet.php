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
     * A sample response for requested flowsheet:
     *
     * {
     *     "success":true,
     *     "total":##,
     *     "records": [
     *         {
     *             "AllFlowsheet": [
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Date",
     *                     "Cycle 1, Day 1": "06/15/2012",
     *                     "Cycle 1, Day 2": "06/16/2012",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Performance",
     *                     "Cycle 1, Day 1": "0-Normal Performance",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Weight",
     *                     "Cycle 1, Day 1": "",
     *                     "Cycle 1, Day 2": "250",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Disease",
     *                     "Cycle 1, Day 1": "Some text",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Toxicity",
     *                     "Cycle 1, Day 1": "Some text",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "01 General",
     *                     "label": "Other",
     *                     "Cycle 1, Day 1": "Some text",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "02 Labs",
     *                     "label": "CBC",
     *                     "Cycle 1, Day 1": "58 XXX",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "02 Labs",
     *                     "label": "Electrolytes",
     *                     "Cycle 1, Day 1": "20 YYY",
     *                     "Cycle 1, Day 2": "",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "03 Pre Therapy",
     *                     "label": "Dexamethasone INJ, SOL",
     *                     "Cycle 1, Day 1": "5 mg",
     *                     "Cycle 1, Day 2": "5 mg",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "03 Pre Therapy",
     *                     "label": "Dexamethasone Tab",
     *                     "Cycle 1, Day 1": "50 mg",
     *                     "Cycle 1, Day 2": "50 mg",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "04 Therapy",
     *                     "label": "Dexamethasone Tab",
     *                     "Cycle 1, Day 1": "50 mg",
     *                     "Cycle 1, Day 2": "50 mg",
     *                     ...
     *                 },
     *                 {
     *                     "Type": "05 Post Therapy",
     *                     "label": "Dexamethasone Tab",
     *                     "Cycle 1, Day 1": "50 mg",
     *                     "Cycle 1, Day 2": "50 mg",
     *                     ...
     *                 }
     *             ]
     *         }
     *     ]
     * }
     */
    public function getFlowsheet($id)
    {
        error_log("Get Flowsheet");
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

///newfunction
function FS($patientID){



$query = "SELECT 
Performance_ID as ph_Performance_ID ,Patient_History.Weight as ph_Weight ,Treatment_ID as ndt_TreatmentID 
,ndt.Patient_ID as ndt_Patient_ID ,ndt.Template_ID as ndt_Template_ID ,ndt.PAT_ID as ndt_PATID 
,fspn.PAT_ID as fs_PATID ,ndt.Cycle as ndt_Cycle ,AdminDay as ndt_AdminDay ,ndt.AdminDate as ndt_AdminDate 
,Type as ndt_Type ,Drug as ndt_Drug ,Dose as ndt_Dose ,Unit as ndt_Unit ,Route as ndt_Route 
,StartTime as ndt_StartTime ,EndTime as ndt_EndTime ,Comments as ndt_Comments ,Treatment_User as ndt_TreatmentUser 
,Treatment_Date as ndt_TreatmentDate ,Drug_OriginalValue as ndt_DrugOriginalValue 
,Dose_OriginalValue as ndt_DoseOriginalValue ,Unit_OriginalValue as ndt_UnitOriginalValue 
,Route_OriginalValue as ndt_RouteOriginalValue 
FROM ND_Treatment ndt 
CROSS JOIN Patient_History
 LEFT JOIN FlowSheet_ProviderNotes fspn ON fspn.PAT_ID = ndt.PAT_ID 
 AND ndt.Patient_ID = '$patientID'
WHERE Patient_History.Weight IS NOT NULL
AND Patient_History.Weight != ''";  
		
		$result = $this->query($query);

error_log("FS Function - First Query Result");
error_log(json_encode($result));

	$query2 = "SELECT TOP 1 Performance_ID as ph_Performance_ID
		,Patient_History.Weight as ph_Weight,
		Date_taken 
		FROM Patient_History
		Where Patient_ID = '$patientID'
		AND Weight != ''";
		
		$result2 = $this->query($query2);
		
error_log("FS Function - Second Query Result");
error_log(json_encode($result2));



		$query3 = "SELECT Template_ID, Order_ID, Order_Status, Drug_Name, Order_Type, FlowRate, AdminDay, Admin_Date, AdminTime, Amt, InfusionTime, Sequence, FluidVol, Reason, Date_Entered
,RegNum, RegDose, RegDoseUnit, RegDosePct, RegReason, PatientDose, PatientDoseUnit, Route, flvol, flunit, infusion, bsaDose, Reason
  FROM Order_Status
  WHERE Patient_ID = '$patientID'";
		
		$result3 = $this->query($query3);


error_log("FS Function - Third Query Result");
error_log(json_encode($result3));

		$arr = array_merge ((array)$result,(array)$result2,(array)$result3);
		return ($arr);
	}
}