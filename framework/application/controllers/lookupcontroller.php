<?php
require_once "/ChromePhp.php";

/**
 * @property LookUp $LookUp
 * 
 * function checkForErrors($errorMsg,$retVal){
 * function save() {
 * function saveTemplate() {
 * function delete() {
 * function deleteTemplate(){
 * function view($name = null, $description = null, $id = null) {
 */
class LookupController extends Controller {

    function _ProcQuery($query, $jsonRecord, $ErrMsg, $UniqueMsg, $id = null) {
        if ("" !== $query) {
            //error_log("Got Query - $query");
            $retVal = $this->LookUp->query($query);
error_log("LookupController - _ProcQuery() Query = $query");
error_log("LookupController - _ProcQuery() Result = " . json_decode($retVal));

            if ($this->checkForErrors($ErrMsg, $retVal)) {
                // error_log("Error");
                if("Unique" == $this->get('frameworkErrCodes')) {
                    $jsonRecord['msg'] = "Can not have duplicate records $UniqueMsg";
                }
                else {
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                }
                $jsonRecord['success'] = false;
            }
            else {
                // error_log("No Error");
                $jsonRecord['success'] = 'true';
                $this->set('frameworkErr', null);
                $this->set('frameworkErrCodes', null);

                // error_log("Result - " . $this->varDumpToString($retVal));
                if (count($retVal) > 0) {
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
                else if ($id) {
                    $jsonRecord['id'] = $id;
                }
            }
        }
       $this->set('jsonRecord', $jsonRecord);
       // error_log("Result - " . $this->varDumpToString($this->get("jsonRecord")));
    }

    function checkForErrors($errorMsg,$retVal){
        $ErrorCode = "";
        $this->set('frameworkErrCodes', $ErrorCode);
        if (null != $retVal && array_key_exists('error', $retVal)) {
            if (is_string($retVal['error'])) {
                $errorMsg .= " " . $retVal['error'];
            }
            else {
                foreach ($retVal['error'] as $error) {
                    if (2627 == $error['code']) {
                        $ErrorCode = "Unique";
                    }
                    else if (3621 == $error['code']) {
                        $ErrorCode = "Unique";
                    }
                    else {
                        // error_log("Lookup - $errorMsg");
                        // error_log(json_encode($error));
                        $finalMsg = explode("]", $error['message']);
                        $finalMsg = $finalMsg[count($finalMsg)-1];
                        $errorMsg .= "<hr>";
                        $errorMsg .=  $finalMsg;
                    }
                }
            }
            $this->set('frameworkErr', $errorMsg);
            $this->set('frameworkErrCodes', $ErrorCode);
            return true;
        }
        return false;
    }
    

    function save() {
error_log("Lookup Save - ");
        $Msg = "Generic Save";
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $GUD = null;

        $name = $description = $id = $lookupid = "";

        $tmp = json_decode(file_get_contents("php://input"));
error_log("Lookup Save - " . json_encode($tmp));
        if(isset($tmp->value)) {
            $name = $tmp->value;
            $name = $this->escapeString($name);
        }
        if(isset($tmp->description)) {
            $description = $tmp->description;
            $description = $this->escapeString($description);
        }
        if(isset($tmp->id)) {
            $id = $tmp->id;
        }
        if(isset($tmp->lookupid)) {
            $lookupid = $tmp->lookupid;
        }

        if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $query = "UPDATE LookUp SET Name ='$name', Description = '$description' WHERE Lookup_ID = '$id'";
            $jsonRecord['msg'] = "$Msg Record Updated";
            $ErrMsg = "Updating $Msg  Record";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $GUD = $this->LookUp->newGUID();
            $query = "INSERT into LookUp (Lookup_ID, Lookup_Type, Name, Description) values ('$GUD', '$lookupid','$name','$description')";

            $jsonRecord['msg'] = "$Msg Record Created";
            $jsonRecord['id'] = $GUID;
            $ErrMsg = "Creating $Msg Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from LookUp WHERE Lookup_ID = '$id'";
            $jsonRecord['msg'] = "$Msg Records Deleted";
            $ErrMsg = "Deleting $Msg Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $Msg Service (expected a POST, PUT or DELETE got a " . $_SERVER['REQUEST_METHOD'];
        }

error_log("save() = $query");
        $this->_ProcQuery($query, $jsonRecord, $ErrMsg, " (Record already exists)", $GUD);

    }












    /*
     * Build the Template/Regimen name based on the names and dosages of the Therapy Drugs applied
     */
    function BuildRegimenName($regimens) {
        $regimenName = '';
        for ($index = 0; $index < count($regimens); $index++) {
            $regimendata = $regimens[$index]->{'data'};
            $amt = $regimendata->{'Amt'};
            $drugInfo = explode(" : ", $regimendata->{'Drug'});
            $drugname = $drugInfo[0];
            $drugIEN = $drugInfo[1];
error_log("Lookup Controller - saveTemplate() - Walking Therapys - " . $regimendata->{'Drug'} . " - " . json_encode($drugname));
            $regimenName .= "$drugname $amt ";
        }
        return $regimenName;
    }


    /*
     *
     * Note: Magic Numbers used...
     *    "Magic Number" 4 is the "[Lookup_Type_ID]" in the [LookUp] table for the 'Regimen' records (description = Template Selector Values with Template Name in Description)
     *    "Magic Number" 25 is the "[Lookup_Type_ID]" in the [LookUp] table for the 'TemplateAlias' records (description = Alias for template name)
     *
     */


    function saveTemplate() {
error_log("Lookup Controller - saveTemplate() - Entry Point...");
        $form_data = json_decode(file_get_contents('php://input'));
        $temp = json_encode($form_data);
        // Note: $temp['RegimenName'] is the User Optional Name (sometimes referred to as the Description)

        $regimens = $form_data->{'Meds'};
        $usersuppliedname = $form_data->{'RegimenName'};

        $regimenName = $this->BuildRegimenName($regimens);
error_log("Lookup Controller - saveTemplate() - Got Regimens");


        $this->LookUp->beginTransaction();



        /*****************************************
         *
         *
         **/
        // Get list of Templates with this Regimen Name (if any). 
        // This will give us the count of regimens using the same therapies so we can create a new version #
        $lookupinfo = $this->LookUp->getLookupIdByNameAndType($regimenName, 4);
        $templateNum = count($lookupinfo) + 1;

        // Builds new Chemotherapy Regimen Name based on versioning scheme
        $templateName = date("Y") . '-' . $templateNum . '-0001-ABCD-' . $regimenName . '-' . date("Ymd");
error_log("Lookup Controller - saveTemplate() - Got TemplateName - $templateName");


// Save Template and Regimen name in the Lookup Table
        $templatelookupid = $this->LookUp->save(4, $regimenName, $templateName);
        while(null == $templatelookupid[0]["lookupid"]){
            $templateNum++;
            $templateName = date("Y") . '-' . $templateNum . '-0001-ABCD-' . $regimenName . '-' . date("Ymd");
            $templatelookupid = $this->LookUp->save(4, $regimenName, $templateName);
        }

// Save User Supplied Name in the Lookup Table
        if ($usersuppliedname) {
            $this->LookUp->save(25, $templatelookupid[0]["lookupid"], $usersuppliedname);
        }

error_log("Lookup Controller - saveTemplate() - Name and Alias saved");
        /*****************************************
         *
         *
         **/


        $cyclelength = $form_data->{'CycleLength'};
        $this->LookUp->saveExtraFields($regimenName, $cyclelength);
error_log("Lookup Controller - saveTemplate() - Extra Fields saved");

        /**
         * This is just a bandaid because some calls to "/Lookup/saveTemplate" give actual
         * cycle length units and emotegenic levels instead of their GUIDs
         */
        $cycleLengthUnit = $this->LookUp->getIdByNameAndType($form_data->CycleLengthUnit, LookUp::TYPE_TIMEFRAMEUNIT);
        $eLevel = $this->LookUp->getIdByNameAndType($form_data->ELevel, LookUp::TYPE_ELEVEL);
        $form_data->CycleLengthUnit = (!empty($cycleLengthUnit)) ? $cycleLengthUnit : $form_data->CycleLengthUnit;
        $form_data->ELevel = (!empty($eLevel)) ? $eLevel : $form_data->ELevel;
        /*
         * END of Bandaid
         */

        $templateid = $this->LookUp->saveTemplate($form_data, $templatelookupid[0]["lookupid"]);
        if($this->checkForErrors("Insert Master Template (in Lookup Controller) Failed. (id=$templateid)", $templateid)){
error_log("Lookup Controller - saveTemplate() - Insert Master Template Failed");
            $this->LookUp->rollbackTransaction();
            return;
        }
error_log("Lookup Controller - saveTemplate() - Insert Master Template Passed");


        if ($templateid) {
            $templateid = $templateid[0]['lookupid'];
            $references = $form_data->{'References'};
            $this->LookUp->saveTemplateReferences($references, $templateid);

error_log("Lookup Controller - saveTemplate() - Save Pre Therapy");
            $Order_IDR = $form_data->{'Order_IDR'};
            $prehydrations = $form_data->{'PreMHMeds'};
            if ($prehydrations) {
                //$this->LookUp->OrderX();
                $retVal = $this->LookUp->saveHydrations($prehydrations, 'Pre', $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Pre Therapy Failed. ', $retVal)){
                    $this->LookUp->rollbackTransaction();
                    return;
                }
            }
error_log("Lookup Controller - saveTemplate() - Pre Therapy Save Complete... ");



error_log("Lookup Controller - saveTemplate() - Save Post Therapy");
            $posthydrations = $form_data->{'PostMHMeds'};
            if ($posthydrations) {
                $retVal = $this->LookUp->saveHydrations($posthydrations, 'Post', $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Post Therapy Failed. ', $retVal)){
                    $this->LookUp->rollbackTransaction();
                    return;
                }
            }

error_log("Lookup Controller - saveTemplate() - Save Therapy");
            if ($regimens) {
                if ($Order_IDR == ''){
                    $Order_IDR = '00000000-0000-0000-0000-000000000000';
                }
                $retVal = $this->LookUp->saveRegimen($regimens, $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Template Regimens Failed.', $retVal)){
                    $this->LookUp->rollbackTransaction();
error_log("Lookup Controller - saveTemplate() - Save Therapy FAILED");
                    return;
                }
            }
error_log("Lookup Controller - saveTemplate() - Save Therapy Complete");


        }
        else {
            $this->set('templateid', $templateid);
            $this->set('frameworkErr', 'Template Id was not generated');
            $this->LookUp->rollbackTransaction();
            return;
        }


        $this->set('templateid', $templateid);
        $this->set('frameworkErr', null);

        if ($usersuppliedname) {
            $this->set('templatename', $usersuppliedname);
        } else {
            $this->set('templatename', $templateName);
        }

        $this->LookUp->endTransaction();
        $NationalLevel = 'No';
        
        $username = get_current_user();
        $mdws = new Mymdws();
        $roles = $mdws->getRoleInfo($username);
        $rid = $_SESSION['rid'];
        $sitelist = $_SESSION['sitelist'];
        $this->LookUp->saveTemplateLevel($templateid,$sitelist,$NationalLevel,$rid);
    }



























    function delete() {

        $form_data = json_decode(file_get_contents('php://input'));
        $id = $form_data->{'id'};
        $name = $form_data->{'value'};
        $description = $form_data->{'description'};
        $lookupid = $form_data->{'lookupid'};

        $this->LookUp->delete($lookupid, $name, $description);

        $this->set('savedid', $id);
        $this->set('savedname', $name);
        $this->set('savedescription', $description);
    }


    function LabResults($patientID = null) {
        $retVal = $this->LookUp->getLabResults($patientID);
        if($this->checkForErrors('Get Lab Results Failed. ', $retVal)){
            $jsonRecord['success'] = 'false';
            $jsonRecord['msg'] = $this->get('frameworkErr');
        }
        else {

            $jsonRecord['success'] = 'true';
            $jsonRecord['total'] = count($retVal);
            $jsonRecord['records'] = $retVal;
        }
        $this->set('jsonRecord', $jsonRecord);
    }


    /*
     * Deletes the template specified by the TemplateID (this would be the "name" field in the Lookup Table where ID = 25 and Description is the user defined name)
     */
    function deleteTemplate(){
        
        $form_data = json_decode(file_get_contents('php://input'));
        $id = $form_data->{'id'};
        $name = $form_data->{'description'};
        $force = $form_data->{'force'};
        
        $this->LookUp->beginTransaction();

        $retVal = $this->LookUp->deleteTemplate($id,$force);
        
        if(isset($retVal['tablename']) && $this->checkForErrors('Delete Template Failed. For table: ' . $retVal['tablename'] . ". ", $retVal)){
            $this->LookUp->rollbackTransaction();
            return;
        }else if(null != $retVal && array_key_exists('apperror', $retVal)){
            
            $errorMsg = $retVal['apperror'];
            
            $this->set('frameworkErr', $errorMsg);

            $this->LookUp->rollbackTransaction();
            return;
        }

        $this->set('name', $name);
        $this->set('frameworkErr', null);

        $this->LookUp->endTransaction();        
        
    }


    /*
     *  Called via POST operation with the ID of the template to flag passed as the POST body
     *
     */
    function flagTemplateInactive(){
        $form_data = json_decode(file_get_contents('php://input'));
        $id = $form_data->{'id'};
        $this->set('id', $id);
        $this->LookUp->beginTransaction();
        $retVal = $this->LookUp->flagTemplateInactive($id);
        
        if(isset($retVal['tablename']) && $this->checkForErrors('Flag Template Inactive Failed. ', $retVal)){
            $this->LookUp->rollbackTransaction();
            return;
        }else if(null != $retVal && array_key_exists('apperror', $retVal)){
            $errorMsg = $retVal['apperror'];
            $this->set('frameworkErr', $errorMsg);
            $this->LookUp->rollbackTransaction();
            return;
        }
        $this->set('frameworkErr', null);
        $this->LookUp->endTransaction();        
    }
    
    function view($name = null, $description = null, $id = null) {
        $this->set('title', 'All Lookups For - ' . $name);
        if (NULL != $name && NULL === $description && NULL === $id) {
            $this->set('lookups', $this->LookUp->getDataForJson($name));
        } else if (NULL != $description && NULL != $name && NULL === $id) {
            $this->set('lookups', $this->LookUp->selectByNameAndDesc($name, $description));
        } else if(NULL != $description && NULL != $name && NULL != $id){
            $this->set('lookups', $this->LookUp->selectByNameDescId($id));
        } else {
            $this->set('lookups', null);
            $this->set('frameworkErr', 'Either a Type or Description must be provided.');
        }
    }

    function TemplateReferences($id = null) {
        if ($id != null) {
            $retVal = $this->LookUp->getTemplateReferences($id);
            if ($this->checkForErrors("Failed to get Template Reference", $retVal)) {
                $this->set('references', null);
            }
            else {
                $this->set('references', $retVal);
            }
        } else {
            $this->set('references', null);
            $this->set('frameworkErr', 'No Template ID provided.');
        }
    }

    function Hydrations($type = null, $id = null) {

        if ($id != null && $type != null) {
            $hydrations = $this->LookUp->getHydrations($id, $type);
            $infusionMap = array();

            foreach ($hydrations as $hydration) {
                $infusions = $this->LookUp->getMHInfusions($hydration['id']);
                $infusionMap[$hydration['id']] = $infusions;
            }

            $this->set('hydrations', $hydrations);
            $this->set('infusions', $infusionMap);
        } else {
            $this->set('hydrations', null);
            $this->set('frameworkErr', 'Hydration Type and Template ID must be provided.');
        }
    }

    function Regimens($id = null) {

        if ($id != null) {
            $regimens = $this->LookUp->getRegimens($id);
// error_log("Lookup.Controller.Regimens - Set Regimens");
// error_log(json_encode($regimens));

            $this->set('regimens', $regimens);
        } else {
            $this->set('regimens', null);
            $this->set('frameworkErr', 'No Template ID provided.');
        }
    }

    function getPatients4Template( $templateID = null ) {
        $Patients = array();

        $query = "select 
    pat.Patient_ID,
    CONVERT(VARCHAR(10), pat.Date_Started, 101) as Date_Started,
    CONVERT(VARCHAR(10), pat.Date_Ended, 101) as Est_End_Date,
    mt.Template_ID,
    p.First_Name,
    p.Last_Name,
    p.Match as SSID
    from Patient_Assigned_Templates pat
    join Master_Template mt on mt.Template_ID = pat.Template_ID
    join Patient p on p.Patient_ID = pat.Patient_ID
    where pat.Template_ID = '$templateID'
    and DATEDIFF(day, GETDATE(), pat.Date_Started)< 0 and pat.Date_Ended_Actual is null";

    $query = "select 
    pat.Patient_ID,
    CONVERT(VARCHAR(10), pat.Date_Started, 101) as Date_Started,
    CONVERT(VARCHAR(10), pat.Date_Ended, 101) as Est_End_Date,
    mt.Template_ID,
    p.DFN as DFN
    from Patient_Assigned_Templates pat
    join Master_Template mt on mt.Template_ID = pat.Template_ID
    join Patient p on p.Patient_ID = pat.Patient_ID
    where pat.Template_ID = '$templateID'
    and DATEDIFF(day, GETDATE(), pat.Date_Started)< 0 and pat.Date_Ended_Actual is null
    order by p.DFN";

// error_log("getPatients4Template - $templateID; ");
// error_log($query);

        $retVal = $this->LookUp->query($query);
        if (null !== $retVal) {
            $LastPatient = "";
            if (count($retVal) <= 0) {
// error_log("getPatients4Template - No Data Returned from SQL");
                return $Patients;
            }
            foreach ($retVal as $Patient) {
// error_log("Patient - " . json_encode($Patient));
                $DFN = $Patient["DFN"];
                if ("" == $LastPatient || $LastPatient !== $DFN) {
                    $PatientInfo = $this->getPatientInfoFromVistA($DFN);
// error_log("PatientInfo - " . json_encode($PatientInfo));
                    $Patient["Name"] = $PatientInfo["Name"];
                    $LastPatient = $DFN;
                }
                $Patients[] = $Patient;
            }
        }
        else {
// error_log("getPatients4Template - SQL returned NULL");
        }
        return $Patients;
    }

    // Note: IF calling this service with only a single parameter the parameter will be the ID of a template 
    // but it would be in the "FIELD" position, not the "ID"
    // If field and id are NOT null then get Templates by either Cancer ID, Patient ID, Location ID
    // e.g Service call can be one of the following:
    //  LookUp/Templates/Cancer/CancerID
    //  LookUp/Templates/Patient/PatientID
    //  LookUp/Templates/Location/LocationID
    function Templates($field = NULL, $id = NULL) {
        if ($field == NULL && $id == NULL) {
            $TemplateList = $this->LookUp->getTemplates(null);
            if (null !== $TemplateList) {
                $Templates = array();
                foreach($TemplateList as $templateRecord) {
                    $TemplateID = $templateRecord['id'];
                    $Patients = $this->getPatients4Template( $TemplateID );
                    $templateRecord["Patients"] = $Patients;
                    $templateRecord["PatientCount"] = count($Patients);
                    $Templates[] = $templateRecord;
                }
            }


            // $this->set('templates', $this->LookUp->getTemplates(null));
            $this->set('templates', $Templates);
        } else if ($field != NULL && $id == NULL) {
            $this->set('templates', null);

// error_log("Get Patients for specific Template - $field");
            $TemplateList = $this->LookUp->getTemplates($field);
            if (null !== $TemplateList) {
                $Templates = array();
                foreach($TemplateList as $templateRecord) {
                    $Patients = array();
                    $TemplateID = $templateRecord['id'];
                    $Patients = $this->getPatients4Template( $TemplateID );
                    $templateRecord["Patients"] = $Patients;
                    $templateRecord["PatientCount"] = count($Patients);
                    $Templates[] = $templateRecord;
                }
            }
            // $this->set('templates', $this->LookUp->getTemplates($field));
            $this->set('templates', $Templates);
        } else {
            $retVal = $this->LookUp->getTemplatesByType($field, $id);
            if($this->checkForErrors('Get Template Data for id: '.$id.' Failed. ', $retVal)){
                $this->set('templates', null);
                return;
            }
            $this->set('templates', $retVal);
        }
    }

    function TemplateDetails($field = NULL, $name = NULL) {

        if ($name != NULL && $field != NULL) {
            $this->set('templatedetails', $this->LookUp->getTemplateDetailByNameAndField($field, $name));
        } else if ($name == NULL && $field != NULL) {
            $this->set('templatedetails', $this->LookUp->getTemplateDetailByName($field));
        } else {
            $this->set('templatedetails', null);
            $this->set('frameworkErr', 'Template Detail Field and/or Template name must be provided.');
        }
    }


	function PrintTemplate($templateId = NULL) {
		$this->TemplateData($templateId);
	}

    function EFNR($PAT_ID = NULL) {     // PAT_ID - link into Patient Assigned Templates;


        $query = "Select Template_ID from Patient_Assigned_Templates WHERE PAT_ID = '$PAT_ID'";
        $retVal = $this->LookUp->query($query);

        if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
            $this->set('templatedata', null);
            return;
        }
// error_log("Result - " . $this->varDumpToString($retVal));
        $TemplateID = $retVal[0]["Template_ID"];


        $Msg = "Emesis / Febrile Neutropenia Risk Detail Info";
        $jsonRecord = array();
        $jsonRecord['success'] = true;

        $retVal = $this->LookUp->getTopLevelTemplateDescriptionById($TemplateID);
        if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
            $this->set('templatedata', null);
            return;
        }
        $Regimen_ID = $retVal[0]["Regimen_ID"];
        $retVal = $this->LookUp->getTopLevelTemplateDataById($TemplateID, $Regimen_ID);
        if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
            $this->set('templatedata', null);
            return;
        }

        $EmoLevel = explode(" ", $retVal[0]["emoLevel"]);
        switch($EmoLevel[0]) {
            case "Low":
            case "Minimal Emetic Risk":
                $Label = "Emesis-1";
                $Label = "Minimal Emetic Risk";
                break;
            case "Medium":
            case "Low Emetic Risk":
                $Label = "Emesis-2";
                $Label = "Low Emetic Risk";
                break;
            case "Moderate":
            case "Moderate Emetic Risk":
                $Label = "Emesis-3";
                $Label = "Moderate Emetic Risk";
                break;
            case "High":
            case "High Emetic Risk":
                $Label = "Emesis-4";
                $Label = "High Emetic Risk";
                break;
            case "Very High":
                $Label = "Emesis-5";
                break;
        }
        $query = "Select Details from SiteCommonInformation WHERE Label = '$Label' and DataType = 'Risks' order by Label ";
error_log("Lookup Controller - EFNR() EMO - $query");

        $EmesisVal = $this->LookUp->query($query);
        $retVal[0]["emoLevel"] = $EmoLevel[0];
        $retVal[0]["emoDetails"] = htmlspecialchars($EmesisVal[0]["Details"]);

        $FNRisk = $retVal[0]["fnRisk"];

        if ($FNRisk < 10) { // Low
            $FNRLevel = "Low";
            $Label = "Neutropenia-1";
        }
        else if ($FNRisk <= 20) {   // Intermediate
            $FNRLevel = "Intermediate";
            $Label = "Neutropenia-2";
        }
        else {  // High
            $FNRLevel = "High";
            $Label = "Neutropenia-3";
        }
        $query = "Select Details from SiteCommonInformation WHERE Label = '$Label' and DataType = 'Risks' order by Label ";
error_log("Lookup Controller - EFNR() FNR - $query");
        $FNRVal = $this->LookUp->query($query);
        $retVal[0]["fnrLevel"] = $FNRisk . "% (" . $FNRLevel . " Risk)";
        $retVal[0]["fnrDetails"] = htmlspecialchars($FNRVal[0]["Details"]);

        $this->set('frameworkErr', null);
        $this->set('frameworkErrCodes', null);

        if (count($retVal) > 0) {
            unset($jsonRecord['msg']);
            $jsonRecord['total'] = count($retVal);
            $jsonRecord['records'] = $retVal;
        }

       $this->set('jsonRecord', $jsonRecord);
    }



    function TemplateData($id = NULL) {
        $TemplateDataReturn = array();
        if ($id != NULL) {
error_log("Lookup Controller - TemplateData - ID = $id");

            $retVal = $this->LookUp->getTopLevelTemplateDescriptionById($id);
            if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
error_log("Lookup Controller - TemplateData - Error; Get Top Level Template Data Failed.");
                $this->set('templatedata', null);
                return;
            }
error_log("Lookup Controller - TemplateData - Initial Data - " . json_encode($retVal));


            $Regimen_ID = $retVal[0]["Regimen_ID"];
            $retVal = $this->LookUp->getTopLevelTemplateDataById($id, $Regimen_ID);
            if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
error_log("Lookup Controller - TemplateData - Error; Get Top Level Template Data Failed. 2");
                $this->set('templatedata', null);
                return;
            }
error_log("Lookup Controller - TemplateData - TopLevelTemplateDataById - $id, $Regimen_ID" . json_encode($retVal));


            $EmoLevel = "";
            if (array_key_exists ("emoLevelNum" , $retVal[0] )) {
                $EmoLevel = $retVal[0]["emoLevelNum"];
            }
            else if (array_key_exists ("emoLevel" , $retVal[0] )) {
                $EmoLevel = $retVal[0]["emoLevel"];
            }
            if ("" !== $EmoLevel) {
                $retVal1 = $this->LookUp->getEmoData( $EmoLevel );
                $retVal[0]["emodetails"] = $retVal1;
            }
            else {
                error_log("Lookup Controller - TemplateData - NO EMO Data for $EmoLevel");
            }
error_log("Lookup Controller - TemplateData - get EMO Data for $EmoLevel - " . json_encode($retVal1));


error_log("Lookup Controller - TemplateData - Getting FNRisk");
            $FNRisk = $retVal[0]["fnRisk"];
            $retVal1 = $this->LookUp->getNeutroData($FNRisk);
            $retVal[0]["fnrDetails"] = $retVal1;
            $this->set('templatedata', $retVal);
error_log("Lookup Controller - TemplateData - Get FNRisk Data for $FNRisk - " . json_encode($retVal));


error_log("Lookup Controller - getTemplateReferences  - $id");
            $retVal1 = $this->LookUp->getTemplateReferences($id);
            if($this->checkForErrors('Get Template References Failed. ', $retVal1)){
                $this->set('templatedata', null);
error_log("Lookup Controller - TemplateData - Error; Get Template References Failed.");
error_log("Lookup Controller - TemplateData - Error; " . json_encode($retVal1));
                // return;
            }
            $this->set('references', $retVal1);
error_log("Lookup Controller - References - " . json_encode($retVal1));


error_log("Lookup Controller - getHydrations  - PRE THERAPY - $id");
            $prehydrations = null;
            $infusionMap = null;
            $retVal = $this->LookUp->getHydrations($id, 'pre');
error_log("Lookup Controller - TemplateData - Got Pre Therapy - ");
error_log(json_encode($retVal));

            if ($retVal) {
                $prehydrations = $retVal;
                $infusionMap = array();
                if ( count($retVal) > 0 ) {
                    foreach ($prehydrations as $prehydration) {
                        $infusions = $this->LookUp->getMHInfusions($prehydration['id']);
                        $infusionMap[$prehydration['id']] = $infusions;
                    }
                }
                $this->set('prehydrations', $prehydrations);
                $this->set('preinfusions', $infusionMap);
            }

            $retVal = $this->LookUp->getHydrations($id, 'post');
error_log("Lookup Controller - TemplateData - Got Post Therapy - ");
error_log(json_encode($retVal));

            if ( count($retVal) > 0 ) {
                $posthydrations = $retVal;
                $infusionMap = array();
                foreach ($posthydrations as $posthydration) {
                    $infusions = $this->LookUp->getMHInfusions($posthydration['id']);
                    $infusionMap[$posthydration['id']] = $infusions;
                }
                $this->set('posthydrations', $posthydrations);
                $this->set('postinfusions', $infusionMap);
            }

            $retVal = $this->LookUp->getRegimens($id);
error_log("Lookup Controller - TemplateData - Got Therapy - ");
error_log(json_encode($retVal));
            if($this->checkForErrors('Get Template_Regimen Failed. 1', $retVal)){
error_log("Lookup Controller - TemplateData - Error; Exit 1");
                $this->set('templatedata', null);
                return;
            }

            if (count($retVal) > 0) {
                if (!isset($retVal[0]["id"])) {
error_log("Lookup Controller - TemplateData - Error; Exit 2");
                    $this->set('frameworkErr', 'Get Template_Regimen Failed. 3');
                    $this->set('templatedata', null);
                    return;
                }
                $this->set('regimens', $retVal);

                $CumulativeDoseMedsList = $this->_LookupCumulativeDoseMeds(null);
                if (!$this->checkForErrors("Cumulative Dose Meds List Lookup Failure", $CumulativeDoseMedsList)) {
                    $CumulativeDoseMedsInRegimen = array();
                    if (count($CumulativeDoseMedsList) > 0 ) {
                        foreach ($retVal as $aDrug) {
                            $drugID = $aDrug["drugid"];
                            foreach($CumulativeDoseMedsList as $CDMed) {
                                if ($CDMed["MedID"] == $drugID) {
                                    $CumulativeDoseMedsInRegimen[] = $CDMed;
                                }
                            }
                        }
                    }
                    $this->set('CumulativeDoseMedsInRegimen', $CumulativeDoseMedsInRegimen);
                }
            }
/************
            else {
                $this->set('frameworkErr', 'Get Template_Regimen Failed. 2');
                $this->set('templatedata', null);
                return;
            }
*************/

            $Patients = $this->getPatients4Template( $id );
            $this->set("PatientList", $Patients);
error_log("Lookup Controller - TemplateData - Error; Exit 3");


        } else {
error_log("Lookup Controller - TemplateData - Error; Exit 4");
            $this->set('templatedata', null);
            $this->set('frameworkErr', 'Template id must be provided.');
        }
error_log("Lookup Controller - TemplateData - Default Exit; Exit 5");
    }

    function DiseaseStage($id = null) {
        if ($id != null) {
            $Msg = "Disease Stages";
            $jsonRecord = array();
            $jsonRecord['success'] = true;
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";

            $query = "Select * from DiseaseStaging WHERE DiseaseID = '$id' order by Stage";
            $retVal = $this->LookUp->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['msg'] = $this->get('frameworkErr');
                $jsonRecord['success'] = false;
            }
            else {
                $jsonRecord['success'] = 'true';
                $this->set('frameworkErr', null);
                $this->set('frameworkErrCodes', null);

                if (count($retVal) > 0) {
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
            }
            $this->set('jsonRecord', $jsonRecord);
            return;
        } else {
            $this->set('diseasestages', null);
            $this->set('frameworkErr', 'No Disease ID provided.');
        }
    }

    function viewall($name = NULL, $description = NULL) {
        if ($description == NULL && $name == NULL) {
            $this->set('title', 'All Lookup Types');
            $this->set('lookups', $this->LookUp->selectAll());
        } else if ($description == NULL && $name != NULL) {
            $this->set('title', 'All Lookups For - ' . $name);
            $this->set('lookups', $this->LookUp->selectByName($name));
        } else if ($description != NULL && $name != NULL) {
            $this->set('title', 'All Lookups For - ' . $name . ' with Description starting with - ' . $description);
            $this->set('lookups', $this->LookUp->selectByNameAndDesc($name, $description));
        } else {
            $this->set('lookups', null);
            $this->set('frameworkErr', 'Unrecognized Parameter passed.');
        }
    }


    /*
     *  IF called via POST/PUT operation then true/false to hold meds will be in the POST body
     *  IF called via GET operation, return true/false as part of message body in JSON object
     *
     */
    function MedHold(){
        $jsonRecord = array();
        $form_data = json_decode(file_get_contents('php://input'));
        if ($form_data != null) {
            $this->LookUp->beginTransaction();
            $MedHold = $form_data->{'AllowMedHolds'};
            $retVal = $this->LookUp->setMedHold($MedHold);
            if($this->checkForErrors('Saving Medication Hold State. ', $retVal)){
                $this->LookUp->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Error";
                $jsonRecord['frameworkErr'] = $frameworkErr;
            }
            else {
                $this->LookUp->endTransaction();
                $this->set('frameworkErr', null);
                $jsonRecord['success'] = true;
                $jsonRecord['msg'] = "MedHold state saved";
            }
        }
        else {
            $retVal = $this->LookUp->getMedHold();
            if (empty($retVal)){
                $jsonRecord['MedHold'] = "0";
            }
            else {
                $jsonRecord['MedHold'] = $retVal[0]["Description"];
            }
            $jsonRecord['success'] = true;
        }
        $this->set('jsonRecord', $jsonRecord);
    }

    /*
     *  IF called via POST/PUT operation then true/false to hold meds will be in the POST body
     *  IF called via GET operation, return true/false as part of message body in JSON object
     *
     */
    function RoundingRule(){
        $jsonRecord = array();
        $form_data = json_decode(file_get_contents('php://input'));
        if ($form_data != null) {
            $this->LookUp->beginTransaction();
            $RoundingRule = $form_data->{'RoundingRule'};
            $retVal = $this->LookUp->setRoundingRule($RoundingRule);
            if($this->checkForErrors('Saving Rounding Rules State. ', $retVal)){
                $this->LookUp->rollbackTransaction();
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Error";
                $jsonRecord['frameworkErr'] = $frameworkErr;
            }
            else {
                $this->LookUp->endTransaction();
                $this->set('frameworkErr', null);
                $jsonRecord['success'] = true;
                $jsonRecord['msg'] = "Rounding Rules state saved";
            }
        }
        else {
            $retVal = $this->LookUp->getRoundingRule();
            if (empty($retVal)){
                $jsonRecord['RoundingRule'] = "0";
            }
            else {
                $jsonRecord['RoundingRule'] = $retVal[0]["Description"];
            }

            $jsonRecord['success'] = true;
        }
        $this->set('jsonRecord', $jsonRecord);
    }


    /* 
     * Gets the Site Configuration Parameters in a single call (e.g. RoundingRule & Medication Hold)
     */
    function SiteConfig() {

        $jsonRecord = array();
        $retVal = $this->LookUp->getSiteConfig();
        $jsonRecord['RoundingRule'] = "0";
        $jsonRecord['MedHold'] = "0";
        if (empty($retVal)){
        }
        else {
            foreach ($retVal as $record) {
                $temp = json_encode($record);
                $name = $record["Name"];
                $value = $record["Description"];
                $jsonRecord[$name] = $value;
            }
        }

        $jsonRecord['success'] = true;
        $this->set('jsonRecord', $jsonRecord);
    }
























/**
 * IV Fluid Type Information
 * Can be a GET request passing a Medication ID or NULL to get all Meds
 * or a POST request passing a Medication ID and a FluidType_ID to create a record
 * or a DELETE request passing a Medication ID and a FluidType_ID to delete a record
 *
 *  Sample URL: http://coms-mwb.dbitpro.com:355/LookUp/IVFluidType/7A95474E-A99F-E111-903E-000C2935B86F/42BC0BB9-87AE-E111-903E-000C2935B86F
 **/
    function _getFluidTypes($Med_ID) {
        $query = "select * from IVFluidTypes where Med_ID = '$Med_ID'";
        return $this->LookUp->query($query);
    }

    function _getAllFluidTypeRecords(&$jsonRecord) {
        $query = "
            select 
                IV.Med_ID, 
                IV.FluidType_ID, 
                lu1.name as MedName, 
                lu2.name as FluidType 
                from IVFluidTypes IV
                JOIN LookUp lu1 ON lu1.Lookup_ID = IV.Med_ID
                JOIN LookUp lu2 ON lu2.Lookup_ID = IV.FluidType_ID
                order by lu1.name, lu2.name
                ";
        $retVal = $this->LookUp->query($query);
        if ($this->checkForErrors("Retrieving Fluid Type Info", $retVal)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            return;
        }
        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($retVal);
        $jsonRecord['records'] = $retVal;
        unset($jsonRecord['msg']);
    }


    function _getFluidTypeRecords4Med(&$jsonRecord, $Med_ID) {
        $query = "select * from IVFluidTypes where Med_ID = '$Med_ID'";
        $retVal = $this->LookUp->query($query);
        if ($this->checkForErrors("Retrieving Fluid Type Info", $retVal)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            return null;
        }
        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($retVal);
        $jsonRecord['records'] = $retVal;
        unset($jsonRecord['msg']);
        return $retVal;
    }

    function _FindMedRecord($Med_ID) {
    }

    function _InsertFluidTypeRecord(&$jsonRecord, $Med_ID, $FluidType_ID) {

        if (!$Med_ID) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Missing Medication ID";
        }
        else {
            $MedRecord = $this->_getFluidTypeRecords4Med($jsonRecord, $Med_ID);
            if ($MedRecord) {
                // error_log("Found Medication Record for $Med_ID");
                // Delete all Med ID Records
                $query = "DELETE FROM IVFluidTypes where Med_ID = '$Med_ID'";
                $this->LookUp->query($query);
            }
            // error_log("NO Medication Record for $Med_ID, $FluidType_ID");
            if ("" !== $FluidType_ID) {
                $IVTypes = explode(",", $FluidType_ID);
                foreach ($IVTypes as $IVType) {
                    $query = "INSERT INTO IVFluidTypes (Med_ID,FluidType_ID) VALUES ('$Med_ID','$IVType')";
                    // error_log("IV FluidType - Query");
                    // error_log($query);
                    $retVal = $this->LookUp->query($query);
                    if ($this->checkForErrors("Retrieving Fluid Type Info", $retVal)) {
                        $jsonRecord['success'] = false;
                        $jsonRecord['msg'] = $this->get('frameworkErr');
                        return;
                    }
                }
            }
            unset($jsonRecord['msg']);
        }
    }

    function IVFluidType($Med_ID = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $jsonRecord['msg'] = "No records to find";


        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if (!$Med_ID) {
                $this->_getAllFluidTypeRecords($jsonRecord);
            }
            else {
                $this->_getFluidTypeRecords4Med($jsonRecord, $Med_ID);
            }
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $form_data = json_decode(file_get_contents('php://input'));
            $IV_FluidTypeMulti = $form_data->{'IV_FluidTypeMulti'};
            $this->_InsertFluidTypeRecord($jsonRecord, $Med_ID, $IV_FluidTypeMulti);
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            if (!$Med_ID) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Missing Medication ID";
            }
            else {
                $query = "DELETE FROM IVFluidTypes WHERE ('Med_ID' = '$Med_ID')";
                $this->LookUp->query($query);
                unset($jsonRecord['msg']);
            }
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for IV Fluid Type Service (expected a GET/POST/DELETE got a " . $_SERVER['REQUEST_METHOD'];
        }

        $this->set('jsonRecord', $jsonRecord);
        return;
    }   // End of function









    function _getAllFluidTypes() {
        $query = "select Lookup_ID as id,Lookup_ID as lookupid,Name as value,Name as description from LookUp where Lookup_Type = 28";
        return $this->LookUp->query($query);
    }

/*
		{ name: 'id', type: 'string'},
		{ name: 'value', type: 'string'},		// should this sometimes be "name"?
		{ name: 'description', type: 'string'},
		{ name: 'lookupid', type:'string'}
*/
    function _getAllFluidTypes4MedID(&$jsonRecord, $Med_ID) {
        $query = "
            select 
                IV.FluidType_ID as id, 
                lu2.name as value,
                lu2.name as description,
                IV.FluidType_ID as lookupid
                from IVFluidTypes IV
                JOIN LookUp lu2 ON lu2.Lookup_ID = IV.FluidType_ID
                where IV.Med_ID = '$Med_ID'
                order by lu2.name
                ";
// error_log("_getAllFluidTypes4MedID - $query");
        $retVal = $this->LookUp->query($query);
        if ($this->checkForErrors("Retrieving Fluid Type Info", $retVal)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            return;
        }
        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($retVal);
        $jsonRecord['records'] = $retVal;
        unset($jsonRecord['msg']);
    }

    function IVFluidType4Med($Med_ID = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $jsonRecord['msg'] = "No records to find";

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            // error_log("Get - IVFluidType4Med - $Med_ID");
            if ($Med_ID) {
                $this->_getAllFluidTypes4MedID($jsonRecord, $Med_ID);
                if (0 == $jsonRecord['total']) {
                    $retVal = $this->_getAllFluidTypes();
                    $jsonRecord['success'] = 'true';
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                    unset($jsonRecord['msg']);
                }
            }
            else {
                $retVal = $this->_getAllFluidTypes();
                $jsonRecord['success'] = 'true';
                $jsonRecord['total'] = count($retVal);
                $jsonRecord['records'] = $retVal;
                unset($jsonRecord['msg']);
            }
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for IV Fluid Type for Medication Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
        }

        $this->set('jsonRecord', $jsonRecord);
        return;
    }   // End of function































    function _getDocs4MedID(&$jsonRecord, $Med_ID) {
        $query = "
            select 
                Documentation as Docs, 
                lu2.name as value,
                lu2.name as description,
                from Med_Docs
                JOIN LookUp lu2 ON lu2.Lookup_ID = '$Med_ID'
                where Med_ID = '$Med_ID'
                order by lu2.name
                ";
// error_log("_getMedDocs - $query");
        $retVal = $this->LookUp->query($query);
        if ($this->checkForErrors("Retrieving Medication Documentation Info", $retVal)) {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = $this->get('frameworkErr');
            return;
        }
        $jsonRecord['success'] = 'true';
        $jsonRecord['total'] = count($retVal);
        $jsonRecord['records'] = $retVal;
        unset($jsonRecord['msg']);
    }



























/**
 * Med_ID = 7A95474E-A99F-E111-903E-000C2935B86F <-- NOTE: This is the ID from the InPatient/OutPatient lookup table
 * Med Name = 5-FLUOROURACIL  FLUOROURACIL INJ,SOLN
 * Retrieve info via query = Select * FROM [COMS_MWB_TEST].[dbo].[LookUp] where Lookup_ID = '7A95474E-A99F-E111-903E-000C2935B86F'
 *
 * GET Call
 * Given a Med_ID field, retrieve all the docs via query = 
 *        Select Docs.ID, lu1.name as MedName, Docs.Documentation
 *        from [COMS_MWB_TEST].[dbo].[Med_Docs] Docs
 *        JOIN [COMS_MWB_TEST].[dbo].[LookUp] lu1 on lu1.Lookup_ID = '7A95474E-A99F-E111-903E-000C2935B86F'
 *        WHERE [Med_ID] = '7A95474E-A99F-E111-903E-000C2935B86F'
 *
 * POST Call
 * Given a Med_ID and Documentation fields, insert into table via query = 
 *      INSERT INTO [COMS_MWB_TEST].[dbo].[Med_Docs]
 *          ([Med_ID] ,[Documentation])
 *          VALUES ('7A95474E-A99F-E111-903E-000C2935B86F' ,'This is a simple test')
 *
 * PUT Call
 * Given a Record_ID for an existing documentation record and Documentation fields, Update table via query = 
 *        UPDATE [COMS_MWB_TEST].[dbo].[Med_Docs]
 *        SET [Documentation] = 'This is a simple test'
 *        WHERE [ID] = 'D2BB35C9-09CE-E311-A4B9-000C2935B86F'
 *
 * DELETE Call
 * Given a Record_ID for an existing documentation record delete that specific record via query = 
 *        DELETE from [COMS_MWB_TEST].[dbo].[Med_Docs] Docs
 *        WHERE [ID] = 'D2BB35C9-09CE-E311-A4B9-000C2935B86F'
 *
 * DELETE Call (second type)
 * Given a Med_ID for a specific medication delete ALL documentation for that particular Medication via query = 
 *        DELETE from [COMS_MWB_TEST].[dbo].[Med_Docs] Docs
 *        WHERE [Med_ID] = '7A95474E-A99F-E111-903E-000C2935B86F'
 *
 * Sample Queries for Simple REST Client Testing:
 *      GET http://coms-mwb.dbitpro.com:355/LookUp/MedDocs/7A95474E-A99F-E111-903E-000C2935B86F
 *      PUT http://coms-mwb.dbitpro.com:355/LookUp/MedDocs/D2BB35C9-09CE-E311-A4B9-000C2935B86F
 *      Data = {"Documentation" : "This is a longer test string..." }
 **/

    function MedDocs($ID = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $form_data = json_decode(file_get_contents('php://input'));
        $Documentation = "";
        if (isset($form_data->{'Documentation'})) {
            $Documentation = $form_data->{'Documentation'};
        }
        // error_log("Med_Docs - Form Input");
        // error_log( $form_data );
        // error_log(file_get_contents('php://input'));

        $ErrMsg = "";

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($ID) {
                $query = "
                Select 
                    Docs.ID, 
                    Docs.Med_ID, 
                    lu1.name as MedName, 
                    Docs.Documentation
                from Med_Docs Docs
                JOIN LookUp lu1 on lu1.Lookup_ID = '$ID'
                WHERE Med_ID = '$ID'
                order by MedName";
            }
            else {
                $query = "
                Select 
                    Docs.ID, 
                    Docs.Med_ID, 
                    lu1.name as MedName, 
                    Docs.Documentation
                from Med_Docs Docs
                JOIN LookUp lu1 on lu1.Lookup_ID = Docs.Med_ID
                order by MedName";
            }
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving Medication Documentation Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
                // Clear out older revisions of this information
            $query = "delete from Med_Docs WHERE Med_ID = '$ID'";
            $retVal = $this->LookUp->query($query);
            // Then insert new info
            if ("" !== $Documentation) {
                $Documentation = $this->escapeString($Documentation);
                $query = "INSERT INTO Med_Docs ([Med_ID] ,[Documentation]) VALUES ('$ID' ,'$Documentation')";
                $jsonRecord['msg'] = "Medication Documentation Record Created";
                $ErrMsg = "Creating Medication Documentation Record";
            }
            else {
                $query = "";
                $jsonRecord['msg'] = "Medication Documentation Record Deleted";
                $ErrMsg = "Deleting Medication Documentation Record";
            }
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $query = "UPDATE Med_Docs SET Documentation = '$Documentation' WHERE ID = '$ID'";
            $jsonRecord['msg'] = "Medication Documentation Record Updated";
            $ErrMsg = "Updating Medication Documentation Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from Med_Docs where ID = '$ID'";
            $jsonRecord['msg'] = "Medication Documentation Records Deleted";
            $ErrMsg = "Deleting Medication Documentation Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Medication Documentation Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
        }


        if ("" !== $query) {
error_log("Med_Docs - Query - $query");
            $retVal = $this->LookUp->query($query);
error_log("Med_Docs - RetVal - " . json_encode($retVal));
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
error_log("Med_Docs - Query Failed - " . $jsonRecord['msg']);
            }
            else {
                $jsonRecord['success'] = 'true';
                if (count($retVal) > 0) {
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
error_log("Med_Docs - Query PASSED - " . json_encode($jsonRecord));
            }
        }
        $this->set('jsonRecord', $jsonRecord);
        return;
    }   // End of function




/**
TemplateData
Sample Template ID: 5651A66E-A183-E311-9F0C-000C2935B86F
 **/
    function TemplateMedDocs($TemplateID = null) {
        $jsonRecord = array();
        $Drugs = array();
        $query = "";
        $arrayLen = 0;
        $jsonRecord['success'] = true;
        $jsonRecord['msg'] = "First Stage Testing";
        
        if ($TemplateID != NULL) {
            $retVal = $this->LookUp->getTopLevelTemplateDescriptionById($TemplateID);
            if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
                $this->set('templatedata', null);
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            else {
                $jsonRecord['total'] = count($retVal);
                $jsonRecord['records'] = $retVal;
            }

            $Regimen_ID = $retVal[0]["Regimen_ID"];


            
            $retVal = $this->LookUp->getHydrations($TemplateID, 'pre');
            if($this->checkForErrors('Get Pre Medication_Hydration Failed. 1', $retVal)){
                $this->set('templatedata', null);
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            foreach ($retVal as $record) {
                $Drugs[] = $record['drug'];
            }

            $retVal = $this->LookUp->getHydrations($TemplateID, 'post');
            if($this->checkForErrors('Get Post Medication_Hydration Failed. ', $retVal)){
                $this->set('templatedata', null);
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            foreach ($retVal as $record) {
                $Drugs[] = $record['drug'];
            }

            $retVal = $this->LookUp->getRegimens($TemplateID);
            if($this->checkForErrors('Get Template_Regimen Failed. ', $retVal)){
                $this->set('templatedata', null);
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }

            // Get a unique, sorted list of all the medications in the template.
            foreach ($retVal as $record) {
                $Drugs[] = $record['drug'];
            }
            $Drugs1 = array_unique($Drugs);
            natcasesort($Drugs1);
            $Drugs1 = array_values($Drugs1);

            $MedicationInfo = array();
            for($i = 0; $i < count($Drugs1); $i++) {
                $temp = array();
                $theMedName = $Drugs1[$i];
                $temp["Medication"] = $theMedName;

                $query = "
                select LU.Lookup_ID, LU.Name, MD.Documentation
                from LookUp LU
                JOIN Med_Docs as MD on LU.Lookup_ID = MD.Med_ID
                where LU.Name = '$theMedName'
                ";
                $MedicationDocsInfo = "";
                $retVal = $this->LookUp->query($query);
                $ErrMsg = "Error in looking up medication documentation for $theMedName";
                if ($this->checkForErrors($ErrMsg, $retVal)) {
                    $jsonRecord['success'] = false;
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                }
                else {
                    // var_dump($retVal);
                    if (count($retVal) > 0) {
                        foreach ($retVal as $Doc) {
                            $MedicationDocsInfo .= "<br>" . $Doc["Documentation"];
                        }
                    }
                }
                $temp["Documentation"] = $MedicationDocsInfo;
                $MedicationInfo[] = $temp;
            }

            $jsonRecord['total'] = count($MedicationInfo);
            $jsonRecord['records'] = $MedicationInfo;        //array_values($Drugs1);

        }
        else {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Missing Template ID in service call";
        }
        $this->set('jsonRecord', $jsonRecord);
        return;

    }




























/**
 * GET Call
 * Given a Record_ID field, retrieve a single record from the DischargeInstruction table
 * Given a Record_ID of null retrieve all the records from the DischargeInstruction table
 *
 * POST Call
 * Given Instruction and Documentation fields, insert a new record into the DischargeInstruction table
 * Note: If a Record_ID is passed as part of the URL then the record with that ID will be deleted first and a new record created (make shift PUT)
 *
 * PUT Call
 * Given a Record_ID for an existing documentation record and Documentation fields update the specified record in the DischargeInstruction table
 *
 * DELETE Call
 * Given a Record_ID for an existing documentation record delete that specific record from the DischargeInstruction table
 *
 * Sample Queries for Simple REST Client Testing:
 *      GET http://coms-mwb.dbitpro.com:355/LookUp/DischargeInstruction
 *      GET http://coms-mwb.dbitpro.com:355/LookUp/DischargeInstruction/542C549B-05D2-E311-A4B9-000C2935B86F
 *
 *      POST http://coms-mwb.dbitpro.com:355/LookUp/DischargeInstruction/
 *      Data = { "Instruction" : "Test1", "Documentation" : "This is a modified test record" }
 *
 *      PUT http://coms-mwb.dbitpro.com:355/LookUp/DischargeInstruction/542C549B-05D2-E311-A4B9-000C2935B86F
 *      Data = { "Instruction" : "Test1", "Documentation" : "This is a modified test record" }
 *  NOTE: For PUT operations the Instruction field is ignored and does not need to be passed
 *
 *      DELETE http://coms-mwb.dbitpro.com:355/LookUp/DischargeInstruction/542C549B-05D2-E311-A4B9-000C2935B86F
 **/
    function _CommonServiceCallMethod($ID, $DataType, $Msg) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $form_data = json_decode(file_get_contents('php://input'));
        $Details = "";
        $Label = "";
        if (isset($form_data->{'Details'})) {
            $Details = $form_data->{'Details'};
        }
        if (isset($form_data->{'Label'})) {
            $Label = $form_data->{'Label'};
        }

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($ID) {
                $query = "Select * from SiteCommonInformation WHERE ID = '$ID' and DataType = '$DataType' order by Label ";
            }
            else {
                $query = "Select * from SiteCommonInformation where DataType = '$DataType' order by Label ";
            }
error_log("Lookup.Controller._CommonServiceCallMethod - $Label; DataType - $DataType; Query - $query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
                // Clear out older revisions of this information
            $query = "delete from SiteCommonInformation WHERE ID = '$ID' and DataType = '$DataType'";
            $retVal = $this->LookUp->query($query);
            // Then insert new info
            if ("" !== $Details) {
                $Label = $this->escapeString($Label);
                $Details = $this->escapeString($Details);
                $query = "INSERT INTO SiteCommonInformation (Label, Details, DataType) VALUES ('$Label' ,'$Details', '$DataType')";
                $jsonRecord['msg'] = "$Msg Record Created";
                $ErrMsg = "Creating $Msg Record";
                // error_log($query);
            }
            else {
                $query = "";
                $jsonRecord['msg'] = "$Msg Record Deleted";
                $ErrMsg = "Deleting $Msg Record";
            }
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $Details = $this->escapeString($Details);
            $Label = $this->escapeString($Label);

            $query = "UPDATE SiteCommonInformation SET Details = '$Details', Label = '$Label' WHERE ID = '$ID'";
            $jsonRecord['msg'] = "$Msg Record Updated";
            $ErrMsg = "Updating $Msg  Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from SiteCommonInformation where ID = '$ID' and DataType = '$DataType'";
            $jsonRecord['msg'] = "$Msg Records Deleted";
            $ErrMsg = "Deleting $Msg Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $Msg Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
        }


        if ("" !== $query) {
error_log("Lookup.Controller._CommonServiceCallMethod - Query - " . json_encode($query));
			$retVal = $this->LookUp->query($query);
error_log("Lookup.Controller._CommonServiceCallMethod - Returns - " . json_encode($retVal));
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            else {
                $jsonRecord['success'] = 'true';
                if (count($retVal) > 0) {
                    foreach($retVal as $r) {
                        $r["Details"] = htmlspecialchars($r["Details"]);
                        // error_log($r["Details"]);
                    }
                    // error_log(json_encode($retVal));
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
            }
        }

        $this->set('jsonRecord', $jsonRecord);
        return;
    }

    function _CommonServiceCallMethodByLabel($Label, $DataType, $Msg) {
        $jsonRecord = "";
        $query = "";

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $query = "";
            $jsonRecord = "No records to find";
            if ($Label) {
                $query = "Select Details from SiteCommonInformation WHERE Label = '$Label' and DataType = '$DataType' order by Label ";
            }
        }
// error_log("Lookup.Controller._CommonServiceCallMethodByLabel - Label = $Label; DataType - $DataType; Query - $query");

        if ("" !== $query) {
            $retVal = $this->LookUp->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord = $this->get('frameworkErr');
            }
            else {
                if (count($retVal) > 0) {
                    $buf = "";
                    foreach ($retVal as $Detail) {
                        if ("" !== $buf) {
                            $buf .= "<br>";
                        }
                        $buf .= htmlspecialchars($Detail["Details"]);
                    }
                    $jsonRecord = $buf;
                }
            }
        }
        $this->set('jsonRecord', $jsonRecord);
        return;
    }


    function DischargeInstruction($ID = null) {
        $DataType = 'Instructions';
        $Msg = 'Discharge Instructions Documentation';

        return $this->_CommonServiceCallMethod($ID, $DataType, $Msg);
    }



/**
 * GET Call
 * Given a Record_ID field, retrieve a single record from the SiteCommonInfo table
 * Given a Record_ID of null retrieve all the records from the SiteCommonInfo table
 *
 * POST Call
 * Given Label and Details fields, insert a new record into the SiteCommonInfo table
 * Note: If a Record_ID is passed as part of the URL then the record with that ID will be deleted first and a new record created (make shift PUT)
 *
 * PUT Call
 * Given a Record_ID for an existing Details record and Details fields update the specified record in the SiteCommonInfo table
 *
 * DELETE Call
 * Given a Record_ID for an existing Details record delete that specific record from the SiteCommonInfo table
 *
 * Sample Queries for Simple REST Client Testing:
 *      GET http://coms-mwb.dbitpro.com:355/LookUp/SiteCommonInfo
 *      GET http://coms-mwb.dbitpro.com:355/LookUp/SiteCommonInfo/542C549B-05D2-E311-A4B9-000C2935B86F
 *
 *      POST http://coms-mwb.dbitpro.com:355/LookUp/SiteCommonInfo/
 *      Data = { "Label" : "Test1", "Details" : "This is a modified test record" }
 *
 *      PUT http://coms-mwb.dbitpro.com:355/LookUp/SiteCommonInfo/542C549B-05D2-E311-A4B9-000C2935B86F
 *      Data = { "Label" : "Test1", "Details" : "This is a modified test record" }
 *  NOTE: For PUT operations the Label field is ignored and does not need to be passed
 *
 *      DELETE http://coms-mwb.dbitpro.com:355/LookUp/SiteCommonInfo/542C549B-05D2-E311-A4B9-000C2935B86F
 **/
    function ClinicInfo($ID = null) {
        $DataType = 'CommonInfo';
        $Msg = 'Clinic Info Details';

        return $this->_CommonServiceCallMethod($ID, $DataType, $Msg);
    }


/**
 *  Testing:
 *      Method: GET
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction
 *      Headers: None
 *      Data: None
 *      Returns - JSON List of all Toxicity Instructions
 *
 *      Method: GET
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction/CAT
 *      Headers: None
 *      Data: None
 *      Returns - JSON List of all Toxicity Categories
 *
 *      Method: GET
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction/CAT/Name
 *      Headers: None
 *      Data: None
 *      Returns - JSON List of all Toxicity Grade/Levels for the specified Category

 *
 *      Method: GET
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction/7357101E-58A8-4FDD-87D5-C607C5BE9EC1
 *      Headers: None
 *      Data: None
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1","Label":"Sample 0000-0000","Details":"Sample 1234 ----------------------","Grade_Level":""}]}
 *
 *      Method: POST
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction
 *      Headers: Content-Type:application/json
 *      Data: {"Label":"Sample 0000-0000","Details":"0000000000000000000000000000000","Grade_Level" : "Simple Testing Level"}
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1"}]}
 *
 *      Method: PUT
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/ToxicityInstruction/7357101E-58A8-4FDD-87D5-C607C5BE9EC1
 *      Headers: Content-Type:application/json
 *      Data: {"Details":"Sample 1234 ----------------------"} <-- Changes only the "Details" field of the specified record.
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1"}]}
 *
 *      Note: The ID returned from the POST and PUT is not always the same. Also the parameter passed in the PUT must be a valid ID
 *      The parameter passed in the PUT is the ID that will be returned from that operation
 *
 *  Model Functions which get/set the data as called by the controller function
 *     setToxicityData($ToxID, $_POST);
 *     updateToxicityData($ToxID, $_POST);
 *     getToxicity($ToxID);
 *
 **/
    function ToxicityInstruction($ToxID = null, $SubCat = null) {
        $DataType = 'ToxicityInstruction';
        $msg = 'Toxicity Instructions';

        $inputData = file_get_contents('php://input');
        $post_vars = json_decode($inputData);
        $jsonRecord = array();
        $jsonRecord["success"] = true;
        $tmpRecords = array();


        if ("GET" == $_SERVER["REQUEST_METHOD"]) {
            $records = $this->LookUp->getToxicity($ToxID, $SubCat);
            $msg = "Get ". $msg;
            $tmpRecords = $records;
        }

        else if ("POST" == $_SERVER["REQUEST_METHOD"]) {
            if (!$ToxID) {
                $ToxID = $this->LookUp->newGUID();
            }
            $records = $this->LookUp->setToxicityData($ToxID, $post_vars);
            $msg = "Create ". $msg;
            $ToxRec = array();
            $ToxRec["ID"] = $ToxID;
            $tmpRecords[] = $ToxRec;
        }
        else if ("PUT" == $_SERVER["REQUEST_METHOD"]) {
            if ($ToxID) {
                $records = $this->LookUp->updateToxicityData($ToxID, $post_vars);
                $msg = "Update ". $msg;
                $ToxRec = array();
                $ToxRec["ID"] = $ToxID;
                $tmpRecords[] = $ToxRec;
            }
        }
        else if ("DELETE" == $_SERVER["REQUEST_METHOD"]) {
        }


        if ($this->checkForErrors("$msg Toxicity Info Failed. ", $records)) {
            $jsonRecord["success"] = "false";
            $jsonRecord["msg"] = $this->get("frameworkErr");
            $this->set("jsonRecord", $jsonRecord);
            return;
        } 
        $jsonRecord["total"] = count($tmpRecords);
        $jsonRecord["records"] = $tmpRecords;
        $this->set("jsonRecord", $jsonRecord);
    }


    function MedRisks($ID = null, $Type = null) {
        $DataType = 'Risks';
        switch($Type) {
            case "Emesis-1":
            case "Low":
            case "Minimal Emetic Risk":
                $Type = "Minimal Emetic Risk";
                break;
            case "Emesis-2":
            case "Medium":
            case "Low Emetic Risk":
                $Type = "Low Emetic Risk";
                break;
            case "Emesis-3":
            case "Moderate":
            case "Moderate Emetic Risk":
                $Type = "Moderate Emetic Risk";
                break;
            case "Emesis-4":
            case "High":
            case "High Emetic Risk":
                $Type = "High Emetic Risk";
                break;
            case "Emesis-5":
            case "Very High":
                $DataType = "Emesis-5";
                break;
        }
        $Msg = 'Emesis/Neutropenia Risks';
        if ("Type" == $ID) {
            $retVal = $this->_CommonServiceCallMethodByLabel($Type, $DataType, $Msg);
            return $retVal;
        }
        return $this->_CommonServiceCallMethod($ID, $DataType, $Msg);
    }







/****************************************************
 *
 *  GET List of stages for all diseases
 *  GET List of stages for specific disease
 *
 ****************************************************/
    function DiseaseStaging($ID = null) {
        $Msg = "Disease Stages";
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $Disease = "";
        $Stage = "";

        if (isset($_POST["selDisease"])) {
            $Disease = $_POST["selDisease"];
        }
        if (isset($_POST["Stage"])) {
            $Stage = $_POST["Stage"];
        }

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($ID) {
                $query = "Select * from DiseaseStaging WHERE ID = '$ID' order by Stage ";
            }
            else {
                $query = "
                    select 
                        DS.ID as ID,
                        DS.DiseaseID as DiseaseID,
                        DS.Stage as Stage,
                        LU.Name As Disease
                        from DiseaseStaging DS
                        join LookUp LU on LU.Lookup_ID = DS.DiseaseID
                        Order By DS.DiseaseID, Stage";
            }

            // error_log("$query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $query = "INSERT INTO DiseaseStaging (DiseaseID, Stage) VALUES ('$Disease' ,'$Stage')";
            // error_log("POST - $query");
            $jsonRecord['msg'] = "$Msg Record Created";
            $ErrMsg = "Creating $Msg Record";
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            parse_str(file_get_contents("php://input"),$post_vars);

            // $Disease = $post_vars["Disease"];
            $DiseaseID = $post_vars["selDisease"];
            $Stage = $post_vars["Stage"];

            $query = "UPDATE DiseaseStaging SET DiseaseID = '$DiseaseID', Stage = '$Stage' WHERE ID = '$ID'";
            $jsonRecord['msg'] = "$Msg Record Updated";
            $ErrMsg = "Updating $Msg  Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from DiseaseStaging where ID = '$ID'";
            $jsonRecord['msg'] = "$Msg Records Deleted";
            $ErrMsg = "Deleting $Msg Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $Msg Service (expected a GET or POST got a " . $_SERVER['REQUEST_METHOD'];
        }

        $this->_ProcQuery($query, $jsonRecord, $ErrMsg, " ($Disease / $Stage already exists)");
    }




/*
 * URL = http://coms-mwb.dbitpro.com:355/Lookup/IDEntry
 * POST DATA:
 * Vital2Check=Temperature&MinMax=on&MinValue=90&MaxValue=103&MinMaxMsg=Temp%20Min%20Max&PctVarFromValue=on&PctVarFromValuePct=5&PctVarFromValueValue=98.6
 &PctVarFromValueMsg=Temp%20%25%20variance&PctVarFromLast=on&PctVarFromLastPct=5&PctVarFromLastMsg=Temp%20Last%20Entry%20Variance%20exceeded
 *
 * Content-Type:application/x-www-form-urlencoded; charset=UTF-8
 *
 * Data comes in as a 'php://input' stream rather than $_POST variables
 *
 *
 
USE [COMS_TEST_2]
CREATE TABLE [dbo].[IDEntry](
	[Vital2Check] [varchar](50) NOT NULL,
	[MinMax] [varchar](10) NULL,
	[MinValue] [varchar](10) NULL,
	[MaxValue] [varchar](10) NULL,
	[MinMaxMsg][nvarchar](max) NULL,
	[PctVarFromValue] [varchar](10) NULL,
	[PctVarFromValuePct] [varchar](10) NULL,
	[PctVarFromValueValue] [varchar](10) NULL,
	[PctVarFromValueMsg][nvarchar](max) NULL,
	[PctVarFromLast] [varchar](10) NULL,
	[PctVarFromLastPct] [varchar](10) NULL,
	[PctVarFromLastMsg][nvarchar](max) NULL

	CONSTRAINT uc_IDEntry UNIQUE (Vital2Check)
) ON [PRIMARY]
 */

    function IDEntry($Vital = null) {
// error_log("IDEntry");
        $Msg = "Intelligent Data Entry";
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $TableName = "IDEntry";
        $ValidFieldList = array("Vital2Check", "MinMax", "MinValue", "MaxValue", "MinMaxMsg", "PctVarFromValue", "PctVarFromValuePct", "PctVarFromValueValue", "PctVarFromValueMsg", "PctVarFromLast", "PctVarFromLastPct", "PctVarFromLastMsg");
        $sqlFieldList = array();
        $sqlDataList = array();

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if ($Vital) {       /* Get Specific Vital Info */
                $query = "Select * from $TableName WHERE Vital2Check = '$Vital'";
            }
            else {       /* Get ALL Vital Info */
                $query = "select * from $TableName";
            }

            // error_log("$query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            parse_str(file_get_contents('php://input'), $requestData);  
            foreach ($ValidFieldList as $Field) {
                $Temp = "''";
                if (isset($requestData[$Field])) {
                    $Temp = "'" . $this->escapeString($requestData[$Field]) . "'";
                }
                array_push($sqlFieldList, $Field);
                array_push($sqlDataList, $Temp);
            }
            $query = "INSERT INTO $TableName(" . implode(", ", $sqlFieldList) . ") VALUES (" . implode(", ", $sqlDataList) . ")";
            // error_log("IDEntry POST - $query");
            $jsonRecord['msg'] = "$Msg Record Created";
            $ErrMsg = "Creating $Msg Record";
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            parse_str(file_get_contents('php://input'), $requestData);  
            $query = "";
            $haveFields = false;
            foreach ($ValidFieldList as $Field) {
                $Temp = "";
                if (isset($requestData[$Field])) {
                    $haveFields = true;
                    $Temp = $this->escapeString($requestData[$Field]);
                }
                if ("" === $query) {
                    $query = "UPDATE $TableName SET ";
                }
                else {
                    $query .= ", ";
                }
                $query .= $Field . " = '" . $Temp . "'";
            }
            if ($haveFields) {
                $query .= " where Vital2Check = '$Vital'";
            }
            // error_log("IDEntry PUT - $query");




            $jsonRecord['msg'] = "$Msg Record Updated";
            $ErrMsg = "Updating $Msg  Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from $TableName where Vital2Check = '$Vital'";
            $jsonRecord['msg'] = "$Msg Records Deleted";
            $ErrMsg = "Deleting $Msg Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $Msg Service (expected a GET or POST got a " . $_SERVER['REQUEST_METHOD'];
        }
        $UniqMsg = "";
        if (isset($requestData)) {
            $UniqMsg = " (" . $this->escapeString($requestData["Vital2Check"]) . " already exists)";
        }
        $this->_ProcQuery($query, $jsonRecord, $ErrMsg, $UniqMsg);
    }



































/***
CREATE TABLE [dbo].[CumulativeDoseMeds](
      [ID] [uniqueidentifier] DEFAULT (newsequentialid()),
      [MedID] [uniqueidentifier] NOT NULL,
      [CumulativeDoseAmt] [varchar](30) NOT NULL,
      [CumulativeDoseUnits] [uniqueidentifier] NOT NULL,
      [Date_Changed] [datetime] DEFAULT (getdate()),
      [Author] [varchar](30) NULL
) ON [PRIMARY]
 ***/

    function _getAllCumulativeDoseMeds($ID) {
        $query = "Select 
              CDM.ID,
              CDM.MedID,
              CDM.CumulativeDoseAmt,
              CDM.CumulativeDoseUnits as UnitsID,
              LU.Name as MedName,
              LU2.Name as CumulativeDoseUnits
              from CumulativeDoseMeds CDM
              join Lookup LU on CDM.MedID = LU.Lookup_ID
              join Lookup LU2 on CDM.CumulativeDoseUnits = LU2.Lookup_ID ";
        if ($ID) {
            $query .= "where ID = '$ID' order by LU.Name";
        }
        else {
            $query .= "order by LU.Name";
        }
        return $query;
    }

    function _LookupCumulativeDoseMeds($ID) {
        $query = $this->_getAllCumulativeDoseMeds($ID);
        // error_log("Got Query - $query");
        $retVal = $this->LookUp->query($query);
        return $retVal;
    }



    function CumulativeDoseMeds($ID = null) {
        $Msg = "Cumulative Dose Meds";
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = $MedID = $CumulativeDoseAmt = $CumulativeDoseUnits = "";
        parse_str(file_get_contents("php://input"),$post_vars);

        if (isset($post_vars["MedName"])) {
            $MedID = $post_vars["MedName"];
        }
        if (isset($post_vars["CumulativeDoseAmt"])) {
            $CumulativeDoseAmt = $post_vars["CumulativeDoseAmt"];
        }
        if (isset($post_vars["CumulativeDoseUnits"])) {
            $CumulativeDoseUnits = $post_vars["CumulativeDoseUnits"];
        }

        $ErrMsg = "";
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $query = $this->_getAllCumulativeDoseMeds($ID);
            // error_log("$query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
            $this->_ProcQuery($query, $jsonRecord, $ErrMsg, " (Medication already exists)");
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {

/************** SAMPLE POST ***********
Request URL:    http://coms-mwb.dbitpro.com:355/LookUp/CumulativeDoseMeds
Request Method: POST
Content-Type:   application/x-www-form-urlencoded; charset=UTF-8

Form Data
MedName=8695474E-A99F-E111-903E-000C2935B86F&CumulativeDoseAmt=5000&CumulativeDoseUnits=AB85F3AA-0B21-E111-BF57-000C2935B86F

        parse_str(file_get_contents("php://input"),$post_vars);

        if (isset($post_vars["MedName"])) {
            $MedID = $post_vars["MedName"];
        }
        if (isset($post_vars["CumulativeDoseAmt"])) {
            $CumulativeDoseAmt = $post_vars["CumulativeDoseAmt"];
        }
        if (isset($post_vars["CumulativeDoseUnits"])) {
            $CumulativeDoseUnits = $post_vars["CumulativeDoseUnits"];
        }

 *************************/
            $query = "INSERT INTO CumulativeDoseMeds (MedID, CumulativeDoseAmt, CumulativeDoseUnits) VALUES ('$MedID' ,'$CumulativeDoseAmt', '$CumulativeDoseUnits')";
            // error_log("POST - $query");
            $jsonRecord['msg'] = "$Msg Record Created";
            $ErrMsg = "Creating $Msg Record";
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            $query = "UPDATE CumulativeDoseMeds SET CumulativeDoseAmt = '$CumulativeDoseAmt', CumulativeDoseUnits = '$CumulativeDoseUnits' WHERE MedID = '$ID'";
            $jsonRecord['msg'] = "$Msg Record Updated";
            $ErrMsg = "Updating $Msg  Record";
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $query = "DELETE from CumulativeDoseMeds where ID = '$ID'";
            $jsonRecord['msg'] = "$Msg Records Deleted";
            $ErrMsg = "Deleting $Msg Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for $Msg Service (expected a GET or POST got a " . $_SERVER['REQUEST_METHOD'];
        }

        $this->_ProcQuery($query, $jsonRecord, $ErrMsg, " (Medication already exists)");
    }










/*
 *
 
    CREATE TABLE [dbo].[EmeticMeds](
        [id] [uniqueidentifier] DEFAULT NEWSEQUENTIALID(),
        [EmoLevel] [int] NOT NULL,
        [MedName] [nvarchar](max) NOT NULL,
        [MedID] [uniqueidentifier] NOT NULL,
        [MedType] [nvarchar](15) NOT NULL
    )
GO    
INSERT INTO [COMS_TEST_3].[dbo].[EmeticMeds]
           ([EmoLevel]
           ,[MedName]
           ,[MedID]
           ,[MedType]
           )
     VALUES
           (1
           ,'5-FLUOROURACIL  FLUOROURACIL INJ,SOLN'
           ,'7A95474E-A99F-E111-903E-000C2935B86F'
           ,'InPatient')
GO

select * from EmeticMeds


 *
 * Testing:
 *      Method: GET
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/EmeticMeds
 *      Headers: None
 *      Data: None
 *      Returns - JSON List of all EmeticMeds
 *
 *      Method: GET specific EmeticMed
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/EmeticMeds/7357101E-58A8-4FDD-87D5-C607C5BE9EC1
 *      Headers: None
 *      Data: None
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1","Label":"Sample 0000-0000","Details":"Sample 1234 ----------------------","Grade_Level":""}]}
 *
 *      Method: POST
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/EmeticMeds
 *      Headers: Content-Type:application/json
 *      Data: {"Label":"Sample 0000-0000","Details":"0000000000000000000000000000000","Grade_Level" : "Simple Testing Level"}
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1"}]}
 *
 *      Method: PUT
 *      URL : http://coms-mwb.dbitpro.com:355/LookUp/EmeticMeds/7357101E-58A8-4FDD-87D5-C607C5BE9EC1
 *      Headers: Content-Type:application/json
 *      Data: {"Details":"Sample 1234 ----------------------"} <-- Changes only the "Details" field of the specified record.
 *      Returns - {"success":true,"total":1,"records":[{"ID":"7357101E-58A8-4FDD-87D5-C607C5BE9EC1"}]}
 *
 *      Note: The ID returned from the POST and PUT is not always the same. Also the parameter passed in the PUT must be a valid ID
 *      The parameter passed in the PUT is the ID that will be returned from that operation
 *
 *  Model Functions which get/set the data as called by the controller function
 *     setToxicityData($ToxID, $_POST);
 *     updateToxicityData($ToxID, $_POST);
 *     getToxicity($ToxID);
 *
 **/
    function EmeticMeds($EMedID = null) {
        $DataType = 'EmeticMeds';
        $msg = 'Emetic Meds';

        $inputData = file_get_contents('php://input');
        $post_vars = json_decode($inputData);
        $jsonRecord = array();
        $jsonRecord["success"] = true;
        $tmpRecords = array();

/* Note: The "Magic Number" 13 is the Type in the Lookup Table for the Emetic Levels (1-4) */
        if ("GET" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID == null) {
                $query = "
select l1.id, l1.EmoLevel, l3.Name as EmoLevelName, l2.Name as MedName, l1.MedID, l1.MedType
from EmeticMeds l1
join LookUp l2 on l1.MedID = l2.Lookup_ID
join LookUp l3 on l1.EmoLevel = l3.Description and l3.Lookup_Type = 13";
            }
            else {
                $query = "
select l1.id, l1.EmoLevel, l3.Name as EmoLevelName, l2.Name as MedName, l1.MedID, l1.MedType
from EmeticMeds l1
join LookUp l2 on l1.MedID = l2.Lookup_ID
join LookUp l3 on l1.EmoLevel = l3.Description and l3.Lookup_Type = 13
where l1.MedID = '$EMedID'";
            }
            $records = $this->LookUp->query($query);
            $msg = "Get ". $msg;
            $tmpRecords = $records;
        }

        else if ("POST" == $_SERVER["REQUEST_METHOD"]) {
            $EMedID = $this->LookUp->newGUID();
            $records = $this->LookUp->setEmeticMedData($EMedID, $post_vars);
            $msg = "Create ". $msg;
            $Rec = array();
            $Rec["id"] = $EMedID;
            $tmpRecords[] = $Rec;
        }
        else if ("PUT" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID) {
                $records = $this->LookUp->updateEmeticMedData($EMedID, $post_vars);
                $msg = "Update ". $msg;
                $Rec = array();
                $Rec["id"] = $EMedID;
                $tmpRecords[] = $Rec;
            }
            else {
                $records = array();
                $records['error'] = "No Record ID for Record to update";
            }
        }
        else if ("DELETE" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID) {
                $query = "delete from EmeticMeds where id='$EMedID'";
                $records = $this->LookUp->query($query);
                $msg = "Delete ". $msg;
                $tmpRecords = $records;
            }
            else {
                $records = array();
                $records['error'] = "No Record ID for Record to delete";
            }
        }

        if ($this->checkForErrors("$msg Emetic Meds Info Failed. ", $records)) {
            $jsonRecord["success"] = "false";
            $jsonRecord["msg"] = $this->get("frameworkErr");
            $this->set("jsonRecord", $jsonRecord);
            return;
        } 
        $jsonRecord["total"] = count($tmpRecords);
        $jsonRecord["records"] = $tmpRecords;
        $this->set("jsonRecord", $jsonRecord);
    }

    function Locations() {
        $jsonRecord = array();
        $jsonRecord["success"] = true;
        $query = "select Lookup_ID as id, Name from Lookup where Lookup_Type=22";
        $records = $this->LookUp->query($query);
        $jsonRecord["total"] = count($records);
        $jsonRecord["records"] = $records;
        $this->set("jsonRecord", $jsonRecord);

    }

    function TemplateLocation($TemplateID) {
        $jsonRecord = array();
        $jsonRecord["success"] = true;
        $records = array();

        if ("PUT" == $_SERVER["REQUEST_METHOD"]) {
// error_log("Updating Template Location");

            $tmp = json_decode(file_get_contents("php://input"));
// error_log(json_encode($tmp));
            if(isset($tmp->LocationID)) {
                $LocationID = $tmp->LocationID;
// error_log("Have New Location ID = $LocationID");
                $query = "UPDATE Master_Template SET Location_ID = '$LocationID' WHERE Template_ID = '$TemplateID'";
// error_log("Query = $query");
                $records = $this->LookUp->query($query);

                if($tmp->NationalLevel) {
                    $query = "UPDATE Template_Availability SET NationalLevel = 'Yes' WHERE TemplateID = '$TemplateID'";
                }
                else {
                    $query = "UPDATE Template_Availability SET NationalLevel = 'No' WHERE TemplateID = '$TemplateID'";
                }
// error_log("Query = $query");
                $records = $this->LookUp->query($query);

            }
        }
        $jsonRecord["total"] = count($records);
        $jsonRecord["records"] = $records;
        $this->set("jsonRecord", $jsonRecord);
    }

    function Template($EMedID = null) {
        $DataType = 'EmeticMeds';
        $msg = 'Emetic Meds';

        $inputData = file_get_contents('php://input');
        $post_vars = json_decode($inputData);
        $jsonRecord = array();
        $jsonRecord["success"] = true;
        $tmpRecords = array();

/* Note: The "Magic Number" 13 is the Type in the Lookup Table for the Emetic Levels (1-4) */
        if ("GET" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID == null) {
                $query = "
select l1.id, l1.EmoLevel, l3.Name as EmoLevelName, l2.Name as MedName, l1.MedID, l1.MedType
from EmeticMeds l1
join LookUp l2 on l1.MedID = l2.Lookup_ID
join LookUp l3 on l1.EmoLevel = l3.Description and l3.Lookup_Type = 13";
            }
            else {
                $query = "
select l1.id, l1.EmoLevel, l3.Name as EmoLevelName, l2.Name as MedName, l1.MedID, l1.MedType
from EmeticMeds l1
join LookUp l2 on l1.MedID = l2.Lookup_ID
join LookUp l3 on l1.EmoLevel = l3.Description and l3.Lookup_Type = 13
where l1.MedID = '$EMedID'";
            }
            $records = $this->LookUp->query($query);
            $msg = "Get ". $msg;
            $tmpRecords = $records;
        }

        else if ("POST" == $_SERVER["REQUEST_METHOD"]) {
            $EMedID = $this->LookUp->newGUID();
            $records = $this->LookUp->setEmeticMedData($EMedID, $post_vars);
            $msg = "Create ". $msg;
            $Rec = array();
            $Rec["id"] = $EMedID;
            $tmpRecords[] = $Rec;
        }
        else if ("PUT" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID) {
                $records = $this->LookUp->updateEmeticMedData($EMedID, $post_vars);
                $msg = "Update ". $msg;
                $Rec = array();
                $Rec["id"] = $EMedID;
                $tmpRecords[] = $Rec;
            }
            else {
                $records = array();
                $records['error'] = "No Record ID for Record to update";
            }
        }
        else if ("DELETE" == $_SERVER["REQUEST_METHOD"]) {
            if ($EMedID) {
                $query = "delete from EmeticMeds where id='$EMedID'";
                $records = $this->LookUp->query($query);
                $msg = "Delete ". $msg;
                $tmpRecords = $records;
            }
            else {
                $records = array();
                $records['error'] = "No Record ID for Record to delete";
            }
        }

        if ($this->checkForErrors("$msg Emetic Meds Info Failed. ", $records)) {
            $jsonRecord["success"] = "false";
            $jsonRecord["msg"] = $this->get("frameworkErr");
            $this->set("jsonRecord", $jsonRecord);
            return;
        } 
        $jsonRecord["total"] = count($tmpRecords);
        $jsonRecord["records"] = $tmpRecords;
        $this->set("jsonRecord", $jsonRecord);
    }

    function getPatientInfoFromVistA($DFN) {
        $PatientObj = null;
        $nodevista  = new NodeVista();
        $URL    = "patient/$DFN";
        $Info      = $nodevista->get( $URL );
        if ($Info) {
            $obj        = json_decode( $Info );
            $PatObj = array();
            if ($obj) {
                $PatObj["Name"] = $obj->{"name"};
                $PatObj["Gender"] = $obj->{"gender"};
                $PatObj["DOB"] = $obj->{"dob"};
                $PatObj["SSN"] = $obj->{"ssn"};
                $PatObj["Age"] = $obj->{"age"};
                $PatObj["DFN"] = $DFN;
                $PatObj["SSID"] = $obj->{"ssn"};
            }
        }
        return $PatObj;
    }

    function getDrugInfoFromVistA($drugID) {
error_log("Lookup Controller - getDrugInfoFromVistA - ID= $drugID; Entry point");
        $drugID   = rawurlencode(trim($drugID));
        $MedInfoObj = null;
        if (array_key_exists("DrugList", $_SESSION)) {
            $DrugList = $_SESSION["DrugList"];
            if (array_key_exists($drugID, $DrugList)) {
                $MedInfoObj = $DrugList[$drugID];
            }
        }
        else {
            $DrugList = array();
        }
        if (!$MedInfoObj) {
            $nodevista  = new NodeVista();
            $MedInfo    = $nodevista->get( "order/info/100500/$drugID" );
            $MedInfoObj = json_decode( $MedInfo );
            $DrugList[$drugID] = $MedInfoObj;
            $_SESSION["DrugList"] = $DrugList;
        }
error_log("Lookup Controller - getDrugInfoFromVistA - ID= $drugID; Info = " . json_encode($DrugList[$drugID]));
        return $MedInfoObj;
    }

    function DrugInfo($drugID) {
        // $nodevista               = new NodeVista();
        $jsonRecord              = array( );
        $jsonRecord[ "success" ] = true;
        $records                 = array( );
        $msg                     = "";

        if ("" === $drugID || null === $drugID) {
            $msg                     = "ERROR: No Drug passed";
            $jsonRecord[ "success" ] = false;
            $jsonRecord[ "msg" ]     = $msg;
            $this->set( "jsonRecord", $jsonRecord );
            return;
        }
        if ( "GET" == $_SERVER[ "REQUEST_METHOD" ] ) {
			if ("0" === $drugID) {
				$MedInfo = array();
				$Route4PCH = array("ien" => "14", "name" => "INTRAVENOUS", "code" => "IV");
				$MedInfo["Name"]       = " HYDRATION";
				$MedInfo["IEN"]        = "0000";
				$MedInfo["Routes"]     = array($Route4PCH);
				$MedInfo["Dosages"]    = array();
				$jsonRecord["MedInfo"] = $MedInfo;
			}
			else {
				$MedInfoObj = $this->getDrugInfoFromVistA($drugID);
				$Routes     = $MedInfoObj->{"Route"};
				$Dosages    = $MedInfoObj->{"Dosage"};
				$medIEN     = $MedInfoObj->{"Medication"}->{"ien"};
				$medName    = $MedInfoObj->{"Medication"}->{"name"};
				$DoseList   = array();
				foreach($Dosages as $d) {
					$d1 = explode("^^", $d);
					$d2 = explode("^", $d1[1]);
					$d3 = explode("&& ", $d2[0]);
					$Display = $d2[1];
					$Send = $d2[0];
					$dList = array();
					$dList["key"] = $d;
					$dList["name"] = $Display;
					$dList["value"] = $Send;
					$DoseList[] = $dList;
				}
				$MedInfo = array();
				$MedInfo["Name"]       = $medName;
				$MedInfo["IEN"]        = $medIEN;
				$MedInfo["Routes"]     = $Routes;
				$MedInfo["Dosages"]    = $DoseList;
				$jsonRecord["MedInfo"] = $MedInfo;
			}
            $this->set( "jsonRecord", $jsonRecord );
        }
        else {
            $msg                     = "Wrong Service Call Type... Expected a GET";
            $jsonRecord[ "success" ] = false;
            $jsonRecord[ "msg" ]     = $msg;
        }
        $this->set( "jsonRecord", $jsonRecord );
    }



function VistAUsers($name=null) {
error_log("VistAUsers");

        $jsonRecord              = array( );
        $jsonRecord[ "success" ] = true;
        $msg                     = "";
        if ( "GET" == $_SERVER[ "REQUEST_METHOD" ] ) {
            $URL = "users";
            if ($name) {
                $name   = rawurlencode(trim($name));
                $URL = "users/$name";
            }
            $nodevista   = new NodeVista();
            $UserList    = $nodevista->get( $URL );
            $jdUserList  = json_decode( $UserList );
            $jsonRecord["total"]   = count($jdUserList);
            $jsonRecord["records"] = $jdUserList;
        }
        else {
            $msg                     = "Wrong Service Call Type... Expected a GET";
            $jsonRecord[ "success" ] = false;
            $jsonRecord[ "msg" ]     = $msg;
        }
        $this->set( "jsonRecord", $jsonRecord );
    }


    function SyncMedsListRemoveOldMeds(&$jsonRecord) {
        $query = "select * from Lookup where Lookup_Type = '2' and Lookup_Type_ID is Null";
        $retVal = $this->LookUp->query($query);
        if (count($retVal) > 0) {
error_log("Have Old Style Meds to Delete");
            $query = "delete from LookUp where Lookup_Type = 2 and Lookup_Type_ID is null";
            $retVal = $this->LookUp->query($query);
            if($this->checkForErrors('Clear Medication List Failed. ', $retVal)){
                error_log("FAILURE - " . json_encode($retVal));
                $jsonRecord["success"] = "false";
                $jsonRecord["msg"] = $this->get("frameworkErr");
                return false;
            }
        }
        else {
error_log("NO Old Style Meds to Delete");
        }
error_log("Success - Old Style Meds Check");
        return true;
    }

	function AddPreChemoHydrationToInPatientMedList($NewMedsInserted) {
        $IEN = "0000";
        $name = " HYDRATION";
        $PatientTypePatient = "InPatient";

        $query = "select Lookup_Type_ID from Lookup where Lookup_Type_ID = '$IEN'";
error_log("AddPreChemoHydrationToInPatientMedList - $query");

        $retVal = $this->LookUp->query($query);
error_log("AddPreChemoHydrationToInPatientMedList - " . json_encode($retVal));
        if (count($retVal) == 0) {
            $query = "Insert into LookUp (Lookup_Type, Name, Lookup_Type_ID, Description) values ('2','$name','$IEN', '$PatientTypePatient')";
error_log("AddPreChemoHydrationToInPatientMedList - (New) $query");
            $retVal = $this->LookUp->query($query);
            if(!$this->checkForErrors('Insert Medication Failed BP1. ', $retVal)){
				$NewMedsInserted++;
			}
        }
        return $NewMedsInserted;
	}

    function SyncMedsListInsertPatient($PatientMeds, $PatientType, &$jsonRecord) {
        $PatientTypePatient = $PatientType . "Patient";
        $MedsList    = json_decode( $PatientMeds );
        $MedsListLen = count($MedsList);
        $NewMedsInserted = 0;
        $CheckCount = 0;
        for ($i = 0; $i < $MedsListLen; $i++) {
            $aMed = $MedsList[$i];
            $name = $this->escapeString($aMed->{"name"});
            $IEN = $aMed->{"ien"};
            $query = "select Lookup_Type_ID from Lookup where Lookup_Type_ID = '$IEN'";
            $retVal = $this->LookUp->query($query);
            if (count($retVal) == 0) {
                $NewMedsInserted++;
                $query = "Insert into LookUp (Lookup_Type, Name, Lookup_Type_ID, Description) values ('2','$name','$IEN', '$PatientTypePatient')";
                $retVal = $this->LookUp->query($query);

                if($this->checkForErrors('Insert Medication Failed BP1. ', $retVal)){
                    error_log("FAILURE - $query");
                    error_log("FAILURE - " . json_encode($retVal));
                    $jsonRecord["success"] = "false";
                    $jsonRecord["msg"] = $this->get("frameworkErr");
                    return false;
                }
            }
            $CheckCount++;
        }
		if("In" === $PatientType) {
			error_log("Adding PreChemoHydration to Drug Lineup");
			$NewMedsInserted = $this->AddPreChemoHydrationToInPatientMedList($NewMedsInserted);
		}
		error_log("$PatientTypePatient Check Count = $CheckCount; $NewMedsInserted");

        $jsonRecord["NumNew" . $PatientTypePatient . "MedsInserted"] = $NewMedsInserted;
        return true;
    }

    function SyncMedsListInsertInPatient($InPatientMeds, &$jsonRecord) {
        return $this->SyncMedsListInsertPatient($InPatientMeds, "In", $jsonRecord);
    }

    function SyncMedsListInsertOutPatient($OutPatientMeds, &$jsonRecord) {
        return $this->SyncMedsListInsertPatient($OutPatientMeds, "Out", $jsonRecord);
    }

    function SyncMedsListGetLastSyncTime(&$jsonRecord) {
        $query = "select Description as LastSyncTime from LookUp where Lookup_Type = 61 order by Description desc";
        $retVal = $this->LookUp->query($query);
        $LastSyncTime = $retVal[0]["LastSyncTime"];
        error_log("LastSyncTime = $LastSyncTime");
        $jsonRecord["LastSyncTime"] = $LastSyncTime;
    }

    function SyncMedsListAddSyncDate(&$jsonRecord) {
        $Today = date("Y-m-d H:i:s");
        $query = "Insert into LookUp (Lookup_Type, Name, Description) values ('61','SyncMedsListDate', '$Today')";
        $retVal = $this->LookUp->query($query);
        if($this->checkForErrors('Insert Medication Failed BP2. ', $retVal)){
            error_log("FAILURE - $query");
            error_log("FAILURE - " . json_encode($retVal));
            $jsonRecord["success"] = "false";
            $jsonRecord["msg"] = $this->get("frameworkErr");
            $this->SyncMedsListGetLastSyncTime($jsonRecord);
        }
    }


    function SyncMedsList() {
error_log("SyncMedsList - Entry Point");
        $jsonRecord              = array( );
        $jsonRecord[ "success" ] = true;

        $meds = array();

        if ( "POST" == $_SERVER[ "REQUEST_METHOD" ] ) {
            $nodevista  = new NodeVista();
            $InPatientMeds       = $nodevista->get( "medications/inpatient" );
            $OutPatientMeds      = $nodevista->get( "medications/outpatient" );
            if ($InPatientMeds && $OutPatientMeds) {
                if ($this->SyncMedsListRemoveOldMeds($jsonRecord)) {
                    if ($this->SyncMedsListInsertInPatient($InPatientMeds, $jsonRecord)) {
                        if ($this->SyncMedsListInsertOutPatient($OutPatientMeds, $jsonRecord)) {
                            $msg = "";
                            if (0 == $jsonRecord["NumNewInPatientMedsInserted"]) {
                                $msg .= "No";
                            }
                            else {
                                $msg .= $jsonRecord["NumNewInPatientMedsInserted"];
                            }
                            $msg .= " New In Patient and ";

                            if (0 == $jsonRecord["NumNewOutPatientMedsInserted"]) {
                                $msg .= "No";
                            }
                            else {
                                $msg .= $jsonRecord["NumNewOutPatientMedsInserted"];
                            }
                            $msg .= " New Out Patient Medications have been imported";

                            $jsonRecord["msg"] = $msg;
                            $this->SyncMedsListAddSyncDate($jsonRecord);
                        }
                    }
                }
            }
            else {
                error_log("SyncMedsList - NodeJS Service failed");
                $msg                     = "SyncMedsList - ERROR no data returned from NodeJS Call";
                $jsonRecord[ "success" ] = false;
                $jsonRecord[ "msg" ]     = $msg;
            }
        }
        $this->SyncMedsListGetLastSyncTime($jsonRecord);
        $this->set( "jsonRecord", $jsonRecord );

    }

}