<?php
/**
 *  Clear All Inventory records - really only needed during dev/testing - http DELETE - /Reports/clearInventories
 *  Generate an inventory report of all records NOT currently inventoried - http POST - /Reports/Inventory
 *  Get a list of Inventory reports - http GET - /Reports/Inventory (NO ID passed)
 *  Get a specific Inventory report - http GET - /Reports/Inventory/InventoryID
 *
 *  An inventory report shows how much of a specific drug has been administered during that inventory period.
 **/


class ReportsController extends Controller {
/*
 * GET a list of all inventory reports ($repID == null)
 * GET a specific inventory report ($repID !== null) or 
 * CREATE a new Inventory Report
 */
    function Inventory($repID = null){
        $jsonRecord = array();
        $records = array();
        $jsonRecord['success'] = true;

        if ("GET" == $_SERVER['REQUEST_METHOD']) {
            if (null == $repID) {
                $records = $this->Reports->getReportList();
            }
            else {
                $records = $this->Reports->getReport($repID);
            }
            if (count($records) > 0) {
                $jsonRecord['total'] = count($records);
                $jsonRecord['records'] = $records;
            }
            else {
                $jsonRecord['msg'] = "No Records";
            }
        }
        else if ("POST" == $_SERVER['REQUEST_METHOD']) {
            $tmp = json_decode(file_get_contents("php://input"));
            if(isset($tmp->LastInvDate)) {
                $LastInvDate = $tmp->LastInvDate;
            }

            $newReportID = $this->Reports->CreateInventory($LastInvDate);
            if ($newReportID) {
                $jsonRecord['ReportID'] = $newReportID;
            }
            else {
                $jsonRecord['msg'] = "No drugs have been dispensed since the last inventory report";
            }
        }
        else if ("DELETE" == $_SERVER['REQUEST_METHOD']) {
            $retVal = $this->Reports->clearInventories();
            $jsonRecord['success'] = true;
            $jsonRecord['msg'] = "Inventory Cleared";
        }
        else {
            $jsonRecord['success'] = false;
            $jsonRecord['msg'] = "Invalid command issued";
        }
        $this->set('jsonRecord', $jsonRecord);
    }
}

?>
