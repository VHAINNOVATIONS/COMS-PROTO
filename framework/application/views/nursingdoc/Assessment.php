<?php

    if(is_null($frameworkErr)){
        echo json_encode($jsonRecord);
    } else {
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }


?>
