<?php

class Reports extends Model {


/**
 * Function sorts 2 array objects based on the Drug name of each array element
 *`@param array $a
 *`@param array $b
 */
    function cmp($a, $b) {
        $d1 = $a["Drug"];
        $d2 = $b["Drug"];
        return strcmp($d1, $d2);
    }
    function flagAsInventoried($rec) {
        $RecID = $rec["Order_ID"];
        $query = "update Order_Status set Inventoried = '1' where Order_ID = '$RecID'";
        // error_log($query);
        $retVal = $this->query($query);
        if (null != $retVal && isset($retVal['error'])) {
            return $retVal;
        }
    }


    function createAReport($LastInvDate) {
        $newID = $this->newGUID();
        $query = "insert into InventoryReportsLinks (ID, startDate) values('$newID', '$LastInvDate')";
        // error_log($query);
        $retVal = $this->query($query);
        return $newID;
    }

    function addRecord2Report($repID, $rec) {
        $Drug = $rec["Drug"];
        $Total = $rec["Total"];
        $Units = $rec["Units"];
        $query = "insert into InventoryReports (iReport_ID, Drug, Total, Unit) values ('$repID', '$Drug', '$Total', '$Units')";
        // error_log($query);
        return $this->query($query);
    }


    function CreateInventory($LastInvDate) {
        $query = "SELECT Order_ID, Drug_ID, Drug_Name as Drug, Amt as Dose, Unit FROM Order_Status where Inventoried is null and Order_Status = 'Dispensed' and Drug_ID is not null order by Drug";
        $retVal = $this->query($query);
        if (null != $retVal && isset($retVal['error'])) {
            return $retVal;
        }
        usort($retVal, array($this, "cmp")); 

        $tmp = array();
        $curDrug = "";
        $curDrugTotal = 0;
        foreach($retVal as $value) {
            $this->flagAsInventoried($value);
            // error_log("Walking Incventory List - " . $value["Order_ID"] . " - " . $value["Drug"] );
            if ($curDrug !== $value["Drug"]) {
                $curDrug = $value["Drug"];
                $curDrugTotal = 0;
            }
            $curDrugTotal += $value["Dose"];
            $tmp[$curDrug] = array("Total"=>$curDrugTotal, "Units"=>$value["Unit"]);
            // error_log("Drug: $curDrug; " . $value["Dose"] . "; $curDrugTotal " . $value["Unit"]);
        }

        if (count($tmp) > 0) {
            $report = array();
            $newReportID = $this->createAReport($LastInvDate);
            // error_log("Report ID = $newReportID");
            foreach($tmp as $key => $value) {
                $aRec = array("Drug"=>$key, "Total"=>$value["Total"], "Units"=>$value["Units"]);
                $this->addRecord2Report($newReportID, $aRec);
                $report[] = $aRec;
            }
            return $newReportID;
        }
        return null;
    }

    function getReportList() {
        $query = "select ID, CONVERT(varchar(10),Date,101) + ' ' + CONVERT(varchar(8), CAST(Date as TIME), 100) as Date, CONVERT(varchar(10),StartDate,101) + ' ' + CONVERT(varchar(8), CAST(StartDate as TIME), 100) as StartDate from InventoryReportsLinks order by Date";
        return $this->query($query);
    }

    function getReport($repID) {
        $query = "select * from InventoryReports where iReport_ID = '$repID' order by Drug";
        return $this->query($query);
    }

    function clearInventories() {
        $query = "update Order_Status set Inventoried = null where Inventoried is not null ";
        $retVal = $this->query($query);
        if (null != $retVal && isset($retVal['error'])) {
            return $retVal;
        }
    }
}


?>