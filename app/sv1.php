<?php
include "dbitcon.php";

echo "Server Name - $serverName<br>";
print_r($connectionOptions);
echo "<br>";
echo "User - " . $connectionOptions['UID'] . "<br>";
echo "PWD - " . $connectionOptions['PWD'] . "<br>";
echo "DB - " . $connectionOptions['Database'] . "<br>";

include "session.php";

if( $conn === false ) {
	echo "Connection Fails<br>";
    if( ($errors = sqlsrv_errors() ) != null) {
        foreach( $errors as $error ) {
            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
            echo "code: ".$error[ 'code']."<br />";
            echo "message: ".$error[ 'message']."<br />";
        }
    }
}
else {
	echo "Connection Succeeds<br>";
}
?>