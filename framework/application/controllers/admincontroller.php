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

    function UserRoles(){
        $jsonRecord = array();

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $query = "SELECT * FROM Roles ORDER BY username";
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Get Users Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $username = $form_data->{'username'};
            $role = $form_data->{'role'};
            $DisplayName = $form_data->{'DisplayName'};
            $Email = $form_data->{'Email'};
            $TemplateAuthoring = $form_data->{'TemplateAuthoring'};

$query = "Update Roles 
            set username = '$username',
            role ='$role', 
            DisplayName ='$DisplayName', 
            Email = '$Email',
            TemplateAuthoring ='$TemplateAuthoring'
            where rid = '$rid'";
error_log("UPDATE Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Update User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $username = $form_data->{'username'};
            $role = $form_data->{'role'};
            $DisplayName = $form_data->{'DisplayName'};
            $Email = $form_data->{'Email'};
            $TemplateAuthoring = $form_data->{'TemplateAuthoring'};
            $query = "INSERT into Roles (rid, username, role, DisplayName, Email, TemplateAuthoring) VALUES ('$rid', '$username','$role', '$DisplayName', '$Email','$TemplateAuthoring')";
error_log("POST Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Save New User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 

        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $rid = $form_data->{'rid'};
            $query = "DELETE from Roles where rid='$rid'";
error_log("Delete Record - $query");
            $records = $this->Admin->query( $query );
            if ($this->checkForErrors('Delete User Failed. ', $records)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
        }
        $jsonRecord['success'] = true;            
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
