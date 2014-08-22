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
        
        function getGeneralInfo( $PAT_ID ) {
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
                error_log( "Optional Data - via INPUT - " . $this->varDumpToString( $requestData ) );
            } else if ( !empty( $_POST ) ) {
                // Retrieve Data if Request is a POST
                error_log( "No INPUT Data Received, Checking POST" );
                error_log( "Optional Data - via POST - " . $this->varDumpToString( $_POST ) ); // This works...
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
                $records = $this->getGeneralInfo( $PAT_ID );
                
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
                    error_log( "POST Request - $query" );
                    
                    $jsonRecord[ 'msg' ] = "$Msg Record Created";
                    $ErrMsg              = "Creating $Msg Record";
                    $records             = $this->Flowsheet->query( $query );
                }
            } else if ( "PUT" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                error_log( "PUT Request - NYA" );
            } else if ( "DELETE" == $_SERVER[ 'REQUEST_METHOD' ] ) {
                error_log( "DELETE Request - NYA" );
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
            error_log( "Optional Entry Point" );
            $Msg       = "Flowsheet Optional Information";
            $TableName = "Flowsheet_ProviderNotes";
            
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            $query                   = "";
            $ErrMsg                  = "";
            
        }
        
        
        
        
        /**
         * 
         * @param String $id
         * @return null
         */
        public function FS( $id = null ) {
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            $retVal                  = array( );
            $this->set( 'jsonRecord', array(
                 'success' => true,
                'total' => count( $retVal ),
                'records' => $retVal 
            ) );
        }
        
        
        
        
        
        
        /**
         * 
         * 
         *
         *          *
         *
         * @param string    $id the ID of the Patient
         * @param string    $PAT_ID the ID for a specific record in the Patient Assigned Templates table which uniquely identifies the a specific template/Treatment Regimen process for a specific patient 
         * @param array     $PreT - Array of Pre Therapy medications Administered in this Treatment Regimen
         * @param array     $Therapy - Array of Therapy medications
         * @param array     $PostT - Array of Post Therapy 
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
        public function FSDataConvert( $id = null, $PAT_ID = null, $PreT, $Therapy, $PostT ) {
            error_log("FSDataConvert function ENTRY POINT");

            $MicroTime_ST = microtime(true);
            error_log("Get all General Information Records for Flow Sheet - (Timestamp in MS = $MicroTime_ST)");

            $GeneralInfoRecords = $this->getGeneralInfo( $PAT_ID );
            $GIRDates           = array( );
            foreach ( $GeneralInfoRecords as $giRec ) {
                $GIRDates += array( $giRec[ "AdminDate" ] => $giRec );
            }

            $MicroTime_END = microtime(true);
            $TimeDiff = $MicroTime_END - $MicroTime_ST;
            error_log("GOT all General Information Records for Flow Sheet - (" . count ( $GIRDates ) . " records) - (Timestamp in MS = $MicroTime_END (Diff = $TimeDiff))");



            $MicroTime_ST2 = microtime(true);
            error_log("Get all OEM Data Records to calculate Admin Days - (Timestamp in MS = $MicroTime_ST2)");

            $ControllerClass = "PatientController";
            $model           = "Patient";
            $controller      = "patient";
            $action          = null;
            
            $pc = new $ControllerClass( $model, $controller, $action );
            $pc->OEM( $id );
            $OEMData = $pc->get( 'jsonRecord' );

            $Status     = $OEMData[ "success" ];
            $oemRecords = $OEMData[ "records" ][ 0 ][ "OEMRecords" ];

            $MicroTime_END = microtime(true);
            $TimeDiff = $MicroTime_END - $MicroTime_ST2;
            error_log("GOT all OEM Data Records to calculate Admin Days - (" . count ( $oemRecords ) . " records, which is the # of Admin Days in this Treatment Regimen) - (Timestamp in MS = $MicroTime_END (Diff = $TimeDiff))");




            $PreTherapy  = array( );
            $Therapy     = array( );
            $PostTherapy = array( );
            
            $DateRow = array( );
            $DateRow += array("-" => "01 General" );
            $DateRow += array("label" => "Date" );
            
            $PSRow = array( );
            $PSRow += array("-" => "01 General" );
            $PSRow += array("label" => "Performance Status" );
            
            $DRRow = array( );
            $DRRow += array("-" => "01 General" );
            $DRRow += array("label" => "Disease Response" );
            
            $ToxicityRow = array( );
            $ToxicityRow += array("-" => "01 General" );
            $ToxicityRow += array("label" => "Toxicity");
            
            $OtherRow = array( );
            $OtherRow += array("-" => "01 General" );
            $OtherRow += array("label" => "Other" );
            
            
            foreach ( $oemRecords as $aRecord ) {
                // error_log("Flow Sheet All Records - " . $this->varDumpToString($aRecord));
                
                $Cycle         = $aRecord[ "Cycle" ];
                $Day           = $aRecord[ "Day" ];
                $AdminDate     = $aRecord[ "AdminDate" ];
                $CycleColLabel = "Cycle $Cycle, Day $Day";
                $DateRow += array(
                     $CycleColLabel => $AdminDate 
                );
                
                // error_log("AdminDate - $AdminDate");
                
                if ( array_key_exists( $AdminDate, $GIRDates ) ) {
                    $giRec = $GIRDates[ $AdminDate ];
                    // error_log("GIRec - " . $this->varDumpToString($giRec));
                    
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
                        $PreTherapy[ $MedName ] = array( );
                        $PreTherapy[ $MedName ] += array(
                             "-" => "02 Pre Therapy" 
                        );
                        $PreTherapy[ $MedName ] += array(
                             "label" => $MedName 
                        );
                    }
                    $MedData = "";
                    if ( array_key_exists( $Key, $PreT ) ) {
                        $aTempRec = $PreT[ $Key ];
                        $MedData  = $aTempRec[ "Dose" ] . " " . $aTempRec[ "Unit" ] . " " . $aTempRec[ "Route" ] . "<br>From " . $aTempRec[ "Start" ] . "<br>to " . $aTempRec[ "End" ];
                    }
                    // error_log("Pre Therapy - $Key - $MedData");
                    $PreTherapy[ $MedName ] += array(
                         $CycleColLabel => $MedData 
                    );
                }
                
                $Meds = $aRecord[ "Therapy" ];
                foreach ( $Meds as $Med ) {
                    $MedName = $Med[ "Med" ];
                    $Key     = "$AdminDate-$MedName";
                    if ( !isset( $Therapy[ $MedName ] ) ) {
                        $Therapy[ $MedName ] = array( );
                        $Therapy[ $MedName ] += array(
                             "-" => "03 Therapy" 
                        );
                        $Therapy[ $MedName ] += array(
                             "label" => $MedName 
                        );
                    }
                    $MedData = "";
                    if ( array_key_exists( $Key, $Therapy ) ) {
                        $aTempRec = $Therapy[ $Key ];
                        // error_log( "Therapy Check - " . count( $aTempRec ) );
                        if ( count( $aTempRec ) > 1 ) {
                            $aTempRec = $aTempRec[ 0 ];
                        }
                        $MedData = $aTempRec[ "Dose" ] . " " . $aTempRec[ "Unit" ] . " " . $aTempRec[ "Route" ] . "<br>From " . $aTempRec[ "Start" ] . "<br>to " . $aTempRec[ "End" ];
                        // error_log( "Therapy - ($Key) - ($MedData)" );
                    } else {
                        // error_log( "No Matching Record in Therapy for $Key" );
                    }
                    
                    $Therapy[ $MedName ] += array(
                         $CycleColLabel => $MedData 
                    );
                }
                
                $PostMeds = $aRecord[ "PostTherapy" ];
                foreach ( $PostMeds as $Med ) {
                    $MedName = $Med[ "Med" ];
                    $Key     = "$AdminDate-$MedName";
                    if ( !isset( $PostTherapy[ $MedName ] ) ) {
                        $PostTherapy[ $MedName ] = array( );
                        $PostTherapy[ $MedName ] += array(
                             "-" => "04 Post Therapy" 
                        );
                        $PostTherapy[ $MedName ] += array(
                             "label" => $MedName 
                        );
                    }
                    $MedData = "";
                    if ( array_key_exists( $Key, $PostT ) ) {
                        $aTempRec = $PostT[ $Key ];
                        $MedData  = $aTempRec[ "Dose" ] . " " . $aTempRec[ "Unit" ] . " " . $aTempRec[ "Route" ] . "<br>From " . $aTempRec[ "Start" ] . "<br>to " . $aTempRec[ "End" ];
                    }
                    // error_log("Post Therapy - $Key - $MedData");
                    $PostTherapy[ $MedName ] += array(
                         $CycleColLabel => $MedData 
                    );
                }
            }
            
            
            $records    = array( );
            $records[ ] = $DateRow;
            $records[ ] = $PSRow;
            $records[ ] = $DRRow;
            $records[ ] = $ToxicityRow;
            $records[ ] = $OtherRow;
            
            foreach ( $PreTherapy as $Med ) {
                $records[ ] = $Med;
            }
            
            foreach ( $Therapy as $Med ) {
                $records[ ] = $Med;
            }
            
            foreach ( $PostTherapy as $Med ) {
                $records[ ] = $Med;
            }
            
            //error_log("Flow Sheet Data - " . $this->varDumpToString($records));
            
            
            
            
            
            $this->set( 'jsonRecord', array( 'success' => true, 'total' => count( $records ), 'records' => $records ) );
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
            
            error_log( "FS-II Entry Point - " . microtime(true));
            
            $jsonRecord              = array( );
            $jsonRecord[ 'success' ] = true;
            $retVal                  = array( );

            if ( "GET" != $_SERVER[ 'REQUEST_METHOD' ] ) {
                $jsonRecord['success'] = false;
                $jsonRecord['msg'] = "Incorrect method called for Flow Sheet Service (expected a GET got a " . $_SERVER['REQUEST_METHOD'] . ")";
                $this->set('jsonRecord', $jsonRecord);
                return;
            }
            
            
            /**
             * Sean's original service call to get all the Flow Sheet Data. This only returns records for Admin Days that have information in them (e.g. PAST Admin Dates)
             **/
            $MicroTime_ST = microtime(true);
            error_log("Get Flow Sheet Data for all previous Administration Dates where a med has been administered - (Timestamp in MS = $MicroTime_ST)");
            $records = $this->Flowsheet->FS( $id );
            if ( empty( $records ) ) {
                $records[ 'error' ] = 'No Records Found';
            } else {
                error_log( "FS GOT RECORDS - " );
            }
            if ( $this->_checkForErrors( 'Get Flowsheet Failed. ', $records ) ) {
                $this->set( 'jsonRecord', array(
                     'success' => false,
                    'msg' => $this->get( 'frameworkErr' ) . $records[ 'error' ] 
                ) );
                return;
            }
            $MicroTime_END = microtime(true);
            $TimeDiff = $MicroTime_END - $MicroTime_ST;
            error_log("GOT all previous Admin Date Info (" . count ( $records ) . " records) - (Timestamp in MS = $MicroTime_END (Diff = $TimeDiff))");

            /**
             * Initialize arrays for three of the classes of records we should be returning 
             * (General Information Category Data is handled differently)
             **/

            $PreAdminRecords     = array( );
            $TherapyAdminRecords = array( );
            $PostAdminRecords    = array( );
            
            foreach ( $records as $aRec ) {
                /**
                 * Breakout a Flow Sheet record into it's various elements
                 **/
                if ( array_key_exists( "ndt_Type", $aRec ) ) {
                    $Type    = $aRec[ "ndt_Type" ];
                    $aDate   = $aRec[ "ndt_AdminDate" ];
                    $MedName = $aRec[ "ndt_Drug" ];
                    $Key     = "$aDate-$MedName";

                    // Just get the Admin Time (field format = "01/01/2014T03:42:56")
                    $s1      = explode( "T", $aRec[ "ndt_StartTime" ] );
                    $s1      = $s1[ 1 ];
                    $e1      = explode( "T", $aRec[ "ndt_EndTime" ] );
                    $e1      = $e1[ 1 ];

                    $tmpRec  = array(
                        "Dose" => $aRec[ "ndt_Dose" ],
                        "Unit" => $aRec[ "ndt_Unit" ],
                        "Route" => $aRec[ "ndt_Route" ],
                        "Start" => $s1,
                        "End" => $e1 
                    );
                    $tmpARec = array( $Key => $tmpRec );
                    
                         /* Only add a record to the Pre/Post/Therapy Admin Records list if it doesn't already exist */
                    if ( "Pre Therapy" == $Type ) {
                        if ( !array_key_exists( $Key, $PreAdminRecords ) ) {
                            $PreAdminRecords += $tmpARec;
                        }
                    } else if ( "Post Therapy" == $Type ) {
                        if ( !array_key_exists( $Key, $PostAdminRecords ) ) {
                            $PostAdminRecords += $tmpARec;
                        }
                    } else if ( "Therapy" == $Type ) {
                        if ( !array_key_exists( $Key, $TherapyAdminRecords ) ) {
                            $TherapyAdminRecords += $tmpARec;
                        }
                    }
                }
            }
            
            $MicroTime_END2 = microtime(true);
            $TimeDiff = $MicroTime_END2 - $MicroTime_END;
            error_log("Finished Parsing all previous Admin Date Info (" . count ( $records ) . " records) - (Timestamp in MS = $MicroTime_END2 (Diff = $TimeDiff))");

            $this->set( 'FS_OrderRecords', $records );
            $this->set( 'jsonRecord', array( 'success' => true, 'total' => count( $records ), 'records' => $records  ) );


            /**
             * Now that we have records for all administered meds...
             * we need to get records for ALL the Admin Dates in the specified Treatment Regimen
             **/
            $MicroTime_ST2 = microtime(true);
            error_log("Converting all previous Admin Date Info into Flow Sheet Format (" . count ( $records ) . " records) - (Timestamp in MS = $MicroTime_ST2)");

            $this->FSDataConvert( $id, $PAT_ID, $PreAdminRecords, $TherapyAdminRecords, $PostAdminRecords );

            $MicroTime_END = microtime(true);
            $TimeDiff = $MicroTime_END - $MicroTime_ST2;
            $jr = $this->get( 'jsonRecord' );
            $Foo = $jr["total"];
            error_log("Finished converting all previous Admin Date Info into Flow Sheet Format (" . $Foo . " records) - (Timestamp in MS = $MicroTime_END (Diff = $TimeDiff))");
        }
    }
?>