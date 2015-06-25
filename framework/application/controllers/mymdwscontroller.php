<?php

/**
 *
 * @property Mymdws $Mymdws
 * @property MdwsBase $mdwsBase
 *
 *    function TreatmentStatus($detail)
 *    function AllVitals($lastFour,$existingClient = null)
 *    function Allergies($lastFour,$existingClient=null)
 *    function MDWSMatchPatient($client,$lastFour)
 *    function MDWSSelectPatientByDFN($client,$dfn)
 *    function Match($lastFour)
 *    function MdwsSetup($isSSN,$value)
 *    function Mega($type = null,$value = null)     <-- Pulled, no longer needed as we get the VPR by default - MWB - 3/3/2015
 *    function checkForErrors($errorMsg,$retVal)
 *
 */
class mymdwscontroller extends Controller {
    private $_dfn;
    private $mdwsBase = null;
    
    public function checkForErrors( $errorMsg, $retVal ) {
        if ( null != $retVal && array_key_exists( 'error', $retVal ) ) {
            if ( DB_TYPE == 'sqlsrv' ) {
                foreach ( $retVal[ 'error' ] as $error ) {
                    $errorMsg .= "SQLSTATE: " . $error[ 'SQLSTATE' ] . " code: " . $error[ 'code' ] . " message: " . $error[ 'message' ];
                }
            } elseif ( DB_TYPE == 'mysql' ) {
                $errorMsg .= $retVal[ 'error' ];
            }
            $this->set( 'frameworkErr', $errorMsg );
            return true;
        }
        return false;
    }
    
    /**
     *
     * @param  array $detail
     * @return array
     *
     * @todo combine this with the TreatmentStatus method in Patient Controller - avoid duplication
     */
    public function TreatmentStatus( $detail ) {
        $startDate     = new DateTime( $detail[ 'TreatmentStart' ] );
        $endDate       = new DateTime( $detail[ 'TreatmentEnd' ] );
        $actualEndDate = ( !empty( $detail[ 'TreatmentEndActual' ] ) ) ? new DateTime( $detail[ 'TreatmentEndActual' ] ) : null;
        $today         = new DateTime( "now" );
        
        if ( ( !empty( $actualEndDate ) && $today > $actualEndDate ) || $today > $endDate ) {
            $status = "Ended";
        } elseif ( $today < $startDate ) {
            $status = "Applied";
        } else {
            $comsPatient = new Patient();
            $admindate   = $comsPatient->isAdminDate( $detail[ 'TemplateID' ], $today->format( 'Y-m-d' ) );
            if ( count( $admindate ) > 0 ) {
                $status = "On-Going - Admin Day";
            } else {
                $status = "On-Going - Rest Day";
            }
        }
        $detail[ 'TreatmentStatus' ] = $status;
        return $detail;
    }

    private function createEmptyTemplateArray() {
        $details                               = array( );
        $details[ 0 ][ 'TemplateID' ]          = '';
        $details[ 0 ][ 'TemplateName' ]        = '';
        $details[ 0 ][ 'TemplateDescription' ] = '';
        $details[ 0 ][ 'TreatmentStart' ]      = '';
        $details[ 0 ][ 'TreatmentEnd' ]        = '';
        $details[ 0 ][ 'TreatmentStatus' ]     = '';
        $details[ 0 ][ 'Goal' ]                = '';
        $details[ 0 ][ 'ClinicalTrial' ]       = '';
        $details[ 0 ][ 'WeightFormula' ]       = '';
        $details[ 0 ][ 'BSAFormula' ]          = '';
        $details[ 0 ][ 'PerformanceStatus' ]   = '';
        return $details;
    }


    public function getVitalsFromVistA($DFN) {
        $nodevista = new NodeVista();
        $VPR = $nodevista->get("patient/vitals/$DFN");
        return json_decode($VPR);
    }



    private function MatchGetInfo4OnePatient($lastFour, $comspatientModel) {
error_log("MyMDWS Controller - MatchGetInfo4OnePatient() - Entry Point, DFN = " . $this->_dfn);
        $patient          = $comspatientModel->getPatientIdByDFN( $this->_dfn );
        if ( $this->checkForErrors( 'Get Patient Record by DFN Failed. ', $patient ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            $this->set( 'jsonRecord', $jsonRecord );
error_log("MyMDWS Controller - MatchGetInfo4OnePatient() - call to Patient Model -> getPatientIdByDFN() FAILED - " . $this->get( 'frameworkErr' ));
            return $jsonRecord;
        }

        if (count($patient) > 0) {
            error_log("Have one or more Patient Records");
        }
        else { 
            error_log("NO Patient Records");
        }


error_log("MyMDWS Controller - MatchGetInfo4OnePatient() - Got Patient By DFN (" . $this->_dfn . "), No Errors - " . json_encode($patient));

        $patient = $comspatientModel->selectByPatientId( $patient[ 0 ][ 'id' ] );
        if ( $this->checkForErrors( 'Get Patient Info Failed. ', $patient ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            $this->set( 'jsonRecord', $jsonRecord );
            // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
            return $jsonRecord;
        }


        error_log("Got Patient Info, No Errors (look for id in element 0) - " . json_encode($patient));
        $patientTemplate = $comspatientModel->getTemplateIdByPatientID( $patient[ 0 ][ 'id' ] );
        if ( $this->checkForErrors( 'Get Patient Template Failed. ', $patientTemplate ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            $this->set( 'jsonRecord', $jsonRecord );
            return $jsonRecord;
        } elseif ( !empty( $patientTemplate ) ) {
            $details = $comspatientModel->getPatientDetailInfo( $patient[ 0 ][ 'id' ] );
            if ( $this->checkForErrors( 'Get Patient Details Failed. ', $details ) ) {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
                $this->set( 'jsonRecord', $jsonRecord );
                return $jsonRecord;
            }
        } else {
            $details = $this->createEmptyTemplateArray();

        }
        error_log("Got Patient Details " . json_encode($details));
        
        
        
        if ( '' === $details[ 0 ][ 'TemplateID' ] ) {
            $detail = $details[ 0 ];
        } else {
            $detail = $this->TreatmentStatus( $details[ 0 ] );
            if ( $detail[ 'TreatmentStatus' ] == "Ended" ) {
                $detail                          = array( );
                $detail[ 'TemplateID' ]          = '';
                $detail[ 'TemplateName' ]        = '';
                $detail[ 'TemplateDescription' ] = '';
                $detail[ 'TreatmentStart' ]      = '';
                $detail[ 'TreatmentEnd' ]        = '';
                $detail[ 'TreatmentStatus' ]     = '';
                $detail[ 'Goal' ]                = '';
                $detail[ 'ClinicalTrial' ]       = '';
                $detail[ 'WeightFormula' ]       = '';
                $detail[ 'BSAFormula' ]          = '';
                $detail[ 'PerformanceStatus' ]   = '';
            }
        }

        
        $patient[ 0 ] = array_merge( $patient[ 0 ], $detail );
        
        $lookup      = new LookUp();
        $amputations = $lookup->getLookupDescByNameAndType( $patient[ 0 ][ 'id' ], '30' );
        if ( $this->checkForErrors( 'Get Patient Amputations Failed. ', $amputations ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            $this->set( 'jsonRecord', $jsonRecord );
            return;
        }
        
        $tmpAmputations = array( );
        foreach ( $amputations as $amputation ) {
            array_push( $tmpAmputations, $amputation );
        }
        
        $patient[ 0 ][ 'Amputations' ] = $tmpAmputations;
        $patient[0]['VPR'] = $this->getVitalsFromVistA($this->_dfn);

        $VPR_New = array();
        $VPR_Data = array();
        $VPR_Data_Items = array();

        $NameInfo = array();
        $NameInfo["Name"] = $this->_Name;
        $NameInfo["pName"] = $this->_pName;
        $NameInfo["fullName"] = $this->_fullName;
        $NameInfo["briefId"] = $lastFour;
        $NameInfo["dateOfBirth"] = $this->_dob;
        $NameInfo["genderCode"] = "urn:va:pat-gender:M";
        $NameInfo["gender"] = $this->_gender;
        $NameInfo["age"] = $this->_age;
        $NameInfo["dfn"] = $this->_dfn;
        $NameInfo["ssn"] = $this->_ssn;

        $fullname = array();
        $fullname[] = $NameInfo;

        // $VPR_Data_Items = array_merge( $VPR_Data_Items, json_decode($VPR), $NameInfo, json_encode($VPR1) );
        $VPR_Data_Items = array_merge( $VPR_Data_Items, $fullname, json_decode($VPR) );
        $VPR_Data["items"] = $VPR_Data_Items;
        $VPR_New["data"] = $VPR_Data;
        $patient[0]["VPR"] = $VPR_New;

        $this->patient = $patient[0];
error_log("MyMDWS Controller - MatchGetInfo4OnePatient() - EXIT Point, patient = " . json_decode($this->patient) );

        return null;
    }

    public function Match( $lastFour ) {
        $jsonRecord = array( );
        $client    = $this->MdwsSetup( true, $lastFour ); // MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
        error_log("MyMDWS Controller - Match($lastFour) - " . json_encode($client));
        if(false === $client[ 'success' ]) {
            $this->set( 'jsonRecord', $client );
            return $client;
        }


        $nodevista = new NodeVista();
        
        if ( !array_key_exists( 'UserDUZ', $_SESSION ) ) {
            error_log( "Getting User DUZ" );
            $UserInfo = $nodevista->get( "user/info" );
            $obj      = json_decode( $UserInfo );
            error_log( "User Information = $UserInfo" );
            $_SESSION[ 'UserDUZ' ] = $obj->{'duz'};
        }
        else {
            error_log("Got User DUZ - " . $_SESSION[ 'UserDUZ' ]);
        }


/*vvvvvvvvvvvvvvvvvv CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 vvvvvvvvvvvvvvvvvv
        if ($this->_dfn == "7245792") {
            $this->_dfn = "100499";
        }
        else if ($this->_dfn == "7254979") {
            $this->_dfn = "100500";
        }
        else if ($this->_dfn == "7305057") {
            $this->_dfn = "100501";
        }
^^^^^^^^^^^^^^^^^ CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 ^^^^^^^^^^^^^^^^^*/

        $comspatientModel = new Patient();

        $nvpatient = $this->nvPatientsList;
        $PatientList = array();
        // $PatientList["Patients"] = array();
        foreach ( $nvpatient as $aPatient ) {
error_log("My MDWS Controller - Match() - Getting info for a Patient " . json_encode($aPatient));
            $retVal = $this->getCPRSPatientData4Patient($lastFour, $aPatient, $nodevista);
            if ($retVal) {
                return $retVal;
            }

/*vvvvvvvvvvvvvvvvvv CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 vvvvvvvvvvvvvvvvvv
        if ($this->_dfn == "7245792") {
            $this->_dfn = "100499";
        }
        else if ($this->_dfn == "7254979") {
            $this->_dfn = "100500";
        }
        else if ($this->_dfn == "7305057") {
            $this->_dfn = "100501";
        }
^^^^^^^^^^^^^^^^^ CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 ^^^^^^^^^^^^^^^^^*/

error_log("My MDWS Controller - Match() - Got Info for a Patient so continuing with - " . json_encode($this));
            $retVal = $this->MatchGetInfo4OnePatient($lastFour, $comspatientModel);
            if ($retVal) {
                return $retVal;
            }
            // $aSinglePatient = array();
            // $aSinglePatient["Patient"] = $this->patient;
            // $PatientList["Patients"][] = $this->patient;
            $PatientList[] = $this->patient;
error_log("My MDWS Controller - Match() - Returning Patient Array - " . json_encode($PatientList));
        }




        $jsonRecord[ 'success' ] = true;
        $jsonRecord[ 'total' ]   = count($PatientList);
        $jsonRecord[ 'records' ] = $PatientList;
        $this->set( 'jsonRecord', $jsonRecord );
        return $jsonRecord;
    }
    





    private function getCPRSPatientData4Patient($patientSSID, $nvPatient, $nodevista) {
error_log("My MDWS Controller - getCPRSPatientData4Patient() - " . json_encode($nvPatient));
        $nvpatient = $nvPatient;
        $pName     = explode( ",", $nvpatient[ "name" ] );
        $name      = $pName[ 1 ] . " " . $pName[ 0 ];
        $DFNcoms   = $nvpatient[ 'dfn' ];
        $this->_Name = $name;
        $this->_pName = $pName;


/*vvvvvvvvvvvvvvvvvv CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 vvvvvvvvvvvvvvvvvv
        if ($DFNcoms == "7245792") {
            $DFNcoms = "100499";
        }
        else if ($DFNcoms == "7254979") {
            $DFNcoms = "100500";
        }
        else if ($DFNcoms == "7305057") {
            $DFNcoms = "100501";
        }
^^^^^^^^^^^^^^^^^ CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 ^^^^^^^^^^^^^^^^^*/



        $nvpatientInfo = json_decode( $nodevista->get( "patient/$DFNcoms" ), true );
error_log("Patient Detail Info replacing VPR - " . json_encode($nvpatientInfo));
        $this->_fullName = $nvpatientInfo["name"];
        $this->_gender = $nvpatientInfo["gender"];
        $this->_dob = $nvpatientInfo["dob"];
        $this->_ssn = $nvpatientInfo["ssn"];
        $this->_age = $nvpatientInfo["age"];
        $this->_dfn = $nvpatientInfo["localPid"];

        $mdwspatients            = array( );
        $mdwspatients[ 'count' ] = 0;
        if ( isset( $nvpatient ) ) {
            $mdwspatients[ 'UseNode' ]             = "true";
            $mdwspatients[ 'patients' ]            = new stdClass();
            $mdwspatients[ 'patients' ]->PatientTO = (object) $nvpatient;
            $mdwspatients[ 'count' ]               = 1;
        }
        $mdwspatients = (object) $mdwspatients;

        if ( null != $mdwspatients && 1 < $mdwspatients->count ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "More than 1 Patient with SSN matching $patientSSID";
error_log("My MDWS Controller - getCPRSPatientData4Patient() - More than 1 Patient with SSN matching $patientSSID");
            return $jsonRecord;
        } elseif ( null == $mdwspatients || 0 == $mdwspatients->count ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "No Patients found with SSN matching $patientSSID";
error_log("My MDWS Controller - getCPRSPatientData4Patient() - No Patients found with SSN matching $patientSSID");
            return $jsonRecord;
        }

        $mdwspatient = $mdwspatients->patients->PatientTO;
        $this->_dfn  = $mdwspatient->localPid;
error_log("MdwsSetup - got DFN from VistA via Node = " . $this->_dfn);

        // $mdwspatient = json_decode( $nodevista->get( 'patient/' . $this->_dfn ) );
        $mdwspatient = $nvpatientInfo;

        if ( null === $mdwspatient ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "No Patients found with SSN matching $patientSSID";
error_log("MdwsSetup - VistA says no patients with matching SSN, yet we got the DFN from VistA");
            return $jsonRecord;
        }

error_log("MdwsSetup - getting Patient By DFN (" . $this->_dfn . ") from SQL");
        $comspatientModel = new Patient();
        $patient          = $comspatientModel->getPatientIdByDFN( $this->_dfn );

        if ( null == $patient || empty( $patient ) ) {
error_log("MdwsSetup - Patient with DFN does not exist in SQL; Creating one");
            $this->Mymdws->beginTransaction();
            $query = "SELECT NEWID()";
            $GUID  = $this->Mymdws->query( $query );
            $GUID  = $GUID[ 0 ][ "" ];
error_log("MdwsSetup - Creating new patient for - " . json_encode($mdwspatient));
            $retVal = $comspatientModel->addNewPatient( $mdwspatient, $patientSSID, $GUID );
            
            if ( $this->checkForErrors( 'Add New Patient from MDWS Failed. ', $retVal ) ) {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
                $this->Mymdws->rollbackTransaction();
error_log("MdwsSetup - addNewPatient() failed - " . $this->get( 'frameworkErr' ));
                return $jsonRecord;
            }
            $this->Mymdws->endTransaction();
        }
        else {
error_log("MdwsSetup - Patient with DFN (" . $this->_dfn . ") DOES exist in SQL;");
        }
        return null;
    }
    
    public function MdwsSetup( $isSSN, $value ) {
// error_log("MdwsSetup() Now using NodeVistA - Entry point");
        $username   = get_current_user();
        $jsonRecord = array( );
        $roles      = $this->Mymdws->getRoleInfo( $username );      // from SQL

        if ( $this->checkForErrors( 'Get Role Info Failed. ', $roles ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            return $jsonRecord;
        }

        $nodevista = new NodeVista();
        $nvpatient = json_decode( $nodevista->get( "patient/lastfive/$value" ), true );
error_log("MyMDWS_Controller - MdwsSetup - Patient Info for isSSN = $isSSN, $value - " . json_encode($nvpatient));

/*vvvvvvvvvvvvvvvvvv CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 vvvvvvvvvvvvvvvvvv
$nvpatient = json_decode(
'[
    {
        "dfn": "7245792",
        "name": "KRWGHU,JEUDTSXWEHU ZDJELHA",
        "localPid": "7245792"
    },
    {
        "dfn": "7254979",
        "name": "KYDFEST,WEDADW IHUXJEH",
        "localPid": "7254979"
    },
    {
        "dfn": "7305057",
        "name": "KDYMDH,KXYYDH ZLUDH",
        "localPid": "7305057"
    }
]'
, true );
^^^^^^^^^^^^^^^^^ CODE FOR FORCED MULTIPLE MATCHES - MWB - 6/17/2015 ^^^^^^^^^^^^^^^^^*/


error_log("MyMDWS_Controller - MdwsSetup - Patient Info for forced example of Lookup for k1918 - " . json_encode($nvpatient));


error_log("MyMDWS_Controller - MdwsSetup - Patient Info for $value - " . json_encode($nvpatient));
error_log("MyMDWS_Controller - MdwsSetup - Results Count = " . count($nvpatient));
        if (count($nvpatient) == 0) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "No Patients found with patient identification matching $value";
            return $jsonRecord;
        }
        else {
error_log("MyMDWS_Controller - MdwsSetup - " . count($nvpatient) . " Patients found with patient identification matching $value");
        }


        $this->nvPatientsList = $nvpatient;
        /**
        foreach ( $nvpatient as $aPatient ) {
            $retVal = $this->getCPRSPatientData4Patient($value, $aPatient, $nodevista);
            if ($retVal) {
                return $retVal;
            }
        }
        **/
        return null;
    }

    public function MDWSMatchPatient( $client, $lastFour ) {
        if ( null === $client ) {
            return "";
        }
        $result = $client->match( array(
             'target' => $lastFour 
        ) );
        $result = $this->mdwsBase->MDWsCrashReport( $result->matchResult, "match", false );
        if ( null === $result ) {
            return;
        }
        return ( $result->arrays->TaggedPatientArray );
    }
    
    public function MDWSSelectPatientByDFN( $client, $dfn ) {
        if ( null === $client ) {
            return "";
        }
        
        $result = $client->select( array(
             'DFN' => $dfn 
        ) );
        $result = $this->mdwsBase->MDWsCrashReport( $result->selectResult, "Select", false );
        
        if ( null === $result ) {
            return;
        }
        
        return $result;
    }
}
