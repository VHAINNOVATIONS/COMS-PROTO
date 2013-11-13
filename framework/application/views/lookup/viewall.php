<?php 

    if(!is_null($lookups)){
        $numRows = count($lookups);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($lookups as $lookup) {

                echo " {\"id\":\"" . $lookup["ID"] . "\", \"value\":\"" . $lookup["Name"] . "\", \"type\":\"" .
                        $lookup["type"] ."\", \"description\":\"" . $lookup["description"] . "\"}";

                if($rowCount<$numRows){
                    echo ",";
                }


                $rowCount++;


            }


            echo "]}";

        } else {

             echo "{success:true, total:0, records:[{\"id\":\"0\",\"description\":\"No Records Found.\"}]}";
        }
        
    }else {
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}";
    }


?>
