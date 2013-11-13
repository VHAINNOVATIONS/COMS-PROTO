<?php

class Admin extends Model {
    
    function getGlobals() {
        
        $query = "SELECT domain as domain,sitelist as sitelist FROM Globals";
        
        return $this->query($query);
        
    }

	function updateGlobals($form_data){
	
		$domain = $form_data->{'domain'};
        $sitelist = $form_data->{'sitelist'};
		
		$query = "Update Globals set domain = '".$domain."',sitelist ='".$sitelist."'";
        
		$retVal = $this->query($query);
		
	}

	function getMedsRounding(){
	
		$query = "SELECT Lookup_ID as Lookup_ID,Name as Name,Lookup_Type as Lookup_Type FROM LookUp WHERE Lookup_Type = 2";
        
		return $this->query($query);
		
	}

	function getMedsNonRounded(){
	
		$query = "SELECT Lookup_ID as Lookup_ID,Name as Name,NonRounding as NonRounding FROM Meds_NonRounding";
        
		return $this->query($query);
		
	}
	
	function updateMedsNonRounding($form_data){
	
		$Lookup_ID = $form_data->{'Lookup_ID'};
        $Name = $form_data->{'Name'};
		$NonRounding = $form_data->{'NonRounding'};
		
		$checkq = "SELECT Lookup_ID FROM Meds_NonRounding WHERE Lookup_ID = '".$Lookup_ID."'";
		$check = $this->query($checkq);

		foreach($check as $row){
            $Lookup_IDchk = $row['Lookup_ID'];
        }
		
		if (empty($Lookup_IDchk)){

		$query = "INSERT INTO Meds_NonRounding (Lookup_ID,Name,NonRounding) VALUES ('".$Lookup_ID."','".$Name."','".$NonRounding."')";
		return $this->query($query);		
		
		}
		else{
				
		}
		
	}

	function getMedsCumulativeDosing(){
	
		$query = "SELECT Lookup_ID as Lookup_ID,Name as Name,Lookup_Type as Lookup_Type FROM LookUp WHERE Lookup_Type = 2";
        
		return $this->query($query);
		
	}
	
	function updateMedsCumulativeDosing($form_data){
	
		$Lookup_ID = $form_data->{'Lookup_ID'};
        $Name = $form_data->{'Name'};
		$CumulativeDosingEnabled = $form_data->{'CumulativeDosingEnabled'};
		
		$checkq = "SELECT Lookup_ID FROM Meds_CumulativeDosing WHERE Lookup_ID = '".$Lookup_ID."'";
		$check = $this->query($checkq);

		foreach($check as $row){
            $Lookup_IDchk = $row['Lookup_ID'];
        }
		
		if (empty($Lookup_IDchk)){

		$query = "INSERT INTO Meds_CumulativeDosing (Lookup_ID,Name,CumulativeDosingEnabled) VALUES ('".$Lookup_ID."','".$Name."','".$CumulativeDosingEnabled."')";
		return $this->query($query);		
		
		}
		else{
				
		}
		
	}
    
	function getActiveWorkflows() {
     
        $query = "SELECT ID as ID,WorkFlowID as WorkFlowID,WorkFlowName as WorkFlowName,Active as Active,Reason as Reason,NoSteps as NoSteps,ReasonNo as ReasonNo,LastIssued as LastIssued,Body as Body FROM Workflows WHERE Active = 1 ORDER BY WorkFlowName";
        
        return $this->query($query);
        
    }	

	function getInActiveWorkflows() {
        
        $query = "SELECT ID as ID,WorkFlowID as WorkFlowID,WorkFlowName as WorkFlowName,Active as Active,Reason as Reason,NoSteps as NoSteps,ReasonNo as ReasonNo,LastIssued as LastIssued,Body as Body FROM Workflows WHERE Active = 0 ORDER BY WorkFlowName";
        
        return $this->query($query);
        
    }	
	
	function getUsers() {
     
        $query = "SELECT rid as rid,username as username,role as role,DisplayName as DisplayName,Email as Email,cprsUsername as cprsUsername,cprsPass as cprsPass FROM Roles ORDER BY username";
        
        return $this->query($query);
        
    }	

	function updateUsers($form_data){
	
		$rid = $form_data->{'rid'};
		$username = $form_data->{'username'};
        $role = $form_data->{'role'};
		$DisplayName = $form_data->{'DisplayName'};
		$Email = $form_data->{'Email'};
		$cprsUsername = $form_data->{'cprsUsername'};
		$cprsPass = $form_data->{'cprsPass'};
		
		$query = "Update Roles set username = '".$username."',role ='".$role."',DisplayName = '".$DisplayName."',Email = '".$Email."',cprsUsername = '".$cprsUsername."',cprsPass = '".$cprsPass."' WHERE rid = '".$rid."'";
        
		$retVal = $this->query($query);
		
	}	

	function updateWorkflows($form_data){
	
		$ID = $form_data->{'ID'};
		$WorkFlowID = $form_data->{'WorkFlowID'};
        $WorkFlowName = $form_data->{'WorkFlowName'};
		$Active = $form_data->{'Active'};
		$Reason = $form_data->{'Reason'};
		$NoSteps = $form_data->{'NoSteps'};
		$ReasonNo = $form_data->{'ReasonNo'};
		$LastIssued = $form_data->{'LastIssued'};
		$Body = $form_data->{'Body'};
		
		$query = "Update Workflows set ID = '".$ID."',WorkFlowID = '".$WorkFlowID."',WorkFlowName = '".$WorkFlowName."',Active = '".$Active."',Reason = '".$Reason."',NoSteps = '".$NoSteps."',ReasonNo = '".$ReasonNo."',LastIssued = '".$LastIssued."',Body = '".$Body."' WHERE ReasonNo = '".$ReasonNo."'";
        //echo $query;
		$retVal = $this->query($query);
		
	}	
	
}

?>
