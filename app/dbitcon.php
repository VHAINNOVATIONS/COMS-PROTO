<?php

	$dbConfigFilePath = __DIR__ . DIRECTORY_SEPARATOR . 'config_Constants.php';
	if (file_exists($dbConfigFilePath)) {
		require_once $dbConfigFilePath;
	}
	else {
		echo 'FATAL ERROR - Can\'t access DB Configuration file - ' . $dbConfigFilePath;
	}

	$serverName = $DB_HOST;
	$connectionOptions = array("UID"=>DB_USER, "PWD"=>DB_PASSWORD, "Database"=>DB_NAME);
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
?>