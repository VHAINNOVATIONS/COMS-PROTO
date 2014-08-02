<?php

/** Configuration Variables **/

// MWB - 12/2/2011 - Defines which environment to use

define ('VASandboxTest', true);

if (defined('Local')) {
	define('DB_NAME', 'coms');
	define('DB_TYPE', 'mysql');
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'F00B@r00t');
}


else if (defined('VASandboxTest')) {
	define('DB_NAME', 'COMS');
	define('DB_TYPE', 'sqlsrv');
	define('DB_HOST', 'VAPHS355SQL');
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'COMSpass88');
}
