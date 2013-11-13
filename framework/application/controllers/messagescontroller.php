<?php

class MessagesController extends Controller {

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

    function Filtered($type = null, $rid = NULL) {
        
        $jsonRecord = array();        
        
        if ($type != NULL && $rid != NULL) {
            
            if('RID' === $type){
                $records = $this->Messages->GetMessagesByRID($rid);
            }
            
            if ($this->checkForErrors('Get Message Failed. ', $records)) {
                $jsonRecord['success'] = 'false';
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $this->set('jsonRecord', $jsonRecord);
                return;
            } 
            
            $jsonRecord['success'] = 'true';            
            $jsonRecord['total'] = count($records);
            
            $jsonRecord['records'] = $records;
            
            $this->set('jsonRecord', $jsonRecord);
            
        } else if($type != NULL) {
            
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Role ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        } else {

            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = 'No Filter Type OR Role ID provided.';
            $this->set('jsonRecord', $jsonRecord);
            
        }
    }

}

?>