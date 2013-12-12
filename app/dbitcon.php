<?php

	$dbConfigFilePath = __DIR__ . DIRECTORY_SEPARATOR . 'config_Constants.php';
	if (file_exists($dbConfigFilePath)) {
		require_once $dbConfigFilePath;
	}
	else {
		echo 'FATAL ERROR - Can\'t access DB Configuration file - ' . $dbConfigFilePath;
	}


	if (defined('DB_HOST')) {
		$serverName = DB_HOST;
	}
	else {
		$serverName = DB_SERVER;
	}
	$connectionOptions = array("UID"=>DB_USER, "PWD"=>DB_PASSWORD, "Database"=>DB_NAME);
/*
echo "Server Name - $serverName<br>";
print_r($connectionOptions);
echo "User - " . $connectionOptions['UID'] . "<br>";
echo "User - " . $connectionOptions['PWD'] . "<br>";
echo "User - " . $connectionOptions['Database'] . "<br>";

echo "Attempting to connect<br>";
*/
	$conn =  sqlsrv_connect( $serverName, $connectionOptions);
	if( $conn === false ) {
		echo "Connection Fails<br>";
		echo "Server - $serverName <br>Connection: ";
		var_dump($connectionOptions);

	    if( ($errors = sqlsrv_errors() ) != null) {
	        foreach( $errors as $error ) {
	            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	            echo "code: ".$error[ 'code']."<br />";
	            echo "message: ".$error[ 'message']."<br />";
	        }
	    }
	}
?>