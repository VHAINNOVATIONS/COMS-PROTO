<?php

/** Configuration Variables **/

// MWB - 12/2/2011 - Defines which environment to use
// define('Local', true);
define('DBITPro_Dev', true);
// define('MWBarlow', true );

define ('DEVELOPMENT_ENVIRONMENT',true);

if (defined('Local')) {
	define('DB_NAME', 'coms');
	define('DB_TYPE', 'mysql');
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'F00B@r00t');
}
else if (defined('DBITPro_Dev')) {
	define('DB_NAME', 'COMS_UAT_VA_TEST');
	define('DB_TYPE', 'sqlsrv');
	define('DB_HOST', "DBITDATA\DBIT");
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'dbitPASS99');
}
else if (defined('MWBarlow_old')) {
	define('DB_NAME', 'coms');
	define('DB_TYPE', 'mysql');
	define('DB_SERVER', 'barlowmmsdb.db.6018490.hostedresource.com');
	define('DB_USER', 'barlowmmsdb');
	define('DB_PASSWORD', 'F00B@r00t');
}
else if (defined('MWBarlow')) {
	define('DB_NAME', 'COMS_UAT_VA_TEST_MWB');
	define('DB_TYPE', 'sqlsrv');
	define('DB_HOST', "DBITDATA\DBIT");
	define('DB_USER', 'coms_db_user');
	define('DB_PASSWORD', 'dbitPASS99');
}
else if (defined('KDean')) {
	define('DB_NAME', 'coms');
	define('DB_TYPE', 'mysql');
	define('DB_SERVER', 'localhost:3306');
	define('DB_USER', 'milo');
	define('DB_PASSWORD', 'F00B@milo');
}
