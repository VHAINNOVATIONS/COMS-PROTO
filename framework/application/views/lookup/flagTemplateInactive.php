<?php
ChromePhp::log("flagTemplateInactive - View");
    if(is_null($frameworkErr)){
        echo "{\"success\": true, \"msg\": \"Template Flagged as Inactive.\" , \"records\":[{\"description\":\"".$id."\"}]}"; 
    }else{
        echo "{\"success\": false, \"msg\": \"Template Flagged as Inactive Failed.\", \"frameworkErr\": \"". $frameworkErr . "\"}";         
    }
?>