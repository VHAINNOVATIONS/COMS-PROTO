<?php
class Mymdws extends Model {
    function getRoleInfo($username){
        $query = "SELECT * FROM Roles where username = '".$username."'";
        $roles = $this->query($query);
        return $roles;
    }

    function checkPatientCOMS($PatientDFN){
        // $query = "SELECT Match,First_Name as fname,Last_Name as lname,Middle_Name,DFN,Patient_ID as id FROM Patient WHERE Match = '$lastFour'";
        $query = "SELECT DFN,Patient_ID as id FROM Patient WHERE DFN = '$PatientDFN'";
error_log("checkPatientCOMS - $PatientDFN = $query");
        $result = $this->query($query); 

        $query2 = "SELECT PAT_ID
        ,Patient_ID
        ,Template_ID
        ,Date_Applied
        ,Date_Started
        ,Date_Ended
        ,Is_Active
        ,AssignedByRoleID
        ,Goal
        ,Clinical_Trial
        ,Status
        ,Perf_Status_ID
        ,Weight_Formula
        ,BSA_Method
        ,Date_Ended_Actual
        FROM Patient_Assigned_Templates";

        $result2 = $this->query($query2);
        $arr = array_merge ((array)$result,(array)$result2);
        return ($result);
    }

    function getDFNByPatientID($patientId){
        $query = "SELECT DFN as dfn from Patient where Patient_ID = '$patientId'";
        $dfn = $this->query($query);
        if (null != $patientId && array_key_exists('error', $dfn)) {
            return $dfn;
        }
        return $dfn[0]['dfn'];
    }
}
?>
