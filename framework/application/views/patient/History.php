<?php $number = 0?>

<?php 

    if(!is_null($history)){
        $numRows = count($history);

        if($numRows){

            echo "{\"success\":true, \"total\":" .$numRows .",\"records\":[";

            $rowCount=1;
            //display the results 
            foreach ($history as $info) {

                echo " {\"DiseaseType\":\"" . $info["DiseaseType"] . "\", \"DiseaseCat\":\"" . $info["DiseaseCat"] . "\", \"Chemo\":\"" 
                       .$info["Chemo"] . "\", \"Radiation\":\"" .$info["Radiation"] . "\", \"PerfStat\":\"" .$info["PerfStat"] . 
                       "\", \"TreatIndic\":\"" .$info["TreatIndic"] . "\", \"Protocol\":\"" .$info["Protocol"] . "\"}";

                if($rowCount<$numRows){
                    echo ",";
                }


                $rowCount++;


            }


            echo "]}";

        } else {

            echo "{\"success\": false, \"msg\": \"No records found.\"}"; 
        }
        
    }else{
        echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}"; 
    }


?>
