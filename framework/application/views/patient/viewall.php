<?php 
    

    if(!is_null($patients)){

        $numRows = count($patients);

        if($numRows){

            echo "{\"success\":true, \"total\":" .$numRows .",\"records\":[";

            $rowCount=1;
            //display the results 
            foreach ($patients as $patient) {
				// MWB 10 Feb 2012 - break out strings to better see flow for debugging
                echo " {"
					. "\"id\":\"" . $patient["ID"] . "\", "
					. "\"name\":\"" . $patient["Name"] . "\", "
					. "\"DOB\":\"" . $patient["DOB"] . "\", "
					. "\"Gender\":\"" . $patient["Gender"] . "\", "
					. "\"Age\":\"" . $patient["Age"] . "\", "
					. "\"DFN\":\"" . $patient["dfn"] . "\", ";
                
                
				// MWB 10 Feb 2012 - break out strings to better see flow for debugging
                if('Smith' == $patient['lname'] && 'John' == $patient['fname']){
                    echo "\"Disease\":[{\"Type\":\"Non-Small Cell Lung Cancer\",\"Stage\":\"Stage I\"}], ";                        
                        //"{\"Type\":\"Pancreatic\",\"Stage\":\"Stage III\" }],";
                }else if('Wilson' == $patient['lname'] && 'Mark' == $patient['fname']){
                    echo "\"Disease\":[{\"Type\":\"Small Cell Lung Cancer\",\"Stage\":\"Stage I\"}], ";                        
                }else if('Johnson' == $patient['lname'] && 'Debrah' == $patient['fname']){
                    echo "\"Disease\":[{\"Type\":\"Colorectal Cancer\",\"Stage\":\"Stage II\"}], ";                        
                }else if('Thompson' == $patient['lname'] && 'Walter' == $patient['fname']){
                    echo "\"Disease\":[{\"Type\":\"Colorectal Cancer\",\"Stage\":\"Stage III\"}], ";                        
                }
                
                if (isset($templatedetails[$patient['ID']])) {
                    $detail = $templatedetails[$patient['ID']];
                }
                else {
                    $detail = null;
                }
               
                if(count($detail)>0){
                    echo    "\"TemplateName\":\"".$detail['TemplateName']."\",\"TemplateDescription\":\"".$detail['TemplateDescription']."\",".
                            "\"TemplateID\":\"".$detail['TemplateID']."\", \"TreatmentStart\":\"".$detail['TreatmentStart']."\",".
                            //"\"DateTaken\":\"".$detail['datetaken']."\",";
                            "\"TreatmentEnd\":\"".$detail['TreatmentEnd']."\",".
                            "\"Goal\":\"".$detail['Goal']."\",".

                            "\"ConcurRadTherapy\":\"".$detail['ConcurRadTherapy']."\",".
                            "\"AssignedByUser\":\"".$detail['AssignedByUser']."\",".
                            "\"ApprovedByUser\":\"".$detail['ApprovedByUser']."\",".

                            "\"ClinicalTrial\":\"".$detail['ClinicalTrial']."\",".
                            "\"WeightFormula\":\"".$detail['WeightFormula']."\",".
                            "\"BSAFormula\":\"".$detail['BSAFormula']."\",".
                            "\"PAT_ID\":\"".$detail['PAT_ID']."\",".
                            "\"BSA_Method\":\"".$detail['BSAFormula']."\",".
                            "\"PerformanceStatus\":\"".$detail['PerformanceStatus']."\",".
                            "\"TreatmentStatus\":\"".$detail['TreatmentStatus']."\",";
                }else{		// MWB 10 Feb 2012 - Removed DateTaken from the echo below as it shouldn't be outside the Measurements section
					// echo	"\"TemplateName\":\"\",\"TemplateDescription\":\"\",\"TemplateID\":\"\", \"TreatmentStart\":\"\",\"DateTaken\":\"\",";
					echo "\"TemplateName\":\"\", ".
						"\"TemplateDescription\":\"\", ".
						"\"TemplateID\":\"\", ".
						"\"TreatmentStart\":\"\", ".
						"\"TreatmentEnd\":\"\", ".
						"\"Goal\":\"\", ".
                        "\"ConcurRadTherapy\":\"\", ".
                        "\"AssignedByUser\":\"\", ".
                        "\"ApprovedByUser\":\"\", ".

						"\"ClinicalTrial\":\"\", ".
						"\"WeightFormula\":\"\", ".
						"\"BSAFormula\":\"\", ".
						"\"PAT_ID\":\"\", ".
						"\"BSA_Method\":\"\", ".
						"\"PerformanceStatus\":\"\", ".
						"\"TreatmentStatus\":\"\", ";
                }
                
                $amputations = $patient['amputations'];
                
                echo "\"Amputations\":[";
                
                $amputationCount = count($amputations);
                
                for ($index = 0; $index < count($amputations); $index++) {
                    echo "{\"description\":\"".$amputations[$index]['description']."\"}";
                    
                    if($index < $amputationCount-1){
                        echo ",";
                    }
                }

                echo "]}";
                
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
