<?php

    if(is_null($frameworkErr)){

        echo "{\"success\": true, \"msg\": \"Record Deleted.\" , \"records\":[{\"description\":\"".$name."\"}]}"; 
        
    }else{
        echo "{\"success\": false, \"msg\": \"Save Template Failed.\", \"frameworkErr\": \"". $frameworkErr . "\"}";         
    }

?>
