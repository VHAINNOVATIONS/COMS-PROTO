<?php
require_once "config_Constants.php";
	$serverName = DB_HOST;
	$connectionOptions = array("UID"=>DB_USER,"PWD"=>DB_PASSWORD,"Database"=>DB_NAME);
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
?>