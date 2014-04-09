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
    
    function checkForErrors($errorMsg,$retVal){
        
        if (null != $retVal && array_key_exists('error', $retVal)) {

            if(DB_TYPE == 'sqlsrv'){
				if (is_string($retVal['error'])) {
                    $errorMsg .= $retVal['error'];
				}
				else {
	                foreach ($retVal['error'] as $error) {
		                $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " . $error['message'];
			        }
				}
            }else if(DB_TYPE == 'mysql'){
                    $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

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
            $this->set('diseasestages', $this->LookUp->getDiseaseStages($id));
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
}
