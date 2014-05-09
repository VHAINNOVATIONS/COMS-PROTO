<?php

	$serverName = "VAPHS355SQL";
	$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"COMSpass88","Database"=>"COMS");
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
	
?>