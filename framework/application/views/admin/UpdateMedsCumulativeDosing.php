<?php

    if(is_null($frameworkErr)){

            echo "{\"success\": true, \"msg\": \"Record added.\" }"; 

        }
    else{
        echo "{\"success\": false, \"msg\": \"Save Meds Rounding Failed.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }
    
?>
