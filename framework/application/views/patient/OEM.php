<?php

if (!is_null($oemrecords) && is_null($oemsaved)) {
    $numeoemrecords = count($oemrecords);
    $numtemplates = count($masterRecord);
    
    if ($numeoemrecords) {
        // Perform REAL calculation of the # of Admin Days in a Given cycle.
        // Previously incorrect data pulled in the echo below:
        //    "\"AdminDaysPerCycle\":\"".$masterRecord[0]['length']."\", \"OEMRecords\":[";
        // the "length" is the # of <units> per cycle (where units is days, weeks, etc)
        // What's needed is the # of Admin Days per cycle (which can be anything from 1 up to the # of days in a cycle
        $AdminDaysPerCycle = 0;
        foreach ($oemrecords as $oemrecord) {
            if (1 == $oemrecord['CourseNum']) {
                $AdminDaysPerCycle++;
            }
            else {
                break;
            }
        }

        echo "{\"success\" : true, \"total\" : $numtemplates , \"records\" :[{" .
             "\"id\":\"".$masterRecord[0]['id']."\", \"FNRisk\":\"".$masterRecord[0]['fnRisk']."\",".
             "\"NeutropeniaRecommendation\":\"XX\", \"ELevelID\":\"".$masterRecord[0]['emoID']."\",".
             "\"ELevelName\":\"".$masterRecord[0]['emoLevel']."\", \"ELevelRecommendationASCO\":\"XX\",".
             "\"ELevelRecommendationNCCN\":\"XX\", \"numCycles\":\"".$masterRecord[0]['CourseNumMax']."\",".
             "\"Goal\":\"".$masterRecord[0]['Goal']."\", \"ClinicalTrial\":\"".$masterRecord[0]['ClinicalTrial']."\",".
             "\"Status\":\"".$masterRecord[0]['Status']."\", \"PerformanceStatus\":\"".$masterRecord[0]['PerfStatus']."\",".
            "\"AdminDaysPerCycle\":\"$AdminDaysPerCycle\", \"OEMRecords\":[";
        
        
        $rowCount = 1;
        //display the results 

        foreach ($oemrecords as $oemrecord) {
            if ($oemrecord['CourseNum'] == 0) {
                $AdminDaysPerCycle++;
            }


            $oemDetails = $oemMap[$oemrecord['TemplateID']];
            echo "{\n\t\"id\" : \"" . $oemrecord['TemplateID'] . "\", \n";
            echo "\t\"Cycle\" : \"" . $oemrecord['CourseNum'] . "\", \n";
            echo "\t\"Day\" : \"" . $oemrecord['Day'] . "\", \n";
            echo "\t\"AdminDate\" : \"" . $oemrecord['AdminDate'] . "\", \n";
            echo "\t\"PreTherapyInstr\" : \"" . $oemrecord['PreTherapyInstr'] . "\", \n";
            echo "\t\"TherapyInstr\" : \"" . $oemrecord['TherapyInstr'] . "\", \n";
            //echo "\t\"PostTherapyInstr\" : \"" . $oemrecord['PostTherapyInstr'] . "\", \n";
            echo "\t\"PostTherapyInstr\" : \"" . $oemrecord['PostTherapyInstr'] . "\", \n";
            
            $prehydrations = $oemDetails['PreTherapy'];
            $numpremhmeds = count($prehydrations);
            $prehydrationCount = 1;

            echo "\t\"PreTherapy\" : [\n";
            if ($numpremhmeds) {

                //display the results 
                foreach ($prehydrations as $prehydration) {
                    $status = $prehydration["Status"] ? $prehydration["Status"] : "";
                    $reason = ("Test - Communication" !== $prehydration["Reason"]) ? $prehydration["Reason"] : "";

                    echo " {\"id\":\"" . $prehydration["id"] . "\", " .
                    "\"Order_ID\": \"" . $prehydration["Order_ID"] . "\", " .
                    "\"Order_Status\": \"" . $prehydration["Order_Status"] . "\", " .
                    "\"Instructions\":\"" . $prehydration["description"] . "\", " .

                    "\"Status\":\"$status\", " .
                    "\"Reason\":\"$reason\", " .


                    "\"Med\":\"" . $prehydration["drug"] . "\", " .
                    "\"MedID\":\"" .$prehydration['drugid'] . "\", " .
                    "\"AdminTime\":\"" .$prehydration["adminTime"] . "\", ";

                    
                    $preinfusions = $oemDetails['PreTherapyInfusions'];
                    $myinfusions = $preinfusions[$prehydration['id']];
                    $numInfusions = count($myinfusions);

                    if ($numInfusions == 1) {
                        echo "\"Dose1\":\"" . $myinfusions[0]['amt'] . "\", \"DoseUnits1\":\"" . $myinfusions[0]['unit'] .
                        "\", \"AdminMethod1\":\"" . $myinfusions[0]['type'] . "\"," .
                        "\"BSA_Dose1\":\"" . $myinfusions[0]['bsaDose'] . "\", \"FluidType1\":\"" . $myinfusions[0]['fluidType'] . "\",".
                        "\"FluidVol1\":\"".$myinfusions[0]['fluidVol']."\", \"FlowRate1\":\"".$myinfusions[0]['flowRate']."\", \"InfusionTime1\":\"".$myinfusions[0]['infusionTime']."\",".
                        "\"Dose2\":\"\", \"DoseUnits2\":\"\", \"AdminMethod2\":\"\", \"FluidType2\":\"\", \"BSA_Dose2\":\"\", \"FluidVol2\":\"\", \"FlowRate2\":\"\", \"InfusionTime2\":\"\"";
                    } else if($numInfusions == 0){
                        echo "\"Dose1\":\"\", \"DoseUnits1\":\"\", \"AdminMethod1\":\"\"," .
                        "\"BSA_Dose1\":\"\", \"FluidType1\":\"\",".
                        "\"FluidVol1\":\"\", \"FlowRate1\":\"\", \"InfusionTime1\":\"\",".
                        "\"Dose2\":\"\", \"DoseUnits2\":\"\", \"AdminMethod2\":\"\", \"FluidType2\":\"\", \"BSA_Dose2\":\"\", \"FluidVol2\":\"\", \"FlowRate2\":\"\", \"InfusionTime2\":\"\"";
                    } else {
                        $infusionCount = 1;

                        foreach ($myinfusions as $infusion) {

                            echo "\"Dose" . $infusionCount . "\":\"" . $infusion['amt'] . "\", \"DoseUnits" . $infusionCount . "\":\"" . $infusion['unit'] .
                            "\", \"BSA_Dose".$infusionCount."\":\"".$infusion['bsaDose']. "\", \"FluidType".$infusionCount."\":\"".$infusion['fluidType'].    
                            "\", \"AdminMethod" . $infusionCount . "\":\"" . $infusion['type'] . "\",\"FluidVol".$infusionCount."\":\"".$infusion['fluidVol'].
                            "\", \"FlowRate".$infusionCount."\":\"".$infusion['flowRate']."\",\"InfusionTime".$infusionCount."\":\"".$infusion['infusionTime']."\"";

                            if ($infusionCount < $numInfusions) {
                                echo ",";
                            }

                            $infusionCount++;
                        }
                    }


                    echo "}";

                    if ($prehydrationCount < $numpremhmeds) {
                        echo ",";
                    }


                    $prehydrationCount++;
                }
            }
            echo "\t],\n";

            // Regimen Meds
            echo "\t\"Therapy\" : [\n";

            $regimens = $oemDetails['Therapy'];
            $numregimens = count($regimens);
            $regimenCount = 1;
            if ($numregimens) {
                foreach ($regimens as $regimen) {
                    $status = $regimen["Status"] ? $regimen["Status"] : "";
                    $reason = ("Test - Communication" !== $regimen["Reason"]) ? $regimen["Reason"] : "";

                    // MWB, 3 Jan 2012 - added the $regimen["id"] to be returned as well
                    echo "\t\t
                    {
                        \"id\" : \"" . $regimen["id"] . "\", 
                        \"Order_ID\": \"" . $regimen["Order_ID"] . "\", 
                        \"Order_Status\": \"" . $regimen["Order_Status"] . "\", 
                        \"Med\" : \"" . $regimen["drug"] . "\", 
                        \"Dose\" : \"" . $regimen["regdose"] . "\", 
                        \"MedID\":\"" .$regimen['drugid'] . "\", 
                        \"DoseUnits\":\"" . $regimen["regdoseunit"] . "\", 
                        \"AdminMethod\" : \"" . $regimen["route"] . "\", 
                        \"FluidType\" : \"" . $regimen["fluidType"] . "\", 
                        \"BSA_Dose\" : \"" . $regimen["bsaDose"] . "\", 
                        \"FluidVol\" : \"" . $regimen["flvol"] . "\", 
                        \"FlowRate\" : \"" . $regimen["flowRate"] . "\", 
                        \"Instructions\":\"" . $regimen["instructions"] . "\", 
                        \"Status\":\"$status\",
                        \"Reason\":\"$reason\", 
                        \"AdminTime\":\"" .$regimen["adminTime"] . "\",
                        \"InfusionTime\" : \"" . $regimen["infusion"] . "\"
                    }";

                    if ($regimenCount < $numregimens) {
                        echo ",\n";
                    } else {
                        echo "\n";
                    }
                    $regimenCount++;
                }
            }
            echo "\t],\n";

            $posthydrations = $oemDetails['PostTherapy'];
            $numpostmhmeds = count($posthydrations);
            $posthydrationCount = 1;

            echo "\t\"PostTherapy\" : [\n";
            if ($numpostmhmeds) {

                //display the results 
                foreach ($posthydrations as $posthydration) {
                    $status = $posthydration["Status"] ? $posthydration["Status"] : "";
                    $reason = ("Test - Communication" !== $posthydration["Reason"]) ? $posthydration["Reason"] : "";

                    echo " {
                        \"id\":\"" . $posthydration["id"] . "\", 
                        \"Order_ID\": \"" . $posthydration["Order_ID"] . "\",
                        \"Order_Status\": \"" . $posthydration["Order_Status"] . "\",
                        \"Instructions\": \"" . $posthydration["description"] . "\", " .


                    "\"Status\":\"$status\", " .
                    "\"Reason\":\"$reason\", " .



                    "\"Med\":\"" . $posthydration["drug"] . "\", \"MedID\":\"" .$posthydration['drugid'] .
                    "\", \"AdminTime\":\"" .$posthydration["adminTime"] . "\", ";

                    $postinfusions = $oemDetails['PostTherapyInfusions'];
                    $myinfusions = $postinfusions[$posthydration['id']];
                    $numInfusions = count($myinfusions);

                    if ($numInfusions == 1) {
                        echo "\"Dose1\":\"" . $myinfusions[0]['amt'] . "\", \"DoseUnits1\":\"" . $myinfusions[0]['unit'] .
                        "\", \"AdminMethod1\":\"" . $myinfusions[0]['type'] . "\"," .
                        "\"BSA_Dose1\":\"" . $myinfusions[0]['bsaDose'] . "\", \"FluidType1\":\"" . $myinfusions[0]['fluidType'] . "\",".
                        "\"FluidVol1\":\"".$myinfusions[0]['fluidVol']."\", \"FlowRate1\":\"".$myinfusions[0]['flowRate']."\", \"InfusionTime1\":\"".$myinfusions[0]['infusionTime']."\",".                                
                        "\"Dose2\":\"\", \"DoseUnits2\":\"\", \"AdminMethod2\":\"\", \"FluidType2\":\"\", \"BSA_Dose2\":\"\", \"FluidVol2\":\"\", \"FlowRate2\":\"\", \"InfusionTime2\":\"\"";
                    } else if($numInfusions == 0){
                        echo "\"Dose1\":\"\", \"DoseUnits1\":\"\", \"AdminMethod1\":\"\"," .
                        "\"BSA_Dose1\":\"\", \"FluidType1\":\"\",".
                        "\"FluidVol1\":\"\", \"FlowRate1\":\"\", \"InfusionTime1\":\"\",".
                        "\"Dose2\":\"\", \"DoseUnits2\":\"\", \"AdminMethod2\":\"\", \"FluidType2\":\"\", \"BSA_Dose2\":\"\", \"FluidVol2\":\"\", \"FlowRate2\":\"\", \"InfusionTime2\":\"\"";
                    } else {
                        $infusionCount = 1;

                        foreach ($myinfusions as $infusion) {

                            echo "\"Dose" . $infusionCount . "\":\"" . $infusion['amt'] . "\", \"DoseUnits" . $infusionCount . "\":\"" . $infusion['unit'] .
                            "\", \"BSA_Dose".$infusionCount."\":\"".$infusion['bsaDose']. "\", \"FluidType".$infusionCount."\":\"".$infusion['fluidType'].    
                            "\", \"AdminMethod" . $infusionCount . "\":\"" . $infusion['type'] . "\",\"FluidVol".$infusionCount."\":\"".$infusion['fluidVol'].
                            "\", \"FlowRate".$infusionCount."\":\"".$infusion['flowRate']."\",\"InfusionTime".$infusionCount."\":\"".$infusion['infusionTime']."\"";

                            if ($infusionCount < $numInfusions) {
                                echo ",";
                            }

                            $infusionCount++;
                        }
                    }


                    echo "}";

                    if ($posthydrationCount < $numpostmhmeds) {
                        echo ",";
                    }


                    $posthydrationCount++;
                }
            }
            echo "\t]}";
            
            if($rowCount < $numeoemrecords){
                echo ",\n";
            }
            
            $rowCount++;
        }
        echo "]}]}";
    } else {
        echo "{\"success\" : false, \"msg\" : \"No records found.\"}";
    }
} else if(!is_null($oemsaved)){
    echo "{\"success\": true, \"msg\": \"OEM Record updated.\" , \"records\":[]}";
} else {
    echo "{\"success\" : false, \"msg\" : \"No records found.\", \"frameworkErr\" : \"" . $frameworkErr . "\"}";
}
?>