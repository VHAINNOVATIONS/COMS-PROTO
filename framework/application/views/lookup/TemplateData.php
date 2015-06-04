<?php
function calcNumAdminDays($ListOfAdminDays) {
    $NumAdminDays = 0;
    $adBreakdown1 = explode(",", $ListOfAdminDays);
    foreach($adBreakdown1 as $DayPeriod) {
        $adBreakdown2 = explode("-", $DayPeriod);
        if (2 == count($adBreakdown2)) {
            $NumAdminDays += $adBreakdown2[1] - $adBreakdown2[0] + 1;
        }
        else {
            $NumAdminDays += 1;
        }
    }
    return $NumAdminDays;
};


error_log("LookUp View TemplateData() Entry Point");
if (!is_null($templatedata)) {
    error_log("LookUp View TemplateData() Have Template Data - " . json_encode($templatedata));
    $numtemplates = count($templatedata);
error_log("LookUp View TemplateData() - has $numtemplates Templates");

    if ($numtemplates) {
        echo "{\"success\" : true, \"total\" : $numtemplates , \"records\" :[";
        $rowCount = 1;
        //display the results 
        foreach ($templatedata as $oemrecord) {
error_log("LookUp View TemplateData() - an OEMRecord = " . json_encode($oemrecord));
            $PatientList = $this->get('PatientList');

            echo "{\n\t\"id\" : \"" . $oemrecord['id'] . "\", \n";
            echo "\t\"RegimenName\" : \"" . $oemrecord['name'] . "\", \n";
            echo "\t\"RegimenID\" : \"" . $oemrecord['Regimen_ID'] . "\", \n";
            echo "\t\"Description\" : \"" . $oemrecord['description'] . "\", \n";
            echo "\t\"Disease\" : \"" . $oemrecord['Disease'] . "\", \n";
            echo "\t\"DiseaseName\" : \"" . $oemrecord['DiseaseName'] . "\", \n";
            echo "\t\"DiseaseStage\" : [{\"id\":\"" . $oemrecord['DiseaseStage'] . "\", \"name\":\"" . $oemrecord['DiseaseStageName'] . "\"}], \n";
            echo "\t\"CourseNum\" : \"" . $oemrecord['CourseNum'] . "\", \n";
            echo "\t\"CourseNumMax\" : \"" . $oemrecord['CourseNumMax'] . "\", \n";
            echo "\t\"CycleLength\" : \"" . $oemrecord['length'] . "\", \n";
            echo "\t\"CycleLengthUnit\" : [{\"id\":\"" . $oemrecord['CycleLengthUnitID'] . "\", \"name\":\"" . $oemrecord['CycleLengthUnit'] . "\"}], \n";
            echo "\t\"ELevel\" : [{\"id\":\"" . $oemrecord['emoID'] . "\", \"name\":\"" . $oemrecord['emoLevel'] . "\", \"details\":" . json_encode( $oemrecord['emodetails']) . "}], \n";
            echo "\t\"FNRisk\" : \"" . $oemrecord['fnRisk'] . "\", \n";
            echo "\t\"FNRiskDetails\" : " . json_encode($oemrecord['fnrDetails']) . ", \n";
            echo "\t\"PatientList\" : \n" . json_encode($PatientList) . "\t,\n";
            echo "\t\"PatientListCount\" : \n" . count($PatientList) . "\t,\n";

            // References
            $numreferences = count($references);
            $refCount = 1;
            echo "\t\"References\" : [\n";
            if ($numreferences) {
                foreach ($references as $reference) {
                    echo "\t\t{ \"id\" : \"" . $reference['id'] . "\", ";
                    echo "\"Reference\" : \"" . $reference['name'] . "\", ";
                    echo "\"ReferenceLink\" : \"" . $reference['description'] . "\"}";
                    if ($refCount < $numreferences) {
                        echo ",\n";
                    } else {
                        echo "\n";
                    }

                    $refCount++;
                }
            }
            echo "\t],\n";


            //  Pre Medication Hydration Instrustions
            echo "\t\"PreMHInstructions\" : \"" . $oemrecord['preMHInstruct'] . "\", \n";

            $numpremhmeds = count($prehydrations);
            $prehydrationCount = 1;

            echo "\t\"PreMHMeds\" : [\n";
            if ($numpremhmeds) {

                //display the results 
                foreach ($prehydrations as $prehydration) {
                    $NumAdminDays = calcNumAdminDays($prehydration["adminDay"]);
                    $CumDosePerCycle = 0;

                    echo " {
                        \"id\":\"" . $prehydration["id"] . "\", 
                        \"Instructions\":\"" . $prehydration["description"]  . "\", 
                        \"Drug\":\"" . $prehydration["drug"] . "\", 
                        \"Day\":\"" . $prehydration["adminDay"] . "\", 
                        \"Sequence\":\"" . $prehydration["Sequence"] . "\", 
                        \"AdminTime\":\"" .$prehydration["adminTime"] . "\", ";

                    $myinfusions = $preinfusions[$prehydration['id']];
                    $numInfusions = count($myinfusions);

                    if ($numInfusions == 1) {
                        $CumDosePerCycle += ($myinfusions[0]['amt'] * $NumAdminDays);
                        $CumDosePerCycleUnits = $myinfusions[0]['unit'];
                        echo "
                        \"Amt1\":\"" . $myinfusions[0]['amt'] . "\", 
                        \"Units1\":\"" . $myinfusions[0]['unit'] . "\", 
                        \"Infusion1\":\"" . $myinfusions[0]['type'] . "\", 
                        \"FluidVol1\":\"" . $myinfusions[0]["fluidVol"] . "\", 
                        \"FlowRate1\":\"" . $myinfusions[0]["flowRate"] . "\", 
                        \"InfusionTime1\":\"" . $myinfusions[0]["infusionTime"] . "\", 
                        \"FluidType1\":\"" . $myinfusions[0]["fluidType"] . "\",
                        \"Amt2\":\"\", 
                        \"Units2\":\"\", 
                        \"Infusion2\":\"\",
                        \"FluidVol2\":\"\", 
                        \"FlowRate2\":\"\", 
                        \"InfusionTime2\":\"\", 
                        \"FluidType2\":\"\"
                        ";
                    } else {
                        $infusionCount = 1;
                        foreach ($myinfusions as $infusion) {
                            $CumDosePerCycle += ($infusion['amt'] * $NumAdminDays);
                            $CumDosePerCycleUnits = $infusion['unit'];
                            echo "
                            \"Amt" . $infusionCount . "\":\"" . $infusion['amt'] . "\", 
                            \"Units" . $infusionCount . "\":\"" . $infusion['unit'] . "\", 
                            \"Infusion" . $infusionCount . "\":\"" . $infusion['type'] . "\", 
                            \"FluidVol" .$infusionCount . "\":\"" .$infusion['fluidVol'] . "\", 
                            \"FluidType" . $infusionCount . "\":\"" . $infusion['fluidType'] . "\", 
                            \"FlowRate" . $infusionCount . "\":\"" . $infusion['flowRate'] . "\", 
                            \"InfusionTime" . $infusionCount . "\":\"" .$infusion['infusionTime'] . "\"
                            ";
                            if ($infusionCount < $numInfusions) {
                                echo ",";
                            }
                            $infusionCount++;
                        }
                    }

                    echo ", \"NumAdminDays\" : " . $NumAdminDays . ", ";
                    echo "\"CumDosePerCycle\" : " . $CumDosePerCycle . ", \"CumDosePerCycleUnits\" : \"" . $CumDosePerCycleUnits . "\", ";
                    echo "\"CumDosePerRegimen\" : " . $CumDosePerCycle * $oemrecord['CourseNumMax'];

                    echo "}";

                    if ($prehydrationCount < $numpremhmeds) {
                        echo ",";
                    }


                    $prehydrationCount++;
                }
            }
            echo "\t],\n";














            $CumulativeDoseMedsInRegimen = $this->get('CumulativeDoseMedsInRegimen');





            echo "\t\"RegimenInstruction\" : \"" . $oemrecord['regimenInstruction'] . "\", \n";

            // Regimen Meds
            echo "\t\"Meds\" : [\n";
            $TempCDMIR = array();

            $numregimens = count($regimens);
            $regimenCount = 1;
            if ($numregimens) {
                foreach ($regimens as $regimen) {
                    $NumAdminDays = calcNumAdminDays($regimen["adminDay"]);
                    $CumDosePerCycle = 0;
                    $CumDosePerCycle += ($regimen["regdose"] * $NumAdminDays);
                    $CumDosePerCycleUnits = $regimen["regdoseunit"];

                    // MWB, 3 Jan 2012 - added the $regimen["id"] to be returned as well
                    echo "\t\t{\"id\" : \"" . $regimen["id"] . "\", \"Drug\" : \"" . $regimen["drug"] . "\", \"Amt\" : \"" . $regimen["regdose"] .
                    "\", \"Units\":\"" . $regimen["regdoseunit"] .
                    "\", \"pctDose\" : \"" . $regimen["regdosepct"] . "\", \"reason\" : \"" . $regimen["regreason"] .
                    "\", \"PatDose\" : \"" . $regimen["patientdose"] . " " . $regimen["patientdoseunit"] .
                    "\", \"Route\" : \"" . $regimen["route"] . "\", \"Day\" : \"" . $regimen["adminDay"] .
                    "\", \"FluidVol\" : \"" . $regimen["flvol"] . "\", \"FlowRate\" : \"" . $regimen["flowRate"] .
                    "\", \"Instructions\":\"" . $regimen["instructions"] . "\", \"Sequence\": \"" . $regimen["sequence"] .
                    "\", \"AdminTime\":\"" .$regimen["adminTime"] . "\", \"FluidType\": \"" . $regimen["fluidType"] . "\",";

//						if($regimen["flmin"] == $regimen["flmax"]){
//							echo "\"" .$regimen["flmin"] . " " .$regimen["flunit"] . "\",";
//						} else {
//							echo "\"greater than " . $regimen["flmin"] . " " .$regimen["flunit"] . " ";
//							echo "less than " . $regimen["flmax"] . " ".$regimen["flunit"] . "\",";
//						}
                    echo "\"InfusionTime\" : \"" . $regimen["infusion"] . "\", \"NumAdminDays\" : " . $NumAdminDays . ", 
                    \"CumDosePerCycle\" : " . $CumDosePerCycle . ", \"CumDosePerCycleUnits\" : \"" . $CumDosePerCycleUnits . "\", 
                    \"CumDosePerRegimen\" : " . $CumDosePerCycle * $oemrecord['CourseNumMax'] . "
                    }";

                    if ($regimenCount < $numregimens) {
                        echo ",\n";
                    } else {
                        echo "\n";
                    }
                    $regimenCount++;


                    foreach($CumulativeDoseMedsInRegimen as $CDMIR) {
                        // error_log("Processing Regimen Additions to CDMIR - " . $CDMIR["MedID"] . " - " . $regimen["drugid"]);
                        if ($CDMIR["MedID"] == $regimen["drugid"]) {
                            $CDMIR["CumDosePerCycle"] = $CumDosePerCycle;
                            $CDMIR["CumDosePerCycleUnits"] = $CumDosePerCycleUnits;
                            $CDMIR["CumDosePerRegimen"] = ($CumDosePerCycle * $oemrecord['CourseNumMax']);
                            // error_log("Processing - " . json_encode($CDMIR));
                            $TempCDMIR[] = $CDMIR;
                        }
                    }
                }
            }
            echo "\t],\n";




            $List = "";
            foreach($TempCDMIR as $CDMIR) {
                if ("" != $List) {
                    $List .= ", ";
                }
                $List .= "\n\t" . json_encode($CDMIR);
            }
            echo "\t\"CumulativeDoseMedsInRegimen\" : [\n$List\t],\n";

            //  Post Medication Hydration Instrustions
            echo "\t\"PostMHInstructions\" : \"" . $oemrecord['postMHInstruct'] . "\", \n";

            $numpostmhmeds = count($posthydrations);
            $posthydrationCount = 1;

            echo "\t\"PostMHMeds\" : [\n";
            if ($numpostmhmeds) {

                //display the results 
                foreach ($posthydrations as $posthydration) {
                    $NumAdminDays = calcNumAdminDays($prehydration["adminDay"]);
                    $CumDosePerCycle = 0;

                    echo " {\"id\":\"" . $posthydration["id"] . "\", \"Instructions\":\"" . $posthydration["description"] .
                    "\", \"Drug\":\"" . $posthydration["drug"] . 
                    "\", \"Day\":\"" . $posthydration["adminDay"] . "\", \"Sequence\":\"" . $posthydration["Sequence"] . 
                    "\", \"AdminTime\":\"" .$posthydration["adminTime"] ."\", ";

                    $myinfusions = $postinfusions[$posthydration['id']];
                    $numInfusions = count($myinfusions);

                    if ($numInfusions == 1) {
                        $CumDosePerCycle += ($myinfusions[0]['amt'] * $NumAdminDays);
                        $CumDosePerCycleUnits = $myinfusions[0]['unit'];

                        echo "\"Amt1\":\"" . $myinfusions[0]['amt'] . "\", \"Units1\":\"" . $myinfusions[0]['unit'] .
                        "\", \"Infusion1\":\"" . $myinfusions[0]['type'] . "\", \"FluidVol1\":\"" . $myinfusions[0]["fluidVol"] .
                        "\", \"FlowRate1\":\"" . $myinfusions[0]["flowRate"] . "\", \"InfusionTime1\":\"" . $myinfusions[0]["infusionTime"] .   
                        "\", \"FluidType1\":\"" . $myinfusions[0]["fluidType"] . "\",".
                        "\"Amt2\":\"\", \"Units2\":\"\", \"Infusion2\":\"\",\"FluidVol2\":\"\", \"FlowRate2\":\"\", \"InfusionTime2\":\"\", \"FluidType2\":\"\"";
                        
                        
                    } else {
                        $infusionCount = 1;

                        foreach ($myinfusions as $infusion) {
                            $CumDosePerCycle += ($infusion['amt'] * $NumAdminDays);
                            $CumDosePerCycleUnits = $infusion['unit'];

                            echo "\"Amt" . $infusionCount . "\":\"" . $infusion['amt'] . "\", \"Units" . $infusionCount . "\":\"" . $infusion['unit'] .
                            "\", \"Infusion" . $infusionCount . "\":\"" . $infusion['type'] . "\", \"FluidVol" .$infusionCount . "\":\"" .$infusion['fluidVol'].
                            "\", \"FluidType" . $infusionCount . "\":\"" . $infusion['fluidType'] .
                            "\", \"FlowRate" . $infusionCount . "\":\"" . $infusion['flowRate'] . "\", \"InfusionTime" . $infusionCount . "\":\"" .$infusion['infusionTime'] . "\"";
                            

                            if ($infusionCount < $numInfusions) {
                                echo ",";
                            }

                            $infusionCount++;
                        }
                    }

                    echo ", \"NumAdminDays\" : " . $NumAdminDays . ", ";
                    echo "\"CumDosePerCycle\" : " . $CumDosePerCycle . ", \"CumDosePerCycleUnits\" : \"" . $CumDosePerCycleUnits . "\", ";
                    echo "\"CumDosePerRegimen\" : " . $CumDosePerCycle * $oemrecord['CourseNumMax'];
                    echo "}";

                    if ($posthydrationCount < $numpostmhmeds) {
                        echo ",";
                    }


                    $posthydrationCount++;
                }
            }
            echo "\t]\n";
        }
        echo "}]}";
    } else {
        echo "{\"success\" : false, \"msg\" : \"No records found.\"}";
    }
} else {
    echo "{\"success\" : false, \"msg\" : \"No records found.\", \"frameworkErr\" : \"" . $frameworkErr . "\"}";
}
?>