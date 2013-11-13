<?php

    if(is_null($frameworkErr)){
        if(is_null($lookupid[0]["lookupid"])){
            echo "{\"success\": false, \"message\": \"Record already exists.\" , \"lookupid\": \"". $actuallookupid . "\"}"; 
        }else{
            echo "{\"success\": true, \"message\": \"Record added.\" , \"records\":[{\"id\":\"".$savedid."\",\"value\":\"".$savedname.
                "\",\"description\":\"".$savedescription."\",\"lookupid\":\"".$lookupid[0]["lookupid"]."\"}]}"; 
        }
    } else {
        echo "{\"success\": false, \"message\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }

?>
