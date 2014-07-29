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

error_log("Optional Entry Point");

        $Msg = "Flowsheet Optional Information";
        $TableName = "Flowsheet_ProviderNotes";
        $GUID =  $this->Flowsheet->newGUID();

        $retVal = array();
        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $query = "";
        $ErrMsg = "";
        if (null == $PAT_ID) {
            $PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F";
        }
        $PAT_ID = "C8DD3E0F-07F3-E311-AC08-000C2935B86F";
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
            $ToxInstrID = $requestData["ToxInstr"];
            $ToxData = $this->escapeString($requestData["Data"]);
            $DiseaseResponse = $this->escapeString($requestData["DRData"]);
            $FS_OtherData = $this->escapeString($requestData["OtherData"]);
        }

        $this->Flowsheet->beginTransaction();
        if ("GET" == $_SERVER['REQUEST_METHOD']) {
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
            error_log("GET Request - $query");
            $records = $this->Flowsheet->query($query);

            $jsonRecord['msg'] = "No records to find";
            $ErrMsg = "Retrieving $Msg Records";
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
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
                error_log("POST Request - $query");

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
error_log("Optional Entry Point");
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

error_log("FS Entry Point");

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $retVal = array();



$aRec = array(
      "-" => "01 General",
      "label" => "Date",
           "Cycle 1, Day 1" => "07/07/2014",
           "Cycle 1, Day 2" => "07/08/2014",
           "Cycle 1, Day 3" => "07/09/2014",
           "Cycle 1, Day 4" => "07/10/2014",
           "Cycle 1, Day 5" => "07/11/2014",

           "Cycle 2, Day 1"  => "07/12/2014",
           "Cycle 2, Day 2"  => "07/13/2014",
           "Cycle 2, Day 3"  => "07/14/2014",
           "Cycle 2, Day 4"  => "07/15/2014",
           "Cycle 2, Day 5"  => "07/16/2014",

           "Cycle 3, Day 1"  => "07/17/2014", 
           "Cycle 3, Day 2"  => "07/18/2014", 
           "Cycle 3, Day 3"  => "07/19/2014", 
           "Cycle 3, Day 4"  => "07/20/2014", 
           "Cycle 3, Day 5"  => "07/21/2014", 

           "Cycle 4, Day 1"  => "07/22/2014", 
           "Cycle 4, Day 2"  => "07/23/2014", 
           "Cycle 4, Day 3"  => "07/24/2014", 
           "Cycle 4, Day 4"  => "07/25/2014", 
           "Cycle 4, Day 5"  => "07/26/2014", 
                           
           "Cycle 5, Day 1"  => "07/27/2014", 
           "Cycle 5, Day 2"  => "07/28/2014", 
           "Cycle 5, Day 3"  => "07/29/2014", 
           "Cycle 5, Day 4"  => "07/30/2014", 
           "Cycle 5, Day 5"  => "07/31/2014"

);

array_push($retVal, $aRec);

error_log("Result - " . $this->varDumpToString($retVal));

$aRec = array(
      "-" => "01 General",
      "label" => "Toxicity",
      "Cycle 1, Day 1" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 1, Day 2" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 1, Day 3" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 1, Day 4" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 1, Day 5" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",

      "Cycle 2, Day 1" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 2, Day 2" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 2, Day 3" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 2, Day 4" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 2, Day 5" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",

      "Cycle 3, Day 1" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 3, Day 2" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 3, Day 3" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 3, Day 4" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 3, Day 5" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",

      "Cycle 4, Day 1" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 4, Day 2" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 4, Day 3" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 4, Day 4" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 4, Day 5" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",

      "Cycle 5, Day 1" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 5, Day 2" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 5, Day 3" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 5, Day 4" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>",
      "Cycle 5, Day 5" => "&lt;u>&lt;a href=\"#XXXXX\" class=\"ToxView\">View&lt;a>&lt;/u>"
);
array_push($retVal, $aRec);

$aRec = array(
      "-" => "01 General",
      "label" => "Disease Response",
      "Cycle 1, Day 1" =>  " ",
      "Cycle 1, Day 2" =>  " ",
      "Cycle 1, Day 3" =>  " ",
      "Cycle 1, Day 4" =>  " ",
      "Cycle 1, Day 5" =>  " ",

      "Cycle 2, Day 1" =>  " ",
      "Cycle 2, Day 2" =>  " ",
      "Cycle 2, Day 3" =>  " ",
      "Cycle 2, Day 4" =>  " ",
      "Cycle 2, Day 5" =>  " ",

      "Cycle 3, Day 1" =>  " ",
      "Cycle 3, Day 2" =>  " ",
      "Cycle 3, Day 3" =>  " ",
      "Cycle 3, Day 4" =>  " ",
      "Cycle 3, Day 5" =>  " ",

      "Cycle 4, Day 1" =>  " ",
      "Cycle 4, Day 2" =>  " ",
      "Cycle 4, Day 3" =>  " ",
      "Cycle 4, Day 4" =>  " ",
      "Cycle 4, Day 5" =>  " ",

      "Cycle 5, Day 1" =>  " ",
      "Cycle 5, Day 2" =>  " ",
      "Cycle 5, Day 3" =>  " ",
      "Cycle 5, Day 4" =>  " ",
      "Cycle 5, Day 5" =>  " "
);
array_push($retVal, $aRec);

$aRec = array(
      "-" => "01 General",
      "label" => "Weight",
      "Cycle 1, Day 1" =>  " ",
      "Cycle 1, Day 2" =>  " ",
      "Cycle 1, Day 3" =>  " ",
      "Cycle 1, Day 4" =>  " ",
      "Cycle 1, Day 5" =>  " ",

      "Cycle 2, Day 1" =>  " ",
      "Cycle 2, Day 2" =>  " ",
      "Cycle 2, Day 3" =>  " ",
      "Cycle 2, Day 4" =>  " ",
      "Cycle 2, Day 5" =>  " ",

      "Cycle 3, Day 1" =>  " ",
      "Cycle 3, Day 2" =>  " ",
      "Cycle 3, Day 3" =>  " ",
      "Cycle 3, Day 4" =>  " ",
      "Cycle 3, Day 5" =>  " ",

      "Cycle 4, Day 1" =>  " ",
      "Cycle 4, Day 2" =>  " ",
      "Cycle 4, Day 3" =>  " ",
      "Cycle 4, Day 4" =>  " ",
      "Cycle 4, Day 5" =>  " ",

      "Cycle 5, Day 1" =>  " ",
      "Cycle 5, Day 2" =>  " ",
      "Cycle 5, Day 3" =>  " ",
      "Cycle 5, Day 4" =>  " ",
      "Cycle 5, Day 5" =>  " "
);
array_push($retVal, $aRec);

            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => count($retVal),
                    'records' => $retVal,
                    'Foo' => "Bar1"
                ));



/******************************************
        $requestData = json_decode(file_get_contents('php://input'));
        if (! empty($requestData)) {
            $this->Flowsheet->beginTransaction();
            $returnVal = $this->Flowsheet->saveFlowsheet($requestData);
            if ($this->_checkForErrors('Update Flowsheet Notes Values Failed. ', $returnVal)) {
                $this->Flowsheet->rollbackTransaction();
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr')
                    ));
                return;
            }
            $this->Flowsheet->endTransaction();
            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => 1,
                    'records' => array(
                        'FS_ID' => $this->Flowsheet->getFlowsheetId()
                    )
                ));
        } else {
            error_log("FS GET - ");
            $records = $this->Flowsheet->getFlowsheet($id);
            if (empty($records)) {
                $records['error'] = 'No Records Found';
            }
            else {
                error_log("FS GOT RECORDS - ");
            }
            if ($this->_checkForErrors('Get Flowsheet Failed. ', $records)) {
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr') . $records['error']
                    ));
                return;
            }
            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => count($records),
                    'records' => $records
                ));
        }
***************************/
    }
    public function FS2($id = null) {

error_log("FS Entry Point");

        $jsonRecord = array();
        $jsonRecord['success'] = true;
        $retVal = array();

        $requestData = json_decode(file_get_contents('php://input'));
        if (! empty($requestData)) {
            $this->Flowsheet->beginTransaction();
            $returnVal = $this->Flowsheet->saveFlowsheet($requestData);
            if ($this->_checkForErrors('Update Flowsheet Notes Values Failed. ', $returnVal)) {
                $this->Flowsheet->rollbackTransaction();
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr')
                    ));
                return;
            }
            $this->Flowsheet->endTransaction();
            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => 1,
                    'records' => array(
                        'FS_ID' => $this->Flowsheet->getFlowsheetId()
                    )
                ));
        } else {
            error_log("FS GET - ");
            //$records = $this->Flowsheet->getFlowsheet($id);
            $records = $this->Flowsheet->FS($id);
            if (empty($records)) {
                $records['error'] = 'No Records Found';
            }
            else {
                error_log("FS GOT RECORDS - ");
            }
            if ($this->_checkForErrors('Get Flowsheet Failed. ', $records)) {
                $this->set('jsonRecord', 
                    array(
                        'success' => false,
                        'msg' => $this->get('frameworkErr') . $records['error']
                    ));
                return;
            }
            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => count($records),
                    'records' => $records
                ));
        }
	}
}