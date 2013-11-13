<?php 
    

    if(!is_null($hydrations)) {
        $numRows = count($hydrations);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($hydrations as $hydration) {
                echo " {\"id\":\"" . $hydration["id"] . "\", \"Instructions\":\"" . $hydration["description"] . 
                        "\", \"drug\":\"" .$hydration["drug"] . "\", \"Sequence\":\"".$hydration["Sequence"]. "\", ";


                $myinfusions = $infusions[$hydration['id']];
                $numInfusions = count($myinfusions);

                $infusionCount=1;

                foreach($myinfusions as $infusion){

                    echo "\"Amt".$infusionCount."\":\"".$infusion['amt'] ."\", \"Units".$infusionCount."\":\"" .$infusion['unit'].
                         "\", \"Infusion".$infusionCount."\":\"" .$infusion['type']."\"";

                    if($infusionCount < $numInfusions){
                        echo ",";
                    }
                    
                    $infusionCount++;
                }
                
                echo "}";
                
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
