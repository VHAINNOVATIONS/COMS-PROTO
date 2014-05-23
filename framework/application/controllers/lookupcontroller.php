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
 * function 
 */
class LookupController extends Controller {
    public function escapeString($string)
    {
        if (DB_TYPE == 'sqlsrv' || DB_TYPE == 'mssql') {
            return str_replace("'", "''", $string);
        }
        return $string;
    }

    function checkForErrors($errorMsg,$retVal){
        if (null != $retVal && array_key_exists('error', $retVal)) {
            $ErrorCode = "";
            if (is_string($retVal['error'])) {
                $errorMsg .= " " . $retVal['error'];
            }
            else {
                foreach ($retVal['error'] as $error) {
                    if (2627 == $error['code']) {
                        $ErrorCode = "Unique";
                    }
                    else {
                        error_log("Lookup - $errorMsg");
                        error_log(json_encode($error));
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

        $form_data = json_decode(file_get_contents('php://input'));
        $id = $form_data->{'id'};
        $name = $form_data->{'value'};
        $description = $form_data->{'description'};
        $lookupid = $form_data->{'lookupid'};

        $this->LookUp->beginTransaction();
        
        if (strlen($lookupid) == 0) {

            $retVal = $this->LookUp->save($id, $name, $description);
            
            if($this->checkForErrors('Insert Lookup Failed. ', $retVal)){
                $this->LookUp->rollbackTransaction();
                return;
            }
            
            $lookupid = $retVal[0]['lookupid'];
            $this->set('lookupid', $retVal);
            
            if(null == $lookupid){
                $this->set('actuallookupid', $retVal[0]['actualLookupId']);
            }

        } else {
            $this->set('lookupid', $this->LookUp->update($id, $lookupid, $name, $description));
        }

        $this->set('savedid', $id);
        $this->set('savedname', $name);
        $this->set('savedescription', $description);
		$this->set('frameworkErr', null);
		
		$this->LookUp->endTransaction();

	}




    /*
     *
     * Note: Magic Numbers used...
     *    "Magic Number" 4 is the "[Lookup_Type_ID]" in the [LookUp] table for the 'Regimen' records (description = Template Selector Values with Template Name in Description)
     *    "Magic Number" 25 is the "[Lookup_Type_ID]" in the [LookUp] table for the 'TemplateAlias' records (description = Alias for template name)
     *
     */


    function saveTemplate() {
        $form_data = json_decode(file_get_contents('php://input'));
        $temp = json_encode($form_data);
        // Note: $temp['RegimenName'] is the User Optional Name (sometimes referred to as the Description)

        $regimens = $form_data->{'Meds'};
        $usersuppliedname = $form_data->{'RegimenName'};
        $regimenName = '';

        for ($index = 0; $index < count($regimens); $index++) {
            $regimendata = $regimens[$index]->{'data'};
            $amt = $regimendata->{'Amt'};
            $drugname = $regimendata->{'Drug'};
            $regimenName .= $drugname . $amt;
        }

        $this->LookUp->beginTransaction();
        $lookupinfo = $this->LookUp->getLookupIdByNameAndType($regimenName, 4);
        $templateNum = count($lookupinfo) + 1;

        // Builds new Chemotherapy Regimen Name based on versioning scheme
        $templateName = date("Y") . '-' . $templateNum . '-0001-ABCD-' . $regimenName . '-' . date("Ymd");

        $templatelookupid = $this->LookUp->save(4, $regimenName, $templateName);
		while(null == $templatelookupid[0]["lookupid"]){
            $templateNum++;
            $templateName = date("Y") . '-' . $templateNum . '-0001-ABCD-' . $regimenName . '-' . date("Ymd");
			echo $templateName;
            $templatelookupid = $this->LookUp->save(4, $regimenName, $templateName);
        }

        if ($usersuppliedname) {
            $this->LookUp->save(25, $templatelookupid[0]["lookupid"], $usersuppliedname);
        }

        $cyclelength = $form_data->{'CycleLength'};
        $this->LookUp->saveExtraFields($regimenName, $cyclelength);

        /**
         * This is just a bandaid because some calls to "/Lookup/saveTemplate" give actual
         * cycle length units and emotegenic levels instead of their GUIDs
         * 
         * @todo Fix these 4 lines later
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
            $this->LookUp->rollbackTransaction();
            return;
        }
        
        if ($templateid) {
            $templateid = $templateid[0]['lookupid'];
            $references = $form_data->{'References'};
            $this->LookUp->saveTemplateReferences($references, $templateid);
            $Order_IDR = $form_data->{'Order_IDR'};
            $prehydrations = $form_data->{'PreMHMeds'};
            if ($prehydrations) {
                $retVal = $this->LookUp->saveHydrations($prehydrations, 'Pre', $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Pre Therapy Failed. ', $retVal)){
                    $this->LookUp->rollbackTransaction();
                    return;
                }
            }

            $posthydrations = $form_data->{'PostMHMeds'};
            if ($posthydrations) {
                $retVal = $this->LookUp->saveHydrations($posthydrations, 'Post', $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Post Therapy Failed. ', $retVal)){
                    $this->LookUp->rollbackTransaction();
                    return;
                }
            }

            if ($regimens) {
                if ($Order_IDR == ''){
                    $Order_IDR = '00000000-0000-0000-0000-000000000000';
                }
                $retVal = $this->LookUp->saveRegimen($regimens, $templateid, $Order_IDR);
                if($this->checkForErrors('Insert Template Regimens Failed.', $retVal)){
                    $this->LookUp->rollbackTransaction();
                    return;
                }
            }
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
        //Update Template Availability using app/template.php
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

        if (NULL === $description && NULL != $name && NULL === $id) {
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
            $this->set('references', $this->LookUp->getTemplateReferences($id));
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
            $this->set('regimens', $this->LookUp->getRegimens($id));
        } else {
            $this->set('regimens', null);
            $this->set('frameworkErr', 'No Template ID provided.');
        }
    }

    // Note: IF calling this service with only a single parameter the parameter will be the ID of a template 
    // but it would be in the "FIELD" position, not the "ID"
    function Templates($field = NULL, $id = NULL) {
        if ($field == NULL && $id == NULL) {
            $this->set('templates', $this->LookUp->getTemplates(null));
        } else if ($field != NULL && $id == NULL) {
            $this->set('templates', null);
            $this->set('templates', $this->LookUp->getTemplates($field));
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


    function TemplateData($id = NULL) {
        if ($id != NULL) {

            $retVal = $this->LookUp->getTopLevelTemplateDescriptionById($id);
            if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            $Regimen_ID = $retVal[0]["Regimen_ID"];
            $retVal = $this->LookUp->getTopLevelTemplateDataById($id, $Regimen_ID);
            if($this->checkForErrors('Get Top Level Template Data Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }



            $EmoLevel = explode(" ", $retVal[0]["emoLevel"]);
            switch($EmoLevel[0]) {
                case "Low":
                    $Label = "Emesis-1";
                    break;
                case "Medium":
                    $Label = "Emesis-2";
                    break;
                case "Moderate":
                    $Label = "Emesis-3";
                    break;
                case "High":
                    $Label = "Emesis-4";
                    break;
                case "Very High":
                    $Label = "Emesis-5";
                    break;
            }
            $query = "Select Details from SiteCommonInformation WHERE Label = '$Label' and DataType = 'Risks' order by Label";
            $EmesisVal = $this->LookUp->query($query);
            $retVal[0]["emodetails"] = htmlspecialchars($EmesisVal[0]["Details"]);

            $FNRisk = $retVal[0]["fnRisk"];
            if ($FNRisk < 10) {
                $Label = "Neutropenia-1";
            }
            else if ($FNRisk <= 20) {
                $Label = "Neutropenia-2";
            }
            else {
                $Label = "Neutropenia-3";
            }
            $query = "Select Details from SiteCommonInformation WHERE Label = '$Label' and DataType = 'Risks' order by Label";
            $FNRVal = $this->LookUp->query($query);

            $retVal[0]["fnrDetails"] = htmlspecialchars($FNRVal[0]["Details"]);

            $this->set('templatedata', $retVal);
            $retVal = $this->LookUp->getTemplateReferences($id);

            if($this->checkForErrors('Get Template References Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            
            $this->set('references', $retVal);





            $retVal = $this->LookUp->getHydrations($id, 'pre');

            if($this->checkForErrors('Get Pre Medication_Hydration Failed. 1', $retVal)){
//error_log("Get Pre Medication_Hydration Failed. 1");
                $this->set('templatedata', null);
                return;
            }

            if (count($retVal) <= 0) {
                $this->set('frameworkErr', 'Get Pre Medication_Hydration Failed. 2');
                $this->set('templatedata', null);
//error_log("Get Pre Medication_Hydration Failed.2 ");
                return;
            }
            if (!isset($retVal[0]["id"])) {
                $this->set('frameworkErr', 'Get Pre Medication_Hydration Failed. 3');
                $this->set('templatedata', null);
//error_log("Get Pre Medication_Hydration Failed. 3");
                return;
            }
            $prehydrations = $retVal;
            $infusionMap = array();
//error_log("Pre Medication_Hydration Count. " . count($prehydrations));

            foreach ($prehydrations as $prehydration) {
                $infusions = $this->LookUp->getMHInfusions($prehydration['id']);
                $infusionMap[$prehydration['id']] = $infusions;
//error_log(json_encode($infusions));
            }

            $this->set('prehydrations', $prehydrations);
            $this->set('preinfusions', $infusionMap);


            $retVal = $this->LookUp->getHydrations($id, 'post');
            $posthydrations = $retVal;

            if($this->checkForErrors('Get Post Medication_Hydration Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            if (count($retVal) <= 0) {
                $this->set('frameworkErr', 'Get Post Medication_Hydration Failed. ');
                $this->set('templatedata', null);
                return;
            }
            if (!isset($retVal[0]["id"])) {
                $this->set('frameworkErr', 'Get Post Medication_Hydration Failed. ');
                $this->set('templatedata', null);
                return;
            }
            
            
            $infusionMap = array();

            foreach ($posthydrations as $posthydration) {
                $infusions = $this->LookUp->getMHInfusions($posthydration['id']);
                $infusionMap[$posthydration['id']] = $infusions;
            }

            $this->set('posthydrations', $posthydrations);
            $this->set('postinfusions', $infusionMap);


            
            $retVal = $this->LookUp->getRegimens($id);

            if($this->checkForErrors('Get Template_Regimen Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            if (count($retVal) <= 0) {
                $this->set('frameworkErr', 'Get Template_Regimen Failed. ');
                $this->set('templatedata', null);
                return;
            }
            if (!isset($retVal[0]["id"])) {
                $this->set('frameworkErr', 'Get Template_Regimen Failed. ');
                $this->set('templatedata', null);
                return;
            }
            $this->set('regimens', $retVal);


        } else {
            $this->set('templatedata', null);
            $this->set('frameworkErr', 'Template id must be provided.');
        }
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
                error_log("Found Medication Record for $Med_ID");
                // Delete all Med ID Records
                $query = "DELETE FROM IVFluidTypes where Med_ID = '$Med_ID'";
                $this->LookUp->query($query);
            }
            error_log("NO Medication Record for $Med_ID, $FluidType_ID");
            if ("" !== $FluidType_ID) {
                $IVTypes = explode(",", $FluidType_ID);
                foreach ($IVTypes as $IVType) {
                    $query = "INSERT INTO IVFluidTypes (Med_ID,FluidType_ID) VALUES ('$Med_ID','$IVType')";
                    error_log("IV FluidType - Query");
                    error_log($query);
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
error_log("_getAllFluidTypes4MedID - $query");
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
            error_log("Get - IVFluidType4Med - $Med_ID");
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
error_log("_getMedDocs - $query");
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
            $query = "DELETE from Med_Docs where Med_ID = '$ID'";
            $jsonRecord['msg'] = "Medication Documentation Records Deleted";
            $ErrMsg = "Deleting Medication Documentation Records";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Incorrect method called for Medication Documentation Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'];
        }
        if ("" !== $query) {
            $retVal = $this->LookUp->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            else {
                $jsonRecord['success'] = 'true';
                if (count($retVal) > 0) {
                    unset($jsonRecord['msg']);
                    $jsonRecord['total'] = count($retVal);
                    $jsonRecord['records'] = $retVal;
                }
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
        error_log("SiteCommonInfo");
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
                $query = "Select * from SiteCommonInformation where DataType = '$DataType' order by Label";
            }
            error_log("SiteCommonInfo Query - $query");
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
                error_log($query);
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
            $retVal = $this->LookUp->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = $this->get('frameworkErr');
            }
            else {
                $jsonRecord['success'] = 'true';
                if (count($retVal) > 0) {
                    foreach($retVal as $r) {
                        $r["Details"] = htmlspecialchars($r["Details"]);
                        error_log($r["Details"]);
                    }
                    error_log(json_encode($retVal));
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



    function MedRisks($ID = null, $Type = null) {
        $DataType = 'Risks';
        $Msg = 'Emesis/Neutropenia Risks';
        if ("Type" == $ID) {
            return $this->_CommonServiceCallMethodByLabel($Type, $DataType, $Msg);
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

            error_log("$query");
            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $query = "INSERT INTO DiseaseStaging (DiseaseID, Stage) VALUES ('$Disease' ,'$Stage')";
            error_log("POST - $query");
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

        if ("" !== $query) {
            $retVal = $this->LookUp->query($query);
            if ($this->checkForErrors($ErrMsg, $retVal)) {
                if("Unique" == $this->get('ErrorCode')) {
                    $jsonRecord['msg'] = "Can not have duplicate records ($Disease / $Stage already exists";
                }
                else {
                    $jsonRecord['msg'] = $this->get('frameworkErr');
                }
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
        }
        $this->set('jsonRecord', $jsonRecord);
        return;
    }
}