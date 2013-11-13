<?php

class Messages extends Model {

    function GetMessagesByRID($rid){

		$rid = $_SESSION['rid'];
		$querye = "SELECT Email FROM Roles WHERE rid = ".$rid."";
		$result = $this->query($querye);
        foreach($result as $row){
            $email = $row['Email'];
        }
		
        //$query = "SELECT * FROM Messages WHERE MTo = '".$email."' ORDER BY mid DESC";
        $query = "SELECT * FROM Messages " .
		"WHERE MTo = '".$email."'  " .
		"OR CC = '".$email."' " .
		"OR MFrom = '".$email."' " .
		"ORDER BY mid DESC";
		
		
		//$query = "SELECT * " .
		//"FROM Messages " .
		//"WHERE (MStatus = 'Unread' AND CC = '".$email."') " .
		//"OR (MStatus = 'Unread' AND MTo = '".$email."') " .
		//"OR (MStatus = 'Unread' AND MFrom = '".$email."') " .
		//"ORDER BY mid DESC";
        
		return $this->query($query);

    }

}
?>
