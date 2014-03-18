<?php

/** Configuration Variables **/

// MWB - 12/2/2011 - Defines which environment to use

// define ('dbITCOMSTest', true);
define('MWBarlow', true );
define ('DEVELOPMENT_ENVIRONMENT', true);

if (defined('Local')) {
	define('DB_NAME', 'coms');
	define('DB_TYPE', 'mysql');
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'F00B@r00t');
}


else if (defined('VASandboxTest')) {
	define('DB_NAME', 'COMS_TestDB');
	define('DB_TYPE', 'sqlsrv');
	define('DB_SERVER', 'VAPHS355SQL');
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'COMSpass88');
}
else if (defined('dbITCOMSTest')) {
	define('DB_NAME', 'COMS_TEST_1');
	define('DB_TYPE', 'sqlsrv');
	define('DB_SERVER', 'DBITDATA\DBIT');
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'dbitPASS99');
}
else if (defined('MWBarlow')) {
	define('DB_NAME', 'COMS_MWB_TEST');
	define('DB_TYPE', 'sqlsrv');
	define('DB_HOST', "DBITDATA\DBIT");
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'dbitPASS99');
}

