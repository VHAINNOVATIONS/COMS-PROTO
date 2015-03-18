<?php
    
    class OrdersController extends Controller
    {
        
        function checkForErrors( $errorMsg, $retVal )
        {
            
            if ( null != $retVal && array_key_exists( 'error', $retVal ) ) {
                
                if ( DB_TYPE == 'sqlsrv' ) {
                    foreach ( $retVal[ 'error' ] as $error ) {
                        $errorMsg .= "SQLSTATE: " . $error[ 'SQLSTATE' ] . " code: " . $error[ 'code' ] . " message: " . $error[ 'message' ];
                    }
                } else if ( DB_TYPE == 'mysql' ) {
                    $errorMsg .= $retVal[ 'error' ];
                }
                
                $this->set( 'frameworkErr', $errorMsg );
                
                return true;
            }
            
            return false;
        }
        
        
        
        
        function getMostRecentVitals( $PatientID )
        {
            $controller        = 'PatientController';
            $patientController = new $controller( 'Patient', 'patient', null );
            $patientModel      = new Patient();
            $records           = $patientModel->getMeasurements_v1( $PatientID, null );
            $mrHeight          = 0;
            $mrWeight          = 0;
            $ret               = array( );
            $ret[ "Age" ]      = $records[ 0 ][ "Age" ];
            $ret[ "Gender" ]   = $records[ 0 ][ "Gender" ];
            // error_log("Patient Vitals - " . json_encode($records));
            foreach ( $records as $aVital ) {
                $h = $aVital[ "Height" ];
                $w = $aVital[ "Weight" ];
                if ( "" !== $h && 0 == $mrHeight ) {
                    $mrHeight = $h;
                }
                if ( "" !== $w && 0 == $mrWeight ) {
                    $mrWeight = $w;
                }
                if ( $mrWeight !== 0 && $mrHeight !== 0 ) {
                    $ret[ "Height" ] = $mrHeight;
                    $ret[ "Weight" ] = $mrWeight;
                    return $ret;
                }
            }
            $ret[ "Height" ] = $mrHeight;
            $ret[ "Weight" ] = $mrWeight;
            return $ret;
        }
        
        
        function getAmputationPct( $PatientID )
        {
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
        
        function FinalizeMedicationDosing( $form_data )
        {
            error_log( "OrdersModel.grabOrders - Order Cleared" );
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
                
                error_log( "BSA Formula - $w; $b" );
                
                $mrHW = $this->getMostRecentVitals( $PIDF );
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
                    $Patient[ "Age" ]             = $mrHW[ "Age" ];
                    $Patient[ "Gender" ]          = $mrHW[ "Gender" ];
                    $Patient[ "Weight" ]          = $mrHW[ "Weight" ];
                    $Patient[ "SerumCreatinine" ] = 1;
                    $CalculatedDose               = $BSACalcs->CalcAUCDose( $Patient, $DoseF );
                    error_log( "CalculatedDose for $UnitF = $CalculatedDose" );
                    $form_data->{'dose'} = $CalculatedDose;
                    $form_data->{'unit'} = "mg";
                } else if ( "mg/kg" == $UnitF || "units / kg" == $UnitF ) {
                    $CalculatedDose = $DoseF * $WeightInKG;
                    error_log( "CalculatedDose for $UnitF = $CalculatedDose" );
                    $form_data->{'dose'} = $CalculatedDose;
                    if ( "mg/kg" == $UnitF ) {
                        $form_data->{'unit'} = "mg";
                    } else {
                        $form_data->{'unit'} = "units";
                    }
                } else {
                    $CalculatedDose = $DoseF * $BSA;
                    error_log( "CalculatedDose for $UnitF = $CalculatedDose" );
                    $form_data->{'dose'} = $CalculatedDose;
                    if ( "mg/m2" == $UnitF ) {
                        $form_data->{'unit'} = "mg";
                    } else {
                        $form_data->{'unit'} = "units";
                    }
                }
                $form_data->{'orderstatus'} = "ClearedUpdate";
            }
            return $form_data;
        }
        
        
        
        
        
        // NOTE: $patientID is the PAT_ID if $Dispensed is true.  -- MWB 2/17/2015
        // The Order Status table contains orders for multiple Templates assigned, hence we need the PAT_ID to define unique Applied Template and patient.
        // Otherwise the "PatientID" is sufficient.
        function grabOrders( $patientID, $AdminDate, $Dispensed = null )
        {
            error_log( "OrdersController.grabOrders.ENTRY POINT - patientID = $patientID, AdminDate = $AdminDate, Dispensed = $Dispensed" );
            /* for a POST to update an order the form has the patientID and the orderid */
            
            $form_data  = json_decode( file_get_contents( 'php://input' ) );
            $jsonRecord = array( );
            
            if ( $form_data != NULL ) {
                $this->Orders->beginTransaction();
                error_log( "OrdersController.grabOrders.HasFormData - " );
                error_log( json_encode( $form_data ) );
                
                $OrderStatusF = $form_data->{'orderstatus'};
                $PIDF         = $form_data->{'patientID'};
                $DFN          = $form_data->{'dfn'};
                if ( "Cleared" == $OrderStatusF ) {
                    $form_data = $this->FinalizeMedicationDosing( $form_data );
                }







                else if ( "Finalized" == $OrderStatusF ) {
                    $drugName = $form_data->{'drug'};
            $controller        = 'LookupController';
            $lookupController  = new $controller( 'Lookup', 'lookup', null );
            $DrugInfo          = $lookupController->getDrugInfoFromVistA( $drugName );
error_log("grabOrders function has DrugInfo from Lookup");
error_log(json_encode($DrugInfo));



$dayOfWeek = date("w", strtotime($form_data->{'adminDay'}));
$AdminDays = array();
$AdminDays[] = $dayOfWeek;

$theMed = $DrugInfo->{"Medication"};
$theMedID = $theMed->{"ien"};
$theRoutes = $DrugInfo->{"Route"};

$RouteInfo = explode(" : ", $form_data->{'route'});
$RouteInfoID = $RouteInfo[1];

$VistA_Route = array();
$VistA_Route["ien"] = $RouteInfoID;
foreach ($theRoutes as $route) {
error_log("Walking Routes - $RouteInfoID - " . json_encode($route));
    $theRouteID = $route->{"ien"};
    if ($theRouteID === $RouteInfoID) {
        $VistA_Route["code"] = $route->{"code"};
    }
    else {
error_log("Walking Routes - $RouteInfoID - Not Found");
    }
}
error_log("Walking Routes - FINISHED");



error_log("Finalizing an Order - ");
error_log(json_encode($form_data));
/****
{
    "patientID": "8D196340-1092-421A-A5A1-30168FC86FA1",
    "templateID": "95026BC2-7F09-4F9A-902E-4F916BB686D9",
    "adminDay": "",
    "CourseNum": "",
    "adminDate": "",
    "drug": "CARBOPLATIN INJ   ",
    "type": "Therapy",
    "dose": "10", - $form_data->{'dose'} . " " . $form_data->{'unit'};
    "unit": "ml",
    "route": "INTRAMUSCULAR : 15",
    "fluidVol": "",
    "fluidType": "",
    "flowRate": "",
    "instructions": "",
    "orderstatus": "Finalized",
    "ActualOrderStatus": "",
    "orderid": "7BE2CF5B-2095-4FD1-8D16-FC51EDF1A1DF",
    "Last_Name": "FIVEHUNDREDTWO PATIENT",
    "id": null
}
 ****/
error_log(json_encode($_SESSION));
/****
{
    "chkTrack": 1,
    "sessionid": "9f9gau88cgf9pktqhd0h9ll3m0",
    "pgct": 5179,
    "winauth": "",
    "ruser": "",
    "ip_vistor": "199.179.23.116",
    "compname": "dbiterm.dbitpro.com",
    "page": "index.php",
    "url": "https://coms-mwb.dbitpro.com/Orders/Orders?_dc=1426086332728",
    "AccessCode": "CPRS1234",
    "VerifyCode": "CPRS4321$",
    "sessionStatus": 0,
    "COMSLogin": 1,
    "NWLoginR": 1,
    "role": "All Roles",
    "dname": "Programmer",
    "rid": "0",
    "Email": "programmer@dbitmail.com",
    "TemplateAuthoring": "1",
    "Role_ID": "4CD32B11-91CC-E311-BAF8-001D09D7525D",
    "AC": "CPRS1234",
    "VC": "CPRS4321$",
    "NWLogin": 355,
    "sitelist": "169",
    "domain": "localhost",
    "mdws": "54.243.40.32",
    "vista": "54.83.44.110",
    "sshusr": "vista",
    "sshpwd": "vistagold",
    "sshusr2": "CacheMgr",
    "COMSchk": 1,
    "MDWS_Status": "Crashed",
    "MDWS_Type": "Connect",
    "MDWS_Msg": "Site not in site table",
    "MDWS_Suggestion": "",
    "USE_NODE": true,
    "UserDUZ": "1"
}
 ****/
//            $drugName = rawurlencode(trim($drugName));
//            $drugURL  = "medication/name/$drugName";
//            $MedID    = $nodevista->get( $drugURL );
//            $nodevista               = new NodeVista();

            // getDrugInfoFromVistA($drugName)
$VistA_Order = array();
$VistA_Order["dfn"] = "$DFN";
$VistA_Order["provider"] = $_SESSION["UserDUZ"];
$VistA_Order["clinic"] = $_SESSION["sitelist"];
$VistA_Order["type"] = "inpatient";
$VistA_Order["drug"] = $theMedID;
$VistA_Order["dosage"] = $form_data->{'dose'} . " " . $form_data->{'unit'};
$VistA_Order["route"] = $VistA_Route;
$VistA_Order["administration_days"] = $AdminDays;

error_log("===========================================================");
error_log("Have Order Data = ");
error_log(json_encode($VistA_Order));

//            $drugURL  = "medication/name/$drugName";
//            $MedID    = $nodevista->get( $drugURL );

            $nodevista   = new NodeVista();
            $orderURL    = "order/new";
            $OrderReturn = $nodevista->post( $orderURL, json_encode($VistA_Order) );

error_log("Order Sent - ");
error_log(json_encode($OrderReturn));


error_log("===========================================================");

/*********

URL: http://dbittest.dbitpro.com:3000/v1/order/new

POST Data:
{
            "dfn": "100025”, // patient id
            "provider": "1”, // provider id
            "clinic": "11”, // clinic id
            "type": "inpatient”, // use only in patient for right now
            "drug": "1527”, // drug IEN
            "dosage" : "200MG/5ML”, // arbitrary dosage string
            "route" : {
              "ien": "270”, // route IEN from /order/info call
              "code": “IVP” // route code from /order/info call
            },
    "administration_time" : "1350”, // 24 hour representation of time, 1350 - 1:50 p.m., when the drug should be administered on the day
    "administration_days" : [ 0, 1 , 2 ,3 ] // the day the drug should be administered , 0 - Sunday, 1 - Monday, 2 - Tues, etc... all the way to 6 - Sat
}
 ****************/
                }

                error_log( "OrdersController.grabOrders.HasFormData - POST FINALIZEATION!" );
                error_log( json_encode( $form_data ) );
                
                $returnVal = null;
                $returnVal = $this->Orders->updateOrderStatus( $form_data );
                
                if ( $this->checkForErrors( 'Update Order Status Values Failed. ', $returnVal ) ) {
                    error_log( "orders 1 - " . json_encode( $returnVal ) );
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
                
            } else {
                if ( $patientID && $AdminDate ) {
                    error_log( "OrdersController.grabOrders - Have PatientID and Date - " );
                    
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
      ,os.Route as route
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
      ,os.Route as route
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
      where os.PAT_ID = '$patientID' and os.Admin_Date='$AdminDate'";
                        
                    }
                    error_log( "Orders - $query" );
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
      ,Route
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
                error_log( "OrdersController.grabOrders - Do NOT Have PatientID and Date - " );
                
                
                $finalOrders      = array( );
                $patientTemplates = $this->Orders->getPatientsWithActiveTemplates();
                
                if ( $this->checkForErrors( 'Get Patient Templates Failed. ', $patientTemplates ) ) {
                    $jsonRecord[ 'success' ] = 'false';
                    $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                    $this->set( 'jsonRecord', $jsonRecord );
                    return;
                }
                
                
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
                
                
                foreach ( $patientTemplates as $patient ) {
                    $oemrecords = $patientModel->getTopLevelOEMRecordsNextThreeDays( $patient[ 'patientID' ], $patient[ 'templateID' ] );
                    error_log( "Orders.Controller.grabOrders - OEM Records for a given Patient (" . $patient[ 'patientID' ] . ") and Template (" . $patient[ 'templateID' ] . ")" );
                    error_log( json_encode( $oemrecords ) );
                    
                    
                    if ( $this->checkForErrors( 'Get Top Level OEM Data Failed. ', $oemrecords ) ) {
                        $jsonRecord[ 'success' ] = 'false';
                        $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                        $this->set( 'jsonRecord', $jsonRecord );
                        return;
                    }
                    
                    $Last_Name = $this->Orders->LookupPatientName( $patient[ 'patientID' ] );
                    if ( !empty( $Last_Name ) && count( $Last_Name ) > 0 ) {
                        $patient[ 'Last_Name' ] = $Last_Name;
                    } else {
                        $patient[ 'Last_Name' ] = '';
                    }
                    
                    foreach ( $oemrecords as $oemrecord ) {
                        
                        /*
                         * I am accessing functions within the patientcontroller that are helper functions.
                         * We really should move these shared functions out of this controller. Maybe 
                         * a shared controller. Or a library class with the shared functions.
                         *  
                         */
                        $retVal = $patientController->Hydrations( 'pre', $oemrecord[ 'TemplateID' ] );
                        
                        if ( $this->checkForErrors( 'Get Pre Therapy Failed. ', $retVal ) ) {
                            $jsonRecord[ 'success' ] = 'false';
                            $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                            $this->set( 'jsonRecord', $jsonRecord );
                            return;
                        }
                        
                        $preTherapys              = $patientController->get( 'prehydrations' );
                        $preTherapyDoseDetailsMap = $patientController->get( 'preorigInfusions' );
                        
                        $preTherapyCount = count( $preTherapys );
                        $type            = 'Pre Therapy';
                        $typeOrder       = 1;
                        //var_dump($preTherapys);
                        
                        $tmpOemRecord = $this->analyzeTherapys( $preTherapyCount, $preTherapys, $type, $typeOrder, $patient, $oemrecord, $preTherapyDoseDetailsMap );
                        
                        $modOemRecords = array_merge( $modOemRecords, $tmpOemRecord );
                        
                        $retVal = $patientController->Hydrations( 'post', $oemrecord[ 'TemplateID' ] );
                        
                        if ( $this->checkForErrors( 'Get Post Therapy Failed. ', $retVal ) ) {
                            $jsonRecord[ 'success' ] = 'false';
                            $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                            $this->set( 'jsonRecord', $jsonRecord );
                            return;
                        }
                        
                        $postTherapys              = $patientController->get( 'posthydrations' );
                        $postTherapyDoseDetailsMap = $patientController->get( 'postorigInfusions' );
                        $postTherapyCount          = count( $postTherapys );
                        $type                      = 'Post Therapy';
                        $typeOrder                 = 3;
                        
                        $tmpOemRecord  = $this->analyzeTherapys( $postTherapyCount, $postTherapys, $type, $typeOrder, $patient, $oemrecord, $postTherapyDoseDetailsMap );
                        $modOemRecords = array_merge( $modOemRecords, $tmpOemRecord );
                        
                        $retVal = $patientController->Regimens( $oemrecord[ 'TemplateID' ] );
                        
                        if ( $this->checkForErrors( 'Get Therapy Failed. ', $retVal ) ) {
                            $jsonRecord[ 'success' ] = 'false';
                            $jsonRecord[ 'msg' ]     = $this->get( 'frameworkErr' );
                            $this->set( 'jsonRecord', $jsonRecord );
                            return;
                        }
                        
                        $regimens     = $patientController->get( 'regimens' );
                        $regimenCount = count( $regimens );
                        $type         = 'Therapy';
                        $typeOrder    = 2;
                        
                        $tmpOemRecord = $this->analyzeTherapys( $regimenCount, $regimens, $type, $typeOrder, $patient, $oemrecord );
                        
                        $modOemRecords = array_merge( $modOemRecords, $tmpOemRecord );
                        $finalOrders = array( ); // This should not be redefined here - it is throwing out the work of the previous iteration
                        foreach ( $modOemRecords as $orderRecord ) {
                            $templateId = $orderRecord[ 'templateID' ];
                            $drug       = $orderRecord[ 'drug' ];
                            $PID        = $patient[ 'patientID' ];
                            $Order_ID   = $orderRecord[ 'Order_ID' ];
                            $orderStatus = $this->Orders->getOrderStatus( $Order_ID );
                            $orderid     = $this->Orders->getOrderStatus( $Order_ID );
                            if ( !empty( $orderStatus ) && count( $orderStatus ) > 0 ) {
                                $orderRecord[ 'orderstatus' ] = $orderStatus[ 0 ][ 'orderStatus' ];
                                $orderRecord[ 'orderid' ]     = $orderid[ 0 ][ 'orderid' ];
                                $orderRecord[ 'dose' ]        = $orderid[ 0 ][ 'dose' ]; // grabbing dose/unit from order status since they might have been updated in the finalization process - MWB
                                $orderRecord[ 'unit' ]        = $orderid[ 0 ][ 'unit' ];
                            } else {
                                $orderRecord[ 'orderstatus' ] = 'Not Set';
                                $orderRecord[ 'orderid' ]     = '';
                            }
                            array_push( $finalOrders, $orderRecord );
                            
                        }
                    }
                }
                
                $jsonRecord[ 'success' ] = true;
                $jsonRecord[ 'total' ]   = count( $finalOrders );
                $jsonRecord[ 'records' ] = $finalOrders;
                $this->set( 'jsonRecord', $jsonRecord );
            }
error_log( "Orders.Controller.grabOrders END OF SERVICE CALL!" );
        }

















        function Orders( $patientID = null, $AdminDate = null )
        {
            $this->grabOrders( $patientID, $AdminDate );
        }
        
        function OrdersHold( $TID, $Drug_Name, $Order_Type, $PID )
        {
            $this->updateOrderStatusHold( $TID, $Drug_Name, $Order_Type, $PID );
        }
        
        function OrdersCancelled( $TID, $Drug_Name, $Order_Type, $PID )
        {
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
        function HoldCancel( $patient_id = null, $template_id = null, $type = null, $status = null )
        {
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        private function analyzeTherapys( $therapyCount, $therapys, $type, $typeOrder, $patient, $oemrecord, $therapyDoseDetailsMap = null )
        {
            
            $modtmpOemRecord = array( );
            
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
        
        private function createTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder )
        {
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
        
        private function createPrePostTherapyRow( $patient, $oemrecord, $therapy, $type, $typeOrder, $detail )
        {
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
        
        private function createBlankRow( $patient, $oemrecord, $type, $typeOrder )
        {
            
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
        
        function Drugs( )
        {
            
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
        function OrderStatus( $order_id = null )
        {
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
        
        
        function getPAT_ID( $PatientID, $TemplateID )
        {
            $query  = "select PAT_ID from Patient_Assigned_Templates where Patient_ID = '$PatientID' and Template_ID = '$TemplateID' and Is_Active=1";
            $retVal = $this->Orders->query( $query );
            return $retVal[ 0 ][ "PAT_ID" ];
        }
        
        function Dispensed( $patientID = null, $AdminDate = null )
        {
            $this->grabOrders( $patientID, $AdminDate, true );
        }
    }
    
?>
