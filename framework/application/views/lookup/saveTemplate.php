<?php

    if(is_null($frameworkErr)){
        if(is_null($templateid)){
            echo "{\"success\": false, \"msg\": \"Record already exists.\"}"; 
        }else{
            echo "{\"success\": true, \"msg\": \"Record added.\" , \"records\":[{\"id\":\"".$templateid."\",\"RegimenName\":\"".$templatename."\"}]}"; 

        }
    }else{
        echo "{\"success\": false, \"msg\": \"Save Template Failed.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }


?>
