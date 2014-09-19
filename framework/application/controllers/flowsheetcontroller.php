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
     
     Mike Barlow
     */
    class FlowsheetController extends Controller {
        
        /**
         * Checks whether the given result set contains errors
         *
         * @param string $errorMsg
         * @param array $retVal
         * @return boolean
         * @todo Move this highly duplicated function into the parent Controller class
         */
        private function _checkForErrors( $errorMsg, $retVal ) {
            if ( !empty( $retVal[ 'error' ] ) ) {
                
                if ( DB_TYPE == 'sqlsrv' && is_array( $retVal[ 'error' ] ) ) {
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
        
        function getGeneralInfo( $PAT_ID, $TableName = null ) {
            if ( $PAT_ID ) {
                /* Get Specific Info */
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
            } else {
                /* Get ALL Info */
                $query = "select * from $TableName";
            }
            // error_log("GET Request - $query");
            return $this->Flowsheet->query( $query );
        }
        
        
        public function Optional( $PAT_ID = null ) {
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
            
            $Msg       = "Flowsheet Optional Information";
            $TableName = "Flowsheet_ProviderNotes";
            $GUID      = $this->Flowsheet->newGUID();
            
            $retVal                  = array( );
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            $query                   = "";
            $ErrMsg                  = "";
            if ( null == $PAT_ID || "PAT_ID" == $PAT_ID ) {
                $PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F";
            }
            // $PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F";
            $AdminDate = date( "m/d/Y" );
            // error_log("PAT_ID for General Flow Sheet Information = $PAT_ID");
            
            
            // Retrieve Data if Request is a PUT
            parse_str( file_get_contents( "php://input" ), $requestData );
            if ( !empty( $requestData ) ) {
                // error_log( "Optional Data - via INPUT - " . $this->varDumpToString( $requestData ) );
            } else if ( !empty( $_POST ) ) {
                // Retrieve Data if Request is a POST
                // error_log( "No INPUT Data Received, Checking POST" );
                // error_log( "Optional Data - via POST - " . $this->varDumpToString( $_POST ) ); // This works...
                $requestData = $_POST;
            }
            
            if ( !empty( $requestData ) ) {
                $Cycle           = $requestData[ "Cycle" ];
                $Day             = $requestData[ "Day" ];
                $ToxInstrID      = $requestData[ "ToxInstr" ];
                $ToxData         = $this->escapeString( $requestData[ "Data" ] );
                $DiseaseResponse = $this->escapeString( $requestData[ "DRData" ] );
                $FS_OtherData    = $this->escapeString( $requestData[ "OtherData" ] );
            }
            
            $this->Flowsheet->beginTransaction();
            if ( "GET" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                $records = $this->getGeneralInfo( $PAT_ID, $TableName );
                
                $jsonRecord[ 'msg' ] = "No records to find";
                $ErrMsg              = "Retrieving $Msg Records";
            } else if ( "POST" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                if ( "" !== $ToxInstrID || "" !== $DiseaseResponse || "" !== $FS_OtherData || "" !== $ToxData ) {
                    if ( "" == $ToxInstrID ) {
                        $query = "INSERT INTO $TableName
                       (FS_ID, Disease_Response, ToxicityLU_ID, Toxicity, Other, PAT_ID, Cycle, Day, AdminDate)
                       VALUES
                       ( '$GUID', '$DiseaseResponse', null, '$ToxData', '$FS_OtherData', '$PAT_ID', '$Cycle', '$Day', '$AdminDate')";
                    } else {
                        $query = "INSERT INTO $TableName
                       (FS_ID, Disease_Response, ToxicityLU_ID, Toxicity, Other, PAT_ID, Cycle, Day, AdminDate)
                       VALUES
                       ( '$GUID', '$DiseaseResponse', '$ToxInstrID', '$ToxData', '$FS_OtherData', '$PAT_ID', '$Cycle', '$Day', '$AdminDate')";
                    }
                    // error_log( "POST Request - $query" );
                    
                    $jsonRecord[ 'msg' ] = "$Msg Record Created";
                    $ErrMsg              = "Creating $Msg Record";
                    $records             = $this->Flowsheet->query( $query );
                }
            } else if ( "PUT" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                // error_log( "PUT Request - NYA" );
            } else if ( "DELETE" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                // error_log( "DELETE Request - NYA" );
            }
            
            
            if ( $this->_checkForErrors( 'Flowsheet Failed. ', $records ) ) {
                $this->Flowsheet->rollbackTransaction();
                $this->set( 'jsonRecord', array(
                     'success' => false,
                    'msg' => $this->get( 'frameworkErr' ) . $records[ 'error' ] 
                ) );
                return;
            }
            
            $this->Flowsheet->endTransaction();
            $this->set( 'jsonRecord', array(
                 'success' => true,
                'total' => count( $records ),
                'records' => $records 
            ) );
        }
        
        
        
        
        public function Optional2( $PAT_ID = null ) {
            // error_log( "Optional Entry Point" );
            $Msg       = "Flowsheet Optional Information";
            $TableName = "Flowsheet_ProviderNotes";
            
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            $query                   = "";
            $ErrMsg                  = "";
            
        }
        
        
        
        public function getNewDRRowCol( $DRRow, $giRec, $CycleColLabel, $AdminDate ) {
            if ( $giRec[ "Disease_Response" ] == "" ) {
                $DRRow += array(
                     $CycleColLabel => "" 
                );
            } else {
                $DRRow += array(
                     $CycleColLabel => "<a href='#' recid='DRPanel-$AdminDate-'>View" 
                );
            }
            return $DRRow;
        }
        
        public function getNewToxicityRowCol( $ToxicityRow, $giRec, $CycleColLabel, $AdminDate ) {
            if ( $giRec[ "Toxicity" ] == "" ) {
                $ToxicityRow += array(
                     $CycleColLabel => "" 
                );
            } else {
                $ToxicityRow += array(
                     $CycleColLabel => "<a href='#' recid='ToxPanelPanel-$AdminDate-'>View" 
                );
            }
            return $ToxicityRow;
        }
        
        public function getNewOtherRowCol( $OtherRow, $giRec, $CycleColLabel, $AdminDate ) {
            if ( $giRec[ "Other" ] == "" ) {
                $OtherRow += array(
                     $CycleColLabel => "" 
                );
            } else {
                $OtherRow += array(
                     $CycleColLabel => "<a href='#' recid='OIPanel-$AdminDate-'>View" 
                );
            }
            return $OtherRow;
        }
        
        
        /*********
        public function getNewPerformanceStatusRowCol ($CycleColLabel, $AdminDate) {
        return array($CycleColLabel => "" );
        }
        
        public function HaveMedInfo4AdminDate ($Key, $MedArray) {
        return array_key_exists( $Key, $MedArray );
        }
        
        
        public function getTreatmentInfo($AdminDate, $Patient_ID, $Drug) {
        $query = "select * from ND_Treatment where AdminDate = '$AdminDate' and Patient_ID = '$Patient_ID' and Drug = '$Drug'";
        return $this->Flowsheet->query( $query );
        }
        *******************/
        
        
        
        
        
        private function getListOfAdminDatesFromDB( $TemplateID, $PatientID ) {
            $query = "SELECT 
      mt.Course_Number
      ,mt.Admin_Day
      ,CONVERT(VARCHAR(10), Admin_Date, 101) as Admin_Date
  FROM Master_Template mt 
  where mt.Patient_ID = '$PatientID'
  order by Admin_Date";
            return $this->Flowsheet->query( $query );
        }
        
        private function getOptionalInfoFromDB( $PAT_ID ) {
            $query = "SELECT 
        Weight
        ,Disease_Response
        ,Toxicity
        ,Other
        ,PAT_ID
        ,AdminDate
        FROM Flowsheet_ProviderNotes
        where PAT_ID = '$PAT_ID'";
            return $this->Flowsheet->query( $query );
        }
        
        
        
        
        
        private function getMedRowsInfoFromDB( $TemplateID, $PatientID ) {
            $query = "SELECT distinct os.Drug_Name,os.Order_Type, os.Sequence
    FROM Order_Status os
    where os.Template_ID = '$TemplateID' and os.Patient_ID = '$PatientID'
    order by Order_Type, os.Sequence";
            return $this->Flowsheet->query( $query );
        }
        
        private function getTemplateIDFromDB( $PAT_ID ) {
            $query = "select Template_ID, Patient_ID 
    from Patient_Assigned_Templates where PAT_ID = '$PAT_ID'";
            return $this->Flowsheet->query( $query );
        }
        
        private function BuildDateRow( $AdminDateList, &$DRRow, &$PS_Row, &$ToxRow, &$OtherRow, $PAT_ID ) {
            $GeneralInfoRecords = $this->getOptionalInfoFromDB( $PAT_ID );
            $DateRow            = array( );
            $DateRow += array(
                 "-" => "01 General" 
            );
            $DateRow += array(
                 "label" => "Date" 
            );
            
            $PS_Row += array(
                 "-" => "01 General" 
            );
            $PS_Row += array(
                 "label" => "Performance Status" 
            );
            
            $DRRow += array(
                 "-" => "01 General" 
            );
            $DRRow += array(
                 "label" => "Disease Response" 
            );
            
            $ToxRow += array(
                 "-" => "01 General" 
            );
            $ToxRow += array(
                 "label" => "Toxicity" 
            );
            
            $OtherRow += array(
                 "-" => "01 General" 
            );
            $OtherRow += array(
                 "label" => "Other" 
            );
            
            foreach ( $AdminDateList as $AnAdminDay ) {
                $AdminDate = $AnAdminDay[ "Admin_Date" ];
                $xx        = "Cycle " . $AnAdminDay[ "Course_Number" ] . ", Day " . $AnAdminDay[ "Admin_Day" ];
                $DateRow += array(
                     $xx => $AdminDate 
                );
                $HaveGIRec = false;
                foreach ( $GeneralInfoRecords as $GIR ) {
                    if ( $GIR[ "AdminDate" ] === $AdminDate ) {
                        $HaveGIRec = true;
                        $PS_Row += array(
                             $xx => "" 
                        );
                        $DRRow    = $this->getNewDRRowCol( $DRRow, $GIR, $xx, $AdminDate );
                        $ToxRow   = $this->getNewToxicityRowCol( $ToxRow, $GIR, $xx, $AdminDate );
                        $OtherRow = $this->getNewOtherRowCol( $OtherRow, $GIR, $xx, $AdminDate );
                        break;
                    }
                }
                if ( !$HaveGIRec ) {
                    $PS_Row += array(
                         $xx => "" 
                    );
                    $DRRow += array(
                         $xx => "" 
                    );
                    $ToxRow += array(
                         $xx => "" 
                    );
                    $OtherRow += array(
                         $xx => "" 
                    );
                }
            }
            return $DateRow;
        }
        
        
        public function getOrders4AdminDate( $PatientID, $AdminDate ) {
            $query  = "select 
    Order_Status, 
    Drug_Name 
    from Order_Status os where os.Patient_ID = '$PatientID' and os.Admin_Date = '$AdminDate'";
            $retVal = $this->Flowsheet->query( $query );
            return $retVal;
        }
        
        public function getAdminDetails4AdminDate( $PAT_ID, $AdminDate, $DrugName ) {
            $query  = "SELECT ndt.Dose, ndt.Unit, ndt.StartTime, ndt.EndTime
    FROM ND_Treatment ndt 
    where ndt.PAT_ID = '$PAT_ID' and ndt.AdminDate = '$AdminDate' and ndt.Drug = '$DrugName'";
            $retVal = $this->Flowsheet->query( $query );

            echo $query;
            return $retVal;
        }
        
        private function Add_AdminDays2MedRows( $AdminDateList, $AdminRecords, $DrugName, $PatientID, $PAT_ID ) {
            $Temp = array( );
            foreach ( $AdminDateList as $AnAdminDay ) {
                $AdminDate = $AnAdminDay[ "Admin_Date" ];
                $xx        = "Cycle " . $AnAdminDay[ "Course_Number" ] . ", Day " . $AnAdminDay[ "Admin_Day" ];
                $Orders    = $this->getOrders4AdminDate( $PatientID, $AdminDate );
                foreach ( $Orders as $anOrder ) {
                    if ( $DrugName == $anOrder[ "Drug_Name" ] ) {
                        $OrderStatus = $anOrder[ "Order_Status" ];
                        $nArray      = array(
                             $xx => "" 
                        );
                        if ( "Administered" == $OrderStatus ) {
                            $AdminRec = $this->getAdminDetails4AdminDate( $PAT_ID, $AdminDate, $DrugName );
                            if ( count( $AdminRec ) > 0 ) {
                                $AdminRec = $AdminRec[ 0 ];
                                $nArray   = array(
                                     $xx => number_format( floatval( $AdminRec[ "Dose" ] ) ) . " " . $AdminRec[ "Unit" ] . " ( " . $AdminRec[ "StartTime" ] . " - " . $AdminRec[ "EndTime" ] . " )" 
                                );
                            }
                        } else if ( "Hold" == $OrderStatus || "Cancelled" == $OrderStatus ) {
                            $nArray = array(
                                 $xx => $OrderStatus 
                            );
                        }
                        $Temp += $nArray;
                        break;
                    }
                }
            }
            $AdminRecords[ $DrugName ] += $Temp;
            return $AdminRecords;
        }
        
        
        public function GenRowStart4Med( $NewMedRec, $RowLabel, $MedName, $Sequence ) {
            if ( $Sequence == "" ) {
                $Sequence = "N/A";
            }
            $NewMedRec[ $MedName ] = array( );
            $NewMedRec[ $MedName ] += array(
                 "-" => $RowLabel 
            );
            $NewMedRec[ $MedName ] += array(
                 "label" => $Sequence . " - " . $MedName 
            );
            return $NewMedRec;
        }
        
        public function DateIsPastOrToday( $aDate ) {
            $Today     = date_create( 'today' );
            $datetime2 = new DateTime( $aDate );
            $interval  = $Today->diff( $datetime2 );
            if ( 0 === $interval->days ) {
                return true; // It's today
            } else {
                if ( 0 !== $interval->invert ) {
                    return true; // It's in the past
                }
            }
            return false; // It's in the future
        }
        
        /**
         * An idempotent service call which generates all the Flow Sheet Information and returns it in the form of an Ext-JS Grid Data Store
         * This service call accepts HTTP GET requests only and generates a Service Request error if called by any other type of HTTP Service request.
         *
         * Sample Call - (COMS_TEST_5 - 8/7/2014) Flowsheet/FS2/3D33A5FE-9A16-E411-BAD9-000C2935B86F/E362EFA5-7E19-E411-BAD9-000C2935B86F
         *
         *
         * @param string    $id the ID of the Patient
         * @param string    $PAT_ID the ID for a specific record in the Patient Assigned Templates table which uniquely identifies the a specific template/Treatment Regimen process for a specific patient 
         *
         * @return          Nothing, return data is placed into the following global variables
         *                  jsonRecord      - Data to be returned by the service call
         *                  FS_OrderRecords - 
         *                  frameworkErr    - Framework error information
         *
         * @access public
         * @static
         *
         **/
        public function FS2( $id = null, $PAT_ID = null ) {
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = false;
            $retVal                  = array( );
            
            if ( "GET" != $_SERVER[ 'REQUEST_METHOD' ] ) {
                $jsonRecord[ 'success' ] = false;
                $jsonRecord[ 'msg' ]     = "Incorrect method called for Flow Sheet Service (expected a GET got a " . $_SERVER[ 'REQUEST_METHOD' ] . ")";
                $this->set( 'jsonRecord', $jsonRecord );
                return;
            }
            $retVal     = $this->getTemplateIDFromDB( $PAT_ID );
            $TemplateID = $retVal[ 0 ][ "Template_ID" ];
            $PatientID  = $id;
            
            $retVal        = $this->getListOfAdminDatesFromDB( $TemplateID, $PatientID, $PAT_ID );
            $AdminDateList = $retVal;
            
            $PS_Row   = array( );
            $ToxRow   = array( );
            $OtherRow = array( );
            $DRRow    = array( );
            
            $DateRow             = $this->BuildDateRow( $AdminDateList, $DRRow, $PS_Row, $ToxRow, $OtherRow, $PAT_ID );
            $retVal              = $this->getMedRowsInfoFromDB( $TemplateID, $PatientID );
            $MedList             = $retVal;
            $PreAdminRecords     = array( );
            $TherapyAdminRecords = array( );
            $PostAdminRecords    = array( );
            
            
            foreach ( $MedList as $Med ) {
                $DrugName = $Med[ "Drug_Name" ];
                $Sequence = $Med[ "Sequence" ];
                if ( $Med[ "Order_Type" ] == "Pre" ) {
                    $PreAdminRecords = $this->GenRowStart4Med( $PreAdminRecords, "02 Pre Therapy", $DrugName, $Sequence );
                    $PreAdminRecords = $this->Add_AdminDays2MedRows( $AdminDateList, $PreAdminRecords, $DrugName, $PatientID, $PAT_ID );
                }
                if ( $Med[ "Order_Type" ] == "Therapy" ) {
                    $TherapyAdminRecords = $this->GenRowStart4Med( $TherapyAdminRecords, "03 Therapy", $DrugName, $Sequence );
                    $TherapyAdminRecords = $this->Add_AdminDays2MedRows( $AdminDateList, $TherapyAdminRecords, $DrugName, $PatientID, $PAT_ID );
                }
                if ( $Med[ "Order_Type" ] == "Post" ) {
                    $PostAdminRecords = $this->GenRowStart4Med( $PostAdminRecords, "04 Post Therapy", $DrugName, $Sequence );
                    $PostAdminRecords = $this->Add_AdminDays2MedRows( $AdminDateList, $PostAdminRecords, $DrugName, $PatientID, $PAT_ID );
                }
            }
            
            $Records    = array( );
            $Records[ ] = $DateRow;
            $Records[ ] = $PS_Row;
            $Records[ ] = $DRRow;
            $Records[ ] = $ToxRow;
            $Records[ ] = $OtherRow;
            foreach ( $PreAdminRecords as $Med ) {
                $Records[ ] = $Med;
            }
            foreach ( $TherapyAdminRecords as $Med ) {
                $Records[ ] = $Med;
            }
            foreach ( $PostAdminRecords as $Med ) {
                $Records[ ] = $Med;
            }
            $this->set( 'jsonRecord', array(
                 'success' => true,
                'total' => count( $Records ),
                'records' => $Records 
            ) );
        }
    }
?>