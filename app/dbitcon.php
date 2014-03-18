<?php

	$serverName = "DBITDATA\DBIT";
	$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"dbitPASS99","Database"=>"COMS_TEST_1");
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
	
?>