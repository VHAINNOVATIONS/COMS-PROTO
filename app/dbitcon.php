<?php

	$serverName = "DBITDATA\DBIT";
	$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_MWB_TEST");
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
	
?>