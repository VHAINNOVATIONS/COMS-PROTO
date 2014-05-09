<?php

class EndTreatmentSummaryController extends Controller 
{

    public function checkForErrors($errorMsg, $retVal) 
    {
        if (!empty($retVal['error'])) {

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
    
    public function EoTS($EoTS_ID = null)
    {
        $form_data = json_decode(file_get_contents('php://input'));
        $jsonRecord = array();

        if ($form_data != null) {
        
            $this->EndTreatmentSummary->beginTransaction();

            $returnVal = $this->EndTreatmentSummary->saveEoTS($form_data);
            
            if ($this->checkForErrors('End of Treatment Summary Save Failed. ', $returnVal)) {
                $this->EndTreatmentSummary->rollbackTransaction();
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            }

            $this->EndTreatmentSummary->endTransaction();
                       
            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = 1;
            $jsonRecord['records'] = array('EoTS_ID' => $this->EndTreatmentSummary->getLastId());
            $this->set('jsonRecord', $jsonRecord);
        
        } else {
	
            $records = $this->EndTreatmentSummary->getEoTS($EoTS_ID);
        
            if ($this->checkForErrors('Get EoTS Failed. ', $records)) {
                $jsonRecord['success'] = false;
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
}