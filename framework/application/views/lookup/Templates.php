<?php 

    if(!is_null($templates)){
        $numRows = count($templates);

        if($numRows){

            echo "{success:true, total:" .$numRows .", records:[";

            $rowCount=1;
            //display the results 
            foreach ($templates as $oemrecord) {

                echo " {\"id\":\"" . $oemrecord["id"] . "\", \"type\":\"" . $oemrecord["type"] . "\", \"name\":\"" . 
                        $oemrecord["name"] . "\", \"description\":\"" . $oemrecord["description"] . "\", \"totnum\":\"" . 
                        $oemrecord["totnum"] . "\", \"length\":\"" . $oemrecord["length"] . "\", \"unit\":\"" .
                        $oemrecord["unit"] . "\", \"coursenum\":\"" . $oemrecord["coursenum"] . "\", \"emolevel\":\"" .
                        $oemrecord["emoLevel"] . "\", \"fnrisk\":\"" . $oemrecord["fnRisk"] . "\", \"version\":\"" .
                        $oemrecord["version"] . "\", \"regimenid\":\"". $oemrecord["regimenId"] . "\"}";

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
            echo "{success:true, total:0, records:[{\"id\":\"0\",\"description\":\"No Records Found.\"}]}";

        }
    }else {
        //echo "{\"success\": false, \"msg\": \"No records found.\", \"frameworkErr\": \"". $frameworkErr . "\"}";
        echo "{success:true, total:0, records:[{\"id\":\"0\",\"description\":\"No Records Found.\"}]}";
    }


?>
