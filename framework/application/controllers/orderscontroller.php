<?php
    class OrdersController extends Controller {
        function checkForErrors( $errorMsg, $retVal ) {
            $ErrorCode = "";
            $this->set('frameworkErrCodes', $ErrorCode);
            if (null != $retVal && array_key_exists('error', $retVal)) {
                if (is_string($retVal['error'])) {
                    $errorMsg .= " " . $retVal['error'];
                }
                else {
                    foreach ($retVal['error'] as $error) {
                        $errorMsg .= "SQLSTATE: " . $error[ 'SQLSTATE' ] . " code: " . $error[ 'code' ] . " message: " . $error[ 'message' ];
                    }
                }
                return true;
            }
            return false;
        }

        
        function getMostRecentVitals( $PatientID ) {
error_log("Orders Controller - getMostRecentVitals($PatientID)");
            $jsonRecord = array();
            $jsonRecord[ 'success' ] = true;

            $controller        = 'PatientController';
            $patientController = new $controller( 'Patient', 'patient', null );
            $patientModel      = new Patient();
            $records           = $patientModel->getMeasurements_v1( $PatientID, null );
            $mrHeight          = 0;
            $mrWeight          = 0;
            $ret               = array( );
            $ret[ "Age" ]      = $records[ 0 ][ "Age" ];
            $ret[ "Gender" ]   = $records[ 0 ][ "Gender" ];

            foreach ( $records as $aVital ) {
                $h = "";
                $w = "";
                if (array_key_exists("Height", $aVital)) {
                    $h = $aVital[ "Height" ];
                }
                if (array_key_exists("Weight", $aVital)) {
                    $w = $aVital[ "Weight" ];
                }

                if ( "" !== $h && 0 == $mrHeight ) {
                    $mrHeight = $h;
                }
                if ( "" !== $w && 0 == $mrWeight ) {
                    $mrWeight = $w;
                }
                if ( $mrWeight !== 0 && $mrHeight !== 0 ) {
                    $ret[ "Height" ] = $mrHeight;
                    $ret[ "Weight" ] = $mrWeight;
error_log("Patient Vitals - " . json_encode($ret));
            $jsonRecord[ 'total' ]   = 1;
            $jsonRecord[ 'records' ] = array();
            $jsonRecord[ 'records' ][] = $ret;
            $this->set( 'jsonRecord', $jsonRecord );

                    return $ret;
                }
            }

            $ret[ "Height" ] = $mrHeight;
            $ret[ "Weight" ] = $mrWeight;
error_log("Patient Vitals - " . json_encode($ret));


            $jsonRecord[ 'total' ]   = 1;
            $jsonRecord[ 'records' ] = array();
            $jsonRecord[ 'records' ][] = $ret;
            $this->set( 'jsonRecord', $jsonRecord );
            return $ret;
        }

        function getAmputationPct( $PatientID ) {
            // error_log("Amputations for - $PatientID");
            $lookup      = new LookUp();
            $amputations = $lookup->getLookupDescByNameAndType( $PatientID, '30' );
            if ( $this->checkForErrors( 'Get Patient Amputations Failed. ', $amputations ) ) {
                $this->set( 'templatedata', null );
                // error_log("Error getting Amputations..." . $this->get('frameworkErr'));
                return;
            }
            $totalPctReduction = 0;
            // $BSACalcs = new BSACalcs;
            
            $controller = 'BSACalcController';
            $BSACalcs   = new $controller( 'BSACalc', 'bsacalc', null );
            
            // error_log("Amputation Count = " . count($amputations));
            foreach ( $amputations as $amputation ) {
                $Ampu = $amputation[ 'description' ];
                // error_log("Ampu = $Ampu");
                $rslt = $BSACalcs->AmputationsPctLoss[ $Ampu ];
                // error_log("rslt = $rslt");
                $totalPctReduction += $rslt;
                // error_log("Pct BSA Reduction due to amputation of $Ampu = $rslt");
            }
            // error_log("TOTAL Pct BSA Reduction due to amputation = $totalPctReduction");
            return $totalPctReduction;
        }
        



    function Prep4BSA_DosingCalc($PIDF) {
        error_log("Orders Controller - Prep4BSA_DosingCalc - $PIDF");
        $controller          = 'PatientController';
        $patientController   = new $controller( 'Patient', 'patient', null );
        $BSA                 = $patientController->_getBSA( $PIDF );
        $w                   = $BSA[ 0 ][ "WeightFormula" ];
        $b                   = $BSA[ 0 ][ "BSAFormula" ];
        $mrHW                = $this->getMostRecentVitals( $PIDF );
        $ampu                = $this->getAmputationPct( $PIDF );

        $controller          = 'BSACalcController';
        $BSACalcs            = new $controller( 'BSACalc', 'bsacalc', null );
        $WeightInKG          = $BSACalcs->Pounds2Kilos( $mrHW[ "Weight" ] );
        $HeightInM           = $BSACalcs->In2Meters( $mrHW[ "Height" ] );

            $BSAWeight = $WeightInKG;
            if ( "Adjusted Weight" == $w ) {
                $BSAWeight = $BSACalcs->AdjustedWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
            } else if ( "Ideal Weight" == $w ) {
                $BSAWeight = $BSACalcs->IdealWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
            } else if ( "Lean Weight" == $w ) {
                $BSAWeight = $BSACalcs->LeanWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
            }

            $BSA = 0;
            if ( "Mosteller" == $b ) {
                $BSA = $BSACalcs->BSA_Mosteller( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
            } else if ( "DuBois" == $b ) {
                $BSA = $BSACalcs->BSA_DuBois( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
            } else if ( "Haycock" == $b ) {
                $BSA = $BSACalcs->BSA_Haycock( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
            } else if ( "Gehan and George" == $b ) {
                $BSA = $BSACalcs->BSA_Gehan_George( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
            } else if ( "Boyd" == $b ) {
                $BSA = $BSACalcs->BSA_Boyd( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
            }
            $BSA_Prep = array();
            $BSA_Prep["WeightFormula"] = $w;
            $BSA_Prep["BSAFormula"] = $b;
            $BSA_Prep["Vitals"] = $mrHW;
            $BSA_Prep["Amputations"] = $ampu;
            $BSA_Prep["WeightInKG"] = $WeightInKG;
            $BSA_Prep["HeightInM"] = $HeightInM;
            $BSA_Prep["BSAWeight"] = $BSAWeight;
            $BSA_Prep["BSA"] = $BSA;
        return $BSA_Prep;
    }


function BSA_DosingCalc($BSA_Prep, $DoseF, $UnitF) {
        $FinalCalculatedDose         = array();
        $FinalCalculatedDose['dose'] = "";
        $FinalCalculatedDose['unit'] = "";

        if ( "auc" == $UnitF ) {
            $Patient                      = array();
            $Patient[ "Age" ]             = $BSA_Prep["Vitals"][ "Age" ];
            $Patient[ "Gender" ]          = $BSA_Prep["Vitals"][ "Gender" ];
            $Patient[ "Weight" ]          = $BSA_Prep["Vitals"][ "Weight" ];
            $Patient[ "SerumCreatinine" ] = 1;
            $CalculatedDose               = $BSACalcs->CalcAUCDose( $Patient, $DoseF );

            $FinalCalculatedDose['dose']          = $CalculatedDose;
            $FinalCalculatedDose['unit']          = "mg";
        } else if ( "mg/kg" == $UnitF || "units / kg" == $UnitF ) {
            $CalculatedDose      = $DoseF * $BSA_Prep["WeightInKG"];
            $FinalCalculatedDose['dose'] = $CalculatedDose;
            if ( "mg/kg" == $UnitF ) {
                $FinalCalculatedDose['unit'] = "mg";
            } else {
                $FinalCalculatedDose['unit'] = "units";
            }
        } else {
            $CalculatedDose      = $DoseF * $BSA_Prep["BSA"];
            $FinalCalculatedDose['dose'] = $CalculatedDose;
            if ( "mg/m2" == $UnitF ) {
                $FinalCalculatedDose['unit'] = "mg";
            } else {
                $FinalCalculatedDose['unit'] = "units";
            }
        }
        return $FinalCalculatedDose;
    }
















        function FinalizeMedicationDosing( $form_data ) {
            $UntouchedFormData = $form_data;

error_log( "OrdersModel.grabOrders - Order Cleared - checking for problem with AUC Calculation" );
error_log( json_encode( $form_data ) );
            
            $DoseF = $form_data->{'dose'};
            $UnitF = strtolower( $form_data->{'unit'} );
            $PIDF  = $form_data->{'patientID'};

error_log( "OrdersModel.grabOrders - DoseF = $DoseF; UnitF = $UnitF" );
            if ( "auc" == $UnitF || "mg/kg" == $UnitF || "mg/m2" == $UnitF || "units / m2" == $UnitF || "units / kg" == $UnitF ) {
                // Calculate Dose based on BSA
                $controller        = 'PatientController';
                $patientController = new $controller( 'Patient', 'patient', null );
                $BSA               = $patientController->_getBSA( $PIDF );
                $w                 = $BSA[ 0 ][ "WeightFormula" ];
                $b                 = $BSA[ 0 ][ "BSAFormula" ];
                
error_log( "BSA Formula - " . json_encode($BSA));
error_log( "BSA Formula - $w; $b" );
                
                $mrHW = $this->getMostRecentVitals( $PIDF );
error_log( "Most Recent = " . json_encode(mrHW));
error_log( "Most Recent = " . $mrHW[ "Height" ] . " " . $mrHW[ "Weight" ] . " " . $mrHW[ "Age" ] . " " . $mrHW[ "Gender" ] );
                
                $ampu = $this->getAmputationPct( $PIDF );
error_log( "TOTAL Pct BSA Reduction due to amputation = $ampu" );
                
                $controller = 'BSACalcController';
                $BSACalcs   = new $controller( 'BSACalc', 'bsacalc', null );
                $WeightInKG = $BSACalcs->Pounds2Kilos( $mrHW[ "Weight" ] );
                $HeightInM  = $BSACalcs->In2Meters( $mrHW[ "Height" ] );
                
                $BSAWeight = $WeightInKG;
                if ( "Adjusted Weight" == $w ) {
                    $BSAWeight = $BSACalcs->AdjustedWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
                } else if ( "Ideal Weight" == $w ) {
                    $BSAWeight = $BSACalcs->IdealWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
                } else if ( "Lean Weight" == $w ) {
                    $BSAWeight = $BSACalcs->LeanWeight( $mrHW[ "Weight" ], $mrHW[ "Height" ], $mrHW[ "Gender" ] ); // Height in Inches, weight in pounds
                }
error_log( "Calculated BSA Weight; Actual (lbs/kg) = " . $mrHW[ "Weight" ] . "/$WeightInKG; Weight Method = $w; BSAWeight = $BSAWeight" );
                
                $BSA = 0;
                if ( "Mosteller" == $b ) {
                    $BSA = $BSACalcs->BSA_Mosteller( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
                } else if ( "DuBois" == $b ) {
                    $BSA = $BSACalcs->BSA_DuBois( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
                } else if ( "Haycock" == $b ) {
                    $BSA = $BSACalcs->BSA_Haycock( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
                } else if ( "Gehan and George" == $b ) {
                    $BSA = $BSACalcs->BSA_Gehan_George( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
                } else if ( "Boyd" == $b ) {
                    $BSA = $BSACalcs->BSA_Boyd( $HeightInM, $BSAWeight ); // Height in Meters, Weight in Kg
                }
                
                if ( "auc" == $UnitF ) {
                    $Patient                      = array();
                    $Patient[ "Age" ]             = $mrHW[ "Age" ];
                    $Patient[ "Gender" ]          = $mrHW[ "Gender" ];
                    $Patient[ "Weight" ]          = $mrHW[ "Weight" ];
                    $Patient[ "SerumCreatinine" ] = 1;
                    $CalculatedDose               = $BSACalcs->CalcAUCDose( $Patient, $DoseF );

                    $form_data->{'dose'}          = $CalculatedDose;
                    $form_data->{'unit'}          = "mg";
                } else if ( "mg/kg" == $UnitF || "units / kg" == $UnitF ) {
                    $CalculatedDose      = $DoseF * $WeightInKG;
                    $form_data->{'dose'} = $CalculatedDose;
                    if ( "mg/kg" == $UnitF ) {
                        $form_data->{'unit'} = "mg";
                    } else {
                        $form_data->{'unit'} = "units";
                    }
                } else {
                    $CalculatedDose      = $DoseF * $BSA;
                    $form_data->{'dose'} = $CalculatedDose;
                    if ( "mg/m2" == $UnitF ) {
                        $form_data->{'unit'} = "mg";
                    } else {
                        $form_data->{'unit'} = "units";
                    }
                }
                $form_data->{'orderstatus'} = "ClearedUpdate";
            }

error_log( "Result of calculating Dosage - " . json_encode($form_data));

            return $form_data;
        }


    private function _SendOrderData2VistA($nodevista, $DFN, $theMedID, $dosage, $VistA_Route, $AdminDays) {
error_log("-------------------------- _SendOrderData2VistA - START --------------------------");
        $m = explode(":", $theMedID);
        $m = trim($m[1]);
        $VistA_Order                          = array( );
        $VistA_Order[ "dfn" ]                 = "$DFN";
        $VistA_Order[ "provider" ]            = $_SESSION[ "UserDUZ" ];
        $VistA_Order[ "clinic" ]              = $_SESSION[ "sitelist" ];
        $VistA_Order[ "type" ]                = "inpatient";
        $VistA_Order[ "drug" ]                = $m;
        $VistA_Order[ "dosage" ]              = $dosage;
        $VistA_Order[ "route" ]               = $VistA_Route;
        $VistA_Order[ "administration_days" ] = $AdminDays;
        $VistA_Order[ "administration_time" ] = "1520";

        $orderURL    = "order/new";
        $OrderReturn = $nodevista->post( $orderURL, json_encode( $VistA_Order ) );
        $OrderIEN = json_decode($OrderReturn, true);
        $OrderIEN = $OrderIEN['ien'];

        error_log("Order Sent - ");
        error_log("Order URL - $orderURL");
        error_log("Order Data - " . json_encode($VistA_Order));
        error_log("Order Return - $OrderReturn");
        error_log("Order IEN - $OrderIEN");
error_log("-------------------------- _SendOrderData2VistA - FINISHED --------------------------");

        return $OrderIEN;
    }

    private function _SignOrder($nodevista, $DFN, $OrderIEN) {
error_log("-------------------------- _SignOrder - START --------------------------");
        $VistA_Order                          = array( );
        $VistA_Order[ "patientId" ]           = "$DFN";
        $VistA_Order[ "providerId" ]          = $_SESSION[ "UserDUZ" ];
        $VistA_Order[ "locationIen" ]         = $_SESSION[ "sitelist" ];
        $VistA_Order[ "accesscode" ]          = "cprs1234";
        $VistA_Order[ "orderIds" ]            = array($OrderIEN);

        $orderURL    = "order/send";
        $VistAReturn = $nodevista->post( $orderURL, json_encode( $VistA_Order ) );

        error_log("Order Sent - ");
        error_log("Order URL - $orderURL");
        error_log("Order Data - " . json_encode($VistA_Order));
        error_log("Order Return - $VistAReturn");
error_log("-------------------------- _SignOrder - FINISHED --------------------------");
        return ($VistAReturn == "");
    }


    private function _LockPatient($nodevista, $DFN) {
error_log("-------------------------- _LockPatient - START --------------------------");
        $orderURL = "order/lockforpatient";
        $Params = array();
        $Params["dfn"] = $DFN;
        $VistAReturn = $nodevista->post( $orderURL, json_encode( $Params ) );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['status'];
error_log("VistA URL - $orderURL");
error_log("VistA Data - " . json_encode($Params));
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- _LockPatient - FINISHED --------------------------");
        return $Status;
    }

    private function _UnLockPatient($nodevista, $DFN) {
error_log("-------------------------- _UnLockPatient - START --------------------------");
        $orderURL = "order/unlockforpatient";
        $Params = array();
        $Params["dfn"] = $DFN;
        $VistAReturn = $nodevista->post( $orderURL, json_encode( $Params ) );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['status'];

error_log("VistA URL - $orderURL");
error_log("VistA Data - " . json_encode($Params));
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- _UnLockPatient - FINISHED --------------------------");
        return $Status;
    }


    private function _LockOrder ($nodevista, $OrderIEN) {
error_log("-------------------------- _LockOrder - START --------------------------");
        $orderURL = "order/lock";
        $Params = array();
        $Params["ien"] = $OrderIEN;
        $VistAReturn = $nodevista->post( $orderURL, json_encode( $Params ) );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['status'];
error_log("VistA URL - $orderURL");
error_log("VistA Data - " . json_encode($Params));
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- _LockOrder - FINISHED --------------------------");
        return $Status;
    }



    private function _UnLockOrder ($nodevista, $OrderIEN) {
error_log("-------------------------- _UnLockOrder - START --------------------------");
        $orderURL = "order/unlock";
        $Params = array();
        $Params["ien"] = $OrderIEN;
        $VistAReturn = $nodevista->post( $orderURL, json_encode( $Params ) );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['status'];
error_log("VistA URL - $orderURL");
error_log("VistA Data - " . json_encode($Params));
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- _UnLockOrder - FINISHED --------------------------");
        return $Status;
    }



    private function _GetOrderMsg ($nodevista, $OrderIEN) {
error_log("-------------------------- complexOrderMessage - START --------------------------");
        $orderURL = "order/complexOrderMessage/$OrderIEN";

        $VistAReturn      = $nodevista->get( $orderURL );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['message'];

error_log("VistA URL - $orderURL");
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- complexOrderMessage - FINISHED --------------------------");
        return ($Status == "");
    }

    private function _OrderReleased ($nodevista, $OrderIEN) {
error_log("-------------------------- checkRelease - START --------------------------");
        $orderURL = "order/checkRelease/$OrderIEN";

        $VistAReturn      = $nodevista->get( $orderURL );
        $Status = json_decode($VistAReturn, true);
        $Status = $Status['message'];

error_log("VistA URL - $orderURL");
error_log("VistAReturn - $VistAReturn");
error_log("VistAReturn Status - $Status");
error_log("-------------------------- checkRelease - FINISHED --------------------------");
        return ($Status == "");
    }


    private function _IsMedTypeOutPatient($theMedID) {
        $LookupModel      = new LookUp();
        $MedType    = $LookupModel->getMedicationType($theMedID);
        return ("OutPatient" == $MedType);
    }

    private function _ProcessAndSignOrderThroughVistA($PatientID, $theMedID, $dosage, $VistA_Route, $AdminDays) {
        $patientModel      = new Patient();
        $Patient_Record    = $patientModel->getPatientDFNByGUID($PatientID);
error_log("_ProcessAndSignOrderThroughVistA - " . json_encode($Patient_Record));
        if (array_key_exists("error", $Patient_Record)) {
            $errMsgList = "Error retrieving patient DFN" . $Patient_Record["error"];
            return $PatientID;
        }

        $Approver = $patientModel->getApproverOfRegimen($PatientID);
        if ("" === $Approver) {
            $errMsgList = "No Approver of specified Regimen found";
error_log("_ProcessAndSignOrderThroughVistA - $errMsgList" );
            return "";
        }
error_log("_ProcessAndSignOrderThroughVistA - Approver = $Approver" );

        $OutpatientMed = $this->_IsMedTypeOutPatient($theMedID);
        if ($OutPatientMed) {
            error_log("Orders Controller - _ProcessAndSignOrderThroughVistA - Medication is for Outpatient so no signing required");
            return "";
        }
error_log("_ProcessAndSignOrderThroughVistA - InPatient Medication" );


        $DFN = $Patient_Record[0]["DFN"];


        $nodevista   = new NodeVista();

error_log("_ProcessAndSignOrderThroughVistA - _SendOrderData2VistA" );

        $OrderIEN = $this->_SendOrderData2VistA($nodevista, $DFN, $theMedID, $dosage, $VistA_Route, $AdminDays);
        if ($this->_LockPatient($nodevista, $DFN)) {
            if ($this->_LockOrder ($nodevista, $OrderIEN)) {
                if ($this->_GetOrderMsg($nodevista, $OrderIEN)) {
                    if ($this->_OrderReleased($nodevista, $OrderIEN)) {
                        $this->_SignOrder($nodevista, $DFN, $OrderIEN);
                    }
                }
                $this->_UnLockOrder ($nodevista, $OrderIEN);
            }
        }
        $this->_UnLockPatient($nodevista, $DFN);
    }


        
        function ProcessOrdersPosting( $form_data ) {
            $this->Orders->beginTransaction();
error_log( "OrdersController.grabOrders.HasFormData - " );
error_log( json_encode( $form_data ) );
            
            $OrderStatusF = $form_data->{'orderstatus'};
            $PIDF         = $form_data->{'patientID'};
            $DFN          = $form_data->{'dfn'};
            if ( "Cleared" == $OrderStatusF ) {
                $form_data = $this->FinalizeMedicationDosing( $form_data );
            } else if ( "Finalized" == $OrderStatusF ) {
                $drugName         = $form_data->{'drug'};
                $controller       = 'LookupController';
                $lookupController = new $controller( 'Lookup', 'lookup', null );
                $DrugInfo         = $lookupController->getDrugInfoFromVistA( $drugName );
                // error_log("grabOrders function has DrugInfo from Lookup");
                // error_log(json_encode($DrugInfo));
                
                $dayOfWeek    = date( "w", strtotime( $form_data->{'adminDay'} ) );
                $AdminDays    = array( );
                $AdminDays[ ] = $dayOfWeek;
                
                $theMed    = $DrugInfo->{"Medication"};
                $theMedID  = $theMed->{"ien"};
                $theRoutes = $DrugInfo->{"Route"};
                
                $RouteInfo   = explode( " : ", $form_data->{'route'} );
                $RouteInfoID = $RouteInfo[ 1 ];
                
                $VistA_Route          = array( );
                $VistA_Route[ "ien" ] = $RouteInfoID;

                error_log("Routes Length - " . count($theRoutes));
                foreach ( $theRoutes as $route ) {
                    error_log( "Walking Routes - $RouteInfoID - " . json_encode( $route ) );
                    $theRouteID = $route->{"ien"};
                    if ( $theRouteID === $RouteInfoID ) {
                        $VistA_Route[ "code" ] = $route->{"code"};
                        break;
                    } else {
                        error_log( "Walking Routes - $RouteInfoID - Not Found" );
                    }
                }
                error_log( "Walking Routes - FINISHED" );

                $this->_ProcessAndSignOrderThroughVistA($PIDF, $theMedID, $form_data->{'dose'} . " " . $form_data->{'unit'}, $VistA_Route, $AdminDays);
            }
            
            // error_log( "OrdersController.grabOrders.HasFormData - POST FINALIZEATION!" );
            // error_log( json_encode( $form_data ) );
            
            $returnVal = null;
            $returnVal = $this->Orders->updateOrderStatus( $form_data );
            
            if ( $this->checkForErrors( 'Update Order Status Values Failed. ', $returnVal ) ) {
                // error_log( "orders 1 - " . json_encode( $returnVal ) );
                $this->Orders->rollbackTransaction();
                $jsonRecord[ 'success' ] = 'false';
                $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                $this->set( 'jsonRecord', $jsonRecord );
                return;
            }
            
            $this->Orders->endTransaction();
            
            $jsonRecord[ 'success' ] = 'true';
            $jsonRecord[ 'msg' ]     = 'Order Status Updated Succesfully';
            $this->set( 'jsonRecord', $jsonRecord );
            
        }
        
        function GrabOrders4PatientOnDate( $patientID, $AdminDate, $Dispensed ) {
            $jsonRecord = array( );
            // error_log( "OrdersController.grabOrders - Have PatientID and Date - " );
            
            $query = "SELECT
       os.Order_Status as orderstatus
      ,os.Drug_Name as drug
      ,os.Order_Type as type
      ,os.Patient_ID as patientID
      ,p.dfn as DFN
      ,os.Order_ID
      ,os.Drug_ID
      ,os.FlowRate
      ,os.Sequence
      ,CASE
          WHEN replace(os.Amt,',','') = FLOOR(replace(os.Amt,',','')) THEN
              CONVERT(nvarchar(max), CONVERT(decimal(10,0), replace(os.Amt,',','')))
          ELSE
              CONVERT(nvarchar(max), CONVERT(decimal(10,1), replace(os.Amt,',','')))
      END as dose
      ,os.Unit as unit
      ,CASE
          WHEN CHARINDEX(':', os.Route) > 0 THEN
              left(os.Route, CHARINDEX(':', os.Route)-1)
          ELSE
              os.Route
       END as route
      ,os.flvol
      ,os.FluidType
      ,os.infusion
      ,ISNULL(CONVERT(varchar(50),ndt.StartTime),'') as StartTime
      ,ISNULL(CONVERT(varchar(50),ndt.EndTime),'') as EndTime
      ,ISNULL(CONVERT(varchar(50),ndt.Comments),'') as Comments
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_User),'') as Treatment_User
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_Date),'') as Treatment_Date
      ,ISNULL(CONVERT(varchar(50),ndt.Dose),'') as ndDose
      ,CONVERT(varchar(10), os.Admin_Date, 101) as adminDate
      FROM Order_Status os
      left join ND_Treatment ndt on ndt.Order_ID = os.Order_ID
      join Patient p on p.Patient_ID = os.Patient_ID
      where os.Patient_ID = '$patientID' and os.Admin_Date='$AdminDate'";
            
            if ( $Dispensed ) {
                $query = "
SELECT
CASE
when os.Order_Status = 'Cancelled' or os.Order_Status = 'Administered' or os.Order_Status = 'Dispensed' THEN
os.Order_Status
Else
'Not Dispensed'
End as orderstatus
      ,os.Order_Status as ActualOrderStatus
      ,os.Drug_Name as drug
      ,os.Order_Type as type
      ,os.Patient_ID as patientID
      ,p.dfn as DFN
      ,os.Order_ID
      ,os.Drug_ID
      ,os.FlowRate
      ,os.Sequence
      ,CASE
          WHEN replace(os.Amt,',','') = FLOOR(replace(os.Amt,',','')) THEN
              CONVERT(nvarchar(max), CONVERT(decimal(10,0), replace(os.Amt,',','')))
          ELSE
              CONVERT(nvarchar(max), CONVERT(decimal(10,1), replace(os.Amt,',','')))
      END as dose
      ,os.Unit as unit
      ,CASE
          WHEN CHARINDEX(':', os.Route) > 0 THEN
              left(os.Route, CHARINDEX(':', os.Route)-1)
          ELSE
              os.Route
       END as route
      ,os.flvol
      ,os.FluidType
      ,os.infusion
      ,ISNULL(CONVERT(varchar(50),ndt.StartTime),'') as StartTime
      ,ISNULL(CONVERT(varchar(50),ndt.EndTime),'') as EndTime
      ,ISNULL(CONVERT(varchar(50),ndt.Comments),'') as Comments
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_User),'') as Treatment_User
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_Date),'') as Treatment_Date
      ,ISNULL(CONVERT(varchar(50),ndt.Dose),'') as ndDose
      ,CONVERT(varchar(10), os.Admin_Date, 101) as adminDate
      ,ISNULL(CONVERT(varchar(50),ndt.Treatment_ID),'') as Treatment_ID
      FROM Order_Status os
      left join ND_Treatment ndt on ndt.Order_ID = os.Order_ID
      join Patient p on p.Patient_ID = os.Patient_ID
      where os.PAT_ID = '$patientID' and os.Admin_Date='$AdminDate'";
                
            }
            error_log( "Grab Orders Query - $query" );
            $TreatmentData = $this->Orders->query( $query );
            if ( $this->checkForErrors( 'Get Patient Templates Failed. ', $TreatmentData ) ) {
                $jsonRecord[ 'success' ] = 'false';
                $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                $this->set( 'jsonRecord', $jsonRecord );
            } else {
                $retData = array( );
                foreach ( $TreatmentData as $rec ) {
                    $type = $rec[ "type" ];
                    if ( "Therapy" != $type ) {
                        $type .= " Therapy";
                    }
                    $pid      = $rec[ "patientID" ];
                    $pdfn     = $rec[ "DFN" ];
                    $aDate    = $rec[ "adminDate" ];
                    $DrugName = $rec[ "drug" ];
                    $query    = "SELECT
       Drug
      ,Dose
      ,Unit
      ,CASE
          WHEN CHARINDEX(':', Route) > 0 THEN
              left(Route, CHARINDEX(':', Route)-1)
          ELSE
              Route
       END as Route
      ,StartTime
      ,EndTime
      ,Comments
      ,Treatment_User
      ,Treatment_Date
      ,Dose_OriginalValue
      ,PAT_ID
      ,Template_ID as templateID
      ,Patient_ID as patientID
      ,Drug_OriginalValue as drug_originalValue
      ,Unit_OriginalValue as unit_originalValue
      ,Route_OriginalValue as route_originalValue
      from ND_Treatment
      where Patient_ID = '$pid' and
      AdminDate = '$aDate' and
      Drug = '$DrugName' and
      Type = '$type'";
                    $tData    = $this->Orders->query( $query );
                    if ( $this->checkForErrors( 'Get Patient Templates Failed. ', $tData ) ) {
                        $jsonRecord[ 'success' ] = 'false';
                        $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                        $this->set( 'jsonRecord', $jsonRecord );
                    } else {
                        if ( count( $tData ) > 0 ) {
                            $rec[ "StartTime" ]           = $this->SelectedTimeConvert( $tData[ 0 ][ "StartTime" ] );
                            $rec[ "EndTime" ]             = $this->SelectedTimeConvert( $tData[ 0 ][ "EndTime" ] );
                            $rec[ "Comments" ]            = $tData[ 0 ][ "Comments" ];
                            $rec[ "Treatment_User" ]      = $tData[ 0 ][ "Treatment_User" ];
                            $rec[ "Treatment_Date" ]      = $tData[ 0 ][ "Treatment_Date" ];
                            $rec[ "Dose_OriginalValue" ]  = $tData[ 0 ][ "Dose_OriginalValue" ];
                            $rec[ "PAT_ID" ]              = $tData[ 0 ][ "PAT_ID" ];
                            $rec[ "Template_ID" ]         = $tData[ 0 ][ "Template_ID" ];
                            $rec[ "Patient_ID" ]          = $tData[ 0 ][ "Patient_ID" ];
                            $rec[ "DFN" ]                 = $pdfn;
                            $rec[ "Drug_OriginalValue" ]  = $tData[ 0 ][ "Drug_OriginalValue" ];
                            $rec[ "Unit_OriginalValue" ]  = $tData[ 0 ][ "Unit_OriginalValue" ];
                            $rec[ "Route_OriginalValue" ] = $tData[ 0 ][ "Route_OriginalValue" ];
                        }
                    }
                    $rec[ "dose" ]      = $this->numberFormater( $rec[ "dose" ] );
                    $rec[ "drug" ]      = $rec[ "Sequence" ] . ". " . $rec[ "drug" ];
                    $rec[ "typeOrder" ] = 3;
                    if ( $type == "Pre Therapy" ) {
                        $rec[ "typeOrder" ] = 1;
                    } else if ( $type == "Therapy" ) {
                        $rec[ "typeOrder" ] = 2;
                    }
                    $retData[ ] = $rec;
                    // echo json_encode($rec) . "<br>";
                }
            }
            $jsonRecord[ 'success' ] = 'true';
            $jsonRecord[ 'msg' ]     = "";
            $this->set( 'jsonRecord', $retData );
            return;
        }
        
        function grabOrders4AllPatients( ) {
            $jsonRecord       = array( );
            $patientTemplates = $this->Orders->getPatientsWithActiveTemplates();
            
            if ( $this->checkForErrors( 'Get Patient Templates Failed. ', $patientTemplates ) ) {
                $jsonRecord[ 'success' ] = 'false';
                $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                $this->set( 'jsonRecord', $jsonRecord );
                return;
            }
error_log("grabOrders4AllPatients - Patients with Active Templates - " . json_encode($patientTemplates));
            
            /*
             * The following is how to instantiate the PatientController class. Doing this allows access
             * to the functions in the PatientController. The downside is the framework in place expects
             * that every call to a controller function should map to a view. So what you get is the echo
             * in /views/patient/OEM.php rendered on the browser rather than returned to the caller.
             * I guess this is the whole point of using an MVC framework. I don't think controller's should
             * be talking directly to each other. The controller is used to consolidate business logic and
             * send the results back to be displayed.
             *
             * $controller = 'PatientController';
             * $patientController = new $controller('Patient', 'patient', 'OEM');
             * $oemrecords = $patientController->OEM($patient['patientID']);
             *
             */
            
            $controller        = 'PatientController';
            $patientController = new $controller( 'Patient', 'patient', null );
            $patientModel      = new Patient();
            $modOemRecords     = array( );

$el_PatientList = array();
$finalOrdersSorted      = array();
            foreach ( $patientTemplates as $patient ) {
                $PatientID =  $patient[ 'patientID' ];
                $ActiveTemplateID = $patient[ 'templateID' ];
error_log("grabOrders4AllPatients - PatientID = $PatientID; ActiveTemplateID = $ActiveTemplateID");

                $Last_Name = $this->Orders->LookupPatientName( $PatientID );
                if ( !empty( $Last_Name ) && count( $Last_Name ) > 0 ) {
                    $patient[ 'Last_Name' ] = $Last_Name;
                } else {
                    $patient[ 'Last_Name' ] = '';
                }
error_log("grabOrders4AllPatients - " . json_encode($patient));
$el_PatientList[] = $patient;

                $oemrecords = $patientModel->getTopLevelOEMRecordsNextThreeDays( $PatientID, $ActiveTemplateID );
                if ( $this->checkForErrors( 'Get Top Level OEM Data Failed. ', $oemrecords ) ) {
                    $jsonRecord[ 'success' ] = 'false';
                    $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                    $this->set( 'jsonRecord', $jsonRecord );
error_log("Orders Controller - grabOrders4AllPatients() - ERROR RETURN FROM getTopLevelOEMRecordsNextThreeDays -------------------------------");
error_log("PatientID = $PatientID, ActiveTemplateID = $ActiveTemplateID");
error_log($this->get( 'frameworkErr' ));
                    return;
                }
error_log(" ----------------------- grabOrders4AllPatients - getTopLevelOEMRecordsNextThreeDays - -----------------------------------------------------------");
error_log("Get Last Name for Patient - $PatientID = $Last_Name");
error_log("Get TopLevelOEMRecordsNextThreeDays for Patient - $PatientID");
error_log(json_encode($oemrecords));

/******************** NEW CODE ********************************/
$finalOrders            = array();
$finalOrders["Pre"]     = array();
$finalOrders["Post"]    = array();
$finalOrders["Therapy"] = array();


                foreach ( $oemrecords as $oemrecord ) {
                    // Get One Day's Records
                    $TempID = $oemrecord[ 'TemplateID' ];
                    $query = "select Order_Status, Drug_Name, Order_Type, Template_ID, Order_ID, Amt, Unit, Route, flvol, FlowRate, Order_ID, CONVERT(varchar(10), Admin_Date, 101) as adminDate from Order_Status where Template_IDMT = '$TempID'";

$query = "select 
os.Order_Status, 
os.Drug_Name, 
os.Order_Type, 
os.Template_ID, 
os.Order_ID, 
CASE WHEN os.Amt = '' THEN '0' ELSE os.Amt END as Amt,
os.Unit, 
os.Route, 
os.flvol, 
os.FlowRate, 
os.Order_ID, 
CONVERT(varchar(10), os.Admin_Date, 101) as adminDate,
case when tr.Instructions is not null then tr.Instructions else mh.Description end as Instructions,
mhi.Fluid_Type
from Order_Status os 
left outer join MH_Infusion mhi on mhi.Order_ID = os.Order_ID
left outer join Template_Regimen tr on tr.Order_ID = os.Order_ID
left outer join Medication_Hydration mh on mh.Order_ID = os.Order_ID
where os.Template_IDMT = '$TempID'";
                    
error_log("Orders Controller - grabOrders4AllPatients() - Each OEM Record Query = $query");

                    $OrdersData = $this->Orders->query( $query );
                    if ( $this->checkForErrors( 'Get Orders Failed. ', $OrdersData ) ) {
                        $jsonRecord[ 'success' ] = 'false';
                        $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                        $this->set( 'jsonRecord', $jsonRecord );
error_log("Orders Controller - grabOrders4AllPatients() - ERROR RETURN FROM Get Orders -------------------------------");
error_log("PatientID = $PatientID, ActiveTemplateID = $ActiveTemplateID");
error_log($this->get( 'frameworkErr' ));
                        return;
                    }
error_log("Orders Controller - grabOrders4AllPatients() - Each OEM Record Orders Data = " . json_encode($OrdersData));

                    foreach ( $OrdersData as $orderRecord ) {
                        $Type = $orderRecord[ 'Order_Type' ];
                        $fluidVol = $orderRecord[ 'flvol' ];
                        $AnOrder = array();
                        $AnOrder['patientID'] = $PatientID;
                        $AnOrder['Last_Name'] = $Last_Name;
                        $AnOrder['dfn'] = '';
                        $AnOrder['CourseNum'] = '';
                        $AnOrder['templateID'] = $orderRecord[ 'Template_ID' ];
                        $AnOrder['adminDay'] = '';
                        $AnOrder['adminDate'] = $orderRecord[ 'adminDate' ];
                        $AnOrder['drug'] = $orderRecord[ 'Drug_Name' ];
                        $AnOrder['type'] = $Type . ($Type == "Therapy" ? "" : " Therapy");
                        $AnOrder['typeOrder'] = '';
                        $AnOrder['dose'] = $orderRecord[ 'Amt' ];
                        $AnOrder['unit'] = $orderRecord[ 'Unit' ];
                        $AnOrder['route'] = $orderRecord[ 'Route' ];
                        $AnOrder['fluidVol'] = $fluidVol == "0" ? "" : $fluidVol;
                        $AnOrder['fluidType'] = $orderRecord[ 'Fluid_Type' ];
                        $AnOrder['flowRate'] = $orderRecord[ 'FlowRate' ];
                        $AnOrder['instructions'] = $orderRecord[ 'Instructions' ];
                        $AnOrder['Order_ID'] = $orderRecord[ 'Order_ID' ];
                        $AnOrder['orderid']  = $orderRecord[ 'Order_ID' ];
                        $AnOrder['orderstatus'] = $orderRecord[ 'Order_Status' ];

/**************
                        $templateId  = $orderRecord[ 'Template_ID' ];
                        $drug        = $orderRecord[ 'Drug_Name' ];
                        $PID         = $orderRecord[ 'Patient_ID' ];
                        $Order_ID    = $orderRecord[ 'Order_ID' ];
                        $orderStatus = $orderRecord[ 'Order_Status' ];
                        $orderid     = $orderRecord[ 'Order_ID' ];


                        $orderRecord[ 'patientID' ]   = $PatientID;
                        $orderRecord[ 'Last_Name' ]   = $Last_Name;

                        $orderRecord[ 'orderstatus' ] = $orderStatus;
                        $orderRecord[ 'orderid' ]     = $orderid;
                        $orderRecord[ 'dose' ]        = $orderRecord[ 'Amt' ];
                        $orderRecord[ 'unit' ]        = $orderRecord[ 'Unit' ];
******************/
                        // array_push( $finalOrders, $AnOrder );
                        $finalOrders[$Type][] = $AnOrder;
                        $finalOrdersSorted[] = $AnOrder;
error_log("Orders Controller - grabOrders4AllPatients() - Pushing Each Order Record ******* = " . json_encode($AnOrder));
                    }

                }

// $finalOrdersSorted[] = $finalOrders["Pre"];
// $finalOrdersSorted[] = $finalOrders["Therapy"];
// $finalOrdersSorted[] = $finalOrders["Post"];
error_log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
error_log("Orders Controller - grabOrders4AllPatients() - finalOrders PRE -----------------------------------------------------------------");
error_log(json_encode($finalOrders["Pre"]));

error_log("Orders Controller - grabOrders4AllPatients() - finalOrders THERAPY -----------------------------------------------------------------");
error_log(json_encode($finalOrders["Therapy"]));

error_log("Orders Controller - grabOrders4AllPatients() - finalOrders POST -----------------------------------------------------------------");
error_log(json_encode($finalOrders["Post"]));
error_log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");

error_log("Orders Controller - grabOrders4AllPatients() - finalOrdersSorted = " . json_encode($finalOrdersSorted));

error_log(" -------------------------------------+++ NEXT PATIENT +++---------------------------------------");

            }

error_log("Orders Controller - grabOrders4AllPatients() - Patients List = " . json_encode($el_PatientList));
error_log("Orders Controller - grabOrders4AllPatients() - Final Orders List = " . json_encode($finalOrdersSorted));


            $jsonRecord[ 'success' ] = true;
            $jsonRecord[ 'total' ]   = count( $finalOrdersSorted );
            $jsonRecord[ 'records' ] = $finalOrdersSorted;
            $this->set( 'jsonRecord', $jsonRecord );
error_log("Orders Controller - grabOrders4AllPatients() - END -------------------------------------->>>>>>>>>>>>>>>>>>>>>>");
        }
        
        // NOTE: $patientID is the PAT_ID if $Dispensed is true.  -- MWB 2/17/2015
        // The Order Status table contains orders for multiple Templates assigned, hence we need the PAT_ID to define unique Applied Template and patient.
        // Otherwise the "PatientID" is sufficient.
        function grabOrders( $patientID, $AdminDate, $Dispensed = null ) {
            $form_data  = json_decode( file_get_contents( 'php://input' ) );
            $jsonRecord = array( );
            if ( $form_data != NULL ) {
                $this->ProcessOrdersPosting( $form_data );
            } else {
                if ( $patientID && $AdminDate ) {
                    $this->GrabOrders4PatientOnDate( $patientID, $AdminDate, $Dispensed );
                } else {
                    $this->grabOrders4AllPatients();
                }
            }
            // error_log( "Orders.Controller.grabOrders END OF SERVICE CALL!" );
        }
        
        function Orders( $patientID = null, $AdminDate = null ) {
            $this->grabOrders( $patientID, $AdminDate);
        }
        
        function OrdersHold( $TID, $Drug_Name, $Order_Type, $PID ) {
            $this->updateOrderStatusHold( $TID, $Drug_Name, $Order_Type, $PID );
        }
        
        function OrdersCancelled( $TID, $Drug_Name, $Order_Type, $PID ) {
            $this->updateOrderStatusCancelled( $TID, $Drug_Name, $Order_Type, $PID );
        }
        
        
        /**
         * $id = Record ID in specific table
         * $type = Determines which table to update ("Pre", "Post", "Therapy")
         *         Pre uses Medication_Hydration Table and ID maps to 'MH_ID'
         *         Post uses Medication_Hydration Table and ID maps to 'MH_ID'
         *         Therapy uses Template_Regimen Table and ID maps to 'Patient_Regimen_ID'
         * $status = Status to set - "Hold", "Cancel", "Clear"
         **/
        function HoldCancel( $patient_id = null, $template_id = null, $type = null, $status = null ) {
            // error_log("HoldCancel - $template_id, $type, $status");
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            
            if ( "Pre" === $type || "Post" === $type || "Therapy" === $type ) {
                if ( "Hold" === $status || "Cancel" === $status || "Clear" === $status || null === $status ) {
                    if ( null === $status || "Clear" === $status ) {
                        $status = "";
                    }
                    if ( "PUT" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                        $table = "Medication_Hydration";
                        $key   = "MH_ID";
                        if ( "Therapy" == $type ) {
                            $table = "Template_Regimen";
                            $key   = "Patient_Regimen_ID";
                        }
                        
                        $query         = "select * from $table where $key = '$template_id'";
                        // error_log($query);
                        $TreatmentData = $this->Orders->query( $query );
                        // error_log("Treatment Data - " . json_encode($TreatmentData[0]));
                        
                        
                        $lookup     = new LookUp();
                        $Order_Type = $type;
                        $TID        = $TreatmentData[ 0 ][ "Template_ID" ];
                        $Drug_ID    = $TreatmentData[ 0 ][ "Drug_ID" ];
                        $Drug_Name  = $lookup->getLookupNameByIdAndType( $Drug_ID, 2 );
                        $PID        = $patient_id;
                        
                        
                        // error_log("Status = $status");
                        // error_log("Order_Type = $Order_Type");
                        // error_log("TID = $TID");
                        // error_log("Drug_ID = $Drug_ID");
                        // error_log("Drug_Name = $Drug_Name");
                        // error_log("Drug_Name = " . $Drug_Name[0]["Name"]);
                        
                        
                        
                        
                        if ( 0 == count( $TreatmentData ) ) {
                            $jsonRecord[ 'success' ] = 'false';
                            $jsonRecord[ 'msg' ]     = "No Record Matches $id";
                        } else {
                            if ( $this->checkForErrors( 'Set Hold/Cancel Status FAILED ', $TreatmentData ) ) {
                                $jsonRecord[ 'success' ] = 'false';
                                $jsonRecord[ 'msg' ]     = $frameworkErr;
                                $this->set( 'frameworkErr', null );
                            } else {
                                
                                if ( "Hold" === $status ) {
                                    $this->Orders->updateOrderStatusHold( $TID, $Drug_Name, $Order_Type, $PID );
                                } else if ( "Cancel" === $status ) {
                                    $this->Orders->updateOrderStatusCancelled( $TID, $Drug_Name, $Order_Type, $PID );
                                }
                                
                            }
                        }
                    } else {
                        $jsonRecord[ 'success' ] = false;
                        $jsonRecord[ 'msg' ]     = "Invalid COMMAND - " . $_SERVER[ 'REQUEST_METHOD' ] . " expected a PUT";
                    }
                } else {
                    $jsonRecord[ 'success' ] = false;
                    $jsonRecord[ 'msg' ]     = "Invalid COMMAND - $status, expected a Hold/Cancel or Clear";
                }
            } else {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'msg' ]     = "Invalid Therapy Type = $type expected Pre/Post/Therapy";
            }
            $this->set( 'jsonRecord', $jsonRecord );
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        private function analyzeTherapys( $therapyCount, $therapys, $type, $typeOrder, $patient, $oemrecord, $therapyDoseDetailsMap = null ) {
            $modtmpOemRecord = array( );

error_log("Orders Controller; analyzeTherapys() - Type = $type; TypeOrder - $typeOrder; Count = $therapyCount; \n\n" . json_encode($therapys) . " \n\n" . json_encode($oemrecord));


            if ( $therapyCount ) {
                foreach ( $therapys as $therapy ) {
                    if ( 'Therapy' === $type ) {
                        $tmpOemRecord = $this->createTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder );
                        array_push( $modtmpOemRecord, $tmpOemRecord );
                    } else {
                        $preThrapyDetails = $therapyDoseDetailsMap[ $therapy[ 'id' ] ];
                        $detailsCount     = count( $preThrapyDetails );
                        
                        if ( $detailsCount ) {
                            foreach ( $preThrapyDetails as $detail ) {
                                $tmpOemRecord = $this->createPrePostTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder, $detail );
                                array_push( $modtmpOemRecord, $tmpOemRecord );
                            }
                        }
                    }
                }
            }
            return $modtmpOemRecord;
        }
        
        private function createTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder ) {
            if ( !empty( $therapy[ 'bsaDose' ] ) ) {
                list( $bsaDose, $bsaUnit ) = explode( ' ', $therapy[ 'bsaDose' ], 2 );
                $bsaUnit = str_replace( ' ', null, $bsaUnit );
            } else {
                list( $bsaDose, $bsaUnit ) = array(
                     null,
                    null 
                );
            }
            $tmpOemRecord = array( );
            
            $tmpOemRecord[ 'patientID' ]    = $patient[ 'patientID' ];
            $tmpOemRecord[ 'Last_Name' ]    = $patient[ 'Last_Name' ];
            $tmpOemRecord[ 'dfn' ]          = $patient[ 'dfn' ];
            $tmpOemRecord[ 'CourseNum' ]    = $oemrecord[ 'CourseNum' ];
            $tmpOemRecord[ 'templateID' ]   = $patient[ 'templateID' ];
            $tmpOemRecord[ 'adminDay' ]     = $oemrecord[ 'Day' ];
            $tmpOemRecord[ 'adminDate' ]    = $oemrecord[ 'AdminDate' ];
            $tmpOemRecord[ 'drug' ]         = $therapy[ 'drug' ];
            $tmpOemRecord[ 'type' ]         = $type;
            $tmpOemRecord[ 'typeOrder' ]    = $typeOrder;
            $tmpOemRecord[ 'dose' ]         = ( empty( $bsaDose ) ) ? $therapy[ 'regdose' ] : $bsaDose;
            $tmpOemRecord[ 'unit' ]         = ( empty( $bsaUnit ) ) ? $therapy[ 'regdoseunit' ] : $bsaUnit;
            $tmpOemRecord[ 'route' ]        = $therapy[ 'route' ];
            $tmpOemRecord[ 'fluidVol' ]     = $therapy[ 'flvol' ];
            $tmpOemRecord[ 'flowRate' ]     = $therapy[ 'flowRate' ];
            $tmpOemRecord[ 'fluidType' ]    = $therapy[ 'fluidType' ];
            $tmpOemRecord[ 'instructions' ] = $therapy[ 'instructions' ];
            $tmpOemRecord[ 'Order_ID' ]     = $therapy[ 'Order_ID' ];
            
            return $tmpOemRecord;
        }
        
        private function createPrePostTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder, $detail ) {
            $tmpOemRecord = array( );
            
            $tmpOemRecord[ 'patientID' ]    = $patient[ 'patientID' ];
            $tmpOemRecord[ 'Last_Name' ]    = $patient[ 'Last_Name' ];
            $tmpOemRecord[ 'dfn' ]          = $patient[ 'dfn' ];
            $tmpOemRecord[ 'CourseNum' ]    = $oemrecord[ 'CourseNum' ];
            $tmpOemRecord[ 'templateID' ]   = $patient[ 'templateID' ];
            $tmpOemRecord[ 'adminDay' ]     = $oemrecord[ 'Day' ];
            $tmpOemRecord[ 'adminDate' ]    = $oemrecord[ 'AdminDate' ];
            $tmpOemRecord[ 'drug' ]         = $therapy[ 'drug' ];
            $tmpOemRecord[ 'type' ]         = $type;
            $tmpOemRecord[ 'typeOrder' ]    = $typeOrder;
            $tmpOemRecord[ 'dose' ]         = $detail[ 'amt' ];
            $tmpOemRecord[ 'unit' ]         = $detail[ 'unit' ];
            $tmpOemRecord[ 'route' ]        = $detail[ 'type' ];
            $tmpOemRecord[ 'fluidVol' ]     = $detail[ 'fluidVol' ];
            $tmpOemRecord[ 'fluidType' ]    = $detail[ 'fluidType' ];
            $tmpOemRecord[ 'flowRate' ]     = $detail[ 'flowRate' ];
            $tmpOemRecord[ 'instructions' ] = $therapy[ 'description' ];
            $tmpOemRecord[ 'Order_ID' ]     = $therapy[ 'Order_ID' ];
            
            return $tmpOemRecord;
        }
        
        private function createBlankRow( $patient, $oemrecord, $type, $typeOrder ) {
            
            $tmpOemRecord = array( );
            
            $tmpOemRecord[ 'patientID' ]    = $patient[ 'patientID' ];
            $tmpOemRecord[ 'Last_Name' ]    = $patient[ 'Last_Name' ];
            $tmpOemRecord[ 'dfn' ]          = $patient[ 'dfn' ];
            $tmpOemRecord[ 'CourseNum' ]    = $oemrecord[ 'CourseNum' ];
            $tmpOemRecord[ 'templateID' ]   = $patient[ 'templateID' ];
            $tmpOemRecord[ 'adminDay' ]     = $oemrecord[ 'Day' ];
            $tmpOemRecord[ 'adminDate' ]    = $oemrecord[ 'AdminDate' ];
            $tmpOemRecord[ 'drug' ]         = '';
            $tmpOemRecord[ 'type' ]         = $type;
            $tmpOemRecord[ 'typeOrder' ]    = $typeOrder;
            $tmpOemRecord[ 'dose' ]         = '';
            $tmpOemRecord[ 'unit' ]         = '';
            $tmpOemRecord[ 'route' ]        = '';
            $tmpOemRecord[ 'fluidVol' ]     = '';
            $tmpOemRecord[ 'fluidType' ]    = '';
            $tmpOemRecord[ 'flowRate' ]     = '';
            $tmpOemRecord[ 'instructions' ] = '';
            $tmpOemRecord[ 'Order_ID' ]     = $oemrecord[ 'Order_ID' ];
            
            return $tmpOemRecord;
        }
        
        function Drugs( ) {
            
            $jsonRecord = array( );
            
            $records = $this->Orders->getDrugs();
            
            if ( $this->checkForErrors( 'Get Drugs Failed. ', $records ) ) {
                $jsonRecord[ 'success' ] = 'false';
                $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                $this->set( 'jsonRecord', $jsonRecord );
                return;
            }
            
            $jsonRecord[ 'success' ] = true;
            $jsonRecord[ 'total' ]   = count( $records );
            
            $jsonRecord[ 'records' ] = $records;
            
            $this->set( 'jsonRecord', $jsonRecord );
        }
        
        
        
        /**
         * Return the Order Status for a specified Order_ID
         * Use Simple Rest Client to test/demo
         * - https://mwb.dbitpro.com/Orders/OrderStatus/2567257F-D35D-E311-A204-000C2935B86F
         * Only responds to GET, other commands return errors
         **/
        function OrderStatus( $order_id = null ) {
            // error_log("OrderStatus - $order_id");
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            if ( "GET" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                $table  = "Order_Status";
                $query  = "select Order_Status from $table where Order_ID = '$order_id'";
                $retVal = $this->Orders->query( $query );
                // error_log( $query);
                // error_log( json_encode($retVal));
                if ( 0 == count( $retVal ) ) {
                    $jsonRecord[ 'success' ] = false;
                    $jsonRecord[ 'msg' ]     = "No Record Matches $id";
                } else {
                    if ( $this->checkForErrors( 'Get Order Status FAILED ', $retVal ) ) {
                        $jsonRecord[ 'success' ] = false;
                        $jsonRecord[ 'msg' ]     = $frameworkErr;
                        $this->set( 'frameworkErr', null );
                    } else {
                        $jsonRecord[ 'total' ]   = count( $retVal );
                        $jsonRecord[ 'records' ] = $retVal;
                    }
                }
            } else {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'msg' ]     = "Invalid COMMAND - " . $_SERVER[ 'REQUEST_METHOD' ] . " expected a GET";
            }
            $this->set( 'jsonRecord', $jsonRecord );
        }
        
        
        function getPAT_ID( $PatientID, $TemplateID ) {
            $query  = "select PAT_ID from Patient_Assigned_Templates where Patient_ID = '$PatientID' and Template_ID = '$TemplateID' and Is_Active=1";
            $retVal = $this->Orders->query( $query );
            return $retVal[ 0 ][ "PAT_ID" ];
        }
        
        function Dispensed( $patientID = null, $AdminDate = null ) {
            $this->grabOrders( $patientID, $AdminDate, true );
        }
    }
    
?>
