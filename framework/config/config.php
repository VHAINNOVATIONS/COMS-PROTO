<?php

/** Configuration Variables **/


// MWB - 12/2/2011 - Defines which environment to use
// define('Local', true);
define('DBITPro_Dev', true);
// define('MWBarlow', true );
// define('KDean', true );





define ('DEVELOPMENT_ENVIRONMENT',true);

// MWB - 12/2/2011 - Constants defined here based on environment being used
// This makes it easier to change constants depending on the environment
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
	define('DB_USER', 'coms_db_user');		// Authentication done by Windows Authentication
	define('DB_PASSWORD', 'dbitPASS99');		// Authentication done by Windows Authentication
	//define('DB_USER', 'DBITPRO\coms_db_usr');		// Authentication done by Windows Authentication
	//define('DB_PASSWORD', 'CC0m$22%%1');		// Authentication done by Windows Authentication
	//define('DB_PASSWORD', 'pass4db$$');		// Authentication done by Windows Authentication	
}
else if (defined('MWBarlow')) {
	define('DB_NAME', 'coms');

	define('DB_TYPE', 'mysql');
	define('DB_SERVER', 'barlowmmsdb.db.6018490.hostedresource.com');
	define('DB_USER', 'barlowmmsdb');
	define('DB_PASSWORD', 'F00B@r00t');
}
else if (defined('KDean')) {
	define('DB_NAME', 'coms');

	define('DB_TYPE', 'mysql');
	define('DB_SERVER', 'localhost:3306');
	define('DB_USER', 'milo');
	define('DB_PASSWORD', 'F00B@milo');
}


