<?php

class AdminController extends Controller {

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
    
    function Globals(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getGlobals();
        
        if ($this->checkForErrors('Get Globals Failed. ', $records)) {
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

	function Users(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getUsers();
        
        if ($this->checkForErrors('Get Users Failed. ', $records)) {
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
	
	function ActiveWorkFlows(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getActiveWorkflows();
        
        if ($this->checkForErrors('Get Active Workflows Failed. ', $records)) {
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
	
	function InActiveWorkFlows(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getInActiveWorkflows();
        
        if ($this->checkForErrors('Get InActive Workflows Failed. ', $records)) {
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

	function MedsRounding(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsRounding();
        
        if ($this->checkForErrors('Get Meds for Non Rounding Failed. ', $records)) {
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

	function MedsNonRounded(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsNonRounded();
        
        if ($this->checkForErrors('Get Meds for Non Rounding Failed. ', $records)) {
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

	function UpdateMedsNonRounding(){
        
        $form_data = json_decode(file_get_contents('php://input'));
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateMedsNonRounding($form_data);		
		
		if($this->checkForErrors('Apply Meds for Non Rounding Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            //$retVal = $this->Admin->updateMedsNonRounding($form_data);
            $this->set('MedsNonRoundingrecords', null);
	}

	function MedsCumulativeDosing(){
        
        $jsonRecord = array();
        
        $records = $this->Admin->getMedsCumulativeDosing();
        
        if ($this->checkForErrors('Get Meds for Cumulative Dosing Failed. ', $records)) {
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

	function UpdateMedsCumulativeDosing(){
        
        $form_data = json_decode(file_get_contents('php://input'));
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateMedsCumulativeDosing($form_data);		
		
		if($this->checkForErrors('Apply Meds for Cumulative Dosing Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $this->set('MedsCumulativeDosingrecords', null);
	}
	
	function UpdateGlobals(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateGlobals($form_data);		
		
		if($this->checkForErrors('Apply Global Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateGlobals($form_data);
            $this->set('globalrecords', null);
	}
	
	function UpdateUsers(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateUsers($form_data);		
		
		if($this->checkForErrors('Update User Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateUsers($form_data);
            $this->set('globalrecords', null);
	}
	
	function UpdateWorkflows(){
        
        $form_data = json_decode(file_get_contents('php://input'));   
		
		$this->Admin->beginTransaction();
        
		$returnVal = $this->Admin->updateWorkflows($form_data);		
		
		if($this->checkForErrors('Update Workflow Values Failed. ', $returnVal)){
            
            $this->Admin->rollbackTransaction();            
            return;
        }

        $this->set('frameworkErr',null);
        
        $this->Admin->endTransaction();  
		
            $retVal = $this->Admin->updateWorkflows($form_data);
            $this->set('workflowrecords', null);
	}
}

?>
