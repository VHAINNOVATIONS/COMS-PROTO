<?php $number = 0?>

<?php 

    if(is_null($frameworkErr)){
        $numRows = count($patientTemplate);

        if($numRows){

            echo "{\"success\":true, \"total\":" .$numRows .",\"records\":[";

            $rowCount=1;
            //display the results 
            foreach ($patientTemplate as $info) {

                echo " {\"id\":\"" . $info["ID"] . "\", \"TemplateID\":\"".$info["templateId"]. "\", \"TemplateName\":\"" . $info["templatename"] . "\", \"DateStarted\":\"" 
                       .$info["started"] . "\", \"DateEnded\":\"" .$info["ended"] . "\", \"DateEndedActual\":\"" . $info["ended_actual"] . "\", \"DateApplied\":\"" .$info["applied"] . "\", \"EotsID\":\"".$info['EOTS_ID']."\"}";

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
