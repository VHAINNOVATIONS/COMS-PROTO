<?php

/**
 * @property LookUp $LookUp
 * 
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

    function saveTemplate() {

        $form_data = json_decode(file_get_contents('php://input'));
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

        $templateid = $this->LookUp->saveTemplate($form_data, $templatelookupid[0]["lookupid"]);

        if($this->checkForErrors('Insert Master Template Failed. ', $templateid)){
            $this->LookUp->rollbackTransaction();
            return;
        }
        
        if ($templateid) {
            $templateid = $templateid[0]['lookupid'];

            $references = $form_data->{'References'};

            $this->LookUp->saveTemplateReferences($references, $templateid);
			
			//var_dump($form_data);
			$Order_IDR = $form_data->{'Order_IDR'};
			//var_dump($Order_IDR);

            $prehydrations = $form_data->{'PreMHMeds'};

            if ($prehydrations) {
			//var_dump($prehydrations);
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
        }else{
            
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
        //$username = 'kevin.dean';
        
        $mdws = new Mymdws();
        $roles = $mdws->getRoleInfo($username);
		$rid = $_SESSION['rid'];
		$sitelist = $_SESSION['sitelist'];

        $this->LookUp->TemplateLevel($templateid,$sitelist,$NationalLevel,$rid);
		
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

    function Templates($field = NULL, $id = NULL) {

        if ($field == NULL && $id == NULL) {
            $this->set('templates', $this->LookUp->getTemplates(null));
        } else if ($field != NULL && $id == NULL) {
            $this->set('templates', null);
            $this->set('templates', $this->LookUp->getTemplates($field));
            //$this->set('frameworkErr', 'Please provide an id for '.$field.' type');
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

    function TemplateData($id = NULL) {
        if ($id != NULL) {
            $retVal = $this->LookUp->getTopLevelTemplateDataById($id);

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

            if($this->checkForErrors('Get Pre Medication_Hydration Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }

            $prehydrations = $retVal;
            
            
            $infusionMap = array();

            foreach ($prehydrations as $prehydration) {
                $infusions = $this->LookUp->getMHInfusions($prehydration['id']);
                $infusionMap[$prehydration['id']] = $infusions;
            }

            $this->set('prehydrations', $prehydrations);
            $this->set('preinfusions', $infusionMap);


            $retVal = $this->LookUp->getHydrations($id, 'post');

            if($this->checkForErrors('Get Post Medication_Hydration Failed. ', $retVal)){
                $this->set('templatedata', null);
                return;
            }
            
            $posthydrations = $retVal;
            
            
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

}
