<?php

$dbConfigFilePath = '../app/config_Constants.php';
if (file_exists($dbConfigFilePath)) {
	require_once $dbConfigFilePath;
}
else {
	echo "FATAL ERROR - Can't access DB Configuration file - $dbConfigFilePath <br>";
}