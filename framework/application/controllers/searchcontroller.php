<?php

class SearchController extends Controller {

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
    
    function Search(){
        
        $jsonRecord = array();
        
        $records = $this->Search->getSearchResults();
        
        if ($this->checkForErrors('Get Search Failed. ', $records)) {
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


}

?>
