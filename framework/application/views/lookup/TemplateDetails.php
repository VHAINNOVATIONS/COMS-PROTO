<?php 
    
    if(!is_null($templatedetails)){
        
        $numRows = count($templatedetails);

        if($numRows){

            $detail = $templatedetails[0];

            $maxLength = $detail["value"];

            echo "{success:true, total:" .$maxLength .", records:[";

            for ($index = 0; $index < $maxLength; $index++) {

                $nextVal = $index + 1;
                echo " {\"id\":\"" .$index . "\", \"value\":\"" . $nextVal . "\"}";

                if($index < $maxLength - 1){
                    echo ",";
                }
            }

            echo "]}";

        } else {

            echo "{\"success\": false, \"msg\": \"No records found.\"}"; 
        }
    }else {
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }


?>
