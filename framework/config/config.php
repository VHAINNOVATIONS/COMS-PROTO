<?php

// $dbConfigFilePath = '../app/config_Constants.php';
$dbConfigFilePath = __DIR__ . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, '..\\..\\app\\config_Constants.php');
if (file_exists($dbConfigFilePath)) {
	require_once $dbConfigFilePath;
}
else {
	echo 'FATAL ERROR - Can\'t access DB Configuration file - $dbConfigFilePath';
}