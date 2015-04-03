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
 *    function Mega($type = null,$value = null)
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
    
    public function Match( $lastFour ) {
        $jsonRecord = array( );
        $client    = $this->MdwsSetup( true, $lastFour ); // MWB - 5/7/2012 Added the boolean "true" to the call since MdwsSetup has been modified to require a "isSSN" parameter
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
        
        
        $comspatientModel = new Patient();
        $patient          = $comspatientModel->getPatientIdByDFN( $this->_dfn );
        if ( $this->checkForErrors( 'Get Patient Record by DFN Failed. ', $patient ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            $this->set( 'jsonRecord', $jsonRecord );
            // return;	<-- MWB - 5/4/2012 Can't return null, need to return the jsonRecord
            return $jsonRecord;
        }

        if (count($patient) > 0) {
            error_log("Have one or more Patient Records");
        }
        else { 
            error_log("NO Patient Records");
        }



        error_log("Got Patient By DFN (" . $this->_dfn . "), No Errors - " . json_encode($patient));
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

        $nodevista = new NodeVista();
        $VPR = $nodevista->get("patient/details/" . $this->_dfn);
        $patient[0]['VPR'] = json_decode($VPR);

        $jsonRecord[ 'success' ] = true;
        $jsonRecord[ 'total' ]   = '1';
        $jsonRecord[ 'records' ] = $patient;
        $this->set( 'jsonRecord', $jsonRecord );
        
        return $jsonRecord;
    }
    
    public function Mega( $type = null, $value = null ) {
        $jsonRecord = array( );
        
        /* MWB - 3/3/2015 - Mega call no longer needed as we get the VPR by default */
        $jsonRecord[ 'success' ] = false;
        $jsonRecord[ 'message' ] = 'function no longer needed; remove';
        $this->set( 'jsonRecord', $jsonRecord );
        return;
    }
    
    public function MdwsSetup( $isSSN, $value ) {
error_log("MdwsSetup() - Entry point");
        $username   = get_current_user();
        $jsonRecord = array( );
        $roles      = $this->Mymdws->getRoleInfo( $username );

        if ( $this->checkForErrors( 'Get Role Info Failed. ', $roles ) ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
            return $jsonRecord;
        }

        $nodevista = new NodeVista();
        $nvpatient = json_decode( $nodevista->get( "patient/lastfive/$value" ), true );
        $nvpatient = $nvpatient[ 0 ];
        $pName     = explode( ",", $nvpatient[ "name" ] );
        $name      = $pName[ 1 ] . " " . $pName[ 0 ];
        $DFNcoms   = $nvpatient[ 'dfn' ];
        
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
            $jsonRecord[ 'message' ] = "More than 1 Patient with SSN matching $value";
            return $jsonRecord;
        } elseif ( null == $mdwspatients || 0 == $mdwspatients->count ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "No Patients found with SSN matching $value";
            return $jsonRecord;
        }

        $mdwspatient = $mdwspatients->patients->PatientTO;
        $this->_dfn  = $mdwspatient->localPid;
error_log("MdwsSetup - got DFN = " . $this->_dfn);

        $mdwspatient = json_decode( $nodevista->get( 'patient/' . $this->_dfn ) );

        if ( null === $mdwspatient ) {
            $jsonRecord[ 'success' ] = false;
            $jsonRecord[ 'message' ] = "No Patients found with SSN matching $value";
error_log("MdwsSetup - VistA says no patients with matching SSN, yet we got the DFN from VistA");
            return $jsonRecord;
        }

error_log("MdwsSetup - getting Patient By DFN from SQL");
        $comspatientModel = new Patient();
        $patient          = $comspatientModel->getPatientIdByDFN( $this->_dfn );
        
        if ( null == $patient || empty( $patient ) ) {
error_log("MdwsSetup - Patient with DFN does not exist in SQL; Creating one");
            $this->Mymdws->beginTransaction();
            $query = "SELECT NEWID()";
            $GUID  = $this->Mymdws->query( $query );
            $GUID  = $GUID[ 0 ][ "" ];
error_log("MdwsSetup - Creating new patient for - " . json_encode($mdwspatient));
            $retVal = $comspatientModel->addNewPatient( $mdwspatient, $value, $GUID );
            
            if ( $this->checkForErrors( 'Add New Patient from MDWS Failed. ', $retVal ) ) {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'message' ] = $this->get( 'frameworkErr' );
                $this->Mymdws->rollbackTransaction();
error_log("MdwsSetup - addNewPatient() failed - " . $this->get( 'frameworkErr' ));
                return $jsonRecord;
            }

            $this->Mymdws->endTransaction();
        }
        return null;
    }
    
    /**
     *
     * @param  SoapClient $client
     * @return array
     
     private function _mdwsMeds($client)
     {
     if (empty($client)) {
     return;
     }
     
     $result = $client->getAllMeds();
     $result = $this->mdwsBase->MDWsCrashReport($result->getAllMedsResult, "getAllMeds", false);
     if (empty($result)) {
     return;
     }
     
     $count = $result->arrays->TaggedMedicationArray->count;
     if ($count > 0) {
     $meds = (!empty($result->arrays->TaggedMedicationArray->meds)) ? $result->arrays->TaggedMedicationArray->meds : array();
     
     return $meds;
     }
     $_SESSION['MDWS_Msg'] = $this->_noMedsMsg;
     
     return;
     }
     */
    
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
