<?php 

    if(!is_null($regimens)){
        $numRows = count($regimens);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($regimens as $regimen) {

                echo " {\"id\":\"" . $regimen["id"] . "\", \"regnumber\":\"" . $regimen["regnumber"] . "\", \"drug\":\"" . 
                        $regimen["drug"] . "\", \"regdose\":\"" . $regimen["regdose"] . "\", \"regdoseunit\":\"" . 
                        $regimen["regdoseunit"] . "\", \"regdosepct\":\"" . $regimen["regdosepct"] . "\", \"regreason\":\"" .
                        $regimen["regreason"] . "\", \"patientdose\":\"" . $regimen["patientdose"] . "\", \"patientdoseunit\":\"" .
                        $regimen["patientdoseunit"] . "\", \"route\":\"" . $regimen["route"] . "\", \"adminday\":\"" .
                        $regimen["adminDay"] . "\", \"flmin\":\"" . $regimen["flmin"] . "\", \"flmax\":\"" . $regimen["flmax"] . "\", \"flunit\":\"".
                        $regimen["flunit"] . "\", \"infusion\":\"" . $regimen["infusion"] . "\"}";

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
