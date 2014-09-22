<?php

class SessionController extends Controller {

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
    
    function SessionVars(){
        
        $jsonRecord = array();
        
        $records = $this->Session->getSessionVariables();
        
        if ($this->checkForErrors('Get Session Variables Failed. ', $records)) {
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = true;            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

    function SessionGlobalVars(){
        
        $jsonRecord = array();
        
        $records = $this->Session->getGlobalSessionVariables();
        
        if ($this->checkForErrors('Get Session Global Variables Failed. ', $records)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            $this->set('jsonRecord', $jsonRecord);
            return;
        } 
        
        $jsonRecord['success'] = 'true';            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }

    function Authenticate(){
        
		$form_data = json_decode(file_get_contents('php://input'));
        //$AccessCode = $form_data->AccessCode;
        //$VerifyCode = $form_data->VerifyCode;
		
		$AccessCode = $_GET["Access"];
		$VerifyCode = $_GET["Verify"];
		//$AccessCode = '1programmer';
		//$VerifyCode = 'programmer1';
		
        $jsonRecord = array();
        
        //$records = $this->Session->checkmdwsconnect($AccessCode,$VerifyCode);
        $records = $this->Session->checkAV($AccessCode,$VerifyCode);
               
        $jsonRecord['success'] = 'true';            
        $jsonRecord['total'] = count($records);

        $jsonRecord['records'] = $records;

        $this->set('jsonRecord', $jsonRecord);
        
    }
}

?>
