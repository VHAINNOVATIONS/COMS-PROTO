<?php

/**
 * Flowsheet controller
 *
 * Makes use of Table: - Flowsheet_ProviderNotes
 * Table design modified - MWB - 7/7/2014, Added ToxicityLU_ID
use COMS_TEST_2
CREATE TABLE [dbo].[Flowsheet_ProviderNotes ](
    [FS_ID] [uniqueidentifier] DEFAULT (newsequentialid()),
    [Weight] [nvarchar](max) NULL,
    [Disease_Response] [nvarchar](max) NULL,
    [ToxicityLU_ID] [uniqueidentifier] NULL,
    [Toxicity] [nvarchar](max) NULL,
    [Other] [nvarchar](max) NULL,
    [PAT_ID] [uniqueidentifier] NULL,
    [Cycle] [nvarchar](max) NULL,
    [Day] [nvarchar](max) NULL,
    [AdminDate] [nvarchar](max) NULL
) ON [PRIMARY]

 */
class FlowsheetController extends Controller
{

    /**
     * Checks whether the given result set contains errors
     *
     * @param string $errorMsg
     * @param array $retVal
     * @return boolean
     * @todo Move this highly duplicated function into the parent Controller class
     */
    private function _checkForErrors($errorMsg, $retVal)
    {
        if (!empty($retVal['error'])) {

            if (DB_TYPE == 'sqlsrv' && is_array($retVal['error'])) {
                foreach ($retVal['error'] as $error) {
                    $errorMsg .= "SQLSTATE: " . $error['SQLSTATE'] . " code: " . $error['code'] . " message: " .
                         $error['message'];
                }
            } else if (DB_TYPE == 'mysql') {
                $errorMsg .= $retVal['error'];
            }

            $this->set('frameworkErr', $errorMsg);

            return true;
        }

        return false;
    }



    function getGeneralInfo($PAT_ID) {
        if ($PAT_ID) {       /* Get Specific Info */
            $query = "select
                pn.FS_ID, 
                pn.Disease_Response, 
                pn.ToxicityLU_ID, 
                pn.Other, 
                pn.Cycle, 
                pn.Day, 
                pn.Toxicity, 
                case when pn.ToxicityLU_ID is not null then sci.Details else '' end as ToxicityDetails,
                case when pn.ToxicityLU_ID is not null then sci.Label else '' end as ToxicityInstr,
                CONVERT(VARCHAR(10), pn.AdminDate, 101) as AdminDate
                from Flowsheet_ProviderNotes pn 
                left join SiteCommonInformation sci on sci.ID = pn.ToxicityLU_ID
                WHERE pn.PAT_ID = '$PAT_ID' 
                order by AdminDate desc";
        }
        else {       /* Get ALL Info */
            $query = "select * from $TableName";
        }
        return $this->Flowsheet->query($query);
    }


    public function Optional($PAT_ID = null) {
        /*************
        [FS_ID]
       ,[Weight]
       ,[Disease_Response]
       ,[ToxicityLU_ID]
       ,[Toxicity]
       ,[Other]
       ,[PAT_ID]
       ,[Cycle]
       ,[Day]
       ,[AdminDate]


       POST/PUT Example using Advanced REST Client in Chrome
       URL - http://coms-mwb.dbitpro.com:355/Flowsheet/Optional
       Header - Select application/x-www-form-urlencoded
       Data - ToxInstr=C8DD3E0F-07F3-E311-AC08-000C2935B86F&Data=Tox_Data&DiseaseResponse=DR_Data&OtherData=Other_Data&Cycle=1&Day=1
       This will use the $_POST var to store the data
         *************/

        $Msg = "Flowsheet Optional Information";
        $TableName = "Flowsheet_ProviderNotes";
        $GUID =  $this->Flowsheet->newGUID();

        $retVal = array();
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $ErrMsg = "";
        if (null == $PAT_ID || "PAT_ID" == $PAT_ID) {
            $PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F";
        }
        $AdminDate = date("m/d/Y");



        // Retrieve Data if Request is a PUT
        parse_str(file_get_contents("php://input"),$requestData);
        if (! empty($requestData)) {
            error_log("Optional Data - via INPUT - " . $this->varDumpToString($requestData));
        }
        else if (!empty($_POST)) {
            // Retrieve Data if Request is a POST
            error_log("No INPUT Data Received, Checking POST");
            error_log("Optional Data - via POST - " . $this->varDumpToString($_POST));  // This works...
            $requestData = $_POST;
        }

        if (!empty($requestData)) {
            $Cycle = $requestData["Cycle"];
            $Day = $requestData["Day"];
            //$ToxInstrID = $requestData["ToxInstr"];
            //$ToxData = $this->escapeString($requestData["Data"]);
            $DiseaseResponse = $this->escapeString($requestData["DRData"]);
            $FS_OtherData = $this->escapeString($requestData["OtherData"]);
        }

        $this->Flowsheet->beginTransaction();
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            $records = $this->getGeneralInfo($PAT_ID);

            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            if ("" !== $DiseaseResponse || "" !== $FS_OtherData) {
                $query = "INSERT INTO $TableName
                   (FS_ID, Disease_Response, Other, PAT_ID, Cycle, Day, AdminDate)
                   VALUES
                   ( '$GUID', '$DiseaseResponse', '$FS_OtherData', '$PAT_ID', '$Cycle', '$Day', '$AdminDate')";
                /**
            if ("" !== $ToxInstrID || "" !== $DiseaseResponse || "" !== $FS_OtherData || "" !== $ToxData) {
                if ("" == $ToxInstrID) {
                    $query = "INSERT INTO $TableName
                       (FS_ID, Disease_Response, ToxicityLU_ID, Toxicity, Other, PAT_ID, Cycle, Day, AdminDate)
                       VALUES
                       ( '$GUID', '$DiseaseResponse', null, '$ToxData', '$FS_OtherData', '$PAT_ID', '$Cycle', '$Day', '$AdminDate')";
                }
                else {
                    $query = "INSERT INTO $TableName
                       (FS_ID, Disease_Response, ToxicityLU_ID, Toxicity, Other, PAT_ID, Cycle, Day, AdminDate)
                       VALUES
                       ( '$GUID', '$DiseaseResponse', '$ToxInstrID', '$ToxData', '$FS_OtherData', '$PAT_ID', '$Cycle', '$Day', '$AdminDate')";
                }
                **/

                $jsonRecord['msg'] = "$Msg Record Created";
                $ErrMsg = "Creating $Msg Record";
                $records = $this->Flowsheet->query($query);
            }
        }
        else if ("PUT" == $_SERVER['REQUEST_METHOD']) {
            error_log("PUT Request - NYA");
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            error_log("DELETE Request - NYA");
        }


        if ($this->_checkForErrors('Flowsheet Failed. ', $records)) {
            $this->Flowsheet->rollbackTransaction();
            $this->set('jsonRecord', 
                array(
                    'success' => false,
                    'msg' => $this->get('frameworkErr') . $records['error']
                ));
            return;
        }

        $this->Flowsheet->endTransaction();
        $this->set('jsonRecord', 
            array(
                'success' => true,
                'total' => count($records),
                'records' => $records
            )
        );
    }




    public function Optional2($PAT_ID = null) {
        $Msg = "Flowsheet Optional Information";
        $TableName = "Flowsheet_ProviderNotes";

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $ErrMsg = "";

    }




    /**
     * 
     * @param String $id
     * @return null
     */
    public function FS($id = null) {
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $retVal = array();
        $this->set('jsonRecord', array('success' => true, 'total' => count($retVal), 'records' => $retVal));
    }




    function FS2( $Patient_ID = null, $PAT_ID = null ) {
        $jsonRecord              = array( );
        $jsonRecord[ 'success' ] = true;
        $retVal                  = array( );

        $Template_ID = $this->Flowsheet->getTemplateID( $PAT_ID );

        $administeredRecords = $this->getAdministeredRecords( $PAT_ID );
        $HoldCancelRecords = $this->getHoldCancelRecords( $PAT_ID );

        if ( empty( $administeredRecords ) && empty( $HoldCancelRecords )) {
            $administeredRecords[ 'error' ] = 'No Records Found';
        }

        if ( $this->_checkForErrors( 'Get Flowsheet Failed. ', $administeredRecords ) ) {
            $this->set( 'jsonRecord', array(
                 'success' => false,
                'msg' => $this->get( 'frameworkErr' ) . $administeredRecords[ 'error' ] 
            ) );
            return;
        }

        if ( $this->_checkForErrors( 'Get Flowsheet Failed. ', $HoldCancelRecords ) ) {
            $this->set( 'jsonRecord', array(
                 'success' => false,
                'msg' => $this->get( 'frameworkErr' ) . $HoldCancelRecords[ 'error' ] 
            ) );
            return;
        }

        $PreAdminRecords     = array( );
        $TherapyAdminRecords = array( );
        $PostAdminRecords    = array( );
        $TKeys               = array( );

        foreach ( $administeredRecords as $aRec ) {
            if ( array_key_exists( "Order_Type", $aRec ) ) {
                $Type    = $aRec[ "Order_Type" ];
                $aDate   = $aRec[ "Admin_Date" ];
                $MedName = $aRec[ "Drug_Name" ];

                $Key     = "$aDate-$MedName";
                $tmpRec  = array(
                     "Status" => $aRec[ "Order_Status" ],
                    "Dose" => $aRec[ "Dose" ],
                    "Unit" => $aRec[ "Unit" ],
                    "Route" => $aRec[ "Route" ],
                    "Start" => $aRec[ "StartTime" ],
                    "End" => $aRec[ "EndTime" ] 
                );
                $tmpARec = array(
                     $Key => $tmpRec 
                );

                if ( "Pre" == $Type ) {
                    if ( !array_key_exists( $Key, $PreAdminRecords ) ) {
                        $PreAdminRecords += $tmpARec;
                    }
                } else if ( "Post" == $Type ) {
                    if ( !array_key_exists( $Key, $PostAdminRecords ) ) {
                        $PostAdminRecords += $tmpARec;
                    }
                } else if ( "Therapy" == $Type ) {
                    $TKeys[ ] = $Key;
                    if ( !array_key_exists( $Key, $TherapyAdminRecords ) ) {
                        $TherapyAdminRecords += $tmpARec;
                    }
                }
            }
        }

        foreach ( $HoldCancelRecords as $aRec ) {
            if ( array_key_exists( "Order_Type", $aRec ) ) {
                $Type    = $aRec[ "Order_Type" ];
                $aDate   = $aRec[ "Admin_Date" ];
                $MedName = $aRec[ "Drug_Name" ];

                $Key     = "$aDate-$MedName";
                $tmpRec  = array("Status" => $aRec[ "Order_Status" ]);
                $tmpARec = array( $Key => $tmpRec );

                if ( "Pre" == $Type ) {
                    if ( !array_key_exists( $Key, $PreAdminRecords ) ) {
                        $PreAdminRecords += $tmpARec;
                    }
                } else if ( "Post" == $Type ) {
                    if ( !array_key_exists( $Key, $PostAdminRecords ) ) {
                        $PostAdminRecords += $tmpARec;
                    }
                } else if ( "Therapy" == $Type ) {
                    $TKeys[ ] = $Key;
                    if ( !array_key_exists( $Key, $TherapyAdminRecords ) ) {
                        $TherapyAdminRecords += $tmpARec;
                    }
                }
            }
        }

        $this->FSDataConvert2( $Patient_ID, $PAT_ID, $PreAdminRecords, $TherapyAdminRecords, $PostAdminRecords );
    }

    function getAdministeredRecords( $PAT_ID ) {
        $query = "SELECT 
os.Order_Status
,os.Drug_Name
,os.Order_Type
,CONVERT(VARCHAR(10), os.Admin_Date, 101) as Admin_Date
,os.PAT_ID
,ndt.PAT_ID
,ndt.Cycle
,ndt.AdminDay
,ndt.Dose
,ndt.Unit
,CASE
    WHEN CHARINDEX(':', ndt.Route) > 0 THEN
        left(ndt.Route, CHARINDEX(':', ndt.Route)-1)
    ELSE
        ndt.Route
 END as Route
,ndt.StartTime
,ndt.EndTime
,ndt.Comments
,ndt.Treatment_User
,ndt.Treatment_Date
FROM Order_Status os
LEFT JOIN ND_Treatment ndt on ndt.Order_ID = os.Order_ID
WHERE
os.PAT_ID = '$PAT_ID' and os.Order_Status='Administered'";

/**
        $query = "
SELECT 
os.Order_Status
,os.Drug_Name
,os.Order_Type
,CONVERT(VARCHAR(10), os.Admin_Date, 101) as Admin_Date
,ndt.Dose
,ndt.Unit
,ndt.Route
,ndt.StartTime
,ndt.EndTime
,ndt.Comments
,ndt.Treatment_User
,ndt.Treatment_Date
,os.PAT_ID
,ndt.PAT_ID
,ndt.Cycle
,ndt.AdminDay
FROM Order_Status os
LEFT JOIN ND_Treatment ndt on ndt.Order_ID = os.Order_ID and ndt.PAT_ID = os.PAT_ID
WHERE ndt.PAT_ID = '$PAT_ID'";
**/
error_log("getAdministeredRecords - $query");
        $result = $this->Flowsheet->query( $query );
        return ( $result );
    }


    function getHoldCancelRecords( $PAT_ID ) {
        $query = "
SELECT 
os.Order_Status
,os.Drug_Name
,os.Order_Type
,CONVERT(VARCHAR(10), os.Admin_Date, 101) as Admin_Date
,os.PAT_ID
FROM Order_Status os
WHERE
os.PAT_ID = '$PAT_ID' and (os.Order_Status = 'Hold' or os.Order_Status = 'Cancel')";

error_log("getHoldCancelRecords - $query");
        $result = $this->Flowsheet->query( $query );
        return ( $result );
    }

    function FSDataConvert2( $Patient_ID = null, $PAT_ID = null, $PreT, $TTherapy, $PostT ) {
        $GeneralInfoRecords = $this->getGeneralInfo( $PAT_ID );
        $GIRDates           = array( );
        foreach ( $GeneralInfoRecords as $giRec ) {
            $GIRDates += array(
                 $giRec[ "AdminDate" ] => $giRec 
            );
        }
        $ControllerClass = "PatientController";
        $model           = "Patient";
        $controller      = "patient";
        $action          = null;

        $pc = new $ControllerClass( $model, $controller, $action );
        $pc->OEM( $Patient_ID );
        $OEMData     = $pc->get( 'jsonRecord' );
        $Status      = $OEMData[ "success" ];
        $oemRecords  = $OEMData[ "records" ][ 0 ][ "OEMRecords" ];
        $PreTherapy  = array( );
        $Therapy     = array( );
        $PostTherapy = array( );

        $PreMedsList  = array( );
        $ThrMedsList  = array( );
        $PostMedsList = array( );

        $DateRow = array( );
        $DateRow += array(
             "-" => "01 General" 
        );
        $DateRow += array(
             "label" => "Date" 
        );

        $PSRow = array( );
        $PSRow += array(
             "-" => "01 General" 
        );
        $PSRow += array(
             "label" => "Performance Status" 
        );

        $DRRow = array( );
        $DRRow += array(
             "-" => "01 General" 
        );
        $DRRow += array(
             "label" => "Disease Response" 
        );

        $ToxicityRow = array( );
        $ToxicityRow += array(
             "-" => "01 General" 
        );
        $ToxicityRow += array(
             "label" => "Toxicity" 
        );

        $OtherRow = array( );
        $OtherRow += array(
             "-" => "01 General" 
        );
        $OtherRow += array(
             "label" => "Other" 
        );

        foreach ( $oemRecords as $aRecord ) {       // Walks through each day of the complete regimen to build a daily record.
            $Cycle         = $aRecord[ "Cycle" ];
            $Day           = $aRecord[ "Day" ];
            $AdminDate     = $aRecord[ "AdminDate" ];
            $CycleColLabel = "Cycle $Cycle, Day $Day";
            $DateRow += array( $CycleColLabel => $AdminDate );

            if ( array_key_exists( $AdminDate, $GIRDates ) ) {
                $giRec = $GIRDates[ $AdminDate ];

                if ( $giRec[ "Disease_Response" ] == "" ) {
                    $DRRow += array(
                         $CycleColLabel => "" 
                    );
                } else {
                    $DRRow += array(
                         $CycleColLabel => "<a href=\"#\" recid=\"DRPanel-$AdminDate-\">View</a>" 
                    );
                }

                if ( $giRec[ "ToxicityLU_ID" ] == "" ) {
                    $ToxicityRow += array(
                         $CycleColLabel => "" 
                    );
                } else {
                    $ToxicityRow += array(
                         $CycleColLabel => "<a href=\"#\" recid=\"ToxPanelPanel-$AdminDate-\">View</a>" 
                    );
                }

                if ( $giRec[ "Other" ] == "" ) {
                    $OtherRow += array(
                         $CycleColLabel => "" 
                    );
                } else {
                    $OtherRow += array(
                         $CycleColLabel => "<a href=\"#\" recid=\"OIPanel-$AdminDate-\">View</a>" 
                    );
                }
            }
            $PSRow += array(
                 $CycleColLabel => "" 
            );

            $PreMeds = $aRecord[ "PreTherapy" ];
            foreach ( $PreMeds as $Med ) {
                $MedName = $Med[ "Med" ];
                $Key     = "$AdminDate-$MedName";
                if ( !isset( $PreTherapy[ $MedName ] ) ) {
                    $PreMedsList[ ]         = $MedName;
                    $PreTherapy[ $MedName ] = array( );
                    $PreTherapy[ $MedName ] += array("-" => "02 Pre Therapy" );
                    $PreTherapy[ $MedName ] += array("label" => $MedName );
                }
                $MedCellVar = $this->MedCell( $CycleColLabel, $Key, $PreT );
                $PreTherapy[ $MedName ] += $MedCellVar;
            }

            $Meds = $aRecord[ "Therapy" ];
            foreach ( $Meds as $Med ) {
                $MedName = $Med[ "Med" ];
                $Key     = "$AdminDate-$MedName";
                if ( !isset( $Therapy[ $MedName ] ) ) {
                    $ThrMedsList[ ]      = $MedName;
                    $Therapy[ $MedName ] = array( );
                    $Therapy[ $MedName ] += array(
                         "-" => "03 Therapy" 
                    );
                    $Therapy[ $MedName ] += array(
                         "label" => $MedName 
                    );
                }
                $MedCellVar = $this->MedCell( $CycleColLabel, $Key, $TTherapy );
                $Therapy[ $MedName ] += $MedCellVar;
            }

            $PostMeds = $aRecord[ "PostTherapy" ];
            foreach ( $PostMeds as $Med ) {
                $MedName = $Med[ "Med" ];
                $Key     = "$AdminDate-$MedName";
                if ( !isset( $PostTherapy[ $MedName ] ) ) {
                    $PostMedsList[ ]         = $MedName;
                    $PostTherapy[ $MedName ] = array( );
                    $PostTherapy[ $MedName ] += array(
                         "-" => "04 Post Therapy" 
                    );
                    $PostTherapy[ $MedName ] += array(
                         "label" => $MedName 
                    );
                }
                $MedCellVar = $this->MedCell( $CycleColLabel, $Key, $PostT );
                $PostTherapy[ $MedName ] += $MedCellVar;
            }
        }

        $records = array( );
        array_push( $records, $DateRow, $PSRow, $DRRow, $ToxicityRow, $OtherRow );
        foreach ( $PreMedsList as $Med ) {
            array_push( $records, $PreTherapy[ $Med ] );
        }
        foreach ( $ThrMedsList as $Med ) {
            array_push( $records, $Therapy[ $Med ] );
        }
        foreach ( $PostMedsList as $Med ) {
            array_push( $records, $PostTherapy[ $Med ] );
        }

        $this->set( 'jsonRecord', array(
             'success' => true,
            'total' => count( $records ),
            'records' => $records 
        ) );
    }


    function MedCell( $CycleColLabel, $Key, $Recs ) {
        $MedData = "";
        if ( array_key_exists( $Key, $Recs ) ) {
            $rec = $Recs[ $Key ];
            // error_log( "flowsheetController.MedCell - $CycleColLabel - $Key - " . $rec[ "Status" ] );
            if ( "Administered" == $rec[ "Status" ] ) {
                $MedData = $rec[ "Dose" ] . " " . $rec[ "Unit" ] . " " . $rec[ "Route" ] . "<br>From " . $rec[ "Start" ] . "<br>to " . $rec[ "End" ];
            } else {
                $MedData = $rec[ "Status" ];
            }
        }
        return array(
             $CycleColLabel => $MedData 
        );
    }


}