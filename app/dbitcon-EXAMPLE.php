<?php

	$serverName = "xxxx";
	$connectionOptions = array("UID"=>"coms_db_user","PWD"=>"xxx","Database"=>"COMS");
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
	