<?php

    if(is_null($frameworkErr)){
        echo "{\"success\": true, \"msg\": \"Record added.\" , \"records\":[{\"id\":\"".$patientTemplateId[0]['id']."\"}]}"; 
    } else {
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }


?>
