<?php 

    if(!is_null($diseasestages)){
        $numRows = count($diseasestages);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($diseasestages as $stage) {

                echo " {\"id\":\"" . $stage["ID"] . "\", \"name\":\"" . $stage["value"] . "\"}";

                if($rowCount<$numRows){
                    echo ",";
                }


                $rowCount++;


            }


            echo "]}";

        } else {

            echo "{\"success\": false, \"msg\": \"No records found.\"}"; 
        }
        
    }else {
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}";
    }


?>
