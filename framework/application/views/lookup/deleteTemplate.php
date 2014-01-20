<?php
    if(is_null($frameworkErr)){
        echo "{\"success\": true, \"msg\": \"Template Deleted.\" , \"records\":[{\"description\":\"".$name."\"}]}"; 
    }else{
        echo "{\"success\": false, \"msg\": \"Delete Template Failed.\", \"frameworkErr\": \"". $frameworkErr . "\"}";         
    }
?>
