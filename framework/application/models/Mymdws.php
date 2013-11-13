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
