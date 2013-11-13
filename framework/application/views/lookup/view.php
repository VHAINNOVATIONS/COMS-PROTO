<?php 


    if(!is_null($lookups)){
        $numRows = count($lookups);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($lookups as $lookup) {

                echo " {\"id\":\"" . $lookup["id"] . "\", \"type\":\"" . $lookup["type"] . "\", \"name\":\"" . 
                        $lookup["Name"] . "\", \"description\":\"" . $lookup["Description"] . "\"}";

                if($rowCount<$numRows){
                    echo ",";
                }


                $rowCount++;


            }


            echo "]}";

        } else {

            /*
             * KD - 5/9/12 - Setting success: false does not allow the message to be displayed in the combo drop down. 
             * This is the reason for success: true
             * 
             */
             echo "{success:true, total:0, records:[{\"id\":\"0\",\"name\":\"No Records Found.\"}]}";
        }
        
    }else{
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }



?>
