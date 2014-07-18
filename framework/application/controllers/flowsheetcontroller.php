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
      "Cycle 1, Day 1" => "07\/07\/2014",
      "Cycle 1, Day 2" => "07\/08\/2014",
      "Cycle 1, Day 3" => "07\/09\/2014",
      "Cycle 1, Day 4" => "07\/10\/2014",
      "Cycle 1, Day 5" => "07\/11\/2014",
      "Cycle 1, Day 6" => "07\/12\/2014",
      "Cycle 1, Day 7" => "07\/13\/2014",
      "Cycle 1, Day 8" => "07\/14\/2014",
      "Cycle 1, Day 9" => "07\/15\/2014",
      "Cycle 1, Day 10" => "07\/16\/2014",
      "Cycle 1, Day 11" => "07\/17\/2014",
      "Cycle 1, Day 12" => "07\/18\/2014",
      "Cycle 1, Day 13" => "07\/19\/2014",
      "Cycle 1, Day 14" => "07\/20\/2014",
      "Cycle 1, Day 15" => "07\/21\/2014",
      "Cycle 1, Day 16" => "07\/22\/2014",
      "Cycle 1, Day 17" => "07\/23\/2014",
      "Cycle 1, Day 18" => "07\/24\/2014",
      "Cycle 1, Day 19" => "07\/25\/2014"
);
array_push($retVal, $aRec);

error_log("Result - " . $this->varDumpToString($retVal));

$aRec = array(
      "-" => "01 General",
      "label" => "Toxicity",
      "Cycle 1, Day 25" => "&lt;u>View</u>",
      "Cycle 1, Day 28" =>  "&lt;u>View</u>",
      "Cycle 1, Day 1" =>   "&lt;u>View</u>",
      "Cycle 1, Day 2" =>   "&lt;u>View</u>",
      "Cycle 1, Day 3" =>   "&lt;u>View</u>",
      "Cycle 1, Day 4" =>   "&lt;u>View</u>",
      "Cycle 1, Day 5" =>   "&lt;u>View</u>",
      "Cycle 1, Day 6" =>  "&lt;u>View</u>",
      "Cycle 1, Day 7" =>  "&lt;u>View</u>",
      "Cycle 1, Day 8" =>  "&lt;u>View</u>",
      "Cycle 1, Day 9" =>  "&lt;u>View</u>",
      "Cycle 1, Day 10" => "&lt;u>View</u>",
      "Cycle 1, Day 11" => "&lt;u>View</u>",
      "Cycle 1, Day 12" => "&lt;u>View</u>",
      "Cycle 1, Day 13" => "&lt;u>View</u>",
      "Cycle 1, Day 14" => "&lt;u>View</u>",
      "Cycle 1, Day 15" => "&lt;u>View</u>",
      "Cycle 1, Day 16" => "&lt;u>View</u>",
      "Cycle 1, Day 17" => "&lt;u>View</u>",
      "Cycle 1, Day 18" => "&lt;u>View</u>",
      "Cycle 1, Day 19" => "&lt;u>View</u>"
);
array_push($retVal, $aRec);

$aRec = array(

      "-" => "01 General",
      "label" => "Disease Response",
      "Cycle 1, Day 1" =>  "N/C",
      "Cycle 1, Day 2" =>  "N/C",
      "Cycle 1, Day 3" =>  "N/C",
      "Cycle 1, Day 4" =>  "N/C",
      "Cycle 1, Day 5" =>  "N/C",
      "Cycle 1, Day 6" =>  "N/C",
      "Cycle 1, Day 7" =>  "N/C",
      "Cycle 1, Day 8" =>  "N/C",
      "Cycle 1, Day 9" =>  "N/C",
      "Cycle 1, Day 10" => "N/C",
      "Cycle 1, Day 11" => "N/C",
      "Cycle 1, Day 12" => "N/C",
      "Cycle 1, Day 13" => "N/C",
      "Cycle 1, Day 14" => "N/C",
      "Cycle 1, Day 15" => "N/C",
      "Cycle 1, Day 16" => "N/C",
      "Cycle 1, Day 17" => "N/C",
      "Cycle 1, Day 18" => "N/C",
      "Cycle 1, Day 19" => "N/C"
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
      "Cycle 1, Day 6" =>  " ",
      "Cycle 1, Day 7" =>  " ",
      "Cycle 1, Day 8" =>  " ",
      "Cycle 1, Day 9" =>  " ",
      "Cycle 1, Day 10" => " ",
      "Cycle 1, Day 11" => " ",
      "Cycle 1, Day 12" => " ",
      "Cycle 1, Day 13" => " ",
      "Cycle 1, Day 14" => " ",
      "Cycle 1, Day 15" => " ",
      "Cycle 1, Day 16" => " ",
      "Cycle 1, Day 17" => " ",
      "Cycle 1, Day 18" => " ",
      "Cycle 1, Day 19" => " "
);
array_push($retVal, $aRec);

            $this->set('jsonRecord', 
                array(
                    'success' => true,
                    'total' => count($records),
                    'records' => $retVal
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

}