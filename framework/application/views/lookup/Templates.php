<?php 
/* 
 * Makes use of Templates() function in lookupcontroller, 
 * which makes use of the getTemplates() and getTemplatesByType() 
 * functions in the LookUp model 
 * This function should always return a "description" element in each record as the User name for the template
 */
            /*
             * KD - 5/9/12 - Setting success: false does not allow the message to be displayed in the combo drop down. 
             * This is the reason for success: true
             * 
             */
    $json = array();
    $json["success"] = true;
    if(!is_null($templates)){
        $numRows = count($templates);
        $json["total"] = $numRows;
        $json["records"] = $templates;
    }
    else {
        $json["total"] = 0;
        $tmp = array();
        $tmp["id"] = "0";
        $tmp["description"] = "No Records Found";
        $json["records"] = $tmp;
    }
    echo json_encode($json);
?>
