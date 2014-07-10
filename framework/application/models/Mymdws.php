<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class Mymdws extends Model {
    
    function getRoleInfo($username){
        
        $query = "SELECT * FROM Roles where username = '".$username."'";
        
        $roles = $this->query($query);
        
        return $roles;
    }

    function checkPatientCOMS($lastFour){
        
        $query = "SELECT Match,First_Name as fname,Last_Name as lname,Middle_Name,DFN,Patient_ID as id FROM Patient WHERE Match = '$lastFour'";
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
		
		//echo "Match".$Match."";
		//var_dump($arr);
		//var_dump($name);
        return ($result);
    }

    function getDFNByPatientID($patientId){
        
        $query = "SELECT DFN as dfn from Patient where Patient_ID = '".$patientId."'";
        $dfn = $this->query($query);
        
        if (null != $patientId && array_key_exists('error', $dfn)) {
            return $dfn;
        }
        
        return $dfn[0]['dfn'];
        
    }
	
}
?>
