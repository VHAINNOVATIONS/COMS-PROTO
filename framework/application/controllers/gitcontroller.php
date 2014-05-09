<?php

class GitController extends Controller {
    function ListIssues(){
        $jsonRecord = array();
        $records = array();
        $records = $this->Git->getIssues();
        if (1 === count($records) && $records['message']) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $records['message'];
            $this->set('jsonRecord', $jsonRecord);
        }
        else {
            $jsonRecord['success'] = true;            
            $jsonRecord['total'] = count($records);
            $jsonRecord['records'] = $records;
            $this->set('jsonRecord', $jsonRecord);
        }
    }
}

?>
