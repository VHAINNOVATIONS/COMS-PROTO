<?php 

    if(!is_null($references)){
        $numRows = count($references);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($references as $reference) {

                echo " {\"name\":\"" . $reference["name"] . "\", \"description\":\"" . $reference["description"] . "\"}";

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
